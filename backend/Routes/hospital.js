import express from "express";
import { getHospitalProfile, updateHospitalProfile, getAllHospitals, getHospitalQueue, triggerQueueDelay } from "../Controllers/hospitalController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", getAllHospitals);
router.get("/profile/me", authenticate, restrict(["hospital"]), getHospitalProfile);
router.put("/:id", authenticate, restrict(["hospital"]), updateHospitalProfile);
router.get("/queue", authenticate, restrict(["hospital"]), getHospitalQueue);
router.post("/queue/delay", authenticate, restrict(["hospital"]), triggerQueueDelay);

export default router;
