import express from "express";
import {
  getHospitalProfile,
  updateHospitalProfile,
  getAllHospitals,
  getHospitalQueue,
  triggerQueueDelay,
  updateBedCount,
  getBloodBankInventory,
  updateBloodBankInventory,
  getTokenQueue,
  callNextToken,
} from "../Controllers/hospitalController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// Review nested route
router.use("/:hospitalId/reviews", reviewRouter);

// Public
router.get("/", getAllHospitals);

// Hospital-protected
router.get("/profile/me",       authenticate, restrict(["hospital"]), getHospitalProfile);
router.put("/:id",              authenticate, restrict(["hospital"]), updateHospitalProfile);

// Live Bed Tracker
router.patch("/beds",           authenticate, restrict(["hospital"]), updateBedCount);

// Blood Bank
router.get("/blood-bank",       authenticate, restrict(["hospital"]), getBloodBankInventory);
router.patch("/blood-bank",     authenticate, restrict(["hospital"]), updateBloodBankInventory);

// Smart OPD Token Queue
router.get("/token-queue",      authenticate, restrict(["hospital"]), getTokenQueue);
router.post("/token-queue/call",authenticate, restrict(["hospital"]), callNextToken);

// Legacy Queue
router.get("/queue",            authenticate, restrict(["hospital"]), getHospitalQueue);
router.post("/queue/delay",     authenticate, restrict(["hospital"]), triggerQueueDelay);

export default router;
