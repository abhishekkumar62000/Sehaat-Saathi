import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsQrCode, BsHeartPulseFill, BsShieldCheck, BsExclamationTriangleFill,
    BsPersonFill, BsDropletFill, BsTelephoneFill, BsFileMedical,
    BsCheckCircleFill, BsActivity, BsEyeFill, BsLungs, BsShareFill,
    BsFingerprint, BsSoundwave, BsGeoAltFill, BsVolumeUpFill,
    BsRobot, BsSendFill, BsXLg, BsAirplaneEnginesFill, BsUnlockFill,
    BsStoplightsFill, BsBoxSeam, BsConeStriped, BsCpuFill, BsRadar,
    BsBroadcast, BsLightningChargeFill
} from 'react-icons/bs';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

const EmergencyHealthID = () => {
    const [activeTab, setActiveTab] = useState('identity');
    const [isEmergencyMode, setIsEmergencyMode] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [syncStatus, setSyncStatus] = useState("Secure");

    // Core States
    const [location, setLocation] = useState(null);
    const [sosActive, setSosActive] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [heartRate, setHeartRate] = useState(72);
    const [aeroEvacStatus, setAeroEvacStatus] = useState(null);
    const [showAIChat, setShowAIChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([{ sender: 'ai', text: 'Sentience Core Online. All systems nominal.' }]);
    const [chatInput, setChatInput] = useState("");
    const [bioUnlocking, setBioUnlocking] = useState(false);
    const [bioUnlocked, setBioUnlocked] = useState(false);
    const bioTimerRef = useRef(null);
    const [greenCorridorActive, setGreenCorridorActive] = useState(false);
    const [droneDropStatus, setDroneDropStatus] = useState(null);
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const [nanoSwarmActive, setNanoSwarmActive] = useState(false);
    const [organRadarActive, setOrganRadarActive] = useState(false);

    // --- PHASE 5 STATES ---
    const [coreStatus, setCoreStatus] = useState('idle'); // idle, analyzing, critical, speaking
    const [satelliteLink, setSatelliteLink] = useState('standby'); // standby, connecting, online
    const [adrenalineReady, setAdrenalineReady] = useState(true);
    const [screenShake, setScreenShake] = useState(false);

    // --- ENHANCED SCAN STATES ---
    const [scanPhase, setScanPhase] = useState('idle'); // idle, fingerprint, retina, dna, complete
    const [scanProgress, setScanProgress] = useState(0);

    // Organ Donation State
    const [donationConsent, setDonationConsent] = useState(false);
    const [selectedOrgans, setSelectedOrgans] = useState({ kidney: false, heart: false, eyes: false, lungs: false });

    // === ENHANCED INTERACTIVE STATES ===
    // ID Card States
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [showQRModal, setShowQRModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    // Profile States
    const [healthScore, setHealthScore] = useState(0);
    const [showTimeline, setShowTimeline] = useState(false);

    // Donate States
    const [showOrganModel, setShowOrganModel] = useState(false);
    const [pledgeStep, setPledgeStep] = useState(0); // 0: not started, 1: selecting, 2: confirming, 3: complete
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [impactStats, setImpactStats] = useState({ lives: 0, organs: 0, families: 0 });
    const [selectedOrganForModel, setSelectedOrganForModel] = useState(null);

    // Mock User Data
    const [userData] = useState({
        name: "Satyajit S.", id: "SS-EMG-9921", bloodGroup: "O+",
        allergies: ["Penicillin", "Peanuts"],
        conditions: ["Mild Asthma", "Hypertension", "Pacemaker (St. Jude)"],
        medications: ["Inhaler (SOS)", "Amlodipine 5mg"],
        genomicData: { markers: "BRCA1 Negative, APOE4 Negative", psych: "No history of psychosis.", implants: "Titanium Plate (Left Tibia)" },
        emergencyContacts: [{ name: "Rahul S. (Brother)", phone: "+91 98765 43210" }]
    });

    // Emergency Mode Effect
    useEffect(() => {
        let heartInterval;
        if (isEmergencyMode) {
            setSyncStatus("CRITICAL • ALL SYSTEMS ACTIVE");
            setCoreStatus('analyzing');
            heartInterval = setInterval(() => setHeartRate(prev => Math.max(40, Math.min(120, prev + (Math.random() > 0.5 ? 3 : -3)))), 700);
            setOrganRadarActive(true);
            // Initiate Satellite Link
            setSatelliteLink('connecting');
            setTimeout(() => { setSatelliteLink('online'); toast.info("🛰️ ISRO MED-SAT 1 LINK ESTABLISHED"); }, 3000);
        } else {
            setSyncStatus("Encrypted • National Health Grid Synced");
            setCoreStatus('idle');
            setAeroEvacStatus(null); setShowAIChat(false); setBioUnlocked(false); setGreenCorridorActive(false);
            setDroneDropStatus(null); setNanoSwarmActive(false); setOrganRadarActive(false);
            setSatelliteLink('standby'); setAdrenalineReady(true);
        }
        return () => clearInterval(heartInterval);
    }, [isEmergencyMode]);

    // --- ALL LOGIC ---
    const speakProtocols = () => {
        if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); setCoreStatus('analyzing'); return; }
        const text = `Alert. Patient blood group ${userData.bloodGroup}. Known allergies to ${userData.allergies.join(' and ')}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1; utterance.pitch = 0.8;
        utterance.onend = () => { setIsSpeaking(false); setCoreStatus('analyzing'); };
        setIsSpeaking(true); setCoreStatus('speaking');
        window.speechSynthesis.speak(utterance);
    };
    const activateSOS = () => {
        if (sosActive) return;
        setSosActive(true);
        navigator.geolocation.getCurrentPosition(
            (p) => { setLocation({ lat: p.coords.latitude, lng: p.coords.longitude }); toast.error("📍 GPS LOCKED!"); },
            () => setLocation({ lat: "28.6139", lng: "77.2090" })
        );
    };
    const requestAeroEvac = () => { setAeroEvacStatus('requesting'); setTimeout(() => { setAeroEvacStatus('dispatched'); toast.success("🚁 AERO-EVAC INBOUND"); }, 2000); };
    const sendAIMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
        setChatInput("");
        setTimeout(() => {
            let reply = "Processing...";
            if (chatInput.toLowerCase().includes("allergy")) reply = `Patient has severe allergies to ${userData.allergies.join(", ")}.`;
            else if (chatInput.toLowerCase().includes("blood")) reply = `Blood type is ${userData.bloodGroup}. Cross-match verified.`;
            setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
        }, 800);
    };
    const startBioUnlock = () => { setBioUnlocking(true); bioTimerRef.current = setTimeout(() => { setBioUnlocked(true); setBioUnlocking(false); toast.success("🧬 DNA VAULT UNLOCKED."); }, 2000); };
    const cancelBioUnlock = () => { setBioUnlocking(false); clearTimeout(bioTimerRef.current); };
    const toggleGreenCorridor = () => { setGreenCorridorActive(true); toast.info("🚦 GREEN CORRIDOR ACTIVE"); };
    const requestDroneDrop = (item) => { setDroneDropStatus('dispatching'); setTimeout(() => { setDroneDropStatus('arriving'); toast.success(`📦 ${item} DRONE INBOUND`); }, 2000); };
    const deployNanoSwarm = () => { setNanoSwarmActive(true); toast.info("🛡️ NANO-SWARM DEPLOYED"); setTimeout(() => { setNanoSwarmActive(false); toast.success("✅ REPAIR COMPLETE"); }, 5000); };

    // --- PHASE 5 LOGIC ---
    const injectAdrenaline = () => {
        if (!adrenalineReady) return;
        setAdrenalineReady(false);
        setScreenShake(true);
        setCoreStatus('critical');
        setHeartRate(55); // Simulate a drop first
        setTimeout(() => { setHeartRate(92); setScreenShake(false); setCoreStatus('analyzing'); toast.success("💉 ADRENALINE DELIVERED • VITALS STABILIZING"); }, 1500);
        setTimeout(() => setAdrenalineReady(true), 10000); // Cooldown
    };

    const toggleOrgan = (organ) => {
        setSelectedOrgans(prev => ({ ...prev, [organ]: !prev[organ] }));
        // Add pulse effect
        setSelectedOrganForModel(organ);
        setTimeout(() => setSelectedOrganForModel(null), 500);
    };

    const handleConsent = () => {
        if (!donationConsent) {
            setPledgeStep(1);
            setShowOrganModel(true);
        } else {
            setDonationConsent(false);
            setPledgeStep(0);
            setShowOrganModel(false);
        }
    };

    const completePledge = () => {
        setPledgeStep(3);
        setDonationConsent(true);
        // Triple confetti celebration
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.3 } });
        setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.5 } }), 150);
        setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.7 } }), 300);
        toast.success("🎉 YOU'RE A LIFE HERO!");
        setShowThankYouModal(true);
        // Animate impact stats
        setTimeout(() => {
            let count = 0;
            const interval = setInterval(() => {
                count++;
                setImpactStats({ lives: Math.min(count, 8), organs: Math.min(count * 2, 16), families: Math.min(count, 8) });
                if (count >= 8) clearInterval(interval);
            }, 100);
        }, 500);
    };

    const handleShare = (platform) => {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        toast.success(`Sharing to ${platform}!`);
        setShowShareModal(false);
    };

    // Mouse move handler for holographic effect
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };
    const handleSimulateScan = () => {
        setIsScanning(true);
        setScanPhase('fingerprint');
        setScanProgress(0);

        // Phase 1: Fingerprint
        setTimeout(() => { setScanPhase('retina'); setScanProgress(33); }, 1500);
        // Phase 2: Retina
        setTimeout(() => { setScanPhase('dna'); setScanProgress(66); }, 3000);
        // Phase 3: DNA
        setTimeout(() => { setScanPhase('complete'); setScanProgress(100); }, 4500);
        // Complete
        setTimeout(() => {
            setIsScanning(false);
            setScanPhase('idle');
            setIsEmergencyMode(true);
            activateSOS();
            toast.warning("🚨 CRITICAL TRAUMA MODE ACTIVATED");
        }, 5500);
    };

    const coreColors = { idle: 'from-slate-500 to-slate-700', analyzing: 'from-cyan-500 to-blue-700', critical: 'from-red-500 to-orange-600', speaking: 'from-emerald-400 to-cyan-500' };

    return (
        <div className={`min-h-screen font-sans selection:bg-purple-500/30 pb-20 transition-colors duration-500 relative bg-[#0a0d14] ${screenShake ? 'animate-shake' : ''}`}>

            {/* Scanlines Overlay - Always visible for premium feel */}
            <div className="fixed inset-0 z-[60] pointer-events-none bg-scanlines opacity-[0.02]"></div>

            {/* Ambient Background Glow - Always visible */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[200px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[200px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Header - Always Dark */}
            <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-slate-950/90 border-b border-slate-800/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center relative">
                    <Link to="/smarthub" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"><BsArrowLeft /> Back</Link>

                    {/* Satellite Status */}
                    {isEmergencyMode && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                            <BsBroadcast className={`${satelliteLink === 'online' ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                            <span className={`text-[9px] font-black uppercase tracking-widest ${satelliteLink === 'online' ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {satelliteLink === 'standby' ? 'SAT STANDBY' : satelliteLink === 'connecting' ? 'CONNECTING...' : 'ISRO MED-SAT 1'}
                            </span>
                        </div>
                    )}

                    <span className={`text-[9px] font-black uppercase tracking-widest ${isEmergencyMode ? 'text-red-400 animate-pulse' : 'text-emerald-600'}`}>{syncStatus}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-24 max-w-7xl relative z-10">

                {!isEmergencyMode && (
                    <div className="mb-10 flex justify-center animate-fade-in">
                        {/* Emergency Scan Trigger Button */}
                        <button
                            onClick={handleSimulateScan}
                            disabled={isScanning}
                            className="group relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105"
                        >
                            {/* Outer Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-xl group-hover:blur-2xl transition-all"></div>

                            {/* Animated Rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/30 animate-spin-slow"></div>
                            <div className="absolute inset-4 rounded-full border border-red-500/20 animate-spin-reverse"></div>
                            <div className="absolute inset-8 rounded-full border-2 border-red-500/40 animate-pulse"></div>

                            {/* Center Core */}
                            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-2xl shadow-red-500/50 flex flex-col items-center justify-center text-white border-4 border-red-400/30">
                                <BsFingerprint size={50} className="mb-2 group-hover:animate-pulse" />
                                <div className="text-[10px] font-black uppercase tracking-widest">Scan to</div>
                                <div className="text-[10px] font-black uppercase tracking-widest">Activate</div>
                            </div>
                        </button>
                    </div>
                )}

                {/* === FULL-SCREEN BIOMETRIC SCANNING OVERLAY === */}
                {isScanning && (
                    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-fade-in">
                        {/* Background Grid */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                        {/* Scan Rings */}
                        <div className="relative w-80 h-80 flex items-center justify-center mb-10">
                            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30 animate-ping-slow"></div>
                            <div className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-500/50 animate-spin-slow"></div>
                            <div className="absolute inset-10 rounded-full border border-cyan-500/20 animate-spin-reverse"></div>
                            <div className="absolute inset-16 rounded-full bg-cyan-500/5"></div>

                            {/* Center Icon - Changes per Phase */}
                            <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-500 ${scanPhase === 'complete' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/10'}`}>
                                {scanPhase === 'fingerprint' && <BsFingerprint size={60} className="animate-pulse" />}
                                {scanPhase === 'retina' && <BsEyeFill size={60} className="animate-pulse" />}
                                {scanPhase === 'dna' && <BsActivity size={60} className="animate-pulse" />}
                                {scanPhase === 'complete' && <BsCheckCircleFill size={60} className="text-emerald-400" />}
                            </div>
                        </div>

                        {/* Phase Text */}
                        <div className="text-center mb-8">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/70 mb-2">
                                Biometric Authentication
                            </div>
                            <div className="text-2xl font-black uppercase tracking-widest text-white">
                                {scanPhase === 'fingerprint' && 'Scanning Fingerprint...'}
                                {scanPhase === 'retina' && 'Analyzing Retina...'}
                                {scanPhase === 'dna' && 'Decoding DNA Sequence...'}
                                {scanPhase === 'complete' && 'IDENTITY VERIFIED'}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-80 h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${scanPhase === 'complete' ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                                style={{ width: `${scanProgress}%` }}
                            ></div>
                        </div>

                        {/* Data Stream Effect */}
                        <div className="text-cyan-500/50 text-[8px] font-mono tracking-wider animate-pulse">
                            {scanPhase !== 'complete' ? `0x${Math.random().toString(16).substring(2, 10).toUpperCase()} :: PROCESSING` : 'ENCRYPTION KEY MATCHED'}
                        </div>
                    </div>
                )}

                {isEmergencyMode ? (
                    <div className="animate-zoom-in space-y-6 relative">

                        {/* Background Ambient Glow - ULTRA VIBRANT */}
                        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[200px] animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[150px]"></div>
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
                            {/* Floating Particles */}
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${3 + Math.random() * 2}s` }}></div>
                            ))}
                        </div>

                        {/* === THE SENTIENCE CORE (ULTRA COLORFUL) === */}
                        <div className="flex justify-center mb-8 relative z-10">
                            <div className="relative w-44 h-44 group cursor-pointer animate-float" onClick={speakProtocols}>
                                {/* Outer Glow Ring - Rainbow Animated */}
                                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 via-pink-500 to-orange-500 opacity-40 blur-2xl animate-spin-slow animate-rainbow"></div>
                                {/* Outer Rings - Dancing Borders */}
                                <div className="absolute -inset-2 rounded-full border-2 border-transparent animate-border-dance"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin-slow"></div>
                                <div className="absolute inset-2 rounded-full border border-purple-400/40 animate-spin-reverse"></div>
                                <div className="absolute inset-4 rounded-full border border-pink-400/30 animate-spin-slow" style={{ animationDuration: '15s' }}></div>
                                {/* Inner Core */}
                                <div className={`absolute inset-6 rounded-full bg-gradient-to-br ${coreStatus === 'critical' ? 'from-red-500 via-orange-500 to-yellow-500' : coreStatus === 'speaking' ? 'from-emerald-400 via-cyan-400 to-blue-500' : 'from-cyan-400 via-purple-500 to-pink-500'} shadow-[0_0_100px_rgba(168,85,247,0.6)] flex items-center justify-center transition-all duration-500 animate-glow-pulse`}>
                                    <BsCpuFill size={40} className={`text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isSpeaking ? 'animate-pulse' : ''}`} />
                                </div>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300" style={{ textShadow: '0 0 15px rgba(6,182,212,0.5)' }}>SENTIENCE CORE</div>
                            </div>
                        </div>

                        {/* Top Toolbar - Colorful Gradient Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-20">
                            <div className={`p-4 rounded-xl backdrop-blur-md flex items-center gap-3 transition-all ${sosActive ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 border-2 border-orange-400 shadow-[0_0_25px_rgba(251,146,60,0.4)]' : 'bg-slate-900/70 border border-slate-600'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sosActive ? 'bg-gradient-to-br from-orange-500 to-yellow-500' : 'bg-slate-800'}`}>
                                    <BsGeoAltFill size={18} className={sosActive ? 'text-white' : 'text-slate-400'} />
                                </div>
                                <span className={`text-xs font-black uppercase ${sosActive ? 'text-orange-200' : 'text-slate-300'}`}>{sosActive ? 'GPS LOCKED' : 'STANDBY'}</span>
                            </div>

                            <button onClick={requestAeroEvac} disabled={aeroEvacStatus} className={`p-4 rounded-xl backdrop-blur-md flex items-center gap-3 transition-all ${aeroEvacStatus ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.4)]' : 'bg-slate-900/70 border border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${aeroEvacStatus ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-slate-800'}`}>
                                    <BsAirplaneEnginesFill size={18} className={aeroEvacStatus ? 'text-white' : 'text-slate-400'} />
                                </div>
                                <span className={`text-xs font-black uppercase ${aeroEvacStatus ? 'text-emerald-200' : 'text-slate-300'}`}>{aeroEvacStatus ? 'INBOUND' : 'AERO-EVAC'}</span>
                            </button>

                            <button onClick={toggleGreenCorridor} disabled={greenCorridorActive} className={`p-4 rounded-xl backdrop-blur-md flex items-center gap-3 transition-all ${greenCorridorActive ? 'bg-gradient-to-r from-green-500/30 to-lime-500/30 border-2 border-green-400 shadow-[0_0_25px_rgba(74,222,128,0.4)]' : 'bg-slate-900/70 border border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${greenCorridorActive ? 'bg-gradient-to-br from-green-500 to-lime-500' : 'bg-slate-800'}`}>
                                    <BsStoplightsFill size={18} className={greenCorridorActive ? 'text-white' : 'text-slate-400'} />
                                </div>
                                <span className={`text-xs font-black uppercase ${greenCorridorActive ? 'text-green-200' : 'text-slate-300'}`}>{greenCorridorActive ? 'CLEARED' : 'GREEN WAVE'}</span>
                            </button>

                            <button onClick={() => setShowAIChat(!showAIChat)} className={`p-4 rounded-xl backdrop-blur-md flex items-center gap-3 transition-all ${showAIChat ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]' : 'bg-slate-900/70 border border-slate-600 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${showAIChat ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-slate-800'}`}>
                                    <BsRobot size={18} className={showAIChat ? 'text-white' : 'text-slate-400'} />
                                </div>
                                <span className={`text-xs font-black uppercase ${showAIChat ? 'text-purple-200' : 'text-slate-300'}`}>AI CO-PILOT</span>
                            </button>
                        </div>

                        {/* Main Dashboard */}
                        <div className="grid lg:grid-cols-12 gap-6 relative z-10">

                            {/* Left Panel: Colorful Actions */}
                            <div className="lg:col-span-3 space-y-4">
                                {/* Flash-Aid with Gradient Border */}
                                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">
                                    <div className="bg-slate-950 p-5 rounded-2xl">
                                        <h3 className="text-cyan-400 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2"><BsBoxSeam className="text-cyan-400" /> FLASH-AID</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['EpiPen', 'Defib', 'Insulin', 'Plasma'].map((item, idx) => (
                                                <button key={item} onClick={() => requestDroneDrop(item)} className={`p-3 rounded-xl text-sm font-black border-2 transition-all hover:scale-105 ${idx === 0 ? 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
                                                    idx === 1 ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]' :
                                                        idx === 2 ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 hover:bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]' :
                                                            'bg-pink-500/20 border-pink-500/50 text-pink-300 hover:bg-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                                                    }`}>{item}</button>
                                            ))}
                                        </div>
                                        {droneDropStatus && <div className="mt-4 text-center text-cyan-300 text-sm font-black animate-pulse"><BsConeStriped className="inline animate-spin mr-2" /> DRONE INBOUND</div>}
                                    </div>
                                </div>

                                {/* Adrenaline - Neon Red */}
                                <button onClick={injectAdrenaline} disabled={!adrenalineReady} className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${adrenalineReady ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white hover:scale-105 shadow-[0_0_40px_rgba(239,68,68,0.6)]' : 'bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                                    <BsLightningChargeFill size={20} className={adrenalineReady ? 'animate-pulse' : 'opacity-50'} /> {adrenalineReady ? 'INJECT ADRENALINE' : 'COOLDOWN...'}
                                </button>

                                {/* Voice Medic - Neon Purple */}
                                <button onClick={speakProtocols} className={`w-full p-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-105 ${isSpeaking ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.6)]' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]'}`}>
                                    {isSpeaking ? <><BsSoundwave size={20} className="animate-pulse" /> SPEAKING...</> : <><BsVolumeUpFill size={20} /> VOICE MEDIC</>}
                                </button>
                            </div>

                            {/* Center: Holo-Body with Gradient Border */}
                            <div className="lg:col-span-6">
                                <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">
                                    <div className="bg-gradient-to-b from-slate-950 to-slate-900 h-full min-h-[450px] rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
                                        {/* Animated Scan Line */}
                                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line"></div>

                                        {/* Nano Particles */}
                                        {nanoSwarmActive && <div className="absolute inset-0 z-30 pointer-events-none">{[...Array(40)].map((_, i) => <div key={i} className={`absolute w-1.5 h-1.5 rounded-full animate-ping-slow ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'}`} style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%`, animationDuration: `${Math.random() * 2 + 0.5}s` }}></div>)}</div>}

                                        {/* Header Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-[9px] font-black uppercase tracking-widest">
                                                <BsActivity className="text-cyan-400" /> <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Holo-Map</span>
                                            </div>
                                        </div>

                                        {/* Nano Deploy Button */}
                                        <div className="absolute bottom-4 right-4 z-20">
                                            <button onClick={deployNanoSwarm} disabled={nanoSwarmActive} className={`p-3 rounded-full border shadow-lg transition-all hover:scale-110 ${nanoSwarmActive ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-slate-800 text-emerald-400 border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
                                                <BsCpuFill size={16} className={nanoSwarmActive ? 'animate-spin' : ''} />
                                            </button>
                                        </div>

                                        {/* Body Figure */}
                                        <div className="relative w-44 h-80 z-10">
                                            <svg viewBox="0 0 100 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.5))' }}>
                                                <defs>
                                                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0.6" />
                                                        <stop offset="50%" stopColor="rgb(168,85,247)" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="rgb(236,72,153)" stopOpacity="0.6" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M50 20 Q50 10 40 10 Q30 10 30 20 Q30 30 40 30 Q50 30 50 20 M30 30 L10 50 L20 100 L10 120 M70 30 L90 50 L80 100 L90 120 M40 30 L40 90 L30 180 M60 30 L60 90 L70 180" stroke="url(#bodyGradient)" strokeWidth="2" fill="none" />
                                                <circle cx="60" cy="45" r="5" className="fill-red-500 animate-ping" />
                                                <circle cx="60" cy="45" r="5" className="fill-red-500 cursor-pointer" onClick={() => setSelectedBodyPart({ part: 'Chest', info: 'Pacemaker - St. Jude S/N 99281' })} />
                                                <circle cx="70" cy="150" r="5" className="fill-orange-500 animate-ping" style={{ animationDelay: '0.5s' }} />
                                                <circle cx="70" cy="150" r="5" className="fill-orange-500 cursor-pointer" onClick={() => setSelectedBodyPart({ part: 'Tibia', info: 'Titanium Plate Support' })} />
                                            </svg>
                                        </div>

                                        {/* Body Part Info Popup */}
                                        {selectedBodyPart && (
                                            <div className="absolute bottom-8 inset-x-8 p-[1px] rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 animate-slide-up z-30">
                                                <div className="bg-slate-950/95 p-3 rounded-xl backdrop-blur-md">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="text-[9px] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-black uppercase tracking-widest mb-1">{selectedBodyPart.part}</div>
                                                            <div className="text-white font-bold text-xs">{selectedBodyPart.info}</div>
                                                        </div>
                                                        <button onClick={() => setSelectedBodyPart(null)} className="text-slate-500 hover:text-white"><BsXLg /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Colorful Vitals */}
                            <div className="lg:col-span-3 space-y-4">
                                {/* Heart Rate - Red Gradient */}
                                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-red-500 to-orange-500">
                                    <div className="bg-slate-950 p-5 rounded-2xl relative overflow-hidden">
                                        <div className="flex items-end gap-3 mb-2">
                                            <div className={`text-5xl font-black leading-none ${heartRate < 60 ? 'text-orange-300' : 'text-red-300'}`} style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>{heartRate}</div>
                                            <div className="text-sm font-black text-red-300 mb-2">BPM</div>
                                        </div>
                                        <div className="h-10 w-full bg-red-900/20 rounded-lg overflow-hidden relative">
                                            <svg className="absolute bottom-0 left-0 w-full h-full stroke-red-400 fill-none stroke-[3]" viewBox="0 0 300 50"><path d="M0,25 L20,25 L30,10 L40,40 L50,25 L100,25 L110,10 L120,40 L130,25 L300,25" className="animate-ecg-draw" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* DNA Vault - Purple Gradient */}
                                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                                    <div className={`p-5 rounded-2xl transition-all duration-500 overflow-hidden relative h-36 flex flex-col items-center justify-center ${bioUnlocked ? 'bg-gradient-to-br from-emerald-950 to-slate-950' : 'bg-slate-950'}`}>
                                        {!bioUnlocked ? (
                                            <div className="text-center">
                                                <button onMouseDown={startBioUnlock} onMouseUp={cancelBioUnlock} onTouchStart={startBioUnlock} onTouchEnd={cancelBioUnlock} className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center text-2xl transition-all mb-3 mx-auto ${bioUnlocking ? 'scale-110 border-purple-300 text-purple-300 bg-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.6)]' : 'border-purple-400 text-purple-300'}`}>
                                                    <BsFingerprint size={28} className={bioUnlocking ? 'animate-pulse' : ''} />
                                                </button>
                                                <p className="text-purple-300 text-sm font-black tracking-widest">DNA VAULT</p>
                                            </div>
                                        ) : (
                                            <div className="w-full text-left animate-fade-in">
                                                <div className="text-sm font-black text-emerald-300 uppercase tracking-widest mb-2"><BsUnlockFill className="inline mr-2" /> UNLOCKED</div>
                                                <div className="text-emerald-100 text-xs font-bold">{userData.genomicData.markers}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Organ Radar - Green Gradient */}
                                {organRadarActive && (
                                    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500">
                                        <div className="bg-slate-950 rounded-2xl p-5 flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full border-2 border-emerald-400 relative flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                                                <div className="absolute inset-0 rounded-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.5)_360deg)]"></div>
                                                <BsRadar className="text-emerald-300 relative z-10" size={24} />
                                                <div className="absolute top-1 right-2 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                                            </div>
                                            <div>
                                                <div className="text-white font-black text-sm mb-1">ORGAN RADAR</div>
                                                <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 text-emerald-300 text-xs font-black rounded-full border border-emerald-400/50">3 MATCHES</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Deactivate Button */}
                        <button onClick={() => setIsEmergencyMode(false)} className="mx-auto block px-8 py-3 bg-slate-900/80 backdrop-blur-md text-slate-300 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-900/50 hover:text-white transition-all border border-slate-700 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">Deactivate Trauma Mode</button>

                        {/* AI Chat - Purple Theme */}
                        {showAIChat && (
                            <div className="fixed bottom-8 right-8 w-96 overflow-hidden z-50 animate-slide-up">
                                <div className="p-[2px] rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                                    <div className="bg-slate-950 rounded-2xl backdrop-blur-xl">
                                        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-4 flex justify-between items-center border-b border-purple-400/30">
                                            <span className="text-purple-300 font-black uppercase text-sm tracking-widest flex items-center gap-2"><BsRobot size={18} className="text-purple-400" /> SENTIENCE AI</span>
                                            <button onClick={() => setShowAIChat(false)} className="text-white hover:text-purple-400 p-1"><BsXLg size={16} /></button>
                                        </div>
                                        <div className="h-56 overflow-y-auto p-4 space-y-3">
                                            {chatMessages.map((msg, i) => (
                                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[85%] p-3 rounded-xl text-sm font-bold ${msg.sender === 'user' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-slate-800 text-slate-100 border border-purple-500/30'}`}>{msg.text}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 border-t border-purple-400/30 flex gap-3">
                                            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()} placeholder="Type your query..." className="flex-1 bg-slate-900 text-white text-sm p-3 rounded-xl border border-purple-400/30 focus:outline-none focus:border-purple-400 placeholder:text-slate-500" />
                                            <button onClick={sendAIMessage} className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"><BsSendFill size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* NORMAL VIEW - DARK THEME */
                    <div className="grid lg:grid-cols-12 gap-8 animate-slide-up relative z-10">
                        <div className="lg:col-span-3 space-y-4">
                            {/* Profile Card - Dark with Gradient Border */}
                            <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500">
                                <div className="bg-slate-950 p-8 rounded-3xl text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                                    <div className="relative z-10">
                                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-purple-500/30 border-4 border-slate-900">{userData.name.charAt(0)}</div>
                                        <h2 className="font-black text-white text-lg mb-1">{userData.name}</h2>
                                        <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-6">ID: {userData.id}</p>
                                        <button onClick={() => setShowQRCode(!showQRCode)} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"><BsQrCode /> {showQRCode ? 'Hide Code' : 'Show QR'}</button>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs - Dark */}
                            <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-3xl border border-slate-800 space-y-1">
                                {[{ id: 'identity', label: 'ID Card', icon: <BsQrCode />, color: 'cyan' }, { id: 'profile', label: 'Profile', icon: <BsPersonFill />, color: 'purple' }, { id: 'donation', label: 'Donate', icon: <BsHeartPulseFill />, color: 'pink' }].map(tab => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? `bg-gradient-to-r from-${tab.color}-500/20 to-${tab.color}-600/10 text-${tab.color}-400 border border-${tab.color}-500/30` : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}`}>{tab.icon} {tab.label}</button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-9">
                            {/* Identity Tab - ENHANCED WITH 3D FLIP & HOLOGRAPHIC EFFECT */}
                            {activeTab === 'identity' && (
                                <div className="space-y-6 animate-fade-in">
                                    {/* 3D ID Card with Flip Animation */}
                                    <div className="perspective-1000 w-full max-w-2xl mx-auto">
                                        <div
                                            className={`relative w-full h-[400px] transition-all duration-700 transform-style-3d cursor-pointer ${isCardFlipped ? 'rotate-y-180' : ''}`}
                                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                                            onMouseMove={handleMouseMove}
                                        >
                                            {/* Front of Card */}
                                            <div className={`absolute inset-0 backface-hidden ${isCardFlipped ? 'invisible' : 'visible'}`}>
                                                <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 shadow-2xl shadow-red-600/30 h-full overflow-hidden">
                                                    {/* Holographic Shine Effect */}
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                                                        style={{
                                                            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.3), transparent 50%)`,
                                                            transition: 'background 0.1s ease-out'
                                                        }}
                                                    />
                                                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 h-full relative overflow-hidden">
                                                        {/* Animated Corner Patterns */}
                                                        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-500/30 rounded-tl-3xl"></div>
                                                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-yellow-500/30 rounded-br-3xl"></div>

                                                        {/* Floating Particles */}
                                                        {[...Array(12)].map((_, i) => (
                                                            <div key={i} className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-float"
                                                                style={{
                                                                    top: `${Math.random() * 100}%`,
                                                                    left: `${Math.random() * 100}%`,
                                                                    animationDelay: `${Math.random() * 3}s`,
                                                                    animationDuration: `${3 + Math.random() * 2}s`
                                                                }}>
                                                            </div>
                                                        ))}

                                                        {/* Card Content */}
                                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="inline-block px-4 py-2 bg-red-500/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-red-500/40 text-red-400">🇮🇳 Official ID</div>
                                                                    <h1 className="text-2xl font-black uppercase tracking-tight mb-2 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Emergency Health ID</h1>
                                                                </div>
                                                                <BsShieldCheck size={40} className="text-red-500/40" />
                                                            </div>

                                                            <div className="space-y-4">
                                                                <div>
                                                                    <div className="text-xs text-slate-500 font-bold mb-1">ID HOLDER</div>
                                                                    <div className="text-3xl font-black text-white">{userData.name}</div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <div className="text-xs text-slate-500 font-bold mb-1">ID NUMBER</div>
                                                                        <div className="text-lg font-black text-cyan-400">{userData.id}</div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-xs text-slate-500 font-bold mb-1">BLOOD GROUP</div>
                                                                        <div className="text-2xl font-black text-red-400">{userData.bloodGroup}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between items-center">
                                                                <div className="text-[10px] text-slate-600 font-bold">Valid across 50,000+ hospitals</div>
                                                                <div className="text-[8px] text-slate-700 font-mono">Click to flip</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Back of Card */}
                                            <div className={`absolute inset-0 rotate-y-180 backface-hidden ${isCardFlipped ? 'visible' : 'invisible'}`}>
                                                <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 shadow-2xl shadow-orange-600/30 h-full">
                                                    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 h-full relative overflow-hidden">
                                                        <div className="relative z-10 h-full flex flex-col justify-between">
                                                            <div className="text-center">
                                                                <BsQrCode size={150} className="text-white mx-auto mb-4" />
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); setShowQRModal(true); }}
                                                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all"
                                                                >
                                                                    Expand QR Code
                                                                </button>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-xl">
                                                                    <div className="text-[9px] text-red-400 font-bold uppercase mb-1">⚠️ Critical Allergies</div>
                                                                    <div className="text-sm font-black text-red-300">{userData.allergies.join(", ")}</div>
                                                                </div>
                                                                <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                                                                    <div className="text-[9px] text-cyan-400 font-bold uppercase mb-1">Emergency Contacts</div>
                                                                    <div className="text-xs font-bold text-slate-300">{userData.emergencyContacts[0].name}</div>
                                                                    <div className="text-xs text-slate-400">{userData.emergencyContacts[0].phone}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => setShowShareModal(true)}
                                            className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-3"
                                        >
                                            <BsShareFill size={18} /> Share ID
                                        </button>
                                        <button
                                            onClick={() => toast.info("📥 ID Card Downloaded")}
                                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/30"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Profile Tab - ENHANCED WITH ANIMATED STATS */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500">
                                        <div className="bg-slate-950 rounded-3xl p-8">
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Medical Profile</h2>
                                                <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full">
                                                    <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Health Score: {healthScore}%</span>
                                                </div>
                                            </div>

                                            {/* Animated Health Stats Grid */}
                                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                <div className="group p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-105 cursor-pointer">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className="text-[10px] font-bold text-purple-400 uppercase mb-1">Blood Group</div>
                                                            <div className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{userData.bloodGroup}</div>
                                                        </div>
                                                        <BsDropletFill size={30} className="text-purple-400/40 group-hover:text-purple-400 transition-colors" />
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-full animate-pulse"></div>
                                                    </div>
                                                </div>

                                                <div className="group p-5 bg-slate-900/80 rounded-2xl border border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 hover:scale-105 cursor-pointer">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className="text-[10px] font-bold text-red-400 uppercase mb-1">⚠️ Allergies</div>
                                                            <div className="text-lg font-black text-red-400">{userData.allergies.join(", ")}</div>
                                                        </div>
                                                        <BsExclamationTriangleFill size={30} className="text-red-400/40 group-hover:text-red-400 group-hover:animate-pulse transition-colors" />
                                                    </div>
                                                    <div className="text-[9px] text-red-300 font-bold">CRITICAL ALERT</div>
                                                </div>

                                                <div className="group p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-105 cursor-pointer">
                                                    <div className="text-[10px] font-bold text-cyan-400 uppercase mb-2">Medical Conditions</div>
                                                    <div className="space-y-2">
                                                        {userData.conditions.map((cond, idx) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <BsCheckCircleFill className="text-cyan-400 text-xs" />
                                                                <div className="text-sm font-bold text-slate-300">{cond}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="group p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 hover:scale-105 cursor-pointer">
                                                    <div className="text-[10px] font-bold text-emerald-400 uppercase mb-2">Active Medications</div>
                                                    <div className="space-y-2">
                                                        {userData.medications.map((med, idx) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <BsFileMedical className="text-emerald-400 text-xs" />
                                                                <div className="text-sm font-bold text-slate-300">{med}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Health Score Progress Bar */}
                                            <div className="mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-black text-white">Overall Health Status</span>
                                                    <span className="text-sm font-black text-emerald-400">{healthScore > 0 ? healthScore : 85}%</span>
                                                </div>
                                                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${healthScore > 0 ? healthScore : 85}%` }}
                                                    >
                                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Medical Timeline Button */}
                                            <button
                                                onClick={() => { setShowTimeline(!showTimeline); if (!healthScore) setHealthScore(85); }}
                                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
                                            >
                                                <BsActivity /> {showTimeline ? 'Hide' : 'View'} Medical Timeline
                                            </button>

                                            {/* Medical Timeline */}
                                            {showTimeline && (
                                                <div className="mt-6 space-y-4 animate-slide-up">
                                                    <h3 className="text-lg font-black text-white mb-4">Recent Medical History</h3>
                                                    {[
                                                        { date: '2025-12-15', event: 'Annual Checkup', status: 'Completed', color: 'emerald' },
                                                        { date: '2025-10-03', event: 'Blood Pressure Monitoring', status: 'Normal', color: 'cyan' },
                                                        { date: '2025-08-22', event: 'Pacemaker Inspection', status: 'Optimal', color: 'purple' },
                                                        { date: '2025-06-11', event: 'Asthma Review', status: 'Stable', color: 'blue' }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                                            <div className="flex flex-col items-center">
                                                                <div className={`w-4 h-4 rounded-full bg-${item.color}-500 shadow-lg shadow-${item.color}-500/50`}></div>
                                                                {idx < 3 && <div className={`w-0.5 h-12 bg-gradient-to-b from-${item.color}-500 to-slate-800`}></div>}
                                                            </div>
                                                            <div className="flex-1 pb-6">
                                                                <div className="text-xs text-slate-500 font-bold mb-1">{item.date}</div>
                                                                <div className="text-sm font-black text-white">{item.event}</div>
                                                                <div className={`text-xs font-bold text-${item.color}-400`}>{item.status}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Donation Tab - ENHANCED WITH INTERACTIVE ORGAN MODEL */}
                            {activeTab === 'donation' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
                                        <div className="bg-slate-950 text-white rounded-3xl p-10">
                                            {pledgeStep === 0 && (
                                                /* Initial State */
                                                <div className="text-center animate-fade-in">
                                                    <BsHeartPulseFill size={60} className="mx-auto text-red-500 mb-6 animate-pulse drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
                                                    <h2 className="text-4xl font-black tracking-tighter mb-4 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">Be A Life Hero.</h2>
                                                    <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Your organs can save up to <span className="text-red-400 font-black text-2xl">8 lives</span> and bring hope to countless families.</p>

                                                    {/* Impact Preview Stats */}
                                                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                                                        <div className="p-4 bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-xl">
                                                            <div className="text-3xl font-black text-red-400 mb-1">8</div>
                                                            <div className="text-xs text-slate-400 font-bold">Lives Saved</div>
                                                        </div>
                                                        <div className="p-4 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-xl">
                                                            <div className="text-3xl font-black text-orange-400 mb-1">16</div>
                                                            <div className="text-xs text-slate-400 font-bold">Organs Donated</div>
                                                        </div>
                                                        <div className="p-4 bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-xl">
                                                            <div className="text-3xl font-black text-pink-400 mb-1">8</div>
                                                            <div className="text-xs text-slate-400 font-bold">Families Helped</div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleConsent}
                                                        className="px-12 py-5 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_rgba(236,72,153,0.7)]"
                                                    >
                                                        🎯 Start Your Pledge
                                                    </button>
                                                </div>
                                            )}

                                            {(pledgeStep === 1 || showOrganModel) && pledgeStep < 3 && (
                                                /* Organ Selection State */
                                                <div className="animate-fade-in">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Select Organs to Donate</h3>
                                                        <p className="text-slate-400 text-sm">Choose which organs you wish to donate</p>
                                                    </div>

                                                    {/* Interactive Organ Selection Grid */}
                                                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                                                        {[
                                                            { key: 'heart', icon: BsHeartPulseFill, label: 'Heart', color: 'red', lives: 1 },
                                                            { key: 'kidney', icon: BsDropletFill, label: 'Kidneys (Both)', color: 'blue', lives: 2 },
                                                            { key: 'eyes', icon: BsEyeFill, label: 'Eyes (Both)', color: 'cyan', lives: 2 },
                                                            { key: 'lungs', icon: BsLungs, label: 'Lungs (Both)', color: 'emerald', lives: 2 }
                                                        ].map(organ => {
                                                            const Icon = organ.icon;
                                                            const isSelected = selectedOrgans[organ.key];
                                                            const isPulsing = selectedOrganForModel === organ.key;
                                                            return (
                                                                <button
                                                                    key={organ.key}
                                                                    onClick={() => toggleOrgan(organ.key)}
                                                                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${isSelected
                                                                        ? `bg-gradient-to-br from-${organ.color}-900/40 to-${organ.color}-800/20 border-${organ.color}-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]`
                                                                        : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
                                                                        } ${isPulsing ? 'animate-pulse' : ''}`}
                                                                >
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <Icon size={40} className={`${isSelected ? `text-${organ.color}-400` : 'text-slate-600'} transition-colors`} />
                                                                        {isSelected && <BsCheckCircleFill size={24} className={`text-${organ.color}-400 animate-bounce`} />}
                                                                    </div>
                                                                    <div className={`text-left ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                                                                        <div className="font-black text-lg mb-1">{organ.label}</div>
                                                                        <div className="text-xs font-bold">Can save {organ.lives} {organ.lives > 1 ? 'lives' : 'life'}</div>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex gap-4 justify-center">
                                                        <button
                                                            onClick={() => { setPledgeStep(0); setShowOrganModel(false); }}
                                                            className="px-8 py-4 bg-slate-800 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-700 transition-all"
                                                        >
                                                            ← Back
                                                        </button>
                                                        <button
                                                            onClick={() => { setPledgeStep(2); }}
                                                            disabled={!Object.values(selectedOrgans).some(v => v)}
                                                            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                        >
                                                            Continue →
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {pledgeStep === 2 && (
                                                /* Confirmation State */
                                                <div className="text-center animate-fade-in">
                                                    <BsShieldCheck size={60} className="mx-auto text-emerald-400 mb-6" />
                                                    <h3 className="text-3xl font-black mb-4 text-white">Confirm Your Pledge</h3>
                                                    <p className="text-slate-400 mb-6">You're about to make a life-changing decision</p>

                                                    {/* Selected Organs Summary */}
                                                    <div className="inline-block p-6 bg-slate-900/50 border border-slate-700 rounded-2xl mb-8">
                                                        <div className="text-sm font-bold text-slate-400 mb-3">You've selected:</div>
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            {Object.entries(selectedOrgans).filter(([_, v]) => v).map(([k, _]) => (
                                                                <span key={k} className="px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full text-xs font-black uppercase">
                                                                    {k}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4 justify-center">
                                                        <button
                                                            onClick={() => setPledgeStep(1)}
                                                            className="px-8 py-4 bg-slate-800 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-700 transition-all"
                                                        >
                                                            ← Back
                                                        </button>
                                                        <button
                                                            onClick={completePledge}
                                                            className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                                                        >
                                                            ✓ Confirm Pledge
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {pledgeStep === 3 && donationConsent && (
                                                /* Success State */
                                                <div className="text-center animate-fade-in">
                                                    <div className="relative inline-block mb-8">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                                                        <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                                                            <BsCheckCircleFill size={60} className="text-white" />
                                                        </div>
                                                    </div>

                                                    <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">You're A Hero! 🎉</h2>
                                                    <p className="text-xl text-slate-300 mb-8">Your pledge has been recorded successfully</p>

                                                    {/* Impact Stats Dashboard */}
                                                    <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                                                        <div className="p-6 bg-gradient-to-br from-emerald-900/30 to-cyan-900/20 border border-emerald-500/50 rounded-2xl">
                                                            <div className="text-5xl font-black text-emerald-400 mb-2 animate-pulse">{impactStats.lives}</div>
                                                            <div className="text-sm text-slate-300 font-bold">Lives You'll Save</div>
                                                        </div>
                                                        <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border border-cyan-500/50 rounded-2xl">
                                                            <div className="text-5xl font-black text-cyan-400 mb-2 animate-pulse">{impactStats.organs}</div>
                                                            <div className="text-sm text-slate-300 font-bold">Organs Pledged</div>
                                                        </div>
                                                        <div className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-500/50 rounded-2xl">
                                                            <div className="text-5xl font-black text-blue-400 mb-2 animate-pulse">{impactStats.families}</div>
                                                            <div className="text-sm text-slate-300 font-bold">Families Helped</div>
                                                        </div>
                                                    </div>

                                                    {/* Hero Badge */}
                                                    <div className="inline-block p-6 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 border-2 border-yellow-500/50 rounded-2xl mb-6">
                                                        <div className="text-6xl mb-2">🏆</div>
                                                        <div className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">LIFE HERO BADGE</div>
                                                        <div className="text-xs text-slate-400 mt-1">Awarded for your pledge</div>
                                                    </div>

                                                    <button
                                                        onClick={() => { setPledgeStep(0); setDonationConsent(false); setSelectedOrgans({ kidney: false, heart: false, eyes: false, lungs: false }); }}
                                                        className="px-8 py-4 bg-slate-800 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-slate-700 transition-all"
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* QR Code Modal */}
            {showQRModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowQRModal(false)}>
                    <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-slate-950 rounded-3xl p-10 max-w-md">
                            <button onClick={() => setShowQRModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                                <BsXLg size={24} />
                            </button>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Emergency QR Code</h3>
                                <p className="text-slate-400 text-sm">Scan for instant medical info access</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl mb-6 mx-auto inline-block">
                                <BsQrCode size={220} className="text-slate-900" />
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-cyan-400 font-bold mb-1">ID: {userData.id}</div>
                                <div className="text-xs text-slate-500">Valid across all emergency facilities</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowShareModal(false)}>
                    <div className="relative p-[3px] rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-slate-950 rounded-3xl p-8 max-w-md">
                            <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                                <BsXLg size={24} />
                            </button>
                            <div className="text-center mb-8">
                                <BsShareFill size={50} className="mx-auto text-cyan-400 mb-4" />
                                <h3 className="text-2xl font-black text-white mb-2">Share Emergency ID</h3>
                                <p className="text-slate-400 text-sm">Share with trusted contacts for emergencies</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'WhatsApp', color: 'emerald', emoji: '📱' },
                                    { name: 'Email', color: 'blue', emoji: '✉️' },
                                    { name: 'SMS', color: 'cyan', emoji: '💬' },
                                    { name: 'Copy Link', color: 'purple', emoji: '🔗' }
                                ].map(platform => (
                                    <button
                                        key={platform.name}
                                        onClick={() => handleShare(platform.name)}
                                        className={`p-4 bg-gradient-to-br from-${platform.color}-900/30 to-${platform.color}-800/20 border border-${platform.color}-500/50 rounded-xl text-white font-black text-sm hover:scale-105 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]`}
                                    >
                                        <div className="text-2xl mb-2">{platform.emoji}</div>
                                        {platform.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                @keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } .animate-zoom-in { animation: zoom-in 0.4s ease-out forwards; }
                @keyframes ping-slow { 0% { transform: scale(0.8); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } } .animate-ping-slow { animation: ping-slow 2s infinite; }
                @keyframes scan-line { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } } .animate-scan-line { animation: scan-line 4s linear infinite; }
                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } } .animate-spin-reverse { animation: spin-reverse 12s linear infinite; }
                @keyframes ecg-draw { 0% { stroke-dasharray: 0, 1500; } 100% { stroke-dasharray: 1500, 0; } } .animate-ecg-draw { animation: ecg-draw 3s linear infinite; }
                @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } } .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes rainbow-border { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } .animate-rainbow { background-size: 400% 400%; animation: rainbow-border 3s ease infinite; }
                @keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(6,182,212,0.3); } 50% { box-shadow: 0 0 40px rgba(168,85,247,0.8), 0 0 80px rgba(6,182,212,0.5); } } .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } .animate-float { animation: float 3s ease-in-out infinite; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
                @keyframes border-dance { 0% { border-color: rgb(6,182,212); } 25% { border-color: rgb(168,85,247); } 50% { border-color: rgb(236,72,153); } 75% { border-color: rgb(251,146,60); } 100% { border-color: rgb(6,182,212); } } .animate-border-dance { animation: border-dance 4s linear infinite; }
                @keyframes text-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } } .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
                
                /* 3D Card Flip Styles */
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                
                .bg-scanlines { background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); }
                .cursor-wait { cursor: wait; }
                .glass-card { background: rgba(15,23,42,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
                .neon-text { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
            `}</style>
        </div >
    );
};

export default EmergencyHealthID;
