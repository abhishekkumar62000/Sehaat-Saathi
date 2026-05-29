import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "pending", 
        "REQUESTED", 
        "DOCTOR_REVIEW", 
        "confirmed", 
        "RESCHEDULE_REQUESTED", 
        "rejected", 
        "cancelled", 
        "PATIENT_ARRIVED", 
        "CONSULTATION_STARTED", 
        "completed", 
        "FOLLOWUP_PENDING", 
        "no_show", 
        "auto_cancelled"
      ],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    appointmentDate: { type: String },
    appointmentTime: { type: String },
    statusMessage: { type: String },
    patientName: { type: String, default: "Self / User" },
    symptoms: { type: String },
    
    // Offline Booking Specific Fields
    bookingMode: { type: String, enum: ["online", "offline"], default: "online" },
    consultationType: { type: String, enum: ["First Visit", "Follow-up", "Emergency"], default: "First Visit" },
    paymentMethod: { type: String, enum: ["Online Payment", "Pay at Hospital"], default: "Online Payment" },
    qrCode: { type: String },
    tokenNumber: { type: String },
    patientReports: [{ type: String }],
    delayedMinutes: { type: Number, default: 0 },
    
    // Version 2: Advanced Features
    queueNumber: { type: Number },
    rescheduleSuggestion: {
      date: { type: String },
      time: { type: String },
      reason: { type: String }
    },
    aiSummary: { type: String },
    preConsultationDetails: {
      symptoms: { type: String },
      duration: { type: String },
      previousIllness: { type: String },
      files: [{ type: String }]
    },
    journeyTimeline: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        message: { type: String }
      }
    ],
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital"
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "doctor",
    select: "name",
  });

  next();
});

export default mongoose.model("Booking", bookingSchema);
