import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsDropletFill, BsShieldCheck, BsStarFill,
    BsCalendarCheck, BsClockHistory, BsCheckLg, BsTelephoneFill,
    BsWhatsapp, BsSearch, BsFilter, BsGeoAltFill, BsPersonFill,
    BsPatchCheckFill, BsSuitHeartFill, BsXCircleFill, BsLightningFill,
    BsActivity, BsExclamationTriangleFill, BsShieldShaded, BsCompass,
    BsPhoneVibrate, BsHeadset, BsLightningChargeFill, BsFillTelephoneOutboundFill,
    BsHeartPulseFill, BsAwardFill, BsHospitalFill, BsBuilding, BsCheckCircleFill,
    BsPersonPlusFill, BsChatQuoteFill, BsInfoCircleFill, BsQuote, BsPrinterFill,
    BsQrCodeScan, BsSnow, BsSpeedometer
} from 'react-icons/bs';
import {
    FaPhoneAlt, FaAmbulance, FaUserNurse, FaHandHoldingHeart, FaBurn,
    FaClinicMedical, FaMedkit, FaHeartbeat, FaSearchLocation, FaHandHoldingMedical,
    FaHeart, FaShieldAlt, FaUserCheck, FaHandsHelping, FaHospitalUser
} from 'react-icons/fa';
import {
    HELPLINE_NUMBERS,
    EMOTIONAL_MOTIVATIONS,
    IMPACT_STATS,
    DISPATCH_SLAS,
    HOSPITAL_PARTNER_BENEFITS,
    BLOOD_GROUPS,
    BLOOD_COMPONENTS,
    DEMO_BLOOD_BANKS_STOCK,
    VOLUNTARY_DONORS_LIST,
    REAL_SUCCESS_STORIES
} from '../utils/bloodBankData';

