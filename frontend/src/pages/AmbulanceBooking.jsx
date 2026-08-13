import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsTruck, BsPhoneFill, BsGeoAltFill, BsHeartPulseFill,
    BsShieldFillCheck, BsLightningFill, BsActivity, BsClockHistory,
    BsCheckCircleFill, BsExclamationTriangleFill, BsMapFill, BsCreditCardFill,
    BsXCircleFill, BsCheck, BsStarFill, BsHospital, BsTelephoneFill,
    BsWhatsapp, BsShareFill, BsCompass, BsVolumeUpFill, BsVolumeMuteFill
} from 'react-icons/bs';
import {
    FaAmbulance, FaUserNurse, FaLungs, FaBaby, FaHelicopter,
    FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt
} from 'react-icons/fa';

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
        features: ['Invasive Transport Ventilator Unit', 'Defibrillator & Multi-Para Monitor', 'Suction Machine & Syringe Pumps', 'Intensivist Doctor & ICU Nurse', 'Full Oxygen & Power Backup'],
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
        features: ['Dedicated Medical Chopper Dispatch', 'Full Airborne ICU ICU Setup', 'Flight Doctor & Paramedic Flight Crew', 'Direct Airfield-to-Hospital Ramp Transfer', 'Coverage to AIIMS Delhi, Patna, Kolkata'],
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

const NEARBY_AMBULANCES_MOCK = [
    { id: 1, driver: "Ramesh Kumar", type: "ALS Cardiac Ambulance", vehicleNo: "BR-32-PA-1081", distance: "1.2 km", eta: "4 mins", phone: "+91 98765-43210", rating: 4.9, location: "Madhubani Station Road" },
    { id: 2, driver: "Suresh Singh", type: "ICU Ventilator Unit", vehicleNo: "BR-32-PA-1082", distance: "2.1 km", eta: "6 mins", phone: "+91 87654-32109", rating: 4.8, location: "Sankar Chowk Madhubani" },
    { id: 3, driver: "Anita Devi", type: "BLS Oxygen Ambulance", vehicleNo: "BR-32-PA-1083", distance: "0.8 km", eta: "3 mins", phone: "+91 76543-21098", rating: 5.0, location: "Madhubani Bypass Road" },
    { id: 4, driver: "Vikram Raj", type: "Neonatal NICU Unit", vehicleNo: "BR-32-PA-1084", distance: "3.4 km", eta: "8 mins", phone: "+91 65432-10987", rating: 4.7, location: "Darbhanga Highway Junction" }
];

const HOSPITALS_LIST = [
    { name: "Medanta Hospital", location: "Sankar Chowk, Madhubani", icuBeds: 19, emergencyBeds: 15, contact: "+91 6200087830", liveStatus: "🟢 Beds Available" },
    { name: "Abhi Hospital", location: "Bypass Road, Madhubani", icuBeds: 25, emergencyBeds: 12, contact: "+91 9999999999", liveStatus: "🟢 Beds Available" },
    { name: "DMCH Super Specialty Hospital", location: "Darbhanga", icuBeds: 42, emergencyBeds: 30, contact: "+91 6243222111", liveStatus: "🟢 Beds Available" },
    { name: "PMCH Patna Medical College", location: "Patna", icuBeds: 85, emergencyBeds: 50, contact: "+91 6122300012", liveStatus: "🟢 Green Corridor Active" },
    { name: "Custom Address / Other Hospital", location: "User Specified Location", icuBeds: 0, emergencyBeds: 0, contact: "108", liveStatus: "ℹ️ Manual Entry" }
];

