import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsCapsule, BsClock, BsJournalMedical,
    BsShieldExclamation, BsPlusSquareFill, BsStars, BsInfoCircleFill,
    BsCheckCircleFill, BsSun, BsSunFill, BsMoonStarsFill, BsShieldFillCheck,
    BsExclamationTriangleFill, BsThermometerHalf, BsBoxSeam, BsDropletFill, BsFileMedicalFill,
    BsPatchCheckFill, BsActivity, BsLightningFill, BsExclamationCircleFill, BsXCircleFill
} from 'react-icons/bs';
import { medicinedb } from '../utils/medicineData';
import { ayurvedaDb } from '../utils/ayurvedaData';
import { homeopathyDb } from '../utils/homeopathyData';

const BioTimeline = ({ med }) => {
    return (
        <div className="bg-white/5 p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BsClock className="text-8xl text-rose-500" />
            </div>
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-6 flex items-center gap-2">
                <BsActivity className="text-rose-500" /> Bio-Availability Timeline
            </h4>
            <div className="relative h-24 flex items-end gap-1 px-2">
                {[40, 60, 95, 80, 50, 30, 15, 5].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-rose-500/20 to-rose-500/60 rounded-t-lg transition-all duration-700 hover:to-rose-400 group-hover:animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}></div>
                ))}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] font-black text-rose-400/60 uppercase">Peak: {med?.peakHours || "2.5h"}</div>
            </div>
            <div className="flex justify-between mt-4 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                <span>0h</span>
                <span>4h</span>
                <span>8h</span>
                <span>12h</span>
                <span>24h</span>
            </div>
        </div>
    );
};

