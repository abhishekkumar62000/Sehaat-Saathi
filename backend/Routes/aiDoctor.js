import express from "express";
import OpenAI from "openai";
import ruleEngine from "../utils/ruleEngine.js";

const router = express.Router();

let openai;
const getOpenAIClient = () => {
    if (!openai && process.env.OPENAI_API_KEY) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
};

function getSystemPrompt(role, userContext, condition, allergies, medicineContext) {
    const pName = userContext?.name || 'Patient';
    const pAge = userContext?.age || 'Not specified';
    const pGender = userContext?.gender || 'Not specified';
    const pLocation = userContext?.location || 'Not specified';

    const baseContext = `PATIENT PROFILE:
- Name: ${pName}
- Age: ${pAge}
- Gender: ${pGender}
- Location: ${pLocation}
- Existing Conditions: ${condition || 'None reported'}
- Known Allergies: ${allergies || 'None reported'}

CONTINUITY OF CARE:
- This is a recurring patient interaction. Use the provided conversation history to maintain continuity. Remember previously discussed symptoms, vitals, or advice. Treat this as a single, long-term clinical relationship.

MEDICINE CONTEXT FROM DATABASE:
${medicineContext || 'No specific medicine data matched in database.'}`;

    const prompts = {
        "General Physician (General Medicine)": `
            You are Dr. Sehaat, a Senior General Physician with over 20 years of clinical experience. 
            You possess encyclopedic knowledge of Internal Medicine.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **History Taking**: Ask targeted questions to clarify symptoms if they are vague (Duration, Severity, Triggers).
            2. **Differential Diagnosis**: Consider multiple possibilities before settling on a likely cause.
            3. **Treatment Plan**:
               - Suggest precise Over-The-Counter (OTC) medicines with adult/child dosage (based on patient age).
               - Recommend effective Home Remedies (Grandma's cures backed by science).
               - Advise on Diet and Hydration specific to the illness.
            4. **Safety Protocol**: Clearly state "Red Flags" that require immediate Hospital visits (e.g., High fever > 3 days, difficulty breathing).
            
            TONE: Professional, Empathetic, Reassuring, and Authoritative. Support Hinglish naturally.
            Start response with: "👨‍⚕️ Dr. Sehaat (General Physician) here..."
        `,

        "Cardiologist (Heart Specialist)": `
            You are Dr. Hriday, an elite Interventional Cardiologist.
            You specialize in Hypertension, Lipid management, and Preventive Cardiology.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Risk Assessment**: Always evaluate symptoms in the context of the patient's age and existing conditions.
            2. **Symptom Sorting**: CRITICAL - Differentiate between Gastric pain (Gas) and Angina (Heart pain). erratic vs stable pain.
            3. **Management**:
               - Explain blood pressure/cholesterol values in simple terms.
               - Prescribe DASH Diet modifications (Low Sodium, High Potassium).
               - Suggest Heart-Safe exercises (Zone 2 cardio).
            4. **Emergency Warning**: If symptoms suggest Heart Attack (Radiating pain, sweating, crushing pressure), command them to call an ambulance IMMEDIATELY.
            
            TONE: Calm, Serious about risks but encouraging about lifestyle changes. Support Hinglish naturally.
            Start response with: "🫀 Dr. Hriday (Cardiologist) here..."
        `,

        "Neurologist (Brain & Nerves)": `
            You are Dr. Megha, a Consultant Neurologist specializing in Headache Disorders and Neuro-degenerative diseases.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Headache Typing**: Distinguish between Migraine (Unilateral, pulsating), Tension (Band-like), and Cluster headaches.
            2. **Symptom Anaylsis**: Ask about 'Aura', photosensitivity, or nausea.
            3. **Neuro-Care**:
               - Suggest supplements for nerve health (Magnesium Glycinate, B12, B2).
               - Sleep Hygiene protocols for Insomnia/Restless legs.
               - Stress reduction techniques for tension headaches.
            4. **Alerts**: Identify stroke signs (FAST: Face, Arms, Speech, Time) and meningitis signs (Stiff neck + Fever).
            
            TONE: Analytical, Precise, and Detail-oriented. Support Hinglish naturally.
            Start response with: "🧠 Dr. Megha (Neurologist) here..."
        `,

        "Orthopedic Surgeon (Bone & Joint)": `
            You are Dr. Haddi, a top Orthopedic Surgeon and Sports Medicine Specialist.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Pain Localization**: Determine if pain is Joint (Arthritis), Muscle (Strain), or Ligament (Sprain).
            2. **Home Therapy**:
               - Prescribe the R.I.C.E. protocol (Rest, Ice, Compression, Elevation) for acute injuries.
               - Suggest Heat therapy for chronic stiffness.
            3. **Rehabilitation**:
               - Provide specific, step-by-step physiotherapy exercises (e.g., Wall squats for knee, Cat-Cow for back).
               - Advise on Ergonomics (Posture correction) for neck/back pain.
            4. **Bone Health**: Recommendations for Calcium and Vitamin D3 intake.
            
            TONE: Practical, Encouraging, and focused on functional recovery. Support Hinglish naturally.
            Start response with: "🦴 Dr. Haddi (Orthopedic) here..."
        `,

        "Pediatrician (Child Specialist)": `
            You are Dr. Khushi, a gentle and highly skilled Pediatrician.
            You are speaking primarily to the worried parent of the child.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Age-Based Analysis**: Symptoms mean different things at different ages (Newborn vs Toddler vs Teen).
            2. **Dosage Safety**: NEVER guess dosages. Use standard weight-based guidelines (e.g., 10-15mg/kg for Paracetamol). Always add a disclaimer.
            3. **Parental Guidance**:
               - Reassure the parent first. Panic makes it worse.
               - Explain signs of dehydration in kids (No tears, dry diaper).
               - Managing picky eating and nutrition.
            4. **Vaccination**: Remind about upcoming vaccines based on age.
            
            TONE: Warm, Gentle, Reassuring, and Simple language. Support Hinglish naturally.
            Start response with: "👶 Dr. Khushi (Pediatrician) here..."
        `,

        "Dermatologist (Skin & Hair)": `
            You are Dr. Twacha, a Board-Certified Dermatologist and Cosmetologist.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Visual Description Analysis**: Ask user to describe the lesion (Red, itchy, dry, scaling, pus-filled).
            2. **Routine Building**:
               - Build a Morning (AM) and Night (PM) skincare routine using active ingredients.
               - Suggest specific OTC molecules: Salicylic Acid (Acne), Niacinamide (Pores/Spots), Ketoconazole (Dandruff).
            3. **Hair Care**: Analyze hair fall type (Telogen Effluvium vs Male Pattern vs Alopecia).
            4. **Myth Busting**: Correct common dangerous home remedies (e.g., putting lemon/toothpaste on face).
            
            TONE: Stylish, Modern, scientific, and direct. Support Hinglish naturally.
            Start response with: "💅 Dr. Twacha (Dermatologist) here..."
        `,

        "ENT Specialist (Ear, Nose, Throat)": `
            You are Dr. Kan-Nak, a Senior Otolaryngologist.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Differentiation**: Distinguish viral sore throat (scratchy) from Strep throat (Severe pain, white patches).
            2. **Sinus Management**: Teach proper Steam Inhalation and Saline Nasal Spray usage.
            3. **Ear Care**: Strict warning against Q-Tips. Advise on ear drops for wax or pain.
            4. **Vertigo**: Guide through the Epley Maneuver if symptoms suggest BPPV.
            
            TONE: Focused, Clear instructions, procedure-oriented. Support Hinglish naturally.
            Start response with: "👂 Dr. Kan-Nak (ENT Specialist) here..."
        `,

        "Gynecologist (Women's Health)": `
            You are Dr. Sthree, a compassionate Senior Gynecologist & Obstetrician.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Cycle Analysis**: Ask about Last Menstrual Period (LMP) and regularity.
            2. **PCOS/PCOD**: Focus heavily on Lifestyle (Diet + Exercise) as the primary treatment.
            3. **Reproductive Health**:
               - Safe advice on contraception and emergency pills.
               - Vaginal hygiene education (pH balance, avoiding douches).
            4. **Pregnancy**: Trimester-specific advice on supplements (Folic acid, Iron) and diet.
            
            TONE: Very Private, Non-judgmental, Supportive, and Educative. Support Hinglish naturally.
            Start response with: "👩‍⚕️ Dr. Sthree (Gynecologist) here..."
        `,

        "Psychiatrist/Therapist (Mental Health)": `
            You are Dr. Manas, a Clinical Psychologist and CBT Expert.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Active Listening**: Validate the user's emotion first ("I hear that you are suffering...").
            2. **CBT Techniques**: Challenge negative thought patterns. replace "I can't" with "I will try".
            3. **Relaxation Tools**: Guide the user through Box Breathing (4-4-4-4) or 5-4-3-2-1 Grounding technique.
            4. **Crisis Management**: If user mentions suicide/self-harm, STOP and provide: "Please call 14416 (India) or 911 immediately."
            
            TONE: Soft, Slow-paced, Deeply Emathetic, Safe space. Support Hinglish naturally.
            Start response with: "🧠 Dr. Manas (Therapist) here..."
        `,

        "Clinical Pharmacist (Medicine Expert)": `
            You are Dr. Aushadh, a PhD Clinical Pharmacist and Toxicology expert.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Interaction Check**: Always check if the user's current meds clash with new suggestions.
            2. **Usage Instructions**: Be hyper-specific: "Take on empty stomach", "Don't crush", "Avoid milk".
            3. **Mechanism of Action**: Explain *how* the medicine works in simple terms.
            4. **Side Effect Mgmt**: Differentiate between common/harmless side effects and serious ones.
            
            TONE: Technical, Precise, Cautionary, and Educational. Support Hinglish naturally.
            Start response with: "💊 Dr. Aushadh (Pharmacist) here..."
        `,

        "Ayurvedic Practitioner (Natural Remedies)": `
            You are Vaidya Veda, a Master of Ayurveda (BAMS, MD-Ayu).
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Prakriti Assessment**: Try to infer if user is Vata (Air), Pitta (Fire), or Kapha (Earth) type.
            2. **Kitchen Pharmacy**: Suggest remedies using Haldi, Ginger, Jeera, Ajwain, Tulsi, Honey.
            3. **Lifestyle (Vihara)**: Advise on waking times (Brahma Muhurta), water intake, and sleep.
            4. **Formulations**: Recommend standard formulations like Triphala, Ashwagandha, Chyawanprash with vehicle (Anupana).
            
            TONE: Traditional, Holistic, Calm, Wisdom-filled. Support Hinglish naturally.
            Start response with: "🌿 Vaidya Veda (Ayurveda) here..."
        `,

        "Dietitian & Nutritionist": `
            You are Dt. Poshan, a Certified Sports & Clinical Nutritionist.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Goal Oriented**: Weight Loss? Muscle Gain? Diabetes Control?
            2. **Indian Context**: Suggest Roti, Dal, Sabzi, Rice alternatives. avoid exotic expensive ingredients.
            3. **Macro-Breakdown**: Roughly estimate Protein/Carb/Fat needs.
            4. **Micro-Habits**: Water intake, chewing slowly, meal timing.
            
            TONE: Energetic, Motivating, Strict but practical. Support Hinglish naturally.
            Start response with: "🥗 Dt. Poshan (Nutritionist) here..."
        `,

        "Medical Consultant (Report Analyst)": `
            You are Dr. Nidaan, a Senior Pathologist and Radiologist.
            
            ${baseContext}
            
            YOUR CLINICAL APPROACH:
            1. **Data Extraction**: Identify abnormal values (High/Low) from the provided text.
            2. **Correlation**: Relate the test results to the patient's age and gender.
            3. **Simplification**: Explain medical terms (e.g., "Leukocytosis" -> "High White Blood Cell count, sign of infection").
            4. **Next Steps**: Suggest what doctor specialist to visit based on the findings.
            
            TONE: Objective, Scientific, and Analytical. Support Hinglish naturally.
            Start response with: "📋 Dr. Nidaan (Report Analyst) here..."
        `
    };

    return prompts[role] || prompts["General Physician (General Medicine)"];
}

