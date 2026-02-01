import { useState, useRef, useEffect } from 'react';
import {
    BsGenderFemale, BsShieldLock, BsHeartPulse, BsExclamationTriangle,
    BsChatDots, BsEyeSlash, BsEye, BsCalendarDate, BsArrowRightCircleFill,
    BsTelephoneFill, BsXCircleFill, BsSoundwave, BsWhatsapp, BsCalendarHeart,
    BsEggFill, BsCalculator, BsCashCoin, BsBasket, BsStopwatch, BsPhoneVibrate,
    BsWind, BsShieldCheck, BsMusicNoteBeamed, BsDropletFill, BsJournalText, BsCapsule
} from "react-icons/bs";

const WomenCare = () => {
    // --- MODE STATES ---
    const [viewMode, setViewMode] = useState('normal');

    // --- TABS ---
    const [activeTab, setActiveTab] = useState('pregnancy');

    // --- Calculator State ---
    const [calcDisplay, setCalcDisplay] = useState("");

    // --- Pregnancy State ---
    const [dueDate, setDueDate] = useState('');
    const [pregnancyWeek, setPregnancyWeek] = useState(null);
    const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState(false);

    // --- Rhythm AI State ---
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState(28);
    const [cycleData, setCycleData] = useState(null);

    // --- Danger Signs State ---
    const [alertLevel, setAlertLevel] = useState(null);

    // --- Poshan AI State ---
    const [dietScore, setDietScore] = useState({ iron: 30, calcium: 40 });
    const [dietItems, setDietItems] = useState([]);

    // --- Janani Support State ---
    const [schemeEligible, setSchemeEligible] = useState(null);

    // --- Labor Guard State ---
    const [contractions, setContractions] = useState([]);
    const [isTiming, setIsTiming] = useState(false);
    const [timerStart, setTimerStart] = useState(null);
    const [laborStatus, setLaborStatus] = useState("Ready to monitor");

    // --- ANGEL CALL STATE ---
    const [angelCallActive, setAngelCallActive] = useState(false);
    const [angelTimer, setAngelTimer] = useState(5);
    const [isRinging, setIsRinging] = useState(false);

    // --- ZEN MODE STATE ---
    const [zenActive, setZenActive] = useState(false);
    const [breathText, setBreathText] = useState("Inhale");

    // --- HYDRATION STATE (Aqua Baby) ---
    const [waterGlasses, setWaterGlasses] = useState(0);

    // --- WELLNESS STATE (Garbh Sanskar) ---
    const [playingMusic, setPlayingMusic] = useState(null);
    const [yogaStep, setYogaStep] = useState(0);

    // --- REPORT DECODER STATE ---
    const [selectedReportTerm, setSelectedReportTerm] = useState(null);

    // --- MEDICATION STATE (Iron Lady) ---
    const [pillStreak, setPillStreak] = useState(3);
    const [pillTakenToday, setPillTakenToday] = useState(false);

    // --- Chat State (Dr. Didi) ---
    const [chatMessages, setChatMessages] = useState([
        { type: 'ai', text: "Namaste. I am Dr. Didi, your safe sister. You are in the Vault. No one can see this. How can I help? (Periods, Unwanted Pregnancy, or just Fear?)" }
    ]);
    const [userInput, setUserInput] = useState('');

    // --- CALCULATOR LOGIC ---
    const handleCalcInput = (val) => {
        if (val === 'C') {
            setCalcDisplay("");
        } else if (val === '=') {
            if (calcDisplay === "2024") {
                setViewMode('safehaven');
                setCalcDisplay("");
            } else {
                try { setCalcDisplay(eval(calcDisplay).toString()); } catch { setCalcDisplay("Error"); }
            }
        } else {
            setCalcDisplay(prev => prev + val);
        }
    };

    // --- ANGEL CALL LOGIC ---
    const triggerAngelCall = () => {
        setAngelCallActive(true);
        setAngelTimer(5);
        const timer = setInterval(() => {
            setAngelTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsRinging(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const answerAngelCall = () => {
        setIsRinging(false);
        setAngelCallActive(false);
        playEmergencyVoice("Hello Beta? Where are you? I am coming to pick you up. Send me your location now.");
    };

    // --- ZEN MODE LOGIC ---
    useEffect(() => {
        let interval;
        if (zenActive) {
            let step = 0;
            interval = setInterval(() => {
                step = (step + 1) % 3;
                if (step === 0) setBreathText("Inhale");
                else if (step === 1) setBreathText("Hold");
                else setBreathText("Exhale");
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [zenActive]);

    const calculatePregnancy = () => {
        if (dueDate) setPregnancyWeek(Math.max(1, Math.floor((280 - Math.ceil((new Date(dueDate) - new Date()) / (86400000))) / 7)));
    };
    const calculateCycle = () => { if (lastPeriod) setCycleData({ ovulation: new Date(new Date(lastPeriod).setDate(new Date(lastPeriod).getDate() + parseInt(cycleLength) - 14)).toDateString() }); };
    const toggleDietItem = (item) => {
        if (dietItems.includes(item.name)) { setDietItems(dietItems.filter(i => i !== item.name)); setDietScore(p => ({ iron: p.iron - item.iron, calcium: p.calcium - item.calcium })); }
        else { setDietItems([...dietItems, item.name]); setDietScore(p => ({ iron: p.iron + item.iron, calcium: p.calcium + item.calcium })); }
    };
    const handleContractionBtn = () => {
        if (isTiming) { setIsLoading(false); setContractions([...contractions, { duration: Math.round((Date.now() - timerStart) / 1000) }]); setLaborStatus(contractions.length > 2 ? "Active Labor Detected!" : "Monitoring..."); }
        else { setTimerStart(Date.now()); setIsLoading(true); }
    };
    const setIsLoading = (val) => setIsTiming(val);

    const playEmergencyVoice = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.lang = 'en-IN';
            window.speechSynthesis.speak(utterance);
        }
    };

    // --- RENDER: ANGEL CALL OVERLAY ---
    if (isRinging) {
        return (
            <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col items-center justify-between py-20 text-white animate-pulse">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">👨‍🦳</div>
                    <h1 className="text-4xl font-light">Papa</h1>
                    <p>Mobile +91 98XXX XXXXX</p>
                </div>
                <div className="flex w-full justify-around px-10">
                    <button onClick={() => { setIsRinging(false); setAngelCallActive(false); }} className="bg-red-500 p-6 rounded-full"><BsTelephoneFill className="rotate-[135deg] text-2xl" /></button>
                    <button onClick={answerAngelCall} className="bg-green-500 p-6 rounded-full animate-bounce"><BsTelephoneFill className="text-2xl" /></button>
                </div>
            </div>
        );
    }

    // --- RENDER: CALCULATOR ---
    if (viewMode === 'calculator') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-black w-full max-w-xs rounded-3xl p-6 shadow-2xl border border-gray-800">
                    <div className="bg-gray-800 h-24 rounded-xl mb-6 flex items-end justify-end p-4 text-4xl text-white font-mono">{calcDisplay || "0"}</div>
                    <div className="grid grid-cols-4 gap-4">
                        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map(btn => (
                            <button key={btn} onClick={() => handleCalcInput(btn)} className={`h-16 rounded-full font-bold text-2xl active:scale-95 ${btn === '=' ? 'bg-orange-500 text-white' : btn === 'C' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-200'}`}>{btn}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDER: SAFE HAVEN ---
    if (viewMode === 'safehaven') {
        const handleSendMessage = () => {
            const newMsg = { type: 'user', text: userInput }; setChatMessages([...chatMessages, newMsg]); setUserInput('');
            setTimeout(() => setChatMessages(p => [...p, { type: 'ai', text: "I am listedning..." }]), 1000);
        };
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
                <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-2"><BsShieldLock className="text-green-500" /><span className="font-bold">Vault Unlocked</span></div>
                    <button onClick={() => setViewMode('calculator')} className="bg-red-600 px-4 py-1 rounded-full text-sm font-bold">LOCK</button>
                </div>
                <div className="p-4 space-y-4 flex-1">
                    <div className="bg-gray-800 p-6 rounded-2xl border border-yellow-600/30">
                        <h2 className="text-yellow-500 font-bold mb-2">Golden Hour (72 Hrs)</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <a href="https://www.google.com/maps/search/pharmacy" target="_blank" className="bg-gray-700 p-3 rounded-xl text-center block">💊 Find i-Pill</a>
                            <div className="bg-gray-700 p-3 rounded-xl text-center">⚖️ Legal Help</div>
                        </div>
                    </div>
                    <div className="bg-indigo-900/20 p-4 rounded-2xl h-80 flex flex-col">
                        <div className="flex-1 overflow-y-auto mb-4 space-y-3">{chatMessages.map((msg, i) => <div key={i} className={`p-3 rounded-xl text-sm w-fit ${msg.type === 'user' ? 'bg-indigo-600 ml-auto' : 'bg-gray-700'}`}>{msg.text}</div>)}</div>
                        <div className="flex gap-2">
                            <input type="text" className="flex-1 bg-gray-800 rounded-full px-4 py-2 border border-gray-600" value={userInput} onChange={e => setUserInput(e.target.value)} />
                            <button onClick={handleSendMessage} className="bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center"><BsArrowRightCircleFill /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDER: NORMAL ---
    return (
        <div className="min-h-screen bg-rose-50 pb-20">
            {/* Nav */}
            <div className="bg-rose-500 text-white py-6 px-4 shadow-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <BsGenderFemale className="text-3xl" />
                    <div>
                        <h1 className="text-2xl font-black">Sehaat Women Care</h1>
                        <p className="text-[10px] opacity-90 tracking-tighter uppercase font-bold">Premium Holistic Maternal Hub</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={triggerAngelCall} className={`bg-white/20 p-2 rounded-lg flex flex-col items-center border border-white/10 ${angelCallActive ? 'animate-pulse bg-red-500' : ''}`}>
                        <BsPhoneVibrate size={20} />
                        <span className="text-[9px] font-bold">{angelCallActive ? `RING IN ${angelTimer}` : "FAKE CALL"}</span>
                    </button>
                    <button onClick={() => setZenActive(!zenActive)} className="bg-white/20 p-2 rounded-lg border border-white/10"><BsWind size={24} /></button>
                    <button onClick={() => setViewMode('calculator')} className="bg-white/20 p-2 rounded-lg border border-white/10"><BsCalculator size={24} /></button>
                </div>
            </div>

            {/* ZEN MODE OVERLAY */}
            {zenActive && (
                <div className="bg-teal-900 text-teal-100 p-8 rounded-b-3xl mb-6 animate-fade-in text-center shadow-xl border-b-4 border-teal-500/50">
                    <h3 className="text-2xl font-light mb-6">Zen Breathing</h3>
                    <div className="w-40 h-40 mx-auto rounded-full border-4 border-teal-500 flex items-center justify-center text-2xl font-bold animate-ping-slow">
                        {breathText}
                    </div>
                    <button onClick={() => setZenActive(false)} className="mt-6 text-xs text-teal-400 font-bold uppercase tracking-widest hover:text-teal-200 transition-colors">Close Zen Mode</button>
                    <style>{`@keyframes pingSlow { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(1); opacity: 0.8; } } .animate-ping-slow { animation: pingSlow 8s infinite ease-in-out; }`}</style>
                </div>
            )}

            <div className="container mx-auto px-4 mt-6 max-w-4xl">
                {/* ADVANCED TABS */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-3 hide-scrollbar snap-x">
                    {['pregnancy', 'labor', 'poshan', 'hydration', 'wellness', 'reports', 'vaccine', 'schemes', 'rhythm', 'danger'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-full font-bold capitalize whitespace-nowrap transition-all snap-start ${activeTab === tab ? 'bg-rose-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-100 hover:border-rose-200'}`}>
                            {tab === 'poshan' ? 'Poshan AI' : tab === 'schemes' ? 'Janani Sathi' : tab === 'wellness' ? 'Garbh Sanskar' : tab === 'hydration' ? 'Aqua Baby' : tab === 'reports' ? 'Scan Story' : tab}
                        </button>
                    ))}
                </div>

                <div className="animate-fade-in space-y-6">

                    {/* HYDRATION: AQUA BABY */}
                    {activeTab === 'hydration' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-blue-50 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-3xl font-black text-blue-900 mb-2 flex items-center justify-center md:justify-start gap-2"><BsDropletFill className="text-blue-500 animate-bounce" /> Aqua Baby</h3>
                                    <p className="text-gray-500 mb-6 font-medium">Keep your baby's amniotic fluid healthy. Drink 8 glasses daily.</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        {[...Array(8)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setWaterGlasses(i + 1)}
                                                className={`w-12 h-16 rounded-b-xl border-2 transition-all transform active:scale-90 ${i < waterGlasses ? 'bg-blue-400 border-blue-500 shadow-md translate-y-1' : 'bg-blue-50 border-blue-100 opacity-50'}`}
                                            >
                                                {i < waterGlasses ? '💧' : ''}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-sm font-bold text-blue-600 uppercase tracking-widest">{waterGlasses}/8 Glasses Taken</p>
                                </div>
                                <div className="w-64 h-64 bg-blue-100/50 rounded-full border-4 border-blue-200 relative flex flex-col items-center justify-end p-4 overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-blue-400/30 transition-all duration-1000 ease-in-out"
                                        style={{ height: `${(waterGlasses / 8) * 100}%` }}
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300 opacity-50 animate-wave"></div>
                                    </div>
                                    <div className="text-6xl mb-10 z-10 animate-float">{waterGlasses >= 8 ? '👶💖' : '👶'}</div>
                                    <p className="z-10 font-black text-blue-900 text-xs text-center">{waterGlasses >= 8 ? "Perfectly Hydrated!" : "Baby needs water..."}</p>
                                </div>
                            </div>
                            <style>{`
                                @keyframes wave { 0% { transform: translateX(-10%); } 100% { transform: translateX(10%); } }
                                @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
                                .animate-wave { animation: wave 2s infinite linear alternate; }
                                .animate-float { animation: float 3s infinite ease-in-out; }
                             `}</style>
                        </div>
                    )}

                    {/* WELLNESS: GARBH SANSKAR */}
                    {activeTab === 'wellness' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-orange-50">
                                <h3 className="text-2xl font-black text-orange-900 mb-6 flex items-center gap-2"><BsMusicNoteBeamed className="text-orange-500" /> Soul Music</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Raga Yaman (Calm)', desc: 'For mental peace' },
                                        { name: 'Raga Bilaval (Happy)', desc: 'For positive energy' },
                                        { name: 'Nature Sounds', desc: 'Sleep aid' }
                                    ].map(track => (
                                        <button
                                            key={track.name}
                                            onClick={() => setPlayingMusic(track.name)}
                                            className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${playingMusic === track.name ? 'border-orange-400 bg-orange-50' : 'border-gray-50 hover:bg-orange-50/50'}`}
                                        >
                                            <div>
                                                <p className="font-bold text-gray-800">{track.name}</p>
                                                <p className="text-xs text-gray-500">{track.desc}</p>
                                            </div>
                                            {playingMusic === track.name && <BsSoundwave className="text-orange-500 animate-pulse" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-indigo-50">
                                <h3 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-2"><BsJournalText className="text-indigo-500" /> Prenatal Yoga</h3>
                                <div className="bg-indigo-50/50 p-6 rounded-2xl text-center">
                                    <div className="text-5xl mb-4 animate-bounce">🧘‍♀️</div>
                                    <p className="font-bold text-indigo-900 mb-1">Pose {yogaStep + 1}: {['Butterfly Pose', 'Cat Cow', 'Child Pose'][yogaStep]}</p>
                                    <p className="text-sm text-gray-500 mb-6">Safe for all trimesters. Gentle stretching.</p>
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={() => setYogaStep(p => Math.max(0, p - 1))} className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold shadow-sm">Prev</button>
                                        <button onClick={() => setYogaStep(p => Math.min(2, p + 1))} className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-md">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SCAN STORY: REPORT DECODER */}
                    {activeTab === 'reports' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-purple-50">
                            <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-2"><BsJournalText className="text-purple-500" /> Scan Story Decoder</h3>
                            <p className="text-gray-500 mb-8 font-medium">Confused by your ultrasound report? Select a term to understand it simply.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {[
                                    { term: 'Anterior Placenta', info: 'Placenta is on the front wall. Totally normal, you just might feel kicks a bit later.' },
                                    { term: 'Breech Position', info: 'Baby is feet down. Common in mid-pregnancy. Doctors only worry near delivery.' },
                                    { term: 'AFI: 10cm', info: 'Liquor (fluid) level is perfect. Your baby is swimming happily!' },
                                    { term: 'Cephalic Version', info: 'Baby is head down. Perfect position for birth!' }
                                ].map(item => (
                                    <button
                                        key={item.term}
                                        onClick={() => setSelectedReportTerm(item)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${selectedReportTerm?.term === item.term ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-[1.02]' : 'bg-gray-50 border-gray-100 hover:border-purple-200'}`}
                                    >
                                        <p className="font-bold text-sm">{item.term}</p>
                                    </button>
                                ))}
                            </div>
                            {selectedReportTerm && (
                                <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 flex items-start gap-4 animate-fade-in">
                                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0 font-bold">!</div>
                                    <div>
                                        <h4 className="font-bold text-purple-900 mb-1">{selectedReportTerm.term} Explained</h4>
                                        <p className="text-sm text-purple-800 leading-relaxed">{selectedReportTerm.info}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PREGNANCY & IRON LADY */}
                    {activeTab === 'pregnancy' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100">
                                <h3 className="font-bold flex items-center gap-2 mb-6 text-rose-600 text-xl"><BsHeartPulse className="text-2xl" /> Pregnancy Tracker</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-rose-50/50 p-6 rounded-2xl">
                                            <label className="text-xs font-black text-rose-400 uppercase tracking-tighter block mb-3">Due Date Calculator</label>
                                            <div className="flex gap-2">
                                                <input type="date" className="flex-1 p-3 rounded-xl border border-rose-200 bg-white" onChange={e => setDueDate(e.target.value)} />
                                                <button onClick={calculatePregnancy} className="bg-rose-500 text-white px-6 rounded-xl font-bold shadow-md hover:bg-rose-600">Calculater</button>
                                            </div>
                                        </div>
                                        {pregnancyWeek && (
                                            <button onClick={() => setIsPlayingHeartbeat(!isPlayingHeartbeat)} className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-sm ${isPlayingHeartbeat ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-600 text-white hover:bg-rose-700'}`}>
                                                <BsSoundwave className={isPlayingHeartbeat ? "animate-pulse" : ""} size={24} />
                                                {isPlayingHeartbeat ? "Simulating Heartbeat..." : "Hear Baby Heartbeat"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-rose-100 rounded-3xl flex flex-col items-center justify-center p-8 text-center min-h-[250px] shadow-inner relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl">2026</div>
                                        <div className="text-7xl mb-4 animate-float">{pregnancyWeek ? (pregnancyWeek < 12 ? '🫐' : pregnancyWeek < 24 ? '🥑' : '🍉') : '🤰'}</div>
                                        <p className="text-5xl font-black text-gray-800 tracking-tighter mb-1">{pregnancyWeek ? `Wk ${pregnancyWeek}` : "Track Now"}</p>
                                        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{pregnancyWeek ? `Size of a ${pregnancyWeek < 12 ? 'Blueberry' : pregnancyWeek < 24 ? 'Avocado' : 'Watermelon'}` : "Entering Maternal World"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-indigo-100 flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-3xl shadow-lg shadow-indigo-200">
                                        <BsCapsule className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-800">Iron Lady Streak</h4>
                                        <p className="text-sm text-gray-400 font-medium">Daily Pill Compliance</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-indigo-600 mb-1">{pillStreak} Days</p>
                                    <button
                                        onClick={() => { if (!pillTakenToday) { setPillStreak(p => p + 1); setPillTakenToday(true); } }}
                                        className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${pillTakenToday ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white'}`}
                                    >
                                        {pillTakenToday ? 'Pill Taken!' : 'Log Pill'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LABOR GUARD */}
                    {activeTab === 'labor' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-l-8 border-indigo-600">
                            <h3 className="text-2xl font-black flex items-center gap-3 mb-8 text-indigo-900"><BsStopwatch className="text-indigo-600" /> Labor Contraction Guard</h3>
                            <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                                <div
                                    className={`w-48 h-48 rounded-full flex flex-col items-center justify-center border-8 transition-all active:scale-95 shadow-2xl relative cursor-pointer ${isTiming ? 'border-red-500 bg-red-50 ring-8 ring-red-100 scale-110' : 'border-indigo-100 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300'}`}
                                    onClick={handleContractionBtn}
                                >
                                    <p className="text-4xl font-black text-indigo-900">{isTiming ? "STOP" : "START"}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isTiming ? "Pain Active" : "Tap on Pain"}</p>
                                    {isTiming && <div className="absolute -top-4 -right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse">Timing...</div>}
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                                        <p className="text-xs font-black text-gray-400 uppercase mb-2">Automated Analysis</p>
                                        <p className="text-2xl font-black text-indigo-900">{laborStatus}</p>
                                    </div>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                        {contractions.slice(-4).reverse().map((c, i) => (
                                            <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl min-w-[100px] text-center shadow-sm">
                                                <p className="text-[10px] text-gray-400 font-bold mb-1">Duration</p>
                                                <p className="text-xl font-black text-indigo-600">{c.duration}s</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* POSHAN AI */}
                    {activeTab === 'poshan' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-l-8 border-green-600">
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-2xl font-black flex items-center gap-3 text-green-900"><BsBasket className="text-green-600" /> Poshan Didi AI</h3>
                                <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold ring-2 ring-green-200">Beta Version 1.2</div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-black text-gray-600 uppercase">Iron Intake</span>
                                            <span className="text-sm font-black text-green-600 font-mono">{dietScore.iron}%</span>
                                        </div>
                                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner"><div className={`h-full transition-all duration-700 ${dietScore.iron < 60 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, dietScore.iron)}%` }}></div></div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-black text-gray-600 uppercase">Calcium Intake</span>
                                            <span className="text-sm font-black text-blue-600 font-mono">{dietScore.calcium}%</span>
                                        </div>
                                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner"><div className={`h-full transition-all duration-700 ${dietScore.calcium < 60 ? 'bg-red-400' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, dietScore.calcium)}%` }}></div></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="font-black text-gray-500 text-xs uppercase tracking-widest">Select Daily Superfoods</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[{ name: 'Spinach', iron: 35, calcium: 15 }, { name: 'Milk', iron: 0, calcium: 40 }, { name: 'Jaggery', iron: 25, calcium: 5 }, { name: 'Dal', iron: 20, calcium: 10 }].map(item => (
                                            <button key={item.name} onClick={() => toggleDietItem(item)} className={`p-4 rounded-2xl border-2 font-black text-sm transition-all text-center ${dietItems.includes(item.name) ? 'border-green-500 bg-green-50 text-green-700 shadow-md scale-95' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-green-200'}`}>
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 bg-green-50 p-4 rounded-2xl border border-green-100 text-[11px] text-green-800 font-medium">
                                💡 Tip: Eat Citrus fruits (Amla/Orange) with Iron foods to absorb it 2x faster.
                            </div>
                        </div>
                    )}

                    {/* JANANI SUPPORT */}
                    {activeTab === 'schemes' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-l-8 border-yellow-500 relative overflow-hidden">
                            <BsCashCoin className="absolute top-[-20px] right-[-20px] text-yellow-100 text-9xl -rotate-12" />
                            <h3 className="text-2xl font-black flex items-center gap-3 mb-6 text-yellow-900 relative z-10"><BsCashCoin className="text-yellow-600" /> Janani Financial Sathi</h3>
                            {!schemeEligible ? (
                                <div className="bg-gray-50/50 p-8 rounded-3xl border border-dashed border-yellow-300 relative z-10">
                                    <p className="text-gray-600 mb-6 font-medium">The Government of India provides ₹5000 - ₹6000 under the PMMVY scheme for first-time mothers. Check your status below.</p>
                                    <button onClick={() => setSchemeEligible(true)} className="w-full bg-yellow-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-yellow-200 hover:bg-yellow-600 active:scale-95 transition-all text-lg">Check Eligibility Status</button>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100 text-center relative z-10 animate-bounce-short">
                                    <p className="text-4xl font-black text-yellow-800 mb-2">You are Eligible! 🎉</p>
                                    <p className="text-lg text-yellow-700 mb-6 font-medium">You can claim <strong>₹6000</strong> under PMMVY Scheme + JSY.</p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button className="bg-yellow-600 text-white px-10 py-3 rounded-full font-black shadow-md">Apply Now</button>
                                        <button className="bg-white border-2 border-yellow-500 text-yellow-600 px-10 py-3 rounded-full font-black">Download Form</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* RHYTHM & DANGER (Final Polish) */}
                    {activeTab === 'rhythm' && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-purple-50">
                            <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3"><BsCalendarHeart className="text-purple-600" /> Rhythm Cycle AI</h3>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Last Period Start</label>
                                        <input type="date" className="p-3 rounded-xl border-2 border-gray-100 w-full focus:border-purple-300 transition-all outline-none" onChange={e => setLastPeriod(e.target.value)} />
                                    </div>
                                    <button onClick={calculateCycle} className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-purple-200 hover:bg-purple-700">Analyze Cycle</button>
                                </div>
                                {cycleData ? (
                                    <div className="bg-gradient-to-br from-purple-50 to-rose-50 p-6 rounded-3xl text-center flex flex-col items-center justify-center">
                                        <BsEggFill className="text-rose-400 text-5xl mb-4 animate-pulse" />
                                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Estimated Ovulation</p>
                                        <p className="text-3xl font-black text-purple-900 leading-none">{cycleData.ovulation}</p>
                                        <p className="text-xs text-rose-500 font-bold mt-2">Peak Fertility Window Active</p>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-300 border-4 border-dashed border-gray-50 rounded-3xl p-6">
                                        <BsCalendarDate className="text-5xl mb-2 opacity-30" />
                                        <p className="text-sm font-bold">Input dates for AI analysis</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'danger' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 1, title: 'Heavy Bleeding', level: 'red', icon: '🩸' },
                                    { id: 3, title: 'No Baby Movement', level: 'red', icon: '🤰' },
                                    { id: 2, title: 'High Fever / Chills', level: 'orange', icon: '🌡️' },
                                    { id: 4, title: 'Severe Headache', level: 'orange', icon: '🧠' }
                                ].map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => handleSymptomClick(s)}
                                        className={`p-6 font-black border-2 rounded-3xl text-left transition-all flex items-center justify-between group ${s.level === 'red' ? 'border-red-50 bg-white text-red-600 hover:bg-red-50 hover:border-red-600' : 'border-orange-50 bg-white text-orange-600 hover:bg-orange-50 hover:border-orange-600'}`}
                                    >
                                        <div>
                                            <p className="text-lg">{s.title}</p>
                                            <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">{s.level === 'red' ? 'Critical Action Required' : 'Medical Attention Advised'}</p>
                                        </div>
                                        <span className="text-3xl group-hover:scale-125 transition-transform">{s.icon}</span>
                                    </button>
                                ))}
                            </div>

                            {alertLevel === 'red' && (
                                <div className="bg-red-600 text-white p-8 rounded-3xl shadow-2xl shadow-red-200 animate-pulse-slow">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="text-center md:text-left">
                                            <h2 className="font-black text-4xl mb-2 flex items-center justify-center md:justify-start gap-3"><BsExclamationTriangle /> EMERGENCY</h2>
                                            <p className="font-bold text-red-100 opacity-90 text-lg">Voice Guardian: Lie down instantly. Ambulance dispatch active.</p>
                                        </div>
                                        <div className="flex gap-4 w-full md:w-auto">
                                            <button onClick={() => window.open('tel:102')} className="flex-1 bg-white text-red-600 font-extrabold px-12 py-4 rounded-2xl text-xl shadow-lg active:scale-95">CALL 102</button>
                                            <button onClick={() => setAlertLevel(null)} className="p-4 bg-red-700/50 rounded-2xl"><BsXCircleFill size={30} /></button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VACCINE TAB */}
                    {activeTab === 'vaccine' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border-l-8 border-blue-600">
                            <h3 className="text-2xl font-black flex items-center gap-3 mb-8 text-blue-900"><BsShieldCheck className="text-blue-600" /> Baby Vaccine Shield</h3>
                            <div className="space-y-3">
                                {[
                                    { age: 'At Birth', vax: 'BCG, Hep B1, OPV 0', color: 'bg-blue-50 text-blue-900', icon: '🍼' },
                                    { age: '6 Weeks', vax: 'DTwP 1, IPV 1, Hep B2', color: 'bg-blue-100/50 text-blue-900', icon: '👶' },
                                    { age: '10 Weeks', vax: 'DTwP 2, IPV 2, Hib 2', color: 'bg-indigo-50 text-indigo-900', icon: '💙' }
                                ].map((v, i) => (
                                    <div key={i} className={`flex justify-between items-center p-5 rounded-2xl transition-all hover:scale-[1.01] ${v.color}`}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{v.icon}</span>
                                            <div>
                                                <p className="font-black text-lg leading-none">{v.age}</p>
                                                <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mt-1">Recommended</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold opacity-80 max-w-[150px] text-right">{v.vax}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style>{`
                .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1); } 
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes bounce-short { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                .animate-bounce-short { animation: bounce-short 2s infinite; }
                @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.95; transform: scale(1.01); } }
                .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default WomenCare;
