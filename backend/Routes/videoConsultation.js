import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  createVideoBooking,
  markPaymentSuccess,
  getMyVideoBookings,
  joinVideoConsultation,
  completeConsultation,
  rateConsultation,
  cancelVideoConsultation,
  updatePrescription,
  sendChatMessage,
  getChatMessages,
  placePharmacyOrder,
  toggleReminders,
} from "../Controllers/videoConsultController.js";

const router = express.Router();

// Create a new video consultation booking (patient only)
router.post("/book", authenticate, restrict(["patient"]), createVideoBooking);

// Confirm payment and activate meeting link
router.post("/payment-success", authenticate, markPaymentSuccess);

// Get all video bookings for the authenticated user (patient or doctor)
router.get("/my-bookings", authenticate, getMyVideoBookings);

// Join a consultation — returns the meeting link (with time window guard)
router.get("/:id/join", authenticate, joinVideoConsultation);

// Mark consultation as completed (doctor only)
router.patch("/:id/complete", authenticate, restrict(["doctor"]), completeConsultation);

// Issue/Update digital prescription (doctor only)
router.post("/:id/prescription", authenticate, restrict(["doctor"]), updatePrescription);

// Rate and review a consultation (patient only)
router.post("/:id/rate", authenticate, restrict(["patient"]), rateConsultation);

// Cancel a consultation
router.delete("/:id/cancel", authenticate, cancelVideoConsultation);

// ─── NEXT-GEN FEATURES ───

// Secure 24-Hour Post Consultation Chat
router.post("/:id/chat", authenticate, sendChatMessage);
router.get("/:id/chat", authenticate, getChatMessages);

// E-Pharmacy Integration (1-Click Order)
router.post("/:id/pharmacy-order", authenticate, restrict(["patient"]), placePharmacyOrder);

// Automated Medication Reminders
router.post("/:id/reminders", authenticate, restrict(["patient"]), toggleReminders);

export default router;
