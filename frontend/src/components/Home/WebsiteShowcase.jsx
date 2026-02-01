import React from 'react';
import websiteMockup from "../../assets/images/home/WebsiteShowcase.png";
import logo from "../../assets/images/brand-logo/SehaatSaathi Logo.png";
import { BsGlobe, BsLaptop, BsMouse } from "react-icons/bs";

const WebsiteShowcase = () => {
    return (
        <section className="container py-20 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-8 order-2 lg:order-1">
                    <div className="inline-block px-4 py-2 bg-teal-50/80 text-teal-600 rounded-full text-sm font-bold uppercase tracking-wider mb-2 border border-teal-100 shadow-sm">
                        <BsGlobe className="inline mr-2 text-lg" />
                        Web Experience 2.0
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-800 leading-tight flex flex-col items-center lg:items-start lg:flex-row gap-3 justify-center lg:justify-start">
                        <span className='flex items-center gap-3'>
                            Our
                            <span className="flex items-center gap-2">
                                <span className="text-[#009E60]">Sehaat</span>
                                <span className="text-[#FF8C00]">Saathi</span>
                            </span>
                        </span>
                        <span className="flex items-center gap-3">
                            Website
                            <img src={logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 animate-bounce" />
                        </span>
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Experience the future of healthcare on the big screen. Our web platform offers a comprehensive dashboard for deep analytics, detailed report viewing, and seamless tele-consultations.
                    </p>

                    <ul className="space-y-4 text-left mx-auto lg:mx-0 max-w-md">
                        {[
                            { icon: BsLaptop, text: "Immersive Wide-Screen Dashboard" },
                            { icon: BsMouse, text: "Drag-and-Drop Medical Records" },
                            { icon: BsGlobe, text: "Universal Access from Any Browser" }
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
                                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    <item.icon className="text-xl" />
                                </div>
                                <span className="font-bold text-slate-700">{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-2xl shadow-slate-900/30 hover:scale-105 hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto lg:mx-0">
                        Explore Web Platform <BsMouse />
                    </button>
                </div>

                {/* Laptop Showcase Image */}
                <div className="lg:w-1/2 order-1 lg:order-2 perspective-2000 group">
                    <div className="relative transform transition-all duration-700 lg:group-hover:rotate-y-[-5deg] lg:group-hover:rotate-x-[2deg]">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-teal-400/20 blur-[60px] rounded-full scale-90 animate-pulse"></div>

                        <img
                            src={websiteMockup}
                            alt="Sehaat Saathi Website Interface"
                            className="relative z-10 w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] animate-float-medium"
                        />

                        {/* Floating Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-20 animate-float-slow hidden md:flex">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">System Status</div>
                                <div className="text-sm font-black text-slate-700">All Systems Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
                .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
                .perspective-2000 { perspective: 2000px; }
                .rotate-y-\[-5deg\] { transform: rotateY(-5deg); }
                .rotate-x-\[2deg\] { transform: rotateX(2deg); }
                .group:hover .lg\:group-hover\:rotate-y-\[-5deg\] { transform: rotateY(-5deg) rotateX(2deg); }
            `}</style>
        </section>
    );
};

export default WebsiteShowcase;
