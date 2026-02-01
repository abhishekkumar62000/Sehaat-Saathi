import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import bookingRoute from "./Routes/booking.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import userRoute from "./Routes/user.js";

console.log("Starting server implementation...");
dotenv.config();
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

app.listen(port, () => {
  console.log("Server listening on port " + port);
  connectDB();
});
