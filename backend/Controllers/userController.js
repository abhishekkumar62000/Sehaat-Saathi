import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";
import Activity from "../models/ActivitySchema.js";

// update_single_User controller
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated user",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to update user" });
  }
};

// delete_single_User controller
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted user",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to delete user" });
  }
};

// get_single_User controller
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got a user",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

// get_all_Users controller
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got all users",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Users not found" });
  }
};

// get_User_Profile controller
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// get_My_Appointment controller
export const getMyAppointment = async (req, res) => {
  try {
    // 1. Fetch bookings for the current user
    const bookings = await Booking.find({ user: req.userId }).populate('doctor').populate('user');

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// record_activity controller
export const recordActivity = async (req, res) => {
  const { featureName, action, path } = req.body;
  const userId = req.userId;

  try {
    const newActivity = new Activity({
      userId,
      userModel: "User",
      featureName,
      action,
      path,
    });

    await newActivity.save();

    res.status(200).json({
      success: true,
      message: "Activity recorded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to record activity" });
  }
};

// get_activity_history controller
export const getActivityHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const activities = await Activity.find({ 
      userId, 
      userModel: "User" 
    }).sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      message: "Activity history retrieved",
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch activity history" });
  }
};

// clear_activity_history controller
export const clearActivityHistory = async (req, res) => {
  const userId = req.userId;

  try {
    await Activity.deleteMany({ userId });
    res.status(200).json({ success: true, message: "Activity history cleared successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear activity history" });
  }
};
