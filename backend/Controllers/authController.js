import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import mongoose from "mongoose";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "365d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: false,
      message: "Database not connected ❌. Please check if your IP is whitelisted in MongoDB Atlas."
    });
  }

  try {
    let user = null;

    if (role == "patient") {
      user = await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role == "hospital") {
      user = await User.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role == "patient" || role == "hospital") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        role,
        gender,
      });
    }

    if (role == "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        role,
        gender,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ status: true, message: "User successfully created" });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }
    res.status(500).json({ status: false, message: "User created fail: " + error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  // Check if database is connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: false,
      message: "Database not connected ❌. Please check if your IP is whitelisted in MongoDB Atlas."
    });
  }

  try {
    let user = null;

    if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "patient" || role === "hospital") {
      user = await User.findOne({ email });
    } else {
      // Fallback for older or undefined role requests
      const patient = await User.findOne({ email });
      const doctor = await Doctor.findOne({ email });

      if (patient) {
        user = patient;
      } else if (doctor) {
        user = doctor;
      }
    }

    //check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    let isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Fallback for older plain-text passwords in the DB
    if (!isPasswordMatch && req.body.password === user.password) {
      isPasswordMatch = true;
      
      // Auto-migrate: hash the plain text password and save it
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        console.log(`Auto-migrated password for ${user.email} to bcrypt hash.`);
      } catch (err) {
        console.error("Failed to auto-migrate password", err);
      }
    }

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);

    const { password: userPassword, role: userRole, appointments, ...rest } = user._doc;
    return res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role: userRole,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: false, message: "Failed to login: " + error.message });
  }
};
