import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsLightningChargeFill,
  BsInfoCircleFill,
  BsActivity,
  BsGeoAltFill,
  BsArrowLeftShort,
  BsXCircle,
  BsCheck2Circle
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

const PainNavigator3D = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [view, setView] = useState("front"); // front or back

  const bodyParts = {
    front: [
      { id: "head", name: "Head/Brain", path: "M50 5 Q40 5 35 15 Q40 25 50 25 Q60 25 65 15 Q60 5 50 5", color: "fill-rose-500/20 hover:fill-rose-500/40" },
      { id: "neck", name: "Neck/Throat", path: "M45 25 L55 25 L55 30 L45 30 Z", color: "fill-blue-500/20 hover:fill-blue-500/40" },
      { id: "chest", name: "Chest/Heart/Lungs", path: "M35 30 L65 30 L70 50 L30 50 Z", color: "fill-emerald-500/20 hover:fill-emerald-500/40" },
      { id: "abdomen", name: "Abdomen/Stomach", path: "M30 50 L70 50 L75 75 L25 75 Z", color: "fill-orange-500/20 hover:fill-orange-500/40" },
      { id: "pelvis", name: "Pelvis/Groin", path: "M25 75 L75 75 L70 85 L30 85 Z", color: "fill-purple-500/20 hover:fill-purple-500/40" },
      { id: "right_arm", name: "Right Arm", path: "M70 30 L85 65 L80 70 L65 35 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
      { id: "left_arm", name: "Left Arm", path: "M30 30 L15 65 L20 70 L35 35 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
      { id: "right_leg", name: "Right Leg", path: "M50 85 L70 85 L65 130 L55 130 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
      { id: "left_leg", name: "Left Leg", path: "M50 85 L30 85 L35 130 L45 130 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
    ],
    back: [
      { id: "back_head", name: "Back of Head (Occipital)", path: "M50 5 Q40 5 35 15 Q40 25 50 25 Q60 25 65 15 Q60 5 50 5", color: "fill-rose-500/20 hover:fill-rose-500/40" },
      { id: "cervical", name: "Cervical/Neck (Back)", path: "M45 25 L55 25 L55 30 L45 30 Z", color: "fill-blue-400/20 hover:fill-blue-400/40" },
      { id: "upper_back", name: "Upper Back/Shoulders", path: "M35 30 L65 30 L70 50 L30 50 Z", color: "fill-blue-600/20 hover:fill-blue-600/40" },
      { id: "lower_back", name: "Lower Back/Lumbar", path: "M30 50 L70 50 L75 75 L25 75 Z", color: "fill-orange-500/20 hover:fill-orange-500/40" },
      { id: "spine", name: "Spinal Column (Full)", path: "M48 30 L52 30 L52 85 L48 85 Z", color: "fill-white/10 hover:fill-white/30" },
      { id: "right_heel", name: "Right Heel/Ankle", path: "M65 130 Q65 140 55 140 L55 130 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
      { id: "left_heel", name: "Left Heel/Ankle", path: "M35 130 Q35 140 45 140 L45 130 Z", color: "fill-slate-500/20 hover:fill-slate-500/40" },
    ]
  };

  const handlePartClick = async (part) => {
    setSelectedPart(part);
    setLoading(true);
    setDiagnosis(null);

    try {
      const res = await fetch(`${BASE_URL}/ai-doctor/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Anatomical Pain Navigation for region: ${part.name}`,
          role: "General Physician (General Medicine)"
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDiagnosis(data.response);
        toast.success(`Clinical Insights for ${part.name} Ready!`);
      } else {
        toast.error("Failed to fetch anatomical insights.");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans overflow-x-hidden relative">
      {/* Background Decorative Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-12 relative z-10">
        <Link to="/smarthub" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all flex items-center gap-2 group">
          <BsArrowLeftShort className="text-2xl group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Back</span>
        </Link>
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <BsActivity className="text-blue-500 animate-pulse text-xs" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Chakra Neural Mapping</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent italic">
            PAIN <span className="text-blue-500 uppercase">NAVIGATOR</span>
          </h1>
          <p className="text-slate-500 text-[10px] md:text-xs mt-2 font-bold tracking-[0.3em] uppercase">Interactive Anatomical Triage Hub</p>
        </div>
        <div className="w-16 h-16 hidden md:flex items-center justify-center bg-white/5 rounded-full border border-white/10">
          <BsGeoAltFill className="text-blue-500 animate-bounce" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Navigator Controls & 3D Model */}
        <div className="lg:col-span-5 space-y-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <BsActivity className="text-8xl text-blue-500" />
            </div>

            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-black">ANATOMICAL VIZ</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Select Region of Concern</p>
              </div>
              <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
                <button
                  onClick={() => setView("front")}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'front' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  Front
                </button>
                <button
                  onClick={() => setView("back")}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'back' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  Back
                </button>
              </div>
            </div>

            {/* Interactive Body Map */}
            <div className="relative aspect-[3/4] flex justify-center bg-gradient-to-b from-blue-900/10 to-transparent rounded-[2.5rem] border border-white/5 py-8">
              <svg
                viewBox="0 0 100 150"
                className="h-full w-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                {/* Base Body Silhouette */}
                <path
                  d="M50 5 Q35 5 30 20 L30 30 L15 65 L25 75 L30 50 L25 80 L35 140 L45 140 L50 90 L55 140 L65 140 L75 80 L70 50 L75 75 L85 65 L70 30 L70 20 Q65 5 50 5"
                  className="fill-slate-800 stroke-white/10 stroke-[0.5]"
                />

                {/* Interactive Hotspots */}
                {bodyParts[view].map((part) => (
                  <motion.path
                    key={part.id}
                    d={part.path}
                    className={`${part.color} stroke-white/20 stroke-[0.5] cursor-pointer transition-all duration-300 ${selectedPart?.id === part.id ? 'fill-blue-500/60' : ''}`}
                    onClick={() => handlePartClick(part)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                  />
                ))}
              </svg>

              {/* Selection Marker */}
              <AnimatePresence>
                {selectedPart && !loading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute p-3 bg-blue-600 rounded-full shadow-xl shadow-blue-500/50 border-2 border-white pointer-events-none"
                    style={{
                      top: '20%',
                      right: '10%',
                    }}
                  >
                    <BsLightningChargeFill className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex gap-3 flex-wrap">
              {['Head', 'Abdomen', 'Spine', 'Shoulder'].map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-slate-400"># {t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Center */}
        <div className="lg:col-span-7 space-y-6 relative z-10 h-full flex flex-col">
          <div className="flex-1 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 flex flex-col relative group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px]" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 relative overflow-hidden">
                  <BsActivity className="text-white text-xl animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black">NEURAL ANALYSIS</h3>
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Powered by Sehaat Intelligence v6.0</p>
                </div>
              </div>
              {selectedPart && (
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-500">Zone:</span>
                  <span className="text-[10px] font-black uppercase text-white">{selectedPart.name}</span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center space-y-8"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 border-8 border-white/5 rounded-full" />
                      <div className="absolute inset-0 w-32 h-32 border-8 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BsInfoCircleFill className="text-4xl text-blue-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-black italic bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">MAPPING PAIN SIGNAL...</p>
                      <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-[0.4em] animate-pulse">Consulting Neural Database</p>
                    </div>
                  </motion.div>
                ) : diagnosis ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8 pb-8"
                  >
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8">
                      <p className="text-sm font-medium leading-relaxed text-blue-100 whitespace-pre-wrap">
                        {diagnosis}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 flex items-start gap-4 transition-all hover:bg-emerald-500/20">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                          <BsCheck2Circle className="text-white text-xl" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Recommended Dept</p>
                          <p className="text-xs font-bold text-white">General Practitioner or Orthopedics</p>
                        </div>
                      </div>
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 flex items-start gap-4 transition-all hover:bg-rose-500/20">
                        <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center shrink-0">
                          <BsXCircle className="text-white text-xl" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Emergency Warning</p>
                          <p className="text-xs font-bold text-white">Sudden loss of mobility or severe bruising.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                      <BsGeoAltFill className="text-6xl text-slate-800" />
                    </div>
                    <h4 className="text-xl font-black text-slate-500 italic">SYSTEM IDLE</h4>
                    <p className="text-xs text-slate-600 mt-2 font-bold uppercase tracking-widest max-w-xs mx-auto">Click on any body region in the navigator to initialize clinical triangulation.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-r from-slate-900 to-black border border-white/5 rounded-[2.5rem] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Precision</p>
                <p className="text-xl font-black text-blue-500">98.4%</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Latency</p>
                <p className="text-xl font-black text-emerald-500">0.4s</p>
              </div>
            </div>
            <button
              onClick={() => { setSelectedPart(null); setDiagnosis(null); }}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Reset Hub
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  );
};

export default PainNavigator3D;
