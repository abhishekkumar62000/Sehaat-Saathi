import { useState } from "react";
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

  return (
    <section className="container mb-32 relative">
      {/* Premium Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-gray-800 tracking-tighter mb-4">
          Smart <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e]">Health Hub</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">
          Precision AI-Powered Health Calculators
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-3xl p-8 lg:p-14 rounded-[60px] border border-white shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Menu Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative group mb-10">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-[#1d7a6e] rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <img src={calculatorImg} alt="Health" className="relative rounded-[40px] w-full shadow-2xl transform group-hover:scale-105 transition-transform duration-700" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {calculatorTools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => setSelectedCalculator(tool.name)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-500 border ${selectedCalculator === tool.name
                      ? "bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white border-transparent shadow-[0_10px_20px_-5px_rgba(46,184,166,0.4)] translate-x-3"
                      : "bg-white/80 text-gray-400 border-gray-100 hover:border-teal-200 hover:text-teal-600 hover:translate-x-1 shadow-sm"
                    }`}
                >
                  <span className="text-xl">{tool.icon}</span>
                  {tool.name}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Content Area */}
          <div className="lg:col-span-8 bg-white/60 p-8 lg:p-12 rounded-[50px] border border-white shadow-inner relative min-h-[500px] flex flex-col">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#2eb8a6]">
                  {calculatorTools.find(t => t.name === selectedCalculator)?.icon}
                </span>
                {selectedCalculator}
              </h3>
              <div className="mt-2 w-20 h-1.5 bg-gradient-to-r from-[#2eb8a6] to-transparent rounded-full"></div>
            </div>

            <div className="flex-grow">
              {selectedCalculator === "BMI" && <BMICalculator />}
              {selectedCalculator === "Heart Health" && <HeartHealthCalculator />}
              {selectedCalculator === "Daily Calories" && <CalorieCounter />}
              {selectedCalculator === "Water Intake" && <WaterIntakeCalculator />}
              {selectedCalculator === "Ideal Weight" && <IdealWeightCalculator />}
              {selectedCalculator === "Body Fat %" && <BodyFatCalculator />}
            </div>

            <p className="mt-10 text-[11px] text-gray-400 font-bold uppercase tracking-widest text-center border-t border-gray-100 pt-6">
              Disclaimer: Results are for informational purposes. Consult a Professional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCalculators;
