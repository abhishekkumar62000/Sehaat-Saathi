import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsStars, BsActivity, BsShieldCheck,
    BsCloudUpload, BsFileEarmarkMedical, BsTranslate,
    BsInfoCircleFill, BsLightningFill, BsCheck2Circle,
    BsExclamationTriangleFill, BsEyeFill, BsVolumeUpFill,
    BsPlayFill, BsStopFill, BsSoundwave, BsHeartPulseFill,
    BsCapsule, BsCartCheck, BsFileEarmarkText, BsQuestionCircleFill,
    BsXCircleFill, BsArrowRight
} from 'react-icons/bs';

const ReportInterpreter = () => {
    const [step, setStep] = useState(1); // 1: Upload, 2: Scanning, 3: Results
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const [scanProgress, setScanProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('overview');
    const [activeSubTab, setActiveSubTab] = useState('analysis'); // analysis, prescription, lifestyle
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [matrixText, setMatrixText] = useState([]);
    const [whatIfValue, setWhatIfValue] = useState(50);

    // Matrix Scan Effect Logic
    useEffect(() => {
        if (step === 2) {
            const fragments = [
                "Hb: 12.5 g/dL", "GLUCOSE: 115 mg/dL", "CHOL: 210 mg/dL",
                "CREAT: 0.9", "PLATELETS: 250k", "WBC: 7.2", "LYMPH: 30%",
                "ALT: 25 U/L", "AST: 22 U/L", "BUN: 15 mg/dL"
            ];

            const interval = setInterval(() => {
                setMatrixText(prev => {
                    const newText = [...prev, {
                        id: Math.random(),
                        val: fragments[Math.floor(Math.random() * fragments.length)],
                        top: Math.random() * 80 + 10 + "%",
                        left: Math.random() * 80 + 10 + "%"
                    }];
                    return newText.slice(-8);
                });
            }, 300);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            startScanning();
        }
    };

    const startScanning = () => {
        setStep(2);
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                setScanProgress(100);
                clearInterval(interval);
                setTimeout(() => setStep(3), 1000);
            } else {
                setScanProgress(progress);
            }
        }, 300);
    };

    const speakSummary = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
            utterance.rate = 1.0;
            utterance.pitch = 1.1;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const reportData = {
        en: {
            overview: "Your report shows mostly normal values with a few markers that need attention. Don't worry, it's nothing critical but good to monitor.",
            markers: [
                { id: 'hb', name: "Hemoglobin (Hb)", value: "12.5 g/dL", status: "Normal", range: "12.0 - 15.5", detail: "Perfectly within range. Your blood's oxygen-carrying capacity is healthy.", organ: 'heart' },
                { id: 'sugar', name: "Fast Blood Sugar", value: "115 mg/dL", status: "High", range: "70 - 100", detail: "Slightly elevated. This indicates a pre-diabetic stage. Reduce sugar intake and walk daily.", organ: 'pancreas' },
                { id: 'chol', name: "Total Cholesterol", value: "210 mg/dL", status: "Borderline High", range: "< 200", detail: "Just above the limit. Try avoiding deep-fried food for the next few weeks.", organ: 'arteries' },
                { id: 'creat', name: "Serum Creatinine", value: "0.9 mg/dL", status: "Normal", range: "0.7 - 1.3", detail: "Your kidney function appears to be in excellent condition.", organ: 'kidneys' }
            ],
            dos: [
                "Drink 1 glass of warm water with lemon every morning.",
                "Include Fiber-rich foods like oats and lentils.",
                "30 mins Brisk walking is non-negotiable for Sugar control.",
                "Monitor BP thrice a week if you feel dizzy."
            ],
            donts: [
                "Avoid white sugar and processed sweets completely for now.",
                "Limit salt intake to less than 5g per day.",
                "Don't skip breakfast; it destabilizes your glucose baseline.",
                "Avoid heavy snacking after 8:00 PM."
            ],
            prescription: [
                { name: "Metformin (if prescribed)", dosage: "500mg", schedule: "Twice a day", instruction: "Take it after breakfast and after dinner. Do not skip.", pharmacyLink: "/pharmacy-hub" },
                { name: "Multivitamin", dosage: "1 Tablet", schedule: "Once a day", instruction: "Take after lunch with water. Helps in fatigue management.", pharmacyLink: "/pharmacy-hub" }
            ],
            realUsecase: "If you feel excessive thirst or frequent urination, these are real signs of the high sugar in your report. Start the walking protocol immediately."
        },
        hi: {
            overview: "Aapki report mein zyadatar values normal hain, lekin kuch cheezon par dhyan dene ki zaroorat hai. Ghabraiye nahi, bas thoda parhez zaroori hai.",
            markers: [
                { id: 'hb', name: "Hemoglobin (Hb)", value: "12.5 g/dL", status: "Normal", range: "12.0 - 15.5", detail: "Bilkul sahi hai. Aapke khoon mein oxygen le jaane ki kshamta acchi hai.", organ: 'heart' },
                { id: 'sugar', name: "Fast Blood Sugar", value: "115 mg/dL", status: "High", range: "70 - 100", detail: "Thoda badha hua hai. Ye pre-diabetic sanket hai. Meetha kam karein aur walk shuru karein.", organ: 'pancreas' },
                { id: 'chol', name: "Total Cholesterol", value: "210 mg/dL", status: "Borderline High", range: "< 200", detail: "Limit se thoda upar hai. Agle kuch hafton tak tala-bhuna khana band karein.", organ: 'arteries' },
                { id: 'creat', name: "Serum Creatinine", value: "0.9 mg/dL", status: "Normal", range: "0.7 - 1.3", detail: "Aapki kidney sahi tareeke se kaam kar rahi hai.", organ: 'kidneys' }
            ],
            dos: [
                "Roz subah garam paani aur nimbu piyein.",
                "Khane mein fiber, jaise daliya aur dal shamil karein.",
                "Sugar control ke liye 30 minute tez chalna zaroori hai.",
                "Agar chakkar aaye toh hafte mein 3 baar BP check karein."
            ],
            donts: [
                "Safar shakkar aur meethai se bilkul door rahein.",
                "Namak ka sevan din bhar mein 5 gram se kam rakhein.",
                "Nashta kabhi na chhodein; isse sugar level bigadta hai.",
                "Raat 8 baje ke baad bhari khana na khayein."
            ],
            prescription: [
                { name: "Metformin (agar doctor kahe)", dosage: "500mg", schedule: "Din mein do baar", instruction: "Nashte aur dinner ke baad lein. Yaad se.", pharmacyLink: "/pharmacy-hub" },
                { name: "Multivitamin", dosage: "1 Goli", schedule: "Din mein ek baar", instruction: "Lunch ke baad paani ke saath lein. Thakan kam hogi.", pharmacyLink: "/pharmacy-hub" }
            ],
            realUsecase: "Agar aapko bohot pyaas lag rahi hai ya baar-baar toilet jana pad raha hai, toh ye report mein badhi hui sugar ka asar hai. Turant walk shuru karein."
        }
    };

    const currentData = reportData[language];

    const BioAnatomy = ({ highlightedOrgan }) => (
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <path d="M100 20 C120 20 135 35 135 55 C135 75 120 90 100 90 C80 90 65 75 65 55 C65 35 80 20 100 20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <circle cx="110" cy="140" r="15" fill={highlightedOrgan === 'heart' ? '#10b981' : 'rgba(255,255,255,0.05)'} className={highlightedOrgan === 'heart' ? 'animate-pulse' : ''} />
            <path d="M90 120 L110 300 M110 120 L90 300" stroke={highlightedOrgan === 'arteries' ? '#f59e0b' : 'rgba(255,255,255,0.05)'} strokeWidth="5" className={highlightedOrgan === 'arteries' ? 'animate-pulse' : ''} />
            <rect x="80" cy="190" width="40" height="15" rx="5" fill={highlightedOrgan === 'pancreas' ? '#ef4444' : 'rgba(255,255,255,0.05)'} className={highlightedOrgan === 'pancreas' ? 'animate-pulse' : ''} />
            <circle cx="80" cy="220" r="8" fill={highlightedOrgan === 'kidneys' ? '#10b981' : 'rgba(255,255,255,0.05)'} />
            <circle cx="120" cy="220" r="8" fill={highlightedOrgan === 'kidneys' ? '#10b981' : 'rgba(255,255,255,0.05)'} />
            <path d="M65 95 L135 95 L145 180 L135 250 L65 250 L55 180 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Super-Charged Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> <span className="text-[10px] font-black uppercase tracking-widest">Medical Center</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex bg-white/5 p-1 rounded-xl border border-white/5">
                            <button onClick={() => setLanguage('en')} className={`px-4 py-1.5 rounded-lg text-[8px] font-black transition-all ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}>ENGLISH</button>
                            <button onClick={() => setLanguage('hi')} className={`px-4 py-1.5 rounded-lg text-[8px] font-black transition-all ${language === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}>HINDI</button>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                            <BsStars className="text-emerald-400 animate-pulse" />
                            <span className="font-black uppercase tracking-[0.2em] text-[8px] text-emerald-400">Premium AI Diagnostic</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">

                    {step === 1 && (
                        <div className="max-w-4xl mx-auto animate-slide-up">
                            <div className="text-center mb-16">
                                <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">India's 1st AI Medical Advisor</span>
                                <h1 className="text-5xl md:text-8xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-cyan-500 to-emerald-400 bg-clip-text text-transparent leading-none tracking-tighter">
                                    COMPLETE HEALTH <br />INSIGHTS
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                                    Medical reports are just numbers until AI gives them meaning. Upload your report for an in-depth, doctor-like analysis and lifestyle protocol.
                                </p>
                            </div>

                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) { setFile(f); startScanning(); } }}
                                className={`relative group cursor-pointer transition-all duration-700 rounded-[4rem] border-2 border-dashed p-12 md:p-24 text-center flex flex-col items-center justify-center overflow-hidden
                                    ${isDragging ? 'border-emerald-500 bg-emerald-500/10 scale-[0.98] shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.03] hover:border-emerald-500/50'}
                                `}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_100%)]"></div>
                                <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-1000">
                                    <BsCloudUpload size={40} />
                                </div>
                                <h2 className="text-3xl font-black mb-4 tracking-tight">Drop Report or Prescription</h2>
                                <p className="text-slate-500 font-bold mb-10 uppercase text-[10px] tracking-widest italic">Encrypted Secure Extraction Active</p>
                                <label className="relative z-10 py-6 px-16 rounded-[2rem] bg-emerald-600 hover:bg-emerald-500 font-black uppercase text-xs tracking-[0.3em] cursor-pointer transition-all active:scale-95 shadow-2xl shadow-emerald-500/30">
                                    START NEURAL SCAN
                                    <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,image/*" />
                                </label>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in relative">
                            {matrixText.map(t => (
                                <div key={t.id} className="absolute text-[10px] font-mono text-emerald-500/40 animate-pulse pointer-events-none" style={{ top: t.top, left: t.left }}>
                                    {t.val}
                                </div>
                            ))}
                            <div className="relative inline-block mb-16">
                                <div className="absolute inset-0 bg-emerald-500/30 blur-[120px] animate-pulse"></div>
                                <div className="w-48 h-48 rounded-[3rem] border border-emerald-500/30 flex items-center justify-center relative z-10 bg-[#020617]/80 backdrop-blur-xl overflow-hidden">
                                    <BsFileEarmarkMedical size={80} className="text-emerald-400 animate-bounce" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent h-full w-full animate-[scan_2s_infinite]"></div>
                                </div>
                            </div>
                            <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Analyzing Bio-Markers...</h2>
                            <p className="text-slate-400 mb-12 font-bold italic text-lg">Cross-referencing global medical databases for your personalized Saathi guide.</p>
                            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden mb-6 p-[2px] border border-white/5 mx-auto max-w-lg">
                                <div className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="grid lg:grid-cols-12 gap-12 animate-slide-up">
                            {/* Left: Interactive Bio-Twin & Quick Actions */}
                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-[#0f172a]/50 p-10 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Neural Bio-Twin</span>
                                        </div>
                                        <button
                                            onClick={() => isSpeaking ? stopSpeaking() : speakSummary(currentData.overview)}
                                            className={`p-4 rounded-full transition-all shadow-lg active:scale-95 ${isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'}`}
                                        >
                                            {isSpeaking ? <BsStopFill /> : <BsPlayFill />}
                                        </button>
                                    </div>
                                    <div className="h-[350px] flex items-center justify-center">
                                        <BioAnatomy highlightedOrgan={activeSection !== 'overview' ? activeSection : null} />
                                    </div>
                                    <div className="mt-8 p-6 bg-white/[0.03] rounded-3xl border border-white/5 relative">
                                        <p className="text-slate-300 font-bold italic leading-relaxed text-sm">"{currentData.overview}"</p>
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"><BsVolumeUpFill size={14} /></div>
                                    </div>
                                </div>

                                {/* Ecosystem Action Hub */}
                                <div className="space-y-4">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 pl-4">Sehaat Ecosystem Hub</div>
                                    <Link to="/tele-consult" className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 transition-all">
                                        <div>
                                            <h4 className="font-black text-rose-500 group-hover:text-white transition-colors">Tele-Consult Now</h4>
                                            <p className="text-[10px] text-slate-400 group-hover:text-rose-100 transition-colors">Serious markers detected. Get a Doctor's opinion in 5 mins.</p>
                                        </div>
                                        <BsHeartPulseFill className="text-rose-500 group-hover:text-white text-3xl" />
                                    </Link>
                                    <Link to="/pharmacy-hub" className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 transition-all">
                                        <div>
                                            <h4 className="font-black text-emerald-500 group-hover:text-white transition-colors">Sehaat Pharmacy</h4>
                                            <p className="text-[10px] text-slate-400 group-hover:text-emerald-100 transition-colors">Order suggested medicines & supplements instantly.</p>
                                        </div>
                                        <BsCartCheck className="text-emerald-500 group-hover:text-white text-3xl" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Detailed Deep Analysis Section */}
                            <div className="lg:col-span-8 space-y-8">
                                {/* Enhanced Tab Navigation */}
                                <div className="flex flex-wrap gap-3 bg-[#0f172a]/80 p-2 rounded-[2.5rem] border border-white/5 sticky top-24 z-30">
                                    <button onClick={() => setActiveSubTab('analysis')} className={`flex-1 py-4 px-6 rounded-3xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${activeSubTab === 'analysis' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                                        <BsActivity /> Report Analysis
                                    </button>
                                    <button onClick={() => setActiveSubTab('prescription')} className={`flex-1 py-4 px-6 rounded-3xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${activeSubTab === 'prescription' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                                        <BsCapsule /> Prescription Guide
                                    </button>
                                    <button onClick={() => setActiveSubTab('lifestyle')} className={`flex-1 py-4 px-6 rounded-3xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${activeSubTab === 'lifestyle' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                                        <BsLightningFill /> Lifestyle Protocol
                                    </button>
                                </div>

                                {activeSubTab === 'analysis' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="flex justify-between items-end">
                                            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Deep Bio-Markers</h3>
                                            <span className="text-slate-500 text-[10px] font-black italic">Click card to sync Bio-Twin</span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {currentData.markers.map((marker, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => setActiveSection(marker.organ)}
                                                    className={`p-8 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden group ${activeSection === marker.organ ? 'bg-emerald-500/10 border-emerald-500/50 shadow-xl' : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'}`}
                                                >
                                                    <div className="flex justify-between mb-6">
                                                        <div>
                                                            <h4 className="text-xl font-black text-white">{marker.name}</h4>
                                                            <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${marker.status === 'Normal' ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/10' : 'text-rose-500 bg-rose-500/10 border border-rose-500/10'}`}>
                                                                {marker.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-2xl font-black">{marker.value}</div>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 font-bold italic leading-relaxed">"{marker.detail}"</p>
                                                    <div className="mt-6 flex justify-between items-center text-[8px] font-black text-slate-600 uppercase">
                                                        <span>Range: {marker.range}</span>
                                                        <span className="group-hover:text-emerald-400 transition-colors flex items-center gap-1">View Organic Impact <BsArrowRight /></span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Real Usecase Commentary */}
                                        <div className="bg-indigo-500/10 border border-indigo-500/20 p-8 rounded-[3rem] relative over">
                                            <h4 className="text-indigo-400 font-black text-xs uppercase mb-4 flex items-center gap-2"><BsQuestionCircleFill /> Real Experience Insight</h4>
                                            <p className="text-slate-300 font-bold italic leading-relaxed">"{currentData.realUsecase}"</p>
                                        </div>
                                    </div>
                                )}

                                {activeSubTab === 'prescription' && (
                                    <div className="space-y-8 animate-fade-in">
                                        <div className="bg-cyan-500/5 border border-cyan-500/20 p-10 rounded-[4rem]">
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-cyan-400">
                                                <BsFileEarmarkText /> SEHAAT SMART PROTOCOL
                                            </h3>
                                            <div className="space-y-6">
                                                {currentData.prescription.map((med, i) => (
                                                    <div key={i} className="bg-[#020617] p-8 rounded-[2.5rem] border border-white/5 relative group hover:border-cyan-500/30">
                                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 text-2xl"><BsCapsule /></div>
                                                                <div>
                                                                    <h4 className="text-xl font-black text-white">{med.name}</h4>
                                                                    <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{med.dosage} • {med.schedule}</div>
                                                                </div>
                                                            </div>
                                                            <Link to={med.pharmacyLink} className="py-4 px-8 rounded-2xl bg-cyan-600 hover:bg-cyan-500 font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20 text-center">Buy via Sehaat</Link>
                                                        </div>
                                                        <div className="bg-cyan-500/5 p-4 rounded-xl border border-dashed border-cyan-500/20 flex gap-3 text-xs italic text-slate-400">
                                                            <span className="text-cyan-400 font-black">Saathi Guide:</span>
                                                            "{med.instruction}"
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSubTab === 'lifestyle' && (
                                    <div className="space-y-8 animate-fade-in text-slate-800">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="bg-emerald-500/5 border border-emerald-500/20 p-10 rounded-[4rem] relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 -mr-8 -mt-8 rounded-full"></div>
                                                <h4 className="text-emerald-500 font-black text-xl mb-6 uppercase flex items-center gap-3"><BsCheck2Circle /> The Do's</h4>
                                                <ul className="space-y-5">
                                                    {currentData.dos.map((item, i) => (
                                                        <li key={i} className="flex gap-4 items-start text-sm font-bold text-slate-300">
                                                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-[10px] shrink-0">{i + 1}</div>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-rose-500/5 border border-rose-500/20 p-10 rounded-[4rem] relative overflow-hidden text-slate-300">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 -mr-8 -mt-8 rounded-full"></div>
                                                <h4 className="text-rose-500 font-black text-xl mb-6 uppercase flex items-center gap-3"><BsXCircleFill /> The Don'ts</h4>
                                                <ul className="space-y-5">
                                                    {currentData.donts.map((item, i) => (
                                                        <li key={i} className="flex gap-4 items-start text-sm font-bold ">
                                                            <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 text-[10px] shrink-0">!</div>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* "What-If" Simulator Integrated */}
                                        <div className="bg-gradient-to-br from-indigo-900/40 via-[#0f172a] to-indigo-900/20 p-10 rounded-[4rem] border border-indigo-500/20 group">
                                            <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
                                                <div>
                                                    <h3 className="text-2xl font-black italic text-indigo-400">NEURAL LIFESTYLE FORECAST</h3>
                                                    <p className="text-xs text-slate-500 font-bold mt-1">Drag the slider to see how movement changes your projections.</p>
                                                </div>
                                                <div className="px-6 py-4 bg-indigo-500/10 rounded-3xl border border-indigo-500/10 text-center">
                                                    <div className="text-2xl font-black text-indigo-400">{Math.round(115 - (whatIfValue / 4))}</div>
                                                    <div className="text-[8px] font-black text-slate-500 uppercase">PROJECTED GLUCOSE</div>
                                                </div>
                                            </div>
                                            <input type="range" min="0" max="100" value={whatIfValue} onChange={(e) => setWhatIfValue(parseInt(e.target.value))} className="w-full h-2 bg-white/5 rounded-full appearance-none accent-indigo-500 cursor-pointer mb-6" />
                                            <p className="text-xs italic text-slate-500 font-medium text-center">
                                                {whatIfValue > 60 ? "Current Simulation: High Activity. Expect normalized insulin response within 4 weeks." : "Current Simulation: Low Activity. Risk of marker escalation by 12% in next cycle."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-spin-slow { animation: spin-slow 15s linear infinite; }
                
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    border: 4px solid #020617;
                    box-shadow: 0 0 15px rgba(16,185,129,0.5);
                }
            `}</style>
        </div>
    );
};

export default ReportInterpreter;
