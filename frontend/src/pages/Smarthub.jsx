import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    BsStars, BsActivity, BsShieldCheck, BsTruck,
    BsArrowRight, BsInfoCircle, BsChatDots, BsPhone, BsCapsule, BsShieldFillPlus, BsBellFill, BsCpuFill, BsCameraFill, BsCartCheck, BsPeopleFill, BsDropletFill, BsHeartPulse, BsFileEarmarkMedical, BsInboxesFill, BsGenderFemale
} from "react-icons/bs";

const Smarthub = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [aiInsight, setAiInsight] = useState('');
    const MOCK_INSIGHT = "Based on your last 6 months of data, your Vitamin D levels are slightly low. I recommend 15 mins of morning sun.";

    useEffect(() => {
        if (activeTab === 'analytics') {
            let i = 0;
            setAiInsight('');
            const interval = setInterval(() => {
                setAiInsight(MOCK_INSIGHT.slice(0, i));
                i++;
                if (i > MOCK_INSIGHT.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    // Mock data for AI Health Trends
    const healthData = [
        { month: 'Jan', glucose: 110, hemoglobin: 13.5, fitness: 65 },
        { month: 'Feb', glucose: 105, hemoglobin: 13.8, fitness: 68 },
        { month: 'Mar', glucose: 120, hemoglobin: 13.6, fitness: 64 },
        { month: 'Apr', glucose: 115, hemoglobin: 14.1, fitness: 72 },
        { month: 'May', glucose: 108, hemoglobin: 14.2, fitness: 78 },
        { month: 'Jun', glucose: 102, hemoglobin: 14.5, fitness: 85 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-5 sm:px-10 mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
                    <BsStars className="w-96 h-96 animate-pulse" />
                </div>
                <div className="container mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/20">
                            <BsStars className="text-orange-400" />
                            <span className="text-sm font-bold tracking-wide uppercase">Innovation Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Next-Gen <span className="text-orange-400">AI Health</span> Services
                        </h1>
                        <p className="text-lg md:text-xl text-green-50/90 leading-relaxed mb-8">
                            Experience the future of healthcare. From AI-driven analytics to real-time tracking,
                            we're building a smarter Saathi for your health journey.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-0">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 sticky top-24 z-40">
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'analytics' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <BsActivity /> AI Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'upcoming' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <BsStars /> Upcoming Features
                    </button>
                </div>

                {/* Feature Sections */}
                {activeTab === 'analytics' && (
                    <div className="space-y-10 animate-fade-in">
                        {/* Health Score Gauge & AI Summary */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Health Trend Analysis</h2>
                                        <p className="text-gray-500">AI-generated historical data insights</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Glucose</span>
                                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Fitness Score</span>
                                    </div>
                                </div>
                                <div className="p-8 h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={healthData}>
                                            <defs>
                                                <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="glucose" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" />
                                            <Line type="monotone" dataKey="fitness" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316' }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <BsActivity className="w-32 h-32" />
                                    </div>
                                    <div className="z-10">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                            <BsShieldCheck className="text-2xl" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">AI Health Summary</h3>
                                        <div className="min-h-[80px]">
                                            <p className="text-indigo-100/80 leading-relaxed mb-6 italic">
                                                "{aiInsight}"<span className="animate-pulse">|</span>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="bg-white text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors z-10 w-full active:scale-95">
                                        Download Full Report
                                    </button>
                                </div>

                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold flex items-center gap-2">
                                            <BsActivity className="text-green-500" /> Health Index
                                        </h4>
                                        <span className="text-sm font-black text-green-600">82/100</span>
                                    </div>
                                    {/* Circular Progress (CSS based) */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-32 h-32 rounded-full border-8 border-gray-100 relative flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent -rotate-45"></div>
                                            <span className="text-3xl font-black text-gray-800">82%</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 text-gray-600 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            Glucose levels dropping steadily.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-green-500 font-bold">•</span>
                                            Fitness activity up by 20%.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'upcoming' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
                        <Link to="/express-track">
                            <FeatureRoadmapCard
                                icon={<BsTruck />}
                                title="Sehaat Express"
                                desc="Real-time live tracking of home sample collection technicians. See them moving on the map!"
                                color="orange"
                                status="Live Demo"
                            />
                        </Link>
                        <Link to="/doctor-ai">
                            <FeatureRoadmapCard
                                icon={<BsChatDots />}
                                title="Sehaat AI Doctor"
                                desc="Instant one-on-one health chat like Gemini. Ask symptoms, get diet advice and medical guidance."
                                color="blue"
                                status="Live"
                            />
                        </Link>
                        <Link to="/tele-consult">
                            <FeatureRoadmapCard
                                icon={<BsPhone className="animate-bounce-slow" />}
                                title="Tele-Consult"
                                desc="Instant video calls with top doctors right from the Sehaat Saathi app. Features AI-enhanced vitals monitoring."
                                color="green"
                                status="Live"
                            />
                        </Link>
                        <Link to="/symptom-checker">
                            <FeatureRoadmapCard
                                icon={<BsStars className="animate-spin-slow" />}
                                title="AI Symptom Checker"
                                desc="Type symptoms, e.g., 'Headache since morning'. Get instant possible diagnosis. Personalized reports based on your medical history."
                                color="purple"
                                status="In Beta"
                                example={{
                                    patient: "I have a sore throat and fever.",
                                    ai: "These symptoms indicate possible flu. Drink warm fluids and take rest."
                                }}
                            />
                        </Link>
                        <Link to="/medicine-suggestion">
                            <FeatureRoadmapCard
                                icon={<BsCapsule className="animate-bounce-slow" />}
                                title="AI Medicine Suggestion"
                                desc="General guidance on OTC medicines, dosage, and frequency. Data fetched from WebMD, WHO & more."
                                color="rose"
                                status="Planned"
                                example={{
                                    patient: "I have a fever.",
                                    ai: "If you have a fever, you can take Paracetamol 500mg every 6 hours."
                                }}
                            />
                        </Link>
                        <Link to="/emergency-protocols">
                            <FeatureRoadmapCard
                                icon={<BsShieldFillPlus className="animate-pulse" />}
                                title="Emergency Protocols"
                                desc="Critical AI guidance for chest pain, stroke, or bleeding. Step-by-step first-aid and instant ambulance linkage."
                                color="red"
                                status="New"
                                example={{
                                    patient: "I have chest pain and breathing problems.",
                                    ai: "These could be symptoms of a heart attack. Call 102 immediately and take Aspirin if safe."
                                }}
                            />
                        </Link>
                        <Link to="/follow-up-hub">
                            <FeatureRoadmapCard
                                icon={<BsBellFill className="animate-bounce-slow" />}
                                title="Follow-up & Reminders"
                                desc="AI medicine reminders, daily symptom tracking, and proactive checkup alerts to ensure smooth recovery."
                                color="emerald"
                                status="Upcoming"
                                example={{
                                    patient: "When should I take paracetamol?",
                                    ai: "You took it 4 hours ago. The next dose will be due in 2 hours. I will remind you."
                                }}
                            />
                        </Link>
                        <Link to="/personalized-health">
                            <FeatureRoadmapCard
                                icon={<BsCpuFill className="animate-spin-slow" />}
                                title="Personalized Health AI"
                                desc="Customized treatment advice, diet charts, and lifestyle changes based on your unique Health Twin profile."
                                color="cyan"
                                status="Beta"
                                example={{
                                    patient: "I have a cough and I'm 30 years old.",
                                    ai: "Since you have a cough, drinking warm tea with honey might help soothe your throat. Avoid cold drinks."
                                }}
                            />
                        </Link>
                        <Link to="/skin-diagnosis">
                            <FeatureRoadmapCard
                                icon={<BsCameraFill className="animate-pulse" />}
                                title="AI Skin Diagnosis"
                                desc="Detect skin conditions, rashes, and infections using advanced neural image processing via your device camera."
                                color="violet"
                                status="Upcoming"
                                example={{
                                    patient: "[Uploads Image of a rash]",
                                    ai: "Neural analysis suggests a 78% probability of a Heat Rash. Keep the area cool and use Calamine lotion."
                                }}
                            />
                        </Link>
                        <Link to="/pharmacy-hub">
                            <FeatureRoadmapCard
                                icon={<BsCartCheck className="animate-bounce" />}
                                title="Sehaat Pharmacy Hub"
                                desc="Order medicines, healthcare products, and wellness essentials with express same-day delivery and smart prescriptions."
                                color="emerald"
                                status="Upcoming"
                                example={{
                                    patient: "I need Panadol and Vitamin C tablets.",
                                    ai: "Got it! Added to your Sehaat Cart. Priority delivery will arrive in 45 minutes."
                                }}
                            />
                        </Link>


                        <Link to="/blood-bank">
                            <FeatureRoadmapCard
                                icon={<BsDropletFill className="animate-pulse text-red-500" />}
                                title="Sehaat Saathi BloodBank"
                                desc="AI-Powered Life-Saving Network (Full Suite v6.0). Ek Call, Ek App, Ek Zindagi."
                                color="red"
                                status="Life-Saving"
                                example={{
                                    patient: "Emergency! Need 2 units of O-negative blood.",
                                    ai: "Searching 50km radius... 3 eligible donors found. Ambulance link & SOS alerts dispatched."
                                }}
                            />
                        </Link>
                        <Link to="/emergency-health-id">
                            <FeatureRoadmapCard
                                icon={<BsHeartPulse className="animate-pulse" />}
                                title="Sehaat Saathi Emergency Health ID & Organ Donation Network"
                                desc="Create a secure digital emergency health identity. Instantly accessed during medical emergencies. Support organ donation consent. 100% Secure & Government-ready."
                                color="red"
                                status="Life-Saving"
                                example={{
                                    patient: "Emergency! Unconscious patient found. ID Scanned.",
                                    ai: "System Alert: Critical Data Accessed. Blood: B+. Diabetic. Organ Donor: Registered. Family Notified."
                                }}
                            />
                        </Link>
                        <Link to="/hospital-availability">
                            <FeatureRoadmapCard
                                icon={<BsHeartPulse className="animate-pulse" />}
                                title="Sehaat Saathi Live Hospital OPD & Bed Availability System"
                                desc="Real-time hospital discovery for emergencies. Find ICU beds, oxygen, ventilators, and OPD slots instantly. AI-powered priority sorting during critical situations. Life-saving system for India."
                                color="red"
                                status="Life-Saving"
                                example={{
                                    patient: "Emergency! Need ICU bed with ventilator in 10km radius.",
                                    ai: "AI Search Complete: 2 hospitals found. Apollo (3.2km): 5 ICU beds, 3 ventilators available. Fortis (7km): 12 ICU beds. Priority alert sent."
                                }}
                            />
                        </Link>
                        <Link to="/report-interpreter">
                            <FeatureRoadmapCard
                                icon={<BsFileEarmarkMedical className="animate-pulse" />}
                                title="Sehaat Saathi AI Medical Report Interpreter"
                                desc="Upload any medical report (PDF/Image) and get an instant, easy-to-understand explanation in Hindi or English. AI extracts key values and explains what they mean."
                                color="emerald"
                                status="New"
                                example={{
                                    patient: "[Uploads Blood Test Report]",
                                    ai: "Your Hemoglobin is perfect (12.5), but Fasting Sugar (115) is slightly high. I suggest reducing sweets and increasing daily walk."
                                }}
                            />
                        </Link>
                        <Link to="/medicine-finder">
                            <FeatureRoadmapCard
                                icon={<BsInboxesFill className="animate-pulse" />}
                                title="Sehaat Saathi Medicine Shortage & Alternative Finder"
                                desc="Can't find prescribed medicine? AI se safe doctor-approved alternatives dhundho aur nearby pharmacy stock live check karo."
                                color="indigo"
                                status="New"
                                example={{
                                    patient: "Dolo 650 is not available anywhere.",
                                    ai: "Don't worry. Calpol 650 or P-650 have the same Paracetamol salt. Apollo Pharmacy (0.8km) has 5 units in stock."
                                }}
                            />
                        </Link>
                        <Link to="/ambulance-dispatch">
                            <FeatureRoadmapCard
                                icon={<BsTruck className="animate-bounce" />}
                                title="Sehaat Saathi Smart Ambulance Dispatch & Tracking System"
                                desc="Emergency? Book nearest Basic/ICU ambulance with live GPS tracking and auto-priority assignment. Save lives with transparency."
                                color="red"
                                status="New"
                                example={{
                                    patient: "Emergency! Accident at Sector 14. Need ambulance now.",
                                    ai: "Priority: HIGH. Closest ICU Ambulance (Driver: Ramesh) assigned. ETA: 4 mins. Live tracking active."
                                }}
                            />
                        </Link>
                        <Link to="/women-care">
                            <FeatureRoadmapCard
                                icon={<BsGenderFemale className="animate-pulse" />}
                                title="Sehaat Saathi Women & Pregnancy Emergency Care Hub (+ Safe Haven)"
                                desc="A complete maternal safety net & confidential sisterhood. Real-time pregnancy monitoring, danger sign alerts (bleeding/pain), and a 100% Private Safe Haven for sensitive health consultations free from judgment."
                                color="rose"
                                status="Guardian & Safe Space"
                                example={{
                                    patient: "I missed my period and I'm scared to tell anyone at home.",
                                    ai: "I hear you. Enabling 'Ghost Mode' (No History). You are safe. Connecting you to a confidential, female gynecologist now. Your secret is safe with Sehaat Saathi."
                                }}
                            />
                        </Link>
                        <Link to="/caregiver-panic">
                            <FeatureRoadmapCard
                                icon={<BsPeopleFill className="animate-pulse" />}
                                title="Sehaat Saathi Caregiver Panic Button"
                                desc="Patient at home & you are panicking? One-tap AI coordination. Instantly notifies Family, Trusted Neighbors, and Preferred Doctors with a live patient summary. Zero confusion, maximum speed."
                                color="indigo"
                                status="New"
                                example={{
                                    patient: "Emergency! Father collapsed. I don't know what to do.",
                                    ai: "Stay Calm. Doctor notified. Neighbor (Mr. Verma) alerted & arriving in 2 mins. Start CPR: Push hard & fast in center of chest."
                                }}
                            />
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

const FeatureRoadmapCard = ({ icon, title, desc, color, status, example }) => {
    const colorClasses = {
        orange: 'from-orange-400 to-orange-500 text-orange-500 bg-orange-50',
        blue: 'from-blue-400 to-blue-500 text-blue-500 bg-blue-50',
        green: 'from-green-400 to-green-500 text-green-500 bg-green-50',
        purple: 'from-purple-400 to-purple-600 text-purple-600 bg-purple-50',
        rose: 'from-rose-400 to-rose-500 text-rose-500 bg-rose-50',
        red: 'from-red-500 to-red-600 text-red-600 bg-red-50',
        emerald: 'from-emerald-400 to-emerald-600 text-emerald-600 bg-emerald-50',
        cyan: 'from-cyan-400 to-cyan-600 text-cyan-600 bg-cyan-50',
        violet: 'from-violet-400 to-violet-600 text-violet-600 bg-violet-50',
        indigo: 'from-indigo-400 to-indigo-600 text-indigo-600 bg-indigo-50'
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-2 group h-full flex flex-col relative overflow-hidden">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-6 ${colorClasses[color].split(' ').slice(2).join(' ')}`}>
                <span className="text-2xl">{icon}</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-widest">
                    {status}
                </div>
                {status === 'In Beta' && (
                    <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
                )}
            </div>

            <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
                {desc}
            </p>

            {/* Example Preview on Hover */}
            {example && (
                <div className="hidden group-hover:block animate-fade-in mb-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-tighter">Live Example:</p>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <span className="text-xs font-black text-slate-700 flex-shrink-0">P:</span>
                            <span className="text-xs text-slate-600 italic">"{example.patient}"</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs font-black text-purple-600 flex-shrink-0">AI:</span>
                            <span className="text-xs text-slate-600">"{example.ai}"</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center bg-transparent">
                <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Launch App</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${colorClasses[color].split(' ').slice(0, 2).join(' ')} shadow-lg`}>
                    <BsArrowRight />
                </div>
            </div>
        </div>
    );
};

export default Smarthub;
