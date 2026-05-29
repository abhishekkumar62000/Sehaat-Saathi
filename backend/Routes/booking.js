import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, updateBookingStatus, createOfflineBooking, getAvailableSlots, acceptBooking, rejectBooking, patientCancelBooking, deleteBooking } from "../Controllers/bookingController.js";
import { generateSymptomSummary } from "../Controllers/aiController.js";

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
router.patch("/:bookingId/status", authenticate, updateBookingStatus);
router.post("/:bookingId/ai-summary", authenticate, generateSymptomSummary);

// Offline Consultation Routes
router.post("/create", authenticate, createOfflineBooking);
router.get("/available-slots/:doctorId", authenticate, getAvailableSlots);
router.put("/:id/accept", authenticate, acceptBooking);
router.put("/:id/reject", authenticate, rejectBooking);
router.put("/:id/cancel", authenticate, patientCancelBooking);

export default router;
