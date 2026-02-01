import { FaAppStoreIos } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import appLogo from "../../assets/images/home/SehaatSaathiAppLogo.png";
import logo from "../../assets/images/brand-logo/SehaatSaathi Logo.png";

const DownloadApp = () => {
  return (
    <section className="container mb-5 overflow-hidden py-10">
      <h1 className="heading text-center mb-10">Our Mobile App</h1>
      <div className="lg:flex items-center justify-center w-full gap-10">
        {/* =====Mobile Phone Image===== */}
        <div className="lg:w-[45%] w-full flex justify-center lg:justify-end relative group perspective-1000">
          <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-500/20 rounded-full blur-[100px] animate-pulse"></div>

          <img
            src={appLogo}
            alt="Sehaat Saathi App Logo"
            className="w-80 h-auto lg:w-[450px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] animate-float transition-all duration-700 hover:rotate-6 hover:scale-110 cursor-pointer z-10"
          />
        </div>

        {/* =====Details and App Links===== */}
        <div className="lg:w-[55%] w-full text-center md:text-left">
          <h2 className="lg:text-[32px] text-[26px] font-serif font-semibold text-gray-800 mb-4 flex items-center justify-center md:justify-start gap-2">
            Download the
            <span className="flex items-center gap-2">
              <span className="text-[#009E60]">Sehaat</span>
              <span className="text-[#FF8C00]">Saathi</span>
            </span>
            App
            <img src={logo} alt="Logo" className="w-6 h-6 lg:w-8 lg:h-8 animate-bounce mb-2" />
          </h2>
          <p className="text-gray-600 mb-8 lg:text-[18px] text-[16px] text-justify leading-relaxed max-w-xl mx-auto md:mx-0">
            Book appointments, view health packages, and access all our services
            right at your fingertips. Get the app to stay connected and manage
            your health on the go!
          </p>
          <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center md:justify-start">
            {/* =====Google Play Button===== */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white lg:px-8 px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-110 hover:shadow-xl hover:shadow-violet-600/30 cursor-pointer border border-violet-500/30">
              <IoLogoGooglePlaystore className="w-10 h-10" />
              <div className="leading-tight text-left">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">GET IT ON</p>
                <h3 className="font-bold text-2xl">Google Play</h3>
              </div>
            </div>

            {/* =====App Store Button===== */}
            <div className="bg-slate-900 text-white lg:px-8 px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-110 hover:shadow-xl hover:shadow-slate-900/30 cursor-pointer border border-slate-700">
              <FaAppStoreIos className="w-10 h-10" />
              <div className="leading-tight text-left">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Download on the</p>
                <h3 className="font-bold text-2xl">App Store</h3>
              </div>
            </div>
          </div>
          {/* =====App Features===== */}
          <ul className="text-gray-600 space-y-3 text-start ml-2">
            {[
              "Book Appointments Instantly",
              "Get Lab Results Online",
              "Easy doctor booking",
              "View and manage appointments",
              "Get health tips and reminders"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-lg font-medium group text-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default DownloadApp;
