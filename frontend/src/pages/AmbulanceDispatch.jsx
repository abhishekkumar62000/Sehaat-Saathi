import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsTruck, BsGeoAltFill, BsPhoneFill, BsShieldFillCheck,
    BsLightningFill, BsHeartPulseFill, BsActivity, BsStars, BsPeopleFill,
    BsInfoCircleFill, BsClockHistory, BsCheckCircleFill, BsExclamationTriangleFill,
    BsMapFill, BsCreditCardFill, BsXCircleFill
} from 'react-icons/bs';

const AmbulanceDispatch = () => {
    const [step, setStep] = useState('triage'); // triage, location, searching, booking, tracking, reached
    const [emergencyType, setEmergencyType] = useState(null);
    const [priority, setPriority] = useState('LOW');
    const [selectedAmbulance, setSelectedAmbulance] = useState(null);
    const [ambCoords, setAmbCoords] = useState({ lat: 10, lng: 10 });
    const [droneCoords, setDroneCoords] = useState({ lat: 10, lng: 10 });
    const [eta, setEta] = useState(0);
    const [isDriverMode, setIsDriverMode] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [vitals, setVitals] = useState({ hr: 72, spo2: 98, bp: "120/80" });

    // Ride-Hailing State
    const [pickup, setPickup] = useState({ name: "Current Location", lat: 50, lng: 50 });
    const [destination, setDestination] = useState({ name: "Fortis Hospital", lat: 45, lng: 45 });
    const [activePhase, setActivePhase] = useState('idle'); // idle, to_patient, to_hospital

    // Mock Databases
    const ambulanceDB = [
        { id: 1, driver: "Ramesh Kumar", type: "Advanced ICU", lat: 30, lng: 40, status: "Available", distance: "1.2 km", phone: "+91 98765-43210", rating: 4.9 },
        { id: 2, driver: "Suresh Singh", type: "Basic Life Support", lat: 60, lng: 20, status: "Available", distance: "2.5 km", phone: "+91 87654-32109", rating: 4.7 },
        { id: 3, driver: "Anita Devi", type: "Advanced ICU", lat: 10, lng: 70, status: "Available", distance: "0.8 km", phone: "+91 76543-21098", rating: 5.0 },
        { id: 4, driver: "Vikram Raj", type: "Basic Life Support", lat: 80, lng: 50, status: "Available", distance: "3.1 km", phone: "+91 65432-10987", rating: 4.5 },
    ];

    const hospitals = [
        { name: "Fortis Hospital", lat: 45, lng: 45 },
        { name: "Apollo Pharmacy Hub", lat: 55, lng: 55 },
        { name: "AIIMS Patna", lat: 35, lng: 65 }
    ];

    const emergencies = [
        { id: 'cardiac', label: 'CARDIAC ARREST', icon: <BsHeartPulseFill />, priority: 'CRITICAL', color: 'bg-[#E11D48]', advice: "Perform chest compressions at 100-120 bpm. Use AED drone when it arrives." },
        { id: 'accident', label: 'ROAD ACCIDENT', icon: <BsExclamationTriangleFill />, priority: 'HIGH', color: 'bg-[#EA580C]', advice: "Apply pressure to any bleeding wounds. Do not move the patient's neck." },
        { id: 'pregnancy', label: 'PREGNANCY CASE', icon: <BsPeopleFill />, priority: 'MEDIUM', color: 'bg-[#4F46E5]', advice: "Keep the patient comfortable and monitor breathing. Ambulance is arriving." },
        { id: 'other', label: 'OTHERS', icon: <BsInfoCircleFill />, priority: 'LOW', color: 'bg-[#334155]', advice: "Stay calm. AI First-Aid is monitoring the situation." },
    ];

    const handleTriage = (type) => {
        setEmergencyType(type.label);
        setPriority(type.priority);
        setStep('location');
    };

    const confirmBooking = (amb) => {
        setSelectedAmbulance(amb);
        setAmbCoords({ lat: amb.lat, lng: amb.lng });
        setDroneCoords({ lat: amb.lat, lng: amb.lng });
        setEta(parseInt(amb.distance) * 2);
        setStep('tracking');
        setActivePhase('to_patient');

        const emergency = emergencies.find(e => e.label === emergencyType);
        if (emergency) speakAdvice(emergency.advice);
    };

    const startTransit = () => {
        setActivePhase('to_hospital');
        setEta(8); // ETA to hospital
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 5000);
    };

    const speakAdvice = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    // Multi-Phase Tracking Logic
    useEffect(() => {
        if (step === 'tracking' && eta > 0) {
            const moveInterval = setInterval(() => {
                const target = activePhase === 'to_patient' ? pickup : destination;

                setAmbCoords(prev => ({
                    lat: prev.lat + (target.lat - prev.lat) * 0.1,
                    lng: prev.lng + (target.lng - prev.lng) * 0.1
                }));

                if (activePhase === 'to_patient') {
                    setDroneCoords(prev => ({
                        lat: prev.lat + (target.lat - prev.lat) * 0.25,
                        lng: prev.lng + (target.lng - prev.lng) * 0.25
                    }));
                }

                setVitals({
                    hr: Math.floor(Math.random() * (110 - 70) + 70),
                    spo2: Math.floor(Math.random() * (100 - 95) + 95),
                    bp: "128/84"
                });

                setEta(prev => {
                    if (prev <= 1) {
                        if (activePhase === 'to_hospital') {
                            setStep('reached');
                            return 0;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 3000);
            return () => clearInterval(moveInterval);
        }
    }, [step, eta, activePhase, pickup, destination]);

    // UI Sub-components
    const ProgressBar = ({ currentStep }) => (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
            {['triage', 'location', 'searching', 'booking', 'tracking'].map((s, i) => (
                <div key={s} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl ${s === currentStep ? 'bg-rose-600 border-rose-500 text-white scale-125' :
                        ['triage', 'location', 'searching', 'booking', 'tracking'].indexOf(s) < ['triage', 'location', 'searching', 'booking', 'tracking'].indexOf(currentStep)
                            ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-900 border-white/10 text-slate-500'
                        }`}>
                        {['triage', 'location', 'searching', 'booking', 'tracking'].indexOf(s) < ['triage', 'location', 'searching', 'booking', 'tracking'].indexOf(currentStep) ? <BsCheckCircleFill /> : i + 1}
                    </div>
                    <span className={`text-[8px] font-black uppercase mt-4 tracking-widest ${s === currentStep ? 'text-rose-500' : 'text-slate-500'}`}>{s}</span>
                </div>
            ))}
        </div>
    );

    const MapSimulation = () => (
        <div className="relative w-full h-full bg-[#0f172a] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl group/map">
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 neural-grid opacity-30"></div>

            {/* AI Green Corridor (Visual Overlay) */}
            {step === 'tracking' && (
                <div className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-100">
                    <svg className="w-full h-full">
                        <path
                            d={`M ${ambCoords.lng}% ${ambCoords.lat}% L ${activePhase === 'to_patient' ? pickup.lng : destination.lng}% ${activePhase === 'to_patient' ? pickup.lat : destination.lat}%`}
                            stroke="#10b981"
                            strokeWidth="20"
                            className="opacity-10 blur-xl animate-pulse"
                            fill="none"
                        />
                        <path
                            d={`M ${ambCoords.lng}% ${ambCoords.lat}% L ${activePhase === 'to_patient' ? pickup.lng : destination.lng}% ${activePhase === 'to_patient' ? pickup.lat : destination.lat}%`}
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                            className="opacity-30"
                            fill="none"
                        />
                    </svg>
                </div>
            )}

            {/* Destination Hospital Marker */}
            {step !== 'triage' && step !== 'location' && (
                <div className="absolute z-10 transition-all duration-1000" style={{ top: `${destination.lat}%`, left: `${destination.lng}%` }}>
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-[#334155] rounded-xl flex items-center justify-center text-white border border-white/10 shadow-lg">
                            <BsShieldFillCheck size={18} />
                        </div>
                        <span className="text-[6px] font-black text-slate-400 uppercase mt-1 bg-black/40 px-1 rounded">{destination.name}</span>
                    </div>
                </div>
            )}

            {/* Pickup Location Marker */}
            <div className="absolute z-20 transition-all duration-1000" style={{ top: `${pickup.lat}%`, left: `${pickup.lng}%` }}>
                <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-emerald-500 rounded-full relative shadow-[0_0_20px_#10b981]"></div>
                    <span className="text-[6px] font-black text-emerald-500 uppercase mt-6 whitespace-nowrap bg-black/40 px-1 rounded tracking-widest">{pickup.name}</span>
                </div>
            </div>

            {/* Nearby Available Ambulances (Only in booking/searching/location) */}
            {(step === 'searching' || step === 'booking' || step === 'location') && ambulanceDB.map(amb => (
                <div key={amb.id} className="absolute transition-all duration-1000" style={{ top: `${amb.lat}%`, left: `${amb.lng}%` }}>
                    <div className="group/amb relative">
                        <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xl transition-all cursor-pointer hover:scale-110">
                            <BsTruck size={18} />
                        </div>
                    </div>
                </div>
            ))}

            {/* Moving Ambulance & Drone */}
            {step === 'tracking' && (
                <>
                    {/* Drone AED */}
                    {emergencyType === 'CARDIAC ARREST' && (eta > 0) && activePhase === 'to_patient' && (
                        <div className="absolute transition-all duration-500 z-30" style={{ top: `${droneCoords.lat}%`, left: `${droneCoords.lng}%` }}>
                            <div className="relative flex flex-col items-center">
                                <div className="text-cyan-400 bg-black/60 p-1.5 rounded-lg backdrop-blur-sm border border-cyan-500/30 animate-bounce">
                                    <BsStars size={14} className="animate-spin-slow" />
                                </div>
                                <span className="text-[5px] font-black text-cyan-400 uppercase tracking-tighter mt-1 bg-black/40 px-1 rounded">Drone AED</span>
                            </div>
                        </div>
                    )}

                    {/* Active Ambulance */}
                    <div className="absolute transition-all duration-500 z-20" style={{ top: `${ambCoords.lat}%`, left: `${ambCoords.lng}%` }}>
                        <div className="relative group">
                            <div className="w-10 h-10 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-rose-400/30">
                                <BsTruck size={22} className="animate-pulse" />
                            </div>
                            <div className="absolute -inset-2 border border-rose-500/30 rounded-[1.5rem] animate-ping"></div>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rose-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.2em] shadow-xl">
                                {activePhase === 'to_patient' ? 'Arriving' : 'In Transit'}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-rose-500/30 overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsDriverMode(!isDriverMode)}
                            className="text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all"
                        >
                            {isDriverMode ? 'Switch to Patient' : 'Register as Driver'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">

                    {!isDriverMode ? (
                        <>
                            {/* Step Indicator */}
                            {step !== 'triage' && <ProgressBar currentStep={step} />}

                            {step === 'triage' && (
                                <div className="max-w-6xl mx-auto text-center animate-fade-in py-10">
                                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-12">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                                        <span className="text-[12px] font-black uppercase tracking-[0.3em]">Emergency Dispatch Active</span>
                                    </div>

                                    <h1 className="text-7xl md:text-9xl font-black mb-6 italic tracking-tighter leading-[0.85] text-white">
                                        SECONDS <span className="text-rose-600">SAVE</span> LIVES.
                                    </h1>

                                    <p className="text-slate-400 text-xl md:text-2xl mb-24 font-bold max-w-3xl mx-auto leading-relaxed">
                                        Select the emergency type. Sehaat Saathi AI will auto-assign the closest available ambulance for instant dispatch.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {emergencies.map((e) => (
                                            <button
                                                key={e.id}
                                                onClick={() => handleTriage(e)}
                                                className={`group relative aspect-square md:aspect-auto md:h-[450px] rounded-[4rem] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center overflow-hidden ${e.color}`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl mb-10 group-hover:scale-110 transition-transform duration-500">
                                                    {e.icon}
                                                </div>
                                                <h3 className="font-black text-2xl tracking-tighter text-white mb-2">{e.label}</h3>
                                                <span className="text-[10px] font-black opacity-60 tracking-[0.4em] text-white uppercase">{e.priority} PRIORITY</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 'location' && (
                                <div className="max-w-4xl mx-auto animate-slide-up">
                                    <div className="bg-white/[0.03] border border-white/5 p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 -mr-20 -mt-20 rounded-full blur-3xl"></div>

                                        <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter italic">WHERE IS THE <span className="text-rose-500">PATIENT?</span></h2>
                                        <p className="text-slate-400 font-bold mb-12 uppercase text-sm tracking-widest">Enter location details just like Ola/Uber for instant pickup.</p>

                                        <div className="space-y-8">
                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500">
                                                    <BsGeoAltFill size={24} />
                                                </div>
                                                <label className="absolute left-16 -top-3 px-2 bg-[#020617] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">Pickup Location</label>
                                                <input
                                                    type="text"
                                                    value={pickup.name}
                                                    onChange={(e) => setPickup({ ...pickup, name: e.target.value })}
                                                    placeholder="Search pickup address..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 py-6 outline-none focus:border-emerald-500/50 transition-all text-lg font-black tracking-tight"
                                                />
                                            </div>

                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">
                                                    <BsShieldFillCheck size={24} />
                                                </div>
                                                <label className="absolute left-16 -top-3 px-2 bg-[#020617] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-focus-within:text-rose-500 transition-colors">Target Hospital (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={destination.name}
                                                    onChange={(e) => setDestination({ ...destination, name: e.target.value })}
                                                    placeholder="Enter preferred hospital..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-8 py-6 outline-none focus:border-rose-500/50 transition-all text-lg font-black tracking-tight"
                                                />
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setStep('searching');
                                                    setTimeout(() => setStep('booking'), 2500);
                                                }}
                                                className="w-full py-8 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-sm tracking-[0.4em] rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(225,29,72,0.5)] transition-all active:scale-95"
                                            >
                                                LOCATE NEARBY AMBULANCES
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-12 h-[300px] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                                        <MapSimulation />
                                    </div>
                                </div>
                            )}

                            {step === 'searching' && (
                                <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                                    <div className="relative w-48 h-48 mb-12">
                                        <div className="absolute inset-0 bg-rose-500/20 blur-[80px] animate-pulse"></div>
                                        <div className="w-full h-full border-2 border-white/5 border-t-rose-500 rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BsHeartPulseFill className="text-rose-500 text-5xl animate-bounce" />
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Finding Active Channels...</h2>
                                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Scanning 4.5km Radius for ICU Units</p>
                                </div>
                            )}

                            {step === 'booking' && (
                                <div className="grid lg:grid-cols-12 gap-12 animate-slide-up">
                                    <div className="lg:col-span-8">
                                        <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                                            <BsTruck className="text-rose-500" /> AVAILABLE AMBULANCES
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {ambulanceDB.filter(a => a.status === 'Available').map((amb) => (
                                                <div key={amb.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[3rem] hover:border-rose-500/30 transition-all group relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                        <BsTruck size={80} />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full">{amb.type}</span>
                                                                <h4 className="text-2xl font-black mt-4 uppercase italic">{amb.driver}</h4>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-xl font-black text-white">{amb.distance}</div>
                                                                <div className="text-[8px] font-bold text-slate-500 uppercase">Distance</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase text-slate-400">
                                                            <div className="flex items-center gap-1"><BsClockHistory /> ~{parseInt(amb.distance) * 3} MINS ETA</div>
                                                            <div className="flex items-center gap-1 text-amber-500">★ {amb.rating}</div>
                                                        </div>
                                                        <button
                                                            onClick={() => confirmBooking(amb)}
                                                            className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                                                        >
                                                            CONFIRM BOOKING
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 space-y-8">
                                        <div className="bg-rose-600 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                                <BsShieldFillCheck size={100} />
                                            </div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Emergency Profile</h3>
                                            <div className="text-3xl font-black uppercase italic tracking-tighter mb-2">{emergencyType}</div>
                                            <div className="px-4 py-1.5 bg-white/20 rounded-xl inline-block text-[10px] font-black uppercase tracking-widest">{priority} PRIORITY</div>
                                            <div className="mt-8 pt-8 border-t border-white/10 text-[10px] font-bold text-rose-100 leading-relaxed uppercase">
                                                "Sehaat Saathi acts as a dispatch platform. Ambulance service is responsible for on-board medical care."
                                            </div>
                                        </div>
                                        <MapSimulation />
                                    </div>
                                </div>
                            )}

                            {step === 'tracking' && (
                                <div className="grid lg:grid-cols-12 gap-12 animate-slide-up">
                                    <div className="lg:col-span-4 space-y-8">
                                        <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[4rem] relative overflow-hidden group shadow-2xl">
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 -mr-20 -mt-20 rounded-full blur-3xl"></div>

                                            <div className="relative z-10">
                                                <div className="flex flex-col items-center text-center mb-10">
                                                    <div className="w-24 h-24 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
                                                        <BsTruck className="text-rose-500 text-4xl animate-bounce" />
                                                    </div>
                                                    <h3 className="text-4xl font-black italic tracking-tighter text-rose-500">{eta === 0 ? 'ARRIVED' : `${eta} MINS`}</h3>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">
                                                        {activePhase === 'to_patient' ? 'AMBULANCE ARRIVING AT PICKUP' : `TRANSIT TO ${destination.name.toUpperCase()}`}
                                                    </p>
                                                </div>

                                                {/* Phase-Specific Actions */}
                                                {activePhase === 'to_patient' ? (
                                                    <div className="mb-10 animate-fade-in">
                                                        <button
                                                            onClick={startTransit}
                                                            className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                                                        >
                                                            <BsCheckCircleFill /> PATIENT ONBOARDED
                                                        </button>
                                                        <p className="text-[9px] text-slate-500 font-bold text-center mt-4">Confirm once the patient is safely inside the ambulance.</p>
                                                    </div>
                                                ) : (
                                                    <div className="mb-10 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 relative overflow-hidden animate-fade-in">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'}`}></div>
                                                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em]">Crisis-Assist AI Active</span>
                                                        </div>
                                                        <div className="h-12 flex items-center justify-center gap-1.5">
                                                            {Array.from({ length: 15 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-1 bg-indigo-400 rounded-full transition-all duration-300 ${isSpeaking ? 'animate-waveform' : 'h-2 opacity-30'}`}
                                                                    style={{
                                                                        animationDelay: `${i * 0.1}s`,
                                                                        height: isSpeaking ? `${Math.random() * 100}%` : '8px'
                                                                    }}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                        <p className="text-[9px] text-slate-400 font-bold mt-4 italic text-center">
                                                            "{emergencies.find(e => e.label === emergencyType)?.advice.slice(0, 50)}..."
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="space-y-6">
                                                    {/* Live ICU Vitals Sync (Always visible) */}
                                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">AMBULANCE ICU SYNC</div>
                                                            <div className="flex items-center gap-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                                <span className="text-[6px] font-black text-emerald-500 uppercase">Live</span>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <div className="text-center">
                                                                <div className="text-xs font-black text-rose-500">{vitals.hr}</div>
                                                                <div className="text-[6px] font-bold text-slate-500 uppercase">HR (BPM)</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-xs font-black text-cyan-400">{vitals.spo2}%</div>
                                                                <div className="text-[6px] font-bold text-slate-500 uppercase">SpO2</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-xs font-black text-amber-500">{vitals.bp}</div>
                                                                <div className="text-[6px] font-bold text-slate-500 uppercase">BP</div>
                                                            </div>
                                                        </div>
                                                        {/* Oscilloscope Line */}
                                                        <div className="h-8 mt-4 relative overflow-hidden border-t border-white/5 pt-2">
                                                            <svg className="w-full h-full">
                                                                <path
                                                                    d="M 0 15 Q 10 5, 20 15 T 40 15 T 60 15 T 80 15 T 100 15 T 120 15"
                                                                    fill="none"
                                                                    stroke="#f43f5e"
                                                                    strokeWidth="1"
                                                                    className="animate-oscilloscope"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex justify-between items-center">
                                                        <div>
                                                            <div className="text-[8px] font-black text-slate-500 uppercase mb-1 tracking-widest">Captain</div>
                                                            <div className="font-black text-sm uppercase">{selectedAmbulance.driver}</div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
                                                                <BsPhoneFill size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    window.speechSynthesis.cancel();
                                                                    setStep('triage');
                                                                }}
                                                                className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                                                            >
                                                                <BsXCircleFill size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8">
                                        <div className="h-full min-h-[600px] rounded-[4rem] overflow-hidden border border-white/5 relative shadow-2xl">
                                            <MapSimulation />

                                            {/* Digital Trauma Sync HUD */}
                                            {isSyncing && (
                                                <div className="absolute top-8 left-8 p-6 bg-black/60 backdrop-blur-md rounded-3xl border border-cyan-500/30 animate-fade-in z-30">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
                                                        <div>
                                                            <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Trauma Pre-Check</h4>
                                                            <p className="text-[8px] text-slate-400 font-bold uppercase">Syncing to Emergency Ward</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tracking Overlay */}
                                            <div className="absolute bottom-8 left-8 right-8 bg-[#020617]/90 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl flex flex-wrap justify-between items-center gap-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-rose-500">
                                                        <BsLightningFill size={24} className="animate-pulse" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xl font-black italic uppercase tracking-tighter">
                                                            {activePhase === 'to_patient' ? 'PICKUP EN ROUTE' : 'HOSPITAL TRANSIT'}
                                                        </div>
                                                        <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest">
                                                            {activePhase === 'to_patient' ? 'Avoiding Traffic Jam at MG Road' : 'Green Corridor Active to Hospital'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-3xl border border-white/10">
                                                    <div className="text-right">
                                                        <div className="text-xs font-black uppercase">{destination.name}</div>
                                                        <div className="text-[8px] text-emerald-500 font-black uppercase">verified hospital</div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                                                        <BsShieldFillCheck />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'reached' && (
                                <div className="max-w-4xl mx-auto text-center animate-slide-up py-20">
                                    <div className="w-32 h-32 bg-emerald-500/20 border border-emerald-500/30 rounded-[3rem] flex items-center justify-center text-emerald-500 mx-auto mb-12">
                                        <BsCheckCircleFill size={64} className="animate-bounce" />
                                    </div>
                                    <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-white">MISSION <span className="text-emerald-500">ACCOMPLISHED</span></h2>
                                    <p className="text-slate-400 text-xl font-bold uppercase tracking-widest mb-16">Patient Safely Delivered to {destination.name}</p>

                                    <div className="grid md:grid-cols-3 gap-6 mb-20 text-left">
                                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                                            <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Trip Summary</div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm font-black uppercase">
                                                    <span>Response Time</span>
                                                    <span className="text-rose-500">4.2 MINS</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-black uppercase">
                                                    <span>Transit Time</span>
                                                    <span className="text-emerald-500">12 MINS</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                                            <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Medical Sync</div>
                                            <div className="text-xs font-bold text-slate-400 uppercase leading-relaxed font-mono">
                                                EHR-ID: SS-4921-X<br />
                                                VITALS: STABLE<br />
                                                DOCS: HANDED OVER
                                            </div>
                                        </div>
                                        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                                            <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Captain</div>
                                            <div className="text-sm font-black uppercase">{selectedAmbulance.driver}</div>
                                            <div className="flex mt-4 text-amber-500">★★★★★</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep('triage')}
                                        className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] hover:bg-rose-500 hover:text-white transition-all shadow-2xl"
                                    >
                                        RETURN TO HUB <BsArrowLeft className="rotate-180" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Driver Registration Section */
                        <div className="max-w-4xl mx-auto animate-fade-in">
                            <div className="bg-white/[0.03] border border-white/5 p-16 rounded-[4rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-5">
                                    <BsTruck size={200} />
                                </div>
                                <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter italic">DRIVER <span className="text-rose-500">ENROLLMENT</span></h2>
                                <p className="text-slate-400 font-bold mb-12 uppercase italic text-sm tracking-widest max-w-lg leading-relaxed">
                                    Join India's fastest emergency response network. Help us bridge the gap between emergency and hospital care.
                                </p>

                                <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Full Name</label>
                                        <input type="text" placeholder="Ramesh Kumar" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500 transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Phone Number</label>
                                        <input type="text" placeholder="+91 00000-00000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500 transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Vehicle Type</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500 transition-all text-sm font-bold text-slate-400">
                                            <option>Basic Life Support (BLS)</option>
                                            <option>Advanced ICU (ALS)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Registration No.</label>
                                        <input type="text" placeholder="MH-XX-XXXX" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-rose-500 transition-all text-sm font-bold" />
                                    </div>
                                    <div className="md:col-span-2 mt-8">
                                        <button className="w-full py-6 rounded-[2.5rem] bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-xs tracking-[0.3em] shadow-2xl transition-all active:scale-95 border border-rose-400/20">
                                            SUBMIT PARTNER REQUEST
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-50px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(300px); opacity: 0; }
                }
                @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes dash { to { stroke-dashoffset: -20; } }
                
                @keyframes waveform {
                    0% { height: 10%; }
                    50% { height: 100%; }
                    100% { height: 10%; }
                }
                @keyframes oscilloscope {
                    from { stroke-dashoffset: 100; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                .animate-dash { animation: dash 20s linear infinite; }
                .animate-waveform { animation: waveform 0.5s ease-in-out infinite; }
                .animate-oscilloscope { 
                    stroke-dasharray: 10, 5;
                    animation: oscilloscope 2s linear infinite; 
                }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                
                .neural-grid {
                    background-image: 
                        linear-gradient(to right, rgba(244, 63, 94, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(244, 63, 94, 0.05) 1px, transparent 1px);
                    background-size: 60px 60px;
                }

                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #020617; }
                ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default AmbulanceDispatch;
