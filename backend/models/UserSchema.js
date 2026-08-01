import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin", "hospital"],
    default: "patient",
  },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bloodGroup: { type: String },
  dob: { type: Date },
  allergies: { type: String },
  chronicConditions: { type: String },
  emergencyContactName: { type: String },
  emergencyContactPhone: { type: Number },
  city: { type: String },
  pincode: { type: Number },
  
  // Sehaat Saathi Localized Rural Fields
  abhaId: { type: String }, // Ayushman Bharat ID
  bplCardHolder: { type: Boolean, default: false }, // Below Poverty Line
  primaryLanguage: { type: String, enum: ["Hindi", "Bhojpuri", "Maithili", "Magahi", "Angika", "English"] },
  district: { type: String },
  block: { type: String },
  hospitalPreference: { type: String, enum: ["Government", "Private", "Both"], default: "Both" },
  accessibilityNeeds: { type: String }, // E.g., Wheelchair, Hearing Impaired
  
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
