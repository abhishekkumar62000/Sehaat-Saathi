import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userModel",
    required: true,
  },
  userModel: {
    type: String,
    required: true,
    enum: ["User", "Doctor", "Hospital"],
  },
  featureName: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    default: "Used",
  },
  path: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Activity", ActivitySchema);
