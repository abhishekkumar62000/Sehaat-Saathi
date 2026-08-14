import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsHouseHeartFill, BsShieldCheck, BsStarFill,
    BsCalendarCheck, BsClockHistory, BsCheckLg, BsTelephoneFill,
    BsWhatsapp, BsSearch, BsFilter, BsGeoAltFill, BsPersonFill,
    BsPatchCheckFill, BsSuitHeartFill, BsXCircleFill, BsLightningFill,
    BsActivity, BsExclamationTriangleFill, BsShieldShaded, BsCompass,
    BsPhoneVibrate, BsHeadset, BsLightningChargeFill, BsFillTelephoneOutboundFill,
    BsHeartPulseFill, BsAwardFill
} from 'react-icons/bs';
import {
    FaUserNurse, FaStethoscope, FaLungs, FaBaby, FaHandHoldingMedical,
    FaPhoneAlt, FaIdCard, FaUserTie, FaCheckCircle, FaClipboardCheck,
    FaBriefcaseMedical, FaHeartbeat, FaSyringe, FaWheelchair, FaAmbulance
} from 'react-icons/fa';
import {
    HELPLINE_NUMBERS,
    CORE_HEALTHCARE_PILLARS,
    HOME_HEALTHCARE_CATEGORIES,
    HEALTHCARE_SERVICES_LIST,
    VERIFIED_HOME_PROVIDERS,
    SERVICE_LOCATIONS_LIST
} from '../utils/homeHealthcareData';

const TRANSLATIONS = {
    en: {
        smartHub: "Smart Hub",
        founderHotline: "Helpline Support",
        emergencyBadge: "⚠️ EMERGENCY DISCLAIMER: Sehaat Saathi provides 24/7 Emergency Ambulance Network (50+ ICU, Ventilator & Oxygen Ambulances) across Madhubani & Bihar. Call +91 6200087830 or click to Book Ambulance.",
        ambulanceLink: "Book Ambulance 🚑",
        heroBadge: "🏠 HOSPITAL-GRADE CARE AT YOUR DOORSTEP",
        heroTitle: "Sehaat Saathi Home Healthcare Services",
        heroSubtitle: "Book Certified Home Nurses, Senior Citizen Care Attendants, Home Physiotherapy & Lab Tests at Home across Madhubani Town & Nearby 1-10 KM Radius. Verified Staff • Transparent Rates • 24/7 Support.",
        pillarsTitle: "3 MAIN CORE HEALTHCARE SERVICES",
        pillarsSubtitle: "Hospital-grade medical care delivered to senior citizens & patients unable to visit clinics in Madhubani Town & surrounding 1-10 KM areas.",
        careCoordinatorTitle: "Unsure which service your patient needs?",
        careCoordinatorDesc: "Speak directly with a Sehaat Saathi Medical Care Coordinator to evaluate patient condition and recommend the best home care plan.",
        careCoordinatorBtn: "Call Founder Hotline",
        tabServices: "Browse All Services",
        tabBooking: "Book Service Wizard",
        tabProviders: "Verified Care Professionals",
        tabTracking: "Live Booking Tracker",
        searchPlaceholder: "Search services (e.g., Home Nursing, Senior Citizen Care, Paralysis Physio, ECG)...",
        allCategories: "All Care Categories",
        allLocations: "All Service Areas",
        startingPrice: "Starting at",
        durationLabel: "Duration:",
        includesLabel: "Service Includes:",
        highlightPerksLabel: "✨ Highlighted Service Perks:",
        bookNowBtn: "Book Online",
        callNowBtn: "Call Support",
        whatsAppBtn: "WhatsApp",
        detailsBtn: "Full Details",
        bookingTitle: "Interactive Home Care Booking Wizard",
        step1Title: "1. Select Healthcare Service",
        step2Title: "2. Choose Date & Time Slot",
        step3Title: "3. Patient Details & Address",
        step4Title: "4. Confirmation & Care Tracker",
        patientNameLabel: "Patient Full Name",
        patientPhoneLabel: "Mobile Contact Number *",
        addressLabel: "Full Home Address (Village / Ward / Street)",
        detectGpsBtn: "Detect via GPS",
        specialNotesLabel: "Medical Notes / Doctor Prescription Details",
        timeSlotMorning: "Morning Slot (8:00 AM - 11:00 AM)",
        timeSlotAfternoon: "Afternoon Slot (1:00 PM - 4:00 PM)",
        timeSlotEvening: "Evening Slot (5:00 PM - 8:00 PM)",
        timeSlot12Hr: "12-Hour Shift (8 AM to 8 PM)",
        timeSlot24Hr: "24-Hour Full Day Shift",
        confirmBookingBtn: "CONFIRM & DISPATCH HOME CARE PROFESSIONAL",
        trustBadge1: "100% Background Checked",
        trustBadge2: "Sterilized Medical Equipment",
        trustBadge3: "Zero Hidden Tariff",
        trustBadge4: "Founder Supervised Care",
        contactModalTitle: "Sehaat Saathi Emergency Booking Support Lines"
    },
    hi: {
        smartHub: "स्मार्ट हब (Smart Hub)",
        founderHotline: "हेल्पलाइन नंबर",
        emergencyBadge: "⚠️ इमरजेंसी सूचना: सेहत साथी मधुबनी व बिहार में 50+ इमरजेंसी एम्बुलेंस (ICU, वेंटिलेटर, ऑक्सीजन) की 24/7 सेवा प्रदान करता है। एम्बुलेंस हेतु +91 6200087830 पर कॉल करें या तुरंत एम्बुलेंस बुक करें।",
        ambulanceLink: "सेहत साथी एम्बुलेंस बुक करें 🚑",
        heroBadge: "🏠 अस्पताल जैसी देखभाल अब आपके घर पर",
        heroTitle: "सेहत साथी होम हेल्थकेयर बुकिंग सर्विसेज",
        heroSubtitle: "घर पर बी.एससी नर्स, बुजुर्गों के लिए मेडिकल अटेंडेंट, फिजियोथेरेपी डॉक्टर और ब्लड/ईसीजी टेस्ट बुक करें। सत्यापित स्टाफ • सही रेट • 24 घंटे मदद।",
        pillarsTitle: "सेहत साथी द्वारा दी जाने वाली 3 मुख्य स्वास्थ्य सेवाएं (MAIN SERVICES)",
        pillarsSubtitle: "मधुबनी टाउन और आसपास 1 से 10 किमी क्षेत्र में बार-बार अस्पताल न जा सकने वाले बुजुर्गों व मरीजों के लिए घर पर ही अस्पताल जैसी देखरेख।",
        careCoordinatorTitle: "क्या आपको समझ नहीं आ रहा कौन सी सेवा चाहिए?",
        careCoordinatorDesc: "हमारे मेडिकल केयर कॉर्डिनेटर से मुफ्त में बात करें और मरीज की स्थिति के अनुसार सही सेवा चुनें।",
        careCoordinatorBtn: "केयर कॉर्डिनेटर से बात करें",
        tabServices: "सभी सेवाएं देखें",
        tabBooking: "बुकिंग फॉर्म (Booking Wizard)",
        tabProviders: "सत्यापित नर्स व डॉक्टर",
        tabTracking: "लाइव केयर ट्रैकर",
        searchPlaceholder: "सेवा खोजें (जैसे: होम नर्सिंग, बुजुर्ग देखभाल, लकवा फिजियोथेरेपी, ईसीजी)...",
        allCategories: "सभी प्रकार की सेवाएं",
        allLocations: "सभी जगहें (मधुबनी व आसपास)",
        startingPrice: "शुरुआती किराया",
        durationLabel: "समय अवधि:",
        includesLabel: "सेवा में क्या-क्या शामिल है:",
        highlightPerksLabel: "✨ मुख्य विशेषताएं (Highlights):",
        bookNowBtn: "ऑनलाइन बुक करें",
        callNowBtn: "कॉल करें",
        whatsAppBtn: "व्हाट्सएप",
        detailsBtn: "पूरी जानकारी",
        bookingTitle: "होम केयर बुकिंग फॉर्म",
        step1Title: "1. सेवा का प्रकार चुनें",
        step2Title: "2. तारीख और समय चुनें",
        step3Title: "3. मरीज की जानकारी व पता",
        step4Title: "4. बुकिंग पुष्टि व स्टेटस",
        patientNameLabel: "मरीज का पूरा नाम",
        patientPhoneLabel: "फोन नंबर *",
        addressLabel: "घर का पूरा पता (गाँव / वार्ड / मोहल्ला)",
        detectGpsBtn: "GPS से लोकेशन चुनें",
        specialNotesLabel: "डॉक्टर का पर्चा या विशेष निर्देश",
        timeSlotMorning: "सुबह का समय (8:00 AM - 11:00 AM)",
        timeSlotAfternoon: "दोपहर का समय (1:00 PM - 4:00 PM)",
        timeSlotEvening: "शाम का समय (5:00 PM - 8:00 PM)",
        timeSlot12Hr: "12 घंटे की शिफ्ट (सुबह 8 से रात 8)",
        timeSlot24Hr: "24 घंटे की फुल-डे शिफ्ट",
        confirmBookingBtn: "बुकिंग पक्की करें (Confirm Booking)",
        trustBadge1: "100% सत्यापित स्टाफ",
        trustBadge2: "साफ-सुथरे उपकरण",
        trustBadge3: "कोई छुपे पैसे नहीं",
        trustBadge4: "संस्थापक की सीधी देखरेख",
        contactModalTitle: "सेहत साथी इमरजेंसी बुकिंग सपोर्ट नंबर"
    }
};

