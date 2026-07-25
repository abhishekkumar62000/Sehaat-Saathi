import { useState, useContext, useEffect, useRef } from "react";
import { authContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import {
  BsCapsule, BsPrinter, BsX, BsPlusCircle, BsTrash,
  BsCheckCircleFill, BsShieldCheck, BsHospital, BsPersonBadge,
  BsCalendarCheck, BsClockHistory, BsQrCode, BsDownload
} from "react-icons/bs";
import { FaFilePrescription, FaNotesMedical, FaUserMd } from "react-icons/fa";
import { MdVerified, MdLocalPharmacy, MdHealthAndSafety } from "react-icons/md";

const DOSAGE_OPTIONS = [
  "1-0-1 (Morning & Night)",
  "1-1-1 (Thrice daily)",
  "1-0-0 (Morning only)",
  "0-0-1 (Night only)",
  "0-1-0 (Afternoon only)",
  "1-1-0 (Morning & Afternoon)",
  "SOS (As needed)",
  "STAT (Immediately once)",
];

const INSTRUCTION_OPTIONS = [
  "After Food",
  "Before Food",
  "With Food",
  "With Milk",
  "With Warm Water",
  "Empty Stomach",
  "At Bedtime",
  "As Directed",
];

const RX_ID = () => `SS-RX-${Date.now().toString(36).toUpperCase()}-IND`;

const DigitalPrescriptionModal = ({
  booking,
  isDoctorView = true,
  onClose,
  onPrescriptionSaved,
}) => {
  const { token, user } = useContext(authContext);
  const { socket } = useSocket();
  const printRef = useRef(null);

  const existingRx = booking?.prescriptionDetails;

  const [step, setStep] = useState(1); // 1=Patient Info, 2=Medicines, 3=Notes+Preview
  const [saving, setSaving] = useState(false);
  const [rxId] = useState(existingRx?.rxId || RX_ID());
  const [issuedAt] = useState(existingRx?.issuedAt || new Date().toISOString());

  const [vitals, setVitals] = useState(existingRx?.vitals || {
    bp: "", temp: "", weight: "", spo2: "", pulse: "",
  });
  const [symptoms, setSymptoms] = useState(existingRx?.symptoms || "");
  const [diagnosis, setDiagnosis] = useState(existingRx?.diagnosis || "");
  const [medicines, setMedicines] = useState(
    existingRx?.medicines?.length > 0
      ? existingRx.medicines
      : [{ name: "", dosage: DOSAGE_OPTIONS[0], duration: "5 Days", instruction: "After Food", qty: "10 Tablets", notes: "" }]
  );
  const [tests, setTests] = useState(existingRx?.tests || "");
  const [advice, setAdvice] = useState(
    existingRx?.advice || "Take plenty of fluids and rest. Follow up in 5 days if symptoms persist. Avoid self-medication."
  );
  const [followUp, setFollowUp] = useState(existingRx?.followUp || "5 Days");
  const [nextVisit, setNextVisit] = useState(existingRx?.nextVisit || "");

  // Auto-save to localStorage draft
  useEffect(() => {
    if (!isDoctorView || !booking?._id) return;
    const draft = { diagnosis, symptoms, medicines, advice, tests, followUp, vitals };
    localStorage.setItem(`rx_draft_${booking._id}`, JSON.stringify(draft));
  }, [diagnosis, symptoms, medicines, advice, tests, followUp, vitals]);

  // Restore draft on mount
  useEffect(() => {
    if (!isDoctorView || !booking?._id || existingRx) return;
    const saved = localStorage.getItem(`rx_draft_${booking._id}`);
    if (saved) {
      try {
        const d = JSON.parse(saved);
        if (d.diagnosis) setDiagnosis(d.diagnosis);
        if (d.symptoms) setSymptoms(d.symptoms);
        if (d.medicines?.length) setMedicines(d.medicines);
        if (d.advice) setAdvice(d.advice);
        if (d.tests) setTests(d.tests);
        if (d.followUp) setFollowUp(d.followUp);
        if (d.vitals) setVitals(d.vitals);
        toast.info("📝 Draft prescription restored!", { autoClose: 2000 });
      } catch (_) {}
    }
  }, []);

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: DOSAGE_OPTIONS[0], duration: "5 Days", instruction: "After Food", qty: "10 Tablets", notes: "" }]);
  };

  const removeMedicine = (i) => {
    if (medicines.length === 1) return toast.warn("At least one medicine required.");
    setMedicines(medicines.filter((_, idx) => idx !== i));
  };

  const updateMedicine = (i, field, val) => {
    const updated = [...medicines];
    updated[i] = { ...updated[i], [field]: val };
    setMedicines(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!diagnosis.trim()) return toast.error("Please enter a clinical diagnosis.");
    if (medicines.some(m => !m.name.trim())) return toast.error("All medicine names are required.");

    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/${booking._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status: "completed",
          statusMessage: "Consultation completed. e-Prescription issued.",
          prescriptionDetails: {
            rxId, issuedAt, diagnosis, symptoms, medicines,
            tests, advice, followUp, nextVisit, vitals,
            doctorName: user?.name,
            doctorSpecialization: user?.specialization,
            doctorLicense: user?.licenseNumber,
          },
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Real-time socket emit to patient
      if (socket && booking.user?._id) {
        socket.emit("STATUS_SYNC", {
          user: booking.user._id,
          status: "completed",
          message: `Dr. ${user?.name || "Doctor"} has issued your e-Prescription! Open 'My Bookings' to view.`,
          bookingId: booking._id,
        });
      }

      // Clear draft
      localStorage.removeItem(`rx_draft_${booking._id}`);

      toast.success("✅ e-Prescription issued & sent to Patient in real-time!");
      if (onPrescriptionSaved) onPrescriptionSaved();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to issue prescription.");
    } finally {
      setSaving(false);
    }
  };

  const patientName = booking?.user?.name || booking?.patient?.name || "Patient";
  const patientGender = booking?.user?.gender || booking?.patient?.gender || "N/A";
  const patientPhone = booking?.user?.phone || booking?.patient?.phone || "N/A";
  const doctorName = booking?.doctor?.name || user?.name || "Doctor";
  const doctorSpec = booking?.doctor?.specialization || user?.specialization || "Clinical Specialist";
  const doctorLicense = booking?.doctor?.licenseNumber || user?.licenseNumber || "SS-VERIFIED";
  const hospitalName = booking?.doctor?.hospitalName || user?.hospitalName || "Sehaat Saathi Medical Hub";

  const isCompleted = !!existingRx;

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #rx-print-area, #rx-print-area * { visibility: visible; }
          #rx-print-area { position: fixed; top: 0; left: 0; width: 100%; background: white; z-index: 9999; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 md:p-6">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">

          {/* --- HEADER --- */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 flex items-center justify-between flex-shrink-0 no-print">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg">
                <FaFilePrescription className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-white font-black text-lg leading-none tracking-tight">
                  {isDoctorView && !isCompleted ? "Issue e-Prescription" : "Digital e-Prescription"}
                </h2>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                  Rx ID: <span className="text-emerald-400 font-bold">{rxId}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isDoctorView && !isCompleted && (
                <div className="flex items-center gap-1 no-print">
                  {[1, 2, 3].map(s => (
                    <button
                      key={s}
                      onClick={() => setStep(s)}
                      className={`w-8 h-8 rounded-full text-xs font-black transition-all ${step === s
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : step > s ? "bg-emerald-900 text-emerald-400" : "bg-slate-700 text-slate-400"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <button onClick={handlePrint} className="no-print p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all" title="Print">
                <BsPrinter className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="no-print p-2 bg-slate-700 hover:bg-red-600 text-slate-300 rounded-xl transition-all">
                <BsX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* --- BODY (Scrollable) --- */}
          <div className="flex-1 overflow-y-auto bg-slate-50" id="rx-print-area" ref={printRef}>

            {/* Prescription Header Banner */}
            <div className="bg-white border-b border-slate-200 px-6 py-4">
              <div className="flex flex-wrap justify-between items-start gap-4">
                {/* Doctor Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaUserMd className="text-indigo-600 text-lg" />
                    <h3 className="font-black text-slate-900 text-lg">Dr. {doctorName}</h3>
                    <MdVerified className="text-emerald-500 text-lg" title="Sehaat Saathi Verified" />
                  </div>
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{doctorSpec}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Reg. No: <span className="font-bold text-slate-700">{doctorLicense}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <BsHospital className="text-slate-400 text-xs" />
                    <p className="text-[11px] text-slate-500 font-medium">{hospitalName}</p>
                  </div>
                </div>

                {/* Logo + Date */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg mb-2">
                    <MdHealthAndSafety className="text-xl" />
                    <span className="font-black text-sm tracking-tight">Sehaat Saathi</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Date: <span className="font-bold text-slate-700">{new Date(issuedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Time: <span className="font-bold text-slate-700">{new Date(issuedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                  </p>
                  {(isCompleted || !isDoctorView) && (
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <BsShieldCheck className="text-emerald-500 text-xs" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase">Digitally Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Patient Card */}
            <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">Patient</span>
                  <span className="font-black text-slate-800 text-sm">{patientName}</span>
                </div>
                <div>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">Gender</span>
                  <span className="font-black text-slate-800">{patientGender}</span>
                </div>
                <div>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">Phone</span>
                  <span className="font-black text-slate-800">{patientPhone}</span>
                </div>
                <div>
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">Booking Token</span>
                  <span className="font-black text-indigo-700 text-sm">#{booking?.bookingToken || booking?.queueNumber || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* === DOCTOR VIEW: 3-STEP FORM === */}
            {isDoctorView && !isCompleted ? (
              <div className="p-6 space-y-6">

                {/* STEP 1: Patient Vitals + Symptoms + Diagnosis */}
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h4 className="font-black text-slate-800 text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">1</span>
                      Patient Assessment
                    </h4>

                    {/* Vitals Grid */}
                    <div>
                      <label className="text-xs font-black text-slate-600 uppercase tracking-wider mb-2 block">Vitals (Optional)</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { key: "bp", label: "BP (mmHg)", placeholder: "120/80" },
                          { key: "temp", label: "Temp (°F)", placeholder: "98.6" },
                          { key: "pulse", label: "Pulse (bpm)", placeholder: "72" },
                          { key: "spo2", label: "SpO2 (%)", placeholder: "98" },
                          { key: "weight", label: "Weight (kg)", placeholder: "65" },
                        ].map(v => (
                          <div key={v.key}>
                            <label className="text-[10px] font-bold text-slate-500 block mb-1">{v.label}</label>
                            <input
                              type="text"
                              placeholder={v.placeholder}
                              value={vitals[v.key]}
                              onChange={e => setVitals({ ...vitals, [v.key]: e.target.value })}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Chief Complaints / Symptoms *</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Fever since 3 days, headache, body ache, sore throat..."
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/30 resize-none"
                      />
                    </div>

                    {/* Diagnosis */}
                    <div>
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Clinical Diagnosis *</label>
                      <input
                        type="text"
                        placeholder="e.g. Acute Viral Fever with Upper Respiratory Tract Infection"
                        value={diagnosis}
                        onChange={e => setDiagnosis(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
                      />
                    </div>

                    <div className="flex justify-end no-print">
                      <button
                        onClick={() => { if (!diagnosis.trim()) { toast.error("Please enter diagnosis"); return; } setStep(2); }}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-200"
                      >
                        Next: Medicines →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Medicines */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-800 text-base flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">2</span>
                        Prescribed Medications
                      </h4>
                      <button
                        onClick={addMedicine}
                        className="flex items-center gap-2 text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-all"
                      >
                        <BsPlusCircle /> Add Medicine
                      </button>
                    </div>

                    <div className="space-y-3">
                      {medicines.map((med, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center flex-shrink-0">
                              Rx{i + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Medicine Name + Strength (e.g. Paracetamol 650mg)"
                              value={med.name}
                              onChange={e => updateMedicine(i, "name", e.target.value)}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                            />
                            {medicines.length > 1 && (
                              <button onClick={() => removeMedicine(i)} className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-all">
                                <BsTrash className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">Dosage</label>
                              <select value={med.dosage} onChange={e => updateMedicine(i, "dosage", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none">
                                {DOSAGE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">Duration</label>
                              <input type="text" placeholder="5 Days" value={med.duration}
                                onChange={e => updateMedicine(i, "duration", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">Instructions</label>
                              <select value={med.instruction} onChange={e => updateMedicine(i, "instruction", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none">
                                {INSTRUCTION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">Qty</label>
                              <input type="text" placeholder="10 Tablets" value={med.qty}
                                onChange={e => updateMedicine(i, "qty", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold focus:outline-none" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <input type="text" placeholder="Special note for this medicine (optional)"
                              value={med.notes} onChange={e => updateMedicine(i, "notes", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Lab Tests */}
                    <div>
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Advised Investigations / Lab Tests (Optional)</label>
                      <textarea rows={2} placeholder="e.g. CBC, LFT, Blood Sugar Fasting, Chest X-Ray..."
                        value={tests} onChange={e => setTests(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/30 resize-none" />
                    </div>

                    <div className="flex justify-between no-print">
                      <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all">
                        ← Back
                      </button>
                      <button onClick={() => setStep(3)} className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-200">
                        Next: Final Notes →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Advice, Follow Up & Preview */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h4 className="font-black text-slate-800 text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">3</span>
                      Doctor's Advice & Follow-Up
                    </h4>

                    <div>
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Lifestyle Advice & Instructions</label>
                      <textarea rows={3} value={advice} onChange={e => setAdvice(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/30 resize-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Follow-up In</label>
                        <select value={followUp} onChange={e => setFollowUp(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:outline-none">
                          {["3 Days", "5 Days", "7 Days", "10 Days", "2 Weeks", "1 Month", "As Needed"].map(o => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 block">Next Visit Date (Optional)</label>
                        <input type="date" value={nextVisit} onChange={e => setNextVisit(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold focus:outline-none" />
                      </div>
                    </div>

                    {/* SUMMARY PREVIEW */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <BsCalendarCheck className="text-emerald-400" />
                        <h5 className="font-black text-sm uppercase tracking-wider text-emerald-400">Prescription Summary</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div><span className="text-slate-400 block text-[10px]">Diagnosis</span><span className="font-bold text-white">{diagnosis || "—"}</span></div>
                        <div><span className="text-slate-400 block text-[10px]">Total Medicines</span><span className="font-bold text-emerald-400">{medicines.length}</span></div>
                        <div><span className="text-slate-400 block text-[10px]">Lab Tests</span><span className="font-bold text-amber-400">{tests || "None"}</span></div>
                        <div><span className="text-slate-400 block text-[10px]">Follow-Up</span><span className="font-bold text-white">{followUp}</span></div>
                      </div>
                    </div>

                    <div className="flex justify-between no-print">
                      <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all">
                        ← Back
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-10 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-emerald-200 flex items-center gap-2 disabled:opacity-60"
                      >
                        <BsCheckCircleFill />
                        {saving ? "Issuing..." : "Issue & Send to Patient"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* === PATIENT / READ-ONLY VIEW === */
              <div className="p-6 space-y-5">
                {/* Vitals */}
                {existingRx?.vitals && Object.values(existingRx.vitals).some(v => v) && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-4">
                    <h5 className="font-black text-slate-700 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaNotesMedical className="text-indigo-500" /> Vitals Recorded
                    </h5>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-center">
                      {existingRx.vitals.bp && <div className="bg-indigo-50 rounded-xl p-2"><p className="text-[10px] text-indigo-400 font-bold">BP</p><p className="font-black text-indigo-700 text-sm">{existingRx.vitals.bp}</p></div>}
                      {existingRx.vitals.temp && <div className="bg-orange-50 rounded-xl p-2"><p className="text-[10px] text-orange-400 font-bold">Temp</p><p className="font-black text-orange-700 text-sm">{existingRx.vitals.temp}°F</p></div>}
                      {existingRx.vitals.pulse && <div className="bg-red-50 rounded-xl p-2"><p className="text-[10px] text-red-400 font-bold">Pulse</p><p className="font-black text-red-700 text-sm">{existingRx.vitals.pulse} bpm</p></div>}
                      {existingRx.vitals.spo2 && <div className="bg-blue-50 rounded-xl p-2"><p className="text-[10px] text-blue-400 font-bold">SpO2</p><p className="font-black text-blue-700 text-sm">{existingRx.vitals.spo2}%</p></div>}
                      {existingRx.vitals.weight && <div className="bg-green-50 rounded-xl p-2"><p className="text-[10px] text-green-400 font-bold">Weight</p><p className="font-black text-green-700 text-sm">{existingRx.vitals.weight} kg</p></div>}
                    </div>
                  </div>
                )}

                {/* Symptoms + Diagnosis */}
                <div className="grid md:grid-cols-2 gap-4">
                  {existingRx?.symptoms && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <h5 className="font-black text-amber-800 text-xs uppercase tracking-wider mb-2">Chief Complaints</h5>
                      <p className="text-sm text-amber-900 font-medium leading-relaxed">{existingRx.symptoms}</p>
                    </div>
                  )}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                    <h5 className="font-black text-indigo-800 text-xs uppercase tracking-wider mb-2">Clinical Diagnosis</h5>
                    <p className="text-sm text-indigo-900 font-bold leading-relaxed">{existingRx?.diagnosis || diagnosis}</p>
                  </div>
                </div>

                {/* Medicines Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-3 flex items-center gap-2">
                    <MdLocalPharmacy className="text-white text-lg" />
                    <h5 className="font-black text-white text-sm uppercase tracking-wider">
                      Prescribed Medicines ({(existingRx?.medicines || medicines).length})
                    </h5>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="px-4 py-3 text-left">#</th>
                          <th className="px-4 py-3 text-left">Medicine</th>
                          <th className="px-4 py-3 text-left">Dosage</th>
                          <th className="px-4 py-3 text-left">Duration</th>
                          <th className="px-4 py-3 text-left">Instructions</th>
                          <th className="px-4 py-3 text-left">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(existingRx?.medicines || medicines).map((med, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3 font-black text-slate-500">Rx{i + 1}</td>
                            <td className="px-4 py-3 font-black text-slate-900">{med.name}</td>
                            <td className="px-4 py-3 font-bold text-indigo-600">{med.dosage?.split(" ")[0]}</td>
                            <td className="px-4 py-3 font-bold text-slate-700">{med.duration}</td>
                            <td className="px-4 py-3 font-bold text-emerald-600">{med.instruction}</td>
                            <td className="px-4 py-3 font-bold text-slate-600">{med.qty || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tests */}
                {(existingRx?.tests || tests) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <h5 className="font-black text-blue-800 text-xs uppercase tracking-wider mb-2">Advised Investigations</h5>
                    <p className="text-sm text-blue-900 font-medium">{existingRx?.tests || tests}</p>
                  </div>
                )}

                {/* Advice + Follow Up */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <h5 className="font-black text-green-800 text-xs uppercase tracking-wider mb-2">Doctor's Advice</h5>
                    <p className="text-sm text-green-900 font-medium leading-relaxed">{existingRx?.advice || advice}</p>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                    <h5 className="font-black text-rose-800 text-xs uppercase tracking-wider mb-2">Follow-Up</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <BsClockHistory className="text-rose-500 text-lg" />
                      <div>
                        <p className="font-black text-rose-900 text-base">{existingRx?.followUp || followUp}</p>
                        {(existingRx?.nextVisit || nextVisit) && (
                          <p className="text-xs text-rose-700 font-bold mt-0.5">
                            Next visit: {new Date(existingRx?.nextVisit || nextVisit).toLocaleDateString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Digital Signature Footer */}
                <div className="bg-slate-900 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-emerald-400 font-black text-sm">Dr. {existingRx?.doctorName || doctorName}</p>
                    <p className="text-slate-400 text-xs">{existingRx?.doctorSpecialization || doctorSpec}</p>
                    <p className="text-slate-500 text-[10px] font-mono mt-0.5">Reg: {existingRx?.doctorLicense || doctorLicense}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <BsShieldCheck className="text-emerald-400" />
                      <span className="text-emerald-400 font-black text-xs uppercase">Digitally Verified</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-mono mt-1">Rx: {rxId}</p>
                    <p className="text-slate-600 text-[10px]">Sehaat Saathi — India's AI Health Hub</p>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[10px] text-slate-400 italic">
                  This is a digitally issued prescription generated via Sehaat Saathi's verified medical platform.
                  Always consult your doctor before making changes to the prescribed treatment.
                </p>
              </div>
            )}
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 flex-shrink-0 no-print">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <MdVerified className="text-emerald-500" />
              Sehaat Saathi Verified Digital Prescription
            </div>
            <div className="flex gap-3">
              <button onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all">
                <BsPrinter /> Print PDF
              </button>
              {isDoctorView && isCompleted && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs rounded-xl">
                  <BsCheckCircleFill className="text-emerald-500" /> Already Issued
                </div>
              )}
              <button onClick={onClose} className="px-5 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalPrescriptionModal;
