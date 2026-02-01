import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsStars, BsCpuFill, BsActivity, BsLightningFill,
    BsChatSquareQuoteFill, BsShieldCheck, BsPlusLg, BsX, BsHeartFill, BsLungs
} from 'react-icons/bs';

const specializedAis = [
    {
        id: 'cardio',
        name: 'Specialist Cardio-AI',
        role: 'Cardiac & Hemodynamics',
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/20',
        icon: <BsHeartFill />
    },
    {
        id: 'neuro',
        name: 'Specialist Neuro-AI',
        role: 'Neural & Stress Patterns',
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        icon: <BsCpuFill />
    },
    {
        id: 'gastro',
        name: 'Specialist Gastro-AI',
        role: 'Internal & Metabolic Functions',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        icon: <BsActivity />
    }
];

const NeuralBoard = () => {
    const [complexSymptom, setComplexSymptom] = useState('');
    const [isDebating, setIsDebating] = useState(false);
    const [debateLogs, setDebateLogs] = useState([]);
    const [consensus, setConsensus] = useState(0);
    const [activeSpeaker, setActiveSpeaker] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [neuralInsight, setNeuralInsight] = useState("Submit your case and let the Neural Board decide.");
    const logEndRef = useRef(null);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const scrollToBottom = () => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [debateLogs]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);


    const startDebate = () => {
        if (!complexSymptom || isDebating) return;

        // Clean up any existing timers
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        setIsDebating(true);
        setScanning(true);
        setDebateLogs([]);
        setConsensus(5);
        setNeuralInsight("Extracting patient records. Case DNA scanning in progress...");

        // Scenario: Scanning Phase
        timeoutRef.current = setTimeout(() => {
            setScanning(false);
            setConsensus(15);
            setNeuralInsight("Scan complete. Convoking the Board Experts now.");

            const script = [
                { speaker: 'cardio', text: "Scanning the vitals cluster. Initial heart rate variability is slightly irregular.", insight: "Heart rate variability is irregular. Cardio-AI is analyzing." },
                { speaker: 'neuro', text: "I agree with Cardio-AI. Neural firing in the prefrontal cortex suggests high-cortisol stress markers as well.", insight: "Neuro-AI suggests high stress levels affecting neural patterns." },
                { speaker: 'gastro', text: "Wait. Gastro-analysis suggests a pH imbalance. Stress might be secondary to a severe gastric reflux triggering somatic chest pain.", insight: "Wait! The root cause could be acidity. Gastric issues might be causing chest pain." },
                { speaker: 'cardio', text: "Interesting. Cardio-logic check... Yes, acid reflux can mimic angina symptoms. Increasing consensus.", insight: "Acidity and Heart Pain often mimic each other. Consensus is increasing." },
                { speaker: 'neuro', text: "Syncing findings. The headache is likely a 'Neural Tension Migraine' triggered by the gastric acidity. It's a cross-domain link.", insight: "So the headache is also due to acidity. Everything is linked." },
                { speaker: 'gastro', text: "Final check: Treatment should focus on antacids + neural relaxation therapy. 100% agreement reached.", insight: "Final decision: Antacids and rest. The Board is 100% sure." }
            ];

            let i = 0;
            intervalRef.current = setInterval(() => {
                if (i < script.length) {
                    const currentLine = script[i];
                    setActiveSpeaker(currentLine.speaker);
                    setDebateLogs(prev => [...prev, currentLine]);
                    setNeuralInsight(currentLine.insight || "");
                    setConsensus(prev => Math.min(prev + 15, 100));
                    i++;
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsDebating(false);
                    setActiveSpeaker(null);
                }
            }, 3000);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <BsCpuFill className="text-indigo-400 animate-pulse" />
                        <span className="font-black uppercase tracking-[0.3em] text-[10px]">Neural Boardroom v1.0</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Sidebar: Specialized AI Avatars */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white/[0.02] rounded-[3rem] p-10 border border-white/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none"></div>
                                <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
                                    <BsStars className="text-indigo-400" />
                                    The Board
                                </h2>

                                <div className="space-y-4 relative z-10">
                                    {specializedAis.map(ai => (
                                        <div
                                            key={ai.id}
                                            className={`p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden ${activeSpeaker === ai.id ? `${ai.bg} ${ai.border} scale-105 shadow-[0_0_30px_rgba(99,102,241,0.1)]` : 'bg-white/5 border-white/5 opacity-50'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl ${ai.bg} flex items-center justify-center ${ai.color}`}>
                                                    {ai.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`font-black text-sm ${ai.color}`}>{ai.name}</h3>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ai.role}</p>
                                                </div>
                                                {activeSpeaker === ai.id && (
                                                    <div className="flex gap-0.5 items-end h-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-1 rounded-full ${ai.color.replace('text', 'bg')} animate-pulse`}
                                                                style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Neural Core SVG */}
                                <div className="mt-12 relative h-40 flex items-center justify-center">
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <defs>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Core Circle */}
                                        <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
                                        <circle
                                            cx="100" cy="100" r="20"
                                            fill="rgba(99,102,241,0.1)"
                                            stroke="#6366f1"
                                            strokeWidth="2"
                                            className="animate-pulse"
                                            filter="url(#glow)"
                                        />

                                        {/* Connection Lines */}
                                        {isDebating && activeSpeaker && (
                                            <g className="animate-fade-in">
                                                <line
                                                    x1="100" y1="80"
                                                    x2={activeSpeaker === 'cardio' ? '140' : activeSpeaker === 'neuro' ? '60' : '100'}
                                                    y2={activeSpeaker === 'cardio' ? '40' : activeSpeaker === 'neuro' ? '40' : '160'}
                                                    stroke="#6366f1"
                                                    strokeWidth="2"
                                                    strokeDasharray="4 4"
                                                    className="animate-[dash_2s_linear_infinite]"
                                                />
                                            </g>
                                        )}
                                    </svg>

                                    {/* Organ Hologram Pulse */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {activeSpeaker === 'cardio' && <BsHeartFill size={40} className="text-rose-500/40 animate-ping" />}
                                        {activeSpeaker === 'neuro' && <BsCpuFill size={40} className="text-indigo-500/40 animate-ping" />}
                                        {activeSpeaker === 'gastro' && <BsEggFried size={40} className="text-amber-500/40 animate-ping" />}
                                    </div>
                                </div>

                                <div className="mt-8 p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 text-center">
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Board Consensus Score</p>
                                    <div className="text-5xl font-black text-white tracking-tighter mb-4">{consensus}%</div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000 ease-out"
                                            style={{ width: `${consensus}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Discussion Area */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {/* Input Field */}
                            <div className="bg-white/[0.02] rounded-[3rem] p-10 border border-white/10 relative">
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    <BsChatSquareQuoteFill className="text-blue-400" />
                                    Case Submission
                                </h2>
                                <p className="text-slate-400 text-sm font-bold mb-8">Describe your complex medical symptoms below. Our AI board will analyze the cross-domain links.</p>

                                <div className="relative group">
                                    <textarea
                                        value={complexSymptom}
                                        onChange={(e) => setComplexSymptom(e.target.value)}
                                        placeholder="Describe your symptoms (e.g., Chest pain followed by recurring headaches...)"
                                        className="w-full bg-slate-900 border border-white/5 rounded-[2rem] p-8 text-white focus:outline-none focus:border-indigo-500/50 transition-all min-h-[150px] resize-none font-medium"
                                    />
                                    <button
                                        disabled={isDebating || !complexSymptom}
                                        onClick={startDebate}
                                        className={`absolute bottom-6 right-6 px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all flex items-center gap-3 ${isDebating || !complexSymptom ? 'bg-slate-800 text-slate-600' : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95'}`}
                                    >
                                        {isDebating ? 'Debating Case...' : 'Convene Board'} <BsLightningFill />
                                    </button>
                                </div>
                            </div>

                            {/* Live Debate Thread */}
                            <div className="grid grid-cols-12 gap-6 h-[500px]">
                                <div className="col-span-8 bg-white/[0.02] rounded-[3rem] p-10 border border-white/10 overflow-hidden flex flex-col">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-xl font-black flex items-center gap-3 uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            Neural Discussion Thread
                                        </h2>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Cross-Domain Debate</div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                                        {debateLogs.length === 0 && !isDebating && (
                                            <div className="h-full flex flex-col items-center justify-center opacity-20">
                                                <BsCpuFill size={60} className="mb-6" />
                                                <p className="font-black uppercase tracking-widest text-xs">Waiting for case convening...</p>
                                            </div>
                                        )}
                                        {scanning && (
                                            <div className="h-full flex flex-col items-center justify-center gap-6 animate-pulse">
                                                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                                                <p className="font-black uppercase tracking-widest text-xs text-indigo-400">Extracting Patient DNA Sequence...</p>
                                            </div>
                                        )}
                                        {debateLogs.map((log, idx) => {
                                            const ai = specializedAis.find(a => a.id === log.speaker) || specializedAis[0];
                                            return (
                                                <div key={idx} className="animate-slide-up bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${ai.color}`}>{ai.name}</span>
                                                        <span className="text-[8px] text-slate-600 font-bold uppercase">Marker: {new Date().toLocaleTimeString()}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                                                        "{log.text}"
                                                    </p>
                                                </div>
                                            );
                                        })}
                                        <div ref={logEndRef} />
                                    </div>

                                    {consensus === 100 && (
                                        <div className="mt-6 animate-fade-in p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                                    <BsShieldCheck size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Board Consensus Reached</h4>
                                                    <p className="text-[10px] text-slate-400 font-medium italic">High probability cross-domain diagnosis ready.</p>
                                                </div>
                                            </div>
                                            <button className="bg-emerald-600 px-6 py-2 rounded-xl font-black uppercase text-[8px] tracking-widest hover:bg-emerald-500 transition-colors">Generate Neural Report</button>
                                        </div>
                                    )}
                                </div>

                                {/* Neural-Insight HUD */}
                                <div className="col-span-4 bg-white/[0.02] rounded-[3rem] p-8 border border-white/10 flex flex-col relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
                                    <h2 className="text-lg font-black mb-6 flex items-center gap-3 uppercase tracking-tighter relative z-10">
                                        <BsActivity className="text-blue-400 animate-pulse" />
                                        Neural Insight
                                    </h2>
                                    <div className="flex-1 bg-black/40 rounded-3xl p-6 border border-white/5 relative z-10">
                                        <p className="text-xs text-blue-200 font-bold leading-relaxed italic transition-all duration-500 overflow-y-auto max-h-full custom-scrollbar">
                                            "{neuralInsight}"
                                        </p>
                                    </div>
                                    <div className="mt-6 text-center relative z-10">
                                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">AI Translation HUD v4.5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes dash {
                    to { stroke-dashoffset: -16; }
                }
                .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default NeuralBoard;
