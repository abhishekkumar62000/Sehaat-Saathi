import express from "express";
import { approveDoctor, getPendingDoctors } from "../Controllers/adminController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Route to get all pending doctors
router.get("/doctors/pending", authenticate, restrict(["admin"]), getPendingDoctors);

// Route to approve or reject a doctor
router.put("/doctor/:id/approve", authenticate, restrict(["admin"]), approveDoctor);

export default router;
