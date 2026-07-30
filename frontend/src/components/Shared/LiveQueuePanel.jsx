import React, { useState, useEffect, useContext } from "react";
import { useSocket } from "../../context/SocketContext";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { BsBellFill, BsPersonFill, BsClockHistory, BsCheckCircleFill, BsArrowRight, BsMegaphoneFill } from "react-icons/bs";
import { MdVideocam } from "react-icons/md";

// ─── DOCTOR VIEW: Controls who to call next ──────────────────────────────────
export const DoctorQueueController = ({ appointments, doctorId }) => {
  const { socket } = useSocket();
  const [currentToken, setCurrentToken] = useState(0);
  const [queueState, setQueueState] = useState([]);

  useEffect(() => {
    if (!appointments) return;
    const queue = appointments
      .filter(a => a.status === "confirmed" || a.status === "pending" || a.status === "PATIENT_ARRIVED")
      .map((a, idx) => ({
        tokenNumber: idx + 1,
        patientName: a.user?.name || "Patient",
        patientId: a.user?._id || a.user,
        bookingId: a._id,
        status: a.status,
      }));
    setQueueState(queue);
  }, [appointments]);

  const callNext = () => {
    const nextToken = currentToken + 1;
    if (nextToken > queueState.length) {
      toast.info("✅ All patients have been attended today!");
      return;
    }
    setCurrentToken(nextToken);
    const patient = queueState[nextToken - 1];

    if (socket) {
      socket.emit("CALL_NEXT_PATIENT", {
        doctorId,
        currentToken: nextToken,
        queueState: queueState.map((p, i) => ({
          ...p,
          position: i + 1,
          isCurrent: i + 1 === nextToken,
          aheadOf: Math.max(0, i + 1 - nextToken),
          estimatedWait: Math.max(0, (i + 1 - nextToken) * 12), // 12 min per patient
        })),
        roomName: "Consultation Room 1",
      });
      toast.success(`🔔 Calling Token #${nextToken} — ${patient?.patientName}`);
    }
  };

  const currentPatient = queueState[currentToken - 1];
  const nextPatient = queueState[currentToken];

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-black flex items-center gap-2">
            <BsMegaphoneFill className="text-yellow-300 animate-pulse" /> Live OPD Queue
          </h3>
          <p className="text-indigo-200 text-xs mt-0.5">{queueState.length} patients today</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 text-center">
          <div className="text-2xl font-black text-yellow-300">#{currentToken || "-"}</div>
          <div className="text-[9px] text-white/70 uppercase tracking-wider">Now Serving</div>
        </div>
      </div>

      {/* Current patient */}
      {currentPatient && (
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-slate-900 text-lg">
            {currentToken}
          </div>
          <div>
            <div className="font-black text-white">{currentPatient.patientName}</div>
            <div className="text-indigo-200 text-[10px] uppercase tracking-wider">In Consultation</div>
          </div>
          <BsCheckCircleFill className="ml-auto text-green-400 text-xl" />
        </div>
      )}

      {/* Next patient preview */}
      {nextPatient && (
        <div className="bg-white/10 rounded-2xl p-3 mb-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center font-black text-sm">
            {currentToken + 1}
          </div>
          <div className="flex-grow">
            <div className="font-bold text-sm">{nextPatient.patientName}</div>
            <div className="text-indigo-200 text-[9px]">Up Next</div>
          </div>
          <BsArrowRight className="text-indigo-300" />
        </div>
      )}

      <button
        onClick={callNext}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black rounded-2xl py-3.5 text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
      >
        <BsMegaphoneFill /> Call Next Patient
      </button>

      <div className="mt-3 text-center text-indigo-200 text-[10px]">
        Patients receive live push notifications on their phone
      </div>
    </div>
  );
};

