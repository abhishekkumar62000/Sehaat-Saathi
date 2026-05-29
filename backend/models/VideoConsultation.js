import mongoose from "mongoose";

const videoConsultationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientName: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    meetingLink: { type: String, default: null },
    meetingProvider: {
      type: String,
      enum: ["google", "zoom", "whatsapp"],
      required: true,
    },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    duration: { type: String, default: "20 min" },
    symptoms: { type: String },
    
    // For Family Bookings
    familyMember: {
      forWhom: { type: String, default: "myself" },
      name: { type: String },
      age: { type: String },
      gender: { type: String }
    },

    // Extended Patient Context
    metadata: {
      age: { type: String },
      gender: { type: String },
      knownConditions: { type: String },
      currentMedicines: { type: String }
    },

    // 🤖 AI Triage Summary
    aiSummary: { type: String },

    // 📈 Live Vitals Tracking
    vitals: {
      bloodPressure: { type: String },
      sugarLevel: { type: String },
      temperature: { type: String },
      weight: { type: String }
    },

    // Clinical Data
    prescriptionDetails: {
      diagnosis: { type: String },
      medicines: [
        {
          name: { type: String },
          dosage: { type: String },
          frequency: { type: String },
          duration: { type: String }
        }
      ],
      advice: { type: String },
      issuedAt: { type: Date }
    },

    // 📂 Health Vault Attachments
    attachments: [
      {
        url: { type: String },
        name: { type: String },
        fileType: { type: String },
      }
    ],

    // 💬 24-Hour Post-Consultation Secure Chat
    chatMessages: [
      {
        senderName: { type: String },
        senderRole: { type: String, enum: ['patient', 'doctor'] },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ],

    // 📦 E-Pharmacy Integration
    pharmacyOrder: {
      status: { type: String, enum: ['none', 'ordered', 'shipped', 'delivered'], default: 'none' },
      address: { type: String },
      amount: { type: Number },
      orderedAt: { type: Date }
    },

    // ⏰ Automated WhatsApp Reminders
    remindersEnabled: { type: Boolean, default: false },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
    bookingPassId: {
      type: String,
      unique: true,
      required: true,
    },
    prescriptionUrl: { type: String, default: null },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
    rating: { type: Number, min: 1, max: 5, default: null },
    review: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("VideoConsultation", videoConsultationSchema);
