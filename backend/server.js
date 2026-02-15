import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import bookingRoute from "./Routes/booking.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import userRoute from "./Routes/user.js";
import aiDoctorRoute from "./Routes/aiDoctor.js";

console.log("Starting server implementation...");
console.log("Environment variables loaded.");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URL defined:", !!process.env.MONGODB_URL);

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

// database connection
mongoose.set("strictQuery", false);
mongoose.set("bufferCommands", false); // Disable buffering to get immediate errors when not connected

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    // await mongoose.connect(process.env.LOCAL_DATABASE);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection fail ❌:", err.message);
    console.error("Tip: Check if your IP address is whitelisted in MongoDB Atlas.");
    // On Render, we might want to exit if DB fails to ensure we see the error in logs clearly
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/ai-doctor", aiDoctorRoute);

app.listen(port, async () => {
  console.log("\n==========================================");
  console.log("🚀 Server listening on port: " + port);
  console.log("==========================================");

  // Try to find public IP to help user with whitelisting
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log("\n🔍 REQUIRED ACTION:");
    console.log("Ensure this IP is whitelisted in MongoDB Atlas Access List:");
    console.log(`👉 IP: ${data.ip}`);
    console.log("To fix permanently, whitelist '0.0.0.0/0' in Atlas.");
    console.log("------------------------------------------\n");
  } catch (ipErr) {
    // Silently fail if we can't get the IP
  }

  connectDB();
});
