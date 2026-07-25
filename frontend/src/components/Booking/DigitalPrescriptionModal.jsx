import { useState } from "react";
import { BsCapsule, BsPrinter, BsX, BsPlusCircle, BsTrash, BsCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import { useSocket } from "../../context/SocketContext";

const DigitalPrescriptionModal = ({ booking, doctorData, isDoctorView = true, onClose, onPrescriptionSaved }) => {
  const { socket } = useSocket();
  const [diagnosis, setDiagnosis] = useState(booking?.prescriptionDetails?.diagnosis || "");
  const [advice, setAdvice] = useState(booking?.prescriptionDetails?.advice || "Take plenty of fluids and rest. Follow up in 5 days if symptoms persist.");
  const [medicines, setMedicines] = useState(
    booking?.prescriptionDetails?.medicines || [
      { name: "Paracetamol 650mg", dosage: "1-0-1", duration: "3 Days", instruction: "After Food" }
    ]
  );
  const [saving, setSaving] = useState(false);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "1-0-1", duration: "5 Days", instruction: "After Food" }]);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSavePrescription = async () => {
    if (!diagnosis.trim()) {
      toast.error("Please enter a diagnosis.");
      return;
    }
    if (medicines.some(m => !m.name.trim())) {
      toast.error("Please provide names for all prescribed medicines.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/${booking._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "completed",
          statusMessage: "Prescription issued by Doctor.",
          prescriptionDetails: {
            diagnosis,
            medicines,
            advice,
            issuedAt: new Date().toISOString()
          }
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Emit Real-time Socket Event to Patient
      if (socket && booking.user?._id) {
        socket.emit("STATUS_SYNC", {
          user: booking.user._id,
          status: "completed",
          message: `Dr. ${doctorData?.name || 'Doctor'} has issued your e-Prescription!`,
          bookingId: booking._id
        });
      }

      toast.success("⚡ e-Prescription issued successfully!");
      if (onPrescriptionSaved) onPrescriptionSaved();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save prescription.");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-200">
              <BsCapsule />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Sehaat Saathi Digital e-Prescription
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Official Neural Health Record
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
          >
            <BsX className="w-7 h-7" />
          </button>
        </div>

        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl mb-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="font-black text-lg text-emerald-400">
              Dr. {doctorData?.name || booking?.doctor?.name || "Medical Professional"}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              {doctorData?.specialization || booking?.doctor?.specialization || "Clinical Specialist"} • Reg No: {doctorData?.licenseNumber || "SS-MED-2026-IND"}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              🏥 {doctorData?.hospitalName || booking?.doctor?.hospital?.hospitalName || "Sehaat Saathi Virtual Medical Hub"}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full">
              Verified e-Rx
            </span>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Patient Detail Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Patient Name</span>
            <span className="font-black text-slate-800 text-sm">{booking?.user?.name || booking?.patient?.name || "Patient"}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Gender / Age</span>
            <span className="font-black text-slate-800 text-sm">{booking?.user?.gender || booking?.patient?.gender || "N/A"}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Booking Token</span>
            <span className="font-black text-indigo-600 text-sm">#{booking?.bookingToken || booking?.queueNumber || "01"}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Consult Type</span>
            <span className="font-black text-emerald-600 uppercase text-xs">
              {booking?.appointmentType === "teleconsult" ? "📹 Teleconsultation" : "🏥 Offline Visit"}
            </span>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            Clinical Diagnosis / Assessment
          </label>
          {isDoctorView ? (
            <input
              type="text"
              placeholder="e.g. Acute Viral Fever with Upper Respiratory Tract Infection"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          ) : (
            <p className="bg-emerald-50 text-emerald-950 p-3.5 rounded-xl border border-emerald-100 font-bold text-sm">
              {diagnosis || "General Consultation & Routine Assessment"}
            </p>
          )}
        </div>

        {/* Prescribed Medicines */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <BsCapsule className="text-emerald-600" /> Prescribed Medications ({medicines.length})
            </label>
            {isDoctorView && (
              <button
                type="button"
                onClick={handleAddMedicine}
                className="text-xs font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-all"
              >
                <BsPlusCircle /> Add Medicine
              </button>
            )}
          </div>

          <div className="space-y-3">
            {medicines.map((med, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap md:flex-nowrap items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>

                {isDoctorView ? (
                  <>
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g., Amoxicillin 500mg)"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                      className="flex-2 bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <select
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none"
                    >
                      <option value="1-0-1">1-0-1 (Morning & Night)</option>
                      <option value="1-1-1">1-1-1 (Thrice daily)</option>
                      <option value="1-0-0">1-0-0 (Morning only)</option>
                      <option value="0-0-1">0-0-1 (Night only)</option>
                      <option value="SOS">SOS (As needed)</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Duration (e.g. 5 Days)"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(idx, "duration", e.target.value)}
                      className="w-28 bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none"
                    />
                    <select
                      value={med.instruction}
                      onChange={(e) => handleMedicineChange(idx, "instruction", e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none"
                    >
                      <option value="After Food">After Food</option>
                      <option value="Before Food">Before Food</option>
                      <option value="With Water">With Water</option>
                    </select>

                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(idx)}
                        className="text-red-400 hover:text-red-600 p-2"
                      >
                        <BsTrash />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div><span className="text-slate-400 font-bold block text-[10px]">Medicine</span><span className="font-black text-slate-800">{med.name}</span></div>
                    <div><span className="text-slate-400 font-bold block text-[10px]">Dosage</span><span className="font-black text-indigo-600">{med.dosage}</span></div>
                    <div><span className="text-slate-400 font-bold block text-[10px]">Duration</span><span className="font-black text-slate-700">{med.duration}</span></div>
                    <div><span className="text-slate-400 font-bold block text-[10px]">Instructions</span><span className="font-black text-emerald-600">{med.instruction}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Advice */}
        <div className="mb-6">
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
            Special Instructions & Lifestyle Advice
          </label>
          {isDoctorView ? (
            <textarea
              rows={2}
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            ></textarea>
          ) : (
            <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 leading-relaxed">
              {advice}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <BsPrinter /> Print / Save PDF
          </button>

          {isDoctorView ? (
            <button
              type="button"
              disabled={saving}
              onClick={handleSavePrescription}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-200 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <BsCheckCircleFill /> {saving ? "Issuing e-Rx..." : "Issue & Send e-Prescription"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalPrescriptionModal;
