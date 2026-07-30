import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "../../context/SocketContext";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  BsHeartPulseFill, BsThermometerHalf, BsDropletFill,
  BsClipboard2PulseFill, BsCheckCircleFill, BsPersonFill
} from "react-icons/bs";
import { MdSick } from "react-icons/md";

const COMMON_SYMPTOMS = [
  "Fever", "Cough", "Sore Throat", "Headache", "Body Pain",
  "Shortness of Breath", "Nausea", "Fatigue", "Diarrhoea", "Chest Pain",
  "Dizziness", "Skin Rash", "Joint Pain", "Abdominal Pain", "Back Pain"
];

const PreConsultVitalsForm = ({ booking: bookingProp, bookingId }) => {
  // Accept either a full booking object or just an ID string
  const booking = bookingProp || (bookingId ? { _id: bookingId } : null);
  const { socket } = useSocket();
  const { user } = useContext(authContext);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    temperature: "",
    bp_systolic: "",
    bp_diastolic: "",
    pulse: "",
    weight: "",
    symptoms: [],
    duration: "",
    severity: "Moderate",
    additionalNotes: "",
    currentMedications: "",
    allergies: "",
  });

  // Acknowledge when doctor receives vitals
  useEffect(() => {
    if (!socket || !booking) return;
    socket.emit("JOIN_PRECONSULT", booking._id);
    const onAck = () => {
      toast.success("✅ Your vitals are now visible to your doctor!");
    };
    socket.on("PRECONSULT_ACK", onAck);
    return () => socket.off("PRECONSULT_ACK", onAck);
  }, [socket, booking]);

  const toggleSymptom = (sym) => {
    setForm(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(sym)
        ? prev.symptoms.filter(s => s !== sym)
        : [...prev.symptoms, sym]
    }));
  };

  const handleSubmit = async () => {
    if (form.symptoms.length === 0) {
      toast.error("Please select at least one symptom.");
      return;
    }
    setLoading(true);
    try {
      const doctorId = booking.doctor?._id || booking.doctor;
      socket.emit("PRECONSULT_VITALS_SUBMIT", {
        bookingId: booking._id,
        doctorId,
        vitalsForm: { ...form, patientName: user?.name, submittedAt: new Date().toISOString() }
      });
      setSubmitted(true);
      toast.success("📋 Pre-consultation form submitted! Doctor can see it now.");
    } catch (err) {
      toast.error("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 p-6 text-center">
        <BsCheckCircleFill className="text-5xl text-emerald-500 mx-auto mb-3" />
        <div className="font-black text-emerald-800 text-lg">Vitals Submitted!</div>
        <div className="text-emerald-600 text-sm mt-1">
          Your doctor can see your symptoms and vitals. Consultation will be faster and more accurate.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 flex items-center gap-3">
        <BsClipboard2PulseFill className="text-yellow-300 text-xl" />
        <div>
          <div className="text-white font-black text-sm uppercase tracking-wider">Pre-Consultation Health Form</div>
          <div className="text-violet-200 text-[10px]">Submitted before your doctor sees you — saves precious consultation time</div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Vitals Row */}
        <div>
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BsHeartPulseFill className="text-red-400" /> Basic Vitals (Optional but helpful)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Temperature (°F)", key: "temperature", placeholder: "98.6", icon: <BsThermometerHalf className="text-orange-400" /> },
              { label: "BP Systolic", key: "bp_systolic", placeholder: "120", icon: <BsDropletFill className="text-red-500" /> },
              { label: "BP Diastolic", key: "bp_diastolic", placeholder: "80", icon: <BsDropletFill className="text-pink-400" /> },
              { label: "Pulse (bpm)", key: "pulse", placeholder: "72", icon: <BsHeartPulseFill className="text-indigo-500" /> },
            ].map(({ label, key, placeholder, icon }) => (
              <div key={key} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-1 mb-1 text-[9px] font-bold text-slate-400 uppercase">{icon} {label}</div>
                <input
                  type="number"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full bg-transparent text-slate-800 font-black text-lg outline-none placeholder:text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <MdSick className="text-violet-500 text-base" /> Current Symptoms <span className="text-red-400">*</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMMON_SYMPTOMS.map(sym => (
              <button
                key={sym}
                onClick={() => toggleSymptom(sym)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  form.symptoms.includes(sym)
                    ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Duration + Severity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Since How Long?</label>
            <select
              value={form.duration}
              onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-violet-400"
            >
              <option value="">Select duration</option>
              <option>Today (less than 24 hours)</option>
              <option>1–3 Days</option>
              <option>4–7 Days</option>
              <option>1–2 Weeks</option>
              <option>More than 2 Weeks</option>
              <option>Chronic / Ongoing</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Severity</label>
            <div className="flex gap-2">
              {["Mild", "Moderate", "Severe"].map(s => (
                <button
                  key={s}
                  onClick={() => setForm(prev => ({ ...prev, severity: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all ${
                    form.severity === s
                      ? s === "Severe" ? "bg-red-600 text-white border-red-600" : s === "Moderate" ? "bg-amber-500 text-white border-amber-500" : "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-slate-500 border-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Additional Notes / Medical History</label>
          <textarea
            value={form.additionalNotes}
            onChange={e => setForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
            placeholder="Any other symptoms, past surgeries, recent tests..."
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 resize-none"
          />
        </div>

        {/* Current medications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Current Medications</label>
            <input
              value={form.currentMedications}
              onChange={e => setForm(prev => ({ ...prev, currentMedications: e.target.value }))}
              placeholder="e.g., Metformin 500mg, Paracetamol..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Known Allergies</label>
            <input
              value={form.allergies}
              onChange={e => setForm(prev => ({ ...prev, allergies: e.target.value }))}
              placeholder="e.g., Penicillin, Aspirin..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-sm transition-all active:scale-95 shadow-md shadow-violet-200 flex items-center justify-center gap-2"
        >
          <BsClipboard2PulseFill />
          {loading ? "Submitting..." : "Submit to My Doctor — Live"}
        </button>
        <div className="text-center text-[10px] text-slate-400">
          Your form is transmitted in real-time to your doctor before you enter.
        </div>
      </div>
    </div>
  );
};

export default PreConsultVitalsForm;
