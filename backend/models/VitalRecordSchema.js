import mongoose from "mongoose";

const VitalRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    blood_pressure: {
        systolic: { type: Number },
        diastolic: { type: Number }
    },
    sugar_level: { type: Number }, // in mg/dL
    heart_rate: { type: Number }, // in bpm
    oxygen_level: { type: Number }, // in % (SpO2)
    temperature: { type: Number }, // in Celsius
    symptoms_logged: [{ type: String }],
    feeling: { type: String, enum: ["Great", "Good", "Okay", "Poor", "Very Bad"] },
    morning_meds_taken: { type: Boolean, default: false }
});

export default mongoose.model("VitalRecord", VitalRecordSchema);
