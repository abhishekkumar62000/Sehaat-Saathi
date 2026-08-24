import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Hospital from "../models/HospitalSchema.js";
import Notification from "../models/NotificationSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      const hospital = await Hospital.findById(req.params.doctorId);
      if (hospital) {
        doctor = {
          _id: hospital._id,
          id: hospital._id,
          name: hospital.hospitalName,
          bio: hospital.bio || hospital.tagline || "Hospital OPD",
          photo: hospital.photo || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          ticketPrice: hospital.consultationFee || 500,
          hospital: hospital._id
        };
      } else {
        return res.status(404).json({ success: false, message: "Doctor or Hospital not found" });
      }
    }

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
            unit_amount: (doctor.ticketPrice || 500) * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio || "OPD Consultation",
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
    const docId = booking.doctor?._id?.toString() || booking.doctor?.toString();
    const hospId = booking.hospital?._id?.toString() || booking.hospital?.toString();
    const isAuthorized = 
      req.role === "admin" || 
      req.role === "hospital" || 
      (docId && docId === req.userId) || 
      (hospId && hospId === req.userId);

    if (!isAuthorized) {
      // Check if user is linked to hospital document
      const Hospital = (await import("../models/HospitalSchema.js")).default;
      const hospitalDoc = await Hospital.findOne({ user: req.userId });
      if (!hospitalDoc || (hospId && hospitalDoc._id.toString() !== hospId)) {
        return res.status(401).json({ success: false, message: "Unauthorized status toggle." });
      }
    }

    // Update status and timeline
    booking.status = status;
    if (rescheduleSuggestion) booking.rescheduleSuggestion = rescheduleSuggestion;
    
    if (!booking.journeyTimeline) booking.journeyTimeline = [];
    booking.journeyTimeline.push({
      status,
      timestamp: new Date(),
      message: message || `Status sync: ${status}`
    });

    await booking.save();

    // Real-Time Notification to Patient
    if (io) {
      const patientUserId = booking.user?._id?.toString() || booking.user?.toString();
      const providerDisplayName = booking.doctor?.name || booking.hospital?.hospitalName || "Healthcare Provider";

      if (patientUserId) {
        io.to(patientUserId).emit("STATUS_SYNC", {
          bookingId: booking._id,
          status,
          message: message || `Your booking status has been updated to ${status}`,
          doctorName: providerDisplayName
        });
      }

      // Specific logic for Queue Entry & Broadcasts
      const targetRoom = booking.hospital?._id?.toString() || booking.doctor?._id?.toString() || booking.hospital?.toString();
      if (targetRoom) {
        io.to(targetRoom).emit("QUEUE_SYNC", {
          bookingId: booking._id,
          patientName: booking.user?.name || booking.patientName || "Patient",
          status: status,
          type: status === "PATIENT_ARRIVED" ? "ARRIVAL" : "UPDATE"
        });
        io.to(targetRoom).emit("BOOKING_UPDATE_SIGNAL", {
          bookingId: booking._id,
          status: status
        });
      }

      // Global socket broadcast for active dashboards
      io.emit("STATUS_SYNC", {
        bookingId: booking._id,
        status,
        patientName: booking.user?.name || booking.patientName || "Patient"
      });
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

// updatePreConsultationDetails controller (Vitals & Health Locker)
export const updatePreConsultationDetails = async (req, res) => {
  const { bookingId } = req.params;
  const { vitals, files, symptoms } = req.body;
  const io = req.app.get("io");

  try {
    const booking = await Booking.findById(bookingId).populate("user doctor");
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Initialize if null
    if (!booking.preConsultationDetails) booking.preConsultationDetails = {};
    if (!booking.preConsultationDetails.vitals) booking.preConsultationDetails.vitals = {};
    if (!booking.preConsultationDetails.files) booking.preConsultationDetails.files = [];

    // Update fields securely
    if (vitals) {
      if (vitals.bloodPressure) booking.preConsultationDetails.vitals.bloodPressure = vitals.bloodPressure;
      if (vitals.temperature) booking.preConsultationDetails.vitals.temperature = vitals.temperature;
      if (vitals.sugarLevel) booking.preConsultationDetails.vitals.sugarLevel = vitals.sugarLevel;
    }
    if (files && Array.isArray(files)) {
      // Append new files safely
      booking.preConsultationDetails.files = [...new Set([...booking.preConsultationDetails.files, ...files])];
    }
    if (symptoms) {
      booking.preConsultationDetails.symptoms = symptoms;
    }

    await booking.save();

    // Emit Real-Time Socket Event to Doctor so their dashboard updates instantly
    if (io) {
      io.to(booking.doctor._id.toString()).emit("VITALS_SYNC", {
        bookingId: booking._id,
        vitals: booking.preConsultationDetails.vitals,
        patientName: booking.user.name,
        message: "Patient has updated their Pre-Consultation Vitals/Files."
      });
    }

    res.status(200).json({
      success: true,
      message: "Pre-consultation data safely synced.",
      data: booking.preConsultationDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Data sync failure: " + error.message
    });
  }
};

// Helper to parse time strings in various formats (e.g. "09:00 AM", "05:00 PM", "14:30")
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return { hours: 9, minutes: 0 };
  const clean = timeStr.trim().toUpperCase();
  const isPM = clean.includes("PM");
  const isAM = clean.includes("AM");
  
  const timePart = clean.replace("AM", "").replace("PM", "").trim();
  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = parseInt(hoursStr, 10);
  let minutes = parseInt(minutesStr, 10) || 0;
  
  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
};

