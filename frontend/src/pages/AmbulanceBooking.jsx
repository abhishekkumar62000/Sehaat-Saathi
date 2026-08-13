import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsTruck, BsPhoneFill, BsGeoAltFill, BsHeartPulseFill,
    BsShieldFillCheck, BsLightningFill, BsActivity, BsClockHistory,
    BsCheckCircleFill, BsExclamationTriangleFill, BsMapFill, BsCreditCardFill,
    BsXCircleFill, BsCheck, BsStarFill, BsHospital, BsTelephoneFill,
    BsWhatsapp, BsShareFill, BsCompass, BsSearch, BsFilter, BsCheckLg,
    BsEyeFill, BsPatchCheckFill, BsSuitHeartFill
} from 'react-icons/bs';
import {
    FaAmbulance, FaUserNurse, FaLungs, FaBaby, FaHelicopter,
    FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaIdCard, FaUserTie,
    FaStethoscope
} from 'react-icons/fa';
import { AMBULANCE_FLEET_DATA } from '../utils/ambulanceData';

const AMBULANCE_TYPES = [
    {
        id: 'bls',
        title: 'Basic Life Support (BLS)',
        tagline: 'Standard Patient & Non-Critical Emergency Transfer',
        icon: <FaAmbulance className="text-3xl text-emerald-500" />,
        color: 'emerald',
        basePrice: 499,
        perKm: 18,
        eta: '4-7 Mins',
        badge: 'Popular for General OPD',
        features: ['Central Oxygen Cylinder', 'Foldable Stretcher & Wheelchair', 'Trained Paramedic Onboard', 'First Aid & Vital Monitoring Kit', '24/7 GPS Tracking'],
        suitedFor: 'Fever, minor injuries, post-op discharge, non-critical doctor visits'
    },
    {
        id: 'als',
        title: 'Advanced Life Support (ALS)',
        tagline: 'Cardiac & Severe Emergency Critical Care Transport',
        icon: <BsHeartPulseFill className="text-3xl text-rose-500 animate-pulse" />,
        color: 'rose',
        basePrice: 1199,
        perKm: 32,
        eta: '3-5 Mins',
        badge: '🚨 Critical Priority',
        features: ['Cardiac Monitor & ECG Machine', 'Emergency Resuscitation & AED', 'Emergency Intubation & IV Line Set', 'Senior Critical Care Nurse Onboard', 'Emergency Siren & Green Corridor Priority'],
        suitedFor: 'Heart attack, chest pain, stroke, severe trauma, respiratory distress'
    },
    {
        id: 'icu',
        title: 'ICU Ventilator Ambulance',
        tagline: 'Mobile Intensive Care Unit for Critical Ventilator Patients',
        icon: <FaLungs className="text-3xl text-cyan-500 animate-bounce-slow" />,
        color: 'cyan',
        basePrice: 2499,
        perKm: 48,
        eta: '5-8 Mins',
        badge: '🏥 Mobile ICU Unit',
        features: ['Invasive Transport Ventilator Unit', 'Defibrillator & Multi-Para Monitor', 'Suction Machine & Syringe Pumps', 'Dual 40L Oxygen Backup Tanks', 'Intensivist Doctor & ICU Nurse Onboard', 'Sub-Zero Vaccine & Drug Cooler Box', 'Hydraulic Patient Loader', 'Satellite GPS Live Radar'],
        suitedFor: 'Coma, severe lung damage, multi-organ failure, inter-hospital ICU transfer'
    },
    {
        id: 'nicu',
        title: 'Neonatal & Pediatric (NICU)',
        tagline: 'Specialized Transport for Newborn Baby & Children Care',
        icon: <FaBaby className="text-3xl text-purple-500" />,
        color: 'purple',
        basePrice: 1899,
        perKm: 38,
        eta: '6-9 Mins',
        badge: '👶 Specialized Infant Care',
        features: ['Transport Incubator with Temperature Control', 'Infant Resuscitator & Micro-Ventilator', 'Pediatric Paramedic Team', 'Sub-Zero Thermal Warmer Blanket', 'Infant Oxygen Delivery System'],
        suitedFor: 'Premature babies, infant respiratory distress, pediatric ICU transfer'
    },
    {
        id: 'air',
        title: 'Air Ambulance Helicopter Service',
        tagline: 'Ultra-Fast Inter-City Helicopter Emergency Transfer',
        icon: <FaHelicopter className="text-3xl text-amber-500 animate-pulse" />,
        color: 'amber',
        basePrice: 85000,
        perKm: 450,
        eta: '30-45 Mins',
        badge: '🚁 High Air Speed Transfer',
        features: ['Dedicated Medical Chopper Dispatch', 'Full Airborne ICU Setup', 'Flight Doctor & Paramedic Flight Crew', 'Direct Airfield-to-Hospital Ramp Transfer', 'Coverage to AIIMS Delhi, Patna, Kolkata'],
        suitedFor: 'Long distance critical transfers, severe burn cases, multi-state emergency transport'
    }
];

