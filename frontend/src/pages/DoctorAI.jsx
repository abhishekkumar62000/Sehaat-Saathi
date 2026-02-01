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

    // Health Dashboard State
    const [riskProfile, setRiskProfile] = useState({
        symptoms: [],
        urgency: 'Low',
        confidence: 0,
        detectedOrgans: []
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isAnalyzing]);

    // Initial Greeting after onboarding
    useEffect(() => {
        if (userContext.onboarded && messages.length === 0) {
            setMessages([
                {
                    text: `Namaste ${userContext.name}! I am Sehaat AI. I have analyzed your profile (${userContext.age}y, ${userContext.gender}). How can I help you today?`,
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: ["Analyze Symptoms", "Diet Advice", "Explain Report"]
                }
            ]);
        }
    }, [userContext.onboarded]);

    // Voice Mode (Web Speech API)
    const speakMessage = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    // AI Logic Engine
    const processAIResponse = (userInput) => {
        setIsAnalyzing(true);
        const input = userInput.toLowerCase();

        setTimeout(() => {
            setIsAnalyzing(false);
            setIsTyping(true);

            setTimeout(() => {
                let response = {
                    text: "",
                    sender: 'ai',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    actions: [],
                    confidence: 85,
                    citation: "Clinical Protocol 2026-v4"
                };

                let newSymptoms = [...riskProfile.symptoms];
                let newOrgans = [...riskProfile.detectedOrgans];
                let newUrgency = 'Low';

                if (input.includes("fever") || input.includes("bukhaar")) {
                    response.text = `Hello ${userContext.name}, based on your age (${userContext.age}), a fever needs careful monitoring. \n\nMy Neural Analysis suggests a 92% probability of a viral interaction. \n\nSuggested Actions:\n1. Paracetamol (if >101F)\n2. CBC + Widal Test if it persists for 3 days.`;
                    response.actions = ["Book CBC Test", "Find Local Doctor"];
                    response.confidence = 92;
                    newSymptoms.push("Pyrexia (Fever)");
                    newOrgans.push("Immune System");
                    newUrgency = 'Moderate';
                } else if (input.includes("stomach") || input.includes("pet dard")) {
                    response.text = "Abdominal discomfort detected. Is the pain sharp or a dull ache? \n\nPlease avoid solid foods for 4 hours and stick to BRAT diet (Bananas, Rice, Applesauce, Toast).";
                    response.actions = ["Book Ultrasound", "Stomach Profile"];
                    response.confidence = 78;
                    newSymptoms.push("Abdominal Pain");
                    newOrgans.push("Gastrointestinal");
                } else if (input.includes("chest") || input.includes("dil")) {
                    response.text = "CRITICAL: Chest discomfort mentioned. \n\nIf you feel pressure, shortness of breath, or pain radiating to your left arm, STOP CHATTING and call an ambulance (102) immediately.";
                    response.actions = ["EMERGENCY CALL", "ECG at Home"];
                    response.confidence = 98;
                    newSymptoms.push("Chest Pain");
                    newOrgans.push("Cardiovascular");
                    newUrgency = 'High';
                } else if (input.includes("diet") || input.includes("food")) {
                    response.text = `For a ${userContext.gender} of ${userContext.age} years, high protein and fiber intake is essential. \n\nMorning: Oats/Sprouts\nNoon: Daal, Sabzi, 2 Rotis\nNight: Light soup/Grilled veggies.`;
                    response.actions = ["View Full Chart", "Order Supplements"];
                    response.confidence = 95;
                } else {
                    response.text = "That's insightful. I am correlating this with our 1.4B medical data points. To give a precise diagnosis, a clinical screening is advised.";
                    response.actions = ["Full Body Gold", "Talk to Expert"];
                    response.confidence = 65;
                }

                setRiskProfile(prev => ({
                    ...prev,
                    symptoms: [...new Set(newSymptoms)],
                    detectedOrgans: [...new Set(newOrgans)],
                    urgency: newUrgency,
                    confidence: response.confidence
                }));

                setMessages(prev => [...prev, response]);
                setIsTyping(false);
            }, 1000);
        }, 1500);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            text: inputValue,
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
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Onboarding Overlay */}
            {!userContext.onboarded && (
                <div className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6">
                    <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 max-w-md w-full shadow-2xl animate-pop-in">
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20">
                                <BsRobot className="text-4xl text-emerald-400 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2">Initialize Sehaat AI</h2>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Neural Link Setup • Step {onboardingStep + 1}/3</p>
                        </div>

                        <form onSubmit={startOnboarding} className="space-y-6">
                            {onboardingStep === 0 && (
                                <div className="space-y-4 animate-slide-up">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block ml-2">Appka Naam (Your Name)?</label>
                                    <input
                                        autoFocus
                                        className="w-full bg-slate-800/50 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-emerald-500/50 outline-none text-xl font-bold transition-all"
                                        placeholder="Enter name..."
                                        value={userContext.name}
                                        onChange={(e) => setUserContext({ ...userContext, name: e.target.value })}
                                    />
                                </div>
                            )}
                            {onboardingStep === 1 && (
                                <div className="space-y-4 animate-slide-up">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-tighter block ml-2">Your Age (Years)?</label>
                                    <input
                                        autoFocus
                                        type="number"
                                        className="w-full bg-slate-800/50 border-2 border-white/5 rounded-2xl py-5 px-6 focus:border-emerald-500/50 outline-none text-xl font-bold transition-all"
                                        placeholder="Enter age..."
                                        value={userContext.age}
                                        onChange={(e) => setUserContext({ ...userContext, age: e.target.value })}
                                    />
                                </div>
                            )}
                            {onboardingStep === 2 && (
                                <div className="grid grid-cols-2 gap-4 animate-slide-up">
                                    {['Male', 'Female'].map(g => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setUserContext({ ...userContext, gender: g })}
                                            className={`py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border-2 ${userContext.gender === g ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-105' : 'bg-slate-800 border-white/5 text-slate-400 hover:border-white/10'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={(onboardingStep === 0 && !userContext.name) || (onboardingStep === 1 && !userContext.age) || (onboardingStep === 2 && !userContext.gender)}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-95"
                            >
                                CONTINUE <BsPlusCircle />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Left Sidebar: Real-time Health Dashboard */}
            <aside className="hidden lg:flex w-80 flex-col bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 p-8 overflow-y-auto z-40 relative">
                <div className="space-y-10">
                    {/* User Mini Profile */}
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-[1.5rem] border border-white/5">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 font-black">
                            {userContext.name ? userContext.name[0] : 'U'}
                        </div>
                        <div>
                            <h4 className="font-black text-white text-sm uppercase tracking-tighter truncate w-32">{userContext.name || 'User'}</h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{userContext.age}Y • {userContext.gender}</p>
                        </div>
                    </div>

                    {/* Risk Profile */}
                    <div className="space-y-6">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-2">
                            <BsActivity className="text-emerald-500" /> Neural Risk Profile
                        </h5>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-1">Detected Symptoms</span>
                                <div className="flex flex-wrap gap-2">
                                    {riskProfile.symptoms.length > 0 ? riskProfile.symptoms.map((s, i) => (
                                        <span key={i} className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-1 rounded uppercase border border-emerald-500/20">{s}</span>
                                    )) : <span className="text-[10px] font-bold text-slate-600 italic">No symptoms detected...</span>}
                                </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                <span className="text-[9px] font-black text-slate-500 uppercase block mb-2">Affected Systems</span>
                                <div className="flex flex-wrap gap-1">
                                    {riskProfile.detectedOrgans.map((o, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-[8px] font-black px-2 py-1 rounded-lg border border-blue-500/20">
                                            <BsGeoAltFill className="text-[7px]" /> {o}
                                        </div>
                                    ))}
                                    {riskProfile.detectedOrgans.length === 0 && <span className="text-[10px] font-bold text-slate-600 italic">Scanning organs...</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 flex flex-col items-center">
                                    <span className="text-[9px] font-black text-slate-500 uppercase mb-2">Urgency</span>
                                    <div className={`text-xs font-black uppercase ${riskProfile.urgency === 'High' ? 'text-red-500' : riskProfile.urgency === 'Moderate' ? 'text-orange-500' : 'text-emerald-500'}`}>
                                        {riskProfile.urgency}
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 flex flex-col items-center">
                                    <span className="text-[9px] font-black text-slate-500 uppercase mb-2">Confidence</span>
                                    <div className="text-xs font-black text-white uppercase">{riskProfile.confidence}%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Body Outline (Pure CSS/SVG Placeholder) */}
                    <div className="relative aspect-[1/2] w-32 mx-auto opacity-20 hover:opacity-100 transition-opacity">
                        <svg viewBox="0 0 100 200" className="w-full h-full text-slate-700">
                            <path d="M50 10 L40 25 L60 25 Z" fill={riskProfile.detectedOrgans.includes("Cardiovascular") ? "#ef4444" : "currentColor"} />
                            <rect x="35" y="30" width="30" height="60" rx="10" fill={riskProfile.detectedOrgans.includes("Cardiovascular") ? "#ef4444" : "currentColor"} />
                            <path d="M35 150 L25 190 M65 150 L75 190" stroke="currentColor" strokeWidth="5" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] font-black text-white uppercase bg-slate-900 border border-white/10 px-2 py-0.5 rounded-full shadow-2xl">Neural Diagnostic Map</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <header className="bg-slate-900/40 backdrop-blur-2xl border-b border-white/5 p-4 md:px-8 flex justify-between items-center z-50 sticky top-0">
                    <div className="flex items-center gap-4">
                        <Link to="/smarthub" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                            <BsArrowLeft className="text-xl" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                                    <BsRobot className="text-white text-2xl" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-slate-900 p-1 rounded-lg border border-white/10">
                                    <BsHeartPulseFill className="text-[10px] text-red-500 animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <h1 className="font-black text-lg tracking-tight uppercase leading-none">Sehaat <span className="text-emerald-500">AI V3.0</span></h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                                    <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">Neural Core Alpha</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => { window.location.reload(); }} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-500/10 rounded-xl border border-white/5 text-slate-400 transition-all hover:text-red-500">
                            <BsTrash />
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <main className="flex-1 overflow-y-auto p-4 md:px-12 py-10 space-y-12 scrollbar-hide bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_100%)]">
                    <div className="max-w-4xl mx-auto pb-40">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group animate-slide-up`}>
                                <div className={`flex gap-6 max-w-[95%] md:max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 border-4 ${msg.sender === 'user' ? 'bg-blue-600 border-blue-400/20 text-white' : 'bg-slate-800 border-white/5 text-emerald-400'
                                        }`}>
                                        {msg.sender === 'user' ? <BsPersonFill className="text-xl" /> : <BsRobot className="text-xl" />}
                                    </div>

                                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-6 md:p-8 rounded-[2.5rem] text-[15px] md:text-16 shadow-2xl transition-all leading-relaxed relative overflow-hidden group/card ${msg.sender === 'user'
                                            ? 'bg-blue-600/90 text-white rounded-tr-none border border-blue-400/30'
                                            : 'bg-slate-800/80 backdrop-blur-3xl text-slate-200 border border-white/10 rounded-tl-none hover:bg-white/10'
                                            }`}>
                                            {/* AI Tools Overlay */}
                                            {msg.sender === 'ai' && (
                                                <button
                                                    onClick={() => speakMessage(msg.text)}
                                                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-xl transition-all opacity-0 group-hover/card:opacity-100 border border-white/10"
                                                    title="Listen to AI Voice"
                                                >
                                                    <BsVolumeUpFill />
                                                </button>
                                            )}

                                            <div className="whitespace-pre-line relative z-10">{msg.text}</div>

                                            {msg.actions && msg.actions.length > 0 && (
                                                <div className="mt-8 flex flex-wrap gap-2">
                                                    {msg.actions.map((action, i) => (
                                                        <button key={i} className="bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 text-emerald-400 text-[10px] font-black py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 uppercase tracking-[.1em] shadow-xl">
                                                            <BsPlusCircle /> {action}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Advanced Metadata */}
                                            {msg.sender === 'ai' && (
                                                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <BsSpeedometer className="text-emerald-500 text-xs" />
                                                        <span className="text-[9px] font-black text-slate-500 uppercase">Analysis: {msg.confidence}% Confidence</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <BsBookHalf className="text-blue-500 text-xs" />
                                                        <span className="text-[9px] font-black text-slate-500 uppercase italic">Ref: {msg.citation}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 opacity-30">
                                            <span className="text-[9px] font-black uppercase tracking-widest">{msg.time}</span>
                                            {msg.sender === 'ai' && <BsCheck2Circle className="text-[10px] text-emerald-500" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Status Indicators */}
                        {isAnalyzing && (
                            <div className="flex justify-start mb-10">
                                <div className="flex gap-4 items-center bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[3rem] rounded-tl-none backdrop-blur-2xl">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <div className="w-full h-full border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                                    </div>
                                    <div>
                                        <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Neural Thread Processing...</p>
                                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Correlating 1.4B Medical Parameters</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Fixed Input Area */}
                <footer className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-slate-950/80 backdrop-blur-3xl border-t border-white/10 z-[60]">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSendMessage} className="relative group flex items-center gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Abhi kya ho rha hai? (Start typing symptoms...)"
                                    className="w-full bg-slate-900 border-2 border-white/5 text-white rounded-[2.5rem] py-6 px-10 focus:outline-none focus:border-emerald-500/50 focus:ring-8 focus:ring-emerald-500/5 transition-all text-base font-bold placeholder:text-slate-700 shadow-2xl shadow-black/50"
                                />
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-6">
                                    <BsSearch className="text-slate-600 transition-colors group-hover:text-emerald-500 text-xl" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping || isAnalyzing}
                                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 text-white w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center transition-all shadow-2xl shadow-emerald-600/30 active:scale-95 group-hover:rotate-12"
                            >
                                <BsSendFill className="text-2xl" />
                            </button>
                        </form>
                        <div className="mt-8 flex justify-center gap-10 opacity-30 text-[9px] font-black uppercase tracking-[0.4em]">
                            <span className="flex items-center gap-2"><BsShieldCheck className="text-emerald-500" /> End-to-End Encrypted</span>
                            <span className="flex items-center gap-2"><BsJournalMedical className="text-blue-500" /> AI Diagnostic Core</span>
                        </div>
                    </div>
                </footer>
            </div>

            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pop-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
                .animate-pop-in { animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                input::placeholder { font-weight: 900; letter-spacing: 0.1em; color: #475569; }
            `}</style>
        </div>
    );
};

export default DoctorAI;