const TRANSLATIONS = {
    en: {
        smartHub: "Smart Hub",
        founderHotline: "Blood Helpline",
        emergencyBadge: "⚠️ DISCLAIMER: Demo Stock Data shown for demonstration. Sehaat Saathi team verifies live stock & coordinates blood dispatch personally with authorized blood banks upon your request.",
        honestPromiseTitle: "OUR SACRED COMMITMENT & HONEST PROMISE",
        honestPromiseText: "We make no fake claims of guaranteed 100% stock in every rare situation, but we promise 1000% effort from Sehaat Saathi ground team! We will knock every blood bank door and reach every volunteer donor on the ground to save your patient.",
        ambulanceLink: "Book Ambulance 🚑",
        heroBadge: "🩸 रक्तदान महा-कल्याण • SACRED LIFE SAVING NETWORK",
        heroTitle: "Sehaat Saathi Emergency Blood Assistance",
        heroSubtitle: "No patient will lose life due to blood shortage! Sehaat Saathi ground coordinators personally arrange blood units from verified blood banks and registered voluntary donors across Madhubani, Darbhanga & Bihar.",
        missionTitle: "FOUNDER VISION — ZERO DEATHS DUE TO BLOOD SHORTAGE",
        missionDesc: "Every life is precious. Our dedicated 24/7 emergency team works on the ground to coordinate with government Sadar Hospitals, DMCH, Red Cross centers, and registered youth donors to dispatch blood to your patient in minutes.",
        tabRequest: "Urgent Blood Request",
        tabStock: "Demo Stock Availability",
        tabDonors: "Voluntary Donor Network",
        tabPartnership: "Hospital & Doctor Portal",
        tabCompatibility: "Blood Compatibility Guide",
        tabTracking: "Live Request Tracker",
        selectGroupLabel: "Select Required Blood Group *",
        unitsLabel: "Number of Units Required",
        componentLabel: "Blood Component Needed",
        hospitalLabel: "Patient Hospital & City *",
        patientNameLabel: "Patient Full Name",
        attendantPhoneLabel: "Attendant Contact Mobile Number *",
        submitRequestBtn: "SUBMIT URGENT BLOOD REQUEST TO SEHAAT SAATHI",
        registerDonorTitle: "Become a Sehaat Saathi Volunteer Donor",
        registerDonorBtn: "Register as Hero Donor 🩸",
        stockTitle: "Real-World Blood Availability (Demo Stock Data)",
        stockSubtitle: "Clearly labeled demo data for illustration. Real live stock will be verified personally by our ground coordinator.",
        filterGroupLabel: "Filter Stock by Blood Group:",
        allGroups: "All Blood Groups",
        contactModalTitle: "Sehaat Saathi Emergency Blood Helplines"
    },
    hi: {
        smartHub: "स्मार्ट हब (Smart Hub)",
        founderHotline: "ब्लड हेल्पलाइन",
        emergencyBadge: "⚠️ जरूरी सूचना: यह डेमो स्टॉक डेटा है। आपकी रिक्वेस्ट मिलते ही सेहत साथी की टीम तुरंत अधिकृत ब्लड बैंकों और डोनर्स से संपर्क कर खून का इंतजाम करवाती है।",
        honestPromiseTitle: "सेहत साथी का पवित्र संकल्प व सच्चा वादा (100% HONEST PLEDGE)",
        honestPromiseText: "हम यह 100% झूठा दावा नहीं करते कि हर स्थिति में तुरंत खून मिल ही जाएगा, लेकिन हम यह 1000% वादा करते हैं कि सेहत साथी टीम मरीज की जान बचाने के लिए अपना 100% पूरा जोर (Full Ground Effort) लगा देगी! हम मधुबनी व बिहार के हर ब्लड बैंक और डोनर के दरवाजे पर जाकर खून का इंतजाम करने का पूरा प्रयास करेंगे।",
        ambulanceLink: "एम्बुलेंस बुक करें 🚑",
        heroBadge: "🩸 रक्तदान महा-कल्याण • एक बूँद रक्त, एक नया जीवन!",
        heroTitle: "सेहत साथी इमरजेंसी ब्लड बैंक सर्विसेज",
        heroSubtitle: "कोई भी मरीज खून की कमी से अपनी जान नहीं गंवाएगा! सेहत साथी की टीम मधुबनी, दरभंगा व बिहार के प्रमुख ब्लड बैंकों और वॉलिएंटियर डोनर्स से सीधे संपर्क करके मरीज के लिए तुरंत रक्त उपलब्ध करवाती है।",
        missionTitle: "संस्थापक का संकल्प — खून की कमी से कोई जान नहीं गंवाएगा",
        missionDesc: "हर जीवन अनमोल है! सेहत साथी की ग्राउंड टीम 24 घंटे सदर अस्पताल, डीएमसीएच, रेड क्रॉस और पंजीकृत युवा रक्तदाताओं से सीधे संपर्क बनाकर आपके मरीज के लिए खून का पक्का इंतजाम करने का प्रयास करती है।",
        tabRequest: "आपातकालीन ब्लड रिक्वेस्ट",
        tabStock: "ब्लड बैंक स्टॉक (Demo Data)",
        tabDonors: "वॉलिएंटियर डोनर्स नेटवर्क",
        tabPartnership: "अस्पताल व डॉक्टर पोर्टल",
        tabCompatibility: "ब्लड ग्रुप गाइड व नियम",
        tabTracking: "लाइव रिक्वेस्ट स्टेटस",
        selectGroupLabel: "आवश्यक ब्लड ग्रुप चुनें *",
        unitsLabel: "कितनी यूनिट खून चाहिए",
        componentLabel: "खून का प्रकार (Component)",
        hospitalLabel: "मरीज का अस्पताल व शहर *",
        patientNameLabel: "मरीज का नाम",
        attendantPhoneLabel: "अटेंडेंट का मोबाइल नंबर *",
        submitRequestBtn: "आपातकालीन ब्लड रिक्वेस्ट तुरंत भेजें (SUBMIT REQUEST)",
        registerDonorTitle: "सेहत साथी वॉलिएंटियर रक्तदाता बनें",
        registerDonorBtn: "ब्लड डोनर के रूप में जुड़ें 🩸",
        stockTitle: "ब्लड बैंक में उपलब्ध स्टॉक (डेमो डेटा)",
        stockSubtitle: "यह केवल प्रदर्शित डेमो स्टॉक डेटा है। आपकी रिक्वेस्ट आते ही हमारी टीम लाइव स्टॉक सत्यापित करके ब्लड भिजवाती है।",
        filterGroupLabel: "ब्लड ग्रुप से स्टॉक खोजें:",
        allGroups: "सभी ब्लड ग्रुप्स",
        contactModalTitle: "सेहत साथी इमरजेंसी ब्लड हेल्पलाइन"
    }
};

