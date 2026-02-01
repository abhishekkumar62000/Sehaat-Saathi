import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    BsCapsule, BsFire, BsDropletFill, BsHeartPulse,
    BsInfoCircleFill, BsLightningFill, BsArrowRightCircleFill,
    BsSearch, BsCheck2Circle, BsVolumeUpFill, BsPersonFill,
    BsShieldFillCheck, BsPlusCircleFill, BsSearchHeart
} from 'react-icons/bs';

const MedicineFirstAid = () => {
    const [activeTab, setActiveTab] = useState('medicine');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBodyPart, setSelectedBodyPart] = useState('General');

    const medicineCategories = [
        {
            id: 1,
            title: "Cough & Cold",
            meds: ["Paracetamol", "Cetirizine", "Dekoff Syrup"],
            gradient: "from-blue-500 to-indigo-600",
            icon: <BsCapsule className="text-3xl" />,
            desc: "For mild symptoms, sneezing, and viral fever."
        },
        {
            id: 2,
            title: "Digestive Care",
            meds: ["Antacids", "ORS", "Probiotics"],
            gradient: "from-green-500 to-emerald-600",
            icon: <BsCapsule className="text-3xl" />,
            desc: "Relief from acidity, bloating or stomach ache."
        },
        {
            id: 3,
            title: "Pain Relief",
            meds: ["Ibuprofen", "Volini Gel", "Aspirin"],
            gradient: "from-orange-500 to-red-600",
            icon: <BsCapsule className="text-3xl" />,
            desc: "For headaches, muscle pain or minor injury."
        },
        {
            id: 4,
            title: "Eye & Ear Care",
            meds: ["Lubricant Drops", "Wax Cleaners", "Gentamicin"],
            gradient: "from-cyan-500 to-blue-500",
            icon: <BsCapsule className="text-3xl" />,
            desc: "For minor eye irritation or ear wax issues."
        }
    ];

    const firstAidGuides = {
        Head: {
            title: "Head Injury / Fainting",
            steps: ["Keep the head leveled", "Apply cold compress for swelling", "Check for pupil dilation", "Call for help if unconscious"],
            icon: <BsPersonFill className="text-blue-500" />,
            urgency: "High"
        },
        Chest: {
            title: "Cardiac Distress",
            steps: ["Sit upright and lean forward", "Call 102 immediately", "Loosen tight clothes", "Monitor breathing"],
            icon: <BsHeartPulse className="text-pink-600 animate-pulse" />,
            urgency: "Critical"
        },
        Stomach: {
            title: "Severe Abdominal Pain",
            steps: ["Lie on left side", "Avoid solid food", "Check for localized sharp pain", "Identify if appendix-related"],
            icon: <BsCapsule className="text-green-500" />,
            urgency: "Moderate"
        },
        General: {
            title: "Common First-Aid SOS",
            steps: ["Assess scene safety", "Call 102 if needed", "Check ABC: Airway, Breathing, Circulation"],
            icon: <BsShieldFillCheck className="text-emerald-500" />,
            urgency: "Standard"
        }
    };

    const filteredMeds = useMemo(() => {
        if (!searchQuery) return medicineCategories;
        return medicineCategories.filter(cat =>
            cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.meds.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery]);

    const speakSteps = (title, steps) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const text = `Here are the steps for ${title}: ` + steps.join(". ");
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-white" id="medicine-hub">
            {/* Immersive Background */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-teal-400/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 lg:px-16 relative">
                {/* Header with Search */}
                <div className="flex flex-col xl:flex-row justify-between items-center gap-10 mb-20">
                    <div className="max-w-3xl text-center xl:text-left">
                        <div className="inline-flex items-center gap-3 bg-teal-50 text-teal-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-teal-100 shadow-sm">
                            <BsLightningFill className="animate-pulse" /> Sehaat Quick-Aid V2.0
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                            Medicine & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">First-Aid</span> Hub
                        </h2>
                        <p className="text-xl text-slate-500 leading-relaxed font-medium italic">
                            Precision is everything in health. Discover OTC medicines or get instant first-aid guidance with our interactive 2.0 system. Simple, fast, and secure.
                        </p>
                    </div>

                    <div className="w-full max-w-md flex flex-col gap-6">
                        {/* Tab Switcher */}
                        <div className="flex bg-slate-100 p-2 rounded-[2rem] border border-slate-200">
                            <button
                                onClick={() => setActiveTab('medicine')}
                                className={`flex-1 py-4 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'medicine' ? 'bg-white text-teal-600 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <BsCapsule /> Medicine Finder
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('firstaid')}
                                className={`flex-1 py-4 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'firstaid' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <BsHeartPulse /> First-Aid SOS
                                </div>
                            </button>
                        </div>

                        {/* Search Bar (Visible for Medicine) */}
                        <div className={`transition-all duration-300 ${activeTab === 'medicine' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'}`}>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search symptom or medicine..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 focus:border-teal-500 outline-none transition-all font-bold placeholder:text-slate-400 group-focus-within:shadow-2xl group-focus-within:bg-white"
                                />
                                <BsSearchHeart className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-teal-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px] mb-20 cursor-default">
                    {activeTab === 'medicine' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up">
                            {filteredMeds.map((cat) => (
                                <div key={cat.id} className="group bg-white rounded-[2.5rem] p-10 shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all border border-slate-100 relative overflow-hidden flex flex-col items-center text-center">
                                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${cat.gradient}`}></div>
                                    <div className={`w-20 h-20 bg-gradient-to-tr ${cat.gradient} rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl transform group-hover:rotate-6 transition-transform`}>
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{cat.title}</h3>
                                    <p className="text-slate-500 text-xs mb-8 leading-relaxed font-bold uppercase tracking-tight">{cat.desc}</p>

                                    <div className="w-full space-y-3 mb-10 pt-6 border-t border-slate-50">
                                        {cat.meds.map((med, i) => (
                                            <div key={i} className="flex items-center justify-center gap-2 text-slate-700 font-black text-[13px] bg-slate-50 py-2 rounded-xl border border-slate-100">
                                                <BsCheck2Circle className="text-teal-500" /> {med}
                                            </div>
                                        ))}
                                    </div>

                                    <Link to="/doctor-ai" className="mt-auto flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-600 transition-colors shadow-lg active:scale-95">
                                        Ask AI For Dosage <BsPlusCircleFill />
                                    </Link>
                                </div>
                            ))}
                            {filteredMeds.length === 0 && (
                                <div className="col-span-full py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
                                    <BsSearch className="text-5xl text-slate-300 mb-6" />
                                    <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No results found...</h3>
                                    <p className="text-slate-400 mt-2">Try searching something like "Headache" or "Syrup"</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col xl:flex-row gap-12 animate-slide-up">
                            {/* Body Map Interaction */}
                            <div className="xl:w-80 bg-slate-900 rounded-[3rem] p-10 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
                                </div>

                                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-10 border-b border-white/10 pb-4 w-full text-center">Interactive SOS Map</h4>

                                <div className="relative space-y-4 w-full">
                                    {['Head', 'Chest', 'Stomach', 'General'].map(part => (
                                        <button
                                            key={part}
                                            onClick={() => setSelectedBodyPart(part)}
                                            className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border-2 ${selectedBodyPart === part ? 'bg-orange-600 border-orange-400 text-white shadow-xl shadow-orange-600/30' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}
                                        >
                                            {part} SOS
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-12 text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-orange-500 border border-white/10 mb-4 mx-auto animate-pulse">
                                        <BsFire />
                                    </div>
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Click to get priority advice</p>
                                </div>
                            </div>

                            {/* First Aid Display */}
                            <div className="flex-1 bg-slate-50 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 border border-slate-200">
                                <div className="lg:w-1/3">
                                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-4xl shadow-2xl border border-slate-100 transform -rotate-12 mb-10">
                                        {firstAidGuides[selectedBodyPart].icon}
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">{firstAidGuides[selectedBodyPart].title}</h3>
                                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-200">
                                        Urgency: {firstAidGuides[selectedBodyPart].urgency}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-8">
                                    {firstAidGuides[selectedBodyPart].steps.map((step, i) => (
                                        <div key={i} className="flex gap-6 items-start group/step">
                                            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover/step:bg-orange-600 group-hover/step:translate-x-2 transition-all">
                                                {i + 1}
                                            </div>
                                            <p className="text-lg text-slate-600 font-bold leading-relaxed">{step}</p>
                                        </div>
                                    ))}

                                    <div className="pt-10 flex gap-4">
                                        <button
                                            onClick={() => speakSteps(firstAidGuides[selectedBodyPart].title, firstAidGuides[selectedBodyPart].steps)}
                                            className="bg-white hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-900 font-black uppercase text-[10px] tracking-widest py-4 px-8 rounded-2xl transition-all flex items-center gap-3 shadow-sm shadow-black/5"
                                        >
                                            <BsVolumeUpFill className="text-xl" /> Listen Guide
                                        </button>
                                        <Link to="/contact" className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-[10px] tracking-widest py-4 px-10 rounded-2xl transition-all shadow-xl shadow-orange-600/20">
                                            Emergency Help
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Safety Dashboard Banner */}
                <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-14 text-white flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-4xl text-emerald-400 border border-emerald-500/20">
                        <BsShieldFillCheck />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">Scientific Safety Protocols</h4>
                        <p className="text-slate-400 font-medium italic">Our database is updated weekly from <b>WHO & IMA Protocols 2026</b>. Always verify dosage with our diagnostic tests for 100% safety.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Last Update</span>
                            <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Jan 28, 2026</span>
                        </div>
                        <div className="w-[1px] h-10 bg-white/10 mx-4"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Protocol Ver</span>
                            <span className="text-xs font-black text-blue-400 uppercase tracking-widest">v4.2.1-Live</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            `}</style>
        </section>
    );
};

export default MedicineFirstAid;
