import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    BsArrowLeft, BsTruck, BsPhoneFill, BsGeoAltFill, BsHeartPulseFill,
    BsShieldFillCheck, BsLightningFill, BsActivity, BsClockHistory,
    BsCheckCircleFill, BsExclamationTriangleFill, BsMapFill, BsCreditCardFill,
    BsXCircleFill, BsCheck, BsStarFill, BsHospital, BsTelephoneFill,
    BsWhatsapp, BsShareFill, BsCompass, BsSearch, BsFilter, BsCheckLg,
    BsEyeFill, BsPatchCheckFill, BsSuitHeartFill, BsShieldShaded, BsSpeedometer,
    BsShieldCheck
} from 'react-icons/bs';
import {
    FaAmbulance, FaUserNurse, FaLungs, FaBaby, FaHelicopter,
    FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaIdCard, FaUserTie,
    FaStethoscope, FaGlobeAsia, FaRoute
} from 'react-icons/fa';
import { AMBULANCE_FLEET_DATA } from '../utils/ambulanceData';

const TRANSLATIONS = {
    en: {
        smartHub: "Smart Hub",
        founderHotline: "Founder Helpline: +91 6200087830",
        hotline108: "108 Emergency SOS",
        bannerBadge: "🚨 24/7 SEHAAT SAATHI RAPID DISPATCH DIRECTORY",
        bannerTitle: "24/7 Lifeline Emergency Ambulance Network",
        bannerSubtitle: "Instant 2-Minute Booking & 50+ Verified Ambulance Fleet across Bihar & Inter-State Highways",
        nearbyAreasTitle: "📍 Local Micro Coverage:",
        nearbyAreasList: "Madhubani, Rajnagar, Bhagwanpur, Ranti, Rahika, Khajauli, Jaynagar, Pandaul, Sakri, Benipatti, Jhanjharpur, Phulparas, Kaluahi, Laukahi.",
        majorHubsTitle: "🏥 Express Hospital Corridors:",
        majorHubsList: "DMCH Darbhanga • PMCH / AIIMS Patna • AIIMS New Delhi.",
        bannerTag1: "⚡ 2-Minute Rapid Dispatch",
        bannerTag2: "🏡 Village to Metro Hospital Transport",
        bannerTag3: "🏷️ 100% Transparent Zero Surge Rate",
        callFounderBtn: "Call Founder (+91 6200087830)",
        callHelplineBtn: "Helpline (+91 9934276622)",
        heroTitle: "Sehaat Saathi Emergency Ambulance Booking Services",
        heroSubtitle: "24/7 Rapid Life-Saving Medical Fleet Across Madhubani, Darbhanga, Patna & Inter-State Highways. 50+ Verified Vehicles • Certified Drivers • Zero Hidden Charges.",
        tabDirectory: "50+ Ambulance Fleet Directory",
        tabDispatch: "Instant 2-Min Booking Wizard",
        tabHospital: "Live ICU Bed Sync",
        searchPlaceholder: "Type Village or City Name (e.g., Rajnagar, Khajauli, Madhubani)...",
        allCategories: "All Fleet Types (BLS / ALS / ICU / NICU)",
        blsCategory: "Basic Life Support (BLS)",
        alsCategory: "Advanced Life Support (ALS)",
        icuCategory: "ICU Ventilator Ambulance",
        nicuCategory: "Neonatal NICU Unit",
        allLocations: "All Locations (Madhubani & Nearby)",
        showingCount: "Verified Real Ambulance Vehicles Ready",
        availablePill: "🟢 24/7 Dispatch Active",
        plateNoLabel: "Vehicle Plate No:",
        driverNameLabel: "Driver Name:",
        licenseNoLabel: "Driving License:",
        experienceLabel: "Experience:",
        founderHotlineLabel: "Founder Helpline Numbers:",
        keyFacilitiesLabel: "In-Ambulance Medical Equipment:",
        callBtn: "Call",
        whatsAppBtn: "WhatsApp",
        detailsBtn: "Full Details",
        bookingFormTitle: "Book Emergency Ambulance Instantly",
        pickupLabel: "Pickup Address (Enter Village or City Name)",
        detectGpsBtn: "Detect via GPS",
        destinationLabel: "Select Destination Hospital",
        patientNameLabel: "Patient Name",
        patientPhoneLabel: "Mobile Phone Number *",
        baseChargeLabel: "Base Tariff",
        totalPriceLabel: "Estimated Total Fare",
        confirmDispatchBtn: "CONFIRM & DISPATCH AMBULANCE NOW",
        hospitalBedsTitle: "Live Hospital Bed Availability Status",
        icuBedsLabel: "Available ICU Beds",
        emergencyBedsLabel: "Emergency Casualty Beds",
        modalVerifiedBadge: "Real Vehicle Photo Verified",
        modalDriverProfile: "Driver Credential & Verification",
        modalFounderHotline: "Sehaat Saathi Founder Direct Hotline",
        modalEquipmentTitle: "In-Vehicle Medical Equipment & Support"
    },
    hi: {
        smartHub: "स्मार्ट हब (Smart Hub)",
        founderHotline: "संस्थापक: +91 6200087830",
        hotline108: "108 एम्बुलेंस कॉल",
        bannerBadge: "🚨 24 घंटे आपातकालीन एम्बुलेंस सेवा - सेहत साथी नेटवर्क",
        bannerTitle: "मधुबनी से दरभंगा, पटना एवं नई दिल्ली के लिए 24 घंटे 365 दिन लाइफलाइन एम्बुलेंस सेवा",
        bannerSubtitle: "10 से 15 मिनट में एम्बुलेंस आपके घर/लोकेशन तक पहुँचाने की सेहत साथी टीम की 100% पूरी कोशिश।",
        nearbyAreasTitle: "📍 स्टेप 1 (लोकल नेटवर्क):",
        nearbyAreasList: "मधुबनी सदर, राजनगर, भगवानपुर, रंटी, रहिका, खजौली, जयनगर, पंडौल, सकरी, बेनीपट्टी, झंझारपुर, फुलपरास, कलुआही, लौकही।",
        majorHubsTitle: "🏥 स्टेप 2, 3 व 4 (रीजनल व नेशनल हब):",
        majorHubsList: "दरभंगा (DMCH) ➔ पटना (PMCH / AIIMS) ➔ नई दिल्ली (AIIMS)।",
        bannerTag1: "⏱️ 10-15 मिनट में घर तक पहुँच सेवा",
        bannerTag2: "🏡 गाँव से अस्पताल तक सुरक्षित सफर",
        bannerTag3: "🏷️ 100% पारदर्शी फिक्स्ड किराया",
        callFounderBtn: "संस्थापक को सीधा कॉल करें (+91 6200087830)",
        callHelplineBtn: "इमरजेंसी हेल्पलाइन (+91 9934276622)",
        heroTitle: "सेहत साथी इमरजेंसी एम्बुलेंस बुकिंग सर्विसेज",
        heroSubtitle: "24 घंटे 365 दिन — 10 से 15 मिनट में आपके घर से दरभंगा, पटना और दिल्ली तक सुरक्षित एम्बुलेंस यात्रा। 50+ असली गाड़ियां • सत्यापित ड्राइवर • निश्चित फिक्स्ड किराया।",
        tabDirectory: "50+ एम्बुलेंस की लिस्ट",
        tabDispatch: "इमरजेंसी बुकिंग फॉर्म (Booking Form)",
        tabHospital: "अस्पताल के बेड देखें",
        searchPlaceholder: "अपने गाँव या जगह का नाम लिखें (जैसे: राजनगर, खजौली, मधुबनी)...",
        allCategories: "सभी प्रकार की एम्बुलेंस",
        blsCategory: "साधारण एम्बुलेंस (ऑक्सीजन)",
        alsCategory: "इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स)",
        icuCategory: "वेंटिलेटर एम्बुलेंस (गंभीर मरीज)",
        nicuCategory: "छोटे बच्चों की एम्बुलेंस",
        allLocations: "सभी जगहें (मधुबनी व आसपास)",
        showingCount: "कुल उपलब्ध एम्बुलेंस गाड़ियां",
        availablePill: "🟢 24 घंटे सेवा चालू है",
        plateNoLabel: "गाड़ी नंबर:",
        driverNameLabel: "ड्राइवर का नाम:",
        licenseNoLabel: "ड्राइविंग लाइसेंस नं:",
        experienceLabel: "अनुभव:",
        founderHotlineLabel: "संस्थापक (Founder) हेल्पलाइन नंबर:",
        keyFacilitiesLabel: "एम्बुलेंस में मौजूद उपकरण:",
        callBtn: "कॉल करें",
        whatsAppBtn: "व्हाट्सएप",
        detailsBtn: "पूरी जानकारी",
        bookingFormTitle: "तुरंत एम्बुलेंस बुक करें",
        pickupLabel: "मरीज को कहाँ से लेना है (घर/गाँव का पता लिखें)",
        detectGpsBtn: "GPS से चुनें",
        destinationLabel: "किस अस्पताल जाना है?",
        patientNameLabel: "मरीज का नाम",
        patientPhoneLabel: "मोबाइल नंबर *",
        baseChargeLabel: "किराया",
        totalPriceLabel: "कुल अनुमानित किराया",
        confirmDispatchBtn: "तुरंत एम्बुलेंस भेजें (Confirm Dispatch)",
        hospitalBedsTitle: "अस्पतालों में खाली बेड देखें",
        icuBedsLabel: "खाली आईसीयू (ICU) बेड",
        emergencyBedsLabel: "खाली इमरजेंसी बेड",
        modalVerifiedBadge: "असली गाडी फोटो सत्यापित",
        modalDriverProfile: "ड्राइवर की पूरी जानकारी",
        modalFounderHotline: "सेहत साथी संस्थापक नंबर",
        modalEquipmentTitle: "गाड़ी में मौजूद उपकरण व सुविधाएं:"
    }
};

