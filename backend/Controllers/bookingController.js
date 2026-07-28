import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Notification from "../models/NotificationSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    const io = req.app.get("io");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd", // changed for testing/general usage
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      hospital: doctor.hospital, // Link hospital if doctor has one
      status: "pending",
    });

    await booking.save();

    // Create persistent notification for Doctor
    const newNotification = new Notification({
      recipient: doctor._id,
      recipientModel: "Doctor",
      sender: user._id,
      senderModel: "User",
      message: `${user.name} just requested an appointment sync. Pulse detected.`,
      actionType: "NEW_BOOKING",
      bookingId: booking._id
    });
    await newNotification.save();

    // Emit Real-Time Socket Event to Doctor
    if (io) {
      io.to(doctor._id.toString()).emit("NEW_BOOKING_ALERT", {
        message: newNotification.message,
        bookingId: booking._id,
        patientName: user.name
      });

      // Also notify Hospital if linked
      if (doctor.hospital) {
        io.to(doctor.hospital.toString()).emit("HOSPITAL_SYNC", {
          message: `Doctor ${doctor.name} received a new booking from ${user.name}`,
          type: "DOCTOR_BOOKING"
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Neural sync initiated. Redirecting to payment...",
      session,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Neural link failure: " + err.message,
    });
  }
};

