import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../Controllers/appointmentController.js";

const router = express.Router();

router.post("/book", authenticate, bookAppointment);
router.get("/doctor", authenticate, getDoctorAppointments);
router.get("/patient", authenticate, getPatientAppointments);
router.patch("/:id/status", authenticate, updateAppointmentStatus);
router.delete("/:id", authenticate, deleteAppointment);

export default router;
