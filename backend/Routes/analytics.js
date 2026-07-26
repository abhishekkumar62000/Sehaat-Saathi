import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getDoctorAnalytics } from "../Controllers/analyticsController.js";

const router = express.Router();

router.get("/doctor", authenticate, getDoctorAnalytics);

export default router;
