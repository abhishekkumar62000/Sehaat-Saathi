import Doctor from "../models/DoctorSchema.js";

// get_pending_doctors controller
export const getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: "pending" }).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully fetched pending doctors for verification.",
      data: doctors,
    });
  } catch (error) {
    console.error("Admin Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch pending doctors." });
  }
};

// approve_doctor controller
export const approveDoctor = async (req, res) => {
  const doctorId = req.params.id;
  const { action } = req.body; // action can be 'approved' or 'rejected'
  const io = req.app.get("io");

  try {
    if (!["approved", "rejected"].includes(action)) {
      return res.status(400).json({ success: false, message: "Invalid action type." });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { isApproved: action, verificationStatus: action === "approved" ? "verified" : "unverified" },
      { new: true }
    ).select("-password");

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found." });
    }

    // Emit Real-Time Notification to Doctor System
    if (io) {
      if (action === "approved") {
        io.to(doctor._id.toString()).emit("doctor-approved", {
          message: "Congratulations! Your profile has been officially vetted and is now LIVE in the Smart Hub offline booking engine.",
        });
      } else {
        io.to(doctor._id.toString()).emit("doctor-rejected", {
          message: "Your profile verification failed. Please review your credentials and re-submit.",
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Doctor successfully ${action}. Smart Hub dynamic syncing complete.`,
      data: doctor,
    });
  } catch (error) {
    console.error("Admin Action Error:", error);
    res.status(500).json({ success: false, message: "Failed to execute administrative action." });
  }
};
