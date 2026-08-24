// Phase 6: Custom CSS for Real-Time Sentinel Features
const SENTINEL_STYLES = `
@keyframes spin-chakra {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
.animate-spin-chakra {
  animation: spin-chakra 10s linear infinite;
}
.animate-chakra-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-orb {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 1; }
  100% { transform: scale(1); opacity: 0.5; }
}
@keyframes tiranga-glow {
  0% { box-shadow: 0 0 15px rgba(255, 153, 51, 0.6), 0 0 30px rgba(255, 255, 255, 0.2); border-color: #FF9933; }
  33% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(19, 136, 8, 0.2); border-color: #FFFFFF; }
  66% { box-shadow: 0 0 15px rgba(19, 136, 8, 0.6), 0 0 30px rgba(255, 153, 51, 0.2); border-color: #138808; }
  100% { box-shadow: 0 0 15px rgba(255, 153, 51, 0.6), 0 0 30px rgba(255, 255, 255, 0.2); border-color: #FF9933; }
}
@keyframes tiranga-border-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes tiranga-spin {
  0% { transform: rotate(0deg); border-top-color: #FF9933; border-right-color: #FFFFFF; border-bottom-color: #138808; border-left-color: #FF9933; }
  100% { transform: rotate(360deg); border-top-color: #FF9933; border-right-color: #FFFFFF; border-bottom-color: #138808; border-left-color: #FF9933; }
}
.animate-pulse-orb {
  animation: pulse-orb 3s ease-in-out infinite;
}
.animate-tiranga-glow {
  animation: tiranga-glow 3s linear infinite;
  border-width: 2px;
  border-style: solid;
}
.tiranga-card-glow {
  position: absolute;
  inset: 0;
  border-radius: 2.5rem;
  padding: 3px; /* width of the border */
  background: linear-gradient(45deg, #FF9933, #FFFFFF, #138808, #FF9933);
  background-size: 400% 400%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: tiranga-border-flow 4s ease infinite;
  opacity: 0.8;
  pointer-events: none;
}
.tiranga-card-glow:hover {
  opacity: 1;
  animation-duration: 2s;
}
.tiranga-avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(var(--rotate, 0deg), #FF9933 10%, #FFFFFF 50%, #138808 90%) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin-chakra 4s linear infinite;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
@keyframes pulse-aura {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 153, 51, 0.5)); }
  50% { filter: drop-shadow(0 0 20px rgba(19, 136, 8, 0.8)); }
}
@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-scan {
  animation: scan-line 2s linear infinite;
}
.animate-aura {
  animation: pulse-aura 3s ease-in-out infinite;
}
.animate-float {
  animation: floating 4s ease-in-out infinite;
}
@keyframes chakra-rotate {
  from { transform: rotate3d(1, 1, 1, 0deg); }
  to { transform: rotate3d(1, 1, 1, 360deg); }
}
.animate-chakra-3d {
  animation: chakra-rotate 20s linear infinite;
  transform-style: preserve-3d;
}
@keyframes mascot-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}
.animate-mascot {
  animation: mascot-float 5s ease-in-out infinite;
}
@keyframes laser-pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.5); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.8; }
}
.animate-laser-pulse {
  animation: laser-pulse 1.5s ease-in-out infinite;
}
@keyframes drone-path {
  0% { stroke-dashoffset: 1000; opacity: 0; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
.animate-drone-path {
  stroke-dasharray: 1000;
  animation: drone-path 5s linear infinite;
}
`;

// Helper component for Bedside Manner Radar
const BedsideMannerRadar = ({ stats = { empathy: 95, clarity: 90, punctuality: 98, depth: 92 } }) => (
    <div className="w-16 h-16 relative flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
            {[20, 40, 60, 80].map(r => (
                <circle key={r} cx="50" cy="50" r={r / 2} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.1" />
            ))}
            <polygon
                points={`
                    50,${50 - stats.empathy / 2.5} 
                    ${50 + stats.clarity / 2.5},50 
                    50,${50 + stats.punctuality / 2.5} 
                    ${50 - stats.depth / 2.5},50
                `}
                fill="rgba(244, 63, 94, 0.3)"
                stroke="#f43f5e"
                strokeWidth="1"
                className="animate-pulse"
            />
        </svg>
        <div className="absolute inset-x-0 -bottom-1 text-center">
            <span className="text-[5px] font-black text-slate-500 uppercase tracking-tighter">Sentient Radar</span>
        </div>
    </div>
);

