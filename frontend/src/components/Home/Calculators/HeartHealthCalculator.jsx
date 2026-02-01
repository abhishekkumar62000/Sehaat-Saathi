import { useState } from "react";
import { BsHeartPulseFill } from "react-icons/bs";

const HeartHealthCalculator = () => {
  const [age, setAge] = useState("");
  const [restingHeartRate, setRestingHeartRate] = useState("");
  const [targetHeartRate, setTargetHeartRate] = useState(null);

  const calculateHeartRateZones = () => {
    if (age && restingHeartRate) {
      const maxHeartRate = 220 - age;
      const heartRateReserve = maxHeartRate - restingHeartRate;

      const fatBurnZone = Math.round(Number(restingHeartRate) + heartRateReserve * 0.5);
      const cardioZone = Math.round(Number(restingHeartRate) + heartRateReserve * 0.7);
      const peakZone = Math.round(Number(restingHeartRate) + heartRateReserve * 0.85);

      setTargetHeartRate({
        fatBurn: fatBurnZone,
        cardio: cardioZone,
        peak: peakZone,
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-5 py-4 bg-white/50 border border-red-50 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold" placeholder="30" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Resting Heart Rate (BPM)</label>
          <input type="number" value={restingHeartRate} onChange={(e) => setRestingHeartRate(e.target.value)} className="w-full px-5 py-4 bg-white/50 border border-red-50 rounded-2xl focus:ring-4 focus:ring-red-100 outline-none transition-all font-bold" placeholder="70" />
        </div>
      </div>

      <button onClick={calculateHeartRateZones} className="w-full py-5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-red-200 hover:-translate-y-1 transition-all">
        Analyze Heart Zones
      </button>

      {targetHeartRate && (
        <div className="animate-in zoom-in-95 duration-500 space-y-4">
          <div className="p-4 bg-white/80 rounded-[32px] border border-red-50 shadow-sm flex items-center justify-between px-8 group hover:bg-red-50 transition-colors">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-red-400">Fat Burn</span>
              <span className="text-xl font-black text-gray-800">{targetHeartRate.fatBurn} bpm</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <BsHeartPulseFill />
            </div>
          </div>
          <div className="p-4 bg-white/80 rounded-[32px] border border-rose-50 shadow-sm flex items-center justify-between px-8 group hover:bg-rose-50 transition-colors">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-rose-400">Cardio Zone</span>
              <span className="text-xl font-black text-gray-800">{targetHeartRate.cardio} bpm</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
              <BsHeartPulseFill />
            </div>
          </div>
          <div className="p-4 bg-white/80 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between px-8 group hover:bg-gray-100 transition-colors">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-gray-400">Peak Performance</span>
              <span className="text-xl font-black text-gray-800">{targetHeartRate.peak} bpm</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
              <BsHeartPulseFill />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartHealthCalculator;
