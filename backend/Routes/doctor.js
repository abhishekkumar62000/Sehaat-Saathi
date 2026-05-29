import express from "express";
import {
  deleteDoctor,
  getAllDoctor,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
  recordActivity,
  getActivityHistory,
  getRecommendedDoctors
} from "../Controllers/doctorController.js";
import { updateBookingStatus } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/recommendations", getRecommendedDoctors);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor", "hospital"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor", "hospital"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor", "hospital"]), getDoctorProfile);

// Booking and Activity
router.patch("/booking/:id/status", authenticate, restrict(["doctor", "hospital"]), updateBookingStatus);
router.post("/activity/record", authenticate, restrict(["doctor", "hospital"]), recordActivity);
router.get("/activity/history", authenticate, restrict(["doctor", "hospital"]), getActivityHistory);

export default router;
