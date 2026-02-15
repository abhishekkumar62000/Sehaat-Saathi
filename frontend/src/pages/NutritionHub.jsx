
import React, { useState, useEffect, useMemo } from "react";
import {
    BsCart4, BsSearch, BsArrowRepeat, BsCheckCircleFill, BsXCircleFill,
    BsClockHistory, BsInfoCircle, BsVolumeUpFill, BsArrowRightShort,
    BsFilter, BsLightbulbFill, BsEggFried, BsCupStraw, BsSunFill, BsMoonFill,
    BsShieldCheck, BsShieldX, BsArrowLeftRight, BsDropletHalf, BsLightningFill,
    BsPatchCheckFill, BsSnow, BsThermometerSun, BsCloudRainFill, BsPlusCircleFill, BsMortarboardFill,
    BsInbox, BsStars, BsShieldFillCheck, BsActivity, BsPersonFillGear, BsHearts, BsLightningChargeFill,
    BsBoxSeam, BsGraphUpArrow, BsArrowRepeat as BsRadarIcon
} from "react-icons/bs";
import {
    MdChildCare, MdElderly, MdPregnantWoman, MdHealthAndSafety, MdVerifiedUser,
    MdBloodtype, MdMonitorWeight, MdHealing, MdAutoGraph
} from "react-icons/md";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { nutritionDb } from "../utils/nutritionData";

// Ameeso - The Smart Substitute Engine Mapping
const substitutesMap = {
    "Sugar": ["Stevia", "Monk Fruit", "Dates", "Honey (limited)"],
    "Salt": ["Lemon Juice", "Pink Himalayan Salt", "Seaweed Flakes", "Garlic Powder"],
    "White Rice": ["Brown Rice", "Quinoa", "Cauliflower Rice", "Millet"],
    "Milk": ["Almond Milk", "Soy Milk", "Oat Milk", "Coconut Milk"],
    "Wheat": ["Oat Flour", "Almond Flour", "Gram Flour", "Buckwheat"],
    "Tea": ["Green Tea", "Herbal Infusion", "Lemon Water"],
    "Spinach": ["Kale", "Fenugreek Leaves", "Amaranth Greens"],
    "Potato": ["Sweet Potato", "Carrots", "Turnips"],
    "Oil": ["Olive Oil", "Cold Pressed Mustard Oil", "Ghee (for Vata)"]
};

// Village-to-Vitals: Sovereign Heritage Superfoods
const heritageSuperfoods = [
    { name: "Moringa", benefit: "300+ Diseases", rationale: "Sovereign nutrient density." },
    { name: "Millets (Ragi/Bajra)", benefit: "Ancient Carb", rationale: "Low GI resilience." },
    { name: "Ashwagandha", benefit: "Vitality Force", rationale: "Adaptogenic cortisol control." },
    { name: "Amla", benefit: "Divine Fruit", rationale: "High bio-available Vit-C." }
];

// Kitchen Pharmacy - Medicinal Boosters
const kitchenPharmacy = [
    { item: "Turmeric + Black Pepper", benefit: "Boosts Immunity & reduces inflammation", dose: "1/4 tsp in warm water" },
    { item: "Ginger Juice + Honey", benefit: "Improves Digestion & Relieves Cold", dose: "1 tsp before meals" },
    { item: "Cinnamon Powder", benefit: "Regulates Blood Sugar levels", dose: "A pinch in morning tea/water" },
    { item: "Fenugreek (Methi) Seeds", benefit: "Excellent for Diabetes & Hair health", dose: "Soaked overnight, eat in morning" },
    { item: "Amla (Gooseberry)", benefit: "Rich in Vit-C, improves Skin & Eyes", dose: "1 fresh amla daily" }
];

// National Sovereign Innovation: Chrononutrition Rationale
const chronoRationale = {
    morning: "Post-dawn Insulin Sensitivity peak.",
    breakfast: "Metabolic fire ignition phase.",
    lunch: "Peak digestive enzyme activity (Zenith).",
    snack: "Cortisol balancing twilight window.",
    dinner: "Circadian repair & melatonin preparation."
};

// Sub-component: Macro-Nutrition Bio-Radar (SVG Engine)
const MacroNutritionRadar = ({ disease, type }) => {
    // Generate values based on disease/type context
    const getStats = () => {
        if (disease?.includes("Diabetes")) return [40, 60, 80, 50, 70]; // Fiber, Protein, Fat, Micro, Hydration
        if (disease?.includes("Anemia")) return [30, 80, 40, 90, 60];
        if (type?.includes("Keto")) return [20, 70, 95, 40, 80];
        return [50, 50, 50, 50, 50];
    };

    const stats = getStats();
    const size = 160;
    const center = size / 2;
    const radius = 60;

    const getPoint = (score, index, total) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const dist = (score / 100) * radius;
        return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
    };

    const points = stats.map((s, i) => getPoint(s, i, 5)).join(" ");
    const labels = ["Fiber", "Protein", "Fats", "Micros", "Water"];

    return (
        <div className="bg-black/90 p-6 rounded-[2.5rem] border border-lime-500/30 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
                <span className="text-[8px] font-black text-lime-500 uppercase tracking-[0.3em] mb-4">Sovereign Bio-Radar</span>
                <svg width={size} height={size} className="drop-shadow-[0_0_10px_rgba(132,204,22,0.4)]">
                    {/* Background circles */}
                    {[20, 40, 60, 80, 100].map(r => (
                        <circle key={r} cx={center} cy={center} r={(r / 100) * radius} fill="none" stroke="rgba(132,204,22,0.1)" strokeWidth="1" />
                    ))}
                    {/* Radar polygon */}
                    <polygon points={points} fill="rgba(132,204,22,0.3)" stroke="#84cc16" strokeWidth="2" strokeLinejoin="round" />
                    {/* Axis labels */}
                    {labels.map((l, i) => {
                        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                        const tx = center + (radius + 15) * Math.cos(angle);
                        const ty = center + (radius + 15) * Math.sin(angle);
                        return <text key={l} x={tx} y={ty} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontWeight="900" textTransform="uppercase">{l}</text>
                    })}
                </svg>
            </div>
        </div>
    );
};