// ─── PATIENT VIEW: Live queue position tracker ────────────────────────────────
export const PatientQueueTracker = ({ booking }) => {
  const { socket } = useSocket();
  const { user } = useContext(authContext);
  const [position, setPosition] = useState(null);
  const [currentToken, setCurrentToken] = useState(0);
  const [estimatedWait, setEstimatedWait] = useState(null);
  const [delayAlert, setDelayAlert] = useState(null);
  const [pivotChoice, setPivotChoice] = useState(null);

  useEffect(() => {
    if (!socket || !booking) return;
    const doctorId = booking.doctor?._id || booking.doctor;

    // Join the doctor's queue room to receive token updates
    socket.emit("JOIN_ROOM", doctorId);

    const onQueueUpdated = ({ currentToken: tok, queueState }) => {
      setCurrentToken(tok);
      const mine = queueState.find(p => p.bookingId === booking._id);
      if (mine) {
        setPosition(mine.aheadOf);
        setEstimatedWait(mine.estimatedWait);
        if (mine.aheadOf <= 2 && mine.aheadOf > 0) {
          toast.warn(`⏰ Almost your turn! ${mine.aheadOf} patient(s) ahead. Head to the clinic now!`, { autoClose: 8000 });
        }
        if (mine.isCurrent) {
          toast.success("🎉 It's YOUR TURN! Please proceed to the consultation room.", { autoClose: 10000 });
        }
      }
    };

    // Listen for delay notifications
    const onDelay = (data) => {
      if (data.bookingId === booking._id) {
        setDelayAlert(data);
        toast.error(`⚠️ Doctor delay: ${data.reason || "Emergency"} — ${data.delayMinutes} mins`, { autoClose: false });
      }
    };

    socket.on("QUEUE_UPDATED", onQueueUpdated);
    socket.on("DELAY_NOTIFICATION", onDelay);

    return () => {
      socket.off("QUEUE_UPDATED", onQueueUpdated);
      socket.off("DELAY_NOTIFICATION", onDelay);
    };
  }, [socket, booking]);

  const handlePivot = (choice) => {
    setPivotChoice(choice);
    if (socket && booking) {
      socket.emit("PATIENT_PIVOT_CHOICE", {
        bookingId: booking._id,
        doctorId: booking.doctor?._id || booking.doctor,
        choice,
      });
      toast.success(choice === "video" ? "📹 Switching to Video Consult!" : "📅 Reschedule request sent!");
      setDelayAlert(null);
    }
  };

  if (!booking) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-indigo-100 shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 flex items-center gap-2">
        <BsClockHistory className="text-yellow-300 animate-spin-slow" />
        <span className="text-white font-black text-sm uppercase tracking-wider">Live Queue Status</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-green-300 text-[9px] font-bold">LIVE</span>
        </span>
      </div>

      <div className="bg-white p-4">
        {position === null ? (
          <div className="text-center py-3 text-slate-400 text-sm">
            <BsClockHistory className="text-3xl mx-auto mb-2 text-indigo-200 animate-pulse" />
            Waiting for doctor to start queue...
          </div>
        ) : position === 0 ? (
          <div className="text-center py-2">
            <div className="text-4xl mb-1">🎉</div>
            <div className="font-black text-green-600 text-lg">It's YOUR TURN!</div>
            <div className="text-slate-500 text-xs mt-0.5">Please proceed to the consultation room now.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Position counter */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-indigo-700">{position} patient{position !== 1 ? "s" : ""} ahead</div>
                <div className="text-slate-400 text-xs mt-0.5">Est. wait time: ~{estimatedWait} mins</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-200 flex flex-col items-center justify-center">
                <div className="text-xl font-black text-indigo-700">{position}</div>
                <div className="text-[7px] text-indigo-400 uppercase">ahead</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, 100 - (position * 15))}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 text-center">
              Currently serving token #{currentToken} — Head to clinic when 1 patient is ahead!
            </div>
          </div>
        )}

        {/* Delay alert pivot */}
        {delayAlert && !pivotChoice && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-2xl p-3">
            <div className="font-black text-red-700 text-sm mb-1">⚠️ Doctor Delay Alert</div>
            <div className="text-red-600 text-xs mb-3">{delayAlert.reason} — {delayAlert.delayMinutes} mins delay</div>
            <div className="flex gap-2">
              <button onClick={() => handlePivot("video")} className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                <MdVideocam /> Switch to Video
              </button>
              <button onClick={() => handlePivot("reschedule")} className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl">
                Reschedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientQueueTracker;
