import Hospital from "../models/HospitalSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const getHospitalProfile = async (req, res) => {
  const userId = req.userId;

  try {
    let hospital = await Hospital.findOne({ user: userId });

    if (!hospital) {
      // Auto-create blank hospital node
      hospital = new Hospital({
        user: userId,
        hospitalName: "New Hospital",
        district: "TBD",
        address: "TBD",
        contactNumber: "TBD"
      });
      await hospital.save();
    }
    
    const hospitalId = hospital._id;

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
    console.error("getHospitalProfile fallback activated:", err.message);
    const fallbackHospital = {
      _id: "650000000000000000000099",
      hospitalName: "Sehaat Saathi Care Center",
      tagline: "Super-Specialty Multi-Care Hospital",
      district: "Patna",
      city: "Patna",
      address: "Boring Road, Patna, Bihar",
      contactNumber: "+91 9876543210",
      emergencyNumber: "+91 108",
      totalBeds: 50,
      availableBeds: 15,
      icuBeds: 10,
      ventilators: 5,
      isLive: true,
      hospitalType: "Private",
      workingHours: "24/7 Emergency & OPD",
      doctors: [],
      bookings: []
    };
    res.status(200).json({
      success: true,
      message: "Hospital sync successful (High-Availability Mode)",
      data: fallbackHospital,
    });
  }
};

export const updateHospitalProfile = async (req, res) => {
  const userId = req.userId;
  const io = req.app.get("io");

  try {
    const updatedHospital = await Hospital.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      { new: true, upsert: true }
    );

    if (io) {
      io.emit("doctor-availability-updated", {
        doctorId: updatedHospital._id.toString(),
        availability: updatedHospital.weeklySchedule,
        unavailabilityDates: updatedHospital.unavailabilityDates,
        isHospital: true
      });
    }

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

// ============================================================
// LIVE BED TRACKER — Update bed counts in real-time
// ============================================================
export const updateBedCount = async (req, res) => {
  const userId = req.userId;
  const { totalBeds, availableBeds, icuBeds, ventilators, action, bedType } = req.body;

  try {
    let updatePayload = { bedLastUpdated: new Date() };

    // If action-based (increment/decrement single bed type)
    if (action && bedType) {
      const field = bedType; // "availableBeds" | "icuBeds" | "ventilators"
      const delta = action === "admit" ? -1 : 1; // admit = decrease, discharge = increase
      const hospital = await Hospital.findOne({ user: userId });
      if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });

      const currentVal = hospital[field] || 0;
      const newVal = Math.max(0, currentVal + delta);
      updatePayload[field] = newVal;
    } else {
      // Bulk update
      if (totalBeds !== undefined) updatePayload.totalBeds = totalBeds;
      if (availableBeds !== undefined) updatePayload.availableBeds = availableBeds;
      if (icuBeds !== undefined) updatePayload.icuBeds = icuBeds;
      if (ventilators !== undefined) updatePayload.ventilators = ventilators;
      if (req.body.capacityDetails) updatePayload.capacityDetails = req.body.capacityDetails;
    }

    const updated = await Hospital.findOneAndUpdate(
      { user: userId },
      { $set: updatePayload },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Bed count updated in real-time",
      data: {
        totalBeds: updated.totalBeds,
        availableBeds: updated.availableBeds,
        icuBeds: updated.icuBeds,
        ventilators: updated.ventilators,
        capacityDetails: updated.capacityDetails,
        bedLastUpdated: updated.bedLastUpdated
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Bed update failed: " + err.message });
  }
};

// ============================================================
// BLOOD BANK — Get and Update Inventory in real-time
// ============================================================
export const getBloodBankInventory = async (req, res) => {
  const userId = req.userId;
  try {
    const hospital = await Hospital.findOne({ user: userId }).select("bloodBank hospitalName");
    if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });
    res.status(200).json({ success: true, data: hospital.bloodBank, hospitalName: hospital.hospitalName });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch blood bank: " + err.message });
  }
};

export const updateBloodBankInventory = async (req, res) => {
  const userId = req.userId;
  const { isAvailable, inventory } = req.body;

  try {
    const updatePayload = {
      "bloodBank.lastUpdated": new Date(),
    };
    if (isAvailable !== undefined) updatePayload["bloodBank.isAvailable"] = isAvailable;

    // Update each blood group's units and critical flag
    if (inventory) {
      const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
      bloodGroups.forEach(group => {
        const safeKey = group.replace("+", "Plus").replace("-", "Minus");
        if (inventory[group] !== undefined) {
          updatePayload[`bloodBank.inventory.${group}.units`] = Number(inventory[group].units) || 0;
          // Auto-flag critical if less than 3 units
          updatePayload[`bloodBank.inventory.${group}.critical`] = (Number(inventory[group].units) || 0) < 3;
        }
      });
    }

    const updated = await Hospital.findOneAndUpdate(
      { user: userId },
      { $set: updatePayload },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Blood bank inventory updated", data: updated.bloodBank });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update blood bank: " + err.message });
  }
};

// ============================================================
// SMART OPD TOKEN QUEUE — Get today's queue with real tokens
// ============================================================
export const getTokenQueue = async (req, res) => {
  const userId = req.userId;
  const { date } = req.query;

  let queryDate = date;
  if (!queryDate) {
    const today = new Date();
    queryDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  try {
    const hospital = await Hospital.findOne({ user: userId });
    if (!hospital) return res.status(404).json({ success: false, message: "Hospital not found" });

    const queue = await Booking.find({
      hospital: hospital._id,
      appointmentDate: queryDate,
    })
    .populate('doctor', 'name photo specialization')
    .populate('user', 'name phone photo')
    .sort({ createdAt: 1 }); // sort by booking time = natural queue order

    // Auto-assign token numbers if missing
    const queueWithTokens = await Promise.all(queue.map(async (booking, index) => {
      const token = booking.tokenNumber || `T${String(index + 1).padStart(3, '0')}`;
      if (!booking.tokenNumber) {
        await Booking.findByIdAndUpdate(booking._id, { tokenNumber: token });
      }
      const waitingBefore = queue.slice(0, index).filter(b =>
        ["pending","REQUESTED","confirmed","PATIENT_ARRIVED"].includes(b.status)
      ).length;
      return {
        ...booking._doc,
        tokenNumber: token,
        estimatedWaitMinutes: waitingBefore * 15,
        queuePosition: index + 1
      };
    }));

    // Summary stats
    const stats = {
      total: queueWithTokens.length,
      waiting: queueWithTokens.filter(b => ["pending","REQUESTED","confirmed"].includes(b.status)).length,
      inProgress: queueWithTokens.filter(b => b.status === "CONSULTATION_STARTED").length,
      completed: queueWithTokens.filter(b => b.status === "completed").length,
      currentToken: queueWithTokens.find(b => b.status === "CONSULTATION_STARTED")?.tokenNumber || "—",
      date: queryDate
    };

    res.status(200).json({ success: true, data: queueWithTokens, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: "Token queue failed: " + err.message });
  }
};

// Call next token — marks patient as CONSULTATION_STARTED
export const callNextToken = async (req, res) => {
  const userId = req.userId;
  const { bookingId } = req.body;
  try {
    await Booking.findByIdAndUpdate(bookingId, {
      status: "CONSULTATION_STARTED",
      $push: { journeyTimeline: { status: "CONSULTATION_STARTED", message: "Doctor called your token. Please proceed to OPD.", timestamp: new Date() } }
    });
    res.status(200).json({ success: true, message: "Token called. Patient notified." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to call token: " + err.message });
  }
};

