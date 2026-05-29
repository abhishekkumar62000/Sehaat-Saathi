import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsActivity, BsHeartPulse, BsLightningCharge, BsShieldCheck } from 'react-icons/bs';

const chakras = [
    { id: 'sahastrara', name: 'Brain & Nervous', system: 'Neurological', color: '#8B5CF6', icon: '🧠', position: 'top-0' },
    { id: 'ajna', name: 'Vision & Perception', system: 'Vision', color: '#6366F1', icon: '👁️', position: 'top-[15%]' },
    { id: 'vishuddha', name: 'ENT & Thyroid', system: 'ENT', color: '#3B82F6', icon: '🗣️', position: 'top-[30%]' },
    { id: 'anahata', name: 'Heart & Lungs', system: 'Cardiovascular', color: '#10B981', icon: '🫀', position: 'top-[45%]' },
    { id: 'manipura', name: 'Digestive & Metabolism', system: 'Digestive', color: '#F59E0B', icon: '🥣', position: 'top-[60%]' },
    { id: 'svadhishthana', name: 'Reproductive & Hormonal', system: 'Gynecology', color: '#F97316', icon: '🤱', position: 'top-[75%]' },
    { id: 'muladhara', name: 'Skeletal & Physical', system: 'Orthopedic', color: '#EF4444', icon: '🦴', position: 'top-[90%]' },
];

const AyushVitalDashboard = ({ riskProfile, vitals }) => {
    const [selectedSystem, setSelectedSystem] = React.useState(null);

    const getStatus = (system) => {
        if (riskProfile?.urgency === 'EMERGENCY') return 'critical';
        if (riskProfile?.detectedOrgans?.includes(system)) return 'warning';
        return 'healthy';
    };

    const getGlowColor = (status, baseColor) => {
        if (status === 'critical') return '#EF4444'; // Red
        if (status === 'warning') return '#F59E0B';  // Amber
        return baseColor;
    };

    const pulseSpeed = vitals?.pulse ? Math.max(0.5, 2 - (vitals.pulse / 100)) : 2;

    return (
        <div className="relative min-h-[600px] h-full lg:h-[600px] w-full flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 bg-slate-900/50 rounded-[2rem] lg:rounded-[3rem] border border-white/10 overflow-hidden">
            {/* Background Medical Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Neural Connections (SVG Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 lg:opacity-100">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {/* Chakra Spine */}
            <div className="relative h-full flex flex-col items-center justify-between py-4 lg:py-8 z-10 w-24">
                {chakras.map((chakra, idx) => {
                    const status = getStatus(chakra.system);
                    const glowColor = getGlowColor(status, chakra.color);
                    const isSelected = selectedSystem?.id === chakra.id;

                    return (
                        <motion.div
                            key={chakra.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: isSelected ? 1.2 : 1,
                                zIndex: isSelected ? 50 : 10
                            }}
                            className="relative flex items-center justify-center"
                        >
                            <div
                                onClick={() => setSelectedSystem(isSelected ? null : chakra)}
                                className="relative cursor-pointer touch-none"
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            `0 0 20px ${glowColor}40`,
                                            `0 0 40px ${glowColor}60`,
                                            `0 0 20px ${glowColor}40`
                                        ],
                                        rotate: isSelected ? [0, 360] : 0
                                    }}
                                    transition={{
                                        boxShadow: { duration: status === 'critical' ? 0.5 : pulseSpeed, repeat: Infinity },
                                        rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                                    }}
                                    className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-2xl lg:text-3xl border-2 relative bg-slate-900 shadow-2xl transition-all duration-300 ${isSelected ? 'border-4' : 'border-2'}`}
                                    style={{ borderColor: glowColor }}
                                >
                                    {chakra.icon}

                                    {/* Pulse Ring */}
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                        transition={{ duration: pulseSpeed, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border-2"
                                        style={{ borderColor: glowColor }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Interactive Info Panel */}
            <AnimatePresence mode="wait">
                {selectedSystem ? (
                    <motion.div
                        key={selectedSystem.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        className="flex-1 w-full lg:w-auto p-6 lg:p-12 z-20 flex flex-col justify-center"
                    >
                        <div className="bg-slate-800/80 backdrop-blur-3xl border-2 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden" style={{ borderColor: `${selectedSystem.color}30` }}>
                            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl pointer-events-none">
                                {selectedSystem.icon}
                            </div>

                            <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: selectedSystem.color }}>
                                Neural Diagnostic Core
                            </span>
                            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                                {selectedSystem.name.split(' & ')[0]}<br />
                                <span className="opacity-50 text-2xl lg:text-3xl">& {selectedSystem.name.split(' & ')[1]}</span>
                            </h2>

                            <div className="flex items-center gap-4 mb-8">
                                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatus(selectedSystem.system) === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' :
                                    getStatus(selectedSystem.system) === 'warning' ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' :
                                        'bg-red-500/10 border-red-500/50 text-red-100 animate-pulse'
                                    }`}>
                                    Status: {getStatus(selectedSystem.system)}
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    Link: Secure
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm lg:text-base mb-8 leading-relaxed max-w-md">
                                The {selectedSystem.system} matrix is currently under active AI surveillance.
                                {getStatus(selectedSystem.system) === 'healthy'
                                    ? ` Clinical waveforms indicate optimal resonance within normalized parameters for ${vitals?.pulse || 'detected pulse'}.`
                                    : ` Deviation detected in primary sensory nodes. AI recommends immediate clinical triage for ${selectedSystem.system} stability.`}
                            </p>

                            <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                view full system report
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex-1 hidden lg:flex flex-col items-center justify-center opacity-20 select-none pointer-events-none">
                        <BsShieldCheck className="text-9xl text-blue-500 mb-6" />
                        <h4 className="text-2xl font-black text-white uppercase tracking-widest">Tap to Scan System</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">Interactive Chakra Diagnostic Engine</p>
                    </div>
                )}
            </AnimatePresence>

            {/* Vital Telemetry Sidebar */}
            <div className="w-full lg:w-48 p-4 bg-slate-900 lg:bg-transparent lg:static flex lg:flex-col justify-center gap-4 lg:gap-6 z-20 overflow-x-auto">
                <VitalBadge icon={<BsActivity />} label="BP" value={vitals?.bp || '--/--'} unit="mmHg" color="#3B82F6" />
                <VitalBadge icon={<BsHeartPulse />} label="HR" value={vitals?.pulse || '--'} unit="bpm" color="#10B981" />
                <VitalBadge icon={<BsLightningCharge />} label="BS" value={vitals?.sugar || '--'} unit="mg/dL" color="#F59E0B" />
            </div>
        </div>
    );
};

const VitalBadge = ({ icon, label, value, unit, color }) => (
    <div className="flex-shrink-0 lg:w-full p-4 bg-slate-800/50 lg:bg-white/5 border border-white/5 rounded-2xl backdrop-blur-xl group hover:border-blue-500/30 transition-all">
        <div className="flex items-center gap-2 mb-2" style={{ color }}>
            <div className="p-1.5 bg-current opacity-20 rounded-lg" />
            <div className="absolute text-sm">{icon}</div>
            <span className="text-[10px] font-black uppercase tracking-widest ml-6">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white tracking-tighter">{value}</span>
            <span className="text-[8px] font-bold text-slate-500 uppercase">{unit}</span>
        </div>
    </div>
);

export default AyushVitalDashboard;
