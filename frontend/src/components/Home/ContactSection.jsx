import React from "react";
import { motion } from "framer-motion";
import { BsSend, BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import contactImg from "../../assets/images/home/contact.gif";

const ContactSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        <div className="text-center mb-16 relative">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(32px,5vw,56px)] font-black text-slate-900 tracking-tighter uppercase leading-none mb-4"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-2 bg-gradient-to-r from-orange-500 to-green-600 mx-auto rounded-full shadow-lg"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-600 max-w-2xl mx-auto font-bold text-lg leading-relaxed"
          >
            Have questions or need assistance? Reach out to our team of experts.
            We are here to help you move towards a healthier life.
          </motion.p>
        </div>

        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 bg-white border border-slate-100 p-8 lg:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden"
          >
            {/* Left Side: Visuals & Quick Info */}
            <div className="lg:w-5/12 space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative group w-full max-w-[400px] lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-green-100 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <img src={contactImg}
                  alt="Contact Illustration"
                  className="relative rounded-[2.5rem] w-full shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                 loading="lazy" />
              </div>

              <div className="w-full space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <BsGeoAlt className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Our Center</p>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tighter">Bara Bazar, Madhubani</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                    <BsTelephone className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tighter">+91 0000 000 000</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="w-full lg:w-7/12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all text-slate-900 font-bold placeholder:text-slate-400"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-600 transition-all text-slate-900 font-bold placeholder:text-slate-400"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-900 transition-all text-slate-900 font-bold placeholder:text-slate-400"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <textarea
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-900 transition-all text-slate-900 font-bold placeholder:text-slate-400 resize-none"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full lg:w-max px-16 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl flex items-center justify-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-white/10 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">Send Message</span>
                  <BsSend className="relative z-10 text-lg group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
