import React, { useState, useEffect, useContext } from "react";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import PatientJourneyTimeline from "../../components/Patient/PatientJourneyTimeline";
import DigitalPrescriptionModal from "../../components/Booking/DigitalPrescriptionModal";
import { useSocket } from "../../context/SocketContext";
import { toast } from "react-toastify";
import {
  BsCapsule, BsClock, BsCheckCircleFill, BsXCircleFill,
  BsArrowRepeat, BsPersonBadge, BsCalendarCheck, BsShieldCheck,
  BsJournalMedical
} from "react-icons/bs";
import { MdVideoCall, MdHealthAndSafety, MdStar } from "react-icons/md";
import { FaFilePrescription, FaMapMarkerAlt } from "react-icons/fa";

const STATUS_STYLES = {
  pending:         { pill: "bg-amber-100 text-amber-800 border-amber-200",  dot: "bg-amber-500 animate-pulse", label: "Pending" },
  confirmed:       { pill: "bg-green-100 text-green-800 border-green-200",  dot: "bg-green-500",               label: "Confirmed" },
  completed:       { pill: "bg-indigo-100 text-indigo-800 border-indigo-200", dot: "bg-indigo-500",            label: "Completed" },
  rejected:        { pill: "bg-red-100 text-red-700 border-red-200",        dot: "bg-red-500",                 label: "Rejected" },
  auto_cancelled:  { pill: "bg-slate-100 text-slate-600 border-slate-200",  dot: "bg-slate-400",              label: "Auto Cancelled" },
  PATIENT_ARRIVED: { pill: "bg-orange-100 text-orange-800 border-orange-200", dot: "bg-orange-500 animate-pulse", label: "Arrived" },
};

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/appointments/patient`);
  const { socket } = useSocket();

  const [expandedBooking, setExpandedBooking] = useState(null);
  const [viewRxBooking, setViewRxBooking]     = useState(null);
  const [filterTab, setFilterTab]             = useState("all");
  const [liveStatuses, setLiveStatuses]       = useState({});

  // Real-time socket: Doctor updates status → patient sees it instantly
  useEffect(() => {
    if (!socket) return;
    const onStatusSync = (data) => {
      const { bookingId, status, message } = data;
      toast.info(`⚡ ${message}`, { position: "top-right", autoClose: 5000 });
      setLiveStatuses(prev => ({ ...prev, [bookingId]: status }));
    };
    socket.on("STATUS_SYNC", onStatusSync);
    return () => socket.off("STATUS_SYNC", onStatusSync);
  }, [socket]);

  const allBookings = appointments || [];
  const tabs = [
    { key: "all",       label: "All",        count: allBookings.length },
    { key: "pending",   label: "Pending",    count: allBookings.filter(a => a.status === "pending").length },
    { key: "confirmed", label: "Confirmed",  count: allBookings.filter(a => a.status === "confirmed").length },
    { key: "completed", label: "Completed",  count: allBookings.filter(a => a.status === "completed").length },
  ];

  const filtered = filterTab === "all" ? allBookings : allBookings.filter(a => a.status === filterTab);

  const completedCount = allBookings.filter(a => a.status === "completed").length;
  const hasPrescription = allBookings.filter(a => a.prescriptionDetails).length;

  return (
    <section className="space-y-5">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Bookings", value: allBookings.length, icon: "📋", color: "indigo" },
          { label: "Confirmed",      value: allBookings.filter(a => a.status === "confirmed").length, icon: "✅", color: "green" },
          { label: "Completed",      value: completedCount, icon: "🏁", color: "purple" },
          { label: "e-Prescriptions", value: hasPrescription, icon: "💊", color: "emerald" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl font-black text-${s.color}-600`}>{s.value}</span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MdHealthAndSafety className="text-white text-2xl" />
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">My Health Bookings</h1>
              <p className="text-teal-200 text-xs font-medium">Real-time status • e-Prescriptions • Journey Tracker</p>
            </div>
          </div>
          <span className="bg-white/20 text-white text-xs font-black px-3 py-1.5 rounded-full">
            {allBookings.length} Total
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 px-5 pt-4 pb-0 border-b border-slate-100">
          {tabs.map(tab => (
            <button key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 ${
                filterTab === tab.key
                  ? "text-teal-700 border-teal-600 bg-teal-50"
                  : "text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-300"
              }`}>
              {tab.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${filterTab === tab.key ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="p-5 md:p-6">
          {loading && !error && <div className="py-10"><Loading /></div>}
          {error && !loading && <Error errMessage={error} />}

          {!loading && !error && (
            filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-slate-400 font-bold">No bookings in this category.</p>
                <a href="/doctors" className="mt-3 inline-block text-xs font-black text-teal-600 hover:underline">
                  Find a Doctor →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(item => {
                  const liveStatus = liveStatuses[item._id] || item.status;
                  const style = STATUS_STYLES[liveStatus] || STATUS_STYLES["pending"];
                  const hasRx = !!item.prescriptionDetails;
                  const isExpanded = expandedBooking === item._id;

                  return (
                    <div key={item._id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">

                      {/* Card Top: Doctor Info + Status */}
                      <div className="flex flex-wrap items-start gap-4 p-5">
                        {/* Doctor Photo + Info */}
                        <figure className="w-14 h-14 rounded-2xl border-2 border-white shadow-lg overflow-hidden flex-shrink-0 bg-slate-100 group-hover:scale-105 transition-transform">
                          <img
                            src={item.doctor?.photo}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.doctor?.name || "Dr")}&background=0d9488&color=fff`; }}
                          />
                        </figure>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-black text-slate-900 text-base leading-tight">
                                Dr. {item.doctor?.name}
                              </h3>
                              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-0.5">
                                {item.doctor?.specialization || "General Physician"}
                              </p>
                              {item.doctor?.hospitalName && (
                                <div className="flex items-center gap-1 mt-1">
                                  <FaMapMarkerAlt className="text-slate-400 text-[10px]" />
                                  <p className="text-[11px] text-slate-500 font-medium">{item.doctor?.hospitalName}</p>
                                </div>
                              )}
                            </div>

                            {/* Status Badge */}
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border ${style.pill}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                              {style.label}
                              {liveStatuses[item._id] && (
                                <span className="ml-1 text-[8px] bg-white/50 px-1 rounded font-bold">LIVE</span>
                              )}
                            </div>
                          </div>

                          {/* Meta Row */}
                          <div className="flex flex-wrap gap-3 mt-3 text-xs">
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${item.appointmentType === "teleconsult" ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                              {item.appointmentType === "teleconsult" ? <MdVideoCall className="text-sm" /> : "🏥"}
                              <span className="font-black">{item.appointmentType === "teleconsult" ? "Video Consultation" : "In-Person Visit"}</span>
                            </div>
                            {item.appointmentTime && (
                              <div className="flex items-center gap-1 text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                                <BsClock className="text-xs" /> {item.appointmentTime}
                              </div>
                            )}
                            <div className="flex items-center gap-1 font-black text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                              <BsPersonBadge className="text-xs" /> #{item.bookingToken}
                            </div>
                          </div>

                          {/* Doctor's message */}
                          {item.statusMessage && (
                            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-800 font-medium flex items-start gap-2">
                              <span>💬</span>
                              <p><span className="font-black">Doctor says:</span> {item.statusMessage}</p>
                            </div>
                          )}

                          {/* Smart Alert - Leave Home Now */}
                          {item.bookingMode === "Offline" && item.status !== "completed" && item.estimatedWaitTime <= 30 && item.estimatedWaitTime > 0 && (
                            <div className="mt-3 bg-orange-500 text-white rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wider animate-bounce flex items-center gap-2">
                              🏃 Smart Alert: Leave home now! Your turn is very close.
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-black text-slate-800">₹{item.ticketPrice}</div>
                          <span className={`text-[10px] font-black uppercase ${item.paymentStatus === "paid" ? "text-green-600" : "text-red-500 animate-pulse"}`}>
                            {item.paymentStatus === "paid" ? "✓ Paid" : "● Unpaid"}
                          </span>
                          <div className="text-[10px] text-slate-400 font-medium mt-1">{formatDate(item.createdAt)}</div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="px-5 pb-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                        {/* View Journey */}
                        <button
                          onClick={() => setExpandedBooking(isExpanded ? null : item._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                        >
                          <BsJournalMedical />
                          {isExpanded ? "Hide Journey" : "View Journey"}
                        </button>

                        {/* e-Prescription */}
                        {(liveStatus === "completed" || hasRx) && (
                          <button
                            onClick={() => setViewRxBooking(item)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-emerald-200 transition-all active:scale-95"
                          >
                            <FaFilePrescription /> View e-Prescription
                          </button>
                        )}

                        {/* Join Video Call */}
                        {item.appointmentType === "teleconsult" && liveStatus === "confirmed" && (
                          <button
                            onClick={() => window.open(`/tele-consult-ai?call=${item._id}`, "_blank")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-rose-200 animate-pulse transition-all active:scale-95"
                          >
                            <MdVideoCall className="text-sm" /> Join Video Call
                          </button>
                        )}

                        {/* Leave a Review */}
                        {liveStatus === "completed" && (
                          <button
                            onClick={() => toast.info("Review feature coming soon! 🌟")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                          >
                            <MdStar /> Rate Doctor
                          </button>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Verified Badge */}
                        {hasRx && (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-black bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                            <BsShieldCheck /> e-Prescription Issued
                          </div>
                        )}
                      </div>

                      {/* Journey Timeline (Expanded) */}
                      {isExpanded && (
                        <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-300">
                          <PatientJourneyTimeline journey={item.journeyTimeline} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      {/* Digital Prescription Modal (Patient View) */}
      {viewRxBooking && (
        <DigitalPrescriptionModal
          booking={viewRxBooking}
          isDoctorView={false}
          onClose={() => setViewRxBooking(null)}
        />
      )}
    </section>
  );
};

export default MyBookings;
