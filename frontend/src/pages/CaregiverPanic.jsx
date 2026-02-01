import { useState, useEffect, useRef } from 'react';
import {
    BsExclamationTriangleFill, BsPeopleFill, BsTelephoneFill, BsClockFill,
    BsShieldCheck, BsArrowLeft, BsChatQuoteFill, BsFileEarmarkMedicalFill,
    BsHeartPulseFill, BsGeoAltFill, BsCheckCircleFill, BsHouseFill,
    BsSoundwave, BsCpuFill, BsStars, BsTruck, BsArrowRight,
    BsVolumeUpFill, BsCameraVideoFill, BsPlusCircleFill, BsBarChartFill,
    BsLightbulbFill, BsActivity
} from "react-icons/bs";
import { Link } from 'react-router-dom';

const CaregiverPanic = () => {
    // Phase 10 Baseline
    const [isPanicActive, setIsPanicActive] = useState(false);
    const [alertStep, setAlertStep] = useState(0);
    const [peacePulseActive, setPeacePulseActive] = useState(false);
    const [emergencyLogs, setEmergencyLogs] = useState([]);
    const [predTrend, setPredTrend] = useState("Stable");
    const [predScore, setPredScore] = useState(88);
    const [tapCount, setTapCount] = useState(0);
    const [vitals, setVitals] = useState({ pulse: 72, o2: 98, bp: "120/80" });
    const [useVedas, setUseVedas] = useState(false);

    // Phase 11 Singularity State
    const [isCprActive, setIsCprActive] = useState(false);
    const [cprPhase, setCprPhase] = useState("PUSH"); // PUSH vs BREATHE
    const [isArMode, setIsArMode] = useState(false);
    const [isNeuroTransfer, setIsNeuroTransfer] = useState(false);
    const [optimalHospital, setOptimalHospital] = useState({
        name: "Max Super Specialty",
        wait: "2m",
        beds: 4,
        totalTime: "12m"
    });

    const [auraVolunteers, setAuraVolunteers] = useState([
        { id: 1, name: "Nurse Meera (Certified)", dist: "150m", status: "Coming" },
        { id: 2, name: "First-Aider Rahul", dist: "320m", status: "Alerted" }
    ]);

    const [alerts, setAlerts] = useState([
        { id: 'dr', name: 'Dr. Anand (Family MD)', status: 'notified', icon: <BsTelephoneFill /> },
        { id: 'family', name: 'Family (Son/Wife)', status: 'pending', icon: <BsPeopleFill /> },
        { id: 'neighbor', name: 'Neighbor (Mr. Khanna)', status: 'pending', icon: <BsHouseFill /> },
        { id: 'hospital', name: 'City Hospital (ER)', status: 'pending', icon: <BsFileEarmarkMedicalFill /> },
    ]);

    const [aiGuidance, setAiGuidance] = useState([
        "Stay calm. Deep breaths. You are not alone.",
        "Check if the patient is responding to their name.",
        "Loosen any tight clothing around the neck.",
        "Wait for the volunteer, stay with the patient."
    ]);

    const vedasGuidance = [
        "Quiet the room. Light an incense or use a calming scent.",
        "Apply pressure to any cut. Use Turmeric (Haldi) if available for antiseptic power.",
        "If conscious, give warm water with Ginger (Adrak).",
        "Keep the head slightly elevated (Vata balancing posture)."
    ];

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setEmergencyLogs(prev => [...prev, { time, msg }]);
    };

    // CPR Metronome Effect
    useEffect(() => {
        let interval;
        if (isCprActive) {
            addLog("CPR Metronome Started: 110 BPM rhythm engaged.");
            interval = setInterval(() => {
                setCprPhase(prev => prev === "PUSH" ? "BREATHE" : "PUSH");
            }, 600); // ~100 bpm rhythm
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isCprActive]);

    const triggerPanic = () => {
        setIsPanicActive(true);
        addLog("SINGULARITY SOS: Full Sentinel Core Broad-casting.");
        addLog("Syncing Live Vitals & Triage analytics.");

        // Peace Pulse Trigger
        setTimeout(() => {
            setPeacePulseActive(true);
            addLog("Sentiment AI detected stress: Peace-Pulse regulation active.");
        }, 3000);

        // Simulate Vitals
        const vInterval = setInterval(() => {
            const p = Math.floor(Math.random() * (115 - 85) + 85);
            setVitals({
                pulse: p,
                o2: Math.floor(Math.random() * (99 - 92) + 92),
                bp: "140/90"
            });
            if (p > 108) addLog(`Physio Alert: Core Pulse critical at ${p} BPM.`);
        }, 1200);

        // Simulate Alerts
        let step = 1;
        const interval = setInterval(() => {
            setAlerts(prev => {
                const newAlerts = [...prev];
                if (step < newAlerts.length) {
                    newAlerts[step].status = 'notified';
                    addLog(`Unit Response: ${newAlerts[step].name} is in motion.`);
                    step++;
                    return newAlerts;
                }
                clearInterval(interval);
                clearInterval(vInterval);
                return prev;
            });
            setAlertStep(prev => Math.min(prev + 1, aiGuidance.length - 1));
        }, 3000);
    };

    const handleSecretSOS = () => {
        setTapCount(c => {
            if (c + 1 >= 3) {
                addLog("SHADOW SOS: Silent security dispatch triggered.");
                alert("SILENT ALERT SENT TO POLICE. STAY CALM.");
                return 0;
            }
            return c + 1;
        });
        setTimeout(() => setTapCount(0), 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative selection:bg-indigo-100 overflow-x-hidden" onClick={handleSecretSOS}>
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-[100]">
                <Link to="/smarthub" className="flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-600 transition-colors">
                    <BsArrowLeft /> Back to Hub
                </Link>
                <div className="flex gap-2">
                    <div className="bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200 shadow-sm flex items-center gap-2">
                        <BsPlusCircleFill className="animate-spin-slow" /> AI Singularity v3.1
                    </div>
                    {peacePulseActive && (
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 animate-pulse border border-blue-200">
                            <BsSoundwave /> Life-Link Enabled
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* TOP BAR: SMART TRIAGE & PREDICTION */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* GUARDIAN PREDICTION */}
                    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-200 transition-colors group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl shadow-inner border border-indigo-100 relative overflow-hidden">
                                <BsCpuFill className="text-indigo-600 animate-pulse opacity-20 absolute inset-0 w-full h-full p-2" />
                                <BsStars className="text-indigo-600 z-10" />
                            </div>
                            <div>
                                <h4 className="text-md font-black text-slate-800">Singularity Predict™</h4>
                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] leading-none">Neural Trend Analysis</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-indigo-600 tracking-tighter leading-none">{predScore}%</p>
                            <p className="text-[8px] font-black text-slate-400 uppercase mt-1">Stability Core</p>
                        </div>
                    </div>

                    {/* SMART TRIAGE TUNNEL */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-slate-800 flex items-center justify-between group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-125 transition-transform">
                            <BsBarChartFill size={40} className="text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl shadow-inner border border-emerald-500/20">
                                <BsGeoAltFill className="text-emerald-400 animate-bounce" />
                            </div>
                            <div>
                                <h4 className="text-md font-black text-white">Smart-Triage Output</h4>
                                <p className="text-[9px] text-emerald-400 font-black uppercase tracking-[0.2em] leading-none">Optimal Rescue Route</p>
                            </div>
                        </div>
                        <div className="text-right relative z-10">
                            <p className="text-lg font-black text-white leading-none truncate max-w-[120px]">{optimalHospital.name}</p>
                            <div className="flex gap-2 justify-end mt-1">
                                <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 px-2 rounded-full border border-emerald-500/20">WAIT: {optimalHospital.wait}</span>
                                <span className="text-[9px] font-black bg-indigo-500/20 text-indigo-400 px-2 rounded-full border border-indigo-500/20">TOTAL: {optimalHospital.totalTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Summary + Live Vitals Hub */}
                <div className="bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl mb-10 relative overflow-hidden group border border-white/5">
                    <div className="absolute -right-16 -top-16 opacity-5 group-hover:opacity-10 group-hover:scale-x-110 transition-all duration-1000 text-white pointer-events-none">
                        <BsHeartPulseFill className="w-80 h-80" />
                    </div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 border border-indigo-500/30 shadow-lg">
                                Life-Link Matrix Synchronized
                            </span>
                            <h2 className="text-5xl font-black mb-3 tracking-tight">Mr. Rajesh Sharma (68)</h2>
                            <p className="text-md opacity-60 flex items-center gap-3 font-semibold">
                                <BsGeoAltFill className="text-rose-500" /> B-14, Sector 12, Delhi • ID: SSH-9921-AI
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="bg-white/10 px-5 py-3 rounded-2xl text-xs font-black tracking-widest border border-white/10 backdrop-blur-md">BLOOD: O+ POSITIVE</div>
                                <div className="bg-red-500/20 px-5 py-3 rounded-2xl text-xs font-black tracking-widest border border-red-500/20 text-red-200 uppercase backdrop-blur-md">ALLERGY: PENICILLIN</div>
                            </div>
                        </div>

                        {/* LIVE VITALS SYNC PANEL */}
                        <div className={`grid grid-cols-3 gap-5 transition-all duration-1000 ${isPanicActive ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-20 grayscale blur-[5px] scale-90 translate-y-8 rotate-1'}`}>
                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center hover:bg-white/10 transition-all hover:scale-105 group/vit">
                                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">Pulse</p>
                                <p className={`text-4xl font-black ${isPanicActive ? 'text-rose-400 animate-pulse' : 'text-white'}`}>{vitals.pulse}</p>
                                <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 animate-[pulse_1s_infinite]" style={{ width: `${(vitals.pulse / 140) * 100}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center hover:bg-white/10 transition-all hover:scale-105 group/vit">
                                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">Oxygen</p>
                                <p className="text-4xl font-black text-blue-400">{vitals.o2}%</p>
                                <p className="text-[10px] font-black opacity-30 mt-2 uppercase tracking-tighter">SpO2 Stable</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center text-white hover:bg-white/10 transition-all hover:scale-105 group/vit">
                                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">Pressure</p>
                                <p className="text-3xl font-black mt-1 leading-none tracking-tighter">{vitals.bp}</p>
                                <p className="text-[9px] font-black opacity-30 mt-3 uppercase">SYS/DIA</p>
                            </div>
                        </div>
                    </div>
                </div>

                {!isPanicActive ? (
                    <div className="text-center py-28 animate-fade-in relative">
                        <div
                            onClick={triggerPanic}
                            className="w-80 h-80 bg-white rounded-full mx-auto flex flex-col items-center justify-center cursor-pointer shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_50px_120px_-20px_rgba(239,68,68,0.4)] transition-all duration-700 border-[16px] border-red-500 active:scale-90 group relative z-10"
                        >
                            <div className="absolute inset-0 rounded-full border-8 border-red-400 animate-ping opacity-30"></div>
                            <BsExclamationTriangleFill className="text-red-500 text-8xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                            <h3 className="text-5xl font-black text-slate-800 tracking-tighter">ULTRA PANIC</h3>
                            <p className="text-xs text-slate-400 font-black mt-3 uppercase tracking-[0.5em] leading-none">One-Tap Life Link</p>
                        </div>
                        <div className="mt-20 flex flex-col items-center gap-8">
                            <p className="text-slate-400 max-w-lg font-bold text-xl leading-relaxed italic opacity-80 decoration-indigo-200 underline">
                                "The Life-Link Singularity: Every heartbeat predicted. Every second coordinated."
                            </p>
                            <div className="flex gap-4 p-4 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                                <div className="text-left border-r border-slate-100 pr-4">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sentient Core</p>
                                    <p className="text-xs font-black text-indigo-600">v3.1 ACTIVE</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">AR Guidance</p>
                                    <p className="text-xs font-black text-emerald-600">READY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12 animate-slide-up">
                        {/* THE SINGULARITY DASHBOARD */}
                        <div className="grid lg:grid-cols-4 gap-8">

                            {/* LEFT COLUMN: COORDINATION & AURA */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                                    <h4 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                                        <BsShieldCheck className="text-emerald-500 text-2xl" /> Response Matrix
                                    </h4>
                                    <div className="space-y-4">
                                        {alerts.map((alert) => (
                                            <div key={alert.id} className={`flex items-center justify-between p-4 rounded-[1.5rem] border transition-all duration-700 ${alert.status === 'notified' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100 grayscale opacity-30 scale-95'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg text-lg ${alert.status === 'notified' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                                        {alert.icon}
                                                    </div>
                                                    <div>
                                                        <p className={`font-black text-sm tracking-tight ${alert.status === 'notified' ? 'text-emerald-900' : 'text-slate-400'}`}>{alert.name}</p>
                                                        <p className="text-[9px] uppercase font-black tracking-widest opacity-40">
                                                            {alert.status === 'notified' ? 'Unit Synced' : 'Locating...'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                    <h5 className="flex items-center gap-3 font-black text-lg mb-6 tracking-tight">
                                        <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping"></span>
                                        Sehaat Aura
                                    </h5>
                                    <div className="space-y-4">
                                        {auraVolunteers.map(v => (
                                            <div key={v.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center group/v">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-500/20 group-hover/v:scale-110 transition-transform">👐</div>
                                                    <div>
                                                        <p className="text-sm font-black tracking-tight">{v.name}</p>
                                                        <p className="text-[10px] font-black opacity-40 uppercase">{v.dist} Away</p>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-black bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">{v.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CENTER COLUMN: AR LENS & GUIDANCE */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className={`relative transition-all duration-700 rounded-[3rem] p-1 shadow-2xl overflow-hidden ${isArMode ? 'bg-emerald-500' : 'bg-indigo-600'}`}>

                                    {/* SIMULATED AR CAMERA ENVIRONMENT */}
                                    <div className={`relative w-full aspect-video rounded-[2.8rem] overflow-hidden ${isArMode ? 'bg-emerald-900' : 'bg-slate-900 blur-[2px]'}`}>
                                        {isArMode ? (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {/* AR Anatomical Markers */}
                                                <div className="relative w-48 h-80 border-2 border-white/20 rounded-full opacity-40 flex items-center justify-center">
                                                    <div className="absolute top-1/4 w-32 h-32 border-4 border-dashed border-emerald-400 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                                                        <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,1)]"></div>
                                                    </div>
                                                    <div className="absolute top-1/4 translate-y-24 bg-emerald-500/80 text-white text-[10px] font-black px-4 py-2 rounded-full animate-pulse shadow-2xl">
                                                        PLACE HANDS HERE
                                                    </div>
                                                </div>
                                                {/* Neuro-Transfer Pointer */}
                                                {isNeuroTransfer && (
                                                    <div className="absolute top-10 left-10 animate-fade-in group pointer-events-none">
                                                        <div className="w-20 h-20 border-4 border-rose-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)]">
                                                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                                        </div>
                                                        <p className="text-[9px] font-black text-rose-500 bg-black/40 backdrop-blur px-2 py-1 rounded mt-2 uppercase tracking-widest">Doctor Pointee: Check Airway</p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                                <BsCameraVideoFill className="text-6xl opacity-20 mb-4" />
                                                <p className="font-black text-sm uppercase tracking-widest opacity-40">Lens Decoupled</p>
                                            </div>
                                        )}
                                        {/* AR HUD */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => setIsArMode(!isArMode)}
                                                    className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all active:scale-90 ${isArMode ? 'bg-white text-emerald-700' : 'bg-white/10 text-white backdrop-blur border border-white/10'}`}
                                                >
                                                    <BsPlusCircleFill size={32} />
                                                </button>
                                                <p className="text-[9px] font-black text-white uppercase tracking-widest text-center">{isArMode ? "AR ON" : "AR OFF"}</p>
                                            </div>

                                            {/* CPR MODALITY */}
                                            <div className="bg-black/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 min-w-[200px] text-center border-b-4 border-rose-500">
                                                <h6 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-3">Vocational Commander</h6>
                                                <button
                                                    onClick={() => setIsCprActive(!isCprActive)}
                                                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 ${isCprActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-white/10 text-white border border-white/10'}`}
                                                >
                                                    {isCprActive ? "STOP COMMANDER" : "START CPR COACH"}
                                                </button>
                                                {isCprActive && (
                                                    <div className="mt-4 animate-fade-in">
                                                        <p className="text-3xl font-black text-white tracking-widest mb-1 italic">{cprPhase}</p>
                                                        <div className="flex gap-1 justify-center">
                                                            {[1, 2, 3, 4].map(i => <div key={i} className={`h-1 w-8 rounded-full ${i % 2 === 0 ? 'bg-rose-500 animate-pulse' : 'bg-white/20'}`}></div>)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => {
                                                        setIsNeuroTransfer(!isNeuroTransfer);
                                                        if (!isNeuroTransfer) addLog("Neuro-Transfer engaged: Doctor is now drawing on your lens.");
                                                    }}
                                                    className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all active:scale-90 ${isNeuroTransfer ? 'bg-white text-rose-700' : 'bg-white/10 text-white backdrop-blur border border-white/10'}`}
                                                >
                                                    <BsLightbulbFill size={32} />
                                                </button>
                                                <p className="text-[9px] font-black text-white uppercase tracking-widest text-center">{isNeuroTransfer ? "SENTIENT POINTER ON" : "POINTER OFF"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* GUIDANCE FUSION ENGINE */}
                                <div className={`bg-gradient-to-br transition-all duration-1000 rounded-[2.8rem] p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden ${useVedas ? 'from-amber-800 via-amber-900 to-amber-950' : 'from-indigo-600 via-indigo-800 to-indigo-950'}`}>
                                    <div className="flex justify-between items-center mb-10 relative z-10">
                                        <h4 className="text-2xl font-black flex items-center gap-4 tracking-tighter italic">
                                            <BsChatQuoteFill className="text-white/60" /> Sentinel Advice
                                        </h4>
                                        <button
                                            onClick={() => setUseVedas(!useVedas)}
                                            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-700 border ${useVedas ? 'bg-white text-amber-900 shadow-2xl scale-110' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
                                        >
                                            {useVedas ? "🌿 SINGULARITY VEDAS ACTIVE" : "AI MODERN ENGINE"}
                                        </button>
                                    </div>
                                    <div className="min-h-[140px] mb-12 relative z-10">
                                        <p className="text-3xl font-medium leading-[1.5] italic opacity-95 tracking-tight group-hover:scale-105 transition-transform origin-left">
                                            "{useVedas ? vedasGuidance[alertStep] : aiGuidance[alertStep]}"
                                        </p>
                                    </div>
                                    <div className="flex gap-2 relative z-10">
                                        {aiGuidance.map((_, i) => (
                                            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-700 ${i <= alertStep ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,1)]' : 'bg-white/10'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: BLACK BOX & LIFE STATUS */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-slate-950 rounded-[2.5rem] p-8 text-slate-400 h-[600px] shadow-2xl border border-slate-900 flex flex-col group/log overflow-hidden">
                                    <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                        <BsFileEarmarkMedicalFill className="text-indigo-400 text-2xl" /> Singularity Log
                                    </h4>
                                    <div className="flex-1 overflow-y-auto space-y-6 pr-3 scrollbar-hide custom-scrollbar">
                                        {emergencyLogs.slice().reverse().map((log, i) => (
                                            <div key={i} className="flex gap-4 animate-fade-in border-l-2 border-slate-800 pl-6 relative group/litem">
                                                <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,1)] group-hover/litem:scale-150 transition-all duration-500"></div>
                                                <div>
                                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1.5">{log.time}</p>
                                                    <p className="text-xs font-black text-slate-100 leading-relaxed tracking-tight group-hover/litem:text-white transition-colors">{log.msg}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mt-8 w-full py-4 bg-indigo-600 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl hover:bg-indigo-500 transition-all hover:-translate-y-1 active:scale-95 border border-indigo-500/50">
                                        EXPORT SINGULARITY PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* FINAL RESCUE TUNNEL STATUS */}
                        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-12 justify-between relative overflow-hidden group/final">
                            <div className="absolute top-0 left-0 w-3 h-full bg-emerald-500 group-hover/final:w-6 transition-all duration-700"></div>
                            <div className="flex items-center gap-10">
                                <div className="w-28 h-28 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border border-emerald-100 relative group-hover/final:rotate-6 transition-all duration-500">
                                    <BsTruck className="animate-[bounce_2s_infinite]" />
                                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[8px] font-black px-3 py-1 rounded-full animate-pulse shadow-lg">LIVE TRIAGE</div>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                        Advanced Life Support Unit
                                        <BsActivity className="text-rose-500 text-2xl animate-pulse" />
                                    </h5>
                                    <p className="text-emerald-600 font-black uppercase text-xs tracking-[0.4em] opacity-80 italic">Predictive Routing: Hospital Bypass Engaged</p>
                                </div>
                            </div>
                            <div className="text-center md:text-right border-l-4 border-slate-50 pl-12">
                                <p className="text-7xl font-black text-slate-900 tracking-tighter leading-none group-hover/final:scale-105 transition-transform duration-700">3:12</p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em] mt-4">Precise Arrival Mins</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
                .animate-slide-up { animation: slideUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-spin-slow { animation: spin 15s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default CaregiverPanic;