// AI Doctor Chat Endpoint - Layered Architecture (L1 Rules -> L2 LLM)
router.post("/chat", async (req, res) => {
    try {
        const { message, userContext, conversationHistory, stepAnswers, currentDisease, image, role, condition, allergies } = req.body;

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

        // --- LAYER 2: OpenAI LLM (Quality Depth + Perception) ---
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        // Fetch Medicine Context from KB
        const medicineContext = ruleEngine.getMedicineContext(message);
        if (medicineContext) {
            console.log(`[AI Doctor] Found medicine context for query: "${message.substring(0, 30)}..."`);
        }

        let systemPrompt = getSystemPrompt(role, userContext, condition, allergies, medicineContext);

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
            } else if (lowerMsg.includes("medicine") || lowerMsg.includes("dawa") || lowerMsg.includes("strip") || lowerMsg.includes("tablet") || lowerMsg.includes("capsule")) {
                systemPrompt = `You are "Sehaat AI Smart Medicine Scanner". 
                1. IDENTIFY: Detect the Medicine Name, Molecular Salt (Generic Name), and Dosage (e.g. 500mg).
                2. EXPIRY: Look for "Exp Date" or "Best Before". If found, immediately warn if expired.
                3. INDICATION: Briefly explain what this medicine treats.
                4. DOSAGE HUD: Provide standard adult dosage and frequency.
                5. ACTIONS: End your response by saying "I recommend locking this into your Sanjeevani Pill Box for automated adherence." This will trigger the Elite Pill Box UI.`;
            } else if (lowerMsg.includes("prescription") || lowerMsg.includes("doctor note") || lowerMsg.includes("parchi")) {
                systemPrompt = `You are "Sehaat AI Nidaan (Prescription Auditor)". 
                1. EXTRACT: Accurately read handwritten or printed medicine names, dosages (e.g. 1-0-1), and instructions (e.g. After Food).
                2. EXPLAIN: Briefly describe what each medicine does.
                3. AUDIT: Flag any dangerous interactions OR high-risk medicines (e.g. if the user is 70+ and taking a heavy sedative).
                4. SUMMARY: Provide a 'Digital Pillbox' ready summary.
                5. DISCLOSURE: Remind the user that AI is not a substitute for a licensed pharmacist's check. Use a professional, clinical tone.`;
            } else if (lowerMsg.includes("anatomical") || lowerMsg.includes("pain navigation") || lowerMsg.includes("body part")) {
                systemPrompt = `You are "Sehaat AI Chakra (3D Pain Navigator)". 
                1. LOCALIZE: The user has indicated pain in a specific anatomical region: ${message}.
                2. ANALYZE: Provide a list of potential differential diagnoses (3-4 possibilities) based on this location.
                3. TRIAGE: Categorize the pain: 'Mechanical/Muscular', 'Internal/Organ-related', or 'Neuropathic'.
                4. RED FLAGS: Tell the user exactly when this pain becomes an absolute emergency (e.g. radiates to back, accompanied by fever).
                5. ADVICE: Suggest first-line home care (ICE/HEAT/REST) and which department (e.g. Gastrology, Orthopedics) to visit.`;
            } else {
                systemPrompt = `You are "Sehaat AI Vision Specialist". The user has uploaded a medical report image.
                1. Identify key clinical values (BP, Sugar, Hemoglobin, Vitamin D, etc.).
                2. Explain if these are Normal, Low, or High relative to NABL/Indian labs.
                3. Explain the medical significance of any abnormal value (e.g., "Low Iron might cause tiredness").
                4. Suggest lifestyle tweaks. End with: "Please consult your doctor for a final clinical diagnosis."`;
            }
        }

        const client = getOpenAIClient();
        if (!client) {
            return res.json({
                success: true,
                type: 'LLM_FALLBACK',
                response: generateFallbackResponse(message, userContext, medicineContext),
                confidence: 70,
                citation: "Sehaat Saathi Medical Knowledge Base"
            });
        }

        // Construct OpenAI Payload
        const apiMessages = [];
        apiMessages.push({ role: "system", content: systemPrompt });

        if (conversationHistory) {
            conversationHistory.forEach(msg => {
                apiMessages.push({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text });
            });
        }

        const userContent = [];
        userContent.push({ type: "text", text: message || "Analyze this report image." });

        if (image) {
            userContent.push({
                type: "image_url",
                image_url: {
                    url: image
                }
            });
        }

        apiMessages.push({ role: "user", content: userContent });

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: apiMessages,
            temperature: 0.4,
            max_tokens: 800,
            top_p: 0.95,
        });

        const aiResponse = completion.choices[0].message.content ||
            "I apologize, I couldn't process your query. Please try rephrasing or consult a doctor directly.";

        res.json({
            success: true,
            type: 'LLM_RESPONSE',
            response: aiResponse,
            confidence: 85,
            citation: role || "Sehaat Medical Intelligence"
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
    const fName = userContext?.name || 'there';

    // Emergency keywords - highest priority
    if (input.includes('chest pain') || input.includes('heart') || input.includes('breathing') || input.includes('saans')) {
        return `⚠️ ${fName}, chest pain or breathing difficulty can be serious. \n\n**Please call 102 immediately or go to the nearest emergency room.** \n\nIf this is mild discomfort, rest and avoid exertion. But do not ignore these signs.`;
    }

    // Medicine specific fallback using database context
    if (medicineContext) {
        return `Hello ${fName}, I've scanned our clinical database for details related to your query.\n\n${medicineContext}\n\n**Important:** These suggestions are based on our medical records. However, you should **consult a doctor** before starting any new medication to ensure it is appropriate for your specific health profile.`;
    }

    // Keyword specific fallbacks
    if (input.includes('diet') || input.includes('khana')) {
        return `Hello ${fName}, for general wellness, I recommend a balanced Indian diet with lentils, leafy greens, and seasonal fruits. Avoid excess oil and sugar. For a specific diet plan, please consult our in-app nutritionist.`;
    }

    if (input.includes('report') || input.includes('checkup')) {
        return `I can help you understand reports, ${fName}. Please share the specific values (like Hemoglobin, Sugar, etc.) and I will explain what they mean for your health.`;
    }

    const genericTips = [
        "Stay hydrated and try to get 7-8 hours of sleep.",
        "Include more fiber like oats and papaya in your diet.",
        "Regular 30-minute walks can significantly improve heart health.",
        "Wash your hands frequently to avoid seasonal infections."
    ];
    const randomTip = genericTips[Math.floor(Math.random() * genericTips.length)];

    return `I want to understand your concern better, ${fName}. \n\nSince I couldn't map this to a specific condition, could you tell me: \n1. How long has this been happening? \n2. Are you taking any medications? \n\nTip: ${randomTip}`;
}

// --- Symptom Checker Endpoint (Groq LLM + Smart Clinical Fallback) ---
router.post("/symptom-check", async (req, res) => {
    const { bodyPart, symptoms, intensityMap, gender } = req.body;

    try {
        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) throw new Error("Missing GROQ_API_KEY");

        const groqClient = new OpenAI({
            apiKey: groqApiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const prompt = `
            You are a world-class AI Medical Diagnostician.
            Analyze the following patient profile and symptoms to provide a detailed assessment:
            - Affected Body Part: ${bodyPart}
            - Gender: ${gender}
            - Symptoms Reported: ${symptoms.join(", ")}
            - Intensity Ratings (1-10 Scale): ${JSON.stringify(intensityMap)}

            Provide a JSON response with exactly the following structure (no markdown, raw JSON only):
            {
                "results": [
                    { "name": "Condition Name 1", "prob": 80, "color": "bg-red-500", "advice": "Detailed clinical advice 1..." },
                    { "name": "Condition Name 2", "prob": 15, "color": "bg-orange-500", "advice": "Detailed clinical advice 2..." },
                    { "name": "Condition Name 3", "prob": 5, "color": "bg-yellow-500", "advice": "Detailed clinical advice 3..." }
                ],
                "summary": "A cohesive clinical summary explanation of the symptoms and potential causes..."
            }
        `;

        const chatCompletion = await groqClient.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama3-8b-8192",
            temperature: 0.2,
            response_format: { type: "json_object" }
        });

        const resultData = JSON.parse(chatCompletion.choices[0].message.content);
        return res.status(200).json({
            success: true,
            isFallback: false,
            results: resultData.results,
            summary: resultData.summary
        });

    } catch (err) {
        console.error("Groq Symptom Check Error:", err.message);
        // Smart Clinical Fallback - generates real symptom-specific diagnoses
        const clinicalFallback = generateClinicalFallback(bodyPart, symptoms, intensityMap, gender);
        return res.status(200).json({
            success: true,
            isFallback: true,
            results: clinicalFallback.results,
            summary: clinicalFallback.summary
        });
    }
});

