import mongoose from "mongoose";

const HealthProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    bmi: { type: Number }, // auto-calculated
    blood_group: { type: String },
    allergies: [{ type: String }],
    chronic_conditions: [{ type: String }],
    current_medications: [{ type: String }],
    smoking_status: { type: String, enum: ["Never", "Former", "Current"] },
    alcohol_use: { type: String, enum: ["Never", "Occasionally", "Regular"] },
    activity_level: { type: String, enum: ["Sedentary", "Moderate", "Active", "Athlete"] },
    sleep_hours: { type: Number },
    stress_level: { type: String, enum: ["Low", "Medium", "High"] },
    last_updated: { type: Date, default: Date.now }
});

// Calculate BMI before saving
HealthProfileSchema.pre('save', function(next) {
    if (this.height && this.weight) {
        const heightInMeters = this.height / 100;
        this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(2));
    }
    next();
});

export default mongoose.model("HealthProfile", HealthProfileSchema);
