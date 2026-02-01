import { whyChooseUsData } from "../../assets/data/whyChooseUsData";
import { useEffect, useState } from "react";
import SehaatSaathiImg from "../../assets/images/others/SehaatSaathi.png";

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 mb-10 overflow-hidden">
      {/* Header section with modern typography and Image */}
      <div className="text-center mb-16 relative flex flex-col items-center">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-500/10 blur-[80px] rounded-full z-0"></div>

        {/* Ultimate Extreme Animated Image Container */}
        <div className="mb-16 relative z-10 flex items-center justify-center">

          {/* 1. Morphing Liquid Blob (Background) */}
          <div className="absolute w-[350px] h-[350px] animate-morph-slow opacity-40 blur-2xl bg-gradient-to-br from-teal-400 via-purple-500 to-pink-500"></div>

          {/* 2. Rotating Colorful Aura */}
          <div className="absolute w-[300px] h-[300px] rounded-full animate-spin-slow opacity-25 blur-3xl bg-conic-gradient"></div>

          {/* 3. Multi-Speed Pulsating Neon Glows */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(45,212,191,0.4)] animate-pulse-neon"></div>
          <div className="absolute inset-[-20px] rounded-full border border-teal-400/20 animate-ping-slow"></div>
          <div className="absolute inset-[-40px] rounded-full border border-purple-400/10 animate-ping-slower"></div>

          {/* 4. Triple Orbiting Particles (Different Speeds) */}
          <div className="absolute inset-0 animate-spin-linear pointer-events-none">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-teal-400 rounded-full blur-sm shadow-[0_0_15px_#2dd4bf]"></div>
          </div>
          <div className="absolute inset-0 animate-spin-linear-mid pointer-events-none">
            <div className="absolute bottom-1/4 right-0 w-3 h-3 bg-pink-500 rounded-full blur-sm shadow-[0_0_15px_#ec4899]"></div>
          </div>
          <div className="absolute inset-0 animate-spin-linear-slow pointer-events-none">
            <div className="absolute top-1/2 left-0 w-5 h-5 bg-purple-500 rounded-full blur-sm shadow-[0_0_15px_#a855f7]"></div>
          </div>

          {/* 5. The Main Animated Image with Moving Gradient Border */}
          <div className="relative animate-float-rotate group cursor-pointer">
            {/* Animated Border Ring */}
            <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 animate-spin-linear blur-sm group-hover:blur-md transition-all duration-700"></div>

            <div className="relative p-1 bg-white rounded-full overflow-hidden">
              <img
                src={SehaatSaathiImg}
                alt="Sehaat Saathi"
                className="w-64 h-64 object-cover rounded-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 z-10"
              />
              {/* Gloss & Sparkle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <span className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-3 block relative z-10">
          Why Sehaat Saathi?
        </span>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1a237e] mb-4 relative z-10">
          The Future of <span className="text-teal-500">Intelligent</span> Healthcare
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto rounded-full relative z-10 mb-6 font-mono text-center"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 text-center font-medium">
          Experience the pinnacle of AI-driven medical assistance. Our award-winning platform combines real-time diagnostics with expert specialist care for a healthier you.
        </p>
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full -z-10"></div>

        {whyChooseUsData.map((feature, index) => (
          <div
            key={index}
            className={`group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-3 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 w-full h-1.5 transition-all duration-500 opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: feature.color }}
            ></div>

            {/* Glowing circle background for icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mb-6 relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
              style={{ backgroundColor: `${feature.color}10` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{ backgroundColor: `${feature.color}30` }}
              ></div>
              <span className="relative z-10">{feature.icon}</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-black">
              {feature.title}
            </h3>

            <p className="text-gray-500 leading-relaxed font-medium">
              {feature.description}
            </p>

            {/* Bottom hover indicator */}
            <div
              className="w-12 h-1 rounded-full mt-8 transition-all duration-500 group-hover:w-20"
              style={{ backgroundColor: feature.color }}
            ></div>

            {/* Background shape on hover */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gray-50 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:opacity-20 z-[-1]"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(4deg); }
          66% { transform: translateY(-10px) rotate(-4deg); }
        }
        @keyframes morph-slow {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes spin-linear {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-linear-mid {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-linear-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-neon {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes ping-slower {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .bg-conic-gradient {
          background: conic-gradient(from 0deg, #2dd4bf, #a855f7, #ec4899, #2dd4bf);
        }
        .animate-float-rotate {
          animation: float-rotate 8s ease-in-out infinite;
        }
        .animate-morph-slow {
          animation: morph-slow 10s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-linear 15s linear infinite;
        }
        .animate-spin-linear {
          animation: spin-linear 4s linear infinite;
        }
        .animate-spin-linear-mid {
          animation: spin-linear 6s linear infinite;
        }
        .animate-spin-linear-slow {
          animation: spin-linear 10s linear infinite;
        }
        .animate-pulse-neon {
          animation: pulse-neon 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 6s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
