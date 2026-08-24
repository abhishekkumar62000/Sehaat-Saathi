import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

import User from "../models/UserSchema.js";
import Hospital from "../models/HospitalSchema.js";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");

  const email = "abhihospital@gmail.com";
  const password = "123456";

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    console.log("User already exists, deleting first to recreate cleanly...");
    await User.deleteOne({ email });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  user = new User({
    name: "Abhi Hospital",
    email,
    password: hashedPassword,
    role: "hospital",
    phone: 9999999999
  });
  await user.save();
  console.log(`User created with _id: ${user._id}`);

  // Check if hospital document exists
  let hosp = await Hospital.findOne({ email });
  if (hosp) {
    console.log("Hospital document already exists, deleting first...");
    await Hospital.deleteOne({ email });
  }

  // Create hospital profile document matching user's image attributes
  hosp = new Hospital({
    user: user._id,
    hospitalName: "Abhi Hospital",
    tagline: "Super Speciality Hospital in Madhubani",
    email,
    contactNumber: "+91 9999999999",
    emergencyNumber: "+91 108",
    district: "Madhubani",
    city: "Madhubani",
    address: "Madhubani Central Bypass, Madhubani, Bihar",
    totalBeds: 165,
    availableBeds: 73,
    icuBeds: 25,
    ventilators: 12,
    consultationFee: 500,
    isLive: true,
    photo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    workingHours: "09:00 AM – 08:00 PM",
    specializations: ["Multi-Specialty", "Cardiology", "Orthopedics"],
    departments: ["Emergency & Trauma", "Cardiology", "Orthopedics", "General Surgery"],
    facilities: ["Emergency", "Outpatient Department (OPD)", "ICU / Critical Care", "Pharmacy", "Diagnostics"],
    weeklySchedule: [
      { day: "Monday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Tuesday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Wednesday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Thursday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Friday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Saturday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 },
      { day: "Sunday", isAvailable: true, startTime: "09:00 AM", endTime: "08:00 PM", slotDuration: 30 }
    ],
    doctorRoster: [
      {
        name: "Dr. Abhinav Kumar",
        specialization: "Cardiology",
        qualification: "MD, DM (Cardiology)",
        experience: "15 Years",
        opdDays: "Mon-Sun",
        opdTime: "09:00 AM - 01:00 PM",
        fee: 500,
        isAvailable: true
      },
      {
        name: "Dr. S. K. Yadav",
        specialization: "Orthopedics",
        qualification: "MS (Ortho)",
        experience: "12 Years",
        opdDays: "Mon-Sat",
        opdTime: "02:00 PM - 08:00 PM",
        fee: 400,
        isAvailable: true
      }
    ]
  });

  await hosp.save();
  console.log(`Hospital document created with _id: ${hosp._id}`);

  await mongoose.disconnect();
  console.log("DB disconnected successfully");
};

run();