const BloodBankHub = () => {
    const [language, setLanguage] = useState('hi');
    const [activeTab, setActiveTab] = useState('request');
    const [selectedGroup, setSelectedGroup] = useState('O+');
    const [units, setUnits] = useState('1 Unit');
    const [selectedComponent, setSelectedComponent] = useState('whole');
    const [hospitalName, setHospitalName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [attendantPhone, setAttendantPhone] = useState('');
    const [filterStockGroup, setFilterStockGroup] = useState('ALL');
    const [showContactModal, setShowContactModal] = useState(false);
    const [showDonorModal, setShowDonorModal] = useState(false);
    const [activeBloodRequest, setActiveBloodRequest] = useState(null);

    // Volunteer Donor Registration Form State
    const [donorName, setDonorName] = useState('');
    const [donorGroup, setDonorGroup] = useState('O+');
    const [donorPhone, setDonorPhone] = useState('');
    const [donorLocation, setDonorLocation] = useState('');

    const t = TRANSLATIONS[language];

    const handleBloodRequestSubmit = (e) => {
        e.preventDefault();
        if (!attendantPhone.trim()) {
            toast.error(language === 'hi' ? "कृपया मोबाइल नंबर दर्ज करें!" : "Please enter contact mobile number!");
            return;
        }
        if (!hospitalName.trim()) {
            toast.error(language === 'hi' ? "कृपया अस्पताल का नाम दर्ज करें!" : "Please enter hospital name!");
            return;
        }

        const newRequest = {
            id: 'BLD-' + Math.floor(100000 + Math.random() * 900000),
            group: selectedGroup,
            units,
            component: selectedComponent,
            patientName: patientName || 'Patient',
            attendantPhone,
            hospitalName,
            statusStage: 2,
            requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setActiveBloodRequest(newRequest);
        setActiveTab('tracking');
        toast.success(language === 'hi' ? "🎉 ब्लड रिक्वेस्ट दर्ज हो गई है! सेहत साथी टीम तुरंत संपर्क कर रही है।" : "🎉 Urgent Blood Request Registered!");
    };

    const handleDonorRegistrationSubmit = (e) => {
        e.preventDefault();
        if (!donorName.trim() || !donorPhone.trim()) {
            toast.error(language === 'hi' ? "कृपया सभी जानकारी भरें!" : "Please fill all donor details!");
            return;
        }
        toast.success(language === 'hi' ? "❤️ धन्यवाद! आप सेहत साथी वॉलिएंटियर डोनर नेटवर्क में शामिल हो गए हैं।" : "❤️ Thank you! Registered as Sehaat Saathi Volunteer Donor!");
        setShowDonorModal(false);
        setDonorName('');
        setDonorPhone('');
        setDonorLocation('');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rose-500/30 overflow-x-hidden relative">
            
            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-600/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            {/* Responsive Navigation Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-2.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 border-t-4 border-t-rose-500 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center gap-1.5 sm:gap-3">
                    <Link to="/smarthub" className="flex items-center gap-1.5 sm:gap-2 text-slate-300 hover:text-white transition-all font-bold group text-xs sm:text-sm shrink-0">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-rose-400 text-sm sm:text-lg" />
                        <span className="truncate">{t.smartHub}</span>
                    </Link>

                    {/* Helplines & Bilingual Language Switcher */}
                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <button
                            onClick={() => setShowDonorModal(true)}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black shadow-lg"
                        >
                            <BsPersonPlusFill />
                            <span>{t.registerDonorBtn}</span>
                        </button>

                        <button
                            onClick={() => setShowContactModal(true)}
                            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg animate-pulse"
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
                            <div className={`absolute top-0.5 left-0.5 w-[38px] sm:w-[50px] h-[calc(100%-4px)] rounded-full transition-transform duration-300 shadow-md ${language === 'hi' ? 'translate-x-0 bg-gradient-to-r from-[#FF9933] to-rose-600' : 'translate-x-[42px] sm:translate-x-[52px] bg-gradient-to-r from-rose-600 to-red-600'}`}></div>
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
                        <BsDropletFill className="text-rose-400 text-xl sm:text-2xl shrink-0 animate-bounce" />
                        <span className="leading-relaxed">
                            <strong className="text-rose-400 font-black">⚠️ जरूरी सूचना:</strong> यह डेमो स्टॉक डेटा है। आपकी रिक्वेस्ट मिलते ही सेहत साथी की टीम तुरंत अधिकृत ब्लड बैंकों और डोनर्स से संपर्क कर खून का इंतजाम करवाती है।
                        </span>
                    </div>
                    <button
                        onClick={() => setShowContactModal(true)}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shrink-0 shadow-xl flex items-center justify-center gap-2 text-center"
                    >
                        <BsTelephoneFill />
                        <span>Emergency Call</span>
                    </button>
                </div>

                {/* TRANSPARENT COMMITMENT & HONEST PROMISE BOX WITH BOLD HIGHLIGHTS */}
                <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-2xl space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 font-black text-xs sm:text-sm uppercase tracking-wider">
                        <BsCheckCircleFill className="text-base text-emerald-400" />
                        <span>{t.honestPromiseTitle}</span>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm font-bold leading-relaxed">
                        हम यह <strong className="text-amber-400 font-black underline">100% झूठा दावा नहीं करते</strong> कि हर स्थिति में तुरंत खून मिल ही जाएगा, लेकिन हम यह <strong className="text-emerald-400 font-black underline">1000% वादा करते हैं</strong> कि सेहत साथी टीम मरीज की जान बचाने के लिए अपना <strong className="text-emerald-300 font-black">100% पूरा जोर (Full Ground Effort)</strong> लगा देगी! हम मधुबनी व बिहार के हर ब्लड बैंक और डोनर के दरवाजे पर जाकर खून का इंतजाम करने का पूरा प्रयास करेंगे।
                    </p>
                </div>

                {/* REAL-TIME EMERGENCY COLD-CHAIN DISPATCH SLA COUNTERS WITH BOLD HIGHLIGHTS */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-3 shadow-xl">
                    <div className="flex items-center gap-2 text-rose-400 text-xs sm:text-sm font-black uppercase tracking-wider">
                        <BsSpeedometer className="text-base animate-pulse" />
                        <span><strong className="text-white font-black">Sehaat Saathi Cold-Chain Dispatch Response SLA Time</strong></span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                        {DISPATCH_SLAS.map((sla, sidx) => (
                            <div key={sidx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-400 font-bold block uppercase">{language === 'hi' ? sla.areaHi : sla.areaEn}</span>
                                    <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">{sla.time}</span>
                                </div>
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                    {sla.badge}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LIVE IMPACT COUNTERS BAR */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                    {IMPACT_STATS.map((st, sidx) => (
                        <div key={sidx} className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-center space-y-1 shadow-xl">
                            <span className="text-2xl sm:text-3xl font-black text-rose-500 font-mono block">{st.value}</span>
                            <span className="text-[10px] sm:text-xs font-bold text-slate-300 block uppercase">
                                {language === 'hi' ? st.labelHi : st.labelEn}
                            </span>
                        </div>
                    ))}
                </div>

                {/* FOUNDER MISSION STATEMENT WOW BANNER WITH BOLD HIGHLIGHTS */}
                <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 border-2 border-rose-500/60 shadow-2xl text-center md:text-left relative overflow-hidden space-y-3 sm:space-y-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="space-y-2 sm:space-y-3 max-w-3xl">
                            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] sm:text-xs font-black uppercase border border-rose-500/40 inline-flex items-center gap-2">
                                <FaHeart className="text-rose-500 animate-pulse text-xs sm:text-sm" /> {t.missionTitle}
                            </span>
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                                {language === 'hi' ? 'कोई भी मरीज खून के अभाव में जान नहीं गंवाएगा — यही है सेहत साथी का मिशन' : 'No Patient Will Lose Life Due to Blood Shortage — The Sehaat Saathi Commitment'}
                            </h2>
                            <p className="text-slate-200 text-xs sm:text-sm font-bold leading-relaxed">
                                <strong className="text-rose-400 font-black">हर जीवन अनमोल है!</strong> सेहत साथी की ग्राउंड टीम <strong className="text-emerald-400 font-black">24 घंटे सदर अस्पताल, डीएमसीएच, रेड क्रॉस व पंजीकृत युवा डोनर्स</strong> से संपर्क बनाकर आपके मरीज के लिए खून का पक्का इंतजाम करती है।
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto">
                            <button
                                onClick={() => setShowDonorModal(true)}
                                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                            >
                                <BsPersonPlusFill className="text-base" /> {t.registerDonorBtn}
                            </button>
                            <a
                                href="https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20Urgent%20Blood%20Assistance%20Required!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 border border-green-500/40 font-black text-[11px] sm:text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                            >
                                <BsWhatsapp className="text-base" /> Founder WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* EMOTIONAL MOTIVATIONS GRID */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="text-center space-y-1">
                        <span className="px-3 sm:px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            🚩 "रक्तदान महा-कल्याण — एक बूँद रक्त, एक नया जीवन!"
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black text-white uppercase">
                            {language === 'hi' ? 'मानवता व जीवन रक्षा के लिए सेहत साथी का संदेश' : 'Sehaat Saathi Message of Hope & Humanity'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                        {EMOTIONAL_MOTIVATIONS.map((m, midx) => (
                            <div key={midx} className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 shadow-xl space-y-2.5 sm:space-y-3 flex flex-col justify-between hover:border-rose-500 transition-all">
                                <div className="space-y-2">
                                    <BsQuote className="text-2xl sm:text-3xl text-rose-500 opacity-80" />
                                    <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed italic">
                                        "{language === 'hi' ? m.quoteHi : m.quoteEn}"
                                    </p>
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-black text-rose-400 block pt-2 border-t border-slate-800">
                                    {m.author}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RARE BLOOD GROUP EMERGENCY SOS DESK (O- / AB- / A- / B-) */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-900/90 border-2 border-amber-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                        <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg sm:text-xl shrink-0">
                            🚨
                        </span>
                        <div>
                            <h4 className="font-black text-sm sm:text-base text-amber-400 uppercase">
                                {language === 'hi' ? 'रेयर ब्लड ग्रुप इमरजेंसी डेस्क (O-Negative / AB-Negative / A- / B-)' : 'RARE BLOOD GROUP EMERGENCY SOS DESK'}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-300 font-bold">
                                {language === 'hi' ? 'दुर्लभ रक्त समूह (O- negative) की तुरंत ज़रूरत होने पर स्पेशल वॉलिएंटियर डोनर टीम को अलर्ट करें।' : 'For rare negative blood groups, our dedicated rare donor alert team dispatches donors directly.'}
                            </p>
                        </div>
                    </div>

                    <a
                        href="tel:+916200087830"
                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2"
                    >
                        <FaPhoneAlt /> Call Rare Blood Desk
                    </a>
                </div>

                {/* Prominent 4 Helplines Glassmorphic Top Bar with Dual Triggers */}
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border-2 border-rose-500/30 shadow-2xl space-y-3 sm:space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-slate-800 pb-3 sm:pb-4 text-center md:text-left">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-rose-400 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                                <BsPhoneVibrate className="animate-bounce text-sm sm:text-base" />
                                <span>Need Blood Urgently? Call Sehaat Saathi Emergency Blood Assistance</span>
                            </div>
                            <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                                {language === 'hi' ? 'किसी भी ब्लड ग्रुप हेतु सीधे संस्थापक या सहायता टीम से संपर्क करें:' : 'Call or WhatsApp Founder Helpline for Immediate Blood Dispatch:'}
                            </h3>
                        </div>

                        <button
                            onClick={() => setShowContactModal(true)}
                            className="w-full md:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 shrink-0"
                        >
                            <BsHeadset className="text-base" /> {t.contactModalTitle}
                        </button>
                    </div>

                    {/* 4 Numbers Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                        {HELPLINE_NUMBERS.map((h, hidx) => (
                            <div key={hidx} className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-rose-500/50 transition-all">
                                <div>
                                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase">
                                        {language === 'hi' ? h.labelHi : h.labelEn}
                                    </span>
                                    <span className="font-mono font-black text-white text-xs sm:text-sm">{h.number}</span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <a
                                        href={`tel:${h.cleanNo}`}
                                        className="w-8 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center text-xs shadow-md"
                                        title="Direct Phone Call"
                                    >
                                        <FaPhoneAlt />
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=${h.cleanNo}&text=Hello%20Sehaat%20Saathi%2C%20Urgent%20Blood%20Assistance%20Required!`}
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

                {/* Hero Header */}
                <div className="text-center space-y-2 sm:space-y-4 relative">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 border border-slate-800 text-rose-400 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md">
                        <BsDropletFill className="text-rose-500" /> {t.heroBadge}
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                        {t.heroTitle}
                    </h1>

                    <p className="text-slate-300 max-w-3xl mx-auto text-xs sm:text-base md:text-lg font-bold leading-relaxed px-1">
                        {t.heroSubtitle}
                    </p>
                </div>

                {/* Scrollable Navigation Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto scrollbar-none overscroll-contain">
                        <button
                            onClick={() => setActiveTab('request')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'request' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsExclamationTriangleFill className="text-xs sm:text-base" /> {t.tabRequest}
                        </button>
                        <button
                            onClick={() => setActiveTab('stock')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'stock' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsHospitalFill className="text-xs sm:text-base" /> {t.tabStock}
                        </button>
                        <button
                            onClick={() => setActiveTab('donors')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'donors' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaHandHoldingHeart className="text-xs sm:text-base" /> {t.tabDonors}
                        </button>
                        <button
                            onClick={() => setActiveTab('partnership')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'partnership' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaHospitalUser className="text-xs sm:text-base" /> {t.tabPartnership}
                        </button>
                        <button
                            onClick={() => setActiveTab('compatibility')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'compatibility' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsInfoCircleFill className="text-xs sm:text-base" /> {t.tabCompatibility}
                        </button>
                        <button
                            onClick={() => setActiveTab('tracking')}
                            className={`px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'tracking' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsActivity className="text-xs sm:text-base" /> {t.tabTracking}
                        </button>
                    </div>
                </div>

                {/* TAB 1: URGENT BLOOD REQUEST FORM */}
                {activeTab === 'request' && (
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        <form onSubmit={handleBloodRequestSubmit} className="bg-slate-900/90 border-2 border-rose-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 sm:p-10 shadow-2xl space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3 sm:pb-4">
                                <BsDropletFill className="text-2xl sm:text-3xl text-rose-500 animate-pulse shrink-0" />
                                <div>
                                    <h3 className="text-lg sm:text-2xl font-black uppercase text-white tracking-wide">
                                        🚨 {language === 'hi' ? 'आपातकालीन ब्लड असिस्टेंस रिक्वेस्ट' : 'URGENT BLOOD ASSISTANCE REQUEST'}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-bold">Sehaat Saathi team coordinates ground blood stock in minutes across Madhubani & Bihar.</p>
                                </div>
                            </div>

                            {/* Select Blood Group Selector */}
                            <div className="space-y-2.5 sm:space-y-3">
                                <label className="text-xs sm:text-sm font-black text-rose-400 uppercase tracking-wider block">{t.selectGroupLabel}</label>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                    {BLOOD_GROUPS.map((bg) => (
                                        <button
                                            type="button"
                                            key={bg.group}
                                            onClick={() => setSelectedGroup(bg.group)}
                                            className={`p-2 sm:p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${selectedGroup === bg.group ? 'bg-rose-600 border-rose-400 text-white font-black scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                                        >
                                            <span className="text-sm sm:text-lg font-black">{bg.group}</span>
                                            <span className="text-[8px] font-bold opacity-80">{bg.rarity}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Component */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1.5">{t.unitsLabel}</label>
                                    <select
                                        value={units}
                                        onChange={(e) => setUnits(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                                    >
                                        <option value="1 Unit">1 Unit (1 यूनिट)</option>
                                        <option value="2 Units">2 Units (2 यूनिट)</option>
                                        <option value="3+ Units">3+ Units (3 या अधिक यूनिट)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1.5">{t.componentLabel}</label>
                                    <select
                                        value={selectedComponent}
                                        onChange={(e) => setSelectedComponent(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                                    >
                                        {BLOOD_COMPONENTS.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {language === 'hi' ? c.labelHi : c.labelEn}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Hospital & Attendant */}
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1">{t.hospitalLabel}</label>
                                    <input
                                        type="text"
                                        value={hospitalName}
                                        onChange={(e) => setHospitalName(e.target.value)}
                                        placeholder="e.g. Madhubani Sadar Hospital / DMCH Darbhanga / PMCH Patna"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.patientNameLabel}</label>
                                        <input
                                            type="text"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            placeholder="Patient Full Name"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-300 block mb-1">{t.attendantPhoneLabel}</label>
                                        <input
                                            type="tel"
                                            value={attendantPhone}
                                            onChange={(e) => setAttendantPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                            >
                                <BsDropletFill className="text-lg sm:text-xl text-white" />
                                <span>{t.submitRequestBtn}</span>
                            </button>
                        </form>

                        {/* REAL SUCCESS STORIES SHOWCASE */}
                        <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                            <div className="text-center space-y-1">
                                <h4 className="text-base sm:text-xl font-black text-white uppercase">
                                    {language === 'hi' ? '❤️ हाल ही में बचाई गई अनमोल जानें (Recent Success Stories)' : '❤️ Lives Saved Recently by Sehaat Saathi'}
                                </h4>
                                <p className="text-xs text-slate-400 font-bold">Real assistance provided in Madhubani & Darbhanga hospitals.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {REAL_SUCCESS_STORIES.map(st => (
                                    <div key={st.id} className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500/20 text-rose-300">
                                                Group: {st.group}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-mono">{st.timeAgo}</span>
                                        </div>
                                        <h5 className="font-black text-sm text-white">{st.patientName} ({st.location})</h5>
                                        <p className="text-xs text-slate-300 leading-relaxed font-bold">
                                            "{language === 'hi' ? st.storyHi : st.storyEn}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: DEMO BLOOD STOCK AVAILABILITY */}
                {activeTab === 'stock' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">{t.stockTitle}</h3>
                            <p className="text-xs text-slate-400 font-bold px-2">{t.stockSubtitle}</p>
                        </div>

                        {/* Filter Bar */}
                        <div className="flex justify-center items-center gap-3">
                            <span className="text-xs font-bold text-slate-300">{t.filterGroupLabel}</span>
                            <select
                                value={filterStockGroup}
                                onChange={(e) => setFilterStockGroup(e.target.value)}
                                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                            >
                                <option value="ALL">{t.allGroups}</option>
                                {BLOOD_GROUPS.map(bg => (
                                    <option key={bg.group} value={bg.group}>{bg.group}</option>
                                ))}
                            </select>
                        </div>

                        {/* Blood Bank Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {DEMO_BLOOD_BANKS_STOCK.map((bb) => (
                                <div key={bb.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 hover:border-rose-500/40 transition-all">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                {bb.statusTag}
                                            </span>
                                            <h4 className="font-black text-base sm:text-lg text-white mt-1">{bb.name}</h4>
                                            <p className="text-xs font-bold text-slate-400">{bb.city} • {bb.distance} away</p>
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-mono">Updated: {bb.lastUpdated}</span>
                                    </div>

                                    {/* Stock Grid */}
                                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-2 border-t border-slate-800">
                                        {Object.entries(bb.stock).map(([grp, qty]) => {
                                            if (filterStockGroup !== 'ALL' && filterStockGroup !== grp) return null;
                                            return (
                                                <div key={grp} className={`p-2 rounded-xl text-center border ${qty > 0 ? 'bg-slate-950 border-slate-800' : 'bg-red-950/20 border-red-900/40 opacity-50'}`}>
                                                    <span className="text-xs font-black text-rose-400 block">{grp}</span>
                                                    <span className="text-[10px] font-bold text-white">{qty} Units</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <a
                                            href={`tel:${bb.contact}`}
                                            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1"
                                        >
                                            <FaPhoneAlt /> Call Center
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20blood%20from%20${encodeURIComponent(bb.name)}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-green-400 border border-slate-700 font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1"
                                        >
                                            <BsWhatsapp /> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: VOLUNTARY DONOR NETWORK WITH HONOR BADGES */}
                {activeTab === 'donors' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">Voluntary Blood Donors Network & Honor Wall</h3>
                            <p className="text-xs text-slate-400 font-bold px-2">Verified local heroes ready to donate blood in Madhubani & nearby areas.</p>
                            <button
                                onClick={() => setShowDonorModal(true)}
                                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase shadow-lg inline-flex items-center gap-2 mt-2"
                            >
                                <BsPersonPlusFill /> {t.registerDonorBtn}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {VOLUNTARY_DONORS_LIST.map((dn) => (
                                <div key={dn.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-3 text-center flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                            {dn.badge}
                                        </span>
                                        <div className="w-14 h-14 mx-auto rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 text-xl font-black">
                                            {dn.group}
                                        </div>
                                        <h4 className="font-black text-base text-white">{dn.name}</h4>
                                        <p className="text-xs text-slate-400 font-bold">{dn.location}</p>
                                        <p className="text-[10px] text-amber-400 font-bold">Donations: {dn.donationsCount} Times</p>
                                    </div>

                                    <a
                                        href="tel:+916200087830"
                                        className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                    >
                                        <FaPhoneAlt /> Request Donor
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: HOSPITAL & DOCTOR PARTNERSHIP PORTAL */}
                {activeTab === 'partnership' && (
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase border border-emerald-500/40">
                                🏥 HOSPITAL & DOCTOR CO-OPERATION PORTAL
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                                {language === 'hi' ? 'अस्पताल व ब्लड बैंक हेतु आधिकारिक पार्टनरशिप' : 'Official Hospital & Blood Bank Network Partnership'}
                            </h3>
                            <p className="text-xs text-slate-400 font-bold">
                                {language === 'hi' ? 'बिहार के सभी डॉक्टरों व ब्लड बैंक प्रभारियों से सेहत साथी का विनम्र निवेदन — मिलकर हर मरीज की जान बचाएं।' : 'Appeal to all Hospital Doctors & Blood Bank In-Charges across Bihar — Let us unite to save lives.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {HOSPITAL_PARTNER_BENEFITS.map((b, bidx) => (
                                <div key={bidx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                                        <BsCheckCircleFill className="text-emerald-400" />
                                        <span>{language === 'hi' ? b.titleHi : b.titleEn}</span>
                                    </div>
                                    <p className="text-xs text-slate-300 font-bold">
                                        {language === 'hi' ? b.descHi : b.descEn}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/60 shadow-2xl text-center space-y-4">
                            <h4 className="text-lg font-black text-white uppercase">
                                {language === 'hi' ? 'अस्पताल / डॉक्टर डायरेक्ट टाई-अप हेल्पलाइन' : 'Direct Hospital Tie-Up Helpline'}
                            </h4>
                            <p className="text-xs text-slate-200 font-bold max-w-xl mx-auto">
                                {language === 'hi' ? 'यदि आप अस्पताल निदेशक, डॉक्टर या ब्लड बैंक प्रभारी हैं तो सेहत साथी संस्थापक से सीधे संपर्क करें।' : 'If you are a Hospital Director, Doctor or Blood Bank Manager, contact Sehaat Saathi Founder directly for MoU.'}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                                <a
                                    href="tel:+916200087830"
                                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <FaPhoneAlt /> Call Founder (+91 6200087830)
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send?phone=916200087830&text=Hello%20Sehaat%20Saathi%2C%20I%20am%20a%20Doctor/Hospital%20Director%20interested%20in%20Blood%20Bank%20Tie-up."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-green-400 border border-green-500/40 font-black text-xs uppercase shadow-xl flex items-center justify-center gap-2"
                                >
                                    <BsWhatsapp /> WhatsApp MOU Inquiry
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: BLOOD COMPATIBILITY & COMPONENT GUIDE */}
                {activeTab === 'compatibility' && (
                    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">Blood Compatibility & Component Guide</h3>
                            <p className="text-xs text-slate-400 font-bold">Check donor compatibility & component usages for medical procedures.</p>
                        </div>

                        {/* Compatibility Table Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {BLOOD_GROUPS.map(bg => (
                                <div key={bg.group} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-black text-rose-500">{bg.label}</span>
                                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">{bg.rarity}</span>
                                    </div>
                                    <div className="text-xs text-slate-300 font-bold space-y-1 pt-1 border-t border-slate-800">
                                        <p><strong className="text-emerald-400">Can Donate To:</strong> {bg.canGiveTo}</p>
                                        <p><strong className="text-cyan-400">Can Receive From:</strong> {bg.canReceiveFrom}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Component Usages Grid */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4">
                            <h4 className="text-base font-black text-white uppercase">Blood Component Medical Usages</h4>
                            <div className="space-y-3">
                                {BLOOD_COMPONENTS.map(c => (
                                    <div key={c.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                        <div>
                                            <h5 className="font-black text-rose-400">{language === 'hi' ? c.labelHi : c.labelEn}</h5>
                                            <p className="text-slate-300 font-bold mt-0.5">{language === 'hi' ? c.usageHi : c.usageEn}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 6: LIVE REQUEST TRACKER */}
                {activeTab === 'tracking' && (
                    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                        {activeBloodRequest ? (
                            <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 sm:p-10 shadow-2xl text-center space-y-6 sm:space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-black uppercase border border-rose-500/20">
                                    🔴 Blood Request ID: {activeBloodRequest.id}
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-white">{activeBloodRequest.group} ({activeBloodRequest.units}) - {activeBloodRequest.component.toUpperCase()}</h3>
                                <p className="text-xs text-slate-400 font-bold">Hospital: {activeBloodRequest.hospitalName} • Time: {activeBloodRequest.requestTime}</p>

                                {/* 4 Stage Timeline */}
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-[9px] sm:text-[10px] font-bold">
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-rose-500 text-slate-950 font-black flex items-center justify-center">✓</div>
                                        <span className="text-rose-400">1. Request Received</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-rose-500 text-slate-950 font-black flex items-center justify-center animate-pulse">2</div>
                                        <span className="text-rose-400">2. Sehaat Team Searching</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">3</div>
                                        <span className="text-slate-500">3. Source Found</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="w-7 sm:w-8 h-7 sm:h-8 mx-auto rounded-full bg-slate-800 text-slate-400 font-black flex items-center justify-center">4</div>
                                        <span className="text-slate-500">4. Coordinated</span>
                                    </div>
                                </div>

                                <div className="p-3.5 sm:p-4 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                                    <p className="text-slate-400">Attendant Contact: <strong className="text-white">{activeBloodRequest.attendantPhone}</strong></p>
                                    <p className="text-slate-400">Emergency Helpline: <strong className="text-rose-400">+91 6200087830</strong></p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center space-y-4">
                                <BsDropletFill className="text-4xl sm:text-5xl text-rose-500 mx-auto" />
                                <h3 className="text-lg sm:text-xl font-black text-white">No Active Emergency Blood Requests</h3>
                                <p className="text-xs text-slate-400 font-bold">Fill the urgent blood request form to initiate real-time coordination.</p>
                                <button
                                    onClick={() => setActiveTab('request')}
                                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-rose-600 text-white font-bold text-xs uppercase"
                                >
                                    Create Request Now
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </main>

            {/* VOLUNTEER DONOR REGISTRATION MODAL */}
            {showDonorModal && (
                <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowDonorModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 text-xl"
                        >
                            <BsXCircleFill />
                        </button>

                        <div className="text-center space-y-1">
                            <BsPersonPlusFill className="text-4xl text-rose-500 mx-auto" />
                            <h3 className="text-xl font-black uppercase text-white">{t.registerDonorTitle}</h3>
                            <p className="text-xs text-slate-400 font-bold">Join 1,250+ youth blood donors saving lives in Madhubani & Bihar.</p>
                        </div>

                        <form onSubmit={handleDonorRegistrationSubmit} className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name *</label>
                                <input
                                    type="text"
                                    value={donorName}
                                    onChange={(e) => setDonorName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1">Blood Group *</label>
                                    <select
                                        value={donorGroup}
                                        onChange={(e) => setDonorGroup(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
                                    >
                                        {BLOOD_GROUPS.map(bg => (
                                            <option key={bg.group} value={bg.group}>{bg.group}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        value={donorPhone}
                                        onChange={(e) => setDonorPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-300 block mb-1">City / Village Area *</label>
                                <input
                                    type="text"
                                    value={donorLocation}
                                    onChange={(e) => setDonorLocation(e.target.value)}
                                    placeholder="e.g. Madhubani Town / Benipatti"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 mt-2"
                            >
                                <BsDropletFill /> Register as Volunteer Donor
                            </button>
                        </form>
                    </div>
                </div>
            )}

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
                            <BsHeadset className="text-3xl sm:text-4xl text-rose-400 mx-auto" />
                            <h3 className="text-lg sm:text-xl font-black uppercase text-white">{t.contactModalTitle}</h3>
                            <p className="text-xs text-slate-400 font-bold">Sehaat Saathi Emergency Blood Assistance Helpline</p>
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
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center gap-1 shadow-md"
                                        >
                                            <FaPhoneAlt /> Call
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=${h.cleanNo}&text=Hello%20Sehaat%20Saathi%2C%20I%20need%20Urgent%20Blood%20Assistance.`}
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

        </div>
    );
};

export default BloodBankHub;
