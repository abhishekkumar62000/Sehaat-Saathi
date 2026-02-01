import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    BsArrowLeft, BsCheckCircleFill, BsClockHistory, BsCalendarCheckFill,
    BsGraphUpArrow, BsBellFill, BsCapsule, BsThermometerHalf,
    BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsStars,
    BsChatRightDotsFill, BsArrowRepeat, BsInfoCircleFill
} from 'react-icons/bs';

const FollowUpHub = () => {
    // State management for recovery journey
    const [symptoms, setSymptoms] = useState([
        { day: 'Day 1', intensity: 80, date: '2026-01-25' },
        { day: 'Day 2', intensity: 75, date: '2026-01-26' },
        { day: 'Day 3', intensity: 60, date: '2026-01-27' },
        { day: 'Day 4', intensity: 45, date: '2026-01-28' },
    ]);

    const [activeMedications, setActiveMedications] = useState([
        { id: 1, name: 'Paracetamol 500mg', interval: 6, lastTaken: '2026-01-29T18:00:00', icon: <BsCapsule />, color: 'emerald' },
        { id: 2, name: 'Vitamin C', interval: 24, lastTaken: '2026-01-29T08:00:00', icon: <BsCapsule />, color: 'orange' },
    ]);

    const [newLog, setNewLog] = useState({ intensity: 50, mood: 'neutral', note: '' });
    const [aiInsight, setAiInsight] = useState("Your recovery is looking strong! Your pain levels have dropped by 35% since Day 1.");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Calculate time remaining for next dose
    const getNextDoseTime = (lastTaken, interval) => {
        const nextTime = new Date(new Date(lastTaken).getTime() + interval * 60 * 60 * 1000);
        const now = new Date();
        const diff = nextTime - now;

        if (diff <= 0) return "Due Now";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    const handleLogSymptom = () => {
        const newEntry = {
            day: `Day ${symptoms.length + 1}`,
            intensity: parseInt(newLog.intensity),
            date: new Date().toISOString().split('T')[0]
        };
        setSymptoms([...symptoms, newEntry]);

        // Trigger AI Insight update
        setAiInsight("Entry logged! Maintaining consistency is key. I've updated your recovery roadmap.");

        // Reset log state
        setNewLog({ intensity: 50, mood: 'neutral', note: '' });
    };

    const handleMarkTaken = (id) => {
        setActiveMedications(prev => prev.map(med =>
            med.id === id ? { ...med, lastTaken: new Date().toISOString() } : med
        ));
        setAiInsight("Dose marked as taken! I'm setting the timer for the next dose. Take rest.");
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-inter overflow-x-hidden selection:bg-emerald-500/30">

            {/* Background Decorative Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/40 backdrop-blur-2xl border-b border-white/5 px-6 py-5">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-3 text-slate-400 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest">
                        <BsArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" /> Smart Hub
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            <span className="font-black uppercase tracking-[0.2em] text-[8px] text-slate-500">Recovery Monitor 4.0</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16 items-end">
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
                                <BsCalendarCheckFill className="text-xs" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Recovery Journey</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85]">
                                FOLLOW UP <br /> <span className="text-emerald-500">REFLEX</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                                Track your recovery milestones in real-time. Smart reminders and clinical trends to get you back on your feet faster.
                            </p>
                        </div>

                        {/* AI Proactive Insight Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group animate-fade-in">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <BsStars className="text-[12rem]" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                        <BsChatRightDotsFill className="text-white text-xl" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-indigo-100">AI Recovery Insight</span>
                                </div>
                                <p className="text-2xl font-black italic mb-8 leading-snug">
                                    "{aiInsight}"
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-400"></div>)}
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Linked to Symptom Trends</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics & reminders Grid */}
                    <div className="grid lg:grid-cols-3 gap-10 mb-16">
                        {/* Recovery Timeline Chart */}
                        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[4rem] p-12 shadow-3xl">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h3 className="text-3xl font-black tracking-tight mb-2">SYMPTOM DRIFT</h3>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Pain Intensity Over Time</p>
                                </div>
                                <button onClick={() => setIsRefreshing(true)} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <BsArrowRepeat className={`text-xl text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={symptoms}>
                                        <defs>
                                            <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                                            dy={20}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0f172a',
                                                border: '1px solid #ffffff10',
                                                borderRadius: '20px',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                            }}
                                            itemStyle={{ color: '#10b981', fontWeight: 900 }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="intensity"
                                            stroke="#10b981"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorIntensity)"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Medicine Reminders Panel */}
                        <div className="space-y-8 flex flex-col justify-between">
                            <h3 className="text-xl font-black uppercase tracking-[0.3em] text-slate-600 pl-4">Active Schedule</h3>
                            {activeMedications.map((med) => (
                                <div key={med.id} className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-${med.color}-400 bg-${med.color}-400/10`}>
                                                {med.icon}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-black text-rose-500 uppercase tracking-widest mb-1">Next Dose</div>
                                                <div className="text-3xl font-black tabular-nums">{getNextDoseTime(med.lastTaken, med.interval)}</div>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-black mb-1 group-hover:text-emerald-400 transition-colors uppercase">{med.name}</h4>
                                        <p className="text-slate-500 text-xs font-bold mb-8 uppercase tracking-widest">Every {med.interval} Hours</p>
                                        <button
                                            onClick={() => handleMarkTaken(med.id)}
                                            className={`w-full py-5 rounded-2xl bg-${med.color}-500 hover:bg-${med.color}-600 text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95`}
                                        >
                                            Mark as Taken
                                        </button>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 opacity-5 text-9xl transform -rotate-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        {med.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Logger & clinical milestones */}
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Symptom Entry Form */}
                        <div className="bg-[#0f172a] rounded-[4rem] p-12 border border-white/5 relative overflow-hidden group">
                            <h4 className="text-3xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter">
                                <BsThermometerHalf className="text-rose-500" /> Log Recovery Stats
                            </h4>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 italic">Pain Level? (1-100)</label>
                                        <span className="text-2xl font-black text-emerald-500">{newLog.intensity}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={newLog.intensity}
                                        onChange={(e) => setNewLog({ ...newLog, intensity: e.target.value })}
                                        className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-6 italic">Current Mood / Energy</label>
                                    <div className="flex gap-6">
                                        {[
                                            { mood: 'happy', icon: <BsEmojiSmileFill />, color: 'emerald' },
                                            { mood: 'neutral', icon: <BsEmojiNeutralFill />, color: 'orange' },
                                            { mood: 'sad', icon: <BsEmojiFrownFill />, color: 'rose' }
                                        ].map((m) => (
                                            <button
                                                key={m.mood}
                                                onClick={() => setNewLog({ ...newLog, mood: m.mood })}
                                                className={`flex-1 py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${newLog.mood === m.mood ? `bg-${m.color}-500/10 border-${m.color}-500 text-${m.color}-500` : 'bg-white/5 border-white/5 text-slate-500'}`}
                                            >
                                                <span className="text-3xl">{m.icon}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{m.mood}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogSymptom}
                                    className="w-full py-8 rounded-[2rem] bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-sm tracking-[0.3em] transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <BsCheckCircleFill /> Commit Log Entry
                                </button>
                            </div>
                        </div>

                        {/* Recovery Milestones */}
                        <div className="bg-slate-900/30 rounded-[4rem] p-12 border border-white/5">
                            <h4 className="text-3xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter">
                                <BsGraphUpArrow className="text-blue-500" /> Clinical Milestones
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { title: "Peak Recovery Reached", desc: "Pain levels dropped below 50%", date: "Day 3", icon: <BsGraphUpArrow />, color: "emerald", locked: false },
                                    { title: "Hydration Master", desc: "Consumed 3L fluids daily", date: "Ongoing", icon: <BsStars />, color: "blue", locked: false },
                                    { title: "Fever Free Zone", desc: "Temperature stable for 48h", date: "LOCKED", icon: <BsThermometerHalf />, color: "rose", locked: true },
                                ].map((milestone, i) => (
                                    <div key={i} className={`p-8 rounded-3xl border flex items-center gap-8 transition-all ${milestone.locked ? 'opacity-30 border-white/5 bg-transparent grayscale' : 'border-white/10 bg-white/5 hover:bg-white/10 shadow-lg'}`}>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl bg-${milestone.color}-500/20 text-${milestone.color}-400`}>
                                            {milestone.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-xl font-black uppercase tracking-tight">{milestone.title}</h5>
                                            <p className="text-slate-500 font-medium text-sm">{milestone.desc}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{milestone.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Smart Referral Trigger */}
                            <div className="mt-10 p-8 rounded-[2.5rem] bg-rose-500/10 border-2 border-rose-500/30 flex items-start gap-6">
                                <BsInfoCircleFill className="text-rose-500 text-3xl flex-shrink-0 animate-pulse" />
                                <div>
                                    <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-1">Proactive Referral</p>
                                    <p className="text-sm font-bold text-slate-300">If fever persists for more than 48 hours, click below to instantly consult a doctor.</p>
                                    <Link to="/doctor-ai" className="inline-block mt-4 text-xs font-black text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-[0.2em] underline">
                                        Connect with Specialist
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Styles */}
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .font-inter { font-family: 'Inter', sans-serif; }
                .shadow-3xl { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.6); }
                
                input[type=range]::-webkit-slider-thumb {
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
                    border: 2px solid white;
                }
            `}</style>
        </div>
    );
};

export default FollowUpHub;
