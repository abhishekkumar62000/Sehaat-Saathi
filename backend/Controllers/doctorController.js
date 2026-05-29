import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Notification from "../models/NotificationSchema.js";
import Activity from "../models/ActivitySchema.js";
import { calculateDistance, mapSymptomsToSpecialization } from "../utils/matchingUtils.js";

// getRecommendedDoctors controller (Version 2.0 Ranking Engine)
export const getRecommendedDoctors = async (req, res) => {
  const { symptoms, lat, lng } = req.query;

  try {
    const specialization = mapSymptomsToSpecialization(symptoms || "");
    const doctors = await Doctor.find({ isApproved: "approved" })
      .populate("reviews")
      .select("-password");

    const rankedDoctors = doctors.map(doc => {
      let score = 0;

      // 1. Specialization Match (+50 points)
      if (doc.specialization === specialization) score += 50;

      // 2. Distance Calculation (-2 points per km)
      if (lat && lng && doc.location?.lat) {
        const distance = calculateDistance(
          parseFloat(lat), 
          parseFloat(lng), 
          doc.location.lat, 
          doc.location.lng
        );
        doc._doc.distance = distance.toFixed(1);
        score -= Math.min(distance * 2, 40); // Cap distance penalty at 40
      }

      // 3. Rating (+5 points per star)
      score += (doc.averageRating || 0) * 5;

      // 4. Acceptance Rate (+1 point per 10%)
      score += (doc.acceptanceRate || 100) / 10;

      return { ...doc._doc, rankScore: score };
    });

    // Sort by rankScore descending
    rankedDoctors.sort((a, b) => b.rankScore - a.rankScore);

    res.status(200).json({
      success: true,
      message: "Neural sync successful. Doctors ranked by match score.",
      data: rankedDoctors,
      suggestedSpecialization: specialization
    });
  } catch (error) {
    console.error("Ranking Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Neural ranking failure: " + error.message 
    });
  }
};

// update_single_Doctor controller
export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`[UpdateDoctor] ID: ${id}, fields: ${Object.keys(req.body)}`);
    if (req.body.photo) console.log(`[UpdateDoctor] New photo URL received`);

    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: { ...req.body, isApproved: "approved" } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated Doctor",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to update Doctor" });
  }
};

// delete_single_Doctor controller
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted Doctor",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to delete Doctor" });
  }
};

// get_single_Doctor controller
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got a Doctor",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Doctor not found" });
  }
};

// get_all_Doctors controller
export const getAllDoctor = async (req, res) => {
  try {
    const { query, location, maxFee, minExp } = req.query;
    
    // Base filter: MUST be approved
    let filter = { isApproved: "approved" };

    // Apply Smart Search Filters
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ];
    }
    
    if (location) {
      filter["location.city"] = { $regex: location, $options: "i" };
    }
    
    if (maxFee) {
      filter.ticketPrice = { $lte: parseInt(maxFee) };
    }
    
    if (minExp) {
       filter.experience = { $gte: parseInt(minExp) };
    }

    const doctors = await Doctor.find(filter).select("-password").populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfully got all Doctors",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Doctors not found" });
  }
};

// get_Doctor_Profile controller
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId }).populate('user', 'name photo gender email');

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// update_booking_status controller
export const updateBookingStatus = async (req, res) => {
  const bookingId = req.params.id;
  const { status, appointmentDate, appointmentTime, statusMessage } = req.body;
  const io = req.app.get("io");

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { 
        status, 
        appointmentDate, 
        appointmentTime, 
        statusMessage 
      },
      { new: true }
    ).populate('user').populate('doctor');

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Create persistent notification for Patient
    const newNotification = new Notification({
      recipient: updatedBooking.user._id,
      recipientModel: "User",
      sender: updatedBooking.doctor._id,
      senderModel: "Doctor",
      message: status === "confirmed" 
        ? `Pulse Sync Success: Dr. ${updatedBooking.doctor.name} confirmed your appointment for ${appointmentTime || 'the selected slot'}.`
        : `Neural Sync Rejected: Dr. ${updatedBooking.doctor.name} was unable to confirm your request.`,
      actionType: status === "confirmed" ? "BOOKING_ACCEPTED" : "BOOKING_REJECTED",
      bookingId: updatedBooking._id
    });
    await newNotification.save();

    // Emit Real-Time Socket Event to Patient
    if (io) {
      io.to(updatedBooking.user._id.toString()).emit("STATUS_SYNC", {
        message: newNotification.message,
        bookingId: updatedBooking._id,
        status: status,
        appointmentTime: appointmentTime
      });
    }

    res.status(200).json({
      success: true,
      message: `Neural link ${status} successfully. Patient notified.`,
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Neural status failure: " + error.message });
  }
};

// record_activity controller (Doctor/Hospital)
export const recordActivity = async (req, res) => {
  const { featureName, action, path } = req.body;
  const userId = req.userId;

  try {
    const newActivity = new Activity({
      userId,
      userModel: "Doctor",
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

// get_activity_history controller (Doctor/Hospital)
export const getActivityHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const activities = await Activity.find({ 
      userId, 
      userModel: "Doctor" 
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
