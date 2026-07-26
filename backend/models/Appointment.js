import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: {
      type: String,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    hospitalName: {
      type: String,
    },
    appointmentType: {
      type: String,
      enum: ["offline", "teleconsult"],
      default: "offline",
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    symptoms: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    ticketPrice: {
      type: Number,
    },
    bookingToken: {
      type: String,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
