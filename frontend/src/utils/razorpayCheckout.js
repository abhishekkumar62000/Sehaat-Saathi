import { BASE_URL, token } from "../config";
import { toast } from "react-toastify";

/**
 * Loads Razorpay script dynamically if not already available on window.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay Standard Web Checkout.
 * 
 * @param {Object} params
 * @param {number} params.amount - Consultation fee in Rupees (e.g. 500)
 * @param {string} params.doctorId - Doctor or Hospital ID
 * @param {string} params.doctorName - Doctor or Hospital Name
 * @param {string} params.patientName - Patient Full Name
 * @param {string} [params.patientEmail] - Patient Email for receipt
 * @param {string} [params.patientPhone] - Patient 10-digit Phone
 * @param {Object} [params.notes] - Additional metadata notes
 * @param {Function} params.onSuccess - Callback on verified payment (paymentDetails, verifyResponse)
 * @param {Function} [params.onError] - Callback on payment failure or dismissal
 * @param {Function} [params.onDismiss] - Callback when user closes Razorpay modal
 */
export const initiateRazorpayCheckout = async ({
  amount,
  doctorId,
  doctorName = "Doctor Consultation",
  patientName = "Patient",
  patientEmail = "",
  patientPhone = "",
  notes = {},
  onSuccess,
  onError,
  onDismiss,
}) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || !window.Razorpay) {
      const err = new Error("Razorpay SDK failed to load. Please check your internet connection.");
      toast.error(err.message);
      if (onError) onError(err);
      return;
    }

    const authToken = token || localStorage.getItem("token");
    if (!authToken) {
      toast.error("Please login to complete your payment");
      if (onError) onError(new Error("Authentication required"));
      return;
    }

    // 1. Call Backend to create Razorpay Order
    console.log("Initiating order creation for amount ₹", amount);
    const orderRes = await fetch(`${BASE_URL}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        doctorId,
        notes: {
          doctorName,
          patientName,
          ...notes,
        },
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok || !orderData.success) {
      throw new Error(orderData.message || "Failed to create payment order on server");
    }

    const keyId = orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;

    // 2. Open Razorpay Standard Checkout Modal
    const options = {
      key: keyId,
      amount: orderData.amount, // in paise
      currency: orderData.currency || "INR",
      name: "Sehaat Saathi App Healthcare",
      description: `Consultation Booking: ${doctorName}`,
      image: "https://sehaatsaathi.com/logo.png",
      order_id: orderData.order_id,
      handler: async function (response) {
        // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
        try {
          toast.info("Verifying payment security signature...");

          // 3. Send all three values to Backend for HMAC-SHA256 signature verification
          const verifyRes = await fetch(`${BASE_URL}/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok || !verifyData.success) {
            throw new Error(verifyData.message || "Signature verification failed on server");
          }

          toast.success("💳 Payment verified successfully via Razorpay!");
          if (onSuccess) {
            onSuccess(response, verifyData);
          }
        } catch (verifyErr) {
          console.error("Payment verification failed:", verifyErr);
          toast.error(verifyErr.message || "Payment verification failed");
          if (onError) onError(verifyErr);
        }
      },
      prefill: {
        name: patientName,
        email: patientEmail || "patient@sehaatsaathi.com",
        contact: patientPhone || "",
      },
      notes: {
        platform: "Sehaat Saathi App",
        doctorName,
        patientName,
      },
      theme: {
        color: "#16a34a", // Sehaat Saathi App emerald brand green
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay Checkout Modal dismissed by user");
          toast.info("Payment window was closed");
          if (onDismiss) onDismiss();
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Razorpay Payment Failed:", response.error);
      const errMsg = response.error?.description || "Payment failed. Please try again.";
      toast.error(`❌ Payment Failed: ${errMsg}`);
      if (onError) onError(new Error(errMsg));
    });

    rzp.open();
  } catch (err) {
    console.error("Razorpay Checkout Error:", err);
    toast.error(err.message || "Unable to open payment gateway");
    if (onError) onError(err);
  }
};
