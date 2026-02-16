import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsSearch, BsHospital, BsPeopleFill, BsGeoAltFill, BsFilterCircleFill,
    BsCalendarCheck, BsShieldFillCheck, BsLightningFill, BsInfoCircleFill,
    BsStarFill, BsCurrencyRupee, BsActivity, BsClockFill, BsPlusSquareFill,
    BsPersonVcardFill, BsHandIndexThumbFill, BsMapFill, BsPhoneFill
} from 'react-icons/bs';
import { MdVerifiedUser, MdOutlineCleanHands, MdOutlineTimer, MdOutlineReduceCapacity } from 'react-icons/md';
import { biharHealthcareDb, districts, specialties } from '../utils/biharHealthcareData';

const OfflineConsultationHub = () => {
    const [selectedDistrict, setSelectedDistrict] = useState('Madhubani');
    const [selectedSpecialty, setSelectedSpecialty] = useState([]);
    const [hospitalType, setHospitalType] = useState('All');
    const [feeRange, setFeeRange] = useState(3000);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showTriage, setShowTriage] = useState(false);
    const [triageStep, setTriageStep] = useState(0);
    const [showDistrictMap, setShowDistrictMap] = useState(false);
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    // Quantum States
    const [compareList, setCompareList] = useState([]);
    const [showCompare, setShowCompare] = useState(false);
    const [voiceMedicActive, setVoiceMedicActive] = useState(false);
    const [voicePrompt, setVoicePrompt] = useState(<>Greetings. I am <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>'s Voice Medic. How can I assist your clinical journey today?</>);
    const [liveQueueData, setLiveQueueData] = useState({});
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const [showToken, setShowToken] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [diagnosticBrief, setDiagnosticBrief] = useState('');
    const [showPharmaRadar, setShowPharmaRadar] = useState(false);
    const [showLabRadar, setShowLabRadar] = useState(false);
    const [crowdDelay, setCrowdDelay] = useState(false); // Simulated predictive delay toggle
    const [climateAlert, setClimateAlert] = useState(true); // Simulated heat-wave alert
    const [offlineMode, setOfflineMode] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false); // Mobile filters drawer state

    const translations = {
        en: {
            title: "Find & Book Trusted Doctors",
            subtitle: "Search across 38 districts of Bihar. Connect with verified government and private healthcare professionals for physical consultation.",
            smartFilters: "Smart Filters",
            district: "Select District",
            provider: "Provider Type",
            specialty: "Specialty",
            fee: "Session Fee",
            searchPlaceholder: "Search by Doctor name, Hospital or Symptom...",
            bookNow: "Book Now",
            liveQueue: "Live Queue",
            trustScore: "Trust Score",
            sentiment: "Patient Rapport",
            trafficEta: "Traffic ETA",
            voiceMedic: "Enable Voice Medic",
            voiceMedicActive: "Voice Medic Active",
            districtInsights: "District Insights"
        },
        hi: {
            title: "भरोसेमंद डॉक्टर खोजें और बुक करें",
            subtitle: "बिहार के 38 जिलों में खोजें। शारीरिक परामर्श के लिए सत्यापित सरकारी और निजी स्वास्थ्य पेशेवरों से जुड़ें।",
            smartFilters: "स्मार्ट फिल्टर",
            district: "जिला चुनें",
            provider: "प्रदाता प्रकार",
            specialty: "विशेषज्ञता",
            fee: "सत्र शुल्क",
            searchPlaceholder: "डॉक्टर का नाम, अस्पताल या लक्षण द्वारा खोजें...",
            bookNow: "अभी बुक करें",
            liveQueue: "लाइव कतार",
            trustScore: "ट्रस्ट स्कोर",
            sentiment: "रोगी तालमेल",
            trafficEta: "ट्रैफिक ईटीए",
            voiceMedic: "वॉइस मेडिक सक्षम करें",
            voiceMedicActive: "वॉइस मेडिक सक्रिय",
            districtInsights: "जिला अंतर्दृष्टि"
        }
    };

    const t = translations[language];

    // Live Queue Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const newQueues = {};
            biharHealthcareDb.forEach(doc => {
                newQueues[doc.id] = Math.floor(Math.random() * 8) + 1;
            });
            setLiveQueueData(newQueues);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const toggleCompare = (doc) => {
        setCompareList(prev => {
            const exists = prev.find(d => d.id === doc.id);
            if (exists) return prev.filter(d => d.id !== doc.id);
            if (prev.length >= 2) {
                setVoicePrompt("System limited to 2-way holographic comparison for diagnostic clarity.");
                return [prev[1], doc];
            }
            setVoicePrompt(`Added ${doc.name} to the holographic comparison engine.`);
            return [...prev, doc];
        });
    };

    const filteredDocs = biharHealthcareDb.filter(doc => (
        doc.district === selectedDistrict &&
        (selectedSpecialty.length === 0 || selectedSpecialty.includes(doc.specialty)) &&
        (hospitalType === 'All' || doc.hospitalType === hospitalType) &&
        doc.fee <= feeRange &&
        (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()))
    ));

    const toggleSpecialty = (s) => {
        setSelectedSpecialty(prev =>
            prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-[#FF9933]/30 overflow-x-hidden relative">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9933]/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#138808]/5 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
                {/* Ashoka Chakra Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] animate-spin-slow pointer-events-none">
                    <div className="w-full h-full border-[20px] border-[#000080] rounded-full flex items-center justify-center">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className="absolute h-full w-[1px] bg-[#000080]" style={{ transform: `rotate(${i * 15}deg)` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 md:px-6 py-4 border-t-4 border-t-[#FF9933] shadow-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-[#000080] hover:text-[#FF9933] transition-all font-bold group">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Smart Hub</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
                            className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:bg-[#FF9933]/10 transition-all flex items-center gap-2"
                        >
                            <span className={language === 'hi' ? 'text-[#FF9933]' : 'text-gray-400'}>HI</span>
                            <div className="w-[1px] h-3 bg-gray-300"></div>
                            <span className={language === 'en' ? 'text-[#000080]' : 'text-gray-400'}>EN</span>
                        </button>
                        <button
                            onClick={() => setVoiceMedicActive(!voiceMedicActive)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${voiceMedicActive ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] border-transparent text-white shadow-lg' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                        >
                            <BsLightningFill className={voiceMedicActive ? 'animate-pulse' : ''} />
                            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">{voiceMedicActive ? t.voiceMedicActive : t.voiceMedic}</span>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-md">
                            <BsHospital className="text-[#000080] animate-pulse" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl px-4 md:px-6 py-12 relative z-10">
                {/* Hero / Hero Title */}
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 rounded-full bg-[#FF9933]/10 border border-[#FF9933]/20 text-[10px] font-black uppercase tracking-widest text-[#FF9933]">Bihar Healthcare Network</div>
                            <div className="flex h-2 w-2 rounded-full bg-[#138808] animate-ping"></div>
                            <span className="text-[10px] font-black uppercase text-[#138808] tracking-widest">Live Availability</span>
                        </div>
                        <h1 className="text-[clamp(40px,8vw,96px)] font-black tracking-tighter uppercase mb-6 leading-[0.9] text-gray-900">
                            {language === 'en' ? 'Find & Book' : 'खोजें और बुक करें'} <br />
                            <span className="bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent italic">
                                {language === 'en' ? 'Trusted Doctors' : 'भरोसेमंद डॉक्टर'}
                            </span>
                        </h1>
                        <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setShowDistrictMap(true)}
                            className="w-full md:w-auto px-8 py-5 bg-white border border-slate-200 rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-indigo-50 hover:border-indigo-200 text-indigo-900 transition-all hover:scale-105 shadow-lg"
                        >
                            <BsMapFill className="text-xl text-indigo-600" /> District Insights
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden w-full py-4 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs text-slate-700 shadow-lg hover:bg-gray-50 transition-all active:scale-95"
                        onClick={() => setShowMobileFilters(true)}
                    >
                        <BsFilterCircleFill className="text-[#FF9933]" /> {t.smartFilters}
                    </button>

                    {/* Filters Sidebar */}
                    <aside id="filter-sidebar" className="hidden lg:block lg:w-1/4 space-y-8 animate-in slide-in-from-left duration-500">
                        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 p-8 space-y-8 sticky top-32 shadow-2xl shadow-indigo-900/5">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
                                <BsFilterCircleFill className="text-[#000080]" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">{t.smartFilters}</h2>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.district}</label>
                                <div className="grid grid-cols-1 gap-2">
                                    <select
                                        value={selectedDistrict}
                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-[#FF9933] transition-all text-gray-700 shadow-inner"
                                    >
                                        {districts.map(d => <option key={d} value={d} className="bg-white text-gray-900">{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Hospital Type */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.provider}</label>
                                <div className="flex flex-wrap gap-2">
                                    {['All', 'Government', 'Private', 'Personal Clinic'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setHospitalType(type)}
                                            className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${hospitalType === type ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] border-transparent text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-[#FF9933]/30'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Specialty Multi-select */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.specialty}</label>
                                <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto custom-scrollbar p-1">
                                    {specialties.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => toggleSpecialty(s)}
                                            className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedSpecialty.includes(s) ? 'bg-[#000080] border-[#000080] text-white shadow-md' : 'bg-white border-slate-100 text-slate-400 hover:border-[#000080]/30 hover:text-[#000080]'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fee Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.fee}</label>
                                    <span className="text-xs font-black text-[#000080] bg-blue-50 px-2 py-1 rounded-lg">₹0 - ₹{feeRange}</span>
                                </div>
                                <input
                                    type="range" min="0" max="3000" step="100"
                                    value={feeRange}
                                    onChange={(e) => setFeeRange(e.target.value)}
                                    className="w-full accent-[#FF9933] h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[8px] font-black text-gray-300 uppercase tracking-widest">
                                    <span>Free</span>
                                    <span>Max</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filters Drawer Modal */}
                    {showMobileFilters && (
                        <div className="fixed inset-0 z-[120] lg:hidden">
                            {/* Backdrop */}
                            <div
                                onClick={() => setShowMobileFilters(false)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                            />

                            {/* Drawer Panel */}
                            <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-[3rem] p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl">
                                {/* Header with Close Button */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <BsFilterCircleFill className="text-[#000080]" />
                                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">
                                            {t.smartFilters}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95"
                                    >
                                        <BsPlusSquareFill className="rotate-45 text-gray-600" />
                                    </button>
                                </div>

                                {/* Filter Content */}
                                <div className="space-y-8">
                                    {/* District Selection */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.district}</label>
                                        <select
                                            value={selectedDistrict}
                                            onChange={(e) => setSelectedDistrict(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-[#FF9933] transition-all text-gray-700 shadow-inner"
                                        >
                                            {districts.map(d => <option key={d} value={d} className="bg-white text-gray-900">{d}</option>)}
                                        </select>
                                    </div>

                                    {/* Provider Type */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.provider}</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['All', 'Government', 'Private', 'Personal Clinic'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setHospitalType(type)}
                                                    className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${hospitalType === type ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] border-transparent text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-[#FF9933]/30'}`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Specialty Multi-select */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.specialty}</label>
                                        <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto custom-scrollbar p-1">
                                            {specialties.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => toggleSpecialty(s)}
                                                    className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedSpecialty.includes(s) ? 'bg-[#000080] border-[#000080] text-white shadow-md' : 'bg-white border-slate-100 text-slate-400 hover:border-[#000080]/30 hover:text-[#000080]'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fee Slider */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t.fee}</label>
                                            <span className="text-xs font-black text-[#000080] bg-blue-50 px-2 py-1 rounded-lg">₹0 - ₹{feeRange}</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="3000" step="100"
                                            value={feeRange}
                                            onChange={(e) => setFeeRange(e.target.value)}
                                            className="w-full accent-[#FF9933] h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-[8px] font-black text-gray-300 uppercase tracking-widest">
                                            <span>Free</span>
                                            <span>Max</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Filters Button */}
                                <div className="mt-8 pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="w-full py-5 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#FF9933]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        Apply Filters <BsFilterCircleFill />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content Area */}
                    <div className="lg:w-3/4 space-y-12">
                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-x-0 -bottom-2 h-4 bg-[#FF9933]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                            <div className="relative flex items-center bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-900/5 group-hover:scale-[1.01] transition-transform duration-300">
                                <BsSearch className="ml-8 text-2xl text-slate-400 group-focus-within:text-[#FF9933] transition-colors" />
                                <input
                                    type="text"
                                    placeholder={t.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent py-7 px-6 text-lg sm:text-2xl font-black focus:outline-none placeholder:text-slate-300 text-slate-800"
                                />
                            </div>
                        </div>

                        {/* Results Grid - Responsive 1 col on mobile, 2 on desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredDocs.length > 0 ? filteredDocs.map((doc, idx) => (
                                <div key={doc.id} className="group bg-white/70 backdrop-blur-2xl hover:bg-white border border-white/60 hover:border-[#FF9933]/30 rounded-[3rem] p-8 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#FF9933]/10 flex flex-col h-full hover:scale-[1.02]">
                                    {/* Animated Scan Effect - Tricolor */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] -translate-y-full group-hover:animate-scan z-20"></div>

                                    {/* Holographic Badge */}
                                    {doc.trustScore >= 95 && (
                                        <div className="absolute top-0 right-0 z-20">
                                            <div className="px-6 py-2 rounded-bl-[2rem] bg-gradient-to-l from-[#FF9933] via-white to-[#138808] text-[8px] font-black uppercase tracking-[0.2em] shadow-md text-[#000080]">
                                                Elite Provider
                                            </div>
                                        </div>
                                    )}

                                    {/* Top Info Row */}
                                    <div className="flex items-start gap-6 mb-8 mt-4 relative z-10">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-[#FF9933] rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                                            <img src={doc.photo} alt={doc.name} className="w-24 h-24 rounded-[2rem] object-cover grayscale transition-all duration-700 group-hover:grayscale-0 border-2 border-white shadow-lg" />
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full px-3 py-1 text-[9px] font-black flex items-center gap-1 shadow-lg z-20">
                                                <BsStarFill className="text-yellow-400 text-[10px]" /> {doc.rating}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-[#FF9933] transition-colors truncate">
                                                {doc.name}
                                                <MdVerifiedUser className="inline-block ml-2 text-blue-500 text-lg align-top" />
                                            </h3>
                                            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 truncate">{doc.degree}</p>

                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase text-slate-600 border border-slate-200">{doc.specialty}</span>
                                                <span className="px-3 py-1 bg-[#000080]/5 rounded-lg text-[8px] font-black uppercase text-[#000080] border border-[#000080]/10">{doc.experience} EXP</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Live Status Indicators */}
                                    <div className="grid grid-cols-2 gap-3 mb-8 bg-slate-50/50 p-4 rounded-[2rem] border border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></div>
                                            <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Queue: <span className="text-slate-900 text-xs">{liveQueueData[doc.id] || 'Scanning'}</span></div>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <BsClockFill className="text-blue-500 text-xs" />
                                            <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Wait: <span className="text-slate-900 text-xs">{((liveQueueData[doc.id] || 1) * 12) + (crowdDelay ? 15 : 0)}m</span></div>
                                        </div>
                                        <div className="col-span-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className={`h-full transition-all duration-1000 ${doc.rushStatus === 'Low' ? 'w-[20%] bg-[#138808]' : doc.rushStatus === 'Medium' ? 'w-[60%] bg-[#FF9933]' : 'w-[90%] bg-red-500'}`}></div>
                                        </div>
                                    </div>

                                    {/* Hospital Detail */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#FF9933] shadow-sm">
                                            <BsHospital />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-black text-slate-800 truncate">{doc.hospital}</div>
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <BsGeoAltFill className="text-[#138808]" /> {doc.area} • {doc.distance}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Row */}
                                    <div className="mt-auto flex items-center gap-3">
                                        <div className="flex flex-col pr-4 border-r border-slate-200">
                                            <span className="text-2xl font-black text-slate-900">₹{doc.fee === 0 ? "FREE" : doc.fee}</span>
                                            <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest">Fee</span>
                                        </div>
                                        <div className="flex gap-2 flex-grow">
                                            <button
                                                onClick={() => { setShowTriage(true); setTriageStep(0); }}
                                                className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                                                title="AI Pre-Check"
                                            >
                                                <BsActivity className="text-blue-500 text-lg" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setBookingDetails({
                                                        doc,
                                                        time: "11:30 AM",
                                                        token: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
                                                        date: "05 Feb 2026",
                                                        room: "Room 4-B",
                                                        floor: doc.hospitalType === 'Government' ? 'Ground' : '2nd'
                                                    });
                                                    setSelectedDoc(doc);
                                                }}
                                                className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 active:scale-95"
                                            >
                                                Book Now <BsCalendarCheck />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-1 md:col-span-2 py-32 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem]">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <BsSearch className="text-3xl text-white/20" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-2">No Specialists Found</h3>
                                    <p className="text-slate-300 font-medium">Try adjusting your filters or location range</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Transparency Disclaimer */}
                <div className="mt-32 p-12 bg-white border border-gray-200 rounded-[4rem] shadow-sm flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-[#FF9933]/10 flex items-center justify-center border border-[#FF9933]/20 text-[#FF9933] text-3xl">
                        <BsInfoCircleFill />
                    </div>
                    <div className="flex-1 space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-[#000080] tracking-[0.5em]">Legal & Information Safeguard</h4>
                        <p className="text-lg font-bold text-gray-500 leading-relaxed italic">
                            "<span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> is an interactive booking facilitator. Clinical medical responsibility and patient safety reside solely with the respective doctors and hospitals. We verify registration numbers (MCI/DCI) for preliminary trust indexing."
                        </p>
                    </div>
                </div>
            </main>

            {/* AI Pre-Visit Triage Modal */}
            {/* AI Pre-Visit Triage Modal */}
            {
                showTriage && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div onClick={() => setShowTriage(false)} className="absolute inset-0 bg-white/90 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[4rem] p-16 overflow-hidden shadow-2xl shadow-[#FF9933]/10">
                            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#FF9933]/5 blur-[120px] animate-pulse pointer-events-none"></div>

                            <div className="relative z-10 space-y-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#000080] border border-[#000080]/10">
                                            <BsActivity className="animate-pulse" />
                                        </div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Symptom Analyzer v2.0</h3>
                                    </div>
                                    <button onClick={() => setShowTriage(false)} className="text-gray-300 hover:text-gray-800 transition-colors">
                                        <BsPlusSquareFill className="rotate-45 text-2xl" />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex gap-2 mb-10 bg-gray-50 p-2 rounded-full w-full">
                                        {[0, 1, 2, 3, 4].map(idx => (
                                            <div key={idx} className={`flex-1 h-1.5 rounded-full transition-all duration-700 ${idx <= triageStep ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] shadow-md' : 'bg-gray-200'}`}></div>
                                        ))}
                                    </div>

                                    {triageStep < 4 ? (
                                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <h4 className="text-4xl font-black tracking-tighter leading-[1.1] uppercase text-gray-900">
                                                {triageStep === 0 && (language === 'en' ? "Are you experiencing severe chest pain?" : "क्या आपको सीने में तेज दर्द हो रहा है?")}
                                                {triageStep === 1 && (language === 'en' ? "Any difficulty in breathing or persistent cough?" : "क्या सांस लेने में कठिनाई या लगातार खांसी है?")}
                                                {triageStep === 2 && (language === 'en' ? "Is this visit for a chronic follow-up?" : "क्या यह यात्रा पुरानी बीमारी के फॉलो-अप के लिए है?")}
                                                {triageStep === 3 && (language === 'en' ? "Do you have any existing medical reports?" : "क्या आपके पास कोई मौजूदा मेडिकल रिपोर्ट है?")}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                <button
                                                    onClick={() => {
                                                        if (triageStep === 0) {
                                                            setVoicePrompt(<>CRITICAL: Chest pain detected. Routing to <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Emergency Ambulance Network.</>);
                                                        }
                                                        setTriageStep(s => s + 1);
                                                    }}
                                                    className="py-8 bg-gray-50 border border-gray-200 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all hover:scale-[1.02] active:scale-95 text-gray-600"
                                                >
                                                    {language === 'en' ? 'Proceed (Yes)' : 'आगे बढ़ें (हाँ)'}
                                                </button>
                                                <button onClick={() => setTriageStep(s => s + 1)} className="py-8 bg-gray-50 border border-gray-200 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 text-gray-600">
                                                    {language === 'en' ? 'Negative (No)' : 'नकारात्मक (नहीं)'}
                                                </button>
                                            </div>
                                            {triageStep === 1 && (
                                                <Link to="/ambulance-dispatch" className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 font-black uppercase text-[10px] tracking-widest animate-pulse">
                                                    <BsLightningFill /> Emergency Ambulance Link
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-10 py-8 animate-in zoom-in duration-700">
                                            <div className="relative mx-auto w-24 h-24">
                                                <div className="absolute inset-0 bg-[#138808]/20 blur-2xl animate-pulse"></div>
                                                <div className="w-24 h-24 bg-[#138808]/10 rounded-full flex items-center justify-center border border-[#138808]/20 relative z-10">
                                                    <BsShieldFillCheck className="text-5xl text-[#138808]" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Analysis Secure</h4>
                                                <div className="p-6 bg-[#000080]/5 rounded-2xl border border-[#000080]/10 text-left space-y-3">
                                                    <div className="text-[8px] font-black uppercase text-[#000080] tracking-widest">Diagnostic Sandbox (Draft)</div>
                                                    <div className="flex gap-2">
                                                        {['CBC Scan', 'Biometric Vitals', 'Fluid Analysis'].map(tag => (
                                                            <span key={tag} className="px-3 py-1 bg-white rounded-lg text-[8px] font-black text-gray-500 border border-gray-100">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">Your pulse-encrypted clinical profile has been synced. The diagnostic sandbox suggests the above initial scans.</p>
                                            </div>
                                            <button onClick={() => setShowTriage(false)} className="w-full py-8 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#FF9933]/20 transition-all hover:scale-105 active:scale-95">Complete Enrollment</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Booking Slot Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div onClick={() => setSelectedDoc(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>

                    <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-[3rem] sm:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh] animate-in zoom-in-95 duration-300">
                        {/* Left Side: Booking Form */}
                        <div className="flex-1 p-8 lg:p-14 overflow-y-auto custom-scrollbar space-y-12">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#FF9933]/20 rounded-3xl blur-xl animate-pulse"></div>
                                    <img src={selectedDoc.photo} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl" alt={selectedDoc.name} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase">{selectedDoc.name}</h3>
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100">{selectedDoc.specialty}</span>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">{selectedDoc.hospital}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-black shadow-lg">01</div>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Select Appointment Slot</h4>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'].map(time => (
                                        <button
                                            key={time}
                                            className="group py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-slate-500 shadow-sm active:scale-95 flex flex-col items-center gap-1"
                                        >
                                            {time}
                                            <span className="text-[8px] opacity-0 group-hover:opacity-50 transition-opacity">Available</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center text-xs font-black shadow-lg">02</div>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Diagnostic Brief (Optional)</h4>
                                </div>
                                <textarea
                                    value={diagnosticBrief}
                                    onChange={(e) => setDiagnosticBrief(e.target.value)}
                                    placeholder="Briefly describe symptoms for the doctor (e.g., Fever for 2 days, back pain since morning)..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all h-36 placeholder:text-slate-300 resize-none text-slate-800"
                                />
                                <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <BsInfoCircleFill className="text-blue-500 mt-0.5" />
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-relaxed">
                                        Saving this will help the specialist prepare in advance, saving 10-15 mins of consultation time.
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Summary Card */}
                        <div className="w-full lg:w-[400px] bg-slate-50 lg:border-l border-slate-100 flex flex-col p-8 lg:p-14">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-center text-slate-400 mb-10">Consultation Summary</h4>

                            <div className="space-y-6 flex-grow ">
                                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Clinical Fee</span>
                                        <span className="text-slate-900">₹{selectedDoc.fee}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Service Tax</span>
                                        <span className="text-slate-900">₹{selectedDoc.fee > 0 ? 50 : 0}</span>
                                    </div>
                                    <div className="h-px bg-slate-100"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Payable</span>
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{selectedDoc.fee > 0 ? selectedDoc.fee + 50 : 0}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner">
                                            <BsGeoAltFill />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinic Landmark</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{selectedDoc.area}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                                            <BsPhoneFill />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Appointment Details</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Room: 4-B | {selectedDoc.hospitalType === 'Government' ? 'Ground' : '2nd'} Floor</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4">
                                <button
                                    onClick={() => {
                                        setBookingDetails({
                                            doc: selectedDoc,
                                            time: "11:30 AM",
                                            token: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
                                            date: "05 Feb 2026",
                                            brief: diagnosticBrief,
                                            room: "Room 4-B",
                                            floor: selectedDoc.hospitalType === 'Government' ? 'Ground' : '2nd'
                                        });
                                        setShowToken(true);
                                        setSelectedDoc(null);
                                    }}
                                    className="w-full py-6 bg-slate-900 border-4 border-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-900/40 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                                >
                                    Confirm Booking <BsCalendarCheck className="text-base group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setSelectedDoc(null)}
                                    className="w-full py-4 bg-transparent text-slate-400 font-black uppercase tracking-[0.3em] text-[8px] hover:text-red-500 transition-colors"
                                >
                                    Cancel & Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* District Infrastructure Dashboard (New) */}
            {
                showDistrictMap && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div onClick={() => setShowDistrictMap(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-[4rem] p-12 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#000080]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-12">
                                <div className="flex-1 space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-[2rem] bg-[#000080]/5 flex items-center justify-center border border-[#000080]/10">
                                            <BsMapFill className="text-[#000080] text-3xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-5xl font-black tracking-tighter uppercase leading-tight text-gray-900">{selectedDistrict} <br /> Insight</h3>
                                            <p className="text-[#000080] text-[10px] font-black uppercase tracking-[0.4em] mt-1">Healthcare Infrastructure Analysis</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        {[
                                            { label: "Verified Hospitals", val: "42", trend: "+12%" },
                                            { label: "Intensive Care (ICU)", val: "180 Beds", trend: "Optimal" },
                                            { label: "Oxygen Reserve", val: "99.2%", trend: "High" },
                                            { label: "Avg. Dispatch", val: "8.5m", trend: "-2.1m" }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 space-y-2 group/stat hover:bg-gray-100 transition-all">
                                                <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</div>
                                                <div className="flex items-baseline gap-3">
                                                    <div className="text-3xl font-black text-gray-800 group-hover:text-[#000080] transition-colors">{stat.val}</div>
                                                    <div className="text-[10px] font-black text-[#138808] tracking-tighter">{stat.trend}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-10 bg-[#FF9933]/5 rounded-[3rem] border border-[#FF9933]/10 relative overflow-hidden">
                                        <div className="absolute top-0 left-10 w-20 h-1 bg-[#FF9933]/50"></div>
                                        <div className="absolute top-6 right-8 opacity-40 select-none pointer-events-none group-hover:opacity-100 transition-opacity">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 border-2 border-[#FF9933]/30 rounded-full flex items-center justify-center animate-spin-slow">
                                                    <BsShieldFillCheck className="text-2xl text-[#FF9933] rotate-0" />
                                                </div>
                                                <div className="text-[6px] font-black uppercase text-[#FF9933] tracking-[0.4em] mt-2 text-center">Gov. Compliance <br /> Quantum-Verified</div>
                                            </div>
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FF9933] mb-8 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#138808] animate-ping"></div> Transparency Safeguard
                                        </h4>
                                        <div className="space-y-6">
                                            <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                                                <>All infrastructure data is synchronized in real-time with the <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Government Node. Reliability score for {selectedDistrict}: 99.8%</>
                                            </p>
                                            <div className="flex gap-4">
                                                <button className="flex-1 py-4 bg-white hover:bg-white/80 border border-gray-200 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all text-gray-500">View Audit Path</button>
                                                <button className="flex-1 py-4 bg-[#000080]/5 hover:bg-[#000080]/10 border border-[#000080]/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#000080] transition-all">Download Metrics</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-[350px] bg-white rounded-[4rem] border border-gray-200 p-10 flex flex-col gap-10 relative overflow-hidden shadow-xl">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#000080] animate-scan"></div>
                                    <div className="text-center space-y-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Critical Scan</h4>
                                        <div className="text-3xl font-black tracking-tighter text-[#138808]">OPERATIONAL</div>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { l: "Blood Availability", s: "SECURE", c: "text-[#138808]" },
                                            { l: "Neonatal Care", s: "ACTIVE", c: "text-blue-600" },
                                            { l: "Trauma Response", s: "PRIORITY", c: "text-[#FF9933]" }
                                        ].map((item, i) => (
                                            <div key={i} className="px-6 py-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-gray-100">
                                                <span className="text-[9px] font-black uppercase text-gray-400">{item.l}</span>
                                                <span className={`text-[10px] font-black ${item.c}`}>{item.s}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <div className="text-[8px] font-black text-center text-gray-300 uppercase tracking-[0.3em]">System ID: SS-DX-7741</div>
                                        <button onClick={() => setShowDistrictMap(false)} className="w-full py-6 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-[#FF9933]/20 active:scale-95 transition-all">Exit Insights</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* AI Clinical Roadmap (New) */}
            {
                showRoadmap && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div onClick={() => setShowRoadmap(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-[3.5rem] p-12 overflow-hidden shadow-2xl">
                            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#FF9933]/5 blur-[120px] animate-pulse pointer-events-none"></div>

                            <div className="relative z-10 space-y-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 flex items-center justify-center text-[#000080] border border-[#000080]/10">
                                            <BsActivity className="animate-pulse text-2xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black tracking-tighter uppercase text-gray-900">Clinical Roadmap</h3>
                                            <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em]">AI-Powered Patient Journey Prediction</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowRoadmap(false)} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                        <BsPlusSquareFill className="rotate-45 text-gray-400" />
                                    </button>
                                </div>

                                <div className="relative space-y-8 pl-10 border-l border-dashed border-gray-200 mx-6">
                                    {[
                                        { step: "Initial Triage", desc: "Digital analysis of clinical symptoms and biometric data collection.", icon: "01", status: "completed" },
                                        { step: "Physical Consult", desc: "Comprehensive on-site evaluation by the specialist.", icon: "02", status: "active" },
                                        { step: "Advanced Diagnostics", desc: "Predicted lab testing based on symptomatic patterns.", icon: "03", status: "pending" },
                                        { step: "Treatment Phase", desc: "Implementation of multi-modal therapy or prescription protocols.", icon: "04", status: "pending" },
                                        { step: "Follow-up Scan", desc: "Secondary evaluation to confirm clinical recovery.", icon: "05", status: "pending" }
                                    ].map((phase, i) => (
                                        <div key={i} className="relative group/step">
                                            <div className={`absolute -left-[54px] w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${phase.status === 'completed' ? 'bg-[#138808] border-[#138808] text-white' : phase.status === 'active' ? 'bg-[#FF9933] border-[#FF9933] text-white animate-pulse' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                                                {phase.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className={`text-sm font-black uppercase tracking-widest ${phase.status === 'pending' ? 'text-gray-300' : 'text-gray-800'}`}>{phase.step}</h4>
                                                <p className={`text-xs leading-relaxed ${phase.status === 'pending' ? 'text-gray-200' : 'text-gray-500'}`}>{phase.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200">
                                        <div className="text-[8px] font-black uppercase text-gray-400 tracking-widest mb-1">Estimated Duration</div>
                                        <div className="text-xl font-black text-gray-800">4 - 7 Days</div>
                                    </div>
                                    <div className="p-6 bg-[#000080]/5 rounded-3xl border border-[#000080]/10">
                                        <div className="text-[8px] font-black uppercase text-[#000080] tracking-widest mb-1">AI Recommendation</div>
                                        <div className="text-sm font-bold text-gray-700 italic">"Immediate consult advised for persistent patterns."</div>
                                    </div>
                                </div>

                                <button onClick={() => setShowRoadmap(false)} className="w-full py-6 bg-gray-50 hover:bg-gray-100 rounded-[2rem] border border-gray-200 font-black uppercase tracking-widest text-[10px] transition-all text-gray-600">Dismiss Roadmap</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Specialist Comparison Engine (New Quantum Feature) */}
            {
                showCompare && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <div onClick={() => setShowCompare(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-6xl bg-white border border-gray-200 rounded-[4rem] p-12 overflow-hidden shadow-2xl flex flex-col gap-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#000080] to-transparent animate-scan"></div>

                            <div className="flex justify-between items-center relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-[2rem] bg-[#000080]/5 flex items-center justify-center border border-[#000080]/10">
                                        <BsPeopleFill className="text-[#000080] text-3xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black tracking-tighter uppercase text-gray-900">Quantum Comparison</h3>
                                        <p className="text-[#000080] text-[10px] font-black uppercase tracking-[0.4em]">Side-by-Side Clinical Analysis</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowCompare(false)} className="px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-gray-600">Close Engine</button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                {compareList.map((doc, idx) => (
                                    <div key={doc.id} className="bg-gray-50 border border-gray-100 rounded-[3rem] p-10 space-y-10 relative overflow-hidden group/comp">
                                        <div className="absolute top-0 right-0 p-8 text-[60px] font-black text-black/[0.03] select-none italic">{idx + 1}</div>

                                        <div className="flex items-center gap-6">
                                            <img src={doc.photo} className="w-24 h-24 rounded-[2rem] object-cover border-2 border-gray-200" alt="" />
                                            <div>
                                                <h4 className="text-2xl font-black tracking-tight text-gray-900">{doc.name}</h4>
                                                <p className="text-[#000080] text-[10px] font-black uppercase tracking-widest">{doc.specialty}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {[
                                                { label: "Trust Score", val: `${doc.trustScore}%`, icon: <BsShieldFillCheck className="text-blue-600" /> },
                                                { label: "Clinical Fee", val: `₹${doc.fee}`, icon: <BsPlusSquareFill className="text-[#138808]" /> },
                                                { label: "Distance", val: doc.distance, icon: <BsGeoAltFill className="text-[#FF9933]" /> },
                                                { label: "Infrastructure", val: doc.hospitalType, icon: <BsHospital className="text-[#000080]" /> }
                                            ].map((stat, i) => (
                                                <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-lg opacity-80">{stat.icon}</div>
                                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</span>
                                                    </div>
                                                    <span className="text-sm font-black text-gray-800">{stat.val}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-8 bg-[#000080]/5 rounded-[2rem] border border-[#000080]/10 space-y-4">
                                            <div className="text-[8px] font-black uppercase text-[#000080] tracking-widest mb-2">Hospital Insights</div>
                                            <div className="text-lg font-black text-gray-800">{doc.hospital}</div>
                                            <div className="flex flex-wrap gap-2">
                                                {['24/7 ER', 'Digital Labs', 'Pharmacy'].map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-white rounded-lg text-[8px] font-black uppercase text-gray-500 tracking-widest border border-gray-100">{tag}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => { setSelectedDoc(doc); setShowCompare(false); }}
                                            className="w-full py-6 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-[#FF9933]/20 active:scale-95 transition-all"
                                        >
                                            Select Specialist
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Voice Medic AI Overlay (Quantum Feature) */}
            {
                voiceMedicActive && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-full max-w-2xl px-6 animate-in slide-in-from-bottom-10 duration-700">
                        <div className="bg-white/95 backdrop-blur-2xl border border-[#000080]/20 rounded-[2.5rem] p-6 shadow-2xl flex items-center gap-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-[#000080]/10 flex items-center justify-center animate-pulse">
                                    <BsLightningFill className="text-[#000080] text-2xl animate-spin-slow" />
                                </div>
                                <div className="absolute inset-0 bg-[#000080]/10 blur-xl animate-pulse"></div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[8px] font-black uppercase text-[#000080] tracking-[0.4em] mb-1">Voice Medic Live</div>
                                <p className="text-sm font-bold text-gray-800 leading-snug">{voicePrompt}</p>
                            </div>
                            <button
                                onClick={() => setVoiceMedicActive(false)}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all border border-gray-200"
                            >
                                <BsPlusSquareFill className="rotate-45 text-gray-400" />
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Comparison Floating Launcher (Quantum Feature) */}
            {
                compareList.length > 0 && (
                    <div className="fixed bottom-10 right-10 z-[110] animate-in slide-in-from-right-10 duration-700">
                        <button
                            onClick={() => setShowCompare(true)}
                            className="group relative bg-gradient-to-r from-[#FF9933] to-[#138808] p-1.5 rounded-[2.5rem] flex items-center gap-4 transition-all hover:scale-105 shadow-xl border border-white/20"
                        >
                            <div className="flex -space-x-4 pl-2">
                                {compareList.map(doc => (
                                    <img key={doc.id} src={doc.photo} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="" />
                                ))}
                            </div>
                            <div className="pr-8">
                                <div className="text-[8px] font-black uppercase tracking-widest text-white/90">Quantum Compare</div>
                                <div className="text-xs font-black text-white">{compareList.length === 1 ? 'Add 1 more' : 'Analyze Differences'}</div>
                            </div>
                            <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center -translate-y-1/2 translate-x-1/2 border border-white/20 backdrop-blur-md">
                                <span className="text-[10px] font-black text-white">{compareList.length}</span>
                            </div>
                        </button>
                    </div>
                )
            }

            {/* Digital Token Modal (New) */}
            {
                showToken && bookingDetails && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <div onClick={() => setShowToken(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-[3.5rem] p-10 overflow-hidden shadow-2xl text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] animate-scan"></div>

                            <div className="w-20 h-20 bg-[#138808]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#138808]/20">
                                <BsShieldFillCheck className="text-4xl text-[#138808]" />
                            </div>

                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 text-gray-900">Booking Verified</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8"><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Digital Token</p>

                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-8 space-y-6 relative overflow-hidden group/token shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#000080]/5 to-transparent"></div>
                                <div className="text-5xl font-black tracking-widest text-[#000080] group-hover:scale-110 transition-transform">{bookingDetails.token}</div>
                                <div className="text-[10px] font-black uppercase text-gray-400 tracking-[0.5em]">Session ID</div>

                                <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-gray-400 uppercase mb-1">Time</div>
                                        <div className="text-sm font-black text-gray-800">{bookingDetails.time}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[8px] font-black text-gray-400 uppercase mb-1">Date</div>
                                        <div className="text-sm font-black text-gray-800">{bookingDetails.date}</div>
                                    </div>
                                    <div className="text-left border-t border-gray-200 pt-4">
                                        <div className="text-[8px] font-black text-gray-400 uppercase mb-1">Wayfinder</div>
                                        <div className="text-sm font-black text-[#000080] uppercase tracking-tighter">{bookingDetails.room} • {bookingDetails.floor}</div>
                                    </div>
                                    <div className="text-right border-t border-gray-200 pt-4">
                                        <div className="text-[8px] font-black text-gray-400 uppercase mb-1">Status</div>
                                        <div className={`text-xs font-black uppercase tracking-widest ${crowdDelay ? 'text-[#FF9933]' : 'text-[#138808]'}`}>{crowdDelay ? 'Slight Delay' : 'On Time'}</div>
                                    </div>
                                </div>

                                {bookingDetails.brief && (
                                    <div className="pt-4 border-t border-gray-200 text-left">
                                        <div className="text-[8px] font-black text-gray-400 uppercase mb-1">Prep Brief</div>
                                        <div className="text-[10px] font-bold text-gray-600 line-clamp-1">{bookingDetails.brief}</div>
                                    </div>
                                )}
                            </div>

                            {/* Simulated QR Area */}
                            <div className="grid grid-cols-6 gap-1 h-12 mt-6 opacity-20">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-[#138808] uppercase tracking-widest flex items-center justify-center gap-2">
                                    <BsActivity className="animate-pulse" /> Live Position: {(liveQueueData[bookingDetails.doc.id] || 4)}th in Queue
                                </div>
                                <div className="text-[10px] font-black text-[#000080] uppercase tracking-widest flex items-center justify-center gap-2">
                                    <BsClockFill /> Estimated Turn in: {(liveQueueData[bookingDetails.doc.id] || 4) * 12} mins
                                </div>

                                <button
                                    onClick={() => setShowPharmaRadar(true)}
                                    className="w-full py-5 bg-[#000080]/5 hover:bg-[#000080]/10 border border-[#000080]/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#000080] transition-all flex items-center justify-center gap-2"
                                >
                                    <BsPlusSquareFill /> Pharma-Radar: Nearest Meds
                                </button>

                                <button
                                    onClick={() => setShowLabRadar(true)}
                                    className="w-full py-5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <BsShieldFillCheck /> Lab-Sync: Find Diagnostics
                                </button>

                                <button
                                    onClick={() => setOfflineMode(true)}
                                    className="w-full py-5 bg-[#138808]/5 hover:bg-[#138808]/10 border border-[#138808]/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#138808] transition-all flex items-center justify-center gap-2"
                                >
                                    <BsCalendarCheck /> Generate Offline Pass (No Data Needed)
                                </button>

                                <button
                                    onClick={() => {
                                        setVoicePrompt("Follow-up reminder set for 15 days from today. System will notify your verified mobile.");
                                    }}
                                    className="w-full py-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-gray-600"
                                >
                                    <BsClockFill className="text-gray-400" /> Set Follow-up Reminder
                                </button>

                                <button
                                    onClick={() => setShowToken(false)}
                                    className="w-full py-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-600"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Offline Pass Viewer (Phase 4) */}
            {
                offlineMode && bookingDetails && (
                    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-white">
                        <div className="w-full max-w-sm border-4 border-dashed border-black p-8 text-black font-mono">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-black border-b-2 border-black pb-2"><span style={{ color: "#FF9933" }}>SEHAAT</span> <span style={{ color: "#138808" }}>SAATHI</span></h1>
                                <p className="text-xs font-bold mt-2">OFFLINE ACCESS PASS</p>
                            </div>
                            <div className="space-y-4">
                                <div><p className="text-[10px] font-black text-black/40">TOKEN ID</p><p className="text-xl font-black">{bookingDetails.token}</p></div>
                                <div className="grid grid-cols-2">
                                    <div><p className="text-[10px] font-black text-black/40">DATE</p><p className="font-black text-sm">{bookingDetails.date}</p></div>
                                    <div><p className="text-[10px] font-black text-black/40">TIME</p><p className="font-black text-sm">{bookingDetails.time}</p></div>
                                </div>
                                <div><p className="text-[10px] font-black text-black/40">DOC / HOSPITAL</p><p className="font-black text-sm leading-tight">{bookingDetails.doc.name} / {bookingDetails.doc.hospital}</p></div>
                                <div className="p-4 bg-black/5 border border-black flex items-center justify-center">
                                    <span className="text-[8px] text-center">SCREENSHOT THIS PASS FOR VERIFICATION AT RECEPTION DESK</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOfflineMode(false)}
                                className="w-full mt-8 py-4 bg-black text-white font-black uppercase tracking-widest"
                            >
                                Return to App
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Post-Visit Pharma-Radar Modal (Real-Time Problem Solver) */}
            {
                showPharmaRadar && bookingDetails && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <div onClick={() => setShowPharmaRadar(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[3.5rem] p-12 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] to-[#138808]"></div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#000080]/5 flex items-center justify-center border border-[#000080]/10">
                                    <BsPlusSquareFill className="text-[#000080] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black tracking-tighter uppercase text-gray-900">Pharma-Radar</h3>
                                    <p className="text-[#000080] text-[10px] font-black uppercase tracking-widest">Pharmacies near {bookingDetails.doc.hospital}</p>
                                </div>
                            </div>

                            <div className="grid gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                                {[
                                    { name: <><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Jan Aushadhi</>, dist: "150m", stock: "High" },
                                    { name: "Apollo Pharmacy", dist: "400m", stock: "Medium" },
                                    { name: "Maa Durga Medical Store", dist: "850m", stock: "High" },
                                    { name: "City Care Medicos", dist: "1.2km", stock: "Emergency Only" }
                                ].map((pharma, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <h4 className="font-black text-gray-800">{pharma.name}</h4>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><BsGeoAltFill /> {pharma.dist}</span>
                                                <span className="flex items-center gap-1"><BsShieldFillCheck className="text-[#138808]" /> Stock: {pharma.stock}</span>
                                            </div>
                                        </div>
                                        <Link to="/pharmacy" className="px-6 py-3 bg-[#000080]/5 hover:bg-[#000080]/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-[#000080]">Visit Hub</Link>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowPharmaRadar(false)}
                                className="w-full mt-10 py-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-600"
                            >
                                Return to Token
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Post-Visit Lab-Sync Radar Modal (Real-Time Problem Solver) */}
            {
                showLabRadar && bookingDetails && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <div onClick={() => setShowLabRadar(false)} className="absolute inset-0 bg-white/95 backdrop-blur-3xl"></div>
                        <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[3.5rem] p-12 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <BsShieldFillCheck className="text-blue-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black tracking-tighter uppercase text-gray-900">Lab-Sync Radar</h3>
                                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Diagnostic Labs near {bookingDetails.doc.hospital}</p>
                                </div>
                            </div>

                            <div className="grid gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                                {[
                                    { name: <><span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span> Diagnostics</>, dist: "200m", discount: "15% OFF" },
                                    { name: "Dr. Lal PathLabs", dist: "600m", discount: "Available" },
                                    { name: "Mithila Diagnostic Center", dist: "1.1km", discount: "10% OFF" }
                                ].map((lab, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <h4 className="font-black text-gray-800">{lab.name}</h4>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><BsGeoAltFill /> {lab.dist}</span>
                                                <span className="text-cyan-600 font-black">{lab.discount}</span>
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-blue-500/5 hover:bg-blue-500/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-blue-600">Route Now</button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowLabRadar(false)}
                                className="w-full mt-10 py-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-gray-600"
                            >
                                Return to Token
                            </button>
                        </div>
                    </div>
                )
            }

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,128,0.2); border-radius: 10px; }
                
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(1000%); opacity: 0; }
                }
                .animate-scan { animation: scan 3s linear infinite; }

                @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
                .animate-pulse-slow { animation: pulse-slow 4s infinite ease-in-out; }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
            `}</style>
        </div>
    );
};

export default OfflineConsultationHub;
