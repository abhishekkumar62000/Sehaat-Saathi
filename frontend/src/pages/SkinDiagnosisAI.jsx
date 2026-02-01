import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsCameraFill, BsSearch, BsCloudUploadFill,
    BsLightningFill, BsInfoCircleFill, BsShieldCheck, BsExclamationTriangleFill,
    BsXLg, BsCaretRightFill, BsActivity, BsMagic, BsArrowRepeat, BsStars
} from 'react-icons/bs';

const SkinDiagnosisAI = () => {
    const [image, setImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const fileInputRef = useRef(null);
    const scanTimeoutRef = useRef(null);

    // Simulated Diagnosis Data
    const mockResults = [
        {
            id: 1,
            name: "Heat Rash (Miliaria)",
            prob: 82,
            severity: "Low",
            advice: "Keep the area cool and dry. Avoid tight clothing. Calamine lotion or a cool compress can reduce itching.",
            remedy: "Aloe Vera Gel or Cold Compress"
        },
        {
            id: 2,
            name: "Eczema (Atopic Dermatitis)",
            prob: 15,
            severity: "Moderate",
            advice: "Moisture is key. Use fragrance-free soaps and apply heavy moisturizer immediately after bathing.",
            remedy: "Hypoallergenic Moisturizer"
        },
        {
            id: 3,
            name: "Fungal Infection (Tinea)",
            prob: 3,
            severity: "Moderate",
            advice: "Keep the area very dry. Avoid sharing towels or clothes. Antifungal cream might be needed.",
            remedy: "Antifungal Powder/Cream"
        }
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setShowResults(false);
                setSelectedCondition(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const startScan = () => {
        if (!image) return;
        setIsScanning(true);
        setScanProgress(0);
        setShowResults(false);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsScanning(false);
                    setShowResults(true);
                    setSelectedCondition(mockResults[0]);
                }, 800);
            }
        }, 50);
    };

    const resetScan = () => {
        setImage(null);
        setIsScanning(false);
        setShowResults(false);
        setSelectedCondition(null);
        setScanProgress(0);
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-slate-100 font-inter overflow-hidden selection:bg-violet-500/30">

            {/* Neural Background Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                {/* Simulated Neural Pixels */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5 py-5 px-8">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-all" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">Imaging Engine V2.4</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-8 relative z-10 h-screen overflow-y-auto custom-scrollbar">
                <div className="container mx-auto max-w-7xl">

                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-slide-up">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white mb-8">
                            <BsCameraFill className="text-violet-400 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.4em]">AI Skin Analysis Hub</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.85] uppercase">
                            NEURAL <span className="text-violet-500 italic">SCANNER</span>
                        </h1>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto font-medium leading-relaxed italic">
                            "Upload a clear photo of the skin concern. Our AI will perform <span className="text-white font-bold">Deep Tissue Analysis</span> to identify potential issues."
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left Side: Upload & Scanner Area */}
                        <div className="lg:col-span-12 xl:col-span-7">
                            <div className="bg-slate-900/40 backdrop-blur-3xl border-2 border-white/5 rounded-[4rem] p-10 md:p-14 relative overflow-hidden group shadow-3xl min-h-[600px] flex flex-col items-center justify-center">

                                {!image ? (
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className="w-full h-[450px] border-4 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center gap-8 cursor-pointer hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group/upload"
                                    >
                                        <div className="w-32 h-32 rounded-full bg-violet-600/10 border-2 border-violet-600/20 flex items-center justify-center text-4xl text-violet-500 group-hover/upload:scale-110 group-hover/upload:bg-violet-600 group-hover/upload:text-white transition-all duration-500 shadow-2xl">
                                            <BsCloudUploadFill />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-black uppercase tracking-tight mb-2">Click to Upload Image</p>
                                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">JPEG, PNG (Max 5MB) • Clear lighting recommended</p>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden border-2 border-white/10 group/scanner">
                                        <img src={image} className="w-full h-full object-cover" alt="Skin Scan" />

                                        {/* Laser Sweep Animation */}
                                        {isScanning && (
                                            <div
                                                className="absolute left-0 w-full h-1 bg-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.8)] z-20 flex items-center justify-center"
                                                style={{ top: `${scanProgress}%` }}
                                            >
                                                <div className="w-full h-[150px] bg-gradient-to-b from-violet-500/20 to-transparent absolute top-0"></div>
                                                <div className="px-4 py-1 rounded-full bg-violet-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl relative -top-6">
                                                    Neural Scanning... {scanProgress}%
                                                </div>
                                            </div>
                                        )}

                                        {/* Image Controls Overlay */}
                                        {!isScanning && (
                                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover/scanner:opacity-100 transition-all duration-500 translate-y-4 group-hover/scanner:translate-y-0">
                                                <button
                                                    onClick={startScan}
                                                    className="px-8 py-4 rounded-full bg-violet-600 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl hover:bg-violet-500"
                                                >
                                                    <BsLightningFill /> Start Analysis
                                                </button>
                                                <button
                                                    onClick={resetScan}
                                                    className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/20"
                                                >
                                                    Replace
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Scanning Text Feedback */}
                                {isScanning && (
                                    <div className="mt-10 w-full animate-pulse">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-violet-400 mb-2">
                                            <span>Processing Micro-textures</span>
                                            <span>Simulating Depth Map</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-violet-600 transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Important Medical Disclaimer */}
                            <div className="mt-8 p-10 bg-rose-500/5 border-2 border-rose-500/20 rounded-[3rem] flex items-start gap-8 group hover:bg-rose-500/10 transition-all duration-500">
                                <BsExclamationTriangleFill className="text-4xl text-rose-500 animate-pulse flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2 italic underline underline-offset-4">Critical Medical Warning</p>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                        "This is an AI simulation for initial screening. Accuracy can vary based on lighting and camera quality. Always consult a certified Dermatologist for medical confirmation."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Diagnosis Results Area */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-8 h-full">
                            {showResults ? (
                                <div className="space-y-8 animate-fade-in">
                                    {/* Primary Result Card */}
                                    <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[3rem] p-10 md:p-12 shadow-3xl border border-white/10 relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-8">
                                                <div className="px-4 py-1 rounded-full bg-white/10 text-white font-black uppercase text-[8px] tracking-[0.3em]">Neural Winner</div>
                                                <BsActivity className="text-white/40 animate-pulse text-2xl" />
                                            </div>
                                            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase leading-none">{selectedCondition?.name}</h2>
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className={`px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest ${selectedCondition?.severity === 'Low' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
                                                    Severity: {selectedCondition?.severity}
                                                </div>
                                                <div className="text-violet-200 font-bold uppercase text-[10px] tracking-widest">Confidence: {selectedCondition?.prob}%</div>
                                            </div>
                                            <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 backdrop-blur-md">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-violet-300 mb-4 italic flex items-center gap-2">
                                                    <BsMagic /> AI Advice:
                                                </p>
                                                <p className="text-xl font-bold leading-tight italic">"{selectedCondition?.advice}"</p>
                                            </div>
                                        </div>
                                        <BsSearch className="absolute bottom-[-20%] right-[-10%] text-[20rem] text-white/5 rotate-12" />
                                    </div>

                                    {/* Remedial Step Card */}
                                    <div className="bg-slate-900/60 border-2 border-white/5 rounded-[3rem] p-10 hover:border-violet-500/30 transition-all duration-500 group">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
                                            <BsShieldCheck className="text-emerald-500" /> Immediate Care Strategy
                                        </h3>
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-2xl text-emerald-500 shadow-lg">
                                                <BsDropletFill className="animate-bounce" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Recommended Remedy</p>
                                                <p className="text-2xl font-black italic">{selectedCondition?.remedy}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Alternate Matches Breakdown */}
                                    <div className="bg-slate-900 border-2 border-white/5 rounded-[3.5rem] p-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8 px-4">Other Probable Matches</p>
                                        <div className="space-y-4">
                                            {mockResults.slice(1).map(match => (
                                                <div
                                                    key={match.id}
                                                    onClick={() => setSelectedCondition(match)}
                                                    className={`p-8 rounded-[2rem] border-2 transition-all cursor-pointer group flex justify-between items-center ${selectedCondition?.id === match.id ? 'bg-violet-600 border-violet-500' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                                >
                                                    <div>
                                                        <p className="font-black text-sm uppercase tracking-tight group-hover:translate-x-2 transition-transform">{match.name}</p>
                                                        <p className={`text-[9px] font-black uppercase mt-1 ${selectedCondition?.id === match.id ? 'text-violet-200' : 'text-slate-500'}`}>Probability Threshold: {match.prob}%</p>
                                                    </div>
                                                    <BsArrowRightShort className="text-3xl" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Banner */}
                                    <div className="p-8 rounded-[2.5rem] bg-indigo-600 flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                                                <BsStars className="animate-spin-slow" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-widest">Consult Doctor AI Now</p>
                                        </div>
                                        <BsArrowRepeat className="text-2xl" />
                                    </div>

                                </div>
                            ) : (
                                /* Placeholder / Waiting Area */
                                <div className="h-full flex flex-col items-center justify-center bg-slate-900/20 border-2 border-dashed border-white/5 rounded-[4rem] p-12 text-center group">
                                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-700">
                                        <BsActivity className="text-4xl text-slate-600 group-hover:text-violet-500 animate-pulse" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Awaiting Neural Input</p>
                                    <p className="text-slate-500 text-sm mt-4 italic font-medium">Upload the image to see the neural analysis and diagnostics result board.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-spin-slow { animation: spin 10s linear infinite; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .shadow-3xl { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.6); }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default SkinDiagnosisAI;
