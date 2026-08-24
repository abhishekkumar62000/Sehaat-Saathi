import VideoConsultation from "../models/VideoConsultation.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Notification from "../models/NotificationSchema.js";
import Activity from "../models/ActivitySchema.js";
import { generateMeetingLink, generateBookingPassId } from "../utils/meetingLinkGenerator.js";

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/book
// Creates a consultation booking (payment still pending)
// ─────────────────────────────────────────────────
export const createVideoBooking = async (req, res) => {
  const patientId = req.userId;
    const { 
      doctorId, 
      patientName, 
      consultationFee, 
      meetingProvider, 
      appointmentDate, 
      appointmentTime, 
      symptoms,
      duration,
      familyMember,
      metadata,
      attachments,
      aiSummary,
      vitals
    } = req.body;
    const io = req.app.get("io");

    try {
      // 1. Validate doctor or hospital node
      let doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        const Hospital = (await import("../models/HospitalSchema.js")).default;
        const hospital = await Hospital.findById(doctorId);
        if (hospital) {
          doctor = {
            _id: hospital._id,
            name: hospital.hospitalName,
            isApproved: "approved",
            isTeleConsultActive: true,
            ticketPrice: hospital.consultationFee || 500
          };
        } else {
          return res.status(404).json({ success: false, message: "Doctor or Hospital node not found" });
        }
      }

      // 2. Validate patient
      const patient = await User.findById(patientId);
      if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

      // 3. Guard against duplicate booking (same doctor, date, time)
      const clash = await VideoConsultation.findOne({
        doctor: doctorId,
        appointmentDate,
        appointmentTime,
        bookingStatus: { $ne: "cancelled" },
      });
      if (clash) return res.status(409).json({ success: false, message: `This time slot is already booked. Please choose another.` });

      // 4. Generate unique booking pass ID
      const bookingPassId = generateBookingPassId();

      // 5. Create consultation record (payment pending, no link yet)
      const consultation = new VideoConsultation({
        patient: patientId,
        doctor: doctorId,
        patientName: patientName || patient.name,
        consultationFee: consultationFee || doctor.teleConsultPrice || doctor.ticketPrice,
        meetingProvider: meetingProvider || "google",
        appointmentDate,
        appointmentTime,
        duration: duration || "20 min",
        symptoms,
        familyMember,
        metadata,
        attachments: attachments || [],
        aiSummary,
        vitals,
        bookingPassId,
        paymentStatus: "pending",
        bookingStatus: "scheduled",
      });

    await consultation.save();

    // 6. Notify doctor via socket
    if (io) {
      io.to(doctorId.toString()).emit("VIDEO_BOOKING_NEW", {
        message: `📹 New video consultation booked by ${patientName || patient.name} for ${appointmentDate} at ${appointmentTime}`,
        consultationId: consultation._id,
      });
    }

    // 7. Notify doctor (persistent notification)
    await new Notification({
      recipient: doctorId,
      recipientModel: "Doctor",
      sender: patientId,
      senderModel: "User",
      message: `📹 New video consultation request from ${patientName || patient.name} for ${appointmentDate} at ${appointmentTime}`,
      actionType: "NEW_BOOKING",
    }).save();

    // 8. Activity log for patient
    await new Activity({
      userId: patientId,
      userModel: "User",
      featureName: "Video Consultation Booking",
      action: `Booked video call with Dr. ${doctor.name} (${bookingPassId})`,
      path: "/online-video-booking",
    }).save();

    res.status(201).json({
      success: true,
      message: "Booking created. Please complete payment to confirm your slot.",
      data: {
        consultation,
        bookingPassId,
        doctorName: doctor.name,
        fee: consultation.consultationFee,
      },
    });
  } catch (error) {
    console.error("Video booking error:", error);
    res.status(500).json({ success: false, message: "Booking failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/payment-success
// Call this after payment is confirmed (Razorpay or mock)
// Activates the meeting link
// ─────────────────────────────────────────────────
export const markPaymentSuccess = async (req, res) => {
  const { consultationId, razorpayOrderId, razorpayPaymentId } = req.body;
  const io = req.app.get("io");

  try {
    const consultation = await VideoConsultation.findById(consultationId)
      .populate("doctor", "name email teleConsultPrice")
      .populate("patient", "name email");

    if (!consultation) return res.status(404).json({ success: false, message: "Booking not found" });
    if (consultation.paymentStatus === "paid") return res.status(400).json({ success: false, message: "Payment already processed" });

    // Generate the meeting link now that payment is confirmed
    const meetingLink = generateMeetingLink(consultation.meetingProvider);

    consultation.paymentStatus = "paid";
    consultation.meetingLink = meetingLink;
    consultation.razorpayOrderId = razorpayOrderId || null;
    consultation.razorpayPaymentId = razorpayPaymentId || null;

    await consultation.save();

    const patientId = consultation.patient._id.toString();
    const doctorId = consultation.doctor._id.toString();

    // Real-time notification to both parties
    if (io) {
      io.to(patientId).emit("VIDEO_PAYMENT_CONFIRMED", {
        message: `✅ Payment confirmed! Your video call with Dr. ${consultation.doctor.name} is scheduled for ${consultation.appointmentDate} at ${consultation.appointmentTime}`,
        meetingLink,
        consultationId: consultation._id,
      });
      io.to(doctorId).emit("VIDEO_PAYMENT_CONFIRMED", {
        message: `💰 Payment received for consultation with ${consultation.patientName}. Meeting: ${consultation.appointmentDate} at ${consultation.appointmentTime}`,
        meetingLink,
        consultationId: consultation._id,
      });
    }

    // Persistent notifications
    await new Notification({
      recipient: consultation.patient._id,
      recipientModel: "User",
      sender: consultation.doctor._id,
      senderModel: "Doctor",
      message: `✅ Video call confirmed! Dr. ${consultation.doctor.name} on ${consultation.appointmentDate} at ${consultation.appointmentTime}. Meeting link ready.`,
      actionType: "PAYMENT_SUCCESS",
    }).save();

    await new Notification({
      recipient: consultation.doctor._id,
      recipientModel: "Doctor",
      sender: consultation.patient._id,
      senderModel: "User",
      message: `💰 Payment received from ${consultation.patientName}. Video consult on ${consultation.appointmentDate} at ${consultation.appointmentTime}`,
      actionType: "PAYMENT_SUCCESS",
    }).save();

    res.status(200).json({
      success: true,
      message: "Payment confirmed and meeting link generated!",
      data: { consultation, meetingLink },
    });
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ success: false, message: "Payment processing failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// GET /api/v1/video-consult/my-bookings
// Returns all video bookings for authenticated user (patient or doctor)
// ─────────────────────────────────────────────────
export const getMyVideoBookings = async (req, res) => {
  const userId = req.userId;
  const role = req.role;

  try {
    let query = {};
    if (role === "doctor") {
      query = { doctor: userId };
    } else {
      query = { patient: userId };
    }

    const bookings = await VideoConsultation.find(query)
      .populate("doctor", "name photo specialization teleConsultPrice")
      .populate("patient", "name photo email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Video bookings retrieved",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// GET /api/v1/video-consult/:id/join
// Returns the meeting link — only if payment is confirmed
// and it is within 10 minutes before the appointment
// ─────────────────────────────────────────────────
export const joinVideoConsultation = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const consultation = await VideoConsultation.findById(id)
      .populate("doctor", "name")
      .populate("patient", "name");

    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    // Only the doctor or patient can join
    const isPatient = consultation.patient._id.toString() === userId;
    const isDoctor = consultation.doctor._id.toString() === userId;
    if (!isPatient && !isDoctor) {
      return res.status(401).json({ success: false, message: "Unauthorized access to this consultation" });
    }

    if (consultation.paymentStatus !== "paid") {
      return res.status(403).json({ success: false, message: "Payment not completed. Please complete your payment first." });
    }

    if (consultation.bookingStatus === "cancelled") {
      return res.status(403).json({ success: false, message: "This consultation has been cancelled." });
    }

    // Time window: allow joining 15 minutes before, up to 1 hour after scheduled time
    const [hour, minute] = consultation.appointmentTime.replace(/(AM|PM)/i, "").trim().split(":").map(Number);
    const isPM = consultation.appointmentTime.toLowerCase().includes("pm");
    const apptHour = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;

    const apptDate = new Date(consultation.appointmentDate);
    apptDate.setHours(apptHour, minute || 0, 0, 0);

    const now = new Date();
    const earlyWindowMs = 15 * 60 * 1000; // 15 min before
    const lateWindowMs = 60 * 60 * 1000;  // 60 min after

    const canJoin = now >= new Date(apptDate - earlyWindowMs) && now <= new Date(apptDate.getTime() + lateWindowMs);

    if (!canJoin) {
      return res.status(403).json({
        success: false,
        message: `Meeting link is only accessible from 15 minutes before your scheduled time. Your appointment is on ${consultation.appointmentDate} at ${consultation.appointmentTime}.`,
        appointmentDate: consultation.appointmentDate,
        appointmentTime: consultation.appointmentTime,
      });
    }

    // Mark as ongoing if not already
    if (consultation.bookingStatus === "scheduled") {
      consultation.bookingStatus = "ongoing";
      await consultation.save();
    }

    res.status(200).json({
      success: true,
      message: "Access granted. Joining consultation.",
      data: {
        meetingLink: consultation.meetingLink,
        meetingProvider: consultation.meetingProvider,
        bookingPassId: consultation.bookingPassId,
        appointmentDate: consultation.appointmentDate,
        appointmentTime: consultation.appointmentTime,
        doctorName: consultation.doctor.name,
        patientName: consultation.patient.name,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Join request failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// PATCH /api/v1/video-consult/:id/complete
// Marks consultation as completed (doctor only)
// ─────────────────────────────────────────────────
export const completeConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await VideoConsultation.findById(id);
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    if (consultation.doctor.toString() !== req.userId && req.role !== "admin") {
      return res.status(401).json({ success: false, message: "Only the doctor can complete this consultation" });
    }

    consultation.bookingStatus = "completed";
    await consultation.save();

    res.status(200).json({ success: true, message: "Consultation marked as completed", data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/:id/rate
// Patient submits a rating + review after the call
// ─────────────────────────────────────────────────
export const rateConsultation = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;

  try {
    const consultation = await VideoConsultation.findById(id);
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    if (consultation.patient.toString() !== req.userId) {
      return res.status(401).json({ success: false, message: "Only the patient can rate this consultation" });
    }

    if (consultation.bookingStatus !== "completed") {
      return res.status(403).json({ success: false, message: "You can only rate after the consultation is completed" });
    }

    consultation.rating = rating;
    consultation.review = review;
    await consultation.save();

    res.status(200).json({ success: true, message: "Thank you for your feedback!", data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Rating failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// DELETE /api/v1/video-consult/:id/cancel
// Cancel a scheduled consultation (before payment or by patient)
// ─────────────────────────────────────────────────
export const cancelVideoConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await VideoConsultation.findById(id);
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    if (consultation.patient.toString() !== req.userId && req.role !== "admin") {
      return res.status(401).json({ success: false, message: "Only the patient can cancel their booking" });
    }

    if (consultation.bookingStatus === "completed") {
      return res.status(403).json({ success: false, message: "Cannot cancel a completed consultation" });
    }

    consultation.bookingStatus = "cancelled";
    consultation.paymentStatus = consultation.paymentStatus === "paid" ? "failed" : consultation.paymentStatus;
    await consultation.save();

    res.status(200).json({ success: true, message: "Consultation cancelled successfully", data: consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Cancellation failed: " + error.message });
  }
};
// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/:id/prescription
// Doctor issues digital prescription after call
// ─────────────────────────────────────────────────
export const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { diagnosis, medicines, advice } = req.body;
  const userId = req.userId;

  try {
    const consultation = await VideoConsultation.findById(id).populate("doctor", "name photo");
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    const isDoctor = consultation.doctor._id.toString() === userId;
    if (!isDoctor && req.role !== "admin") {
      return res.status(401).json({ success: false, message: "Only the doctor can issue a prescription" });
    }

    consultation.prescriptionDetails = {
      diagnosis,
      medicines,
      advice,
      issuedAt: new Date()
    };
    
    // Auto complete if not done
    if (consultation.bookingStatus !== "completed") {
      consultation.bookingStatus = "completed";
    }

    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Prescription issued successfully!",
      data: consultation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Prescription update failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/:id/chat
// Send a message in the 24-Hour Secure Chat
// ─────────────────────────────────────────────────
export const sendChatMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const userId = req.userId;
  const io = req.app.get("io");

  try {
    const consultation = await VideoConsultation.findById(id).populate("doctor patient");
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    // Ensure within 24 hours of completed time
    const completedAt = consultation.updatedAt; // rough proxy for completion time
    const now = new Date();
    const isWithin24Hrs = (now - completedAt) < 24 * 60 * 60 * 1000;

    if (consultation.bookingStatus !== "completed" || !isWithin24Hrs) {
       return res.status(403).json({ success: false, message: "Chat is only available for 24 hours after completion." });
    }

    const isPatient = consultation.patient._id.toString() === userId;
    const isDoctor = consultation.doctor._id.toString() === userId;
    
    if (!isPatient && !isDoctor) return res.status(401).json({ success: false, message: "Unauthorized access" });

    const chatMsg = {
      senderName: isPatient ? consultation.patient.name : consultation.doctor.name,
      senderRole: isPatient ? "patient" : "doctor",
      message
    };

    consultation.chatMessages.push(chatMsg);
    await consultation.save();

    // Emit live to the other party
    if (io) {
      const recipientId = isPatient ? consultation.doctor._id.toString() : consultation.patient._id.toString();
      io.to(recipientId).emit("NEW_CONSULT_MESSAGE", { consultationId: id, chatMsg });
    }

    res.status(200).json({ success: true, data: chatMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Message failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// GET /api/v1/video-consult/:id/chat
// Fetch messages for the 24-Hour Secure Chat
// ─────────────────────────────────────────────────
export const getChatMessages = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const consultation = await VideoConsultation.findById(id);
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });

    const isPatient = consultation.patient.toString() === userId;
    const isDoctor = consultation.doctor.toString() === userId;
    if (!isPatient && !isDoctor) return res.status(401).json({ success: false, message: "Unauthorized access" });

    res.status(200).json({ success: true, data: consultation.chatMessages || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load chat: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/:id/pharmacy-order
// 1-Click Order Medicines functionality
// ─────────────────────────────────────────────────
export const placePharmacyOrder = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  const userId = req.userId;

  try {
    const consultation = await VideoConsultation.findById(id);
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });
    if (consultation.patient.toString() !== userId) return res.status(401).json({ success: false, message: "Unauthorized access" });

    if (!consultation.prescriptionDetails || !consultation.prescriptionDetails.medicines?.length) {
      return res.status(400).json({ success: false, message: "No medicines found in prescription to order." });
    }

    consultation.pharmacyOrder = {
      status: 'ordered',
      address,
      amount: 450, // Mock fixed price, logic would calculate based on meds
      orderedAt: new Date()
    };

    await consultation.save();

    res.status(200).json({ success: true, message: "Medicines ordered successfully! Delivery ETA: 24 Hours.", data: consultation.pharmacyOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order failed: " + error.message });
  }
};

// ─────────────────────────────────────────────────
// POST /api/v1/video-consult/:id/reminders
// Enable automated WhatsApp medication reminders
// ─────────────────────────────────────────────────
export const toggleReminders = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const consultation = await VideoConsultation.findById(id).populate("patient");
    if (!consultation) return res.status(404).json({ success: false, message: "Consultation not found" });
    if (consultation.patient._id.toString() !== userId) return res.status(401).json({ success: false, message: "Unauthorized access" });

    consultation.remindersEnabled = !consultation.remindersEnabled;
    await consultation.save();

    // Mock firing the first reminder hook in background
    if (consultation.remindersEnabled) {
      console.log(`[Mock WhatsApp API] Set up medication schedule for ${consultation.patient.phone} based on ${consultation.prescriptionDetails?.medicines?.length || 0} prescribed items.`);
    }

    res.status(200).json({ success: true, message: `Reminders ${consultation.remindersEnabled ? 'enabled' : 'disabled'} successfully!`, status: consultation.remindersEnabled });
  } catch (error) {
    res.status(500).json({ success: false, message: "Toggle failed: " + error.message });
  }
};