// Helper component for Medic-Mood Indicator
const MedicMoodIndicator = ({ mood = "Zen" }) => {
    const moods = {
        Zen: { icon: "🧘", label: "Zen Focus", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        Turbo: { icon: "⚡", label: "Turbo Speed", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        Compassion: { icon: "🤝", label: "Deep Care", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" }
    };
    const active = moods[mood] || moods.Zen;

    return (
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${active.border} ${active.bg} animate-pulse shrink-0`}>
            <span className="text-[8px]">{active.icon}</span>
            <span className={`text-[7px] font-black uppercase tracking-tight ${active.color}`}>{active.label}</span>
        </div>
    );
};

// Helper component for Ashok Chakra
const AshokChakra = ({ size = "w-32 h-32", color = "#000080" }) => (
    <div className={`${size} relative flex items-center justify-center animate-spin-chakra`}>
        <div className="absolute inset-0 border-[2px] border-[#000080] rounded-full opacity-20" />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,0,128,0.4)]">
            <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="1" />
            <circle cx="50" cy="50" r="8" fill={color} />
            {[...Array(24)].map((_, i) => (
                <line
                    key={i}
                    x1="50" y1="50"
                    x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
                    y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
                    stroke={color}
                    strokeWidth="0.5"
                />
            ))}
            {[...Array(24)].map((_, i) => (
                <circle
                    key={`dot-${i}`}
                    cx={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
                    cy={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
                    r="1"
                    fill={color}
                />
            ))}
        </svg>
    </div>
);

// V2 ELITE: Sanjeevani Drone Dispatch Simulation
const SanjeevaniDroneDispatch = () => {
    return (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            <svg className="w-full h-full">
                <path
                    d="M100,500 Q300,300 500,500 T900,100"
                    fill="none"
                    stroke="url(#droneGradient)"
                    strokeWidth="4"
                    className="animate-drone-path"
                />
                <defs>
                    <linearGradient id="droneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF9933" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#138808" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 animate-bounce">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center animate-spin">
                        <BsBroadcast className="text-white text-xs" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Amrit Drone Dispatch</p>
                        <p className="text-xs font-bold text-white">ETA: 4 mins • Emergency Meds</p>
                    </div>
                </div>
            </div>
            {/* Animated Drone Icon */}
            <div className="absolute top-[10%] right-[10%] w-12 h-12 animate-float">
                <div className="w-full h-full bg-slate-900 rounded-xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <BsLightningChargeFill className="text-emerald-500 animate-pulse" />
                </div>
            </div>
        </div>
    );
};

// Helper component for Live Activity Ticker
const LiveActivityTicker = ({ docId }) => {
    const [index, setIndex] = useState(0);
    const updates = [
        "Patient recovery rate optimized +5% today",
        "Just completed a neural-sync consultation",
        "Expertise verified: Top 1% in specialized care",
        "Live status: Actively monitoring patient vitals"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % updates.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl overflow-hidden mb-3">
            <BsBroadcast className="text-blue-400 text-[10px] animate-pulse shrink-0" />
            <p className="text-[9px] font-black text-blue-300 uppercase tracking-tight truncate animate-fade-in" key={index}>
                {updates[index]}
            </p>
        </div>
    );
};

// Helper component for AI Symptom-Scope Badge
const SymptomMatchBadge = ({ stats, searchTerm }) => {
    if (!searchTerm || !stats) return null;

    // Find matching symptom
    const match = Object.keys(stats).find(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!match) return null;

    return (
        <div className="mb-3 animate-fade-in z-30 relative">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] rounded-xl">
                <div className="bg-slate-900/90 rounded-xl px-3 py-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <BsLightningChargeFill className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">AI Clinical Match</p>
                        <p className="text-xs font-bold text-white">
                            Treated <span className="text-emerald-400 font-black">{stats[match]}+</span> {match} cases
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for Omni-Presence Map
const OmniPresenceMap = ({ location, affiliation }) => {
    return (
        <div className="absolute top-2 left-2 z-[45] group/map cursor-help">
            <div className={`
                flex items-center gap-1.5 px-2 py-1 rounded-lg backdrop-blur-md border shadow-lg transition-all duration-300
                ${location === 'Virtual Office'
                    ? 'bg-blue-500/80 border-blue-400/50 text-white'
                    : 'bg-emerald-500/80 border-emerald-400/50 text-white'}
            `}>
                <BsGeoAltFill className="text-[10px]" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                    {location === 'Virtual Office' ? 'Digital' : 'Live'}
                </span>
            </div>

            {/* Hover Tooltip */}
            <div className="absolute top-full left-0 mt-2 w-48 opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-xl">
                    <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Current Location</p>
                    <p className="text-xs font-bold text-white mb-2">{location || 'N/A'}</p>
                    {affiliation && (
                        <>
                            <div className="h-[1px] bg-white/10 w-full my-2" />
                            <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Affiliation</p>
                            <p className="text-xs font-bold text-rose-400">{affiliation}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper component for Academic Lineage Badge
const AcademicLineageBadge = ({ lineage }) => {
    if (!lineage) return null;
    return (
        <div className="group/lineage relative cursor-help z-50">
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg">
                <span className="text-[10px]">🎓</span>
            </div>
            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover/lineage:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-slate-900/95 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-xl">
                    <p className="text-[8px] font-black text-rose-400 uppercase mb-2 text-center">Academic Lineage</p>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[9px]">
                            <span className="text-slate-400">Alma Mater</span>
                            <span className="text-white font-bold">{lineage.almaMater}</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px]">
                            <span className="text-slate-400">Mentor</span>
                            <span className="text-white font-bold">{lineage.mentor}</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px]">
                            <span className="text-slate-400">Papers</span>
                            <span className="text-emerald-400 font-bold">{lineage.papers} Published</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 text-center">
                            <span className="text-[8px] text-orange-400 font-black uppercase tracking-wider">{lineage.distinction}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for Audio translation waveform (Optimized CSS-only animation to prevent React re-renders)
const TranslationWaveformHUD = ({ active }) => {
    if (!active) return null;
    return (
        <div className="absolute top-0 left-0 w-full h-1 flex items-end gap-[1px] opacity-30">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className="flex-1 bg-rose-500 animate-pulse rounded-t-sm" 
                    style={{ 
                        height: `${20 + Math.random() * 80}%`,
                        animationDuration: `${0.4 + Math.random() * 0.8}s`
                    }} 
                />
            ))}
        </div>
    );
};

// Helper component for Voice Bio Waveform
const VoiceBioWaveform = ({ active, onClick }) => {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={`
                group/voice relative h-8 rounded-full border flex items-center gap-2 transition-all duration-300 overflow-hidden
                ${active
                    ? 'bg-rose-500/20 border-rose-500/50 w-32 px-3'
                    : 'bg-white/5 border-white/10 w-8 justify-center hover:bg-white/10'}
            `}
        >
            <div className={`shrink-0 transition-colors ${active ? 'animate-pulse' : 'text-slate-400 group-hover/voice:text-white'}`}>
                {active ? <BsMicFill className="text-rose-400 text-xs" /> : <BsMicMuteFill className="text-xs" />}
            </div>

            {active && (
                <div className="flex-1 flex items-center justify-center gap-[2px] h-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="w-[3px] bg-rose-400 rounded-full animate-pulse"
                            style={{
                                height: `${Math.random() * 100}%`,
                                animationDuration: `${0.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            )}
        </button>
    );
};

// Enhanced AI Pre-Diagnosis Chat - Interactive Chatbot Version
const AIPreDiagnosisChat = ({ doctorName, doctorData, onCheckMatch, onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: `नमस्ते! I'm Dr. ${doctorName}'s AI Assistant. I'll help determine if you're a good match for consultation.`,
            timestamp: new Date()
        },
        {
            id: 2,
            type: 'bot',
            text: "Please describe your main symptom or health concern in a few words.",
            timestamp: new Date(),
            quickReplies: ['Headache', 'Fever', 'Chest Pain', 'Stomach Pain', 'Other']
        }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [conversationStep, setConversationStep] = useState('symptom'); // symptom, duration, severity, additional, analysis, result
    const [symptomData, setSymptomData] = useState({});
    const [emergencyDetected, setEmergencyDetected] = useState(false);
    const [symptomCategory, setSymptomCategory] = useState('');
    const [severityLevel, setSeverityLevel] = useState(''); // mild, moderate, severe, emergency
    const [messageStatus, setMessageStatus] = useState({}); // Track delivery status of messages
    const messagesEndRef = useRef(null);

    // Emergency symptoms detection
    const emergencySymptoms = [
        'chest pain', 'heart attack', 'difficulty breathing', 'breathless', 'cant breathe',
        'severe bleeding', 'bleeding heavily', 'unconscious', 'stroke', 'paralysis',
        'suicide', 'self harm', 'severe injury', 'accident', 'choking'
    ];

    // Symptom categories
    const symptomCategories = {
        cardiac: ['chest pain', 'heart', 'palpitation', 'heartbeat', 'cardiac'],
        respiratory: ['breathing', 'cough', 'asthma', 'breathless', 'lungs', 'chest congestion'],
        neurological: ['headache', 'migraine', 'dizziness', 'seizure', 'numbness', 'weakness', 'stroke'],
        orthopedic: ['bone', 'joint', 'fracture', 'sprain', 'back pain', 'knee pain', 'arthritis'],
        fever: ['fever', 'temperature', 'chills', 'flu', 'infection'],
        gastro: ['stomach', 'abdominal', 'nausea', 'vomiting', 'diarrhea', 'constipation'],
        womens: ['menstrual', 'pregnancy', 'gynec', 'periods', 'cramps']
    };

    // Get progress step info
    const getProgressInfo = () => {
        const steps = {
            'symptom': { current: 1, total: 5, label: 'Describing Symptoms' },
            'duration': { current: 2, total: 5, label: 'Duration Assessment' },
            'severity': { current: 3, total: 5, label: 'Severity Rating' },
            'additional': { current: 4, total: 5, label: 'Additional Details' },
            'analysis': { current: 5, total: 5, label: 'Analyzing...' },
            'result': { current: 5, total: 5, label: 'Results Ready' }
        };
        return steps[conversationStep] || steps['symptom'];
    };

    // Detect emergency symptoms
    const checkEmergencySymptoms = (text) => {
        const lowerText = text.toLowerCase();
        return emergencySymptoms.some(symptom => lowerText.includes(symptom));
    };

    // Detect symptom category
    const detectSymptomCategory = (text) => {
        const lowerText = text.toLowerCase();
        for (const [category, keywords] of Object.entries(symptomCategories)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                return category;
            }
        }
        return 'general';
    };

    // Get severity info based on rating
    const getSeverityInfo = (severityText) => {
        const text = severityText.toLowerCase();
        if (text.includes('9') || text.includes('10') || text.includes('very severe') || text.includes('emergency')) {
            return { level: 'emergency', color: 'red', icon: '🔴', label: 'Emergency' };
        } else if (text.includes('7') || text.includes('8') || text.includes('severe')) {
            return { level: 'severe', color: 'orange', icon: '🟠', label: 'Severe' };
        } else if (text.includes('4') || text.includes('5') || text.includes('6') || text.includes('moderate')) {
            return { level: 'moderate', color: 'yellow', icon: '🟡', label: 'Moderate' };
        } else {
            return { level: 'mild', color: 'green', icon: '🟢', label: 'Mild' };
        }
    };

    // Get category display info
    const getCategoryDisplay = (category) => {
        const displays = {
            cardiac: { emoji: '💓', name: 'Cardiac', color: 'red' },
            respiratory: { emoji: '🫁', name: 'Respiratory', color: 'blue' },
            neurological: { emoji: '🧠', name: 'Neurological', color: 'purple' },
            orthopedic: { emoji: '🦴', name: 'Orthopedic', color: 'amber' },
            fever: { emoji: '🔥', name: 'Fever/Infection', color: 'orange' },
            gastro: { emoji: '🫃', name: 'Gastrointestinal', color: 'green' },
            womens: { emoji: '🤰', name: "Women's Health", color: 'pink' },
            general: { emoji: '🏥', name: 'General', color: 'slate' }
        };
        return displays[category] || displays['general'];
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const addBotMessage = (text, quickReplies = null, delay = 800) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                text,
                timestamp: new Date(),
                quickReplies
            }]);
        }, delay);
    };

    const handleQuickReply = (reply) => {
        handleSendMessage(reply);
    };

    const handleSendMessage = (messageText = userInput) => {
        if (!messageText.trim()) return;

        const newMessage = {
            id: Date.now(),
            type: 'user',
            text: messageText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setUserInput('');

        // Process conversation flow
        processConversation(messageText);
    };

    const processConversation = (userMessage) => {
        const lowerMsg = userMessage.toLowerCase();

        if (conversationStep === 'symptom') {
            setSymptomData(prev => ({ ...prev, symptom: userMessage }));

            // Check for emergency symptoms
            const isEmergency = checkEmergencySymptoms(userMessage);
            setEmergencyDetected(isEmergency);

            // Detect symptom category
            const category = detectSymptomCategory(userMessage);
            setSymptomCategory(category);
            const categoryInfo = getCategoryDisplay(category);

            setConversationStep('duration');

            // If emergency, show urgent alert
            if (isEmergency) {
                addBotMessage(
                    `🚨 EMERGENCY DETECTED\n\nYour symptom requires immediate medical attention. This is a potentially serious condition.`,
                    null,
                    500
                );
                setTimeout(() => {
                    addBotMessage(
                        `I still need a few quick details to match you with the right doctor. How long have you been experiencing this?`,
                        ['Just now', 'A few hours', 'Today', 'Longer'],
                        1000
                    );
                }, 1500);
            } else {
                // Show category badge
                addBotMessage(
                    `${categoryInfo.emoji} Symptom Category: ${categoryInfo.name}\n\nGot it. How long have you been experiencing this?`,
                    ['Just started today', '2-3 days', 'A week', 'More than a week']
                );
            }
        } else if (conversationStep === 'duration') {
            setSymptomData(prev => ({ ...prev, duration: userMessage }));
            setConversationStep('severity');
            addBotMessage(
                "On a scale of 1-10, how would you rate the severity? (1 = mild, 10 = severe)",
                ['1-3 (Mild)', '4-6 (Moderate)', '7-8 (Severe)', '9-10 (Very Severe)']
            );
        } else if (conversationStep === 'severity') {
            setSymptomData(prev => ({ ...prev, severity: userMessage }));

            // Detect severity level
            const severityInfo = getSeverityInfo(userMessage);
            setSeverityLevel(severityInfo.level);

            setConversationStep('additional');
            addBotMessage(
                `${severityInfo.icon} Severity Level: ${severityInfo.label}\n\nAre you experiencing any other symptoms alongside this?`,
                ['Nausea', 'Fatigue', 'Dizziness', 'No, just the main symptom']
            );
        } else if (conversationStep === 'additional') {
            setSymptomData(prev => ({ ...prev, additional: userMessage }));
            setConversationStep('analysis');

            addBotMessage("Perfect! Let me analyze this against Dr. " + doctorName + "'s expertise...", null, 500);

            setTimeout(() => {
                analyzeAndRecommend();
            }, 1500);
        }
    };

    const analyzeAndRecommend = () => {
        setConversationStep('result');

        // Calculate match score based on symptom data
        const matchScore = calculateMatchScore();
        onCheckMatch(matchScore);

        // Add analysis message
        addBotMessage(
            `✅ Analysis Complete! Based on your symptoms, I've calculated your compatibility with Dr. ${doctorName}.`,
            null,
            1000
        );

        // Add detailed result
        setTimeout(() => {
            addBotMessage(
                `🎯 Match Score: ${matchScore}%\n\n${getMatchExplanation(matchScore)}`,
                null,
                1000
            );
        }, 2000);

        // Add recommendation
        setTimeout(() => {
            if (matchScore >= 85) {
                addBotMessage(
                    `🌟 Excellent Match! Dr. ${doctorName} has treated ${getRandomCaseCount()} similar cases with a ${doctorData?.successRate || 95}% success rate. I highly recommend booking a consultation.`,
                    ['Book Now', 'Ask Another Question'],
                    1000
                );
            } else if (matchScore >= 70) {
                addBotMessage(
                    `✓ Good Match. Dr. ${doctorName} can help with your condition. They have ${doctorData?.experience || '10+ years'} of experience in this area.`,
                    ['Book Consultation', 'View Other Doctors'],
                    1000
                );
            } else {
                addBotMessage(
                    `While Dr. ${doctorName} is skilled, you might benefit more from a specialist in this specific area. Would you like me to suggest better-matched doctors?`,
                    ['Yes, Show Alternatives', 'No, Continue Anyway'],
                    1000
                );
            }
        }, 3500);
    };

    const calculateMatchScore = () => {
        const { symptom, severity } = symptomData;
        let score = 75; // Base score

        // Check if symptom matches doctor's specialty stats
        if (doctorData?.symptomStats) {
            const matchingSymptom = Object.keys(doctorData.symptomStats).find(s =>
                symptom.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(symptom.toLowerCase())
            );
            if (matchingSymptom) {
                score += 15; // Strong match
            }
        }

        // Adjust for severity and experience
        if (severity && (severity.includes('Severe') || severity.includes('9') || severity.includes('10'))) {
            if (parseInt(doctorData?.experience) >= 15) {
                score += 10; // Experienced doctor for severe cases
            }
        }

        // Cap at 99%
        return Math.min(99, score);
    };

    const getMatchExplanation = (score) => {
        if (score >= 90) return "🔥 Outstanding compatibility! Your symptoms align perfectly with the doctor's core expertise.";
        if (score >= 80) return "✨ Very strong match! This doctor has extensive experience treating similar cases.";
        if (score >= 70) return "👍 Solid match! The doctor is well-equipped to help with your condition.";
        return "⚠️ Moderate match. While capable, you may want to explore specialists for optimal care.";
    };

    const getRandomCaseCount = () => {
        return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div
            className="absolute inset-0 z-[100] bg-slate-900 rounded-3xl flex flex-col animate-fade-in border-2 border-rose-500/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-rose-600/90 to-orange-600/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 relative">
                        <BsLightningChargeFill className="text-lg animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                            AI Mini-Consult
                            <span className="text-[8px] px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400">Live</span>
                        </h4>
                        <p className="text-[10px] text-slate-400">with Dr. {doctorName}</p>
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
                >
                    <BsXCircle className="text-lg" />
                </button>
            </div>

            {/* Progress Bar */}
            {conversationStep !== 'result' && (
                <div className="px-4 py-3 bg-slate-800/50 border-b border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                            {getProgressInfo().label}
                        </span>
                        <span className="text-[9px] text-slate-400">
                            Step {getProgressInfo().current} of {getProgressInfo().total}
                        </span>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${index < getProgressInfo().current
                                    ? 'bg-gradient-to-r from-rose-500 to-orange-500'
                                    : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                    {/* Estimated time */}
                    {conversationStep !== 'analysis' && (
                        <div className="mt-2 flex items-center gap-1 text-[9px] text-slate-400">
                            <BsClock className="text-[10px]" />
                            <span>~{6 - getProgressInfo().current} min remaining</span>
                        </div>
                    )}
                </div>
            )}

            {/* Emergency Alert Banner */}
            {emergencyDetected && conversationStep !== 'result' && (
                <div className="mx-4 mt-3 p-3 bg-red-500/20 border-2 border-red-500/50 rounded-xl animate-pulse">
                    <div className="flex items-start gap-2">
                        <span className="text-xl">🚨</span>
                        <div>
                            <p className="text-xs font-black text-red-400 uppercase">Emergency Symptoms Detected</p>
                            <p className="text-[10px] text-slate-300 mt-1">
                                Your symptoms may require urgent medical attention. Completing this consultation will help connect you with the right doctor immediately.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                        <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                            {/* Message Bubble */}
                            <div className={`relative rounded-2xl p-3 ${msg.type === 'user'
                                ? 'bg-gradient-to-br from-rose-600 to-orange-600 text-white rounded-tr-none shadow-lg shadow-rose-500/20'
                                : 'bg-slate-800/95 backdrop-blur-sm text-white rounded-tl-none border border-slate-700 shadow-lg'
                                }`}>
                                {msg.type === 'bot' && (
                                    <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] shadow-lg">
                                        🤖
                                    </div>
                                )}
                                <p className="text-xs leading-relaxed whitespace-pre-line">{msg.text}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <span className={`text-[8px] ${msg.type === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                                        {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {/* Message Status for User Messages */}
                                    {msg.type === 'user' && (
                                        <span className="text-[8px] text-blue-400 ml-2">✓✓</span>
                                    )}
                                </div>
                            </div>

                            {/* Quick Replies */}
                            {msg.quickReplies && index === messages.length - 1 && conversationStep !== 'result' && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {msg.quickReplies.map((reply, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickReply(reply)}
                                            className="px-3 py-1.5 bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 rounded-full text-[10px] font-bold text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 border border-slate-700 shadow-lg flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                            <span className="text-[10px] text-slate-300">AI is thinking...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {conversationStep !== 'result' ? (
                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your response..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!userInput.trim()}
                            className="px-4 py-3 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl text-white font-black text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2"
                        >
                            <BsArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-4 border-t border-white/10 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl text-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                        >
                            <BsCalendarCheck /> Proceed to Book
                        </button>
                        <button
                            onClick={() => {
                                setConversationStep('symptom');
                                setSymptomData({});
                                setMessages([
                                    { id: 1, type: 'bot', text: "Let's start fresh! What's your main symptom?", timestamp: new Date() }
                                ]);
                            }}
                            className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-black text-xs uppercase tracking-wider transition-all"
                        >
                            ↻
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
// Helper component for Quantum Queue Visualizer
const QuantumQueueVisualizer = ({ patientId, startTime }) => {
    const [progress, setProgress] = useState(0); // 0-100
    const [stage, setStage] = useState('History'); // History, Exam, Diagnosis, Rx

    useEffect(() => {
        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + 1;
            });
        }, 1000); // Fast simulation for demo
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress < 30) setStage('History');
        else if (progress < 60) setStage('Examination');
        else if (progress < 90) setStage('Diagnosis');
        else setStage('PrescriptionRx');
    }, [progress]);

    return (
        <div className="absolute bottom-4 right-4 left-4 z-20 bg-black/80 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">Live Session</span>
                </div>
                <span className="text-[9px] font-bold text-orange-400">{stage}</span>
            </div>

            {/* Quantum Progress Bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-orange-500 to-rose-500 transition-all duration-300 ease-linear relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px] animate-pulse" />
                </div>
            </div>

            <div className="flex justify-between mt-1 text-[8px] text-slate-500 font-bold uppercase">
                <span>Start</span>
                <span>Rx</span>
            </div>
        </div>
    );
};

// 1. Holographic Anatomy Interaction (Pain-Point Mapper)
const HolographicAnatomyMapper = ({ onSelectPart }) => {
    const parts = [
        { id: 'head', label: 'Neural Center', icon: '🧠', pos: { top: '5%', left: '45%' }, specialty: 'Neurologist' },
        { id: 'chest', label: 'Cardiac Hub', icon: '❤️', pos: { top: '25%', left: '45%' }, specialty: 'Cardiologist' },
        { id: 'stomach', label: 'Digestive Core', icon: '🩺', pos: { top: '45%', left: '45%' }, specialty: 'General Surgeon' },
        { id: 'bones', label: 'Skeletal Frame', icon: '🦴', pos: { top: '65%', left: '45%' }, specialty: 'Orthopedic' }
    ];

    return (
        <div className="relative w-full h-[500px] bg-slate-900/50 rounded-3xl overflow-hidden border border-blue-500/30 group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

            {/* Holographic "Man" Silhouette (SVG) */}
            <svg viewBox="0 0 100 200" className="absolute inset-0 w-full h-full opacity-30 fill-blue-500/20 stroke-blue-400">
                <path d="M50 10 Q60 10 65 25 Q70 40 60 50 Q50 60 40 50 Q30 40 35 25 Q40 10 50 10" /> {/* Head */}
                <path d="M50 50 L50 120 M20 70 L80 70 M20 70 L20 120 M80 70 L80 120 M35 120 L35 180 M65 120 L65 180" strokeWidth="2" fill="none" /> {/* Body lines */}
            </svg>

            {parts.map(part => (
                <button
                    key={part.id}
                    onClick={() => onSelectPart(part)}
                    className="absolute z-10 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-blue-400/50 hover:scale-110 hover:border-orange-400 transition-all animate-float"
                    style={{ top: part.pos.top, left: part.pos.left }}
                >
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{part.icon}</span>
                        <span className="text-[10px] font-black text-blue-300 uppercase tracking-tighter">{part.label}</span>
                    </div>
                </button>
            ))}

            <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Neural Resonance Active</span>
            </div>
        </div>
    );
};

// 2. AI Aura-Sense Bio-Feedback Overlay
const AIAuraSenseBioFeedback = ({ heartRate = 72, stress = 'Low' }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {/* Scan Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan opacity-40" />

            {/* Aura Glow */}
            <div className="absolute inset-0 animate-aura border-[10px] border-orange-500/10 rounded-3xl" />

            {/* Floating Vitals in Aura-Sense style */}
            <div className="absolute top-20 right-8 space-y-4">
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                        <BsHeartPulseFill className="text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-[8px] font-black text-emerald-400/70 uppercase">Pulse Rate</div>
                        <div className="text-lg font-black text-white leading-none">{heartRate} <span className="text-[10px]">BPM</span></div>
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-orange-500/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <BsActivity className="text-orange-500" />
                    </div>
                    <div>
                        <div className="text-[8px] font-black text-orange-400/70 uppercase">Stress Sync</div>
                        <div className="text-lg font-black text-white leading-none">{stress}</div>
                    </div>
                </div>
            </div>

            {/* Neural Matrix Overlay (dots) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
    );
};

// 3. Neural-Script Live Scribe
const NeuralScriptLiveScribe = ({ messages = [] }) => {
    const [scribeText, setScribeText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg.sender === 'doc') {
                setIsTyping(true);
                setScribeText("");
                let i = 0;
                const draft = `Drafting Rx: Possible ${lastMsg.text.substring(0, 20)}... Logic applied.`;
                const interval = setInterval(() => {
                    setScribeText(draft.substring(0, i));
                    i++;
                    if (i > draft.length) {
                        clearInterval(interval);
                        setIsTyping(false);
                    }
                }, 50);
                return () => clearInterval(interval);
            }
        }
    }, [messages]);

    return (
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 h-full shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <BsFileEarmarkMedicalFill className="text-emerald-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Live Scribe</span>
                </div>
                {isTyping && <div className="flex gap-1"><div className="w-1 h-1 bg-emerald-500 animate-bounce" /><div className="w-1 h-1 bg-emerald-500 animate-bounce delay-75" /><div className="w-1 h-1 bg-emerald-500 animate-bounce delay-150" /></div>}
            </div>

            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <div className="text-[8px] font-black text-emerald-500 uppercase mb-1">Current Intelligence</div>
                    <p className="text-xs text-slate-300 font-medium italic">"{scribeText || "Listening to consultation for real-time prescription drafting..."}"</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-[7px] font-black text-slate-500 uppercase">Certainty</div>
                        <div className="text-xs font-bold text-white">92.4%</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-[7px] font-black text-slate-500 uppercase">Regulatory</div>
                        <div className="text-xs font-bold text-emerald-500">PASSED</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-2 right-4 opacity-10">
                <AshokChakra size="w-20 h-20" color="#138808" />
            </div>
        </div>
    );
};
// 4. Tiranga Health-Shield Verification Badge
const TirangaHealthShield = ({ honorScore = 98 }) => {
    return (
        <div className="relative group/shield cursor-help">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full blur opacity-20 group-hover/shield:opacity-50 transition duration-1000 group-hover/shield:duration-200 animate-tiranga-border-flow" />
            <div className="relative flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-2xl">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shadow-inner">
                    <AshokChakra size="w-full h-full" color="#000080" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter">Honor Score</span>
                    <span className="text-[10px] font-black bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808] bg-clip-text text-transparent">Elite {honorScore}</span>
                </div>
            </div>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-black/90 backdrop-blur-2xl rounded-2xl border border-[#FF9933]/30 opacity-0 group-hover/shield:opacity-100 transition-all pointer-events-none scale-90 group-hover/shield:scale-100 z-50 shadow-[0_0_30px_rgba(255,153,51,0.2)]">
                <div className="text-[9px] font-black text-[#FF9933] uppercase mb-1 tracking-widest text-center">National Excellence Certified</div>
                <p className="text-[8px] text-slate-300 font-medium text-center">Verified top-tier medical expertise with a perfect track record of patient outcomes.</p>
                <div className="mt-2 flex justify-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#FF9933]" />
                    <div className="w-1 h-1 rounded-full bg-white" />
                    <div className="w-1 h-1 rounded-full bg-[#138808]" />
                </div>
            </div>
        </div>
    );
};
// 5. Smart-Med Dose Predictor
const SmartMedDosePredictor = ({ vitals }) => {
    const calculateDose = () => {
        if (vitals.spO2 < 95) return "Dose: 650mg + 10L O2/min (Critical Care Sync)";
        if (vitals.heartRate > 100) return "Dose: 500mg × 3 (Neural Tachycardia Guard)";
        return "Dose: 500mg × 2 (Standard Optimal)";
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-black p-4 rounded-2xl border border-indigo-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-500/20 w-16 h-16 rounded-full blur-2xl" />
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <BsLightningChargeFill className="text-indigo-400 text-sm" />
                </div>
                <div>
                    <div className="text-[7px] font-black text-indigo-400 uppercase tracking-widest">Sentient Dose Optimizer</div>
                    <div className="text-xs font-black text-white italic">Auto-Calculated Logic</div>
                </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                <span className="text-[10px] font-bold text-slate-300">Predictive Rx</span>
                <span className="text-[10px] font-black text-indigo-300 animate-pulse">{calculateDose()}</span>
            </div>

            <div className="mt-3 flex gap-2">
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[85%] animate-pulse" />
                </div>
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[92%] animate-pulse" />
                </div>
            </div>
        </div>
    );
};

// V2 ELITE: Ayush-Vital Chakra Dashboard
const AyushVitalChakra = ({ vitals }) => {
    const chakraDimensions = [
        { label: 'Ojas (Vitality)', value: vitals.spO2, color: 'emerald' },
        { label: 'Prana (Energy)', value: 100 - (vitals.heartRate > 100 ? (vitals.heartRate - 100) : 0), color: 'orange' },
        { label: 'Sattva (Clarity)', value: 92, color: 'blue' },
        { label: 'Tejas (Brilliance)', value: 85, color: 'rose' },
        { label: 'Shanti (Calm)', value: vitals.stressLevel === 'Normal' ? 95 : 60, color: 'purple' }
    ];

    return (
        <div className="relative w-48 h-48 flex items-center justify-center group/chakra">
            <div className="absolute inset-0 animate-chakra-3d opacity-20 bg-[conic-gradient(from_0deg,#FF9933,#FFFFFF,#138808,#FF9933)] rounded-full blur-xl" />
            <div className="relative w-40 h-40 rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl flex items-center justify-center p-4">
                <div className="absolute inset-0 animate-spin-chakra opacity-10">
                    <AshokChakra size="w-full h-full" color="#FF9933" />
                </div>
                <div className="z-10 text-center">
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Holistic Sync</div>
                    <div className="text-2xl font-black text-white">88%</div>
                    <div className="text-[7px] font-bold text-emerald-400">AYUSH_V3_OPTIMAL</div>
                </div>
                {/* Orbital Dimensions */}
                {chakraDimensions.map((dim, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{
                            backgroundColor: `var(--${dim.color}-500)`,
                            top: `${50 + 45 * Math.sin(i * (360 / 5) * Math.PI / 180)}%`,
                            left: `${50 + 45 * Math.cos(i * (360 / 5) * Math.PI / 180)}%`,
                            animation: `floating ${2 + i}s ease-in-out infinite`
                        }}
                    >
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover/chakra:opacity-100 transition-opacity whitespace-nowrap text-[6px] font-black uppercase text-white bg-black/80 px-1 rounded">
                            {dim.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// V2 ELITE: Sanjeevani AI Mascot
const SanjeevaniMascot = ({ message }) => {
    return (
        <div className="fixed bottom-32 right-8 z-[100] animate-mascot flex flex-col items-end pointer-events-none">
            {message && (
                <div className="mb-4 bg-white/95 backdrop-blur-xl border border-rose-500/20 px-4 py-3 rounded-2xl rounded-br-none shadow-2xl max-w-[200px] animate-fade-in pointer-events-auto">
                    <p className="text-[10px] font-bold text-slate-800 leading-relaxed italic">
                        "{message}"
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-[7px] font-black text-rose-500 uppercase tracking-widest">Sanjeevani AI</span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-rose-500 rounded-full animate-pulse" />)}
                        </div>
                    </div>
                </div>
            )}
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[2px] rounded-full shadow-2xl relative pointer-events-auto cursor-pointer group">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <AshokChakra size="w-12 h-12" color="#000080" />
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay group-hover:bg-blue-500/40 transition-all" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] animate-pulse">
                    🤖
                </div>
            </div>
        </div>
    );
};

// V2 ELITE: Neural Voice Bridge (simulator)
const NeuralVoiceBridge = ({ isActive, onToggle, currentLang }) => {
    return (
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 group">
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Voice Link</span>
                <span className="text-[10px] font-bold text-white flex items-center gap-2">
                    {currentLang} <BsTranslate className="text-rose-500" /> English
                </span>
            </div>
            <button
                onClick={onToggle}
                className={`w-12 h-6 rounded-full relative transition-all duration-500 ${isActive ? 'bg-gradient-to-r from-[#FF9933] to-[#138808]' : 'bg-slate-700'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 ${isActive ? 'left-7 shadow-[0_0_10px_white]' : 'left-1'}`} />
            </button>
            {isActive && (
                <div className="flex items-center gap-1 h-4 px-2">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="w-[2px] bg-white rounded-full animate-pulse"
                            style={{
                                height: `${30 + Math.random() * 70}%`,
                                backgroundColor: i < 3 ? '#FF9933' : i < 6 ? '#FFFFFF' : '#138808',
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// V2 ELITE: Quantum Vault Access
const QuantumVaultAccess = ({ onUnlock }) => {
    const [status, setStatus] = useState('locked'); // locked, scanning, unlocked

    const startScan = () => {
        setStatus('scanning');
        setTimeout(() => setStatus('unlocked'), 2500);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-10 bg-slate-900/90 backdrop-blur-3xl rounded-[3rem] border-2 border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.1)]">
            <div className="relative">
                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center transition-all duration-500 ${status === 'unlocked' ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/10'}`}>
                    <BsShieldCheck className={`text-5xl transition-all duration-500 ${status === 'unlocked' ? 'text-emerald-500 scale-125' : 'text-slate-600'}`} />
                    {status === 'scanning' && (
                        <div className="absolute inset-0 border-4 border-rose-500 rounded-3xl animate-ping opacity-50" />
                    )}
                </div>
                {status === 'locked' && (
                    <button
                        onClick={startScan}
                        className="absolute -bottom-4 -right-4 w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all animate-bounce"
                    >
                        <BsLightningChargeFill className="text-white" />
                    </button>
                )}
            </div>

            <div className="text-center">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-2">
                    {status === 'locked' ? 'Vault Locked' : status === 'scanning' ? 'Neural Identity Scan' : 'Access Granted'}
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                    {status === 'locked' ? 'Identity verification required for Quantum-Vault' :
                        status === 'scanning' ? 'Establishing secure biometric bridge...' :
                            'Authorized: Medical records released to neural-sync'}
                </p>
            </div>

            {status === 'unlocked' && (
                <button
                    onClick={onUnlock}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/40 animate-fade-in"
                >
                    ENTER VAULT
                </button>
            )}
        </div>
    );
};

import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsCameraVideoFill, BsMicFill, BsMicMuteFill, BsCameraVideoOffFill,
    BsTelephoneFill, BsCalendarCheck, BsSearch, BsFilter,
    BsStarFill, BsClock, BsPersonFill, BsChatQuoteFill, BsXCircle,
    BsActivity, BsFillChatDotsFill, BsFileEarmarkMedicalFill, BsArrowRight,
    BsTranslate, BsHeartPulseFill, BsBodyText, BsLightningChargeFill, BsCartCheckFill,
    BsFileEarmarkArrowUpFill, BsShieldCheck, BsAwardFill, BsExclamationTriangleFill, BsGeoAltFill,
    BsClockFill, BsBroadcast, BsExclamationCircleFill, BsCheckCircleFill
} from 'react-icons/bs';
import { BASE_URL, token } from '../config';
import useFetchData from '../hooks/useFetchData';
import { authContext } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { toast } from 'react-toastify';
import MetaHead from '../components/SEO/MetaHead';
import SEOKeywordIsland from '../components/SEO/SEOKeywordIsland';
import VideoConsultSEOIsland from '../components/SEO/VideoConsultSEOIsland';

const TELE_DOCTORS = [
    {
        id: 1, name: "Dr. Arvind Sharma", specialty: "Cardiologist", experience: "15 Years", rating: 4.9,
        image: "https://randomuser.me/api/portraits/men/32.jpg", status: "Available", color: "rose",
        fee: 500, response: "Under 1 min", bio: "Senior Cardiologist at Apollo with expertise in Interventional Cardiology.",
        patients: "15k+", education: "MBBS, MD (Cardio)",
        languages: ["English", "Hindi", "Urdu"], successRate: 96, totalReviews: 1247,
        radar: { empathy: 98, clarity: 92, punctuality: 99, depth: 95 }, mood: "Zen", honor: true, honorScore: 99,
        specializations: ["Interventional Cardiology", "Heart Failure Management", "Preventive Cardiology", "Hypertension"],
        badges: ["Top Rated", "Quick Responder", "Board Certified", "15+ Years"],
        vibeTags: ["Deep Listener", "Detailed Explainer", "Calm Presence"],
        nextSlots: ["Today 3:30 PM", "Today 5:00 PM", "Tomorrow 10:00 AM"],
        queuePosition: 0, waitTime: 0, aiMatch: 96,
        reviews: [
            { rating: 5, text: "Excellent consultation. Very patient and thorough.", patient: "Verified Patient", date: "2 days ago" },
            { rating: 5, text: "Best cardiologist I've consulted. Highly recommended!", patient: "Rajesh K.", date: "1 week ago" }
        ],
        hospitalAffiliation: "Apollo Hospital, Delhi",
        symptomStats: { "Chest Pain": 342, "Hypertension": 215, "Palpitations": 180 },
        currentLocation: "Physical Clinic",
        academicLineage: { almaMater: "AIIMS Delhi", mentor: "Dr. Trehan", papers: 15, distinction: "Gold Medalist" },
        voiceIntro: true
    },
    {
        id: 2, name: "Dr. Meera Iyer", specialty: "Neurologist", experience: "12 Years", rating: 4.8,
        image: "https://randomuser.me/api/portraits/women/44.jpg", status: "In Session", color: "blue",
        fee: 600, response: "2 mins", bio: "Expert Neurologist specializing in Migraine and Epilepsy treatment.",
        patients: "12k+", education: "MBBS, MD (Neuro)",
        languages: ["English", "Hindi", "Tamil"], successRate: 94, totalReviews: 892,
        radar: { empathy: 90, clarity: 95, punctuality: 85, depth: 98 }, mood: "Turbo", honor: false,
        specializations: ["Migraine Specialist", "Epilepsy Treatment", "Stroke Management"],
        badges: ["Top Rated", "Patient Favorite", "Research Published"],
        vibeTags: ["Analytical Mind", "Methodical", "Direct & Clear"],
        nextSlots: ["Today 4:00 PM", "Today 6:30 PM", "Tomorrow 11:00 AM"],
        queuePosition: 3, waitTime: 12, aiMatch: 88,
        reviews: [
            { rating: 5, text: "Helped me manage my migraines effectively.", patient: "Priya S.", date: "3 days ago" }
        ],
        hospitalAffiliation: "NIMHANS, Bangalore",
        symptomStats: { "Migraine": 142, "Headache": 310, "Seizures": 85 },
        currentLocation: "Virtual Office",
        academicLineage: { almaMater: "NIMHANS", mentor: "Dr. S. Chandra", papers: 22, distinction: "Research Fellow" },
        voiceIntro: true
    },
    {
        id: 3, name: "Dr. Rohan Gupta", specialty: "Pediatrician", experience: "10 Years", rating: 5.0,
        image: "https://randomuser.me/api/portraits/men/45.jpg", status: "Available", color: "emerald",
        fee: 400, response: "Under 2 mins", bio: "Child specialist with expertise in vaccination and growth monitoring.",
        patients: "8k+", education: "MBBS, MD (Pediatrics)",
        languages: ["English", "Hindi"], successRate: 98, totalReviews: 654,
        radar: { empathy: 99, clarity: 88, punctuality: 95, depth: 90 }, mood: "Compassion", honor: true, honorScore: 98,
        specializations: ["Vaccination Expert", "Growth Monitoring", "Child Nutrition"],
        badges: ["Top Rated", "Quick Responder", "Patient Favorite"],
        vibeTags: ["Kid Friendly", "Cheerful", "Gentle Care"],
        nextSlots: ["Today 2:00 PM", "Today 4:30 PM", "Tomorrow 9:00 AM"],
        queuePosition: 0, waitTime: 0, aiMatch: 92,
        reviews: [
            { rating: 5, text: "Very caring and gentle with kids. Highly recommended!", patient: "Anjali M.", date: "1 day ago" }
        ],
        hospitalAffiliation: "Rainbow Children's Hospital",
        symptomStats: { "Fever": 450, "Cough": 320, "Rash": 150 },
        currentLocation: "Physical Clinic",
        academicLineage: { almaMater: "CMC Vellore", mentor: "Dr. K. Paul", papers: 8, distinction: "Best Resident" },
        voiceIntro: true
    },
    {
        id: 4, name: "Dr. Sana Khan", specialty: "Dermatologist", experience: "8 Years", rating: 4.7,
        image: "https://randomuser.me/api/portraits/women/65.jpg", status: "Offline", color: "violet",
        fee: 450, response: "N/A", bio: "Skin specialist focusing on acne treatment and anti-aging solutions.",
        patients: "6k+", education: "MBBS, MD (Dermatology)",
        languages: ["English", "Hindi", "Urdu"], successRate: 91, totalReviews: 543,
        specializations: ["Acne Treatment", "Anti-Aging", "Skin Allergies"],
        badges: ["Board Certified"],
        vibeTags: ["Skin Expert", "Aesthetic Vision", "Friendly"],
        nextSlots: ["Tomorrow 10:00 AM", "Tomorrow 2:00 PM", "Tomorrow 5:00 PM"],
        queuePosition: 0, waitTime: 0, aiMatch: 85,
        reviews: [
            { rating: 5, text: "My skin improved significantly after her treatment.", patient: "Neha R.", date: "5 days ago" }
        ],
        hospitalAffiliation: "Kaya Skin Clinic",
        symptomStats: { "Acne": 500, "Hair Loss": 210, "Pigmentation": 180 },
        currentLocation: "Home Office",
        academicLineage: { almaMater: "KEM Mumbai", mentor: "Dr. R. Shah", papers: 5, distinction: "Derma Gold" },
        voiceIntro: false
    },
    {
        id: 5, name: "Dr. Vikram Sethi", specialty: "Orthopedic", experience: "20 Years", rating: 4.9,
        image: "https://randomuser.me/api/portraits/men/52.jpg", status: "Available", color: "orange",
        fee: 700, response: "1 min", bio: "Senior Orthopedic Surgeon with expertise in joint replacement.",
        patients: "18k+", education: "MBBS, MS (Ortho)",
        languages: ["English", "Hindi", "Punjabi"], successRate: 97, totalReviews: 1456,
        radar: { empathy: 85, clarity: 98, punctuality: 92, depth: 99 }, mood: "Zen", honor: true, honorScore: 97,
        specializations: ["Joint Replacement", "Sports Injuries", "Spine Surgery"],
        badges: ["Top Rated", "15+ Years", "Board Certified"],
        vibeTags: ["Master Surgeon", "Straightforward", "Highly Experienced"],
        nextSlots: ["Today 3:00 PM", "Today 7:00 PM", "Tomorrow 8:00 AM"],
        queuePosition: 1, waitTime: 5, aiMatch: 94,
        reviews: [
            { rating: 5, text: "Excellent surgeon. My knee pain is completely gone!", patient: "Ramesh P.", date: "1 week ago" }
        ],
        hospitalAffiliation: "Max Super Speciality Hospital",
        symptomStats: { "Knee Pain": 350, "Back Pain": 400, "Fracture": 120 },
        currentLocation: "Physical Clinic",
        academicLineage: { almaMater: "PGI Chandigarh", mentor: "Dr. M. Singh", papers: 18, distinction: "Ortho Excellence" },
        voiceIntro: true
    },
    {
        id: 6, name: "Dr. Anjali Verma", specialty: "Psychiatrist", experience: "14 Years", rating: 4.6,
        image: "https://randomuser.me/api/portraits/women/33.jpg", status: "Available", color: "purple",
        fee: 550, response: "3 mins", bio: "Mental health expert specializing in anxiety and depression treatment.",
        patients: "10k+", education: "MBBS, MD (Psychiatry)",
        languages: ["English", "Hindi"], successRate: 93, totalReviews: 789,
        specializations: ["Anxiety Treatment", "Depression Management", "Stress Counseling"],
        badges: ["Patient Favorite", "Board Certified"],
        vibeTags: ["Empathetic", "Soul Healer", "Patient Listener"],
        nextSlots: ["Today 4:00 PM", "Today 6:00 PM", "Tomorrow 10:00 AM"],
        queuePosition: 2, waitTime: 8, aiMatch: 90,
        reviews: [
            { rating: 5, text: "Very understanding and helpful. Highly recommend!", patient: "Kavita S.", date: "4 days ago" }
        ]
    },
    {
        id: 7, name: "Dr. Sameer Deshpande", specialty: "Ent Specialist", experience: "11 Years", rating: 4.8,
        image: "https://randomuser.me/api/portraits/men/55.jpg", status: "Available", color: "cyan",
        fee: 400, response: "Under 1 min", bio: "ENT specialist with expertise in sinus and throat disorders.",
        patients: "9k+", education: "MBBS, MS (ENT)",
        languages: ["English", "Hindi", "Marathi"], successRate: 95, totalReviews: 678,
        specializations: ["Sinus Treatment", "Throat Disorders", "Hearing Problems"],
        badges: ["Quick Responder", "Top Rated"],
        vibeTags: ["Precision Expert", "Quick Diagnosis", "Modern Approach"],
        nextSlots: ["Today 2:30 PM", "Today 5:30 PM", "Tomorrow 9:30 AM"],
        queuePosition: 0, waitTime: 0, aiMatch: 87,
        reviews: [
            { rating: 5, text: "Solved my sinus problem completely. Great doctor!", patient: "Amit D.", date: "2 days ago" }
        ]
    },
    {
        id: 8, name: "Dr. Pooja Reddy", specialty: "Gynecologist", experience: "16 Years", rating: 4.9,
        image: "https://randomuser.me/api/portraits/women/12.jpg", status: "In Session", color: "pink",
        fee: 650, response: "4 mins", bio: "Women's health specialist with expertise in pregnancy care.",
        patients: "14k+", education: "MBBS, MD (Gynecology)",
        languages: ["English", "Hindi", "Telugu"], successRate: 96, totalReviews: 1123,
        specializations: ["Pregnancy Care", "PCOS Treatment", "Fertility Consultation"],
        badges: ["Top Rated", "15+ Years", "Patient Favorite"],
        vibeTags: ["Compassionate Care", "Motherly Touch", "Supportive"],
        nextSlots: ["Today 5:00 PM", "Today 7:30 PM", "Tomorrow 11:00 AM"],
        queuePosition: 4, waitTime: 15, aiMatch: 93,
        reviews: [
            { rating: 5, text: "Best gynecologist! Very caring and professional.", patient: "Lakshmi K.", date: "1 day ago" }
        ]
    },
    {
        id: 9, name: "Dr. Kabir Singh", specialty: "General Surgeon", experience: "18 Years", rating: 4.7,
        image: "https://randomuser.me/api/portraits/men/62.jpg", status: "Available", color: "slate",
        fee: 800, response: "1 min", bio: "Experienced surgeon specializing in laparoscopic procedures.",
        patients: "16k+", education: "MBBS, MS (Surgery)",
        languages: ["English", "Hindi"], successRate: 95, totalReviews: 987,
        specializations: ["Laparoscopic Surgery", "Hernia Repair", "Gallbladder Surgery"],
        badges: ["15+ Years", "Board Certified", "Top Rated"],
        vibeTags: ["Steady Hands", "Confident", "Brief & Precise"],
        nextSlots: ["Today 6:00 PM", "Tomorrow 9:00 AM", "Tomorrow 2:00 PM"],
        queuePosition: 1, waitTime: 6, aiMatch: 89,
        reviews: [
            { rating: 5, text: "Excellent surgeon with great expertise.", patient: "Suresh M.", date: "3 days ago" }
        ]
    },
    {
        id: 10, name: "Dr. Neha Malhotra", specialty: "Dietician", experience: "7 Years", rating: 4.5,
        image: "https://randomuser.me/api/portraits/women/15.jpg", status: "Available", color: "teal",
        fee: 300, response: "Under 3 mins", bio: "Nutrition expert specializing in weight management and diabetes diet.",
        patients: "5k+", education: "MSc (Nutrition)",
        languages: ["English", "Hindi"], successRate: 92, totalReviews: 432,
        specializations: ["Weight Management", "Diabetes Diet", "Sports Nutrition"],
        badges: ["Patient Favorite"],
        vibeTags: ["Motivator", "Result Oriented", "Holistic Approach"],
        nextSlots: ["Today 3:00 PM", "Today 5:00 PM", "Tomorrow 10:00 AM"],
        queuePosition: 0, waitTime: 0, aiMatch: 86,
        reviews: [
            { rating: 5, text: "Lost 10kg with her diet plan. Amazing results!", patient: "Pooja T.", date: "1 week ago" }
        ]
    },
    {
        id: 11, name: "Dr. Rajesh Kumar", specialty: "Cardiologist", experience: "18 Years", rating: 4.9,
        image: "/src/assets/images/doctors/dr1.png", status: "Available", color: "rose",
        fee: 750, response: "Under 1 min", bio: "Distinguished Cardiologist specialized in preventative care.",
        patients: "20k+", education: "MBBS, MD, DM (Cardio)",
        languages: ["Hindi", "English"], successRate: 98, totalReviews: 2150,
        specializations: ["Preventative Cardiology", "Hypertension"],
        badges: ["Elite Expert", "Top Rated"],
        vibeTags: ["Calm", "Precise"],
        nextSlots: ["Today 4:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 98
    },
    {
        id: 12, name: "Dr. Shalini Singh", specialty: "Neurologist", experience: "14 Years", rating: 4.8,
        image: "/src/assets/images/doctors/dr2.png", status: "In Session", color: "blue",
        fee: 800, response: "5 mins", bio: "Specialist in neuro-rehabilitation and chronic headache management.",
        patients: "12k+", education: "MBBS, MD (Neuro)",
        languages: ["Hindi", "English", "Punjabi"], successRate: 95, totalReviews: 1240,
        specializations: ["Neuro-Rehabilitation", "Headache Clinic"],
        badges: ["Board Certified"],
        vibeTags: ["Empathetic", "Analytical"],
        nextSlots: ["Today 6:00 PM"], queuePosition: 2, waitTime: 10, aiMatch: 92
    },
    {
        id: 13, name: "Dr. Amit Verma", specialty: "Orthopedic", experience: "16 Years", rating: 4.7,
        image: "/src/assets/images/doctors/dr3.png", status: "Available", color: "orange",
        fee: 600, response: "2 mins", bio: "Expert in sports medicine and joint replacements.",
        patients: "15k+", education: "MBBS, MS (Ortho)",
        languages: ["Hindi", "English"], successRate: 94, totalReviews: 1800,
        specializations: ["Sports Medicine", "Joint Replacement"],
        badges: ["Surgeon of Merit"],
        vibeTags: ["Confident", "Active"],
        nextSlots: ["Tomorrow 10:00 AM"], queuePosition: 0, waitTime: 0, aiMatch: 89
    },
    {
        id: 14, name: "Dr. Priya Sharma", specialty: "Gynecologist", experience: "12 Years", rating: 4.9,
        image: "/src/assets/images/doctors/dr4.png", status: "Available", color: "pink",
        fee: 550, response: "Under 1 min", bio: "Dedicated to maternal wellness and high-risk pregnancy care.",
        patients: "10k+", education: "MBBS, MD (Gynae)",
        languages: ["Hindi", "English"], successRate: 97, totalReviews: 1400,
        specializations: ["High-Risk Pregnancy", "Maternal Wellness"],
        badges: ["Patient's Choice"],
        vibeTags: ["Gentle", "Caring"],
        nextSlots: ["Today 3:30 PM"], queuePosition: 0, waitTime: 0, aiMatch: 95
    },
    {
        id: 15, name: "Dr. Vikram Aditya", specialty: "Dermatologist", experience: "10 Years", rating: 4.6,
        image: "/src/assets/images/doctors/dr5.png", status: "Offline", color: "violet",
        fee: 500, response: "N/A", bio: "Expert in aesthetic dermatology and laser treatments.",
        patients: "8k+", education: "MBBS, MD (Derm)",
        languages: ["Hindi", "English"], successRate: 92, totalReviews: 900,
        specializations: ["Laser Treatment", "Aesthetics"],
        badges: ["Skin Specialist"],
        vibeTags: ["Detailed", "Modern"],
        nextSlots: ["Monday 9:00 AM"], queuePosition: 0, waitTime: 0, aiMatch: 87
    },
    {
        id: 16, name: "Dr. Sneha Kapoor", specialty: "Pediatrician", experience: "9 Years", rating: 5.0,
        image: "/src/assets/images/doctors/dr6.png", status: "Available", color: "emerald",
        fee: 450, response: "1 min", bio: "Passionate about child nutrition and developmental health.",
        patients: "7k+", education: "MBBS, DCH",
        languages: ["Hindi", "English"], successRate: 99, totalReviews: 1100,
        specializations: ["Child Nutrition", "Developmental Health"],
        badges: ["Kid-Friendly"],
        vibeTags: ["Cheerful", "Patient"],
        nextSlots: ["Today 5:00 PM"], queuePosition: 1, waitTime: 3, aiMatch: 96
    },
    {
        id: 17, name: "Dr. Anil Deshmukh", specialty: "Psychiatrist", experience: "22 Years", rating: 4.8,
        image: "/src/assets/images/doctors/dr7.png", status: "In Session", color: "purple",
        fee: 900, response: "10 mins", bio: "Senior consultant for mental health and cognitive therapy.",
        patients: "18k+", education: "MBBS, MD (Psych)",
        languages: ["Hindi", "English", "Marathi"], successRate: 96, totalReviews: 2500,
        specializations: ["Cognitive Therapy", "Stress Management"],
        badges: ["Veteran Clinician"],
        vibeTags: ["Soul Healer", "Wise"],
        nextSlots: ["Tomorrow 11:00 AM"], queuePosition: 3, waitTime: 20, aiMatch: 94
    },
    {
        id: 18, name: "Dr. Megha Gupta", specialty: "Ent Specialist", experience: "11 Years", rating: 4.7,
        image: "/src/assets/images/doctors/dr8.png", status: "Available", color: "cyan",
        fee: 400, response: "2 mins", bio: "Specialized in micro-ear surgery and allergy management.",
        patients: "9k+", education: "MBBS, MS (ENT)",
        languages: ["Hindi", "English"], successRate: 93, totalReviews: 850,
        specializations: ["Micro-Ear Surgery", "Allergy Management"],
        badges: ["Precision Expert"],
        vibeTags: ["Focused", "Direct"],
        nextSlots: ["Today 4:45 PM"], queuePosition: 0, waitTime: 0, aiMatch: 88
    },
    {
        id: 19, name: "Dr. Karan Mehra", specialty: "General Surgeon", experience: "15 Years", rating: 4.7,
        image: "/src/assets/images/doctors/dr9.png", status: "Available", color: "slate",
        fee: 700, response: "Under 1 min", bio: "Skilled in laparoscopic and minimally invasive surgeries.",
        patients: "14k+", education: "MBBS, MS (Surgery)",
        languages: ["Hindi", "English"], successRate: 95, totalReviews: 1200,
        specializations: ["Laparoscopic Surgery", "Minimally Invasive"],
        badges: ["Surgeon of Excellence"],
        vibeTags: ["Steady Hands", "Brief"],
        nextSlots: ["Today 7:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 91
    },
    {
        id: 20, name: "Dr. Ananya Roy", specialty: "Dietician", experience: "8 Years", rating: 4.6,
        image: "/src/assets/images/doctors/dr10.png", status: "Available", color: "teal",
        fee: 350, response: "5 mins", bio: "Expert in clinical nutrition and metabolic health plans.",
        patients: "6k+", education: "MSc Food & Nutrition",
        languages: ["Hindi", "English", "Bengali"], successRate: 91, totalReviews: 700,
        specializations: ["Clinical Nutrition", "Metabolic Health"],
        badges: ["Lifestyle Coach"],
        vibeTags: ["Motivator", "Kind"],
        nextSlots: ["Today 2:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 85
    },
    {
        id: 21, name: "Dr. Sunil Gavaskar", specialty: "Cardiologist", experience: "25 Years", rating: 5.0,
        image: "/src/assets/images/doctors/dr11.png", status: "Available", color: "rose",
        fee: 1000, response: "Immediate", bio: "Legendary heart specialist with global recognition.",
        patients: "30k+", education: "MBBS, FACC (USA)",
        languages: ["Hindi", "English"], successRate: 99, totalReviews: 5000,
        specializations: ["Advanced Heart Failure", "Global Health"],
        badges: ["National Legend"],
        vibeTags: ["Calm Presence", "Masterly"],
        nextSlots: ["Today 8:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 99
    },
    {
        id: 22, name: "Dr. Rahul Dravid", specialty: "Neurologist", experience: "20 Years", rating: 4.9,
        image: "/src/assets/images/doctors/1.jpg", status: "In Session", color: "blue",
        fee: 850, response: "8 mins", bio: "The wall of neurology, unmatched patience and analytical depth.",
        patients: "15k+", education: "MBBS, MD (Neuro)",
        languages: ["Hindi", "English", "Kannada"], successRate: 97, totalReviews: 2200,
        specializations: ["Stroke Management", "Dementia Care"],
        badges: ["Methodical Mind"],
        vibeTags: ["Patient", "Stoic"],
        nextSlots: ["Tomorrow 9:00 AM"], queuePosition: 1, waitTime: 15, aiMatch: 93
    },
    {
        id: 23, name: "Dr. Sachin Tendulkar", specialty: "Pediatrician", experience: "24 Years", rating: 5.0,
        image: "/src/assets/images/doctors/2.jpg", status: "Available", color: "emerald",
        fee: 950, response: "Under 1 min", bio: "Master blaster of pediatric care, loved by all children.",
        patients: "25k+", education: "MBBS, MD (Peds)",
        languages: ["Hindi", "English", "Marathi"], successRate: 99, totalReviews: 4500,
        specializations: ["Neonatal Care", "Adolescent Health"],
        badges: ["Beloved Doctor"],
        vibeTags: ["Kid-Friendly", "Iconic"],
        nextSlots: ["Today 4:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 97
    },
    {
        id: 24, name: "Dr. Mithali Raj", specialty: "Gynecologist", experience: "15 Years", rating: 4.8,
        image: "/src/assets/images/doctors/3.jpg", status: "Available", color: "pink",
        fee: 650, response: "2 mins", bio: "Leading figure in women's sports medicine and hormonal health.",
        patients: "12k+", education: "MBBS, MS (OBG)",
        languages: ["Hindi", "English", "Telugu"], successRate: 96, totalReviews: 1600,
        specializations: ["PCOS Management", "Sports Gynecology"],
        badges: ["Empowerment Leader"],
        vibeTags: ["Inspirational", "Strong"],
        nextSlots: ["Today 5:30 PM"], queuePosition: 1, waitTime: 5, aiMatch: 90
    },
    {
        id: 25, name: "Dr. Virat Kohli", specialty: "Orthopedic", experience: "12 Years", rating: 4.7,
        image: "/src/assets/images/doctors/4.jpg", status: "Available", color: "orange",
        fee: 750, response: "1 min", bio: "Dynamic specialist in fitness, bone health and aggressive recovery.",
        patients: "11k+", education: "MBBS, MS (Ortho)",
        languages: ["Hindi", "English", "Punjabi"], successRate: 94, totalReviews: 1300,
        specializations: ["Bone Density", "Aggressive Rehab"],
        badges: ["Fitness Icon"],
        vibeTags: ["Energetic", "Driven"],
        nextSlots: ["Today 6:30 PM"], queuePosition: 0, waitTime: 0, aiMatch: 88
    },
    {
        id: 26, name: "Dr. Smriti Mandhana", specialty: "Dermatologist", experience: "9 Years", rating: 4.6,
        image: "/src/assets/images/doctors/5.jpg", status: "Available", color: "violet",
        fee: 550, response: "3 mins", bio: "Expert in sun damage recovery and skin radiance.",
        patients: "7k+", education: "MBBS, DVD",
        languages: ["Hindi", "English"], successRate: 93, totalReviews: 1000,
        specializations: ["Sun Damage", "Glow Therapy"],
        badges: ["Skin Radiant"],
        vibeTags: ["Graceful", "Effective"],
        nextSlots: ["Tomorrow 10:30 AM"], queuePosition: 0, waitTime: 0, aiMatch: 86
    },
    {
        id: 27, name: "Dr. MS Dhoni", specialty: "Psychiatrist", experience: "21 Years", rating: 5.0,
        image: "/src/assets/images/doctors/6.jpg", status: "Available", color: "purple",
        fee: 1000, response: "Immediate", bio: "Captain cool of mental wellness, specialist in pressure handling.",
        patients: "20k+", education: "MBBS, MD (Psych)",
        languages: ["Hindi", "English"], successRate: 98, totalReviews: 3000,
        specializations: ["Pressure Management", "Team Dynamics"],
        badges: ["Calm Guru"],
        vibeTags: ["Unshakable", "Strategic"],
        nextSlots: ["Today 9:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 98
    },
    {
        id: 28, name: "Dr. PV Sindhu", specialty: "Dietician", experience: "10 Years", rating: 4.8,
        image: "/src/assets/images/doctors/7.jpg", status: "Available", color: "teal",
        fee: 500, response: "2 mins", bio: "Champion of athletic nutrition and balanced performance diets.",
        patients: "8k+", education: "MSc (Sports Nutrition)",
        languages: ["Hindi", "English", "Telugu"], successRate: 95, totalReviews: 1100,
        specializations: ["Performance Diet", "Endurance Fuel"],
        badges: ["Champion Nutritionist"],
        vibeTags: ["Disciplined", "Agile"],
        nextSlots: ["Today 3:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 92
    },
    {
        id: 29, name: "Dr. Neeraj Chopra", specialty: "Orthopedic", experience: "11 Years", rating: 4.9,
        image: "/src/assets/images/doctors/8.jpg", status: "Available", color: "orange",
        fee: 600, response: "1 min", bio: "Golden touch in physical medicine and shoulder specialty.",
        patients: "9k+", education: "MBBS, MS (Ortho)",
        languages: ["Hindi", "English"], successRate: 97, totalReviews: 1200,
        specializations: ["Shoulder Specialist", "Javelin Bio-mechanics"],
        badges: ["Golden Specialist"],
        vibeTags: ["Precise", "Humble"],
        nextSlots: ["Tomorrow 8:00 AM"], queuePosition: 0, waitTime: 0, aiMatch: 95
    },
    {
        id: 30, name: "Dr. Sania Mirza", specialty: "Ent Specialist", experience: "14 Years", rating: 4.7,
        image: "/src/assets/images/doctors/9.jpg", status: "In Session", color: "cyan",
        fee: 550, response: "4 mins", bio: "Expert in sinus and vocal health for high-performance individuals.",
        patients: "10k+", education: "MBBS, MS (ENT)",
        languages: ["Hindi", "English", "Urdu"], successRate: 94, totalReviews: 1400,
        specializations: ["Vocal Health", "Sinus Surgery"],
        badges: ["Ace Practitioner"],
        vibeTags: ["Stylish", "Effective"],
        nextSlots: ["Today 5:00 PM"], queuePosition: 2, waitTime: 8, aiMatch: 89
    },
    {
        id: 31, name: "Dr. Mary Kom", specialty: "General Surgeon", experience: "22 Years", rating: 4.9,
        image: "/src/assets/images/doctors/10.jpg", status: "Available", color: "slate",
        fee: 850, response: "Under 1 min", bio: "Unbeatable precision in abdominal and trauma surgeries.",
        patients: "18k+", education: "MBBS, MS (Surgery)",
        languages: ["English", "Manipuri", "Hindi"], successRate: 98, totalReviews: 2000,
        specializations: ["Trauma Surgery", "Abdominal Expert"],
        badges: ["Magnificent Surgeon"],
        vibeTags: ["Unyielding", "Skilled"],
        nextSlots: ["Today 6:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 96
    },
    {
        id: 32, name: "Dr. Hima Das", specialty: "Dietician", experience: "7 Years", rating: 4.5,
        image: "/src/assets/images/doctors/11.jpg", status: "Available", color: "teal",
        fee: 300, response: "Under 2 mins", bio: "Fast-track weight loss and metabolism activation expert.",
        patients: "5k+", education: "BSc, MSc (Nutri)",
        languages: ["Assamese", "Hindi", "English"], successRate: 92, totalReviews: 600,
        specializations: ["Metabolism Boost", "Express Weight Loss"],
        badges: ["Sprint Specialist"],
        vibeTags: ["Quick", "Energetic"],
        nextSlots: ["Today 11:00 AM"], queuePosition: 0, waitTime: 0, aiMatch: 87
    },
    {
        id: 33, name: "Dr. Saina Nehwal", specialty: "Ent Specialist", experience: "12 Years", rating: 4.6,
        image: "/src/assets/images/doctors/12.jpg", status: "Available", color: "cyan",
        fee: 450, response: "5 mins", bio: "Specialist in ear equilibrium and balance disorders.",
        patients: "8k+", education: "MBBS, DLO",
        languages: ["Hindi", "English", "Telugu"], successRate: 93, totalReviews: 750,
        specializations: ["Balance Disorders", "Hearing Loss"],
        badges: ["Ace ENT"],
        vibeTags: ["Focused", "Dynamic"],
        nextSlots: ["Tomorrow 12:00 PM"], queuePosition: 1, waitTime: 5, aiMatch: 88
    },
    {
        id: 34, name: "Dr. Viswanathan Anand", specialty: "Neurologist", experience: "28 Years", rating: 5.0,
        image: "/src/assets/images/doctors/13.jpg", status: "Available", color: "blue",
        fee: 1200, response: "Immediate", bio: "Grandmaster of neuro-cognitive science and memory enhancement.",
        patients: "25k+", education: "MBBS, MD, PhD (Neuro)",
        languages: ["Tamil", "Hindi", "English", "Spanish"], successRate: 99, totalReviews: 4000,
        specializations: ["Cognitive Science", "Memory Systems"],
        badges: ["Global Grandmaster"],
        vibeTags: ["Brilliant", "Strategic"],
        nextSlots: ["Today 10:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 100
    },
    {
        id: 35, name: "Dr. Pankaj Advani", specialty: "Dermatologist", experience: "11 Years", rating: 4.7,
        image: "/src/assets/images/doctors/14.jpg", status: "Available", color: "violet",
        fee: 600, response: "2 mins", bio: "Focus on cue-perfect skin treatments and smooth texture therapy.",
        patients: "9k+", education: "MBBS, MD (Skin)",
        languages: ["Hindi", "English"], successRate: 94, totalReviews: 1100,
        specializations: ["Texture Therapy", "Cue-Perfect Skin"],
        badges: ["Smooth Specialist"],
        vibeTags: ["Polished", "Precise"],
        nextSlots: ["Today 4:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 90
    },
    {
        id: 36, name: "Dr. Abhinav Bindra", specialty: "Psychiatrist", experience: "16 Years", rating: 4.9,
        image: "/src/assets/images/doctors/15.jpg", status: "Available", color: "purple",
        fee: 800, response: "Under 1 min", bio: "Extreme focus and meditation specialist for mental clarity.",
        patients: "12k+", education: "MBBS, MD (Psych)",
        languages: ["Hindi", "English"], successRate: 97, totalReviews: 1800,
        specializations: ["Mental Clarity", "Focus Training"],
        badges: ["Gold Standard"],
        vibeTags: ["Quietly Confident", "Elite"],
        nextSlots: ["Today 5:00 PM"], queuePosition: 0, waitTime: 0, aiMatch: 96
    },
    {
        id: 37, name: "Dr. Sourav Ganguly", specialty: "Cardiologist", experience: "22 Years", rating: 4.8,
        image: "/src/assets/images/doctors/16.png", status: "Available", color: "rose",
        fee: 900, response: "1 min", bio: "Dada of cardiac care, specialized in courageous and heart-centered healing.",
        patients: "20k+", education: "MBBS, MD, DM (Cardio)",
        languages: ["Bengali", "Hindi", "English"], successRate: 96, totalReviews: 2800,
        specializations: ["Coronary Care", "Leadership Medicine"],
        badges: ["The Prince Master"],
        vibeTags: ["Bold", "Authoritative"],
        nextSlots: ["Today 7:30 PM"], queuePosition: 0, waitTime: 0, aiMatch: 94
    },
];

const DOMAINS = [
    { id: 'all', name: 'All Specialties', icon: <BsPersonFill /> },
    { id: 'Cardiologist', name: 'Cardiology', icon: '❤️' },
    { id: 'Neurologist', name: 'Neurology', icon: '🧠' },
    { id: 'Pediatrician', name: 'Pediatrics', icon: '👶' },
    { id: 'Dermatologist', name: 'Skin Care', icon: '✨' },
    { id: 'Orthopedic', name: 'Bones', icon: '🦴' },
    { id: 'Psychiatrist', name: 'Mental Health', icon: '🧘' },
];


const bodyParts = {
    'head': { name: 'Head/Brain', specialty: 'Neurologist', icon: '🧠', color: 'blue' },
    'chest': { name: 'Chest/Heart', specialty: 'Cardiologist', icon: '❤️', color: 'rose' },
    'stomach': { name: 'Stomach/Guts', specialty: 'General Surgeon', icon: '🩺', color: 'slate' },
    'skin': { name: 'Skin/External', specialty: 'Dermatologist', icon: '✨', color: 'violet' },
    'bones': { name: 'Bones/Joints', specialty: 'Orthopedic', icon: '🦴', color: 'orange' },
    'pelvic': { name: 'Women\'s Health', specialty: 'Gynecologist', icon: '♀️', color: 'pink' }
};

const symptomDatabase = {
    'chest pain': { specialty: 'Cardiologist', urgency: 'URGENT', keywords: ['heart', 'chest', 'cardiac', 'angina', 'pressure'] },
    'headache': { specialty: 'Neurologist', urgency: 'ROUTINE', keywords: ['head', 'migraine', 'pain', 'dizzy'] },
    'stomach ache': { specialty: 'General Surgeon', urgency: 'ROUTINE', keywords: ['stomach', 'belly', 'gut', 'pain', 'digestion'] },
    'skin rash': { specialty: 'Dermatologist', urgency: 'ROUTINE', keywords: ['skin', 'rash', 'itch', 'redness', 'acne'] },
    'back pain': { specialty: 'Orthopedic', urgency: 'ROUTINE', keywords: ['back', 'spine', 'joint', 'bone', 'muscle'] }
};

const healthTips = [
    "💧 Stay hydrated - Drink at least 8 glasses of water daily",
    "🧘 Practice deep breathing to reduce stress and anxiety",
    "🥗 Maintain a balanced diet with fruits and vegetables",
    "😴 Get 7-8 hours of quality sleep every night",
    "🚶 Take a 30-minute walk daily for better health",
    "📱 Limit screen time before bed for better sleep",
    "🧼 Wash hands frequently to prevent infections",
    "☀️ Get some sunlight for Vitamin D",
    "🧠 Practice mindfulness and meditation",
    "💪 Regular exercise boosts immunity"
];


const TeleConsultAI = () => {
    const navigate = useNavigate();
    const { user, role, token } = useContext(authContext);
    const { socket } = useSocket();

    const { data: dbDoctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDoc, setSelectedDoc] = useState(null);

    // Merge DB Doctors with Static Metadata for "Neural" aesthetics
    const [doctors, setDoctors] = useState(TELE_DOCTORS);

    useEffect(() => {
        if (dbDoctors && dbDoctors.length > 0) {
            const mergedFromDb = dbDoctors.map(dbDoc => {
                // Find matching static doc for metadata (radar, vibeTags, etc)
                const staticMatch = TELE_DOCTORS.find(s => s.specialty === dbDoc.specialty) || TELE_DOCTORS[0];
                
                return {
                    ...staticMatch,
                    id: dbDoc._id,
                    name: dbDoc.name,
                    specialty: dbDoc.specialization || dbDoc.specialty || staticMatch.specialty,
                    experience: `${dbDoc.experiences?.[0]?.startingDate ? (new Date().getFullYear() - new Date(dbDoc.experiences[0].startingDate).getFullYear()) : 10} Years`,
                    rating: dbDoc.averageRating || 4.8,
                    image: dbDoc.photo || staticMatch.image,
                    fee: dbDoc.teleConsultPrice || dbDoc.ticketPrice || staticMatch.fee,
                    bio: dbDoc.bio || staticMatch.bio,
                    patients: `${dbDoc.totalPatients || '10'}k+`,
                    education: dbDoc.qualifications?.[0]?.degree || staticMatch.education,
                    status: dbDoc.isTeleConsultActive ? "Available" : "Offline",
                    reviews: dbDoc.reviews || staticMatch.reviews,
                    totalReviews: dbDoc.totalRating || staticMatch.totalReviews,
                    isReal: true // Flag to distinguish live from static if needed
                };
            });
            // Merge: Live doctors FIRST, then all existing static ones
            setDoctors([...mergedFromDb, ...TELE_DOCTORS]);
        } else {
            // Fallback: Just show the rich static ones if DB is empty
            setDoctors(TELE_DOCTORS);
        }
    }, [dbDoctors]);

    const [isPaying, setIsPaying] = useState(false);
    const [paymentStep, setPaymentStep] = useState(1); // 1: Info, 2: Processing, 3: Success
    const [emergencyStage, setEmergencyStage] = useState('idle'); // idle, triage, locating, connected
    const [triageStep, setTriageStep] = useState(0);
    const [viewingDocProfile, setViewingDocProfile] = useState(null);
    const [activeDiagnosisDocId, setActiveDiagnosisDocId] = useState(null); // Phase 3 State
    const [callActive, setCallActive] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [transcriptions, setTranscriptions] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'doc', text: "Hello! How can I help you today?" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [activeSidebarTab, setActiveSidebarTab] = useState('vitals');
    const [connectionQuality, setConnectionQuality] = useState('excellent'); // excellent, good, poor
    const [showComparison, setShowComparison] = useState(false);

    // Phase 2 Ultra-Premium States
    const [showVitalsSync, setShowVitalsSync] = useState(false);
    const [syncProgress, setSyncProgress] = useState(0);
    const [showHealthPodEntrance, setShowHealthPodEntrance] = useState(false);
    const [healthVitals, setHealthVitals] = useState({
        heartRate: 72,
        spO2: 98,
        bloodPressure: '120/80',
        bodyTemp: '98.6°F',
        stressLevel: 'Normal'
    });
    const [triageProgress, setTriageProgress] = useState(0);
    const [geoProgress, setGeoProgress] = useState(0);
    const [language, setLanguage] = useState('English'); // English, Hindi, Urdu
    const [symptoms, setSymptoms] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState(null); // Unified name
    const [consultStage, setConsultStage] = useState('idle'); // idle, triage, syncing

    const [consultTriageStep, setConsultTriageStep] = useState(0);
    const [isBioScanning, setIsBioScanning] = useState(false);
    const [bioScanProgress, setBioScanProgress] = useState(0);
    const [showAIExplainer, setShowAIExplainer] = useState(null);
    const [laserPosition, setLaserPosition] = useState({ x: 30, y: 40 });
    const [healthScore, setHealthScore] = useState(0);
    const [healthPodTimer, setHealthPodTimer] = useState(10);
    const [showHealthPod, setShowHealthPod] = useState(false);
    const [facePoints, setFacePoints] = useState([]);
    const [insightStream, setInsightStream] = useState([]);
    const [showCelebration, setShowCelebration] = useState(false);

    // New Enhanced Features State
    const [compareMode, setCompareMode] = useState(false);
    const [compareDoctors, setCompareDoctors] = useState([]);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [minRating, setMinRating] = useState(0);
    const [minExperience, setMinExperience] = useState(0);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [genderPreference, setGenderPreference] = useState('any');
    const [availabilityFilter, setAvailabilityFilter] = useState('all'); // all, now, today, week
    const [viewingSlots, setViewingSlots] = useState(null);
    const [sortBy, setSortBy] = useState('rating'); // rating, fee, experience, availability

    // Phase 2: Neural Voice State
    const [activeVoiceBio, setActiveVoiceBio] = useState(null);

    // Innovative Features State
    const [showSymptomAnalyzer, setShowSymptomAnalyzer] = useState(false);
    const [symptomInput, setSymptomInput] = useState('');
    const [symptomAnalysis, setSymptomAnalysis] = useState(null);
    const [analyzingSymptoms, setAnalyzingSymptoms] = useState(false);
    const [showWaitingRoom, setShowWaitingRoom] = useState(false);
    const [waitingRoomData, setWaitingRoomData] = useState(null);
    const [queueTimer, setQueueTimer] = useState(0);
    const [healthTipIndex, setHealthTipIndex] = useState(0);
    const [showFlashBooking, setShowFlashBooking] = useState(false);
    const [flashSlot, setFlashSlot] = useState(null);
    const [flashTimer, setFlashTimer] = useState(60);
    const [showHealthPassport, setShowHealthPassport] = useState(false);
    const [healthPassportData, setHealthPassportData] = useState({
        allergies: [],
        medications: [],
        conditions: [],
        vaccinations: [],
        labReports: [],
        familyHistory: ''
    });
    const [preConsultationForm, setPreConsultationForm] = useState({
        chiefComplaint: '',
        duration: '',
        severity: '',
        previousTreatments: '',
        currentMedications: ''
    });

    // Phase 3: Hyper-Futuristic States
    const [aiScribeContent, setAiScribeContent] = useState([]);
    const [isUnlockingReports, setIsUnlockingReports] = useState(false);
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [tickerIndex, setTickerIndex] = useState(0);
    const [showNeuralRelay, setShowNeuralRelay] = useState(false);
    const [isHologramActive, setIsHologramActive] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Phase 4: Cinematic States
    const [showNeuralGateway, setShowNeuralGateway] = useState(false);
    const [gatewayStep, setGatewayStep] = useState(0);
    const [showConcierge, setShowConcierge] = useState(false);
    const [conciergeMsg, setConciergeMsg] = useState("");
    const [showRadar, setShowRadar] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);

    // Phase 5: Sentient & Predictive States
    const [liveWaitTimes, setLiveWaitTimes] = useState({});
    const [showHoloPrescription, setShowHoloPrescription] = useState(false);
    const [focusSpecialty, setFocusSpecialty] = useState(null);
    const [biometricWeb, setBiometricWeb] = useState({ stress: 45, mood: 'Stable', focus: 88 });
    const [showAutoHighlight, setShowAutoHighlight] = useState(false);

    // Phase 5 V2: Elite V2 States
    const [mascotMessage, setMascotMessage] = useState("Namaste! I'm Sanjeevani, your AI health saathi. I'll be guiding you through your session.");
    const [isVoiceBridgeActive, setIsVoiceBridgeActive] = useState(false);
    const [laserHotspot, setLaserHotspot] = useState(null);
    const [vaultUnlocked, setVaultUnlocked] = useState(false);
    const [showVaultModal, setShowVaultModal] = useState(false);
    const [isDroneActive, setIsDroneActive] = useState(false);

    // Call timer
    useEffect(() => {
        let timer;
        if (callActive) {
            timer = setInterval(() => {
                setCallDuration(prev => prev + 1);
                // Simulate dynamic connection quality
                const qualities = ['excellent', 'good', 'excellent', 'excellent'];
                setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)]);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [callActive]);

    // Triage Progress Animation
    useEffect(() => {
        if (emergencyStage === 'triage') {
            setTriageProgress(((triageStep + 1) / 3) * 100);
        }
    }, [triageStep, emergencyStage]);

    // Geo-Dispatch Progress Animation
    useEffect(() => {
        if (emergencyStage === 'locating') {
            setGeoProgress(0);
            const interval = setInterval(() => {
                setGeoProgress(prev => {
                    if (prev >= 100) return 100;
                    return prev + 2;
                });
            }, 60);
            return () => clearInterval(interval);
        }
    }, [emergencyStage]);

    // Neural Sync Progress Animation
    useEffect(() => {
        if (consultStage === 'syncing') {
            setSyncProgress(0);
            const interval = setInterval(() => {
                setSyncProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [consultStage]);

    // Auto-proceed from Syncing to Health Pod
    useEffect(() => {
        if (syncProgress === 100 && consultStage === 'syncing') {
            setTimeout(() => {
                setConsultStage('idle');
                setShowHealthPod(true);
                // Animate Health Score
                let score = 0;
                const scoreInterval = setInterval(() => {
                    score += 1;
                    setHealthScore(score);
                    if (score >= 88) clearInterval(scoreInterval);
                }, 30);

                // Countdown for Pod
                const timerInterval = setInterval(() => {
                    setHealthPodTimer(prev => {
                        if (prev <= 1) {
                            clearInterval(timerInterval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => {
                    clearInterval(scoreInterval);
                    clearInterval(timerInterval);
                };
            }, 1000);
        }
    }, [syncProgress, consultStage]);

    // Phase 3: Clinical Pulse Ticker Logic
    useEffect(() => {
        const tickerData = [
            "Dr. Sharma just completed a Cardiac Sync in Delhi",
            "Emergency Neural-Relay active in Mumbai Hub",
            "98.4% Match success for Pediatrics in Bangalore",
            "1,240+ Doctors live on Sehaat Saathi Pulse",
            "Quantum-Vault secured for 15,000+ reports today"
        ];
        const interval = setInterval(() => {
            setTickerIndex(prev => (prev + 1) % tickerData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Phase 3: AI Scribe Real-time Logic
    useEffect(() => {
        if (callActive && transcriptions.length > 0) {
            const lastTranscription = transcriptions[transcriptions.length - 1];
            // Simulate AI extraction of key tokens
            if (lastTranscription.length > 20) {
                const keywords = ["diagnosis", "treatment", "pain", "history", "vitals"];
                const matched = keywords.filter(k => lastTranscription.toLowerCase().includes(k));
                if (matched.length > 0) {
                    setAiScribeContent(prev => [
                        ...prev.slice(-4),
                        {
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            tag: matched[0].toUpperCase(),
                            detail: lastTranscription.substring(0, 40) + "..."
                        }
                    ]);
                }
            }
        }
    }, [transcriptions, callActive]);

    useEffect(() => {
        if (connectionQuality === 'poor') {
            setShowNeuralRelay(true);
            setTimeout(() => setShowNeuralRelay(false), 5000);
        }
    }, [connectionQuality]);

    // Phase 3: Parallax Mouse Tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    // Proceed from Health Pod to Active Call
    useEffect(() => {
        if (showHealthPod && healthPodTimer === 0) {
            setTimeout(() => {
                setShowHealthPod(false);
                setCallActive(true);
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 3000);
            }, 1000);
        }
    }, [showHealthPod, healthPodTimer]);

    // Generate Face Points for Bio-Scan
    // Phase 4: Neural Gateway Intro Sequence
    useEffect(() => {
        // Simulation: check if user has visited this session
        const hasVisited = sessionStorage.getItem('sehaat_saathi_gateway');
        if (!hasVisited) {
            setShowNeuralGateway(true);
            const sequence = [
                { s: 1, d: 1500 }, // Initializing
                { s: 2, d: 3000 }, // Scanning Biometrics
                { s: 3, d: 4500 }, // Establishing Neural Link
                { s: 4, d: 6000 }  // Authorization Complete
            ];
            sequence.forEach(step => {
                setTimeout(() => setGatewayStep(step.s), step.d);
            });
            setTimeout(() => {
                setShowNeuralGateway(false);
                sessionStorage.setItem('sehaat_saathi_gateway', 'true');
                // Trigger Concierge after gateway
                setTimeout(() => {
                    setShowConcierge(true);
                    setConciergeMsg("Welcome, citizen. I am your Neural Health Concierge. I've optimized the hub for your profile.");
                }, 1000);
            }, 7500);
        } else {
            setIsReturningUser(true);
            // Quick greeting for returning users
            setTimeout(() => {
                setShowConcierge(true);
                setConciergeMsg("Welcome back! Your Quantum Fast-Pass is active. Ready to connect?");
            }, 1000);
        }
    }, []);

    // Phase 5: AI "Neural-Predict" Wait-Time Decay
    useEffect(() => {
        const initialTimes = {};
        TELE_DOCTORS.forEach(doc => {
            initialTimes[doc.id] = parseInt(doc.waitTime) * 60;
        });
        setLiveWaitTimes(initialTimes);

        const timer = setInterval(() => {
            setLiveWaitTimes(prev => {
                const next = { ...prev };
                Object.keys(next).forEach(id => {
                    if (next[id] > 0) next[id] -= 1;
                });
                return next;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Phase 5: Sentient Body-Map Sync
    useEffect(() => {
        if (selectedBodyPart) {
            const specialty = bodyParts[selectedBodyPart].specialty;
            setFocusSpecialty(specialty);
            setShowAutoHighlight(true);
            setTimeout(() => setShowAutoHighlight(false), 3000);
        }
    }, [selectedBodyPart]);

    // Phase 5: Biometric Web Pulse
    useEffect(() => {
        if (callActive) {
            const pulse = setInterval(() => {
                setBiometricWeb(prev => ({
                    stress: Math.max(20, Math.min(80, prev.stress + (Math.random() - 0.5) * 5)),
                    mood: Math.random() > 0.9 ? (['Zen', 'Balanced', 'Stable'][Math.floor(Math.random() * 3)]) : prev.mood,
                    focus: Math.max(70, Math.min(100, prev.focus + (Math.random() - 0.5) * 2))
                }));
            }, 3000);
            return () => clearInterval(pulse);
        }
    }, [callActive]);



    // Health Pod Insight Stream
    useEffect(() => {
        if (showHealthPod) {
            const insights = [
                "SYSTEM: SCANNING DERMAL LAYERS...",
                "NEURAL: SYNCING BIO-SIGNALS (98% MATCH)",
                "AI: HEART RATE VARIABILITY STABLE",
                "SECURITY: QUANTUM TUNNEL ESTABLISHED",
                "DR_READY: PREPARING CLINICAL HUD..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                setInsightStream(prev => [insights[i % insights.length], ...prev].slice(0, 5));
                i++;
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [showHealthPod]);

    // AI Bio-Sensing Logic
    useEffect(() => {
        if (callActive) {
            setIsBioScanning(true);
            setBioScanProgress(0);
            const interval = setInterval(() => {
                setBioScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setIsBioScanning(false), 1000);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 300); // 30 Seconds scan
            return () => clearInterval(interval);
        } else {
            setIsBioScanning(false);
            setBioScanProgress(0);
        }
    }, [callActive]);

    // Collaborative Laser Simulation
    useEffect(() => {
        if (activeSidebarTab === 'records') {
            const interval = setInterval(() => {
                setLaserPosition({
                    x: 20 + Math.random() * 60,
                    y: 20 + Math.random() * 60
                });
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [activeSidebarTab]);

    const handleEndCall = () => {
        setCallActive(false);
        setShowReport(true);
    };

    const toggleLanguage = () => {
        const langs = ['English', 'Hindi', 'Urdu'];
        const next = langs[(langs.indexOf(language) + 1) % langs.length];
        setLanguage(next);
    };

    const handleBodyPartClick = (part) => {
        setSelectedBodyPart(part);
        setSymptoms(prev => [...new Set([...prev, part])]);
    };

    const handleConsultClick = async (doc) => {
        if (!token || !user) {
            toast.error("Please login as a Patient to book a Neural Consultation!");
            return;
        }

        if (role !== 'patient') {
            toast.error("Only Patients can initiate Tele-Consultations.");
            return;
        }

        setSelectedDoc(doc);
        setIsPaying(true); // Open the Neural-Pay bridge
        setPaymentStep(1);
    };

    const confirmNeuralBooking = async () => {
        try {
            setPaymentStep(2); // Processing...
            
            // Check if this is a "Legacy" doctor (no real DB record)
            if (!selectedDoc.isReal) {
                console.log("Simulating Neural Bridge for Legacy Record:", selectedDoc.id);
                // Simulate a successful link for non-DB doctors
                setTimeout(() => {
                    setPaymentStep(3); // Success
                    toast.success("Neural Link Established! (Simulated)");
                    
                    setTimeout(() => {
                        startWaitingRoom(selectedDoc);
                    }, 1500);
                }, 2000);
                return;
            }

            // Real Backend Persistence for Live Doctors
            const res = await fetch(`${BASE_URL}/appointments/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    doctorId: selectedDoc.id,
                    appointmentType: 'teleconsult',
                    paymentMethod: 'online', // Default for Instant Video
                    date: new Date().toISOString(),
                    timeSlot: `${new Date().getHours()}:${new Date().getMinutes()} (Instant)`,
                    ticketPrice: selectedDoc.fee,
                    patientName: user.name
                })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            setPaymentStep(3); // Success
            toast.success("Neural Link Established!");
            
            // Log event for real-time tracking
            if (socket) {
                socket.emit('new-booking', {
                    patientId: user._id,
                    doctorId: selectedDoc.id,
                    type: 'teleconsult'
                });
            }

            setTimeout(() => {
                startWaitingRoom(selectedDoc);
            }, 2000);

        } catch (err) {
            toast.error(err.message);
            setPaymentStep(1);
        }
    };

    const startWaitingRoom = (doctor) => {
        setWaitingRoomData(doctor);
        setShowWaitingRoom(true);
        setQueueTimer(doctor.waitTime * 60);
        setHealthTipIndex(0);
    };

    const handleViewProfile = (e, doc) => {
        e.stopPropagation();
        setViewingDocProfile(doc);
    };

    const handleProcessPayment = () => {
        setPaymentStep(2);
        setTimeout(() => {
            setPaymentStep(3);
        }, 3000);
    };

    const handleStartCall = () => {
        setIsPaying(false);
        setConsultStage('triage');
        setConsultTriageStep(0);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
        setChatInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'doc', text: "Noted. I'm adding this to your clinical notes." }]);
        }, 1500);
    };


    const BodyMap = () => (
        <HolographicAnatomyMapper onSelectPart={(part) => handleBodyPartClick(part.id)} />
    );


    const analyzeSymptoms = () => {
        setAnalyzingSymptoms(true);

        setTimeout(() => {
            const input = symptomInput.toLowerCase();
            let matchedSpecialty = 'Cardiologist'; // default
            let urgency = 'ROUTINE';
            let matchScore = 70;

            // Find best match
            for (const [symptom, data] of Object.entries(symptomDatabase)) {
                if (data.keywords.some(keyword => input.includes(keyword))) {
                    matchedSpecialty = data.specialty;
                    urgency = data.urgency;
                    matchScore = 85 + Math.floor(Math.random() * 13); // 85-98
                    break;
                }
            }

            // Get top 3 doctors for this specialty from Dynamic Data
            const recommendedDoctors = doctors
                .filter(doc => doc.specialty === matchedSpecialty)
                .sort((a, b) => {
                    // Prioritize: Available > Rating > Experience
                    if (a.status === 'Available' && b.status !== 'Available') return -1;
                    if (a.status !== 'Available' && b.status === 'Available') return 1;
                    if (b.rating !== a.rating) return b.rating - a.rating;
                    return parseInt(b.experience) - parseInt(a.experience);
                })
                .slice(0, 3)
                .map((doc, idx) => ({
                    ...doc,
                    matchReason: idx === 0
                        ? `${doc.experience} experience, ${doc.successRate}% success rate, Available NOW`
                        : `${doc.rating}⭐ rating, ${doc.totalReviews} verified reviews`
                }));

            setSymptomAnalysis({
                urgency,
                specialty: matchedSpecialty,
                matchScore,
                recommendedDoctors,
                estimatedDuration: urgency === 'URGENT' ? '20-30 mins' : '15-20 mins',
                suggestedTests: urgency === 'URGENT' ? ['ECG', 'Blood Pressure'] : ['Basic Checkup']
            });
            setAnalyzingSymptoms(false);
        }, 2000);
    };

    const toggleCompareDoctor = (doctor) => {
        if (compareDoctors.find(d => d.id === doctor.id)) {
            setCompareDoctors(compareDoctors.filter(d => d.id !== doctor.id));
        } else {
            if (compareDoctors.length < 3) {
                setCompareDoctors([...compareDoctors, doctor]);
            }
        }
    };

    // Waiting Room Timer
    useEffect(() => {
        if (showWaitingRoom && queueTimer > 0) {
            const timer = setInterval(() => {
                setQueueTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (queueTimer === 0 && showWaitingRoom) {
            // Auto-start consultation when timer reaches 0
            setShowWaitingRoom(false);
            handleConsultClick(waitingRoomData);
        }
    }, [showWaitingRoom, queueTimer]);

    // Health Tips Rotation
    useEffect(() => {
        if (showWaitingRoom) {
            const tipTimer = setInterval(() => {
                setHealthTipIndex(prev => (prev + 1) % healthTips.length);
            }, 8000);
            return () => clearInterval(tipTimer);
        }
    }, [showWaitingRoom]);

    // Flash Booking Timer
    useEffect(() => {
        if (showFlashBooking && flashTimer > 0) {
            const timer = setInterval(() => {
                setFlashTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (flashTimer === 0 && showFlashBooking) {
            setShowFlashBooking(false);
            setFlashSlot(null);
            setFlashTimer(60);
        }
    }, [showFlashBooking, flashTimer]);

    // Simulate Flash Booking Opportunity (random)
    useEffect(() => {
        const flashInterval = setInterval(() => {
            if (!showFlashBooking && Math.random() > 0.95) { // 5% chance every 10 seconds
                    const availableDocs = doctors.filter(d => d.status === 'Available');
                    if (availableDocs.length > 0) {
                        const randomDoc = availableDocs[Math.floor(Math.random() * availableDocs.length)];
                        setFlashSlot({
                            ...randomDoc,
                            originalFee: randomDoc.fee,
                            flashFee: Math.floor(randomDoc.fee * 0.85), // 15% discount
                            slot: 'Today ' + (new Date().getHours() + 1) + ':00 PM'
                        });
                        setShowFlashBooking(true);
                        setFlashTimer(60);
                    }
            }
        }, 10000); // Check every 10 seconds
        return () => clearInterval(flashInterval);
    }, [showFlashBooking]);

    // Random Transcription Simulation
    useEffect(() => {
        if (callActive) {
            const lines = [
                "Don't worry about the pain. Let me check your symptoms.",
                "Your heart rate seems stable in the report you uploaded.",
                "Are you feeling any dizziness since this morning?",
                "I'm prescribing a low dose based on our session today.",
                "Take rest for 2 days. I've sent the digital prescription."
            ];
            let i = 0;
            const transInterval = setInterval(() => {
                if (i < lines.length) {
                    setTranscriptions(prev => [...prev.slice(-3), lines[i]]);
                    i++;
                }
            }, 5000);
            return () => clearInterval(transInterval);
        } else {
            setTranscriptions([]);
        }
    }, [callActive]);


    const filteredDocs = doctors.filter(doc => {
        // Basic search and category
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.specializations.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || doc.specialty === selectedCategory;

        // Advanced filters
        const matchesPrice = doc.fee >= priceRange[0] && doc.fee <= priceRange[1];
        const matchesRating = doc.rating >= minRating;
        const matchesExperience = parseInt(doc.experience) >= minExperience;
        const matchesLanguage = selectedLanguages.length === 0 ||
            selectedLanguages.some(lang => doc.languages?.includes(lang));

        // Availability filter
        let matchesAvailability = true;
        if (availabilityFilter === 'now') {
            matchesAvailability = doc.status === 'Available' && doc.queuePosition === 0;
        } else if (availabilityFilter === 'today') {
            matchesAvailability = doc.nextSlots?.some(slot => slot.includes('Today'));
        }

        return matchesSearch && matchesCategory && matchesPrice && matchesRating &&
            matchesExperience && matchesLanguage && matchesAvailability;
    }).map(doc => {
        // Dynamic AI Match Calculation
        let matchScore = doc.aiMatch || 85;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            if (doc.specialty.toLowerCase().includes(term)) matchScore += 10;
            if (doc.name.toLowerCase().includes(term)) matchScore += 5;
            if (doc.specializations.some(s => s.toLowerCase().includes(term))) matchScore += 8;
        }
        if (selectedCategory !== 'all' && doc.specialty === selectedCategory) {
            matchScore += 5;
        }
        return { ...doc, dynamicMatch: Math.min(matchScore, 99) };
    }).sort((a, b) => {
        // Sorting logic
        switch (sortBy) {
            case 'aiMatch':
                return (b.dynamicMatch || 0) - (a.dynamicMatch || 0);
            case 'rating':
                return b.rating - a.rating;
            case 'fee':
                return a.fee - b.fee;
            case 'experience':
                return parseInt(b.experience) - parseInt(a.experience);
            case 'availability':
                return a.queuePosition - b.queuePosition;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-rose-500/30">
            <MetaHead
              title="TeleConsult AI Doctor Video Call | Instant Online Doctor Consultation Bihar | Sehaat Saathi"
              description="24/7 AI-Powered Teleconsultation & Live Doctor Video Call on Sehaat Saathi (Sehat Sathi). Real-time vitals, AI prescription, and specialist doctor consultation in Madhubani, Darbhanga, Patna & Bihar."
              keywords="TeleConsult AI, doctor video calling booking app, online doctor video consultation app bihar, instant doctor video call, Sehaat Saathi Telemedicine, Sehat Sathi Doctor Video Call"
              canonicalUrl="https://sehaatsaathi.com/teleconsult-ai"
            />
            <SEOKeywordIsland />
            <VideoConsultSEOIsland />
            <style>{SENTINEL_STYLES}</style>
            {/* Header Area */}
            <div className="pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />

                {/* Emergency Hotlink */}
                <div className="container mx-auto relative z-20 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-rose-600 to-orange-600 p-[1px] rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_40px_rgba(244,63,94,0.2)]">
                            <div className="bg-[#0f172a] rounded-[1.5rem] md:rounded-[2.5rem] px-6 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                                <div className="flex items-center gap-4 md:gap-5">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-rose-500 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-pulse shadow-lg shadow-rose-500/20">
                                        <BsTelephoneFill className="animate-bounce" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-black text-rose-400">SEHAAT SOS: EMERGENCY</h3>
                                        <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest leading-tight">AI Triage • Instant Connect</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setEmergencyStage('triage');
                                        setIsDroneActive(true);
                                        setTimeout(() => setIsDroneActive(false), 15000);
                                    }}
                                    className="w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl md:rounded-2xl transition-all shadow-xl shadow-rose-600/30 flex items-center justify-center gap-3 active:scale-95 group animate-pulse"
                                >
                                    ACTIVATE SOS <BsArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-widest mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            Live Neural Tele-Consult
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                            <span className="inline-block transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,153,51,0.5)] cursor-default">
                                <span className="text-[#FF9933] drop-shadow-sm">Sehaat</span>
                            </span>
                            <span className="inline-block mx-2 md:mx-3 transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(19,136,8,0.5)] cursor-default">
                                <span className="text-[#138808] drop-shadow-sm">Saathi</span>
                            </span>
                            <span className="block md:inline-block bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent italic opacity-90">
                                Instant Video Consultations
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12">
                            Top doctors are just a call away. Night or Day, Emergency or Routine – bat karein instant.
                        </p>

                        {/* Domain Filters */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                            {DOMAINS.map(domain => (
                                <button
                                    key={domain.id}
                                    onClick={() => setSelectedCategory(domain.id)}
                                    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold flex items-center gap-2 md:gap-3 transition-all border text-xs md:text-sm ${selectedCategory === domain.id ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20 scale-105' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <span className="text-lg md:text-xl">{domain.icon}</span>
                                    {domain.name}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group px-2 md:px-0">
                            <div className="absolute inset-0 bg-rose-500/20 blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                            <div className="relative flex flex-col sm:flex-row items-center bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-1.5 md:p-2 backdrop-blur-3xl focus-within:border-rose-500/50 transition-all gap-2 md:gap-0">
                                <div className="flex items-center w-full">
                                    <BsSearch className="ml-4 md:ml-6 text-slate-500 text-lg md:text-xl shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Search specialty or name..."
                                        className="w-full bg-transparent px-4 md:px-6 py-3 md:py-4 outline-none text-sm md:text-lg font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowSymptomAnalyzer(true)}
                                    className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                                >
                                    <BsLightningChargeFill /> Smart Finder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="container mx-auto px-5 pb-32">
                {/* Enhanced Header with Advanced Filters */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                            <BsPersonFill className="text-rose-500" /> Specialist Roster
                        </h2>
                        <p className="text-slate-400 text-xs md:text-sm mt-1 md:mt-2">{filteredDocs.length} doctors available</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all outline-none cursor-pointer"
                        >
                            <option value="rating">Sort: Rating</option>
                            <option value="fee">Sort: Price (Low to High)</option>
                            <option value="experience">Sort: Experience</option>
                            <option value="availability">Sort: Availability</option>
                            <option value="aiMatch">Sort: AI Match</option>
                        </select>

                        {/* Availability Filter */}
                        <button
                            onClick={() => setAvailabilityFilter(availabilityFilter === 'now' ? 'all' : 'now')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${availabilityFilter === 'now'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <BsClock /> Available Now
                        </button>

                        {/* Advanced Filters Toggle */}
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${showAdvancedFilters
                                ? 'bg-rose-500 text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <BsFilter /> Advanced Filters
                        </button>

                        {/* Compare Mode Toggle */}
                        <button
                            onClick={() => setCompareMode(!compareMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${compareMode
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            ⚖️ Compare ({compareDoctors.length}/3)
                        </button>
                    </div>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvancedFilters && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-12 backdrop-blur-xl animate-fade-in mx-2 md:mx-0">
                        <h3 className="text-base md:text-lg font-black mb-4 md:mb-6 flex items-center gap-2">
                            <BsFilter className="text-rose-500" /> Advanced Filters
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {/* Price Range */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Price Range</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                        className="w-full bg-white/5 px-3 py-2 rounded-lg text-sm outline-none border border-white/10"
                                        placeholder="Min"
                                    />
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full bg-white/5 px-3 py-2 rounded-lg text-sm outline-none border border-white/10"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>

                            {/* Minimum Rating */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Min Rating</label>
                                <select
                                    value={minRating}
                                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                    className="w-full bg-white/5 px-3 py-2 rounded-lg text-sm outline-none border border-white/10 cursor-pointer"
                                >
                                    <option value="0">Any Rating</option>
                                    <option value="4.5">4.5+ ⭐</option>
                                    <option value="4.0">4.0+ ⭐</option>
                                    <option value="3.5">3.5+ ⭐</option>
                                </select>
                            </div>

                            {/* Minimum Experience */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Min Experience</label>
                                <select
                                    value={minExperience}
                                    onChange={(e) => setMinExperience(parseInt(e.target.value))}
                                    className="w-full bg-white/5 px-3 py-2 rounded-lg text-sm outline-none border border-white/10 cursor-pointer"
                                >
                                    <option value="0">Any Experience</option>
                                    <option value="5">5+ Years</option>
                                    <option value="10">10+ Years</option>
                                    <option value="15">15+ Years</option>
                                </select>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Languages</label>
                                <div className="flex flex-wrap gap-2">
                                    {['English', 'Hindi', 'Urdu'].map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                if (selectedLanguages.includes(lang)) {
                                                    setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                                                } else {
                                                    setSelectedLanguages([...selectedLanguages, lang]);
                                                }
                                            }}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedLanguages.includes(lang)
                                                ? 'bg-rose-500 text-white'
                                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setPriceRange([0, 1000]);
                                setMinRating(0);
                                setMinExperience(0);
                                setSelectedLanguages([]);
                                setAvailabilityFilter('all');
                            }}
                            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Phase 3: Global Clinical Pulse Ticker */}
                <div className="mb-12 relative h-12 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex items-center px-6 group">
                    <div className="flex items-center gap-3 border-r border-white/10 pr-6 mr-6 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Neural Pulse LIVE</span>
                    </div>
                    <div className="flex-1 relative overflow-hidden h-full">
                        {[
                            "Dr. Sharma just completed a Cardiac Sync in Delhi",
                            "Emergency Neural-Relay active in Mumbai Hub",
                            "98.4% Match success for Pediatrics in Bangalore",
                            "1,240+ Doctors live on Sehaat Saathi Pulse",
                            "Quantum-Vault secured for 15,000+ reports today"
                        ].map((text, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 flex items-center text-xs font-bold text-slate-300 ${tickerIndex === idx ? 'animate-ticker' : 'opacity-0'}`}
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                        <BsGeoAltFill /> PAN-INDIA COVERAGE
                    </div>
                </div>

                {/* Doctor Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {filteredDocs.map(doc => (
                        <div
                            key={doc.id}
                            style={{
                                transform: `perspective(1000px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`,
                                transition: 'transform 0.1s ease-out, opacity 0.8s ease-out, translate 0.8s ease-out',
                                transitionDelay: `${doc.id * 100}ms`
                            }}
                            className={`group glass-premium rounded-[2.5rem] relative overflow-hidden flex flex-col transition-all duration-700 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer ${doc.status === 'Available' ? 'cyber-glow' : ''} ${showNeuralGateway ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'} ${doc.dynamicMatch > 90 ? 'animate-tiranga-glow border-2 border-transparent' : ''}`}
                            onClick={() => handleConsultClick(doc)}
                        >
                            {/* Phase 5: Sentient Searchlight Effect */}
                            {showAutoHighlight && focusSpecialty === doc.specialty && (
                                <div className="absolute inset-0 bg-rose-500/10 animate-pulse z-[35] pointer-events-none">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                                </div>
                            )}

                            <div
                                className={`absolute inset-0 z-0 bg-transparent tiranga-card-glow rounded-[2.5rem] transition-all duration-300 pointer-events-none`}
                            />

                            {/* Phase 4: Quantum Fast-Pass (Returning Users Only) */}
                            {isReturningUser && doc.status === 'Available' && (
                                <div className="absolute top-4 left-4 z-[40] animate-pulse">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleConsultClick(doc);
                                        }}
                                        className="bg-sky-500/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full border border-sky-400/50 shadow-lg shadow-sky-500/20 uppercase tracking-[0.2em] flex items-center gap-1.5 hover:bg-sky-400 transition-all hover:scale-105"
                                    >
                                        <BsLightningChargeFill /> Quantum Fast-Pass
                                    </button>
                                </div>
                            )}
                            {/* Compare Checkbox */}
                            {compareMode && (
                                <div className="absolute -top-3 -right-3 z-30">
                                    <button
                                        onClick={() => toggleCompareDoctor(doc)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-all shadow-xl ${compareDoctors.find(d => d.id === doc.id)
                                            ? 'bg-blue-500 text-white scale-110'
                                            : 'bg-white/10 backdrop-blur-xl text-slate-400 hover:bg-white/20'
                                            }`}
                                    >
                                        {compareDoctors.find(d => d.id === doc.id) ? '✓' : '+'}
                                    </button>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <div className="p-6 h-full flex flex-col relative z-20 transition-all hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                {/* Doctor Image & Status */}
                                <div className="relative mb-6 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                    <div className={`absolute inset-0 bg-${doc.color}-500 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity`} />
                                    {/* SENTINEL: Round Tricolor Avatar Glow */}
                                    <div className="tiranga-avatar-ring z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Phase 1: Omni-Presence Map */}
                                    <OmniPresenceMap location={doc.currentLocation} affiliation={doc.hospitalAffiliation} />

                                    <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover rounded-3xl relative z-10 transition-all shadow-lg"  loading="lazy" />


                                    {/* Phase 6: Neural-Sync Match Score */}
                                    <div className="absolute top-2 left-2 z-30">
                                        <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg border border-emerald-400/50 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-tighter">{doc.dynamicMatch}% MATCH</span>
                                        </div>
                                    </div>

                                    {/* Phase 5: Dynamic Authority Badges */}
                                    <div className="absolute top-2 right-2 z-30 flex flex-col gap-1 items-end">
                                        {doc.rating >= 4.9 && (
                                            <div className="bg-orange-500/90 text-white text-[7px] font-black px-2 py-0.5 rounded-full border border-orange-400/50 shadow-lg shadow-orange-500/20 uppercase tracking-widest animate-pulse">
                                                India Top 1%
                                            </div>
                                        )}
                                        {parseInt(doc.experience) >= 15 && (
                                            <div className="bg-sky-500/90 text-white text-[7px] font-black px-2 py-0.5 rounded-full border border-sky-400/50 shadow-lg shadow-sky-500/20 uppercase tracking-widest">
                                                Neural Specialist
                                            </div>
                                        )}
                                        {/* Phase 7: Tiranga Honor Shield */}
                                        {doc.honor && (
                                            <TirangaHealthShield honorScore={doc.honorScore} />
                                        )}
                                    </div>

                                    {/* AI Match Badge */}
                                    {doc.dynamicMatch && doc.dynamicMatch > 80 && (
                                        <div className={`absolute top-4 left-4 z-20 bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 rounded-full text-[10px] font-black text-white flex items-center gap-1 animate-pulse shadow-lg shadow-rose-500/20 ${isReturningUser ? 'mt-12' : ''}`}>
                                            <BsLightningChargeFill /> <span className="glitch-text">{doc.dynamicMatch}% Match</span>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${doc.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : doc.status === 'In Session' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`}>
                                        {doc.status}
                                    </div>

                                    {/* Response Time & Phase 5: Live Timer */}
                                    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1">
                                        <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-rose-400 border border-white/10 uppercase tracking-tighter">
                                            ⚡ Respond: {doc.response}
                                        </div>
                                        {doc.status !== 'Available' && (
                                            <div className="bg-rose-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-white border border-rose-400/30 animate-pulse flex items-center gap-1">
                                                <BsClockFill className="text-[10px]" />
                                                {liveWaitTimes[doc.id] > 0 ? formatTime(liveWaitTimes[doc.id]) : 'READY'}
                                            </div>
                                        )}
                                    </div>
                                    {/* Phase 6: Live Sentinel Activity Ticker */}
                                    <LiveActivityTicker docId={doc.id} />

                                    {/* Queue Info & Progress Bar -> QuantumQueueVisualizer */}
                                    {doc.status === 'In Session' && (
                                        <QuantumQueueVisualizer patientId="mock-pat-1" startTime={Date.now()} />
                                    )}
                                    {doc.status === 'Available' && doc.queuePosition > 0 && (
                                        <div className="absolute bottom-4 right-4 z-20 bg-emerald-500/80 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black text-white">
                                            Next in: {doc.waitTime}m
                                        </div>
                                    )}

                                </div>

                                <div className="relative z-20 flex-1 flex flex-col">
                                    {/* Doctor Name & Fee */}
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-black group-hover:text-rose-400 transition-colors">{doc.name}</h3>
                                        {/* Phase 7: Medic-Mood Indicator */}
                                        <MedicMoodIndicator mood={doc.mood} />
                                    </div>
                                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-tighter">{doc.specialty}</p>

                                    {/* Badges & Vibe Tags */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {doc.badges && doc.badges.slice(0, 2).map((badge, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[8px] font-black uppercase text-slate-400">
                                                {badge === 'Top Rated' && '🏆'}
                                                {badge === 'Quick Responder' && '⚡'}
                                                {badge === 'Board Certified' && '🎓'}
                                                {badge === '15+ Years' && '💼'}
                                                {badge === 'Patient Favorite' && '🌟'}
                                                {' '}{badge}
                                            </span>
                                        ))}
                                        {doc.vibeTags && doc.vibeTags.map((vibe, idx) => (
                                            <span key={`vibe-${idx}`} className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-md text-[8px] font-black uppercase text-rose-400">
                                                ✨ {vibe}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats Row */}
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                            <BsStarFill className="text-orange-400 text-xs" />
                                            <span className="text-sm font-black">{doc.rating}</span>
                                        </div>
                                        <div className="text-xs font-bold text-slate-500">
                                            {doc.experience} EXP
                                        </div>
                                        {/* Phase 2: Academic Lineage Badge */}
                                        <AcademicLineageBadge lineage={doc.academicLineage} />
                                    </div>

                                    {/* Next Available Slot */}
                                    {doc.nextSlots && doc.nextSlots.length > 0 && (
                                        <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl relative">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-[9px] font-black text-blue-400 uppercase mb-1">Next Available</div>
                                                    <div className="text-xs font-bold text-white">{doc.nextSlots[0]}</div>
                                                    {doc.waitTime > 0 && (
                                                        <div className="text-[9px] text-slate-400 mt-1">~{doc.waitTime} min wait</div>
                                                    )}
                                                </div>
                                                {/* Phase 2: Voice Bio Waveform */}
                                                {doc.voiceIntro && (
                                                    <div className="absolute right-2 top-2">
                                                        <VoiceBioWaveform
                                                            active={activeVoiceBio === doc.id}
                                                            onClick={() => setActiveVoiceBio(activeVoiceBio === doc.id ? null : doc.id)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Phase 1: AI Symptom-Scope Badge */}
                                    <SymptomMatchBadge stats={doc.symptomStats} searchTerm={searchTerm} />

                                    {/* Languages */}
                                    {doc.languages && (
                                        <div className="mb-3">
                                            <div className="text-[9px] font-black text-slate-500 uppercase mb-1">Languages</div>
                                            <div className="flex flex-wrap gap-1">
                                                {doc.languages.slice(0, 3).map((lang, idx) => (
                                                    <span key={idx} className="text-[9px] font-bold text-slate-400">
                                                        {lang}{idx < Math.min(doc.languages.length, 3) - 1 ? ',' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Patient Reviews Preview */}
                                    {doc.reviews && doc.reviews.length > 0 && (
                                        <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <BsChatQuoteFill className="text-rose-500 text-xs" />
                                                <span className="text-[9px] font-black text-slate-400 uppercase">Latest Review</span>
                                            </div>
                                            <p className="text-[10px] text-slate-300 italic line-clamp-2">"{doc.reviews[0].text}"</p>
                                            <p className="text-[8px] text-slate-500 mt-1">- {doc.reviews[0].patient}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        {/* Phase 3: AI Mini-Consult */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveDiagnosisDocId(doc.id);
                                            }}
                                            className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center rounded-2xl hover:scale-110 shadow-lg shadow-rose-500/20 transition-all text-white group relative overflow-hidden"
                                            title="AI Mini-Consult"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            <BsLightningChargeFill className="text-xl animate-pulse" />
                                        </button>

                                        {doc.status !== 'Offline' ? (
                                            <button
                                                onClick={() => handleConsultClick(doc)}
                                                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-black py-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-rose-600/10 uppercase text-xs tracking-widest"
                                            >
                                                Consult Now
                                            </button>
                                        ) : (
                                            <button
                                                className="flex-1 bg-white/5 border border-white/10 text-slate-400 font-black py-3 rounded-2xl transition-all hover:bg-white/10 uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                                                onClick={() => alert(`We'll notify you when ${doc.name} is back online!`)}
                                            >
                                                <BsLightningChargeFill className="text-orange-400" /> Remind Me
                                            </button>
                                        )}
                                        {!compareMode && (
                                            <button
                                                onClick={() => {
                                                    setCompareMode(true);
                                                    toggleCompareDoctor(doc);
                                                }}
                                                className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 transition-all text-slate-400 hover:text-blue-400"
                                                title="Compare"
                                            >
                                                ⚖️
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setViewingSlots(doc);
                                            }}
                                            className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center rounded-2xl hover:bg-blue-500/20 transition-all text-blue-400"
                                            title="View All Slots"
                                        >
                                            <BsCalendarCheck className="text-lg" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Neural Vital-Push: Your latest clinical vitals have been securely sent to ${doc.name}'s pre-consultation HUD.`);
                                            }}
                                            className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center rounded-2xl hover:bg-emerald-500/20 transition-all text-emerald-400 group"
                                            title="Vital-Push: Send Vitals Now"
                                        >
                                            <BsActivity className="text-lg group-hover:scale-125 transition-transform animate-pulse" />
                                        </button>
                                        <button
                                            onClick={(e) => handleViewProfile(e, doc)}
                                            className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-white/10 border border-white/10 transition-all text-slate-400 hover:text-white"
                                        >
                                            <BsPersonFill className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3: AI Pre-Diagnosis Chat Overlay */}
                            {activeDiagnosisDocId === doc.id && (
                                <AIPreDiagnosisChat
                                    doctorName={doc.name}
                                    doctorData={doc}
                                    onCheckMatch={(score) => {
                                        // Optional: Update match score in state if needed
                                    }}
                                    onClose={() => setActiveDiagnosisDocId(null)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredDocs.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BsPersonFill className="text-5xl text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-black mb-2">No Doctors Found</h3>
                        <p className="text-slate-400 mb-6">Try adjusting your filters or search criteria</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setPriceRange([0, 1000]);
                                setMinRating(0);
                                setMinExperience(0);
                                setSelectedLanguages([]);
                                setAvailabilityFilter('all');
                            }}
                            className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Payment Gateway Modal */}
            {
                isPaying && selectedDoc && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl animate-fade-in" />
                        <div className="relative z-10 w-full max-w-md bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                            <div className="bg-[#0f172a] rounded-[2.5rem] p-8">
                                {paymentStep === 1 && (
                                    <div className="space-y-6 animate-fade-in">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500">Card Number</label>
                                            <input placeholder="1234 5678 9012 3456" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Expiry</label>
                                                <input placeholder="MM/YY" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">CVV</label>
                                                <input placeholder="123" className="w-full bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-rose-500/50 transition-all" />
                                            </div>
                                        </div>
                                        {/* Progress Bar for Payment */}
                                        <div className="pt-4">
                                            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                                <span>Step 1 of 3</span>
                                                <span>33%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-600 w-[33%] transition-all duration-500" />
                                            </div>
                                        </div>
                                        <button onClick={confirmNeuralBooking} className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95">
                                            PROCEED TO PAYMENT
                                        </button>
                                    </div>
                                )}

                                {paymentStep === 2 && (
                                    <div className="text-center space-y-8 py-12 animate-scale-up">
                                        <div className="w-24 h-24 mx-auto border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                        <div>
                                            <h3 className="text-2xl font-black mb-2">PROCESSING SECURE PAYMENT</h3>
                                            <p className="text-slate-400 font-medium">Verifying transaction...</p>
                                        </div>
                                        {/* Progress Bar for Processing */}
                                        <div className="max-w-xs mx-auto">
                                            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                                <span>Step 2 of 3</span>
                                                <span>66%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-600 w-[66%] transition-all duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentStep === 3 && (
                                    <div className="text-center space-y-8 py-12 animate-scale-up">
                                        <div className="w-24 h-24 mx-auto bg-emerald-500 rounded-full flex items-center justify-center text-4xl">✓</div>
                                        <div>
                                            <h3 className="text-2xl font-black text-emerald-400 mb-2">PAYMENT SUCCESSFUL</h3>
                                            <p className="text-slate-400 font-medium">₹{selectedDoc?.fee} charged successfully</p>
                                        </div>
                                        {/* Progress Bar Complete */}
                                        <div className="max-w-xs mx-auto">
                                            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                                <span>Step 3 of 3</span>
                                                <span>100%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-600 w-[100%] transition-all duration-500" />
                                            </div>
                                        </div>
                                        <button onClick={handleStartCall} className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                                            START VIDEO CALL NOW
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
            {
                selectedDoc && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl animate-fade-in" />

                        <div className="relative z-10 w-full max-w-[95vw] lg:max-w-6xl aspect-auto lg:aspect-video bg-[#0f172a] rounded-[1.5rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(244,63,94,0.1)] flex flex-col lg:flex-row animate-scale-up h-[90vh] lg:h-auto">
                            {/* Video Area (Mock) */}
                            <div className="flex-1 relative bg-slate-900 overflow-hidden">
                                {!callActive ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <img src={selectedDoc.image} className="w-48 h-48 rounded-full border-4 border-rose-500 animate-pulse mb-8"  loading="lazy" />
                                        <h2 className="text-3xl font-black mb-2">Connecting with {selectedDoc.name}...</h2>
                                        <p className="text-rose-400 font-bold animate-bounce mt-4 tracking-widest text-sm uppercase">Neural Link Syncing</p>
                                        <div className="mt-12 flex gap-8">
                                            <button
                                                onClick={() => setCallActive(true)}
                                                className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-90 transition-all"
                                            >
                                                <BsTelephoneFill />
                                            </button>
                                            <button
                                                onClick={() => setSelectedDoc(null)}
                                                className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20 hover:scale-110 active:scale-90 transition-all"
                                            >
                                                <BsXCircle />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0">
                                        <div className="absolute top-4 left-4 z-50">
                                            <NeuralVoiceBridge
                                                isActive={isVoiceBridgeActive}
                                                onToggle={() => setIsVoiceBridgeActive(!isVoiceBridgeActive)}
                                                currentLang={language}
                                            />
                                        </div>

                                        {/* Pulse Point Laser (Interactive Exam) */}
                                        {laserHotspot && (
                                            <div
                                                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                                                style={{ top: `${laserHotspot.y}%`, left: `${laserHotspot.x}%` }}
                                            >
                                                <div className="absolute inset-0 bg-rose-500 rounded-full animate-laser-pulse" />
                                                <div className="absolute inset-2 bg-rose-400 rounded-full animate-ping" />
                                            </div>
                                        )}

                                        <AIAuraSenseBioFeedback heartRate={healthVitals.heartRate} stress={healthVitals.stressLevel} />
                                        {/* Main Doc Feed (Mock) */}
                                        <div className="absolute inset-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                            <img src={selectedDoc.image} className="w-full h-full object-cover blur-sm opacity-30"  loading="lazy" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="relative">
                                                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
                                                    <img src={selectedDoc.image} className="w-80 h-96 object-cover rounded-3xl border-2 border-white/20 shadow-2xl relative z-10"  loading="lazy" />
                                                    <div className="absolute -bottom-4 -left-4 z-30 bg-rose-600 px-6 py-2 rounded-xl font-black text-sm shadow-xl">
                                                        {selectedDoc.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Feed (Picture in Picture) */}
                                        <div className="absolute top-4 md:top-8 right-4 md:right-8 w-32 md:w-48 h-40 md:h-64 bg-slate-800 rounded-xl md:rounded-2xl border-2 border-white/10 z-40 overflow-hidden shadow-2xl group/user">
                                            <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start z-50">
                                                <div className="px-2 py-0.5 bg-emerald-500/20 backdrop-blur-md rounded-lg border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                                    <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Mood: Calm</span>
                                                </div>
                                                <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-500/30 flex items-center justify-center text-[8px] font-black text-blue-400">
                                                    60 FPS
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            <div className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-tight opacity-70">YOU (NeuralCam)</div>
                                            <div className="w-full h-full flex items-center justify-center bg-slate-700/50">
                                                <BsPersonFill className="text-4xl opacity-20" />
                                            </div>
                                            {/* AI Mood Overlay Grid */}
                                            <div className="absolute inset-0 border border-emerald-500/10 pointer-events-none opacity-0 group-hover/user:opacity-100 transition-opacity">
                                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/20" />
                                                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-emerald-500/20" />
                                            </div>

                                            {/* Phase 3: Neural-Relay Drop-out Protection */}
                                            {showNeuralRelay && (
                                                <div className="absolute inset-0 z-[60] bg-rose-500/20 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in border-4 border-rose-500/50 rounded-2xl">
                                                    <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center animate-ping mb-4">
                                                        <BsLightningChargeFill className="text-white text-xl" />
                                                    </div>
                                                    <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] text-center px-4">
                                                        Signal Unstable<br />Rerouting via Neural-Relay...
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Call Controls */}
                                        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 z-50 scale-90 md:scale-100">
                                            <button
                                                onClick={() => setMicOn(!micOn)}
                                                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-rose-500 shadow-lg shadow-rose-500/20'}`}
                                            >
                                                {micOn ? <BsMicFill /> : <BsMicMuteFill />}
                                            </button>
                                            <button
                                                onClick={() => setVideoOn(!videoOn)}
                                                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all ${videoOn ? 'bg-white/10 hover:bg-white/20' : 'bg-rose-500 shadow-lg shadow-rose-500/20'}`}
                                            >
                                                {videoOn ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
                                            </button>
                                            <button
                                                onClick={handleEndCall}
                                                className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-2xl hover:bg-rose-500 transition-all shadow-xl shadow-rose-600/30 active:scale-95"
                                            >
                                                <BsTelephoneFill className="rotate-[135deg]" />
                                            </button>
                                        </div>

                                        {/* Timer */}
                                        <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-lg font-black tracking-widest flex items-center gap-3 z-40 border border-white/5">
                                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                            {formatTime(callDuration)}
                                        </div>

                                        {/* Neural Voice Translation Subtitles HUD */}
                                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-[70] pointer-events-none">
                                            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl animate-fade-in relative overflow-hidden">
                                                {/* Audio Waveform HUD */}
                                                <TranslationWaveformHUD active={callActive} />

                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-rose-500/30">
                                                        <BsTranslate className="text-xl text-rose-500 animate-pulse" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Neural Live Translation ({language})</p>
                                                            <div className="flex gap-0.5">
                                                                <span className="w-3 h-2 bg-orange-500 rounded-sm opacity-60" title="Hindi Indicator" />
                                                                <span className="w-3 h-2 bg-white rounded-sm opacity-60" />
                                                                <span className="w-3 h-2 bg-green-600 rounded-sm opacity-60" />
                                                            </div>
                                                        </div>
                                                        {transcriptions.length > 0 ? (
                                                            <div>
                                                                <p className="text-sm font-bold text-white leading-tight">
                                                                    {transcriptions[transcriptions.length - 1]}
                                                                </p>
                                                                {language !== 'English' && (
                                                                    <p className="text-xs font-medium text-emerald-400 italic">
                                                                        {language === 'Hindi' && "नमस्ते! मैं आपको स्पष्ट रूप से देख सकता हूँ। आज आप कैसा महसूस कर रहे हैं?"}
                                                                        {language === 'Urdu' && "ہیلو! میں آپ کو صاف دیکھ سکتا ہوں۔ آج آپ کیسی محسوس کر رہے ہیں؟"}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs font-bold text-slate-500 animate-pulse">Waiting for audio signal...</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Transcription HUD */}
                                        <div className="absolute bottom-32 left-8 right-8 z-40">
                                            <div className="max-w-xl bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/5 border-l-4 border-l-rose-500">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <BsChatQuoteFill className="text-rose-500 text-xs" />
                                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">AI Neural Transcription</span>
                                                    </div>
                                                    <button
                                                        onClick={toggleLanguage}
                                                        className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-black text-rose-400 border border-white/10 transition-all"
                                                    >
                                                        <BsTranslate /> {language.toUpperCase()}
                                                    </button>
                                                </div>
                                                <div className="space-y-1">
                                                    {transcriptions.length === 0 && <p className="text-sm text-slate-500 italic">Listening to conversation...</p>}
                                                    {transcriptions.map((t, idx) => (
                                                        <p key={idx} className={`text-sm ${idx === transcriptions.length - 1 ? 'text-white' : 'text-slate-400'}`}>
                                                            {language === 'Hindi' ? `${t} (Hindi Trans)` : language === 'Urdu' ? `${t} (Urdu Trans)` : t}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Face Scanning Grid Overlay */}
                                        <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
                                            <div className="absolute inset-0 border-[2px] border-rose-500/20 rounded-[3rem] animate-pulse"></div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-emerald-500/30 rounded-full animate-ping"></div>
                                            <svg className="w-full h-full">
                                                <defs>
                                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244, 63, 94, 0.05)" strokeWidth="1" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill="url(#grid)" />
                                            </svg>
                                            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-l-2 border-t-2 border-rose-500/50 rounded-tl-3xl"></div>
                                            <div className="absolute top-1/4 right-1/4 w-32 h-32 border-r-2 border-t-2 border-rose-500/50 rounded-tr-3xl"></div>
                                            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border-l-2 border-b-2 border-rose-500/50 rounded-bl-3xl"></div>
                                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-r-2 border-b-2 border-rose-500/50 rounded-br-3xl"></div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent h-1 w-full animate-scan"></div>
                                        </div>

                                        {/* AI Bio-Sensing HUD Overlay */}
                                        {isBioScanning && (
                                            <div className="absolute inset-0 z-[60] flex items-center justify-center p-12 bg-black/20 backdrop-blur-[2px] animate-fade-in">
                                                <div className="w-full h-full relative border-2 border-rose-500/30 rounded-[3rem] overflow-hidden">
                                                    {/* Scanning Lines */}
                                                    <div className="absolute inset-0">
                                                        <div className="w-full h-[2px] bg-rose-500/40 absolute animate-[scan_4s_linear_infinite]" />
                                                        <div className="w-[2px] h-full bg-rose-500/40 absolute left-1/2 -translate-x-1/2" />
                                                        <div className="w-full h-[2px] bg-rose-500/40 absolute top-1/2 -translate-y-1/2" />

                                                        {/* Neural Face Map Dots */}
                                                        {facePoints.map((pt, i) => (
                                                            <div
                                                                key={i}
                                                                className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full blur-[1px] transition-opacity duration-300"
                                                                style={{ top: pt.top, left: pt.left, opacity: pt.opacity }}
                                                            />
                                                        ))}
                                                    </div>

                                                    {/* Bio Markers */}
                                                    <div className="absolute top-4 md:top-10 left-4 md:left-10 space-y-2 md:space-y-4">
                                                        <div className="bg-black/60 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-rose-500/30">
                                                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Face Points</div>
                                                            <div className="flex gap-1">
                                                                {[...Array(6)].map((_, i) => (
                                                                    <div key={i} className={`w-2 h-2 rounded-full ${bioScanProgress > i * 15 ? 'bg-emerald-500' : 'bg-slate-700 animate-pulse'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30">
                                                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Dermal Scan</div>
                                                            <div className="text-xl font-black text-white">{Math.round(bioScanProgress)}%</div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-4 md:top-10 right-4 md:right-10 text-right">
                                                        <div className="bg-rose-600/20 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-rose-500/40 inline-flex items-center gap-2 md:gap-3">
                                                            <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                                                            <span className="text-xs font-black text-white uppercase tracking-widest">Neural Bio-Sensing Active</span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-md">
                                                        <div className="bg-black/80 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 text-center space-y-2 md:space-y-4">
                                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Analyzing HRV & Respiratory Micro-fluctuations</div>
                                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-gradient-to-r from-rose-600 to-emerald-600 transition-all duration-300" style={{ width: `${bioScanProgress}%` }} />
                                                            </div>
                                                            <p className="text-[10px] text-rose-400 font-bold animate-pulse">DO NOT MOVE • KEEP FACE IN FOCUS</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {isDroneActive && <SanjeevaniDroneDispatch />}
                            </div>

                            {/* Sidebar (Heads-up Display) */}
                            <div className="w-full lg:w-96 bg-[#0f172a] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col overflow-hidden h-1/2 lg:h-auto">
                                {/* Tabs Switch */}
                                <div className="flex border-b border-white/10">
                                    <button
                                        onClick={() => setActiveSidebarTab('vitals')}
                                        className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'vitals' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                    >
                                        Vitals
                                    </button>
                                    <button
                                        onClick={() => setActiveSidebarTab('scribe')}
                                        className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'scribe' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                    >
                                        AI Scribe
                                    </button>
                                    <button
                                        onClick={() => setActiveSidebarTab('anatomy')}
                                        className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'anatomy' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                    >
                                        Anatomy
                                    </button>
                                    <button
                                        onClick={() => setActiveSidebarTab('records')}
                                        className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'records' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                    >
                                        Vault
                                    </button>
                                    <button
                                        onClick={() => setActiveSidebarTab('chat')}
                                        className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${activeSidebarTab === 'chat' ? 'border-rose-500 bg-rose-500/5 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
                                    >
                                        Chat
                                    </button>
                                </div>

                                <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                                    {activeSidebarTab === 'vitals' && (
                                        <div className="space-y-10 animate-fade-in text-center">
                                            <h3 className="text-lg font-black flex items-center justify-center gap-3">
                                                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                                                    <BsActivity className="text-rose-500" />
                                                </div>
                                                Neural Vitals
                                            </h3>

                                            {/* Phase 3: 3D Neural-Heart Sync */}
                                            <div className="relative inline-block py-8">
                                                <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                                <svg
                                                    viewBox="0 0 200 200"
                                                    className="w-32 h-32 relative z-10 animate-heart"
                                                    style={{ '--heart-duration': `${60 / (healthVitals.heartRate || 72)}s` }}
                                                >
                                                    <path
                                                        d="M100 30 C 100 30, 90 20, 70 20 C 40 20, 30 50, 30 70 C 30 110, 100 160, 100 160 C 100 160, 170 110, 170 70 C 170 50, 160 20, 130 20 C 110 20, 100 30, 100 30"
                                                        fill="url(#heartGradient)"
                                                        stroke="rgba(244, 63, 94, 0.4)"
                                                        strokeWidth="2"
                                                    />
                                                    <defs>
                                                        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" style={{ stopColor: '#f43f5e', stopOpacity: 1 }} />
                                                            <stop offset="100%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    {/* Neural Scanlines on Heart */}
                                                    <path d="M50 70 L150 70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                                    <path d="M50 90 L150 90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                                    <path d="M50 110 L150 110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                                </svg>
                                                <div className="mt-4">
                                                    <span className="text-4xl font-black text-rose-500">{healthVitals.heartRate}</span>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase ml-2">BPM SYNCED</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                                                    <BsHeartPulseFill className="text-rose-500 mb-3 text-xl" />
                                                    <div className="text-[10px] font-black text-slate-500 uppercase">Heart Rate</div>
                                                    <div className="text-2xl font-black text-white">72 <span className="text-[10px] text-slate-400">BPM</span></div>
                                                </div>
                                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
                                                    <BsLightningChargeFill className="text-emerald-500 mb-3 text-xl" />
                                                    <div className="text-[10px] font-black text-slate-500 uppercase">Oxygen Sat</div>
                                                    <div className="text-2xl font-black text-white">98 <span className="text-[10px] text-slate-400">%</span></div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <VitalProgress label="Respiratory Rate" value="16 m/m" progress={65} color="blue" />
                                                <VitalProgress label="Stress Index" value="Low Risk" progress={20} color="emerald" />
                                                <VitalProgress label="Neural Clarity" value="Optimal" progress={92} color="rose" />
                                            </div>

                                            <div className="mt-8 flex justify-center">
                                                <AyushVitalChakra vitals={healthVitals} />
                                            </div>

                                            <SmartMedDosePredictor vitals={healthVitals} />
                                        </div>
                                    )}

                                    {activeSidebarTab === 'scribe' && (
                                        <div className="animate-fade-in flex flex-col h-full space-y-6">
                                            <NeuralScriptLiveScribe messages={messages} />
                                        </div>
                                    )}

                                    {activeSidebarTab === 'anatomy' && (
                                        <div className="space-y-8 animate-fade-in">
                                            <h3 className="text-lg font-black flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                                                    <BsBodyText className="text-blue-500" />
                                                </div>
                                                3D Anatomy Map
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Click on the area where you feel pain:</p>

                                            <div className="relative aspect-[3/4] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-4">
                                                {/* Simulated 3D Body Outline */}
                                                <svg viewBox="0 0 100 200" className="w-full h-full opacity-40 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                                    <path
                                                        onClick={() => handleBodyPartClick('Cerebral Region')}
                                                        d="M50,10 Q40,10 40,20 Q40,30 50,30 Q60,30 60,20 Q60,10 50,10"
                                                        fill={bodyPartSelected === 'Cerebral Region' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                        className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                    />
                                                    <path
                                                        onClick={() => handleBodyPartClick('Chest/Thoracic')}
                                                        d="M40,35 L60,35 L65,70 L35,70 Z"
                                                        fill={bodyPartSelected === 'Chest/Thoracic' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                        className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                    />
                                                    <path
                                                        onClick={() => handleBodyPartClick('Left Arm')}
                                                        d="M30,40 L15,80 L20,85 L35,45 Z"
                                                        fill={bodyPartSelected === 'Left Arm' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                        className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                    />
                                                    <path
                                                        onClick={() => handleBodyPartClick('Right Arm')}
                                                        d="M70,40 L85,80 L80,85 L65,45 Z"
                                                        fill={bodyPartSelected === 'Right Arm' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                        className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                    />
                                                    <path
                                                        onClick={() => handleBodyPartClick('Lower Abdomen')}
                                                        d="M35,75 L65,75 L60,110 L40,110 Z"
                                                        fill={bodyPartSelected === 'Lower Abdomen' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255,255,255,0.1)'}
                                                        className="cursor-pointer hover:fill-rose-500 transition-colors"
                                                    />
                                                </svg>

                                                {bodyPartSelected && (
                                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-rose-600 rounded-2xl flex items-center justify-between shadow-xl animate-scale-up">
                                                        <div>
                                                            <div className="text-[8px] font-black uppercase text-rose-200">Selected Hotspot</div>
                                                            <div className="text-xs font-black">{bodyPartSelected}</div>
                                                        </div>
                                                        <BsLightningChargeFill className="text-orange-300 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>

                                            {symptoms.length > 0 && (
                                                <div className="space-y-3">
                                                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Symptom Log</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {symptoms.map(s => (
                                                            <span key={s} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black rounded-lg uppercase">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeSidebarTab === 'records' && (
                                        <div className="space-y-8 animate-fade-in relative min-h-[500px]">
                                            <h3 className="text-lg font-black flex items-center gap-3">
                                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                                    <BsFileEarmarkMedicalFill className="text-emerald-500" />
                                                </div>
                                                Collaborative Vault
                                            </h3>

                                            {/* Phase 3: Quantum Lab-Vault Unlocking */}
                                            {!isUnlockingReports && unlockProgress < 100 && (
                                                <div className="absolute inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5">
                                                    <div className="w-24 h-24 mb-6 relative">
                                                        <div className="absolute inset-0 border-4 border-rose-500/20 rounded-full" />
                                                        <div className="absolute inset-0 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <BsShieldCheck className="text-3xl text-rose-500" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Vault Locked</h4>
                                                    <p className="text-[10px] text-slate-500 mb-6 uppercase">Biometric Sign-off Required</p>
                                                    <button
                                                        onClick={() => {
                                                            setIsUnlockingReports(true);
                                                            let p = 0;
                                                            const interval = setInterval(() => {
                                                                p += 5;
                                                                setUnlockProgress(p);
                                                                if (p >= 100) {
                                                                    clearInterval(interval);
                                                                    setIsUnlockingReports(false);
                                                                }
                                                            }, 50);
                                                        }}
                                                        className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all shadow-lg shadow-rose-600/20 active:scale-95 text-[10px] uppercase tracking-widest"
                                                    >
                                                        UNLOCK QUANTUM VAULT
                                                    </button>
                                                </div>
                                            )}

                                            {isUnlockingReports && (
                                                <div className="absolute inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5">
                                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                                                        <div className="h-full bg-emerald-500 transition-all duration-100" style={{ width: `${unlockProgress}%` }} />
                                                    </div>
                                                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Decrypting Neural Records... {unlockProgress}%</div>
                                                </div>
                                            )}

                                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
                                                {/* Simulated Laser Pointer */}
                                                <div
                                                    className="absolute w-4 h-4 bg-rose-500 rounded-full blur-sm opacity-60 z-30 transition-all duration-1000 ease-in-out pointer-events-none"
                                                    style={{ left: `${laserPosition.x}%`, top: `${laserPosition.y}%` }}
                                                />
                                                <div
                                                    className="absolute w-2 h-2 bg-white rounded-full z-40 transition-all duration-1000 ease-in-out pointer-events-none shadow-[0_0_10px_#f43f5e]"
                                                    style={{ left: `${laserPosition.x + 0.5}%`, top: `${laserPosition.y + 0.5}%` }}
                                                />

                                                <div className="space-y-6 relative z-10">
                                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lab Report: #<span style={{ color: "#FF9933" }}>SAATHI</span>-9921</span>
                                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full border border-emerald-500/30 uppercase">Neural Verified</span>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <ReportItem
                                                            label="Hemoglobin (Hb)"
                                                            value="14.2"
                                                            unit="g/dL"
                                                            status="Normal"
                                                            onExplainer={() => setShowAIExplainer({
                                                                title: "Hemoglobin (Hb)",
                                                                meaning: "This is the protein in your red blood cells that carries oxygen. Your level is perfect!",
                                                                impact: "Good energy levels and proper oxygen flow."
                                                            })}
                                                        />
                                                        <ReportItem
                                                            label="Serum Glucose"
                                                            value="105"
                                                            unit="mg/dL"
                                                            status="Borderline"
                                                            color="orange"
                                                            onExplainer={() => setShowAIExplainer({
                                                                title: "Serum Glucose",
                                                                meaning: "This measures the sugar levels in your blood. You are slightly on the higher side.",
                                                                impact: "Need to cut down on sweets for a few days."
                                                            })}
                                                        />
                                                        <ReportItem
                                                            label="T3, T4, TSH (Thyroid)"
                                                            value="Stable"
                                                            unit="Neural Map"
                                                            status="Normal"
                                                            onExplainer={() => setShowAIExplainer({
                                                                title: "TSH (Thyroid)",
                                                                meaning: "This controls your body's metabolism. Everything looks balanced here.",
                                                                impact: "Healthy weight management and energy."
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                {/* AI Explainer Popup */}
                                                {showAIExplainer && (
                                                    <div className="absolute inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl p-8 flex flex-col justify-center animate-scale-up">
                                                        <button
                                                            onClick={() => setShowAIExplainer(null)}
                                                            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                                                        >
                                                            <BsXCircle size={20} />
                                                        </button>
                                                        <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/30">
                                                            <BsActivity className="text-rose-500 text-xl" />
                                                        </div>
                                                        <h4 className="text-xl font-black text-rose-500 mb-2">{showAIExplainer.title}</h4>
                                                        <p className="text-sm font-bold text-white leading-relaxed mb-6">{showAIExplainer.meaning}</p>
                                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Clinical Impact</div>
                                                            <p className="text-xs font-medium text-slate-300">{showAIExplainer.impact}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => setShowAIExplainer(null)}
                                                            className="mt-8 w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 uppercase tracking-widest text-[10px]"
                                                        >
                                                            Got it!
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6 bg-rose-600/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4">
                                                <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0 animate-pulse">
                                                    <BsActivity />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-rose-500 uppercase">AI Clinical Insight</p>
                                                    <p className="text-[10px] font-medium text-slate-400">Collaborative mode is active. The doctor can see your interaction in real-time.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSidebarTab === 'chat' && (
                                        <div className="space-y-6 animate-fade-in flex flex-col h-full">
                                            <h3 className="text-lg font-black flex items-center gap-3">
                                                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                                                    <BsFillChatDotsFill className="text-rose-500" />
                                                </div>
                                                Neural Chat
                                            </h3>
                                            <div className="flex-1 space-y-4 min-h-[300px]">
                                                {messages.map((m, i) => (
                                                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-xs font-medium leading-relaxed ${m.sender === 'user' ? 'bg-rose-600 text-white rounded-tr-none shadow-lg shadow-rose-600/10' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'}`}>
                                                            {m.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* File Upload Simulation */}
                                            <div className="px-2 pb-2">
                                                <button
                                                    onClick={() => {
                                                        setMessages(prev => [...prev, { sender: 'user', text: "📎 Analyzing Medical_Report_2024.pdf..." }]);
                                                        setTimeout(() => {
                                                            setMessages(prev => [...prev, { sender: 'doc', text: "Got it. I see the lipid profile is normal." }]);
                                                        }, 2000);
                                                    }}
                                                    className="w-full py-3 bg-white/5 border border-dashed border-white/10 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2 mb-2"
                                                >
                                                    <BsFileEarmarkArrowUpFill /> UPLOAD MEDICAL HISTORY
                                                </button>
                                            </div>
                                            <form onSubmit={handleSendMessage} className="flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10 sticky bottom-0">
                                                <input
                                                    type="text"
                                                    placeholder="Type here..."
                                                    className="flex-1 bg-transparent px-4 py-2 text-xs outline-none focus:text-white"
                                                    value={chatInput}
                                                    onChange={(e) => setChatInput(e.target.value)}
                                                />
                                                <button className="bg-rose-600 p-3 rounded-xl hover:bg-rose-500 transition-all active:scale-95 shadow-lg shadow-rose-600/10">
                                                    <BsArrowRight className="text-white" />
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 border-t border-white/10 bg-black/20">
                                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4">
                                        <p className="text-[10px] font-bold text-rose-300 leading-relaxed uppercase tracking-widest mb-1">Privacy Guard</p>
                                        <p className="text-[10px] text-slate-500">
                                            This session is end-to-end encrypted. No medical data is stored without your consent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Regular Consultation Triage & Neural Sync Overlay */}
            {
                consultStage !== 'idle' && (
                    <div className="fixed inset-0 z-[250] bg-[#020617]/95 backdrop-blur-3xl text-white flex flex-col items-center justify-center p-6 animate-fade-in">
                        {consultStage === 'triage' && (
                            <div className="max-w-xl w-full text-center space-y-8 animate-scale-up">
                                <div className="w-24 h-24 mx-auto bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/20 ">
                                    <BsActivity className="text-5xl text-rose-500 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Clinical Triage</h2>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Pre-Consultation Assessment</p>
                                </div>

                                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                    <p className="text-xl font-bold mb-8 uppercase tracking-tight">
                                        {consultTriageStep === 0 && "Primary reason for today's consultation?"}
                                        {consultTriageStep === 1 && "Duration of your current symptoms?"}
                                        {consultTriageStep === 2 && "Are you currently on any medication?"}
                                    </p>

                                    <div className="mb-8">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-2">
                                            <span>Assessment Progress</span>
                                            <span>{Math.round(((consultTriageStep + 1) / 3) * 100)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-rose-600 transition-all duration-500"
                                                style={{ width: `${((consultTriageStep + 1) / 3) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {consultTriageStep === 0 && (
                                            <>
                                                <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">General Wellness Check</button>
                                                <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Acute Pain or Discomfort</button>
                                                <button onClick={() => setConsultTriageStep(1)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Follow-up Session</button>
                                            </>
                                        )}
                                        {consultTriageStep === 1 && (
                                            <>
                                                <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Less than 24 Hours</button>
                                                <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">2-5 Days</button>
                                                <button onClick={() => setConsultTriageStep(2)} className="py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all border border-white/5">Chronic (1 Week+)</button>
                                            </>
                                        )}
                                        {consultTriageStep === 2 && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <button onClick={() => setConsultStage('syncing')} className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-600/20 uppercase tracking-widest text-xs">YES, NOTED</button>
                                                <button onClick={() => setConsultStage('syncing')} className="py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all shadow-lg shadow-rose-600/20 uppercase tracking-widest text-xs">NO MEDICATIONS</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {consultStage === 'syncing' && (
                            <div className="max-w-xl w-full text-center space-y-12 animate-scale-up">
                                <div className="relative group">
                                    <div className="absolute inset-x-0 -top-12 text-center">
                                        <div className="flex justify-center gap-1 mb-2">
                                            <div className="w-8 h-2 bg-orange-500 rounded-sm" />
                                            <div className="w-8 h-2 bg-white rounded-sm" />
                                            <div className="w-8 h-2 bg-green-600 rounded-sm" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Tiranga Secure Link</span>
                                    </div>
                                    <div className="w-48 h-48 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative z-10 backdrop-blur-xl">
                                        <AshokChakra size="w-36 h-36" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <BsLightningChargeFill className="text-4xl text-rose-500 animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-rose-500/20 rounded-full animate-ping opacity-30" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-emerald-500/10 rounded-full animate-chakra-pulse" />
                                </div>

                                <div className="space-y-4">
                                    <div className="text-xs font-black text-rose-500 uppercase tracking-[0.4em] animate-pulse">ESTABLISHING NEURAL LINK</div>
                                    <h2 className="text-4xl font-black text-white">SYNCING WITH {selectedDoc.name.toUpperCase()}</h2>
                                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Optimizing Video Feed • Real-time Encryption Active • Neural HUD Sync</p>
                                </div>

                                <div className="max-w-md mx-auto w-full">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-3">
                                        <span>Signal Strength: Excellent</span>
                                        <span>{Math.round(syncProgress)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                                        <div
                                            className="h-full bg-gradient-to-r from-rose-600 to-emerald-600 rounded-full transition-all duration-100"
                                            style={{ width: `${syncProgress}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center gap-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-rose-400 border border-white/10">
                                            <BsShieldCheck />
                                        </div>
                                        <span className="text-[8px] font-black text-slate-500 uppercase">Secure</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                                            <BsCameraVideoFill />
                                        </div>
                                        <span className="text-[8px] font-black text-slate-500 uppercase">HD Live</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                                            <BsAwardFill />
                                        </div>
                                        <span className="text-[8px] font-black text-slate-500 uppercase">Verified</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

            {/* Post-Call Report Modal */}
            {
                showReport && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-2xl animate-fade-in" />
                        <div className="relative z-10 w-full max-w-2xl bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                            <div className="p-10 text-center">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                                    <BsFileEarmarkMedicalFill className="text-4xl text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-black mb-2">Consultation Complete</h2>
                                <p className="text-slate-400 font-medium mb-10">Your neural clinical summary is ready.</p>

                                <div className="space-y-4 text-left mb-10">
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Provisional Diagnosis</span>
                                            <span className="text-xs font-black text-rose-400">Stable Condition</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-200">Slight fatigue detected. High probability of rest-deprivation. Recommended 8 hours sleep and increased hydration.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <BsLightningChargeFill className="text-orange-400 animate-pulse" />
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Advised Medications</span>
                                            <span className="text-xs font-black text-emerald-400">OTC Safe</span>
                                        </div>
                                        <ul className="text-sm font-medium text-slate-200 space-y-1 mb-6">
                                            <li>• Paracetamol 500mg (If fever persists)</li>
                                            <li>• Vitamin C Effervescent (Daily)</li>
                                        </ul>
                                        <button
                                            onClick={() => setShowHoloPrescription(true)}
                                            className="w-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-black py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-sky-500 hover:text-white transition-all group/btn active:scale-95 mb-3"
                                        >
                                            <BsLightningChargeFill className="text-lg" />
                                            GENERATE HOLOGRAPHIC Rx
                                        </button>
                                        <button className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all group/btn active:scale-95">
                                            <BsCartCheckFill className="text-lg group-hover/btn:animate-bounce" />
                                            ORDER VIA <span style={{ color: "#FF9933" }}>SAATHI</span> PHARMACY
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setShowReport(false)}
                                        className="bg-white text-[#0f172a] font-black py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95 text-sm"
                                    >
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => { setShowReport(false); setSelectedDoc(null); }}
                                        className="bg-rose-600 text-white font-black py-4 rounded-2xl hover:bg-rose-500 transition-all active:scale-95 text-sm"
                                    >
                                        Back to Hub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Virtual Neural Health Pod Waiting Room */}
            {
                showHealthPod && (
                    <div className="fixed inset-0 z-[260] bg-[#020617] text-white overflow-hidden flex flex-col items-center justify-center p-6 animate-fade-in">
                        {/* Background Tech Gradients */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.1),transparent_70%)]" />
                            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
                            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
                        </div>

                        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 animate-scale-up">
                                <div>
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                                        NEURAL HEALTH POD ACTIVE
                                    </div>
                                    <h2 className="text-5xl font-black text-white leading-tight">WAITING FOR <br /> <span className="text-rose-500">{selectedDoc?.name.toUpperCase()}</span></h2>
                                    <p className="text-slate-400 text-lg font-medium">Don't just wait. Let's sync your neural profile.</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 backdrop-blur-3xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                                            <BsActivity className="text-3xl text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Neural Vital Scan</p>
                                            <p className="text-xl font-black text-white">HEALTH SCORE: {healthScore}%</p>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                        <div
                                            className="h-full bg-gradient-to-r from-rose-500 via-orange-500 to-emerald-500 rounded-full transition-all duration-300"
                                            style={{ width: `${healthScore}%` }}
                                        />
                                    </div>
                                    <p className="text-xs font-medium text-slate-400 italic">"Your heart rate is steady. Perfect for the consultation!"</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                        <div className="text-rose-500 mb-2"><BsLightningChargeFill /></div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">AI Daily Tip</p>
                                        <p className="text-xs font-bold text-white">Rest 8 hours for better neural sync.</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                        <div className="text-blue-500 mb-2"><BsShieldCheck /></div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Privacy Status</p>
                                        <p className="text-xs font-bold text-white">Quantum Encrypted Link</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative animate-scale-up" style={{ animationDelay: '0.2s' }}>
                                <div className="aspect-square bg-gradient-to-br from-white/5 to-white/[0.02] rounded-[3rem] border border-white/10 backdrop-blur-3xl p-12 flex flex-col items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* DNA Spiral Animation (Simulated) */}
                                    <div className="w-48 h-48 relative mb-8">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute inset-0 border-2 border-rose-500/30 rounded-full animate-ping"
                                                style={{ animationDelay: `${i * 0.5}s`, opacity: 1 - (i * 0.1) }}
                                            />
                                        ))}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl font-black text-white">{healthPodTimer}<span className="text-2xl text-rose-500">s</span></div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-2">Neural Connection EST...</h3>
                                    <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">Optimizing Stream Packets</p>

                                    {/* Terminal Insight Stream HUD */}
                                    <div className="w-full bg-black/40 rounded-xl p-4 font-mono text-[9px] text-emerald-500/80 space-y-1 border border-white/5">
                                        {insightStream.map((line, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                                                <span className="animate-pulse">{line}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 w-full space-y-3">
                                        <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase">
                                            <span>Connection Stability</span>
                                            <span>Ultra High</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[95%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Nav */}
                        <div className="absolute bottom-10 left-10 flex gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <span className="text-rose-500"><span style={{ color: "#FF9933" }}>SEHAAT</span> <span style={{ color: "#138808" }}>SAATHI</span> PLATFORM v2.5</span>
                            <span>•</span>
                            <span>NEURAL HUB READY</span>
                            <span>•</span>
                            <span>SECURE LAYER ACTIVE</span>
                        </div>
                    </div>
                )
            }

            {/* Doctor Profile Modal */}
            {
                viewingDocProfile && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md animate-fade-in" onClick={() => setViewingDocProfile(null)} />
                        <div className="relative z-10 w-full max-w-lg bg-[#0f172a] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-scale-up">
                            <div className="h-32 bg-gradient-to-r from-rose-500/20 to-orange-500/20 relative">
                                <button
                                    onClick={() => setViewingDocProfile(null)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                                >
                                    <BsXCircle />
                                </button>
                            </div>
                            <div className="px-8 pb-8 -mt-16 text-center">
                                <div className="relative inline-block mb-4">
                                    <div className={`absolute inset-0 bg-${viewingDocProfile.color}-500 blur-2xl opacity-40`} />
                                    <img src={viewingDocProfile.image} alt={viewingDocProfile.name} className="w-32 h-32 rounded-[2rem] object-cover border-4 border-[#0f172a] relative z-10"  loading="lazy" />
                                </div>
                                <h2 className="text-2xl font-black mb-1">{viewingDocProfile.name}</h2>
                                <p className="text-rose-400 font-bold text-sm uppercase tracking-widest mb-6">{viewingDocProfile.specialty}</p>

                                <div className="grid grid-cols-3 gap-2 mb-8">
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.rating}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Rating</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.experience}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Exp</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                        <div className="text-xl font-black text-white">{viewingDocProfile.patients || "2k+"}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase">Patients</div>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                                    {viewingDocProfile.bio || <>An experienced specialist dedicated to providing top-tier medical care via <span style={{ color: "#FF9933" }}>Sehaat</span> <span style={{ color: "#138808" }}>Saathi</span>'s neural network.</>}
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => { setViewingDocProfile(null); handleConsultClick(viewingDocProfile); }}
                                        className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-rose-600/20 active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        Book Instant Consult - ₹{viewingDocProfile.fee}
                                    </button>
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 text-xs uppercase tracking-widest">
                                        View Full Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Availability Slots Modal */}
            {
                viewingSlots && (
                    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
                        <div className="bg-[#0f172a] border border-white/10 rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            <div className="sticky top-0 bg-gradient-to-b from-rose-500/20 to-transparent p-8 pb-24 relative z-10">
                                <button
                                    onClick={() => setViewingSlots(null)}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all text-slate-400 hover:text-white"
                                >
                                    <BsXCircle className="text-xl" />
                                </button>

                                <div className="flex items-center gap-4 mb-4">
                                    <img src={viewingSlots.image} alt={viewingSlots.name} className="w-16 h-16 rounded-2xl object-cover"  loading="lazy" />
                                    <div>
                                        <h2 className="text-2xl font-black">{viewingSlots.name}</h2>
                                        <p className="text-rose-400 font-bold text-sm uppercase">{viewingSlots.specialty}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 pb-8 -mt-16">
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <BsCalendarCheck className="text-blue-500" /> Available Time Slots
                                </h3>

                                {/* Today's Slots */}
                                <div className="mb-8">
                                    <div className="text-sm font-black text-slate-400 uppercase mb-4">Today</div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {viewingSlots.nextSlots?.filter(slot => slot.includes('Today')).map((slot, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setViewingSlots(null);
                                                    handleConsultClick(viewingSlots);
                                                }}
                                                className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl hover:bg-blue-500/20 transition-all group"
                                            >
                                                <div className="text-xs font-black text-blue-400 mb-1">
                                                    {slot.replace('Today ', '')}
                                                </div>
                                                <div className="text-[9px] text-slate-400 group-hover:text-white transition-colors">
                                                    Click to book
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tomorrow's Slots */}
                                <div className="mb-8">
                                    <div className="text-sm font-black text-slate-400 uppercase mb-4">Tomorrow</div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {viewingSlots.nextSlots?.filter(slot => slot.includes('Tomorrow')).map((slot, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setViewingSlots(null);
                                                    handleConsultClick(viewingSlots);
                                                }}
                                                className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl hover:bg-emerald-500/20 transition-all group"
                                            >
                                                <div className="text-xs font-black text-emerald-400 mb-1">
                                                    {slot.replace('Tomorrow ', '')}
                                                </div>
                                                <div className="text-[9px] text-slate-400 group-hover:text-white transition-colors">
                                                    Click to book
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Queue Info */}
                                {viewingSlots.queuePosition > 0 && (
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-center">
                                        <div className="text-3xl font-black text-orange-400 mb-2">{viewingSlots.queuePosition}</div>
                                        <div className="text-sm text-slate-400">Patients in queue</div>
                                        <div className="text-xs text-slate-500 mt-2">Estimated wait: ~{viewingSlots.waitTime} minutes</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Doctor Comparison Modal */}
            {
                compareMode && compareDoctors.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 z-[190] bg-[#0f172a] border-t border-white/10 p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] animate-slide-up">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black flex items-center gap-2">
                                    ⚖️ Comparing Doctors ({compareDoctors.length}/3)
                                </h3>
                                <button
                                    onClick={() => {
                                        setCompareMode(false);
                                        setCompareDoctors([]);
                                    }}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all"
                                >
                                    Close Comparison
                                </button>
                            </div>

                            <div className="overflow-x-auto pb-8">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-4 text-xs font-black text-slate-500 uppercase">Metrics</th>
                                            {compareDoctors.map(doc => (
                                                <th key={doc.id} className="p-4 min-w-[250px]">
                                                    <div className="flex items-center gap-3">
                                                        <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover"  loading="lazy" />
                                                        <div>
                                                            <div className="font-black text-white">{doc.name}</div>
                                                            <div className="text-[10px] text-rose-500 font-bold uppercase">{doc.specialty}</div>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[
                                            { label: 'AI Match Score', key: 'dynamicMatch', suffix: '%', highlight: true },
                                            { label: 'Rating', key: 'rating', icon: <BsStarFill className="text-orange-400" /> },
                                            { label: 'Experience', key: 'experience' },
                                            { label: 'Consultation Fee', key: 'fee', prefix: '₹', color: 'text-emerald-400' },
                                            { label: 'Success Rate', key: 'successRate', suffix: '%' },
                                            { label: 'Wait Time', key: 'waitTime', suffix: ' mins' },
                                            { label: 'Response Time', key: 'response' }
                                        ].map((row, idx) => (
                                            <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4 text-xs font-bold text-slate-400 uppercase">{row.label}</td>
                                                {compareDoctors.map(doc => (
                                                    <td key={doc.id} className="p-4">
                                                        <div className={`font-black flex items-center gap-2 ${row.color || 'text-white'} ${row.highlight ? 'text-lg text-rose-500 animate-pulse' : ''}`}>
                                                            {row.icon} {row.prefix}{doc[row.key]}{row.suffix}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        {/* Vibe Tags Row */}
                                        <tr className="border-b border-white/5">
                                            <td className="p-4 text-xs font-bold text-slate-400 uppercase">AI Vibe Analysis</td>
                                            {compareDoctors.map(doc => (
                                                <td key={doc.id} className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {doc.vibeTags?.map((vibe, vIdx) => (
                                                            <span key={vIdx} className="px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-md text-[9px] font-black uppercase">
                                                                {vibe}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* Action Row */}
                                        <tr>
                                            <td className="p-4"></td>
                                            {compareDoctors.map(doc => (
                                                <td key={doc.id} className="p-4">
                                                    <button
                                                        onClick={() => {
                                                            setCompareMode(false);
                                                            setCompareDoctors([]);
                                                            handleConsultClick(doc);
                                                        }}
                                                        className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all text-[10px] uppercase tracking-widest active:scale-95"
                                                    >
                                                        Book This Doctor
                                                    </button>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* AI Symptom Analyzer Modal */}
            {
                showSymptomAnalyzer && (
                    <div className="fixed inset-0 z-[210] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in">
                        <div className="bg-[#0f172a] border border-white/10 rounded-[3rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            <div className="sticky top-0 bg-gradient-to-b from-blue-500/20 to-transparent p-8 pb-24 relative z-10">
                                <button
                                    onClick={() => {
                                        setShowSymptomAnalyzer(false);
                                        setSymptomInput('');
                                        setSymptomAnalysis(null);
                                    }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all text-slate-400 hover:text-white"
                                >
                                    <BsXCircle className="text-xl" />
                                </button>

                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
                                        <BsLightningChargeFill className="text-4xl text-white" />
                                    </div>
                                    <h2 className="text-3xl font-black mb-2">AI Smart Doctor Finder</h2>
                                    <p className="text-slate-400 text-sm">Describe your symptoms and let AI recommend the best doctor for you</p>
                                </div>
                            </div>

                            <div className="px-8 pb-8 -mt-16">
                                {!symptomAnalysis ? (
                                    <>
                                        <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
                                            <button
                                                onClick={() => setSelectedBodyPart(null)}
                                                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${!selectedBodyPart ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                                            >
                                                DESCRIBE SYMPTOMS
                                            </button>
                                            <button
                                                onClick={() => setSelectedBodyPart('head')}
                                                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${selectedBodyPart ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                                            >
                                                QUICK MAP MODE
                                            </button>
                                        </div>

                                        {selectedBodyPart ? (
                                            <BodyMap />
                                        ) : (
                                            <div className="mb-6">
                                                <label className="text-sm font-bold text-slate-400 uppercase mb-3 block">What brings you here today?</label>
                                                <textarea
                                                    value={symptomInput}
                                                    onChange={(e) => setSymptomInput(e.target.value)}
                                                    placeholder="E.g., I have chest pain and shortness of breath..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder-slate-500 outline-none focus:border-rose-500/50 transition-all min-h-[150px] resize-none"
                                                />
                                            </div>
                                        )}

                                        <button
                                            onClick={analyzeSymptoms}
                                            disabled={(!symptomInput.trim() && !selectedBodyPart) || analyzingSymptoms}
                                            className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-black rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {analyzingSymptoms ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Analyzing {selectedBodyPart ? 'Neural Scan' : 'Symptoms'}...
                                                </>
                                            ) : (
                                                <>
                                                    <BsLightningChargeFill /> {selectedBodyPart ? 'Run Neural Diagnostics' : 'Analyze & Find Doctors'}
                                                </>
                                            )}
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-6 animate-scale-up">
                                        {/* Urgency Alert */}
                                        <div className={`p-6 rounded-2xl border-2 ${symptomAnalysis.urgency === 'URGENT'
                                            ? 'bg-red-500/10 border-red-500/30'
                                            : symptomAnalysis.urgency === 'ROUTINE'
                                                ? 'bg-blue-500/10 border-blue-500/30'
                                                : 'bg-emerald-500/10 border-emerald-500/30'
                                            }`}>
                                            <div className="flex items-center gap-3 mb-2">
                                                {symptomAnalysis.urgency === 'URGENT' && <BsExclamationTriangleFill className="text-2xl text-red-500" />}
                                                <h3 className="text-xl font-black">{symptomAnalysis.urgency} CASE</h3>
                                            </div>
                                            <p className="text-sm text-slate-400">
                                                Recommended Specialty: <span className="text-white font-bold">{symptomAnalysis.specialty}</span>
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                Estimated Duration: <span className="text-white font-bold">{symptomAnalysis.estimatedDuration}</span>
                                            </p>
                                        </div>

                                        {/* Recommended Doctors */}
                                        <div>
                                            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                                🏆 Top Recommended Doctors ({symptomAnalysis.recommendedDoctors.length})
                                            </h3>
                                            <div className="space-y-4">
                                                {symptomAnalysis.recommendedDoctors.map((doc, idx) => (
                                                    <div key={doc.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-rose-500/50 transition-all">
                                                        <div className="flex items-start gap-4">
                                                            <div className="relative flex-shrink-0">
                                                                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover"  loading="lazy" />
                                                                {idx === 0 && (
                                                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-black">
                                                                        #{idx + 1}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <div>
                                                                        <h4 className="text-lg font-black">{doc.name}</h4>
                                                                        <p className="text-rose-400 text-sm font-bold uppercase">{doc.specialty}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="text-xl font-black text-emerald-400">₹{doc.fee}</div>
                                                                        <div className="text-xs text-slate-400">{doc.status}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4 mb-3">
                                                                    <div className="flex items-center gap-1 text-sm">
                                                                        <BsStarFill className="text-orange-400 text-xs" />
                                                                        <span className="font-bold">{doc.rating}</span>
                                                                    </div>
                                                                    <div className="text-sm text-slate-400">{doc.experience}</div>
                                                                    <div className="text-sm text-emerald-400">{doc.successRate}% Success</div>
                                                                </div>
                                                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-3">
                                                                    <div className="text-xs font-bold text-blue-400 mb-1">Why This Doctor?</div>
                                                                    <div className="text-xs text-white">{doc.matchReason}</div>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowSymptomAnalyzer(false);
                                                                        if (doc.queuePosition > 0) {
                                                                            startWaitingRoom(doc);
                                                                        } else {
                                                                            handleConsultClick(doc);
                                                                        }
                                                                    }}
                                                                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all text-sm"
                                                                >
                                                                    Book This Doctor Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSymptomAnalysis(null);
                                                setSymptomInput('');
                                            }}
                                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm"
                                        >
                                            ← Try Different Symptoms
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Phase 2: Zen Waiting Lounge */}
            {
                showWaitingRoom && waitingRoomData && (
                    <div className="fixed inset-0 z-[220] bg-[#020617] backdrop-blur-3xl flex items-center justify-center p-6 animate-fade-in overflow-hidden">
                        {/* Background Calm Visualizer */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-8">
                                <div className="animate-scale-up">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase mb-4 tracking-widest">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                        Zen Waiting Lounge Active
                                    </div>
                                    <h2 className="text-4xl font-black text-white mb-2 leading-tight uppercase">Preparing Your <br /><span className="text-rose-500">Neural Link</span></h2>
                                    <p className="text-slate-400 font-medium italic">Take a deep breath while {waitingRoomData.name} prepares for your session.</p>
                                </div>

                                {/* Breathing Visualizer */}
                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:bg-white/10">
                                    <div className="w-48 h-48 relative flex items-center justify-center mb-6">
                                        {/* Expanding Circle */}
                                        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-[ping_4s_infinite]" />
                                        <div className="absolute inset-4 border-2 border-emerald-500/20 rounded-full animate-[pulse_4s_infinite]" />
                                        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] relative z-10">
                                            <div className="text-white text-center">
                                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Wait Time</div>
                                                <div className="text-3xl font-black">{queueTimer}<span className="text-sm">s</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center relative z-10">
                                        <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-1 animate-bounce">Breath In... Breath Out</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Optimizing physiological state for consultation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 animate-scale-up" style={{ animationDelay: '0.2s' }}>
                                {/* Health Trivia Card */}
                                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden">
                                    <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tighter">AI Health Insights</h3>
                                    <div className="space-y-4">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-slate-300">
                                            <p className="text-xs font-bold leading-relaxed italic">
                                                "Did you know? Regular deep breathing can lower stress markers by up to 20% within minutes, leading to better diagnostic clarity."
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                                                <div className="text-[9px] font-black text-emerald-500 uppercase mb-1">Queue Position</div>
                                                <div className="text-xl font-black text-white">#{waitingRoomData.queuePosition || 1}</div>
                                            </div>
                                            {/* Phase 5: Biometric Web HUD */}
                                            <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Biometric Web</span>
                                                    <div className="flex gap-1">
                                                        <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping [animation-delay:0.2s]" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                                                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Stress (AI)</p>
                                                        <p className="text-xl font-black text-white">{Math.round(biometricWeb.stress)}<span className="text-[10px] text-slate-500 ml-1">%</span></p>
                                                    </div>
                                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                                                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Mood Logic</p>
                                                        <p className="text-xl font-black text-emerald-400">{biometricWeb.mood}</p>
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-rose-500 via-sky-500 to-emerald-500" style={{ width: `${biometricWeb.focus}%` }} />
                                                </div>
                                                <p className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-widest">Cognitive Focus Sync: {biometricWeb.focus}%</p>
                                            </div>

                                            {/* Call Timer */}
                                            <div className="bg-rose-600 px-6 py-3 rounded-2xl shadow-lg shadow-rose-600/20 text-center border border-rose-400/30">
                                                <div className="text-[9px] font-black text-blue-500 uppercase mb-1">Neural Sync</div>
                                                <div className="text-xl font-black text-white">ACTIVE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={waitingRoomData.image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-rose-500/20" alt={waitingRoomData.name}  loading="lazy" />
                                        <div>
                                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Consultant Active</p>
                                            <p className="text-sm font-black text-white">{waitingRoomData.name} is finalizing connection...</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-1 flex-1 bg-rose-500 rounded-full animate-pulse" />
                                        <div className="h-1 flex-1 bg-rose-500 rounded-full animate-pulse delay-75" />
                                        <div className="h-1 flex-1 bg-white/10 rounded-full" />
                                    </div>
                                </div>

                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <BsPersonFill className="text-emerald-400" />
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Family-Pulse Connect</span>
                                        </div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mb-4 font-bold uppercase tracking-tighter italic">Invite a family member to join this consultation in real-time.</p>
                                    <button
                                        onClick={() => alert("Family-Pulse: Invitation link sent via Neural-SMS and WhatsApp. They can join the waiting room now!")}
                                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                                    >
                                        <BsTranslate /> Invite Family Member
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        setShowWaitingRoom(false);
                                        setWaitingRoomData(null);
                                    }}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black rounded-2xl transition-all border border-white/10 text-[10px] uppercase tracking-widest"
                                >
                                    Cancel & Exit Queue
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Flash Booking Notification */}
            {
                showFlashBooking && flashSlot && (
                    <div className="fixed top-24 right-6 z-[230] animate-slide-up">
                        <div className="bg-gradient-to-r from-orange-500 to-rose-500 border-2 border-white/20 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                                        <BsLightningChargeFill className="text-3xl text-orange-500 animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-black text-white">⚡ FLASH SLOT!</h3>
                                        <div className="bg-white/20 px-2 py-1 rounded-lg text-xs font-black text-white">
                                            {flashTimer}s
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/90 mb-3">
                                        <strong>{flashSlot.name}</strong> - {flashSlot.specialty}
                                    </p>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="text-sm text-white/70 line-through">₹{flashSlot.originalFee}</div>
                                        <div className="text-xl font-black text-white">₹{flashSlot.flashFee}</div>
                                        <div className="bg-emerald-500 px-2 py-1 rounded-lg text-xs font-black text-white">
                                            SAVE ₹{flashSlot.originalFee - flashSlot.flashFee}
                                        </div>
                                    </div>
                                    <div className="text-xs text-white/80 mb-4">
                                        📅 {flashSlot.slot}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setShowFlashBooking(false);
                                                handleConsultClick(flashSlot);
                                            }}
                                            className="flex-1 py-2 bg-white hover:bg-white/90 text-orange-600 font-black rounded-xl transition-all text-sm"
                                        >
                                            GRAB NOW!
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowFlashBooking(false);
                                                setFlashSlot(null);
                                            }}
                                            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Sehaat SOS Triage & Geo-Dispatch Overlay */}
            {
                emergencyStage !== 'idle' && emergencyStage !== 'connected' && (
                    <div className="fixed inset-0 z-[250] bg-black text-white flex flex-col items-center justify-center p-6">
                        {emergencyStage === 'triage' && (
                            <div className="max-w-xl w-full text-center space-y-8 animate-scale-up">
                                <div className="w-24 h-24 mx-auto bg-rose-600 rounded-full flex items-center justify-center animate-ping">
                                    <BsExclamationTriangleFill className="text-5xl text-white" />
                                </div>
                                <h2 className="text-4xl font-black text-rose-500 tracking-tighter uppercase">SOS TRIAGE PROTCOL</h2>

                                <div className="bg-[#0f172a] p-8 rounded-[2rem] border-2 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                                    <p className="text-xl font-bold mb-8 uppercase tracking-widest">
                                        {triageStep === 0 && "Is the patient conscious?"}
                                        {triageStep === 1 && "Is there severe bleeding?"}
                                        {triageStep === 2 && "Are they experiencing chest pain?"}
                                    </p>
                                    {/* Triage Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                                            <span>Question {triageStep + 1} of 3</span>
                                            <span>{Math.round(triageProgress)}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-rose-600 to-orange-600 transition-all duration-500 ease-out"
                                                style={{ width: `${triageProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => {
                                                if (triageStep < 2) setTriageStep(prev => prev + 1);
                                                else setEmergencyStage('locating');
                                            }}
                                            className="py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl transition-all"
                                        >
                                            YES
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (triageStep < 2) setTriageStep(prev => prev + 1);
                                                else setEmergencyStage('locating');
                                            }}
                                            className="py-6 bg-slate-700 hover:bg-slate-600 text-white font-black text-xl rounded-2xl transition-all"
                                        >
                                            NO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {emergencyStage === 'locating' && (
                            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Radar Map Animation */}
                                <div className="absolute inset-0 z-0 opacity-30">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-rose-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-rose-500/40 rounded-full animate-[ping_3s_linear_infinite_0.5s]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-rose-500/50 rounded-full animate-[ping_3s_linear_infinite_1s]" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_100%)]" />
                                </div>

                                <div className="relative z-10 text-center space-y-6">
                                    <div className="text-sm font-black text-rose-500 uppercase tracking-[0.5em] animate-pulse">Neural Satellite Link Active</div>
                                    <h2 className="text-5xl font-black text-white">DISPATCHING AMBULANCE</h2>
                                    <div className="flex items-center justify-center gap-4 text-emerald-400 font-bold bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/30 mx-auto w-fit">
                                        <BsGeoAltFill /> GPS LOCKED: SECTOR 62, NOIDA
                                    </div>
                                    {/* Geo-Dispatch Progress Bar */}
                                    <div className="max-w-md mx-auto mt-8">
                                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                                            <span>Locating Nearest Partner</span>
                                            <span>{Math.round(geoProgress)}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-600 to-rose-600 transition-all duration-100"
                                                style={{ width: `${geoProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Simulated Progress */}
                                <button
                                    onClick={() => {
                                        setEmergencyStage('connected');
                                        handleConsultClick(TELE_DOCTORS[0]); // Auto-connect to Emergency Doc
                                    }}
                                    className="mt-12 opacity-0 animate-[fade-in_1s_ease-out_3s_forwards] px-8 py-3 bg-rose-600 font-black rounded-xl"
                                >
                                    CONNECTION ESTABLISHED (CLICK TO START)
                                </button>
                            </div>
                        )}
                    </div>
                )
            }

            {/* Success Celebration Overlay */}
            {
                showCelebration && (
                    <div className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center">
                        <div className="animate-scale-up">
                            <div className="text-9xl animate-bounce">🎉</div>
                        </div>
                        {/* Confetti Effect */}
                        <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-3 h-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-[confetti_3s_ease-out_forwards]"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: '-20px',
                                        animationDelay: `${Math.random() * 0.5}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Phase 2: AI Virtual Vitals Hub */}
            {
                showVitalsSync && (
                    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in overflow-hidden">
                        {/* Futuristic Scanning Background */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent animate-pulse" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-scan" style={{ animationDuration: '3s' }} />
                        </div>

                        <div className="max-w-2xl w-full bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 relative z-10 shadow-[0_0_100px_rgba(244,63,94,0.1)]">
                            <div className="text-center mb-12">
                                <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative group">
                                    <BsHeartPulseFill className="text-5xl text-rose-500 animate-pulse" />
                                    <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping opacity-20" />
                                </div>
                                <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-white">AI Virtual Vitals Sync</h2>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Bridging Bio-Data for Precision Care</p>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Syncing Neuro-Vitals</span>
                                        <span className="text-sm font-black text-white">{syncProgress}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-rose-600 to-orange-500 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ width: `${syncProgress}%` }} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                        <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 text-xl font-black">
                                            {syncProgress > 30 ? <BsShieldCheck /> : <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Heart Rate Analysis</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 text-xl font-black">
                                            {syncProgress > 60 ? <BsShieldCheck /> : <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase">SpO2 Metadata</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 text-xl font-black">
                                            {syncProgress > 80 ? <BsShieldCheck /> : <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Blood Pressure Est.</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 text-xl font-black">
                                            {syncProgress === 100 ? <BsShieldCheck /> : <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase">Vital-Link Secure</div>
                                    </div>
                                </div>
                            </div>

                            {syncProgress === 100 ? (
                                <button
                                    onClick={() => {
                                        setShowVitalsSync(false);
                                        setShowHealthPodEntrance(true);
                                        setTimeout(() => {
                                            setShowHealthPodEntrance(false);
                                            if (selectedDoc.queuePosition > 0) {
                                                startWaitingRoom(selectedDoc);
                                            } else {
                                                setIsPaying(true);
                                                setPaymentStep(1);
                                            }
                                        }, 4000);
                                    }}
                                    className="w-full py-5 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-black rounded-3xl transition-all shadow-2xl shadow-rose-600/20 active:scale-95 uppercase tracking-widest text-sm animate-scale-up"
                                >
                                    Enter Health Pod
                                </button>
                            ) : (
                                <div className="text-center text-slate-500 font-black uppercase text-xs tracking-widest animate-pulse">
                                    Analyzing Biometric Stream...
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Phase 2: Cinematic Health Pod Entrance */}
            {
                showHealthPodEntrance && (
                    <div className="fixed inset-0 z-[400] bg-[#020617] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent" />

                        <div className="relative z-10 text-center scale-150">
                            <div className="w-40 h-40 mx-auto mb-12 relative">
                                <div className="absolute inset-0 border-[6px] border-blue-500/50 rounded-full animate-ping" />
                                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border border-rose-500/30 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BsLightningChargeFill className="text-6xl text-white animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-500">
                                    INITIALIZING LINK
                                </h2>
                                <div className="flex justify-center gap-4">
                                    <div className="text-xs font-black text-emerald-400 animate-pulse">SECURE</div>
                                    <div className="text-xs font-black text-blue-400 animate-pulse delay-75">ENCRYPTED</div>
                                    <div className="text-xs font-black text-rose-400 animate-pulse delay-150">SYNCED</div>
                                </div>
                            </div>
                        </div>

                        {/* Laser Ray-Tracing Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/50 blur-[2px] animate-[pulse_0.1s_infinite]" />
                            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-rose-500/50 blur-[2px] animate-[pulse_0.1s_infinite]" />
                        </div>
                    </div>
                )
            }

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-up {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scan { animation: scan 3s linear infinite; }
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244, 63, 94, 0.2); border-radius: 10px; }
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                @keyframes heart-beat {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(244, 63, 94, 0.5)); }
                    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(244, 63, 94, 0.8)); }
                }
                @keyframes ticker-slide {
                    0% { transform: translateY(100%); opacity: 0; }
                    10% { transform: translateY(0); opacity: 1; }
                    90% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-100%); opacity: 0; }
                }
                .animate-ticker { animation: ticker-slide 4s ease-in-out infinite; }
                .animate-heart { animation: heart-beat var(--heart-duration, 0.8s) ease-in-out infinite; }
                @keyframes neural-pulse {
                    0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); }
                }
                .animate-neural-pulse { animation: neural-pulse 2s infinite; }
                .glass-premium {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px) saturate(180%);
                    -webkit-backdrop-filter: blur(20px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .cyber-glow {
                    position: relative;
                }
                .cyber-glow::before {
                    content: '';
                    position: absolute;
                    inset: -1px;
                    background: linear-gradient(45deg, #f43f5e, #fb923c, #f43f5e);
                    background-size: 200% 200%;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: exclude;
                    z-index: 1;
                    border-radius: inherit;
                    animation: glow-move 4s linear infinite;
                    opacity: 0.5;
                }
                @keyframes glow-move {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes wave {
                    0%, 100% { height: 10%; }
                    50% { height: 70%; }
                }
                .animate-wave { animation: wave 1s ease-in-out infinite; }
                .glitch-text { animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
                @keyframes glitch {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
                .hologram-card {
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease;
                }
                .hologram-card:hover {
                    transform: rotateY(15deg) rotateX(10deg);
                }
                .hologram-glow {
                    background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(244, 63, 94, 0.2));
                    box-shadow: 0 0 50px rgba(56, 189, 248, 0.3);
                }
                .orb-glow {
                    box-shadow: 0 0 20px rgba(56, 189, 248, 0.4), inset 0 0 10px rgba(56, 189, 248, 0.2);
                    animation: orb-pulse 2s ease-in-out infinite;
                }
                @keyframes orb-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 30px rgba(56, 189, 248, 0.6); }
                }

            `}</style>

            {/* Phase 4: Neural Gateway Overlay */}
            {
                showNeuralGateway && (
                    <div className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center text-white p-6 animate-fade-in">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 border-2 border-rose-500/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            <div className="w-24 h-24 bg-rose-500/10 rounded-full border border-rose-500/30 flex items-center justify-center relative z-10 animate-pulse">
                                <BsLightningChargeFill className="text-4xl text-rose-500" />
                            </div>
                        </div>

                        <div className="text-center space-y-4 max-w-md w-full">
                            <h2 className="text-2xl font-black uppercase tracking-[0.4em] text-white">Neural Authorization</h2>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-rose-500 transition-all duration-1000"
                                    style={{ width: `${(gatewayStep / 4) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest animate-pulse h-4">
                                {gatewayStep === 1 && "Initializing Quantum Core..."}
                                {gatewayStep === 2 && "Scanning Biometric Signature..."}
                                {gatewayStep === 3 && "Establishing Secure Proxy..."}
                                {gatewayStep === 4 && "Access Granted: Welcome Citizen"}
                            </p>
                        </div>

                        <div className="absolute bottom-12 text-[8px] font-black text-slate-700 uppercase tracking-[0.5em]">
                            Sehaat Saathi • Neural Health Hub v4.0
                        </div>
                    </div>
                )
            }


            {/* Phase 5: Holographic Prescription Pop-up */}
            {
                showHoloPrescription && (
                    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-3xl animate-fade-in">
                        <div className="relative hologram-card w-full max-w-sm">
                            <div className="hologram-glow p-8 rounded-[3rem] border border-sky-400/30 text-white relative z-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.4),transparent_70%)]" />
                                <div className="relative z-20 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                            <BsLightningChargeFill className="text-2xl text-sky-400" />
                                        </div>
                                        <button onClick={() => setShowHoloPrescription(false)} className="text-slate-500 hover:text-white">
                                            <BsXCircle size={20} />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em]">Holographic Rx</p>
                                        <h3 className="text-2xl font-black">NEURAL PRESCRIPTION</h3>
                                    </div>
                                    <div className="space-y-4 py-6 border-y border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400">PATIENT ID</span>
                                            <span className="text-xs font-black text-white">SS-7892-QX</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400">MEDICATION</span>
                                            <span className="text-xs font-black text-sky-400">Paracetamol 500mg</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400">DOSAGE</span>
                                            <span className="text-xs font-black text-white">Twice Daily (SOS)</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowHoloPrescription(false)}
                                        className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-500/20 uppercase tracking-widest text-[10px]"
                                    >
                                        AUTHORIZE & SYNC
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Phase 6: Mithra AI Floating Assistant FAB */}
            <div className="fixed bottom-8 left-8 z-[300] group">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                <button
                    onClick={() => alert("Mithra AI: Namaste! I am your Sentinel Assistant. How can I help you navigate the Consultations Hub today?")}
                    className="relative w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all hover:scale-110 active:scale-90 group"
                >
                    <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-40" />
                    <span className="group-hover:animate-bounce">🤖</span>
                </button>
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 pointer-events-none">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Mithra Sentinel AI</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Ready to assist you 24/7</p>
                </div>
            </div>
        </div >
    );
};

const VitalProgress = ({ label, value, progress, color }) => {
    const colors = {
        emerald: 'bg-emerald-500 text-emerald-400',
        rose: 'bg-rose-500 text-rose-400',
        blue: 'bg-blue-500 text-blue-400',
        orange: 'bg-orange-500 text-orange-400'
    };
    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                <span className={`text-xs md:text-sm font-black ${colors[color].split(' ')[1]}`}>{value}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${colors[color].split(' ')[0]} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

const ReportItem = ({ label, value, unit, status, color = 'emerald', onExplainer }) => {
    const statusColors = {
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };

    return (
        <div className="flex items-center justify-between group/item border-b border-white/5 pb-4 last:border-0 last:pb-0">
            <div className="space-y-0.5 md:space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm font-bold text-white">{label}</span>
                    <button
                        onClick={onExplainer}
                        className="text-[7px] md:text-[8px] font-black text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover/item:opacity-100"
                    >
                        AI EXPLAIN
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-black text-white">{value}</span>
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-500">{unit}</span>
                </div>
            </div>
            <div className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border text-[8px] md:text-[10px] font-black uppercase tracking-widest ${statusColors[color]}`}>
                {status}
            </div>
        </div>
    );
};

const WaveVisualizer = () => (
    <div className="flex items-end gap-0.5 h-6">
        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="w-1 bg-orange-500 rounded-full animate-wave"
                style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }}
            />
        ))}
    </div>
);

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default TeleConsultAI;


