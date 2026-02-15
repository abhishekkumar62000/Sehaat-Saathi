import React from "react";
import { motion } from "framer-motion";
import { FaAppStoreIos } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import appLogo from "../../assets/images/home/SehaatSaathiAppLogo.png";
import logo from "../../assets/images/brand-logo/SehaatSaathiLogo.png";

const DownloadApp = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(30px,5vw,48px)] font-black text-slate-900 mb-16 text-center tracking-tight uppercase"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Mobile App</span>
        </motion.h1>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 lg:gap-24 max-w-7xl">
          {/* =====Mobile Phone Image===== */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center relative perspective-2000"
          >
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]"></div>

            <motion.img
              src={appLogo}
              alt="Sehaat Saathi App Logo"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)] cursor-pointer z-10 rounded-3xl"
            />
          </motion.div>

          {/* =====Details and App Links===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left space-y-8 flex flex-col items-center lg:items-start"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                Download the <br />
                <span className="text-orange-500">Sehaat</span>{" "}
                <span className="text-green-600">Saathi</span> App
                <motion.img
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  src={logo}
                  alt="Logo"
                  className="inline-block w-8 h-8 ml-3 mb-2"
                />
              </h2>
              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-xl font-medium">
                Book appointments, view health packages, and access all our services
                right at your fingertips. Stay connected with your health anywhere, anytime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md lg:max-w-none">
              {/* =====Google Play Button===== */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl cursor-pointer hover:bg-slate-800 border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <IoLogoGooglePlaystore className="text-3xl text-orange-400" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-black tracking-widest opacity-70">Get it on</p>
                  <h3 className="font-bold text-lg sm:text-xl leading-none">Google Play</h3>
                </div>
              </motion.div>

              {/* =====App Store Button===== */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-4 transition-all shadow-xl cursor-pointer hover:bg-slate-800 border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <FaAppStoreIos className="text-3xl text-sky-400" />
                <div className="text-left">
                  <p className="text-[9px] uppercase font-black tracking-widest opacity-70">Download on the</p>
                  <h3 className="font-bold text-lg sm:text-xl leading-none">App Store</h3>
                </div>
              </motion.div>
            </div>

            {/* =====App Features===== */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                "Instant Appointments",
                "Online Lab Results",
                "Easy Doctor Booking",
                "Health Tips & Reminders"
              ].map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-center gap-3 text-base sm:text-lg font-bold text-slate-700 hover:text-green-600 transition-colors cursor-default"
                >
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs shadow-inner">
                    ✓
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
