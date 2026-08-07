import { useState, useEffect, useCallback } from "react";
import { formatDate } from "../../utils/formatDate";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  FaUserMd, FaPhone, FaCalendarCheck, FaClock, FaSyncAlt,
  FaSearch, FaFilter, FaCheckCircle, FaExclamationTriangle,
  FaPrint, FaUserCheck, FaPlayCircle, FaTimesCircle
} from "react-icons/fa";
import { MdNotificationsActive, MdVideoCameraFront, MdOutlineVerified } from "react-icons/md";
import { BsListUl, BsCheckCircleFill, BsPersonFill, BsClockFill } from "react-icons/bs";

const STATUS_CONFIG = {
  pending:              { label: "Pending",        color: "bg-blue-100 text-blue-700 border-blue-200",     dot: "bg-blue-400" },
  REQUESTED:            { label: "Requested",      color: "bg-blue-100 text-blue-700 border-blue-200",     dot: "bg-blue-400" },
  confirmed:            { label: "Confirmed",      color: "bg-cyan-100 text-cyan-700 border-cyan-200",     dot: "bg-cyan-400" },
  PATIENT_ARRIVED:      { label: "Arrived at OPD", color: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-400 animate-pulse" },
  CONSULTATION_STARTED: { label: "In Progress",    color: "bg-orange-100 text-orange-700 border-orange-200", dot: "bg-orange-400 animate-pulse" },
  completed:            { label: "Completed",      color: "bg-green-100 text-green-700 border-green-200",   dot: "bg-green-400" },
  cancelled:            { label: "Cancelled",      color: "bg-red-100 text-red-700 border-red-200",         dot: "bg-red-400" },
  rejected:             { label: "Rejected",       color: "bg-red-100 text-red-700 border-red-200",         dot: "bg-red-400" },
};

const HospitalAppointments = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchBookings = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/token-queue`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setBookings(data.data);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      // silent background refresh fail
    }
  }, []);

  useEffect(() => {
    if (initialBookings && initialBookings.length > 0) {
      setBookings(initialBookings);
    } else {
      fetchBookings();
    }
  }, [initialBookings, fetchBookings]);

  // Auto Refresh Every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchBookings(), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchBookings]);

  const updateStatus = async (bookingId, newStatus, patientName) => {
    setActionLoading(bookingId + newStatus);
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(`✅ ${patientName}'s appointment marked as ${newStatus.replace('_', ' ')}!`);
      fetchBookings();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePrintOPDList = () => {
    window.print();
  };

  // Filter Logic
  const filteredBookings = bookings.filter(b => {
    const patientName = b.user?.name || b.patientName || "";
    const doctorName = b.doctor?.name || "";
    const phone = b.user?.phone || b.contactNumber || "";
    const tokenNum = b.tokenNumber || "";

    const searchMatch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      tokenNum.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "all" || b.status === statusFilter;

    const typeMatch =
      typeFilter === "all" ||
      (typeFilter === "video" && (b.consultationType?.toLowerCase().includes("video") || b.bookingMode === "video")) ||
      (typeFilter === "opd" && (!b.consultationType || b.consultationType?.toLowerCase().includes("opd") || b.bookingMode === "offline"));

    return searchMatch && statusMatch && typeMatch;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const arrivedCount = bookings.filter(b => b.status === "PATIENT_ARRIVED" || b.status === "CONSULTATION_STARTED").length;
  const completedCount = bookings.filter(b => b.status === "completed").length;

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <FaCalendarCheck className="text-indigo-600" />
            Real-Time Appointments Sync Monitor
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Live patient consultations & OPD scheduling · Auto-refreshes every 30s
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => { setAutoRefresh(a => !a); fetchBookings(); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${autoRefresh ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
            <FaSyncAlt className={autoRefresh ? "animate-spin" : ""} /> {autoRefresh ? "Live Sync ON" : "Sync Paused"}
          </button>
          <button onClick={handlePrintOPDList}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
            <FaPrint /> Print OPD Roster
          </button>
        </div>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-indigo-950 to-blue-900 text-white rounded-3xl shadow-md">
          <p className="text-3xl font-black">{totalCount}</p>
          <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">Total Appointments</p>
        </div>
        <div className="p-5 bg-cyan-50 border border-cyan-100 rounded-3xl">
          <p className="text-3xl font-black text-cyan-700">{confirmedCount}</p>
          <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mt-1">Confirmed & Ready</p>
        </div>
        <div className="p-5 bg-purple-50 border border-purple-100 rounded-3xl">
          <p className="text-3xl font-black text-purple-700">{arrivedCount}</p>
          <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mt-1">Waiting in OPD</p>
        </div>
        <div className="p-5 bg-green-50 border border-green-100 rounded-3xl">
          <p className="text-3xl font-black text-green-700">{completedCount}</p>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Consulted / Completed</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by Patient, Doctor, Phone, Token..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>

          {/* Status Filter Dropdown */}
          <div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="all">🌐 All Statuses</option>
              <option value="confirmed">🟢 Confirmed</option>
              <option value="PATIENT_ARRIVED">🟣 Arrived at OPD</option>
              <option value="CONSULTATION_STARTED">🟠 In Consultation</option>
              <option value="completed">✅ Completed</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="all">🏥 All Booking Types</option>
              <option value="opd">🛏️ Offline OPD Consultation</option>
              <option value="video">📹 Video Tele-Consultation</option>
            </select>
          </div>
        </div>

        {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Filters:</span>
            <button onClick={() => { setSearchTerm(""); setStatusFilter("all"); setTypeFilter("all"); }}
              className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all">
              Clear Filters ✖
            </button>
          </div>
        )}
      </div>

      {/* Appointment Cards List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <BsListUl className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No Matching Appointments Found</p>
          <p className="text-gray-400 text-xs mt-1">Try clearing your search filters or selecting a different status</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((item) => {
            const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
            const isDone = ["completed", "cancelled", "rejected"].includes(item.status);
            const isArrived = item.status === "PATIENT_ARRIVED";
            const isInProgress = item.status === "CONSULTATION_STARTED";

            return (
              <div key={item._id}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  isInProgress ? "bg-orange-50/70 border-orange-300 shadow-lg shadow-orange-100" :
                  isArrived ? "bg-purple-50/70 border-purple-300 shadow-md shadow-purple-100" :
                  isDone ? "bg-gray-50/70 border-gray-200 opacity-70" :
                  "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md"
                }`}>

                {/* Patient & Doctor Details */}
                <div className="flex items-start gap-4 flex-1 min-w-0">

                  {/* Token Number Badge */}
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 font-black ${
                    isInProgress ? "bg-orange-600 text-white shadow-lg shadow-orange-200" :
                    isArrived ? "bg-purple-600 text-white shadow-lg shadow-purple-200" :
                    isDone ? "bg-gray-200 text-gray-500" :
                    "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  }`}>
                    <span className="text-[9px] uppercase tracking-wider font-black opacity-80">Token</span>
                    <span className="text-sm leading-tight truncate px-1">{item.tokenNumber || `#${item._id.slice(-4)}`}</span>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-black text-gray-900 text-base">{item.user?.name || item.patientName || "Patient"}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${sc.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                      {item.consultationType && (
                        <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {item.consultationType}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <FaUserMd className="text-indigo-500" />
                        Dr. {item.doctor?.name || "General OPD"} ({item.doctor?.specialization || "OPD"})
                      </span>
                      {item.appointmentDate && (
                        <span className="flex items-center gap-1.5 font-semibold">
                          <BsClockFill className="text-gray-400" />
                          {item.appointmentDate} {item.appointmentTime && `· ${item.appointmentTime}`}
                        </span>
                      )}
                      {(item.user?.phone || item.contactNumber) && (
                        <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                          📞 {item.user?.phone || item.contactNumber}
                        </span>
                      )}
                      {item.paymentMethod && (
                        <span className="flex items-center gap-1.5 font-semibold text-green-700">
                          💳 {item.paymentMethod} ({item.isPaid ? "Paid" : "Pay at OPD"})
                        </span>
                      )}
                    </div>

                    {item.symptoms && (
                      <p className="text-xs text-indigo-900 bg-indigo-50/70 border border-indigo-100 px-3 py-1.5 rounded-xl mt-2 font-medium inline-block">
                        🩺 Symptoms: {item.symptoms}
                      </p>
                    )}
                  </div>
                </div>

                {/* Staff Action Buttons */}
                {!isDone && (
                  <div className="flex flex-wrap gap-2 flex-shrink-0 w-full md:w-auto justify-end">
                    {/* Mark Arrived Button */}
                    {!isArrived && !isInProgress && (
                      <button onClick={() => updateStatus(item._id, "PATIENT_ARRIVED", item.user?.name || "Patient")}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-md shadow-purple-200 active:scale-95 disabled:opacity-50">
                        {actionLoading === item._id + "PATIENT_ARRIVED" ? <FaSyncAlt className="animate-spin" /> : <FaUserCheck />}
                        Arrived in OPD
                      </button>
                    )}

                    {/* Start Consultation Button */}
                    {isArrived && (
                      <button onClick={() => updateStatus(item._id, "CONSULTATION_STARTED", item.user?.name || "Patient")}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-md shadow-orange-200 active:scale-95 disabled:opacity-50">
                        {actionLoading === item._id + "CONSULTATION_STARTED" ? <FaSyncAlt className="animate-spin" /> : <FaPlayCircle />}
                        Start OPD
                      </button>
                    )}

                    {/* Complete Button */}
                    {(isInProgress || isArrived || item.status === "confirmed") && (
                      <button onClick={() => updateStatus(item._id, "completed", item.user?.name || "Patient")}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-md shadow-green-200 active:scale-95 disabled:opacity-50">
                        {actionLoading === item._id + "completed" ? <FaSyncAlt className="animate-spin" /> : <FaCheckCircle />}
                        Complete
                      </button>
                    )}

                    {/* Cancel Button */}
                    <button onClick={() => updateStatus(item._id, "cancelled", item.user?.name || "Patient")}
                      disabled={!!actionLoading}
                      className="flex items-center gap-1.5 px-3 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50">
                      <FaTimesCircle />
                    </button>
                  </div>
                )}

                {isDone && (
                  <div className="flex items-center gap-2 text-xs font-black text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">
                    <BsCheckCircleFill className="text-green-500 w-4 h-4" />
                    <span>Archived / {item.status.toUpperCase()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HospitalAppointments;