const EMERGENCY_TRIAGES = [
    { id: 'cardiac', title: 'Cardiac / Chest Pain', priority: 'CRITICAL 🚨', type: 'als', desc: 'Severe chest tightness, sweating, sudden pain in arm/jaw' },
    { id: 'accident', title: 'Accident & Trauma', priority: 'HIGH ⚠️', type: 'als', desc: 'Severe bleeding, bone fracture, head injury, road accident' },
    { id: 'ventilator', title: 'ICU / Ventilator Patient', priority: 'CRITICAL 🏥', type: 'icu', desc: 'Patient requires continuous ventilator support & oxygen' },
    { id: 'maternity', title: 'Pregnancy / Childbirth', priority: 'HIGH 👶', type: 'bls', desc: 'Active labor pains, delivery emergency, pregnancy complication' },
    { id: 'general', title: 'General Hospital Transfer', priority: 'STANDARD 🚑', type: 'bls', desc: 'Routine hospital admission, dialysis transfer, non-critical' }
];

const HOSPITALS_LIST = [
    { name: "Medanta Hospital", location: "Sankar Chowk, Madhubani", icuBeds: 19, emergencyBeds: 15, contact: "+91 6200087830", liveStatus: "🟢 Beds Available" },
    { name: "Abhi Hospital", location: "Bypass Road, Madhubani", icuBeds: 25, emergencyBeds: 12, contact: "+91 9999999999", liveStatus: "🟢 Beds Available" },
    { name: "DMCH Super Specialty Hospital", location: "Darbhanga", icuBeds: 42, emergencyBeds: 30, contact: "+91 6243222111", liveStatus: "🟢 Beds Available" },
    { name: "PMCH Patna Medical College", location: "Patna", icuBeds: 85, emergencyBeds: 50, contact: "+91 6122300012", liveStatus: "🟢 Green Corridor Active" },
    { name: "Custom Address / Other Hospital", location: "User Specified Location", icuBeds: 0, emergencyBeds: 0, contact: "108", liveStatus: "ℹ️ Manual Entry" }
];

