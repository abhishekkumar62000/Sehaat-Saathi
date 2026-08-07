import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";
import Hospital from "./HospitalSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    hospital: {
      type: mongoose.Types.ObjectId,
      ref: "Hospital",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (targetId, isHospital = false) {
  if (!targetId) return;
  const matchField = isHospital ? { hospital: targetId } : { doctor: targetId };
  const stats = await this.aggregate([
    { $match: matchField },
    {
      $group: {
        _id: isHospital ? "$hospital" : "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats && stats.length > 0) {
    if (isHospital) {
      await Hospital.findByIdAndUpdate(targetId, {
        totalRating: stats[0].numOfRating,
        averageRating: Math.round(stats[0].avgRating * 10) / 10,
      });
    } else {
      await Doctor.findByIdAndUpdate(targetId, {
        totalRating: stats[0].numOfRating,
        averageRating: Math.round(stats[0].avgRating * 10) / 10,
      });
    }
  }
};

reviewSchema.post("save", function () {
  if (this.hospital) {
    this.constructor.calcAverageRatings(this.hospital, true);
  } else if (this.doctor) {
    this.constructor.calcAverageRatings(this.doctor, false);
  }
});

export default mongoose.model("Review", reviewSchema);
