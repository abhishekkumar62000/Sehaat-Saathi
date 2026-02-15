import React from "react";
import { motion } from "framer-motion";
import { faqs } from "../../assets/data/faqs";
import faqBg from "../../assets/images/bgImg.png";
import faqImg from "../../assets/images/home/FAQ.png";
import FaqItem from "./FaqItem";

const FaqSection = () => {
  return (
    <section className="w-full py-20 lg:py-32 bg-white overflow-hidden relative">
      {/* Patriotic Background Decor */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Title Section */}
        <div className="text-center mb-20 relative">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-black tracking-widest text-slate-500 uppercase bg-slate-100 rounded-full border border-slate-200"
          >
            Support Center
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(32px,5vw,56px)] font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none"
          >
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Asked Questions</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            className="h-2 bg-gradient-to-r from-orange-500 to-green-600 mx-auto rounded-full shadow-lg"
          ></motion.div>
        </div>

        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 bg-white border border-slate-100 p-8 lg:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden"
          >
            {/* Image Section - Hidden on mobile, prominent on desktop */}
            <div className="hidden lg:block lg:w-1/2 relative group perspective-2000">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-green-100 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <motion.div
                whileHover={{ rotateY: -10, scale: 1.02 }}
                className="relative overflow-hidden rounded-[2.5rem] shadow-2xl"
              >
                <img
                  src={faqImg}
                  alt="FAQ"
                  className="w-full h-auto transform transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Quick Help</p>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">We're here to answer every query.</h4>
                </div>
              </motion.div>
            </div>

            {/* FAQ List Section */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FaqItem key={faq.id} item={faq} index={index} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 rounded-[2rem] bg-slate-50 border border-dashed border-slate-200 text-center"
              >
                <p className="text-slate-500 font-bold text-sm">Still have questions? <span className="text-orange-600 cursor-pointer hover:underline">Contact our support team</span></p>
              </motion.div>
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

export default FaqSection;