// updateBookingStatus controller (Version 2.0 State Machine)
export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status, message, rescheduleSuggestion } = req.body;
  const io = req.app.get("io");

  try {
    const booking = await Booking.findById(bookingId).populate("user doctor hospital");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Role-based verification (Doctor or Hospital admin)
    if (booking.doctor._id.toString() !== req.userId && booking.hospital?.toString() !== req.userId && req.role !== "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized status toggle." });
    }

    // Update status and timeline
    booking.status = status;
    if (rescheduleSuggestion) booking.rescheduleSuggestion = rescheduleSuggestion;
    
    booking.journeyTimeline.push({
      status,
      timestamp: new Date(),
      message: message || `Status sync: ${status}`
    });

    await booking.save();

    // Real-Time Notification to Patient
    if (io) {
      io.to(booking.user._id.toString()).emit("STATUS_SYNC", {
        bookingId: booking._id,
        status,
        message: message || `Your booking status has been updated to ${status}`,
        doctorName: booking.doctor.name
      });

      // Specific logic for Queue Entry
      if (status === "PATIENT_ARRIVED") {
        io.to(booking.hospital?._id.toString() || booking.doctor._id.toString()).emit("QUEUE_SYNC", {
          bookingId: booking._id,
          patientName: booking.user.name,
          type: "ARRIVAL"
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Neural status synced: ${status}`,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Neural status update failure: " + error.message 
    });
  }
};

// getAvailableSlots controller
export const getAvailableSlots = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query; // format: YYYY-MM-DD
  
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Check holidays
    if (doctor.unavailabilityDates && doctor.unavailabilityDates.includes(date)) {
      return res.status(200).json({ success: true, message: "Doctor is on holiday", data: [] });
    }

    // Determine Day of Week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const requestedDate = new Date(date);
    const dayName = days[requestedDate.getDay()];

    // Find schedule for that day
    const daySchedule = doctor.availability?.find(a => a.day === dayName);
    
    if (!daySchedule || daySchedule.isAvailable === false) {
      return res.status(200).json({ success: true, message: "No availability on this day", data: [] });
    }

    // Generate slots
    const { startTime, endTime, slotDuration } = daySchedule;
    // startTime is like "09:00", endTime is "17:00"
    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime}:00`);
    
    let current = start;
    const baseSlots = [];

    while (current < end) {
      const timeString = current.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      baseSlots.push(timeString);
      // Increment by slotDuration
      current = new Date(current.getTime() + slotDuration * 60000);
    }
    
    // Check existing bookings for this date
    const existingBookings = await Booking.find({ doctor: doctorId, appointmentDate: date, status: { $ne: "cancelled" } });
    
    if (doctor.maxPatientsPerDay && existingBookings.length >= doctor.maxPatientsPerDay) {
       return res.status(200).json({ success: true, message: "Maximum patient cap reached for today", data: [] });
    }

    const bookedTimeSlots = existingBookings.map(b => b.appointmentTime);
    
    const availableSlots = baseSlots.filter(slot => !bookedTimeSlots.includes(slot));

    res.status(200).json({
      success: true,
      message: "Slots retrieved",
      data: availableSlots
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch slots: " + err.message });
  }
};

// createOfflineBooking controller
export const createOfflineBooking = async (req, res) => {
  try {
    const { doctorId, amount, consultationType, date, timeSlot, symptoms, paymentMethod, patientReports, patientName } = req.body;
    const user = await User.findById(req.userId);
    const doctor = await Doctor.findById(doctorId);
    const io = req.app.get("io");

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Generate Token Number
    const count = await Booking.countDocuments({ doctor: doctorId, appointmentDate: date });
    const tokenNumber = `SS-${date.split('-')[2]}-${100 + count + 1}`;

    // Create the Offline Booking
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: amount || doctor.ticketPrice,
      hospital: doctor.hospital,
      status: "REQUESTED",
      appointmentDate: date,
      appointmentTime: timeSlot,
      symptoms,
      bookingMode: "offline",
      consultationType: consultationType || "First Visit",
      paymentMethod: paymentMethod || "Pay at Hospital",
      isPaid: paymentMethod === "Online Payment" ? true : false,
      tokenNumber,
      patientName: patientName || user.name || "Self / User",
      patientReports: patientReports || []
    });

    // Simulate QR code content (could be a generated hash)
    booking.qrCode = `DATA:${booking._id}|${tokenNumber}|${req.userId}`;

    await booking.save();

    // Notify Doctor via Realtime Socket
    const newNotification = new Notification({
      recipient: doctor._id,
      recipientModel: "Doctor",
      sender: user._id,
      senderModel: "User",
      message: `${user.name} requested an OFFLINE appointment on ${date} at ${timeSlot}.`,
      actionType: "NEW_BOOKING",
      bookingId: booking._id
    });
    await newNotification.save();

    if (io) {
      io.to(doctor._id.toString()).emit("booking:new", {
        message: newNotification.message,
        booking: booking
      });
      if (doctor.hospital) {
        io.to(doctor.hospital.toString()).emit("booking:new", {
          message: `Doctor ${doctor.name} received an offline appointment request.`,
          booking: booking
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Offline consultation requested successfully.",
      data: booking
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create offline booking: " + err.message });
  }
};

// Aliases for Accept/Reject directly
export const acceptBooking = async (req, res) => {
  req.body.status = "confirmed";
  req.body.message = req.body.message || "Your offline booking is accepted.";
  req.params.bookingId = req.params.id; // Map id to bookingId for updateBookingStatus alias logic
  return updateBookingStatus(req, res);
};

export const rejectBooking = async (req, res) => {
  req.body.status = "rejected";
  req.body.message = req.body.message || "Your offline booking was rejected.";
  req.params.bookingId = req.params.id;
  return updateBookingStatus(req, res);
};

export const patientCancelBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const BookingModel = (await import('../models/BookingSchema.js')).default;
    const booking = await BookingModel.findById(id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.status === 'completed' || booking.status === 'cancelled') {
        return res.status(400).json({ success: false, message: "Cannot cancel this booking." });
    }

    booking.status = 'cancelled';
    booking.queueNumber = null;
    await booking.save();

    res.status(200).json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to cancel booking", error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Appointment record not found." });
    }

    // Role-based Verification: Ensure the requester owns this clinical link
    if (booking.doctor.toString() !== req.userId && booking.hospital?.toString() !== req.userId && req.role !== "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized deletion attempt. Pulse access denied." });
    }

    await Booking.findByIdAndDelete(id);

    // Synchronized Cleanup from User's references if applicable (assuming UserSchema has appointments array)
    await User.findByIdAndUpdate(booking.user, { $pull: { appointments: id } });

    res.status(200).json({
      success: true,
      message: "Clinical record removed from dashboard permanently."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Neural deletion failure: " + error.message });
  }
};

