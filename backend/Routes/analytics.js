import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getDoctorAnalytics, broadcastDoctorDelay } from "../Controllers/analyticsController.js";

const router = express.Router();

router.get("/doctor", authenticate, getDoctorAnalytics);

// POST /api/v1/analytics/doctor/delay-broadcast
// Authenticated doctor broadcasts a delay notice to all pending/confirmed patients
router.post("/doctor/delay-broadcast", authenticate, broadcastDoctorDelay);

export default router;
