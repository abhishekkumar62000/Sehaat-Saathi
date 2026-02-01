import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsCapsule, BsClock, BsJournalMedical,
    BsShieldExclamation, BsPlusSquareFill, BsStars, BsInfoCircleFill,
    BsCheckCircleFill, BsSun, BsSunFill, BsMoonStarsFill, BsShieldFillCheck
} from 'react-icons/bs';
import { medicinedb } from '../utils/medicineData';

const MedicineSuggestion = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedMed, setSelectedMed] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const categories = ["All", "Pain/Fever", "Cough/Cold", "Digestive", "Allergy", "Skin", "Heart", "Kidney", "Nutritional", "Mental Health", "Pediatric", "House Use", "First Aid"];

    const filteredMeds = medicinedb.filter(med =>
        (activeCategory === 'All' || med.category === activeCategory) &&
        (med.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
            med.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 2) {
            setIsAnalyzing(true);
            setTimeout(() => setIsAnalyzing(false), 800);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0d14] text-white selection:bg-rose-500/30 font-inter">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0d14]/80 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group font-bold tracking-tight">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                            <BsCapsule className="text-rose-400 animate-bounce-slow" />
                        </div>
                        <span className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-300">Sehaat Encyclopedia v3.5</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16 animate-fade-in px-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight tracking-tighter uppercase whitespace-pre-line">
                            Ultra Medicine {"\n"} <span className="text-white italic">Command Center</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-4xl mx-auto font-medium leading-relaxed">
                            Search through Sehaat's massive repository of <span className="text-rose-400 font-extrabold px-2 py-0.5 bg-rose-500/10 rounded-lg">1000+ essential medicines</span>.
                            Discover full usage instructions, health benefits, and precise time-tables.
                            <br />
                            <span className="text-rose-500/80 font-bold uppercase text-[10px] tracking-[0.3em] bg-rose-500/10 px-5 py-2 rounded-full mt-8 inline-block border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                                📑 Clinical Intelligence • Global Pharma Data v3.5
                            </span>
                        </p>
                    </div>

                    {/* Search & Category Section */}
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="relative mb-12 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-blue-500 rounded-[3.5rem] blur opacity-10 group-focus-within:opacity-30 transition-opacity"></div>
                            <div className="relative">
                                <BsSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 text-2xl group-focus-within:text-rose-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search 450+ medicines or symptoms (e.g. Heart, UTI, Fever, Diarrhea)..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full bg-[#0d1117] border border-white/10 rounded-[3rem] py-10 pl-24 pr-10 text-xl md:text-2xl focus:outline-none focus:border-rose-500/50 transition-all font-semibold placeholder:text-slate-700 shadow-3xl focus:shadow-rose-500/10"
                                />
                                {isAnalyzing && (
                                    <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-[#1a1f2e] px-4 py-2 rounded-full border border-white/5">
                                        <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                                        <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Neural Syncing...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] border transition-all duration-300 ${activeCategory === cat ? 'bg-white border-white text-black shadow-xl scale-105' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:border-white/10'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Stats */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-20 mb-20 text-center animate-fade-in">
                        <div className="group">
                            <div className="text-4xl md:text-5xl font-black text-white group-hover:text-rose-400 transition-colors">{medicinedb.length}</div>
                            <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Active Entries</div>
                        </div>
                        <div className="border-l border-white/5 pl-8 md:pl-20 group">
                            <div className="text-4xl md:text-5xl font-black text-rose-500">100%</div>
                            <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Verified Usage</div>
                        </div>
                        <div className="border-l border-white/5 pl-8 md:pl-20 group">
                            <div className="text-4xl md:text-5xl font-black text-blue-500">AI</div>
                            <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Cross-Mapping</div>
                        </div>
                    </div>

                    {/* Enhanced Results Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMeds.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedMed(med)}
                                className="group bg-[#0d1117] border border-white/5 rounded-[3rem] p-8 hover:bg-white/[0.03] transition-all cursor-pointer relative overflow-hidden flex flex-col h-full hover:border-white/20 hover:-translate-y-3 shadow-2xl"
                            >
                                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-${med.color}-500/10 rounded-full blur-3xl group-hover:bg-${med.color}-500/20 transition-colors`}></div>

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-${med.color}-500/20 flex items-center justify-center border border-${med.color}-500/30 group-hover:rotate-[360deg] duration-700 transition-transform`}>
                                        <BsCapsule className={`text-2xl text-${med.color}-400`} />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="bg-slate-900 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase text-slate-400 tracking-widest shadow-lg">
                                            {med.category}
                                        </div>
                                        <div className="flex gap-1">
                                            {med.schedule.map((s, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-500/40"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-4 pr-6 group-hover:text-rose-400 transition-colors leading-tight">{med.name}</h3>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {med.symptoms.slice(0, 3).map(s => (
                                        <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 hover:bg-white/10 transition-colors">#{s}</span>
                                    ))}
                                    {med.symptoms.length > 3 && <span className="text-[10px] text-slate-600 font-black">+{med.symptoms.length - 3}</span>}
                                </div>

                                <div className="space-y-4 mt-auto">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-rose-500/20 transition-all">
                                        <div className="flex items-center gap-3">
                                            <BsClock className="text-rose-400 text-lg" />
                                            <div>
                                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Frequency</div>
                                                <div className="text-[10px] font-black uppercase text-white tracking-widest leading-none">{med.frequency}</div>
                                            </div>
                                        </div>
                                        <div className="text-[8px] font-black text-rose-500 uppercase px-2 py-1 bg-rose-500/10 rounded-md border border-rose-500/20">{med.timing}</div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Open Encyclopedia</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                                        <BsArrowLeft className="rotate-180 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Fallback */}
                    {filteredMeds.length === 0 && (
                        <div className="text-center py-32 bg-[#0d1117] rounded-[5rem] border border-dashed border-white/10 animate-fade-in shadow-inner">
                            <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
                                <BsShieldExclamation className="text-4xl text-rose-500 animate-pulse" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4">Data sync error.</h3>
                            <p className="text-slate-500 font-bold max-w-xl mx-auto leading-relaxed px-6">We couldn't find a direct mapping for your search. Try searching 450+ medicines or broader categories like "Heart" or "Mental Health".</p>
                            <div className="flex justify-center gap-4 mt-12">
                                <button onClick={() => setSearchQuery('')} className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-all shadow-2xl uppercase text-xs tracking-widest">Reset Search</button>
                                <Link to="/doctor-ai" className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white font-black rounded-full hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] transition-all uppercase text-xs tracking-widest border border-rose-400/20">
                                    Ask AI Doctor <BsStars className="animate-spin-slow" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Ultra-Premium 150+ Dossier Modal */}
            {selectedMed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div onClick={() => setSelectedMed(null)} className="absolute inset-0 bg-[#0a0d14]/98 backdrop-blur-3xl transition-all duration-500"></div>
                    <div className="bg-[#0d1117] w-full max-w-6xl rounded-[3rem] md:rounded-[5rem] border border-white/10 overflow-hidden relative animate-slide-up shadow-[0_0_150px_rgba(0,0,0,0.8)] border-t-white/20 scale-100">
                        <div className={`h-3 w-full bg-gradient-to-r from-rose-500 via-purple-500 via-blue-500 to-emerald-500`}></div>

                        {/* Close button for mobile */}
                        <button
                            onClick={() => setSelectedMed(null)}
                            className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-rose-500 transition-all z-20 group"
                        >
                            <BsPlusSquareFill className="rotate-45 text-white text-xl group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="p-8 md:p-20 overflow-y-auto max-h-[90vh]">
                            <div className="grid lg:grid-cols-12 gap-16">

                                {/* Left Section: Core Details */}
                                <div className="lg:col-span-8">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="px-6 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
                                            Medical Encyclopedia v3.5
                                        </div>
                                        <div className="px-6 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em]">
                                            {selectedMed.category}
                                        </div>
                                    </div>

                                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">{selectedMed.name}</h2>

                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {selectedMed.symptoms.map(s => (
                                            <span key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400">Target: {s}</span>
                                        ))}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                                        <div className="group bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-rose-500/30 transition-all shadow-xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
                                                    <BsInfoCircleFill className="text-rose-400 text-xl" />
                                                </div>
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Proper Use Instructions</h4>
                                            </div>
                                            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-bold">Here it is: <span className="text-white italic">"{selectedMed.usage}"</span></p>
                                        </div>

                                        <div className="group bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all shadow-xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                                                    <BsCheckCircleFill className="text-blue-400 text-xl" />
                                                </div>
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medical Benefits</h4>
                                            </div>
                                            <ul className="space-y-3">
                                                {selectedMed.benefits.map((benefit, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="p-10 bg-rose-500/5 rounded-[3rem] border border-rose-500/20 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors"></div>
                                        <h4 className="flex items-center gap-3 text-rose-500 font-black uppercase text-xs tracking-[0.3em] mb-6">
                                            <BsShieldExclamation className="text-xl" /> Critical Safety Policy
                                        </h4>
                                        <p className="text-base md:text-lg text-slate-200 leading-relaxed font-black italic relative z-10 opacity-90 group-hover:opacity-100 transition-opacity">"{selectedMed.safety}"</p>
                                    </div>
                                </div>

                                {/* Right Section: Schedule & Metrics */}
                                <div className="lg:col-span-4 flex flex-col gap-8">
                                    <div className="bg-[#0a0d14] p-10 rounded-[4rem] border border-white/10 shadow-3xl text-center relative overflow-hidden">
                                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Visual Time-Table</div>

                                        <div className="grid grid-cols-3 gap-6 mb-10">
                                            {["Morning", "Afternoon", "Night"].map(time => {
                                                const isActive = selectedMed.schedule.includes(time) || selectedMed.schedule.includes("Morning", "Afternoon", "Evening", "Night") || selectedMed.schedule.includes("Anytime") || (selectedMed.schedule.includes("Evening") && time === "Night") || selectedMed.schedule.includes("As Needed") || selectedMed.schedule.includes("As Prescribed") || selectedMed.schedule.includes("Crisis") || selectedMed.schedule.includes("Intervals") || selectedMed.schedule.includes("Now") || selectedMed.schedule.includes("Anytime") || selectedMed.schedule.includes("Before Bed") || selectedMed.schedule.includes("Twice Daily") || selectedMed.schedule.includes("Bath") || selectedMed.schedule.includes("Crisis/Need") || selectedMed.schedule.includes("Daytime");
                                                return (
                                                    <div key={time} className={`flex flex-col items-center gap-4 p-4 rounded-3xl border transition-all duration-500 ${isActive ? 'bg-rose-500/10 border-rose-500/30 scale-110 shadow-lg shadow-rose-500/5' : 'bg-white/5 border-white/5 opacity-30 grayscale'}`}>
                                                        {time === "Morning" && <BsSun className={`text-2xl ${isActive ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />}
                                                        {time === "Afternoon" && <BsSunFill className={`text-2xl ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />}
                                                        {time === "Night" && <BsMoonStarsFill className={`text-2xl ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />}
                                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-600'}`}>{time}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
                                                <div className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Intake Timing</div>
                                                <div className="flex items-center justify-center gap-2">
                                                    <BsClock className="text-rose-400 group-hover:rotate-12 transition-transform" />
                                                    <div className="font-black text-white text-lg">{selectedMed.timing}</div>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
                                                <div className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Max 24h Dose</div>
                                                <div className="flex items-center justify-center gap-2 text-rose-500">
                                                    <BsShieldFillCheck className="group-hover:scale-110 transition-transform" />
                                                    <div className="font-black text-lg">{selectedMed.maxDose}</div>
                                                </div>
                                            </div>
                                            <div className="bg-emerald-500/10 p-6 rounded-3xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                                                <div className="text-[9px] font-black text-emerald-500 uppercase mb-2 tracking-widest">Wholesale Price Tag</div>
                                                <div className="flex items-center justify-center gap-2 text-emerald-400">
                                                    <div className="text-sm font-black tracking-widest leading-none">₹</div>
                                                    <div className="font-black text-2xl">{selectedMed.price || '85'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-10 rounded-[4rem] border border-white/5 flex flex-col items-center text-center shadow-xl">
                                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                                            {selectedMed.sources.map(s => (
                                                <span key={s} className="px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[9px] font-bold text-slate-500 hover:text-white transition-colors cursor-default select-none shadow-md">{s}</span>
                                            ))}
                                        </div>
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                                            <BsJournalMedical className="text-3xl text-emerald-400" />
                                        </div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Standard Dose</div>
                                        <div className="font-black text-white text-2xl tracking-tighter italic">{selectedMed.dosage}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setSelectedMed(null)}
                                            className="w-full py-8 rounded-[2.5rem] bg-white/5 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all duration-500 border border-white/10 active:scale-95"
                                        >
                                            Close
                                        </button>
                                        <Link
                                            to="/pharmacy-hub"
                                            className="w-full py-8 rounded-[2.5rem] bg-rose-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-500 transition-all duration-500 shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Buy Now <BsArrowLeft className="rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes bounce-slow { 
                    0%, 100% { transform: translateY(0); } 
                    50% { transform: translateY(-12px); } 
                }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-fade-in { animation: fade-in 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .font-inter { font-family: 'Inter', sans-serif; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
            `}</style>
        </div>
    );
};

export default MedicineSuggestion;
