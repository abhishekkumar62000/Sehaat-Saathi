import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    totalBeds: {
      type: Number,
      default: 0,
    },
    departments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
