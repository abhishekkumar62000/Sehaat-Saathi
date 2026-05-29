import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Notification from "../models/NotificationSchema.js";
import Activity from "../models/ActivitySchema.js";

// POST /api/v1/appointments/book
export const bookAppointment = async (req, res) => {
  const { 
    doctorId, 
    date, 
    timeSlot, 
    paymentMethod, 
    symptoms, 
    hospitalId, 
    patientName, 
    ticketPrice,
    appointmentType = 'offline' 
  } = req.body;
  
  const patientId = req.userId;
  const io = req.app.get("io");

  try {
    console.log("Creating new appointment for patient:", patientId);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const bookingToken = `SS-${Math.floor(1000 + Math.random() * 9000)}`;
    const isHospitalIdValid = mongoose.Types.ObjectId.isValid(hospitalId);

    const appointment = new Appointment({
      patient: patientId,
      patientName: patientName,
      doctor: doctorId,
      hospital: isHospitalIdValid ? hospitalId : undefined,
      hospitalName: !isHospitalIdValid ? hospitalId : undefined,
      date,
      timeSlot,
      symptoms,
      paymentMethod,
      ticketPrice,
      bookingToken,
      appointmentType,
    });

    await appointment.save();

    console.log("Appointment saved successfully! Count: 1");

    // Emit socket event: Real-time update for Doctor
    if (io) {
      io.to(doctorId).emit("new-booking", appointment);
      console.log(`Socket signal sent: new-booking to Doctor ${doctorId}`);
    }

    // --- Neural Persistence Layer: Always Store ---
    // 1. Create Notification for Doctor
    await new Notification({
      recipient: doctorId,
      recipientModel: "Doctor",
      sender: patientId,
      senderModel: "User",
      message: `🔔 Pulse Alert: New ${appointmentType === 'teleconsult' ? 'Instant Video' : 'Offline'} consultation request from patient.`,
      actionType: "NEW_BOOKING",
      bookingId: appointment._id
    }).save();

    // 2. Log Activity for Patient
    await new Activity({
      userId: patientId,
      userModel: "User",
      featureName: appointmentType === 'teleconsult' ? "Live Tele-Consult" : "Offline Consultation",
      action: `${appointmentType === 'teleconsult' ? 'Instant Video session' : 'Physical Visit'} with ${doctor.name} (Token: ${bookingToken})`,
      path: appointmentType === 'teleconsult' ? "/tele-consult" : "/offline-consultation"
    }).save();

    // 3. Log Activity for Doctor
    await new Activity({
      userId: doctorId,
      userModel: "Doctor",
      featureName: "Appointment Matrix",
      action: `Incoming neural record: ${appointmentType === 'teleconsult' ? 'Emergency Video' : 'Offline'} booking from ${patientName || 'Patient'}`,
      path: "/doctors/profile/me"
    }).save();

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
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
