import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import calculatorImg from "../../../assets/images/home/calculator.png";
import BMICalculator from "./BMICalculator";
import CalorieCounter from "./CalorieCounter";
import HeartHealthCalculator from "./HeartHealthCalculator";
import WaterIntakeCalculator from "./WaterIntakeCalculator";
import IdealWeightCalculator from "./IdealWeightCalculator";
import BodyFatCalculator from "./BodyFatCalculator";

const HealthCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("BMI");

  const calculatorTools = [
    { name: "BMI", icon: "⚖️" },
    { name: "Heart Health", icon: "❤️" },
    { name: "Daily Calories", icon: "🔥" },
    { name: "Water Intake", icon: "💧" },
    { name: "Ideal Weight", icon: "👤" },
    { name: "Body Fat %", icon: "📏" },
  ];

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "BMI": return <BMICalculator />;
      case "Heart Health": return <HeartHealthCalculator />;
      case "Daily Calories": return <CalorieCounter />;
      case "Water Intake": return <WaterIntakeCalculator />;
      case "Ideal Weight": return <IdealWeightCalculator />;
      case "Body Fat %": return <BodyFatCalculator />;
      default: return <BMICalculator />;
    }
  };

  return (
    <section className="w-full py-20 lg:py-32 bg-slate-50 overflow-hidden relative">
      {/* Patriotic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(36px,5vw,64px)] font-black text-slate-900 tracking-tighter mb-4 uppercase leading-none"
          >
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">Health Hub</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            className="h-2 bg-gradient-to-r from-orange-500 to-green-600 mx-auto rounded-full mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs sm:text-sm"
          >
            Precision AI-Powered Health Calculators
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-7xl bg-white border border-slate-100 p-8 lg:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden"
        >
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
            {/* Menu Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="relative group hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-green-100 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src={calculatorImg}
                  alt="Health Hub"
                  className="relative rounded-[3rem] w-full shadow-2xl transition-transform duration-700"
                />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {calculatorTools.map((tool, idx) => (
                  <motion.button
                    key={tool.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedCalculator(tool.name)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-4 px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all duration-300 border ${selectedCalculator === tool.name
                      ? "bg-slate-900 text-white border-transparent shadow-2xl translate-x-3"
                      : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-white hover:border-orange-500 hover:text-orange-500"
                      }`}
                  >
                    <span className="text-2xl filter drop-shadow-sm">{tool.icon}</span>
                    <span className="truncate">{tool.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Calculator Content Area */}
            <div className="lg:col-span-8 bg-slate-50/50 p-8 lg:p-14 rounded-[3.5rem] border border-slate-100 shadow-inner flex flex-col min-h-[550px]">
              <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                    <span className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                      {calculatorTools.find(t => t.name === selectedCalculator)?.icon}
                    </span>
                    {selectedCalculator}
                  </h3>
                  <div className="mt-4 w-40 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    Live Result
                  </span>
                </div>
              </div>

              <div className="flex-grow relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCalculator}
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                  >
                    {renderCalculator()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200/50">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] text-center italic">
                  Disclaimer: AI-generated values are for informational purposes. Consult a medical professional for critical health decisions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthCalculators;
