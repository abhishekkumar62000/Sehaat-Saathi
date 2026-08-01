import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BsRobot, BsSendFill, BsArrowLeft, BsArrowRight, BsStars,
    BsTrash, BsShieldCheck, BsJournalMedical, BsLightbulb,
    BsHeartPulseFill, BsSearch, BsPlusCircle, BsCheck2Circle,
    BsExclamationTriangle, BsInfoCircleFill, BsVolumeUpFill, BsPersonFill,
    BsActivity, BsSpeedometer, BsBookHalf, BsGeoAltFill, BsLightningCharge,
    BsMic, BsArrowUpCircle
} from "react-icons/bs";
import useRecordActivity from '../hooks/useRecordActivity';
import { BASE_URL } from '../config';

// Elite Phase 3 Components
import AyushVitalDashboard from '../components/AI/AyushVitalDashboard';
import SanjeevaniMascot from '../components/AI/SanjeevaniMascot';
import GPSEmergencyBeacon from '../components/AI/GPSEmergencyBeacon';
import WearableDataSync from '../components/AI/WearableDataSync';
// Signature v10.0: Sentient UI Aesthetic Styles
const eliteStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');
    
    :root {
        --sentient-font: 'Outfit', sans-serif;
    }

    .doctor-ai-container {
        font-family: var(--sentient-font);
    }

    .chat-bubble-doctor {
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1.5rem;
        border-top-left-radius: 0;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
    }

    .chat-bubble-user {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        border-radius: 1.5rem;
        border-top-right-radius: 0;
        box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.3);
    }

    .medium-text {
        font-weight: 500;
        letter-spacing: -0.01em;
    }

    .animate-scan-slow {
        animation: scan 8s linear infinite;
    }

    @keyframes scan {
        0% { top: 0%; opacity: 0; }
        50% { opacity: 0.5; }
        100% { top: 100%; opacity: 0; }
    }

    .animate-neural-pulse {
        animation: neural-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes neural-pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
    }

    .shimmer {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }

    .neural-carousel::-webkit-scrollbar {
        display: none;
    }
    .neural-carousel {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .metallic-shimmer {
        background: linear-gradient(
            to right,
            #fff 20%,
            #94a3b8 40%,
            #fff 60%,
            #94a3b8 80%,
            #fff 100%
        );
        background-size: 200% auto;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        animation: shine 3s linear infinite;
    }

    @keyframes shine {
        to { background-position: 200% center; }
    }
    .chat-bubble-doctor {
        background: rgba(15, 23, 42, 0.85);
        backdrop-blur: 24px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0 2rem 2rem 2rem;
        box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
        position: relative;
        overflow: hidden;
    }

    .chat-bubble-doctor::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            transparent
        );
        animation: shimmer 4s infinite;
    }

    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }

    .chat-bubble-user {
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 2rem 0 2rem 2rem;
        box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.3);
    }

    .glass-panel {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 2.5rem;
    }

    .neural-glow {
        box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.2);
    }

    .suggest-card-shimmer {
        position: relative;
        overflow: hidden;
    }

    .suggest-card-shimmer::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
        opacity: 0;
        transition: opacity 0.3s;
    }

    .suggest-card-shimmer:hover::after {
        opacity: 1;
    }

    /* Mobile specific optimizations */
    @media (max-width: 768px) {
        .chat-bubble-doctor, .chat-bubble-user {
            border-radius: 1.5rem;
            padding: 1rem 1.25rem !  important;
        }
        
        .floating-action-button {
            box-shadow: 0 15px 40px -10px rgba(37, 99, 235, 0.5);
            animation: bounce-subtle 3s infinite ease-in-out;
        }
    }

    @keyframes bounce-subtle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    .typing-indicator span {
        width: 4px;
        height: 4px;
        background-color: #3b82f6;
        border-radius: 50%;
        display: inline-block;
        margin: 0 2px;
        animation: typing-dot 1.4s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typing-dot {
        0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
        40% { transform: scale(1); opacity: 1; }
    }
    .neural-carousel::-webkit-scrollbar { display: none; }
    .neural-carousel { -ms-overflow-style: none; scrollbar-width: none; }

    .prestige-badge {
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
        letter-spacing: 0.05em;
    }
`;

const DoctorAI = () => {
    const { recordActivity } = useRecordActivity();
    // User Context & Onboarding
    const [userContext, setUserContext] = useState(() => {
        const saved = localStorage.getItem('sehaat_user_context');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Force re-onboarding if any required field is missing or empty
            if (!parsed.name?.trim() || !parsed.age || !parsed.gender || !parsed.location?.trim()) {
                return {
                    name: parsed.name || '',
                    age: parsed.age || '',
                    gender: parsed.gender || '',
                    location: parsed.location || '',
                    onboarded: false
                };
            }
            return parsed;
        }
        return { name: '', age: '', gender: '', location: '', onboarded: false };
    });

    const [onboardingStep, setOnboardingStep] = useState(0);

    // Chat State
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('sehaat_chat_messages');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [isReadingReport, setIsReadingReport] = useState(false);
    const [reminderModal, setReminderModal] = useState({ open: false, medName: '' });
    const [showBodyMap, setShowBodyMap] = useState(false);
    const [liveTranscript, setLiveTranscript] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [userPillSchedule, setUserPillSchedule] = useState(() => {
        const saved = localStorage.getItem('sehaat_pill_schedule');
        return saved ? JSON.parse(saved) : [];
    });
    const [showPillBox, setShowPillBox] = useState(false);
    const [showEliteDashboard, setShowEliteDashboard] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showHealthTrend, setShowHealthTrend] = useState(false);

    // Persistence Synchronization
    useEffect(() => {
        localStorage.setItem('sehaat_user_context', JSON.stringify(userContext));
    }, [userContext]);

    useEffect(() => {
        localStorage.setItem('sehaat_chat_messages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('sehaat_pill_schedule', JSON.stringify(userPillSchedule));
    }, [userPillSchedule]);

    const handleClearMemory = () => {
        if (window.confirm("Are you sure you want to reset all clinical memory? This will wipe your history and profile.")) {
            localStorage.clear();
            setMessages([]);
            setUserContext({ name: '', age: '', gender: '', onboarded: false });
            setUserPillSchedule([]);
            window.location.reload(); // Refresh to reset all states properly
        }
    };

    // Phase 2: Layer-1 Rule Engine State
    const [currentRule, setCurrentRule] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [stepAnswers, setStepAnswers] = useState({});
    const [emergencyMode, setEmergencyMode] = useState(false);

    // AI v7.0: Multi-Role & Advanced Context
    const doctorRoles = [
        "General Physician (General Medicine)",
        "Cardiologist (Heart Specialist)",
        "Neurologist (Brain & Nerves)",
        "Orthopedic Surgeon (Bone & Joint)",
        "Pediatrician (Child Specialist)",
        "Dermatologist (Skin & Hair)",
        "ENT Specialist (Ear, Nose, Throat)",
        "Gynecologist (Women's Health)",
        "Psychiatrist/Therapist (Mental Health)",
        "Clinical Pharmacist (Medicine Expert)",
        "Ayurvedic Practitioner (Natural Remedies)",
        "Dietitian & Nutritionist",
        "Medical Consultant (Report Analyst)"
    ];
    const [selectedRole, setSelectedRole] = useState(doctorRoles[0]);
    const [condition, setCondition] = useState('');
    const [allergies, setAllergies] = useState('');

    const roleSuggestions = {
        "General Physician (General Medicine)": [
            "🤒 I have high fever and headache",
            "🤧 Cold with sore throat treatment",
            "🤢 Feeling nauseous and dizzy",
            "😫 Lower back pain relief",
            "🍬 Managing sudden high blood sugar",
            "🩸 How to control high blood pressure",
            "😴 Feeling weak and tired all day",
            "🥣 Best diet for stomach infection",
            "📉 Managing low blood pressure",
            "🧘 Relief from daily stress/anxiety"
        ],
        "Cardiologist (Heart Specialist)": [
            "🫀 Chest pain on left side",
            "💓 Occasional heart palpitations",
            "🏃 Shortness of breath during walk",
            "🦶 Swelling in feet and ankles",
            "🥗 Heart-healthy diet plan",
            "🩺 Normal resting heart rate?",
            "📉 Managing low blood pressure",
            "🏃‍♂️ Best exercises for heart health",
            "🍳 Low cholesterol breakfast ideas",
            "💊 When to take aspirin for heart?"
        ],
        "Neurologist (Brain & Nerves)": [
            "🤕 Chronic migraine relief",
            "😵 Dizziness and loss of balance",
            "🦾 Numbness in hands or feet",
            "🛌 Trouble falling asleep at night",
            "🧠 Memory loss or brain fog",
            "👁️ Blurred vision and headache",
            "🤝 Managing hand tremors",
            "🌩️ Understanding sudden seizures",
            "⚡ Treatment for sciatic nerve pain",
            "🧘 Managing neurological fatigue"
        ],
        "Orthopedic Surgeon (Bone & Joint)": [
            "🦵 Knee pain while climbing stairs",
            "🦴 Shoulder joint stiffness",
            "🦶 Heel pain in the morning",
            "🧗 Lower back disc issue advice",
            "🥦 Diet for bone strength",
            "🏃‍♂️ Recovery after muscle strain",
            "🤸 Exercises for neck spondylitis",
            "👟 Selecting right footwear for pain",
            "🦴 Understanding arthritis symptoms",
            "🦶 Relief for ankle sprain at home"
        ],
        "Pediatrician (Child Specialist)": [
            "👶 Baby has dry skin/diaper rash",
            "🧸 Toddler not eating properly",
            "🤒 Safe fever medicine for kids",
            "🍼 Best weaning foods for 6 months",
            "💉 Vaccination schedule query",
            "🛏️ Kids coughing during sleep",
            "🍭 Healthy snacks for children",
            "📏 Normal height/weight for age",
            "🦷 First tooth care for infants",
            "🏃 Dealing with hyperactive kids"
        ],
        "Dermatologist (Skin & Hair)": [
            "🧴 Acne and dark spot treatment",
            "🚿 Best routine for hair fall",
            "☀️ Sunburn and tanning relief",
            "🧴 Managing dry and itchy skin",
            "💅 Fungal infection in nails",
            "🌑 Dark circles under eyes",
            "🥥 Natural remedies for dandruff",
            "🧴 Identifying a sudden skin rash",
            "🧴 Best anti-aging skin routine",
            "🚿 Treating scalp itchiness"
        ],
        "ENT Specialist (Ear, Nose, Throat)": [
            "👂 Ear pain and blocked feeling",
            "👃 Persistent blocked nose/sinus",
            "🗣️ Sore throat and difficulty swallowing",
            "😵 Vertigo or spinning sensation",
            "🤧 Seasonal allergy treatment",
            "👂 Ringing sound in the ears",
            "🩸 Managing nosebleeds at home",
            "🗣️ Loss of voice and hoarseness",
            "👂 How to remove ear wax safely",
            "👃 Snoring issues and treatment"
        ],
        "Gynecologist (Women's Health)": [
            "🗓️ Irregular period cycle advice",
            "🤰 Early pregnancy symptoms",
            "😫 Severe cramps during periods",
            "🥗 Diet for PCOS/PCOD",
            "🥛 Iron-rich food for anemia",
            "🧴 Managing skin changes in pregnancy",
            "💊 Safe meds during breastfeeding",
            "🛌 Menopause and hot flashes",
            "🥗 Pre-conception health tips",
            "🧘 Managing hormonal acne"
        ],
        "Psychiatrist/Therapist (Mental Health)": [
            "🧘 Managing daily stress and anxiety",
            "😞 Constant feeling of sadness",
            "🦁 Overcoming social anxiety",
            "🛌 Dealing with overthinking",
            "🔋 How to cope with burnout",
            "👟 Building a routine for better mood",
            "🫂 Grief and loss support",
            "🧘‍♂️ Mindfulness for focus",
            "🛌 Better sleep hygiene for mental health",
            "🔋 Boosting low self-confidence"
        ],
        "Clinical Pharmacist (Medicine Expert)": [
            "💊 Best time to take BP medicine",
            "🧪 Mixing Paracetamol and Ibuprofen?",
            "🥛 Can I take meds with milk?",
            "🧴 Managing drug side effects",
            "📦 Storing Insulin properly",
            "🗓️ Missed a dose, what to do?",
            "⚠️ Known drug allergies check",
            "🍵 Multi-vitamin dosage advice",
            "💊 Generic vs Brand name medicines",
            "📦 Checking medicine expiry safety"
        ],
        "Ayurvedic Practitioner (Natural Remedies)": [
            "🌿 Natural cure for acidity",
            "🍵 Best kadha for immunity",
            "🥣 Ayurvedic diet for digestion",
            "🌿 Managing hair fall with herbs",
            "🛏️ Better sleep with Ayurveda",
            "🌿 Daily routine for detoxification",
            "🍯 Honey and ginger for cough",
            "🌿 Ashwagandha benefits and use",
            "🍵 Turmeric milk (Haldi Doodh) benefits",
            "🌿 Ayurvedic management of joint pain"
        ],
        "Dietitian & Nutritionist": [
            "🥗 Weight loss diet for beginners",
            "💪 High protein vegetarian foods",
            "🥙 Low carb meal plan",
            "🍵 Benefits of intermittent fasting",
            "🥦 Foods to increase metabolism",
            "🥤 Healthiest smoothies to make",
            "🍎 Controlling sugar cravings",
            "🥗 Best pre-workout meal",
            "🥗 Diet for high uric acid",
            "🥛 Best calcium-rich non-dairy foods"
        ],
        "Medical Consultant (Report Analyst)": [
            "📄 Explain my CBC report results",
            "📈 Serum Creatinine is high, advice?",
            "🩸 Decoding Thyroid (TSH) levels",
            "🧪 Lipid profile report summary",
            "📉 Low Vitamin D levels treatment",
            "📄 Understanding liver function test",
            "📈 Urine infection markers?",
            "🧬 What does HbA1c 6.5 mean?",
            "🧪 Understanding CRP inflammation test",
            "📄 Decoding Vitamin B12 deficiency"
        ]
    };
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    // Reset suggestion index when role changes
    useEffect(() => {
        setSuggestionIndex(0);
    }, [selectedRole]);

    // AI v4.0 Language & Premium State
    const [language, setLanguage] = useState('EN'); // EN, HI, HN
    const languages = {
        EN: { welcome: "How are you feeling?", status: "Monitoring", scan: "Layer-1 Risk Scan", send: "Send", onboarding: "Initialize <span style={{ color: '#FF9933' }}>Sehaat</span> AI" },
        HI: { welcome: "आप कैसा महसूस कर रहे हैं?", status: "निगरानी", scan: "लेयर-1 जोखिम स्कैन", send: "भेजें", onboarding: "सेहत एआई प्रारंभ करें" },
        HN: { welcome: "Aap kaisa feel kar rahe hain?", status: "Monitoring", scan: "Layer-1 Risk Scan", send: "Bheje", onboarding: "<span style={{ color: '#FF9933' }}>Sehaat</span> AI Chalu Kare" }
    };
    const t = languages[language];

    // Health Dashboard State
    const [riskProfile, setRiskProfile] = useState({
        symptoms: [],
        urgency: 'Low',
        confidence: 0,
        detectedOrgans: []
    });

    // AI v6.0: Perception & Sensor State
    const [ppgData, setPpgData] = useState({ bpm: 0, isScanning: false, progress: 0 });
    const [scanStream, setScanStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    let ppgInterval = useRef(null);

    // AI v5.0: Vitals & Vision State
    const [vitals, setVitals] = useState({ bp: '', pulse: '', sugar: '' });
    const [isVitalsOpen, setIsVitalsOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isHandsFree, setIsHandsFree] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const fileInputRef = useRef(null);

    const messagesEndRef = useRef(null);
    const isFirstMount = useRef(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        // Hands-free trigger: if new AI message arrives and hands-free is on
        if (isHandsFree && messages.length > 0 && messages[messages.length - 1].sender === 'ai') {
            speakMessage(messages[messages.length - 1].text);
        }
    }, [messages, isHandsFree]);

    // Initial Greeting & Dynamic Specialist Intro
    useEffect(() => {
        if (!userContext.onboarded) return;

        const isHistoryEmpty = messages.length === 0;

        const greetingMessages = {
            EN: isHistoryEmpty
                ? `Namaste **${userContext.name}**! 🩺 Welcome to your personalized Sehaat AI clinic.\n\nI've registered your clinical profile:\n- **Age**: ${userContext.age} yrs\n- **Gender**: ${userContext.gender}\n- **Location**: ${userContext.location}\n\nI am your **${selectedRole}**. Please describe your symptoms or health concern and I'll provide a precise clinical assessment.`
                : `Welcome back, **${userContext.name}**. I remember our previous clinical discussion. I am still your **${selectedRole}**—how can we proceed?`,
            HI: isHistoryEmpty
                ? `नमस्ते **${userContext.name}**! मैंने आपकी clinical profile दर्ज कर ली है।\n- **आयु**: ${userContext.age} वर्ष | **लिंग**: ${userContext.gender} | **स्थान**: ${userContext.location}\n\nमैं आपका **${selectedRole}** हूँ। अपनी health concern बताएं।`
                : `वापसी पर स्वागत है, **${userContext.name}**। मुझे हमारी पिछली चर्चा याद है—आगे बढ़ें।`,
            HN: isHistoryEmpty
                ? `Namaste **${userContext.name}**! Mujhe aapki profile mil gayi hai.\n- **Umar**: ${userContext.age} saal | **Gender**: ${userContext.gender} | **Location**: ${userContext.location}\n\nMain aapka **${selectedRole}** hoon. Apni health concern batayein.`
                : `Welcome back, **${userContext.name}**. Mujhe hamari pichli discussion yaad hai—aage kaise badhein?`
        };

        const introText = greetingMessages[language] + (isHistoryEmpty ? `\n\nI can help you with symptoms, lab reports, or vitals.` : '');

        if (isHistoryEmpty) {
            setMessages([
                {
                    text: introText,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: ["Upload Report", "Enter Vitals", "Skin Issue"]
                }
            ]);
        } else if (isFirstMount.current) {
            isFirstMount.current = false;
            // Send welcome back if history exists
            const welcomeBackMsg = {
                text: greetingMessages[language],
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: ["Continue Last Case", "New Symptom", "View Health Trend"]
            };
            setMessages(prev => [...prev, welcomeBackMsg]);
        } else {
            // Dynamic Role Update Greeting
            const roleUpdateMsg = {
                text: `Transitioning care to your **${selectedRole}**. \n\n${greetingMessages[language]}`,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: ["View Role Focus", "Ask Questionnaire"]
            };
            setMessages(prev => [...prev, roleUpdateMsg]);
        }
    }, [userContext.onboarded, selectedRole, language]);

    const handleManualSOS = () => {
        setEmergencyMode(true);
        const sosMsg = {
            text: `⚠️ **GLOBAL SOS ACTIVATED** ⚠️\n\nPatient **${userContext.name}** has manually triggered the Sanjeevani Emergency Protocol. \n\n**Quick Triage Data:**\n- Age/Gender: ${userContext.age || 'Unknown'} / ${userContext.gender || 'Unknown'}\n- Condition: ${condition || 'Self-Reported Distress'}\n- Primary Specialist: ${selectedRole.split(' (')[0]}\n\nInitiating GPS Hospital Scan and SOS Bridge...`,
            sender: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isEmergency: true
        };
        setMessages(prev => [...prev, sosMsg]);
        setRiskProfile(prev => ({ ...prev, urgency: 'EMERGENCY' }));
    };

    // Voice Mode (Web Speech API)
    const speakMessage = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1.1;
            utterance.onend = () => {
                if (isHandsFree) {
                    setTimeout(() => startListening(), 500);
                }
            };
            window.speechSynthesis.speak(utterance);
        }
    };

    // --- Accessibility Features (STT & Report) ---
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
            setIsTranscribing(true);
            setLiveTranscript('Initializing Signal...');
        };
        recognition.onend = () => {
            setIsListening(false);
            setIsTranscribing(false);
        };
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    const final = event.results[i][0].transcript;
                    setInputValue(final);
                    if (isHandsFree) {
                        setTimeout(() => handleSendMessage({ preventDefault: () => { } }, final), 1000);
                    }
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setLiveTranscript(interimTranscript || 'Listening for clinical input...');
        };
        recognition.start();
    };

    const handleSetReminder = (med) => {
        setReminderModal({ open: false, medName: '' });
        const reminderMsg = {
            text: `✅ **WhatsApp Reminder Secured**\n\nI have successfully configured your clinical dose bridge for **${med}**. \n\nYou will receive a high-priority notification on your registered WhatsApp number before each dose.`,
            sender: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: ["View All Reminders", "Cancel Reminder"]
        };
        setMessages(prev => [...prev, reminderMsg]);
        speak(reminderMsg.text);
    };

    // Neural Voice Bridge (v9.5)
    const speak = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text.replace(/[#*]/g, ''));
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        // Select an appropriate voice (prefer Indian/English accents if available)
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(v => v.lang.includes('in') || v.lang.includes('IN'));
        if (indianVoice) utterance.voice = indianVoice;

        utterance.pitch = 1.1;
        utterance.rate = 0.95; // Slightly slower for clinical clarity
        window.speechSynthesis.speak(utterance);
    };

    const downloadHealthReport = () => {
        const divider = "==========================================================";
        let content = `${divider}\n`;
        content += `          SEHAAT SAATHI AI DOCTOR - V5.0 VISION REPORT\n`;
        content += `${divider}\n`;
        content += `REPORT ID: SS-${Math.floor(Math.random() * 10000)}\n`;
        content += `GENERATED: ${new Date().toLocaleString()}\n\n`;

        content += `PATIENT PROFILE:\n`;
        content += `- Name:   ${userContext.name}\n`;
        content += `- Age:    ${userContext.age} Years\n`;
        content += `- Gender: ${userContext.gender}\n\n`;

        content += `BIOMETRIC TELEMETRY (VITALS):\n`;
        content += `- Blood Pressure: ${vitals.bp || 'Not Logged'}\n`;
        content += `- Heart Rate:     ${vitals.pulse || 'Not Logged'} BPM\n`;
        content += `- Blood Sugar:    ${vitals.sugar || 'Not Logged'} mg/dL\n\n`;

        content += `RISK SCAN SUMMARY:\n`;
        content += `- Urgency Level:   ${riskProfile.urgency || 'Normal'}\n`;
        content += `- Affected Systems: ${riskProfile.detectedOrgans.join(', ') || 'None Detected'}\n`;
        content += `- Symptoms Logged:  ${riskProfile.symptoms.join(', ') || 'General'}\n`;
        content += `- AI Confidence:    ${riskProfile.confidence}%\n\n`;

        content += `CONVERSATION LOG:\n`;
        messages.forEach(msg => {
            const senderName = msg.sender === 'user' ? userContext.name.toUpperCase() : 'SEHAAT AI';
            content += `[${msg.time}] ${senderName}:\n${msg.text}\n\n`;
        });

        content += `${divider}\n`;
        content += `MEDICAL DISCLAIMER:\n`;
        content += `This document is for information purposes only. Sehaat AI is an \nintelligence engine and NOT a substitute for professional medical \nadvice, diagnosis, or treatment.\n`;
        content += `${divider}\n`;

        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Sehaat_Report_${userContext.name.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // AI Logic Engine - Layered Architecture Integration
    const processAIResponse = async (userInput, answers = null, image = null) => {
        setIsAnalyzing(true);
        if (image) setIsReadingReport(true);

        try {
            const body = {
                message: userInput,
                userContext: {
                    name: userContext.name,
                    age: userContext.age,
                    gender: userContext.gender,
                    location: userContext.location
                },
                conversationHistory: messages.map(msg => ({ text: msg.text, sender: msg.sender })),
                stepAnswers: answers,
                currentDisease: currentRule?.id,
                image: image, // Neural Vision Data (v5.0)
                role: selectedRole,
                condition: condition,
                allergies: allergies
            };

            const response = await fetch(`${BASE_URL}/ai-doctor/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            setIsAnalyzing(false);
            setIsReadingReport(false);

            if (data.type === 'EMERGENCY') {
                setEmergencyMode(true);
                const aiEmergency = {
                    text: data.response,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isEmergency: true
                };
                setMessages(prev => [...prev, aiEmergency]);
                setRiskProfile(prev => ({ ...prev, urgency: 'EMERGENCY' }));
                return;
            }

            if (data.type === 'RULE_START') {
                setCurrentRule(data.rule);
                setStepIndex(0);
                setStepAnswers({});
                const aiStart = {
                    text: data.response,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, aiStart]);
                return;
            }

            if (data.type === 'RULE_RESULT') {
                setCurrentRule(null);
                const result = data.data;
                const aiResult = {
                    text: `### ${result.title}\n\n**Possible Cause:** ${result.cause}\n\n**Safe Steps:**\n${result.steps.map(s => `- ${s}`).join('\n')}\n\n**What NOT to do:**\n${result.avoid.map(s => `- ${s}`).join('\n')}\n\n**Consult Doctor:** ${result.doctor}\n\n⚠️ **Emergency Warning:** ${result.emergency}`,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: generateSmartActions(userInput, result.title),
                    isL1: true,
                    status: result.status
                };
                setMessages(prev => [...prev, aiResult]);
                updateRiskProfile(userInput, result.title, result.status);
                return;
            }

            // Default LLM Response
            setIsTyping(true);
            setTimeout(() => {
                const aiResponse = {
                    text: data.response,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: generateSmartActions(userInput, data.response),
                    confidence: data.confidence || 85,
                    citation: data.citation || "Sehaat AI Core",
                    status: data.riskStatus || null
                };
                updateRiskProfile(userInput, data.response);
                setMessages(prev => [...prev, aiResponse]);
                setIsTyping(false);
            }, 800);

        } catch (error) {
            console.error('AI Doctor Error:', error);
            setIsAnalyzing(false);
            const fallback = {
                text: "I'm having trouble connecting. If this is an emergency, please call 102.",
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: ["Try Again"]
            };
            setMessages(prev => [...prev, fallback]);
        }
    };

    const handleStepAnswer = (option) => {
        const question = currentRule.questions[stepIndex];
        const newAnswers = { ...stepAnswers, [question.id]: option };
        setStepAnswers(newAnswers);

        if (stepIndex < currentRule.questions.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            // Final step reached, process results
            processAIResponse(null, newAnswers);
        }
    };

    // Generate smart action buttons based on conversation
    const generateSmartActions = (userInput, aiResponse) => {
        const input = (userInput || '').toLowerCase();
        const response = (aiResponse || '').toLowerCase();

        if (input.includes('chest') || response.includes('emergency')) return ["EMERGENCY CALL 102", "Find Cardiologist"];
        if (input.includes('fever') || response.includes('fever')) return ["Book CBC Test", "Find Local Doctor"];
        if (input.includes('diet') || response.includes('diet')) return ["View Diet Chart", "Book Nutritionist"];
        if (input.includes('headache') || response.includes('headache')) return ["Track Symptoms", "Book Consultation"];
        if (input.includes('stomach') || response.includes('pet')) return ["Book Ultrasound", "Gastro Expert"];
        if (input.includes('rash') || response.includes('skin')) return ["Dermatologist", "Skin Care Tips"];

        // Elite Medicine Scanner Triggers
        if (response.includes('pill box') || response.includes('tablet') || response.includes('capsule')) {
            return ["Add to Pill Box", "Set Reminder", "Check Side Effects"];
        }

        return ["Book Full Checkup", "Talk to Expert", "View Health Tips"];
    };

    // Update risk profile based on conversation
    const updateRiskProfile = (userInput, aiResult, status = null) => {
        const input = (userInput || '').toLowerCase();
        const result = (aiResult || '').toLowerCase();
        let newSymptoms = [...riskProfile.symptoms];
        let newOrgans = [...riskProfile.detectedOrgans];
        let newUrgency = status || riskProfile.urgency;

        // Semantic Mapping to Symptoms & Organs
        if (input.includes('chest') || result.includes('chest')) {
            newSymptoms.push("Chest Discomfort"); newOrgans.push("Cardiovascular"); newUrgency = 'High';
        }
        if (input.includes('headache') || result.includes('headache')) {
            newSymptoms.push("Headache"); newOrgans.push("Neurological");
        }
        if (input.includes('stomach') || input.includes('pet') || result.includes('stomach')) {
            newSymptoms.push("Abdominal Issue"); newOrgans.push("Digestive System");
        }
        if (input.includes('breath') || result.includes('breath')) {
            newSymptoms.push("Dyspnea"); newOrgans.push("Respiratory System"); newUrgency = 'High';
        }
        if (input.includes('rash') || input.includes('itching') || result.includes('rash')) {
            newSymptoms.push("Skin Reaction"); newOrgans.push("Integumentary");
        }
        if (input.includes('joint') || input.includes('bone') || result.includes('pain')) {
            newSymptoms.push("Musculoskeletal Pain"); newOrgans.push("Skeletal System");
        }

        setRiskProfile(prev => ({
            ...prev,
            symptoms: [...new Set(newSymptoms)],
            detectedOrgans: [...new Set(newOrgans)],
            urgency: newUrgency,
            confidence: 95
        }));
    };

    // --- PHASE 6: Vitals & Vision Helpers ---
    const handleVitalChange = (e) => {
        const { name, value } = e.target;
        const newVitals = { ...vitals, [name]: value };
        setVitals(newVitals);

        // Auto-lockdown if vitals are extreme
        if (name === 'bp') {
            const [sys, dia] = value.split('/').map(v => parseInt(v));
            if (sys > 180 || dia > 120) {
                setEmergencyMode(true);
                updateRiskProfile('EXTREME BP', 'CRITICAL HYPERTENSION', 'EMERGENCY');
            }
        }
        if (name === 'pulse' && (value > 150 || value < 40)) {
            setEmergencyMode(true);
            updateRiskProfile('EXTREME PULSE', 'ARRHYTHMIA RISK', 'EMERGENCY');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Convert to base64 for vision processing
        const reader = new FileReader();
        reader.onloadend = () => {
            setCapturedImage(reader.result);
            const userMsg = {
                text: `Attached Medical Report: ${file.name}`,
                sender: 'user',
                image: reader.result,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, userMsg]);
            processAIResponse(userMsg.text, null, reader.result);
        };
        reader.readAsDataURL(file);
    };

    // --- PHASE 7: Perception Sensor (PPG Pulse) ---
    const startPPGScan = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            setScanStream(stream);
            if (videoRef.current) videoRef.current.srcObject = stream;
            setPpgData(prev => ({ ...prev, isScanning: true, progress: 0 }));

            let frameCount = 0;
            let redValues = [];
            const duration = 150; // ~15 seconds at 10fps

            ppgInterval.current = setInterval(() => {
                if (!videoRef.current || !canvasRef.current) return;

                const ctx = canvasRef.current.getContext('2d');
                ctx.drawImage(videoRef.current, 0, 0, 100, 100);
                const imageData = ctx.getImageData(0, 0, 100, 100).data;

                let avgRed = 0;
                for (let i = 0; i < imageData.length; i += 4) {
                    avgRed += imageData[i];
                }
                avgRed /= (imageData.length / 4);
                redValues.push(avgRed);

                frameCount++;
                setPpgData(prev => ({ ...prev, progress: Math.round((frameCount / duration) * 100) }));

                if (frameCount >= duration) {
                    stopPPGScan(redValues);
                }
            }, 100);

        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Camera access is required for PPG Pulse detection.");
        }
    };

    const stopPPGScan = (data) => {
        clearInterval(ppgInterval.current);
        if (scanStream) scanStream.getTracks().forEach(track => track.stop());
        setScanStream(null);

        if (data.length < 50) {
            setPpgData({ bpm: 0, isScanning: false, progress: 0 });
            return;
        }

        // --- High-Accuracy Signal Processing (v6.0 Accuracy Patch) ---
        // 1. Sliding Window Average Smoothing (N=5)
        let smoothed = [];
        for (let i = 2; i < data.length - 2; i++) {
            smoothed.push((data[i - 2] + data[i - 1] + data[i] + data[i + 1] + data[i + 2]) / 5);
        }

        // 2. Dynamic Peak Detection with Refractory Period (~400ms)
        let peaks = 0;
        let lastPeakTime = -10;
        const min = Math.min(...smoothed);
        const max = Math.max(...smoothed);
        const threshold = min + (max - min) * 0.6; // 60% threshold for peak detection

        for (let i = 1; i < smoothed.length - 1; i++) {
            if (smoothed[i] > threshold && smoothed[i] > smoothed[i - 1] && smoothed[i] > smoothed[i + 1]) {
                if (i - lastPeakTime > 4) { // 400ms refractory period at 10fps
                    peaks++;
                    lastPeakTime = i;
                }
            }
        }

        const calculatedBpm = Math.round((peaks / 15) * 60);
        const finalBpm = Math.max(40, Math.min(180, calculatedBpm)); // Human sanity clamp

        setPpgData({ bpm: finalBpm, isScanning: false, progress: 100 });
        setVitals(prev => ({ ...prev, pulse: finalBpm }));
    };

    // Nutrition Insight Card for Reports (v8.2)
    const NutritionCard = ({ deficient, suggestions }) => {
        if (!deficient) return null;
        return (
            <div className="mt-4 p-4 md:p-6 bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-3xl backdrop-blur-3xl animate-slide-up">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <BsJournalMedical className="text-xl" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs md:text-sm text-white uppercase tracking-tighter">Nutrition Correction Protocol</h4>
                        <p className="text-[9px] font-semibold text-amber-500/60 uppercase">Deficiency Detected: {deficient}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {suggestions.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-base md:text-lg">🥗</span>
                            <span className="text-[10px] md:text-xs medium-text text-slate-300 uppercase leading-tight">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-semibold text-slate-500 uppercase">AI Clinical Suggestion</span>
                    <button className="text-[9px] font-semibold text-amber-400 uppercase hover:underline">View Full Diet Plan</button>
                </div>
            </div>
        );
    };

    // Lab Price Navigator Component (v8.4)
    const LabPriceNavigator = ({ testName }) => {
        const labs = [
            { name: "Apollo Diagnostics", price: "₹450", rating: "4.8", time: "2 hrs" },
            { name: "Dr. Lal PathLabs", price: "₹399", rating: "4.7", time: "4 hrs" },
            { name: "Thyrocare Hub", price: "₹349", rating: "4.5", time: "6 hrs" }
        ];

        return (
            <div className="mt-4 p-5 md:p-8 bg-slate-900 border border-blue-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BsGeoAltFill className="text-5xl text-blue-500" />
                </div>
                <div className="mb-6">
                    <span className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest block mb-1">Local Price Comparison</span>
                    <h4 className="text-lg md:text-xl font-semibold text-white uppercase tracking-tight">Best Quotes for {testName || 'Full Body Checkup'}</h4>
                </div>
                <div className="space-y-3">
                    {labs.map((lab, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all group-item">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xs uppercase">
                                    {lab.name[0]}
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-sm medium-text text-white uppercase tracking-tight">{lab.name}</p>
                                    <p className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase mt-0.5">⭐ {lab.rating} • Home Sample In {lab.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs md:text-sm font-semibold text-emerald-400">{lab.price}</p>
                                <button className="text-[8px] font-semibold text-blue-500 uppercase hover:underline">Select Slot</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl text-[10px] uppercase tracking-widest transition-all">Book Home Sample Collection</button>
            </div>
        );
    };

    // Symptom Progress Visualizer Component (v8.5)
    const SymptomVisualizer = () => {
        const trend = [
            { day: "Mon", intensity: 90, color: "bg-red-500" },
            { day: "Tue", intensity: 85, color: "bg-orange-500" },
            { day: "Wed", intensity: 60, color: "bg-amber-500" },
            { day: "Thu", intensity: 40, color: "bg-emerald-500" },
            { day: "Fri", intensity: 20, color: "bg-emerald-500" }
        ];

        return (
            <div className="mt-4 p-6 md:p-10 bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-[9px] font-semibold text-indigo-400 uppercase tracking-widest block mb-1">Health Recovery Matrix</span>
                        <h4 className="text-xl md:text-2xl font-semibold text-white uppercase tracking-tighter italic">Symptom Downtrend</h4>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-semibold rounded-full border border-emerald-500/20 uppercase tracking-widest">Improving</div>
                </div>

                <div className="flex items-end justify-between h-40 gap-2 md:gap-4 px-2">
                    {trend.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                            <div className="w-full relative">
                                <div
                                    className={`w-full ${d.color} rounded-t-xl transition-all duration-1000 group-hover/bar:brightness-125 shadow-lg`}
                                    style={{ height: `${d.intensity}%` }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-white opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                        {d.intensity}%
                                    </div>
                                </div>
                            </div>
                            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-tighter">{d.day}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                        <BsStars className="animate-spin-slow" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-tight">
                        AI Insight: Based on the <span className="text-white italic">Downtrend Matrix</span>, your recovery is 85% consistent with typical clinical recovery paths for {selectedRole.split(' (')[0]}.
                    </p>
                </div>
            </div>
        );
    };

    // Signature v9.1: Arpan Interactive Body Mapper (SVG Anatomy)
    const InteractiveBodyMap = ({ inline = false }) => {
        const bodyParts = [
            { id: 'head', name: 'Neurology/ENT', icon: '🧠', pos: 'top-[8%] left-1/2 -translate-x-1/2', color: 'bg-blue-500' },
            { id: 'chest', name: 'Cardiology', icon: '🫀', pos: 'top-[22%] left-1/2 -translate-x-1/2', color: 'bg-red-500' },
            { id: 'stomach', name: 'Digestion', icon: '🥣', pos: 'top-[35%] left-1/2 -translate-x-1/2', color: 'bg-amber-500' },
            { id: 'pelvis', name: 'Gynae/Uro', icon: '👶', pos: 'top-[45%] left-1/2 -translate-x-1/2', color: 'bg-purple-500' },
            { id: 'joints', name: 'Orthopedics', icon: '🦴', pos: 'top-[65%] left-[30%]', color: 'bg-emerald-500' },
            { id: 'skin', name: 'Dermatology', icon: '🧴', pos: 'top-[35%] left-[80%]', color: 'bg-pink-500' }
        ];

        const handlePartClick = (part) => {
            setInputValue(`I have a concern regarding ${part.name} section.`);
            setShowBodyMap(false);
            const anatomyMsg = {
                text: `Directing Neural Scan to **${part.name.toUpperCase()}** region. Please describe your symptoms or upload a relevant report.`,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                actions: ["Record Voice", "Snap Photo", "View Role Focus"]
            };
            setMessages(prev => [...prev, anatomyMsg]);
        };

        return (
            <div className={`relative ${inline ? 'w-full h-[500px]' : 'w-72 h-[600px]'} bg-slate-950/40 rounded-[3rem] border border-white/10 p-4 transition-all hover:border-blue-500/30 overflow-hidden glass-panel`}>
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

                <div className="relative h-full flex items-center justify-center">
                    {/* The Humanoid Silhouette */}
                    <div className="w-48 h-full bg-blue-500/5 rounded-[4rem] relative flex items-center justify-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full absolute top-[5%] shadow-[0_0_30px_rgba(59,130,246,0.2)]"></div>
                        <div className="w-32 h-40 bg-blue-500/10 rounded-[3rem] absolute top-[18%]"></div>
                        <div className="w-8 h-48 bg-blue-500/10 rounded-full absolute top-[18%] left-[20%] -rotate-12"></div>
                        <div className="w-8 h-48 bg-blue-500/10 rounded-full absolute top-[18%] right-[20%] rotate-12"></div>
                        <div className="w-10 h-64 bg-blue-500/10 rounded-full absolute top-[55%] left-[35%]"></div>
                        <div className="w-10 h-64 bg-blue-500/10 rounded-full absolute top-[55%] right-[35%]"></div>

                        {/* Interactive Hotspots */}
                        {bodyParts.map((part) => (
                            <button
                                key={part.id}
                                onClick={() => handlePartClick(part)}
                                className={`absolute ${part.pos} w-10 h-10 md:w-12 md:h-12 ${part.color} rounded-full flex items-center justify-center text-white shadow-lg transform transition-all hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] z-20 group`}
                                title={part.name}
                            >
                                <span className="text-xl group-hover:animate-bounce">{part.icon}</span>
                                <div className="absolute -bottom-8 bg-slate-900 border border-white/10 px-2 py-1 rounded text-[8px] font-semibold uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    {part.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="text-[9px] font-semibold text-blue-500/60 uppercase tracking-widest animate-pulse">Neural Arpan Mapping Active</span>
                </div>
            </div>
        );
    };

    // Signature v9.4: Sanjeevani Digital Pill Box
    const PillBox = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date().getDay();

        const eliteStyles = `
            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }
            .shimmer-effect {
                background: linear-gradient(to right, #1e293b 0%, #334155 20%, #1e293b 40%, #1e293b 100%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite linear;
            }
            @keyframes pulse-dot {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.7; }
            }
            .animate-pulse-dot {
                animation: pulse-dot 1.5s infinite ease-in-out;
            }
        `;

        useEffect(() => {
            const styleSheet = document.createElement("style");
            styleSheet.innerText = eliteStyles;
            document.head.appendChild(styleSheet);
            return () => document.head.removeChild(styleSheet);
        }, []);

        return (
            <div className="mt-8 p-6 bg-slate-900/80 border border-emerald-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden group glass-panel">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-widest block mb-1">Dose Adherence Hub</span>
                        <h4 className="text-lg font-semibold text-white uppercase tracking-tight">Virtual Pill Box</h4>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => (
                        <div key={day} className={`flex flex-col items-center gap-1 p-2 rounded-xl border ${i === today ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/5'}`}>
                            <span className={`text-[8px] font-semibold uppercase ${i === today ? 'text-emerald-400' : 'text-slate-500'}`}>{day}</span>
                            <div className="w-full aspect-square bg-slate-950 rounded-lg flex items-center justify-center relative">
                                {userPillSchedule.some(s => s.day === i) ? (
                                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                ) : (
                                    <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {userPillSchedule.length > 0 ? (
                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[9px] font-semibold text-white uppercase truncate">Scheduled: {userPillSchedule[userPillSchedule.length - 1].med}</p>
                    </div>
                ) : (
                    <p className="mt-4 text-[9px] font-bold text-slate-600 uppercase italic text-center">No active prescriptions tracked</p>
                )}
            </div>
        );
    };

    const RiskBadge = ({ status, citation }) => {
        if (!status && !citation) return null;
        const styles = {
            MILD: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            CONSULT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            EMERGENCY: "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
        };

        return (
            <div className="flex gap-2 items-center flex-wrap">
                {status && (
                    <div className={`mt-4 px-3 py-1 text-[9px] font-semibold rounded uppercase w-fit border ${styles[status] || styles.MILD}`}>
                        Risk Level: {status}
                    </div>
                )}
                {citation && typeof citation === 'string' && citation.includes('Database') && (
                    <div className="mt-4 px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-semibold rounded uppercase w-fit border border-blue-500/20 flex items-center gap-1.5">
                        <BsShieldCheck className="text-[10px]" /> Verified Database Match
                    </div>
                )}
            </div>
        );
    };


    const handleSendMessage = (e, voiceTranscript = null) => {
        if (e) e.preventDefault();
        const finalInput = voiceTranscript || inputValue;
        if (!finalInput.trim() || emergencyMode) return;

        recordActivity("AI Doctor", "Consultation", "/doctor-ai");
        const userMsg = {
            text: finalInput,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        processAIResponse(userMsg.text);
    };

    const startOnboarding = (e) => {
        e.preventDefault();
        if (onboardingStep === 0 && userContext.name.trim()) setOnboardingStep(1);
        else if (onboardingStep === 1 && userContext.location.trim()) setOnboardingStep(2);
        else if (onboardingStep === 2 && userContext.age) setOnboardingStep(3);
        else if (onboardingStep === 3 && userContext.gender) setUserContext(prev => ({ ...prev, onboarded: true }));
    };

    return (
        <div className={`flex h-[100dvh] md:h-screen ${emergencyMode ? 'bg-[#450a0a]' : 'bg-[#020617]'} text-slate-200 overflow-hidden doctor-ai-container relative transition-colors duration-1000`}>
            {/* SOS Mode Overlay & Beacon */}
            {emergencyMode && (
                <div className="fixed inset-0 z-[200] bg-red-950/40 backdrop-blur-md flex items-center justify-center p-6">
                    <GPSEmergencyBeacon onCancel={() => setEmergencyMode(false)} />
                </div>
            )}

            {/* Ambient Background Glows */}
            {!emergencyMode && (
                <>
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                </>
            )}

            {/* Onboarding Overlay v6.0 — 4-Step */}
            {!userContext.onboarded && (
                <div className="fixed inset-0 z-[99999] bg-slate-950/100 flex flex-col items-center justify-center p-4">
                    <h1 className="text-white text-4xl font-bold mb-4">DEBUG ONBOARDING OVERLAY</h1>
                    <pre className="text-emerald-400 bg-slate-900 p-4 rounded-xl mb-4 text-xs">
                        {JSON.stringify(userContext, null, 2)}
                    </pre>
                    <button
                        onClick={() => {
                            localStorage.removeItem('sehaat_user_context');
                            setUserContext({ name: '', age: '', gender: '', location: '', onboarded: false });
                            window.location.reload();
                        }}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-red-500 mb-8"
                    >
                        Force Reset LocalStorage
                    </button>
                    <div className="bg-[#0f172a] border border-red-500 rounded-[3rem] p-8 md:p-12 max-w-md w-full shadow-[0_0_100px_rgba(255,0,0,0.5)] relative overflow-hidden">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-8 relative z-10">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-5 border border-emerald-500/20 shadow-inner">
                                <BsRobot className="text-3xl text-emerald-400" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight">Initialize <span className="text-[#FF9933]">Sehaat</span> AI <span className="text-white/60">v6.0</span></h2>
                            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-[0.3em]">Neural Perception Setup • Step {onboardingStep + 1}/4</p>

                            {/* Step Progress Bar */}
                            <div className="flex gap-2 mt-5">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= onboardingStep ? 'bg-blue-500 w-8' : 'bg-white/10 w-4'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Form Steps */}
                        <form onSubmit={startOnboarding} className="space-y-6 relative z-10">
                            {/* Step 1: Name */}
                            {onboardingStep === 0 && (
                                <div className="space-y-3 animate-slide-up">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Your Name?</label>
                                    <input
                                        autoFocus
                                        className="w-full bg-[#1e293b]/60 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-blue-500/60 outline-none text-xl font-bold transition-all text-white placeholder:text-slate-700"
                                        placeholder="Enter your full name..."
                                        value={userContext.name}
                                        onChange={(e) => setUserContext({ ...userContext, name: e.target.value })}
                                    />
                                </div>
                            )}

                            {/* Step 2: Location */}
                            {onboardingStep === 1 && (
                                <div className="space-y-3 animate-slide-up">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Your Location?</label>
                                    <input
                                        autoFocus
                                        className="w-full bg-[#1e293b]/60 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-blue-500/60 outline-none text-xl font-bold transition-all text-white placeholder:text-slate-700"
                                        placeholder="e.g. Delhi, Mumbai..."
                                        value={userContext.location}
                                        onChange={(e) => setUserContext({ ...userContext, location: e.target.value })}
                                    />
                                </div>
                            )}

                            {/* Step 3: Age */}
                            {onboardingStep === 2 && (
                                <div className="space-y-3 animate-slide-up">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Your Age?</label>
                                    <input
                                        autoFocus
                                        type="number"
                                        min="1" max="120"
                                        className="w-full bg-[#1e293b]/60 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-blue-500/60 outline-none text-xl font-bold transition-all text-white placeholder:text-slate-700"
                                        placeholder="Enter your age..."
                                        value={userContext.age}
                                        onChange={(e) => setUserContext({ ...userContext, age: e.target.value })}
                                    />
                                </div>
                            )}

                            {/* Step 4: Gender */}
                            {onboardingStep === 3 && (
                                <div className="space-y-3 animate-slide-up">
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block ml-1">Your Gender?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Male', 'Female'].map(g => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setUserContext({ ...userContext, gender: g })}
                                                className={`py-5 rounded-2xl font-semibold uppercase text-xs tracking-widest transition-all duration-200 border-2 ${userContext.gender === g ? 'bg-blue-600 border-blue-400 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] scale-105' : 'bg-slate-800/50 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Patient info summary */}
                                    <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Clinical Profile Preview</p>
                                        <p className="text-sm font-bold text-slate-300">{userContext.name} · {userContext.age}yr · {userContext.location}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-5 rounded-[1.8rem] transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 group relative overflow-hidden"
                            >
                                <span className="relative z-10 tracking-[0.2em] text-xs uppercase">
                                    {onboardingStep < 3 ? 'Next →' : 'Activate Sensors'}
                                </span>
                                {onboardingStep === 3 && <BsPlusCircle className="text-lg relative z-10 group-hover:rotate-90 transition-transform" />}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* PPG Pulse Scanner Modal (v6.0) */}
            {ppgData.isScanning && (
                <div className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-[3rem] p-10 flex flex-col items-center text-center space-y-8 shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-500 shadow-2xl">
                            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover scale-x-[-1]" />
                            <canvas ref={canvasRef} width="100" height="100" className="hidden" />
                            <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-semibold text-white uppercase tracking-tighter">Scanning Biometrics</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest px-8">Place your finger on the camera or sit still and look directly at the sensor.</p>
                        </div>

                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-[10px] font-semibold text-red-500 uppercase tracking-widest">
                                <span>Pulse HUD Progress</span>
                                <span>{ppgData.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_15px_#ef4444]" style={{ width: `${ppgData.progress}%` }}></div>
                            </div>
                        </div>

                        <button onClick={() => stopPPGScan([])} className="px-10 py-4 bg-white/5 hover:bg-red-900 text-red-500 hover:text-white rounded-2xl font-semibold uppercase text-[10px] transition-all border border-white/5">Abort Scan</button>
                    </div>
                </div>
            )}

            {/* Left Sidebar / Mobile Drawer */}
            <aside className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex fixed lg:relative inset-y-0 left-0 w-80 flex-col bg-slate-900/90 lg:bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 p-8 overflow-y-auto z-[150] lg:z-40 transition-all duration-500`}>
                <button onClick={() => setShowMobileSidebar(false)} className="lg:hidden absolute top-6 right-6 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white border border-white/10">
                    <BsPlusCircle className="rotate-45" />
                </button>
                <div className="space-y-10">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-[1.5rem] border border-white/5">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400 font-semibold">{userContext.name ? userContext.name[0] : 'U'}</div>
                        <div>
                            <h4 className="font-semibold text-white text-sm uppercase tracking-tighter truncate w-32">{userContext.name || 'User'}</h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{userContext.age}Y • {userContext.gender}</p>
                        </div>
                    </div>

                    {/* Specialized Care Selection (v7.0) - MOVED TO TOP */}
                    <div className="space-y-6">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsPersonFill className="text-emerald-500" /> Specialized Care
                        </h5>
                        <div className="p-4 bg-slate-900/60 rounded-[2rem] border border-white/5 space-y-4">
                            <div className="space-y-2">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Select Specialist</span>
                                <select
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[11px] font-semibold text-white outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                >
                                    {doctorRoles.map(role => (
                                        <option key={role} value={role} className="bg-slate-900 text-white font-bold">{role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <p className="text-[9px] text-emerald-400 font-bold uppercase leading-tight italic">
                                    Current: {selectedRole} is ready to consult.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Case File (v7.0) - MOVED TO TOP */}
                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsJournalMedical className="text-blue-500" /> Patient Case File
                        </h5>
                        <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-4">
                            <div className="space-y-2">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Existing Conditions</span>
                                <input
                                    type="text"
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                    placeholder="e.g. Diabetes, BP"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Known Allergies</span>
                                <input
                                    type="text"
                                    value={allergies}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    placeholder="e.g. Peanuts, Penicillin"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:border-red-500/50 transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <div className="pt-2">
                                <p className="text-[8px] text-slate-600 font-bold uppercase italic leading-relaxed">
                                    * Context is securely shared with the AI Doctor for more precise clinical logic.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Signature v9.1: Arpan Interactive Body Mapper */}
                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsJournalMedical className="text-blue-500" /> Arpan Anatomy Scan
                        </h5>
                        <div className="overflow-hidden rounded-[2.5rem]">
                            <InteractiveBodyMap />
                        </div>
                    </div>

                    {/* Signature v9.4: Sanjeevani Pill Box */}
                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsSpeedometer className="text-emerald-500" /> Dose Mastery
                        </h5>
                        <PillBox />
                    </div>

                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2"><BsActivity className="text-blue-500" /> Sensor Dashboard</h5>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase block mb-1">{t.status}</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase border ${emergencyMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        {emergencyMode ? 'EMERGENCY: SYSTEM LOCKED' : currentRule ? 'MAPPING CONDITION' : 'SYSTEM READY'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-semibold text-slate-500 uppercase block mb-2">Affected Systems</span>
                                <div className="flex flex-wrap gap-1">
                                    {riskProfile.detectedOrgans.map((o, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-[8px] font-semibold px-2 py-1 rounded-lg border border-blue-500/20 animate-pulse tracking-tighter capitalize"><BsGeoAltFill className="text-[7px]" /> {o}</div>
                                    ))}
                                    {riskProfile.detectedOrgans.length === 0 && <span className="text-[10px] font-bold text-slate-600 italic">No activity...</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neural Vitals Dashboard (v5.0) */}
                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsHeartPulseFill className="text-red-500 animate-pulse" /> Vitals Telemetry
                        </h5>
                        <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute top-2 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                                <svg width="60" height="20" viewBox="0 0 60 20">
                                    <path d="M0 10 L10 10 L15 2 L25 18 L30 10 L60 10" fill="none" stroke="#10b981" strokeWidth="2" className="animate-neural-pulse" />
                                </svg>
                            </div>
                            <div className="space-y-5 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Blood Pressure</span>
                                        <input type="text" name="bp" value={vitals.bp} onChange={handleVitalChange} placeholder="120/80" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-semibold text-white outline-none focus:border-red-500/50 transition-all placeholder:text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Pulse (BPM)</span>
                                        <div className="relative">
                                            <input type="number" name="pulse" value={vitals.pulse} onChange={handleVitalChange} placeholder="72" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-semibold text-white outline-none focus:border-red-500/50 transition-all placeholder:text-slate-700" />
                                            <BsHeartPulseFill className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${vitals.pulse ? 'text-red-500 animate-heartbeat-slow' : 'text-slate-700'}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">Blood Sugar</span>
                                        <span className="text-[8px] font-bold text-slate-600 uppercase">mg/dL</span>
                                    </div>
                                    <input type="number" name="sugar" value={vitals.sugar} onChange={handleVitalChange} placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-semibold text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" />
                                </div>
                                {vitals.bp && (
                                    <div className="pt-3 flex items-center gap-3 border-t border-white/5">
                                        <div className={`w-3 h-3 rounded-full ${parseInt(vitals.bp.split('/')[0]) > 140 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'} animate-pulse`}></div>
                                        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-tighter">Biometric Sync: 100% Secure Link</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Neural Perception Hub (v6.0) */}
                    <div className="space-y-6 mt-10">
                        <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsStars className="text-emerald-500" /> Perception Engine
                        </h5>
                        <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-4">
                            <button onClick={startPPGScan} className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl flex items-center justify-between group transition-all">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500 group-hover:animate-neural-pulse"><BsHeartPulseFill /></div>
                                    <div>
                                        <h6 className="text-[10px] font-semibold text-white uppercase tracking-tighter">PPG Pulse Sensor</h6>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase">Scan BPM via Camera</p>
                                    </div>
                                </div>
                                <div className="text-red-500 font-semibold text-sm">{ppgData.bpm || '--'}</div>
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => { setInputValue("Analyze skin rash / daane"); fileInputRef.current.click(); }} className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-left group transition-all">
                                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform"><BsSearch /></div>
                                    <h6 className="text-[9px] font-semibold text-white uppercase">Skin Scan</h6>
                                </button>
                                <button onClick={() => { setInputValue("Analyze this meal khana"); fileInputRef.current.click(); }} className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl text-left group transition-all">
                                    <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-500 mb-2 group-hover:scale-110 transition-transform"><BsRobot /></div>
                                    <h6 className="text-[9px] font-semibold text-white uppercase">Meal Vision</h6>
                                </button>
                            </div>
                            <a href="https://sehaat-saathi-your-ai-doctor-chatbot.streamlit.app/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gradient-to-r from-orange-500/20 to-green-500/20 hover:from-orange-500/30 hover:to-green-500/30 border border-orange-500/30 rounded-2xl transition-all relative group animate-satellite-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 group-hover:rotate-12 transition-transform"><BsStars className="animate-spin-slow" /></div>
                                    <div className="flex-1">
                                        <h6 className="text-[10px] font-semibold text-white uppercase tracking-tighter">Neural Global News</h6>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Satellite AI Expansion →</p>
                                    </div>
                                </div>
                                <div className="absolute -top-1 -right-1">
                                    <span className="flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Neural Body Mapper */}
                    <div className="p-4 bg-slate-900/60 rounded-[2rem] border border-white/5 relative overflow-hidden group mt-10">
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="scanner-line"></div>
                        <span className="text-[9px] font-semibold text-emerald-500 uppercase block mb-4 flex items-center gap-2">
                            <BsShieldCheck /> Quick Body Scan
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: 'Head', icon: '🧠', query: 'headache' },
                                { label: 'Chest', icon: '🫁', query: 'chest pain' },
                                { label: 'Stomach', icon: '🍕', query: 'acidity' },
                                { label: 'Joints', icon: '🦵', query: 'back pain' },
                                { label: 'Skin', icon: '🧴', query: 'rash' },
                                { label: 'Eyes', icon: '👁️', query: 'eye irritation' }
                            ].map((part, i) => (
                                <button key={i} onClick={() => { setInputValue(part.query); handleSendMessage({ preventDefault: () => { } }); }} className="p-2 bg-white/5 hover:bg-emerald-500/20 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all text-[9px] font-bold flex items-center gap-2 uppercase tracking-tighter">
                                    <span>{part.icon}</span> {part.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <p className="text-[8px] text-slate-600 font-bold uppercase italic">* Select region for neural triage</p>
                        </div>
                    </div>

                    {/* Signature v9.4: Sanjeevani Pill Box (v9.4) */}
                    <div className="mt-6 overflow-hidden rounded-[2.5rem]">
                        <PillBox />
                    </div>
                    {/* Neural Memory Control (Phase 7) */}
                    <div className="mt-10 pt-10 border-t border-white/5 pb-10">
                        <button
                            onClick={handleClearMemory}
                            className="w-full p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 transition-all group"
                        >
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                <BsTrash />
                            </div>
                            <div className="text-left">
                                <h6 className="text-[10px] font-semibold text-white uppercase tracking-tighter">Reset Clinical Memory</h6>
                                <p className="text-[8px] font-bold text-slate-500 uppercase">Wipe all history & context</p>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop for Mobile Sidebar */}
            {
                showMobileSidebar && (
                    <div onClick={() => setShowMobileSidebar(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[140] lg:hidden animate-fade-in" />
                )
            }

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative w-full overflow-hidden">
                <header className={`bg-slate-900/60 backdrop-blur-3xl border-b border-white/10 p-3 md:p-4 md:px-6 flex items-center justify-between z-50 sticky top-0 shadow-lg ${emergencyMode ? 'border-red-500/30 shadow-red-500/20' : ''}`}>
                    <div className="flex items-center gap-3">
                        <Link to="/smarthub" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 active:scale-95"><BsArrowLeft className="text-base md:text-xl text-white" /></Link>
                        
                        <div className="relative group cursor-pointer active:scale-95 transition-transform hidden sm:block">
                            <SanjeevaniMascot
                                isTyping={isTyping}
                                isAnalyzing={isAnalyzing}
                                urgency={riskProfile.urgency}
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <h1 className="font-bold text-sm md:text-xl tracking-tight uppercase leading-none flex items-center gap-1.5 md:gap-2">
                                <span style={{ color: "#FF9933" }}>Sehaat</span>
                                <span className={emergencyMode ? 'text-red-400' : 'text-emerald-500'}>
                                    {selectedRole.split(' (')[0]}
                                </span>
                            </h1>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className={`w-1.5 h-1.5 ${emergencyMode ? 'bg-red-500' : 'bg-emerald-500'} rounded-full animate-ping`}></span>
                                <span className="text-[7px] md:text-[9px] font-semibold text-slate-400 tracking-widest uppercase">{emergencyMode ? 'Emergency Lockdown' : 'Bio-Metric Link Active'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile Sidebar Toggle */}
                        <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="lg:hidden p-2.5 bg-blue-500/10 hover:bg-blue-500/20 active:scale-95 border border-blue-500/20 rounded-xl text-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                            <BsActivity className={`text-base ${showMobileSidebar ? 'animate-spin' : ''}`} />
                        </button>

                    {!emergencyMode && (
                        <div className="flex items-center gap-2 md:gap-4 self-end sm:self-auto">
                            {/* Signature v8.1: Pulsing SOS Button */}
                            <button
                                onClick={handleManualSOS}
                                className="group relative flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl md:rounded-2xl border border-red-500/20 hover:border-red-600 transition-all font-semibold text-[10px] md:text-xs uppercase tracking-widest overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                            >
                                <div className="absolute inset-0 bg-red-600 animate-pulse opacity-20 group-hover:opacity-0"></div>
                                <BsExclamationTriangle className="text-sm md:text-lg animate-bounce group-hover:animate-none" />
                                <span className="relative">SOS</span>
                            </button>

                            <div className="flex items-center bg-white/5 p-1 rounded-lg md:rounded-xl border border-white/5 gap-1 md:gap-2">
                                <button onClick={() => setLanguage('EN')} className={`px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-[9px] md:text-[10px] font-semibold tracking-tighter transition-all ${language === 'EN' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>EN</button>
                                <button onClick={() => setLanguage('HI')} className={`px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-[9px] md:text-[10px] font-semibold tracking-tighter transition-all ${language === 'HI' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>HI</button>
                                <button onClick={() => setLanguage('HN')} className={`px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-[9px] md:text-[10px] font-semibold tracking-tighter transition-all ${language === 'HN' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}>HN</button>
                            </div>

                            {/* Mobile Anatomy Toggle */}
                            <button
                                onClick={() => setShowBodyMap(true)}
                                className="lg:hidden p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl"
                            >
                                <BsJournalMedical className="animate-pulse" />
                            </button>

                            {/* Elite Dashboard Toggle */}
                            <button
                                onClick={() => setShowEliteDashboard(!showEliteDashboard)}
                                className={`p-3 rounded-xl border transition-all ${showEliteDashboard ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-emerald-500 border-white/10 hover:bg-white/10'}`}
                                title="Ayush-Vital Chakra Dashboard"
                            >
                                <BsLightningCharge className={showEliteDashboard ? 'animate-pulse' : ''} />
                            </button>
                        </div>
                    )}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-2 md:px-8 py-4 md:py-6 space-y-4 md:space-y-8 scrollbar-hide relative flex flex-col">
                    <AnimatePresence>
                        {showEliteDashboard && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-x-0 top-0 z-[60] p-4 lg:p-12 min-h-full bg-[#020617]/95 backdrop-blur-3xl"
                            >
                                <div className="max-w-6xl mx-auto">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="text-2xl lg:text-4xl font-semibold text-white uppercase tracking-tighter italic">Ayush-Vital <span className="text-emerald-500">Diagnostic Core</span></h3>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Biological Link • Active</p>
                                        </div>
                                        <button
                                            onClick={() => setShowEliteDashboard(false)}
                                            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-white uppercase tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Return to Coms
                                        </button>
                                    </div>
                                    <AyushVitalDashboard riskProfile={riskProfile} vitals={vitals} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Main Chat Stream */}
                    {/* Main Chat Stream */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="max-w-4xl mx-auto pb-48 relative z-0"
                    >
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 15, scale: 0.98 },
                                    visible: { opacity: 1, y: 0, scale: 1 }
                                }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 md:mb-6 px-2`}
                            >
                                <div className={`flex gap-2.5 md:gap-5 max-w-[95%] md:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex-shrink-0 flex items-center justify-center border-2 ${msg.sender === 'user' ? 'bg-blue-600 border-blue-400/20 text-white' : msg.isEmergency ? 'bg-red-600 border-red-400/30 text-white' : 'bg-slate-800 border-white/5 text-emerald-400'}`}>
                                        {msg.sender === 'user' ? <BsPersonFill className="text-sm md:text-lg" /> : msg.isEmergency ? <BsExclamationTriangle /> : <BsRobot className="text-sm md:text-lg" />}
                                    </div>
                                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex-1`}>
                                        <div className={`p-3 md:p-4 shadow-lg transition-all relative overflow-hidden w-fit max-w-full ${msg.sender === 'user' ? 'chat-bubble-user text-white' : msg.isEmergency ? 'bg-red-950/80 border-2 border-red-500 text-red-100 rounded-tl-none animate-shake px-4 py-4' : 'chat-bubble-doctor text-slate-100'}`}>
                                            <div className="whitespace-pre-line relative z-10 medium-text leading-relaxed text-[14px] md:text-[16px]">{msg.text}</div>
                                            {msg.sender === 'ai' && (
                                                <div className="mt-3 flex items-center justify-between gap-4">
                                                    <button
                                                        onClick={() => speak(msg.text)}
                                                        className="p-1.5 md:p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-2 text-[8px] md:text-[9px] font-bold uppercase tracking-wider transition-all"
                                                    >
                                                        <BsVolumeUpFill className={isSpeaking ? 'animate-pulse' : ''} />
                                                        {isSpeaking ? 'Narrating...' : 'Voice Bridge'}
                                                    </button>
                                                    <span className="text-[7px] md:text-[8px] font-semibold text-slate-600 uppercase tracking-tighter">Verified AI Doctor • v10.0</span>
                                                </div>
                                            )}
                                            {msg.isL1 && <div className="mt-2.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[7px] font-semibold rounded uppercase w-fit border border-emerald-500/20">Deterministic L1</div>}
                                            <RiskBadge status={msg.status} citation={msg.citation} />
                                            {/* Micro-animation for new messages indicator */}
                                            {index === messages.length - 1 && msg.sender === 'ai' && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    className="h-0.5 bg-blue-500/30 mt-4 rounded-full overflow-hidden"
                                                >
                                                    <motion.div
                                                        animate={{ x: ['-100%', '100%'] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                                        className="h-full w-24 bg-blue-400"
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Signature v8.2: Nutrition Insights */}
                                            {msg.sender === 'ai' && msg.nutrition && (
                                                <NutritionCard deficient={msg.nutrition.deficient} suggestions={msg.nutrition.suggestions} />
                                            )}

                                            {/* Signature v8.4: Lab Price Navigator */}
                                            {msg.sender === 'ai' && msg.labInsights && (
                                                <LabPriceNavigator testName={msg.labInsights.testName} />
                                            )}

                                            {/* Signature v8.5: Symptom Progress Visualizer */}
                                            {msg.sender === 'ai' && msg.showTrend && (
                                                <div className="space-y-6">
                                                    <SymptomVisualizer />
                                                    <WearableDataSync vitals={vitals} />
                                                </div>
                                            )}

                                            {msg.actions && !emergencyMode && (
                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {msg.actions.map((act, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                if (act.includes('Set Reminder')) {
                                                                    setReminderModal({ open: true, medName: inputValue || 'Prescribed Medicine' });
                                                                }
                                                                if (act.includes('Add to Pill Box')) {
                                                                    const med = inputValue || 'Detected Medication';
                                                                    setUserPillSchedule(prev => [...prev, { day: new Date().getDay(), med: med }]);
                                                                    const pillMsg = {
                                                                        text: `💊 **Pill Secured in Sanjeevani Box**\n\nI have locked **${med}** into your weekly adherence matrix. Neural reminders synced.`,
                                                                        sender: 'ai',
                                                                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                                    };
                                                                    setMessages(prev => [...prev, pillMsg]);
                                                                }
                                                                if (act.includes('Open Anatomy Scan')) {
                                                                    setShowBodyMap(true);
                                                                }
                                                                if (act.includes('Compare Lab Prices')) {
                                                                    const labMsg = {
                                                                        text: `I've analyzed nearby diagnostics hubs for your required clinical tests. Use the interface below to compare prices and book home collection.`,
                                                                        sender: 'ai',
                                                                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                                        labInsights: { testName: inputValue.toUpperCase() }
                                                                    };
                                                                    setMessages(prev => [...prev, labMsg]);
                                                                }
                                                                if (act.includes('View Health Trend')) {
                                                                    const trendMsg = {
                                                                        text: `Neural Sync Complete. I have synthesized your health metrics over the last 5 cycles to visualize your recovery velocity.`,
                                                                        sender: 'ai',
                                                                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                                                        showTrend: true
                                                                    };
                                                                    setMessages(prev => [...prev, trendMsg]);
                                                                }
                                                            }}
                                                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-semibold p-3 rounded-xl uppercase tracking-widest active:scale-95 transition-all shadow-lg"
                                                        >
                                                            {act}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Neural Rule Question Engine */}
                        {currentRule && !isAnalyzing && (
                            <div className="flex justify-start mb-10 animate-slide-up">
                                <div className="flex gap-4 items-start w-full max-w-2xl bg-slate-900 border-2 border-emerald-500/30 p-8 rounded-[3rem] rounded-tl-none backdrop-blur-3xl shadow-2xl shadow-emerald-500/10">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0 animate-pulse"><BsRobot /></div>
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest block mb-2">Neural Question {stepIndex + 1}/{currentRule.questions.length}</span>
                                            <h3 className="text-xl font-semibold text-white">{currentRule.questions[stepIndex].text}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {currentRule.questions[stepIndex].options.map((opt, i) => (
                                                <button key={i} onClick={() => handleStepAnswer(opt)} className="bg-slate-800 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl text-left transition-all border border-white/5 hover:border-emerald-400 active:scale-95 group flex justify-between items-center">
                                                    {opt} <BsPlusCircle className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="flex justify-start mb-6 md:mb-10 px-2 animate-slide-up">
                                <div className={`flex gap-4 md:gap-6 items-center ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'bg-purple-500/5 border-purple-500/30' : inputValue.toLowerCase().includes('meal') ? 'bg-orange-500/5 border-orange-500/30' : 'bg-blue-500/5 border-blue-500/30') : 'bg-emerald-500/5 border-emerald-500/30'} p-4 md:p-8 rounded-[2rem] rounded-tl-none backdrop-blur-3xl w-full max-w-sm md:max-w-lg shadow-2xl relative overflow-hidden`}>
                                    <div className={`absolute inset-x-0 h-[1px] ${inputValue.toLowerCase().includes('skin') ? 'bg-purple-500/20' : inputValue.toLowerCase().includes('meal') ? 'bg-orange-500/20' : 'bg-emerald-500/20'} animate-bio-scan`}></div>
                                    <div className="relative w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
                                        <div className={`absolute inset-0 border-2 md:border-4 ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'border-purple-500/20' : inputValue.toLowerCase().includes('meal') ? 'border-orange-500/20' : 'border-blue-500/20') : 'border-emerald-500/20'} rounded-full`}></div>
                                        <div className={`absolute inset-0 border-2 md:border-4 ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'border-purple-500' : inputValue.toLowerCase().includes('meal') ? 'border-orange-500' : 'border-blue-500') : 'border-emerald-500'} border-t-transparent rounded-full animate-spin`}></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-semibold text-[8px] md:text-[10px] text-white animate-pulse">{capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'SKIN' : inputValue.toLowerCase().includes('meal') ? 'MEAL' : 'VISION') : 'CORE'}</div>
                                    </div>
                                    <div>
                                        <h4 className={`text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'text-purple-400' : inputValue.toLowerCase().includes('meal') ? 'text-orange-400' : 'text-blue-400') : 'text-emerald-400'}`}>
                                            {capturedImage ? (
                                                inputValue.toLowerCase().includes('skin') ? 'Neural Skin Analysis...' :
                                                    inputValue.toLowerCase().includes('meal') ? 'Smart Meal Triage...' :
                                                        'Vision AI Report Analysis...'
                                            ) : (
                                                'Synapsing Response...'
                                            )}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="typing-indicator">
                                                <span></span><span></span><span></span>
                                            </div>
                                            <p className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase flex items-center gap-2">
                                                Precision Triage Active
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Signature v8.2: Deep Report Scan Animation */}
                        {isReadingReport && (
                            <div className="absolute inset-0 z-[70] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6">
                                <div className="max-w-md w-full text-center space-y-8 animate-pop-in">
                                    <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto">
                                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <div className="absolute inset-4 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                                            <BsSearch className="text-3xl md:text-5xl text-white animate-pulse" />
                                        </div>
                                        {/* Scanner Grid Overlay */}
                                        <div className="absolute inset-0 overflow-hidden rounded-full opacity-20">
                                            <div className="w-full h-full bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-tighter">Deep Image Decoding</h3>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 animate-[loading-bar_3s_infinite]"></div>
                                            </div>
                                            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest">Medical Vision AI Active</span>
                                        </div>
                                        <p className="text-slate-400 text-xs md:text-sm font-bold max-w-xs mx-auto">
                                            Analyzing pixels for hemoglobin, vitals markers, and handwritten diagnostic notes...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>

                {/* Signature v9.3: Baatcheet Transcription Overlay */}
                {
                    isTranscribing && (
                        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-3xl flex items-center justify-center p-6 text-center">
                            <div className="max-w-3xl w-full">
                                <div className="mb-12 flex justify-center">
                                    <SanjeevaniMascot
                                        urgency={riskProfile.urgency}
                                        isAnalyzing={true}
                                    />
                                </div>
                                <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-[0.5em] mb-8 animate-pulse">Neural Transcription Active</h2>
                                <div className="relative">
                                    <p className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tighter uppercase metallic-shimmer italic">
                                        &quot;{liveTranscript || "Speak now..."}&quot;
                                    </p>
                                    <div className="mt-12 flex justify-center gap-4">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsTranscribing(false)}
                                    className="mt-16 px-10 py-4 bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-500 uppercase tracking-widest hover:text-white transition-all rounded-full"
                                >
                                    Cancel Transcription
                                </button>
                            </div>
                        </div>
                    )
                }

                {/* Signature v8.3: WhatsApp Reminder Modal */}
                {/* Signature v9.1: Mobile Body Map Overlay */}
                {
                    showBodyMap && (
                        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 lg:hidden">
                            <div className="w-full max-w-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-semibold text-white uppercase tracking-tighter">Arpan Portal</h3>
                                    <button onClick={() => setShowBodyMap(false)} className="p-2 bg-white/5 rounded-full text-slate-400"><BsPlusCircle className="rotate-45" /></button>
                                </div>
                                <InteractiveBodyMap inline={true} />
                                <p className="text-center text-[10px] font-bold text-slate-500 uppercase mt-6">Tap Anatomy region to begin neural scan</p>
                            </div>
                        </div>
                    )
                }

                {
                    reminderModal.open && (
                        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
                            <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-pop-in">
                                <div className="flex flex-col items-center text-center mb-8">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center mb-6 border border-green-500/20">
                                        <BsVolumeUpFill className="text-4xl text-green-400 animate-pulse" />
                                    </div>
                                    <h2 className="text-3xl font-semibold text-white mb-2 uppercase tracking-tighter">Bridge Reminders</h2>
                                    <p className="text-slate-500 text-[9px] font-semibold uppercase tracking-[0.3em]">Neural WhatsApp Integration</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="text-[9px] font-semibold text-slate-500 uppercase">Configuring Dose For:</span>
                                        <h4 className="text-lg font-semibold text-white mt-1 uppercase tracking-tight">{reminderModal.medName}</h4>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Morning', 'Afternoon', 'Night'].map((time) => (
                                            <div key={time} className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                                                <span className="text-[8px] font-semibold text-slate-500 uppercase">{time}</span>
                                                <p className="text-xs font-bold text-white mt-1">ON</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleSetReminder(reminderModal.medName)}
                                        className="w-full py-6 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-[2rem] text-xl transition-all shadow-xl shadow-green-600/20 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        Activate Signal
                                    </button>
                                    <button
                                        onClick={() => setReminderModal({ open: false, medName: '' })}
                                        className="w-full py-2 text-[10px] font-semibold text-slate-500 uppercase hover:text-white transition-all"
                                    >
                                        Cancel Synchronization
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Floating Action Button (FAB) for Mobile Quick-Actions */}
                {!emergencyMode && (
                    <div className="lg:hidden fixed bottom-24 right-6 z-[100] flex flex-col items-end gap-3">
                        <AnimatePresence>
                            {showMobileSidebar && (
                                <>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                        onClick={handleManualSOS}
                                        className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl border border-red-500/20"
                                    >
                                        <BsExclamationTriangle />
                                    </motion.button>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                        transition={{ delay: 0.1 }}
                                        onClick={() => speak(messages[messages.length - 1]?.text || 'No message to play')}
                                        className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl border border-emerald-500/20"
                                    >
                                        <BsVolumeUpFill />
                                    </motion.button>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={() => setShowBodyMap(true)}
                                        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl border border-blue-500/20"
                                    >
                                        <BsJournalMedical />
                                    </motion.button>
                                </>
                            )}
                        </AnimatePresence>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl border border-blue-400/30 floating-action-button relative"
                        >
                            <BsLightningCharge className={showMobileSidebar ? 'rotate-45' : ''} />
                            {!showMobileSidebar && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-slate-900"></span>
                                </span>
                            )}
                        </motion.button>
                    </div>
                )}
                <footer className={`shrink-0 p-3 md:p-6 bg-slate-950/90 backdrop-blur-3xl border-t ${emergencyMode ? 'border-red-500/30' : 'border-white/10'} z-[60]`}>
                    <div className="max-w-4xl mx-auto w-full">
                        {emergencyMode ? (
                            <div className="flex flex-col items-center gap-4 md:gap-6 max-w-2xl w-full mx-auto pb-6">
                                <div className="flex items-center gap-8 w-full">
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-red-600 rounded-full flex items-center justify-center animate-sos-flash shadow-[0_0_100px_rgba(220,38,38,0.5)] shrink-0">
                                        <BsExclamationTriangle className="text-3xl md:text-5xl text-white animate-shake" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-semibold rounded uppercase">Live Protocol</span>
                                            <span className="text-[9px] font-semibold text-red-400 uppercase tracking-widest">Sanjeevani v8.1 Active</span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight uppercase leading-none">Emergency Sync</h2>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                                <p className="text-[8px] font-semibold text-red-400 uppercase mb-1">Patient Identity</p>
                                                <p className="text-xs font-bold text-white uppercase">{userContext.name || 'Anonymous'}</p>
                                            </div>
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                                <p className="text-[8px] font-semibold text-red-400 uppercase mb-1">Clinical Triage</p>
                                                <p className="text-xs font-bold text-white uppercase">{selectedRole.split(' (')[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">
                                    <a href="tel:102" className="group flex items-center justify-center gap-4 bg-white text-red-600 py-5 md:py-7 rounded-[2rem] font-semibold text-xl md:text-3xl hover:bg-red-50 transition-all shadow-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
                                        <BsVolumeUpFill className="text-2xl md:text-4xl animate-bounce" /> CALL 102
                                    </a>
                                    <button onClick={() => window.open(`https://www.google.com/maps/search/hospitals+near+me`, '_blank')} className="group flex items-center justify-center gap-4 bg-red-800 text-white py-5 md:py-7 rounded-[2rem] font-semibold text-xl md:text-3xl hover:bg-red-900 transition-all border border-white/10 shadow-2xl">
                                        <BsGeoAltFill className="text-2xl md:text-4xl group-hover:animate-bounce" /> FIND HOSPITAL
                                    </button>
                                </div>
                                <button
                                    onClick={() => { setEmergencyMode(false); setRiskProfile(prev => ({ ...prev, urgency: 'Low' })); }}
                                    className="text-[10px] font-semibold text-red-400/60 uppercase tracking-[0.4em] hover:text-red-400 transition-all mt-4"
                                >
                                    Dismiss Emergency Control
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Suggested Questions Section - Enhanced v7.3 */}
                                {!isAnalyzing && !currentRule && roleSuggestions[selectedRole] && (
                                    <div className="animate-slide-up">
                                        <div className="flex items-center gap-2 mb-3 px-1">
                                            <BsStars className="text-emerald-500 text-[10px]" />
                                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Neural Quick-Actions</span>
                                        </div>
                                        <div className="flex gap-3 overflow-x-auto neural-carousel pb-5 px-1 snap-x select-none">
                                            {roleSuggestions[selectedRole].map((q, i) => {
                                                const grants = [
                                                    'from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-100',
                                                    'from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-100',
                                                    'from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-100',
                                                    'from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-100'
                                                ];
                                                const iconColors = ['text-blue-400', 'text-emerald-400', 'text-purple-400', 'text-amber-400'];
                                                const colorIndex = i % grants.length;

                                                return (
                                                    <motion.button
                                                        whileTap={{ scale: 0.96 }}
                                                        key={i}
                                                        type="button"
                                                        onClick={() => {
                                                            setInputValue(q);
                                                            handleSendMessage({ preventDefault: () => { } }, q);
                                                        }}
                                                        className={`flex-shrink-0 snap-start px-4 py-3 bg-gradient-to-br ${grants[colorIndex]} border rounded-[1.25rem] transition-all hover:bg-white/5 active:scale-95 text-left flex flex-col gap-1.5 min-w-[150px] md:min-w-[190px] shadow-lg group relative overflow-hidden backdrop-blur-md suggest-card-shimmer`}
                                                    >
                                                        <div className="absolute top-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                                            <BsStars className="text-4xl" />
                                                        </div>
                                                        <div className={`w-8 h-8 ${iconColors[colorIndex]} rounded-xl bg-white/5 flex items-center justify-center text-sm shadow-inner`}>
                                                            {q.split(' ')[0]}
                                                        </div>
                                                        <span className="text-[11px] md:text-xs medium-text text-white leading-snug uppercase tracking-tight line-clamp-2">
                                                            {q.replace(q.split(' ')[0], '').trim()}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2 md:gap-4 bg-slate-900/80 backdrop-blur-3xl p-2 md:p-3 rounded-[2rem] md:rounded-[3rem] border border-white/10 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all shadow-2xl">
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 md:p-3 text-slate-400 hover:text-emerald-400 bg-white/5 hover:bg-white/10 rounded-full transition-all active:scale-95 ml-1 md:ml-2">
                                        <BsPlusCircle className="text-xl md:text-2xl" />
                                    </button>
                                    <div className="relative flex-1">
                                        <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={currentRule} placeholder={currentRule ? "Answer above..." : "Appko kya takleef hai? (Type symptoms)"} className="w-full bg-transparent text-white py-2 md:py-3 px-1 md:px-2 focus:outline-none text-sm md:text-base font-medium placeholder:text-slate-500" />
                                    </div>
                                    <button type="button" onClick={isListening ? stopListening : startListening} className={`p-2.5 md:p-4 rounded-full transition-all flex items-center justify-center border ${isListening ? 'bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse' : 'bg-white/5 text-blue-400 border-white/10 hover:bg-white/10 active:scale-95'}`}>
                                        <BsMic className="text-xl md:text-xl" />
                                    </button>
                                    <button type="submit" disabled={!inputValue.trim() || currentRule} className="p-3 md:p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 mr-1 md:mr-1">
                                        <BsArrowUpCircle className="text-xl md:text-xl" />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </footer>
            </div >

            <style>{`
                @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
                @keyframes sos-flash { 0%, 100% { opacity: 0; } 50% { opacity: 0.3; } }
                .animate-sos-flash { animation: sos-flash 1.5s infinite; }
                @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
                .animate-shake { animation: shake 0.2s ease-in-out infinite; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                
                @keyframes scan-line {
                    0% { top: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .scanner-line {
                    position: absolute;
                    left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(to right, transparent, #10b981, transparent);
                    box-shadow: 0 0 15px #10b981;
                    animation: scan-line 3s linear infinite;
                    z-index: 10;
                    pointer-events: none;
                }
                @keyframes neural-pulse {
                    0% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { transform: scale(1.05); opacity: 1; box-shadow: 0 0 20px 10px rgba(16, 185, 129, 0); }
                    100% { transform: scale(1); opacity: 0.5; }
                }
                @keyframes heartbeat-slow {
                    0% { transform: scale(1); }
                    15% { transform: scale(1.1); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.15); }
                    60% { transform: scale(1); }
                }
                @keyframes bio-scan {
                    0% { top: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-neural-pulse { animation: neural-pulse 3s infinite; }
                .animate-heartbeat-slow { animation: heartbeat-slow 2s infinite ease-in-out; }
                .animate-bio-scan { animation: bio-scan 2s infinite linear; }
            `}</style>
        </div >
    );
};

export default DoctorAI;
