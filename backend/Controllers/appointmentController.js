import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Hospital from "../models/HospitalSchema.js";
import Booking from "../models/BookingSchema.js";
import Notification from "../models/NotificationSchema.js";
import Activity from "../models/ActivitySchema.js";

// POST /api/v1/appointments/book
export const bookAppointment = async (req, res) => {
  const { 
    doctorId, 
    date, 
    timeSlot, 
    paymentMethod = 'Pay at Hospital', 
    symptoms = 'OPD Physical Visit', 
    hospitalId, 
    patientName, 
    ticketPrice,
    appointmentType = 'offline' 
  } = req.body;
  
  const patientId = req.userId;
  const io = req.app.get("io");

  try {
    console.log("Creating new appointment/booking for patient:", patientId, "Provider Target:", doctorId);

    let doctor = await Doctor.findById(doctorId);
    let hospital = null;
    let isHospitalNode = false;

    if (!doctor) {
      // Check if target is a registered Hospital
      hospital = await Hospital.findById(doctorId);
      if (!hospital && hospitalId) {
        hospital = await Hospital.findById(hospitalId);
      }

      if (hospital) {
        isHospitalNode = true;
        // Create virtual provider doc representation for Hospital node
        doctor = {
          _id: hospital._id,
          name: hospital.hospitalName,
          specialization: hospital.specializations?.[0] || hospital.tagline || "Multi-Specialty Hospital",
          hospital: hospital._id,
          photo: hospital.photo || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          ticketPrice: ticketPrice || hospital.consultationFee || 500
        };
      } else {
        return res.status(404).json({ success: false, message: "Doctor or Hospital node not found" });
      }
    }

    const bookingToken = `SS-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveHospitalId = isHospitalNode ? hospital._id : (hospitalId && mongoose.Types.ObjectId.isValid(hospitalId) ? hospitalId : doctor.hospital);

    // 1. Create Appointment Record
    const appointment = new Appointment({
      patient: patientId,
      patientName: patientName || "Patient",
      doctor: isHospitalNode ? hospital._id : doctor._id,
      hospital: effectiveHospitalId,
      hospitalName: isHospitalNode ? hospital.hospitalName : (doctor.hospitalName || "Hospital OPD"),
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || "10:00 AM",
      symptoms: symptoms || "OPD Consultation",
      paymentMethod: paymentMethod === 'online' || paymentMethod === 'Online Payment' ? 'online' : 'cod',
      ticketPrice: ticketPrice || doctor.ticketPrice || 500,
      bookingToken,
      appointmentType,
    });

    await appointment.save();

    // 2. Create parallel Booking Record for Hospital Command Center Dashboard sync
    const booking = new Booking({
      user: patientId,
      doctor: isHospitalNode ? hospital._id : doctor._id,
      hospital: effectiveHospitalId,
      ticketPrice: String(ticketPrice || doctor.ticketPrice || 500),
      status: "REQUESTED",
      isPaid: paymentMethod === "Online Payment" || paymentMethod === "online",
      appointmentDate: date || new Date().toISOString().split('T')[0],
      appointmentTime: timeSlot || "10:00 AM",
      patientName: patientName || "Patient",
      symptoms: symptoms || "OPD Consultation",
      bookingMode: "offline",
      consultationType: "First Visit",
      paymentMethod: paymentMethod === 'online' || paymentMethod === 'Online Payment' ? 'Online Payment' : 'Pay at Hospital',
      tokenNumber: bookingToken,
      qrCode: `DATA:${appointment._id}|${bookingToken}|${patientId}`
    });

    await booking.save();

    console.log("Appointment and Booking saved successfully! Token:", bookingToken);

    // Emit Real-time WebSockets
    if (io) {
      const alertPayload = {
        message: `New offline appointment request from ${patientName || 'Patient'}`,
        booking: booking,
        appointment: appointment,
        patientName: patientName || "Patient",
        bookingToken
      };

      const targetRoom = isHospitalNode ? hospital._id.toString() : doctor._id.toString();
      
      io.to(targetRoom).emit("new-booking", alertPayload);
      io.to(targetRoom).emit("NEW_BOOKING_ALERT", alertPayload);
      io.to(targetRoom).emit("booking:new", alertPayload);

      if (effectiveHospitalId) {
        io.to(effectiveHospitalId.toString()).emit("HOSPITAL_SYNC", alertPayload);
        io.to(effectiveHospitalId.toString()).emit("NEW_BOOKING_ALERT", alertPayload);
        io.to(effectiveHospitalId.toString()).emit("booking:new", alertPayload);
      }

      // Global broadcast for hospital dashboard listeners
      io.emit("NEW_BOOKING_ALERT", alertPayload);
    }

    // --- Neural Persistence Layer (Safeguarded) ---
    try {
      const recipientId = isHospitalNode ? hospital._id : doctor._id;
      const recipientModel = isHospitalNode ? "Hospital" : "Doctor";

      await new Notification({
        recipient: recipientId,
        recipientModel: recipientModel,
        sender: patientId,
        senderModel: "User",
        message: `🔔 New consultation request from ${patientName || 'Patient'} (Token: ${bookingToken}).`,
        actionType: "NEW_BOOKING",
        bookingId: appointment._id
      }).save();

      await new Activity({
        userId: patientId,
        userModel: "User",
        featureName: "Offline Consultation",
        action: `Physical Visit with ${doctor.name} (Token: ${bookingToken})`,
        path: "/offline-consultation"
      }).save();
    } catch (notifErr) {
      console.warn("Non-critical notification/activity logging warning:", notifErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: {
        ...appointment._doc,
        bookingToken,
        tokenNumber: bookingToken,
        paymentStatus: booking.isPaid ? 'paid' : 'unpaid'
      },
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Error booking appointment: " + error.message });
  }
};

// GET /api/v1/appointments/doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.userId })
      .populate("patient", "name photo gender email")
      .sort({ createdAt: -1 });

    console.log(`Doctor appointments fetched. Count: ${appointments.length}`);

    res.status(200).json({
      success: true,
      message: "Doctor appointments fetched",
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ success: false, message: "Error fetching appointments: " + error.message });
  }
};

// GET /api/v1/appointments/patient
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.userId })
      .populate({
        path: "doctor",
        populate: { path: "hospital" }
      })
      .sort({ createdAt: -1 });

    console.log(`Patient appointments fetched. Count: ${appointments.length}`);

    res.status(200).json({
      success: true,
      message: "Patient appointments fetched",
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ success: false, message: "Error fetching appointments: " + error.message });
  }
};

// PATCH /api/v1/appointments/:id/status
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, appointmentTime, statusMessage } = req.body;
  const io = req.app.get("io");

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, appointmentTime, statusMessage },
      { new: true }
    ).populate("patient doctor");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    console.log(`Appointment ${id} status updated to: ${status}`);

    // Emit socket event to Patient
    if (io) {
      io.to(appointment.patient._id.toString()).emit("STATUS_SYNC", {
        bookingId: id,
        status,
        message: statusMessage || `Your appointment status has been updated to ${status}`,
        doctorName: appointment.doctor.name
      });
    }

    // --- Neural Persistence Layer: Status Sync ---
    // 1. Create Notification for Patient
    await new Notification({
      recipient: appointment.patient._id,
      recipientModel: "User",
      sender: appointment.doctor._id,
      senderModel: "Doctor",
      message: `⚡ Status Sync: Your appointment was marked as ${status}. ${statusMessage || ''}`,
      actionType: status === 'confirmed' ? "BOOKING_ACCEPTED" : "BOOKING_REJECTED",
      bookingId: appointment._id
    }).save();

    // 2. Log Activity for Doctor
    await new Activity({
      userId: appointment.doctor._id,
      userModel: "Doctor",
      featureName: "Appointment Control",
      action: `Updated record SS-${appointment.bookingToken} to ${status.toUpperCase()}`,
      path: "/doctors/profile/me"
    }).save();

    // 3. Log Activity for Patient
    await new Activity({
      userId: appointment.patient._id,
      userModel: "User",
      featureName: "My Bookings",
      action: `Consultation status changed to ${status.toUpperCase()} by Dr. ${appointment.doctor.name}`,
      path: "/users/profile/me"
    }).save();

    res.status(200).json({
      success: true,
      message: `Appointment ${status} successfully`,
      data: appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Error updating status: " + error.message });
  }
};

// DELETE /api/v1/appointments/:id
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment record not found" });
    }

    // Role-based Verification: Ensure the requester is the associated doctor or hospital admin
    if (
      appointment.doctor.toString() !== req.userId &&
      appointment.hospital?.toString() !== req.userId &&
      req.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized deletion attempt. Pulse access denied.",
      });
    }

    // Permanent Deletion
    await Appointment.findByIdAndDelete(id);

    // Synchronized Cleanup: Remove from User's references if patient exists
    if (appointment.patient) {
        try {
            await User.findByIdAndUpdate(appointment.patient, { $pull: { appointments: id } });
        } catch (syncError) {
            console.warn("User reference cleanup failed, but appointment was deleted:", syncError.message);
        }
    }

    res.status(200).json({
      success: true,
      message: "Record removed permanently",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ success: false, message: "Failed to delete: " + error.message });
  }
};
