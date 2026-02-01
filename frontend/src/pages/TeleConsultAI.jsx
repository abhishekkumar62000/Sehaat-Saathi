import { useState, useEffect } from 'react';
import {
    BsCameraVideoFill, BsMicFill, BsMicMuteFill, BsCameraVideoOffFill,
    BsTelephoneFill, BsCalendarCheck, BsSearch, BsFilter,
    BsStarFill, BsClock, BsPersonFill, BsChatQuoteFill, BsXCircle,
    BsActivity, BsFillChatDotsFill, BsFileEarmarkMedicalFill, BsArrowRight,
    BsTranslate, BsHeartPulseFill, BsBodyText, BsLightningChargeFill, BsCartCheckFill,
    BsFileEarmarkArrowUpFill, BsShieldCheck, BsAwardFill, BsExclamationTriangleFill, BsGeoAltFill
} from 'react-icons/bs';

const TELE_DOCTORS = [
    { id: 1, name: "Dr. Arvind Sharma", specialty: "Cardiologist", experience: "15 Years", rating: 4.9, image: "https://randomuser.me/api/portraits/men/32.jpg", status: "Available", color: "rose", fee: 500, response: "Under 1 min", bio: "Senior Cardiologist at Apollo with expertise in Interventional Cardiology.", patients: "15k+", education: "MBBS, MD (Cardio)" },
    { id: 2, name: "Dr. Meera Iyer", specialty: "Neurologist", experience: "12 Years", rating: 4.8, image: "https://randomuser.me/api/portraits/women/44.jpg", status: "In Session", color: "blue", fee: 600, response: "2 mins" },
    { id: 3, name: "Dr. Rohan Gupta", specialty: "Pediatrician", experience: "10 Years", rating: 5.0, image: "https://randomuser.me/api/portraits/men/45.jpg", status: "Available", color: "emerald", fee: 400, response: "Under 2 mins" },
    { id: 4, name: "Dr. Sana Khan", specialty: "Dermatologist", experience: "8 Years", rating: 4.7, image: "https://randomuser.me/api/portraits/women/65.jpg", status: "Offline", color: "violet", fee: 450, response: "N/A" },
    { id: 5, name: "Dr. Vikram Sethi", specialty: "Orthopedic", experience: "20 Years", rating: 4.9, image: "https://randomuser.me/api/portraits/men/52.jpg", status: "Available", color: "orange", fee: 700, response: "1 min" },
    { id: 6, name: "Dr. Anjali Verma", specialty: "Psychiatrist", experience: "14 Years", rating: 4.6, image: "https://randomuser.me/api/portraits/women/33.jpg", status: "Available", color: "purple", fee: 550, response: "3 mins" },
    { id: 7, name: "Dr. Sameer Deshpande", specialty: "Ent Specialist", experience: "11 Years", rating: 4.8, image: "https://randomuser.me/api/portraits/men/55.jpg", status: "Available", color: "cyan", fee: 400, response: "Under 1 min" },
    { id: 8, name: "Dr. Pooja Reddy", specialty: "Gynecologist", experience: "16 Years", rating: 4.9, image: "https://randomuser.me/api/portraits/women/12.jpg", status: "In Session", color: "pink", fee: 650, response: "4 mins" },
    { id: 9, name: "Dr. Kabir Singh", specialty: "General Surgeon", experience: "18 Years", rating: 4.7, image: "https://randomuser.me/api/portraits/men/62.jpg", status: "Available", color: "slate", fee: 800, response: "1 min" },
    { id: 10, name: "Dr. Neha Malhotra", specialty: "Dietician", experience: "7 Years", rating: 4.5, image: "https://randomuser.me/api/portraits/women/15.jpg", status: "Available", color: "teal", fee: 300, response: "Under 3 mins" },
];

const DOMAINS = [
    { id: 'all', name: 'All Specialties', icon: <BsPersonFill /> },
    { id: 'Cardiologist', name: 'Cardiology', icon: '❤️' },
    { id: 'Neurologist', name: 'Neurology', icon: '🧠' },
    { id: 'Pediatrician', name: 'Pediatrics', icon: '👶' },
    { id: 'Dermatologist', name: 'Skin Care', icon: '✨' },
    { id: 'Orthopedic', name: 'Bones', icon: '🦴' },
    { id: 'Psychiatrist', name: 'Mental Health', icon: '🧘' },
];

