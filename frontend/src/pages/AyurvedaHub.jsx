import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsCapsule, BsClock, BsJournalMedical,
    BsShieldExclamation, BsPlusSquareFill, BsStars, BsInfoCircleFill,
    BsCheckCircleFill, BsTreeFill, BsHeartFill, BsLightningFill, BsDropletFill,
    BsVolumeUpFill, BsCalculatorFill, BsActivity, BsShieldFillCheck,
    BsFlower1, BsWind, BsSnow, BsSunFill, BsThermometerHalf,
    BsCupHotFill, BsHandIndexFill, BsHourglassSplit, BsFillRecordCircleFill,
    BsExclamationCircleFill, BsXCircleFill, BsExclamationTriangleFill
} from 'react-icons/bs';
import { ayurvedaDb } from '../utils/ayurvedaData';
import confetti from 'canvas-confetti';
import PrakritiQuiz from '../components/Ayurveda/PrakritiQuiz';
import { MdVerifiedUser } from 'react-icons/md';

// Sub-component: Dravyaguna Profile (SVG Radar Chart)
const DravyagunaRadar = ({ data }) => {
    if (!data) return null;
    const points = [
        { label: 'Rasa', value: data.rasa || 50, x: 50, y: 10 },
        { label: 'Virya', value: data.virya || 50, x: 90, y: 40 },
        { label: 'Vipaka', value: data.vipaka || 50, x: 75, y: 85 },
        { label: 'Guna', value: data.guna || 50, x: 25, y: 85 },
        { label: 'Karma', value: data.karma || 50, x: 10, y: 40 },
    ];

    const getPointCoord = (p, val) => {
        const factor = val / 100;
        const centerX = 50;
        const centerY = 50;
        const targetX = centerX + (p.x - centerX) * factor;
        const targetY = centerY + (p.y - centerY) * factor;
        return `${targetX},${targetY}`;
    };

    const polyPoints = points.map(p => getPointCoord(p, p.value)).join(' ');

    return (
        <div className="relative w-40 h-40 group/radar">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                {points.map((p, i) => (
                    <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="white" strokeWidth="0.2" strokeOpacity="0.2" />
                ))}
                <polygon points={polyPoints} fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.5" />
            </svg>
            {points.map((p, i) => (
                <div key={i} className="absolute text-[6px] font-black uppercase text-amber-500/40" style={{
                    top: `${p.y}%`,
                    left: `${p.x}%`,
                    transform: 'translate(-50%, -50%)',
                    marginTop: p.y < 50 ? '-10px' : '10px'
                }}>{p.label}</div>
            ))}
        </div>
    );
};

const BioClock = ({ category, langHindi, peakHours }) => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hour = time.getHours();
    const minutes = time.getMinutes();
    const totalMinutes = hour * 60 + minutes;
    const rotation = (totalMinutes / 1440) * 360;

    const getPeakSector = () => {
        if (peakHours) {
            return {
                start: 0,
                end: 24 * 60,
                color: "#f59e0b",
                label: peakHours,
                isCustom: true
            };
        }
        const cat = category?.toLowerCase() || "";
        if (cat.includes("mental") || cat.includes("nervous")) return { start: 14 * 60, end: 18 * 60, color: "#f59e0b", label: langHindi ? "वात काल" : "Vata Peak" };
        if (cat.includes("digestive") || cat.includes("liver")) return { start: 10 * 60, end: 14 * 60, color: "#ef4444", label: langHindi ? "पित्त काल" : "Pitta Peak" };
        if (cat.includes("respiratory") || cat.includes("immunity")) return { start: 6 * 60, end: 10 * 60, color: "#10b981", label: langHindi ? "कफ काल" : "Kapha Peak" };
        if (cat.includes("detox")) return { start: 22 * 60, end: 2 * 60, color: "#8b5cf6", label: langHindi ? "शोधन काल" : "Detox Peak" };
        return { start: 4 * 60, end: 8 * 60, color: "#fbbf24", label: langHindi ? "प्रातः काल" : "Morning Peak" };
    };

    const sector = getPeakSector();
    const sectorPath = (start, end) => {
        const startAngle = (start / 1440) * 360 - 90;
        const endAngle = (end / 1440) * 360 - 90;
        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
        const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
        const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
        const largeArc = end - start > 720 ? 1 : 0;
        return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/5 flex flex-col items-center group/clock hover:border-amber-500/20 transition-all">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-4">Circadian Potency Engine</span>
            <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                    {/* Hour Markers */}
                    {[0, 6, 12, 18].map(h => {
                        const angle = (h / 24) * 360 - 90;
                        const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
                        const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
                        return <text key={h} x={x} y={y} fill="white" fontSize="5" fontWeight="900" textAnchor="middle" alignmentBaseline="middle" opacity="0.2">{h}:00</text>
                    })}
                    {/* Peak Sector */}
                    {!sector.isCustom && <path d={sectorPath(sector.start, sector.end)} fill={sector.color} fillOpacity="0.1" stroke={sector.color} strokeWidth="0.5" strokeDasharray="1,1" />}
                    {sector.isCustom && <circle cx="50" cy="50" r="40" fill={sector.color} fillOpacity="0.05" stroke={sector.color} strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" />}
                    {/* Current Time Needle */}
                    <line x1="50" y1="50" x2={50 + 40 * Math.cos(((rotation - 90) * Math.PI) / 180)} y2={50 + 40 * Math.sin(((rotation - 90) * Math.PI) / 180)} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                    <circle cx="50" cy="50" r="3" fill="#f59e0b" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/clock:opacity-100 transition-opacity">
                    <div className="text-[7px] font-black text-white bg-black/60 px-2 py-1 rounded-full text-center max-w-[80px]">{sector.label}</div>
                </div>
            </div>
            <div className="mt-4 text-[10px] font-black text-amber-500/60 uppercase tracking-widest">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    );
};

