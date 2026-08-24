import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
      required: true,
    },
    senderModel: {
      type: String,
      enum: ["User", "Doctor", "Hospital"],
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientModel",
      required: true,
    },
    recipientModel: {
      type: String,
      enum: ["User", "Doctor", "Hospital"],
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    message: {
      type: String,
      default: "",
    },
    attachment: {
      type: String,
      default: "",
    },
    attachmentType: {
      type: String,
      default: "",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
