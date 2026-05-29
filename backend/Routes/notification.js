import express from "express";
import { getNotifications, markAsRead } from "../Controllers/notificationController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/", authenticate, getNotifications);
router.patch("/:id/read", authenticate, markAsRead);

export default router;
