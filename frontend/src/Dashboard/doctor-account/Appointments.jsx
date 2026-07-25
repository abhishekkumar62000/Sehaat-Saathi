import { formatDate } from "../../utils/formatDate";
import { useState, useContext, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import useRecordActivity from "../../hooks/useRecordActivity";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  BsCheckCircleFill, BsXCircleFill, BsArrowRepeat,
  BsCapsule, BsPersonBadge, BsCalendarCheck, BsClock,
  BsSearch, BsFunnelFill
} from "react-icons/bs";
import { MdHealthAndSafety, MdVideoCall } from "react-icons/md";
import DigitalPrescriptionModal from "../../components/Booking/DigitalPrescriptionModal";

/* eslint-disable react/prop-types */
const Appointments = ({ appointments: initialAppointments }) => {
  const { token, user: doctorUser } = useContext(authContext);
  const { socket } = useSocket();
  const { recordActivity } = useRecordActivity();

  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [prescriptionModalBooking, setPrescriptionModalBooking] = useState(null);
  const [confirmTime, setConfirmTime] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setAppointments(result.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  // Real-time socket listener
  useEffect(() => {
    if (!socket) return;
    const onNewBooking = (newAppointment) => {
      toast.info("🔔 New appointment received!", { position: "top-right", autoClose: 5000 });
      fetchAppointments();
    };
    socket.on("new-booking", onNewBooking);
    return () => socket.off("new-booking", onNewBooking);
  }, [socket, fetchAppointments]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
    toast.success("Appointments refreshed!", { autoClose: 1500 });
  };

  const handleUpdateStatus = async (bookingId, status, time = "", msg = "") => {
    try {
      const res = await fetch(`${BASE_URL}/appointments/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, appointmentTime: time, statusMessage: msg }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(`Appointment ${status} successfully`);
      recordActivity("Appointments", `${status} Appointment`, `/doctors/profile/me`);
      setSelectedBooking(null);
      fetchAppointments();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteAppointment = async (bookingId) => {
    if (!window.confirm("Are you sure you want to permanently delete this record?")) return;
    const orig = [...appointments];
    setAppointments(prev => prev.filter(a => a._id !== bookingId));
    try {
      const res = await fetch(`${BASE_URL}/appointments/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) { setAppointments(orig); throw new Error(result.message); }
      toast.success("Record deleted successfully");
      recordActivity("Appointments", "Record Deleted", `/doctors/profile/me`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filter + Search + Sort
  const filtered = (appointments || [])
    .filter(a => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q ||
        a.patient?.name?.toLowerCase().includes(q) ||
        a.patient?.email?.toLowerCase().includes(q) ||
        a.bookingToken?.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || a.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    completed: appointments.filter(a => a.status === "completed").length,
  };

  const statusStyles = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-indigo-100 text-indigo-800 border-indigo-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    auto_cancelled: "bg-slate-100 text-slate-600 border-slate-200",
    PATIENT_ARRIVED: "bg-orange-100 text-orange-800 border-orange-200",
    CONSULTATION_STARTED: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return (
    <section className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "indigo", icon: "📋" },
          { label: "Pending", value: stats.pending, color: "amber", icon: "⏳" },
          { label: "Confirmed", value: stats.confirmed, color: "green", icon: "✅" },
          { label: "Completed", value: stats.completed, color: "purple", icon: "🏁" },
        ].map(s => (
          <div key={s.label} onClick={() => setFilterStatus(s.label.toLowerCase() === "total" ? "all" : s.label.toLowerCase())}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl font-black text-${s.color}-600`}>{s.value}</span>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mt-1 group-hover:text-indigo-600 transition-colors">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-600 to-violet-700">
          <h1 className="text-base font-black text-white tracking-tight flex items-center gap-2 mr-auto">
            <MdHealthAndSafety className="text-xl" />
            Appointment Control Matrix
            <span className="text-[11px] font-medium bg-white/20 px-2 py-0.5 rounded-full">
              {filtered.length} / {appointments.length}
            </span>
          </h1>
          <button onClick={handleRefresh}
            className={`p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all ${refreshing ? "animate-spin" : ""}`}>
            <BsArrowRepeat className="w-4 h-4" />
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="relative flex-1 min-w-[200px]">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search patient name, email, token..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <BsFunnelFill className="text-slate-400 text-sm" />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-slate-400 font-bold">No appointments found.</p>
              {searchQuery && <p className="text-xs text-slate-300 mt-1">Try clearing your search</p>}
            </div>
          ) : (
            <table className="w-full text-left text-sm border-separate border-spacing-0">
              <thead>
                <tr className="text-[11px] text-slate-400 font-black uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
                  <th className="px-5 py-3">Patient</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(item => (
                  <tr key={item._id} className="hover:bg-indigo-50/20 transition-all duration-200 group">
                    {/* Patient */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <figure className="w-10 h-10 rounded-xl border-2 border-white shadow-md overflow-hidden flex-shrink-0 bg-slate-100 group-hover:scale-105 transition-transform">
                          <img src={item.patient?.photo} alt="" className="w-full h-full object-cover" loading="lazy"
                            onError={e => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.patient?.name || "P") + "&background=6366f1&color=fff"; }} />
                        </figure>
                        <div>
                          <div className="font-black text-slate-800 text-sm leading-tight">{item.patient?.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{item.patient?.gender} • {item.patient?.email}</div>
                          <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${item.appointmentType === "teleconsult" ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>
                            {item.appointmentType === "teleconsult" ? "📹 Video Call" : "🏥 In-Person"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${item.paymentStatus === "paid" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
                        {item.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </div>
                      <div className="text-[11px] font-black text-slate-600 mt-1">₹{item.ticketPrice}</div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${statusStyles[item.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {item.status?.replace(/_/g, " ")}
                      </div>
                      {item.appointmentTime && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-indigo-600 font-bold">
                          <BsClock className="text-[9px]" /> {item.appointmentTime}
                        </div>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3 text-[11px] text-slate-400 font-bold whitespace-nowrap">
                      {formatDate(item.createdAt)}
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-300 font-mono">
                        #{item.bookingToken}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {/* Delete */}
                        <button onClick={() => handleDeleteAppointment(item._id)}
                          title="Delete"
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-100">
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>

                        {/* Pending: Confirm / Reject */}
                        {item.status === "pending" && (
                          <>
                            <button onClick={() => setSelectedBooking(item)}
                              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-lg shadow-indigo-100 transition-all active:scale-95">
                              <BsCheckCircleFill /> Confirm
                            </button>
                            <button onClick={() => handleUpdateStatus(item._id, "rejected")}
                              className="flex items-center gap-1 border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all active:scale-95">
                              <BsXCircleFill /> Reject
                            </button>
                          </>
                        )}

                        {/* Confirmed tele: Start Call */}
                        {item.appointmentType === "teleconsult" && item.status === "confirmed" && (
                          <button onClick={() => window.open(`/tele-consult-ai?session=${item._id}`, "_blank")}
                            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-black animate-pulse shadow-lg shadow-rose-100 transition-all active:scale-95">
                            <MdVideoCall className="text-sm" /> Start Call
                          </button>
                        )}

                        {/* e-Prescription Button */}
                        {(item.status === "confirmed" || item.status === "completed" || item.status === "CONSULTATION_STARTED" || item.status === "PATIENT_ARRIVED") && (
                          <button onClick={() => setPrescriptionModalBooking(item)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black transition-all active:scale-95 shadow-md ${item.prescriptionDetails ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"}`}>
                            <BsCapsule />
                            {item.prescriptionDetails ? "View Rx" : "Issue Rx"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirm Appointment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <BsCalendarCheck className="text-indigo-600 text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Confirm Appointment</h2>
                <p className="text-xs text-slate-400 font-medium">Patient: <span className="text-indigo-600 font-bold">{selectedBooking.patient?.name}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Scheduled Time</label>
                <input type="text" placeholder="e.g. 10:30 AM" value={confirmTime}
                  onChange={e => setConfirmTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Message to Patient (Optional)</label>
                <textarea placeholder="e.g. Please bring previous reports and arrive 10 mins early."
                  value={statusMsg} onChange={e => setStatusMsg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[80px] resize-none" />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => handleUpdateStatus(selectedBooking._id, "confirmed", confirmTime, statusMsg)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <BsCheckCircleFill /> Confirm Appointment
                </button>
                <button onClick={() => setSelectedBooking(null)}
                  className="px-5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3.5 rounded-2xl transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Digital Prescription Modal */}
      {prescriptionModalBooking && (
        <DigitalPrescriptionModal
          booking={prescriptionModalBooking}
          isDoctorView={true}
          onClose={() => setPrescriptionModalBooking(null)}
          onPrescriptionSaved={fetchAppointments}
        />
      )}
    </section>
  );
};

export default Appointments;