// Sub-component: Hormonal-Harmony Glandular Heatmap (SVG Anatomy)
const GlandularHeatmap = ({ disease }) => {
    const getActiveNodes = () => {
        const d = (disease || "").toLowerCase();
        if (d.includes("diabetes") || d.includes("pancreas")) return ["pancreas", "gut"];
        if (d.includes("thyroid")) return ["thyroid", "brain"];
        if (d.includes("anemia") || d.includes("blood")) return ["bone", "liver"];
        if (d.includes("acid") || d.includes("gerd")) return ["gut", "throat"];
        if (d.includes("obesity") || d.includes("weight")) return ["liver", "gut", "thyroid"];
        return ["gut"];
    };

    const activeNodes = getActiveNodes();

    return (
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[3rem] border border-white/50 shadow-xl flex flex-col items-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-[7px] font-black text-orange-600 uppercase tracking-[0.3em] mb-4 relative z-10">Hormonal-Harmony Map</span>
            <div className="relative w-24 h-40">
                {/* Simplified Body Outline */}
                <svg viewBox="0 0 100 200" className="w-full h-full opacity-20">
                    <path d="M50,10 Q30,10 20,40 Q20,70 50,70 Q80,70 80,40 Q70,10 50,10 M20,40 Q0,50 0,90 Q0,130 50,130 Q100,130 100,90 Q100,50 80,40" fill="#cbd5e1" />
                    <rect x="40" y="130" width="20" height="70" fill="#cbd5e1" />
                </svg>
                {/* Healing Nodes */}
                <div className="absolute inset-0 flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full absolute top-[15%] blur-[2px] transition-all duration-1000 ${activeNodes.includes("brain") ? 'bg-indigo-500 scale-150 animate-pulse' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-1.5 rounded-full absolute top-[22%] blur-[1px] transition-all duration-1000 ${activeNodes.includes("thyroid") ? 'bg-orange-500 scale-[2] shadow-[0_0_10px_rgba(249,115,22,0.6)]' : 'bg-gray-300'}`}></div>
                    <div className={`w-4 h-4 rounded-full absolute top-[40%] blur-[2px] transition-all duration-1000 ${activeNodes.includes("liver") ? 'bg-rose-500 scale-125' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-2 rounded-full absolute top-[45%] left-[55%] blur-[1px] transition-all duration-1000 ${activeNodes.includes("pancreas") ? 'bg-yellow-500 scale-[3] shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-gray-300'}`}></div>
                    <div className={`w-6 h-8 rounded-2xl absolute top-[55%] blur-[4px] transition-all duration-1000 ${activeNodes.includes("gut") ? 'bg-green-500 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-gray-300'}`}></div>
                    <div className={`w-2 h-8 rounded-full absolute bottom-[10%] blur-[2px] transition-all duration-1000 ${activeNodes.includes("bone") ? 'bg-rose-600 scale-125' : 'bg-gray-300'}`}></div>
                </div>
            </div>
            <div className="flex gap-1 mt-4 relative z-10">
                {activeNodes.map(n => <span key={n} className="text-[6px] font-black uppercase text-gray-400 border border-gray-200 px-1 rounded-sm">{n}</span>)}
            </div>
        </div>
    );
};

