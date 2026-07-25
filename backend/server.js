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
import healthCopilotRoute from "./Routes/healthCopilot.js";
import notificationRoute from "./Routes/notification.js";
import adminRoute from "./Routes/admin.js";
import appointmentRoute from "./Routes/appointment.js";
import videoConsultRoute from "./Routes/videoConsultation.js";

import hospitalRoute from "./Routes/hospital.js";
import http from "http";
import initSocket from "./socket/socketHandler.js";
import initExpiryJob from "./jobs/expiryJob.js";

console.log("Starting server implementation...");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

// Initialize Neural Socket Flux
const io = initSocket(server);
app.set("io", io); // Make io available in controllers

// Initialize 10-Minute Expiry Guardian
initExpiryJob(io);

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.get("/", (req, res) => {
  res.status(200).json({ status: "online", message: "Sehaat Saathi API is active and running ✅" });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({ status: "online", message: "Sehaat Saathi API v1 is active and running ✅" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", mongoState: mongoose.connection.readyState });
});

// database connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected successfully ✅");
  } catch (err) {
    console.error("MongoDB connection fail ❌:", err.message);
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
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/hospitals", hospitalRoute);
app.use("/api/v1/ai-doctor", aiDoctorRoute);
app.use("/api/v1/health-copilot", healthCopilotRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/appointments", appointmentRoute);
app.use("/api/v1/video-consult", videoConsultRoute);

server.listen(port, () => {
  console.log("\n==========================================");
  console.log("🚀 Neural Server Pulse Sync on port: " + port);
  console.log("==========================================");
  connectDB();
});
