import Hospital from "../models/HospitalSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const getHospitalProfile = async (req, res) => {
  const hospitalId = req.userId;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hospital node not found" });
    }

    // Fetch linked doctors
    const doctors = await Doctor.find({ hospital: hospitalId });
    
    // Fetch recent hospital-wide bookings
    const bookings = await Booking.find({ hospital: hospitalId })
      .populate('doctor')
      .populate('user')
      .sort({ createdAt: -1 })
      .limit(20);

    const { password, ...rest } = hospital._doc;

    res.status(200).json({
      success: true,
      message: "Hospital sync successful",
      data: { ...rest, doctors, bookings },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Neural retrieval failure" });
  }
};

export const updateHospitalProfile = async (req, res) => {
  const id = req.userId;

  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Hospital profile synced",
      data: updatedHospital,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update hospital node" });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const { query } = req.query;
    let hospitals;

    if (query) {
      hospitals = await Hospital.find({
        $or: [
          { hospitalName: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
          { district: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      hospitals = await Hospital.find({});
    }

    res.status(200).json({
      success: true,
      message: "Hospitals retrieved",
      data: hospitals,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getHospitalQueue = async (req, res) => {
  const hospitalId = req.userId;
  const { date } = req.query; // optional date filter
  
  // Format today's date if not provided
  let queryDate = date;
  if (!queryDate) {
    const today = new Date();
    queryDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  try {
    const queue = await Booking.find({ 
      hospital: hospitalId, 
      appointmentDate: queryDate,
      // bookingMode: "offline" // Assuming we may mix online/offline, but let's filter purely by hospital for now
    }).populate('doctor', 'name photo').populate('user', 'name phone').sort({ 'tokenNumber': 1 });
    
    // Simple Wait Time Predictor
    const queueWithWaitTimes = queue.map((booking, index) => {
       const waitTime = index * 15; // 15 mins per waiting patient
       return { ...booking._doc, estimatedWaitTime: waitTime };
    });

    res.status(200).json({ success: true, message: "Queue fetched", data: queueWithWaitTimes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch queue: " + err.message });
  }
};

export const triggerQueueDelay = async (req, res) => {
  const hospitalId = req.userId;
  const { minutes } = req.body;
  const today = new Date().toISOString().split('T')[0];

  try {
    const doctors = await Doctor.find({ hospital: hospitalId });
    for (const doc of doctors) {
      doc.currentDelayStatus = (doc.currentDelayStatus || 0) + minutes;
      await doc.save();
    }
    
    // Also log delay to bookings today
    await Booking.updateMany({ 
      hospital: hospitalId, appointmentDate: today 
    }, { 
      $inc: { delayedMinutes: minutes } 
    });

    res.status(200).json({ success: true, message: `Emergency delay of ${minutes} mins broadcasted.` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to trigger delay: " + err.message });
  }
};