const AmbulanceBooking = () => {
    const [language, setLanguage] = useState('en'); // en / hi
    const [selectedTriage, setSelectedTriage] = useState(EMERGENCY_TRIAGES[0]);
    const [selectedType, setSelectedType] = useState(AMBULANCE_TYPES[1]); // Default ALS
    const [pickupAddress, setPickupAddress] = useState('');
    const [destinationHospital, setDestinationHospital] = useState(HOSPITALS_LIST[0].name);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [estimatedDistance, setEstimatedDistance] = useState(12); // km
    const [bookingStep, setBookingStep] = useState('select'); // select, confirm, dispatch, tracking
    const [isLocating, setIsLocating] = useState(false);
    const [dispatchingProgress, setDispatchingProgress] = useState(0);
    const [assignedDriver, setAssignedDriver] = useState(null);
    const [etaCountdown, setEtaCountdown] = useState(240); // 4 mins in seconds
    const [activeRadarPulse, setActiveRadarPulse] = useState(0);

    // Dynamic Radar Pulse effect
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRadarPulse(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Countdown Timer during tracking
    useEffect(() => {
        if (bookingStep === 'tracking' && etaCountdown > 0) {
            const timer = setInterval(() => {
                setEtaCountdown(prev => Math.max(0, prev - 1));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [bookingStep, etaCountdown]);

    // Handle Auto GPS Location Detection
    const handleDetectLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    setPickupAddress(`GPS Position (${lat}, ${lng}), Madhubani Central Hub, Bihar`);
                    setIsLocating(false);
                    toast.success("📍 Exact GPS Location Acquired!");
                },
                (error) => {
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
            toast.error("Please enter or detect your pickup address!");
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
                const matchedDriver = NEARBY_AMBULANCES_MOCK[Math.floor(Math.random() * NEARBY_AMBULANCES_MOCK.length)];
                setAssignedDriver(matchedDriver);
                setBookingStep('tracking');
                toast.success("🚑 Ambulance Dispatched! Driver is on the way!");
            }
        }, 600);
    };

    // Format Seconds to MM:SS
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rose-500/30 overflow-x-hidden relative">
            
            {/* Ambient Background Gradient Lights */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#138808]/10 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            {/* Header / Top Emergency Control Bar */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 md:px-8 py-4 border-t-4 border-t-rose-600 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all font-bold group text-sm">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-rose-500 text-lg" />
                        <span>Smart Hub</span>
                    </Link>

                    {/* SOS Direct Helpline Trigger */}
                    <div className="flex items-center gap-3">
                        <a
                            href="tel:108"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-pulse"
                        >
                            <BsTelephoneFill className="text-sm animate-bounce" />
                            <span>108 Hotline</span>
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

                {/* Hero Header Section */}
                <div className="text-center mb-12 relative">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-[0.25em] shadow-xl mb-6">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                        <span>{language === 'en' ? "Bharat's 24/7 AI Emergency Ambulance Dispatch" : "भारत की 24/7 आपातकालीन एम्बुलेंस सेवा"}</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight mb-4">
                        Sehaat Saathi <br />
                        <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Emergency Ambulance Booking
                        </span>
                    </h1>

                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed">
                        Instant 2-minute dispatch for Basic Life Support, Cardiac ALS, Portable ICU Ventilator, & Infant NICU Ambulances with live GPS tracking across Madhubani & Bihar.
                    </p>
                </div>

                {/* Live Hospital Emergency Bed Capacity Ticker */}
                <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {HOSPITALS_LIST.slice(0, 3).map((hosp, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                                    <BsHospital />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">{hosp.name}</h4>
                                    <p className="text-slate-500 text-xs">{hosp.location}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 block mb-1">
                                    ICU: {hosp.icuBeds} Beds
                                </span>
                                <span className="text-[10px] font-medium text-slate-400">Emergency: {hosp.emergencyBeds} Open</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Interactive Booking & Dispatch Interface */}
                {bookingStep === 'select' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left 7 Columns: Emergency Triage & Vehicle Selector */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Step 1: Emergency Triage Selector */}
                            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-black uppercase text-rose-400 tracking-wider flex items-center gap-2">
                                        <BsActivity /> 1. Select Emergency Type (Triage)
                                    </h3>
                                    <span className="text-xs text-slate-500 font-medium">Auto-selects optimal vehicle</span>
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

                            {/* Step 2: Ambulance Vehicle Categories */}
                            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                                        <BsTruck /> 2. Choose Ambulance Fleet Category
                                    </h3>
                                    <span className="text-xs font-bold text-emerald-400">Zero Surge Pricing</span>
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
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {veh.features.slice(0, 3).map((feat, fidx) => (
                                                                <span key={fidx} className="text-[9px] font-bold text-slate-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-md">
                                                                    ✓ {feat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0 self-end sm:self-center">
                                                    <div className="text-xl font-black text-white">₹{veh.basePrice}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold">+ ₹{veh.perKm}/km base</div>
                                                    <div className="text-xs font-bold text-emerald-400 mt-1">ETA: {veh.eta}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right 5 Columns: Booking Form & Real-time Fare Calculator */}
                        <div className="lg:col-span-5 space-y-8">
                            
                            {/* Booking Form Card */}
                            <form onSubmit={handleInstantDispatch} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
                                <div className="border-b border-slate-800 pb-4">
                                    <h3 className="text-lg font-black uppercase text-white tracking-wide">
                                        Instant Dispatch Booking
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1 font-medium">
                                        Enter pickup & patient info for 2-minute ambulance assignment.
                                    </p>
                                </div>

                                {/* Pickup Location */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-300 flex items-center justify-between">
                                        <span>Pickup Address / Location</span>
                                        <button
                                            type="button"
                                            onClick={handleDetectLocation}
                                            disabled={isLocating}
                                            className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20"
                                        >
                                            <BsCompass className={isLocating ? "animate-spin" : ""} />
                                            <span>{isLocating ? "Detecting GPS..." : "Detect Location"}</span>
                                        </button>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            rows={2}
                                            value={pickupAddress}
                                            onChange={(e) => setPickupAddress(e.target.value)}
                                            placeholder="House No, Landmark, Station Road, Madhubani..."
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Destination Hospital */}
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

                                {/* Patient Contact Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-300">
                                            Patient Name
                                        </label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            placeholder="Patient / Caller Name"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-300">
                                            Contact Phone *
                                        </label>
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

                                {/* Distance Slider */}
                                <div className="space-y-2 pt-2">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                                        <span>Estimated Transfer Distance</span>
                                        <span className="text-rose-400 font-black">{estimatedDistance} km</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={estimatedDistance}
                                        onChange={(e) => setEstimatedDistance(parseInt(e.target.value))}
                                        className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer h-2"
                                    />
                                </div>

                                {/* Fare Estimation Breakdown */}
                                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-2">
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Base Vehicle Charge ({selectedType.title})</span>
                                        <span className="font-bold text-slate-200">₹{selectedType.basePrice}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Distance Charge ({estimatedDistance} km × ₹{selectedType.perKm})</span>
                                        <span className="font-bold text-slate-200">₹{estimatedDistance * selectedType.perKm}</span>
                                    </div>
                                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-xs font-black uppercase text-white">Estimated Total Fare</span>
                                        <span className="text-2xl font-black text-rose-400">₹{calculatedFare}</span>
                                    </div>
                                </div>

                                {/* Submit Dispatch Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all flex items-center justify-center gap-3"
                                >
                                    <FaAmbulance className="text-xl animate-bounce" />
                                    <span>CONFIRM & DISPATCH AMBULANCE</span>
                                </button>
                            </form>

                            {/* Live Radar Map Simulator */}
                            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xs font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                                        <BsMapFill /> Live Fleet Radar (Madhubani Sector)
                                    </h4>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                        4 Units Online
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {NEARBY_AMBULANCES_MOCK.map((unit, idx) => (
                                        <div key={unit.id} className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${activeRadarPulse === idx ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></div>
                                                <div>
                                                    <h5 className="font-bold text-white">{unit.driver} ({unit.vehicleNo})</h5>
                                                    <p className="text-slate-500 text-[10px]">{unit.type} • {unit.location}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-emerald-400 block">{unit.eta}</span>
                                                <span className="text-[10px] text-slate-400">{unit.distance} away</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dispatch Progress State */}
                {bookingStep === 'dispatch' && (
                    <div className="max-w-2xl mx-auto py-16 text-center space-y-8">
                        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
                            <FaAmbulance className="text-5xl text-rose-500 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                                Contacting Nearest Ambulance Fleet...
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Matching your GPS location with active BLS/ALS units in Madhubani Sector.
                            </p>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 max-w-md mx-auto">
                            <div
                                className="bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 h-full transition-all duration-300"
                                style={{ width: `${dispatchingProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Live Tracking State */}
                {bookingStep === 'tracking' && assignedDriver && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        
                        {/* Status Card */}
                        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-rose-500 to-amber-500"></div>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
                                🟢 Ambulance Dispatched & On The Way
                            </div>

                            <div className="text-5xl font-black text-white tracking-widest font-mono">
                                {formatTime(etaCountdown)}
                            </div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Estimated Arrival Time (ETA)</p>

                            {/* Driver Card */}
                            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-left grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                <div>
                                    <h4 className="text-xs font-black uppercase text-slate-400 mb-1">Assigned Driver & Unit</h4>
                                    <h3 className="text-xl font-black text-white">{assignedDriver.driver}</h3>
                                    <p className="text-xs font-bold text-rose-400 mt-0.5">{assignedDriver.type} ({assignedDriver.vehicleNo})</p>
                                    <p className="text-xs text-slate-400 mt-2">📍 {assignedDriver.location}</p>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3">
                                    <a
                                        href={`tel:${assignedDriver.phone}`}
                                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
                                    >
                                        <FaPhoneAlt /> Call Driver Directly
                                    </a>

                                    <button
                                        onClick={() => {
                                            const text = `🚨 Emergency Alert: Ambulance dispatched for ${patientName || 'Patient'}. Driver: ${assignedDriver.driver} (${assignedDriver.phone}). ETA: 4 mins. Pickup: ${pickupAddress}`;
                                            window.open(`https://api.whatsapp.com/send?phone=916200087830&text=${encodeURIComponent(text)}`, '_blank');
                                        }}
                                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 w-full sm:w-auto"
                                    >
                                        <BsWhatsapp className="text-green-500" /> Share via WhatsApp
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setBookingStep('select')}
                                className="text-xs font-bold text-slate-400 hover:text-white underline pt-4"
                            >
                                ← Book Another Ambulance Transfer
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AmbulanceBooking;