const TeleConsultAI = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isPaying, setIsPaying] = useState(false);
    const [paymentStep, setPaymentStep] = useState(1); // 1: Info, 2: Processing, 3: Success
    const [emergencyStage, setEmergencyStage] = useState('idle'); // idle, triage, locating, connected
    const [triageStep, setTriageStep] = useState(0);
    const [viewingDocProfile, setViewingDocProfile] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [transcriptions, setTranscriptions] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'doc', text: "Hello! How can I help you today?" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [activeSidebarTab, setActiveSidebarTab] = useState('vitals');
    const [connectionQuality, setConnectionQuality] = useState('excellent'); // excellent, good, poor
    const [showCelebration, setShowCelebration] = useState(false);
    const [triageProgress, setTriageProgress] = useState(0);
    const [geoProgress, setGeoProgress] = useState(0);
    const [language, setLanguage] = useState('English'); // English, Hindi, Urdu
    const [symptoms, setSymptoms] = useState([]);
    const [bodyPartSelected, setBodyPartSelected] = useState(null);
    const [consultStage, setConsultStage] = useState('idle'); // idle, triage, syncing
    const [consultTriageStep, setConsultTriageStep] = useState(0);
    const [syncProgress, setSyncProgress] = useState(0);
    const [isBioScanning, setIsBioScanning] = useState(false);
    const [bioScanProgress, setBioScanProgress] = useState(0);
    const [showAIExplainer, setShowAIExplainer] = useState(null);
    const [laserPosition, setLaserPosition] = useState({ x: 30, y: 40 });
    const [healthScore, setHealthScore] = useState(0);
    const [healthPodTimer, setHealthPodTimer] = useState(10);
    const [showHealthPod, setShowHealthPod] = useState(false);
    const [facePoints, setFacePoints] = useState([]);
    const [waveform, setWaveform] = useState([]);
    const [insightStream, setInsightStream] = useState([]);

    // Call timer
    useEffect(() => {
        let timer;
        if (callActive) {
            timer = setInterval(() => {
                setCallDuration(prev => prev + 1);
                // Simulate dynamic connection quality
                const qualities = ['excellent', 'good', 'excellent', 'excellent'];
                setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [callActive]);

    // Triage Progress Animation
    useEffect(() => {
        if (emergencyStage === 'triage') {
            setTriageProgress(((triageStep + 1) / 3) * 100);
        }
    }, [triageStep, emergencyStage]);

    // Geo-Dispatch Progress Animation
    useEffect(() => {
        if (emergencyStage === 'locating') {
            setGeoProgress(0);
            const interval = setInterval(() => {
                setGeoProgress(prev => {
                    if (prev >= 100) return 100;
                    return prev + 2;
                });
            }, 60);
            return () => clearInterval(interval);
        }
    }, [emergencyStage]);

    // Neural Sync Progress Animation
    useEffect(() => {
        if (consultStage === 'syncing') {
            setSyncProgress(0);
            const interval = setInterval(() => {
                setSyncProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [consultStage]);

    // Auto-proceed from Syncing to Health Pod
    useEffect(() => {
        if (syncProgress === 100 && consultStage === 'syncing') {
            setTimeout(() => {
                setConsultStage('idle');
                setShowHealthPod(true);
                // Animate Health Score
                let score = 0;
                const scoreInterval = setInterval(() => {
                    score += 1;
                    setHealthScore(score);
                    if (score >= 88) clearInterval(scoreInterval);
                }, 30);

                // Countdown for Pod
                const timerInterval = setInterval(() => {
                    setHealthPodTimer(prev => {
                        if (prev <= 1) {
                            clearInterval(timerInterval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => {
                    clearInterval(scoreInterval);
                    clearInterval(timerInterval);
                };
            }, 1000);
        }
    }, [syncProgress, consultStage]);

    // Proceed from Health Pod to Active Call
    useEffect(() => {
        if (showHealthPod && healthPodTimer === 0) {
            setTimeout(() => {
                setShowHealthPod(false);
                setCallActive(true);
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 3000);
            }, 1000);
        }
    }, [showHealthPod, healthPodTimer]);

    // Generate Face Points for Bio-Scan
    useEffect(() => {
        if (isBioScanning) {
            const points = [...Array(15)].map(() => ({
                top: Math.random() * 80 + 10 + '%',
                left: Math.random() * 80 + 10 + '%',
                opacity: Math.random()
            }));
            setFacePoints(points);
            const interval = setInterval(() => {
                setFacePoints(p => p.map(pt => ({
                    ...pt,
                    opacity: Math.random()
                })));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isBioScanning]);

    // Generate Neural Waveform for Translation
    useEffect(() => {
        if (callActive) {
            const interval = setInterval(() => {
                const newData = [...Array(20)].map(() => Math.random() * 100);
                setWaveform(newData);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [callActive]);

    // Health Pod Insight Stream
    useEffect(() => {
        if (showHealthPod) {
            const insights = [
                "SYSTEM: SCANNING DERMAL LAYERS...",
                "NEURAL: SYNCING BIO-SIGNALS (98% MATCH)",
                "AI: HEART RATE VARIABILITY STABLE",
                "SECURITY: QUANTUM TUNNEL ESTABLISHED",
                "DR_READY: PREPARING CLINICAL HUD..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                setInsightStream(prev => [insights[i % insights.length], ...prev].slice(0, 5));
                i++;
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [showHealthPod]);

    // AI Bio-Sensing Logic
    useEffect(() => {
        if (callActive) {
            setIsBioScanning(true);
            setBioScanProgress(0);
            const interval = setInterval(() => {
                setBioScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setIsBioScanning(false), 1000);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300); // 30 Seconds scan
            return () => clearInterval(interval);
        } else {
            setIsBioScanning(false);
            setBioScanProgress(0);
        }
    }, [callActive]);

    // Collaborative Laser Simulation
    useEffect(() => {
        if (activeSidebarTab === 'records') {
            const interval = setInterval(() => {
                setLaserPosition({
                    x: 20 + Math.random() * 60,
                    y: 20 + Math.random() * 60
                });
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [activeSidebarTab]);

    const handleEndCall = () => {
        setCallActive(false);
        setShowReport(true);
    };

    const toggleLanguage = () => {
        const langs = ['English', 'Hindi', 'Urdu'];
        const next = langs[(langs.indexOf(language) + 1) % langs.length];
        setLanguage(next);
    };

    const handleBodyPartClick = (part) => {
        setBodyPartSelected(part);
        setSymptoms(prev => [...new Set([...prev, part])]);
    };

    const handleConsultClick = (doc) => {
        setSelectedDoc(doc);
        setIsPaying(true);
        setPaymentStep(1);
    };

    const handleViewProfile = (e, doc) => {
        e.stopPropagation();
        setViewingDocProfile(doc);
    };

    const handleProcessPayment = () => {
        setPaymentStep(2);
        setTimeout(() => {
            setPaymentStep(3);
        }, 3000);
    };

    const handleStartCall = () => {
        setIsPaying(false);
        setConsultStage('triage');
        setConsultTriageStep(0);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
        setChatInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'doc', text: "Noted. I'm adding this to your clinical notes." }]);
        }, 1500);
    };

    // Random Transcription Simulation
    useEffect(() => {
        if (callActive) {
            const lines = [
                "Don't worry about the pain. Let me check your symptoms.",
                "Your heart rate seems stable in the report you uploaded.",
                "Are you feeling any dizziness since this morning?",
                "I'm prescribing a low dose based on our session today.",
                "Take rest for 2 days. I've sent the digital prescription."
            ];
            let i = 0;
            const transInterval = setInterval(() => {
                if (i < lines.length) {
                    setTranscriptions(prev => [...prev.slice(-3), lines[i]]);
                    i++;
                }
            }, 5000);
            return () => clearInterval(transInterval);
        } else {
            setTranscriptions([]);
        }
    }, [callActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const filteredDocs = TELE_DOCTORS.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || doc.specialty === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-rose-500/30">
            {/* Header Area */}
            <div className="pt-24 pb-16 px-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />

                {/* Emergency Hotlink */}
                <div className="container mx-auto relative z-20 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-[1px] rounded-[2.5rem] shadow-[0_20px_40px_rgba(244,63,94,0.2)]">
                            <div className="bg-[#0f172a] rounded-[2.5rem] px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-3xl animate-pulse shadow-lg shadow-rose-500/20">
                                        <BsTelephoneFill className="animate-bounce" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-rose-400">SEHAAT SOS: EMERGENCY RESPONSE</h3>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">AI Triage • Ambulance Dispatch • Instant Connect</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setEmergencyStage('triage')}
                                    className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-rose-600/30 flex items-center gap-3 active:scale-95 group animate-pulse"
                                >
                                    ACTIVATE SOS <BsArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-widest mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Live Neural Tele-Consult
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
                            Instant Video Consultations
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12">
                            Top doctors are just a call away. Night or Day, Emergency or Routine – bat karein instant.
                        </p>

                        {/* Domain Filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {DOMAINS.map(domain => (
                                <button
                                    key={domain.id}
                                    onClick={() => setSelectedCategory(domain.id)}
                                    className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all border ${selectedCategory === domain.id ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20 scale-105' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <span className="text-xl">{domain.icon}</span>
                                    {domain.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-rose-500/20 blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-3xl focus-within:border-rose-500/50 transition-all">
                                <BsSearch className="ml-6 text-slate-500 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search by specialty (Cardiology, Neuro, etc.) or name..."
                                    className="w-full bg-transparent px-6 py-4 outline-none text-lg font-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="bg-rose-600 hover:bg-rose-500 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95">
                                    Find Doctor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="container mx-auto px-5 pb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <BsPersonFill className="text-rose-500" /> Specialist Roster
                    </h2>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all">
                            <BsFilter /> Specialty
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all">
                            <BsClock /> Available Now
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDocs.map(doc => (
                        <div key={doc.id} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-sm transition-all hover:border-rose-500/50 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-full flex flex-col">
                                {/* Doctor Image & Status */}
                                <div className="relative mb-6 flex-shrink-0">
                                    <div className={`absolute inset-0 bg-${doc.color}-500 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity`} />
                                    <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover rounded-3xl relative z-10 grayscale-[30%] group-hover:grayscale-0 transition-all" />
                                    <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${doc.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                                        {doc.status}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-rose-400 border border-white/10">
                                        ⚡ Respond: {doc.response}
                                    </div>
                                </div>

                                <div className="relative z-20 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-black group-hover:text-rose-400 transition-colors">{doc.name}</h3>
                                        <span className="text-xl font-black text-emerald-400">₹{doc.fee}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm font-bold mb-4 uppercase tracking-tighter">{doc.specialty}</p>

                                    <div className="flex items-center gap-4 mb-auto">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                            <BsStarFill className="text-orange-400 text-xs" />
                                            <span className="text-sm font-black">{doc.rating}</span>
                                        </div>
                                        <div className="text-xs font-bold text-slate-500">
                                            {doc.experience} EXP
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() => handleConsultClick(doc)}
                                            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-black py-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-rose-600/10 uppercase text-xs tracking-widest"
                                        >
                                            Consult Now
                                        </button>
                                        <button
                                            onClick={(e) => handleViewProfile(e, doc)}
                                            className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-white/10 border border-white/10 transition-all text-slate-400 hover:text-white"
                                        >
                                            <BsPersonFill className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Gateway Modal */}
            {isPaying && selectedDoc && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl animate-fade-in" />
                    <div className="relative z-10 w-full max-w-md bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                        <div className="bg-[#0f172a] rounded-[2.5rem] p-8">
                            {paymentStep === 1 && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-500">Card Number</label>
                                        <input placeholder="1234 5678 9012 3456" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500">Expiry</label>
                                            <input placeholder="MM/YY" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500">CVV</label>
                                            <input placeholder="123" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                        </div>
                                    </div>
                                    {/* Progress Bar for Payment */}
                                    <div className="pt-4">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                            <span>Step 1 of 3</span>
                                            <span>33%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-600 w-[33%] transition-all duration-500" />
                                        </div>
                                    </div>
                                    <button onClick={handleProcessPayment} className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95">
                                        PROCEED TO PAYMENT
                                    </button>
                                </div>
                            )}

                            {paymentStep === 2 && (
                                <div className="text-center space-y-8 py-12 animate-scale-up">
                                    <div className="w-24 h-24 mx-auto border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                    <div>
                                        <h3 className="text-2xl font-black mb-2">PROCESSING SECURE PAYMENT</h3>
                                        <p className="text-slate-400 font-medium">Verifying transaction...</p>
                                    </div>
                                    {/* Progress Bar for Processing */}
                                    <div className="max-w-xs mx-auto">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                            <span>Step 2 of 3</span>
                                            <span>66%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-600 w-[66%] transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentStep === 3 && (
                                <div className="text-center space-y-8 py-12 animate-scale-up">
                                    <div className="w-24 h-24 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-4xl">✓</div>
                                    <div>
                                        <h3 className="text-2xl font-black text-emerald-400 mb-2">PAYMENT SUCCESSFUL</h3>
                                        <p className="text-slate-400 font-medium">₹{selectedDoc?.fee} charged successfully</p>
                                    </div>
                                    {/* Progress Bar Complete */}
                                    <div className="max-w-xs mx-auto">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                            <span>Step 3 of 3</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-600 w-[100%] transition-all duration-500" />
                                        </div>
                                    </div>
                                    <button onClick={handleStartCall} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                                        START VIDEO CALL NOW
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {selectedDoc && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl animate-fade-in" />

                    <div className="relative z-10 w-full max-w-6xl aspect-video bg-[#0f172a] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(244,63,94,0.1)] flex animate-scale-up">
                        {/* Video Area (Mock) */}
                        <div className="flex-1 relative bg-slate-900 overflow-hidden">
                            {!callActive ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <img src={selectedDoc.image} className="w-48 h-48 rounded-full border-4 border-rose-500 animate-pulse mb-8" />
                                    <h2 className="text-3xl font-black mb-2">Connecting with {selectedDoc.name}...</h2>
                                    <p className="text-rose-400 font-bold animate-bounce mt-4 tracking-widest text-sm uppercase">Neural Link Syncing</p>
                                    <div className="mt-12 flex gap-8">
                                        <button
                                            onClick={() => setCallActive(true)}
                                            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-90 transition-all"
                                        >
                                            <BsTelephoneFill />
                                        </button>
                                        <button
                                            onClick={() => setSelectedDoc(null)}
                                            className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20 hover:scale-110 active:scale-90 transition-all"
                                        >
                                            <BsXCircle />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute inset-0">
                                    {/* Main Doc Feed (Mock) */}
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <img src={selectedDoc.image} className="w-full h-full object-cover blur-sm opacity-30" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
                                                <img src={selectedDoc.image} className="w-80 h-96 object-cover rounded-3xl border-2 border-white/20 shadow-2xl relative z-10" />
                                                <div className="absolute -bottom-4 -left-4 z-30 bg-rose-600 px-6 py-2 rounded-xl font-black text-sm shadow-xl">
                                                    {selectedDoc.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Feed (Picture in Picture) */}
                                    <div className="absolute top-8 right-8 w-48 h-64 bg-slate-800 rounded-2xl border-2 border-white/10 z-40 overflow-hidden shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-tight opacity-70">YOU (NeuralCam)</div>
                                        <div className="w-full h-full flex items-center justify-center bg-slate-700/50">
                                            <BsPersonFill className="text-4xl opacity-20" />
                                        </div>
                                    </div>

                                    {/* Call Controls */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                                        <button
                                            onClick={() => setMicOn(!micOn)}
                                            className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-rose-500 shadow-lg shadow-rose-500/20'}`}
                                        >
                                            {micOn ? <BsMicFill /> : <BsMicMuteFill />}
                                        </button>
                                        <button
                                            onClick={() => setVideoOn(!videoOn)}
                                            className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${videoOn ? 'bg-white/10 hover:bg-white/20' : 'bg-rose-500 shadow-lg shadow-rose-500/20'}`}
                                        >
                                            {videoOn ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
                                        </button>
                                        <button
                                            onClick={handleEndCall}
                                            className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-2xl hover:bg-rose-500 transition-all shadow-xl shadow-rose-600/30 active:scale-95"
                                        >
                                            <BsTelephoneFill className="rotate-[135deg]" />
                                        </button>
                                    </div>

                                    {/* Timer */}
                                    <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-lg font-black tracking-widest flex items-center gap-3 z-40 border border-white/5">
                                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                        {formatTime(callDuration)}
                                    </div>

                                    {/* Neural Voice Translation Subtitles HUD */}
                                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-[70] pointer-events-none">
                                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl animate-fade-in relative overflow-hidden">
                                            {/* Audio Waveform HUD */}
                                            <div className="absolute top-0 left-0 w-full h-1 flex items-end gap-[1px] opacity-30">
                                                {waveform.map((h, i) => (
                                                    <div key={i} className="flex-1 bg-rose-500 transition-all duration-100" style={{ height: h + '%' }} />
                                                ))}
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-rose-500/30">
                                                    <BsTranslate className="text-xl text-rose-500 animate-pulse" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Neural Live Translation ({language})</p>
                                                    {transcriptions.length > 0 ? (
                                                        <div>
                                                            <p className="text-sm font-bold text-white leading-tight">
                                                                {transcriptions[transcriptions.length - 1]}
                                                            </p>
                                                            {language !== 'English' && (
                                                                <p className="text-xs font-medium text-emerald-400 italic">
                                                                    {language === 'Hindi' && "नमस्ते! मैं आपको स्पष्ट रूप से देख सकता हूँ। आज आप कैसा महसूस कर रहे हैं?"}
                                                                    {language === 'Urdu' && "ہیلو! میں آپ کو صاف دیکھ سکتا ہوں۔ آج آپ کیسی محسوس کر رہے ہیں؟"}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs font-bold text-slate-500 animate-pulse">Waiting for audio signal...</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Transcription HUD */}
                                    <div className="absolute bottom-32 left-8 right-8 z-40">
                                        <div className="max-w-xl bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/5 border-l-4 border-l-rose-500">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <BsChatQuoteFill className="text-rose-500 text-xs" />
                                                    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">AI Neural Transcription</span>
                                                </div>
                                                <button
                                                    onClick={toggleLanguage}
                                                    className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black text-rose-400 border border-white/10 transition-all"
                                                >
                                                    <BsTranslate /> {language.toUpperCase()}
                                                </button>
                                            </div>
                                            <div className="space-y-1">
                                                {transcriptions.length === 0 && <p className="text-sm text-slate-500 italic">Listening to conversation...</p>}
                                                {transcriptions.map((t, idx) => (
                                                    <p key={idx} className={`text-sm ${idx === transcriptions.length - 1 ? 'text-white' : 'text-slate-400'}`}>
                                                        {language === 'Hindi' ? `${t} (Hindi Trans)` : language === 'Urdu' ? `${t} (Urdu Trans)` : t}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Face Scanning Grid Overlay */}
                                    <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
                                        <div className="absolute inset-0 border-[2px] border-rose-500/20 rounded-[3rem] animate-pulse"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-emerald-500/30 rounded-full animate-ping"></div>
                                        <svg className="w-full h-full">
                                            <defs>
                                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244, 63, 94, 0.05)" strokeWidth="1" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#grid)" />
                                        </svg>
                                        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-l-2 border-t-2 border-rose-500/50 rounded-tl-3xl"></div>
                                        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-r-2 border-t-2 border-rose-500/50 rounded-tr-3xl"></div>
                                        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border-l-2 border-b-2 border-rose-500/50 rounded-bl-3xl"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-r-2 border-b-2 border-rose-500/50 rounded-br-3xl"></div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent h-1 w-full animate-scan"></div>
                                    </div>

                                    {/* AI Bio-Sensing HUD Overlay */}
                                    {isBioScanning && (
                                        <div className="absolute inset-0 z-[60] flex items-center justify-center p-12 bg-black/20 backdrop-blur-[2px] animate-fade-in">
                                            <div className="w-full h-full relative border-2 border-rose-500/30 rounded-[3rem] overflow-hidden">
                                                {/* Scanning Lines */}
                                                <div className="absolute inset-0">
                                                    <div className="w-full h-[2px] bg-rose-500/40 absolute animate-[scan_4s_linear_infinite]" />
                                                    <div className="w-[2px] h-full bg-rose-500/40 absolute left-1/2 -translate-x-1/2" />
                                                    <div className="w-full h-[2px] bg-rose-500/40 absolute top-1/2 -translate-y-1/2" />

                                                    {/* Neural Face Map Dots */}
                                                    {facePoints.map((pt, i) => (
                                                        <div
                                                            key={i}
                                                            className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full blur-[1px] transition-opacity duration-300"
                                                            style={{ top: pt.top, left: pt.left, opacity: pt.opacity }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Bio Markers */}
                                                <div className="absolute top-10 left-10 space-y-4">
                                                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30">
                                                        <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Face Points</div>
                                                        <div className="flex gap-1">
                                                            {[...Array(6)].map((_, i) => (
                                                                <div key={i} className={`w-2 h-2 rounded-full ${bioScanProgress > i * 15 ? 'bg-emerald-500' : 'bg-slate-700 animate-pulse'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30">
                                                        <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Dermal Scan</div>
                                                        <div className="text-xl font-black text-white">{Math.round(bioScanProgress)}%</div>
                                                    </div>
                                                </div>

                                                <div className="absolute top-10 right-10 text-right">
                                                    <div className="bg-rose-600/20 backdrop-blur-md px-6 py-3 rounded-full border border-rose-500/40 inline-flex items-center gap-3">
                                                        <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                                                        <span className="text-xs font-black text-white uppercase tracking-widest">Neural Bio-Sensing Active</span>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md">
                                                    <div className="bg-black/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 text-center space-y-4">
                                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Analyzing HRV & Respiratory Micro-fluctuations</div>
                                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-gradient-to-r from-rose-600 to-emerald-600 transition-all duration-300" style={{ width: `${bioScanProgress}%` }} />
                                                        </div>
                                                        <p className="text-[10px] text-rose-400 font-bold animate-pulse">DO NOT MOVE • KEEP FACE IN FOCUS</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar (Heads-up Display) */}
                        <div className="w-96 bg-[#0f172a] border-l border-white/10 flex flex-col overflow-hidden">
                            {/* Tabs Switch */}
                            <div className="flex border-b border-white/10">
                                <button
                                    onClick={() => setActiveSidebarTab('vitals')}
                                    className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'vitals' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                >
                                    Vitals HUD
                                </button>
                                <button
                                    onClick={() => setActiveSidebarTab('anatomy')}
                                    className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'anatomy' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                >
                                    3D Anatomy
                                </button>
                                <button
                                    onClick={() => setActiveSidebarTab('records')}
                                    className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'records' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                >
                                    Neural records
                                </button>
                                <button
                                    onClick={() => setActiveSidebarTab('chat')}
                                    className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'chat' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                >
                                    Neural Chat
                                </button>
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                                {activeSidebarTab === 'vitals' && (
                                    <div className="space-y-10 animate-fade-in">
                                        <h3 className="text-lg font-black flex items-center gap-3">
                                            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                                                <BsActivity className="text-rose-500" />
                                            </div>
                                            Patient Vitals
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                                                <BsHeartPulseFill className="text-rose-500 mb-3 text-xl" />
                                                <div className="text-[10px] font-black text-slate-500 uppercase">Heart Rate</div>
                                                <div className="text-2xl font-black text-white">72 <span className="text-[10px] text-slate-400">BPM</span></div>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
                                                <BsLightningChargeFill className="text-emerald-500 mb-3 text-xl" />
                                                <div className="text-[10px] font-black text-slate-500 uppercase">Oxygen Sat</div>
                                                <div className="text-2xl font-black text-white">98 <span className="text-[10px] text-slate-400">%</span></div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <VitalProgress label="Respiratory Rate" value="16 m/m" progress={65} color="blue" />
                                            <VitalProgress label="Stress Index" value="Low Risk" progress={20} color="emerald" />
                                            <VitalProgress label="Neural Clarity" value="Optimal" progress={92} color="rose" />
                                        </div>
                                    </div>
                                )}

                                {activeSidebarTab === 'anatomy' && (
                                    <div className="space-y-8 animate-fade-in">
                                        <h3 className="text-lg font-black flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                                <BsBodyText className="text-blue-500" />
                                            </div>
                                            3D Anatomy Map
                                        </h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Click on the area where you feel pain:</p>

                                        <div className="relative aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-4">
                                            {/* Simulated 3D Body Outline */}
                                            <svg viewBox="0 0 100 200" className="w-full h-full opacity-40 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                                <path
                                                    onClick={() => handleBodyPartClick('Cerebral Region')}
                                                    d="M50,10 Q40,10 40,20 Q40,30 50,30 Q60,30 60,20 Q60,10 50,10"
                                                    fill={bodyPartSelected === 'Cerebral Region' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                    className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                />
                                                <path
                                                    onClick={() => handleBodyPartClick('Chest/Thoracic')}
                                                    d="M40,35 L60,35 L65,70 L35,70 Z"
                                                    fill={bodyPartSelected === 'Chest/Thoracic' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                    className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                />
                                                <path
                                                    onClick={() => handleBodyPartClick('Left Arm')}
                                                    d="M30,40 L15,80 L20,85 L35,45 Z"
                                                    fill={bodyPartSelected === 'Left Arm' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                    className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                />
                                                <path
                                                    onClick={() => handleBodyPartClick('Right Arm')}
                                                    d="M70,40 L85,80 L80,85 L65,45 Z"
                                                    fill={bodyPartSelected === 'Right Arm' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                    className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                />
                                                <path
                                                    onClick={() => handleBodyPartClick('Lower Abdomen')}
                                                    d="M35,75 L65,75 L60,110 L40,110 Z"
                                                    fill={bodyPartSelected === 'Lower Abdomen' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                    className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                />
                                            </svg>

                                            {bodyPartSelected && (
                                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-rose-600 rounded-2xl flex items-center justify-between shadow-xl animate-scale-up">
                                                    <div>
                                                        <div className="text-[8px] font-black uppercase text-rose-200">Selected Hotspot</div>
                                                        <div className="text-xs font-black">{bodyPartSelected}</div>
                                                    </div>
                                                    <BsLightningChargeFill className="text-orange-300 animate-pulse" />
                                                </div>
                                            )}
                                        </div>

                                        {symptoms.length > 0 && (
                                            <div className="space-y-3">
                                                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Symptom Log</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {symptoms.map(s => (
                                                        <span key={s} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black rounded-lg uppercase">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeSidebarTab === 'records' && (
                                    <div className="space-y-8 animate-fade-in relative min-h-[500px]">
                                        <h3 className="text-lg font-black flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                                <BsFileEarmarkMedicalFill className="text-emerald-500" />
                                            </div>
                                            Collaborative Record HUD
                                        </h3>

                                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
                                            {/* Simulated Laser Pointer */}
                                            <div
                                                className="absolute w-4 h-4 bg-rose-500 rounded-full blur-sm opacity-60 z-30 transition-all duration-1000 ease-in-out pointer-events-none"
                                                style={{ left: `${laserPosition.x}%`, top: `${laserPosition.y}%` }}
                                            />
                                            <div
                                                className="absolute w-2 h-2 bg-white rounded-full z-40 transition-all duration-1000 ease-in-out pointer-events-none shadow-[0_0_10px_#f43f5e]"
                                                style={{ left: `${laserPosition.x + 0.5}%`, top: `${laserPosition.y + 0.5}%` }}
                                            />

                                            <div className="space-y-6 relative z-10">
                                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lab Report: #SAATHI-9921</span>
                                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full border border-emerald-500/30 uppercase">Neural Verified</span>
                                                </div>

                                                <div className="space-y-4">
                                                    <ReportItem
                                                        label="Hemoglobin (Hb)"
                                                        value="14.2"
                                                        unit="g/dL"
                                                        status="Normal"
                                                        onExplainer={() => setShowAIExplainer({
                                                            title: "Hemoglobin (Hb)",
                                                            meaning: "This is the protein in your red blood cells that carries oxygen. Your level is perfect!",
                                                            impact: "Good energy levels and proper oxygen flow."
                                                        })}
                                                    />
                                                    <ReportItem
                                                        label="Serum Glucose"
                                                        value="105"
                                                        unit="mg/dL"
                                                        status="Borderline"
                                                        color="orange"
                                                        onExplainer={() => setShowAIExplainer({
                                                            title: "Serum Glucose",
                                                            meaning: "This measures the sugar levels in your blood. You are slightly on the higher side.",
                                                            impact: "Need to cut down on sweets for a few days."
                                                        })}
                                                    />
                                                    <ReportItem
                                                        label="T3, T4, TSH (Thyroid)"
                                                        value="Stable"
                                                        unit="Neural Map"
                                                        status="Normal"
                                                        onExplainer={() => setShowAIExplainer({
                                                            title: "TSH (Thyroid)",
                                                            meaning: "This controls your body's metabolism. Everything looks balanced here.",
                                                            impact: "Healthy weight management and energy."
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            {/* AI Explainer Popup */}
                                            {showAIExplainer && (
                                                <div className="absolute inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl p-8 flex flex-col justify-center animate-scale-up">
                                                    <button
                                                        onClick={() => setShowAIExplainer(null)}
                                                        className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                                                    >
                                                        <BsXCircle size={20} />
                                                    </button>
                                                    <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/30">
                                                        <BsActivity className="text-rose-500 text-xl" />
                                                    </div>
                                                    <h4 className="text-xl font-black text-rose-500 mb-2">{showAIExplainer.title}</h4>
                                                    <p className="text-sm font-bold text-white leading-relaxed mb-6">{showAIExplainer.meaning}</p>
                                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Clinical Impact</div>
                                                        <p className="text-xs font-medium text-slate-300">{showAIExplainer.impact}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowAIExplainer(null)}
                                                        className="mt-8 w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 uppercase tracking-widest text-[10px]"
                                                    >
                                                        Got it!
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 bg-rose-600/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4">
                                            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0 animate-pulse">
                                                <BsActivity />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-rose-500 uppercase">AI Clinical Insight</p>
                                                <p className="text-[10px] font-medium text-slate-400">Collaborative mode is active. The doctor can see your interaction in real-time.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSidebarTab === 'chat' && (
                                    <div className="space-y-6 animate-fade-in flex flex-col h-full">
                                        <h3 className="text-lg font-black flex items-center gap-3">
                                            <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                                                <BsFillChatDotsFill className="text-rose-500" />
                                            </div>
                                            Neural Chat
                                        </h3>
                                        <div className="flex-1 space-y-4 min-h-[300px]">
                                            {messages.map((m, i) => (
                                                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-xs font-medium leading-relaxed ${m.sender === 'user' ? 'bg-rose-600 text-white rounded-tr-none shadow-lg shadow-rose-600/10' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                                                        {m.text}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* File Upload Simulation */}
                                        <div className="px-2 pb-2">
                                            <button
                                                onClick={() => {
                                                    setMessages(prev => [...prev, { sender: 'user', text: "📎 Analyzing Medical_Report_2024.pdf..." }]);
                                                    setTimeout(() => {
                                                        setMessages(prev => [...prev, { sender: 'doc', text: "Got it. I see the lipid profile is normal." }]);
                                                    }, 2000);
                                                }}
                                                className="w-full py-3 bg-white/5 border border-dashed border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 mb-2"
                                            >
                                                <BsFileEarmarkArrowUpFill /> UPLOAD MEDICAL HISTORY
                                            </button>
                                        </div>
                                        <form onSubmit={handleSendMessage} className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10 sticky bottom-0">
                                            <input
                                                type="text"
                                                placeholder="Type here..."
                                                className="flex-1 bg-transparent px-4 py-2 text-xs outline-none focus:text-white"
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                            />
                                            <button className="bg-rose-600 p-3 rounded-xl hover:bg-rose-500 transition-all active:scale-95 shadow-lg shadow-rose-600/10">
                                                <BsArrowRight className="text-white" />
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 border-t border-white/10 bg-black/20">
                                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4">
                                    <p className="text-[10px] font-bold text-rose-300 leading-relaxed uppercase tracking-widest mb-1">Privacy Guard</p>
                                    <p className="text-[10px] text-slate-500">
                                        This session is end-to-end encrypted. No medical data is stored without your consent.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Regular Consultation Triage & Neural Sync Overlay */}
            {consultStage !== 'idle' && (
                <div className="fixed inset-0 z-[250] bg-[#020617]/95 backdrop-blur-3xl text-white flex flex-col items-center justify-center p-6 animate-fade-in">
                    {consultStage === 'triage' && (
                        <div className="max-w-xl w-full text-center space-y-8 animate-scale-up">
                            <div className="w-24 h-24 mx-auto bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/20 ">
                                <BsActivity className="text-5xl text-rose-500 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Clinical Triage</h2>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pre-Consultation Assessment</p>
                            </div>

                            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                <p className="text-xl font-bold mb-8 uppercase tracking-tight">
                                    {consultTriageStep === 0 && "Primary reason for today's consultation?"}
                                    {consultTriageStep === 1 && "Duration of your current symptoms?"}
                                    {consultTriageStep === 2 && "Are you currently on any medication?"}
                                </p>

                                <div className="mb-8">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                        <span>Assessment Progress</span>
                                        <span>{Math.round(((consultTriageStep + 1) / 3) * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-rose-600 transition-all duration-500"
                                            style={{ width: `${((consultTriageStep + 1) / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {consultTriageStep === 0 && (
                                        <>
                                            <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">General Wellness Check</button>
                                            <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Acute Pain or Discomfort</button>
                                            <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Follow-up Session</button>
                                        </>
                                    )}
                                    {consultTriageStep === 1 && (
                                        <>
                                            <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Less than 24 Hours</button>
                                            <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">2-5 Days</button>
                                            <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Chronic (1 Week+)</button>
                                        </>
                                    )}
                                    {consultTriageStep === 2 && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => setConsultStage('syncing')} className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-600/20 uppercase tracking-widest text-xs">YES, NOTED</button>
                                            <button onClick={() => setConsultStage('syncing')} className="py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all shadow-lg shadow-rose-600/20 uppercase tracking-widest text-xs">NO MEDICATIONS</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {consultStage === 'syncing' && (
                        <div className="max-w-xl w-full text-center space-y-12 animate-scale-up">
                            <div className="relative">
                                <div className="w-32 h-32 mx-auto bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/20 relative z-10">
                                    <BsLightningChargeFill className="text-6xl text-rose-500 animate-pulse" />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-rose-500/20 rounded-full animate-ping" />
                            </div>

                            <div className="space-y-4">
                                <div className="text-xs font-black text-rose-500 uppercase tracking-[0.4em] animate-pulse">ESTABLISHING NEURAL LINK</div>
                                <h2 className="text-4xl font-black text-white">SYNCING WITH {selectedDoc.name.toUpperCase()}</h2>
                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Optimizing Video Feed • Real-time Encryption Active • Neural HUD Sync</p>
                            </div>

                            <div className="max-w-md mx-auto w-full">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-3">
                                    <span>Signal Strength: Excellent</span>
                                    <span>{Math.round(syncProgress)}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-600 to-emerald-600 rounded-full transition-all duration-100"
                                        style={{ width: `${syncProgress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center gap-8">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-rose-400 border border-white/10">
                                        <BsShieldCheck />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase">Secure</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                                        <BsCameraVideoFill />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase">HD Live</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                                        <BsAwardFill />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-500 uppercase">Verified</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Post-Call Report Modal */}
            {
                showReport && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-2xl animate-fade-in" />
                        <div className="relative z-10 w-full max-w-2xl bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                            <div className="p-10 text-center">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                    <BsFileEarmarkMedicalFill className="text-4xl text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-black mb-2">Consultation Complete</h2>
                                <p className="text-slate-400 font-medium mb-10">Your neural clinical summary is ready.</p>

                                <div className="space-y-4 text-left mb-10">
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Provisional Diagnosis</span>
                                            <span className="text-xs font-black text-rose-400">Stable Condition</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-200">Slight fatigue detected. High probability of rest-deprivation. Recommended 8 hours sleep and increased hydration.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <BsLightningChargeFill className="text-orange-400 animate-pulse" />
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Advised Medications</span>
                                            <span className="text-xs font-black text-emerald-400">OTC Safe</span>
                                        </div>
                                        <ul className="text-sm font-medium text-slate-200 space-y-1 mb-6">
                                            <li>• Paracetamol 500mg (If fever persists)</li>
                                            <li>• Vitamin C Effervescent (Daily)</li>
                                        </ul>
                                        <button className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all group/btn active:scale-95">
                                            <BsCartCheckFill className="text-lg group-hover/btn:animate-bounce" />
                                            ORDER VIA SAATHI PHARMACY
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setShowReport(false)}
                                        className="bg-white text-[#0f172a] font-black py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95 text-sm"
                                    >
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => { setShowReport(false); setSelectedDoc(null); }}
                                        className="bg-rose-600 text-white font-black py-4 rounded-2xl hover:bg-rose-500 transition-all active:scale-95 text-sm"
                                    >
                                        Back to Hub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Virtual Neural Health Pod Waiting Room */}
            {showHealthPod && (
                <div className="fixed inset-0 z-[260] bg-[#020617] text-white overflow-hidden flex flex-col items-center justify-center p-6 animate-fade-in">
                    {/* Background Tech Gradients */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.1),transparent_70%)]" />
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
                    </div>

                    <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-scale-up">
                            <div>
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                                    NEURAL HEALTH POD ACTIVE
                                </div>
                                <h2 className="text-5xl font-black text-white leading-tight">WAITING FOR <br /> <span className="text-rose-500">{selectedDoc?.name.toUpperCase()}</span></h2>
                                <p className="text-slate-400 text-lg font-medium">Don't just wait. Let's sync your neural profile.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 backdrop-blur-3xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                                        <BsActivity className="text-3xl text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Neural Vital Scan</p>
                                        <p className="text-xl font-black text-white">HEALTH SCORE: {healthScore}%</p>
                                    </div>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-emerald-500 rounded-full transition-all duration-300"
                                        style={{ width: `${healthScore}%` }}
                                    />
                                </div>
                                <p className="text-xs font-medium text-slate-400 italic">"Your heart rate is steady. Perfect for the consultation!"</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-rose-500 mb-2"><BsLightningChargeFill /></div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">AI Daily Tip</p>
                                    <p className="text-xs font-bold text-white">Rest 8 hours for better neural sync.</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                    <div className="text-blue-500 mb-2"><BsShieldCheck /></div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Privacy Status</p>
                                    <p className="text-xs font-bold text-white">Quantum Encrypted Link</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-scale-up" style={{ animationDelay: '0.2s' }}>
                            <div className="aspect-square bg-gradient-to-br from-white/5 to-white/[0.02] rounded-[3rem] border border-white/10 backdrop-blur-3xl p-12 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* DNA Spiral Animation (Simulated) */}
                                <div className="w-48 h-48 relative mb-8">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute inset-0 border-2 border-rose-500/30 rounded-full animate-ping"
                                            style={{ animationDelay: `${i * 0.5}s`, opacity: 1 - (i * 0.1) }}
                                        />
                                    ))}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl font-black text-white">{healthPodTimer}<span className="text-2xl text-rose-500">s</span></div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-2">Neural Connection EST...</h3>
                                <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">Optimizing Stream Packets</p>

                                {/* Terminal Insight Stream HUD */}
                                <div className="w-full bg-black/40 rounded-xl p-4 font-mono text-[9px] text-emerald-500/80 space-y-1 border border-white/5">
                                    {insightStream.map((line, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                                            <span className="animate-pulse">{line}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 w-full space-y-3">
                                    <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase">
                                        <span>Connection Stability</span>
                                        <span>Ultra High</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[95%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="absolute bottom-10 left-10 flex gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="text-rose-500">SEHAAT SAATHI PLATFORM v2.5</span>
                        <span>•</span>
                        <span>NEURAL HUB READY</span>
                        <span>•</span>
                        <span>SECURE LAYER ACTIVE</span>
                    </div>
                </div>
            )
            }

            {/* Doctor Profile Modal */}
            {
                viewingDocProfile && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md animate-fade-in" onClick={() => setViewingDocProfile(null)} />
                        <div className="relative z-10 w-full max-w-lg bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                            <div className="h-32 bg-gradient-to-r from-rose-500/20 to-orange-500/20 relative">
                                <button
                                    onClick={() => setViewingDocProfile(null)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                                >
                                    <BsXCircle />
                                </button>
                            </div>
                            <div className="px-8 pb-8 -mt-16 text-center">
                                <div className="relative inline-block mb-4">
                                    <div className={`absolute inset-0 bg-${viewingDocProfile.color}-500 blur-2xl opacity-40`} />
                                    <img src={viewingDocProfile.image} alt={viewingDocProfile.name} className="w-32 h-32 rounded-[2rem] object-cover border-4 border-[#0f172a] relative z-10" />
                                </div>
                                <h2 className="text-2xl font-black mb-1">{viewingDocProfile.name}</h2>
                                <p className="text-rose-400 font-bold text-sm uppercase tracking-widest mb-6">{viewingDocProfile.specialty}</p>

                                <div className="grid grid-cols-3 gap-2 mb-8">
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.rating}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Rating</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.experience}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Exp</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.patients || "2k+"}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Patients</div>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                                    {viewingDocProfile.bio || "An experienced specialist dedicated to providing top-tier medical care via Sehaat Saathi's neural network."}
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => { setViewingDocProfile(null); handleConsultClick(viewingDocProfile); }}
                                        className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        Book Instant Consult - ₹{viewingDocProfile.fee}
                                    </button>
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 text-xs uppercase tracking-widest">
                                        View Full Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Sehaat SOS Triage & Geo-Dispatch Overlay */}
            {emergencyStage !== 'idle' && emergencyStage !== 'connected' && (
                <div className="fixed inset-0 z-[250] bg-black text-white flex flex-col items-center justify-center p-6">
                    {emergencyStage === 'triage' && (
                        <div className="max-w-xl w-full text-center space-y-8 animate-scale-up">
                            <div className="w-24 h-24 mx-auto bg-rose-600 rounded-full flex items-center justify-center animate-ping">
                                <BsExclamationTriangleFill className="text-5xl text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-rose-500 tracking-tighter uppercase">SOS TRIAGE PROTCOL</h2>

                            <div className="bg-[#0f172a] p-8 rounded-[2rem] border-2 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                                <p className="text-xl font-bold mb-8 uppercase tracking-widest">
                                    {triageStep === 0 && "Is the patient conscious?"}
                                    {triageStep === 1 && "Is there severe bleeding?"}
                                    {triageStep === 2 && "Are they experiencing chest pain?"}
                                </p>
                                {/* Triage Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                                        <span>Question {triageStep + 1} of 3</span>
                                        <span>{Math.round(triageProgress)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-rose-600 to-orange-600 transition-all duration-500 ease-out"
                                            style={{ width: `${triageProgress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => {
                                            if (triageStep < 2) setTriageStep(prev => prev + 1);
                                            else setEmergencyStage('locating');
                                        }}
                                        className="py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl transition-all"
                                    >
                                        YES
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (triageStep < 2) setTriageStep(prev => prev + 1);
                                            else setEmergencyStage('locating');
                                        }}
                                        className="py-6 bg-slate-700 hover:bg-slate-600 text-white font-black text-xl rounded-2xl transition-all"
                                    >
                                        NO
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {emergencyStage === 'locating' && (
                        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Radar Map Animation */}
                            <div className="absolute inset-0 z-0 opacity-30">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-rose-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-rose-500/40 rounded-full animate-[ping_3s_linear_infinite_0.5s]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-rose-500/50 rounded-full animate-[ping_3s_linear_infinite_1s]" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_100%)]" />
                            </div>

                            <div className="relative z-10 text-center space-y-6">
                                <div className="text-sm font-black text-rose-500 uppercase tracking-[0.5em] animate-pulse">Neural Satellite Link Active</div>
                                <h2 className="text-5xl font-black text-white">DISPATCHING AMBULANCE</h2>
                                <div className="flex items-center justify-center gap-4 text-emerald-400 font-bold bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/30 mx-auto w-fit">
                                    <BsGeoAltFill /> GPS LOCKED: SECTOR 62, NOIDA
                                </div>
                                {/* Geo-Dispatch Progress Bar */}
                                <div className="max-w-md mx-auto mt-8">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                                        <span>Locating Nearest Partner</span>
                                        <span>{Math.round(geoProgress)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-emerald-600 to-rose-600 transition-all duration-100"
                                            style={{ width: `${geoProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Simulated Progress */}
                            <button
                                onClick={() => {
                                    setEmergencyStage('connected');
                                    handleConsultClick(TELE_DOCTORS[0]); // Auto-connect to Emergency Doc
                                }}
                                className="mt-12 opacity-0 animate-[fade-in_1s_ease-out_3s_forwards] px-8 py-3 bg-rose-600 font-black rounded-xl"
                            >
                                CONNECTION ESTABLISHED (CLICK TO START)
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Success Celebration Overlay */}
            {showCelebration && (
                <div className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center">
                    <div className="animate-scale-up">
                        <div className="text-9xl animate-bounce">🎉</div>
                    </div>
                    {/* Confetti Effect */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-[confetti_3s_ease-out_forwards]"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-20px',
                                    animationDelay: `${Math.random() * 0.5}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-up {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scan { animation: scan 3s linear infinite; }
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244, 63, 94, 0.2); border-radius: 10px; }
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
        </div >
    );
};

const VitalProgress = ({ label, value, progress, color }) => {
    const colors = {
        emerald: 'bg-emerald-500 text-emerald-400',
        rose: 'bg-rose-500 text-rose-400',
        blue: 'bg-blue-500 text-blue-400',
        orange: 'bg-orange-500 text-orange-400'
    };
    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                <span className={`text-sm font-black ${colors[color].split(' ')[1]}`}>{value}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${colors[color].split(' ')[0]} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

const ReportItem = ({ label, value, unit, status, color = 'emerald', onExplainer }) => {
    const statusColors = {
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };

    return (
        <div className="flex items-center justify-between group/item border-b border-white/5 pb-4 last:border-0 last:pb-0">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{label}</span>
                    <button
                        onClick={onExplainer}
                        className="text-[8px] font-black text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover/item:opacity-100"
                    >
                        AI EXPLAIN
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white">{value}</span>
                    <span className="text-[10px] font-bold text-slate-500">{unit}</span>
                </div>
            </div>
            <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusColors[color]}`}>
                {status}
            </div>
        </div>
    );
};

export default TeleConsultAI;