const VitalsImpact = ({ med }) => {
    return (
        <div className="bg-blue-500/5 p-8 rounded-[3rem] border border-blue-500/10 transition-all hover:border-blue-500/30 group">
            <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-[0.3em] mb-6">Neural Vitals Simulator</h4>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Heart Rate (BPM)</span>
                    <span className="font-black text-white flex items-center gap-1">
                        <BsActivity className="text-rose-500 text-[10px]" /> {med?.heartImpact || "Stable -0.2%"}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Blood Pressure</span>
                    <span className="font-black text-white">{med?.bpImpact || "Normative"}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Metabolic Load</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[60%] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MedicineSuggestion = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDisease, setActiveDisease] = useState('All');
    const [selectedMed, setSelectedMed] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [lang, setLang] = useState('en'); // 'en' or 'hi'
    const [interactionQueue, setInteractionQueue] = useState([]);
    const [isInteractionOpen, setIsInteractionOpen] = useState(false);
    const [dosageWeight, setDosageWeight] = useState(60); // Default weight in kg
    const [versusQueue, setVersusQueue] = useState([]);
    const [pillShape, setPillShape] = useState('All');
    const [pillColor, setPillColor] = useState('All');
    const [showEmergency, setShowEmergency] = useState(false);

    const categories = ["All", "Pain/Fever", "Cough/Cold", "Digestive", "Allergy", "Skin", "Heart", "Kidney", "Nutritional", "Mental Health", "Pediatric", "House Use", "First Aid"];

    const diseaseFilters = [
        "All", "Fever", "Cough/Cold", "Headache", "Stomach Pain",
        "Vomiting", "Itching", "Teeth Pain", "Bone Pain",
        "Ear Pain", "Hair Loss", "Body Pain", "Acne", "Backache"
    ];

    const filteredMeds = medicinedb.filter(med =>
        (activeCategory === 'All' || med.category === activeCategory) &&
        (activeDisease === 'All' ||
            med.symptoms?.some(s => s.toLowerCase().includes(activeDisease.toLowerCase())) ||
            (activeDisease === "Teeth Pain" && med.symptoms?.some(s => s.toLowerCase().includes("tooth") || s.toLowerCase().includes("dental"))) ||
            (activeDisease === "Hair Loss" && med.symptoms?.some(s => s.toLowerCase().includes("scalp") || s.toLowerCase().includes("keratin")))
        ) &&
        (pillShape === 'All' || med.pillID?.shape === pillShape) &&
        (pillColor === 'All' || med.pillID?.color === pillColor) &&
        (med.symptoms?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
                        <span className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-300"><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Encyclopedia</span> v6.1</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setLang('en')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${lang === 'en' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang('hi')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${lang === 'hi' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            हिंदी
                        </button>
                    </div>
                </div>
            </header>

            {/* Side Fixed Filter Hub */}
            <aside className={`fixed right-6 top-32 z-40 transition-all duration-700 ${isFilterOpen ? 'translate-x-0' : 'translate-x-[calc(100%-60px)]'}`}>
                <div className="bg-[#0d1117] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex">
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-[60px] bg-rose-500 flex flex-col items-center justify-center gap-4 py-8 group"
                    >
                        <BsJournalMedical className={`text-xl transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        <span className="[writing-mode:vertical-lr] font-black uppercase tracking-[0.3em] text-[10px] items-center">
                            Disease Filter
                        </span>
                    </button>

                    {/* Filter List */}
                    <div className="p-8 w-[280px] max-h-[70vh] overflow-y-auto">
                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-6">Select Ailment</h4>
                        <div className="space-y-2">
                            {diseaseFilters.map(disease => (
                                <button
                                    key={disease}
                                    onClick={() => {
                                        setActiveDisease(disease);
                                        if (window.innerWidth < 768) setIsFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${activeDisease === disease ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>

                        <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-10 mb-6">Pill ID Vision</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="text-[8px] font-black text-slate-600 uppercase mb-2">Shape</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['All', 'Round', 'Oval', 'Capsule'].map(shape => (
                                        <button
                                            key={shape}
                                            onClick={() => setPillShape(shape)}
                                            className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all ${pillShape === shape ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                                        >
                                            {shape}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-[8px] font-black text-slate-600 uppercase mb-2">Color</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['All', 'White', 'Pink', 'Blue'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setPillColor(color)}
                                            className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all ${pillColor === color ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16 animate-fade-in px-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase whitespace-pre-line">
                            <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> {"\n"}
                            <span className="text-white italic">Allopathic medicine Hub</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-4xl mx-auto font-medium leading-relaxed">
                            Search through <span style={{ color: "#FF9933" }}>Sehaat</span>'s massive repository of <span className="text-rose-400 font-extrabold px-2 py-0.5 bg-rose-500/10 rounded-lg">2000+ unique medicines</span>.
                            Discover full usage instructions, health benefits, and clinical safety profiles.
                            <br />
                            <span className="text-rose-500/80 font-bold uppercase text-[10px] tracking-[0.3em] bg-rose-500/10 px-5 py-2 rounded-full mt-8 inline-block border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                                📑 Clinical Intelligence • Filtered by Disease & Category
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
                                    placeholder="Search 2000+ medicines or symptoms (e.g. Bone Pain, Teeth Pain, Fever)..."
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

                        {/* Disease Selection Quick Bar (Requested Features) */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                            <div className="w-full text-center text-[8px] font-black uppercase text-slate-600 tracking-[0.5em] mb-4">Quick Disease Access</div>
                            {diseaseFilters.slice(1, 11).map(disease => (
                                <button
                                    key={disease}
                                    onClick={() => setActiveDisease(disease)}
                                    className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest border transition-all ${activeDisease === disease ? 'bg-rose-500 border-rose-500 text-white shadow-lg' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20'}`}
                                >
                                    {disease}
                                </button>
                            ))}
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

                    {/* Active Filter Status */}
                    {(activeCategory !== 'All' || activeDisease !== 'All') && (
                        <div className="flex justify-center gap-4 mb-10 animate-fade-in">
                            {activeCategory !== 'All' && (
                                <div className="bg-white/10 px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase flex items-center gap-3">
                                    Category: {activeCategory}
                                    <button onClick={() => setActiveCategory('All')} className="text-rose-500 hover:text-rose-400">×</button>
                                </div>
                            )}
                            {activeDisease !== 'All' && (
                                <div className="bg-rose-500/10 px-6 py-2 rounded-full border border-rose-500/20 text-[10px] font-black uppercase text-rose-400 flex items-center gap-3">
                                    Disease: {activeDisease}
                                    <button onClick={() => setActiveDisease('All')} className="text-rose-500 hover:text-rose-400">×</button>
                                </div>
                            )}
                        </div>
                    )}

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
                                            {med.schedule?.map((s, i) => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-500/40"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-4 pr-6 group-hover:text-rose-400 transition-colors leading-tight">{med.name}</h3>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {med.symptoms?.slice(0, 3).map(s => (
                                        <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 hover:bg-white/10 transition-colors">#{s}</span>
                                    ))}
                                    {med.symptoms?.length > 3 && <span className="text-[10px] text-slate-600 font-black">+{med.symptoms.length - 3}</span>}
                                </div>

                                <div className="space-y-4 mt-auto">
                                    <div className="flex gap-2">
                                        {/* Interaction Checker Add Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!interactionQueue.find(m => m.name === med.name)) {
                                                    setInteractionQueue([...interactionQueue, med]);
                                                    setIsInteractionOpen(true);
                                                }
                                            }}
                                            className="flex-1 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <BsShieldFillCheck className="text-xs" /> Safety Check
                                        </button>

                                        {/* Versus Duel Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (versusQueue.length < 2 && !versusQueue.find(m => m.name === med.name)) {
                                                    setVersusQueue([...versusQueue, med]);
                                                }
                                            }}
                                            className={`px-4 py-3 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all ${versusQueue.find(m => m.name === med.name) ? 'bg-amber-500 border-amber-500 text-white' : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white'}`}
                                        >
                                            {versusQueue.find(m => m.name === med.name) ? 'Selected' : 'Duel'}
                                        </button>
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

            {/* Interaction Hub Floating Bar */}
            {interactionQueue.length > 0 && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] w-full max-w-4xl px-6 animate-slide-up">
                    <div className="bg-[#0d1117]/90 backdrop-blur-2xl border border-blue-500/30 rounded-[3rem] p-6 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4 flex-1 overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <BsShieldFillCheck className="text-white text-xl animate-pulse" />
                            </div>
                            <div className="flex -space-x-4 overflow-visible">
                                {interactionQueue.map((med, idx) => (
                                    <div key={idx} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0d1117] flex items-center justify-center text-[10px] font-black group relative cursor-pointer" title={med.name}>
                                        {med.name.charAt(0)}
                                        <button
                                            onClick={() => setInteractionQueue(interactionQueue.filter(m => m.name !== med.name))}
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                                        >×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block">
                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Neural Safety Mesh</div>
                                <div className="text-xs font-bold text-slate-400">{interactionQueue.length} Medicines Queued</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setInteractionQueue([])}
                                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-slate-400 hover:bg-white/10 transition-all"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setIsInteractionOpen(true)}
                                className="px-8 py-3 rounded-2xl bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                Run Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Interaction Analysis Modal - ENHANCED with Cross-Pathy Radar */}
            {isInteractionOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-[#0a0d14]/95 backdrop-blur-3xl">
                    <div className="bg-[#0d1117] w-full max-w-2xl rounded-[4rem] border border-blue-500/30 overflow-hidden shadow-2xl animate-scale-in">
                        <div className="p-12">
                            <h3 className="text-3xl font-black mb-8 text-center flex flex-col items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <BsStars className="text-blue-400" />
                                    <span>AI Safety Analysis</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-blue-500/60 tracking-[0.5em]">Cross-Pathy Radar Active</span>
                            </h3>

                            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                                {interactionQueue.length < 1 ? (
                                    <div className="text-center py-10 opacity-50">
                                        <BsInfoCircleFill className="text-4xl mx-auto mb-4 text-slate-600" />
                                        <p className="font-bold">Add medicines to check for global safety risks.</p>
                                    </div>
                                ) : (
                                    (() => {
                                        const reports = [];

                                        // 1. Allopathic to Allopathic check
                                        for (let i = 0; i < interactionQueue.length; i++) {
                                            for (let j = i + 1; j < interactionQueue.length; j++) {
                                                const m1 = interactionQueue[i];
                                                const m2 = interactionQueue[j];
                                                if (m1.interactions?.includes(m2.name) || m2.interactions?.includes(m1.name)) {
                                                    reports.push({ type: 'Allopathic Collision', text: `High Risk: ${m1.name} and ${m2.name} are clinically incompatible.`, risk: 'High' });
                                                }
                                            }
                                        }

                                        // 2. Cross-Pathy Scan (Allopathic to Ayurveda)
                                        interactionQueue.forEach(med => {
                                            const name = med.name.toLowerCase();
                                            // Real-world critical interactions:
                                            // Blood Thinners + Guggulu/Ginger
                                            if (name.includes("warfarin") || name.includes("clopidogrel") || name.includes("aspirin")) {
                                                reports.push({ type: 'Cross-Pathy Risk', text: `${med.name} detected. Avoid high-dose Guggulu, Ginger, or Garlic extracts as they may increase bleeding risk.`, risk: 'Medium' });
                                            }
                                            // Diabetes + Bitter Melon/Karela
                                            if (name.includes("metformin") || name.includes("insulin")) {
                                                reports.push({ type: 'Dosage Sync', text: `${med.name} detected. Monitor blood sugar closely if using Ayurvedic 'Karela' or 'Jamun' extracts to avoid hypoglycemia.`, risk: 'Caution' });
                                            }
                                            // Digestion + Antacids
                                            if (med.category === "Digestive") {
                                                reports.push({ type: 'Absorption Alert', text: `Antacids may reduce the potency of concentrated herbal 'Churans'. Keep 2h interval.`, risk: 'Low' });
                                            }
                                        });

                                        if (reports.length > 0) {
                                            return reports.map((r, idx) => (
                                                <div key={idx} className={`p-6 rounded-3xl flex gap-6 items-center animate-fade-in ${r.risk === 'High' ? 'bg-rose-500/10 border border-rose-500/30' : r.risk === 'Medium' ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-blue-500/10 border border-blue-500/30'}`}>
                                                    <BsShieldExclamation className={`text-3xl ${r.risk === 'High' ? 'text-rose-500' : r.risk === 'Medium' ? 'text-amber-500' : 'text-blue-500'} flex-shrink-0`} />
                                                    <div>
                                                        <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${r.risk === 'High' ? 'text-rose-500' : r.risk === 'Medium' ? 'text-amber-500' : 'text-blue-500'}`}>{r.type}</div>
                                                        <p className="text-xs font-bold text-white leading-relaxed">{r.text}</p>
                                                    </div>
                                                </div>
                                            ));
                                        } else {
                                            return (
                                                <div className="p-10 bg-emerald-500/10 border border-emerald-500/30 rounded-[3rem] text-center group">
                                                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                                        <BsPatchCheckFill className="text-5xl text-emerald-500" />
                                                    </div>
                                                    <div className="text-xs font-black uppercase text-emerald-500 tracking-[0.3em] mb-4">Clean Safety Report</div>
                                                    <p className="font-bold text-slate-300">No major cross-pathy or drug interactions detected for the current selection.</p>
                                                </div>
                                            );
                                        }
                                    })())}
                            </div>

                            <button
                                onClick={() => setIsInteractionOpen(false)}
                                className="w-full py-6 rounded-3xl bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-colors"
                            >
                                Dismiss Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Versus Comparison Overlay */}
            {versusQueue.length === 2 && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-[#0a0d14]/98 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-[#0d1117] w-full max-w-7xl rounded-[4rem] border border-amber-500/30 overflow-hidden shadow-2xl relative">
                        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500"></div>
                        <div className="p-12 md:p-20 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-16">
                                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Neural <span className="text-amber-500">Versus</span> Duel</h2>
                                <button
                                    onClick={() => setVersusQueue([])}
                                    className="px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
                                >
                                    Exit Duel
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#0a0d14] border border-amber-500/50 flex items-center justify-center z-10 hidden md:flex">
                                    <span className="text-amber-500 font-black italic">VS</span>
                                </div>

                                {versusQueue.map((med, idx) => (
                                    <div key={idx} className={`p-10 rounded-[3rem] border ${idx === 0 ? 'border-blue-500/20 bg-blue-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Competitor 0{idx + 1}</div>
                                        <h3 className="text-5xl font-black mb-8 uppercase tracking-tighter">{med.name}</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Relief Intensity</span>
                                                <span className="text-sm font-black text-white">{med.category === "Pain/Fever" ? "High Impact" : "Symptomatic"}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Safety Rating</span>
                                                <span className={`text-sm font-black ${med.pregnancySafety === "Safe" ? "text-emerald-400" : "text-amber-400"}`}>{med.pregnancySafety || "B-Class"}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Optimal Use</span>
                                                <span className="text-sm font-black text-white">{med.symptoms?.[0] || 'General'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-500 uppercase">Generic Cost</span>
                                                <span className="text-sm font-black text-emerald-400">₹{med.generics?.[0]?.price || "N/A"}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center">
                                <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">Clinical Recommendation</div>
                                <p className="text-xl font-bold text-slate-300 italic max-w-4xl mx-auto">
                                    "Choose <span className="text-white font-black">{versusQueue[0].name}</span> for targeted {versusQueue[0].symptoms?.[0]?.toLowerCase() || 'relief'}, but consider <span className="text-white font-black">{versusQueue[1].name}</span> if you have secondary {versusQueue[1].symptoms?.[0]?.toLowerCase() || 'symptoms'}."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                        {selectedMed.symptoms?.map(s => (
                                            <span key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400">Target: {s}</span>
                                        ))}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                                        <div className="group bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-rose-500/30 transition-all shadow-xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
                                                    <BsInfoCircleFill className="text-rose-400 text-xl" />
                                                </div>
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    {lang === 'hi' ? "सही उपयोग के निर्देश" : "Proper Use Instructions"}
                                                </h4>
                                            </div>
                                            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-bold">
                                                {lang === 'hi' ? "यहाँ निर्देश हैं: " : "Here it is: "}
                                                <span className="text-white italic">"{lang === 'hi' ? (selectedMed.usage_hi || selectedMed.usage) : selectedMed.usage}"</span>
                                            </p>
                                        </div>

                                        <div className="group bg-white/5 p-8 rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all shadow-xl">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                                                    <BsCheckCircleFill className="text-blue-400 text-xl" />
                                                </div>
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    {lang === 'hi' ? "चिकित्सा लाभ" : "Medical Benefits"}
                                                </h4>
                                            </div>
                                            <ul className="space-y-3">
                                                {(lang === 'hi' ? (selectedMed.benefits_hi || selectedMed.benefits) : selectedMed.benefits)?.map((benefit, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                                        <BioTimeline med={selectedMed} />
                                        <VitalsImpact med={selectedMed} />
                                    </div>

                                    <div className="p-12 bg-gradient-to-br from-rose-500/10 to-transparent rounded-[4rem] border border-rose-500/20 shadow-2xl relative overflow-hidden group backdrop-blur-md">
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 rounded-full blur-[60px] group-hover:bg-rose-500/20 transition-all duration-700"></div>
                                        <h4 className="flex items-center gap-4 text-rose-500 font-extrabold uppercase text-[11px] tracking-[0.4em] mb-8">
                                            <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/20">
                                                <BsShieldExclamation className="text-2xl" />
                                            </div>
                                            {lang === 'hi' ? "महत्वपूर्ण सुरक्षा नीति" : "Critical Safety Policy"}
                                        </h4>
                                        <div className="relative z-10">
                                            <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-black italic opacity-90 group-hover:opacity-100 transition-opacity border-l-4 border-rose-500/50 pl-8 py-2">
                                                "{lang === 'hi' ? (selectedMed.safety_hi || selectedMed.safety) : selectedMed.safety}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* NEW: Red Flag Warning Section */}
                                    {selectedMed.urgentWarning && (
                                        <div className="mt-10 p-12 bg-gradient-to-r from-rose-900/40 to-rose-600/10 rounded-[4rem] border-2 border-rose-500/60 shadow-[0_0_50px_rgba(225,29,72,0.3)] relative overflow-hidden group animate-pulse-slow">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-[100px]"></div>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                                <div className="flex-1">
                                                    <h4 className="flex items-center gap-5 text-rose-500 font-black uppercase text-sm tracking-[0.5em] mb-6">
                                                        <div className="p-3 bg-rose-600/30 rounded-2xl animate-bounce shadow-lg shadow-rose-600/20">
                                                            <BsExclamationTriangleFill className="text-3xl" />
                                                        </div>
                                                        {lang === 'hi' ? "खतरे की चेतावनी (Red Flag)" : "Red Flag Warning"}
                                                    </h4>
                                                    <p className="text-xl md:text-2xl text-white leading-tight font-black italic drop-shadow-md">
                                                        "{lang === 'hi' ? (selectedMed.urgentWarning_hi || selectedMed.urgentWarning) : selectedMed.urgentWarning}"
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => setShowEmergency(true)}
                                                    className="px-10 py-5 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-rose-600/40 transition-all active:scale-90 flex items-center gap-4 flex-shrink-0 border-t border-white/20"
                                                >
                                                    <BsLightningFill className="text-xl" /> {lang === 'hi' ? "इमरजेंसी प्रोटोकॉल" : "Emergency Protocol"}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* NEW: Side Effects Section */}
                                    {selectedMed.sideEffects && (
                                        <div className="mt-8 group bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-amber-500/30 transition-all shadow-xl">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                                    <BsActivity className="text-amber-400 text-xl" />
                                                </div>
                                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    {lang === 'hi' ? "संभावित दुष्प्रभाव" : "Potential Side Effects"}
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {(lang === 'hi' ? (selectedMed.sideEffects_hi || selectedMed.sideEffects) : selectedMed.sideEffects)?.map((effect, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                        <BsPatchCheckFill className="text-amber-500 text-sm flex-shrink-0" />
                                                        <span className="text-xs font-bold text-slate-300">{effect}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* NEW: Maternal Safety Shield */}
                                    {selectedMed.pregnancySafety && (
                                        <div className="mt-10 p-10 bg-gradient-to-br from-[#0d1526] to-[#0a0d14] rounded-[3.5rem] border border-blue-500/30 shadow-2xl group overflow-hidden relative backdrop-blur-xl">
                                            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-1000"></div>
                                            <div className="flex items-center justify-between mb-8 relative z-10">
                                                <h4 className="flex items-center gap-4 text-blue-400 font-extrabold uppercase text-[11px] tracking-[0.4em]">
                                                    <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/20 shadow-inner">
                                                        <BsShieldFillCheck className="text-2xl animate-pulse-slow" />
                                                    </div>
                                                    {lang === 'hi' ? "मातृ सुरक्षा कवच" : "Maternal Safety Shield"}
                                                </h4>
                                                <div className={`px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase border ${selectedMed.pregnancySafety === "Safe" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]" :
                                                    selectedMed.pregnancySafety === "Caution" ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                                                        "bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                                                    }`}>
                                                    {lang === 'hi' ? selectedMed.pregnancySafety_hi : selectedMed.pregnancySafety}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group/box scale-100 hover:scale-[1.02]">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Pregnancy Period</div>
                                                    <div className={`flex items-center gap-3 text-lg font-black ${selectedMed.pregnancySafety === "Safe" ? "text-emerald-400" : selectedMed.pregnancySafety === "Caution" ? "text-amber-400" : "text-rose-400"}`}>
                                                        {selectedMed.pregnancySafety === "Safe" ? <BsCheckCircleFill /> : selectedMed.pregnancySafety === "Caution" ? <BsExclamationCircleFill /> : <BsXCircleFill />}
                                                        {lang === 'hi' ? selectedMed.pregnancySafety_hi : selectedMed.pregnancySafety}
                                                    </div>
                                                </div>
                                                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group/box scale-100 hover:scale-[1.02]">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Lactation Phase</div>
                                                    <div className={`flex items-center gap-3 text-lg font-black ${selectedMed.lactationSafety === "Safe" ? "text-emerald-400" : selectedMed.lactationSafety === "Caution" ? "text-amber-400" : "text-rose-400"}`}>
                                                        {selectedMed.lactationSafety === "Safe" ? <BsCheckCircleFill /> : selectedMed.lactationSafety === "Caution" ? <BsExclamationCircleFill /> : <BsXCircleFill />}
                                                        {lang === 'hi' ? selectedMed.lactationSafety_hi : selectedMed.lactationSafety}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="mt-8 text-sm md:text-base text-slate-400 leading-relaxed italic font-bold opacity-80 group-hover:opacity-100 transition-opacity relative z-10 p-6 bg-white/5 rounded-3xl border-l-4 border-blue-500/40">
                                                "{lang === 'hi' ? (selectedMed.maternalDetails_hi || selectedMed.maternalDetails) : selectedMed.maternalDetails}"
                                            </p>
                                        </div>
                                    )}

                                    {/* NEW: Nutri-Sync & Chronotherapy */}
                                    {(selectedMed.foodInteractions || selectedMed.chronotherapy) && (
                                        <div className="mt-10 grid md:grid-cols-2 gap-8">
                                            {/* Nutri-Sync */}
                                            {selectedMed.foodInteractions && (
                                                <div className="p-10 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-[3.5rem] border border-emerald-500/20 group hover:border-emerald-500/40 transition-all backdrop-blur-md relative overflow-hidden">
                                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]"></div>
                                                    <h4 className="flex items-center gap-4 text-emerald-400 font-black uppercase text-[11px] tracking-[0.3em] mb-8 relative z-10">
                                                        <div className="p-2 bg-emerald-500/20 rounded-xl">
                                                            <BsDropletFill className="text-xl" />
                                                        </div>
                                                        Nutri-Sync Interactions
                                                    </h4>
                                                    <div className="space-y-4 relative z-10">
                                                        {selectedMed.foodInteractions?.map((item, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-3xl border border-white/10 hover:bg-white/[0.06] transition-all">
                                                                <div>
                                                                    <div className="text-sm font-black text-white mb-0.5">{item.food}</div>
                                                                    <div className="text-[10px] font-bold text-slate-400 italic">{item.effect}</div>
                                                                </div>
                                                                <div className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl shadow-lg ${item.risk === "Extreme" ? "bg-rose-500/20 text-rose-400 shadow-rose-500/10" : item.risk === "Low" ? "bg-emerald-500/20 text-emerald-400 shadow-emerald-500/10" : "bg-blue-500/20 text-blue-400 shadow-blue-500/10"}`}>
                                                                    {item.risk}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Chronotherapy */}
                                            {selectedMed.chronotherapy && (
                                                <div className="p-10 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[3.5rem] border border-blue-500/20 group hover:border-blue-500/40 transition-all text-center flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]"></div>
                                                    <div className="w-20 h-20 rounded-[2rem] bg-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-blue-500/20 border border-blue-500/20 relative z-10">
                                                        <BsClock className="text-4xl text-blue-400 animate-spin-slow" />
                                                    </div>
                                                    <h4 className="text-blue-400 font-extrabold uppercase text-[11px] tracking-[0.4em] mb-4 relative z-10">Optimal Bio-Window</h4>
                                                    <p className="text-sm font-black text-slate-200 leading-relaxed max-w-[240px] italic relative z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                                        "{selectedMed.chronotherapy}"
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* NEW: Generic Substitute Engine */}
                                    {selectedMed.generics && (
                                        <div className="mt-10 p-10 bg-gradient-to-br from-[#0a120b] to-[#050805] rounded-[3.5rem] border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
                                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                                            <div className="flex items-center justify-between mb-8 relative z-10">
                                                <h4 className="flex items-center gap-4 text-emerald-400 font-extrabold uppercase text-[11px] tracking-[0.4em]">
                                                    <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
                                                        <BsPlusSquareFill className="text-2xl" />
                                                    </div>
                                                    {lang === 'hi' ? "बचत इंजन (Switch & Save)" : "Generic Substitute Engine"}
                                                </h4>
                                                <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/10">Cheaper Options</span>
                                            </div>

                                            <div className="grid gap-6 relative z-10">
                                                {selectedMed.generics?.map((gen, i) => {
                                                    const savings = selectedMed.price - gen.price;
                                                    const savingsPercent = Math.round((savings / selectedMed.price) * 100);
                                                    return (
                                                        <div key={i} className="flex items-center justify-between p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/10 hover:border-emerald-500/40 transition-all group/gen hover:bg-white/[0.07] scale-100 hover:scale-[1.01]">
                                                            <div className="flex items-center gap-6">
                                                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/gen:rotate-12 transition-transform">
                                                                    <BsCapsule className="text-emerald-400 text-xl" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-lg font-black text-white mb-1 group-hover/gen:text-emerald-400 transition-colors">{gen.name}</div>
                                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                                        <BsStars className="text-emerald-500" /> Verified Bio-equivalent
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-2xl font-black text-emerald-400 mb-1">₹{gen.price}</div>
                                                                <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-lg uppercase tracking-tighter animate-pulse">
                                                                    Save {savingsPercent}% (₹{savings})
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Section: Schedule & Metrics */}
                                <div className="lg:col-span-4 flex flex-col gap-8">
                                    {/* NEW: Medicine Form & Storage Card */}
                                    <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] p-10 rounded-[4rem] border border-white/10 shadow-3xl relative overflow-hidden">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medicine Form</span>
                                                <span className="text-xl font-black text-white">{selectedMed.form || "Tablet"}</span>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                                {selectedMed.form === "Syrup" ? <BsDropletFill className="text-blue-400 text-xl" /> : <BsCapsule className="text-rose-400 text-xl" />}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                <BsThermometerHalf className="text-blue-400 text-lg" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Storage & Care</span>
                                                <span className="text-[11px] font-bold text-blue-300">
                                                    {lang === 'hi' ? (selectedMed.storage_hi || selectedMed.storage || "ठंडी जगह पर रखें") : (selectedMed.storage || "Keep in cool place")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#0a0d14] p-10 rounded-[4rem] border border-white/10 shadow-3xl text-center relative overflow-hidden">
                                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Visual Time-Table</div>

                                        <div className="grid grid-cols-3 gap-6 mb-10">
                                            {["Morning", "Afternoon", "Night"].map(time => {
                                                const isActive = selectedMed.schedule?.includes(time) || selectedMed.schedule?.includes("Morning", "Afternoon", "Evening", "Night") || selectedMed.schedule?.includes("Anytime") || (selectedMed.schedule?.includes("Evening") && time === "Night") || selectedMed.schedule?.includes("As Needed") || selectedMed.schedule?.includes("As Prescribed") || selectedMed.schedule?.includes("Crisis") || selectedMed.schedule?.includes("Intervals") || selectedMed.schedule?.includes("Now") || selectedMed.schedule?.includes("Anytime") || selectedMed.schedule?.includes("Before Bed") || selectedMed.schedule?.includes("Twice Daily") || selectedMed.schedule?.includes("Bath") || selectedMed.schedule?.includes("Crisis/Need") || selectedMed.schedule?.includes("Daytime");
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

                                        {/* NEW: Dosage Master (Interactive Calculator) */}
                                        <div className="bg-blue-500/10 p-10 rounded-[4rem] border border-blue-500/20 shadow-xl relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Dosage Master</div>
                                                <BsActivity className="text-blue-400 animate-pulse" />
                                            </div>

                                            <div className="mb-6">
                                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-2">
                                                    <span>Body Weight</span>
                                                    <span className="text-white">{dosageWeight} KG</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="5"
                                                    max="120"
                                                    value={dosageWeight}
                                                    onChange={(e) => setDosageWeight(e.target.value)}
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                                />
                                            </div>

                                            <div className="p-6 bg-[#0a0d14] rounded-3xl border border-white/5 text-center">
                                                <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Recommended Precision Dose</div>
                                                <div className="text-2xl font-black text-white">
                                                    {(() => {
                                                        const base = parseFloat(selectedMed.dosage);
                                                        if (isNaN(base)) return selectedMed.dosage;
                                                        const calc = (base * (dosageWeight / 70)).toFixed(0);
                                                        return `${calc}mg`;
                                                    })()}
                                                </div>
                                                <div className="text-[8px] font-bold text-blue-500 mt-2 italic">*Scaling based on 70kg adult reference</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-10 rounded-[4rem] border border-white/5 flex flex-col items-center text-center shadow-xl">
                                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                                            {selectedMed.sources?.map(s => (
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
                                            onClick={() => {
                                                const text = lang === 'hi' ? (selectedMed.usage_hi || selectedMed.usage) : selectedMed.usage;
                                                const utterance = new SpeechSynthesisUtterance(text || '');
                                                utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
                                                window.speechSynthesis.speak(utterance);
                                            }}
                                            className="w-full py-8 rounded-[2.5rem] bg-indigo-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-500 transition-all duration-500 shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Voice Medic <BsStars className="animate-spin-slow" />
                                        </button>
                                        <Link
                                            to="/pharmacy-hub"
                                            className="w-full py-8 rounded-[2.5rem] bg-rose-600 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-500 transition-all duration-500 shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Buy Now <BsArrowLeft className="rotate-180" />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMed(null)}
                                        className="mt-4 w-full py-6 rounded-[2rem] bg-white/5 text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all duration-500 border border-white/10 active:scale-95"
                                    >
                                        Close Encyclopedia
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes bounce-slow { 
                    0%, 100% { transform: translateY(0); } 
                    50% { transform: translateY(-12px); } 
                }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse-slow {
                    0%, 100% { box-shadow: 0 0 20px rgba(225,29,72,0.1); border-color: rgba(244,63,94,0.3); }
                    50% { box-shadow: 0 0 50px rgba(225,29,72,0.3); border-color: rgba(244,63,94,0.6); }
                }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
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
            {/* Tactical Emergency Overlay */}
            {showEmergency && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-rose-950/90 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-[#1a0505] w-full max-w-xl rounded-[4rem] border-4 border-rose-600 p-12 shadow-[0_0_100px_rgba(225,29,72,0.5)]">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-rose-600 flex items-center justify-center mb-8 shadow-2xl animate-pulse">
                                <BsExclamationTriangleFill className="text-5xl text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Immediate Action Required</h2>
                            <p className="text-rose-400 font-bold mb-12 uppercase tracking-widest text-[10px]">Active Side-Effect Containment Protocol</p>

                            <div className="space-y-4 w-full mb-12">
                                {[
                                    { t: "STOP MEDICATION", d: "Cease any further intake immediately.", i: <BsCapsule /> },
                                    { t: "MONITOR VITALS", d: "Check breathing, heart rate, and BP.", i: <BsActivity /> },
                                    { t: "HYDRATION", d: "Drink plenty of room-temperature water.", i: <BsDropletFill /> },
                                    { t: "CALL EMERGENCY", d: <>Dial 108 or contact <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> SOS.</>, i: <BsShieldExclamation /> }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 text-left">
                                        <div className="text-2xl text-rose-500">{step.i}</div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase text-rose-400 tracking-widest mb-1">{step.t}</div>
                                            <p className="text-sm font-bold text-white/80">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowEmergency(false)}
                                className="w-full py-6 rounded-3xl bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 transition-all"
                            >
                                Acknowledge & Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default MedicineSuggestion;
