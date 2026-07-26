import express from "express";
import {
  deleteDoctor,
  getAllDoctor,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
  recordActivity,
  getActivityHistory,
  getRecommendedDoctors,
  updateDoctorAvailability
} from "../Controllers/doctorController.js";
import { updateBookingStatus } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/profile/me", authenticate, restrict(["doctor", "hospital"]), getDoctorProfile);
router.put("/availability/me", authenticate, restrict(["doctor"]), updateDoctorAvailability);
router.get("/recommendations", getRecommendedDoctors);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor", "hospital"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor", "hospital"]), deleteDoctor);

// Booking and Activity
router.patch("/booking/:id/status", authenticate, restrict(["doctor", "hospital"]), updateBookingStatus);
router.post("/activity/record", authenticate, restrict(["doctor", "hospital"]), recordActivity);
router.get("/activity/history", authenticate, restrict(["doctor", "hospital"]), getActivityHistory);

export default router;
