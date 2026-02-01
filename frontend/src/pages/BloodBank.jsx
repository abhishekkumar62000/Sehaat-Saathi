import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsDropletFill, BsSearch, BsPlusLg, BsTelephoneFill,
    BsWhatsapp, BsShieldCheck, BsLightningFill, BsActivity, BsMapFill,
    BsStars, BsInfoCircle, BsClockHistory, BsCheckCircleFill, BsExclamationTriangleFill,
    BsGeoAltFill, BsTrophyFill, BsAwardFill, BsPersonFillCheck, BsLink45Deg,
    BsBoxSeam, BsGraphUpArrow, BsArrowRepeat, BsTruck, BsGlobeCentralSouthAsia, BsPatchCheckFill,
    BsBoxArrowInDown, BsChatRightDotsFill, BsFingerprint, BsClipboardDataFill, BsShieldLockFill,
    BsSoundwave
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import confetti from 'canvas-confetti';

const BloodBank = () => {
    const [activeSection, setActiveSection] = useState('request');
    const [isSearching, setIsSearching] = useState(false);
    const [sosActive, setSosActive] = useState(false);
    const [searchProgress, setSearchProgress] = useState(0);
    const [sosStep, setSosStep] = useState(0);
    const [hoveredGroup, setHoveredGroup] = useState(null);
    const [showCompatibility, setShowCompatibility] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [dispatchActive, setDispatchActive] = useState(false);
    const [dispatchStage, setDispatchStage] = useState(0);
    const [showForecast, setShowForecast] = useState(false);

    // v8.1 Focus Mode State
    const [isFocused, setIsFocused] = useState(false);

    const [donorReg, setDonorReg] = useState({
        name: '', age: '', group: 'O+', location: '', phone: '', lastDonation: '', healthConfirmed: false, lifesaverId: 'SS-' + Math.floor(100000 + Math.random() * 900000)
    });

    const [requestForm, setRequestForm] = useState({
        group: 'O+', units: '', hospital: ''
    });

    const interactionRef = useRef(null);

    const compatibilityData = {
        'O-': { give: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], receive: ['O-'] },
        'O+': { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O-', 'O+'] },
        'A-': { give: ['A-', 'A+', 'AB-', 'AB+'], receive: ['O-', 'A-'] },
        'A+': { give: ['A+', 'AB+'], receive: ['O-', 'O+', 'A-', 'A+'] },
        'B-': { give: ['B-', 'B+', 'AB-', 'AB+'], receive: ['O-', 'B-'] },
        'B+': { give: ['B+', 'AB+'], receive: ['O-', 'O+', 'B-', 'B+'] },
        'AB-': { give: ['AB-', 'AB+'], receive: ['O-', 'A-', 'B-', 'AB-'] },
        'AB+': { give: ['AB+'], receive: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
    };

    const leaderboard = [
        { name: "Rahul S.", points: 2500, badge: <BsTrophyFill className="text-amber-400" />, rank: "Gold" },
        { name: "Anita K.", points: 1800, badge: <BsAwardFill className="text-slate-400" />, rank: "Silver" },
        { name: "Vikram M.", points: 950, badge: <BsAwardFill className="text-orange-400" />, rank: "Bronze" }
    ];

    const forecastData = [
        { day: 'Mon', demand: 400, supply: 240 },
        { day: 'Tue', demand: 300, supply: 139 },
        { day: 'Wed', demand: 200, supply: 980 },
        { day: 'Thu', demand: 278, supply: 390 },
        { day: 'Fri', demand: 189, supply: 480 },
        { day: 'Sat', demand: 239, supply: 380 },
        { day: 'Sun', demand: 349, supply: 430 },
    ];

    const sosLogs = [
        "Initializing Neural Ping...",
        "Accessing Dermal-Link Satellite...",
        "Priority O- Signal Released...",
        "Grid Sector Delta-9 Notified.",
        "Signal Confirmed by 5 Lifesavers."
    ];

    const dispatchStages = [
        { label: "Signal Broadcast", icon: <BsGlobeCentralSouthAsia />, info: "Neural network activated." },
        { label: "Lifesaver Located", icon: <BsPersonFillCheck />, info: "Donor match found in 5km." },
        { label: "Security Verified", icon: <BsShieldLockFill />, info: "Credentials & Health check OK." },
        { label: "Blood Dispatch", icon: <BsTruck />, info: "Unit in transit to Hospital." },
        { label: "Hospital Handover", icon: <BsCheckCircleFill />, info: "Unit received & verified." }
    ];

    useEffect(() => {
        if (sosActive) {
            const interval = setInterval(() => {
                setSosStep(prev => (prev < sosLogs.length - 1 ? prev + 1 : prev));
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [sosActive]);

    useEffect(() => {
        if (dispatchActive) {
            const interval = setInterval(() => {
                setDispatchStage(prev => {
                    if (prev < dispatchStages.length - 1) return prev + 1;
                    clearInterval(interval);
                    toast.success("Life-Saving Mission Accomplished! Unit Handed Over.");
                    return prev;
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [dispatchActive]);

    const handleSearch = () => {
        if (!requestForm.units || !requestForm.hospital) {
            toast.error("Please mention units and hospital first!");
            return;
        }
        setIsSearching(true);
        setSearchProgress(0);
        const interval = setInterval(() => {
            setSearchProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsSearching(false);
                    setDispatchActive(true);
                    toast.success("Master Cross-Match Successful! Alerts dispatched.");
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    const handleDonorReg = () => {
        if (!donorReg.name || !donorReg.age || !donorReg.phone) {
            toast.error("Please fill all fields correctly!");
            return;
        }
        if (donorReg.age < 18 || donorReg.age > 60) {
            toast.warning("Age must be between 18-60 for donation.");
            return;
        }
        toast.info("Verifying Sanctuary Entry...");

        // v8.1 Confetti Explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#dc2626', '#fbbf24', '#ffffff']
        });

        setTimeout(() => {
            toast.success("Welcome, Life-Saver! You're now on the Map.");
            setShowCertificate(true);
            setIsFocused(false); // Exit focus mode
        }, 1500);
    };

    const scrollToInteraction = (section) => {
        setActiveSection(section);
        setTimeout(() => {
            interactionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // v8.1 Pulse-Scroll Animation Trigger via CSS
            const element = interactionRef.current;
            if (element) {
                element.classList.add('pulse-gold');
                setTimeout(() => element.classList.remove('pulse-gold'), 2000);
            }
        }, 100);
    };

    // v8.1 Neural Validation Helper
    const isValid = (field) => {
        if (field === 'age') return donorReg.age >= 18 && donorReg.age <= 60;
        if (field === 'phone') return donorReg.phone.length >= 10;
        if (field === 'name') return donorReg.name.length > 2;
        return false;
    };

    return (
        <div className="min-h-screen bg-[#FDF2F2] selection:bg-red-200 font-sans overflow-x-hidden relative">
            {/* v8.1 Focus Mode Overlay */}
            {isFocused && <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 transition-all duration-500" onClick={() => setIsFocused(false)}></div>}

            {/* Particle HUD Simulation (SVG Overlay) */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <svg className="w-full h-full">
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {[...Array(20)].map((_, i) => (
                        <circle key={i} className="animate-pulse" cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`} r={Math.random() * 2} fill="#dc2626" filter="url(#glow)">
                            <animate attributeName="opacity" values="0;0.5;0" dur={`${3 + Math.random() * 5}s`} repeatCount="indefinite" />
                        </circle>
                    ))}
                </svg>
            </div>

            {/* Ultra-Header */}
            <header className="fixed top-0 left-0 w-full z-[100] bg-white/40 backdrop-blur-2xl border-b border-red-500/10 px-8 py-5">
                <div className="container mx-auto flex justify-between items-center text-red-600">
                    <Link to="/smarthub" className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
                        <BsArrowLeft /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setShowForecast(!showForecast)}>
                            <BsClipboardDataFill className="group-hover:rotate-12 transition-transform" />
                            <span className="font-black text-[10px] uppercase tracking-widest border-b border-red-500/30">AI Insights</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setShowCompatibility(true)}>
                            <BsLink45Deg className="group-hover:rotate-45 transition-transform" />
                            <span className="font-black text-[10px] uppercase tracking-widest border-b border-red-500/30">Compatibility Matrix</span>
                        </div>
                        <div className="h-4 w-[1px] bg-red-500/20"></div>
                        <div className="flex items-center gap-2">
                            <BsDropletFill className="animate-pulse" />
                            <span className="font-black uppercase tracking-[0.3em] text-xs">Sehaat Saathi v8.1</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24 px-6 relative z-10">
                {/* 3D Floating Droplet Visual */}
                <div className="absolute top-20 right-10 md:right-40 w-48 h-48 md:w-64 md:h-64 pointer-events-none z-0">
                    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-900 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] animate-drop-morph shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.5),0_30px_60px_rgba(220,38,38,0.3)] opacity-80 blur-[2px] relative overflow-hidden">
                        <div className="absolute top-4 left-8 w-12 h-6 bg-white/20 rounded-full rotate-45 blur-md"></div>
                        <div className="absolute bottom-10 right-10 w-4 h-4 bg-white/10 rounded-full blur-sm"></div>
                    </div>
                </div>

                <div className="container mx-auto max-w-7xl">
                    {/* Hero Outstanding Panel */}
                    <div className="bg-white/40 backdrop-blur-3xl rounded-[4rem] p-10 md:p-20 border border-white/50 shadow-2xl mb-16 relative group overflow-hidden">
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-400/5 rounded-full blur-3xl group-hover:bg-red-400/10 transition-all duration-1000"></div>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 rounded-full text-red-600 text-[9px] font-black uppercase tracking-widest mb-8 border border-red-600/20">
                                    <BsShieldCheck /> Real-Time Lifeline Active
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter">
                                    The <span className="text-red-600 italic">Global</span> <br />
                                    Blood <span className="text-red-500/20">Grid.</span>
                                </h1>
                                <p className="text-slate-500 font-bold text-lg mb-12 max-w-md leading-relaxed">
                                    From Dispatch HUDs to AI Demand Forecasts. Experience the most advanced life-saving infrastructure on the planet.
                                </p>
                                <div className="flex flex-wrap gap-5">
                                    <button onClick={() => scrollToInteraction('donate')} className="px-10 py-5 bg-red-600 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all active:scale-95 group hover:-translate-y-1">
                                        <span className="flex items-center gap-2">Register Donor <BsArrowRepeat className="group-hover:rotate-180 transition-transform" /></span>
                                    </button>
                                    <button onClick={() => scrollToInteraction('request')} className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all active:scale-95 group hover:-translate-y-1">
                                        Request Blood
                                    </button>
                                </div>
                            </div>

                            {/* Dispatch Tracker Mini-HUD */}
                            <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 shadow-3xl relative overflow-hidden">
                                <BsActivity className="absolute top-4 right-4 text-emerald-500 opacity-20" size={60} />
                                <h3 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3 italic">
                                    Live Dispatch HUD <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                </h3>
                                <div className="space-y-8 relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5"></div>
                                    {dispatchStages.map((stage, i) => (
                                        <div key={i} className={`flex items-center gap-6 relative transition-all duration-500 ${i <= dispatchStage ? 'opacity-100' : 'opacity-20'}`}>
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${i === dispatchStage ? 'bg-red-600 text-white scale-125 z-10 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : i < dispatchStage ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/50'}`}>
                                                {stage.icon}
                                            </div>
                                            <div>
                                                <div className={`text-[11px] font-black uppercase tracking-wider ${i === dispatchStage ? 'text-white' : 'text-white/40'}`}>
                                                    {stage.label}
                                                </div>
                                                {i === dispatchStage && (
                                                    <div className="text-[9px] font-bold text-red-400 uppercase tracking-[0.2em] animate-pulse mt-0.5">{stage.info}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights Forecast Panel */}
                    {showForecast && (
                        <div className="mb-16 animate-slide-up">
                            <div className="bg-white rounded-[4rem] p-10 md:p-14 border border-slate-100 shadow-2xl relative overflow-hidden">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">AI Demand Forecaster.</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Predicting regional needs for the next 7 days.</p>
                                    </div>
                                    <button onClick={() => setShowForecast(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all font-black">×</button>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={forecastData}>
                                            <defs>
                                                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="demand" stroke="#dc2626" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={3} />
                                            <Area type="monotone" dataKey="supply" stroke="#10b981" fillOpacity={1} fill="url(#colorSupply)" strokeWidth={3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex gap-10 mt-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Predicted Demand</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Availability</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Interaction Area */}
                    <div className={`grid lg:grid-cols-12 gap-10 overflow-visible transition-all duration-500 ${isFocused ? 'scale-105 z-50 relative' : ''}`}>
                        {/* Sidebar Left: Leaderboard & Gamification */}
                        <div className="lg:col-span-3 space-y-8 animate-fade-in">
                            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
                                <h3 className="text-sm font-black text-slate-800 mb-8 flex items-center justify-between uppercase tracking-widest italic">
                                    Outstanding Donors <BsGraphUpArrow className="text-emerald-500" />
                                </h3>
                                <div className="space-y-6">
                                    {leaderboard.map((user, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg font-black text-slate-400 group-hover/item:bg-slate-900 group-hover/item:text-white transition-all">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                                                    {user.name} {user.badge}
                                                </div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{user.rank} Lifesaver</div>
                                            </div>
                                            <div className="text-[10px] font-black text-red-600">+{user.points}</div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-10 py-4 bg-slate-50 rounded-2xl font-black text-[9px] uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all">View All Rankings</button>
                            </div>

                            <div className="bg-red-600 rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-red-600/20">
                                <BsActivity className="absolute bottom-4 right-4 text-white/10" size={80} />
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Your Impact</h4>
                                <div className="text-5xl font-black mb-2 italic">Lv. 0</div>
                                <p className="text-[10px] text-red-100 font-bold mb-6">Register as a donor to start your life-saving journey.</p>
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="w-1/4 h-full bg-white shadow-[0_0_10px_white]"></div>
                                </div>
                                <div className="flex justify-between mt-2 text-[8px] font-black uppercase opacity-60">
                                    <span>0 XP</span>
                                    <span>500 XP to Level 1</span>
                                </div>
                            </div>
                        </div>

                        {/* Center Stage: Requests & Flow */}
                        <div className="lg:col-span-9 space-y-10" ref={interactionRef}>
                            {/* Tab Selection Glassmorphism */}
                            <div className="p-2 bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] flex gap-2">
                                {[
                                    { id: 'request', label: 'Emergency Request', icon: <BsExclamationTriangleFill /> },
                                    { id: 'donate', label: 'Donor Hub', icon: <BsDropletFill /> },
                                    { id: 'banks', label: 'Inventory Map', icon: <BsMapFill /> }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveSection(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all ${activeSection === tab.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' : 'text-slate-500 hover:bg-white transition-colors'}`}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-white rounded-[4rem] p-10 md:p-14 border border-slate-100 shadow-2xl relative min-h-[600px] overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-gradient-x"></div>

                                {activeSection === 'request' && (
                                    <div className="animate-slide-up">
                                        <div className="flex justify-between items-center mb-12">
                                            <div>
                                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic">Request Life-Gate.</h2>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <BsSearch /> AI scanning active in 50km radius
                                                </p>
                                            </div>
                                            <button onClick={() => setSosActive(true)} className="px-8 py-4 bg-red-100 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-red-200 animate-pulse hover:bg-red-600 hover:text-white transition-all">SOS Trigger</button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Receiver's Blood Group</label>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {Object.keys(compatibilityData).map(grp => (
                                                        <button
                                                            key={grp}
                                                            onMouseEnter={() => setHoveredGroup(grp)}
                                                            onMouseLeave={() => setHoveredGroup(null)}
                                                            onClick={() => setRequestForm({ ...requestForm, group: grp })}
                                                            className={`py-6 rounded-2xl font-black text-lg border-2 transition-all ${hoveredGroup === grp || requestForm.group === grp ? 'border-red-600 bg-red-50 text-red-600 scale-105 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-800'}`}
                                                        >
                                                            {grp}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Units Needed</label>
                                                    <input type="number"
                                                        value={requestForm.units}
                                                        onChange={(e) => setRequestForm({ ...requestForm, units: e.target.value })}
                                                        placeholder="How many units?" className="w-full bg-slate-100 p-6 rounded-3xl font-black text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-red-100 transition-all border-none" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hospital Landmark</label>
                                                    <div className="relative">
                                                        <input type="text"
                                                            value={requestForm.hospital}
                                                            onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
                                                            placeholder="e.g. Apollo Phase 2" className="w-full bg-slate-100 p-6 rounded-3xl font-black text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-red-100 transition-all border-none pl-14" />
                                                        <BsGeoAltFill className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-14 p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden group/btn cursor-pointer" onClick={handleSearch}>
                                            <div className="absolute inset-0 bg-red-600/0 group-hover/btn:bg-red-600/10 transition-colors"></div>
                                            <div className="flex items-center justify-between text-white relative z-10">
                                                <div>
                                                    <div className="text-xl font-black tracking-tighter italic uppercase">Master Cross-Match</div>
                                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">AI-Neural matching algorithm v4.2</div>
                                                </div>
                                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                                    <BsArrowRepeat className={`group-hover/btn:rotate-180 transition-transform duration-500 ${isSearching ? 'animate-spin' : ''}`} />
                                                </div>
                                            </div>
                                        </div>

                                        {isSearching && (
                                            <div className="mt-10 animate-fade-in">
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                                                    <div className="h-full bg-red-600 animate-pulse transition-all duration-300" style={{ width: `${searchProgress}%` }}></div>
                                                </div>
                                                <div className="flex gap-3 justify-center">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeSection === 'donate' && (
                                    <div className="animate-slide-up" onClick={() => setIsFocused(true)}>
                                        <div className="flex justify-between items-center mb-12">
                                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Donor Sanctuary.</h2>
                                            <div className="px-6 py-3 bg-emerald-100 text-emerald-600 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-emerald-200">
                                                Elite Lifesaver Status: Active
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-8">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                                        <div className="relative group/input">
                                                            <input type="text"
                                                                value={donorReg.name}
                                                                onChange={(e) => setDonorReg({ ...donorReg, name: e.target.value })}
                                                                placeholder="Donor's Name" className="w-full bg-white p-5 rounded-2xl font-black text-slate-700 outline-none border border-slate-100 focus:border-red-500 transition-all pl-12" />
                                                            <BsPersonFillCheck className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isValid('name') ? 'text-emerald-500' : 'text-slate-300'}`} size={20} />
                                                            {/* v8.1 Neural Scan Line */}
                                                            <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-500 scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Age</label>
                                                            <div className="relative group/input">
                                                                <input type="number"
                                                                    value={donorReg.age}
                                                                    onChange={(e) => setDonorReg({ ...donorReg, age: e.target.value })}
                                                                    placeholder="Age" className="w-full bg-white p-5 rounded-2xl font-black text-slate-700 outline-none border border-white focus:border-red-500 transition-all border-slate-100" />
                                                                {isValid('age') ? (
                                                                    <BsCheckCircleFill className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 animate-bounce" />
                                                                ) : donorReg.age && (
                                                                    <BsExclamationTriangleFill className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone</label>
                                                            <div className="relative group/input">
                                                                <input type="text"
                                                                    value={donorReg.phone}
                                                                    onChange={(e) => setDonorReg({ ...donorReg, phone: e.target.value })}
                                                                    placeholder="Mobile" className="w-full bg-white p-5 rounded-2xl font-black text-slate-700 outline-none border border-white focus:border-red-500 transition-all border-slate-100" />
                                                                <BsTelephoneFill className={`absolute right-4 top-1/2 -translate-y-1/2 ${isValid('phone') ? 'text-emerald-500' : 'text-slate-300'}`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div onClick={() => setDonorReg({ ...donorReg, healthConfirmed: !donorReg.healthConfirmed })} className={`p-8 border rounded-[3rem] flex items-center gap-6 group transition-all cursor-pointer ${donorReg.healthConfirmed ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100 hover:border-red-500'}`}>
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${donorReg.healthConfirmed ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                                                        <BsCheckCircleFill size={30} />
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-800 uppercase text-xs">Medical Opt-In</div>
                                                        <div className="text-[10px] text-slate-400 font-bold italic">{donorReg.healthConfirmed ? 'Verified & Ready.' : 'I confirm I am fit & ready to save a life.'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-end">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-[60px]"></div>
                                                <BsStars className="text-amber-400 mb-6 animate-spin-slow" size={40} />
                                                <h4 className="text-2xl font-black italic tracking-tighter mb-4">Elite Perks Program</h4>
                                                <p className="text-xs text-slate-400 font-bold leading-relaxed mb-10">
                                                    Donation unlocks exclusive Sehaat Saathi badges, priority health checkups, and early access to AI Bio-Sensing features.
                                                </p>
                                                <button onClick={handleDonorReg} className="w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 duration-300">Confirm Sanctuary Entry</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'banks' && (
                                    <div className="animate-slide-up">
                                        <div className="flex justify-between items-center mb-12">
                                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Regional Stock-Map.</h2>
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Inventory Sync Active</span>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-2xl hover:shadow-red-500/5 transition-all transition-all relative overflow-hidden hover:border-red-500">
                                                    <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <BsGeoAltFill className="text-red-600 animate-bounce" />
                                                    </div>
                                                    <div className="flex items-center gap-6 mb-8">
                                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 font-black shadow-inner border border-red-500/10">
                                                            <BsMapFill />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-black text-slate-800 uppercase italic tracking-tight">City Health Bank {i}</h4>
                                                            <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">Delhi, Sector {i * 10}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-8">
                                                        {['O-', 'B+', 'AB+'].map(g => (
                                                            <div key={g} className="px-4 py-1.5 bg-white rounded-full border border-slate-100 text-[9px] font-black text-slate-500 uppercase">
                                                                {g}: <span className="text-red-600">5 Units</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-red-600 transition-all">Route</button>
                                                        <button className="flex-1 py-4 bg-white border border-slate-100 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:border-red-500 transition-all text-slate-600">Call</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Life-Saver Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-900/95 backdrop-blur-2xl p-6 animate-fade-in" onClick={() => setShowCertificate(false)}>
                    <div className="bg-white rounded-[4rem] p-16 max-w-4xl w-full relative overflow-hidden text-center shadow-[0_0_100px_rgba(255,255,255,0.1)]" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200"></div>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <BsFingerprint size={800} className="mx-auto" />
                        </div>

                        <div className="relative z-10">
                            <BsPatchCheckFill size={100} className="text-amber-500 mx-auto mb-10 animate-bounce" />
                            <h2 className="text-[12px] font-black tracking-[0.6em] text-slate-400 uppercase mb-4">Official Sehaat Saathi Recognition</h2>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 italic italic">Life-Saver Certificate.</h1>

                            <div className="py-12 border-y-2 border-slate-100 mb-10">
                                <p className="text-lg font-bold text-slate-500 mb-2">This is to certify that</p>
                                <div className="text-5xl md:text-7xl font-black text-red-600 tracking-tighter mb-6 underline decoration-red-200 decoration-8 underline-offset-8 decoration-dotted decoration-8">{donorReg.name || 'Satyajit'}</div>
                                <p className="text-slate-400 font-bold max-w-lg mx-auto leading-relaxed">
                                    Has successfully synchronized with the Sehaat Saathi Neural Hub as a verified Lifesaver. Your contribution is architected to save lives.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-between items-end gap-10">
                                <div className="text-left">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifesaver ID</div>
                                    <div className="text-lg font-black text-slate-900">{donorReg.lifesaverId}</div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => { toast.success("Certificate Downloading..."); setShowCertificate(false); }} className="px-10 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">Download PDF</button>
                                    <button onClick={() => setShowCertificate(false)} className="px-10 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black uppercase tracking-widest text-[10px] border border-slate-200 hover:bg-white transition-all">Close</button>
                                </div>
                                <div className="text-right">
                                    <BsFingerprint size={40} className="text-slate-200 ml-auto" />
                                    <div className="text-[8px] font-black text-slate-300 uppercase mt-2">Neural Sign Verified</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Compatibility Matrix Modal - Holographic */}
            {showCompatibility && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 backdrop-blur-3xl animate-fade-in p-6" onClick={() => setShowCompatibility(false)}>
                    <div className="bg-white/5 border border-white/10 rounded-[4rem] p-10 md:p-16 max-w-5xl w-full relative overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-gradient-x"></div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tighter italic text-center">Neural Compatibility Matrix.</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            {Object.entries(compatibilityData).map(([grp, info]) => (
                                <div key={grp} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group hover:bg-red-600 transition-all cursor-default">
                                    <div className="text-5xl font-black text-red-500 group-hover:text-white transition-colors mb-6 italic">{grp}</div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Can Donate To:</div>
                                            <div className="text-[10px] font-black text-white flex flex-wrap gap-1">
                                                {info.give.map(g => <span key={g} className="px-1.5 bg-white/10 rounded">{g}</span>)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Can Receive From:</div>
                                            <div className="text-[10px] font-black text-white flex flex-wrap gap-1">
                                                {info.receive.map(g => <span key={g} className="px-1.5 bg-white/10 rounded">{g}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowCompatibility(false)} className="mx-auto block px-12 py-5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all">Close Neural Bridge</button>
                    </div>
                </div>
            )}

            {/* SOS v3.0 - The Neural Map Overlay */}
            {sosActive && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900 p-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                            {[1, 2, 3, 4, 5].map(i => (
                                <circle key={i} className="animate-ping-slow text-red-500" cx={20 * i} cy={Math.random() * 100} r="1" fill="currentColor">
                                    <animate attributeName="opacity" values="0;1;0" dur={`${2 + i}s`} repeatCount="indefinite" />
                                </circle>
                            ))}
                        </svg>
                    </div>

                    <div className="max-w-4xl w-full relative z-10 text-center animate-fade-in">
                        <div className="bg-white/5 border border-white/10 rounded-[5rem] p-16 md:p-24 backdrop-blur-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-20 h-full flex flex-col justify-center animate-spin-slow">
                                <BsActivity size={400} className="text-red-600" />
                            </div>

                            <div className="w-40 h-40 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-[0_0_100px_rgba(220,38,38,0.5)] animate-pulse border-8 border-white/10 rotate-12 group hover:rotate-0 transition-transform duration-500">
                                <BsLightningFill size={70} className="text-white animate-bounce" />
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">Neural SOS Dispatched.</h2>
                            <p className="text-red-500 font-bold text-xl mb-12 animate-pulse uppercase tracking-widest">Priority Signal SS-720 • Broad Range Scan Active</p>

                            <div className="max-w-md mx-auto space-y-4 mb-14">
                                {sosLogs.slice(0, sosStep + 1).map((log, i) => (
                                    <div key={i} className="flex items-center gap-5 bg-white/5 border border-white/10 p-5 rounded-3xl animate-slide-up">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                                        <span className="text-[11px] font-black text-white uppercase tracking-widest text-left">{log}</span>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => { setSosActive(false); setDispatchActive(true); }} className="px-16 py-7 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95 mb-6">Confirm Signal Lock</button>
                            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Secure Data-Stream Link Locked • 256-bit Neural Encryption</div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes drop-morph {
                    0%, 100% { border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%; transform: scale(1) translateY(0); }
                    50% { border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%; transform: scale(1.05) translateY(-10px); }
                }
                .animate-drop-morph { animation: drop-morph 6s ease-in-out infinite; }
                
                @keyframes gradient-x {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }

                .animate-spin-slow { animation: spin 10s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .animate-fade-in { animation: fade-in 1s ease-out; }
                @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.2, 0, 0, 1); }
                @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                }
                .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
                
                @keyframes pulse-gold {
                     0%, 100% { box-shadow: 0 0 0 0px rgba(234, 179, 8, 0); }
                     50% { box-shadow: 0 0 0 20px rgba(234, 179, 8, 0.2); }
                }
                .pulse-gold { animation: pulse-gold 1.5s infinite; }
            `}</style>
        </div>
    );
};

export default BloodBank;
