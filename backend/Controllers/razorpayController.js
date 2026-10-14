import Razorpay from "razorpay";
import crypto from "crypto";
import Appointment from "../models/Appointment.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Hospital from "../models/HospitalSchema.js";

// Initialize Razorpay instance lazily with environment credentials
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) not configured in environment variables");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

/**
 * STEP 1: Create Razorpay Order
 * POST /api/v1/payment/create-order
 * Request: { amount (in Rupees or Paise), currency, receipt, doctorId, notes }
 * Minimum amount: 100 paise (₹1)
 */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, doctorId, notes = {} } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Valid consultation amount is required",
      });
    }

    // Convert amount to paise (if given in rupees e.g. 500 -> 50000 paise)
    // If amount is >= 100 and likely already in rupees, convert to paise:
    const amountInRupees = Number(amount);
    const amountInPaise = Math.round(amountInRupees * 100);

    if (amountInPaise < 100) {
      return res.status(400).json({
        success: false,
        message: "Amount must be at least 100 paise (₹1.00)",
      });
    }

    const razorpay = getRazorpayInstance();

    const orderOptions = {
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        userId: req.userId || "guest_user",
        doctorId: doctorId || "general_opd",
        platform: "Sehaat Saathi App Healthcare",
        ...notes,
      },
    };

    console.log("Creating Razorpay Order with options:", orderOptions);
    const order = await razorpay.orders.create(orderOptions);

    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);

    if (error.statusCode === 401 || error.error?.code === "BAD_REQUEST_ERROR") {
      return res.status(401).json({
        success: false,
        message: "Razorpay Authentication/Configuration Failure: " + (error.error?.description || error.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
};

/**
 * STEP 2: Verify Razorpay Payment Signature
 * POST /api/v1/payment/verify-payment
 * Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 * Request: { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId, bookingId }
 */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
      bookingId,
    } = req.body;

    // Validate presence of required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment verification fields: razorpay_order_id, razorpay_payment_id, razorpay_signature",
      });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return res.status(500).json({
        success: false,
        message: "RAZORPAY_KEY_SECRET not configured on server",
      });
    }

    // Generate expected signature: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(payload)
      .digest("hex");

    console.log("Verifying Razorpay Signature for payment:", razorpay_payment_id);

    // Constant-time comparison or direct equality check
    const isSignatureValid = generatedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.error("❌ Razorpay Signature Mismatch!");
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }

    console.log("✅ Razorpay Signature Verified Successfully!");

    // If appointmentId is provided, mark appointment as paid
    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        paymentStatus: "paid",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paymentMethod: "online",
      });
    }

    // If bookingId is provided, mark booking as paid
    if (bookingId) {
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: "approved",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      paymentStatus: "paid",
    });
  } catch (error) {
    console.error("Razorpay Payment Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to verify Razorpay payment",
    });
  }
};
