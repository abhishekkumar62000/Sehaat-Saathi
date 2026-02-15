import express from "express";
import ruleEngine from "../utils/ruleEngine.js";

const router = express.Router();

// AI Doctor Chat Endpoint - Layered Architecture (L1 Rules -> L2 LLM)
router.post("/chat", async (req, res) => {
    try {
        const { message, userContext, conversationHistory, stepAnswers, currentDisease, image } = req.body;

        if (!message && !stepAnswers && !image) {
            return res.status(400).json({ success: false, error: "Message, answers or image required" });
        }

        // --- LAYER 1: Rule Engine (Zero Cost) ---
        if (currentDisease && stepAnswers) {
            const result = ruleEngine.evaluateResult(currentDisease, stepAnswers);
            return res.json({ success: true, type: 'RULE_RESULT', data: result, confidence: 100 });
        }

        if (message && !image) {
            const match = ruleEngine.findMatch(message);
            if (match) {
                if (match.type === 'EMERGENCY_GLOBAL') {
                    return res.json({ success: true, type: 'EMERGENCY', response: "⚠️ URGENT: High-risk symptoms detected. Call 102 immediately.", confidence: 100 });
                }
                if (match.type === 'DISEASE_MATCH') {
                    return res.json({ success: true, type: 'RULE_START', diseaseId: match.diseaseId, rule: match.rule, response: `Mapped to **${match.rule.name}**. I need to ask a few questions.`, confidence: 100 });
                }
            }
        }

        // --- LAYER 2: Gemini LLM (Quality Depth + Perception) ---
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        // Fetch Medicine Context from KB
        const medicineContext = ruleEngine.getMedicineContext(message);
        if (medicineContext) {
            console.log(`[AI Doctor] Found medicine context for query: "${message.substring(0, 30)}..."`);
        }

        let systemPrompt = `You are "Sehaat AI Doctor", a premium medical assistant. Follow these:
               1. NEVER diagnose definitively. Use terms like "Possible causes include..."
               2. For emergencies (chest pain, breathing), suggest calling 102 immediately.
               3. Use Hinglish if appropriate. Address patient: ${userContext?.name || 'Patient'}.
               4. MEDICINE SUGGESTIONS: 
                  - If provided with RELEVANT MEDICINE KNOWLEDGE from our database below, prioritize those specific medicines.
                  - Include the "Source" (e.g., Sun Pharma, Lupin) for every medicine you suggest.
                  - Always include a strong disclaimer: "Consult a doctor before starting any medication."
                  - If the user asks for a dose, provide the "Dosage" and "Frequency" from the KB but mandate professional verification.
               
               ${medicineContext}`;


        if (image) {
            const lowerMsg = message?.toLowerCase() || "";
            if (lowerMsg.includes("skin") || lowerMsg.includes("rash") || lowerMsg.includes("daane")) {
                systemPrompt = `You are "Sehaat AI Dermatology Intelligence". 
                1. ANALYZE: Carefully scan the skin symptom in the image.
                2. DIFFERENTIAL: Identify 2-3 possible causes (e.g., Contact Dermatitis, Eczema, or Tinea).
                3. RED FLAGS: Check for "Alarm Symptoms" like blistering, pus (infection), or rapid spread.
                4. STEPS: Suggest mild, safe soothing (e.g., coconut oil, cold wash). NEVER suggest steroids.
                5. DISCLOSURE: Remind them that skin conditions can only be confirmed by tactile clinical exam.
                6. CALL TO ACTION: If red flags are present, mandate a 102 call or Urgent Care visit.`;
            } else if (lowerMsg.includes("food") || lowerMsg.includes("meal") || lowerMsg.includes("khana")) {
                systemPrompt = `You are "Sehaat AI Clinical Nutritionist". 
                1. IDENTIFY: Detect every food item (e.g., Paratha, Paneer, Rice).
                2. GLYCEMIC LOAD: Estimate if the glycemic impact is High or Low for an Indian standard diet.
                3. CONTEXT: User Age: ${userContext?.age || 'General'}. Vitals Context: Check if meal is safe for heart/sugar.
                4. RATIO: Comment on the fiber-to-carb ratio. Suggest a "Super-Side" (like cucumber/curd) to balance the meal.
                5. MOTIVATION: Give a 1-sentence health benefit of one ingredient in the meal.`;
            } else {
                systemPrompt = `You are "Sehaat AI Vision Specialist". The user has uploaded a medical report image.
                1. Identify key clinical values (BP, Sugar, Hemoglobin, Vitamin D, etc.).
                2. Explain if these are Normal, Low, or High relative to NABL/Indian labs.
                3. Explain the medical significance of any abnormal value (e.g., "Low Iron might cause tiredness").
                4. Suggest lifestyle tweaks. End with: "Please consult your doctor for a final clinical diagnosis."`;
            }
        }

        if (!GEMINI_API_KEY) {
            return res.json({
                success: true,
                type: 'LLM_FALLBACK',
                response: generateFallbackResponse(message, userContext, medicineContext),
                confidence: 70,
                citation: "Sehaat Saathi Medical Knowledge Base"
            });
        }


        // Construct Gemini Payload
        const contents = [];

        // System context as a user turn for Flash 1.5
        contents.push({ role: 'user', parts: [{ text: systemPrompt }] });
        contents.push({ role: 'model', parts: [{ text: "Understood. I will analyze the health data with medical accuracy and empathy." }] });

        // Conversation History
        if (conversationHistory) {
            conversationHistory.forEach(msg => {
                contents.push({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
            });
        }

        // Current Input
        const currentParts = [{ text: message || "Analyze this report image." }];
        if (image) {
            const base64Data = image.split(',')[1];
            currentParts.push({
                inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Data
                }
            });
        }
        contents.push({ role: 'user', parts: currentParts });

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 800,
                        topK: 40,
                        topP: 0.95
                    },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
                    ]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return res.json({
                success: true,
                type: 'LLM_FALLBACK',
                response: generateFallbackResponse(message, userContext),
                confidence: 70,
                citation: "Sehaat Saathi Medical Knowledge Base"
            });
        }

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I apologize, I couldn't process your query. Please try rephrasing or consult a doctor directly.";

        res.json({
            success: true,
            type: 'LLM_RESPONSE',
            response: aiResponse,
            confidence: 85,
            citation: "Gemini AI + Sehaat Medical Database"
        });

    } catch (error) {
        console.error("AI Doctor Chat Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to process your message. Please try again.",
            response: "I'm having trouble connecting right now. Please try again in a moment, or consult a doctor directly for urgent concerns."
        });
    }
});

