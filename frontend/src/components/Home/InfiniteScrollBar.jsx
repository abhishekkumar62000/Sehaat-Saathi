import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsActivity, BsStars } from "react-icons/bs";

const InfiniteScrollBar = () => {
  const [livesSaved, setLivesSaved] = useState(15240);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Real-time Impact Counter Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLivesSaved(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const segments = [
    { text: "Welcome to Sehaat Saathi — Your Trusted Partner for Healthcare Services.", color: "text-orange-600", isBold: true },
    { text: "Sehaat Saathi is India's 1st AI Powered Virtual HealthCare Platform", color: "text-slate-800", isBold: true },
    { text: "Designed for remote consultations, emergency healthcare & diagnostic solutions!", color: "text-green-700", isBold: true },
    { text: "Sehaat Saathi ", isBrand: true },
    { text: "🇮🇳 BHARAT'S AI HEALTH SOVEREIGNTY", color: "text-blue-700", isBold: true },
    { text: `• ${livesSaved.toLocaleString()} Bharat Lives Secured`, color: "text-red-600", isBold: true, isLive: true },
    { text: "• Sehaat Express Track", color: "text-orange-600", link: "/express-track", power: "Live Technician GPS Tracking" },
    { text: "• Sehaat AI Doctor", color: "text-blue-600", link: "/doctor-ai", power: "Instant Symptom Chat" },
    { text: "• Instant Video Consultations", color: "text-green-600", link: "/tele-consult", power: "Specialist Link in 15s" },
    { text: "• Offline Doctor Booking", color: "text-indigo-600", link: "/offline-consultation", power: "Smart Crowd Predictor" },
    { text: "• AI Symptom Checker", color: "text-purple-600", link: "/symptom-checker", power: "Medical History Mapping" },
    { text: "• Allopathic Medicine Hub", color: "text-rose-600", link: "/medicine-suggestion", power: "WHO/FDA Databases" },
    { text: "• Homeopathy Hub", color: "text-emerald-600", link: "/homeopathy-hub", power: "Natural Healing Guidance" },
    { text: "• Ayurveda Medicine Hub", color: "text-amber-600", link: "/ayurveda-hub", power: "Ancient Wisdom v5.0" },
    { text: "• Naturopathy & Lifestyle", color: "text-green-600", link: "/naturopathy-hub", power: "Zero Side-Effect Cures" },
    { text: "• AI Nutrition Hub", color: "text-lime-600", link: "/nutrition-hub", power: "ICMR Compliant Diets" },
    { text: "• Emergency Protocols", color: "text-red-600", link: "/emergency-protocols", power: "Critical SOS Guidance" },
    { text: "• Follow-up Reminders", color: "text-emerald-500", link: "/follow-up-hub", power: "Proactive Recovery Sync" },
    { text: "• Personalized Health AI", color: "text-cyan-600", link: "/personalized-health", power: "Digital Twin Mapping" },
    { text: "• AI Skin Diagnosis", color: "text-violet-600", link: "/skin-diagnosis", power: "Neural Image Recognition" },
    { text: "• Pharmacy-Hub Express", color: "text-emerald-700", link: "/pharmacy-hub", power: "45-min Ultra Delivery" },
    { text: "• BloodBank SOS Network", color: "text-red-700", link: "/blood-bank", power: "Life-Saving Real-time Finder" },
    { text: "• Emergency Health ID", color: "text-red-600", link: "/emergency-health-id", power: "Govt-Ready Digital ID" },
    { text: "• Live OPD & Bed Availability", color: "text-red-500", link: "/hospital-availability", power: "ICU/Ventilator Tracker" },
    { text: "• AI Medical Report Interpreter", color: "text-emerald-600", link: "/report-interpreter", power: "PDF to Easy Hindi/English" },
    { text: "• Medicine Shortage Finder", color: "text-indigo-600", link: "/medicine-finder", power: "Verified Alternatives Sync" },
    { text: "• Neural Price Optimizer", color: "text-green-700", link: "/medicine-price-compare", power: "Deep Savings Hub v8.0" },
    { text: "• Smart Ambulance Dispatch", color: "text-red-600", link: "/ambulance-dispatch", power: "Auto-Priority Dispatch" },
    { text: "• Women's Pregnancy Safe Haven", color: "text-rose-500", link: "/women-care", power: "Private Sisterhood AI" },
    { text: "• Caregiver Panic Button", color: "text-indigo-700", link: "/caregiver-panic", power: "Instant Family SOS" },
    { text: "THE FUTURE OF BHARAT'S HEALTH", color: "text-slate-400", isBold: true },
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-slate-50/10 backdrop-blur-md py-3 sm:py-4 border-y border-white/40 relative group cursor-default">
      {/* Neural Pulse (EKG Line) Background */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            d="M0,50 L200,50 L210,30 L220,70 L230,50 L400,50 L410,10 L420,90 L430,50 L600,50 L610,30 L620,70 L630,50 L800,50 L810,10 L820,90 L830,50 L1000,50"
            fill="none"
            stroke="url(#ekg-gradient)"
            strokeWidth="2"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="ekg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#000080" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none"></div>

      <div className="absolute inset-0 flex opacity-[0.05] pointer-events-none">
        <div className="flex-1 bg-orange-500 blur-3xl"></div>
        <div className="flex-1 bg-white blur-3xl"></div>
        <div className="flex-1 bg-green-500 blur-3xl"></div>
      </div>

      <div
        className="inline-block lg:text-[18px] text-[13px] font-black uppercase tracking-[0.12em] leading-none group-hover:[animation-play-state:paused] transition-all duration-500"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scroll 120s linear infinite",
        }}
      >
        {Array(2).fill(null).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8 mr-8">
            <BsActivity className="text-orange-500 animate-pulse text-2xl" />
            {segments.map((seg, idx) => (
              <div
                key={idx}
                className="relative inline-flex items-center"
                onMouseEnter={() => seg.power && setHoveredFeature(`${i}-${idx}`)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {seg.link ? (
                  <Link
                    to={seg.link}
                    className={`${seg.color} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 relative group/link inline-flex items-center gap-2`}
                  >
                    {seg.text}
                    {seg.isLive && <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping"></span>}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-current group-hover/link:w-full transition-all duration-700"></span>
                  </Link>
                ) : (
                  <span className={`${seg.isBrand ? "" : seg.color} ${seg.isBold ? "font-black" : ""} inline-flex items-center gap-2`}>
                    {seg.isBrand ? (
                      <>
                        <span style={{ color: "#FF9933" }}>Sehaat</span>{" "}
                        <span style={{ color: "#138808" }}>Saathi</span>
                      </>
                    ) : (
                      <>
                        {seg.text}
                        {seg.isLive && <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping"></span>}
                      </>
                    )}
                  </span>
                )}

                {hoveredFeature === `${i}-${idx}` && seg.power && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 tri-glass px-4 py-2 rounded-xl border border-white/50 shadow-2xl animate-fade-in z-50">
                    <p className="text-[10px] font-black text-slate-800 tracking-wider whitespace-nowrap">
                      ⚡ SUPERPOWER: {seg.power}
                    </p>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/60 rotate-45 border-r border-b border-white/50"></div>
                  </div>
                )}
              </div>
            ))}
            <span className="text-slate-400 opacity-40 px-6 font-thin">━━━━━━━━━ 🇮🇳 ━━━━━━━━━</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollBar;

