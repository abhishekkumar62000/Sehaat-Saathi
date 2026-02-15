import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsCapsule, BsClock, BsJournalMedical,
    BsShieldExclamation, BsPlusSquareFill, BsStars, BsInfoCircleFill,
    BsCheckCircleFill, BsSun, BsSunFill, BsMoonStarsFill, BsShieldFillCheck,
    BsDropletFill, BsTreeFill, BsFlower1, BsHeartFill, BsLightningFill, BsActivity,
    BsExclamationTriangleFill, BsLightningChargeFill, BsPersonFillGear, BsIntersect,
    BsGearFill, BsShieldLockFill, BsBookmarksFill, BsArrowRight
} from 'react-icons/bs';
import { homeopathyDb } from '../utils/homeopathyData';
import confetti from 'canvas-confetti';

// Sub-component: Remedy Bio-Radar (SVG Engine)
const RemedyBioRadar = ({ category, name, miasmaticCore, emotionalAura }) => {
    const getProfile = () => {
        // Dynamic profile generation based on presence of key fields
        const physical = 60 + (category === "First Aid" ? 30 : 0);
        const mental = emotionalAura ? 85 : 40;
        const miasm = miasmaticCore ? 80 : 50;
        const acute = category === "First Aid" || category === "Cough/Flu" ? 90 : 40;
        const chronic = category === "Constitutional" ? 95 : 30;
        const vital = 75;
        const emotional = emotionalAura ? 90 : 50;

        return [acute, mental, miasm, physical, vital, emotional, chronic];
    };

    const profile = getProfile();
    const size = 160;
    const center = size / 2;
    const radius = 60;

    const getPoint = (score, index, total) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const dist = (score / 100) * radius;
        return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
    };

    const points = profile.map((s, i) => getPoint(s, i, 7)).join(" ");
    const axes = ["Acute", "Mental", "Miasm", "Body", "Vital", "Emot", "Chron"];

    return (
        <div className="bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-xl flex flex-col items-center">
            <span className="text-[7px] font-black text-rose-400 uppercase tracking-widest mb-3">Sovereign Potency Matrix</span>
            <svg width={size} height={size}>
                {[20, 40, 60, 80, 100].map(r => (
                    <circle key={r} cx={center} cy={center} r={(r / 100) * radius} fill="none" stroke="rgba(244,63,94,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
                ))}
                <polygon points={points} fill="rgba(244,63,94,0.25)" stroke="#f43f5e" strokeWidth="2.5" strokeLinejoin="round" className="animate-pulse" />
                {axes.map((ax, i) => {
                    const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2;
                    const tx = center + (radius + 12) * Math.cos(angle);
                    const ty = center + (radius + 12) * Math.sin(angle);
                    return <text key={ax} x={tx} y={ty} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="900" textTransform="uppercase">{ax}</text>
                })}
            </svg>
        </div>
    );
};

// Sub-component: Potency Advisor (Clinical Intelligence)
const PotencyAdvisor = ({ language }) => {
    const [intensity, setIntensity] = useState(50);
    const getAdvice = (val) => {
        if (val < 30) return language === 'hi' ? "30C: पुरानी शिकायतों या संवेदनशील रोगियों के लिए हल्के प्रभाव के साथ शुरू करें।" : "30C: Start with gentle action for chronic complaints or sensitive patients.";
        if (val < 70) return language === 'hi' ? "200C: तीव्र आघात, अचानक स्थिति बिगड़ने या मजबूत जीवन शक्ति के लिए।" : "200C: For acute trauma, sudden onset, or strong vital force.";
        return language === 'hi' ? "1M: केवल गहरे मानसिक आघात या उन्नत नैदानिक मार्गदर्शन के तहत।" : "1M: Only for deep mental trauma or under advanced clinical guidance.";
    };

    return (
        <div className="p-10 bg-gradient-to-br from-[#1a0b2e] to-[#250e36] rounded-[3.5rem] border border-amber-500/20 mb-10 shadow-2xl relative overflow-hidden group/advisor">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-[80px] rounded-full group-hover/advisor:bg-amber-500/10 transition-all"></div>
            <h4 className="text-[12px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <BsGearFill className="animate-spin-slow text-amber-500" />
                </div>
                {language === 'hi' ? 'पोटेंसी इंटेलिजेंस एडवाइजर' : 'Potency Intelligence Advisor'}
            </h4>
            <div className="mb-10 px-4">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-amber-500 border border-white/5"
                />
                <div className="flex justify-between mt-4 text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">
                    <span>{language === 'hi' ? 'हल्का' : 'Gentle'}</span>
                    <span className="text-amber-500/60 font-black">{intensity}%</span>
                    <span>{language === 'hi' ? 'गहन' : 'Intense'}</span>
                </div>
            </div>
            <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 backdrop-blur-md relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 animate-pulse"></div>
                <p className={`text-lg font-bold text-amber-100 leading-[1.7] italic animate-fade-in ${language === 'hi' ? 'line-height-hi' : ''}`} key={intensity}>
                    {getAdvice(intensity)}
                </p>
            </div>
        </div>
    );
};

const HomeopathyHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDisease, setActiveDisease] = useState('All');
    const [selectedMed, setSelectedMed] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [timeContext, setTimeContext] = useState("Vesper Vital-Force Peak");
    const [versusQueue, setVersusQueue] = useState([]);
    const [remedyForm, setRemedyForm] = useState('All');
    const [remedySource, setRemedySource] = useState('All');
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Clinical', 'Safety'

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 8) setTimeContext("Dawn Dynamization Peak");
        else if (hour < 18) setTimeContext("Daylight Miasmatic Shield");
        else setTimeContext("Vesper Vital-Force Peak");

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const categories = [
        "All", "First Aid", "Digestive", "Cough/Flu", "Respiratory",
        "Joint/Skin", "Women's Health", "Men's Health", "Pediatric",
        "Mental Health", "Skin/Allergy", "Skin/Infection", "Kidney",
        "Heart", "Gt/Liver", "Neural", "Constitutional", "Specific"
    ];

    const diseaseFilters = [
        "All", "Fever", "Cough", "Headache", "Stomach Pain",
        "Anxiety", "Grief", "Bruises", "Joint Pain",
        "Itching", "Bloating", "Skin Rash", "Stress"
    ];

    const filteredMeds = homeopathyDb.filter(med =>
        (activeCategory === 'All' || med.category === activeCategory) &&
        (activeDisease === 'All' ||
            med.symptoms.some(s => s.toLowerCase().includes(activeDisease.toLowerCase())) ||
            (activeDisease === "Cough" && med.symptoms.some(s => s.toLowerCase().includes("breath") || s.toLowerCase().includes("mucus")))
        ) &&
        (remedyForm === 'All' || med.remedyID?.form === remedyForm) &&
        (med.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
            med.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 1) {
            setIsAnalyzing(true);
            setTimeout(() => setIsAnalyzing(false), 800);
        }
    };

    const triggerSurprise = () => {
        const randomMed = homeopathyDb[Math.floor(Math.random() * homeopathyDb.length)];
        setSelectedMed(randomMed);
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ec4899', '#d946ef', '#f59e0b', '#ffffff'],
            ticks: 300
        });
    };

    return (
        <div className="min-h-screen bg-[#0f0418] text-white selection:bg-fuchsia-500/30 font-inter relative overflow-x-hidden">
            {/* Ambient Background Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[150px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-rose-600/20 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-violet-600/20 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Glass Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0418]/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-rose-300/80 hover:text-rose-300 transition-all group font-bold tracking-tight">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                            <BsStars className="text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black uppercase tracking-[0.2em] text-[10px]">
                                <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>
                            </span>
                            <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Sovereign Elite v7.0 🏛️</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Fixed Filter Hub */}
            <aside className={`fixed right-6 top-32 z-40 transition-all duration-700 ${isFilterOpen ? 'translate-x-0' : 'translate-x-[calc(100%-60px)]'}`}>
                <div className="bg-[#1a0826]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50 overflow-hidden flex">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-[60px] bg-gradient-to-b from-rose-600 to-fuchsia-700 flex flex-col items-center justify-center gap-4 py-8 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <BsJournalMedical className={`text-xl text-white transition-transform duration-500 relative z-10 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        <span className="[writing-mode:vertical-lr] font-black uppercase tracking-[0.3em] text-[10px] items-center text-white relative z-10">
                            Ailment Filter
                        </span>
                    </button>

                    <div className="p-8 w-[280px] max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <h4 className="text-[10px] font-black uppercase text-fuchsia-400/80 tracking-[0.3em] mb-6 border-b border-white/5 pb-2">Select Focus</h4>
                        <div className="space-y-2 mb-10">
                            {diseaseFilters.map(disease => (
                                <button
                                    key={disease}
                                    onClick={() => {
                                        setActiveDisease(disease);
                                        if (window.innerWidth < 768) setIsFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all border ${activeDisease === disease ? 'bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/50 scale-105' : 'bg-white/5 border-white/5 text-rose-200/50 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>

                        <h4 className="text-[10px] font-black uppercase text-amber-400/80 tracking-[0.3em] mb-6 border-b border-white/5 pb-2">Remedy ID Vision</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="text-[8px] font-black text-white/40 uppercase mb-2">Potency Form</div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['All', 'Globules', 'Dilution', 'MT', 'Trituration'].map(form => (
                                        <button
                                            key={form}
                                            onClick={() => setRemedyForm(form)}
                                            className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all ${remedyForm === form ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                                        >
                                            {form}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="pt-40 pb-20 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-24 animate-fade-in relative px-4">
                        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-rose-300">
                                <BsShieldFillCheck className="text-rose-500" /> Sovereign Elite v7.0
                            </div>
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-[9px] font-black uppercase tracking-[0.1em] text-rose-100">
                                <BsStars className="animate-pulse" /> {timeContext}
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.8] tracking-tighter uppercase group">
                            <span className="text-[#22c55e]">Sehaat</span> <span className="text-[#f97316]">Saathi</span>
                            <br />
                            <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-700 block mt-4">
                                Homeopathy Hub
                            </span>
                        </h1>
                        <p className="text-rose-200/60 text-lg md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed mt-12">
                            Access India's most advanced constitutional <span className="text-white font-extrabold italic underline decoration-rose-500/50">potency engine</span>. Merging quantum pharmacology with National Sovereign clinical rationale.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-amber-500 rounded-[3.5rem] blur-lg opacity-40 group-focus-within:opacity-80 transition-duration-500 transition-opacity"></div>
                            <div className="relative flex items-center bg-[#150520]/80 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                                <BsSearch className="ml-10 text-rose-500 text-2xl" />
                                <input
                                    type="text"
                                    placeholder="Search symptoms (e.g. Grief, Bruises, Shock)..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full bg-transparent py-8 px-6 text-xl md:text-2xl font-bold placeholder:text-white/20 text-white focus:outline-none"
                                />
                                {isAnalyzing && (
                                    <div className="mr-8 flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce animation-delay-200"></span>
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce animation-delay-400"></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Disease Selection Quick Bar */}
                        <div className="flex flex-wrap justify-center gap-3 mt-12">
                            <button
                                onClick={triggerSurprise}
                                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-110 transition-transform flex items-center gap-2 animate-bounce-slow"
                            >
                                <BsStars className="text-lg" /> Surprise Remedy
                            </button>
                            {diseaseFilters.slice(1, 8).map((disease, i) => (
                                <button
                                    key={disease}
                                    onClick={() => setActiveDisease(disease)}
                                    className={`px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest border transition-all duration-300 ${activeDisease === disease ? 'bg-white text-fuchsia-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-white/5 border-white/10 text-rose-200/60 hover:bg-white/10 hover:text-white hover:border-white/30'}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-6xl mx-auto">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-[0.15em] border transition-all duration-300 ${activeCategory === cat ? 'bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/50' : 'bg-transparent border-transparent text-rose-300/40 hover:bg-white/5 hover:text-rose-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-y border-white/5 py-10 bg-white/[0.02]">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-rose-400 mb-1">{homeopathyDb.length}</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">Remedies</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-fuchsia-400 mb-1">100%</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">Natural</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">0%</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">Side Effects</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">24/7</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">Availability</div>
                        </div>
                    </div>

                    {/* Pro Glass Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMeds.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedMed(med)}
                                className="group relative bg-[#1c0b29]/60 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 hover:bg-[#250e36] transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.3)]"
                            >
                                {/* Hover Glow */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-br from-rose-500/0 to-fuchsia-600/0 group-hover:from-rose-500/20 group-hover:to-fuchsia-600/20 rounded-[2rem] transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                            <BsDropletFill className={`text-xl text-${med.color === 'white' ? 'gray-200' : med.color + '-400'}`} />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase text-white/60 tracking-widest group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                                            {language === 'hi' && med.category_hi ? med.category_hi : med.category}
                                        </div>
                                    </div>

                                    {med.emergencyRedline && (
                                        <div className="absolute top-4 right-20 animate-pulse">
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-rose-500/20 border border-rose-500/40">
                                                <BsExclamationTriangleFill className="text-[10px] text-rose-500" />
                                                <span className="text-[7px] font-black text-rose-400 uppercase tracking-widest">Critical</span>
                                            </div>
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-fuchsia-200 transition-colors line-clamp-1">
                                        {language === 'hi' && med.name_hi ? med.name_hi : med.name}
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {(language === 'hi' && med.symptoms_hi ? med.symptoms_hi : med.symptoms).slice(0, 3).map(s => (
                                            <span key={s} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-rose-200/70">{s}</span>
                                        ))}
                                    </div>

                                    <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center gap-4">
                                        <div className="text-[10px] font-bold text-white/40 group-hover:text-white/80 transition-colors">
                                            {med?.dosage || '30C'}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (versusQueue.length < 2 && !versusQueue.find(m => m.name === med.name)) {
                                                    setVersusQueue([...versusQueue, med]);
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-widest transition-all ${versusQueue.find(m => m.name === med.name) ? 'bg-amber-500 border-amber-500 text-black' : 'bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black'}`}
                                        >
                                            {versusQueue.find(m => m.name === med.name) ? 'Selected' : 'Duel'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredMeds.length === 0 && (
                        <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BsShieldExclamation className="text-3xl text-rose-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">No Matching Remedies</h3>
                            <p className="text-white/40 mb-8 max-w-md mx-auto">We couldn't find a remedy matching your criteria. Try broadening your search or selecting a different category.</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveDisease('All') }} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black uppercase tracking-widest transition-all">Clear Filters</button>
                        </div>
                    )}
                </div>
            </main>

            {/* Versus Comparison Overlay */}
            {versusQueue.length === 2 && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-[#0f0418]/98 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-[#150520] w-full max-w-7xl rounded-[4rem] border border-amber-500/30 overflow-hidden shadow-2xl relative">
                        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500"></div>
                        <div className="p-12 md:p-20 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-16">
                                <h2 className="text-4xl font-black uppercase tracking-tighter italic">
                                    {language === 'hi' ? 'मियास्मैटिक' : 'Miasmatic'} <span className="text-amber-500">{language === 'hi' ? 'वर्सेस' : 'Versus'}</span> {language === 'hi' ? 'द्वंद्व' : 'Duel'}
                                </h2>
                                <button
                                    onClick={() => setVersusQueue([])}
                                    className="px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all outline-none"
                                >
                                    {language === 'hi' ? 'मैट्रिक्स बंद करें' : 'Dismiss Matrix'}
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#0f0418] border border-amber-500/50 flex items-center justify-center z-10 hidden md:flex">
                                    <span className="text-amber-500 font-black italic">VS</span>
                                </div>

                                {versusQueue.map((med, idx) => (
                                    <div key={idx} className={`p-10 rounded-[3rem] border ${idx === 0 ? 'border-fuchsia-500/20 bg-fuchsia-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                                        <div className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-4">
                                            {language === 'hi' ? 'पोटेंसी' : 'Potency'} 0{idx + 1}
                                        </div>
                                        <h3 className="text-5xl font-black mb-8 uppercase tracking-tighter text-white">{language === 'hi' && med.name_hi ? med.name_hi : med.name}</h3>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-white/40 uppercase">{language === 'hi' ? 'क्रिया की गहराई' : 'Action Depth'}</span>
                                                <span className="text-sm font-black text-white">{med.category === "Constitutional" ? (language === 'hi' ? "गहरी क्रिया" : "Deep Acting") : (language === 'hi' ? "लक्षण आधारित" : "Symptomatic")}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-white/40 uppercase">{language === 'hi' ? 'वाइटल फोर्स पावर' : 'Vital Force Power'}</span>
                                                <span className={`text-sm font-black ${med.dosage?.includes('200C') ? "text-amber-400" : "text-emerald-400"}`}>{language === 'hi' && med.dosage_hi ? med.dosage_hi : (med.dosage || "Dynamic")}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                <span className="text-xs font-bold text-white/40 uppercase">{language === 'hi' ? 'मुख्य उद्देश्य' : 'Primary Focus'}</span>
                                                <span className="text-sm font-black text-white">{language === 'hi' && med.symptoms_hi ? med.symptoms_hi[0] : med.symptoms[0]}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-white/40 uppercase">{language === 'hi' ? 'कीमत' : 'Pricing'}</span>
                                                <span className="text-sm font-black text-emerald-400">₹{med.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center">
                                <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">
                                    {language === 'hi' ? 'संवैधानिक तर्क' : 'Constitutional Rationale'}
                                </div>
                                <p className="text-xl font-bold text-slate-300 italic max-w-4xl mx-auto leading-relaxed">
                                    {language === 'hi' ? (
                                        <>
                                            मियास्मैटिक गहराई और नैदानिक संकेतों के आधार पर <span className="text-white font-black">{versusQueue[0].name_hi || versusQueue[0].name}</span> और <span className="text-white font-black">{versusQueue[1].name_hi || versusQueue[1].name}</span> की तुलना करें। वह उपाय चुनें जो रोगी की <span className="text-amber-400 underline underline-offset-8">संपूर्ण समग्रता</span> के सबसे करीब हो।
                                        </>
                                    ) : (
                                        <>
                                            Compare <span className="text-white font-black">{versusQueue[0].name}</span> and <span className="text-white font-black">{versusQueue[1].name}</span> based on miasmatic depth and clinical indications. Choose the remedy that resonates closest to the patient's <span className="text-amber-400 underline underline-offset-8">Total Totality</span>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Modal (Dossier) */}
            {
                selectedMed && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-[#0a0510]/95 backdrop-blur-3xl animate-fade-in"
                            onClick={() => setSelectedMed(null)}
                        ></div>

                        <div className="bg-[#150520] w-full max-w-6xl h-[85vh] rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl relative animate-slide-up group flex flex-col">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>

                            <button
                                onClick={() => setSelectedMed(null)}
                                className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-20 group/btn overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                <span className="text-3xl font-light relative z-10">×</span>
                            </button>

                            {/* Dossier Tabs */}
                            <div className="flex px-12 pt-10 gap-8 border-b border-white/5 bg-black/20">
                                {['Overview', 'Clinical', 'Safety'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-fuchsia-400' : 'text-white/30 hover:text-white/60'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-500 animate-glow-pulse"></div>}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 md:pb-20 custom-scrollbar relative z-10">
                                <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                                    {/* Language Toggle */}
                                    <button
                                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden relative"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <span className={`text-[10px] font-black tracking-widest uppercase ${language === 'hi' ? 'text-fuchsia-400' : 'text-slate-500'}`}>हिन्दी</span>
                                        <div className="w-10 h-5 bg-black/40 rounded-full p-1 relative border border-white/5">
                                            <div className={`w-3 h-3 rounded-full bg-white shadow-lg transition-all duration-300 ${language === 'hi' ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </div>
                                        <span className={`text-[10px] font-black tracking-widest uppercase ${language === 'en' ? 'text-fuchsia-400' : 'text-slate-500'}`}>EN</span>
                                    </button>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1">
                                        {activeTab === 'Overview' && (
                                            <div className="animate-fade-in">
                                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                                    <div className="px-6 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black uppercase tracking-widest">
                                                        {language === 'hi' && selectedMed.category_hi ? selectedMed.category_hi : selectedMed.category}
                                                    </div>
                                                    <div className="px-6 py-1.5 rounded-full bg-emerald-500 text-[10px] font-black uppercase text-white tracking-widest shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
                                                        {language === 'hi' ? 'कुलीन v7.0' : 'Elite v7.0'}
                                                    </div>
                                                </div>

                                                <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter text-white">
                                                    {language === 'hi' && selectedMed.name_hi ? selectedMed.name_hi : selectedMed.name}
                                                </h2>
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase">
                                                        <BsInfoCircleFill /> {selectedMed.sources[0]} {language === 'hi' ? 'नैदानिक डेटा' : 'CLINICAL DATA'}
                                                    </div>
                                                </div>

                                                <div className="p-10 bg-white/[0.03] rounded-[3rem] border border-white/10 mb-10 group hover:border-fuchsia-500/30 transition-all hover:bg-white/[0.05] relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500/20 group-hover:bg-fuchsia-500 transition-colors"></div>
                                                    <h4 className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                        <BsInfoCircleFill /> {language === 'hi' ? 'प्राथमिक संकेत (Primary Indication)' : 'Primary Indication'}
                                                    </h4>
                                                    <p className={`text-2xl font-bold text-slate-100 leading-[1.8] italic ${language === 'hi' ? 'font-light' : ''}`}>
                                                        "{language === 'hi' && selectedMed.usage_hi ? selectedMed.usage_hi : selectedMed.usage}"
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-10">
                                                    <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
                                                        <div className="text-[10px] font-black text-rose-300 uppercase mb-2">{language === 'hi' ? 'खुराक पैटर्न' : 'Dosage Pattern'}</div>
                                                        <div className="text-lg font-black text-white">{language === 'hi' && selectedMed.dosage_hi ? selectedMed.dosage_hi : selectedMed.dosage}</div>
                                                    </div>
                                                    <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
                                                        <div className="text-[10px] font-black text-rose-300 uppercase mb-2">{language === 'hi' ? 'दैनिक आवृत्ति' : 'Daily Frequency'}</div>
                                                        <div className="text-lg font-black text-white">{language === 'hi' && selectedMed.frequency_hi ? selectedMed.frequency_hi : selectedMed.frequency}</div>
                                                    </div>
                                                </div>

                                                {selectedMed.benefits && (
                                                    <div className="p-10 bg-white/[0.03] rounded-[3rem] border border-white/10 mb-10">
                                                        <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                            <BsCheckCircleFill /> {language === 'hi' ? 'प्रमुख लाभ (Key Benefits)' : 'Key Benefits'}
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {(language === 'hi' && selectedMed.benefits_hi ? selectedMed.benefits_hi : selectedMed.benefits).map((benefit, i) => (
                                                                <div key={i} className="flex gap-3 items-start p-4 bg-white/5 rounded-2xl border border-white/5">
                                                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                                    <span className="text-sm font-bold text-white/80">{benefit}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex flex-wrap gap-3">
                                                    {(language === 'hi' && selectedMed.symptoms_hi ? selectedMed.symptoms_hi : selectedMed.symptoms).map(s => (
                                                        <span key={s} className="px-5 py-2.5 rounded-2xl bg-[#0f0418] border border-white/10 text-[11px] font-bold text-rose-300 hover:border-rose-500/40 transition-all cursor-default">#{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'Clinical' && (
                                            <div className="animate-fade-in">
                                                {selectedMed.clinicalKeynotes && (
                                                    <div className="p-10 bg-white/[0.03] rounded-[3.5rem] border border-white/10 mb-10 group hover:bg-white/[0.05] transition-all relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                                                        <h4 className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[11px] tracking-[0.3em] mb-8">
                                                            <BsBookmarksFill className="text-xl" /> {language === 'hi' ? 'नैदानिक मुख्य बातें (Keynotes)' : 'Clinical Keynotes'}
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                            {(language === 'hi' && selectedMed.clinicalKeynotes_hi ? selectedMed.clinicalKeynotes_hi : selectedMed.clinicalKeynotes).map((k, i) => (
                                                                <div key={i} className="p-6 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 flex items-center gap-4 group/note hover:bg-emerald-500/10 transition-all">
                                                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                                    <span className={`text-sm font-black text-slate-100 uppercase tracking-tight leading-relaxed ${language === 'hi' ? 'text-base' : ''}`}>{k}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                                    {selectedMed.miasmaticCore && (
                                                        <div className="p-10 bg-white/[0.03] rounded-[3.5rem] border border-violet-500/20 hover:border-violet-500/40 transition-all group/miasm relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500/20 group-hover/miasm:bg-violet-500 transition-colors"></div>
                                                            <h4 className="flex items-center gap-3 text-violet-400 font-black uppercase text-[11px] tracking-[0.3em] mb-6">
                                                                <BsIntersect className="text-xl group-hover/miasm:rotate-180 transition-transform duration-1000" /> {language === 'hi' ? 'मियास्मैटिक कोर' : 'Miasmatic Core'}
                                                            </h4>
                                                            <p className={`text-lg font-bold text-slate-200 leading-relaxed ${language === 'hi' ? 'text-xl leading-[1.8]' : ''}`}>
                                                                {language === 'hi' && selectedMed.miasmaticCore_hi ? selectedMed.miasmaticCore_hi : selectedMed.miasmaticCore}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {selectedMed.emotionalAura && (
                                                        <div className="p-10 bg-white/[0.03] rounded-[3.5rem] border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-all group/aura relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-fuchsia-500/20 group-hover/aura:bg-fuchsia-500 transition-colors"></div>
                                                            <h4 className="flex items-center gap-3 text-fuchsia-400 font-black uppercase text-[11px] tracking-[0.3em] mb-6">
                                                                <BsStars className="text-xl animate-pulse" /> {language === 'hi' ? 'मानसिक आभा (Emotional)' : 'Mental/Emotional Aura'}
                                                            </h4>
                                                            <p className={`text-lg font-bold text-slate-100 italic leading-relaxed ${language === 'hi' ? 'text-xl leading-[1.8]' : ''}`}>
                                                                "{language === 'hi' && selectedMed.emotionalAura_hi ? selectedMed.emotionalAura_hi : selectedMed.emotionalAura}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {selectedMed.modalities && (
                                                    <div className="grid grid-cols-2 gap-8 mb-10">
                                                        <div className="p-10 bg-rose-500/[0.03] rounded-[3.5rem] border border-rose-500/20 group hover:bg-rose-500/[0.05] transition-all relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500/20 group-hover:bg-rose-500 transition-colors"></div>
                                                            <h4 className="text-xs font-black text-rose-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                                                <BsLightningChargeFill className="text-lg" /> {language === 'hi' ? 'वृद्धि (Aggr)' : 'Worse From'}
                                                            </h4>
                                                            <p className={`text-lg font-bold text-slate-200 leading-relaxed ${language === 'hi' ? 'text-xl leading-[1.8]' : ''}`}>
                                                                {language === 'hi' && selectedMed.modalities.aggravation_hi ? selectedMed.modalities.aggravation_hi : selectedMed.modalities.aggravation}
                                                            </p>
                                                        </div>
                                                        <div className="p-10 bg-emerald-500/[0.03] rounded-[3.5rem] border border-emerald-500/20 group hover:bg-emerald-500/[0.05] transition-all relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                                                            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                                                <BsCheckCircleFill className="text-lg" /> {language === 'hi' ? 'सुधार (Amel)' : 'Better From'}
                                                            </h4>
                                                            <p className={`text-lg font-bold text-slate-200 leading-relaxed ${language === 'hi' ? 'text-xl leading-[1.8]' : ''}`}>
                                                                {language === 'hi' && selectedMed.modalities.amelioration_hi ? selectedMed.modalities.amelioration_hi : selectedMed.modalities.amelioration}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {selectedMed.constitutionProfile && (
                                                    <div className="p-10 bg-white/[0.03] rounded-[3.5rem] border border-violet-500/20 mb-10 group hover:bg-violet-600/5 transition-all relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500/40 group-hover:bg-violet-500 transition-colors"></div>
                                                        <h4 className="flex items-center gap-3 text-violet-400 font-black uppercase text-[11px] tracking-[0.3em] mb-6">
                                                            <BsPersonFillGear className="text-xl" /> {language === 'hi' ? 'संवैधानिक रूपरेखा (Constitution)' : 'Constitution Profile'}
                                                        </h4>
                                                        <p className={`text-2xl font-bold text-slate-100 italic leading-[1.8] ${language === 'hi' ? 'text-3xl font-light' : ''}`}>
                                                            "{language === 'hi' && selectedMed.constitutionProfile_hi ? selectedMed.constitutionProfile_hi : selectedMed.constitutionProfile}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {activeTab === 'Safety' && (
                                            <div className="animate-fade-in">
                                                {selectedMed.emergencyRedline && (
                                                    <div className="p-10 bg-rose-600/10 rounded-[4rem] border-2 border-rose-500/50 mb-10 overflow-hidden relative group/redline shadow-[0_0_60px_rgba(244,63,94,0.3)]">
                                                        <div className="absolute inset-0 bg-rose-500/5 animate-pulse"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="flex items-center gap-4 text-rose-400 font-black uppercase text-sm tracking-[0.4em] mb-6">
                                                                <BsExclamationTriangleFill className="text-2xl animate-bounce" /> {language === 'hi' ? 'जीवन और मृत्यु रेडलाइन (Critical)' : 'Life & Death Redline'}
                                                            </h4>
                                                            <p className={`text-2xl font-black text-rose-100 leading-[1.8] ${language === 'hi' ? 'text-3xl font-light' : ''}`}>
                                                                "{language === 'hi' && selectedMed.emergencyRedline_hi ? selectedMed.emergencyRedline_hi : selectedMed.emergencyRedline}"
                                                            </p>
                                                            <div className="mt-8 flex items-center gap-3 text-[11px] font-black text-rose-300/60 uppercase tracking-widest bg-rose-500/10 py-2 px-4 rounded-full border border-rose-500/20 w-fit">
                                                                <BsDropletFill className="animate-pulse" /> {language === 'hi' ? 'तत्काल नैदानिक ध्यान आवश्यक' : 'Immediate Clinical Attention Required'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <PotencyAdvisor language={language} />

                                                {selectedMed.inimicalRemedies && selectedMed.inimicalRemedies.length > 0 && (
                                                    <div className="p-10 bg-rose-600/5 rounded-[3.5rem] border border-rose-500/20 mb-10 group/inimical relative overflow-hidden hover:bg-rose-600/10 transition-all">
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500/20 group-hover/inimical:bg-rose-500 transition-colors"></div>
                                                        <h4 className="flex items-center gap-3 text-rose-400 font-black uppercase text-[11px] tracking-[0.3em] mb-6">
                                                            <BsShieldLockFill className="text-xl group-hover/inimical:scale-125 transition-transform" /> {language === 'hi' ? 'शत्रुतापूर्ण संबंध (Inimical)' : 'Inimical Relationships'}
                                                        </h4>
                                                        <p className={`text-lg font-bold text-rose-100/80 mb-8 leading-relaxed ${language === 'hi' ? 'text-xl leading-[1.8]' : ''}`}>
                                                            {language === 'hi'
                                                                ? 'चेतावनी: इन दवाओं को इस उपाय के ठीक पहले या बाद में नहीं लेना चाहिए:'
                                                                : 'CAUTION: These remedies should NOT be taken immediately before or after this remedy:'}
                                                        </p>
                                                        <div className="flex flex-wrap gap-4">
                                                            {(language === 'hi' && selectedMed.inimicalRemedies_hi ? selectedMed.inimicalRemedies_hi : selectedMed.inimicalRemedies).map(r => (
                                                                <span key={r} className="px-8 py-4 rounded-2xl bg-rose-500 text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(244,63,94,0.3)] hover:scale-105 transition-transform">{r}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {(selectedMed.foodInteractions || selectedMed.chronotherapy) && (
                                                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                                                        {selectedMed.foodInteractions && (
                                                            <div className="p-8 bg-white/[0.02] rounded-[3rem] border border-emerald-500/20 transition-all flex flex-col">
                                                                <h4 className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] mb-6">
                                                                    <BsDropletFill className="text-lg" /> {language === 'hi' ? 'न्यूटी-सिंक एंटीडोट्स' : 'Nutri-Sync Antidotes'}
                                                                </h4>
                                                                <div className="space-y-4 flex-1">
                                                                    {selectedMed.foodInteractions.map((item, idx) => (
                                                                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                                                                            <div>
                                                                                <div className={`text-xs font-black text-white uppercase tracking-tight ${language === 'hi' ? 'text-sm' : ''}`}>{language === 'hi' && item.food_hi ? item.food_hi : item.food}</div>
                                                                                <div className={`text-[10px] font-bold text-slate-500 ${language === 'hi' ? 'text-xs' : ''}`}>{language === 'hi' && item.effect_hi ? item.effect_hi : item.effect}</div>
                                                                            </div>
                                                                            <div className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${item.risk === "Extreme" ? "bg-rose-500/20 text-rose-400" : "bg-blue-500/20 text-blue-400"}`}>
                                                                                {item.risk}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {selectedMed.chronotherapy && (
                                                            <div className="p-8 bg-blue-500/[0.03] rounded-[3rem] border border-blue-500/20 text-center flex flex-col items-center justify-center group overflow-hidden relative">
                                                                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/10 group-hover:scale-110 transition-transform">
                                                                    <BsClock className="text-3xl text-blue-400 animate-pulse" />
                                                                </div>
                                                                <h4 className="text-blue-400 font-black uppercase text-[10px] tracking-[0.3em] mb-4">{language === 'hi' ? 'वाइटल बायो-विंडो (Timing)' : 'Vital Bio-Window'}</h4>
                                                                <p className={`text-sm font-bold text-slate-300 leading-relaxed ${language === 'hi' ? 'text-base leading-[1.8]' : ''}`}>
                                                                    {language === 'hi' && selectedMed.chronotherapy_hi ? selectedMed.chronotherapy_hi : selectedMed.chronotherapy}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {selectedMed.maternalSafetyDetails && (
                                                    <div className="p-10 bg-pink-500/[0.03] rounded-[3.5rem] border border-pink-500/20 mb-10 group relative overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500/20 group-hover:bg-pink-500 transition-colors"></div>
                                                        <h4 className="flex items-center gap-3 text-pink-400 font-black uppercase text-[11px] tracking-[0.3em] mb-6">
                                                            <BsShieldFillCheck className="text-xl" /> {language === 'hi' ? 'मातृ सुरक्षा कवच (Maternal)' : 'Maternal Safety Shield'}
                                                        </h4>
                                                        <p className={`text-lg font-bold text-slate-300 leading-[1.8] italic ${language === 'hi' ? 'text-xl leading-[1.9]' : ''}`}>
                                                            "{language === 'hi' && selectedMed.maternalSafetyDetails_hi ? selectedMed.maternalSafetyDetails_hi : selectedMed.maternalSafetyDetails}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full lg:w-80 flex flex-col gap-4">
                                        <RemedyBioRadar
                                            category={selectedMed?.category || ""}
                                            name={selectedMed?.name || ""}
                                            miasmaticCore={selectedMed?.miasmaticCore}
                                            emotionalAura={selectedMed?.emotionalAura}
                                        />

                                        <div className="bg-gradient-to-br from-rose-500/10 to-fuchsia-600/10 p-8 rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden group/card shadow-xl-inner">
                                            <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                            <BsClock className="text-3xl text-rose-400 mx-auto mb-4 relative z-10" />
                                            <div className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1 relative z-10">{language === 'hi' ? 'आवृत्ति' : 'Frequency'}</div>
                                            <div className="text-xl font-bold text-white relative z-10">{language === 'hi' && selectedMed.frequency_hi ? selectedMed.frequency_hi : selectedMed.frequency}</div>
                                        </div>

                                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden group/card">
                                            <div className="absolute inset-0 bg-fuchsia-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                            <BsFlower1 className="text-3xl text-fuchsia-400 mx-auto mb-4 relative z-10" />
                                            <div className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1 relative z-10">{language === 'hi' ? 'पोटेंसी' : 'Potency'}</div>
                                            <div className="text-xl font-bold text-white relative z-10">{language === 'hi' && selectedMed.dosage_hi ? selectedMed.dosage_hi : selectedMed.dosage}</div>
                                            <div className="text-[10px] font-bold text-fuchsia-400/80 uppercase tracking-tighter bg-fuchsia-500/10 py-1 rounded-full relative z-10 border border-fuchsia-500/10 mt-2">
                                                <BsActivity className="inline mr-1" /> {language === 'hi' ? 'डायनामिक पोटेंसी' : 'Dynamic Potency'}
                                            </div>
                                        </div>

                                        {/* Healing Timeline Card */}
                                        {selectedMed.healingTimeline && (
                                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-center relative overflow-hidden group/card">
                                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                                <BsClock className="text-3xl text-blue-400 mx-auto mb-4 relative z-10 animate-spin-slow" />
                                                <div className="text-[9px] font-black uppercase text-white/40 tracking-widest mb-1 relative z-10">{language === 'hi' ? 'उपचार चक्र' : 'Healing Cycle'}</div>
                                                <div className="text-lg font-bold text-white relative z-10">
                                                    {language === 'hi' && selectedMed.healingTimeline_hi ? selectedMed.healingTimeline_hi : selectedMed.healingTimeline}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto flex gap-3">
                                            <button onClick={() => setSelectedMed(null)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors">{language === 'hi' ? 'बंद करें' : 'Close'}</button>
                                            <Link to="/pharmacy-hub" className="flex-[2] py-4 bg-rose-600 hover:bg-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-900/50">
                                                {language === 'hi' ? 'ऑर्डर करें' : 'Order Now'} <BsArrowLeft className="rotate-180" />
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
                @keyframes neural-glow { 0% { border-color: rgba(244,63,94,0.1); } 50% { border-color: rgba(244,63,94,0.6); box-shadow: 0 0 20px rgba(244,63,94,0.2); } 100% { border-color: rgba(244,63,94,0.1); } }
                .animate-blob { animation: blob 10s infinite; }
                .animate-spin-slow { animation: spin 8s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
                .neural-card-glow { animation: neural-glow 3s infinite ease-in-out; }
                .line-height-hi { line-height: 1.8 !important; letter-spacing: 0.02em; }
            `}</style>
        </div>
    );
};

export default HomeopathyHub;
