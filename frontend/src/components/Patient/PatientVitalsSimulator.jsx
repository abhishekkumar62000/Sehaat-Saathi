import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { BsHeartFill, BsLightningChargeFill } from "react-icons/bs";

const PatientVitalsSimulator = ({ bookingId }) => {
  const { socket } = useSocket();
  const [streaming, setStreaming] = useState(false);
  const [vitals, setVitals] = useState({
    heartRate: 75,
    spo2: 98,
    temperature: 98.6,
    bloodPressure: "120/80"
  });

  useEffect(() => {
    if (!socket || !streaming) return;

    // Join Vitals Room for this booking
    socket.emit("JOIN_VITALS", bookingId);

    const interval = setInterval(() => {
      // Simulate slight fluctuations in vitals
      const heartRate = Math.floor(70 + Math.random() * 20); // 70 - 90
      const spo2 = Math.floor(96 + Math.random() * 4); // 96 - 100
      const tempFloat = 97.8 + Math.random() * 1.5;
      const temperature = parseFloat(tempFloat.toFixed(1)); // 97.8 - 99.3
      
      const systolic = Math.floor(115 + Math.random() * 15);
      const diastolic = Math.floor(75 + Math.random() * 10);
      const bloodPressure = `${systolic}/${diastolic}`;

      const newVitals = { heartRate, spo2, temperature, bloodPressure };
      setVitals(newVitals);

      // Emit to Doctor
      socket.emit("PATIENT_VITAL_STREAM", { bookingId, vitals: newVitals });
    }, 2500);

    return () => clearInterval(interval);
  }, [socket, streaming, bookingId]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl max-w-sm w-full mx-auto">
      {/* Visual pulse glow */}
      {streaming && (
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none animate-pulse"></div>
      )}

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <BsHeartFill className={`text-rose-500 text-lg ${streaming ? "animate-ping" : ""}`} />
          <h4 className="text-xs font-black uppercase tracking-wider">Live Vitals Stream</h4>
        </div>
        <button
          onClick={() => setStreaming(!streaming)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all active:scale-95 ${
            streaming
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
          }`}
        >
          <BsLightningChargeFill />
          {streaming ? "Streaming Live" : "Start Stream"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        {/* Heart Rate */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Pulse / HR</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${streaming ? "text-rose-400" : "text-slate-400"}`}>
              {streaming ? vitals.heartRate : "--"}
            </span>
            <span className="text-[8px] font-bold text-slate-500 uppercase">bpm</span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">SpO2 (Oxygen)</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${streaming ? "text-cyan-400" : "text-slate-400"}`}>
              {streaming ? `${vitals.spo2}%` : "--"}
            </span>
            <span className="text-[8px] font-bold text-slate-500 uppercase">oxygen</span>
          </div>
        </div>

        {/* Temp */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Body Temp</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-black ${streaming ? "text-amber-400" : "text-slate-400"}`}>
              {streaming ? `${vitals.temperature}°` : "--"}
            </span>
            <span className="text-[8px] font-bold text-slate-500 uppercase">Fahrenheit</span>
          </div>
        </div>

        {/* BP */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Blood Pressure</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-xl font-black ${streaming ? "text-indigo-400" : "text-slate-400"}`}>
              {streaming ? vitals.bloodPressure : "--"}
            </span>
            <span className="text-[8px] font-bold text-slate-500 uppercase">mmHg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVitalsSimulator;
