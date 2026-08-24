import Doctor from "../models/DoctorSchema.js";
import Hospital from "../models/HospitalSchema.js";
import Review from "../models/ReviewSchema.js";

// get_all_reviews controller
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({
      success: true,
      message: "Successfully got all reviews",
      data: reviews,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Reviews not found" });
  }
};

// create_a_review controller
export const createReview = async (req, res) => {
  if (!req.body.doctor && req.params.doctorId) req.body.doctor = req.params.doctorId;
  if (!req.body.hospital && req.params.hospitalId) req.body.hospital = req.params.hospitalId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    if (req.body.doctor) {
      await Doctor.findByIdAndUpdate(req.body.doctor, {
        $push: { reviews: savedReview._id },
      });
    }

    if (req.body.hospital) {
      await Hospital.findByIdAndUpdate(req.body.hospital, {
        $push: { reviews: savedReview._id },
      });
    }

    const populatedReview = await Review.findById(savedReview._id).populate("user", "name photo");

    const io = req.app.get("io");
    if (io) {
      const targetId = req.body.hospital || req.body.doctor;
      if (targetId) {
        io.to(targetId.toString()).emit("NEW_REVIEW", populatedReview);
        io.emit(`NEW_REVIEW_${targetId}`, populatedReview);
        io.emit("GLOBAL_NEW_REVIEW", populatedReview);

        if (req.body.hospital) {
          try {
            const hDoc = await Hospital.findById(req.body.hospital);
            if (hDoc && hDoc.user) {
              io.to(hDoc.user.toString()).emit("NEW_REVIEW", populatedReview);
            }
          } catch (e) {
            // silent socket fallback
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: populatedReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
