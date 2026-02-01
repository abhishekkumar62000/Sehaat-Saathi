import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import heroBg from "../../assets/images/home/heroBg.png";
import heroImg01 from "../../assets/images/home/heroImg.png";

const HeroSection = () => {
  return (
    <section
      className="container mb-10 pt-[10px] 2xl:h-[800px] lg:pb-0 pb-2"
      style={{
        background: `url(${heroBg})`,
      }}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-0">
        <div>
          <div className="lg:w-[570px]">
            {/* Main Heading with Animation */}
            <div className="lg:text-[40px] md:text-[32px] text-[28px] font-[800] leading-[22px] lg:leading-[30px] md:leading-[70px]">
              <h1 className="animate-fade-in">Welcome to</h1>
              <h1 className="font-mono mt-3 animate-pulse">
                <span className="text-[#009E60]">Sehaat</span> <span className="text-[#FF8C00]">Saathi👨‍⚕️</span>
              </h1>
            </div>

            {/* AI Health Assistant Badge */}
            <div className="my-4 animate-slide-in">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg shadow-lg inline-block">
                <p className="text-lg font-bold flex items-center gap-2">
                  <span className="text-2xl">🧑‍⚕️</span>
                  Your Trusted AI Health Assistant
                  <span className="text-2xl">😷</span>
                </p>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="text_para text-justify lg:pr-4 space-y-3">
              <p className="font-semibold text-gray-800 leading-relaxed">
                <span className="font-bold text-[#009E60]">Sehaat Saathi is India's 1st AI Powered Virtual HealthCare Platform</span> designed
                to provide users with personalized healthcare advice, symptom
                checking, emergency treatment suggestions, and doctor
                consultations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your trusted partner in health. Book appointments with top doctors and access a wide range of diagnostic services, all in one place. Experience convenient, efficient, and personalized care tailored to your needs. Your health, our priority.
                We are dedicated to providing personalized healthcare solutions designed to meet your unique needs.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="my-4 grid grid-cols-2 gap-3">
              <div className="bg-white bg-opacity-70 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm font-semibold text-blue-600">
                  ✓ AI-Powered Diagnosis
                </p>
              </div>
              <div className="bg-white bg-opacity-70 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm font-semibold text-green-600">
                  ✓ 24/7 Health Support
                </p>
              </div>
              <div className="bg-white bg-opacity-70 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm font-semibold text-purple-600">
                  ✓ Doctor Consultations
                </p>
              </div>
              <div className="bg-white bg-opacity-70 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm font-semibold text-orange-600">
                  ✓ Emergency Assistance
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://calendly.com/codewithabhi5/sehaat-saathi-app-booking"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-1 w-full sm:w-auto"
              >
                Request an Appointment <BsArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </a>

              <Link
                to="/about"
                className="group flex items-center justify-center bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/20 font-bold py-4 px-8 rounded-xl backdrop-blur-md transition-all duration-300 w-full sm:w-auto border border-indigo-500/30"
              >
                Learn More <BsArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center relative py-10 lg:py-12 px-4 group">
          {/* Dynamic Background Neural Glows */}
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>

          {/* Main Holographic Container with Perspective */}
          <div className="relative z-10 p-4 lg:p-5 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] lg:rounded-[4.5rem] border-[4px] lg:border-[8px] border-white/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-1000 lg:hover:scale-[1.08] lg:hover:rotate-2 group-hover:shadow-emerald-200/20 perspective-[1000px]">
            {/* Holographic Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-40 animate-scan"></div>

            <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3.8rem] bg-slate-900/10 shadow-inner">
              <img
                src={heroImg01}
                alt="Sehaat Saathi Doctors"
                className="w-full max-w-[300px] md:max-w-[450px] lg:max-w-[600px] h-auto object-cover transform transition-all duration-1000 lg:group-hover:scale-110 lg:group-hover:brightness-110"
              />

              {/* Glass Overlay with Mesh Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-blue-500/10 mix-blend-overlay"></div>
            </div>

            {/* Premium Orbital Floating Elements */}
            <div className="absolute -top-6 -right-6 lg:-top-12 lg:-right-12 w-16 h-16 lg:w-28 lg:h-28 bg-white/90 backdrop-blur-xl rounded-[1.5rem] lg:rounded-[2.5rem] shadow-2xl flex items-center justify-center animate-orbital border border-white lg:group-hover:scale-110 transition-transform duration-500 z-50">
              <div className="flex flex-col items-center">
                <span className="text-2xl lg:text-5xl animate-pulse">🩺</span>
                <span className="text-[6px] lg:text-[10px] font-black uppercase text-emerald-600 mt-1 lg:mt-2 tracking-[0.2em]">Active</span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-8 lg:-bottom-10 lg:-left-16 bg-white/95 backdrop-blur-2xl rounded-[1.5rem] lg:rounded-[3rem] shadow-[0_15px_30px_rgba(0,0,0,0.15)] lg:shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col gap-1 lg:gap-2 px-4 lg:px-10 py-3 lg:py-6 animate-float-complex border border-white/50 lg:group-hover:-translate-y-6 transition-transform duration-700 z-50">
              <div className="flex items-center gap-2 lg:gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 animate-ping rounded-full scale-150 opacity-20"></div>
                  <div className="w-8 h-8 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 border border-white lg:border-2 flex items-center justify-center text-[8px] lg:text-[13px] text-white font-black shadow-lg">99%</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] lg:text-[12px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 lg:mb-2">AI Accuracy</span>
                  <div className="h-1 lg:h-2 w-16 lg:w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99%] animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neural Data Point Floating */}
            <div className="absolute top-1/2 -right-20 bg-blue-600 text-white px-6 py-4 rounded-3xl text-[12px] font-black uppercase tracking-widest shadow-2xl animate-float-x border border-blue-400 hidden xl:flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
              Live Sync
            </div>

            {/* Floating Icons Decor */}
            <div className="absolute -bottom-2 -right-4 lg:-bottom-4 lg:-right-8 w-8 h-8 lg:w-14 lg:h-14 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm lg:text-2xl shadow-xl animate-bounce-slow border lg:border-2 border-white">
              💊
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes orbital {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(8deg); }
          66% { transform: translate(-15px, 15px) rotate(-8deg); }
        }

        @keyframes float-complex {
          0%, 100% { transform: translateY(0) scale(1) rotate(0); }
          50% { transform: translateY(-30px) scale(1.05) rotate(1deg); }
        }

        @keyframes float-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(25px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-scan {
          animation: scan 4s linear infinite;
        }

        .animate-orbital {
          animation: orbital 8s ease-in-out infinite;
        }

        .animate-float-complex {
          animation: float-complex 6s ease-in-out infinite;
        }

        .animate-float-x {
          animation: float-x 5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .perspective-[1000px] {
          perspective: 1000px;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, #10b981 25%, #34d399 50%, #10b981 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }

      `}</style>
    </section>
  );
};

export default HeroSection;
