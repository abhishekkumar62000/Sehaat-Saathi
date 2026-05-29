import HealthProfile from "../models/HealthProfileSchema.js";
import VitalRecord from "../models/VitalRecordSchema.js";
import { OpenAI } from "openai";

// Calculate Rule-Based Health Score (0-100)
const calculateHealthScore = (profile, latestVital) => {
    let score = 50; // Starting baseline

    // BMI Impact
    if (profile.bmi) {
        if (profile.bmi >= 18.5 && profile.bmi <= 24.9) score += 20;
        else if (profile.bmi >= 25 && profile.bmi <= 29.9) score += 5;
        else score -= 15;
    }

    // Sleep Impact
    if (profile.sleep_hours) {
        if (profile.sleep_hours >= 7) score += 15;
        else if (profile.sleep_hours >= 6) score += 5;
        else score -= 10;
    }

    // Vitals Impact (if log available)
    if (latestVital && latestVital.blood_pressure) {
        const { systolic, diastolic } = latestVital.blood_pressure;
        if (systolic < 120 && diastolic < 80) score += 15;
        else if (systolic > 140 || diastolic > 90) score -= 20;
    }

    // Stress Impact
    if (profile.stress_level === "Low") score += 10;
    else if (profile.stress_level === "High") score -= 10;

    return Math.min(100, Math.max(0, score));
};

export const updateProfile = async (req, res) => {
    const userId = req.userId;
    try {
        let profile = await HealthProfile.findOne({ user: userId });
        if (profile) {
            profile = await HealthProfile.findOneAndUpdate({ user: userId }, { $set: req.body }, { new: true });
        } else {
            profile = new HealthProfile({ ...req.body, user: userId });
            await profile.save();
        }
        res.status(200).json({ success: true, message: "Profile updated", data: profile });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ success: false, message: "Database Error: " + err.message });
    }
};

export const logVitals = async (req, res) => {
    const userId = req.userId;
    try {
        const newRecord = new VitalRecord({ ...req.body, user: userId });
        await newRecord.save();
        res.status(200).json({ success: true, message: "Vitals logged successfully", data: newRecord });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error logging vitals" });
    }
};

export const getHealthDashboard = async (req, res) => {
    const userId = req.userId;
    try {
        const profile = await HealthProfile.findOne({ user: userId });
        const vitals = await VitalRecord.find({ user: userId }).sort({ date: -1 }).limit(30);

        if (!profile) {
            return res.status(200).json({ success: false, message: "No health profile found. Please set one up." });
        }

        const latestVital = vitals[0] || null;
        const score = calculateHealthScore(profile, latestVital);

        // Trend Analysis (Simple comparison with previous record)
        let trend = "stable";
        if (vitals.length >= 2) {
            const current = vitals[0];
            const previous = vitals[1];
            if (current.blood_pressure && previous.blood_pressure) {
                if (current.blood_pressure.systolic > previous.blood_pressure.systolic + 5) trend = "worsening";
                else if (current.blood_pressure.systolic < previous.blood_pressure.systolic - 5) trend = "improving";
            }
        }

        res.status(200).json({
            success: true,
            data: {
                score,
                risk_level: score > 80 ? "Low" : score > 50 ? "Medium" : "High",
                profile,
                latestVital,
                trends: trend,
                history: vitals
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching dashboard data" });
    }
};

export const getAIAdvice = async (req, res) => {
    const userId = req.userId;
    try {
        const profile = await HealthProfile.findOne({ user: userId });
        const vitals = await VitalRecord.find({ user: userId }).sort({ date: -1 }).limit(7);

        if (!profile || vitals.length === 0) {
            return res.status(200).json({ success: false, message: "Need more data for AI advice." });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are the 'Sehaat AI Health Copilot'. Analyze the user's clinical dashboard and provide personalized preventive health advice. Speak in a proactive, encouraging, and medical tone. Format your response into: 1. Personalized Explanation 2. Daily Health Tip 3. Warning Signals (if any)."
                },
                {
                    role: "user",
                    content: `Here is the user health data: Profile: ${JSON.stringify(profile)}, Vitals History (last 7 logs): ${JSON.stringify(vitals)}. Generate preventive guidance.`
                }
            ]
        });

        res.status(200).json({ success: true, advice: response.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ success: false, message: "AI Advisory service error." });
    }
};