const AMBULANCE_TYPES = [
    {
        id: 'bls',
        titleEn: '1. Basic Life Support (BLS)',
        titleHi: '1. साधारण एम्बुलेंस (ऑक्सीजन और स्ट्रेचर)',
        taglineEn: 'For general non-critical patients & OPD transfers',
        taglineHi: 'सामान्य मरीजों और हल्का बीमार होने पर अस्पताल जाने के लिए',
        icon: <FaAmbulance className="text-2xl sm:text-3xl text-emerald-500" />,
        basePrice: 499,
        perKm: 18,
        etaEn: '4-7 Mins Arrival',
        etaHi: '4-7 मिनट में पहुँचेगी'
    },
    {
        id: 'als',
        titleEn: '2. Advanced Life Support (ALS Cardiac)',
        titleHi: '2. इमरजेंसी एम्बुलेंस (ऑक्सीजन + नर्स + हार्ट मशीन)',
        taglineEn: 'For Cardiac emergency, chest pain, trauma & stroke',
        taglineHi: 'हार्ट अटैक, एक्सीडेंट और इमरजेंसी स्थिति के लिए स्पेशल गाड़ियां',
        icon: <BsHeartPulseFill className="text-2xl sm:text-3xl text-rose-500 animate-pulse" />,
        basePrice: 1199,
        perKm: 32,
        etaEn: '3-5 Mins Arrival',
        etaHi: '3-5 मिनट में पहुँचेगी'
    },
    {
        id: 'icu',
        titleEn: '3. ICU Ventilator Ambulance',
        titleHi: '3. वेंटिलेटर एम्बुलेंस (सांस की मशीन + आईसीयू डॉक्टर)',
        taglineEn: 'Mobile ICU for critical patients requiring ventilator support',
        taglineHi: 'बहुत गंभीर मरीज जिन्हें सांस लेने की मशीन (Ventilator) की जरूरत है',
        icon: <FaLungs className="text-2xl sm:text-3xl text-cyan-500 animate-bounce-slow" />,
        basePrice: 2499,
        perKm: 48,
        etaEn: '5-8 Mins Arrival',
        etaHi: '5-8 मिनट में पहुँचेगी'
    },
    {
        id: 'nicu',
        titleEn: '4. Neonatal & Pediatric (NICU)',
        titleHi: '4. छोटे बच्चों और नवजात शिशु की एम्बुलेंस (NICU)',
        taglineEn: 'Specialized incubator transport for newborns & children',
        taglineHi: 'छोटे बच्चों और जन्मजात नवजात शिशुओं के लिए स्पेशल एम्बुलेंस',
        icon: <FaBaby className="text-2xl sm:text-3xl text-purple-500" />,
        basePrice: 1899,
        perKm: 38,
        etaEn: '6-9 Mins Arrival',
        etaHi: '6-9 मिनट में पहुँचेगी'
    },
    {
        id: 'air',
        titleEn: '5. Air Ambulance Helicopter Service',
        titleHi: '5. हेलिकॉप्टर एम्बुलेंस सेवा (Air Ambulance)',
        taglineEn: 'Inter-City Emergency Airborne Transfer to Patna/Delhi AIIMS',
        taglineHi: 'पटना, दिल्ली एम्स (AIIMS) के लिए हवाई इमरजेंसी ट्रांसफर',
        icon: <FaHelicopter className="text-2xl sm:text-3xl text-amber-500 animate-pulse" />,
        basePrice: 85000,
        perKm: 450,
        etaEn: '30-45 Mins Take-off',
        etaHi: '30-45 मिनट में टेक-ऑफ'
    }
];

