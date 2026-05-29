import OpenAI from "openai";
import Booking from "../models/BookingSchema.js";

/**
 * Generates a structured AI summary of the patient's symptoms before the consultation.
 * Uses OpenAI for NLP summarization.
 */
export const generateSymptomSummary = async (req, res) => {
  const { bookingId } = req.params;
  const { details } = req.body; // { symptoms, duration, previousIllness }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      success: false, 
      message: "OpenAI API Key not configured. Neural AI offline." 
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const prompt = `
      You are a Senior Medical Assistant. Summarize the following patient pre-consultation details for a doctor.
      Be concise, professional, and highlight potential red flags.
      
      Patient Name: ${req.userName || "Patient"}
      Symptoms: ${details.symptoms}
      Duration: ${details.duration}
      Previous Illness: ${details.previousIllness}
      
      Format the output as a structured medical brief.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const aiBrief = response.choices[0].message.content;

    // Update booking with the AI brief and raw details
    booking.aiSummary = aiBrief;
    booking.preConsultationDetails = details;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Neural AI brief generated successfully.",
      data: aiBrief
    });
  } catch (error) {
    console.error("AI Summary Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Neural AI processing failure: " + error.message 
    });
  }
};