// Intelligent fallback response generator (when no API key & no Rule match)
function generateFallbackResponse(message, userContext, medicineContext) {
    const input = message?.toLowerCase() || '';
    const name = userContext?.name || 'there';

    // Emergency keywords - highest priority
    if (input.includes('chest pain') || input.includes('heart') || input.includes('breathing') || input.includes('saans')) {
        return `⚠️ ${name}, chest pain or breathing difficulty can be serious. \n\n**Please call 102 immediately or go to the nearest emergency room.** \n\nIf this is mild discomfort, rest and avoid exertion. But do not ignore these signs.`;
    }

    // Medicine specific fallback using database context
    if (medicineContext) {
        return `Hello ${name}, I've scanned our clinical database for details related to your query.\n\n${medicineContext}\n\n**Important:** These suggestions are based on our medical records. However, you should **consult a doctor** before starting any new medication to ensure it is appropriate for your specific health profile.`;
    }

    // Keyword specific fallbacks
    if (input.includes('diet') || input.includes('khana')) {
        return `Hello ${name}, for general wellness, I recommend a balanced Indian diet with lentils, leafy greens, and seasonal fruits. Avoid excess oil and sugar. For a specific diet plan, please consult our in-app nutritionist.`;
    }


    if (input.includes('report') || input.includes('checkup')) {
        return `I can help you understand reports, ${name}. Please share the specific values (like Hemoglobin, Sugar, etc.) and I will explain what they mean for your health.`;
    }

    const genericTips = [
        "Stay hydrated and try to get 7-8 hours of sleep.",
        "Include more fiber like oats and papaya in your diet.",
        "Regular 30-minute walks can significantly improve heart health.",
        "Wash your hands frequently to avoid seasonal infections."
    ];
    const randomTip = genericTips[Math.floor(Math.random() * genericTips.length)];

    return `I want to understand your concern better, ${name}. \n\nSince I couldn't map this to a specific condition, could you tell me: \n1. How long has this been happening? \n2. Are you taking any medications? \n\nTip: ${randomTip}`;
}

export default router;
