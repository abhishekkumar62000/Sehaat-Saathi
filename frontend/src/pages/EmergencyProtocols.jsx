import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsShieldFillExclamation, BsTelephoneFill, BsBuildingFill,
    BsPlayFill, BsInfoCircleFill, BsLightningFill, BsHeartPulseFill,
    BsDropletFill, BsWind, BsExclamationTriangleFill, BsClockHistory,
    BsVolumeUpFill, BsVolumeMuteFill, BsStopCircleFill, BsMapFill,
    BsCheckCircleFill, BsCircle, BsActivity
} from 'react-icons/bs';

const EmergencyProtocols = () => {
    const [symptom, setSymptom] = useState('');
    const [alertLevel, setAlertLevel] = useState('low'); // low, medium, high (red alert)
    const [activeGuide, setActiveGuide] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [checkedSteps, setCheckedSteps] = useState({});
    const [showDispatch, setShowDispatch] = useState(false);
    const [dispatchProgress, setDispatchProgress] = useState(0);
    const [isTalking, setIsTalking] = useState(false);
    const synth = window.speechSynthesis;
    const metronomeRef = useRef(null);

    // AI Keyword Detection logic
    useEffect(() => {
        const query = symptom.toLowerCase();
        if (query.length === 0) {
            setAlertLevel('low');
            return;
        }

        const criticalTerms = ['heart', 'chest pain', 'breathing', 'stroke', 'bleeding', 'unconscious', 'cardiac', 'attack', 'accident'];
        const moderateTerms = ['fever', 'burn', 'cut', 'broken', 'fracture', 'allergic', 'bite', 'pain', 'vomit'];

        if (criticalTerms.some(term => query.includes(term))) {
            setAlertLevel('high');
        } else if (moderateTerms.some(term => query.includes(term))) {
            setAlertLevel('medium');
        } else {
            setAlertLevel('low');
        }
    }, [symptom]);

    // Live Dispatch Simulation Logic
    useEffect(() => {
        if (showDispatch) {
            setDispatchProgress(0);
            const interval = setInterval(() => {
                setDispatchProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [showDispatch]);

    const handleSpeak = (text) => {
        if (synth.speaking) {
            synth.cancel();
            setIsTalking(false);
            return;
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.onend = () => setIsTalking(false);
        setIsTalking(true);
        synth.speak(utter);
    };

    const toggleStep = (stepId) => {
        setCheckedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

    const lifesaverGuides = [
        {
            id: 'cpr',
            title: 'CPR (Adult)',
            icon: <BsHeartPulseFill />,
            color: 'red',
            metronome: true,
            steps: [
                "Verify the scene is safe and check responsiveness.",
                "Call 108/102 immediately.",
                "Place heel of one hand in center of chest, other hand on top.",
                "Push hard and fast (100-120 compressions per minute).",
                "Allow chest to recoil completely between compressions."
            ],
            warning: "Do not stop unless professional help arrives or the person wakes up."
        },
        {
            id: 'stroke',
            title: 'Stroke (F.A.S.T)',
            icon: <BsLightningFill />,
            color: 'orange',
            steps: [
                "Face: Ask them to smile. Does one side droop?",
                "Arms: Ask them to raise both arms. Does one drift down?",
                "Speech: Ask them to repeat a simple phrase. Is it slurred?",
                "Time: If any signs are present, call emergency services NOW."
            ],
            warning: "Note the time when symptoms first started."
        },
        {
            id: 'bleeding',
            title: 'Severe Bleeding',
            icon: <BsDropletFill />,
            color: 'rose',
            steps: [
                "Apply direct pressure with a clean cloth/bandage.",
                "Add more bandages if blood soaks through; don't remove old ones.",
                "Keep the limb elevated above heart level if possible.",
                "If pressure fails, use a tourniquet (only as last resort)."
            ],
            warning: "Wash hands or wear gloves to avoid infection if possible."
        },
        {
            id: 'choking',
            title: 'Choking (Heimlich)',
            icon: <BsWind />,
            color: 'blue',
            steps: [
                "Stand behind the person, wrap arms around their waist.",
                "Make a fist and place it just above the navel.",
                "Grasp fist with other hand and pull inward and upward.",
                "Repeat until the object is forced out."
            ],
            warning: "If the person becomes unconscious, begin CPR immediately."
        }
    ];

    return (
        <div className={`min-h-screen transition-all duration-700 font-inter ${alertLevel === 'high' ? 'bg-[#1a0505]' : 'bg-[#0a0d14]'} text-white overflow-x-hidden selection:bg-red-500/30`}>

            {/* Ultra-Interactive Red Pulse Border */}
            {alertLevel === 'high' && (
                <div className="fixed inset-0 pointer-events-none z-[60] border-[15px] md:border-[30px] border-red-500/20 animate-sos-pulse"></div>
            )}

            {/* Top Panic Bar (v2.0 Exclusive) */}
            <div className={`fixed top-0 left-0 w-full z-[70] h-1 md:h-2 transition-all duration-500 ${alertLevel === 'high' ? 'bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)]' : 'bg-transparent'}`}></div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5 px-6 py-5">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest">
                        <BsArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" /> Exit Hub
                    </Link>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => {
                                setAlertLevel(prev => prev === 'high' ? 'low' : 'high');
                                if (alertLevel !== 'high') setSymptom('EMERGENCY SOS TRIGGERED');
                            }}
                            className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all ${alertLevel === 'high' ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-red-600 hover:text-white'}`}
                        >
                            {alertLevel === 'high' ? 'STOP PANIC MODE' : 'PANIC SOS'}
                        </button>
                        <div className="hidden md:flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${alertLevel === 'high' ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`}></div>
                            <span className="font-black uppercase tracking-[0.3em] text-[8px] text-slate-500">System Monitoring</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-40 pb-32 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">

                    {/* Hero Section */}
                    <div className="text-center mb-24">
                        <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 border transition-all duration-500 ${alertLevel === 'high' ? 'bg-red-500/20 border-red-500/30 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                            <BsActivity className={alertLevel === 'high' ? 'animate-pulse' : ''} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural SOS v2.0 Active</span>
                        </div>
                        <h1 className={`text-6xl md:text-9xl font-black mb-8 tracking-tighter transition-all duration-700 leading-[0.8] ${alertLevel === 'high' ? 'text-red-600 scale-105' : 'text-white'}`}>
                            LIFESAVER <br /> <span className="italic opacity-50 font-light">SYSTEM</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                            Speak or type. Our AI detects <span className="text-white font-bold">Chest Pain, Stroke, or Bleeding</span> and activates high-alert Voice Protocols instantly.
                        </p>
                    </div>

                    {/* Neural Search Command Center */}
                    <div className="max-w-5xl mx-auto mb-24 relative">
                        <div className={`absolute -inset-4 rounded-[4rem] blur-3xl transition-all duration-1000 opacity-20 ${alertLevel === 'high' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
                        <div className="relative">
                            <BsShieldFillExclamation className={`absolute left-12 top-1/2 -translate-y-1/2 text-4xl transition-colors duration-500 ${alertLevel === 'high' ? 'text-red-500' : 'text-slate-600'}`} />
                            <input
                                type="text"
                                placeholder="Describe the crisis (e.g. He is not breathing!)..."
                                value={symptom}
                                onChange={(e) => setSymptom(e.target.value)}
                                className={`w-full bg-[#0d1117]/90 border-4 rounded-[4rem] py-12 pl-28 pr-12 text-2xl md:text-4xl focus:outline-none transition-all font-black placeholder:text-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] ${alertLevel === 'high' ? 'border-red-600/50 text-red-100' : 'border-white/5 focus:border-blue-600/30 text-white'}`}
                            />
                            {symptom.length > 0 && (
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className={`w-1.5 h-6 rounded-full animate-bounce ${alertLevel === 'high' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ animationDelay: `${i * 100}ms` }}></div>)}
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-widest ${alertLevel === 'high' ? 'text-red-500' : 'text-blue-500'}`}>{alertLevel === 'high' ? 'STRIKE DETECTED' : 'ANALYZING...'}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dynamic High-Alert Action Board */}
                    {alertLevel !== 'low' && (
                        <div className={`mb-24 p-12 md:p-16 rounded-[4rem] border-4 animate-slide-up shadow-3xl relative overflow-hidden transition-all duration-500 ${alertLevel === 'high' ? 'bg-red-600/10 border-red-600/40 backdrop-blur-2xl' : 'bg-orange-600/10 border-orange-600/40'}`}>
                            <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
                                <BsShieldFillExclamation className="text-[15rem] rotate-12" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className={`w-36 h-36 rounded-[3rem] flex items-center justify-center flex-shrink-0 animate-sos-ring ${alertLevel === 'high' ? 'bg-red-600 text-white shadow-[0_0_50px_rgba(220,38,38,0.5)]' : 'bg-orange-600 text-white'}`}>
                                    <BsExclamationTriangleFill className="text-6xl" />
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h3 className={`text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter ${alertLevel === 'high' ? 'text-red-500' : 'text-orange-500'}`}>
                                        {alertLevel === 'high' ? 'CRITICAL EMERGENCY DETECTED' : 'URGENT MEDICAL ALERT'}
                                    </h3>
                                    <p className="text-xl md:text-3xl leading-snug font-bold text-slate-100 mb-10 italic max-w-4xl">
                                        "Stay calm. We are mobilizing help. <span className="text-white underline decoration-red-500">Call 108/102 right now</span>. Follow the hands-free voice protocols below."
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                        <a href="tel:108" onClick={() => setShowDispatch(true)} className="px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl flex items-center gap-4 transition-all hover:scale-105 shadow-2xl uppercase tracking-widest text-sm">
                                            <BsTelephoneFill className="text-xl" /> Mobilize Ambulance (108)
                                        </a>
                                        <button onClick={() => handleSpeak("Stay calm. Professional help is on the way. Check the breathing and clear the area around the patient.")} className="px-12 py-6 bg-white/5 border-2 border-white/20 text-white font-black rounded-3xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm flex items-center gap-4">
                                            <BsVolumeUpFill className="text-xl" /> Listen Instructions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Interactive Guides v2.0 */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                        {lifesaverGuides.map((guide) => (
                            <div
                                key={guide.id}
                                onClick={() => setActiveGuide(guide)}
                                className={`group bg-[#121620] border-2 border-white/5 rounded-[4rem] p-12 hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-5 shadow-3xl ${activeGuide?.id === guide.id ? 'border-blue-500 bg-blue-500/5' : ''}`}
                            >
                                <div className={`absolute -top-12 -right-12 w-48 h-48 bg-${guide.color}-600/10 rounded-full blur-3xl group-hover:bg-${guide.color}-600/20 transition-all duration-700`}></div>

                                <div className={`w-28 h-28 rounded-[2.5rem] bg-${guide.color}-600/20 flex items-center justify-center border-2 border-${guide.color}-600/20 mb-10 group-hover:scale-110 group-hover:rotate-12 duration-700 relative`}>
                                    <span className={`text-5xl text-${guide.color}-500`}>{guide.icon}</span>
                                    {guide.metronome && activeGuide?.id === guide.id && (
                                        <div className="absolute -inset-4 border-2 border-red-500 rounded-full animate-cpr-beat opacity-60"></div>
                                    )}
                                </div>
                                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter group-hover:text-white transition-colors">{guide.title}</h3>
                                <p className="text-slate-500 font-bold group-hover:text-slate-300 transition-colors leading-tight">Instant 4-Step Animated Protocol</p>

                                <div className="mt-10 flex items-center gap-3 py-3 px-6 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Launch Guide</span>
                                    <BsPlayFill className="text-blue-400 text-lg" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Assistance Dashboard v2.0 */}
                    <div className="grid lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 bg-[#0d1117]/80 backdrop-blur-3xl rounded-[5rem] p-16 border-2 border-white/5 relative overflow-hidden group shadow-3xl">
                            <div className="absolute -top-20 -right-20 opacity-5 group-hover:opacity-10 transition-opacity">
                                <BsBuildingFill className="text-[25rem]" />
                            </div>
                            <div className="flex items-center justify-between mb-16">
                                <h4 className="flex items-center gap-6 text-4xl font-black tracking-tighter">
                                    <BsBuildingFill className="text-blue-500" /> LOCAL DISPATCH HUB
                                </h4>
                                <div className="flex gap-2">
                                    <div className="px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">3 Providers Active</div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { name: "Apollo Advanced Trauma", dist: "0.8 km", time: "4 mins", status: "Ready", type: "Level 1" },
                                    { name: "Fortis Cardio Center", dist: "2.1 km", time: "9 mins", status: "High Priority", type: "Level 2" },
                                    { name: "City General ER", dist: "4.5 km", time: "15 mins", status: "Delayed", type: "General" }
                                ].map((hosp, i) => (
                                    <div key={i} className="flex items-center justify-between p-10 bg-white/5 rounded-[3rem] border-2 border-white/5 hover:border-white/20 transition-all cursor-pointer group/item">
                                        <div className="flex items-center gap-10">
                                            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-2xl text-slate-500 group-hover/item:text-blue-400 group-hover/item:scale-110 transition-all">
                                                <BsBuildingFill />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-white group-hover/item:text-blue-400 transition-colors">{hosp.name}</span>
                                                <div className="flex gap-6 mt-2">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{hosp.dist} • {hosp.type}</span>
                                                    <span className={`text-xs font-black uppercase tracking-widest ${hosp.status === 'Ready' ? 'text-emerald-500' : hosp.status === 'Delayed' ? 'text-red-500' : 'text-orange-500'}`}>{hosp.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-white tracking-tighter">{hosp.time}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mobility Window</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-10">
                            <div className="bg-gradient-to-br from-red-600 via-red-700 to-indigo-900 rounded-[5rem] p-16 text-white shadow-[0_0_80px_rgba(220,38,38,0.2)] relative overflow-hidden group flex-1">
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
                                <h4 className="text-4xl font-black mb-12 leading-[0.9] tracking-tighter uppercase italic">SOS <br /> BROADCAST</h4>
                                <div className="space-y-6">
                                    <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-50">Police Emergency</span>
                                        <span className="text-4xl font-black">100</span>
                                    </div>
                                    <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-50">Fire Response</span>
                                        <span className="text-4xl font-black">101</span>
                                    </div>
                                    <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/15 transition-all">
                                        <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-50">Women Helpline</span>
                                        <span className="text-4xl font-black">1091</span>
                                    </div>
                                </div>
                                <button className="w-full py-10 mt-12 bg-white text-red-600 font-black rounded-[2.5rem] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all uppercase tracking-[0.3em] text-xs active:scale-95 border-none">
                                    GLOBAL ALERT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* v2.0 Ultra-Interactive Protocol Modal */}
            {activeGuide && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
                    <div onClick={() => setActiveGuide(null)} className="fixed inset-0 bg-[#0a0d14]/98 backdrop-blur-3xl"></div>
                    <div className="bg-[#121620] w-full max-w-6xl rounded-[4rem] md:rounded-[6rem] border-2 border-white/10 overflow-hidden relative animate-ultra-slide shadow-[0_0_200px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">
                        <div className={`h-4 w-full bg-gradient-to-r from-${activeGuide.color}-600 via-${activeGuide.color}-400 to-${activeGuide.color}-600 animate-gradient-flow shadow-lg`}></div>

                        <div className="p-10 md:p-24 overflow-y-auto custom-scrollbar">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 sticky top-0 bg-[#121620] pb-10 z-20 border-b border-white/5">
                                <div className="flex items-center gap-10">
                                    <div className={`w-24 h-24 rounded-[2.5rem] bg-${activeGuide.color}-600/20 flex items-center justify-center border-4 border-${activeGuide.color}-600/20 shadow-2xl relative`}>
                                        <span className={`text-5xl text-${activeGuide.color}-500 group-hover:scale-110 transition-transform`}>{activeGuide.icon}</span>
                                        {activeGuide.metronome && (
                                            <div className="absolute -inset-6 border-4 border-red-500 rounded-full animate-cpr-beat"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{activeGuide.title}</h3>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Active First-Aid Protocol</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleSpeak(`${activeGuide.title} Protocol initialized. Step 1: ${activeGuide.steps[0]}`)}
                                        className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all text-2xl ${isTalking ? 'bg-blue-600 border-blue-500 text-white animate-pulse' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'}`}
                                    >
                                        {isTalking ? <BsStopCircleFill /> : <BsVolumeUpFill />}
                                    </button>
                                    <button onClick={() => setActiveGuide(null)} className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-3xl text-slate-400 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all">
                                        <BsStopCircleFill className="rotate-45" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-16">
                                <div className="lg:col-span-8 space-y-8">
                                    {activeGuide.steps.map((step, idx) => {
                                        const stepId = `${activeGuide.id}-step-${idx}`;
                                        const isChecked = checkedSteps[stepId];
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => toggleStep(stepId)}
                                                className={`flex gap-10 p-10 rounded-[3rem] border-2 transition-all cursor-pointer group ${isChecked ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                            >
                                                <div className={`w-16 h-16 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center font-black text-2xl transition-all shadow-xl ${isChecked ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 rotate-3'}`}>
                                                    {isChecked ? <BsCheckCircleFill /> : idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-2xl md:text-3xl font-bold leading-[1.2] transition-colors ${isChecked ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'}`}>{step}</p>
                                                    {isChecked && <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mt-4 block">Action Completed</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="lg:col-span-4 space-y-8">
                                    <div className={`p-10 rounded-[4rem] border-4 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group transition-all duration-500 ${activeGuide.color === 'red' ? 'bg-red-600/10 border-red-600/40' : 'bg-orange-600/10 border-orange-600/40'}`}>
                                        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-8 rotate-12">
                                            <BsInfoCircleFill className={`text-4xl ${activeGuide.color === 'red' ? 'text-red-500' : 'text-orange-500'}`} />
                                        </div>
                                        <h4 className="text-lg font-black uppercase tracking-widest mb-4 opacity-50">Medical Warning</h4>
                                        <p className="text-xl md:text-2xl font-black italic text-white leading-relaxed">"{activeGuide.warning}"</p>
                                    </div>

                                    {activeGuide.metronome && (
                                        <div className="bg-white/5 p-12 rounded-[4rem] border-2 border-white/10 text-center shadow-xl">
                                            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-slate-500">Compression Rhythm</div>
                                            <div className="flex items-center justify-center gap-6">
                                                <div className="w-24 h-24 rounded-full border-4 border-red-600/20 flex items-center justify-center animate-cpr-beat shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                                                    <BsHeartPulseFill className="text-5xl text-red-600" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-4xl font-black text-white italic">110</div>
                                                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">BPM TARGET</div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-600 mt-10 uppercase tracking-widest">Tune: 'Stayin' Alive'</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setActiveGuide(null)}
                                        className={`w-full py-10 rounded-[3rem] bg-white text-black font-black uppercase text-xs tracking-[0.4em] transition-all hover:scale-95 shadow-2xl mt-auto shadow-${activeGuide.color}-600/20`}
                                    >
                                        End Protocol
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Live Dispatch Simulator Modal v2.0 */}
            {showDispatch && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#0a0d14]/98 backdrop-blur-3xl"></div>
                    <div className="bg-[#121620] w-full max-w-lg rounded-[4rem] border-2 border-blue-500/30 p-12 relative animate-ultra-slide text-center shadow-[0_0_100px_rgba(59,130,246,0.3)] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${dispatchProgress}%` }}></div>
                        </div>
                        <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-10 border-2 border-blue-500 shadow-inner">
                            <BsMapFill className="text-5xl text-blue-500 animate-bounce" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">DISPATCH ACTIVE</h3>
                        <p className="text-slate-400 font-bold mb-10 leading-relaxed italic">"Ambulance dispatch ho chuki hai. GPS tracking link phone par bhej diya gaya hai. ETA 8-12 minutes."</p>
                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="opacity-50">Signal Status</span>
                                <span className="text-emerald-500">Strong</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 animate-progress-glow" style={{ width: '75%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="opacity-50">Personnel</span>
                                <span>2 Paramedics</span>
                            </div>
                        </div>
                        <button onClick={() => setShowDispatch(false)} className="w-full py-6 bg-white/5 border-2 border-white/10 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Dismiss Tracking</button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes sos-pulse { 0% { opacity: 0.2; border-width: 15px; } 50% { opacity: 0.5; border-width: 30px; } 100% { opacity: 0.2; border-width: 15px; } }
                @keyframes sos-ring { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); } 70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }
                @keyframes cpr-beat { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.4); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
                @keyframes ultra-slide { from { opacity: 0; transform: translateY(100px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes progress-glow { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
                @keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                
                .animate-sos-pulse { animation: sos-pulse 1.5s infinite ease-in-out; }
                .animate-sos-ring { animation: sos-ring 2s infinite cubic-bezier(0.66, 0, 0, 1); }
                .animate-cpr-beat { animation: cpr-beat 0.54s infinite cubic-bezier(0.21, 0, 0.07, 1); } /* ~110 BPM */
                .animate-ultra-slide { animation: ultra-slide 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-progress-glow { animation: progress-glow 1s infinite alternate; }
                .animate-gradient-flow { background-size: 200% 200%; animation: gradient-flow 3s linear infinite; }
                
                .font-inter { font-family: 'Inter', sans-serif; }
                .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(0,0,0,0.3); }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default EmergencyProtocols;
