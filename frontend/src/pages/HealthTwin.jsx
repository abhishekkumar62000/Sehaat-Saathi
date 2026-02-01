import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsStars, BsCpuFill, BsActivity, BsShieldCheck } from 'react-icons/bs';

const HealthTwin = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/smarthub" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group font-bold">
                        <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Smart Hub
                    </Link>
                    <div className="flex items-center gap-3">
                        <BsActivity className="text-cyan-400 animate-spin-slow" />
                        <span className="font-black uppercase tracking-[0.3em] text-[10px]">AI Genomic Health-Twin v0.1</span>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20 animate-fade-in">
                        <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
                            <BsActivity size={40} className="text-cyan-400 animate-pulse" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Your Digital <span className="text-cyan-400">Health-Twin.</span></h1>
                        <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                            Upload your genomic data and let our AI build a 100% accurate biological replica to predict risks and longevity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <BsStars className="text-cyan-400 mb-6 group-hover:animate-spin" size={30} />
                            <h3 className="text-xl font-black mb-4">DNA Sequencing</h3>
                            <p className="text-slate-500 text-sm font-bold leading-relaxed">Analyze 3.2 billion base pairs to identify genetic markers for 500+ conditions before symptoms appear.</p>
                        </div>
                        <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <BsCpuFill className="text-purple-400 mb-6 group-hover:animate-pulse" size={30} />
                            <h3 className="text-xl font-black mb-4">Neural Aging Model</h3>
                            <p className="text-slate-500 text-sm font-bold leading-relaxed">Predict biological age vs chronological age with 99% accuracy using epigenetic clock algorithms.</p>
                        </div>
                        <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <BsShieldCheck className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={30} />
                            <h3 className="text-xl font-black mb-4">Precision Prevention</h3>
                            <p className="text-slate-500 text-sm font-bold leading-relaxed">Get 100% personalized lifestyle and diet interventions based on your unique genetic metabolism markers.</p>
                        </div>
                    </div>

                    <div className="mt-20 p-20 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-[4rem] border border-white/5 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                        <h2 className="text-3xl font-black mb-8 italic uppercase tracking-widest">Coming Soon to Sehaat Saathi</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400">Risk Mapping</div>
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400">Longevity Path</div>
                            <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400">Bio-Twin Sync</div>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-spin-slow { animation: spin 8s linear infinite; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HealthTwin;
