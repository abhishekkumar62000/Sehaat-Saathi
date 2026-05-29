import React from 'react';
import { motion } from 'framer-motion';
import AIDoctorLogo from '../../assets/AI_Doctor.png';

const SanjeevaniMascot = ({ isTyping, isAnalyzing, urgency }) => {
    const [isWaking, setIsWaking] = React.useState(false);

    const getMascotColor = () => {
        if (urgency === 'EMERGENCY') return '#EF4444';
        if (isAnalyzing || isTyping) return '#3B82F6';
        if (isWaking) return '#F59E0B';
        return '#10B981';
    };

    const color = getMascotColor();

    const handleWake = () => {
        setIsWaking(true);
        setTimeout(() => setIsWaking(false), 2000);
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWake}
            className="flex flex-col items-center justify-center p-2 lg:p-4 cursor-pointer relative group"
        >
            <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center">
                {/* Synapse Ring - Unique Animation */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: isAnalyzing ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 rounded-full border-dashed opacity-40"
                    style={{ borderColor: color, borderWidth: '2px', borderStyle: 'dashed' }}
                />

                {/* Neural Glow Pulse */}
                <motion.div
                    animate={{
                        opacity: isAnalyzing || isTyping ? [0.3, 0.6, 0.3] : [0.15, 0.25, 0.15],
                        scale: isAnalyzing || isTyping ? [1, 1.25, 1] : [1, 1.05, 1],
                    }}
                    transition={{
                        duration: isAnalyzing || isTyping ? 1.5 : 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-1 rounded-full blur-xl"
                    style={{ backgroundColor: `${color}30` }}
                />

                {/* Main Logo Container */}
                <motion.div
                    animate={{
                        y: isWaking ? [-10, 10, -10] : (isAnalyzing || isTyping ? [-4, 4, -4] : [-2, 2, -2]),
                        scale: isWaking ? 1.1 : 1,
                    }}
                    transition={{
                        y: { duration: isAnalyzing || isTyping ? 2 : 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="relative w-16 h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden z-10"
                    style={{ border: `2px solid ${color}60`, boxShadow: `0 0 30px ${color}20` }}
                >
                    <img
                        src={AIDoctorLogo}
                        alt="AI Doctor"
                        className="w-full h-full object-cover select-none"
                    />

                    {/* Glass Shimmer Effect */}
                    <motion.div
                        animate={{
                            left: ['-100%', '200%'],
                        }}
                        transition={{
                            duration: isAnalyzing || isTyping ? 1.5 : 3,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                        style={{ skew: '-25deg' }}
                    />
                </motion.div>

                {/* Satellite Tech Particles - More dynamic when active */}
                <TechParticle delay={0} color={color} x={-35} y={-35} active={isAnalyzing || isTyping} />
                <TechParticle delay={1} color={color} x={45} y={-20} active={isAnalyzing || isTyping} />
                <TechParticle delay={2} color={color} x={35} y={50} active={isAnalyzing || isTyping} />
            </div>

            {/* Prestige Label */}
            <motion.div
                whileHover={{ y: -2 }}
                className="mt-3 px-4 py-1.5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center gap-2 group-hover:border-emerald-500/30 transition-colors"
                style={{ borderLeft: `3px solid ${color}` }}
            >
                <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}`,
                        animation: isAnalyzing || isTyping ? 'pulse 1s infinite' : 'none'
                    }}
                />
                <span className="text-[10px] font-semibold text-white uppercase tracking-tighter">
                    Sanjeevani <span style={{ color: '#10B981' }}>AI</span>{' '}
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: '500', marginLeft: '3px' }}>v12.0</span>
                </span>
            </motion.div>
        </motion.div>
    );
};

const TechParticle = ({ delay, color, x, y }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0, 0.8, 0],
            x: [x, x + 15, x],
            y: [y, y - 15, y],
            scale: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, delay }}
        className="absolute w-1.5 h-1.5 rounded-full z-0"
        style={{ left: '50%', top: '50%', backgroundColor: color, filter: 'blur(0.5px)' }}
    />
);

export default SanjeevaniMascot;
