import React, { useState, useContext } from "react";
import { useSocket } from "../../context/SocketContext";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  BsExclamationTriangleFill, BsBroadcastPin, BsX, BsClockHistory
} from "react-icons/bs";
import { MdVideocam, MdSick } from "react-icons/md";

const DELAY_REASONS = [
  "Emergency Surgery",
  "Personal Emergency",
  "Running Behind Schedule",
  "Hospital Emergency",
  "Power/System Issue",
  "Other",
];

const EmergencyDelayManager = ({ appointments, doctorId }) => {
  const { socket } = useSocket();
  const { token } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState(30);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [broadcasting, setBroadcasting] = useState(false);

  const activeBookings = (appointments || []).filter(
    a => ["confirmed", "pending", "PATIENT_ARRIVED"].includes(a.status)
  );

  const broadcastDelay = async () => {
    if (!reason) {
      toast.error("Please select a reason for delay.");
      return;
    }
    setBroadcasting(true);
    const finalReason = reason === "Other" ? customReason : reason;
    const affectedBookingIds = activeBookings.map(a => a._id);

    try {
      if (socket) {
        socket.emit("DOCTOR_DELAY_ALERT", {
          doctorId,
          delayMinutes,
          reason: finalReason,
          affectedBookingIds,
        });
      }
      toast.success(`📢 Delay alert sent to ${affectedBookingIds.length} patient(s)!`);
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to send delay alert.");
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-2xl px-4 py-3 text-sm font-black transition-all group"
      >
        <BsExclamationTriangleFill className="text-red-500 group-hover:animate-bounce" />
        <span className="flex-grow text-left">Broadcast Delay Alert</span>
        <span className="text-[9px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">{activeBookings.length} patients</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <BsExclamationTriangleFill className="text-yellow-300 text-xl" />
                </div>
                <div>
                  <div className="text-white font-black text-base">Emergency Delay Alert</div>
                  <div className="text-red-100 text-[10px]">Notify {activeBookings.length} waiting patients instantly</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <BsX className="text-2xl" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Delay duration */}
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
                  <BsClockHistory className="inline mr-1" /> Delay Duration
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[15, 30, 45, 60, 90].map(min => (
                    <button
                      key={min}
                      onClick={() => setDelayMinutes(min)}
                      className={`px-4 py-2 rounded-xl text-sm font-black border transition-all ${
                        delayMinutes === min
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-slate-600 border-slate-200 hover:border-red-300"
                      }`}
                    >
                      {min >= 60 ? `${min / 60}h` : `${min}m`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
                  Reason for Delay
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DELAY_REASONS.map(r => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                        reason === r
                          ? "bg-red-50 text-red-700 border-red-300"
                          : "bg-white text-slate-600 border-slate-200 hover:border-red-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {reason === "Other" && (
                  <input
                    value={customReason}
                    onChange={e => setCustomReason(e.target.value)}
                    placeholder="Describe the reason..."
                    className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-red-400"
                  />
                )}
              </div>

              {/* Patient list preview */}
              {activeBookings.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Patients to be notified:</div>
                  <div className="space-y-1.5 max-h-28 overflow-y-auto">
                    {activeBookings.map((b, i) => (
                      <div key={b._id} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[9px]">{i + 1}</span>
                        {b.user?.name || "Patient"} — {b.appointmentDate || "Today"}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info on what patients see */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-xs text-blue-700">
                <strong>What happens:</strong> Each patient gets an instant notification with the delay details and two options: switch to <MdVideocam className="inline" /> <strong>Video Consult</strong> or reschedule their appointment.
              </div>

              {/* Broadcast button */}
              <button
                onClick={broadcastDelay}
                disabled={broadcasting}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-red-200"
              >
                <BsBroadcastPin className="text-lg animate-pulse" />
                {broadcasting ? "Broadcasting..." : `Alert All ${activeBookings.length} Patients Now`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyDelayManager;
