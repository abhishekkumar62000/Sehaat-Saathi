import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  BsListUl, BsCheckCircleFill, BsPlayCircleFill, BsClockFill, BsPersonFill,
} from "react-icons/bs";
import { FaCheckCircle, FaSyncAlt, FaExclamationTriangle, FaUserMd } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";

const STATUS_CONFIG = {
  pending:              { label: "Waiting",     color: "bg-blue-100 text-blue-700",   dot: "bg-blue-400" },
  REQUESTED:            { label: "Waiting",     color: "bg-blue-100 text-blue-700",   dot: "bg-blue-400" },
  confirmed:            { label: "Confirmed",   color: "bg-cyan-100 text-cyan-700",   dot: "bg-cyan-400" },
  PATIENT_ARRIVED:      { label: "Arrived",     color: "bg-purple-100 text-purple-700", dot: "bg-purple-400 animate-pulse" },
  CONSULTATION_STARTED: { label: "In Progress", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400 animate-pulse" },
  completed:            { label: "Done",        color: "bg-green-100 text-green-700",  dot: "bg-green-400" },
  no_show:              { label: "No Show",     color: "bg-gray-100 text-gray-500",    dot: "bg-gray-300" },
  cancelled:            { label: "Cancelled",   color: "bg-red-100 text-red-700",      dot: "bg-red-400" },
};

const SmartTokenQueue = () => {
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ total: 0, waiting: 0, inProgress: 0, completed: 0, currentToken: "—", date: "" });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  });
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchQueue = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/token-queue?date=${selectedDate}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setQueue(data.data || []);
        setStats(data.stats || {});
        setLastRefreshed(new Date());
      }
    } catch (err) {
      // silent fail on background refresh
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    setLoading(true);
    fetchQueue();
  }, [fetchQueue]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchQueue(), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchQueue]);

  const callToken = async (bookingId, tokenNumber) => {
    setActionLoading(bookingId + "call");
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/token-queue/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ bookingId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(`📢 Token ${tokenNumber} called! Patient is being notified.`);
      fetchQueue();
    } catch (err) {
      toast.error(err.message || "Failed to call token");
    } finally {
      setActionLoading(null);
    }
  };

  const markComplete = async (bookingId, tokenNumber) => {
    setActionLoading(bookingId + "complete");
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ status: "completed" }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(`✅ Token ${tokenNumber} — Consultation completed!`);
      fetchQueue();
    } catch (err) {
      toast.error(err.message || "Failed to complete");
    } finally {
      setActionLoading(null);
    }
  };

  const triggerDelay = async () => {
    try {
      const authToken = localStorage.getItem("token");
      await fetch(`${BASE_URL}/hospitals/queue/delay`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ minutes: 30 }),
      });
      toast.warn("⚠️ 30-minute delay notification sent to all waiting patients!");
      fetchQueue();
    } catch (err) {
      toast.error("Failed to broadcast delay");
    }
  };

  const formatTime = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${autoRefresh ? "bg-green-400 animate-pulse" : "bg-gray-300"}`} />
            Smart OPD Token Queue
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Auto-refreshes every 30s
            {lastRefreshed && <span className="ml-2 text-green-500">· {formatTime(lastRefreshed)}</span>}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input type="date" value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          <button onClick={() => { setAutoRefresh(a => !a); fetchQueue(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${autoRefresh ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
            <FaSyncAlt className={autoRefresh ? "animate-spin" : ""} /> {autoRefresh ? "Live" : "Paused"}
          </button>
          <button onClick={triggerDelay}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            <FaExclamationTriangle /> Delay +30min
          </button>
        </div>
      </div>

      {/* NOW SERVING Banner */}
      <div className="relative bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-900 p-6 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-indigo-300 text-xs font-black uppercase tracking-widest mb-1">🔊 Now Serving</p>
            <p className="text-6xl font-black text-white tracking-tight">
              {stats.currentToken !== "—" ? stats.currentToken : "—"}
            </p>
            <p className="text-indigo-300 text-sm font-bold mt-1">
              {stats.currentToken !== "—" ? "In consultation now" : "No active consultation"}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full md:w-auto">
            {[
              { label: "Total", val: stats.total, color: "indigo" },
              { label: "Waiting", val: stats.waiting, color: "blue" },
              { label: "In Progress", val: stats.inProgress, color: "orange" },
              { label: "Completed", val: stats.completed, color: "green" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-[9px] text-indigo-300 uppercase tracking-widest font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queue Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : queue.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <BsListUl className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No Appointments Today</p>
          <p className="text-gray-400 text-xs mt-2">Bookings will appear here as patients register</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((item, idx) => {
            const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
            const isActive = item.status === "CONSULTATION_STARTED";
            const isWaiting = ["pending", "REQUESTED", "confirmed", "PATIENT_ARRIVED"].includes(item.status);
            const isDone = ["completed", "no_show", "cancelled"].includes(item.status);

            return (
              <div key={item._id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-3xl border-2 transition-all ${
                  isActive ? "bg-orange-50 border-orange-300 shadow-lg shadow-orange-100" :
                  isDone ? "bg-gray-50 border-gray-100 opacity-60" :
                  "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md"
                }`}>
                {isActive && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full animate-pulse">
                    🔊 Calling Now
                  </div>
                )}

                {/* Token Number */}
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 font-black ${
                  isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-200" :
                  isDone ? "bg-gray-200 text-gray-500" :
                  "bg-indigo-100 text-indigo-700"
                }`}>
                  <span className="text-[10px] uppercase font-black opacity-70">Token</span>
                  <span className="text-lg leading-tight">{item.tokenNumber}</span>
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-gray-900 text-sm">{item.user?.name || "Patient"}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${sc.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                    {item.consultationType && (
                      <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-100">
                        {item.consultationType}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaUserMd className="text-indigo-400 w-3 h-3" />
                      Dr. {item.doctor?.name || "General OPD"}
                    </span>
                    {item.appointmentTime && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <BsClockFill className="text-gray-400 w-3 h-3" />
                        {item.appointmentTime}
                      </span>
                    )}
                    {item.user?.phone && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        📞 {item.user.phone}
                      </span>
                    )}
                  </div>
                  {isWaiting && item.estimatedWaitMinutes !== undefined && (
                    <p className="text-[11px] text-indigo-500 font-bold mt-1">
                      ⏱ Estimated wait: ~{item.estimatedWaitMinutes} minutes
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                {!isDone && (
                  <div className="flex gap-2 flex-shrink-0">
                    {isWaiting && (
                      <button onClick={() => callToken(item._id, item.tokenNumber)}
                        disabled={!!actionLoading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-indigo-200">
                        {actionLoading === item._id + "call" ? <FaSyncAlt className="animate-spin" /> : <MdNotifications />}
                        Call Token
                      </button>
                    )}
                    {isActive && (
                      <button onClick={() => markComplete(item._id, item.tokenNumber)}
                        disabled={!!actionLoading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-green-200">
                        {actionLoading === item._id + "complete" ? <FaSyncAlt className="animate-spin" /> : <BsCheckCircleFill />}
                        Complete
                      </button>
                    )}
                  </div>
                )}
                {isDone && (
                  <div className="flex-shrink-0">
                    <BsCheckCircleFill className="text-green-400 w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* How it works */}
      <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
        <p className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3">📋 How Smart Tokens Work</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { num: "1", text: "Patient books offline appointment on Sehaat Saathi", color: "blue" },
            { num: "2", text: "System auto-assigns a token number (T001, T002...)", color: "indigo" },
            { num: "3", text: "Hospital clicks 'Call Token' when ready", color: "orange" },
            { num: "4", text: "Click 'Complete' when consultation is done", color: "green" },
          ].map(step => (
            <div key={step.num} className="flex items-start gap-3">
              <div className={`w-7 h-7 bg-${step.color}-200 text-${step.color}-800 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5`}>
                {step.num}
              </div>
              <p className="text-xs text-indigo-700 font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartTokenQueue;
