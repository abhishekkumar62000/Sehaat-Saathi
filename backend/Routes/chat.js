import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { sendMessage, getConversation, getChatContacts } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/send", authenticate, sendMessage);
router.get("/conversation/:otherId", authenticate, getConversation);
router.get("/contacts", authenticate, getChatContacts);

export default router;
