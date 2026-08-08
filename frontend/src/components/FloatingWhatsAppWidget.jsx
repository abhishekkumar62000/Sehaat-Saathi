import { useState, useEffect } from "react";
import { BsWhatsapp, BsChatDotsFill, BsX, BsPatchCheckFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import founderAvatar from "../assets/founder_whatsappset.png";

const FloatingWhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds to grab attention, then hide after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleWhatsappRedirect = () => {
    const message = encodeURIComponent("Hello Abhishek! I came from the Sehaat Saathi portal and have a query.");
    const url = `https://wa.me/916200087830?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-28 right-8 z-[120] font-sans flex flex-col items-end">
      <AnimatePresence>
        {/* Chat Window Popup */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[340px] bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden text-white backdrop-blur-xl bg-opacity-95"
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center gap-4">
              <div className="relative shrink-0">
                <img src={founderAvatar} alt="Abhishek Kumar" className="w-12 h-12 rounded-2xl object-cover object-top border border-white/20 shadow-inner" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full" />
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-sm tracking-wide uppercase flex items-center gap-1.5 text-white">
                  Abhishek Kumar <BsPatchCheckFill className="text-sky-300 text-xs shrink-0" />
                </h4>
                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest opacity-90">Founder, Sehaat Saathi</p>
                <p className="text-[9px] font-bold text-emerald-200 mt-0.5">Replies instantly 🟢</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <BsX className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="p-6 space-y-4 max-h-[220px] overflow-y-auto bg-slate-950/40">
              <div className="flex gap-2">
                <div className="p-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-none text-[12px] leading-relaxed text-slate-200 font-medium">
                  Namaste! 🙏 I am Abhishek Kumar, Founder of Sehaat Saathi.
                  <br /><br />
                  How can I help you improve your healthcare or hospital experience today? Feel free to ask anything!
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-900 flex flex-col gap-2">
              <button
                onClick={handleWhatsappRedirect}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 border border-emerald-400/20"
              >
                <BsWhatsapp className="w-4 h-4" /> Connect On WhatsApp
              </button>
              <p className="text-[8px] text-slate-500 font-black text-center uppercase tracking-widest">
                Protected by WhatsApp Secure Redirect
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Trigger) */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip Alert */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute right-16 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg shadow-emerald-500/20 flex items-center gap-2 border border-emerald-400/30 cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
            >
              Founder Online! <BsWhatsapp />
              <div className="absolute right-[-6px] top-[14px] w-3 h-3 bg-emerald-500 rotate-45 border-r border-t border-emerald-400/30"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Floating Bubble */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all shadow-xl active:scale-95 ${
            isOpen 
              ? "bg-slate-900 border border-slate-800 rotate-90" 
              : "bg-emerald-500 hover:bg-emerald-600 animate-pulse border border-emerald-400/30"
          }`}
        >
          {isOpen ? (
            <BsX className="w-7 h-7 text-red-500" />
          ) : (
            <div className="relative">
              <BsWhatsapp className="w-6 h-6 animate-bounce" />
              <span className="absolute top-[-4px] right-[-4px] w-2.5 h-2.5 bg-green-400 border border-emerald-500 rounded-full animate-ping" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingWhatsAppWidget;
