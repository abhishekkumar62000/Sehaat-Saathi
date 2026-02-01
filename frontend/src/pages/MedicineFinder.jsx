import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsStars, BsCapsule, BsSearch, BsMap, BsBell,
    BsCheckCircleFill, BsExclamationTriangleFill, BsXCircleFill,
    BsInfoCircleFill, BsTruck, BsPhone, BsShop, BsArrowRight,
    BsLightningFill, BsInboxesFill, BsVolumeUpFill, BsPlayFill,
    BsStopFill, BsSoundwave, BsCpuFill, BsGeoAltFill, BsArrowRepeat,
    BsBoxSeamFill, BsCartCheck, BsArrowLeftRight, BsShieldCheck,
    BsShieldFillCheck, BsListCheck, BsDropletFill, BsGraphUpArrow,
    BsHourglassSplit, BsTerminalFill
} from 'react-icons/bs';
import { medicineSubstitutes } from '../utils/medicineSubstitutes';
import { medicinedb } from '../utils/medicineData';

const MedicineFinder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState(null);
    const [notified, setNotified] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeView, setActiveView] = useState('inventory'); // inventory, tree, compare
    const [showSOS, setShowSOS] = useState(false);
    const [sosStatus, setSosStatus] = useState('idle'); // idle, broadcast, searching, found



    const handleSearch = () => {
        if (!searchQuery) return;
        setSearching(true);
        setResults(null);

        setTimeout(() => {
            // 1. Check in Substitutes Database (High Priority)
            let match = medicineSubstitutes.find(m =>
                m.name.toLowerCase() === searchQuery.toLowerCase() ||
                m.salt.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // 2. Check in Full Master Database (Fallback)
            if (!match) {
                const masterMatch = medicinedb.find(m =>
                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    m.symptoms?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                );

                if (masterMatch) {
                    match = {
                        name: masterMatch.name,
                        salt: masterMatch.category + " Formulation",
                        category: masterMatch.category,
                        original: masterMatch.name,
                        substitute: "Generic " + (masterMatch.name.split(' ')[0]),
                        reason: masterMatch.benefits?.[0] || "Standard pharmaceutical alternative with high clinical efficacy.",
                        specs: { price: "₹" + (masterMatch.price || 50), bioavailability: "85%", manufacturer: "Sehaat Labs", stability: "High" },
                        fullData: masterMatch // Store original for more details
                    };
                }
            }

            if (match) {
                // Transform match into the rich UI format
                const richFound = {
                    brand: match.name,
                    generic: match.salt,
                    dosage: match.salt.split(' ')[1] || (match.fullData?.dosage || "N/A"),
                    status: Math.random() > 0.3 ? "Out of Stock" : "In Stock",
                    saltDesc: match.reason || match.fullData?.usage,
                    original: match.original,
                    substitute: match.substitute,
                    specs: match.specs,
                    category: match.category,
                    benefits: match.fullData?.benefits || ["Fast Relief", "Clinical Safety", "High Absorption"],
                    safety: match.fullData?.safety || "Standard precautions apply.",
                    alternatives: [
                        { brand: match.substitute, price: match.specs.price, rating: 4.8, stability: match.specs.stability, manufacturer: match.specs.manufacturer, bioAvailability: match.specs.bioavailability },
                        { brand: "Generic " + match.salt.split(' ')[0], price: "₹" + (parseInt(match.specs.price.toString().replace('₹', '')) * 0.4).toFixed(0), rating: 4.5, stability: "95%", manufacturer: "Generic Lab", bioAvailability: "88%" }
                    ],
                    pharmacies: [
                        { name: "Apollo Pharmacy", distance: "0.8 km", stock: "Low", location: "Sector 14" },
                        { name: "Sehaat Priority Hub", distance: "1.2 km", stock: "In Stock", location: "Grand Mall" },
                        { name: "Local Chemist", distance: "3.5 km", stock: "High", location: "City Center" }
                    ],
                    treeNodes: [
                        { id: 1, name: match.salt, type: "root", x: 125, y: 50 },
                        { id: 2, name: match.original, type: "brand", x: 50, y: 150, current: true },
                        { id: 3, name: match.substitute, type: "brand", x: 200, y: 150 }
                    ]
                };
                setResults(richFound);
            } else {
                setResults(null);
            }
            setSearching(false);
            setActiveView('inventory');
        }, 1500);
    };

    const speakScience = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    const triggerSOS = () => {
        setSosStatus('searching');
        setTimeout(() => {
            setSosStatus('found');
        }, 3000);
    };

    // UI Components
    const SaltSyncTree = ({ nodes }) => (
        <div className="relative w-full h-[300px] border border-white/5 rounded-[3rem] bg-black/20 overflow-hidden group">
            <svg viewBox="0 0 250 200" className="w-full h-full">
                {/* Connections */}
                {nodes.filter(n => n.type === 'brand').map((n, i) => (
                    <line key={i} x1="125" y1="50" x2={n.x} y2={n.y} stroke="rgba(16,185,129,0.2)" strokeWidth="1" className="animate-pulse" />
                ))}

                {/* Root Node */}
                <g className="cursor-help">
                    <circle cx="125" cy="50" r="10" fill="#10b981" className="animate-ping opacity-20" />
                    <circle cx="125" cy="50" r="6" fill="#10b981" />
                    <text x="125" y="35" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold" className="uppercase tracking-widest">{nodes[0].name}</text>
                </g>

                {/* Brand Nodes */}
                {nodes.filter(n => n.type === 'brand').map((n, i) => (
                    <g key={i} className="group/node cursor-pointer">
                        <circle cx={n.x} cy={n.y} r="4" fill={n.current ? '#f59e0b' : 'rgba(255,255,255,0.2)'} className="group-hover/node:fill-emerald-400 transition-colors" />
                        <text x={n.x} y={n.y + 15} textAnchor="middle" fill={n.current ? '#f59e0b' : '#64748b'} fontSize="6" fontWeight="bold" className="group-hover/node:fill-white transition-colors uppercase">{n.name}</text>
                    </g>
                ))}

                {/* Scan Line */}
                <line x1="0" y1="0" x2="250" y2="0" stroke="rgba(16,185,129,0.1)" strokeWidth="2" className="animate-[scan_3s_linear_infinite]" />
            </svg>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                <div className="flex items-center gap-2 text-[6px] font-black uppercase text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Core Salt
                </div>
                <div className="flex items-center gap-2 text-[6px] font-black uppercase text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Current Search
                </div>
                <div className="flex items-center gap-2 text-[6px] font-black uppercase text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div> Alternate Brands
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Ultra-Premium Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Neural Logistics</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                            <BsCpuFill className="text-indigo-400 animate-spin-slow" />
                            <span className="font-black uppercase tracking-[0.2em] text-[8px] text-indigo-400">Supply-Chain AI v4.0</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">

                    {/* Search Engine Overhaul */}
                    <div className={`transition-all duration-1000 ${results ? 'mb-12' : 'py-20 flex flex-col items-center'}`}>
                        <div className={`text-center ${results ? 'text-left flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 w-full max-w-7xl mx-auto' : 'mb-16'}`}>
                            {!results ? (
                                <>
                                    <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">India's 1st Pharmacological Neural Network</span>
                                    <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent leading-none tracking-tighter">
                                        MEDICINE <br />NEURAL HUB
                                    </h1>
                                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                                        Medicine shortage is a supply chain problem. Let Sehaat Saathi find safe alternatives or track them down for you.
                                    </p>
                                </>
                            ) : (
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Neural Search Result</h2>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Pharmacological Match: 100% Verified</p>
                                </div>
                            )}

                            <div className={`relative group ${results ? 'w-full md:w-[600px]' : 'w-full max-w-2xl mx-auto'}`}>
                                <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative flex p-2 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl transition-all group-focus-within:border-emerald-500/50">
                                    <div className="flex-1 flex items-center px-6">
                                        <BsSearch className="text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Search brand or salt composition..."
                                            className="w-full bg-transparent px-4 py-4 outline-none text-slate-200 font-bold placeholder:text-slate-600 uppercase text-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest rounded-[2rem] transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        {searching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'INITIATE'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {searching && (
                        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                            <div className="relative w-32 h-32 mb-8">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse"></div>
                                <div className="w-full h-full border-2 border-white/5 border-t-emerald-500 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BsCapsule className="text-emerald-400 text-3xl animate-bounce" />
                                </div>
                            </div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Tracing Global Inventory Channels...</h3>
                        </div>
                    )}

                    {results && !searching && (
                        <div className="grid lg:grid-cols-12 gap-8 animate-slide-up">

                            {/* Left Col: Scientific & Alternative Hub */}
                            <div className="lg:col-span-8 space-y-8">

                                {/* Top: Identity Card */}
                                {/* Side-by-Side (Dono Sath Me) Comparison */}
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {/* Original Card */}
                                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] relative overflow-hidden group/orig">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-500/20"></div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Original Choice</span>
                                            <BsCheckCircleFill className="text-slate-500" />
                                        </div>
                                        <h4 className="text-3xl font-black mb-2 italic uppercase">{results.original}</h4>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase mb-6">Commonly Prescribed</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                                <span>Price Range</span>
                                                <span className="text-white">Medium</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                                <span>Availability</span>
                                                <span className="text-rose-500">Shortage Impacted</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Substitute Card */}
                                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[3rem] relative overflow-hidden group/sub">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">AI Top Substitute</span>
                                            <BsStars className="text-emerald-500 animate-spin-slow" />
                                        </div>
                                        <h4 className="text-3xl font-black mb-2 italic uppercase text-emerald-400">{results.substitute}</h4>
                                        <p className="text-emerald-500/60 text-[10px] font-bold uppercase mb-6">Verified Bio-Equivalent</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[10px] font-black uppercase text-emerald-400/60">
                                                <span>Price</span>
                                                <span className="text-emerald-400 font-black">{results.specs.price}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-black uppercase text-emerald-400/60">
                                                <span>AI Confidence</span>
                                                <span className="text-emerald-400 font-black">99.8%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connection Line */}
                                    <div className="md:col-span-2 flex items-center justify-center -my-8 z-10">
                                        <div className="w-12 h-12 bg-[#020617] border border-white/10 rounded-full flex items-center justify-center shadow-2xl relative">
                                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse"></div>
                                            <BsArrowLeftRight className="text-emerald-500 relative z-10" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[4rem] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 -mr-40 -mt-40 rounded-full blur-3xl transition-all duration-1000 group-hover:bg-emerald-500/10"></div>

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-10">
                                            <div>
                                                <h3 className="text-5xl font-black mb-2 flex items-center gap-4">
                                                    {results.brand}
                                                    {results.status === 'In Stock' ?
                                                        <BsCheckCircleFill className="text-emerald-500 text-2xl" /> :
                                                        <BsExclamationTriangleFill className="text-rose-500 text-2xl animate-pulse" />
                                                    }
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-[0.2em]">{results.generic}</span>
                                                    <span className="text-[10px] font-black text-slate-500 px-4 py-1.5 bg-white/5 rounded-full border border-white/5 uppercase tracking-widest">{results.dosage}</span>
                                                    <span className="text-[10px] font-black text-emerald-400 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 uppercase tracking-widest">{results.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Stock Status</div>
                                                <div className={`text-xl font-black italic uppercase ${results.status === 'In Stock' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {results.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Next Level: Salt-Sync Tree */}
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div>
                                                <div className="flex justify-between items-center mb-6">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2 italic">
                                                        <BsStars className="animate-spin-slow" /> AI Salt-Sync Visualization
                                                    </h4>
                                                </div>
                                                <SaltSyncTree nodes={results.treeNodes} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 relative">
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Scientific Benefit Analysis</span>
                                                        <button
                                                            onClick={() => isSpeaking ? window.speechSynthesis.cancel() : speakScience(results.saltDesc)}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[8px] font-black uppercase transition-all shadow-xl active:scale-95 ${isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'}`}
                                                        >
                                                            {isSpeaking ? <BsStopFill /> : <BsVolumeUpFill />} {isSpeaking ? 'STOP' : 'PLAY SCIENCE'}
                                                        </button>
                                                    </div>

                                                    {/* Benefits List */}
                                                    <div className="space-y-3 mb-6">
                                                        {results.benefits.map((benefit, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                                                <BsListCheck className="text-emerald-500" /> {benefit}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl mb-6">
                                                        <div className="flex items-center gap-2 text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">
                                                            <BsShieldFillCheck /> Safety Protocol
                                                        </div>
                                                        <p className="text-[9px] text-slate-400 font-bold leading-relaxed">{results.safety}</p>
                                                    </div>

                                                    <div className="mt-6 flex gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-75"></div>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Level: Side-by-Side Comparison HUD */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <h4 className="text-2xl font-black uppercase italic tracking-tighter">NEURAL COMPARISON HUD</h4>
                                        <div className="flex bg-white/5 p-1 rounded-xl">
                                            <button onClick={() => setActiveView('inventory')} className={`px-4 py-1.5 rounded-lg text-[8px] font-black transition-all ${activeView === 'inventory' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>INVENTORY</button>
                                            <button onClick={() => setActiveView('compare')} className={`px-4 py-1.5 rounded-lg text-[8px] font-black transition-all ${activeView === 'compare' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>SPECS</button>
                                        </div>
                                    </div>

                                    {activeView === 'inventory' ? (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {results.alternatives.map((alt, i) => (
                                                <div key={i} className="bg-[#0f172a]/80 border border-white/5 p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group/card cursor-pointer flex justify-between items-center shadow-xl">
                                                    <div>
                                                        <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-2">Alternate Brand {i + 1}</div>
                                                        <h5 className="text-2xl font-black mb-1 group-hover/card:text-emerald-400 transition-colors uppercase">{alt.brand}</h5>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-sm font-black text-white">{alt.price}</span>
                                                            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">★ {alt.rating}</div>
                                                        </div>
                                                    </div>
                                                    <button className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover/card:bg-emerald-600 group-hover/card:text-white transition-all">
                                                        <BsCartCheck size={24} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-white/5">
                                                    <tr>
                                                        <th className="px-8 py-6 text-[8px] font-black uppercase tracking-widest text-slate-500">Brand Name</th>
                                                        <th className="px-8 py-6 text-[8px] font-black uppercase tracking-widest text-slate-500 text-center">Bio-Availability</th>
                                                        <th className="px-8 py-6 text-[8px] font-black uppercase tracking-widest text-slate-500 text-center">Stability</th>
                                                        <th className="px-8 py-6 text-[8px] font-black uppercase tracking-widest text-slate-500 text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {results.alternatives.map((alt, i) => (
                                                        <tr key={i} className="hover:bg-white/[0.03] transition-colors group/row">
                                                            <td className="px-8 py-6">
                                                                <div className="font-black text-white uppercase">{alt.brand}</div>
                                                                <div className="text-[8px] font-bold text-slate-500">{alt.manufacturer}</div>
                                                            </td>
                                                            <td className="px-8 py-6 text-center text-xs font-black text-indigo-400">{alt.bioAvailability}</td>
                                                            <td className="px-8 py-6 text-center text-xs font-black text-emerald-400">{alt.stability}</td>
                                                            <td className="px-8 py-6 text-center">
                                                                <button className="bg-white/5 hover:bg-emerald-600 text-white p-3 rounded-xl transition-all shadow-xl group-row:scale-110">
                                                                    <BsInfoCircleFill />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Col: Logistics & Supply Commands */}
                            <div className="lg:col-span-4 space-y-8">

                                {/* Supply Status Card */}
                                <div className="bg-gradient-to-br from-slate-900 via-[#020617] to-slate-900 border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                    <div className="flex justify-between items-center mb-8 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Local Supply Grid</span>
                                        </div>
                                        <BsShop className="text-slate-700 text-xl" />
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        {results.pharmacies.map((pharm, i) => (
                                            <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl hover:border-emerald-500/20 transition-all flex justify-between items-center group/pharm">
                                                <div>
                                                    <h5 className="font-black text-xs uppercase transition-colors group-hover/pharm:text-emerald-400">{pharm.name}</h5>
                                                    <div className="flex items-center gap-1.5 mt-1 text-[8px] font-black text-slate-500">
                                                        <BsGeoAltFill className="text-indigo-500" /> {pharm.location} • {pharm.distance}
                                                    </div>
                                                </div>
                                                <div className={`text-[8px] font-black uppercase px-3 py-1 rounded-full ${pharm.stock === 'High' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    pharm.stock === 'Low' ? 'bg-amber-500/10 text-amber-500' :
                                                        'bg-rose-500/10 text-rose-500'}`}>
                                                    {pharm.stock}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-8 py-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-2xl relative z-10 flex items-center justify-center gap-2">
                                        <BsMap /> OPEN GRID VIEW
                                    </button>
                                </div>

                                {/* Next Level: Crisis Mode SOS Hub */}
                                <div className={`p-10 rounded-[4rem] border transition-all duration-700 relative overflow-hidden text-center flex flex-col items-center justify-center ${showSOS ? 'bg-rose-600 border-rose-500 shadow-[0_0_100px_rgba(225,29,72,0.4)]' : 'bg-rose-500/5 border-rose-500/20 hover:bg-rose-500/10'}`}>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.1)_0%,transparent_100%)]"></div>

                                    {sosStatus === 'idle' && (
                                        <>
                                            <BsExclamationTriangleFill size={40} className="text-rose-500 mb-6 animate-pulse" />
                                            <h4 className="text-2xl font-black italic uppercase tracking-tighter text-rose-500 mb-2">Crisis Mode</h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-8 text-center max-w-[200px]">Unable to find locally? Initiate a National SOS search.</p>
                                            <button
                                                onClick={() => { setShowSOS(true); triggerSOS(); }}
                                                className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl shadow-rose-600/20 transition-all active:scale-95 border border-rose-400/20"
                                            >
                                                ACTIVATE SOS
                                            </button>
                                        </>
                                    )}

                                    {sosStatus === 'searching' && (
                                        <>
                                            <div className="relative w-20 h-20 mb-6">
                                                <div className="absolute inset-0 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <BsLightningFill className="text-white text-3xl animate-pulse" />
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">SEARCHING NATIONALLY...</h4>
                                            <div className="text-[8px] font-bold text-rose-100/60 uppercase mt-4 animate-pulse">Scanning 1,240+ Warehouses</div>
                                        </>
                                    )}

                                    {sosStatus === 'found' && (
                                        <div className="animate-fade-in flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-6">
                                                <BsCheckCircleFill size={32} />
                                            </div>
                                            <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">SUPPLY SOURCE FOUND!</h4>
                                            <p className="text-[10px] text-rose-100 font-bold uppercase tracking-widest mb-8">Indore Central Depot • 24 Units Found</p>
                                            <button className="px-10 py-4 bg-white text-rose-600 font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-2xl transition-all active:scale-95">
                                                REQUEST PRIORITY TRANSFER
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-[3rem] relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <BsGraphUpArrow size={60} className="text-blue-500" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <BsTerminalFill className="animate-pulse" /> AI Logistics & Price Trends
                                    </h4>

                                    {/* Mock Chart Visualization */}
                                    <div className="h-16 flex items-end gap-1 mb-4">
                                        {[40, 60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                                            <div key={i} className="flex-1 bg-blue-500/30 rounded-t-sm hover:bg-emerald-500/50 transition-all cursor-crosshair" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>

                                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed uppercase italic relative z-10">
                                        "Volatility Index: 12.4%. Price for {results.brand} is trending upwards due to raw material lag in Bihar region."
                                    </p>

                                    <div className="mt-4 flex items-center justify-between text-[8px] font-black text-blue-300">
                                        <span>EST. RESTOCK: 48H</span>
                                        <span>DEMAND: HIGH</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!results && searchQuery && !searching && (
                        <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in relative">
                            <div className="absolute inset-0 bg-rose-500/5 blur-[100px] rounded-full"></div>
                            <div className="relative z-10 bg-white/[0.02] border border-white/5 p-20 rounded-[4rem]">
                                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-slate-600 mx-auto mb-10 border border-white/10 group-hover:rotate-12 transition-transform">
                                    <BsInboxesFill size={40} />
                                </div>
                                <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter italic">NEURAL MATCH FAILED</h2>
                                <p className="text-slate-500 font-bold mb-12 uppercase italic text-sm tracking-widest max-w-lg mx-auto leading-relaxed">
                                    We couldn't find a direct record for this entity in the supply chain grid. Try searching for a common salt or check for typos.
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-16 py-6 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-500 font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 border border-indigo-400/30"
                                >
                                    RECALIBRATE SEARCH ENGINE
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200px); opacity: 0; }
                }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes grid-move {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
                }
                
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                
                .neural-grid {
                    position: fixed;
                    inset: 0;
                    background-image: 
                        linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(circle at 50% 50%, black, transparent);
                    animation: grid-move 4s linear infinite;
                    pointer-events: none;
                    z-index: 0;
                }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #020617; }
                ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
            <div className="neural-grid"></div>
        </div>
    );
};

export default MedicineFinder;