const ImpactHeatmap = ({ symptoms, category }) => {
    const getHotspots = () => {
        const text = (symptoms?.join(" ") + " " + category).toLowerCase();
        const spots = [];
        if (text.includes("brain") || text.includes("mental") || text.includes("memory") || text.includes("headache")) spots.push({ name: "Cortex", x: 50, y: 15, size: 8, color: "#6366f1" });
        if (text.includes("heart") || text.includes("bp") || text.includes("blood")) spots.push({ name: "Cardiac", x: 55, y: 35, size: 6, color: "#f43f5e" });
        if (text.includes("respiratory") || text.includes("cough") || text.includes("lungs")) spots.push({ name: "Bronchial", x: 50, y: 32, size: 10, color: "#10b981" });
        if (text.includes("liver") || text.includes("digestion") || text.includes("gas")) spots.push({ name: "Hepatic", x: 45, y: 45, size: 7, color: "#f59e0b" });
        if (text.includes("kidney") || text.includes("urinary")) spots.push({ name: "Renal", x: 50, y: 52, size: 6, color: "#3b82f6" });
        if (text.includes("joint") || text.includes("pain") || text.includes("back")) spots.push({ name: "Skeletal", x: 40, y: 65, size: 5, color: "#d946ef" });
        if (text.includes("skin") || text.includes("beauty")) spots.push({ name: "Dermal", x: 70, y: 50, size: 8, color: "#06b6d4" });
        return spots.length ? spots : [{ name: "Systemic", x: 50, y: 50, size: 12, color: "#fbbf24" }];
    };

    const hotspots = getHotspots();

    return (
        <div className="bg-black/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 flex flex-col items-center group/human hover:border-emerald-500/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <div className="animate-pulse w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Neural Biological Impact</span>
            <div className="relative w-32 h-48">
                {/* Stylized Human Outline */}
                <svg viewBox="0 0 100 150" className="w-full h-full opacity-40 group-hover/human:opacity-60 transition-opacity">
                    <path d="M50,10 C55,10 60,15 60,22 C60,25 58,28 55,30 C65,35 70,45 70,60 L70,90 L60,140 L40,140 L30,90 L30,60 C30,45 35,35 45,30 C42,28 40,25 40,22 C40,15 45,10 50,10 Z" fill="none" stroke="white" strokeWidth="1" />
                    <line x1="30" y1="65" x2="15" y2="100" stroke="white" strokeWidth="1" />
                    <line x1="70" y1="65" x2="85" y2="100" stroke="white" strokeWidth="1" />
                </svg>
                {/* Heatmap Spots */}
                {hotspots.map((spot, i) => (
                    <div key={i} className="absolute pointer-events-none" style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <div className="animate-ping absolute inset-0 rounded-full opacity-20" style={{ backgroundColor: spot.color }}></div>
                        <div className="relative rounded-full blur-md opacity-60" style={{
                            width: `${spot.size * 3}px`,
                            height: `${spot.size * 3}px`,
                            backgroundColor: spot.color
                        }}></div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[5px] font-black text-white/40 uppercase whitespace-nowrap opacity-0 group-hover/human:opacity-100 transition-opacity">
                            {spot.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-1">
                {hotspots.map((s, i) => (
                    <span key={i} className="text-[7px] font-black text-emerald-400 uppercase tracking-tighter bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">{s.name} Affinity</span>
                ))}
            </div>
        </div>
    );
};

const DoshaVisualizer = ({ category, name }) => {
    const getDoshaProfile = () => {
        const text = (name + category).toLowerCase();
        if (text.includes("pitta") || text.includes("fire") || text.includes("liver")) return [30, 90, 40];
        if (text.includes("vata") || text.includes("air") || text.includes("joint")) return [95, 40, 30];
        if (text.includes("kapha") || text.includes("water") || text.includes("congestion")) return [40, 30, 90];
        return [60, 60, 60];
    };

    const profile = getDoshaProfile();
    const size = 120;
    const center = size / 2;
    const radius = 40;

    const getPoint = (score, index) => {
        const angle = (Math.PI * 2 * index) / 3 - Math.PI / 2;
        const dist = (score / 100) * radius;
        return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
    };

    const points = profile.map((s, i) => getPoint(s, i)).join(" ");
    const doshas = ["Vata", "Pitta", "Kapha"];

    return (
        <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center group/dosha transition-all hover:border-amber-500/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/dosha:opacity-100 transition-opacity"></div>
            <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 relative z-10">Neural Tri-Dosha Balance</span>
            <div className="relative z-10 hover:scale-110 transition-transform duration-500">
                <svg width={size} height={size} className="drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <defs>
                        <radialGradient id="doshaGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(245,158,11,0.6)" />
                            <stop offset="100%" stopColor="rgba(245,158,11,0.1)" />
                        </radialGradient>
                    </defs>
                    {[25, 50, 75, 100].map(r => (
                        <circle key={r} cx={center} cy={center} r={(r / 100) * radius} fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="0.5" />
                    ))}
                    <polygon
                        points={points}
                        fill="url(#doshaGrad)"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        className="animate-pulse-slow"
                    />
                    {doshas.map((d, i) => {
                        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
                        const tx = center + (radius + 20) * Math.cos(angle);
                        const ty = center + (radius + 20) * Math.sin(angle);
                        return <text key={d} x={tx} y={ty} textAnchor="middle" fill="white" fontSize="8" fontWeight="900" className="uppercase opacity-40 group-hover/dosha:opacity-100 transition-opacity tracking-tighter">{d}</text>
                    })}
                </svg>
            </div>
        </div>
    );
};

const ManuscriptInsight = ({ category, name, onClose, langHindi }) => {
    const shlokas = {
        "First Aid": "सद्यः क्षतस्य सुश्रुत: सिद्धम्। (Immediate healing as perfected by Sushruta)",
        "Digestive": "अग्निर्मूलं मनुष्याणाम्। (Agni is the root of human health)",
        "Immunity": "ओजस्तु तेजो धातूनाम्। (Ojas is the essence of all tissues)",
        "Mental Health": "मन: प्रसादनं स्वस्थ्यम्। (Purity of mind is true health)",
        "default": "स्वस्थस्य स्वास्थ्य रक्षणम्। (Protecting the health of the healthy)"
    };
    const currentShloka = shlokas[category] || shlokas.default;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
            <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
            <div className="relative w-full max-w-2xl bg-[#fdf5e6] rounded-[2rem] p-12 shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden group">
                {/* Parchment Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[size:20px_20px]"></div>
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-amber-900/10 via-transparent to-amber-900/20"></div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="w-20 h-20 rounded-full bg-amber-900/5 flex items-center justify-center border border-amber-900/10">
                        <BsJournalMedical className="text-amber-900 text-3xl" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-amber-900/40 tracking-[0.5em] mb-2">Ancient Digital Manuscript</h3>
                        <div className="text-2xl font-black text-amber-900 uppercase tracking-tighter">{name} Insight</div>
                    </div>

                    <div className="py-12 px-6 border-y border-amber-900/10 w-full">
                        <p className="text-3xl md:text-4xl font-serif text-amber-900 italic leading-relaxed">
                            "{currentShloka}"
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="px-12 py-4 bg-amber-900 text-amber-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-transform"
                    >
                        Close Wisdom
                    </button>
                </div>

                {/* Animated Light Rays */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/40 blur-[120px] rotate-45 animate-pulse pointer-events-none"></div>
            </div>
        </div>
    );
};

const ElementalMapper = ({ category }) => {
    const getLevels = () => {
        const cat = category?.toLowerCase() || "";
        if (cat.includes("digestive")) return { ether: 10, air: 20, fire: 80, water: 40, earth: 30 };
        if (cat.includes("respiratory")) return { ether: 60, air: 80, fire: 20, water: 30, earth: 10 };
        if (cat.includes("mental")) return { ether: 90, air: 70, fire: 30, water: 20, earth: 10 };
        if (cat.includes("first aid") || cat.includes("skin")) return { ether: 10, air: 20, fire: 30, water: 70, earth: 90 };
        return { ether: 40, air: 40, fire: 40, water: 40, earth: 40 };
    };

    const levels = getLevels();
    const points = [
        { name: "Akasha", val: levels.ether, angle: -90, color: "#8b5cf6" },
        { name: "Vayu", val: levels.air, angle: -18, color: "#a5b4fc" },
        { name: "Agni", val: levels.fire, angle: 54, color: "#ef4444" },
        { name: "Jala", val: levels.water, angle: 126, color: "#3b82f6" },
        { name: "Prithvi", val: levels.earth, angle: 198, color: "#10b981" }
    ];

    const getPath = () => {
        return points.map((p, i) => {
            const r = (p.val / 100) * 40;
            const x = 50 + r * Math.cos((p.angle * Math.PI) / 180);
            const y = 50 + r * Math.sin((p.angle * Math.PI) / 180);
            return (i === 0 ? "M" : "L") + ` ${x} ${y}`;
        }).join(" ") + " Z";
    };

    return (
        <div className="flex flex-col items-center group/elements">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Mahabhuta Balance</span>
            <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background Spokes */}
                    {points.map((p, i) => {
                        const x = 50 + 40 * Math.cos((p.angle * Math.PI) / 180);
                        const y = 50 + 40 * Math.sin((p.angle * Math.PI) / 180);
                        return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                    })}
                    {/* Level Polygons */}
                    {[20, 40, 60, 80, 100].map(l => (
                        <polygon key={l} points={points.map(p => {
                            const r = (l / 100) * 40;
                            const x = 50 + r * Math.cos((p.angle * Math.PI) / 180);
                            const y = 50 + r * Math.sin((p.angle * Math.PI) / 180);
                            return `${x},${y}`;
                        }).join(" ")} fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" />
                    ))}
                    {/* Active Level */}
                    <path d={getPath()} fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    {/* Points */}
                    {points.map((p, i) => {
                        const r = (p.val / 100) * 40;
                        const x = 50 + r * Math.cos((p.angle * Math.PI) / 180);
                        const y = 50 + r * Math.sin((p.angle * Math.PI) / 180);
                        return <circle key={i} cx={x} cy={y} r="1.5" fill={p.color} />
                    })}
                </svg>
                {/* Labels */}
                {points.map((p, i) => {
                    const x = 50 + 48 * Math.cos((p.angle * Math.PI) / 180);
                    const y = 50 + 48 * Math.sin((p.angle * Math.PI) / 180);
                    return <div key={i} className="absolute text-[6px] font-black uppercase text-white/40 tracking-tighter" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>{p.name}</div>
                })}
            </div>
        </div>
    );
};

const MolecularExplorer = ({ category }) => {
    const compounds = {
        "Digestive": ["Curcumin", "Piperine", "Gingerol"],
        "Mental Health": ["Withanolides", "Bacopa-saponins"],
        "Immunity": ["Polysaccharides", "Alkaloids"],
        "Respiratory": ["Vascine", "Essential Oils"],
        "default": ["Phyto-nutrients", "Bio-actives"]
    };
    const active = compounds[category] || compounds.default;

    return (
        <div className="bg-black/30 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/5 group/molecule hover:border-blue-500/20 transition-all overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-2 w-4 h-4 bg-blue-400 rounded-full animate-blob"></div>
                <div className="absolute top-10 right-4 w-6 h-6 bg-purple-400 rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-4 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-blob animation-delay-4000"></div>
            </div>
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 block">Herb Molecular Signature</span>
            <div className="flex flex-wrap gap-2 relative z-10">
                {active.map((c, i) => (
                    <div key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2 group-hover/molecule:scale-105 transition-transform">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
                        <span className="text-[9px] font-bold text-blue-200/80 tracking-tight">{c}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const UsageRitual = ({ usage, langHindi, isSpeaking }) => {
    const parseSteps = (text) => {
        if (!text) return [];
        // Intelligent splitting based on common delimiters
        const steps = text.split(/[.;]|\band\b|\bऔर\b/).filter(s => s.trim().length > 5);
        return steps.map(s => s.trim());
    };

    const getIcon = (step) => {
        const text = step.toLowerCase();
        if (text.includes("mix") || text.includes("मिलाएं") || text.includes("घोलें")) return <BsDropletFill className="text-blue-400" />;
        if (text.includes("drink") || text.includes("पिएं") || text.includes("लें")) return <BsCupHotFill className="text-amber-400" />;
        if (text.includes("apply") || text.includes("लगाएं") || text.includes("मालिश")) return <BsHandIndexFill className="text-emerald-400" />;
        if (text.includes("wait") || text.includes("रखें") || text.includes("देर")) return <BsHourglassSplit className="text-cyan-400" />;
        if (text.includes("rinse") || text.includes("धोएं") || text.includes("कुल्ला")) return <BsSnow className="text-blue-300" />;
        return <BsFillRecordCircleFill className="text-amber-500/40" />;
    };

    const steps = parseSteps(usage);

    return (
        <div className="flex flex-col gap-6 relative">
            {steps.length > 0 ? (
                <div className="space-y-6">
                    {steps.map((step, i) => (
                        <div key={i} className={`flex items-start gap-6 p-6 rounded-[2.5rem] border transition-all duration-500 group/ritual ${isSpeaking ? 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-amber-500/20'}`}>
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-xl shadow-inner group-hover/ritual:scale-110 transition-transform">
                                {getIcon(step)}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-amber-500/60 uppercase tracking-widest">Step {i + 1}</span>
                                    {isSpeaking && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>}
                                </div>
                                <p className="text-lg md:text-xl font-bold text-white/90 leading-tight">
                                    {step.split(/(\d+\s*(?:tsp|ml|drops|min|मिनट|बूंद|चम्मच))|(\bempty stomach\b|\bखाली पेट\b)/gi).map((part, index) =>
                                        part?.match(/(\d+\s*(?:tsp|ml|drops|min|मिनट|बूंद|चम्मच))|(\bempty stomach\b|\bखाली पेट\b)/i) ?
                                            <span key={index} className="text-amber-400 border-b border-amber-500/40 pb-0.5">{part}</span> : part
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed italic border-l-4 border-amber-500/20 pl-8 font-serif">
                    "{usage}"
                </p>
            )}

            {/* Interactive Pulse Guide */}
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-full blur-sm"></div>
        </div>
    );
};

const VirtualBrewLab = ({ name, category }) => {
    const [agni, setAgni] = useState(0);
    const isLiquid = category?.toLowerCase().includes("tailam") || category?.toLowerCase().includes("juice") || category?.toLowerCase().includes("kwath");

    return (
        <div className="bg-black/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 flex flex-col items-center group/brew hover:border-orange-500/20 transition-all overflow-hidden relative">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Interactive Prep Lab</span>

            <div className="relative w-32 h-32 mb-8">
                {/* Steam Particles */}
                {agni > 30 && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 animate-bounce-slow">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-8 bg-white/10 blur-md rounded-full animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}></div>
                        ))}
                    </div>
                )}

                {/* Vessel */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-400/20 to-slate-600/40 rounded-b-3xl border border-white/10 shadow-2xl"></div>
                {/* Liquid */}
                <div
                    className="absolute bottom-1 left-1 right-1 rounded-b-[22px] transition-all duration-1000"
                    style={{
                        height: `${30 + agni / 2}%`,
                        backgroundColor: isLiquid ? `rgba(120, 50, 20, ${0.4 + agni / 200})` : `rgba(245, 158, 11, ${0.2 + agni / 200})`,
                        filter: `blur(${1 - agni / 100}px)`
                    }}
                >
                    {/* Bubbles */}
                    {agni > 50 && (
                        <div className="absolute inset-0 overflow-hidden">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${i * 0.3}s` }}></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full space-y-4">
                <div className="flex justify-between text-[8px] font-black uppercase text-white/40 tracking-widest">
                    <span>Agni Intensity</span>
                    <span className="text-orange-400">{agni}%</span>
                </div>
                <input
                    type="range" min="0" max="100" value={agni}
                    onChange={(e) => setAgni(e.target.value)}
                    className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-orange-500 overflow-hidden"
                />
                <p className="text-[10px] font-bold text-center text-white/20 italic">
                    {agni > 80 ? "Potency peaking..." : agni > 20 ? "Infusing bio-actives..." : "Cold extraction mode."}
                </p>
            </div>
        </div>
    );
};

const SynergyScanner = ({ medName, medCategory, onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="absolute inset-0 z-[100] bg-[#0a0501] flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="relative flex flex-col items-center">
                {/* Scanner Beam */}
                <div className="absolute -inset-20 bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 animate-[scan_2s_infinite] pointer-events-none"></div>

                <div className="w-24 h-24 mb-12 relative">
                    <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 bg-amber-500/5 rounded-full flex items-center justify-center">
                        <BsShieldFillCheck className="text-3xl text-amber-500" />
                    </div>
                </div>

                <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 text-center">
                    Initiating Neural Synergy Scan
                </h2>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] animate-pulse">Analyzing Biological Affinity...</span>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-500/20 animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-8 w-64 opacity-40">
                    <div className="border-l border-white/10 pl-4 py-2">
                        <div className="text-[8px] font-black text-white/40 uppercase">Entity</div>
                        <div className="text-xs font-bold text-white uppercase">{medName}</div>
                    </div>
                    <div className="border-l border-white/10 pl-4 py-2">
                        <div className="text-[8px] font-black text-white/40 uppercase">Domain</div>
                        <div className="text-xs font-bold text-white uppercase">{medCategory}</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
};

const MaternalSafetyShield = ({ med, langHindi }) => {
    if (!med.pregnancySafety) return null;
    return (
        <div className="p-10 bg-gradient-to-br from-[#0d1526] to-[#0a0d14] rounded-[3.5rem] border border-blue-500/30 shadow-2xl group overflow-hidden relative backdrop-blur-xl">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-1000"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h4 className="flex items-center gap-4 text-blue-400 font-extrabold uppercase text-[11px] tracking-[0.4em]">
                    <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/20 shadow-inner">
                        <BsShieldFillCheck className="text-2xl animate-pulse" />
                    </div>
                    {langHindi ? "मातृ सुरक्षा कवच" : "Maternal Safety Shield"}
                </h4>
                <div className={`px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase border ${med.pregnancySafety === "Safe" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]" :
                    med.pregnancySafety === "Caution" ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                        "bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                    }`}>
                    {langHindi ? (med.pregnancySafetyHindi || med.pregnancySafety) : med.pregnancySafety}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Pregnancy Period</div>
                    <div className={`flex items-center gap-3 text-lg font-black ${med.pregnancySafety === "Safe" ? "text-emerald-400" : med.pregnancySafety === "Caution" ? "text-amber-400" : "text-rose-400"}`}>
                        {med.pregnancySafety === "Safe" ? <BsCheckCircleFill /> : med.pregnancySafety === "Caution" ? <BsExclamationCircleFill /> : <BsXCircleFill />}
                        {langHindi ? (med.pregnancySafetyHindi || med.pregnancySafety) : med.pregnancySafety}
                    </div>
                </div>
                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Lactation Phase</div>
                    <div className={`flex items-center gap-3 text-lg font-black ${med.lactationSafety === "Safe" ? "text-emerald-400" : med.lactationSafety === "Caution" ? "text-amber-400" : "text-rose-400"}`}>
                        {med.lactationSafety === "Safe" ? <BsCheckCircleFill /> : med.lactationSafety === "Caution" ? <BsExclamationCircleFill /> : <BsXCircleFill />}
                        {langHindi ? (med.lactationSafetyHindi || med.lactationSafety) : med.lactationSafety}
                    </div>
                </div>
            </div>

            <p className="mt-8 text-sm md:text-base text-slate-400 leading-relaxed italic font-bold opacity-80 group-hover:opacity-100 transition-opacity relative z-10 p-6 bg-white/5 rounded-3xl border-l-4 border-blue-500/40">
                "{langHindi ? (med.maternalDetailsHindi || med.maternalDetails) : med.maternalDetails}"
            </p>
        </div>
    );
};

const NutriSyncPanel = ({ med, langHindi }) => {
    if (!med.foodInteractions) return null;
    return (
        <div className="p-10 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-[3.5rem] border border-emerald-500/20 group hover:border-emerald-500/40 transition-all backdrop-blur-md relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]"></div>
            <h4 className="flex items-center gap-4 text-emerald-400 font-black uppercase text-[11px] tracking-[0.3em] mb-8 relative z-10">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                    <BsDropletFill className="text-xl" />
                </div>
                Nutri-Sync Interactions
            </h4>
            <div className="space-y-4 relative z-10">
                {med.foodInteractions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-3xl border border-white/10 hover:bg-white/[0.06] transition-all">
                        <div>
                            <div className="text-sm font-black text-white mb-0.5">{item.food}</div>
                            <div className="text-[10px] font-bold text-slate-400 italic">{item.effect}</div>
                        </div>
                        <div className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl shadow-lg border ${item.risk === "Extreme" ? "bg-rose-500/20 text-rose-400 border-rose-500/20" : item.risk === "Low" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" : "bg-blue-500/20 text-blue-400 border-blue-500/20"}`}>
                            {item.risk}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AllopathicSubstituteEngine = ({ med, langHindi }) => {
    if (!med.allopathicSubstitutes) return null;
    return (
        <div className="p-10 bg-gradient-to-br from-[#0a120b] to-[#050805] rounded-[3.5rem] border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h4 className="flex items-center gap-4 text-emerald-400 font-extrabold uppercase text-[11px] tracking-[0.4em]">
                    <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
                        <BsPlusSquareFill className="text-2xl" />
                    </div>
                    {langHindi ? "एलोपैथिक विकल्प (Switch & Save)" : "Allopathic Substitute Engine"}
                </h4>
                <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/20 uppercase tracking-[0.2em] shadow-lg">Save & Switch</span>
            </div>

            <div className="grid gap-6 relative z-10">
                {med.allopathicSubstitutes.map((gen, i) => (
                    <div key={i} className="flex items-center justify-between p-8 bg-white/[0.03] rounded-[2.5rem] border border-white/10 hover:border-emerald-500/40 transition-all group/gen hover:bg-white/[0.07]">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/gen:rotate-12 transition-transform">
                                <BsCapsule className="text-emerald-400 text-xl" />
                            </div>
                            <div>
                                <div className="text-lg font-black text-white mb-1 group-hover/gen:text-emerald-400 transition-colors">{gen.name}</div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                                    <BsStars className="text-emerald-500" /> {gen.composition}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-emerald-400 mb-1">₹{gen.price}</div>
                            <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-lg uppercase tracking-tighter">
                                Retail Price
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmergencyProtocol = ({ onClose, langHindi }) => {
    return (
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
                        onClick={onClose}
                        className="w-full py-6 rounded-3xl bg-rose-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 transition-all font-bold"
                    >
                        Acknowledge & Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

const AyurvedaHub = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeDisease, setActiveDisease] = useState('All');
    const [selectedMed, setSelectedMed] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [langHindi, setLangHindi] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showManuscript, setShowManuscript] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [dosageMode, setDosageMode] = useState('adult');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [timeContext, setTimeContext] = useState("Vaikha (Morning) Potency Peak");
    const [showEmergency, setShowEmergency] = useState(false);

    const getSeason = () => {
        const month = new Date().getMonth();
        if (month <= 1) return { name: "Shishira", hi: "शिशिर", desc: "Late Winter - Boost Immunity", icon: <BsThermometerHalf className="text-blue-400" /> };
        if (month <= 3) return { name: "Vasanta", hi: "वसन्त", desc: "Spring - Detox Kapha", icon: <BsFlower1 className="text-pink-400" /> };
        if (month <= 5) return { name: "Grishma", hi: "ग्रीष्म", desc: "Summer - Cool Down Pitta", icon: <BsSunFill className="text-amber-400" /> };
        if (month <= 7) return { name: "Varsha", hi: "वर्षा", desc: "Monsoon - Support Vata", icon: <BsDropletFill className="text-blue-500" /> };
        if (month <= 9) return { name: "Sharad", hi: "शरद", desc: "Autumn - Pacify Pitta", icon: <BsWind className="text-emerald-400" /> };
        return { name: "Hemanta", hi: "हेमन्त", desc: "Early Winter - Strengthen Ojas", icon: <BsSnow className="text-blue-200" /> };
    };

    const yogaSynergy = {
        "Daily Essentials": { pose: "Suryanamaskar", desc: "General vitality" },
        "Immunity": { pose: "Bhujangasana", desc: "Strengthen lungs" },
        "Digestion": { pose: "Vajrasana", desc: "Post-meal support" },
        "Nervous System": { pose: "Vrikshasana", desc: "Balance mind" },
        "Skin Care": { pose: "Sarvangasana", desc: "Blood detox" },
        "Pain Relief": { pose: "Balasana", desc: "Muscle relax" }
    };

    const currentSeason = getSeason();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 10) setTimeContext("Vaikha (Morning) Potency Peak");
        else if (hour < 16) setTimeContext("Madhya (Noon) Metabolic Optima");
        else setTimeContext("Ratna (Evening) Restorative Phase");
    }, []);

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

    const getDosage = (med, mode) => {
        const base = med.dosage;
        if (mode === 'adult') return base;
        if (mode === 'child') return langHindi ? 'वयस्क खुराक का आधा (डॉक्टर से पूछें)' : 'Half of adult dose (Consult Dr)';
        if (mode === 'elderly') return langHindi ? '3/4 खुराक (हल्के भोजन के साथ)' : '3/4 Dose (With light food)';
        return base;
    };

    const categories = [
        "All", "Home Remedies", "Single Herbs", "Daily Essentials", "First Aid",
        "Beauty/Skin Care", "Thailam (Oil)", "Ghrita (Ghee)", "Asava/Arishta",
        "Bhasma/Rasayana", "Classical Yoga", "Herb Extract", "Ark (Distillate)",
        "Child Health", "Geriatric Care", "Weight Management", "ENT Care",
        "Liver Health", "Kidney/Urinary", "Fever/Infection", "Thyroid/Hormoral",
        "Pregnancy/Women", "Digestive", "Immunity", "Joint/Pain", "Respiratory",
        "Skin/Hair", "Mental Health", "Heart/BP", "Diabetes"
    ];

    const diseaseFilters = [
        "All", "Emergency", "Immunity", "Detox", "Obesity", "Thyroid", "PCOS",
        "Hair Fall", "Acne", "Liver", "Kidney", "Child Care", "Women", "Skin",
        "Joint Pain", "Constipation", "Gas", "Fever", "Cough", "Stress", "Memory",
        "Diabetes", "Heart", "Eye Care"
    ];

    const filteredMeds = ayurvedaDb.filter(med =>
        (activeCategory === 'All' || med.category === activeCategory) &&
        (activeDisease === 'All' ||
            med.symptoms?.some(s => s.toLowerCase().includes(activeDisease.toLowerCase()))
        ) &&
        (med.symptoms?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
            med.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.nameHindi?.includes(searchQuery))
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 1) {
            setIsAnalyzing(true);
            setTimeout(() => setIsAnalyzing(false), 800);
        }
    };

    const triggerSurprise = () => {
        const randomMed = ayurvedaDb[Math.floor(Math.random() * ayurvedaDb.length)];
        setSelectedMed(randomMed);
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#d97706', '#92400e', '#22c55e', '#ffffff'],
            ticks: 300
        });
    };

    return (
        <div className="min-h-screen bg-[#070301] text-white font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden relative">
            {/* Neural Ambient Field */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-900/20 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]"></div>
            </div>

            {/* Premium Header/Navigation */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-600/20 rounded-full blur-[150px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-orange-600/20 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-green-600/15 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#1a0f00]/60 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-amber-300/80 hover:text-amber-300 transition-all group font-bold">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setLangHindi(!langHindi)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${langHindi ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/60'}`}
                        >
                            {langHindi ? 'हिंदी' : 'ENG'}
                        </button>
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                            <BsTreeFill className="text-white animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black uppercase tracking-[0.2em] text-[10px] text-white/90"><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span></span>
                            <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest">Sovereign Elite v8.0 🏛️</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Side Filter */}
            <aside className={`fixed right-6 top-32 z-40 transition-all duration-700 ${isFilterOpen ? 'translate-x-0' : 'translate-x-[calc(100%-60px)]'}`}>
                <div className="bg-[#2a1a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-[60px] bg-gradient-to-b from-amber-600 to-orange-700 flex flex-col items-center justify-center gap-4 py-8 group"
                    >
                        <BsJournalMedical className={`text-xl text-white transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        <span className="[writing-mode:vertical-lr] font-black uppercase tracking-[0.3em] text-[10px] text-white">
                            {langHindi ? 'रोग फ़िल्टर' : 'Disease Filter'}
                        </span>
                    </button>
                    <div className="p-8 w-[280px] max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <h4 className="text-[10px] font-black uppercase text-amber-400/80 tracking-[0.3em] mb-6 border-b border-white/5 pb-2">
                            {langHindi ? 'रोग चुनें' : 'Select Focus'}
                        </h4>
                        <div className="space-y-2">
                            {diseaseFilters.map(disease => (
                                <button
                                    key={disease}
                                    onClick={() => { setActiveDisease(disease); if (window.innerWidth < 768) setIsFilterOpen(false); }}
                                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all border ${activeDisease === disease ? 'bg-amber-600 border-amber-500 text-white shadow-lg scale-105' : 'bg-white/5 border-white/5 text-amber-200/50 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {disease}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Ritucharya Seasonal Optimizer Banner */}
            <div className="container mx-auto max-w-7xl px-6 pt-32 animate-fade-in relative z-10">
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-white/5 rounded-[2.5rem] p-6 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden group/rit">
                    <div className="absolute inset-0 bg-amber-500/[0.02] translate-x-[-100%] group-hover/rit:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 text-3xl">
                            {currentSeason.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase text-amber-500/60 tracking-widest">Ritucharya Seasonal Optimizer</span>
                                <div className="px-2 py-0.5 rounded-md bg-amber-500/20 text-[8px] font-black text-amber-500 border border-amber-500/20">LIVE</div>
                            </div>
                            <h3 className="text-2xl font-black text-white">
                                {langHindi ? `ऋतु: ${currentSeason.hi}` : `Season: ${currentSeason.name}`}
                                <span className="text-amber-400 ml-4 font-medium text-lg hidden md:inline">— {currentSeason.desc}</span>
                            </h3>
                        </div>
                    </div>
                    <Link to="/diet-plan" className="px-8 py-4 rounded-2xl bg-amber-500 text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                        Get Seasonal Guide
                    </Link>
                </div>
            </div>

            <main className="pt-16 pb-20 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    {/* Hero */}
                    <div className="text-center mb-20 animate-fade-in px-4">
                        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-amber-300">
                                <MdVerifiedUser className="text-green-400" /> Sovereign Elite v8.0
                            </div>
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[9px] font-black uppercase tracking-[0.1em] text-amber-100">
                                <BsStars className="animate-pulse" /> {timeContext}
                            </div>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase group">
                            <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>
                            <br />
                            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-700 block">
                                {langHindi ? 'आयुर्वेद हब' : 'Ayurveda Hub'}
                            </span>
                        </h1>
                        <p className="text-amber-200/60 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mt-8">
                            {langHindi
                                ? '5000 वर्ष पुरानी आयुर्वेदिक चिकित्सा पद्धति। प्राकृतिक जड़ी-बूटियों से स्वास्थ्य लाभ।'
                                : 'Experience 5000 years of Ayurvedic wisdom. Natural herbs for holistic healing.'
                            }
                        </p>
                    </div>

                    {/* Search */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-green-500 rounded-[3.5rem] blur-lg opacity-40 group-focus-within:opacity-80 transition-opacity"></div>
                            <div className="relative flex items-center bg-[#2a1a0a]/80 backdrop-blur-xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                                <BsSearch className="ml-10 text-amber-500 text-2xl" />
                                <input
                                    type="text"
                                    placeholder={langHindi ? "लक्षण खोजें (जैसे: कब्ज, गैस, कमजोरी)..." : "Search symptoms (e.g. Constipation, Gas, Weakness)..."}
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full bg-transparent py-8 px-6 text-xl md:text-2xl font-bold placeholder:text-white/20 text-white focus:outline-none"
                                />
                                {isAnalyzing && (
                                    <div className="mr-8 flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce animation-delay-200"></span>
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce animation-delay-400"></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick filters */}
                        <div className="flex flex-wrap justify-center gap-3 mt-12">
                            <button
                                onClick={triggerSurprise}
                                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 animate-bounce-slow"
                            >
                                <BsStars className="text-lg" /> {langHindi ? 'आज की दवा' : 'Remedy Roulette'}
                            </button>
                            <button
                                onClick={() => setShowQuiz(true)}
                                className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-full shadow-lg hover:bg-white/10 transition-transform flex items-center gap-2"
                            >
                                <BsDropletFill className="text-lg text-blue-400" /> {langHindi ? 'प्रकृति जानें' : 'Know Your Prakriti'}
                            </button>
                            {diseaseFilters.slice(1, 8).map((disease) => (
                                <button
                                    key={disease}
                                    onClick={() => setActiveDisease(disease)}
                                    className={`px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest border transition-all ${activeDisease === disease ? 'bg-white text-amber-900 border-white shadow-lg' : 'bg-white/5 border-white/10 text-amber-200/60 hover:bg-white/10 hover:text-white'}`}
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
                                className={`px-5 py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-[0.15em] border transition-all ${activeCategory === cat ? 'bg-amber-600 border-amber-500 text-white shadow-lg' : 'bg-transparent border-transparent text-amber-300/40 hover:bg-white/5 hover:text-amber-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 border-y border-white/5 py-10 bg-white/[0.02]">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{ayurvedaDb.length}+</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'औषधियाँ' : 'Medicines'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-green-400 mb-1">100%</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'प्राकृतिक' : 'Natural'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-orange-400 mb-1">5000+</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'वर्ष पुराना' : 'Years Old'}</div>
                        </div>
                        <div className="text-center border-l border-white/5">
                            <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">24/7</div>
                            <div className="text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">{langHindi ? 'उपलब्ध' : 'Available'}</div>
                        </div>
                    </div>

                    {/* Medicine Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMeds.map((med, idx) => (
                            <div
                                key={idx}
                                onClick={() => { setSelectedMed(med); setIsScanning(true); }}
                                className="group relative bg-[#2a1a0a]/60 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 hover:bg-[#3a2a1a] transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)]"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/0 to-orange-600/0 group-hover:from-amber-500/20 group-hover:to-orange-600/20 rounded-[2rem] transition-all opacity-0 group-hover:opacity-100 blur-xl"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                            <BsTreeFill className="text-xl text-amber-400" />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase text-white/60 tracking-widest group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                            {med.category}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                                        {langHindi ? (med?.nameHindi || med?.name) : (med?.name || "Ayurvedic Medicine")}
                                    </h3>
                                    <p className="text-xs text-white/40 mb-4">{med?.form || "Classical Preparation"}</p>
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {(med?.symptoms || []).slice(0, 3).map((s, sIdx) => (
                                            <span key={sIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-amber-200/70">{s}</span>
                                        ))}
                                    </div>
                                    <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center">
                                        <div className="text-[10px] font-bold text-white/40">{med?.dosage || "Consult Dr"}</div>
                                        <BsArrowLeft className="rotate-180 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Content */}
                    {filteredMeds.length === 0 && (
                        <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
                            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BsShieldExclamation className="text-3xl text-amber-500" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">{langHindi ? 'कोई दवा नहीं मिली' : 'No Matching Medicines'}</h3>
                            <p className="text-white/40 mb-8">{langHindi ? 'अपनी खोज बदलें' : 'Try broadening your search'}</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveDisease('All') }} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black uppercase tracking-widest transition-all">
                                {langHindi ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Medicine Detail Modal - Radically Re-designed Bento UI */}
            {selectedMed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div onClick={() => setSelectedMed(null)} className="absolute inset-0 bg-[#0a0501]/95 backdrop-blur-3xl"></div>
                    <div className="w-full max-w-7xl bg-[#1a0f02] border border-white/10 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col max-h-[92vh]">
                        {isScanning && (
                            <SynergyScanner
                                medName={langHindi ? selectedMed?.nameHindi : selectedMed?.name}
                                medCategory={selectedMed?.category}
                                onComplete={() => setIsScanning(false)}
                            />
                        )}
                        <button
                            onClick={() => setSelectedMed(null)}
                            className="absolute top-10 right-10 w-14 h-14 rounded-2xl bg-white/5 hover:bg-rose-600 flex items-center justify-center transition-all z-30 group border border-white/10 hover:rotate-90"
                        >
                            <BsPlusSquareFill className="rotate-45 text-2xl text-white/40 group-hover:text-white" />
                        </button>

                        <div className="flex-1 overflow-y-auto p-12 md:p-20 custom-scrollbar relative z-10">
                            {/* Neural Background Glows */}
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

                            <div className="flex flex-col gap-12 relative z-10">
                                {selectedMed.urgentWarning && (
                                    <div onClick={() => setShowEmergency(true)} className="p-10 bg-gradient-to-r from-rose-900/40 to-rose-600/10 rounded-[4rem] border-2 border-rose-500/60 shadow-[0_0_50px_rgba(225,29,72,0.3)] relative overflow-hidden group animate-pulse-slow cursor-pointer">
                                        <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors"></div>
                                        <div className="flex items-center gap-8 relative z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-rose-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                                <BsExclamationTriangleFill className="text-3xl text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[10px] font-black text-rose-400 uppercase tracking-[0.4em] mb-2">Critical Red Flag Alert</div>
                                                <p className="text-xl md:text-2xl text-white leading-tight font-black italic">
                                                    "{langHindi ? (selectedMed.urgentWarningHindi || selectedMed.urgentWarning) : selectedMed.urgentWarning}"
                                                </p>
                                            </div>
                                            <div className="px-6 py-3 rounded-xl bg-white/10 text-[10px] font-black uppercase tracking-widest text-white group-hover:bg-white/20 transition-all">
                                                Protocol details
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Header Section: Cinematic Title & Dosha */}
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-white/5 pb-16">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="px-6 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase text-amber-400 tracking-[0.3em] shadow-lg backdrop-blur-md">
                                                {selectedMed.category}
                                            </div>
                                            <div className="px-6 py-2 rounded-full bg-emerald-500 text-[10px] font-black uppercase text-white tracking-[0.3em] shadow-[0_4px_20px_rgba(16,185,129,0.4)]">
                                                Elite v8.0
                                            </div>
                                            <div className="flex items-center gap-2 text-rose-500 animate-pulse">
                                                <div className="w-2 h-2 rounded-full bg-current"></div>
                                                <span className="text-[9px] font-black uppercase tracking-widest">Neural Active</span>
                                            </div>
                                        </div>

                                        <h2 className="text-5xl md:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-100 to-amber-500 leading-[0.85] tracking-tighter drop-shadow-2xl">
                                            {langHindi ? selectedMed.nameHindi : selectedMed.name}
                                        </h2>

                                        <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl w-fit group/cite">
                                            <BsShieldFillCheck className="text-amber-500 text-xl" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Certified Protocol</span>
                                                <span className="text-[8px] font-bold text-white/40 uppercase">AYU-v8-{selectedMed.name.replace(/\s+/g, '-').toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center lg:items-end gap-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <DoshaVisualizer category={selectedMed?.category || ""} name={selectedMed?.name || ""} />
                                            <ImpactHeatmap symptoms={selectedMed?.symptoms} category={selectedMed?.category} />
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setShowManuscript(true)}
                                                className="px-8 py-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3 group/wisdom hover:bg-amber-500 hover:text-white transition-all"
                                            >
                                                <BsJournalMedical className="text-amber-500 group-hover/wisdom:text-white group-hover/wisdom:rotate-12 transition-all" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Invoke Shloka</span>
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleSpeak(langHindi ? selectedMed.usageHindi : selectedMed.usage, langHindi); }}
                                                className={`w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-all shadow-xl ${isSpeaking ? 'bg-green-500 text-white animate-pulse' : 'bg-white/5 text-white/40 hover:bg-amber-500 hover:text-white hover:scale-110'}`}
                                            >
                                                <BsVolumeUpFill className="text-2xl" />
                                            </button>
                                            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center min-w-[120px] group/item hover:border-amber-500/20 transition-all">
                                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Source</span>
                                                <span className="text-xs font-black text-amber-200 uppercase">{selectedMed.source}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bento Grid Content */}
                                <div className="grid lg:grid-cols-3 gap-8 items-start">

                                    {/* Usage Tiles (Col 1 & 2) */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="bg-white/[0.03] backdrop-blur-2xl p-10 rounded-[4rem] border border-white/5 group/card hover:bg-white/[0.05] transition-all hover:border-amber-500/10">
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/10 group-hover/card:scale-110 transition-transform">
                                                    <BsInfoCircleFill className="text-amber-400 text-2xl" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase text-amber-500/60 tracking-[0.4em] mb-1">Biological Protocol</h4>
                                                    <div className="text-xl font-black text-white uppercase">{langHindi ? 'उपयोग विधि और निर्देश' : 'Usage & Instructions'}</div>
                                                </div>
                                            </div>
                                            <UsageRitual
                                                usage={langHindi ? (selectedMed?.usageHindi || selectedMed?.usage) : (selectedMed?.usage || "Standard preparation.")}
                                                langHindi={langHindi}
                                                isSpeaking={isSpeaking}
                                            />
                                        </div>

                                        {/* Benefits with high visual separation */}
                                        <div className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[4rem] border border-white/5 group/card hover:bg-white/[0.05] transition-all hover:border-emerald-500/10">
                                            <div className="flex items-center gap-6 mb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10 group-hover/card:scale-110 transition-transform">
                                                    <BsCheckCircleFill className="text-emerald-400 text-2xl" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-black uppercase text-emerald-400/60 tracking-[0.4em] mb-1">Sovereign Outcomes</h4>
                                                    <div className="text-xl font-black text-white uppercase">{langHindi ? 'मुख्य लाभ' : 'Clinical Benefits'}</div>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {(langHindi ? (selectedMed?.benefitsHindi || selectedMed?.benefits || []) : (selectedMed?.benefits || ["Holistic healing"])).map((b, i) => (
                                                    <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/5 group-hover/card:bg-white/10 transition-all">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                        <span className="text-sm font-bold text-white/70 leading-tight">{b}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Side Effects Panel */}
                                        {selectedMed.sideEffects && (
                                            <div className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[4rem] border border-white/5 group/card hover:bg-white/[0.05] transition-all hover:border-amber-500/10">
                                                <div className="flex items-center gap-6 mb-8">
                                                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/10 group-hover/card:scale-110 transition-transform">
                                                        <BsShieldExclamation className="text-amber-400 text-2xl" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-black uppercase text-amber-500/60 tracking-[0.4em] mb-1">Response Monitoring</h4>
                                                        <div className="text-xl font-black text-white uppercase">{langHindi ? 'संभावित दुष्प्रभाव' : 'Potential Side Effects'}</div>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {(langHindi ? (selectedMed.sideEffectsHindi || selectedMed.sideEffects) : selectedMed.sideEffects).map((effect, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                            <BsPlusSquareFill className="text-amber-500 text-xs rotate-45" />
                                                            <span className="text-xs font-bold text-slate-300">{effect}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Side Modules (Col 3) */}
                                    <div className="space-y-8">
                                        {/* BioClock Module */}
                                        <BioClock category={selectedMed?.category} langHindi={langHindi} peakHours={selectedMed?.peakHours} />

                                        {/* Molecular Explorer */}
                                        <MolecularExplorer category={selectedMed?.category} />

                                        {/* Timing Module */}
                                        <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-10 rounded-[4rem] border border-white/5 text-center group/time hover:border-amber-400/20 transition-all">
                                            <BsClock className="text-4xl text-amber-400 mx-auto mb-6 group-hover/time:scale-125 transition-transform" />
                                            <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-2">{langHindi ? 'समय' : 'Ritucharya Timing'}</h4>
                                            <div className="text-2xl font-black text-white tracking-tight">{langHindi ? (selectedMed?.timingHindi || selectedMed?.timing) : (selectedMed?.timing || "Empty Stomach")}</div>
                                        </div>

                                        {/* Dosage Optimizer Module */}
                                        <div className="bg-white/5 p-10 rounded-[4rem] border border-white/5 group/dose flex flex-col items-center">
                                            <div className="flex items-center gap-3 mb-8">
                                                <BsCalculatorFill className="text-2xl text-orange-400 group-hover/dose:rotate-12 transition-transform" />
                                                <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">{langHindi ? 'खुराक कैलकुलेटर' : 'Dosage Optimizer'}</h4>
                                            </div>
                                            <div className="flex gap-1 mb-8 bg-black/40 p-1.5 rounded-full border border-white/5">
                                                {['adult', 'child', 'elderly'].map(mode => (
                                                    <button
                                                        key={mode}
                                                        onClick={(e) => { e.stopPropagation(); setDosageMode(mode); }}
                                                        className={`px-6 py-3 rounded-full text-[10px] uppercase font-black transition-all ${dosageMode === mode ? 'bg-orange-500 text-white shadow-2xl' : 'text-white/20 hover:text-white'}`}
                                                    >
                                                        {mode === 'adult' ? (langHindi ? 'वयस्क' : 'Adult') : mode === 'child' ? (langHindi ? 'बच्चा' : 'Child') : (langHindi ? 'वृद्ध' : 'Elder')}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="w-full py-6 rounded-[2.5rem] bg-black/40 border border-white/5 text-2xl font-black text-white flex items-center justify-center shadow-inner">
                                                {getDosage(selectedMed, dosageMode)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Cinematic Row */}
                                    <div className="lg:col-span-3 grid lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                                        {/* Dravyaguna Detail Radar Overlay */}
                                        <div className="bg-gradient-to-br from-white/5 to-amber-900/10 p-12 rounded-[5rem] border border-white/5 flex flex-col items-center gap-12 group/radar_box hover:bg-white/10 transition-all">
                                            <div className="text-center space-y-4">
                                                <h4 className="text-[10px] font-black uppercase text-amber-500/60 tracking-[0.5em]">Dravyaguna Profile Radar</h4>
                                                <div className="text-xl font-black text-white uppercase tracking-tighter">Energetic Dynamics</div>
                                            </div>
                                            <div className="relative transform group-hover/radar_box:scale-[1.1] transition-transform duration-1000">
                                                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[60px] opacity-0 group-hover/radar_box:opacity-100 transition-opacity"></div>
                                                <DravyagunaRadar data={selectedMed?.dravyaguna || { rasa: 80, virya: 40, vipaka: 60, guna: 30, karma: 70 }} />
                                            </div>
                                        </div>

                                        {/* Elemental Mapper */}
                                        <div className="bg-white/5 p-12 rounded-[5rem] border border-white/5 flex flex-col items-center justify-center group/elemental hover:border-amber-500/20 transition-all">
                                            <ElementalMapper category={selectedMed?.category} />
                                        </div>

                                        {/* Preparation Lab */}
                                        <div className="xl:col-span-1">
                                            <VirtualBrewLab name={selectedMed?.name} category={selectedMed?.category} />
                                        </div>

                                        {/* Yogic Synergy Module */}
                                        {yogaSynergy[selectedMed?.category] && (
                                            <div className="bg-emerald-500/5 p-12 rounded-[5rem] border border-emerald-500/10 group/yoga overflow-hidden relative transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30">
                                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/yoga:opacity-100 transition-opacity"></div>
                                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/yoga:opacity-10 transition-opacity">
                                                    <BsActivity className="text-[12rem] text-emerald-500" />
                                                </div>
                                                <div className="flex flex-col gap-6 relative z-10">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 group-hover/yoga:scale-110 group-hover/yoga:rotate-6 transition-all">
                                                            <BsStars className="text-emerald-400 text-4xl" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] font-black uppercase text-emerald-400/80 tracking-[0.5em] mb-1">Yogic Synergy Engine</h4>
                                                            <div className="text-2xl font-black text-white tracking-tighter uppercase">{yogaSynergy[selectedMed.category].pose}</div>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-white/50 font-bold leading-relaxed">
                                                        {langHindi ? `${yogaSynergy[selectedMed.category].pose} मुद्रा प्रभाव बढ़ाती है।` : `Unlock the potential with ${yogaSynergy[selectedMed.category].pose}.`}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Safety & Red Tag Section */}
                                    <div className="lg:col-span-3 mt-12 py-12 px-16 bg-rose-500/5 rounded-[5rem] border border-rose-500/10 flex flex-col lg:flex-row items-center gap-12 group/safety">
                                        <div className="flex-shrink-0 w-24 h-24 rounded-[2rem] bg-rose-500/10 flex items-center justify-center group-hover/safety:animate-wiggle">
                                            <BsShieldExclamation className="text-[#fb7185] text-5xl" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <h4 className="text-[10px] font-black uppercase text-rose-400 tracking-[0.5em]">Clinical Logic & Cautionary Advice</h4>
                                            <p className="text-xl font-bold text-white/90 leading-tight">
                                                {langHindi ? (selectedMed?.contraindicationsHindi || selectedMed?.contraindications || "वैद्य परामर्श अनिवार्य।") : (selectedMed?.contraindications || "Ayurvedic physician supervision recommended.")}
                                            </p>
                                            <div className="text-sm font-black text-rose-400/60 uppercase tracking-widest italic pt-2">
                                                {langHindi ? (selectedMed?.interactionsHindi || selectedMed?.interactions || "") : (selectedMed?.interactions || "")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* NEW: Maternal & Food Interaction Section */}
                                    <div className="lg:col-span-2">
                                        <MaternalSafetyShield med={selectedMed} langHindi={langHindi} />
                                    </div>
                                    <div className="lg:col-span-1">
                                        <NutriSyncPanel med={selectedMed} langHindi={langHindi} />
                                    </div>

                                    {/* NEW: Allopathic Substitute Engine Section */}
                                    <div className="lg:col-span-3">
                                        <AllopathicSubstituteEngine med={selectedMed} langHindi={langHindi} />
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex flex-wrap gap-6 pt-16 border-t border-white/5">
                                    <button
                                        onClick={() => setSelectedMed(null)}
                                        className="px-12 py-6 bg-white/5 hover:bg-white/10 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 group/close"
                                    >
                                        <BsPlusSquareFill className="rotate-45 text-white/40 group-hover/close:text-white" />
                                        {langHindi ? 'बाहर निकलें' : 'Exit Dossier'}
                                    </button>
                                    <Link to="/pharmacy-hub" className="flex-1 px-12 py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-[2rem] text-center text-[12px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(180,83,9,0.3)]">
                                        {langHindi ? 'अवधि आर्डर करें' : 'Order Medicine Now'} <BsArrowLeft className="rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Manuscript Insight Modal */}
            {showManuscript && (
                <ManuscriptInsight
                    category={selectedMed?.category}
                    name={selectedMed?.name}
                    onClose={() => setShowManuscript(false)}
                    langHindi={langHindi}
                />
            )}

            {/* Prakriti Quiz Modal */}
            {showQuiz && <PrakritiQuiz onClose={() => setShowQuiz(false)} langHindi={langHindi} />}

            {/* Emergency Protocol Overlay */}
            {showEmergency && <EmergencyProtocol onClose={() => setShowEmergency(false)} langHindi={langHindi} />}

            <style>{`
                @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-50px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
                @keyframes neural-glow { 0% { border-color: rgba(245,158,11,0.1); } 50% { border-color: rgba(245,158,11,0.6); box-shadow: 0 0 20px rgba(245,158,11,0.2); } 100% { border-color: rgba(245,158,11,0.1); } }
                @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }
                .animate-blob { animation: blob 10s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
                .neural-card-glow { animation: neural-glow 3s infinite ease-in-out; }
                .animate-wiggle { animation: wiggle 0.5s infinite; }
            `}</style>
        </div>
    );
};

export default AyurvedaHub;
