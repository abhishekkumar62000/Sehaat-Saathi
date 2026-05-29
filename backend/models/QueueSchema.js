import mongoose from "mongoose";

const queueSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    date: {
      type: String,
      required: true,
    },
    activePatients: [
      {
        booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
        tokenNumber: { type: Number },
        status: { 
          type: String, 
          enum: ["waiting", "in_consultation", "completed", "skipped"],
          default: "waiting" 
        }
      }
    ],
    currentServing: {
      type: Number,
      default: 0
    },
    totalPatients: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Ensure unique queue per doctor per date
queueSchema.index({ doctor: 1, date: 1 }, { unique: true });

export default mongoose.model("Queue", queueSchema);
