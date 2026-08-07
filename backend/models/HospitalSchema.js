import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    hospitalName: { type: String, required: true },
    tagline: { type: String },
    photo: { type: String },
    district: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String, default: "Bihar" },
    pincode: { type: String },
    contactNumber: { type: String, required: true },
    emergencyNumber: { type: String },
    email: { type: String },
    website: { type: String },
    registrationNumber: { type: String },
    establishedYear: { type: Number },
    hospitalType: {
      type: String,
      enum: ["Government", "Private", "Trust/NGO", "CGHS Empanelled", "AYUSH"],
      default: "Private",
    },
    totalBeds: { type: Number, default: 0 },
    availableBeds: { type: Number, default: 0 },
    icuBeds: { type: Number, default: 0 },
    ventilators: { type: Number, default: 0 },
    bedLastUpdated: { type: Date, default: Date.now },
    capacityDetails: {
      generalWard: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      icu: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      oxygenBeds: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      ventilators: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      operationTheatres: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      nicuPicu: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } },
      emergencyBeds: { enabled: { type: Boolean, default: true }, total: { type: Number, default: 0 }, available: { type: Number, default: 0 } }
    },
    bloodBank: {
      isAvailable: { type: Boolean, default: false },
      lastUpdated: { type: Date, default: Date.now },
      inventory: {
        "A+":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "A-":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "B+":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "B-":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "O+":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "O-":  { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "AB+": { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
        "AB-": { units: { type: Number, default: 0 }, critical: { type: Boolean, default: false } },
      }
    },
    departments: [{ type: String }],
    specializations: [{ type: String }],
    facilities: [{ type: String }],
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
    verified: { type: Boolean, default: false },
    isLive: { type: Boolean, default: false },
    acceptsAyushmanBharat: { type: Boolean, default: false },
    acceptsEmergency: { type: Boolean, default: true },
    bio: { type: String },
    workingHours: { type: String },
    averageRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    consultationFee: { type: Number, default: 0 },
    doctorRoster: [
      {
        name: { type: String },
        specialization: { type: String },
        qualification: { type: String },
        experience: { type: String },
        opdDays: { type: String },
        opdTime: { type: String },
        fee: { type: Number },
        isAvailable: { type: Boolean, default: true },
        photo: { type: String }
      }
    ],
    insurancePartners: [{ type: String }],
    accreditations: [{ type: String }],
    galleryPhotos: [{ type: String }],
    maxPatientsPerDay: { type: Number, default: 50 },
    unavailabilityDates: [{ type: String }],
    weeklySchedule: [
      {
        day: { type: String },
        isAvailable: { type: Boolean, default: true },
        startTime: { type: String, default: "09:00 AM" },
        endTime: { type: String, default: "05:00 PM" },
        slotDuration: { type: Number, default: 30 }
      }
    ],
    ambulanceFleet: {
      total: { type: Number, default: 0 },
      blsCount: { type: Number, default: 0 },
      alsCount: { type: Number, default: 0 },
      hotline: { type: String }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
