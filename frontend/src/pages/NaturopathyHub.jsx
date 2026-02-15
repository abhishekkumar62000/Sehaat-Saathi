
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsClock, BsJournalMedical,
    BsShieldExclamation, BsPlusSquareFill, BsStars, BsInfoCircleFill,
    BsCheckCircleFill, BsFlower1, BsHeartFill, BsLightningFill, BsDropletFill,
    BsVolumeUpFill, BsCalculatorFill, BsSunFill, BsWater, BsActivity, BsShieldFillCheck
} from 'react-icons/bs';
import { naturopathyData } from '../utils/naturopathyData';
import confetti from 'canvas-confetti';

// Sub-component: Macro-Therapy Radar (SVG Engine)
const MacroTherapyRadar = ({ category, disease }) => {
    const getStats = () => {
        if (category.includes("Hydro")) return [90, 40, 30, 60, 80]; // Water, Earth, Fire, Air, Ether
        if (category.includes("Mud")) return [30, 95, 20, 40, 50];
        if (category.includes("Yoga")) return [40, 50, 60, 80, 95];
        return [50, 50, 50, 50, 50];
    };

    const stats = getStats();
    const size = 120;
    const center = size / 2;
    const radius = 45;

    const getPoint = (score, index, total) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const dist = (score / 100) * radius;
        return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
    };

    const points = stats.map((s, i) => getPoint(s, i, 5)).join(" ");
    const elements = ["Water", "Earth", "Fire", "Air", "Ether"];

    return (
        <div className="bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-xl flex flex-col items-center">
            <span className="text-[7px] font-black text-green-400 uppercase tracking-widest mb-3">Nature Elements</span>
            <svg width={size} height={size}>
                {[20, 40, 60, 80, 100].map(r => (
                    <circle key={r} cx={center} cy={center} r={(r / 100) * radius} fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="1" />
                ))}
                <polygon points={points} fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />
                {elements.map((el, i) => {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    const tx = center + (radius + 12) * Math.cos(angle);
                    const ty = center + (radius + 12) * Math.sin(angle);
                    return <text key={el} x={tx} y={ty} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="900" textTransform="uppercase">{el}</text>
                })}
            </svg>
        </div>
    );
};

const NaturopathyHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDisease, setActiveDisease] = useState('All');
    const [selectedMed, setSelectedMed] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [langHindi, setLangHindi] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = (text, lang) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang ? 'hi-IN' : 'en-US';
            utterance.rate = 0.9;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    };

    const categories = [
        "All", "Diet Therapy", "Kitchen Pharmacy", "Aromatherapy", "Acupressure", "Chromotherapy", "Hydrotherapy", "Mud Therapy", "Sun Therapy", "Yoga Therapy", "Fasting Therapy"
    ];

    const diseaseFilters = [
        "All", "Diabetes", "Hypertension", "Obesity", "Joint Pain", "Skin", "Digestive", "Stress", "Respiratory", "Womens Health", "Thyroid", "Liver", "Kidney", "Eye Care", "Hair Care", "Child Immunity"
    ];

    const filteredMeds = naturopathyData.filter(med =>
        (activeCategory === 'All' || med.category === activeCategory) &&
        (activeDisease === 'All' ||
            med.disease.includes(activeDisease) || med.name.includes(activeDisease)
        ) &&
        (med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.nameHindi.includes(searchQuery) ||
            med.benefits.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 1) {
            setIsAnalyzing(true);
            setTimeout(() => setIsAnalyzing(false), 800);
        }
    };

    const triggerSurprise = () => {
        const randomMed = naturopathyData[Math.floor(Math.random() * naturopathyData.length)];
        setSelectedMed(randomMed);
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#22c55e', '#16a34a', '#84cc16', '#ffffff'],
            ticks: 300
        });
    };

    return (
        <div className="min-h-screen bg-[#051f0e] text-white selection:bg-green-500/30 font-inter relative overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-green-600/20 rounded-full blur-[150px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-emerald-600/20 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-teal-600/15 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#051f0e]/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-green-300/80 hover:text-green-300 transition-all group font-bold">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setLangHindi(!langHindi)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${langHindi ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'}`}
                        >
                            {langHindi ? 'हिंदी' : 'ENG'}
                        </button>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                            <BsFlower1 className="text-white animate-spin-slow" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black uppercase tracking-[0.2em] text-[10px]">
                                <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>
                            </span>
                            <span className="text-[8px] font-black text-green-400 uppercase tracking-widest">Sovereign Elite v4.0 🏛️</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Filter */}
            <aside className={`fixed right-6 top-32 z-40 transition-all duration-700 ${isFilterOpen ? 'translate-x-0' : 'translate-x-[calc(100%-60px)]'}`}>
                <div className="bg-[#0a2f16]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-[60px] bg-gradient-to-b from-green-600 to-emerald-700 flex flex-col items-center justify-center gap-4 py-8 group"
                    >
                        <BsJournalMedical className={`text-xl text-white transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        <span className="[writing-mode:vertical-lr] font-black uppercase tracking-[0.3em] text-[10px] text-white">
                            {langHindi ? 'रोग फ़िल्टर' : 'Disease Filter'}
                        </span>
                    </button>
                    <div className="p-8 w-[280px] max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <h4 className="text-[10px] font-black uppercase text-green-400/80 tracking-[0.3em] mb-6 border-b border-white/5 pb-2">
                            {langHindi ? 'रोग चुनें' : 'Select Focus'}
                        </h4>
                        <div className="space-y-2">
                            {diseaseFilters.map(disease => (
                                <button
                                    key={disease}
                                    onClick={() => { setActiveDisease(disease); if (window.innerWidth < 768) setIsFilterOpen(false); }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all border ${activeDisease === disease ? 'bg-green-600 border-green-500 text-white shadow-lg scale-105' : 'bg-white/5 border-white/5 text-green-200/50 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <main className="pt-40 pb-20 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    {/* Hero */}
                    <div className="text-center mb-20 animate-fade-in px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-green-300 mb-6">
                            <BsLightningFill className="text-yellow-400" /> {langHindi ? 'प्राकृतिक उपचार' : 'Natural Healing Engine'}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase">
                            <span className="text-[#22c55e]">Sehaat</span> <span className="text-[#f97316]">Saathi</span>
                            <br />
                            <span className="text-[#34d399]">{langHindi ? 'प्राकृतिक चिकित्सा' : 'Naturopathy Hub'}</span>
                        </h1>
                        <p className="text-green-200/60 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mt-8">
                            {langHindi
                                ? 'प्रकृति की शक्ति से उपचार। बिना किसी दवा के स्वस्थ रहें।'
                                : 'Heal with the power of Nature. Zero side effects. Holisitc Lifestyle Correction.'
                            }
                        </p>
                    </div>

                    {/* Search */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 rounded-[3.5rem] blur-lg opacity-40 group-focus-within:opacity-80 transition-opacity"></div>
                            <div className="relative flex items-center bg-[#0a2f16]/80 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                                <BsSearch className="ml-10 text-green-500 text-2xl" />
                                <input
                                    type="text"
                                    placeholder={langHindi ? "समस्या खोजें (जैसे: मधुमेह, मोटापा, तनाव)..." : "Search problem (e.g. Diabetes, Obesity, Stress)..."}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full bg-transparent py-8 px-6 text-xl md:text-2xl font-bold placeholder:text-white/20 text-white focus:outline-none"
                                />
                                {isAnalyzing && (
                                    <div className="mr-8 flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce animation-delay-200"></span>
                                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce animation-delay-400"></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick filters */}
                        <div className="flex flex-wrap justify-center gap-3 mt-12">
                            <button
                                onClick={triggerSurprise}
                                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 animate-bounce-slow"
                            >
                                <BsStars className="text-lg" /> {langHindi ? 'हेल्थ टिप' : 'Daily Health Tip'}
                            </button>
                            {diseaseFilters.slice(1, 6).map((disease, i) => (
                                <button
                                    key={disease}
                                    onClick={() => setActiveDisease(disease)}
                                    className={`px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest border transition-all ${activeDisease === disease ? 'bg-white text-green-900 border-white shadow-lg' : 'bg-white/5 border-white/10 text-green-200/60 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-6xl mx-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-[0.15em] border transition-all ${activeCategory === cat ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-transparent border-transparent text-green-300/40 hover:bg-white/5 hover:text-green-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-y border-white/5 py-10 bg-white/[0.02]">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-green-400 mb-1">{naturopathyData.length}+</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'उपचार' : 'Remedies'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">0%</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'साइड इफेक्ट' : 'Side Effects'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-teal-400 mb-1">100%</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'सुरक्षित' : 'Safe'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-green-400 mb-1">24/7</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'AI मार्गदर्शन' : 'AI Guide'}</div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMeds.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedMed(med)}
                                className="group relative bg-[#0a2f16]/60 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 hover:bg-[#1a3f26] transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.3)]"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/0 to-emerald-600/0 group-hover:from-green-500/20 group-hover:to-emerald-600/20 rounded-[2rem] transition-all opacity-0 group-hover:opacity-100 blur-xl"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                            {med.category.includes('Sun') ? <BsSunFill className="text-xl text-yellow-400" /> :
                                                med.category.includes('Water') || med.category.includes('Hydro') ? <BsWater className="text-xl text-blue-400" /> :
                                                    <BsFlower1 className="text-xl text-green-400" />}
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase text-white/60 tracking-widest group-hover:bg-green-500 group-hover:text-white transition-colors">
                                            {med.category}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 text-white group-hover:text-green-200 transition-colors line-clamp-1">
                                        {langHindi ? (med?.nameHindi || med?.name) : (med?.name || "Therapy")}
                                    </h3>
                                    <p className="text-xs text-white/40 mb-4">{med?.disease || "General Wellness"}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-green-200/70">{med?.duration || "As needed"}</span>
                                    </div>
                                    <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center">
                                        <div className="text-[10px] font-bold text-white/40">{langHindi ? 'अधिक जानें' : 'Read More'}</div>
                                        <BsArrowLeft className="rotate-180 text-white/20 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredMeds.length === 0 && (
                        <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BsShieldExclamation className="text-3xl text-green-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">{langHindi ? 'कोई उपचार नहीं मिला' : 'No Matching Therapies'}</h3>
                            <p className="text-white/40 mb-8">{langHindi ? 'अपनी खोज बदलें' : 'Try broadening your search'}</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveDisease('All') }} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black uppercase tracking-widest transition-all">
                                {langHindi ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            {selectedMed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div onClick={() => setSelectedMed(null)} className="absolute inset-0 bg-[#051f0e]/90 backdrop-blur-3xl"></div>
                    <div className="w-full max-w-5xl bg-[#0a2f16] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-green-900/40 to-transparent pointer-events-none"></div>
                        <button
                            onClick={() => setSelectedMed(null)}
                            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 flex items-center justify-center transition-all z-20 group border border-white/10"
                        >
                            <BsPlusSquareFill className="rotate-45 text-white/60 group-hover:text-white" />
                        </button>

                        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative z-10">
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black uppercase text-green-400 tracking-widest">
                                            {selectedMed.category}
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-emerald-200 mb-2 flex items-center gap-4">
                                        {langHindi ? selectedMed.nameHindi : selectedMed.name}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSpeak(langHindi ? selectedMed.procedureHindi : selectedMed.procedure, langHindi); }}
                                            className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all ${isSpeaking ? 'bg-green-500 text-white animate-pulse' : 'bg-white/5 text-white/40 hover:bg-green-500 hover:text-white'}`}
                                        >
                                            <BsVolumeUpFill className="text-lg" />
                                        </button>
                                    </h2>
                                    <p className="text-xl text-green-400/60 mb-8">{selectedMed.disease}</p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group/box">
                                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover/box:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <BsInfoCircleFill className="text-green-400" />
                                                <h4 className="text-[10px] font-black uppercase text-white/50 tracking-widest">{langHindi ? 'विधि' : 'Procedure'}</h4>
                                            </div>
                                            <p className="text-white/80 font-medium leading-relaxed relative z-10">
                                                {langHindi ? (selectedMed?.procedureHindi || selectedMed?.procedure) : (selectedMed?.procedure || "Follow standard guidelines.")}
                                            </p>
                                        </div>
                                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group/box">
                                            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/box:opacity-100 transition-opacity"></div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <BsCheckCircleFill className="text-emerald-400" />
                                                <h4 className="text-[10px] font-black uppercase text-white/50 tracking-widest">{langHindi ? 'लाभ' : 'Benefits'}</h4>
                                            </div>
                                            <p className="text-white/70 relative z-10">
                                                {langHindi ? (selectedMed?.benefitsHindi || selectedMed?.benefits) : (selectedMed?.benefits || "Promotes holistic wellness.")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/10 p-6 rounded-[2rem] border border-yellow-500/20 mb-6 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                            <BsShieldExclamation className="text-yellow-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase text-yellow-400/80 tracking-widest mb-1">
                                                {langHindi ? 'सावधानी' : 'Clinical Caution'}
                                            </h4>
                                            <p className="text-white/60 text-xs leading-relaxed">{selectedMed?.caution || "Consult a specialist if symptoms persist."}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-80 flex flex-col gap-4">
                                    <MacroTherapyRadar category={selectedMed?.category || "General"} disease={selectedMed?.disease || "All"} />

                                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-8 rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden group/card text-white">
                                        <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                        <BsClock className="text-3xl text-green-400 mx-auto mb-4 relative z-10" />
                                        <div className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1 relative z-10">{langHindi ? 'अवधि / समय' : 'Duration / Timing'}</div>
                                        <div className="text-xl font-bold text-white relative z-10 mb-2">{selectedMed?.duration || "Regular"}</div>
                                        <div className="text-[10px] font-bold text-green-400/80 uppercase tracking-tighter bg-green-500/10 py-1 rounded-full relative z-10 border border-green-500/10 mx-4">
                                            <BsActivity className="inline mr-1" /> Circadian Target
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-center">
                                        <BsHeartFill className="text-3xl text-emerald-400 mx-auto mb-4" />
                                        <div className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1">{langHindi ? 'स्रोत' : 'Source'}</div>
                                        <div className="text-lg font-bold text-white">{selectedMed.source}</div>
                                    </div>
                                    <div className="mt-auto flex gap-3">
                                        <button onClick={() => setSelectedMed(null)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors">
                                            {langHindi ? 'बंद करें' : 'Close'}
                                        </button>
                                        <Link to="/doctor-ai" className="flex-[2] py-4 bg-green-600 hover:bg-green-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg">
                                            {langHindi ? 'सलाह लें' : 'Consult AI'} <BsArrowLeft className="rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
                @keyframes neural-glow { 0% { border-color: rgba(34,197,94,0.1); } 50% { border-color: rgba(34,197,94,0.6); box-shadow: 0 0 20px rgba(34,197,94,0.2); } 100% { border-color: rgba(34,197,94,0.1); } }
                .animate-blob { animation: blob 10s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
                .animate-spin-slow { animation: spin 8s linear infinite; }
                .neural-card-glow { animation: neural-glow 3s infinite ease-in-out; }
            `}</style>
        </div>
    );
};

export default NaturopathyHub;
