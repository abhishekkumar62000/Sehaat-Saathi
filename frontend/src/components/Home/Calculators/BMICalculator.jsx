import { useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const getBmiStatus = (val) => {
    if (val < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-50" };
    if (val < 25) return { label: "Normal", color: "text-green-500", bg: "bg-green-50" };
    if (val < 30) return { label: "Overweight", color: "text-amber-500", bg: "bg-amber-50" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-50" };
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium text-gray-700"
            placeholder="e.g. 70"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-5 py-3 bg-white/50 border border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-[#2eb8a6] transition-all outline-none font-medium text-gray-700"
            placeholder="e.g. 175"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full py-4 bg-gradient-to-r from-[#2eb8a6] to-[#1d7a6e] text-white font-black rounded-2xl shadow-xl hover:shadow-teal-100 hover:-translate-y-1 active:scale-95 transition-all"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className={`p-8 ${getBmiStatus(bmi).bg} rounded-[40px] border border-white shadow-inner flex flex-col items-center justify-center animate-in zoom-in duration-500`}>
          <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center ${getBmiStatus(bmi).color} text-3xl shadow-lg mb-4`}>
            <BsLightningChargeFill />
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Body Mass Index</p>
          <h3 className={`text-5xl font-black ${getBmiStatus(bmi).color}`}>{bmi}</h3>
          <div className={`mt-4 px-6 py-2 rounded-full bg-white text-sm font-black uppercase tracking-widest ${getBmiStatus(bmi).color} shadow-sm border border-gray-100`}>
            {getBmiStatus(bmi).label}
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
