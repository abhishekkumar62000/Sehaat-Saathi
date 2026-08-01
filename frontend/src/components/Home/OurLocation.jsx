import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsGeoAltFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const OurLocation = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 text-center lg:text-left space-y-8 flex flex-col items-center lg:items-start"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-slate-100 text-slate-900 rounded-full text-xs font-black uppercase tracking-widest border border-slate-200"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                Official Center
              </motion.div>

              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-slate-900 leading-tight mb-4 uppercase tracking-tighter">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Location</span>
              </h2>

              <p className="text-lg sm:text-xl text-slate-600 font-bold leading-snug max-w-md">
                Visit us at our regional diagnostic excellence center in Bihar.
              </p>
            </div>

            <div className="space-y-6 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-default group"
              >
                <div className="flex items-center gap-4 mb-3 justify-center lg:justify-start">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                    <BsGeoAltFill className="text-xl" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Bara Bazar, Madhubani</h4>
                </div>
                <p className="text-slate-600 font-semibold mb-2">Bihar, India - 847211</p>
                <div className="flex items-center gap-2 justify-center lg:justify-start opacity-60">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Standards</span>
                </div>
              </motion.div>

              <p className="text-slate-500 text-sm italic font-medium leading-relaxed max-w-sm">
                "Our state-of-the-art facility is centrally located to serve you with
                the best diagnostic services in the region."
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact">
                <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-4 group">
                  Get Directions <BsArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-7/12 perspective-2000"
          >
            <div className="relative group p-3 bg-white border border-slate-100 shadow-lg md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden">
              <div className="h-[350px] sm:h-[450px] lg:h-[500px] rounded-[2rem] overflow-hidden relative">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10"></div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14332.1462057373!2d86.0694158!3d26.3578768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edcd0f8c36869b%3A0xc3f17387cc07b46d!2sBara%20Bazar%2C%20Madhubani%2C%20Bihar%20847211!5e0!3m2!1sen!2sin!4v1706424456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-2000 { perspective: 2000px; }
      `}} />
    </section>
  );
};

export default OurLocation;
