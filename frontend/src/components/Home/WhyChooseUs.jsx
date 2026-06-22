import { whyChooseUsData } from "../../assets/data/whyChooseUsData";
import { useEffect, useState } from "react";
import SehaatSaathiImg from "../../assets/images/others/SehaatSaathi.png";

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header section with modern typography and Image */}
        <div className="text-center mb-16 relative flex flex-col items-center">
          {/* Decorative Flag Mesh Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full z-0 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-60 h-60 bg-green-500/10 blur-[100px] rounded-full z-0"></div>

          {/* Ultimate Extreme Animated Image Container */}
          <div className="mb-16 relative z-10 flex items-center justify-center">

            {/* 1. Morphing Flag Liquid Blob (Background) */}
            <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] animate-morph-slow opacity-30 blur-2xl sm:blur-3xl bg-gradient-to-br from-[#FF9933] via-white to-[#138808]"></div>

            {/* 2. Rotating Colorful Aura */}
            <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full animate-spin-slow opacity-25 blur-2xl sm:blur-3xl bg-conic-gradient"></div>

            {/* 3. Multi-Speed Pulsating Patriotic Glows */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_100px_rgba(255,153,51,0.3)] animate-pulse-neon"></div>
            <div className="absolute inset-[-20px] rounded-full border border-orange-400/20 animate-ping-slow"></div>
            <div className="absolute inset-[-40px] rounded-full border border-green-400/10 animate-ping-slower"></div>

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
              {/* Animated Flag Border Ring */}
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] animate-spin-linear blur-sm group-hover:blur-md transition-all duration-700 shadow-2xl"></div>

              <div className="relative p-1 bg-white rounded-full overflow-hidden">
                <img src={SehaatSaathiImg}
                  alt="Sehaat Saathi"
                  className="w-64 h-64 object-cover rounded-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 z-10"
                 loading="lazy" />
                {/* Gloss & Sparkle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <span className="text-orange-600 font-black tracking-[0.4em] uppercase text-xs mb-6 block relative z-10 transition-all duration-500 group-hover:tracking-[0.6em]">
            SOVEREIGN DEDICATION
          </span>
          <h2 className="text-[clamp(28px,8vw,72px)] font-black text-slate-900 mb-6 relative z-10 tracking-tighter uppercase leading-[0.9]">
            The <span style={{ color: "#FF9933" }}>Future</span> of <span style={{ color: "#138808" }}>Bharat's</span> Health
          </h2>
          <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto rounded-full relative z-10 mb-8 shadow-lg"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-lg lg:text-xl leading-relaxed relative z-10 text-center font-black uppercase tracking-tight opacity-90 px-4 sm:px-0">
            Bridging the gap between legacy wisdom and futuristic AI diagnostics. Built with pride, for every Indian.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Background decorative elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -z-10"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full -z-10"></div>

          {whyChooseUsData.map((feature, index) => (
            <div
              key={index}
              className={`group p-10 tri-glass rounded-[50px] transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center transform hover:-translate-y-4 hover:shadow-2xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 w-full h-2 transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(to right, #FF9933, #FFFFFF, #138808)` }}
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
                className="w-16 h-1.5 rounded-full mt-10 transition-all duration-500 group-hover:w-32"
                style={{ background: `linear-gradient(to right, #FF9933, #138808)` }}
              ></div>

              {/* Background shape on hover */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gray-50 rounded-full transition-all duration-700 group-hover:scale-[3] group-hover:opacity-20 z-[-1]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
