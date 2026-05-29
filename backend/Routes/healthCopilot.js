import express from "express";
import { 
    updateProfile, 
    logVitals, 
    getHealthDashboard, 
    getAIAdvice 
} from "../Controllers/healthCopilotController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.put("/update-profile", authenticate, restrict(["patient"]), updateProfile);
router.post("/log-vitals", authenticate, restrict(["patient"]), logVitals);
router.get("/stats", authenticate, restrict(["patient"]), getHealthDashboard);
router.get("/advice", authenticate, restrict(["patient"]), getAIAdvice);

export default router;
