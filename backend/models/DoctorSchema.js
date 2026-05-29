import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  ticketPrice: { type: Number },
  teleConsultPrice: { type: Number },
  isTeleConsultActive: { type: Boolean, default: true },
  role: { type: String },
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },
  experience: { type: Number, default: 0 },

  bio: { type: String, maxLength: 100 },
  about: { type: String },
  
  // Advanced Availability
  availability: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      startTime: { type: String },
      endTime: { type: String },
      slotDuration: { type: Number, default: 30 } // in minutes
    }
  ],
  
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },

  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled"],
    default: "pending",
  },
  verificationStatus: {
    type: String,
    enum: ["verified", "unverified"],
    default: "unverified",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  
  // Verification Engine (New Requirements)
  hospitalName: { type: String },
  licenseNumber: { type: String },
  verificationDocuments: [{ type: String }],
  
  // Advanced Structured Geolocation & Routing
  location: {
    city: { type: String },
    district: { type: String },
    state: { type: String },
    pincode: { type: String },
    coordinates: {
      lat: { type: Number, default: 25.5941 }, 
      lng: { type: Number, default: 85.1376 }
    }
  },
  
  acceptanceRate: { type: Number, default: 100 },
  consultationCount: { type: Number, default: 0 },
  currentDelayStatus: { type: Number, default: 0 },
});

// Master Prompt Performance Indexing for High-Scalability
DoctorSchema.index({ approvalStatus: 1 });
DoctorSchema.index({ specialization: 1, "location.city": 1 });
DoctorSchema.index({ name: "text", specialization: "text" });

export default mongoose.model("Doctor", DoctorSchema);
