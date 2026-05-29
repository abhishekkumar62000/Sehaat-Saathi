import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGeoAltFill, BsTelephoneFill, BsHospital, BsCompass, BsShieldFillExclamation } from 'react-icons/bs';

const GPSEmergencyBeacon = ({ onCancel }) => {
    const [status, setStatus] = useState('initializing');
    const [nearbyHospitals, setNearbyHospitals] = useState([]);

    useEffect(() => {
        // Simulate GPS Locking
        const timer = setTimeout(() => {
            setStatus('locked');
            setNearbyHospitals([
                { name: 'Apollo Indraprastha', distance: '1.2 km', phone: '1066', rating: 4.8 },
                { name: 'Max Super Speciality', distance: '2.5 km', phone: '011-26515050', rating: 4.6 },
                { name: 'AIIMS Emergency', distance: '4.1 km', phone: '011-26588500', rating: 4.9 }
            ]);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border-2 border-red-500 rounded-[3rem] p-8 shadow-[0_0_50px_rgba(239,68,68,0.3)] relative overflow-hidden"
        >
            {/* Background Radar Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 border border-red-500/20 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1.2, 1.7, 1.2], opacity: [0.05, 0.2, 0.05] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute inset-0 border border-red-500/10 rounded-full"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-red-900/50 animate-pulse">
                    <BsShieldFillExclamation />
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 italic">Sanjeevani <span className="text-red-500">SOS Beacon</span></h3>
                <div className="flex items-center gap-2 mb-8">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                        {status === 'initializing' ? 'Locating Neural GPS Link...' : 'Satellite Lock Established - 100% Precision'}
                    </span>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">Current Coordinates</span>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                                <BsGeoAltFill />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white">New Delhi, Sector 62</p>
                                <p className="text-[10px] font-bold text-slate-500">28.6273° N, 77.3725° E</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">Emergency Protocol</span>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                                <BsCompass />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white">Auto-Share Active</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter italic">Sharing with nearby ER Hubs</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest ml-1">Nearby Hospital Hubs</h4>
                    <div className="space-y-3">
                        {nearbyHospitals.map((hosp, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-slate-800/80 border border-white/5 hover:border-red-500/30 rounded-2xl p-4 flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                        <BsHospital />
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-black text-white uppercase">{hosp.name}</h5>
                                        <p className="text-[9px] font-bold text-slate-500">{hosp.distance} away • ⭐ {hosp.rating}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a href={`tel:${hosp.phone}`} className="p-3 bg-white/5 hover:bg-emerald-600 rounded-xl text-slate-400 hover:text-white transition-all">
                                        <BsTelephoneFill className="text-sm" />
                                    </a>
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-[9px] rounded-xl uppercase tracking-widest transition-all">
                                        Navigate
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onCancel}
                    className="mt-8 text-[10px] font-black text-slate-600 hover:text-red-500 uppercase tracking-widest transition-colors cursor-pointer"
                >
                    Dismiss Beacon (If Safe)
                </button>
            </div>
        </motion.div>
    );
};

export default GPSEmergencyBeacon;