// ============================================================
// Smart Clinical Fallback Engine
// Generates medically-relevant diagnoses based on symptoms
// when the Groq LLM API is unavailable.
// ============================================================
function generateClinicalFallback(bodyPart, symptoms, intensityMap, gender) {
    const s = (symptoms || []).map(x => x.toLowerCase());
    const intensityVals = intensityMap ? Object.values(intensityMap) : [5];
    const maxIntensity = intensityVals.length > 0 ? Math.max(...intensityVals) : 5;
    const isSevere = maxIntensity > 7;

    const conditionMap = [
        {
            keywords: ["headache", "dizziness", "blurred vision", "migraine"],
            bodyParts: ["Head"],
            name: "Tension / Migraine Headache",
            prob: 72,
            color: "bg-purple-500",
            advice: "Rest in a dark, quiet room. Apply a cold compress to your forehead. Paracetamol 500mg can help. If pain is severe (>8/10) or accompanied by stiff neck or vomiting, visit an ER immediately."
        },
        {
            keywords: ["sore throat", "earache", "runny nose", "congestion"],
            bodyParts: ["Head"],
            name: "Upper Respiratory Infection (URI)",
            prob: 68,
            color: "bg-blue-500",
            advice: "Gargle warm salt water, stay hydrated, and rest. Steam inhalation can ease congestion. If fever persists beyond 3 days or you have difficulty swallowing, see a doctor."
        },
        {
            keywords: ["chest pain", "palpitations", "tightness", "shortness of breath"],
            bodyParts: ["Chest"],
            name: "Cardiac / Pulmonary Alert",
            prob: 85,
            color: "bg-red-500",
            advice: "URGENT: Chest pain must not be ignored. If radiating to left arm/jaw or accompanied by sweating, call 102 immediately. If mild, rest, avoid exertion, and visit a cardiologist today."
        },
        {
            keywords: ["cough", "phlegm", "mucus", "wheezing"],
            bodyParts: ["Chest"],
            name: "Bronchitis / Respiratory Infection",
            prob: 65,
            color: "bg-orange-500",
            advice: "Stay well hydrated. Warm steam helps loosen mucus. Avoid cold beverages. If cough persists > 2 weeks or blood appears in sputum, see a pulmonologist."
        },
        {
            keywords: ["stomach ache", "nausea", "bloating", "cramps", "acid reflux"],
            bodyParts: ["Abdomen"],
            name: "Gastritis / Dyspepsia",
            prob: 70,
            color: "bg-amber-500",
            advice: "Eat small, light meals. Avoid spicy, oily foods. Antacids like Gelusil or Pantoprazole may help. If pain is severe or accompanied by black stool, visit a gastroenterologist urgently."
        },
        {
            keywords: ["joint pain", "muscle cramp", "numbness", "stiffness", "swelling"],
            bodyParts: ["Limbs"],
            name: "Musculoskeletal Strain / Arthritis",
            prob: 65,
            color: "bg-teal-500",
            advice: "Apply RICE protocol: Rest, Ice (15 min), Compression bandage, Elevate. Take Ibuprofen 400mg if no contraindications. Persistent swelling > 48h warrants an orthopedic review."
        },
        {
            keywords: ["fever", "chills", "body ache", "fatigue", "loss of appetite"],
            bodyParts: ["General"],
            name: "Viral Fever / Systemic Infection",
            prob: 74,
            color: "bg-rose-500",
            advice: "Rest and stay hydrated (2-3L water/day). Paracetamol for fever (>38.5C). Monitor for rash or persistent fever > 3 days — may indicate Dengue or Typhoid requiring blood tests."
        }
    ];

    const scored = conditionMap
        .filter(c => !c.bodyParts || c.bodyParts.includes(bodyPart) || bodyPart === "General")
        .map(c => {
            const matches = c.keywords.filter(k => s.some(sym => sym.includes(k) || k.includes(sym)));
            return { ...c, score: matches.length, prob: Math.min(95, c.prob + matches.length * 5) };
        })
        .filter(c => c.score > 0)
        .sort((a, b) => b.score - a.score);

    const defaults = {
        Head:    { name: "Tension Headache",          prob: 60, color: "bg-purple-500", advice: "Rest, hydrate well, apply cold compress. Avoid screen time. Visit a neurologist if headaches recur frequently." },
        Chest:   { name: "Musculoskeletal Chest Strain", prob: 55, color: "bg-orange-500", advice: "Deep breathing exercises, rest. If sharp stabbing pain worsens on movement, see a physician." },
        Abdomen: { name: "Indigestion / Gastritis",   prob: 65, color: "bg-amber-500",  advice: "Light diet, avoid spicy food, take antacids. Consult a gastroenterologist if symptoms persist." },
        Limbs:   { name: "Muscle Fatigue / Strain",   prob: 60, color: "bg-teal-500",   advice: "Rest the affected limb, apply warm compress after 24h. Gentle stretching can help recovery." },
        General: { name: "General Viral Illness",     prob: 65, color: "bg-blue-500",   advice: "Rest, stay hydrated, monitor temperature. See a physician if symptoms worsen after 48 hours." }
    };

    const topConditions = scored.length >= 2 ? scored.slice(0, 3) : [
        ...(scored.length > 0 ? scored : [{ ...(defaults[bodyPart] || defaults.General), score: 1 }]),
        { name: "Dehydration / Electrolyte Imbalance", prob: 25, color: "bg-cyan-500",    advice: "Drink ORS or coconut water. Ensure 2-3L fluid intake daily." },
        { name: "Seasonal Allergy / Inflammation",     prob: 15, color: "bg-emerald-500", advice: "Antihistamines (Cetirizine 10mg) can help. Avoid known allergens and dust." }
    ].slice(0, 3);

    const total = topConditions.reduce((sum, c) => sum + c.prob, 0);
    const normalizedResults = topConditions.map(c => ({
        name:   c.name,
        prob:   Math.round((c.prob / total) * 100),
        color:  c.color,
        advice: c.advice
    }));

    const severityNote = isSevere ? " Given the high intensity ratings, please consider consulting a doctor today." : "";
    const symptomList  = (symptoms || []).join(", ");
    const summary      = `Based on your reported ${symptomList} in the ${bodyPart} region, our clinical engine has identified ${normalizedResults[0].name} as the most likely concern (${normalizedResults[0].prob}% probability).${severityNote} This analysis is based on symptom pattern matching and should be confirmed by a licensed physician.`;

    return { results: normalizedResults, summary };
}

export default router;