const EMERGENCY_TRIAGES = [
    { id: 'cardiac', titleEn: 'Cardiac / Chest Pain', titleHi: 'हार्ट अटैक / सीने में दर्द', priorityEn: 'CRITICAL 🚨', priorityHi: 'गंभीर इमरजेंसी 🚨', type: 'als', descEn: 'Severe chest tightness, sweating, breathlessness', descHi: 'सीने में भारी दर्द, पसीना आना, घबराहट होना' },
    { id: 'accident', titleEn: 'Accident & Trauma', titleHi: 'एक्सीडेंट / चोट', priorityEn: 'HIGH ⚠️', priorityHi: 'इमरजेंसी ⚠️', type: 'als', descEn: 'Road accident, severe bleeding, fracture', descHi: 'सड़क दुर्घटना, खून बहना, हड्डी टूटना' },
    { id: 'ventilator', titleEn: 'ICU Ventilator Patient', titleHi: 'वेंटीलेटर / आईसीयू मरीज', priorityEn: 'CRITICAL 🏥', priorityHi: 'गंभीर आईसीयू 🏥', type: 'icu', descEn: 'Patient requires active ventilator support', descHi: 'मरीज को सांस की मशीन पर अस्पताल ले जाना है' },
    { id: 'maternity', titleEn: 'Pregnancy / Labor Emergency', titleHi: 'प्रसव / गर्भवती महिला', priorityEn: 'HIGH 👶', priorityHi: 'इमरजेंसी 👶', type: 'bls', descEn: 'Active labor pains, delivery transfer', descHi: 'डिलीवरी का समय, गर्भवती महिला को अस्पताल ले जाना' },
    { id: 'general', titleEn: 'General Hospital Transfer', titleHi: 'सामान्य मरीज ट्रांसफर', priorityEn: 'STANDARD 🚑', priorityHi: 'सामान्य 🚑', type: 'bls', descEn: 'Routine OPD checkup, post-op discharge', descHi: 'रूटीन चेकअप, डॉक्टर को दिखाना, छुट्टी के बाद घर आना' }
];

const HOSPITALS_LIST = [
    { name: "Medanta Hospital", location: "Sankar Chowk, Madhubani", icuBeds: 19, emergencyBeds: 15, liveStatusEn: "🟢 Beds Available", liveStatusHi: "🟢 बेड उपलब्ध हैं" },
    { name: "Abhi Hospital", location: "Bypass Road, Madhubani", icuBeds: 25, emergencyBeds: 12, liveStatusEn: "🟢 Beds Available", liveStatusHi: "🟢 बेड उपलब्ध हैं" },
    { name: "DMCH Medical College", location: "Darbhanga", icuBeds: 42, emergencyBeds: 30, liveStatusEn: "🟢 Beds Available", liveStatusHi: "🟢 बेड उपलब्ध हैं" },
    { name: "PMCH Patna Medical College", location: "Patna", icuBeds: 85, emergencyBeds: 50, liveStatusEn: "🟢 Green Corridor Active", liveStatusHi: "🟢 ग्रीन कॉरिडोर चालू" },
    { name: "AIIMS New Delhi Emergency", location: "New Delhi", icuBeds: 120, emergencyBeds: 80, liveStatusEn: "🟢 Express Corridor", liveStatusHi: "🟢 डायरेक्ट ट्रांसफर" },
    { name: "Custom Address / Other Hospital", location: "User Specified Hospital", icuBeds: 0, emergencyBeds: 0, liveStatusEn: "ℹ️ Manual Entry", liveStatusHi: "ℹ️ मैनुअल एंट्री" }
];

