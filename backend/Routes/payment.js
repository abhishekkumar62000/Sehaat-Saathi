import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../Controllers/razorpayController.js";

const router = express.Router();

// Razorpay Order Creation: POST /api/v1/payment/create-order
router.post("/create-order", authenticate, createRazorpayOrder);

// Razorpay Payment Signature Verification: POST /api/v1/payment/verify-payment
router.post("/verify-payment", authenticate, verifyRazorpayPayment);

export default router;
