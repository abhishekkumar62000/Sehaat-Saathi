import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Hospital from "../models/HospitalSchema.js";
import User from "../models/UserSchema.js";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to DB");

  const medanta = await Hospital.findOne({ email: "medantahospital@gmail.com" });
  if (medanta) {
    medanta.hospitalName = "Medanta Hospital";
    medanta.photo = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    medanta.isLive = true;
    medanta.district = "Madhubani";
    medanta.city = "Madhubani";
    await medanta.save();
    console.log("Medanta Hospital updated successfully!");
  } else {
    console.log("Medanta Hospital not found!");
  }

  const abhi = await Hospital.findOne({ email: "abhihospital@gmail.com" });
  if (abhi) {
    abhi.hospitalName = "Abhi Hospital";
    abhi.isLive = true;
    abhi.district = "Madhubani";
    abhi.city = "Madhubani";
    await abhi.save();
    console.log("Abhi Hospital updated successfully!");
  }

  await mongoose.disconnect();
};

run();
