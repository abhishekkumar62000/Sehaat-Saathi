const HealthSparkline = ({ color }) => {
    // Generate a clinical-looking heart-rate-like path
    const points = [20, 30, 25, 45, 10, 50, 20, 25, 30];
    const path = points.map((p, i) => `${i * 12},${50 - p}`).join(' L ');

    return (
        <svg className="w-full h-8 overflow-visible mt-2" viewBox="0 0 100 50">
            <motion.path
                d={`M 0,25 L ${path}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    );
};

const WearableDataSync = ({ vitals }) => {
    const healthTrends = [
        { label: 'Avg Resting Heart Rate', value: '68', unit: 'BPM', status: 'Stable', icon: <BsActivity />, color: '#10B981' },
        { label: 'Deep Sleep Cycle', value: '2.5', unit: 'Hrs', status: 'Optimal', icon: <BsMoonStarsFill />, color: '#6366F1' },
        { label: 'Metabolic Efficiency', value: '92', unit: '%', status: 'High', icon: <BsLightningFill />, color: '#F59E0B' }
    ];

    return (
        <div className="p-4 lg:p-8 bg-slate-900/60 border border-blue-500/20 rounded-[2rem] lg:rounded-[3rem] shadow-2xl relative overflow-hidden group">
            {/* Background Data Streaks */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,#3b82f6_50%,transparent_100%)] bg-[size:200%_1px] animate-[loading-bar_4s_infinite_linear]"></div>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Neural Wearable Link</span>
                        <h4 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tighter italic">Bio-Metric Trend Analysis</h4>
                    </div>
                    <div className="flex items-center gap-2 self-start lg:self-auto px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[8px] font-black text-blue-400 uppercase animate-pulse">
                        <BsGraphUp /> Synchronized
                    </div>
                </div>

                <div className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                    {healthTrends.map((trend, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 w-[240px] lg:w-full bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col gap-3 hover:border-blue-500/30 transition-all cursor-default"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-lg" style={{ color: trend.color }}>{trend.icon}</div>
                                <span className="text-[7px] font-black uppercase" style={{ color: trend.color }}>{trend.status}</span>
                            </div>
                            <div>
                                <h5 className="text-[8px] font-bold text-slate-500 uppercase tracking-tight mb-1">{trend.label}</h5>
                                <p className="text-2xl font-black text-white tracking-tighter">{trend.value} <span className="text-[10px] text-slate-400 font-bold">{trend.unit}</span></p>
                                <HealthSparkline color={trend.color} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 flex-shrink-0">
                        <BsActivity className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase leading-tight">
                            AI Insight: Your <span className="text-white italic">Metabolic Velocity</span> is 12% higher than your 7-day average. Recovery is proceeding ahead of clinical schedule.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WearableDataSync;