// Sub-component: Bio-Genomic Ingredient Scanner
const BioGenomicScanner = ({ item, isScanning }) => {
    const getBioMarkers = (food) => {
        const f = food.toLowerCase();
        if (f.includes("curcuma") || f.includes("turmeric")) return { name: "Curcumin Pulse", color: "amber", icon: <BsLightningChargeFill /> };
        if (f.includes("iron") || f.includes("spinach") || f.includes("beet")) return { name: "Heme-Engine", color: "rose", icon: <MdBloodtype /> };
        if (f.includes("ginger") || f.includes("tea")) return { name: "Gingerol-Sync", color: "lime", icon: <BsThermometerSun /> };
        if (f.includes("dates") || f.includes("honey")) return { name: "Glyco-Fructose", color: "orange", icon: <BsActivity /> };
        return { name: "Bio-Matrix", color: "blue", icon: <BsRadarIcon /> };
    };

    return (
        <div className="grid grid-cols-2 gap-2 mt-4 relative">
            {isScanning && (
                <div className="absolute inset-0 bg-white/10 z-20 pointer-events-none overflow-hidden rounded-2xl border border-lime-500/50">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent absolute top-0 animate-[scan_2s_infinite]"></div>
                </div>
            )}
            {(item?.allowed || []).slice(0, 4).map((f, i) => {
                const marker = getBioMarkers(f);
                return (
                    <div key={i} className="bg-white/60 p-3 rounded-2xl border border-white/80 group/marker hover:border-lime-400 transition-all flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg bg-${marker.color}-500/20 text-${marker.color}-600 flex items-center justify-center text-[10px]`}>
                            {marker.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter truncate w-20">{f}</span>
                            <span className={`text-[7px] font-black text-${marker.color}-600 uppercase tracking-widest`}>{marker.name}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Sub-component: Healing Score Gauge
const HealingScoreGauge = ({ score }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center group">
            <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(132,204,22,0.1)" strokeWidth="8" />
                <circle cx="64" cy="64" r={radius} fill="none" stroke="#84cc16" strokeWidth="8"
                    strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
                    className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900 leading-none">{score}</span>
                <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">Healing ID</span>
            </div>
            <div className="absolute -bottom-2 bg-black text-white px-3 py-1 rounded-full text-[8px] font-black group-hover:scale-110 transition-all border border-lime-500/50 shadow-xl">
                AI INDEX
            </div>
        </div>
    );
};

const NutritionHub = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDisease, setSelectedDisease] = useState("All");
    const [secondDisease, setSecondDisease] = useState("None");
    const [isComboMode, setIsComboMode] = useState(false);
    const [language, setLanguage] = useState("en"); // 'en' or 'hi'
    const [surpriseItem, setSurpriseItem] = useState(null);
    const [foodCheckerInput, setFoodCheckerInput] = useState("");
    const [checkerResult, setCheckerResult] = useState(null);
    const [waterCount, setWaterCount] = useState(0);
    const [season, setSeason] = useState("Summer"); // Summer, Winter, Monsoon
    const [lifeStage, setLifeStage] = useState("General"); // General, Pediatric, Geriatric, Pregnancy
    const [auditLog, setAuditLog] = useState([]);
    const [showAudit, setShowAudit] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [prakriti, setPrakriti] = useState("Balanced"); // Vata, Pitta, Kapha
    const [showGrocery, setShowGrocery] = useState(false);

    useEffect(() => {
        if (surpriseItem) {
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2500);
        }
    }, [surpriseItem]);

    const categories = [
        "All", "Pure Veg", "Non-Veg Mixed", "High Protein", "Low Carb", "Satvic / Raw", "Keto Friendly", "Gluten Free"
    ];

    const diseaseFilters = [
        "All", "Diabetes (Type 2)", "Hypertension (High BP)", "Iron Deficiency Anemia", "Acid Reflux (GERD)", "Obesity (Weight Loss)", "Thyroid (Hypothyroid)", "Fever Recovery"
    ];

    const comboDiseaseFilters = ["None", ...diseaseFilters.filter(d => d !== "All")];

    // Elite Combo-Engine Logic
    const finalData = useMemo(() => {
        if (!nutritionDb || !Array.isArray(nutritionDb)) return [];

        let base = nutritionDb.filter((item) => {
            const matchesSearch =
                (item.disease || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.dietType || "").toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || item.dietType === selectedCategory;
            const matchesDisease = selectedDisease === "All" || item.disease === selectedDisease;
            return matchesSearch && matchesCategory && matchesDisease;
        });

        if (isComboMode && secondDisease !== "None") {
            base = base.map(item => {
                const secondItem = nutritionDb.find(d => d.disease === secondDisease && d.dietType === item.dietType) ||
                    nutritionDb.find(d => d.disease === secondDisease);

                if (!secondItem) return item;

                // Merge Logic: Intersection of Allowed, Union of Avoid (safety first)
                return {
                    ...item,
                    disease: `${item.disease} + ${secondItem.disease}`,
                    allowed: (item.allowed || []).filter(f => {
                        if (typeof f !== 'string') return false;
                        const firstWord = f.toLowerCase().split(' ')[0];
                        return (secondItem.allowed || []).some(sf =>
                            typeof sf === 'string' && sf.toLowerCase().includes(firstWord)
                        );
                    }),
                    avoid: Array.from(new Set([
                        ...(item.avoid || []).filter(v => typeof v === 'string'),
                        ...(secondItem.avoid || []).filter(v => typeof v === 'string')
                    ])),
                    tips: [...(item.tips || []), ...(secondItem.tips || [])].slice(0, 2),
                    isMerged: true
                };
            });
        }

        // National Sovereign: Life-Stage Specialization Logic
        if (lifeStage !== "General") {
            base = base.map(item => {
                let sovereignTip = "";
                if (lifeStage === "Pediatric") sovereignTip = "Growth Focus: High protein & mineral intake prioritized.";
                if (lifeStage === "Geriatric") sovereignTip = "Restorative Focus: Low-sodium, high digestibility prioritized.";
                if (lifeStage === "Pregnancy") sovereignTip = "Nurturing Focus: Folate & iron-rich bio-availability prioritized.";

                return {
                    ...item,
                    disease: `${item.disease} (${lifeStage})`,
                    tips: [sovereignTip, ...(item.tips || [])].slice(0, 3),
                    isSovereign: true,
                    lifeStage
                };
            });
        }

        return base;
    }, [searchTerm, selectedCategory, selectedDisease, secondDisease, isComboMode, lifeStage]);

    const handleSurprise = () => {
        if (!nutritionDb || nutritionDb.length === 0) return;
        const random = nutritionDb[Math.floor(Math.random() * nutritionDb.length)];
        setSurpriseItem(random);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#84cc16', '#bef264', '#ecfccb']
        });
    };

    const handleFoodCheck = () => {
        if (!foodCheckerInput) return;
        const currentItem = surpriseItem || finalData[0];
        if (!currentItem) return;

        const food = foodCheckerInput.toLowerCase();
        const isAllowed = (currentItem.allowed || []).some(f => f.toLowerCase().includes(food));
        const isAvoid = (currentItem.avoid || []).some(f => f.toLowerCase().includes(food));

        if (isAllowed) {
            setCheckerResult({ type: 'safe', msg: `Yes! ${foodCheckerInput} is safe for ${currentItem.disease}.` });
        } else if (isAvoid) {
            const subs = substitutesMap[Object.keys(substitutesMap).find(k => k.toLowerCase() === food)] || null;
            setCheckerResult({
                type: 'danger',
                msg: `Avoid! ${foodCheckerInput} is restricted for ${currentItem.disease}.`,
                substitutes: subs
            });
        } else {
            setCheckerResult({ type: 'neutral', msg: `Check with a doctor. ${foodCheckerInput} isn't specifically listed in the baseline for ${currentItem.disease}.` });
        }
    };

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const generatePrescription = (item) => {
        const list = [
            ...(item.allowed || []),
            ...kitchenPharmacy.map(k => k.item).slice(0, 2),
            "1 Jar of Desi Ghee (Sovereign Quality)",
            "Himalayan Pink Salt"
        ];
        const text = `Sovereign Prescription for ${item.disease}\n\nRecommended Grocery:\n- ${list.join('\n- ')}\n\nMedical Rationale: Aligned with National Sovereign v7.0 Standard.`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.disease.replace(/\s/g, '_')}_Sovereign_Diet.txt`;
        a.click();
        confetti({ particleCount: 50, colors: ['#f59e0b'] });
    };

    return (
        <div className="min-h-screen bg-[#f7fee7] pb-20 font-sans">
            {/* Header / Hero */}
            <div className="bg-gradient-to-br from-lime-500 to-green-600 text-white py-16 px-6 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 opacity-10 animate-pulse">
                    <BsCart4 size={400} />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/smarthub" className="inline-flex items-center text-lime-100 hover:text-white transition-all hover:-translate-x-1">
                            <BsArrowRightShort className="rotate-180 text-3xl" />
                            <span className="font-bold underline underline-offset-4 decoration-lime-300">SmartHub</span>
                        </Link>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                            {season === "Summer" ? <BsThermometerSun className="text-yellow-300" /> : season === "Winter" ? <BsSnow className="text-blue-200" /> : <BsCloudRainFill className="text-gray-300" />}
                            <span className="text-xs font-black uppercase tracking-widest">{season} Mode Active</span>
                        </div>
                    </div>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20 animate-bounce-slow">
                            <BsLightningFill className="text-yellow-300" />
                            <span className="text-sm font-black tracking-widest uppercase">Elite Virtual Health Kitchen 🏛️</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight flex items-center gap-3 flex-wrap">
                            <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Nutrition Hub 🥗
                        </h1>
                        <p className="text-lime-50 text-xl md:text-2xl max-w-2xl leading-relaxed opacity-90 drop-shadow-md">
                            India's first Medical-Grade AI Kitchen. Advanced condition merging, seasonal adjustments, and ICMR-compliant guidance.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-6 text-white">
                        <button
                            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
                            className="bg-white/10 backdrop-blur-xl px-8 py-3 rounded-2xl border border-white/30 font-black text-lg hover:bg-white/30 transition-all shadow-lg active:scale-95"
                        >
                            {language === 'en' ? "हिन्दी भाषा" : "Switch to English"}
                        </button>
                        <button
                            onClick={handleSurprise}
                            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-2xl font-black text-lg shadow-2xl flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-90"
                        >
                            <BsLightbulbFill className="animate-pulse" /> Random Diet Plan
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Advanced Multi-Condition Glass Card */}
                <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-8 border border-white/40 mb-12">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <h3 className="text-xl font-black text-lime-900 flex items-center gap-2">
                            <BsFilter className="text-2xl" /> SMART FILTERS & COMBO MODE
                        </h3>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Enable Condition-Combo</span>
                            <button
                                onClick={() => setIsComboMode(!isComboMode)}
                                className={`w-14 h-8 rounded-full transition-all relative ${isComboMode ? 'bg-lime-500' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isComboMode ? 'left-7 shadow-lg' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Primary Disease */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-lime-600 uppercase tracking-[0.2em] ml-2">Primary Condition</label>
                            <select
                                className="w-full px-6 py-4 bg-white/50 border-2 border-lime-100 rounded-[2rem] focus:border-lime-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer text-sm font-bold shadow-inner"
                                value={selectedDisease}
                                onChange={(e) => setSelectedDisease(e.target.value)}
                            >
                                {diseaseFilters.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        {/* Secondary Disease (Combo) */}
                        <div className={`space-y-3 transition-all ${isComboMode ? 'opacity-100 scale-100' : 'opacity-40 scale-95 pointer-events-none'}`}>
                            <label className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] ml-2">+ Secondary Condition</label>
                            <select
                                className="w-full px-6 py-4 bg-white/50 border-2 border-orange-100 rounded-[2rem] focus:border-orange-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer text-sm font-bold shadow-inner"
                                value={secondDisease}
                                onChange={(e) => setSecondDisease(e.target.value)}
                            >
                                {comboDiseaseFilters.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        {/* Diet Type */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-lime-600 uppercase tracking-[0.2em] ml-2">Dietary Preference</label>
                            <select
                                className="w-full px-6 py-4 bg-white/50 border-2 border-lime-100 rounded-[2rem] focus:border-lime-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer text-sm font-bold shadow-inner"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Search Box */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-lime-600 uppercase tracking-[0.2em] ml-2">Quick Search</label>
                            <div className="relative group">
                                <BsSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-lime-50" />
                                <input
                                    type="text"
                                    placeholder="e.g. Acid Reflux..."
                                    className="w-full pl-12 pr-6 py-4 bg-white/50 border-2 border-lime-100 rounded-[2rem] focus:border-lime-500 focus:bg-white outline-none transition-all text-sm font-bold shadow-inner"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Life-Stage Toggles (New v4.0) */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="flex flex-wrap items-center gap-6">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Life-Stage Specialization:</span>
                            {[
                                { id: "General", icon: <BsPersonFillGear />, color: "lime" },
                                { id: "Pediatric", icon: <MdChildCare />, color: "blue" },
                                { id: "Geriatric", icon: <MdElderly />, color: "orange" },
                                { id: "Pregnancy", icon: <MdPregnantWoman />, color: "rose" }
                            ].map(stage => (
                                <button
                                    key={stage.id}
                                    onClick={() => setLifeStage(stage.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs transition-all border-2 ${lifeStage === stage.id
                                        ? `bg-${stage.color}-500 text-white border-${stage.color}-500 shadow-lg scale-105`
                                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    {stage.icon} {stage.id}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                {surpriseItem ? (
                    <div className="mb-12 animate-in slide-in-from-bottom-10 duration-700">
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-8 py-2 rounded-full font-black text-sm uppercase tracking-widest z-30 shadow-xl flex items-center gap-2">
                                <BsPatchCheckFill /> ICMR-NIN Guided Plan
                            </div>
                            <div className="bg-white/80 backdrop-blur-3xl border-4 border-orange-100 rounded-[4rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">
                                <div className="absolute -bottom-20 -right-20 opacity-5">
                                    <BsLightbulbFill size={500} className="text-orange-500" />
                                </div>
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <MdVerifiedUser /> ICMR-NIN Guided Plan
                                            </span>
                                            {surpriseItem.isMerged && <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 animate-pulse"><BsPlusCircleFill /> Condition Combo</span>}
                                            <span className="bg-lime-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <MdHealing /> Elite v7.0
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                                            {language === 'en' ? surpriseItem.disease : (surpriseItem.diseaseHindi || surpriseItem.disease)}
                                        </h2>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            <div className="flex items-center gap-6">
                                                <p className="text-orange-600 text-xl font-black flex items-center gap-2">
                                                    <BsStars /> {language === 'en' ? surpriseItem.dietType : (surpriseItem.dietTypeHindi || surpriseItem.dietType)}
                                                </p>
                                                <div className="flex items-center gap-3 bg-white/40 px-4 py-2 rounded-2xl border border-white/50">
                                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Ayru-Sync</span>
                                                    <div className="flex gap-2">
                                                        {["Vata", "Pitta", "Kapha"].map(p => (
                                                            <button
                                                                key={p}
                                                                onClick={() => setPrakriti(p)}
                                                                className={`px-3 py-1 rounded-lg text-[8px] font-black transition-all ${prakriti === p ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}
                                                            >
                                                                {p}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSurpriseItem(null)} className="p-4 bg-orange-50 text-orange-500 rounded-3xl hover:bg-orange-100 transition-all active:scale-90 shadow-sm border border-orange-100">
                                        <BsXCircleFill size={32} />
                                    </button>
                                </div>
                                <DietDetailCard
                                    item={surpriseItem}
                                    language={language}
                                    speak={speak}
                                    season={season}
                                    isScanning={isScanning}
                                    prakriti={prakriti}
                                    generatePrescription={generatePrescription}
                                />
                            </div>
                        </div>
                    </div>
                ) : finalData.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        {/* List Block */}
                        <div className="xl:col-span-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {finalData.slice(0, 12).map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-[3rem] p-8 shadow-lg hover:shadow-[0_25px_60px_-15px_rgba(132,204,22,0.3)] transition-all group border border-lime-50 hover:border-lime-500 relative overflow-hidden cursor-pointer active:scale-[0.98]"
                                        onClick={() => setSurpriseItem(item)}
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-60"></div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-6">
                                                <div className="flex gap-2">
                                                    <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{item.dietType}</span>
                                                    {item.isMerged && <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase"><BsPlusCircleFill size={10} /></span>}
                                                </div>
                                                <BsPatchCheckFill className="text-lime-200 group-hover:text-lime-500 transition-colors" />
                                            </div>

                                            <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-lime-700 transition-colors leading-tight truncate">
                                                {language === 'en' ? item.disease : (item.diseaseHindi || item.disease)}
                                            </h3>

                                            <div className="space-y-3 mt-6">
                                                <div className="flex items-center gap-3">
                                                    <BsCheckCircleFill className="text-green-500 shrink-0" />
                                                    <p className="text-xs font-bold text-gray-500 truncate">{language === 'en' ? (item.allowed || []).join(', ') : (item.allowedHindi?.join(', ') || (item.allowed || []).join(', '))}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <BsXCircleFill className="text-red-500 shrink-0" />
                                                    <p className="text-xs font-bold text-gray-500 truncate">{language === 'en' ? (item.avoid || []).join(', ') : (item.avoidHindi?.join(', ') || (item.avoid || []).join(', '))}</p>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-[10px] font-black text-lime-600 uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Clinical View</span>
                                                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-lime-500 group-hover:text-white flex items-center justify-center transition-all">
                                                    <BsArrowRightShort size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar: Innovation Hub */}
                        <div className="xl:col-span-4 space-y-10">
                            {/* Neural Food Checker */}
                            <div className="bg-black rounded-[3rem] p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden group">
                                <div className="absolute -bottom-10 -right-10 p-8 opacity-20 transition-transform group-hover:scale-125">
                                    <BsShieldCheck size={200} className="text-lime-500" />
                                </div>
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                                    Neural Checker <span className="text-[8px] bg-lime-500 px-2 py-0.5 rounded-full animate-pulse">ELITE-AI</span>
                                </h2>
                                <p className="text-gray-400 text-sm font-bold mb-8 leading-relaxed">
                                    Type any ingredient to verify safety for your selected condition.
                                </p>
                                <div className="space-y-4 relative z-10">
                                    <input
                                        type="text"
                                        placeholder="e.g. Honey, Tea"
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-lime-500 transition-all font-bold placeholder:opacity-30"
                                        value={foodCheckerInput}
                                        onChange={(e) => setFoodCheckerInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleFoodCheck()}
                                    />
                                    <button
                                        onClick={handleFoodCheck}
                                        className="w-full bg-lime-500 hover:bg-lime-600 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-lime-500/20"
                                    >
                                        Verify Ingredient
                                    </button>
                                </div>
                                {checkerResult && (
                                    <div className={`mt-6 p-5 rounded-2xl border animate-in zoom-in ${checkerResult.type === 'safe' ? 'bg-green-500/10 border-green-500/30' :
                                        checkerResult.type === 'danger' ? 'bg-red-500/10 border-red-500/30' : 'bg-blue-500/10 border-blue-500/30'
                                        }`}>
                                        <p className="text-sm font-bold mb-2">{checkerResult.msg}</p>
                                        {checkerResult.substitutes && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {checkerResult.substitutes.map(s => <span key={s} className="bg-white/10 px-2 py-1 rounded-lg text-[10px] text-lime-400 font-bold">{s}</span>)}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Kitchen Pharmacy */}
                            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-lime-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform">
                                    <BsMortarboardFill size={150} className="text-lime-500" />
                                </div>
                                <h2 className="text-2xl font-black mb-2 text-lime-900 flex items-center gap-2">
                                    Kitchen Pharmacy 🌿
                                </h2>
                                <p className="text-lime-600 text-xs font-black uppercase tracking-[0.2em] mb-8">Medicinal Food Boosters</p>

                                <div className="space-y-6">
                                    {kitchenPharmacy.map((kp, idx) => (
                                        <div key={idx} className="flex gap-4 group/kp cursor-pointer hover:bg-lime-50 p-2 rounded-2xl transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-lime-100 flex items-center justify-center shrink-0 text-lime-600 font-black relative">
                                                <BsPlusCircleFill className="text-[10px] absolute -top-1 -right-1" />
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-800 text-sm group-hover/kp:text-lime-700">{kp.item}</h4>
                                                <p className="text-[10px] font-bold text-gray-400">{kp.benefit}</p>
                                                <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full mt-2 inline-block font-black">{kp.dose}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Water Tracker */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <BsDropletHalf size={100} className="absolute -bottom-10 -left-10 opacity-20" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <h3 className="text-xl font-black mb-6 uppercase tracking-widest">Hydration Goals</h3>
                                    <div className="text-7xl font-black mb-8 tabular-nums tracking-tighter">
                                        {waterCount}<span className="text-2xl font-bold text-blue-200 opacity-50 ml-1">/12</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setWaterCount(c => Math.max(0, c - 1))} className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all">-</button>
                                        <button onClick={() => {
                                            setWaterCount(c => Math.min(12, c + 1));
                                            if (waterCount < 11) confetti({ origin: { x: 0.9, y: 0.9 }, colors: ['#60a5fa'] });
                                        }} className="w-12 h-12 bg-white rounded-2xl text-blue-800 font-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-xl">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in">
                        <BsInbox size={100} className="text-lime-200 mb-6" />
                        <h3 className="text-2xl font-black text-lime-900 mb-2">No Plans Found</h3>
                        <p className="text-lime-600 font-bold">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setSelectedDisease("All"); setIsComboMode(false); }}
                            className="mt-8 bg-lime-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-lime-600 transition-all active:scale-95 shadow-lg shadow-lime-500/20"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Float Menu */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-2xl px-10 py-5 rounded-[2.5rem] flex items-center gap-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] z-[100] border border-white/10 group animate-in slide-in-from-bottom-10">
                <div className="flex flex-col border-l-4 border-lime-500 pl-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-1"><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span></span>
                    <span className="text-white font-black text-[10px] whitespace-nowrap">GOVT-GRADE NUTRITION HUB v3.0 Elite</span>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-gray-400">ICMR COMPLIANT</span>
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all font-black shadow-lg shadow-lime-500/40"
                    >↑</button>
                </div>
            </div>
        </div>
    );
};

// Sub-component: The Elite Dynamic Bio-Plate with Macro-Radar
const DynamicBioPlate = ({ type, isMerged }) => {
    const safeType = type || "Default Balanced";

    const sizes = useMemo(() => {
        if (safeType.includes("Keto")) return { veggies: 20, protein: 30, fat: 40, carbs: 10 };
        if (safeType.includes("High Protein")) return { veggies: 30, protein: 45, fat: 10, carbs: 15 };
        if (safeType.includes("Low Carb")) return { veggies: 50, protein: 30, fat: 15, carbs: 5 };
        return { veggies: 50, protein: 25, fat: 10, carbs: 15 };
    }, [safeType]);

    return (
        <div className="relative group max-w-full">
            <div className="relative w-80 h-80 rounded-full border-[15px] border-white shadow-3xl overflow-hidden flex items-center justify-center bg-white">
                <div className="absolute inset-0 flex flex-wrap transition-opacity duration-1000">
                    <div className="bg-green-500/20 border-r border-b border-dashed border-green-500/40 flex flex-col items-center justify-center"
                        style={{ width: `${sizes.veggies + sizes.carbs}%`, height: '50%' }}>
                        <span className="text-[7px] font-black text-green-700 uppercase mb-1">Veggies/Fiber</span>
                        <span className="text-4xl filter saturate-200 group-hover:scale-125 transition-transform duration-500">🥬</span>
                    </div>
                    <div className="bg-orange-500/20 border-b border-dashed border-orange-500/40 flex flex-col items-center justify-center"
                        style={{ width: `${100 - (sizes.veggies + sizes.carbs)}%`, height: '50%' }}>
                        <span className="text-[7px] font-black text-orange-700 uppercase mb-1">Protein</span>
                        <span className="text-4xl group-hover:scale-125 transition-transform duration-500">🍲</span>
                    </div>
                    <div className="bg-yellow-500/20 border-r border-dashed border-yellow-500/40 flex flex-col items-center justify-center"
                        style={{ width: `${sizes.fat}%`, height: '50%' }}>
                        <span className="text-[7px] font-black text-yellow-700 uppercase mb-1">Fats</span>
                        <span className="text-3xl group-hover:scale-125 transition-transform duration-500">🥜</span>
                    </div>
                    <div className="bg-blue-500/20 flex flex-col items-center justify-center"
                        style={{ width: `${100 - sizes.fat}%`, height: '50%' }}>
                        <span className="text-[7px] font-black text-blue-700 uppercase mb-1">Carbs</span>
                        <span className="text-4xl group-hover:scale-125 transition-transform duration-500">🍙</span>
                    </div>
                </div>
                <div className="z-10 bg-black/90 text-white px-5 py-2 rounded-full text-[9px] font-black border-2 border-lime-500 shadow-2xl tracking-[0.2em] transform -rotate-6">
                    {isMerged ? "COMBO-MERGED PLATE" : "CLINICAL PLATE V3"}
                </div>
            </div>

            {/* Tooltip Labels */}
            <div className="absolute -top-4 -right-4 bg-lime-500 text-white p-3 rounded-2xl shadow-xl animate-pulse">
                <span className="text-[10px] font-black uppercase">Fuzzy Logic Active</span>
            </div>
        </div>
    );
};

const DietDetailCard = ({ item, language, speak, season, isScanning, prakriti, generatePrescription }) => {
    // Safety logic for plan slots
    const plan = item?.plan || {};
    const mealSlots = [
        { icon: "🌅", slot: "Dawn Boost", key: "morning", time: "6:00 AM", color: "blue" },
        { icon: "🍳", slot: "Fuel Breakfast", key: "breakfast", time: "8:30 AM", color: "orange" },
        { icon: "🥗", slot: "Zenith Lunch", key: "lunch", time: "1:30 PM", color: "amber" },
        { icon: "🍵", slot: "Twilight Infusion", key: "snack", time: "5:00 PM", color: "lime" },
        { icon: "🌙", slot: "Moonlight Dinner", key: "dinner", time: "8:00 PM", color: "indigo" },
    ];

    const tips = language === 'en' ? (item?.tips || []) : (item?.tipsHindi || (item?.tips || []));
    const allowed = language === 'en' ? (item?.allowed || []) : (item?.allowedHindi || (item?.allowed || []));
    const avoid = language === 'en' ? (item?.avoid || []) : (item?.avoidHindi || (item?.avoid || []));

    // National Sovereign: Healing Score AI Engine
    const healingScore = useMemo(() => {
        let score = 75; // Baseline
        if (item?.isMerged) score += 10;
        if (item?.isSovereign) score += 10;
        if (season === "Summer") score += 5;
        return Math.min(score, 100);
    }, [item, season]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            {/* Visual Section */}
            <div className="lg:col-span-4 flex flex-col gap-10">
                <div className="flex flex-col items-center gap-10">
                    <DynamicBioPlate type={item?.dietType} isMerged={item?.isMerged} />

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <GlandularHeatmap disease={item?.disease} />
                        <MacroNutritionRadar disease={item?.disease} type={item?.dietType} />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-lime-600 to-green-800 w-full p-8 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group border-b-8 border-lime-400">
                    <div className="absolute -top-5 -right-5 opacity-10 rotate-12 group-hover:scale-150 transition-transform duration-1000">
                        <BsMortarboardFill size={100} />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1">
                            <BsLightningChargeFill className="text-yellow-300" /> ELITE ADVICE
                        </span>
                        {prakriti !== "Balanced" && (
                            <span className="bg-amber-400 text-green-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                                {prakriti}-Sync Active
                            </span>
                        )}
                    </div>
                    <h4 className="text-lg font-black leading-tight mb-4 tracking-tight drop-shadow-md">
                        {language === 'en' ? "The Sovereign Healing Protocol:" : "अंतिम हीलिंग प्रोटोकॉल:"}
                    </h4>
                    <p className="text-sm font-bold leading-relaxed italic opacity-90 border-l-4 border-lime-300 pl-4 py-2">
                        {tips[0] || "Aligned with national clinical guidelines."}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-white/50 backdrop-blur-xl border border-lime-100 w-full p-6 rounded-[3rem] shadow-lg flex items-center justify-between group">
                        <div>
                            <span className="text-[9px] font-black text-lime-600 uppercase tracking-widest block mb-1">Bio-Genomic Guide</span>
                            <span className="text-xs font-bold text-gray-500">Audio clinical rationale</span>
                        </div>
                        <button
                            onClick={() => speak(`${language === 'en' ? 'Clinical rationale for ' + (item?.disease || 'condition') : (item?.diseaseHindi || item?.disease) + ' के लिए तर्क'}. Prakriti is ${prakriti}. Season is ${season}.`)}
                            className="w-12 h-12 bg-lime-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-lime-500/30 hover:scale-110 transition-all"
                        >
                            <BsVolumeUpFill />
                        </button>
                    </div>

                    <button
                        onClick={() => generatePrescription(item)}
                        className="w-full bg-black text-white p-6 rounded-[3rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-xl border-b-4 border-lime-500"
                    >
                        <BsBoxSeam className="text-lime-500 text-lg" /> Download Medicated Grocery
                    </button>
                </div>
            </div>

            {/* Data Section */}
            <div className="lg:col-span-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Sovereign Heritage Scan</span>
                        <div className="flex-1 h-px bg-gray-100"></div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-8">
                        {heritageSuperfoods.filter(h => (item?.allowed || []).some(f => f.toLowerCase().includes(h.name.toLowerCase().split(' ')[0]))).map(h => (
                            <div key={h.name} className="bg-orange-50 border border-orange-200 px-6 py-3 rounded-2xl flex items-center gap-3 animate-bounce-slow">
                                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                                    <BsPatchCheckFill />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-orange-700">{h.name}</span>
                                    <span className="text-[8px] font-bold text-orange-400 uppercase">{h.benefit}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/40 p-10 rounded-[4rem] border border-white/80 shadow-inner">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[10px] font-black text-lime-600 uppercase tracking-[0.4em]">Bio-Genomic Ingredient Pulse</h4>
                            {isScanning && <span className="text-[8px] font-black text-lime-500 animate-pulse">DNA ANALYSIS IN PROGRESS...</span>}
                        </div>
                        <BioGenomicScanner item={item} isScanning={isScanning} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-10 rounded-[4rem] border-4 border-green-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.3)] rotate-6">
                            <BsCheckCircleFill size={28} />
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter">
                            {language === 'en' ? "Optimal Intake" : "अमृत भोजन"}
                        </h4>
                        <ul className="space-y-4">
                            {allowed.length > 0 ? allowed.map((food, i) => (
                                <li key={i} className="text-sm font-bold text-gray-600 flex items-center gap-4 group/li">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full group-hover/li:scale-150 transition-all shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    {food}
                                </li>
                            )) : (
                                <li className="text-sm font-bold text-gray-400 italic">No specific food items listed.</li>
                            )}
                        </ul>
                    </div>
                    <div className="bg-white p-10 rounded-[4rem] border-4 border-red-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="w-14 h-14 bg-red-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(239,68,68,0.3)] -rotate-6">
                            <BsXCircleFill size={28} />
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-6 tracking-tighter">
                            {language === 'en' ? "Strictly Avoid" : "वर्जित आहार"}
                        </h4>
                        <ul className="space-y-4">
                            {avoid.length > 0 ? avoid.map((food, i) => (
                                <li key={i} className="text-sm font-bold text-gray-600 flex items-center gap-4 group/li">
                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full group-hover/li:scale-150 transition-all shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    {food}
                                </li>
                            )) : (
                                <li className="text-sm font-bold text-gray-400 italic">No restrictions listed in database.</li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white rounded-[4.5rem] p-10 md:p-14 border border-lime-100 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-500 via-transparent to-transparent pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="flex justify-between items-center mb-14 border-b border-gray-100 pb-8">
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">
                                Tactical 24-Hr Meal Matrix
                            </h3>
                            <span className="text-[10px] font-black text-lime-600 uppercase tracking-[0.4em]">ICMR Scientific Timing</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-[10px] font-black">
                            <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                            V3.0 ELITE
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {mealSlots.map((m, idx) => (
                            <div key={idx} className="flex gap-8 group/item cursor-pointer hover:bg-white hover:shadow-2xl hover:-translate-x-2 p-6 rounded-[2.5rem] transition-all border border-transparent hover:border-lime-50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-50/10 to-transparent opacity-0 group-hover/item:opacity-100 -translate-x-full group-hover/item:translate-x-full transition-all duration-1000"></div>
                                <div className="bg-white shadow-xl w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border border-gray-100 group-hover/item:scale-110 group-hover/item:-rotate-6 transition-all duration-500">
                                    <span className="text-4xl">{m.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[11px] font-black uppercase text-lime-700 tracking-[0.3em]">{m.slot}</h5>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-gray-300">{m.time}</span>
                                            {idx < 2 && <span className="text-[8px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Energy Phase</span>}
                                        </div>
                                    </div>
                                    <p className="text-gray-900 font-black text-xl leading-tight group-hover/item:text-lime-700 transition-colors">
                                        {plan[m.key] || "Light balanced meal as per preference."}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-[9px] font-bold text-lime-600/60 uppercase tracking-widest italic">
                                        <BsActivity /> {chronoRationale[m.key]}
                                    </div>
                                </div>
                                {item?.isSovereign && (
                                    <div className="absolute top-4 right-4 animate-pulse">
                                        <BsShieldFillCheck className="text-lime-500 opacity-20" size={40} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* v4.0 National Sovereign Feature: Daily Audit Simulator */}
                    <div className="mt-12 p-8 bg-black rounded-[3rem] text-white relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-150 transition-all duration-1000">
                            <BsBoxSeam size={200} className="text-lime-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-black flex items-center gap-2 tracking-tighter">
                                    <BsGraphUpArrow className="text-lime-500" /> AI DAILY AUDIT SIMULATOR
                                </h4>
                                <span className="text-[8px] bg-lime-500 text-black px-2 py-1 rounded-full font-black">SOVEREIGN V4.0</span>
                            </div>
                            <p className="text-xs text-gray-400 font-bold mb-6">Simulate a meal log to receive an AI-powered compliance rating for this diet plan.</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {['Oatmeal', 'Milk', 'Salad', 'Tea'].map(food => (
                                    <button
                                        key={food}
                                        onClick={() => confetti({ particleCount: 50, spread: 30, origin: { x: 0.5, y: 0.8 }, colors: ['#84cc16'] })}
                                        className="bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl text-[10px] font-black transition-all border border-white/10 hover:border-lime-500"
                                    >
                                        Log {food}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionHub;
