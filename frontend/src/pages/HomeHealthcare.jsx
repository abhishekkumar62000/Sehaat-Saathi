import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsHouseHeartFill, BsShieldCheck, BsStarFill,
    BsCalendarCheck, BsClockHistory, BsCheckLg, BsTelephoneFill,
    BsWhatsapp, BsSearch, BsFilter, BsGeoAltFill, BsPersonFill,
    BsPatchCheckFill, BsSuitHeartFill, BsXCircleFill, BsLightningFill,
    BsActivity, BsExclamationTriangleFill, BsShieldShaded, BsCompass
} from 'react-icons/bs';
import {
    FaUserNurse, FaStethoscope, FaLungs, FaBaby, FaHandHoldingMedical,
    FaPhoneAlt, FaIdCard, FaUserTie, FaCheckCircle, FaClipboardCheck,
    FaBriefcaseMedical, FaHeartbeat, FaSyringe, FaWheelchair
} from 'react-icons/fa';
import {
    HOME_HEALTHCARE_CATEGORIES,
    HEALTHCARE_SERVICES_LIST,
    VERIFIED_HOME_PROVIDERS,
    SERVICE_LOCATIONS_LIST
} from '../utils/homeHealthcareData';

const TRANSLATIONS = {
    en: {
        smartHub: "Smart Hub",
        founderHotline: "Founder Helpline: +91 6200087830",
        emergencyBadge: "⚠️ EMERGENCY DISCLAIMER: Home Healthcare is NOT for critical emergencies. For life-threatening cases, call 108 or book an Ambulance immediately.",
        ambulanceLink: "Book Ambulance 🚑",
        heroBadge: "🏠 HOSPITAL-GRADE CARE AT YOUR DOORSTEP",
        heroTitle: "Sehaat Saathi Home Healthcare Services",
        heroSubtitle: "Book Certified Home Nurses, Elderly Care Attendants, Home Physiotherapy & Lab Tests at Home across Madhubani & Bihar. Verified Staff • Transparent Rates • 24/7 Support.",
        careCoordinatorTitle: "Unsure which service your patient needs?",
        careCoordinatorDesc: "Speak directly with a Sehaat Saathi Medical Care Coordinator to evaluate patient condition and recommend the best home care plan.",
        careCoordinatorBtn: "Request Free Care Coordinator Call",
        tabServices: "Browse All Services",
        tabBooking: "Book Service Wizard",
        tabProviders: "Verified Care Professionals",
        tabTracking: "Live Booking Tracker",
        searchPlaceholder: "Search services (e.g., Injection, Elder Care, Physiotherapy, ECG at home)...",
        allCategories: "All Care Categories",
        allLocations: "All Service Areas",
        startingPrice: "Starting at",
        durationLabel: "Duration:",
        includesLabel: "Service Includes:",
        bookNowBtn: "Book Service Now",
        quickInquiryBtn: "Quick Inquiry",
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
        modalTitle: "Service Details & Equipment Checklist"
    },
    hi: {
        smartHub: "स्मार्ट हब (Smart Hub)",
        founderHotline: "संस्थापक: +91 6200087830",
        emergencyBadge: "⚠️ जरूरी सूचना: होम हेल्थकेयर गंभीर इमरजेंसी के लिए नहीं है। गंभीर स्थिति में तुरंत 108 या एम्बुलेंस बुक करें।",
        ambulanceLink: "एम्बुलेंस बुक करें 🚑",
        heroBadge: "🏠 अस्पताल जैसी देखभाल अब आपके घर पर",
        heroTitle: "सेहत साथी होम हेल्थकेयर बुकिंग सर्विसेज",
        heroSubtitle: "घर पर बी.एससी नर्स, बुजुर्गों की देखभाल करने वाले अटेंडेंट, फिजियोथेरेपी डॉक्टर और लैब टेस्ट बुक करें। सत्यापित स्टाफ • सही रेट • 24 घंटे मदद।",
        careCoordinatorTitle: "क्या आपको समझ नहीं आ रहा कौन सी सेवा चाहिए?",
        careCoordinatorDesc: "हमारे मेडिकल केयर कॉर्डिनेटर से मुफ्त में बात करें और मरीज की स्थिति के अनुसार सही सेवा चुनें।",
        careCoordinatorBtn: "केयर कॉर्डिनेटर से बात करें",
        tabServices: "सभी सेवाएं देखें",
        tabBooking: "बुकिंग फॉर्म (Booking Wizard)",
        tabProviders: "सत्यापित नर्स व डॉक्टर",
        tabTracking: "लाइव केयर ट्रैकर",
        searchPlaceholder: "सेवा खोजें (जैसे: इंजेक्शन, बुजुर्ग देखभाल, फिजियोथेरेपी, ईसीजी)...",
        allCategories: "सभी प्रकार की सेवाएं",
        allLocations: "सभी जगहें (मधुबनी व आसपास)",
        startingPrice: "शुरुआती किराया",
        durationLabel: "समय अवधि:",
        includesLabel: "सेवा में क्या-क्या शामिल है:",
        bookNowBtn: "अभी बुक करें",
        quickInquiryBtn: "व्हाट्सएप पूछताछ",
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
        modalTitle: "सेवा की पूरी जानकारी"
    }
};

