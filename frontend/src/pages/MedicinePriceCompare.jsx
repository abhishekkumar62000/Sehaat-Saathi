import React, { useState, useEffect, useMemo, useRef } from 'react';
import { medicinedb } from '../utils/medicineData';
import {
    BsSearch, BsCpu, BsLightningFill, BsCartPlus, BsCheckCircleFill,
    BsGraphDownArrow, BsShieldCheck, BsCapsule, BsQrCodeScan, BsRobot,
    BsBuildings, BsGeoAltFill, BsArrowRightShort, BsStars, BsMicFill,
    BsCameraFill, BsShieldExclamation, BsFileEarmarkMedical, BsCoin,
    BsBoxSeam, BsCursorFill, BsInfoCircle, BsLightning, BsActivity,
    BsThermometerHalf, BsDropletFill, BsMap
} from 'react-icons/bs';

const MedicinePriceCompare = () => {
    // --- BASIC STATES ---
    const [searchTerm, setSearchTerm] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [selectedMed, setSelectedMed] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [compareList, setCompareList] = useState([]);
    const [activeTab, setActiveTab] = useState('price');

    // --- PHASE 2/3 STATES ---
    const [isListening, setIsListening] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [interactionWarning, setInteractionWarning] = useState(null);
    const [userCoins, setUserCoins] = useState(1250);
    const [showCoinPop, setShowCoinPop] = useState(false);
    const [isDeliveryDispatching, setIsDeliveryDispatching] = useState(false);
    const [activeBodyPart, setActiveBodyPart] = useState(null);
    const fileInputRef = useRef(null);

    // --- PHASE 4: SENTINEL STATES ---
    const [vitals, setVitals] = useState({ bpm: 72, spo2: 98, bp: "120/80" });
    const [showEfficacyInfo, setShowEfficacyInfo] = useState(false);

    // SIMULATED LIVE VITALS ENGINE
    useEffect(() => {
        const interval = setInterval(() => {
            setVitals(prev => ({
                ...prev,
                bpm: prev.bpm + (Math.random() > 0.5 ? 1 : -1)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // --- SEARCH LOGIC ---
    const filteredMeds = useMemo(() => {
        if (!searchTerm) return [];
        return medicinedb.filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm]);

    const handleSearch = (med) => {
        setSearchTerm(med.name);
        startNeuralScan(med);
    };

    // --- AI MODULES: VOICE & UPLOAD ---
    const toggleVoiceSearch = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Sentience Voice Module not supported.");
            return;
        }
        if (isListening) { setIsListening(false); return; }
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false; recognition.lang = 'en-US';
        setIsListening(true);
        recognition.start();
        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setSearchTerm(transcript);
            setIsListening(false);
            const match = medicinedb.find(m => m.name.toLowerCase().includes(transcript.toLowerCase()));
            if (match) handleSearch(match);
        };
        recognition.onend = () => setIsListening(false);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setShowUploadModal(true); setUploadProgress(0);
            let p = 0;
            const inter = setInterval(() => {
                p += 10; setUploadProgress(p);
                if (p >= 100) {
                    clearInterval(inter); setShowUploadModal(false);
                    const mock = medicinedb.find(m => m.name.includes("Augmentin")) || medicinedb[0];
                    setSearchTerm(mock.name); startNeuralScan(mock);
                }
            }, 100);
        }
    };

    // --- CORE SCAN ENGINE ---
    const startNeuralScan = (med) => {
        setIsScanning(true); setScanProgress(0); setShowResults(false);
        setSelectedMed(med); setInteractionWarning(null);

        // React vitals to medicine
        if (med.name.toLowerCase().includes('caffeine') || med.name === 'Aspirin') {
            setVitals(v => ({ ...v, bpm: 85 }));
        }

        if (['Aspirin', 'Warfarin', 'Ibuprofen'].includes(med.name)) {
            setTimeout(() => setInteractionWarning({ message: `${med.name} detected. Bio-Shield alerting interaction risk.` }), 1200);
        }

        let p = 0;
        const inter = setInterval(() => {
            p += Math.random() * 25;
            if (p >= 100) {
                p = 100; clearInterval(inter);
                setIsScanning(false); setShowResults(true);
                generateComparisonData(med);
            }
            setScanProgress(Math.floor(p));
        }, 200);
    };

    const generateComparisonData = (med) => {
        const competitors = [
            { name: "Apollo Pharmacy", price: Math.round(med.price * 1.15), stock: "In Stock" },
            { name: "Tata 1mg", price: Math.round(med.price * 1.08), stock: "In Stock" },
            { name: "NetMeds", price: Math.round(med.price * 1.10), stock: "Stock Alert" }
        ];
        const generics = medicinedb.filter(m => m.category === med.category && m.price < med.price && m.name !== med.name).slice(0, 3);
        setCompareList({ main: med, competitors, generics });
    };

    // --- LOGISTICS HUD ---
    const dispatchDrone = () => {
        setIsDeliveryDispatching(true);
        setTimeout(() => {
            setIsDeliveryDispatching(false);
            alert("Sentinel Drone Path Locked. Delivery Initiated.");
        }, 6000);
    };

    const bodyPartEffects = {
        'Head': ['Migraine Relief', 'Brain Fog Control'],
        'Heart': ['Cardio Stability', 'Pulse Modulation'],
        'Stomach': ['GI Lining Protection', 'Acidity Shield']
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden pt-24 pb-24">

            {/* AMBIENT CYBER DECK BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse"></div>
                {interactionWarning && <div className="absolute inset-0 border-[30px] border-rose-500/10 animate-pulse duration-1000"></div>}
            </div>

            {/* SENTINEL HUD: COINS & VITALS */}
            <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4">
                {/* Coins */}
                <div className="px-5 py-3 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/5 flex items-center gap-4 shadow-2xl animate-fade-in">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <BsCoin className="text-xl animate-spin-slow" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500"><span style={{ color: "#FF9933" }}>Sehaat</span> Credits</p>
                        <p className="text-lg font-black text-white">{userCoins}</p>
                    </div>
                </div>

                {/* Live Vitals Sidebar */}
                <div className="px-5 py-5 rounded-3xl bg-black/60 backdrop-blur-3xl border border-white/5 flex flex-col gap-6 shadow-2xl animate-slide-left">
                    <div className="flex items-center gap-4 group cursor-help">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 transition-all group-hover:text-white">
                            <BsActivity className="text-xl animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Live Pulse</p>
                            <p className="text-lg font-black text-rose-200">{vitals.bpm} <span className="text-[10px] text-rose-500">BPM</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                            <BsDropletFill className="text-xl" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">SpO2 Hub</p>
                            <p className="text-lg font-black text-cyan-200">{vitals.spo2}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-7xl">

                {/* HEADER v11.0 */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">Sentinel Pulse v11.0</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
                        Bio<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-500">Matrix</span>
                    </h1>
                </div>

                {/* QUANTUM SEARCH CORE */}
                <div className="max-w-3xl mx-auto relative mb-20 z-50">
                    <div className={`relative bg-slate-900/30 backdrop-blur-3xl rounded-[2.5rem] border ${interactionWarning ? 'border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.2)]' : 'border-white/10'} p-3 flex items-center group transition-all duration-700`}>
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-2xl transition-all ${isListening ? 'bg-rose-500 text-white' : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black'}`}>
                            {isListening ? <BsMicFill className="animate-pulse" /> : (isScanning ? <BsCpu className="animate-spin" /> : <BsSearch />)}
                        </div>
                        <input
                            type="text"
                            placeholder={isListening ? "Listening for molecules..." : "Scan molecule or upload prescription..."}
                            className="flex-1 bg-transparent border-none outline-none px-8 text-2xl font-black placeholder:text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="flex items-center gap-2 pr-4">
                            <button onClick={toggleVoiceSearch} className="p-4 rounded-full hover:bg-white/5 text-slate-500 hover:text-cyan-400 transition-all"><BsMicFill /></button>
                            <button onClick={() => fileInputRef.current.click()} className="p-4 rounded-full hover:bg-white/5 text-slate-500 hover:text-indigo-400 transition-all"><BsCameraFill /></button>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </div>
                    </div>

                    {/* DYNAMIC SUGGESTIONS HUD */}
                    {searchTerm && !isScanning && !showResults && filteredMeds.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-6 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl animate-slide-down">
                            {filteredMeds.map((med, i) => (
                                <div key={i} onClick={() => handleSearch(med)} className="p-6 border-b border-white/5 hover:bg-cyan-500/10 cursor-pointer flex justify-between items-center group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-all font-black text-xs">M-{i + 1}</div>
                                        <div><p className="font-black text-xl text-white">{med.name}</p><p className="text-[10px] uppercase text-cyan-500 tracking-widest font-black">{med.category}</p></div>
                                    </div>
                                    <BsLightningFill className="text-slate-700 group-hover:text-amber-500 transition-all" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MODALS: SCANNING & UPLOAD */}
                {showUploadModal && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl"><div className="text-center space-y-8 animate-fade-in"><div className="relative w-72 h-72 mx-auto"><div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div><div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div><div className="absolute inset-0 flex items-center justify-center text-8xl text-cyan-500"><BsFileEarmarkMedical className="animate-pulse" /></div></div><h3 className="text-4xl font-black italic uppercase italic">Neural OCR Activated</h3><p className="text-cyan-500 font-black tracking-widest text-xs animate-pulse">Scanning Handwritten Biological Data...</p></div></div>}

                {/* NEURAL-PATH 3D LOGISTICS HUD */}
                {isDeliveryDispatching && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#02040a] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,transparent_70%)] opacity-50"></div>
                        <div className="relative text-center z-10 space-y-12">
                            <div className="relative inline-block scale-150">
                                <div className="w-48 h-48 border-[1px] border-cyan-500/20 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BsBoxSeam className="text-6xl text-cyan-400 animate-bounce" />
                                </div>
                                <svg className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none">
                                    <path d="M 0 100 Q 100 0 200 100" fill="transparent" stroke="cyan" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                                </svg>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-6xl font-black italic text-white uppercase tracking-tighter">Neural Path Lock</h3>
                                <div className="flex justify-center gap-12">
                                    <div className="text-left"><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Altitude</p><p className="text-2xl font-black text-cyan-500">420.5m</p></div>
                                    <div className="text-left"><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Velocity</p><p className="text-2xl font-black text-white">88km/h</p></div>
                                    <div className="text-left"><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">ETA</p><p className="text-2xl font-black text-amber-500 animate-pulse">06:45s</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN SENTINEL INTERFACE */}
                {showResults && selectedMed && (
                    <div className="grid lg:grid-cols-4 gap-8 animate-slide-up">

                        {/* LEFT: INTERACTIVE ANATOMY */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <h2 className="text-2xl font-black uppercase italic mb-10 tracking-tighter">Anatomy<span className="text-cyan-500">-X</span></h2>

                                <div className="relative w-40 h-80 mx-auto bg-slate-800/10 rounded-full border border-white/5 flex items-center justify-center mb-10 overflow-hidden">
                                    <div className="absolute inset-0 flex flex-col items-center py-6">
                                        {['Head', 'Heart', 'Stomach'].map((part) => (
                                            <div
                                                key={part}
                                                onMouseEnter={() => setActiveBodyPart(part)} onMouseLeave={() => setActiveBodyPart(null)}
                                                className={`transition-all duration-500 cursor-none mb-4 ${part === 'Head' ? 'w-10 h-10 rounded-full' : part === 'Heart' ? 'w-16 h-16 rounded-2xl' : 'w-14 h-12 rounded-xl'} border-2 ${activeBodyPart === part ? 'bg-cyan-500/30 border-cyan-400 scale-125 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/5 border-white/10'}`}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_100%,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
                                </div>

                                <div className="h-16 flex flex-col justify-center">
                                    {activeBodyPart ? (
                                        <div className="animate-fade-in text-xs"><p className="font-black text-cyan-400 uppercase tracking-widest mb-1">{activeBodyPart} Scope</p><p className="text-slate-400 font-medium">{bodyPartEffects[activeBodyPart]?.join(' | ')}</p></div>
                                    ) : (
                                        <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.2em] animate-pulse">Bio-Scan Active: Hover Anatomy</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CENTER: QUANTUM EFFICACY CHART & DATA */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Efficacy Graph */}
                            <div className="bg-slate-900/60 border border-white/5 p-8 rounded-[3rem] space-y-6 group">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"><BsActivity className="text-cyan-500" /> Quantum Efficacy Chart</h3>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                    </div>
                                </div>

                                <div className="h-44 w-full relative group/chart">
                                    <svg className="w-full h-full overflow-visible">
                                        <defs>
                                            <linearGradient id="curve" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 160 Q 150 40 300 100 T 600 80" fill="url(#curve)" stroke="#06b6d4" strokeWidth="4" className="animate-[dash_3s_ease-in-out_infinite]" />
                                        <circle cx="150" cy="40" r="4" fill="white" className="animate-pulse" />
                                    </svg>
                                    <div className="absolute top-10 left-[140px] bg-cyan-900/80 backdrop-blur-md border border-cyan-500/30 p-2 rounded-xl text-[10px] font-black opacity-0 group-hover/chart:opacity-100 transition-all">Peak Concentration: 85%</div>
                                </div>

                                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest"><span>0h (Administered)</span><span>12h (Active)</span><span>24h (Metabolized)</span></div>

                                <div className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
                                    <BsInfoCircle className="text-cyan-500 text-xl" />
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        <span className="text-white font-black">Sentient-GPT Pro Tip:</span> {selectedMed.name} reaches peak bioavailability in 2 hours. Avoid dairy for maximum absorption.
                                    </p>
                                </div>
                            </div>

                            {/* Comparison Hub */}
                            <div className="space-y-4">
                                <div className="flex bg-slate-900 p-2 rounded-[2rem] border border-white/5 w-fit">
                                    {['price', 'substitutes'].map(t => (
                                        <button key={t} onClick={() => setActiveTab(t)} className={`px-12 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${activeTab === t ? 'bg-cyan-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white'}`}>{t === 'price' ? 'Price Shield' : 'Neural Substitutes'}</button>
                                    ))}
                                </div>

                                {activeTab === 'price' ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {compareList.competitors.map((c, i) => (
                                            <div key={i} className="p-6 bg-slate-900/30 border border-white/5 rounded-[2rem] hover:border-cyan-500/30 transition-all flex justify-between items-center group">
                                                <div><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{c.name}</p><p className="text-2xl font-black">₹{c.price}</p></div>
                                                <div className="text-right"><p className={`text-[10px] font-black uppercase ${c.stock === 'In Stock' ? 'text-emerald-500' : 'text-rose-500'}`}>{c.stock}</p><p className="text-rose-500 text-[10px] font-black">+{Math.round((c.price - selectedMed.price) / selectedMed.price * 100)}% Fee</p></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {compareList.generics.map((g, i) => (
                                            <div key={i} className="p-6 bg-slate-900 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-indigo-500/50 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><BsRobot className="text-2xl" /></div>
                                                    <div><h4 className="text-2xl font-black italic uppercase italic tracking-tighter">{g.name}</h4><div className="flex items-center gap-2 mt-1"><BsCoin className="text-amber-500" /><span className="text-[10px] font-black text-emerald-500 uppercase">+500 Credits</span></div></div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right"><p className="text-3xl font-black">₹{g.price}</p><p className="text-[9px] font-black text-indigo-500 uppercase">Saving Matrix</p></div>
                                                    <button onClick={() => { setUserCoins(c => c + 500); handleSearch(g); }} className="px-8 py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Switch & Claim</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: BIO-SHIELD & DISPATCH */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Bio-Shield Visualizer */}
                            <div className={`p-8 rounded-[3rem] border transition-all duration-1000 ${interactionWarning ? 'bg-rose-950/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-pulse' : 'bg-slate-900/40 border-white/5 opacity-50'}`}>
                                <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <BsShieldExclamation className={interactionWarning ? 'text-rose-500 animate-bounce' : 'text-slate-500'} /> Bio-Shield Alert
                                </h3>
                                {interactionWarning ? (
                                    <div className="space-y-4">
                                        <p className="text-rose-200 text-sm font-bold leading-relaxed">{interactionWarning.message}</p>
                                        <div className="h-1 w-full bg-rose-500/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 animate-[progress_1s_linear_infinite]"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-slate-600 text-[10px] font-black uppercase italic">Scanning Interaction Matrix...</p>
                                )}
                            </div>

                            {/* Sentinel Dispatcher */}
                            <div className="bg-gradient-to-br from-cyan-600 to-indigo-700 p-10 rounded-[4rem] text-center shadow-3xl group relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <BsMap className="text-5xl text-white/20 mx-auto mb-6 group-hover:scale-110 transition-all" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200 mb-2">Neural Hub Terminal</p>
                                <h3 className="text-3xl font-black italic uppercase italic text-white mb-10 tracking-tighter italic">₹{selectedMed.price}</h3>
                                <button onClick={dispatchDrone} className="w-full py-6 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:translate-y-[-5px] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                                    Secure Dispatch <BsLightningFill className="text-amber-500 animate-pulse" />
                                </button>
                                <p className="mt-6 text-[10px] font-black text-cyan-100/50 uppercase italic tracking-widest animate-pulse">Sentinel Path-Lock Enabled</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                @keyframes dash { to { stroke-dashoffset: 0; } }
                path { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
                @keyframes progress { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
                .animate-slide-left { animation: slide-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
                @keyframes slide-left { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
                .animate-slide-down { animation: slide-down 0.5s ease-out; }
                @keyframes slide-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-slide-up { animation: slide-up 0.8s ease-out; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 1s ease-out; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default MedicinePriceCompare;
