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

// PUT /api/v1/doctors/availability/me
export const updateDoctorAvailability = async (req, res) => {
  const { availability, unavailabilityDates, maxPatientsPerDay } = req.body;
  const doctorId = req.userId;
  const io = req.app.get("io");

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $set: {
          availability: availability || [],
          unavailabilityDates: unavailabilityDates || [],
          maxPatientsPerDay: maxPatientsPerDay || 20,
        },
      },
      { new: true }
    ).select("-password");

    if (io) {
      io.emit("doctor-availability-updated", {
        doctorId: doctor._id,
        availability: doctor.availability,
        unavailabilityDates: doctor.unavailabilityDates
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability schedule updated successfully",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update availability: " + err.message });
  }
};

// POST /api/v1/doctors/generate-prescription
export const generatePrescription = async (req, res) => {
  const { symptoms, notes } = req.body;

  try {
    const prompt = `You are an expert AI medical assistant helping a doctor write a formal prescription.
The patient presented with these symptoms: "${symptoms || "Not provided"}".
The doctor added these quick notes: "${notes || "No notes provided"}".

Generate a structured medical prescription in pure JSON format containing:
{
  "diagnosis": "A concise diagnosis based on notes",
  "medicines": [
    { "name": "Medicine Name", "dosage": "e.g. 500mg", "frequency": "e.g. 1-0-1", "duration": "e.g. 5 days", "instructions": "e.g. After food" }
  ],
  "advice": "General advice or lifestyle recommendations",
  "followUp": "When to follow up"
}
Output strictly valid JSON only. Do not include markdown tags.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Groq API Failed");

    let prescriptionJson = data.choices[0].message.content.trim();
    // Clean up potential markdown formatting
    if (prescriptionJson.startsWith("\`\`\`json")) {
      prescriptionJson = prescriptionJson.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
    }
    
    res.status(200).json({
      success: true,
      data: JSON.parse(prescriptionJson)
    });
  } catch (error) {
    console.error("AI Rx Generation Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate prescription" });
  }
};