const HomeHealthcare = () => {
    const [language, setLanguage] = useState('hi');
    const [activeTab, setActiveTab] = useState('services');
    const [activeFeaturedPillar, setActiveFeaturedPillar] = useState('elderly');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedLocation, setSelectedLocation] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState(HEALTHCARE_SERVICES_LIST[0]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning Slot (8:00 AM - 11:00 AM)');
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [bookingStep, setBookingStep] = useState('select');
    const [isLocating, setIsLocating] = useState(false);
    const [selectedModalService, setSelectedModalService] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [activeBookingTracker, setActiveBookingTracker] = useState(null);

    const t = TRANSLATIONS[language];

    const filteredServices = HEALTHCARE_SERVICES_LIST.filter(srv => {
        const title = language === 'hi' ? srv.titleHi : srv.titleEn;
        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            srv.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || srv.categoryId === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleDetectLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude.toFixed(4);
                    const lng = pos.coords.longitude.toFixed(4);
                    setPatientAddress(language === 'hi' ? `GPS लोकेशन (${lat}, ${lng}), मधुबनी टाउन, बिहार` : `GPS Position (${lat}, ${lng}), Madhubani Town, Bihar`);
                    setIsLocating(false);
                    toast.success(language === 'hi' ? "📍 आपका सही स्थान मिल गया है!" : "📍 GPS Location Acquired!");
                },
                () => {
                    setPatientAddress("Madhubani Station Road, Ward No. 12, Madhubani Town, Bihar");
                    setIsLocating(false);
                    toast.info("📍 Location: Madhubani Central");
                }
            );
        } else {
            setPatientAddress("Madhubani Station Road, Ward No. 12, Madhubani Town, Bihar");
            setIsLocating(false);
        }
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!patientPhone.trim()) {
            toast.error(language === 'hi' ? "कृपया मोबाइल नंबर दर्ज करें!" : "Please enter mobile number!");
            return;
        }
        if (!patientAddress.trim()) {
            toast.error(language === 'hi' ? "कृपया घर का पता दर्ज करें!" : "Please enter address!");
            return;
        }

        const newTracker = {
            id: 'HC-' + Math.floor(100000 + Math.random() * 900000),
            serviceName: language === 'hi' ? selectedService.titleHi : selectedService.titleEn,
            patientName: patientName || 'Patient',
            patientPhone,
            patientAddress,
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            statusStage: 2,
            assignedProvider: VERIFIED_HOME_PROVIDERS[0]
        };

        setActiveBookingTracker(newTracker);
        setBookingStep('tracking');
        setActiveTab('tracking');
        toast.success(language === 'hi' ? "🎉 होम केयर बुकिंग की पुष्टि हो गई है!" : "🎉 Home Healthcare Booking Confirmed!");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
            
            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            {/* Responsive Navigation Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 border-t-4 border-t-emerald-500 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center gap-1.5 sm:gap-3">
                    <Link to="/smarthub" className="flex items-center gap-1.5 sm:gap-2 text-slate-300 hover:text-white transition-all font-bold group text-xs sm:text-sm shrink-0">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-emerald-400 text-sm sm:text-lg" />
                        <span className="truncate">{t.smartHub}</span>
                    </Link>

                    {/* Helplines & Bilingual Language Switcher */}
                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <button
                            onClick={() => setShowContactModal(true)}
                            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg animate-pulse"
                        >
                            <FaPhoneAlt className="text-white text-xs" />
                            <span>+91 6200087830</span>
                        </button>

                        <Link
                            to="/ambulance-booking"
                            className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg"
                        >
                            <span>{t.ambulanceLink}</span>
                        </Link>

                        {/* Real-time Bilingual Language Switch Toggle Button */}
                        <button
                            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
                            className="relative flex items-center w-[85px] sm:w-[110px] h-8 sm:h-10 bg-slate-800 rounded-full border-2 border-slate-700 p-0.5 sm:p-1 shadow-inner overflow-hidden cursor-pointer transition-all active:scale-95 shrink-0"
                        >
                            <div className={`absolute top-0.5 left-0.5 w-[38px] sm:w-[50px] h-[calc(100%-4px)] rounded-full transition-transform duration-300 shadow-md ${language === 'hi' ? 'translate-x-0 bg-gradient-to-r from-[#FF9933] to-rose-600' : 'translate-x-[42px] sm:translate-x-[52px] bg-gradient-to-r from-emerald-600 to-teal-600'}`}></div>
                            <span className={`w-1/2 text-center text-[10px] sm:text-xs font-black z-10 transition-colors ${language === 'hi' ? 'text-white' : 'text-slate-400'}`}>हिंदी</span>
                            <span className={`w-1/2 text-center text-[10px] sm:text-xs font-black z-10 transition-colors ${language === 'en' ? 'text-white' : 'text-slate-400'}`}>ENG</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl px-2.5 sm:px-6 py-4 sm:py-10 relative z-10 space-y-6 sm:space-y-12">

                {/* Emergency Disclaimer Banner */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/90 via-slate-900 to-rose-950/90 border border-red-500/50 text-white text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
                    <div className="flex items-center gap-2 text-center sm:text-left">
                        <FaAmbulance className="text-red-400 text-xl sm:text-2xl shrink-0 animate-bounce" />
                        <span className="leading-relaxed">{t.emergencyBadge}</span>
                    </div>
                    <Link to="/ambulance-booking" className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shrink-0 shadow-xl flex items-center justify-center gap-2 text-center">
                        <span>{t.ambulanceLink}</span>
                    </Link>
                </div>

                {/* Prominent 4 Helplines Glassmorphic Top Bar with Dual Triggers */}
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border-2 border-emerald-500/30 shadow-2xl space-y-3 sm:space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-slate-800 pb-3 sm:pb-4 text-center md:text-left">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                                <BsPhoneVibrate className="animate-bounce text-sm sm:text-base" />
                                <span>Sehaat Saathi Emergency Booking & Care Helplines</span>
                            </div>
                            <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                                {language === 'hi' ? 'किसी भी सेवा हेतु कॉल या व्हाट्सएप संदेश द्वारा संपर्क करें:' : 'For Any Service Inquiry, Call or WhatsApp Our Helplines:'}
                            </h3>
                        </div>

                        <button
                            onClick={() => setShowContactModal(false)}
                            className="w-full md:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 shrink-0"
                        >
                            <BsHeadset className="text-base" /> {t.contactModalTitle}
                        </button>
                    </div>

                    {/* 4 Numbers Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                        {HELPLINE_NUMBERS.map((h, hidx) => (
                            <div key={hidx} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-emerald-500/50 transition-all">
                                <div>
                                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                                        {language === 'hi' ? h.labelHi : h.labelEn}
                                    </span>
                                    <span className="font-mono font-black text-white text-xs sm:text-sm">{h.number}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <a
                                        href={`tel:${h.cleanNo}`}
                                        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md"
                                        title="Direct Phone Call"
                                    >
                                        <FaPhoneAlt />
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=${h.cleanNo}&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Emergency%20Home%20Healthcare%20Service%20in%20Madhubani.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-green-400 border border-slate-700 flex items-center justify-center text-xs"
                                        title="WhatsApp Message"
                                    >
                                        <BsWhatsapp />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Animated Hero Header */}
                <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/60 shadow-2xl text-center space-y-4 relative overflow-hidden">
                    
                    {/* Animated Glowing Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-emerald-500/40 shadow-lg inline-flex items-center gap-2 animate-pulse">
                            <BsPatchCheckFill className="text-emerald-400 text-sm" /> 🏠 HOSPITAL-GRADE CARE AT YOUR DOORSTEP
                        </span>
                        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-amber-500/40 shadow-lg inline-flex items-center gap-2">
                            📍 मधुबनी टाउन व आसपास (1-10 KM) होम डिलीवरी
                        </span>
                    </div>

                    {/* Brand Gradient Animated Title */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                        <span className="text-[#FF9933] drop-shadow-[0_0_15px_rgba(255,153,51,0.4)]">SEHAAT</span>{" "}
                        <span className="text-[#138808] drop-shadow-[0_0_15px_rgba(19,136,8,0.4)]">SAATHI</span>{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
                            HOME HEALTHCARE
                        </span>
                    </h1>

                    {/* Dynamic Tagline Pill Cards */}
                    <div className="max-w-4xl mx-auto space-y-3 pt-1">
                        <p className="text-slate-200 text-xs sm:text-base md:text-lg font-bold leading-relaxed">
                            <strong className="text-emerald-400 font-black">अस्पताल नहीं जा सकते?</strong> सेहत साथी की 100% सत्यापित मेडिकल टीम अब आपके घर आएगी।
                        </p>

                        {/* 3 Interactive Highlight Pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl mx-auto pt-1">
                            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-center space-y-0.5 hover:scale-105 transition-transform shadow-md">
                                <span className="text-sm block">👩‍⚕️</span>
                                <span className="text-xs font-black text-emerald-400 block uppercase">Home Nursing Care</span>
                                <span className="text-[10px] text-slate-300 font-bold block">सर्टिफाइड मेल/फीमेल नर्स</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center space-y-0.5 hover:scale-105 transition-transform shadow-md">
                                <span className="text-sm block">👴</span>
                                <span className="text-xs font-black text-amber-400 block uppercase">Senior Citizen Care</span>
                                <span className="text-[10px] text-slate-300 font-bold block">बुजुर्ग देखभाल स्टाफ</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 text-center space-y-0.5 hover:scale-105 transition-transform shadow-md">
                                <span className="text-sm block">🧘</span>
                                <span className="text-xs font-black text-cyan-400 block uppercase">Home Physiotherapy</span>
                                <span className="text-[10px] text-slate-300 font-bold block">फिजियोथेरेपिस्ट होम विजिट</span>
                            </div>
                        </div>

                        <p className="text-[11px] sm:text-xs text-slate-400 font-bold pt-1">
                            ⭐ 100% Verified Staff • Transparent Low Rates • 24/7 Booking Support (Call & WhatsApp)
                        </p>
                    </div>
                </div>

                {/* ALL 3 MAIN SERVICES 100% HIGHLIGHTED */}
                <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
                    <div className="text-center space-y-1.5 sm:space-y-2">
                        <span className="px-3.5 sm:px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500 text-slate-950 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg">
                            ⭐ 3 MAIN HEALTHCARE SERVICES ⭐
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black uppercase text-white tracking-tight">
                            {t.pillarsTitle}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 font-bold max-w-2xl mx-auto px-2">
                            {t.pillarsSubtitle}
                        </p>
                    </div>

                    {/* 3 Bold Glowing Highlighted Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        
                        {/* PILLAR 1: HOME NURSING */}
                        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/90 via-slate-900 to-slate-900 ring-2 ring-emerald-500/40 shadow-2xl transition-all flex flex-col justify-between group hover:scale-[1.02]">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl sm:text-4xl">👩‍⚕️</span>
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-lg animate-pulse">
                                        👑 CORE PILLAR #1
                                    </span>
                                </div>
                                <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors">
                                    {language === 'hi' ? '1. एक्सपर्ट होम नर्सिंग व क्लिनिकल केयर 👩‍⚕️' : '1. EXPERT HOME NURSING & CLINICAL CARE'}
                                </h3>
                                <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                    {language === 'hi' ? 'बी.एससी/जीएनएम नर्स द्वारा घर पर ही इंजेक्शन, ड्रिप, पट्टी, कैथेटर व ऑपरेशन के बाद की विशेष देखभाल।' : 'Certified B.Sc/GNM Nurses for Injections, IV Drips, Dressings, Catheters & Post-Surgery Care at home.'}
                                </p>

                                <div className="p-2.5 sm:p-3 bg-emerald-950/60 rounded-xl sm:rounded-2xl border border-emerald-500/30 text-[10px] sm:text-[11px] font-bold text-emerald-300 space-y-1">
                                    <div>✓ 30-Minute Rapid Arrival in Madhubani</div>
                                    <div>✓ Free BP, SpO2 & Glucose Check</div>
                                    <div>✓ ICU Trained Nursing Staff</div>
                                </div>
                            </div>

                            <div className="pt-4 sm:pt-6">
                                <button
                                    onClick={() => {
                                        setActiveFeaturedPillar('nursing');
                                        setSelectedCategory('nursing');
                                        setActiveTab('services');
                                    }}
                                    className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Explore Home Nursing →</span>
                                </button>
                            </div>
                        </div>

                        {/* PILLAR 2: ELDERLY CARE */}
                        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-950/90 via-slate-900 to-slate-900 ring-2 ring-amber-500/40 shadow-2xl transition-all flex flex-col justify-between group hover:scale-[1.02]">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl sm:text-4xl">👴</span>
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow-lg animate-pulse">
                                        👑 CORE PILLAR #2
                                    </span>
                                </div>
                                <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors">
                                    {language === 'hi' ? '2. बुजुर्गों व वरिष्ठ नागरिकों के लिए मेडिकल होम केयर 👴' : '2. SENIOR CITIZEN MEDICAL HOME CARE'}
                                </h3>
                                <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                    {language === 'hi' ? 'बार-बार अस्पताल न जा सकने वाले बुजुर्गों के लिए घर पर ही समर्पित स्टाफ नर्स, फिजियो व केयर अटेंडेंट की सेवा।' : 'Dedicated Staff Nurse & Attendants for Elderly Patients Unable to Visit Hospitals Frequently.'}
                                </p>

                                <div className="p-2.5 sm:p-3 bg-amber-950/60 rounded-xl sm:rounded-2xl border border-amber-500/30 text-[10px] sm:text-[11px] font-bold text-amber-300 space-y-1">
                                    <div>✓ 12/24 Hour Shift Dedicated Caregivers</div>
                                    <div>✓ Professional Health & Vital Management</div>
                                    <div>✓ Daily Health Status Logbook</div>
                                </div>
                            </div>

                            <div className="pt-4 sm:pt-6">
                                <button
                                    onClick={() => {
                                        setActiveFeaturedPillar('elderly');
                                        setSelectedCategory('elderly');
                                        setActiveTab('services');
                                    }}
                                    className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs uppercase shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Explore Senior Care →</span>
                                </button>
                            </div>
                        </div>

                        {/* PILLAR 3: PHYSIOTHERAPY */}
                        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-purple-500 bg-gradient-to-b from-purple-950/90 via-slate-900 to-slate-900 ring-2 ring-purple-500/40 shadow-2xl transition-all flex flex-col justify-between group hover:scale-[1.02]">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl sm:text-4xl">🦾</span>
                                    <span className="text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3.5 py-1 rounded-full bg-purple-500 text-white shadow-lg animate-pulse">
                                        👑 CORE PILLAR #3
                                    </span>
                                </div>
                                <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-purple-400 transition-colors">
                                    {language === 'hi' ? '3. स्पेशलाइज्ड होम फिजियोथेरेपी व लोकल रिहैब 🦾' : '3. SPECIALIZED HOME PHYSIOTHERAPY'}
                                </h3>
                                <p className="text-xs font-bold text-slate-200 leading-relaxed">
                                    {language === 'hi' ? 'फिजियो डॉक्टर द्वारा घर आकर लकवा (Stoke), घुटने व कमर दर्द का मशीन से पक्का इलाज।' : 'Doctorate BPT/MPT Physiotherapists at Home for Stroke Paralysis, Knee Pain & Machine Therapy.'}
                                </p>

                                <div className="p-2.5 sm:p-3 bg-purple-950/60 rounded-xl sm:rounded-2xl border border-purple-500/30 text-[10px] sm:text-[11px] font-bold text-purple-300 space-y-1">
                                    <div>✓ Stroke & Paralysis Rehabilitation</div>
                                    <div>✓ TENS & Muscle Stimulator Machine</div>
                                    <div>✓ Doctorate MPT/BPT Physio Doctor</div>
                                </div>
                            </div>

                            <div className="pt-4 sm:pt-6">
                                <button
                                    onClick={() => {
                                        setActiveFeaturedPillar('physio');
                                        setSelectedCategory('physio');
                                        setActiveTab('services');
                                    }}
                                    className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Explore Physiotherapy →</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* DYNAMIC FEATURED BANNERS WITH DUAL CALL + WHATSAPP DIRECT ACTION BUTTONS */}
                {activeFeaturedPillar === 'elderly' && (
                    <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border-2 border-amber-500/60 shadow-2xl relative overflow-hidden text-center md:text-left space-y-3 sm:space-y-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="space-y-2 sm:space-y-3 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-black uppercase border border-amber-500/40">
                                    👴 SENIOR CITIZEN HEALTHCARE & HOME NURSE VISITS
                                </div>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                                    {language === 'hi' ? 'अस्पताल जाने में असमर्थ बुजुर्गों हेतु घर पर समर्पित स्टाफ नर्स व केयरगिवर' : 'Dedicated Home Nursing & Caregiver Visits for Senior Citizens Unable to Visit Hospitals'}
                                </h2>
                                <p className="text-slate-200 text-xs sm:text-sm font-bold leading-relaxed">
                                    <span className="text-amber-400 font-black">📍 लोकल क्षेत्र कवरेज:</span> मधुबनी टाउन और आसपास 1 से 10 किमी क्षेत्र (संकर चौक, स्टेशन रोड, रंटी, रहिका, राजनगर, पंडौल, भगवानपुर)।
                                </p>
                            </div>

                            {/* Dual Call & WhatsApp Direct Triggers */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                                <a
                                    href="tel:+916200087830"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaPhoneAlt /> Call Elder Care (+91 6200087830)
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Senior%20Citizen%20Medical%20Home%20Care%20service%20in%20Madhubani."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 border border-green-500/40 font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <BsWhatsapp className="text-base" /> WhatsApp Message
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {activeFeaturedPillar === 'nursing' && (
                    <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/60 shadow-2xl relative overflow-hidden text-center md:text-left space-y-3 sm:space-y-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="space-y-2 sm:space-y-3 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-black uppercase border border-emerald-500/40">
                                    👩‍⚕️ EXPERT HOME NURSING VISIT AVAILABLE TODAY
                                </div>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                                    {language === 'hi' ? 'घर पर बी.एससी/जीएनएम नर्स विज़िट (इंजेक्शन, ड्रिप, ड्रेसिंग व केयर)' : 'Certified B.Sc/GNM Home Nursing Visits'}
                                </h2>
                                <p className="text-slate-200 text-xs sm:text-sm font-bold leading-relaxed">
                                    <span className="text-emerald-400 font-black">📍 लोकल क्षेत्र कवरेज:</span> मधुबनी टाउन और आसपास 1 से 10 किमी क्षेत्र (संकर चौक, स्टेशन रोड, रंटी, रहिका, राजनगर, पंडौल, भगवानपुर)।
                                </p>
                            </div>

                            {/* Dual Call & WhatsApp Direct Triggers */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                                <a
                                    href="tel:+916200087830"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaPhoneAlt /> Call Nurse (+91 6200087830)
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Certified%20Home%20Nursing%20Visit%20service%20in%20Madhubani."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 border border-green-500/40 font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <BsWhatsapp className="text-base" /> WhatsApp Message
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {activeFeaturedPillar === 'physio' && (
                    <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-2 border-purple-500/60 shadow-2xl relative overflow-hidden text-center md:text-left space-y-3 sm:space-y-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="space-y-2 sm:space-y-3 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-black uppercase border border-purple-500/40">
                                    🦾 HOME VISIT PHYSIOTHERAPY DOCTOR AVAILABLE TODAY
                                </div>
                                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                                    {language === 'hi' ? 'घर पर फिजियोथेरेपी (लकवा, घुटने व कमर दर्द का मशीन से इलाज)' : 'Home Visit Physiotherapy (Stroke Paralysis & Knee Pain Rehab)'}
                                </h2>
                                <p className="text-slate-200 text-xs sm:text-sm font-bold leading-relaxed">
                                    <span className="text-purple-400 font-black">📍 लोकल क्षेत्र कवरेज:</span> मधुबनी टाउन और आसपास 1 से 10 किमी क्षेत्र (संकर चौक, स्टेशन रोड, रंटी, रहिका, राजनगर, पंडौल, भगवानपुर)।
                                </p>
                            </div>

                            {/* Dual Call & WhatsApp Direct Triggers */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                                <a
                                    href="tel:+916200087830"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaPhoneAlt /> Call Physio (+91 6200087830)
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Home%20Visit%20Physiotherapy%20Doctor%20service%20in%20Madhubani."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 border border-green-500/40 font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <BsWhatsapp className="text-base" /> WhatsApp Message
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scrollable Navigation Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto scrollbar-none overscroll-contain">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'services' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaHandHoldingMedical className="text-xs sm:text-base" /> {t.tabServices}
                        </button>
                        <button
                            onClick={() => setActiveTab('booking')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'booking' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsCalendarCheck className="text-xs sm:text-base" /> {t.tabBooking}
                        </button>
                        <button
                            onClick={() => setActiveTab('providers')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'providers' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaUserNurse className="text-xs sm:text-base" /> {t.tabProviders}
                        </button>
                        <button
                            onClick={() => setActiveTab('tracking')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'tracking' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsActivity className="text-xs sm:text-base" /> {t.tabTracking}
                        </button>
                    </div>
                </div>

                {/* TAB 1: BROWSE ALL HEALTHCARE SERVICES */}
                {activeTab === 'services' && (
                    <div className="space-y-6 sm:space-y-8">
                        
                        {/* Categories Cards Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {HOME_HEALTHCARE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'ALL' : cat.id)}
                                    className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all flex flex-col justify-between group ${selectedCategory === cat.id ? 'bg-emerald-600/20 border-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
                                >
                                    <div className="space-y-2.5 sm:space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl sm:text-3xl">{cat.icon}</span>
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                                                {cat.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-black text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors">
                                            {language === 'hi' ? cat.titleHi : cat.titleEn}
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-3">
                                            {language === 'hi' ? cat.descHi : cat.descEn}
                                        </p>
                                    </div>
                                    <div className="pt-2 sm:pt-3 text-[10px] sm:text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                        <span>{selectedCategory === cat.id ? '✓ Filter Active' : 'Explore Category →'}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                                <div className="md:col-span-2 relative">
                                    <BsSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs sm:text-sm" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="ALL">{t.allCategories}</option>
                                        <option value="nursing">👩‍⚕️ Nursing & Patient Care</option>
                                        <option value="elderly">👴 Senior Citizen Elder Care</option>
                                        <option value="physio">🦾 Home Physiotherapy</option>
                                        <option value="diagnostics">🧪 Home Diagnostics & Lab</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Services Grid with Highlighted Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {filteredServices.map((srv) => {
                                const srvTitle = language === 'hi' ? srv.titleHi : srv.titleEn;
                                const srvIncludes = language === 'hi' ? srv.includesHi : srv.includesEn;
                                const srvHighlights = language === 'hi' ? srv.highlightFeaturesHi : srv.highlightFeaturesEn;

                                return (
                                    <div
                                        key={srv.id}
                                        className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-4 sm:space-y-6 group"
                                    >
                                        <div className="space-y-3 sm:space-y-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-2.5 sm:gap-3">
                                                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                                                        {srv.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                                                            {srvTitle}
                                                        </h4>
                                                        <p className="text-[11px] sm:text-xs text-slate-400 font-bold">{t.durationLabel} {srv.duration}</p>
                                                    </div>
                                                </div>
                                                <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                                    {srv.badge}
                                                </span>
                                            </div>

                                            {/* Price & Helpline Bar */}
                                            <div className="p-3 sm:p-4 bg-slate-950/80 rounded-xl sm:rounded-2xl border border-slate-800 space-y-1.5 sm:space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] sm:text-xs text-slate-400 font-bold">{t.startingPrice}</span>
                                                    <div className="text-right">
                                                        <span className="text-xl sm:text-2xl font-black text-emerald-400">₹{srv.startingPrice}</span>
                                                        <span className="text-[9px] sm:text-[10px] text-slate-400 block font-bold">/ {srv.priceUnit}</span>
                                                    </div>
                                                </div>
                                                <div className="pt-1.5 sm:pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-amber-300">
                                                    <span>📞 Founder Helpline:</span>
                                                    <span className="font-mono text-white">+91 6200087830</span>
                                                </div>
                                            </div>

                                            {/* Highlighted Perks Section */}
                                            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border bg-emerald-500/10 border-emerald-500/30 space-y-1.5 sm:space-y-2">
                                                <h5 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-300">
                                                    {t.highlightPerksLabel}
                                                </h5>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
                                                    {srvHighlights.map((hl, hidx) => (
                                                        <div key={hidx} className="text-[10px] sm:text-[11px] font-bold text-white flex items-center gap-1.5">
                                                            <span>{hl}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Checklist */}
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <h5 className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">{t.includesLabel}</h5>
                                                <div className="space-y-1 sm:space-y-1.5">
                                                    {srvIncludes.map((inc, i) => (
                                                        <div key={i} className="text-[11px] sm:text-xs text-slate-300 flex items-start gap-1.5 sm:gap-2">
                                                            <BsCheckLg className="text-emerald-400 mt-0.5 shrink-0" />
                                                            <span>{inc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action CTAs */}
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(srv);
                                                    setActiveTab('booking');
                                                }}
                                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 shadow-lg"
                                            >
                                                <BsCalendarCheck /> {t.bookNowBtn}
                                            </button>
                                            <a
                                                href="tel:+916200087830"
                                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 border border-slate-700"
                                            >
                                                <FaPhoneAlt className="text-[10px] sm:text-xs" /> {t.callNowBtn}
                                            </a>
                                            <a
                                                href={`https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20${encodeURIComponent(srvTitle)}%20in%20Madhubani.`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 border border-slate-800"
                                            >
                                                <BsWhatsapp /> WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 2: INTERACTIVE BOOKING WIZARD */}
                {activeTab === 'booking' && (
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        <form onSubmit={handleBookingSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 sm:p-10 shadow-2xl space-y-6 sm:space-y-8">
                            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide border-b border-slate-800 pb-3 sm:pb-4">
                                {t.bookingTitle}
                            </h3>

                            {/* Step 1: Select Service */}
                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-xs sm:text-sm font-black text-emerald-400 uppercase tracking-wider">{t.step1Title}</h4>
                                <select
                                    value={selectedService.id}
                                    onChange={(e) => {
                                        const s = HEALTHCARE_SERVICES_LIST.find(x => x.id === e.target.value);
                                        if (s) setSelectedService(s);
                                    }}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                >
                                    {HEALTHCARE_SERVICES_LIST.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {language === 'hi' ? s.titleHi : s.titleEn} (₹{s.startingPrice} / {s.priceUnit})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Step 2: Date & Time Slot */}
                            <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider">{t.step2Title}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1.5 sm:mb-2">Select Date</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1.5 sm:mb-2">Select Preferred Time Slot</label>
                                        <select
                                            value={selectedTimeSlot}
                                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                                        >
                                            <option value="Morning Slot (8:00 AM - 11:00 AM)">{t.timeSlotMorning}</option>
                                            <option value="Afternoon Slot (1:00 PM - 4:00 PM)">{t.timeSlotAfternoon}</option>
                                            <option value="Evening Slot (5:00 PM - 8:00 PM)">{t.timeSlotEvening}</option>
                                            <option value="12-Hour Shift (8 AM to 8 PM)">{t.timeSlot12Hr}</option>
                                            <option value="24-Hour Full Day Shift">{t.timeSlot24Hr}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Patient Details & Address */}
                            <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-xs sm:text-sm font-black text-cyan-400 uppercase tracking-wider">{t.step3Title}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.patientNameLabel}</label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            placeholder="Patient Name"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.patientPhoneLabel}</label>
                                        <input
                                            type="tel"
                                            value={patientPhone}
                                            onChange={(e) => setPatientPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs font-bold text-slate-300">{t.addressLabel}</label>
                                        <button
                                            type="button"
                                            onClick={handleDetectLocation}
                                            disabled={isLocating}
                                            className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20"
                                        >
                                            <BsCompass className={isLocating ? "animate-spin" : ""} />
                                            <span>{t.detectGpsBtn}</span>
                                        </button>
                                    </div>
                                    <textarea
                                        rows={2}
                                        value={patientAddress}
                                        onChange={(e) => setPatientAddress(e.target.value)}
                                        placeholder="House No, Ward No, Street Name, Madhubani Town..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Summary Box */}
                            <div className="p-3.5 sm:p-4 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 space-y-1.5 sm:space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Selected Service</span>
                                    <span className="font-bold text-white">{language === 'hi' ? selectedService.titleHi : selectedService.titleEn}</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Estimated Tariff</span>
                                    <span className="font-bold text-emerald-400 text-base sm:text-lg">₹{selectedService.startingPrice}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                            >
                                <FaHandHoldingMedical className="text-lg sm:text-xl" />
                                <span>{t.confirmBookingBtn}</span>
                            </button>
                        </form>
                    </div>
                )}

                {/* TAB 3: VERIFIED CARE PROFESSIONALS SHOWCASE */}
                {activeTab === 'providers' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">Verified Healthcare Professionals</h3>
                            <p className="text-xs text-slate-400 font-bold px-2">100% Verified Nurses, Physiotherapists & Senior Citizen Attendants in Madhubani Town & 1-10 KM Radius.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {VERIFIED_HOME_PROVIDERS.map((prv) => (
                                <div key={prv.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-3 sm:space-y-4 text-center flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
                                    <div className="space-y-2.5 sm:space-y-3">
                                        <div className="relative w-24 sm:w-28 h-24 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-xl">
                                            <img src={prv.photo} alt={prv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div>
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {prv.badge}
                                            </span>
                                            <h4 className="font-black text-base sm:text-lg text-white mt-1.5 sm:mt-2">{prv.name}</h4>
                                            <p className="text-[11px] sm:text-xs font-bold text-amber-400">{language === 'hi' ? prv.roleHi : prv.roleEn}</p>
                                            <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">{prv.qualification}</p>
                                            <p className="text-[11px] sm:text-xs text-emerald-400 font-bold mt-1">{prv.experience} • ⭐ {prv.rating}</p>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-1 pt-1 sm:pt-2">
                                            {prv.skills.map((sk, skidx) => (
                                                <span key={skidx} className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                                                    ✓ {sk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-1 sm:pt-2">
                                        <a
                                            href="tel:+916200087830"
                                            className="w-full py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <FaPhoneAlt /> Call
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20want%20to%20book%20provider%20${encodeURIComponent(prv.name)}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-green-400 border border-slate-700 font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <BsWhatsapp /> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: LIVE BOOKING TRACKER */}
                {activeTab === 'tracking' && (
                    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                        {activeBookingTracker ? (
                            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 sm:p-10 shadow-2xl text-center space-y-6 sm:space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase border border-emerald-500/20">
                                    🟢 Booking ID: {activeBookingTracker.id}
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-white">{activeBookingTracker.serviceName}</h3>
                                <p className="text-xs text-slate-400 font-bold">Scheduled for: {activeBookingTracker.date} ({activeBookingTracker.timeSlot})</p>

                                {/* 5 Stage Status Timeline */}
                                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px] font-bold">
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center">✓</div>
                                        <span className="text-emerald-400">1. Request Sent</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center animate-pulse">2</div>
                                        <span className="text-emerald-400">2. Coordinator Assigned</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">3</div>
                                        <span className="text-slate-500">3. En Route</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">4</div>
                                        <span className="text-slate-500">4. Service Started</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">5</div>
                                        <span className="text-slate-500">5. Completed</span>
                                    </div>
                                </div>

                                <div className="p-3.5 sm:p-4 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                                    <p className="text-slate-400">Assigned Nurse/Provider: <strong className="text-white">{activeBookingTracker.assignedProvider.name}</strong> ({activeBookingTracker.assignedProvider.qualification})</p>
                                    <p className="text-slate-400">Patient Address: <strong className="text-white">{activeBookingTracker.patientAddress}</strong></p>
                                    <p className="text-slate-400">Helpline: <strong className="text-emerald-400">+91 6200087830</strong></p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center space-y-4">
                                <BsActivity className="text-4xl sm:text-5xl text-emerald-400 mx-auto" />
                                <h3 className="text-lg sm:text-xl font-black text-white">No Active Home Care Bookings Yet</h3>
                                <p className="text-xs text-slate-400 font-bold">Select a service and fill the booking form to initiate live care tracking.</p>
                                <button
                                    onClick={() => setActiveTab('booking')}
                                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase"
                                >
                                    Book First Service
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>

            {/* HELPLINE NUMBERS CONTACT MODAL WITH CALL AND WHATSAPP DUAL TRIGGERS */}
            {showContactModal && (
                <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowContactModal(false)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-rose-500 text-xl sm:text-2xl"
                        >
                            <BsXCircleFill />
                        </button>

                        <div className="space-y-1.5 sm:space-y-2 text-center">
                            <BsHeadset className="text-3xl sm:text-4xl text-emerald-400 mx-auto" />
                            <h3 className="text-lg sm:text-xl font-black uppercase text-white">{t.contactModalTitle}</h3>
                            <p className="text-xs text-slate-400 font-bold">Sehaat Saathi Emergency Booking & Healthcare Support</p>
                        </div>

                        <div className="space-y-2.5 sm:space-y-3">
                            {HELPLINE_NUMBERS.map((h, hidx) => (
                                <div key={hidx} className="p-3 sm:p-4 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                                    <div>
                                        <span className="text-[10px] sm:text-xs text-slate-400 font-bold block">{language === 'hi' ? h.labelHi : h.labelEn}</span>
                                        <span className="font-mono font-black text-white text-xs sm:text-base">{h.number}</span>
                                    </div>
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <a
                                            href={`tel:${h.cleanNo}`}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center gap-1 shadow-md"
                                        >
                                            <FaPhoneAlt /> Call
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=${h.cleanNo}&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Emergency%20Home%20Healthcare%20Service%20in%20Madhubani.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-green-400 border border-slate-700 font-bold text-[10px] sm:text-xs uppercase flex items-center gap-1 shadow-md"
                                        >
                                            <BsWhatsapp /> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SERVICE SPECIFICATION MODAL */}
            {selectedModalService && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedModalService(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-rose-500 text-xl sm:text-2xl"
                        >
                            <BsXCircleFill />
                        </button>

                        <div className="space-y-1.5 sm:space-y-2">
                            <span className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400">
                                {selectedModalService.badge}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white">{language === 'hi' ? selectedModalService.titleHi : selectedModalService.titleEn}</h3>
                            <p className="text-xs font-bold text-emerald-400 font-mono">Tariff: ₹{selectedModalService.startingPrice} / {selectedModalService.priceUnit} • Duration: {selectedModalService.duration}</p>
                        </div>

                        {/* Highlighted Perks */}
                        <div className="p-3.5 sm:p-4 bg-emerald-500/10 rounded-xl sm:rounded-2xl border border-emerald-500/30 space-y-2">
                            <h4 className="text-[10px] sm:text-xs font-black uppercase text-emerald-300">{t.highlightPerksLabel}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-white">
                                {(language === 'hi' ? selectedModalService.highlightFeaturesHi : selectedModalService.highlightFeaturesEn).map((hl, hidx) => (
                                    <div key={hidx} className="flex items-center gap-1.5">
                                        <span>{hl}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Includes List */}
                        <div className="space-y-2 sm:space-y-3">
                            <h4 className="text-[10px] sm:text-xs font-bold uppercase text-slate-400">{t.includesLabel}</h4>
                            <div className="space-y-1.5 sm:space-y-2">
                                {(language === 'hi' ? selectedModalService.includesHi : selectedModalService.includesEn).map((inc, i) => (
                                    <div key={i} className="p-2.5 sm:p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-bold text-slate-200 flex items-center gap-2">
                                        <BsCheckLg className="text-emerald-400 shrink-0" />
                                        <span>{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                            <button
                                onClick={() => {
                                    setSelectedService(selectedModalService);
                                    setSelectedModalService(null);
                                    setActiveTab('booking');
                                }}
                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-600 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1"
                            >
                                <BsCalendarCheck /> Book Online
                            </button>
                            <a
                                href="tel:+916200087830"
                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 border border-slate-700"
                            >
                                <FaPhoneAlt /> Call Support
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20${encodeURIComponent(language === 'hi' ? selectedModalService.titleHi : selectedModalService.titleEn)}%20in%20Madhubani.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 text-green-400 font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 border border-slate-800"
                            >
                                <BsWhatsapp /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomeHealthcare;
