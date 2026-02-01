import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    BsArrowLeft, BsPersonBadgeFill, BsCpuFill, BsLightningFill,
    BsHeartFill, BsStars, BsInfoCircleFill, BsArrowRightShort,
    BsXLg, BsCaretRightFill, BsDropletFill, BsMoonStarsFill,
    BsBicycle, BsFilterLeft, BsActivity, BsMagic, BsArrowRepeat
} from 'react-icons/bs';

const HealthRecommendations = () => {
    // 1. Core Profile State (The Health Twin)
    const [profile, setProfile] = useState({
        age: 30,
        gender: 'male',
        weight: 70,
        condition: 'General Wellness',
        goal: 'Better Immunity'
    });

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [activeSection, setActiveSection] = useState('diet');
    const analysisTimeout = useRef(null);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (analysisTimeout.current) clearTimeout(analysisTimeout.current);
        };
    }, []);

    // 2. Recommendation Logic Engine
    const getRecommendations = () => {
        const currentCondition = profile?.condition || 'General Wellness';
        const currentGoal = profile?.goal || 'Better Immunity';
        const query = currentCondition.toLowerCase();

        if (query.includes('cough') || query.includes('cold') || query.includes('throat')) {
            return {
                diet: [
                    "Drink warm tea with honey and ginger to soothe your throat.",
                    "Eat spicy chicken broth or vegetable soup to clear congestion.",
                    "Avoid cold drinks, ice-cream, and dairy products for 48 hours."
                ],
                lifestyle: [
                    "Gargle with warm salt water 3 times a day.",
                    "Inhale steam with eucalyptus oil for nasal relief.",
                    "Ensure 8-10 hours of sleep in a humidified room."
                ],
                remedy: "Kada (Herbal Tea): Mix Tulsi, Ginger, and Black Pepper in boiling water."
            };
        }

        if (query.includes('fever') || query.includes('flu')) {
            return {
                diet: [
                    "Maintain hydration with coconut water and ORS solution.",
                    "Eat light, easily digestible food like Khichdi or oats.",
                    "High vitamin C intake through citrus fruits (only if not sore throat)."
                ],
                lifestyle: [
                    "Complete bed rest is mandatory. Don't push your body.",
                    "Keep track of temperature every 4 hours.",
                    "Lukewarm sponge baths can help reduce high fever."
                ],
                remedy: "Papaya leaf juice (if symptoms resemble viral/dengue) or just high fluid intake."
            };
        }

        if (query.includes('weight') || query.includes('obesity') || currentGoal.includes('Weight loss')) {
            return {
                diet: [
                    "Focus on high-fiber vegetables and lean proteins.",
                    "Replace refined sugar with natural stevia or dates.",
                    "Intermittent fasting (16:8) could be very beneficial for you."
                ],
                lifestyle: [
                    "Aim for 10k steps daily or 30 mins of HIIT cardio.",
                    "Drink 500ml of warm water immediately after waking up.",
                    "Strength training twice a week to boost metabolism."
                ],
                remedy: "Green tea with a squeeze of lemon 20 mins after meals."
            };
        }

        // Default Wellness
        return {
            diet: [
                "Maintain a balanced 'Rainbow Diet' (colored veggies).",
                "Reduce salt intake to under 5g per day.",
                "Drink at least 3 liters of water daily."
            ],
            lifestyle: [
                "15 minutes of Morning Sun (Vitamin D) is essential.",
                "Practice 4-7-8 breathing for 5 minutes during work stress.",
                "Move every 60 minutes if you have a desk job."
            ],
            remedy: "Turmeric milk (Golden Milk) at night for overall cellular repair."
        };
    };

    const recommendations = getRecommendations();

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        if (analysisTimeout.current) clearTimeout(analysisTimeout.current);

        analysisTimeout.current = setTimeout(() => {
            setIsAnalyzing(false);
            setShowRecommendations(true);
        }, 2000);
    };

    const conditions = ['General Wellness', 'Cough/Cold', 'Fever/Flu', 'Fatigue', 'Weight Loss', 'Chest Congestion'];

    return (
        <div className="min-h-screen bg-[#050810] text-slate-100 font-inter overflow-hidden selection:bg-cyan-500/30">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-3xl border-b border-white/5 py-5 px-8">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group font-black uppercase text-[10px] tracking-[0.3em]">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-all" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Neural Engine active</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-8 relative z-10 overflow-y-auto h-screen custom-scrollbar">
                <div className="container mx-auto max-w-7xl">

                    {!showRecommendations && (
                        <div className="text-center mb-20 animate-slide-up">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white mb-10">
                                <BsCpuFill className="text-cyan-400 animate-spin-slow" />
                                <span className="text-xs font-black uppercase tracking-[0.4em]">Personal Health Twin v1.0</span>
                            </div>
                            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] uppercase">
                                AI RECOMMEN<span className="text-cyan-500 italic">DATIONS</span>
                            </h1>
                            <p className="text-slate-400 text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed italic">
                                "Give us your stats. Our AI will build your <span className="text-white font-bold">Health Twin</span> and provide surgical diet and lifestyle advice."
                            </p>
                        </div>
                    )}

                    {!showRecommendations ? (
                        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 mb-20 text-slate-100">
                            <div className="lg:col-span-12 bg-slate-900/40 backdrop-blur-3xl border-2 border-white/5 rounded-[4rem] p-12 md:p-16 relative overflow-hidden group shadow-3xl">
                                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                                    <BsPersonBadgeFill className="text-[20rem]" />
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 italic ml-4">Weight (kg)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={profile.weight}
                                                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-8 px-10 text-4xl font-black transition-all focus:border-cyan-500/50 outline-none"
                                            />
                                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xl">KG</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 italic ml-4">Age (years)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={profile.age}
                                                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-8 px-10 text-4xl font-black transition-all focus:border-cyan-500/50 outline-none"
                                            />
                                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xl">YR</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 italic ml-4">Gender</label>
                                        <div className="flex gap-4">
                                            {['male', 'female', 'other'].map(g => (
                                                <button
                                                    key={g}
                                                    onClick={() => setProfile({ ...profile, gender: g })}
                                                    className={`flex-1 py-8 rounded-3xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${profile.gender === g ? 'bg-cyan-600 border-cyan-500 text-white shadow-xl shadow-cyan-900/20' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2 space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 italic ml-4">Health Condition / Symptom</label>
                                        <div className="flex flex-wrap gap-4">
                                            {conditions.map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setProfile({ ...profile, condition: c })}
                                                    className={`px-8 py-4 rounded-full border-2 font-bold transition-all ${profile.condition === c ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 italic ml-4">Primary Goal</label>
                                        <select
                                            value={profile.goal}
                                            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                                            className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-8 px-10 text-xl font-black transition-all focus:border-cyan-500/50 outline-none appearance-none"
                                        >
                                            <option className="bg-slate-900">Better Immunity</option>
                                            <option className="bg-slate-900">Weight loss</option>
                                            <option className="bg-slate-900">Muscle Gain</option>
                                            <option className="bg-slate-900">Stress Reduction</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-20 flex justify-center">
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                        className="relative group overflow-hidden px-16 py-8 rounded-[3rem] bg-cyan-600 text-white font-black text-xs uppercase tracking-[0.5em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-900/40"
                                    >
                                        <span className="relative z-10 flex items-center gap-4">
                                            {isAnalyzing ? "Processing Twin..." : "Analyze Health Twin"}
                                            <BsLightningFill className={isAnalyzing ? 'animate-bounce' : ''} />
                                        </span>
                                        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-600 transition-transform duration-500 ${isAnalyzing ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in relative z-10 pb-20">
                            <div className="bg-gradient-to-r from-cyan-600 to-indigo-700 rounded-[3rem] p-12 md:p-16 mb-16 flex flex-col md:flex-row justify-between items-center gap-10 shadow-3xl">
                                <div className="flex items-center gap-12">
                                    <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 shadow-2xl">
                                        <BsActivity className="text-5xl text-white animate-pulse" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-white">Your Health Twin</h2>
                                        <p className="text-cyan-100 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Analysis Complete • 98% Profile Match</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 md:gap-12 text-center text-white">
                                    <div>
                                        <div className="text-[10px] font-black text-cyan-100/50 uppercase mb-1">Status</div>
                                        <div className="text-2xl font-black italic">{profile.condition}</div>
                                    </div>
                                    <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                                    <div>
                                        <div className="text-[10px] font-black text-cyan-100/50 uppercase mb-1">Target</div>
                                        <div className="text-2xl font-black italic">{profile.goal}</div>
                                    </div>
                                    <button
                                        onClick={() => setShowRecommendations(false)}
                                        className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white"
                                    >
                                        <BsArrowRepeat className="text-2xl" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12 items-start text-slate-100">
                                <div className="lg:col-span-3 space-y-4">
                                    {[
                                        { id: 'diet', label: 'Neural Diet Chart', icon: <BsStars /> },
                                        { id: 'lifestyle', label: 'Lifestyle Optimizer', icon: <BsLightningFill /> },
                                        { id: 'remedy', label: 'Smart Remedies', icon: <BsMagic /> }
                                    ].map(btn => (
                                        <button
                                            key={btn.id}
                                            onClick={() => setActiveSection(btn.id)}
                                            className={`w-full p-10 rounded-[2.5rem] border-2 flex items-center gap-6 transition-all group ${activeSection === btn.id ? 'bg-cyan-600 border-cyan-500 text-white shadow-xl' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'}`}
                                        >
                                            <span className={`text-2xl transition-transform duration-500 ${activeSection === btn.id ? 'rotate-12 scale-110' : 'group-hover:rotate-6'}`}>{btn.icon}</span>
                                            <span className="font-black uppercase text-xs tracking-widest">{btn.label}</span>
                                        </button>
                                    ))}

                                    <div className="mt-12 p-10 bg-slate-900/50 rounded-[3rem] border border-white/5 text-center">
                                        <div className="mb-6 inline-block p-6 rounded-full bg-cyan-600/10 border-2 border-cyan-600/20">
                                            <BsActivity className="text-4xl text-cyan-500 animate-pulse" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Primary Focus Zone</p>
                                        <p className="text-lg font-black italic">{profile.condition.includes('Cough') ? 'Respiratory System' : profile.condition.includes('Weight') ? 'Metabolic Rate' : 'Immune System'}</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-9 space-y-8">
                                    <div className="bg-slate-900 border-2 border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden group shadow-3xl min-h-[500px]">
                                        <div className="absolute top-0 right-0 p-20 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-1000 -rotate-12">
                                            <BsCpuFill className="text-[30rem]" />
                                        </div>

                                        <div className="relative z-10 text-white">
                                            <h3 className="text-5xl font-black mb-16 uppercase tracking-tighter flex items-center gap-6">
                                                <span className="w-2 h-12 bg-cyan-500 rounded-full"></span>
                                                {activeSection === 'diet' ? 'Neural Diet Engine' : activeSection === 'lifestyle' ? 'Lifestyle Optimizer' : 'Smart Remedial guidance'}
                                            </h3>

                                            <div className="space-y-8">
                                                {activeSection === 'remedy' ? (
                                                    <div className="p-12 rounded-[3.5rem] bg-indigo-600/10 border-2 border-indigo-500/30 flex items-start gap-10 group/remedy transition-all hover:bg-indigo-600/20">
                                                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl text-white shadow-2xl group-hover/remedy:scale-110 duration-700">
                                                            <BsStars />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.4em] mb-4 italic">Tried and tested remedy:</p>
                                                            <p className="text-3xl md:text-4xl font-black italic text-white leading-tight">"{recommendations.remedy}"</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    recommendations[activeSection]?.map((rec, i) => (
                                                        <div key={i} className="flex gap-10 p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-default group/item">
                                                            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 flex flex-shrink-0 items-center justify-center font-black text-cyan-500 group-hover/item:bg-cyan-600 group-hover/item:text-white transition-all">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-2xl md:text-3xl font-bold leading-tight group-hover/item:translate-x-2 transition-transform duration-500">{rec}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <div className="flex items-center gap-4">
                                                    <BsInfoCircleFill className="text-xl text-cyan-500" />
                                                    <span>AI Recommendation Confidence: <span className="text-white">94.2%</span></span>
                                                </div>
                                                <div className="px-6 py-2 rounded-full border border-white/10 flex items-center gap-2 italic">
                                                    <span className="text-rose-500 font-black">Warning:</span> Consult a real doctor for acute conditions
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {isAnalyzing && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12">
                    <div className="text-center">
                        <div className="relative mb-16 h-48 w-48 mx-auto text-cyan-500">
                            <div className="absolute inset-0 border-[10px] border-cyan-500/10 rounded-full"></div>
                            <div className="absolute inset-0 border-[10px] border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-8 flex items-center justify-center">
                                <BsCpuFill className="text-6xl animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-4xl font-black mb-4 uppercase tracking-[0.3em] text-white">Building Health Twin</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cross-referencing 5M+ clinical data points...</p>
                        <div className="mt-12 flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-6 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: `${i * 150}ms` }}></div>)}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-slide-up { animation: slide-up 1s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
                .animate-spin-slow { animation: spin 12s linear infinite; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .shadow-3xl { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.6); }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
            `}</style>
        </div>
    );
};

export default HealthRecommendations;
