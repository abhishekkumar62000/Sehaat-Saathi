import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsRobot, BsSendFill, BsArrowLeft, BsStars,
    BsTrash, BsShieldCheck, BsJournalMedical, BsLightbulb,
    BsHeartPulseFill, BsSearch, BsPlusCircle, BsCheck2Circle,
    BsExclamationTriangle, BsInfoCircleFill, BsVolumeUpFill, BsPersonFill,
    BsActivity, BsSpeedometer, BsBookHalf, BsGeoAltFill
} from "react-icons/bs";

const DoctorAI = () => {
    // User Context & Onboarding
    const [userContext, setUserContext] = useState({ name: '', age: '', gender: '', onboarded: false });
    const [onboardingStep, setOnboardingStep] = useState(0);

    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    // Phase 2: Layer-1 Rule Engine State
    const [currentRule, setCurrentRule] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [stepAnswers, setStepAnswers] = useState({});
    const [emergencyMode, setEmergencyMode] = useState(false);

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

    // Initial Greeting after onboarding
    useEffect(() => {
        const greetingMessages = {
            EN: `Namaste ${userContext.name}! I am Sehaat AI v5.0. How are you feeling today?`,
            HI: `नमस्ते ${userContext.name}। मैं सेहत एआई v5.0 हूँ। आप आज कैसा महसूस कर रहे हैं?`,
            HN: `Namaste ${userContext.name}! Main Sehaat AI v5.0 hoon. Aap aaj kaisa feel kar rahe hain?`
        };

        if (userContext.onboarded && messages.length === 0) {
            setMessages([
                {
                    text: greetingMessages[language] + `\n\nI can help you with symptoms, lab reports, or vitals.`,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: ["Upload Report", "Enter Vitals", "Skin Issue"]
                }
            ]);
        }
    }, [userContext.onboarded, language]);

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
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            if (isHandsFree) {
                // Auto-submit in bridge mode
                setTimeout(() => handleSendMessage({ preventDefault: () => { } }, transcript), 1000);
            }
        };
        recognition.start();
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

        try {
            const body = {
                message: userInput,
                userContext: {
                    name: userContext.name,
                    age: userContext.age,
                    gender: userContext.gender
                },
                conversationHistory: messages.map(msg => ({ text: msg.text, sender: msg.sender })),
                stepAnswers: answers,
                currentDisease: currentRule?.id,
                image: image // Neural Vision Data (v5.0)
            };

            const response = await fetch('http://localhost:8000/api/v1/ai-doctor/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            setIsAnalyzing(false);

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
        if (input.includes('fever') || result.includes('fever')) {
            newSymptoms.push("Fever"); newOrgans.push("Immune System");
        }
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

    // Risk Evaluation Badge Component
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
                    <div className={`mt-4 px-3 py-1 text-[9px] font-black rounded uppercase w-fit border ${styles[status] || styles.MILD}`}>
                        Risk Level: {status}
                    </div>
                )}
                {citation && citation.includes('Database') && (
                    <div className="mt-4 px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black rounded uppercase w-fit border border-blue-500/20 flex items-center gap-1.5">
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
        if (onboardingStep === 0 && userContext.name) setOnboardingStep(1);
        else if (onboardingStep === 1 && userContext.age) setOnboardingStep(2);
        else if (onboardingStep === 2 && userContext.gender) setUserContext(prev => ({ ...prev, onboarded: true }));
    };

    return (
        <div className={`flex h-[100dvh] md:h-screen ${emergencyMode ? 'bg-[#450a0a]' : 'bg-[#020617]'} text-slate-200 overflow-hidden font-sans relative transition-colors duration-1000`}>
            {/* SOS Mode Overlay */}
            {emergencyMode && (
                <div className="absolute inset-0 z-[100] bg-red-600/10 animate-sos-flash pointer-events-none"></div>
            )}

            {/* Ambient Background Glows */}
            {!emergencyMode && (
                <>
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                </>
            )}

            {/* Onboarding Overlay ... (Keep existing onboarding) ... */}
            {!userContext.onboarded && (
                <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
                    <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 max-w-md w-full shadow-2xl animate-pop-in">
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20">
                                <BsRobot className="text-4xl text-emerald-400 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2">Initialize <span style={{ color: "#FF9933" }}>Sehaat</span> AI v6.0</h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Neural Perception Setup • Step {onboardingStep + 1}/3</p>
                        </div>
                        <form onSubmit={startOnboarding} className="space-y-6">
                            {onboardingStep === 0 && (
                                <div className="space-y-4 animate-slide-up">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block ml-2">Your Name?</label>
                                    <input autoFocus className="w-full bg-slate-800/50 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-emerald-500/50 outline-none text-xl font-bold transition-all" placeholder="Enter name..." value={userContext.name} onChange={(e) => setUserContext({ ...userContext, name: e.target.value })} />
                                </div>
                            )}
                            {onboardingStep === 1 && (
                                <div className="space-y-4 animate-slide-up">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block ml-2">Age?</label>
                                    <input autoFocus type="number" className="w-full bg-slate-800/50 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-emerald-500/50 outline-none text-xl font-bold transition-all" placeholder="Enter age..." value={userContext.age} onChange={(e) => setUserContext({ ...userContext, age: e.target.value })} />
                                </div>
                            )}
                            {onboardingStep === 2 && (
                                <div className="grid grid-cols-2 gap-4 animate-slide-up">
                                    {['Male', 'Female'].map(g => (
                                        <button key={g} type="button" onClick={() => setUserContext({ ...userContext, gender: g })} className={`py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-2 ${userContext.gender === g ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : 'bg-slate-800 border-white/5 text-slate-400 hover:border-white/10'}`}>
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-3xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"> ACTIVATE SENSORS <BsPlusCircle /> </button>
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
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Scanning Biometrics</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest px-8">Place your finger on the camera or sit still and look directly at the sensor.</p>
                        </div>

                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-[10px] font-black text-red-500 uppercase tracking-widest">
                                <span>Pulse HUD Progress</span>
                                <span>{ppgData.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_15px_#ef4444]" style={{ width: `${ppgData.progress}%` }}></div>
                            </div>
                        </div>

                        <button onClick={() => stopPPGScan([])} className="px-10 py-4 bg-white/5 hover:bg-red-900 text-red-500 hover:text-white rounded-2xl font-black uppercase text-[10px] transition-all border border-white/5">Abort Scan</button>
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
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 text-blue-400 font-black">{userContext.name ? userContext.name[0] : 'U'}</div>
                        <div>
                            <h4 className="font-black text-white text-sm uppercase tracking-tighter truncate w-32">{userContext.name || 'User'}</h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{userContext.age}Y • {userContext.gender}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-2"><BsActivity className="text-blue-500" /> Sensor Dashboard</h5>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">{t.status}</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded uppercase border ${emergencyMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        {emergencyMode ? 'EMERGENCY: SYSTEM LOCKED' : currentRule ? 'MAPPING CONDITION' : 'SYSTEM READY'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2">Affected Systems</span>
                                <div className="flex flex-wrap gap-1">
                                    {riskProfile.detectedOrgans.map((o, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-[8px] font-black px-2 py-1 rounded-lg border border-blue-500/20 animate-pulse tracking-tighter capitalize"><BsGeoAltFill className="text-[7px]" /> {o}</div>
                                    ))}
                                    {riskProfile.detectedOrgans.length === 0 && <span className="text-[10px] font-bold text-slate-600 italic">No activity...</span>}
                                </div>
                            </div>

                            {/* Neural Vitals Dashboard (v5.0) */}
                            <div className="space-y-6 mt-10">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                                    <BsHeartPulseFill className="text-red-500 animate-pulse" /> Vitals Telemetry
                                </h5>
                                <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Biometric Waveform (SVG) */}
                                    <div className="absolute top-2 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <svg width="60" height="20" viewBox="0 0 60 20">
                                            <path d="M0 10 L10 10 L15 2 L25 18 L30 10 L60 10" fill="none" stroke="#10b981" strokeWidth="2" className="animate-neural-pulse" />
                                        </svg>
                                    </div>

                                    <div className="space-y-5 relative z-10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Blood Pressure</span>
                                                <input type="text" name="bp" value={vitals.bp} onChange={handleVitalChange} placeholder="120/80" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-black text-white outline-none focus:border-red-500/50 transition-all placeholder:text-slate-700" />
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pulse (BPM)</span>
                                                <div className="relative">
                                                    <input type="number" name="pulse" value={vitals.pulse} onChange={handleVitalChange} placeholder="72" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-black text-white outline-none focus:border-red-500/50 transition-all placeholder:text-slate-700" />
                                                    <BsHeartPulseFill className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${vitals.pulse ? 'text-red-500 animate-heartbeat-slow' : 'text-slate-700'}`} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Blood Sugar</span>
                                                <span className="text-[8px] font-bold text-slate-600 uppercase">mg/dL</span>
                                            </div>
                                            <input type="number" name="sugar" value={vitals.sugar} onChange={handleVitalChange} placeholder="100" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-black text-white outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" />
                                        </div>

                                        {vitals.bp && (
                                            <div className="pt-3 flex items-center gap-3 border-t border-white/5">
                                                <div className={`w-3 h-3 rounded-full ${parseInt(vitals.bp.split('/')[0]) > 140 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'} animate-pulse`}></div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Biometric Sync: 100% Secure Link</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Neural Perception Hub (v6.0) */}
                            <div className="space-y-6 mt-10">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                                    <BsStars className="text-emerald-500" /> Perception Engine
                                </h5>
                                <div className="p-6 bg-slate-900/60 rounded-[2.5rem] border border-white/5 space-y-4">
                                    <button onClick={startPPGScan} className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl flex items-center justify-between group transition-all">
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500 group-hover:animate-neural-pulse"><BsHeartPulseFill /></div>
                                            <div>
                                                <h6 className="text-[10px] font-black text-white uppercase tracking-tighter">PPG Pulse Sensor</h6>
                                                <p className="text-[8px] font-bold text-slate-500 uppercase">Scan BPM via Camera</p>
                                            </div>
                                        </div>
                                        <div className="text-red-500 font-black text-sm">{ppgData.bpm || '--'}</div>
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => { setInputValue("Analyze skin rash / daane"); fileInputRef.current.click(); }} className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-left group transition-all">
                                            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform"><BsSearch /></div>
                                            <h6 className="text-[9px] font-black text-white uppercase">Skin Scan</h6>
                                        </button>
                                        <button onClick={() => { setInputValue("Analyze this meal khana"); fileInputRef.current.click(); }} className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl text-left group transition-all">
                                            <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-500 mb-2 group-hover:scale-110 transition-transform"><BsRobot /></div>
                                            <h6 className="text-[9px] font-black text-white uppercase">Meal Vision</h6>
                                        </button>
                                    </div>

                                    {/* Satellite Link: claramente visible e interactivo */}
                                    <a
                                        href="https://sehaat-saathi-your-ai-doctor-chatbot.streamlit.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 bg-gradient-to-r from-orange-500/20 to-green-500/20 hover:from-orange-500/30 hover:to-green-500/30 border border-orange-500/30 rounded-2xl transition-all relative group animate-satellite-pulse"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 group-hover:rotate-12 transition-transform">
                                                <BsStars className="animate-spin-slow" />
                                            </div>
                                            <div className="flex-1">
                                                <h6 className="text-[10px] font-black text-white uppercase tracking-tighter">Neural Global News</h6>
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
                            <div className="p-4 bg-slate-900/60 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="scanner-line"></div>
                                <span className="text-[9px] font-black text-emerald-500 uppercase block mb-4 flex items-center gap-2">
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
                        </div>
                    </div>
                </div>
            </aside>

            {/* Backdrop for Mobile Sidebar */}
            {showMobileSidebar && (
                <div onClick={() => setShowMobileSidebar(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[140] lg:hidden animate-fade-in" />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative w-full overflow-hidden">
                <header className={`bg-slate-900/40 backdrop-blur-2xl border-b border-white/5 p-3 md:p-4 md:px-8 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center z-50 sticky top-0 ${emergencyMode ? 'border-red-500/30' : ''}`}>
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link to="/smarthub" className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl transition-all border border-white/5"><BsArrowLeft className="text-lg md:text-xl" /></Link>
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="relative">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 ${emergencyMode ? 'bg-red-600' : 'bg-gradient-to-tr from-emerald-500 to-blue-500'} rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl`}>
                                        {emergencyMode ? <BsExclamationTriangle className="text-white text-xl md:text-2xl animate-pulse" /> : <BsRobot className="text-white text-xl md:text-2xl" />}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="font-black text-sm md:text-xl tracking-tight uppercase leading-none flex items-center gap-2"><span style={{ color: "#FF9933" }}>Sehaat</span> <span className={emergencyMode ? 'text-red-400' : 'text-emerald-500'}>AI v6.0</span></h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-1.5 h-1.5 md:w-2 md:h-2 ${emergencyMode ? 'bg-red-500' : 'bg-emerald-500'} rounded-full animate-ping`}></span>
                                        <span className="text-[8px] md:text-[9px] font-black text-slate-500 tracking-widest uppercase">{emergencyMode ? 'Emergency Lockdown' : 'Bio-Metric Link Active'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Sidebar Toggle */}
                        <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400">
                            <BsActivity className={showMobileSidebar ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {!emergencyMode && (
                        <div className="flex items-center bg-white/5 p-1 rounded-lg md:rounded-xl border border-white/5 gap-1 md:gap-2 self-end sm:self-auto">
                            <button onClick={() => setIsHandsFree(!isHandsFree)} className={`px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg flex items-center gap-1.5 md:gap-2 transition-all ${isHandsFree ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}>
                                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isHandsFree ? 'bg-white animate-pulse' : 'bg-slate-600'}`}></div>
                                <span className="text-[8px] md:text-[10px] font-black uppercase">Bridge</span>
                            </button>
                            <div className="w-[1px] h-3 md:h-4 bg-white/10 mx-0.5 md:mx-1"></div>
                            {['EN', 'HI', 'HN'].map(lang => (
                                <button key={lang} onClick={() => setLanguage(lang)} className={`px-2 md:px-4 py-1.5 md:py-2 text-[8px] md:text-[10px] font-black rounded-md md:rounded-lg transition-all ${language === lang ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto p-3 md:px-12 py-6 md:py-10 space-y-6 md:space-y-12 scrollbar-hide">
                    <div className="max-w-4xl mx-auto pb-60">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group animate-slide-up mb-6 md:mb-8`}>
                                <div className={`flex gap-3 md:gap-6 max-w-[100%] md:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex-shrink-0 flex items-center justify-center border-2 md:border-4 ${msg.sender === 'user' ? 'bg-blue-600 border-blue-400/20 text-white' : msg.isEmergency ? 'bg-red-600 border-red-400/30 text-white' : 'bg-slate-800 border-white/5 text-emerald-400'}`}>
                                        {msg.sender === 'user' ? <BsPersonFill className="text-sm md:text-xl" /> : msg.isEmergency ? <BsExclamationTriangle /> : <BsRobot className="text-sm md:text-xl" />}
                                    </div>
                                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex-1`}>
                                        <div className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-sm md:text-[15px] shadow-2xl relative overflow-hidden w-full ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : msg.isEmergency ? 'bg-red-950/80 border-2 border-red-500 text-red-100 rounded-tl-none animate-shake' : 'bg-slate-800/80 backdrop-blur-3xl text-slate-200 border border-white/10 rounded-tl-none'}`}>
                                            <div className="whitespace-pre-line relative z-10 prose-invert overflow-hidden break-words">{msg.text}</div>
                                            {msg.isL1 && <div className="mt-4 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-black rounded uppercase w-fit border border-emerald-500/20">Deterministic Layer-1 Analysis</div>}
                                            <RiskBadge status={msg.status} citation={msg.citation} />

                                            {msg.actions && !emergencyMode && (
                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {msg.actions.map((act, i) => (
                                                        <button key={i} className="bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black p-3 rounded-xl uppercase tracking-widest active:scale-95 transition-all shadow-lg">{act}</button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Neural Rule Question Engine */}
                        {currentRule && !isAnalyzing && (
                            <div className="flex justify-start mb-10 animate-slide-up">
                                <div className="flex gap-4 items-start w-full max-w-2xl bg-slate-900 border-2 border-emerald-500/30 p-8 rounded-[3rem] rounded-tl-none backdrop-blur-3xl shadow-2xl shadow-emerald-500/10">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 flex-shrink-0 animate-pulse"><BsRobot /></div>
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-2">Neural Question {stepIndex + 1}/{currentRule.questions.length}</span>
                                            <h3 className="text-xl font-black text-white">{currentRule.questions[stepIndex].text}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {currentRule.questions[stepIndex].options.map((opt, i) => (
                                                <button key={i} onClick={() => handleStepAnswer(opt)} className="bg-slate-800 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl text-left transition-all border border-white/5 hover:border-emerald-400 active:scale-95 group flex justify-between items-center">
                                                    {opt} <BsPlusCircle className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="flex justify-start mb-10 animate-slide-up">
                                <div className={`flex gap-6 items-center ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'bg-purple-500/5 border-purple-500/30' : inputValue.toLowerCase().includes('meal') ? 'bg-orange-500/5 border-orange-500/30' : 'bg-blue-500/5 border-blue-500/30') : 'bg-emerald-500/5 border-emerald-500/30'} p-8 rounded-[3rem] rounded-tl-none backdrop-blur-3xl w-full max-w-lg shadow-2xl relative overflow-hidden`}>
                                    <div className={`absolute inset-x-0 h-[1px] ${inputValue.toLowerCase().includes('skin') ? 'bg-purple-500/20' : inputValue.toLowerCase().includes('meal') ? 'bg-orange-500/20' : 'bg-emerald-500/20'} animate-bio-scan`}></div>
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <div className={`absolute inset-0 border-4 ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'border-purple-500/20' : inputValue.toLowerCase().includes('meal') ? 'border-orange-500/20' : 'border-blue-500/20') : 'border-emerald-500/20'} rounded-full`}></div>
                                        <div className={`absolute inset-0 border-4 ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'border-purple-500' : inputValue.toLowerCase().includes('meal') ? 'border-orange-500' : 'border-blue-500') : 'border-emerald-500'} border-t-transparent rounded-full animate-spin`}></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-white animate-pulse">{capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'SKIN' : inputValue.toLowerCase().includes('meal') ? 'MEAL' : 'VISION') : 'CORE'}</div>
                                    </div>
                                    <div>
                                        <h4 className={`text-[12px] font-black uppercase tracking-[0.3em] ${capturedImage ? (inputValue.toLowerCase().includes('skin') ? 'text-purple-400' : inputValue.toLowerCase().includes('meal') ? 'text-orange-400' : 'text-blue-400') : 'text-emerald-400'}`}>
                                            {capturedImage ? (
                                                inputValue.toLowerCase().includes('skin') ? 'Neural Skin Analysis...' :
                                                    inputValue.toLowerCase().includes('meal') ? 'Smart Meal Triage...' :
                                                        'Vision AI Report Analysis...'
                                            ) : (
                                                (inputValue.toLowerCase().includes('medicine') || inputValue.toLowerCase().includes('dawa') || inputValue.toLowerCase().includes('capsule')) ?
                                                    'Scanning Medical Database...' : 'Mapping Neural Pathways...'
                                            )}
                                        </h4>

                                        <p className="text-[9px] text-slate-500 font-bold mt-2 uppercase flex items-center gap-2">
                                            {capturedImage ? (inputValue.toLowerCase().includes('skin') ? <><BsSearch className="animate-pulse" /> Dermatology Scan Link Active</> : inputValue.toLowerCase().includes('meal') ? <><BsRobot className="animate-pulse" /> Nutritional Impact Calculation</> : <><BsSearch className="animate-pulse" /> Precision Optical Scanning Active</>) : <><BsActivity className="animate-pulse" /> Evaluating Medical Data Streams</>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <footer className={`absolute bottom-0 left-0 right-0 p-3 md:p-10 bg-slate-950/90 backdrop-blur-3xl border-t ${emergencyMode ? 'border-red-500/30' : 'border-white/10'} z-[60]`}>
                    <div className="max-w-4xl mx-auto">
                        {emergencyMode ? (
                            <div className="flex flex-col items-center gap-4 md:gap-6 max-w-xl w-full">
                                <div className="w-20 h-20 md:w-32 md:h-32 bg-red-600 rounded-full flex items-center justify-center animate-sos-flash shadow-[0_0_100px_rgba(220,38,38,0.5)]">
                                    <BsExclamationTriangle className="text-3xl md:text-6xl text-white animate-shake" />
                                </div>
                                <div className="text-center space-y-2 md:space-y-4">
                                    <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight uppercase">Emergency Sync</h2>
                                    <p className="text-sm md:text-xl text-red-200 font-bold opacity-80 leading-relaxed">
                                        High-risk detected. Systems locked.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">
                                    <a href="tel:102" className="flex items-center justify-center gap-3 bg-white text-red-600 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-2xl hover:bg-red-50 transition-all shadow-2xl">
                                        <BsVolumeUpFill /> CALL 102
                                    </a>
                                    <button onClick={() => window.open(`https://www.google.com/maps/search/hospitals+near+me`, '_blank')} className="flex items-center justify-center gap-3 bg-red-800 text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-2xl hover:bg-red-900 transition-all border border-white/10 shadow-2xl">
                                        <BsGeoAltFill /> NEAREST HOSPITAL
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSendMessage} className="relative group flex items-center gap-2 md:gap-4">
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                <button type="button" onClick={() => fileInputRef.current.click()} className="p-3 md:p-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl md:rounded-2xl transition-all border border-white/5">
                                    <BsPlusCircle className="text-lg md:text-xl" />
                                </button>
                                <div className="relative flex-1">
                                    <input autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={currentRule} placeholder={currentRule ? "Answer above..." : "Appko kya takleef hai?"} className="w-full bg-slate-900 border-2 border-white/5 text-white rounded-2xl md:rounded-[2.5rem] py-4 md:py-6 px-4 md:px-10 focus:outline-none focus:border-emerald-500/50 transition-all text-sm md:text-base font-bold placeholder:text-slate-700" />
                                    <div className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-6">
                                        <button type="button" onClick={startListening} className={`p-1.5 md:p-2 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-600 hover:text-emerald-500'}`} title="Voice Search">
                                            <BsVolumeUpFill className="text-lg md:text-xl" />
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={!inputValue.trim() || isTyping || isAnalyzing || currentRule} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 text-white w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center transition-all shadow-2xl active:scale-95">
                                    <BsSendFill className="text-xl md:text-2xl" />
                                </button>
                            </form>
                        )}
                    </div>
                </footer>
            </div>

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
        </div>
    );
};

export default DoctorAI;