const HomeHealthcare = () => {
    const [language, setLanguage] = useState('hi');
    const [activeTab, setActiveTab] = useState('services'); // services, booking, providers, tracking
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
    const [showCoordinatorModal, setShowCoordinatorModal] = useState(false);
    const [activeBookingTracker, setActiveBookingTracker] = useState(null);

    const t = TRANSLATIONS[language];

    // Filter services dynamically
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
                    setPatientAddress(language === 'hi' ? `GPS लोकेशन (${lat}, ${lng}), मधुबनी, बिहार` : `GPS Position (${lat}, ${lng}), Madhubani, Bihar`);
                    setIsLocating(false);
                    toast.success(language === 'hi' ? "📍 आपका सही स्थान मिल गया है!" : "📍 GPS Location Acquired!");
                },
                () => {
                    setPatientAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
                    setIsLocating(false);
                    toast.info("📍 Location: Madhubani Central");
                }
            );
        } else {
            setPatientAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
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
            statusStage: 2, // 1: Requested, 2: Provider Assigned, 3: En Route, 4: Service Started, 5: Completed
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
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            {/* Responsive Navigation Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-3 sm:px-6 lg:px-8 py-3.5 border-t-4 border-t-emerald-500 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center gap-2">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all font-bold group text-xs sm:text-sm shrink-0">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-emerald-400 text-base sm:text-lg" />
                        <span className="truncate">{t.smartHub}</span>
                    </Link>

                    {/* Helplines & Bilingual Language Switcher */}
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <a
                            href="tel:+916200087830"
                            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg"
                        >
                            <FaPhoneAlt className="text-white text-xs" />
                            <span>{t.founderHotline}</span>
                        </a>

                        <Link
                            to="/ambulance-booking"
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg"
                        >
                            <span>{t.ambulanceLink}</span>
                        </Link>

                        {/* Real-time Bilingual Language Switch Toggle Button */}
                        <button
                            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
                            className="relative flex items-center w-[95px] sm:w-[110px] h-9 sm:h-10 bg-slate-800 rounded-full border-2 border-slate-700 p-0.5 sm:p-1 shadow-inner overflow-hidden cursor-pointer transition-all active:scale-95 shrink-0"
                        >
                            <div className={`absolute top-0.5 left-0.5 w-[44px] sm:w-[50px] h-[calc(100%-4px)] rounded-full transition-transform duration-300 shadow-md ${language === 'hi' ? 'translate-x-0 bg-gradient-to-r from-[#FF9933] to-rose-600' : 'translate-x-[46px] sm:translate-x-[52px] bg-gradient-to-r from-emerald-600 to-teal-600'}`}></div>
                            <span className={`w-1/2 text-center text-[10px] sm:text-xs font-black z-10 transition-colors ${language === 'hi' ? 'text-white' : 'text-slate-400'}`}>हिंदी</span>
                            <span className={`w-1/2 text-center text-[10px] sm:text-xs font-black z-10 transition-colors ${language === 'en' ? 'text-white' : 'text-slate-400'}`}>ENG</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-10 relative z-10 space-y-8 sm:space-y-12">

                {/* Emergency Disclaimer Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-2 text-center sm:text-left">
                        <BsExclamationTriangleFill className="text-amber-400 text-xl shrink-0" />
                        <span>{t.emergencyBadge}</span>
                    </div>
                    <Link to="/ambulance-booking" className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase shrink-0">
                        SOS Ambulance 🚑
                    </Link>
                </div>

                {/* Care Coordinator Request Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/95 via-emerald-950/80 to-slate-900/95 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden text-center md:text-left">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-3xl">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                                👨‍💼 FREE MEDICAL CONSULTATION
                            </span>
                            <h2 className="text-xl sm:text-3xl font-black text-white">{t.careCoordinatorTitle}</h2>
                            <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">{t.careCoordinatorDesc}</p>
                        </div>
                        <a
                            href="tel:+916200087830"
                            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto"
                        >
                            <FaPhoneAlt /> {t.careCoordinatorBtn}
                        </a>
                    </div>
                </div>

                {/* Hero Header */}
                <div className="text-center space-y-3 sm:space-y-4 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md">
                        <BsPatchCheckFill /> {t.heroBadge}
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                        {t.heroTitle}
                    </h1>

                    <p className="text-slate-300 max-w-3xl mx-auto text-xs sm:text-base md:text-lg font-bold leading-relaxed px-2">
                        {t.heroSubtitle}
                    </p>

                    {/* Trust Badges Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold">
                        <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <BsShieldCheck className="text-emerald-400 text-base" /> <span>{t.trustBadge1}</span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <FaSyringe className="text-cyan-400 text-base" /> <span>{t.trustBadge2}</span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <BsLightningFill className="text-amber-400 text-base" /> <span>{t.trustBadge3}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'services' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaHandHoldingMedical className="text-sm sm:text-base" /> {t.tabServices}
                        </button>
                        <button
                            onClick={() => setActiveTab('booking')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'booking' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsCalendarCheck className="text-sm sm:text-base" /> {t.tabBooking}
                        </button>
                        <button
                            onClick={() => setActiveTab('providers')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'providers' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaUserNurse className="text-sm sm:text-base" /> {t.tabProviders}
                        </button>
                        <button
                            onClick={() => setActiveTab('tracking')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'tracking' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsActivity className="text-sm sm:text-base" /> {t.tabTracking}
                        </button>
                    </div>
                </div>

                {/* TAB 1: BROWSE ALL HEALTHCARE SERVICES */}
                {activeTab === 'services' && (
                    <div className="space-y-8">
                        
                        {/* Categories Cards Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {HOME_HEALTHCARE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'ALL' : cat.id)}
                                    className={`p-5 rounded-3xl border text-left transition-all flex flex-col justify-between group ${selectedCategory === cat.id ? 'bg-emerald-600/10 border-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl">{cat.icon}</span>
                                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                                                {cat.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-black text-base text-white group-hover:text-emerald-400 transition-colors">
                                            {language === 'hi' ? cat.titleHi : cat.titleEn}
                                        </h3>
                                        <p className="text-xs text-slate-400 line-clamp-3">
                                            {language === 'hi' ? cat.descHi : cat.descEn}
                                        </p>
                                    </div>
                                    <div className="pt-3 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                        <span>{selectedCategory === cat.id ? '✓ Filter Active' : 'Explore Category →'}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 relative">
                                    <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="ALL">{t.allCategories}</option>
                                        <option value="nursing">👩‍⚕️ Nursing & Patient Care</option>
                                        <option value="elderly">👴 Elder & Assisted Care</option>
                                        <option value="diagnostics">🧪 Home Diagnostics & Lab</option>
                                        <option value="physio">🦾 Home Physiotherapy & Rehab</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredServices.map((srv) => {
                                const srvTitle = language === 'hi' ? srv.titleHi : srv.titleEn;
                                const srvIncludes = language === 'hi' ? srv.includesHi : srv.includesEn;

                                return (
                                    <div
                                        key={srv.id}
                                        className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-6 group"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shrink-0">
                                                        {srv.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-lg text-white group-hover:text-emerald-400 transition-colors">
                                                            {srvTitle}
                                                        </h4>
                                                        <p className="text-xs text-slate-400 font-bold">{t.durationLabel} {srv.duration}</p>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                                    {srv.badge}
                                                </span>
                                            </div>

                                            {/* Price Badge */}
                                            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                                                <span className="text-xs text-slate-400 font-bold">{t.startingPrice}</span>
                                                <div className="text-right">
                                                    <span className="text-2xl font-black text-emerald-400">₹{srv.startingPrice}</span>
                                                    <span className="text-[10px] text-slate-400 block font-bold">/ {srv.priceUnit}</span>
                                                </div>
                                            </div>

                                            {/* Checklist */}
                                            <div className="space-y-2">
                                                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.includesLabel}</h5>
                                                <div className="space-y-1.5">
                                                    {srvIncludes.map((inc, i) => (
                                                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                            <BsCheckLg className="text-emerald-400 mt-0.5 shrink-0" />
                                                            <span>{inc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action CTA */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(srv);
                                                    setActiveTab('booking');
                                                }}
                                                className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
                                            >
                                                <BsCalendarCheck /> {t.bookNowBtn}
                                            </button>
                                            <button
                                                onClick={() => setSelectedModalService(srv)}
                                                className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 border border-slate-700"
                                            >
                                                <span>Details</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 2: INTERACTIVE BOOKING WIZARD */}
                {activeTab === 'booking' && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <form onSubmit={handleBookingSubmit} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                            <h3 className="text-2xl font-black uppercase text-white tracking-wide border-b border-slate-800 pb-4">
                                {t.bookingTitle}
                            </h3>

                            {/* Step 1: Select Service */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider">{t.step1Title}</h4>
                                <select
                                    value={selectedService.id}
                                    onChange={(e) => {
                                        const s = HEALTHCARE_SERVICES_LIST.find(x => x.id === e.target.value);
                                        if (s) setSelectedService(s);
                                    }}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                >
                                    {HEALTHCARE_SERVICES_LIST.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {language === 'hi' ? s.titleHi : s.titleEn} (₹{s.startingPrice} / {s.priceUnit})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Step 2: Date & Time Slot */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">{t.step2Title}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-2">Select Date</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-2">Select Preferred Time Slot</label>
                                        <select
                                            value={selectedTimeSlot}
                                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
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
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider">{t.step3Title}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.patientNameLabel}</label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            placeholder="Patient Name"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.patientPhoneLabel}</label>
                                        <input
                                            type="tel"
                                            value={patientPhone}
                                            onChange={(e) => setPatientPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
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
                                        placeholder="House No, Street, Ward No, Village Name, Madhubani..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Summary Box */}
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Selected Service</span>
                                    <span className="font-bold text-white">{language === 'hi' ? selectedService.titleHi : selectedService.titleEn}</span>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Estimated Tariff</span>
                                    <span className="font-bold text-emerald-400 text-lg">₹{selectedService.startingPrice}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-3"
                            >
                                <FaHandHoldingMedical className="text-xl" />
                                <span>{t.confirmBookingBtn}</span>
                            </button>
                        </form>
                    </div>
                )}

                {/* TAB 3: VERIFIED CARE PROFESSIONALS SHOWCASE */}
                {activeTab === 'providers' && (
                    <div className="space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <h3 className="text-2xl font-black text-white uppercase">Verified Healthcare Professionals</h3>
                            <p className="text-xs text-slate-400 font-bold">100% Verified Nurses, Physiotherapists & Elder Care Attendants in Madhubani & Bihar.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VERIFIED_HOME_PROVIDERS.map((prv) => (
                                <div key={prv.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-center flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
                                    <div className="space-y-3">
                                        <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-emerald-500 shadow-xl">
                                            <img src={prv.photo} alt={prv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {prv.badge}
                                            </span>
                                            <h4 className="font-black text-lg text-white mt-2">{prv.name}</h4>
                                            <p className="text-xs font-bold text-amber-400">{language === 'hi' ? prv.roleHi : prv.roleEn}</p>
                                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{prv.qualification}</p>
                                            <p className="text-xs text-emerald-400 font-bold mt-1">{prv.experience} • ⭐ {prv.rating}</p>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-1 pt-2">
                                            {prv.skills.map((sk, skidx) => (
                                                <span key={skidx} className="text-[9px] font-bold text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                                                    ✓ {sk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href="tel:+916200087830"
                                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                    >
                                        <FaPhoneAlt /> Book Provider
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: LIVE BOOKING TRACKER */}
                {activeTab === 'tracking' && (
                    <div className="max-w-3xl mx-auto space-y-8">
                        {activeBookingTracker ? (
                            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase border border-emerald-500/20">
                                    🟢 Booking ID: {activeBookingTracker.id}
                                </div>

                                <h3 className="text-2xl font-black text-white">{activeBookingTracker.serviceName}</h3>
                                <p className="text-xs text-slate-400 font-bold">Scheduled for: {activeBookingTracker.date} ({activeBookingTracker.timeSlot})</p>

                                {/* 5 Stage Status Timeline */}
                                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                                    <div className="space-y-1">
                                        <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center">✓</div>
                                        <span className="text-emerald-400">1. Request Sent</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center animate-pulse">2</div>
                                        <span className="text-emerald-400">2. Coordinator Assigned</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">3</div>
                                        <span className="text-slate-500">3. En Route</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">4</div>
                                        <span className="text-slate-500">4. Service Started</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">5</div>
                                        <span className="text-slate-500">5. Completed</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                                    <p className="text-slate-400">Assigned Nurse/Provider: <strong className="text-white">{activeBookingTracker.assignedProvider.name}</strong> ({activeBookingTracker.assignedProvider.qualification})</p>
                                    <p className="text-slate-400">Patient Address: <strong className="text-white">{activeBookingTracker.patientAddress}</strong></p>
                                    <p className="text-slate-400">Helpline: <strong className="text-emerald-400">+91 6200087830</strong></p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-10 text-center space-y-4">
                                <BsActivity className="text-5xl text-emerald-400 mx-auto" />
                                <h3 className="text-xl font-black text-white">No Active Home Care Bookings Yet</h3>
                                <p className="text-xs text-slate-400 font-bold">Select a service and fill the booking form to initiate live care tracking.</p>
                                <button
                                    onClick={() => setActiveTab('booking')}
                                    className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase"
                                >
                                    Book First Service
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>

            {/* SERVICE SPECIFICATION MODAL */}
            {selectedModalService && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 text-white rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
                        <button
                            onClick={() => setSelectedModalService(null)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 text-2xl"
                        >
                            <BsXCircleFill />
                        </button>

                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400">
                                {selectedModalService.badge}
                            </span>
                            <h3 className="text-2xl font-black text-white">{language === 'hi' ? selectedModalService.titleHi : selectedModalService.titleEn}</h3>
                            <p className="text-xs font-bold text-emerald-400 font-mono">Tariff: ₹{selectedModalService.startingPrice} / {selectedModalService.priceUnit} • Duration: {selectedModalService.duration}</p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase text-slate-400">{t.includesLabel}</h4>
                            <div className="space-y-2">
                                {(language === 'hi' ? selectedModalService.includesHi : selectedModalService.includesEn).map((inc, i) => (
                                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                                        <BsCheckLg className="text-emerald-400 shrink-0" />
                                        <span>{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <button
                                onClick={() => {
                                    setSelectedService(selectedModalService);
                                    setSelectedModalService(null);
                                    setActiveTab('booking');
                                }}
                                className="py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
                            >
                                <BsCalendarCheck /> Book This Service
                            </button>
                            <a
                                href="tel:+916200087830"
                                className="py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 border border-slate-700"
                            >
                                <FaPhoneAlt /> Call Founder
                            </a>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomeHealthcare;
