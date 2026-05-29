import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BsStars, BsActivity, BsShieldCheck, BsArrowLeftShort,
    BsDropletFill, BsHeartPulse, BsThermometerHalf, BsSpeedometer,
    BsInfoCircleFill, BsLightningChargeFill, BsCheck2Circle, BsExclamationTriangleFill
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const HealthCopilot = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [aiAdvice, setAiAdvice] = useState("");
    const [adviceLoading, setAdviceLoading] = useState(false);
    const [showVitalsForm, setShowVitalsForm] = useState(false);

    // Form Stats
    const [vitalForm, setVitalForm] = useState({
        systolic: "",
        diastolic: "",
        sugar_level: "",
        heart_rate: "",
        oxygen_level: "",
        temperature: "",
        feeling: "Good"
    });

    const [isSessionValid, setIsSessionValid] = useState(true);

    const fetchStats = async () => {
        try {
            const currentToken = localStorage.getItem("token");
            if (!currentToken) setIsSessionValid(false);
            
            const res = await fetch(`${BASE_URL}/health-copilot/stats`, {
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            const result = await res.json();
            
            if (res.status === 401) {
                setIsSessionValid(false);
                return;
            }
            
            if (result.success) {
                setStats(result.data);
            }
        } catch (err) {
            toast.error("Error fetching health data");
        } finally {
            setLoading(false);
        }
    };

    const fetchAIAdvice = async () => {
        setAdviceLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/health-copilot/advice`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const result = await res.json();
            if (result.success) {
                setAiAdvice(result.advice);
            }
        } catch (err) {
            toast.error("AI Advisory unavailable");
        } finally {
            setAdviceLoading(false);
        }
    };

    const handleVitalSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/health-copilot/log-vitals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    blood_pressure: { systolic: vitalForm.systolic, diastolic: vitalForm.diastolic },
                    sugar_level: vitalForm.sugar_level,
                    heart_rate: vitalForm.heart_rate,
                    oxygen_level: vitalForm.oxygen_level,
                    temperature: vitalForm.temperature,
                    feeling: vitalForm.feeling
                })
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Vitals logged!");
                setShowVitalsForm(false);
                fetchStats();
            }
        } catch (err) {
            toast.error("Failed to log vitals");
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!isSessionValid) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 max-w-md w-full text-center"
            >
                <div className="w-20 h-20 bg-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-500/30">
                    <BsExclamationTriangleFill className="text-white text-4xl" />
                </div>
                <h2 className="text-2xl font-black mb-4 text-white">SESSION EXPIRED</h2>
                <p className="text-slate-400 mb-8 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
                    Your secure medical session has expired or is invalid. Please log in to your account to restore access.
                </p>
                <Link to="/login" className="block w-full py-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-white">
                    Authenticate to Continue
                </Link>
            </motion.div>
        </div>
    );

    if (!stats) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 max-w-2xl w-full text-center"
            >
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30">
                    <BsShieldCheck className="text-white text-4xl" />
                </div>
                <h2 className="text-3xl font-black mb-4">INITIALIZE HEALTH COMMAND CENTER</h2>
                <p className="text-slate-400 mb-8 font-bold uppercase text-[10px] tracking-[0.2em]">Medical Board Clearance Required to Start Mapping</p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" onSubmit={async (e) => {
                    e.preventDefault();

                    // Show a brief analyzing state using toast
                    const toastId = toast.loading("Analyzing profile metrics...");

                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);

                    // Convert Number fields explicitly so the JSON is completely clean
                    data.age = Number(data.age);
                    data.height = Number(data.height);
                    data.weight = Number(data.weight);

                    try {
                        const res = await fetch(`${BASE_URL}/health-copilot/update-profile`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                            body: JSON.stringify(data)
                        });

                        const result = await res.json();

                        if (res.ok && result.success) {
                            toast.update(toastId, { render: "Health Command Center Initialized!", type: "success", isLoading: false, autoClose: 3000 });
                            fetchStats(); // Triggers reload of dashboard
                        } else {
                            toast.update(toastId, { render: result.message || "Initialization Failed. Please check your data.", type: "error", isLoading: false, autoClose: 3000 });
                        }
                    } catch (err) {
                        toast.update(toastId, { render: "Network error. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
                        console.error("Initialization error:", err);
                    }
                }}>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2"><BsActivity /> Current Age</label>
                        <input name="age" type="number" min="1" max="120" required placeholder="Years" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all hover:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2"><BsThermometerHalf /> Height (cm)</label>
                        <input name="height" type="number" min="50" max="250" required placeholder="170" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all hover:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2"><BsActivity /> Weight (kg)</label>
                        <input name="weight" type="number" min="10" max="300" required placeholder="70" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all hover:bg-white/10" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2 flex items-center gap-2"><BsDropletFill className="text-red-500" /> Blood Group</label>
                        <select name="blood_group" required className="w-full bg-[#0f172a] border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all hover:bg-white/10">
                            <option value="">Select Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <button type="submit" className="md:col-span-2 mt-4 py-5 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                        <BsShieldCheck className="text-lg" />
                        Initialize Health AI Core
                    </button>
                </form>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans overflow-x-hidden relative">
            {/* Background Decorative Orbs */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mb-12 relative z-10 gap-6">
                <Link to="/smarthub" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all flex items-center gap-2 group">
                    <BsArrowLeftShort className="text-2xl group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Back to Hub</span>
                </Link>
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                        <BsStars className="text-blue-500 animate-pulse text-xs" />
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Sovereign Health Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                        HEALTH <span className="text-blue-500 uppercase">COPILOT</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] md:text-xs mt-2 font-bold tracking-[0.3em] uppercase">Diagnostic Command Center & Trend Analyzer</p>
                </div>
                <button
                    onClick={() => setShowVitalsForm(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center gap-3 font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                >
                    <BsActivity />
                    Log New Vitals
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Health Score & Risk Meter */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <BsSpeedometer className="text-8xl text-blue-500" />
                        </div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Vital Health Score</h3>

                        <div className="relative flex items-center justify-center mb-8">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                <motion.circle
                                    cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    className={stats?.score > 80 ? "text-emerald-500" : stats?.score > 50 ? "text-blue-500" : "text-rose-500"}
                                    strokeDasharray={2 * Math.PI * 88}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - (stats?.score || 0) / 100) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black">{stats?.score || 0}</span>
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Normalized</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${stats?.risk_level === 'Low' ? 'bg-emerald-500/10 text-emerald-500' :
                                stats?.risk_level === 'Medium' ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'
                                }`}>
                                Risk Level: {stats?.risk_level || 'Calculating...'}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed italic">
                                "{stats?.risk_level === 'Low' ? 'Your health metrics indicate strong stability.' :
                                    stats?.risk_level === 'Medium' ? 'Moderate caution advised. Watch your trends.' :
                                        'Immediate lifestyle correction or clinical review suggested.'}"
                            </p>
                        </div>
                    </div>

                    {/* Quick Vitals Dashboard */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 grid grid-cols-2 gap-4">
                        <VitalStat icon={<BsHeartPulse className="text-rose-500" />} label="Heart Rate" value={stats?.latestVital?.heart_rate || '--'} unit="bpm" />
                        <VitalStat icon={<BsDropletFill className="text-blue-500" />} label="SpO2" value={stats?.latestVital?.oxygen_level || '--'} unit="%" />
                        <VitalStat icon={<BsActivity className="text-emerald-500" />} label="Sugar" value={stats?.latestVital?.sugar_level || '--'} unit="mg/dL" />
                        <VitalStat icon={<BsThermometerHalf className="text-orange-500" />} label="Temp" value={stats?.latestVital?.temperature || '--'} unit="°C" />
                    </div>
                </div>

                {/* AI Advice & Trends */}
                <div className="lg:col-span-8 space-y-8">
                    {/* AI Advisory Box */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 backdrop-blur-3xl border border-blue-500/20 rounded-[3rem] p-10 relative overflow-hidden group min-h-[400px]">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <BsStars className="text-white text-2xl animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black tracking-tighter uppercase">AI Preventive Advisory</h3>
                                        <p className="text-[9px] font-black text-blue-400 tracking-widest uppercase">Hybrid Intelligence Engine</p>
                                    </div>
                                </div>
                                <button
                                    onClick={fetchAIAdvice}
                                    disabled={adviceLoading}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    {adviceLoading ? 'Analyzing...' : 'Generate Advice'}
                                </button>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                {aiAdvice ? (
                                    <div className="text-sm md:text-base leading-relaxed text-blue-50/80 whitespace-pre-wrap italic">
                                        {aiAdvice}
                                    </div>
                                ) : (
                                    <div className="h-48 flex flex-col items-center justify-center text-center opacity-40">
                                        <BsLightningChargeFill className="text-4xl mb-4 text-blue-500" />
                                        <p className="text-xs font-black uppercase tracking-widest">Click 'Generate Advice' to initialize AI interpretation of your trends.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Trend History */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter">Clinical Log History</h3>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase text-slate-500">Last 30 Records</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-slate-500 border-b border-white/5">
                                    <tr>
                                        <th className="pb-4 font-black uppercase tracking-widest">Date</th>
                                        <th className="pb-4 font-black uppercase tracking-widest">Blood Pressure</th>
                                        <th className="pb-4 font-black uppercase tracking-widest">Sugar</th>
                                        <th className="pb-4 font-black uppercase tracking-widest">Heart Rate</th>
                                        <th className="pb-4 font-black uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {stats?.history?.map((record, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-all">
                                            <td className="py-4 font-bold">{new Date(record.date).toLocaleDateString()}</td>
                                            <td className="py-4">{record.blood_pressure ? `${record.blood_pressure.systolic}/${record.blood_pressure.diastolic}` : '--'}</td>
                                            <td className="py-4">{record.sugar_level || '--'} <span className="opacity-40">mg/dL</span></td>
                                            <td className="py-4">{record.heart_rate || '--'} <span className="opacity-40">bpm</span></td>
                                            <td className="py-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${record.feeling === 'Great' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    record.feeling === 'Good' ? 'bg-blue-500/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                    {record.feeling}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vitals Input Modal */}
            <AnimatePresence>
                {showVitalsForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowVitalsForm(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 md:p-12 w-full max-w-2xl relative shadow-2xl"
                        >
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <BsActivity className="text-white" />
                                </div>
                                LOG DAILY VITALS
                            </h2>
                            <form onSubmit={handleVitalSubmit} className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Blood Pressure (Sys/Dia)</label>
                                    <div className="flex gap-4">
                                        <input type="number" placeholder="Sys" value={vitalForm.systolic} onChange={e => setVitalForm({ ...vitalForm, systolic: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all" />
                                        <input type="number" placeholder="Dia" value={vitalForm.diastolic} onChange={e => setVitalForm({ ...vitalForm, diastolic: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Sugar Level (mg/dL)</label>
                                    <input type="number" value={vitalForm.sugar_level} onChange={e => setVitalForm({ ...vitalForm, sugar_level: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Heart Rate (bpm)</label>
                                    <input type="number" value={vitalForm.heart_rate} onChange={e => setVitalForm({ ...vitalForm, heart_rate: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Oxygen Level (%)</label>
                                    <input type="number" value={vitalForm.oxygen_level} onChange={e => setVitalForm({ ...vitalForm, oxygen_level: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all" />
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">How do you feel today?</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {["Great", "Good", "Okay", "Poor", "Very Bad"].map(f => (
                                            <button
                                                type="button" key={f}
                                                onClick={() => setVitalForm({ ...vitalForm, feeling: f })}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${vitalForm.feeling === f ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10 text-slate-500'}`}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="col-span-2 py-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl font-black uppercase text-xs tracking-widest mt-4 active:scale-95 transition-all shadow-xl shadow-blue-500/20">
                                    Submit to Command Center
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto mt-12 p-6 bg-rose-500/5 border border-rose-500/10 rounded-[2rem] flex items-start gap-4">
                <BsExclamationTriangleFill className="text-rose-500 text-xl shrink-0 mt-1" />
                <p className="text-[10px] font-bold text-rose-500/80 leading-relaxed uppercase tracking-widest">
                    Safety Disclaimer: AI Health Copilot provides preventive guidance based on structured data and interactive check-ins. It is NOT a substitute for clinical medical diagnosis, prescription, or professional care. In case of emergencies, contact nearest hospital immediately.
                </p>
            </div>
        </div>
    );
};

const VitalStat = ({ icon, label, value, unit }) => (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all">
        <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">{icon}</span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-xl font-black">{value}</span>
            <span className="text-[8px] font-black text-slate-600 uppercase">{unit}</span>
        </div>
    </div>
);

export default HealthCopilot;