const COVERED_AREAS = [
    "Madhubani City", "Sankar Chowk", "Station Road", "Bypass Road", "Rajnagar", "Bhagwanpur", "Ranti",
    "Rahika", "Khajauli", "Jaynagar", "Pandaul", "Sakri", "Benipatti", "Jhanjharpur",
    "Phulparas", "Kaluahi", "Laukahi", "Darbhanga (DMCH)", "Patna (PMCH/AIIMS)", "Delhi (AIIMS)"
];

const AmbulanceBooking = () => {
    const [language, setLanguage] = useState('hi');
    const [activeTab, setActiveTab] = useState('directory');
    const [selectedTriage, setSelectedTriage] = useState(EMERGENCY_TRIAGES[0]);
    const [selectedType, setSelectedType] = useState(AMBULANCE_TYPES[1]);
    const [pickupAddress, setPickupAddress] = useState('');
    const [destinationHospital, setDestinationHospital] = useState(HOSPITALS_LIST[0].name);
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [estimatedDistance, setEstimatedDistance] = useState(12);
    const [bookingStep, setBookingStep] = useState('select');
    const [isLocating, setIsLocating] = useState(false);
    const [dispatchingProgress, setDispatchingProgress] = useState(0);
    const [assignedDriver, setAssignedDriver] = useState(null);
    const [etaCountdown, setEtaCountdown] = useState(240);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
    const [selectedLocationFilter, setSelectedLocationFilter] = useState('ALL');
    const [selectedFacilityFilter, setSelectedFacilityFilter] = useState('ALL');
    const [selectedAmbulanceModal, setSelectedAmbulanceModal] = useState(null);

    const t = TRANSLATIONS[language];

    const filteredFleet = AMBULANCE_FLEET_DATA.filter(amb => {
        const name = language === 'hi' ? amb.nameHi : amb.nameEn;
        const location = language === 'hi' ? amb.locationHi : amb.locationEn;
        const coverage = language === 'hi' ? amb.serviceCoverageHi : amb.serviceCoverageEn;

        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            amb.plateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coverage.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat = selectedCategoryFilter === 'ALL' || amb.category === selectedCategoryFilter;
        const matchesLoc = selectedLocationFilter === 'ALL' || location.toLowerCase().includes(selectedLocationFilter.toLowerCase()) || coverage.toLowerCase().includes(selectedLocationFilter.toLowerCase());
        
        const facilities = language === 'hi' ? amb.facilitiesHi : amb.facilitiesEn;
        const matchesFacility = selectedFacilityFilter === 'ALL' || facilities.some(f => f.toLowerCase().includes(selectedFacilityFilter.toLowerCase()));

        return matchesSearch && matchesCat && matchesLoc && matchesFacility;
    });

    const handleDetectLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    setPickupAddress(language === 'hi' ? `GPS लोकेशन (${lat}, ${lng}), मधुबनी, बिहार` : `GPS Position (${lat}, ${lng}), Madhubani, Bihar`);
                    setIsLocating(false);
                    toast.success(language === 'hi' ? "📍 आपका सही स्थान मिल गया है!" : "📍 GPS Location Acquired!");
                },
                () => {
                    setPickupAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
                    setIsLocating(false);
                    toast.info("📍 Location: Madhubani Central");
                }
            );
        } else {
            setPickupAddress("Madhubani Station Road, Ward No. 12, Madhubani, Bihar");
            setIsLocating(false);
        }
    };

    const calculatedFare = selectedType.basePrice + (estimatedDistance * selectedType.perKm);

    const handleInstantDispatch = (e) => {
        e.preventDefault();
        if (!pickupAddress.trim()) {
            toast.error(language === 'hi' ? "कृपया मरीज के उठने का पता लिखें!" : "Please enter pickup address!");
            return;
        }
        if (!patientPhone.trim()) {
            toast.error(language === 'hi' ? "कृपया फोन नंबर लिखें!" : "Please enter contact number!");
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
                toast.success(language === 'hi' ? "🚑 एम्बुलेंस भेज दी गई है! ड्राइवर रास्ते में है!" : "🚑 Ambulance Dispatched! Driver is on the way!");
            }
        }, 500);
    };

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

            {/* Responsive Top Navigation Header */}
            <header className="sticky top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-3 sm:px-6 lg:px-8 py-3.5 border-t-4 border-t-rose-600 shadow-2xl">
                <div className="container mx-auto flex justify-between items-center gap-2">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-300 hover:text-white transition-all font-bold group text-xs sm:text-sm shrink-0">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform text-rose-500 text-base sm:text-lg" />
                        <span className="truncate">{t.smartHub}</span>
                    </Link>

                    {/* Controls & Language Switcher */}
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <a
                            href="tel:+916200087830"
                            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg"
                        >
                            <FaPhoneAlt className="text-white text-xs" />
                            <span>{t.founderHotline}</span>
                        </a>

                        <a
                            href="tel:108"
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-pulse"
                        >
                            <BsTelephoneFill className="text-xs animate-bounce" />
                            <span className="text-[11px] sm:text-xs">{t.hotline108}</span>
                        </a>

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

                {/* State-of-the-Art Futuristic Banner UI - 100% Mobile Responsive */}
                <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-rose-950/80 backdrop-blur-2xl border-2 border-rose-500/40 shadow-[0_20px_50px_rgba(225,29,72,0.2)] relative overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">
                        <div className="space-y-3 sm:space-y-4 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-500/40 text-rose-300 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                                {t.bannerBadge}
                            </div>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-snug sm:leading-tight">
                                {t.bannerTitle}
                            </h2>
                            <p className="text-slate-200 text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
                                {t.bannerSubtitle}
                            </p>
                            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-left">
                                <p className="text-slate-200 font-bold text-[11px] sm:text-xs leading-relaxed">
                                    <span className="text-emerald-400 font-black">{t.nearbyAreasTitle}</span> {t.nearbyAreasList}
                                </p>
                                <p className="text-slate-200 font-bold text-[11px] sm:text-xs leading-relaxed">
                                    <span className="text-rose-400 font-black">{t.majorHubsTitle}</span> {t.majorHubsList}
                                </p>
                            </div>

                            {/* FIXED TRANSPARENT FARE POLICY BOX */}
                            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 space-y-2 text-xs text-left shadow-lg">
                                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                                    <BsShieldCheck className="text-base" />
                                    <span>100% पारदर्शी फिक्स्ड किराया गारंटी (Zero Hidden Charges Policy)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                    <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                                        <span className="text-[10px] text-amber-400 font-black block uppercase">🏷️ मधुबनी ➔ दरभंगा (DMCH / शहर का कोई भी अस्पताल)</span>
                                        <p className="text-[11px] text-slate-200 font-bold leading-tight">
                                            एक ही फिक्स्ड किराया! दरभंगा के किसी भी अस्पताल जाएं — कोई मीटर घोटाला नहीं, कोई extra चार्ज नहीं।
                                        </p>
                                    </div>
                                    <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
                                        <span className="text-[10px] text-rose-400 font-black block uppercase">🏷️ मधुबनी ➔ पटना (PMCH / AIIMS / शहर का कोई भी अस्पताल)</span>
                                        <p className="text-[11px] text-slate-200 font-bold leading-tight">
                                            एक ही फिक्स्ड किराया! पटना के किसी भी अस्पताल में भर्ती हों — निश्चित पारदर्शी फेयर गारंटी।
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs font-black text-slate-300">
                                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-500/20">{t.bannerTag1}</span>
                                <span className="text-amber-400 font-bold bg-amber-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/20">{t.bannerTag2}</span>
                                <span className="text-rose-400 font-bold bg-rose-500/10 px-2.5 sm:px-3 py-1 rounded-full border border-rose-500/20">{t.bannerTag3}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-auto">
                            <a
                                href="tel:+916200087830"
                                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 group transition-all"
                            >
                                <FaPhoneAlt className="group-hover:scale-110 transition-transform text-xs" /> {t.callFounderBtn}
                            </a>
                            <a
                                href="tel:+919934276622"
                                className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                                <BsTelephoneFill className="text-rose-400 text-xs" /> {t.callHelplineBtn}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Hero Title */}
                <div className="text-center space-y-3 sm:space-y-4 relative">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-md">
                        <BsPatchCheckFill className="text-emerald-400" /> Sehaat Saathi Official Healthcare Network
                    </div>

                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                        Sehaat Saathi Emergency <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Ambulance Booking Services
                        </span>
                    </h1>

                    <p className="text-slate-300 max-w-3xl mx-auto text-xs sm:text-base md:text-lg font-bold leading-relaxed px-2">
                        {t.heroSubtitle}
                    </p>

                    {/* Quick Fleet Metrics Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold">
                        <div className="px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <FaAmbulance className="text-rose-500 text-sm sm:text-base" /> <span>50+ Real Vehicles</span>
                        </div>
                        <div className="px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <BsSpeedometer className="text-emerald-400 text-sm sm:text-base" /> <span>3-5 Mins Avg Dispatch</span>
                        </div>
                        <div className="px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2 shadow-lg">
                            <BsShieldCheck className="text-cyan-400 text-sm sm:text-base" /> <span>100% Verified Drivers</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs - Horizontal Scrollable on Mobile */}
                <div className="flex justify-center">
                    <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('directory')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'directory' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <FaAmbulance className="text-sm sm:text-base" /> {t.tabDirectory} ({AMBULANCE_FLEET_DATA.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('dispatch')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'dispatch' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsLightningFill className="text-sm sm:text-base" /> {t.tabDispatch}
                        </button>
                        <button
                            onClick={() => setActiveTab('hospital')}
                            className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'hospital' ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <BsHospital className="text-sm sm:text-base" /> {t.tabHospital}
                        </button>
                    </div>
                </div>

                {/* TAB 1: 50+ REAL AMBULANCE PROFILE DIRECTORY */}
                {activeTab === 'directory' && (
                    <div className="space-y-6 sm:space-y-8">
                        
                        {/* Search & Multi-Filter Bar */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
                                
                                {/* Search Input */}
                                <div className="md:col-span-2 relative">
                                    <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t.searchPlaceholder}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <select
                                        value={selectedCategoryFilter}
                                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    >
                                        <option value="ALL">{t.allCategories}</option>
                                        <option value="BLS">{t.blsCategory}</option>
                                        <option value="ALS">{t.alsCategory}</option>
                                        <option value="ICU">{t.icuCategory}</option>
                                        <option value="NICU">{t.nicuCategory}</option>
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <div>
                                    <select
                                        value={selectedLocationFilter}
                                        onChange={(e) => setSelectedLocationFilter(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    >
                                        <option value="ALL">{t.allLocations}</option>
                                        {COVERED_AREAS.map((area, idx) => (
                                            <option key={idx} value={area}>📍 {area}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Directory Count Header */}
                        <div className="flex justify-between items-center px-1 sm:px-2">
                            <h3 className="text-sm sm:text-lg font-black text-white tracking-wide flex items-center gap-2">
                                <FaAmbulance className="text-rose-500 shrink-0" /> <span>{filteredFleet.length} {t.showingCount}</span>
                            </h3>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                                {t.availablePill}
                            </span>
                        </div>

                        {/* 50+ Ambulance Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredFleet.map((amb) => {
                                const ambName = language === 'hi' ? amb.nameHi : amb.nameEn;
                                const ambLocation = language === 'hi' ? amb.locationHi : amb.locationEn;
                                const ambCoverage = language === 'hi' ? amb.serviceCoverageHi : amb.serviceCoverageEn;
                                const ambStatus = language === 'hi' ? amb.statusHi : amb.statusEn;
                                const ambCategory = language === 'hi' ? amb.categorySimpleHi : amb.categorySimpleEn;
                                const ambDriverExp = language === 'hi' ? amb.driverExperienceHi : amb.driverExperienceEn;
                                const ambFacilities = language === 'hi' ? amb.facilitiesHi : amb.facilitiesEn;

                                return (
                                    <div
                                        key={amb.id}
                                        className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-rose-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                                    >
                                        <div>
                                            {/* Card Image Banner */}
                                            <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                                                <img
                                                    src={amb.image}
                                                    alt={ambName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                                                {/* Status Badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-emerald-500 text-slate-950 shadow-lg">
                                                        ● {ambStatus}
                                                    </span>
                                                </div>

                                                {/* Vehicle Plate Badge */}
                                                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono font-black text-amber-300">
                                                    {t.plateNoLabel} {amb.plateNo}
                                                </div>
                                            </div>

                                            {/* Content Details */}
                                            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                                                <div>
                                                    <h4 className="font-black text-base sm:text-lg text-white group-hover:text-rose-400 transition-colors leading-snug">
                                                        {ambName}
                                                    </h4>
                                                    <p className="text-[11px] sm:text-xs font-bold text-amber-400 mt-0.5">{ambCategory}</p>
                                                    <p className="text-[11px] sm:text-xs font-bold text-slate-300 mt-1">{amb.vehicleModel}</p>
                                                    <p className="text-[11px] sm:text-xs text-rose-400/90 font-medium flex items-center gap-1 mt-1">
                                                        <BsGeoAltFill className="text-rose-500 shrink-0" /> {ambLocation}
                                                    </p>
                                                </div>

                                                {/* Driver Details */}
                                                <div className="p-3 bg-slate-950/60 rounded-xl sm:rounded-2xl border border-slate-800 space-y-1 text-xs">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-slate-400 font-medium text-[11px] sm:text-xs">{t.driverNameLabel}</span>
                                                        <span className="font-bold text-white text-[11px] sm:text-xs">{amb.driverName}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] sm:text-[11px]">
                                                        <span className="text-slate-500 font-medium">{t.licenseNoLabel}</span>
                                                        <span className="font-mono text-slate-300">{amb.licenseNo}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] sm:text-[11px]">
                                                        <span className="text-slate-500 font-medium">{t.experienceLabel}</span>
                                                        <span className="font-bold text-emerald-400">{ambDriverExp}</span>
                                                    </div>
                                                </div>

                                                {/* Founder Helplines Display */}
                                                <div className="p-3 bg-rose-500/5 rounded-xl sm:rounded-2xl border border-rose-500/20 text-xs space-y-1">
                                                    <div className="text-[10px] font-black uppercase text-rose-400 tracking-wider">
                                                        {t.founderHotlineLabel}
                                                    </div>
                                                    <div className="font-bold text-white font-mono text-[11px] sm:text-xs flex justify-between">
                                                        <span>📞 +91 6200087830</span>
                                                        <span>📞 +91 9934276622</span>
                                                    </div>
                                                </div>

                                                {/* Facilities Badges */}
                                                <div className="space-y-1.5">
                                                    <div className="text-[10px] font-bold text-slate-400">{t.keyFacilitiesLabel}</div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {ambFacilities.slice(0, 4).map((f, fidx) => (
                                                            <span key={fidx} className="text-[9px] sm:text-[10px] font-bold text-slate-200 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                                                                ✓ {f}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer Action Buttons */}
                                        <div className="p-4 sm:p-5 pt-0 grid grid-cols-3 gap-1.5 sm:gap-2">
                                            <a
                                                href={`tel:${amb.contactNumbers[0]}`}
                                                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 shadow-md"
                                            >
                                                <FaPhoneAlt className="text-[10px] sm:text-xs" /> {t.callBtn}
                                            </a>

                                            <button
                                                onClick={() => {
                                                    const text = `Emergency Ambulance Request: ${ambName} (${amb.vehicleModel}, Plate: ${amb.plateNo}). Driver: ${amb.driverName}. Location: ${ambLocation}.`;
                                                    window.open(`https://api.whatsapp.com/send?phone=916200087830&text=${encodeURIComponent(text)}`, '_blank');
                                                }}
                                                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1"
                                            >
                                                <BsWhatsapp className="text-green-500 text-[10px] sm:text-xs" /> {t.whatsAppBtn}
                                            </button>

                                            <button
                                                onClick={() => setSelectedAmbulanceModal(amb)}
                                                className="py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 transition-all"
                                            >
                                                <BsEyeFill className="text-[10px] sm:text-xs" /> {t.detailsBtn}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 2: SIMPLE 2-MIN BOOKING FORM */}
                {activeTab === 'dispatch' && (
                    <div>
                        {bookingStep === 'select' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                                {/* Left 7 Columns */}
                                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                                        <h3 className="text-sm sm:text-base font-black text-rose-400 mb-3 sm:mb-4 flex items-center gap-2">
                                            <BsActivity /> 1. Select Emergency Type
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {EMERGENCY_TRIAGES.map((triage) => {
                                                const trTitle = language === 'hi' ? triage.titleHi : triage.titleEn;
                                                const trPriority = language === 'hi' ? triage.priorityHi : triage.priorityEn;
                                                const trDesc = language === 'hi' ? triage.descHi : triage.descEn;

                                                return (
                                                    <button
                                                        key={triage.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedTriage(triage);
                                                            const matchingType = AMBULANCE_TYPES.find(t => t.id === triage.type) || AMBULANCE_TYPES[0];
                                                            setSelectedType(matchingType);
                                                        }}
                                                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${selectedTriage.id === triage.id ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/30' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'}`}
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold text-white text-xs sm:text-sm">{trTitle}</h4>
                                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 shrink-0">
                                                                {trPriority}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-slate-400 line-clamp-2">{trDesc}</p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
                                        <h3 className="text-sm sm:text-base font-black text-amber-400 mb-2 flex items-center gap-2">
                                            <BsTruck /> 2. Choose Ambulance Fleet Category
                                        </h3>

                                        <div className="space-y-3 sm:space-y-4">
                                            {AMBULANCE_TYPES.map((veh) => {
                                                const vehTitle = language === 'hi' ? veh.titleHi : veh.titleEn;
                                                const vehTagline = language === 'hi' ? veh.taglineHi : veh.taglineEn;
                                                const vehEta = language === 'hi' ? veh.etaHi : veh.etaEn;

                                                return (
                                                    <div
                                                        key={veh.id}
                                                        onClick={() => setSelectedType(veh)}
                                                        className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer ${selectedType.id === veh.id ? 'bg-slate-800 border-rose-500 ring-2 ring-rose-500/40 shadow-2xl' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'}`}
                                                    >
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                                                            <div className="flex items-center gap-3 sm:gap-4">
                                                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                                                                    {veh.icon}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-black text-white text-sm sm:text-base">{vehTitle}</h4>
                                                                    <p className="text-[11px] sm:text-xs text-slate-400 font-bold mb-1">{vehTagline}</p>
                                                                </div>
                                                            </div>

                                                            <div className="text-right shrink-0 self-end sm:self-center">
                                                                <div className="text-lg sm:text-xl font-black text-white">₹{veh.basePrice}</div>
                                                                <div className="text-[10px] sm:text-[11px] text-slate-400 font-bold">+ ₹{veh.perKm}/km</div>
                                                                <div className="text-[11px] sm:text-xs font-bold text-emerald-400 mt-0.5 sm:mt-1">{vehEta}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Right 5 Columns: Form */}
                                <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                                    <form onSubmit={handleInstantDispatch} className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6">
                                        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                                            {t.bookingFormTitle}
                                        </h3>

                                        <div className="space-y-2">
                                            <label className="text-[11px] sm:text-xs font-bold text-slate-300 flex items-center justify-between">
                                                <span>{t.pickupLabel}</span>
                                                <button
                                                    type="button"
                                                    onClick={handleDetectLocation}
                                                    disabled={isLocating}
                                                    className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2 py-1 rounded-lg border border-rose-500/20"
                                                >
                                                    <BsCompass className={isLocating ? "animate-spin" : ""} />
                                                    <span>{t.detectGpsBtn}</span>
                                                </button>
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={pickupAddress}
                                                onChange={(e) => setPickupAddress(e.target.value)}
                                                placeholder="Enter House No, Station Road, Rajnagar, Khajauli, Madhubani..."
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] sm:text-xs font-bold text-slate-300">
                                                {t.destinationLabel}
                                            </label>
                                            <select
                                                value={destinationHospital}
                                                onChange={(e) => setDestinationHospital(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            >
                                                {HOSPITALS_LIST.map((h, i) => (
                                                    <option key={i} value={h.name}>
                                                        {h.name} ({h.location})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-[11px] sm:text-xs font-bold text-slate-300">{t.patientNameLabel}</label>
                                                <input
                                                    type="text"
                                                    value={patientName}
                                                    onChange={(e) => setPatientName(e.target.value)}
                                                    placeholder="Patient Name"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-[11px] sm:text-xs font-bold text-slate-300">{t.patientPhoneLabel}</label>
                                                <input
                                                    type="tel"
                                                    value={patientPhone}
                                                    onChange={(e) => setPatientPhone(e.target.value)}
                                                    placeholder="+91 98765 43210"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/80 rounded-xl sm:rounded-2xl p-4 border border-slate-800 space-y-2">
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>{t.baseChargeLabel}</span>
                                                <span className="font-bold text-slate-200">₹{selectedType.basePrice}</span>
                                            </div>
                                            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                                                <span className="text-xs font-bold text-white">{t.totalPriceLabel}</span>
                                                <span className="text-xl sm:text-2xl font-black text-rose-400">₹{calculatedFare}</span>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 sm:gap-3"
                                        >
                                            <FaAmbulance className="text-lg sm:text-xl animate-bounce" />
                                            <span>{t.confirmDispatchBtn}</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {bookingStep === 'dispatch' && (
                            <div className="max-w-2xl mx-auto py-12 sm:py-16 text-center space-y-6 sm:space-y-8">
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin"></div>
                                    <FaAmbulance className="text-4xl sm:text-5xl text-rose-500 animate-pulse" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white">Contacting Nearest Ambulance...</h2>
                                <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 max-w-md mx-auto">
                                    <div className="bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 h-full transition-all duration-300" style={{ width: `${dispatchingProgress}%` }}></div>
                                </div>
                            </div>
                        )}

                        {bookingStep === 'tracking' && assignedDriver && (
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl text-center space-y-4 sm:space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase">
                                        🟢 Ambulance Dispatched & On The Way
                                    </div>
                                    <div className="text-4xl sm:text-5xl font-black text-white tracking-widest font-mono">
                                        {formatTime(etaCountdown)}
                                    </div>
                                    <div className="bg-slate-950/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
                                        <div>
                                            <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 mb-1">Assigned Vehicle</h4>
                                            <h3 className="text-lg sm:text-xl font-black text-white">{language === 'hi' ? assignedDriver.nameHi : assignedDriver.nameEn}</h3>
                                            <p className="text-xs font-bold text-rose-400 mt-0.5">{assignedDriver.vehicleModel} ({assignedDriver.plateNo})</p>
                                            <p className="text-xs text-slate-300 mt-2">Driver: <strong>{assignedDriver.driverName}</strong> ({assignedDriver.licenseNo})</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <a href={`tel:${assignedDriver.contactNumbers[0]}`} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase flex items-center justify-center gap-2">
                                                <FaPhoneAlt /> Call Driver Directly
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: LIVE HOSPITAL BEDS */}
                {activeTab === 'hospital' && (
                    <div className="space-y-8 max-w-5xl mx-auto">
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
                            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                                <BsHospital className="text-rose-500" /> {t.hospitalBedsTitle}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {HOSPITALS_LIST.map((hosp, idx) => (
                                    <div key={idx} className="p-5 sm:p-6 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-base sm:text-lg text-white">{hosp.name}</h4>
                                                <p className="text-slate-400 text-xs">{hosp.location}</p>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                                {language === 'hi' ? hosp.liveStatusHi : hosp.liveStatusEn}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900 text-xs">
                                            <div>
                                                <span className="text-slate-500 block">{t.icuBedsLabel}</span>
                                                <span className="text-lg sm:text-xl font-black text-cyan-400">{hosp.icuBeds} Beds</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block">{t.emergencyBedsLabel}</span>
                                                <span className="text-lg sm:text-xl font-black text-rose-400">{hosp.emergencyBeds} Beds</span>
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
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 text-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedAmbulanceModal(null)}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-rose-500 text-xl sm:text-2xl"
                        >
                            <BsXCircleFill />
                        </button>

                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                            <img
                                src={selectedAmbulanceModal.image}
                                alt={language === 'hi' ? selectedAmbulanceModal.nameHi : selectedAmbulanceModal.nameEn}
                                className="w-full sm:w-56 h-40 sm:h-44 object-cover rounded-xl sm:rounded-2xl border border-slate-700"
                            />
                            <div className="space-y-2">
                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                    {language === 'hi' ? selectedAmbulanceModal.categorySimpleHi : selectedAmbulanceModal.categorySimpleEn}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black text-white">
                                    {language === 'hi' ? selectedAmbulanceModal.nameHi : selectedAmbulanceModal.nameEn}
                                </h3>
                                <p className="text-xs font-bold text-amber-300 font-mono">
                                    {t.plateNoLabel} {selectedAmbulanceModal.plateNo} • Model: {selectedAmbulanceModal.vehicleModel}
                                </p>
                                <p className="text-xs text-slate-300">📍 Location: {language === 'hi' ? selectedAmbulanceModal.locationHi : selectedAmbulanceModal.locationEn}</p>
                                <p className="text-xs text-emerald-400 font-bold">🌐 Coverage: {language === 'hi' ? selectedAmbulanceModal.serviceCoverageHi : selectedAmbulanceModal.serviceCoverageEn}</p>
                            </div>
                        </div>

                        {/* Driver & Founder Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                            <div className="p-4 bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-800 space-y-1 text-xs">
                                <h4 className="font-bold text-rose-400 uppercase text-[10px]">{t.modalDriverProfile}</h4>
                                <p className="text-sm font-bold text-white">{selectedAmbulanceModal.driverName}</p>
                                <p className="text-slate-400">{t.licenseNoLabel} <strong className="text-slate-200 font-mono">{selectedAmbulanceModal.licenseNo}</strong></p>
                                <p className="text-slate-400">{t.experienceLabel} <strong className="text-emerald-400">{language === 'hi' ? selectedAmbulanceModal.driverExperienceHi : selectedAmbulanceModal.driverExperienceEn}</strong></p>
                            </div>

                            <div className="p-4 bg-rose-500/10 rounded-xl sm:rounded-2xl border border-rose-500/30 space-y-1 text-xs">
                                <h4 className="font-bold text-rose-400 uppercase text-[10px]">{t.modalFounderHotline}</h4>
                                <p className="text-xs font-bold text-white">Sehaat Saathi Emergency Help</p>
                                <p className="font-bold text-emerald-400 font-mono text-xs sm:text-sm">📞 +91 6200087830</p>
                                <p className="font-bold text-emerald-400 font-mono text-xs sm:text-sm">📞 +91 9934276622</p>
                            </div>
                        </div>

                        {/* Complete Facilities Checklist */}
                        <div className="space-y-3 mb-6 sm:mb-8">
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">{t.modalEquipmentTitle}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {(language === 'hi' ? selectedAmbulanceModal.facilitiesHi : selectedAmbulanceModal.facilitiesEn).map((fac, fidx) => (
                                    <div key={fidx} className="p-2.5 sm:p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                                        <BsCheckLg className="text-emerald-400 shrink-0" />
                                        <span>{fac}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <a
                                href={`tel:${selectedAmbulanceModal.contactNumbers[0]}`}
                                className="py-3 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center justify-center gap-2"
                            >
                                <FaPhoneAlt /> {t.callFounderBtn}
                            </a>
                            <button
                                onClick={() => {
                                    const text = `Emergency Ambulance Request: ${selectedAmbulanceModal.nameEn} (${selectedAmbulanceModal.plateNo}). Driver: ${selectedAmbulanceModal.driverName}. Location: ${selectedAmbulanceModal.locationEn}.`;
                                    window.open(`https://api.whatsapp.com/send?phone=916200087830&text=${encodeURIComponent(text)}`, '_blank');
                                }}
                                className="py-3 rounded-xl sm:rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 border border-slate-700"
                            >
                                <BsWhatsapp className="text-green-500" /> WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AmbulanceBooking;
