import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Hospital from "../models/HospitalSchema.js";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");

  const medanta = await Hospital.findOne({ hospitalName: /Medanta/i });
  console.log("Medanta Hospital full doc:", JSON.stringify(medanta, null, 2));

  await mongoose.disconnect();
};

run();
