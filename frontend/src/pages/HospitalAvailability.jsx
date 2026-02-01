import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsHospital, BsSearch, BsGeoAlt, BsFilter, BsActivity, BsCheckCircleFill,
    BsClock, BsPhone, BsArrowRight, BsShieldCheck, BsExclamationTriangleFill,
    BsDropletFill, BsHeartPulseFill, BsLungs, BsGrid, BsListUl, BsXLg,
    BsInfoCircle, BsMap, BsPlusCircle, BsToggleOn, BsToggleOff, BsStars,
    BsCalendar, BsClipboardCheck, BsTruck, BsBellFill, BsGear, BsChatDots,
    BsSend, BsRobot, BsPerson, BsCurrencyRupee, BsChevronDown, BsChevronUp
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

const HospitalAvailability = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('find');
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState('all');
    const [searchRadius, setSearchRadius] = useState(10);
    const [location, setLocation] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);

    // AI Chatbot states
    const [showChatbot, setShowChatbot] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Ambulance booking states
    const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
    const [ambulanceType, setAmbulanceType] = useState('BLS');
    const [selectedHospitalForAmbulance, setSelectedHospitalForAmbulance] = useState(null);

    // Doctor availability states
    const [showDoctors, setShowDoctors] = useState(false);
    const [selectedSpecialization, setSelectedSpecialization] = useState('all');

    // Department expansion states
    const [expandedHospitalId, setExpandedHospitalId] = useState(null);

    // Registration states
    const [hospitalForm, setHospitalForm] = useState({
        name: '',
        address: '',
        contact: '',
        license: '',
        icuTotal: 0,
        icuAvailable: 0,
        generalTotal: 0,
        generalAvailable: 0,
        oxygenAvailable: false,
        ventilatorsAvailable: 0,
        emergency24x7: false,
        opdMorning: false,
        opdEvening: false
    });
    // Mock hospital data with doctors and departments
    const hospitalList = [
        { id: 1, name: "AIIMS Patna", addr: "Phulwari Sharif", city: "Patna", dist: "1.2 km", beds: 120 },
        { id: 2, name: "PMCH Patna", addr: "Ashok Rajpath", city: "Patna", dist: "4.5 km", beds: 150 },
        { id: 3, name: "IGIMS Patna", addr: "Raja Bazar", city: "Patna", dist: "2.8 km", beds: 80 },
        { id: 4, name: "Paras HMRI Patna", addr: "Raja Bazar", city: "Patna", dist: "3.1 km", beds: 60 },
        { id: 5, name: "Ford Hospital Patna", addr: "Kankarbagh", city: "Patna", dist: "5.2 km", beds: 40 },
        { id: 6, name: "Ruban Memorial Patna", addr: "Pataliputra", city: "Patna", dist: "3.5 km", beds: 45 },
        { id: 7, name: "Mediversal Patna", addr: "Kankarbagh", city: "Patna", dist: "5.5 km", beds: 50 },
        { id: 8, name: "DMCH Darbhanga", addr: "Laheriasarai", city: "Darbhanga", dist: "130 km", beds: 60 },
        { id: 9, name: "Sky Hospital Darbhanga", addr: "Darbhanga", city: "Darbhanga", dist: "135 km", beds: 30 },
        { id: 10, name: "Madhubani Sadar Hospital", addr: "Madhubani Town", city: "Madhubani", dist: "175 km", beds: 40 },
        { id: 11, name: "Don Bosco Madhubani", addr: "Madhubani", city: "Madhubani", dist: "178 km", beds: 25 },
        { id: 12, name: "Madhubani Medical College", addr: "Madhubani", city: "Madhubani", dist: "180 km", beds: 100 },
        { id: 13, name: "ANMMCH Gaya", addr: "Sherghati Road", city: "Gaya", dist: "95 km", beds: 50 },
        { id: 14, name: "Gaya District Hospital", addr: "Gaya Town", city: "Gaya", dist: "98 km", beds: 40 },
        { id: 15, name: "SKMCH Muzaffarpur", addr: "SKMCH Campus", city: "Muzaffarpur", dist: "75 km", beds: 50 },
        { id: 16, name: "Kejriwal Muzaffarpur", addr: "Bairiya", city: "Muzaffarpur", dist: "78 km", beds: 35 },
        { id: 17, name: "JLNMCH Bhagalpur", addr: "Mayaganj", city: "Bhagalpur", dist: "210 km", beds: 45 },
        { id: 18, name: "MGM Hospital Purnia", addr: "Line Bazar", city: "Purnia", dist: "310 km", beds: 30 },
        { id: 19, name: "NMCH Sasaram", addr: "Sasaram", city: "Rohtas", dist: "160 km", beds: 35 },
        { id: 20, name: "Arrah District Hospital", addr: "Arrah Town", city: "Bhojpur", dist: "55 km", beds: 20 },
        // ... (Expanding with 50+ New Specific Bihar Hospitals)
        { id: 51, name: "Jainagar Sub-Div Hospital", addr: "Jainagar", city: "Madhubani", dist: "195 km", beds: 30 },
        { id: 52, name: "Benipatti Referral Hosp", addr: "Benipatti", city: "Madhubani", dist: "190 km", beds: 20 },
        { id: 53, name: "Jhanjharpur SDH", addr: "Jhanjharpur", city: "Madhubani", dist: "185 km", beds: 25 },
        { id: 54, name: "Phulparas SDH", addr: "Phulparas", city: "Madhubani", dist: "192 km", beds: 30 },
        { id: 55, name: "Sakri Nursing Home", addr: "Sakri", city: "Madhubani", dist: "172 km", beds: 15 },
        { id: 56, name: "Bahera SDH Darbhanga", addr: "Bahera", city: "Darbhanga", dist: "145 km", beds: 20 },
        { id: 57, name: "Biraul SDH Darbhanga", addr: "Biraul", city: "Darbhanga", dist: "150 km", beds: 25 },
        { id: 58, name: "Benipur SDH", addr: "Benipur", city: "Darbhanga", dist: "148 km", beds: 30 },
        { id: 59, name: "Darbhanga Nursing Home", addr: "Donar", city: "Darbhanga", dist: "131 km", beds: 12 },
        { id: 60, name: "Mithila Hospital", addr: "Darbhanga", city: "Darbhanga", dist: "133 km", beds: 18 },
        { id: 61, name: "Samastipur Civil Hosp", addr: "Samastipur", city: "Samastipur", dist: "98 km", beds: 40 },
        { id: 62, name: "Dalsinghsarai SDH", addr: "Samastipur", city: "Samastipur", dist: "105 km", beds: 25 },
        { id: 63, name: "Rosera SDH", addr: "Samastipur", city: "Samastipur", dist: "110 km", beds: 30 },
        { id: 64, name: "Pusa Medical Unit", addr: "Samastipur", city: "Samastipur", dist: "92 km", beds: 15 },
        { id: 65, name: "Saharsa District Hosp", addr: "Saharsa", city: "Saharsa", dist: "232 km", beds: 45 },
        { id: 66, name: "Simri Bakhtiyarpur SDH", addr: "Saharsa", city: "Saharsa", dist: "240 km", beds: 20 },
        { id: 67, name: "Koshi Medical College", addr: "Saharsa", city: "Saharsa", dist: "235 km", beds: 80 },
        { id: 68, name: "Madhepura Govt Hosp", addr: "Madhepura", city: "Madhepura", dist: "255 km", beds: 50 },
        { id: 69, name: "Bihariganj SDH", addr: "Madhepura", city: "Madhepura", dist: "260 km", beds: 20 },
        { id: 70, name: "Supual District Hosp", addr: "Supual", city: "Supual", dist: "247 km", beds: 35 },
        { id: 71, name: "Triveniganj SDH", addr: "Supual", city: "Supual", dist: "255 km", beds: 15 },
        { id: 72, name: "Birpur SDH", addr: "Supual", city: "Supual", dist: "265 km", beds: 25 },
        { id: 73, name: "Araria Sadar Hosp", addr: "Araria", city: "Araria", dist: "290 km", beds: 40 },
        { id: 74, name: "Forbesganj SDH", addr: "Araria", city: "Araria", dist: "305 km", beds: 25 },
        { id: 75, name: "Kishanganj District Hosp", addr: "Kishanganj", city: "Kishanganj", dist: "382 km", beds: 45 },
        { id: 76, name: "Bahadurganj SDH", addr: "Kishanganj", city: "Kishanganj", dist: "395 km", beds: 15 },
        { id: 77, name: "Katihar Sadar Hosp", addr: "Katihar", city: "Katihar", dist: "298 km", beds: 50 },
        { id: 78, name: "Barsoi SDH Katihar", addr: "Katihar", city: "Katihar", dist: "315 km", beds: 20 },
        { id: 79, name: "Purnia Sadar Hosp", addr: "Purnia", city: "Purnia", dist: "312 km", beds: 70 },
        { id: 80, name: "Banmankhi SDH", addr: "Purnia", city: "Purnia", dist: "325 km", beds: 15 },
        { id: 81, name: "Bhagalpur City Hosp", addr: "Bhagalpur", city: "Bhagalpur", dist: "212 km", beds: 100 },
        { id: 82, name: "Kahalgaon SDH", addr: "Bhagalpur", city: "Bhagalpur", dist: "225 km", beds: 25 },
        { id: 83, name: "Naugachia SDH", addr: "Bhagalpur", city: "Bhagalpur", dist: "230 km", beds: 20 },
        { id: 84, name: "Banka District Hosp", addr: "Banka", city: "Banka", dist: "257 km", beds: 30 },
        { id: 85, name: "Amarpur Referral Hosp", addr: "Banka", city: "Banka", dist: "265 km", beds: 15 },
        { id: 86, name: "Munger City Hosp", addr: "Munger", city: "Munger", dist: "187 km", beds: 40 },
        { id: 87, name: "Jamalpur SDH", addr: "Munger", city: "Munger", dist: "192 km", beds: 20 },
        { id: 88, name: "Lakhisarai Sadar", addr: "Lakhisarai", city: "Lakhisarai", dist: "137 km", beds: 30 },
        { id: 89, name: "Sheikhpura Sadar", addr: "Sheikhpura", city: "Sheikhpura", dist: "127 km", beds: 25 },
        { id: 90, name: "Begusarai Govt Hosp", addr: "Begusarai", city: "Begusarai", dist: "122 km", beds: 60 },
        { id: 91, name: "Teghra SDH Begusarai", addr: "Begusarai", city: "Begusarai", dist: "115 km", beds: 20 },
        { id: 92, name: "Khagaria Sadar", addr: "Khagaria", city: "Khagaria", dist: "167 km", beds: 35 },
        { id: 93, name: "Gogri SDH Khagaria", addr: "Khagaria", city: "Khagaria", dist: "175 km", beds: 15 },
        { id: 94, name: "Jehanabad Sadar", addr: "Jehanabad", city: "Jehanabad", dist: "54 km", beds: 40 },
        { id: 95, name: "Arwal District", addr: "Arwal", city: "Arwal", dist: "77 km", beds: 25 },
        { id: 96, name: "Aurangabad Sadar", addr: "Aurangabad", city: "Aurangabad", dist: "147 km", beds: 50 },
        { id: 97, name: "Daudnagar SDH", addr: "Aurangabad", city: "Aurangabad", dist: "155 km", beds: 20 },
        { id: 98, name: "Rohtas District", addr: "Sasaram", city: "Rohtas", dist: "162 km", beds: 45 },
        { id: 99, name: "Dehri SDH Rohtas", addr: "Dehri", city: "Rohtas", dist: "170 km", beds: 25 },
        { id: 100, name: "Kaimur District Hosp", addr: "Bhabua", city: "Kaimur", dist: "185 km", beds: 35 }
    ];

    const mockHospitals = hospitalList.map(h => ({
        id: h.id,
        name: h.name,
        location: { address: `${h.addr}, ${h.city}`, lat: 25.5 + (Math.random() * 2), lng: 85.1 + (Math.random() * 2) },
        distance: h.dist,
        icuBeds: { total: h.beds, available: Math.floor(h.beds * 0.25) },
        generalBeds: { total: h.beds * 5, available: Math.floor(h.beds * 1.5) },
        oxygen: true,
        ventilators: Math.floor(h.beds * 0.1),
        emergency24x7: true,
        opdWaitTime: `${10 + Math.floor(Math.random() * 50)} mins`,
        verified: true,
        lastUpdated: "Just now",
        facilities: ['ICU', 'OPD', 'Oxygen', 'Ventilator', 'Emergency', 'Blood Bank', 'Queue Status'],
        queueToken: { current: Math.floor(Math.random() * 40) + 1, waiting: Math.floor(Math.random() * 15) },
        bloodBank: {
            "O+": Math.floor(Math.random() * 20),
            "B+": Math.floor(Math.random() * 15),
            "AB+": Math.floor(Math.random() * 10),
            "A+": Math.floor(Math.random() * 25)
        },
        videoConsult: true,
        doctors: [
            { id: h.id + 100, name: `Dr. ${['Kumar', 'Singh', 'Prasad', 'Jha', 'Mishra'][h.id % 5]}`, specialization: ['Cardiology', 'Neurology', 'Surgery', 'Pediatrics'][h.id % 4], available: true, rating: 4.5 + (Math.random() * 0.5), fee: 300 + (h.id * 5), experience: `${10 + (h.id % 15)} years`, video: true },
            { id: h.id + 200, name: `Dr. ${['Mehta', 'Sinha', 'Ray', 'Verma', 'Sharma'][h.id % 5]}`, specialization: 'General Medicine', available: true, rating: 4.2 + (Math.random() * 0.7), fee: 200 + (h.id * 3), experience: `${5 + (h.id % 10)} years`, video: true }
        ],
        departments: [
            { name: "Emergency", available: true, waitTime: "15 mins", equipment: ["Ventilators", "Defib"] },
            { name: "General Ward", available: true, waitTime: "30 mins", equipment: ["Beds", "Oxygen"] },
            { name: "Radiology", available: h.id % 2 === 0, waitTime: "45 mins", equipment: ["X-Ray", "CT Scan"] }
        ]
    }));

    // Filter hospitals based on selected facility and emergency mode
    const filteredHospitals = mockHospitals.filter(hospital => {
        if (selectedFacility === 'all') return true;
        if (selectedFacility === 'ICU') return hospital.icuBeds.available > 0;
        if (selectedFacility === 'Oxygen') return hospital.oxygen;
        if (selectedFacility === 'Ventilator') return hospital.ventilators > 0;
        if (selectedFacility === 'Emergency') return hospital.emergency24x7;
        if (selectedFacility === 'OPD') return parseInt(hospital.opdWaitTime) < 60;
        return true;
    }).sort((a, b) => {
        // AI Priority: Emergency mode sorts by availability then distance
        if (emergencyMode) {
            const aScore = (a.icuBeds.available / a.icuBeds.total) + (a.generalBeds.available / a.generalBeds.total);
            const bScore = (b.icuBeds.available / b.icuBeds.total) + (b.generalBeds.available / b.generalBeds.total);
            if (bScore !== aScore) return bScore - aScore;
        }
        // Default: sort by distance
        return parseFloat(a.distance) - parseFloat(b.distance);
    });

    const handleEmergencyToggle = () => {
        setEmergencyMode(!emergencyMode);
        if (!emergencyMode) {
            toast.error("🚨 EMERGENCY MODE ACTIVATED!", { autoClose: 2000 });
        } else {
            toast.info("✓ Normal mode resumed", { autoClose: 1500 });
        }
    };

    const handleCall = (hospitalName) => {
        toast.success(`📞 Calling ${hospitalName}...`);
    };

    const handleNavigate = (hospitalName) => {
        toast.info(`🗺️ Opening directions to ${hospitalName}...`);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        toast.success("🎉 Hospital Registered Successfully! Verification pending.");
        setHospitalForm({
            name: '', address: '', contact: '', license: '',
            icuTotal: 0, icuAvailable: 0, generalTotal: 0, generalAvailable: 0,
            oxygenAvailable: false, ventilatorsAvailable: 0, emergency24x7: false,
            opdMorning: false, opdEvening: false
        });
    };

    // AI Chatbot Handlers
    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        const newMessage = { type: 'user', text: userInput };
        setChatMessages([...chatMessages, newMessage]);
        setUserInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let aiResponse = '';
            const input = userInput.toLowerCase();
            if (input.includes('blood') || input.includes('khoon') || input.includes('o+') || input.includes('b+')) {
                const group = input.includes('o+') ? 'O+' : input.includes('b+') ? 'B+' : 'A+';
                aiResponse = `🩸 Blood Bank Alert:\n\n🏥 ${filteredHospitals[0]?.name} has ${filteredHospitals[0]?.bloodBank[group] || 5} units of ${group} available.\n\nType 'Need donor' if you want me to contact local volunteers.`;
            } else if (input.includes('queue') || input.includes('line') || input.includes('token') || input.includes('wait')) {
                aiResponse = `🕒 Live Queue Status:\n\n🏥 ${filteredHospitals[0]?.name}\n- Current Token: #${filteredHospitals[0]?.queueToken.current}\n- Est. Wait: ${filteredHospitals[0]?.queueToken.waiting} mins\n\nI can book a 'Priority Token' for you if it's urgent.`;
            } else if (input.includes('video') || input.includes('online') || input.includes('consult')) {
                aiResponse = `📹 Digital OPD:\n\nI found ${filteredHospitals.filter(h => h.videoConsult).length} hospitals with Video Consultation active.\n\n🏥 ${filteredHospitals[0]?.name} is online now.\n\nShall I send you the secure joining link?`;
            } else if (input.includes('chest pain') || input.includes('heart') || input.includes('cardiac') || input.includes('dil') || input.includes('seena')) {
                aiResponse = "🚨 CRITICAL ALERT! This sounds like a cardiac emergency!\n\nI found 3 hospitals with Cardiology:\n\n🏥 Apollo Hospital (2.5km)\n- Dr. Rajesh Sharma available\n- 12 ICU beds\n- ₹800 consultation\n\nShall I book an ambulance for you?";
            } else if (input.includes('brain') || input.includes('head') || input.includes('neurolog') || input.includes('sar dard')) {
                aiResponse = "I found hospitals with Neurology specialists:\n\n🏥 Max Hospital (7.2km)\n- Dr. Suresh Reddy available now\n- 18 ICU beds\n- MRI available\n\nWould you like the quickest route?";
            } else if (input.includes('lung') || input.includes('breath') || input.includes('oxygen') || input.includes('saans')) {
                aiResponse = "Oxygen & Ventilator Status:\n\n🏥 Medanta (12.3km) has high availability:\n- 28 Ventilators On-site\n- Full Oxygen support\n- Normal traffic route";
            } else if (input.includes('icu') || input.includes('bed') || input.includes('khali')) {
                aiResponse = `Found ${filteredHospitals.length} hospitals with facilities available:\n\n` +
                    filteredHospitals.slice(0, 3).map(h => `🏥 ${h.name} (${h.distance})\n✨ ${h.icuBeds.available} ICU beds left!`).join('\n\n');
            } else if (input.includes('hindi')) {
                aiResponse = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप अपनी बीमारी या अस्पताल की ज़रूरत के बारे में बता सकते हैं।";
            } else {
                aiResponse = "Hello! I am your Sehaat Saathi AI.\n\nType your symptom like:\n• 'Chest pain' (हृदय की समस्या)\n• 'Breathing issues' (सांस की समस्या)\n• 'Need ICU bed' (ICU बेड चाहिए)\n\nI will find the best hospital for you instantly.";
            }

            setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    // Ambulance booking handler
    const handleBookAmbulance = (hospital) => {
        setSelectedHospitalForAmbulance(hospital);
        setShowAmbulanceModal(true);
    };

    const confirmAmbulanceBooking = () => {
        confetti({ particleCount: 100, spread: 60 });
        toast.success(`🚑 Ambulance (${ambulanceType}) booked! ETA: 8 mins to ${selectedHospitalForAmbulance.name}`);
        setShowAmbulanceModal(false);
    };

    // Department toggle
    const toggleDepartments = (hospitalId) => {
        setExpandedHospitalId(expandedHospitalId === hospitalId ? null : hospitalId);
    };

    const getAvailabilityColor = (available, total) => {
        const percentage = (available / total) * 100;
        if (percentage >= 70) return 'emerald';
        if (percentage >= 30) return 'orange';
        return 'red';
    };

    const getAvailabilityBadge = (available, total) => {
        const percentage = (available / total) * 100;
        if (percentage >= 70) return { text: 'Available', color: 'bg-emerald-500' };
        if (percentage >= 30) return { text: 'Limited', color: 'bg-orange-500' };
        return { text: 'Critical', color: 'bg-red-500' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20" >
            {/* Hero Section */}
            < div className="relative overflow-hidden" >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-pink-600/20 to-red-600/20 animate-pulse"></div>
                <div className="container mx-auto px-4 py-16 relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border-2 border-red-500/50 mb-6 backdrop-blur-sm">
                            <BsHospital className="text-3xl text-red-400 animate-pulse" />
                            <span className="text-sm font-black uppercase tracking-widest text-red-300">Life-Saving System</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
                            Live Hospital & Bed Availability
                        </h1>

                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Real-time discovery of <span className="text-red-400 font-black">ICU beds</span>, <span className="text-cyan-400 font-black">oxygen</span>, <span className="text-emerald-400 font-black">ventilators</span>, and emergency facilities. AI-powered for critical situations.
                        </p>

                        {/* Emergency Mode Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className={`text-sm font-bold ${emergencyMode ? 'text-slate-500' : 'text-emerald-400'}`}>Normal</span>
                            <button
                                onClick={handleEmergencyToggle}
                                className={`relative w-20 h-10 rounded-full transition-all ${emergencyMode ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]' : 'bg-slate-700'}`}
                            >
                                <div className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-all ${emergencyMode ? 'right-1' : 'left-1'}`}>
                                    {emergencyMode && <BsExclamationTriangleFill className="text-red-500 m-auto mt-2" />}
                                </div>
                            </button>
                            <span className={`text-sm font-bold ${emergencyMode ? 'text-red-400 animate-pulse' : 'text-slate-500'}`}>🚨 EMERGENCY</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <div className="p-4 bg-slate-900/50 border border-emerald-500/30 rounded-2xl backdrop-blur-sm">
                                <div className="text-3xl font-black text-emerald-400 mb-1">{filteredHospitals.length}</div>
                                <div className="text-xs text-slate-400 font-bold">Hospitals Found</div>
                            </div>
                            <div className="p-4 bg-slate-900/50 border border-cyan-500/30 rounded-2xl backdrop-blur-sm">
                                <div className="text-3xl font-black text-cyan-400 mb-1">
                                    {filteredHospitals.reduce((sum, h) => sum + h.icuBeds.available, 0)}
                                </div>
                                <div className="text-xs text-slate-400 font-bold">ICU Beds Available</div>
                            </div>
                            <div className="p-4 bg-slate-900/50 border border-pink-500/30 rounded-2xl backdrop-blur-sm">
                                <div className="text-3xl font-black text-pink-400 mb-1">
                                    {filteredHospitals.reduce((sum, h) => sum + h.generalBeds.available, 0)}
                                </div>
                                <div className="text-xs text-slate-400 font-bold">General Beds</div>
                            </div>
                            <div className="p-4 bg-slate-900/50 border border-orange-500/30 rounded-2xl backdrop-blur-sm">
                                <div className="text-3xl font-black text-orange-400 mb-1">
                                    {filteredHospitals.reduce((sum, h) => sum + h.ventilators, 0)}
                                </div>
                                <div className="text-xs text-slate-400 font-bold">Ventilators</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className="container mx-auto px-4">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-4 mb-8 bg-slate-900/50 p-2 rounded-2xl border border-slate-700 backdrop-blur-sm sticky top-24 z-40">
                    <button
                        onClick={() => setActiveTab('find')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeTab === 'find' ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <BsSearch /> Find Hospitals
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeTab === 'register' ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <BsPlusCircle /> Register Hospital
                    </button>
                    <button
                        onClick={() => setActiveTab('status')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeTab === 'status' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <BsActivity /> Live Status Board
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeTab === 'map' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                        <BsMap /> Interactive 3D Map
                    </button>
                </div>

                {/* Find Hospitals Tab */}
                {activeTab === 'find' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Search Controls */}
                        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 backdrop-blur-sm">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                {/* Facility Filter */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Required Facility</label>
                                    <select
                                        value={selectedFacility}
                                        onChange={(e) => setSelectedFacility(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold focus:border-red-500 focus:outline-none"
                                    >
                                        <option value="all">All Facilities</option>
                                        <option value="ICU">🛏️ ICU Beds</option>
                                        <option value="OPD">⏰ OPD (Quick)</option>
                                        <option value="Oxygen">💨 Oxygen</option>
                                        <option value="Ventilator">🫁 Ventilator</option>
                                        <option value="Emergency">🚨 Emergency 24×7</option>
                                    </select>
                                </div>

                                {/* Radius Selector */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Search Radius</label>
                                    <select
                                        value={searchRadius}
                                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white font-bold focus:border-red-500 focus:outline-none"
                                    >
                                        <option value={5}>5 km</option>
                                        <option value={10}>10 km</option>
                                        <option value={25}>25 km</option>
                                        <option value={50}>50 km</option>
                                    </select>
                                </div>

                                {/* View Toggle */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">View Mode</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                        >
                                            <BsGrid className="inline mr-2" /> Grid
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                        >
                                            <BsListUl className="inline mr-2" /> List
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {emergencyMode && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-start gap-3 animate-pulse">
                                    <BsExclamationTriangleFill className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-black text-red-400 mb-1">EMERGENCY MODE ACTIVE</div>
                                        <div className="text-sm text-slate-300">Results prioritized by bed availability. Call 102/108 for immediate ambulance.</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Hospital Results */}
                        <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                            {filteredHospitals.length === 0 ? (
                                <div className="col-span-3 text-center py-20">
                                    <BsHospital className="text-6xl text-slate-700 mx-auto mb-4" />
                                    <p className="text-slate-500 text-lg">No hospitals found matching your criteria</p>
                                </div>
                            ) : (
                                filteredHospitals.map((hospital, index) => (
                                    <HospitalCard
                                        key={hospital.id}
                                        hospital={hospital}
                                        emergencyMode={emergencyMode}
                                        index={index}
                                        onCall={handleCall}
                                        onNavigate={handleNavigate}
                                        getAvailabilityColor={getAvailabilityColor}
                                        getAvailabilityBadge={getAvailabilityBadge}
                                        onBookAmbulance={handleBookAmbulance}
                                        expandedId={expandedHospitalId}
                                        onToggleDepartments={toggleDepartments}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Register Hospital Tab */}
                {activeTab === 'register' && (
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="text-center mb-8">
                                <BsHospital className="text-5xl text-emerald-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Register Your Hospital</h2>
                                <p className="text-slate-400">Join the life-saving network and help patients find you instantly</p>
                            </div>

                            <form onSubmit={handleRegistration} className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2">Hospital Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={hospitalForm.name}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                                            placeholder="Enter hospital name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2">License Number *</label>
                                        <input
                                            type="text"
                                            required
                                            value={hospitalForm.license}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, license: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                                            placeholder="Medical license number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Full Address *</label>
                                    <input
                                        type="text"
                                        required
                                        value={hospitalForm.address}
                                        onChange={(e) => setHospitalForm({ ...hospitalForm, address: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                                        placeholder="Street, City, State, PIN"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Contact Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={hospitalForm.contact}
                                        onChange={(e) => setHospitalForm({ ...hospitalForm, contact: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                                        placeholder="+91 XXXXXXXXXX"
                                    />
                                </div>

                                {/* Bed Capacity */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-800/50 border border-cyan-500/30 rounded-2xl">
                                        <h3 className="font-black text-cyan-400 mb-4 flex items-center gap-2">
                                            <BsActivity /> ICU Beds
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Total ICU Beds</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={hospitalForm.icuTotal}
                                                    onChange={(e) => setHospitalForm({ ...hospitalForm, icuTotal: Number(e.target.value) })}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Currently Available</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={hospitalForm.icuTotal}
                                                    value={hospitalForm.icuAvailable}
                                                    onChange={(e) => setHospitalForm({ ...hospitalForm, icuAvailable: Number(e.target.value) })}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-800/50 border border-emerald-500/30 rounded-2xl">
                                        <h3 className="font-black text-emerald-400 mb-4 flex items-center gap-2">
                                            <BsActivity /> General Beds
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Total General Beds</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={hospitalForm.generalTotal}
                                                    onChange={(e) => setHospitalForm({ ...hospitalForm, generalTotal: Number(e.target.value) })}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Currently Available</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={hospitalForm.generalTotal}
                                                    value={hospitalForm.generalAvailable}
                                                    onChange={(e) => setHospitalForm({ ...hospitalForm, generalAvailable: Number(e.target.value) })}
                                                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Facilities Toggles */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <label className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:border-cyan-500 transition-all">
                                        <span className="font-bold text-white flex items-center gap-2">
                                            <BsDropletFill className="text-cyan-400" /> Oxygen Available
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={hospitalForm.oxygenAvailable}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, oxygenAvailable: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:border-red-500 transition-all">
                                        <span className="font-bold text-white flex items-center gap-2">
                                            <BsExclamationTriangleFill className="text-red-400" /> 24×7 Emergency
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={hospitalForm.emergency24x7}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, emergency24x7: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:border-emerald-500 transition-all">
                                        <span className="font-bold text-white flex items-center gap-2">
                                            <BsClock className="text-emerald-400" /> Morning OPD
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={hospitalForm.opdMorning}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, opdMorning: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:border-orange-500 transition-all">
                                        <span className="font-bold text-white flex items-center gap-2">
                                            <BsClock className="text-orange-400" /> Evening OPD
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={hospitalForm.opdEvening}
                                            onChange={(e) => setHospitalForm({ ...hospitalForm, opdEvening: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Ventilators Available</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={hospitalForm.ventilatorsAvailable}
                                        onChange={(e) => setHospitalForm({ ...hospitalForm, ventilatorsAvailable: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                                        placeholder="Number of ventilators"
                                    />
                                </div>

                                {/* Disclaimer */}
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-2xl">
                                    <div className="flex items-start gap-3">
                                        <BsInfoCircle className="text-yellow-400 text-xl flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-yellow-200">
                                            <div className="font-black mb-1">⚠️ Important Legal Notice</div>
                                            <ul className="text-xs space-y-1 text-yellow-300/80">
                                                <li>• You are responsible for maintaining accurate real-time data</li>
                                                <li>• Verification required before going live</li>
                                                <li>• Incorrect information may lead to account suspension</li>
                                                <li>• Regular updates mandatory for emergency facilities</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/30"
                                >
                                    🏥 Register Hospital
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Live Status Board Tab */}
                {activeTab === 'status' && (
                    <div className="animate-fade-in">
                        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/50 rounded-2xl text-center">
                            <div className="text-sm font-bold text-purple-300">
                                <BsActivity className="inline mr-2 animate-pulse" />
                                Auto-refreshing every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockHospitals.map((hospital, index) => (
                                <div
                                    key={hospital.id}
                                    className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 backdrop-blur-sm hover:scale-105 transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-black text-white text-lg mb-1">{hospital.name}</h3>
                                            <p className="text-xs text-slate-500">{hospital.location.address}</p>
                                        </div>
                                        {hospital.verified && (
                                            <BsCheckCircleFill className="text-emerald-400 text-xl" />
                                        )}
                                    </div>

                                    {/* Bed Status Bars */}
                                    <div className="space-y-3 mb-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400 font-bold">ICU Beds</span>
                                                <span className="text-cyan-400 font-black">{hospital.icuBeds.available}/{hospital.icuBeds.total}</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000`}
                                                    style={{ width: `${(hospital.icuBeds.available / hospital.icuBeds.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400 font-bold">General Beds</span>
                                                <span className="text-emerald-400 font-black">{hospital.generalBeds.available}/{hospital.generalBeds.total}</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-1000`}
                                                    style={{ width: `${(hospital.generalBeds.available / hospital.generalBeds.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <BsLungs className="text-purple-400" />
                                            <span>{hospital.ventilators} Ventilators</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <BsClock className="text-orange-400" />
                                            <span>{hospital.opdWaitTime}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-500">
                                        Updated {hospital.lastUpdated}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}

                {/* FEATURE 4: 3D INTERACTIVE MAP TAB */}
                {activeTab === 'map' && (
                    <div className="animate-fade-in space-y-8">
                        <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full animate-pulse">LIVE AR VIEW</div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-2">3D Hospital Locator</h2>
                                    <p className="text-slate-400">Visualizing real-time occupancy across {mockHospitals.length} hospitals</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <span className="text-xs font-bold">Low Occupancy</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold">Critical / Full</span>
                                    </div>
                                </div>
                            </div>

                            {/* MOCK 3D MAP VISUALIZATION */}
                            <div className="relative h-[600px] bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-700 group hover:border-blue-500/50 transition-all">
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #475569 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                                {/* Perspective Grid */}
                                <div className="absolute inset-0 preserve-3d" style={{ perspective: '1000px' }}>
                                    <div className="absolute inset-x-0 bottom-0 h-full bg-slate-900/50 transform-gpu rotate-x-60 origin-bottom scale-150" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

                                    {/* Mock 3D Buildings/Pillars for Hospitals */}
                                    {mockHospitals.map((h, i) => {
                                        const left = 15 + (i * 15);
                                        const top = 30 + (Math.sin(i) * 20);
                                        const height = (h.icuBeds.available / h.icuBeds.total) * 150 + 50;
                                        const isLow = (h.icuBeds.available / h.icuBeds.total) > 0.3;

                                        return (
                                            <div key={h.id} className="absolute transition-all duration-700 hover:scale-110 cursor-pointer group/marker" style={{ left: `${left}%`, top: `${top}%`, transformStyle: 'preserve-3d' }}>
                                                {/* 3D Pillar */}
                                                <div className={`w-8 bg-gradient-to-t ${isLow ? 'from-emerald-600 to-emerald-400' : 'from-red-600 to-red-400'} rounded-t-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] transform translate-z-10`} style={{ height: `${height}px`, transform: 'translateY(-100%) rotateY(45deg)' }}>
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-black text-white opacity-0 group-hover/marker:opacity-100 transition-opacity">
                                                        {h.name} ({h.icuBeds.available} Beds)
                                                    </div>
                                                </div>
                                                {/* Base Glow */}
                                                <div className={`w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${isLow ? 'bg-emerald-500/30' : 'bg-red-500/30'} absolute top-0 left-4`}></div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                                    <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
                                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Global Occupancy</div>
                                        <div className="text-2xl font-black text-white">42% Available</div>
                                        <div className="text-[10px] text-slate-500 mt-1">Real-time sync active</div>
                                    </div>
                                    <div className="flex gap-2 pointer-events-auto">
                                        <button className="p-3 bg-slate-900 rounded-full border border-slate-700 text-white hover:bg-slate-800"><BsPlusCircle /></button>
                                        <button className="p-3 bg-slate-900 rounded-full border border-slate-700 text-white hover:bg-slate-800"><BsMap /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-900/70 border border-slate-700 rounded-3xl backdrop-blur-sm">
                                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                    <BsStars className="text-cyan-400" /> AI Insights
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Our Neural-Map system suggests that North-East zone hospitals are currently experiencing low traffic. <span className="text-emerald-400 font-bold">Apollo Hospital</span> is the recommended destination for non-critical cases.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-900/70 border border-slate-700 rounded-3xl backdrop-blur-sm">
                                <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                    <BsShieldCheck className="text-emerald-400" /> System Integrity
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-400">Data Latency</span>
                                            <span className="text-emerald-400">0.4ms</span>
                                        </div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[95%] bg-emerald-500"></div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-emerald-400">99.9%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* FEATURE 1: AI HEALTH CONCIERGE CHATBOT */}
            {showChatbot && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900 border-2 border-purple-500 rounded-3xl shadow-2xl shadow-purple-500/50 z-50 flex flex-col animate-slide-up">
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BsRobot className="text-2xl text-white animate-pulse" />
                            <div>
                                <div className="font-black text-white">AI Health Concierge</div>
                                <div className="text-xs text-purple-200">Online • Instant Response</div>
                            </div>
                        </div>
                        <button onClick={() => setShowChatbot(false)} className="text-white hover:bg-white/20 p-2 rounded-full">
                            <BsXLg />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {chatMessages.length === 0 && (
                            <div className="text-center text-slate-500 mt-20">
                                <BsRobot className="text-6xl mx-auto mb-4 text-purple-500" />
                                <p className="font-bold">Hi! I'm your AI Health Assistant</p>
                                <p className="text-sm">Tell me your symptoms or health need</p>
                            </div>
                        )}
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-white'}`}>
                                    {msg.text.split('\\n').map((line, i) => (<div key={i}>{line}</div>))}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 p-3 rounded-2xl">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Describe your symptoms..."
                                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black hover:scale-105 transition-all"
                            >
                                <BsSend />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating AI Chat Button */}
            {!showChatbot && (
                <button
                    onClick={() => setShowChatbot(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-all z-50 animate-pulse"
                >
                    <BsChatDots className="text-2xl" />
                </button>
            )}

            {/* FEATURE 2: AMBULANCE BOOKING MODAL */}
            {showAmbulanceModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-8 max-w-lg w-full animate-fade-in shadow-2xl shadow-red-500/50">
                        <div className="text-center mb-6">
                            <BsTruck className="text-6xl text-red-500 mx-auto mb-4 animate-pulse" />
                            <h2 className="text-3xl font-black text-white mb-2">Book Ambulance</h2>
                            <p className="text-slate-400">Emergency transport to {selectedHospitalForAmbulance?.name}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Ambulance Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setAmbulanceType('BLS')}
                                        className={`p-3 rounded-xl font-bold transition-all ${ambulanceType === 'BLS' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                                    >
                                        🚑 BLS
                                    </button>
                                    <button
                                        onClick={() => setAmbulanceType('ALS')}
                                        className={`p-3 rounded-xl font-bold transition-all ${ambulanceType === 'ALS' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                                    >
                                        🚑 ALS
                                    </button>
                                    <button
                                        onClick={() => setAmbulanceType('AIR')}
                                        className={`p-3 rounded-xl font-bold transition-all ${ambulanceType === 'AIR' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                                    >
                                        🚁 AIR
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-800/50 border border-cyan-500/30 rounded-2xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-400">Estimated Time</span>
                                    <span className="text-2xl font-black text-cyan-400">8 mins</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Distance</span>
                                    <span className="font-bold text-white">{selectedHospitalForAmbulance?.distance}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-2xl">
                                <div className="flex items-start gap-2">
                                    <BsExclamationTriangleFill className="text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs text-yellow-200">
                                        Hospital will be pre-alerted. ICU bed will be reserved for your arrival.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAmbulanceModal(false)}
                                className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAmbulanceBooking}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-black hover:scale-105 transition-all"
                            >
                                🚑 Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
            `}</style>
        </div >
    );
};

// Hospital Card Component with ALL 5 GAME-CHANGING FEATURES
const HospitalCard = ({ hospital, emergencyMode, index, onCall, onNavigate, getAvailabilityColor, getAvailabilityBadge, onBookAmbulance, expandedId, onToggleDepartments }) => {
    const icuBadge = getAvailabilityBadge(hospital.icuBeds.available, hospital.icuBeds.total);
    const generalBadge = getAvailabilityBadge(hospital.generalBeds.available, hospital.generalBeds.total);
    const isExpanded = expandedId === hospital.id;

    return (
        <div
            className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 transition-all group animate-slide-up relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* AI Priority Badge */}
            {emergencyMode && index < 3 && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-black rounded-full animate-pulse flex items-center gap-1">
                        <BsStars /> AI PRIORITY
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-black text-white text-xl mb-1 group-hover:text-red-400 transition-colors">{hospital.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                        <BsGeoAlt className="text-cyan-400" /> {hospital.location.address}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-400">{hospital.distance}</span>
                        {hospital.verified && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
                                <BsCheckCircleFill className="text-emerald-400 text-xs" />
                                <span className="text-[10px] font-black text-emerald-400">VERIFIED</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bed Availability */}
            <div className="space-y-3 mb-4">
                <div className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 font-bold">🛏️ ICU Beds</span>
                        <span className={`px-2 py-0.5 ${icuBadge.color} text-white text-[10px] font-black rounded-full`}>
                            {icuBadge.text}
                        </span>
                    </div>
                    <div className="text-2xl font-black text-cyan-400">{hospital.icuBeds.available}<span className="text-sm text-slate-500">/{hospital.icuBeds.total}</span></div>
                </div>

                <div className="p-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 font-bold">🛏️ General Beds</span>
                        <span className={`px-2 py-0.5 ${generalBadge.color} text-white text-[10px] font-black rounded-full`}>
                            {generalBadge.text}
                        </span>
                    </div>
                    <div className="text-2xl font-black text-emerald-400">{hospital.generalBeds.available}<span className="text-sm text-slate-500">/{hospital.generalBeds.total}</span></div>
                </div>
            </div>

            {/* FEATURE 3: DOCTOR AVAILABILITY TRACKER */}
            {hospital.doctors && hospital.doctors.length > 0 && (
                <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                    <div className="text-xs font-black text-purple-300 mb-2 flex items-center gap-2">
                        <BsPerson /> DOCTORS ON DUTY ({hospital.doctors.filter(d => d.available).length} Available)
                    </div>
                    <div className="space-y-2">
                        {hospital.doctors.slice(0, 2).map(doctor => (
                            <div key={doctor.id} className="flex items-center justify-between text-xs">
                                <div>
                                    <div className="text-white font-bold">{doctor.name}</div>
                                    <div className="text-slate-400">{doctor.specialization}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xs font-black ${doctor.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {doctor.available ? '🟢 Available' : '🔴 Busy'}
                                    </div>
                                    <div className="text-slate-500 flex items-center gap-1">
                                        <BsCurrencyRupee className="text-[8px]" />{doctor.fee}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FEATURE 5: DEPARTMENT-WISE AVAILABILITY */}
            {hospital.departments && hospital.departments.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={() => onToggleDepartments(hospital.id)}
                        className="w-full p-3 bg-slate-800/50 border border-orange-500/30 rounded-xl text-xs font-black text-orange-300 flex items-center justify-between hover:bg-orange-500/10 transition-all"
                    >
                        <span>📊 DEPARTMENTS ({hospital.departments.length})</span>
                        {isExpanded ? <BsChevronUp /> : <BsChevronDown />}
                    </button>

                    {isExpanded && (
                        <div className="mt-2 space-y-2 animate-slide-up">
                            {hospital.departments.map((dept, idx) => (
                                <div key={idx} className="p-3 bg-slate-800/70 border border-slate-600 rounded-xl">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-white">{dept.name}</span>
                                        <span className={`text-xs font-black ${dept.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {dept.available ? '✓ Available' : '✗ Closed'}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-slate-400">Wait: {dept.waitTime}</div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {dept.equipment.map((eq, i) => (
                                            <span key={i} className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-[9px] rounded">
                                                {eq}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Facilities */}
            <div className="flex flex-wrap gap-2 mb-4">
                {hospital.oxygen && (
                    <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-black rounded-full">
                        💨 OXYGEN
                    </span>
                )}
                {hospital.ventilators > 0 && (
                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 text-purple-400 text-[10px] font-black rounded-full">
                        🫁 {hospital.ventilators} VENTS
                    </span>
                )}
                {hospital.emergency24x7 && (
                    <span className="px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-black rounded-full">
                        🚨 24×7
                    </span>
                )}
                <span className="px-2 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-[10px] font-black rounded-full">
                    ⏰ OPD: {hospital.opdWaitTime}
                </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
                <button
                    onClick={() => onCall(hospital.name)}
                    className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                    <BsPhone /> Call
                </button>
                <button
                    onClick={() => onNavigate(hospital.name)}
                    className="px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-black text-xs transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                    <BsGeoAlt /> Navigate
                </button>
                <button
                    onClick={() => onBookAmbulance(hospital)}
                    className="px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-black text-xs transition-all hover:scale-110 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 animate-pulse"
                >
                    <BsTruck /> 🚑 Book
                </button>
            </div>

            <div className="mt-3 text-[10px] text-slate-600 text-center">
                Updated {hospital.lastUpdated}
            </div>
        </div>
    );
};

export default HospitalAvailability;
