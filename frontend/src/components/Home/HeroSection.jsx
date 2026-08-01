import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import heroBg from "../../assets/images/home/heroBg.png";
import heroImg01 from "../../assets/images/home/heroImg.png";

const HeroSection = () => {
  return (
    <section
      className="container mx-auto min-h-[600px] lg:min-h-[800px] pt-10 pb-16 lg:pb-0 flex items-center tri-color-mesh rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] my-4 sm:my-8 lg:my-12 relative shadow-2xl shadow-orange-500/10 overflow-hidden px-4 sm:px-8 lg:px-16"
    >
      {/* Decorative Ashoka Chakra Silhouette Background */}
      <div className="absolute top-1/2 left-1/2 opacity-[0.08] pointer-events-none animate-ashok-chakra">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] border-[15px] sm:border-[25px] lg:border-[40px] border-[#000080] rounded-full flex items-center justify-center">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="absolute h-full w-[1.5px] sm:w-[2px] bg-[#000080]" style={{ transform: `rotate(${i * 15}deg)` }}></div>
          ))}
        </div>
      </div>

      {/* Floating Medical DNA - Left Side */}
      <div className="absolute top-20 left-10 opacity-10 pointer-events-none animate-float-dna hidden lg:block">
        <svg width="200" height="400" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#000080" strokeWidth="4" />
          <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#FF9933" strokeWidth="4" />
          <line x1="30" y1="35" x2="70" y2="35" stroke="#138808" strokeWidth="2" opacity="0.6" />
          <line x1="30" y1="85" x2="70" y2="85" stroke="#138808" strokeWidth="2" opacity="0.6" />
          <line x1="30" y1="135" x2="70" y2="135" stroke="#138808" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      {/* Floating Medical DNA - Right Side */}
      <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none animate-float-dna hidden lg:block" style={{ animationDelay: '2s' }}>
        <svg width="150" height="300" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 10 Q 70 35, 30 60 T 30 110 T 30 160" stroke="#138808" strokeWidth="4" />
          <path d="M70 10 Q 30 35, 70 60 T 70 110 T 70 160" stroke="#FF9933" strokeWidth="4" />
          <line x1="30" y1="35" x2="70" y2="35" stroke="#000080" strokeWidth="2" opacity="0.6" />
          <line x1="30" y1="85" x2="70" y2="85" stroke="#000080" strokeWidth="2" opacity="0.6" />
          <line x1="30" y1="135" x2="70" y2="135" stroke="#000080" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>

      {/* ECG Heartbeat Line */}
      <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-20 pointer-events-none overflow-hidden hidden md:block">
        <svg className="w-full h-full animate-ecg" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0,50 L100,50 L110,20 L120,80 L130,50 L200,50 L210,10 L220,90 L230,50 L1000,50"
            stroke="url(#ecgGradient)" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="1000" strokeDashoffset="1000" />
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#transparent" />
              <stop offset="10%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#138808" />
              <stop offset="90%" stopColor="#000080" />
              <stop offset="100%" stopColor="#transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div key={`particle-${i}`}
          className="absolute opacity-20 pointer-events-none animate-float-particle text-slate-400 font-bold"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}>
          {i % 2 === 0 ? '+' : '●'}
        </div>
      ))}

      {/* === PREMIUM ADVANCED ELEMENTS === */}

      {/* Glowing Medical Symbols */}
      <div className="absolute top-10 right-[15%] opacity-20 pointer-events-none hidden xl:block">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/30 to-green-500/30 flex items-center justify-center animate-symbol-glow rotate-12">
          <div className="text-3xl">🩺</div>
        </div>
      </div>

      <div className="absolute bottom-20 left-[20%] opacity-20 pointer-events-none hidden xl:block">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-orange-500/30 flex items-center justify-center animate-symbol-glow -rotate-12" style={{ animationDelay: '1s' }}>
          <div className="text-2xl">💊</div>
        </div>
      </div>

      {/* Medical Circuit Board */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none hidden lg:block" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#FF9933" strokeWidth="1" className="animate-circuit-glow" strokeDasharray="10,5" />
        <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#138808" strokeWidth="1" className="animate-circuit-glow" strokeDasharray="10,5" style={{ animationDelay: '1s' }} />
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#000080" strokeWidth="1" className="animate-circuit-glow" strokeDasharray="10,5" style={{ animationDelay: '0.5s' }} />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#FF9933" strokeWidth="1" className="animate-circuit-glow" strokeDasharray="10,5" style={{ animationDelay: '1.5s' }} />
      </svg>

      {/* Neural Network Nodes */}
      {[
        { x: '15%', y: '20%', delay: '0s' },
        { x: '85%', y: '25%', delay: '0.5s' },
        { x: '25%', y: '75%', delay: '1s' },
        { x: '75%', y: '80%', delay: '1.5s' },
      ].map((node, i) => (
        <div key={`node-${i}`}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-green-400 opacity-30 pointer-events-none animate-neural-pulse hidden lg:block"
          style={{ top: node.y, left: node.x, animationDelay: node.delay }}>
          <div className="absolute inset-0 rounded-full bg-white/50 animate-pulse"></div>
        </div>
      ))}

      {/* Shimmer Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 hidden lg:block">
        <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>

      {/* Particle Clusters */}
      {[...Array(12)].map((_, i) => (
        <div key={`cluster-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400/40 to-green-400/40 pointer-events-none animate-glow-pulse"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}>
        </div>
      ))}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 w-full relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <div className="w-full max-w-[650px] mx-auto lg:mx-0">
            {/* Main Heading with Animation */}
            <div className="flex flex-col gap-2">
              {/* Fluid Typography Heading */}
              <h1 className="text-slate-800 animate-fade-in-up opacity-90 uppercase tracking-tighter text-[clamp(24px,5vw,48px)] font-black leading-[1.1] mb-2 hover:scale-[1.02] transition-transform duration-500 origin-center lg:origin-left cursor-default">
                Your Health, Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-green-600 inline-block hover:scale-105 transition-transform duration-300 cursor-pointer">Care</span>
              </h1>
              <h1 className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-[clamp(42px,11vw,96px)] font-black leading-[0.9] tracking-tighter transform hover:scale-105 transition-transform duration-500 cursor-default">
                <span style={{ color: "#FF9933" }} className="animate-pulse shadow-orange-500/20 inline-block hover:-translate-y-2 transition-transform duration-300">Sehaat</span>{" "}
                <span style={{ color: "#138808" }} className="animate-pulse shadow-green-500/20 inline-block hover:-translate-y-2 transition-transform duration-300 delay-100">Saathi</span>
              </h1>
            </div>

            {/* AI Health Assistant Badge - Clickable Link */}
            <a
              href="https://sehaat-saathi-your-ai-doctor-chatbot.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="my-8 animate-slide-in-left flex justify-center lg:justify-start cursor-pointer block"
            >
              <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-[1.5px] rounded-2xl shadow-[0_15px_35px_rgba(255,153,51,0.25)] group hover:shadow-[0_20px_50px_rgba(19,136,8,0.3)] transition-all duration-500 hover:scale-[1.03]">
                <div className="bg-white/60 backdrop-blur-2xl text-slate-900 px-6 py-4 rounded-2xl flex items-center gap-5 border border-white/50 group-hover:bg-white/80 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl animate-bounce group-hover:rotate-12 transition-transform duration-500">
                    🇮🇳
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black tracking-tight uppercase text-slate-800 group-hover:text-orange-600 transition-colors">India's #1 Health App</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-green-700 transition-colors">Made in India, Built for You</p>
                  </div>
                </div>
              </div>
            </a>

            {/* Enhanced Description */}
            <div className="text_para lg:pr-4 space-y-6">
              <p className="font-black text-gray-900 text-[clamp(13px,1.4vw,20px)] leading-tight whitespace-nowrap">
                The right doctor, at the right time —{" "}<span style={{ color: "#FF9933" }} className="inline-block hover:scale-110 transition-transform">always</span>{" "}by your{" "}<span style={{ color: "#138808" }} className="inline-block hover:scale-110 transition-transform">side</span>.
              </p>
              <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Sehaat Saathi makes it easy to find a good doctor, book an appointment, check your health, order medicines, and get emergency help — all from your phone, any time of the day. We are here for every family in Bharat. 🌿
              </p>
            </div>

            {/* Feature Highlights */}
            {/* Feature Highlights - Ultra Responsive Grid */}
            <div className="my-10 grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              {[
                { t: "Smart Health Check", c: "text-orange-600", bg: "bg-orange-50", i: "🤖" },
                { t: "Help 24/7", c: "text-green-600", bg: "bg-green-50", i: "📞" },
                { t: "Certified Doctors", c: "text-blue-600", bg: "bg-blue-50", i: "👨‍⚕️" },
                { t: "Emergency Help", c: "text-rose-600", bg: "bg-rose-50", i: "🚑" }
              ].map((f, i) => (
                <div key={i} className={`tri-glass p-4 rounded-2xl flex items-center gap-3 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer border-transparent hover:border-${f.c.split('-')[1]}-200`}>
                  <div className={`w-8 h-8 rounded-full ${f.bg} flex items-center justify-center text-sm shadow-inner group-hover:rotate-12 transition-transform`}>
                    {f.i}
                  </div>
                  <p className={`text-xs font-black uppercase tracking-wide ${f.c}`}>
                    {f.t}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 justify-center lg:justify-start">
              {/* <a
                href="https://calendly.com/codewithabhi5/sehaat-saathi-app-booking"
                target="_blank"
                rel="noopener noreferrer"
                className="tri-btn w-full sm:w-auto px-10 py-5 text-sm sm:text-base group hover:shadow-[0_10px_40px_rgba(255,153,51,0.4)] hover:-translate-y-1 transition-all duration-300"
              >
                Book a Doctor Now <BsArrowRight className="ml-2 inline group-hover:translate-x-2 transition-transform text-lg" />
              </a> */}

              <Link
                to="/about"
                className="font-black uppercase tracking-widest text-sm text-slate-400 hover:text-orange-500 transition-all flex items-center gap-3 group px-6 py-4 rounded-xl hover:bg-orange-50/50"
              >
                Learn More <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all"><BsArrowRight className="group-hover:-rotate-45 transition-transform duration-300" /></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative py-10 lg:py-0 w-full group perspective-1000">
          {/* Dynamic Background Neural Glows */}
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>

          {/* Main Holographic Container with Perspective */}
          <div className="relative z-10 p-3 sm:p-5 lg:p-6 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] lg:rounded-[4.5rem] border-[1px] md:border-[4px] lg:border-[8px] border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] transition-all duration-700 lg:group-hover:rotate-y-12 lg:group-hover:rotate-x-6 lg:group-hover:scale-105 preserve-3d">
            {/* Holographic Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-40 animate-scan shadow-[0_0_20px_rgba(52,211,153,0.5)]"></div>

            <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3.8rem] bg-slate-900/10 shadow-inner group-hover:shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-all duration-500">
              <img src={heroImg01}
                alt="Sehaat Saathi Doctors"
                className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[650px] h-auto object-cover transform transition-all duration-1000 lg:group-hover:scale-110"
               loading="lazy" />

              {/* Glass Overlay with Mesh Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>

            {/* Premium Orbital Floating Elements - Optimized Mobile Position */}
            <div className="absolute -top-6 -right-6 lg:-top-12 lg:-right-12 w-16 h-16 lg:w-32 lg:h-32 bg-white/80 backdrop-blur-xl rounded-[2rem] lg:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center animate-orbital border border-white/60 lg:group-hover:scale-110 lg:group-hover:rotate-12 transition-all duration-500 z-50 hover:bg-white cursor-pointer group/orb">
              <div className="flex flex-col items-center transform lg:group-hover:scale-110 transition-transform">
                <span className="text-2xl lg:text-6xl animate-pulse drop-shadow-lg">🩺</span>
                <span className="text-[8px] lg:text-xs font-black uppercase text-emerald-600 mt-1 lg:mt-2 tracking-[0.2em] group-hover/orb:text-emerald-500 transition-colors">Active</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 lg:-bottom-12 lg:-left-12 bg-white/80 backdrop-blur-2xl rounded-[2rem] lg:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-2 px-6 py-4 lg:px-10 lg:py-8 animate-float-complex border border-white/60 lg:group-hover:-translate-y-8 lg:group-hover:-translate-x-4 transition-transform duration-700 z-50 hover:bg-white cursor-pointer group/stat">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 animate-ping rounded-full scale-150 opacity-20"></div>
                  <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border-2 border-white flex items-center justify-center text-[10px] lg:text-sm text-white font-black shadow-lg group-hover/stat:scale-110 transition-transform">99%</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] lg:text-xs font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-2">Doctor Match</span>
                  <div className="h-1.5 lg:h-2 w-24 lg:w-32 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-emerald-500 w-[99%] animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neural Data Point Floating */}
            <div className="absolute top-1/2 -right-24 bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl animate-float-x border border-blue-400 hidden 2xl:flex items-center gap-3 rotate-90 origin-left opacity-0 lg:group-hover:opacity-100 lg:group-hover:rotate-0 transition-all duration-500 hover:bg-blue-700">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              Live Sync
            </div>

            {/* Floating Icons Decor */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-10 h-10 lg:w-16 lg:h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl lg:text-3xl shadow-xl animate-bounce-slow border-2 border-white hover:bg-orange-600 hover:scale-110 transition-all cursor-pointer">
              💊
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
