import React from 'react';
import { motion } from 'framer-motion';
import websiteMockup from "../../assets/images/home/WebsiteShowcase.png";
import { BsGlobe, BsLaptop, BsMouse } from "react-icons/bs";

const WebsiteShowcase = () => {
    return (
        <section className="w-full py-20 lg:py-32 overflow-hidden relative bg-white/30">
            {/* Background Decor - Patriotic Aura */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 xl:gap-24 w-full">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 text-center lg:text-left space-y-8 order-2 lg:order-1 flex flex-col items-center lg:items-start"
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center px-5 py-2 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
                            >
                                <BsGlobe className="mr-3 text-lg animate-spin-slow text-orange-400" />
                                Elite Web Portal 2026
                            </motion.div>

                            <h2 className="text-[clamp(36px,6vw,72px)] font-black text-slate-900 leading-[1] tracking-tighter uppercase mb-6">
                                Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-green-600">The Screen</span>
                            </h2>

                            <p className="text-xl sm:text-2xl text-slate-600 leading-tight font-bold uppercase tracking-tight opacity-90 max-w-xl">
                                The Sehaat Saathi interface reimagined for massive digital dominance.
                            </p>
                        </div>

                        <ul className="space-y-4 w-full max-w-lg">
                            {[
                                { icon: BsLaptop, text: "Immersive Wide-Screen Dashboard", color: "text-orange-600" },
                                { icon: BsMouse, text: "Drag-and-Drop Medical Intelligence", color: "text-blue-700" },
                                { icon: BsGlobe, text: "Universal AI Link Sovereignity", color: "text-green-700" }
                            ].map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${item.color} group-hover:bg-white transition-all duration-300 shadow-inner`}>
                                        <item.icon className="text-xl" />
                                    </div>
                                    <span className="font-extrabold text-slate-800 uppercase tracking-tighter text-base sm:text-lg">{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-4 group"
                        >
                            Explore Hub <BsMouse className="group-hover:animate-bounce" />
                        </motion.button>
                    </motion.div>

                    {/* Laptop Showcase Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full lg:w-1/2 order-1 lg:order-2 perspective-2000"
                    >
                        <div className="relative group mx-auto max-w-[600px] lg:max-w-none">
                            {/* Dynamic Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-green-500/10 blur-[100px] rounded-full scale-125 animate-pulse"></div>

                            <motion.img
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                src={websiteMockup}
                                alt="Sehaat Saathi Website Interface"
                                className="relative z-10 w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)] rounded-lg"
                            />

                            {/* Floating Status Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="absolute -bottom-8 -left-4 xl:-left-12 bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/60 flex items-center gap-5 z-20 hidden md:flex min-w-[260px]"
                            >
                                <div className="relative">
                                    <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 w-3.5 h-3.5 bg-green-500 rounded-full"></div>
                                </div>
                                <div>
                                    <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Grid Status</div>
                                    <div className="text-base font-black text-slate-900 tracking-tighter">AI NEURAL SYNC ACTIVE</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 10s linear infinite; }
                .perspective-2000 { perspective: 2000px; }
            `}} />
        </section>
    );
};

export default WebsiteShowcase;