// getAvailableSlots controller
export const getAvailableSlots = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query; // format: YYYY-MM-DD
  
  try {
    let provider = await Doctor.findById(doctorId);
    let isHospital = false;

    if (!provider) {
      provider = await Hospital.findById(doctorId);
      if (!provider) {
        return res.status(404).json({ success: false, message: "Doctor or Hospital not found" });
      }
      isHospital = true;
    }

    // Check holidays
    if (provider.unavailabilityDates && provider.unavailabilityDates.includes(date)) {
      return res.status(200).json({ success: true, message: "Provider is on holiday/off-day", data: [] });
    }

    // Determine Day of Week timezone-safely
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [year, month, day] = date.split("-").map(num => parseInt(num, 10));
    const requestedDate = new Date(year, month - 1, day);
    const dayName = days[requestedDate.getDay()];

    // Find schedule for that day
    let daySchedule = isHospital
      ? provider.weeklySchedule?.find(a => a.day?.toLowerCase() === dayName.toLowerCase())
      : provider.availability?.find(a => a.day?.toLowerCase() === dayName.toLowerCase());
    
    if (!daySchedule) {
      // Default OPD fallback schedule for hospitals/doctors
      daySchedule = { isAvailable: true, startTime: "09:00 AM", endTime: "05:00 PM", slotDuration: 30 };
    }

    if (daySchedule.isAvailable === false) {
      return res.status(200).json({ success: true, message: "No availability on this day", data: [] });
    }

    // Generate slots
    const { startTime, endTime, slotDuration } = daySchedule;
    const { hours: startH, minutes: startM } = parseTimeToMinutes(startTime);
    const { hours: endH, minutes: endM } = parseTimeToMinutes(endTime);
    
    const start = new Date(year, month - 1, day, startH, startM, 0, 0);
    const end = new Date(year, month - 1, day, endH, endM, 0, 0);
    
    let current = new Date(start);
    const baseSlots = [];

    while (current < end) {
      const timeString = current.toLocaleTimeString("en-US", { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      baseSlots.push(timeString);
      // Increment by slotDuration
      current = new Date(current.getTime() + (slotDuration || 30) * 60000);
    }
    
    // Check existing bookings for this date
    const bookingQuery = isHospital
      ? { hospital: doctorId, appointmentDate: date, status: { $ne: "cancelled" } }
      : { doctor: doctorId, appointmentDate: date, status: { $ne: "cancelled" } };

    const existingBookings = await Booking.find(bookingQuery);
    
    const maxCap = isHospital ? (provider.maxPatientsPerDay || 100) : (provider.maxPatientsPerDay || 50);
    if (maxCap && existingBookings.length >= maxCap) {
       return res.status(200).json({ success: true, message: "Maximum patient cap reached for today", data: [] });
    }

    const bookedTimeSlots = existingBookings.map(b => b.appointmentTime);
    const availableSlots = baseSlots.filter(slot => !bookedTimeSlots.includes(slot));

    res.status(200).json({
      success: true,
      message: "Slots retrieved successfully",
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
    
    let provider = await Doctor.findById(doctorId);
    let isHospital = false;

    if (!provider) {
      provider = await Hospital.findById(doctorId);
      if (!provider) {
        return res.status(404).json({ success: false, message: "Doctor or Hospital not found" });
      }
      isHospital = true;
    }

    const io = req.app.get("io");

    // Generate Token Number
    const countQuery = isHospital
      ? { hospital: provider._id, appointmentDate: date }
      : { doctor: provider._id, appointmentDate: date };

    const count = await Booking.countDocuments(countQuery);
    const tokenNumber = `SS-${date.split('-')[2]}-${100 + count + 1}`;

    // Create the Offline Booking
    const bookingData = {
      user: user._id,
      ticketPrice: amount || (isHospital ? (provider.consultationFee || 500) : (provider.ticketPrice || 300)),
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
    };

    if (isHospital) {
      bookingData.hospital = provider._id;
      bookingData.doctor = provider._id; // Store in doctor field too for schema validation/safeguards
    } else {
      bookingData.doctor = provider._id;
      bookingData.hospital = provider.hospital;
    }

    const booking = new Booking(bookingData);

    // Simulate QR code content (could be a generated hash)
    booking.qrCode = `DATA:${booking._id}|${tokenNumber}|${req.userId}`;

    await booking.save();

    // Notify via Realtime Socket
    const newNotification = new Notification({
      recipient: provider._id,
      recipientModel: isHospital ? "Hospital" : "Doctor",
      sender: user._id,
      senderModel: "User",
      message: `${user.name} requested an OFFLINE appointment on ${date} at ${timeSlot}.`,
      actionType: "NEW_BOOKING",
      bookingId: booking._id
    });
    await newNotification.save();

    if (io) {
      const alertPayload = {
        message: newNotification.message,
        booking: booking,
        patientName: user.name || patientName || "Patient"
      };

      io.to(provider._id.toString()).emit("booking:new", alertPayload);
      io.to(provider._id.toString()).emit("NEW_BOOKING_ALERT", alertPayload);
      
      if (provider.user) {
        io.to(provider.user.toString()).emit("booking:new", alertPayload);
        io.to(provider.user.toString()).emit("NEW_BOOKING_ALERT", alertPayload);
      }

      if (!isHospital && provider.hospital) {
        io.to(provider.hospital.toString()).emit("booking:new", alertPayload);
        io.to(provider.hospital.toString()).emit("HOSPITAL_SYNC", alertPayload);
      }

      // Broadcast event globally for all active hospital command centers
      io.emit("NEW_BOOKING_ALERT", alertPayload);
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

