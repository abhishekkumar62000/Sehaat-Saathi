import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientModel",
      required: true,
    },
    recipientModel: {
      type: String,
      required: true,
      enum: ["User", "Doctor"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      enum: ["User", "Doctor"],
    },
    message: {
      type: String,
      required: true,
    },
    actionType: {
      type: String,
      enum: ["NEW_BOOKING", "BOOKING_ACCEPTED", "BOOKING_REJECTED", "AUTO_CANCELLED", "PAYMENT_SUCCESS", "GENERAL"],
      default: "GENERAL",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