const AmbulanceBooking = () => {
    const [language, setLanguage] = useState('en');
    const [activeTab, setActiveTab] = useState('directory'); // directory, dispatch, hospital
    const [selectedTriage, setSelectedTriage] = useState(EMERGENCY_TRIAGES[0]);
    const [selectedType, setSelectedType] = useState(AMBULANCE_TYPES[1]);
    const [pickupAddress, setPickupAddress] = useState('');
    const [destinationHospital, setDestinationHospital] = useState(HOSPITALS_LIST[0].name);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [estimatedDistance, setEstimatedDistance] = useState(12);
    const [bookingStep, setBookingStep] = useState('select'); // select, dispatch, tracking
    const [isLocating, setIsLocating] = useState(false);
    const [dispatchingProgress, setDispatchingProgress] = useState(0);
    const [assignedDriver, setAssignedDriver] = useState(null);
    const [etaCountdown, setEtaCountdown] = useState(240);

    // 50+ Directory Filter & Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
    const [selectedLocationFilter, setSelectedLocationFilter] = useState('ALL');
    const [selectedFacilityFilter, setSelectedFacilityFilter] = useState('ALL');
    const [selectedAmbulanceModal, setSelectedAmbulanceModal] = useState(null);

    // Filter 50+ Ambulance fleet dynamically
    const filteredFleet = AMBULANCE_FLEET_DATA.filter(amb => {
        const matchesSearch = amb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.plateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat = selectedCategoryFilter === 'ALL' || amb.category === selectedCategoryFilter;
        const matchesLoc = selectedLocationFilter === 'ALL' || amb.location.includes(selectedLocationFilter);
        const matchesFacility = selectedFacilityFilter === 'ALL' || amb.facilities.some(f => f.toLowerCase().includes(selectedFacilityFilter.toLowerCase()));

        return matchesSearch && matchesCat && matchesLoc && matchesFacility;
    });

    // Auto GPS Location Detector
    const handleDetectLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    setPickupAddress(`GPS (${lat}, ${lng}), Madhubani Central Hub, Bihar`);
                    setIsLocating(false);
                    toast.success("📍 GPS Location Acquired!");
                },
                () => {
                    setPickupAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
                    setIsLocating(false);
                    toast.info("📍 Set location to Madhubani Central Hub");
                }
            );
        } else {
            setPickupAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
            setIsLocating(false);
        }
    };

    // Calculate Total Estimated Fare
    const calculatedFare = selectedType.basePrice + (estimatedDistance * selectedType.perKm);

    // Execute Ambulance Dispatch
    const handleInstantDispatch = (e) => {
        e.preventDefault();
        if (!pickupAddress.trim()) {
            toast.error("Please enter pickup address!");
            return;
        }
        if (!patientPhone.trim()) {
            toast.error("Please enter patient contact number!");
            return;
        }

        setBookingStep('dispatch');
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 20;
            setDispatchingProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                const randomAmb = AMBULANCE_FLEET_DATA[Math.floor(Math.random() * AMBULANCE_FLEET_DATA.length)];
                setAssignedDriver(randomAmb);
                setBookingStep('tracking');
                toast.success("🚑 Ambulance Dispatched! Driver is on the way!");
            }
        }, 500);
    };

    // Format Seconds to MM:SS
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rose-500/30 overflow-x-hidden relative">
            
            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#138808]/10 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            {/* Top Navigation Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 md:px-8 py-4 border-t-4 border-t-rose-600 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all font-bold group text-sm">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-rose-500 text-lg" />
                        <span>Smart Hub</span>
                    </Link>

                    {/* Direct Founder Helplines */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <a
                            href="tel:+916200087830"
                            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold hover:bg-slate-700 transition-all"
                        >
                            <FaPhoneAlt className="text-emerald-400 text-xs" />
                            <span>+91 6200087830</span>
                        </a>

                        <a
                            href="tel:108"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-pulse"
                        >
                            <BsTelephoneFill className="text-xs animate-bounce" />
                            <span>108 SOS</span>
                        </a>

                        <button
                            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white"
                        >
                            {language === 'en' ? 'हिंदी' : 'ENG'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl px-4 md:px-6 py-8 relative z-10">

                {/* Hero Header */}
                <div className="text-center mb-10 relative">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-[0.25em] shadow-xl mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                        <span>{language === 'en' ? "Bharat's Premier 50+ Emergency Ambulance Fleet" : "50+ सत्यापित एम्बुलेंस नेटवर्क"}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight mb-4">
                        Sehaat Saathi <br />
                        <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Ambulance Booking Services
                        </span>
                    </h1>

                    <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
                        Explore 50+ Verified Ambulances in Madhubani & Bihar (Bolero Neo, Eeco, Scorpio ALS, Force Traveller ICU, & Tata Winger). Direct Founder Contact: <span className="text-rose-400 font-bold">+91 6200087830</span> | <span className="text-rose-400 font-bold">+91 9934276622</span>.
                    </p>
                </div>

                {/* Feature Navigation Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('directory')}
                            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'directory' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaAmbulance className="text-base" /> 50+ Ambulance Directory ({AMBULANCE_FLEET_DATA.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('dispatch')}
                            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'dispatch' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsLightningFill className="text-base" /> Instant 2-Min Booking Wizard
                        </button>
                        <button
                            onClick={() => setActiveTab('hospital')}
                            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'hospital' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsHospital className="text-base" /> Live ICU Bed Sync
                        </button>
                    </div>
                </div>

                {/* TAB 1: 50+ AMBULANCE PROFILE DIRECTORY */}
                {activeTab === 'directory' && (
                    <div className="space-y-8">
                        
                        {/* Search & Multi-Filter Bar */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                {/* Search Input */}
                                <div className="md:col-span-2 relative">
                                    <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by Ambulance Name, Driver, Vehicle No (e.g. Bolero, BR-32)..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <select
                                        value={selectedCategoryFilter}
                                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    >
                                        <option value="ALL">All Categories (BLS / ALS / ICU / NICU)</option>
                                        <option value="BLS">Basic Life Support (BLS)</option>
                                        <option value="ALS">Advanced Life Support (ALS)</option>
                                        <option value="ICU">ICU Ventilator Ambulance</option>
                                        <option value="NICU">Neonatal NICU Unit</option>
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <select
                                        value={selectedLocationFilter}
                                        onChange={(e) => setSelectedLocationFilter(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    >
                                        <option value="ALL">All Locations (Madhubani Sector)</option>
                                        <option value="Sankar Chowk">Sankar Chowk, Madhubani</option>
                                        <option value="Station Road">Station Road, Madhubani</option>
                                        <option value="Bypass Road">Bypass Road, Madhubani</option>
                                        <option value="Benipatti">Benipatti, Madhubani</option>
                                        <option value="Jhanjharpur">Jhanjharpur, Madhubani</option>
                                        <option value="Phulparas">Phulparas, Madhubani</option>
                                        <option value="Darbhanga Highway">Darbhanga Highway</option>
                                    </select>
                                </div>
                            </div>

                            {/* Equipment Quick Filter Tags */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs">
                                <span className="text-slate-400 font-bold mr-2 flex items-center gap-1">
                                    <BsFilter /> Quick Equipment Filter:
                                </span>
                                {['ALL', 'Oxygen', 'Ventilator', 'Cardiac', 'Defibrillator', 'Stretcher'].map(fac => (
                                    <button
                                        key={fac}
                                        onClick={() => setSelectedFacilityFilter(fac)}
                                        className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all ${selectedFacilityFilter === fac ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}
                                    >
                                        {fac === 'ALL' ? 'Show All Equipment' : `✓ ${fac}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Directory Count Header */}
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-lg font-black uppercase text-white tracking-wider flex items-center gap-2">
                                <FaAmbulance className="text-rose-500" /> Showing {filteredFleet.length} Verified Ambulance Profiles
                            </h3>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                🟢 100% Madhubani & Bihar Active Network
                            </span>
                        </div>

                        {/* 50+ Ambulance Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFleet.map((amb) => (
                                <div
                                    key={amb.id}
                                    className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-rose-500/50 hover:shadow-[0_15px_35px_rgba(225,29,72,0.2)] transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Card Image Banner */}
                                        <div className="relative h-48 overflow-hidden bg-slate-950">
                                            <img
                                                src={amb.image}
                                                alt={amb.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                                            {/* Status Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${amb.status === 'AVAILABLE NOW' ? 'bg-emerald-500 text-slate-950' : amb.status === 'DISPATCH READY' ? 'bg-amber-400 text-slate-950' : 'bg-rose-600 text-white'}`}>
                                                    ● {amb.status}
                                                </span>
                                            </div>

                                            {/* Category Pill */}
                                            <div className="absolute top-3 right-3">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900/90 border border-slate-700 text-rose-400 shadow-lg">
                                                    {amb.category} Unit
                                                </span>
                                            </div>

                                            {/* Vehicle Plate Badge */}
                                            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-xl text-xs font-mono font-black text-amber-300">
                                                {amb.plateNo}
                                            </div>
                                        </div>

                                        {/* Content Details */}
                                        <div className="p-5 space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-black text-lg text-white group-hover:text-rose-400 transition-colors leading-snug">
                                                        {amb.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 shrink-0">
                                                        <BsStarFill className="text-yellow-400" />
                                                        <span>{amb.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs font-bold text-slate-400">{amb.vehicleModel}</p>
                                                <p className="text-xs text-rose-400/90 font-medium flex items-center gap-1 mt-1">
                                                    <BsGeoAltFill className="text-rose-500" /> {amb.location}
                                                </p>
                                            </div>

                                            {/* Driver & License Details */}
                                            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1 text-xs">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                                                        <FaUserTie className="text-indigo-400" /> Driver:
                                                    </span>
                                                    <span className="font-bold text-white">{amb.driverName}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                                                        <FaIdCard className="text-cyan-400" /> DL No:
                                                    </span>
                                                    <span className="font-mono text-slate-300">{amb.licenseNo}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-slate-500 font-medium">Experience:</span>
                                                    <span className="font-bold text-emerald-400">{amb.driverExperience} Verified</span>
                                                </div>
                                            </div>

                                            {/* Founder Helplines Display */}
                                            <div className="p-3 bg-rose-500/5 rounded-2xl border border-rose-500/20 text-xs space-y-1">
                                                <div className="text-[10px] font-black uppercase text-rose-400 tracking-wider flex items-center justify-between">
                                                    <span>Founder Direct Hotline</span>
                                                    <span className="text-slate-400">Sehaat Saathi</span>
                                                </div>
                                                <div className="font-bold text-white font-mono text-xs flex justify-between">
                                                    <span>📞 +91 6200087830</span>
                                                    <span>📞 +91 9934276622</span>
                                                </div>
                                            </div>

                                            {/* Facilities Badges */}
                                            <div className="space-y-1.5">
                                                <div className="text-[10px] font-bold uppercase text-slate-400">Key Vehicle Facilities</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {amb.facilities.slice(0, 4).map((f, fidx) => (
                                                        <span key={fidx} className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                                                            ✓ {f}
                                                        </span>
                                                    ))}
                                                    {amb.facilities.length > 4 && (
                                                        <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
                                                            +{amb.facilities.length - 4} More
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Action Buttons */}
                                    <div className="p-5 pt-0 grid grid-cols-3 gap-2">
                                        <a
                                            href={`tel:${amb.contactNumbers[0]}`}
                                            className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <FaPhoneAlt className="text-xs" /> Call
                                        </a>

                                        <button
                                            onClick={() => {
                                                const text = `🚨 Emergency Booking Request for ${amb.name} (${amb.vehicleModel}, Plate: ${amb.plateNo}). Driver: ${amb.driverName}. Location: ${amb.location}. Contact: ${amb.contactNumbers[0]}`;
                                                window.open(`https://api.whatsapp.com/send?phone=916200087830&text=${encodeURIComponent(text)}`, '_blank');
                                            }}
                                            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-1"
                                        >
                                            <BsWhatsapp className="text-green-500" /> WhatsApp
                                        </button>

                                        <button
                                            onClick={() => setSelectedAmbulanceModal(amb)}
                                            className="py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs uppercase flex items-center justify-center gap-1 transition-all"
                                        >
                                            <BsEyeFill /> Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 2: INSTANT 2-MIN BOOKING WIZARD */}
                {activeTab === 'dispatch' && (
                    <div>
                        {bookingStep === 'select' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left 7 Columns */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-black uppercase text-rose-400 tracking-wider flex items-center gap-2">
                                                <BsActivity /> 1. Select Emergency Type (Triage)
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {EMERGENCY_TRIAGES.map((triage) => (
                                                <button
                                                    key={triage.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedTriage(triage);
                                                        const matchingType = AMBULANCE_TYPES.find(t => t.id === triage.type) || AMBULANCE_TYPES[0];
                                                        setSelectedType(matchingType);
                                                    }}
                                                    className={`p-4 rounded-2xl border text-left transition-all ${selectedTriage.id === triage.id ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/30' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'}`}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-white text-sm">{triage.title}</h4>
                                                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300">
                                                            {triage.priority}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 line-clamp-2">{triage.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                                                <BsTruck /> 2. Choose Fleet Category
                                            </h3>
                                            <span className="text-xs font-bold text-emerald-400">Zero Surge Tariff</span>
                                        </div>

                                        <div className="space-y-4">
                                            {AMBULANCE_TYPES.map((veh) => (
                                                <div
                                                    key={veh.id}
                                                    onClick={() => setSelectedType(veh)}
                                                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${selectedType.id === veh.id ? 'bg-slate-800 border-rose-500 ring-2 ring-rose-500/40 shadow-2xl' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'}`}
                                                >
                                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                                                {veh.icon}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h4 className="font-black text-white text-base">{veh.title}</h4>
                                                                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                                                        {veh.badge}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-slate-400 font-medium mb-2">{veh.tagline}</p>
                                                            </div>
                                                        </div>

                                                        <div className="text-right shrink-0 self-end sm:self-center">
                                                            <div className="text-xl font-black text-white">₹{veh.basePrice}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold">+ ₹{veh.perKm}/km</div>
                                                            <div className="text-xs font-bold text-emerald-400 mt-1">ETA: {veh.eta}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right 5 Columns: Booking Form */}
                                <div className="lg:col-span-5 space-y-8">
                                    <form onSubmit={handleInstantDispatch} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
                                        <div className="border-b border-slate-800 pb-4">
                                            <h3 className="text-lg font-black uppercase text-white tracking-wide">
                                                Instant Dispatch Booking
                                            </h3>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-300 flex items-center justify-between">
                                                <span>Pickup Address</span>
                                                <button
                                                    type="button"
                                                    onClick={handleDetectLocation}
                                                    disabled={isLocating}
                                                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20"
                                                >
                                                    <BsCompass className={isLocating ? "animate-spin" : ""} />
                                                    <span>{isLocating ? "Detecting GPS..." : "Detect GPS"}</span>
                                                </button>
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={pickupAddress}
                                                onChange={(e) => setPickupAddress(e.target.value)}
                                                placeholder="House No, Station Road, Madhubani..."
                                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-300">
                                                Destination Hospital
                                            </label>
                                            <select
                                                value={destinationHospital}
                                                onChange={(e) => setDestinationHospital(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            >
                                                {HOSPITALS_LIST.map((h, i) => (
                                                    <option key={i} value={h.name}>
                                                        {h.name} ({h.location})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-300">Patient Name</label>
                                                <input
                                                    type="text"
                                                    value={patientName}
                                                    onChange={(e) => setPatientName(e.target.value)}
                                                    placeholder="Patient / Caller Name"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-300">Contact Phone *</label>
                                                <input
                                                    type="tel"
                                                    value={patientPhone}
                                                    onChange={(e) => setPatientPhone(e.target.value)}
                                                    placeholder="+91 98765 43210"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2">
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>Base Charge ({selectedType.title})</span>
                                                <span className="font-bold text-slate-200">₹{selectedType.basePrice}</span>
                                            </div>
                                            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                                                <span className="text-xs font-black uppercase text-white">Estimated Total</span>
                                                <span className="text-2xl font-black text-rose-400">₹{calculatedFare}</span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-3"
                                        >
                                            <FaAmbulance className="text-xl animate-bounce" />
                                            <span>CONFIRM & DISPATCH AMBULANCE</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {bookingStep === 'dispatch' && (
                            <div className="max-w-2xl mx-auto py-16 text-center space-y-8">
                                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
                                    <FaAmbulance className="text-5xl text-rose-500 animate-pulse" />
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase">Contacting Nearest Ambulance...</h2>
                                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 max-w-md mx-auto">
                                    <div className="bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 h-full transition-all duration-300" style={{ width: `${dispatchingProgress}%` }}></div>
                                </div>
                            </div>
                        )}

                        {bookingStep === 'tracking' && assignedDriver && (
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase">
                                        🟢 Ambulance Dispatched & On The Way
                                    </div>
                                    <div className="text-5xl font-black text-white tracking-widest font-mono">
                                        {formatTime(etaCountdown)}
                                    </div>
                                    <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-left grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                        <div>
                                            <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Assigned Vehicle</h4>
                                            <h3 className="text-xl font-black text-white">{assignedDriver.name}</h3>
                                            <p className="text-xs font-bold text-rose-400 mt-0.5">{assignedDriver.vehicleModel} ({assignedDriver.plateNo})</p>
                                            <p className="text-xs text-slate-300 mt-2">Driver: <strong>{assignedDriver.driverName}</strong> ({assignedDriver.licenseNo})</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <a href={`tel:${assignedDriver.contactNumbers[0]}`} className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2">
                                                <FaPhoneAlt /> Call Driver Directly
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: LIVE HOSPITAL ICU BED SYNC */}
                {activeTab === 'hospital' && (
                    <div className="space-y-8 max-w-5xl mx-auto">
                        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
                            <h3 className="text-xl font-black uppercase text-white tracking-wide flex items-center gap-2">
                                <BsHospital className="text-rose-500" /> Live Hospital Bed & Emergency Corridor Status
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {HOSPITALS_LIST.map((hosp, idx) => (
                                    <div key={idx} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-lg text-white">{hosp.name}</h4>
                                                <p className="text-slate-400 text-xs">{hosp.location}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {hosp.liveStatus}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900 text-xs">
                                            <div>
                                                <span className="text-slate-500 block">Available ICU Beds</span>
                                                <span className="text-xl font-black text-cyan-400">{hosp.icuBeds} Beds</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">Emergency Beds</span>
                                                <span className="text-xl font-black text-rose-400">{hosp.emergencyBeds} Beds</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* FULL AMBULANCE PROFILE SPECIFICATION MODAL */}
            {selectedAmbulanceModal && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 text-white rounded-[2.5rem] p-6 lg:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedAmbulanceModal(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 text-2xl"
                        >
                            <BsXCircleFill />
                        </button>

                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                            <img
                                src={selectedAmbulanceModal.image}
                                alt={selectedAmbulanceModal.name}
                                className="w-full sm:w-48 h-40 object-cover rounded-2xl border border-slate-700"
                            />
                            <div className="space-y-2">
                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                    {selectedAmbulanceModal.category} Unit • Verified Profile
                                </span>
                                <h3 className="text-2xl font-black uppercase text-white">{selectedAmbulanceModal.name}</h3>
                                <p className="text-xs font-bold text-amber-300 font-mono">Plate: {selectedAmbulanceModal.plateNo} • Model: {selectedAmbulanceModal.vehicleModel}</p>
                                <p className="text-xs text-slate-400">📍 Location: {selectedAmbulanceModal.location}</p>
                            </div>
                        </div>

                        {/* Driver & Founder Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                                <h4 className="font-bold text-rose-400 uppercase text-[10px]">Driver Profile & Credential</h4>
                                <p className="text-sm font-bold text-white">{selectedAmbulanceModal.driverName}</p>
                                <p className="text-slate-400">Driving License: <strong className="text-slate-200 font-mono">{selectedAmbulanceModal.licenseNo}</strong></p>
                                <p className="text-slate-400">Driving Experience: <strong className="text-emerald-400">{selectedAmbulanceModal.driverExperience}</strong></p>
                            </div>

                            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/30 space-y-1 text-xs">
                                <h4 className="font-bold text-rose-400 uppercase text-[10px]">Sehaat Saathi Founder Hotline</h4>
                                <p className="text-xs font-bold text-white">Direct Booking & Emergency Support</p>
                                <p className="font-bold text-emerald-400 font-mono text-sm">📞 +91 6200087830</p>
                                <p className="font-bold text-emerald-400 font-mono text-sm">📞 +91 9934276622</p>
                            </div>
                        </div>

                        {/* Complete Facilities Checklist */}
                        <div className="space-y-3 mb-8">
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">In-Vehicle Equipment & Medical Support</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {selectedAmbulanceModal.facilities.map((fac, fidx) => (
                                    <div key={fidx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                                        <BsCheckLg className="text-emerald-400 shrink-0" />
                                        <span>{fac}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <a
                                href={`tel:${selectedAmbulanceModal.contactNumbers[0]}`}
                                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
                            >
                                <FaPhoneAlt /> Call Founder Hotline
                            </a>
                            <button
                                onClick={() => {
                                    const text = `🚨 Emergency Ambulance Inquiry for ${selectedAmbulanceModal.name} (${selectedAmbulanceModal.plateNo}). Driver: ${selectedAmbulanceModal.driverName}. Location: ${selectedAmbulanceModal.location}.`;
                                    window.open(`https://api.whatsapp.com/send?phone=916200087830&text=${encodeURIComponent(text)}`, '_blank');
                                }}
                                className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 border border-slate-700"
                            >
                                <BsWhatsapp className="text-green-500" /> WhatsApp Direct
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AmbulanceBooking;
