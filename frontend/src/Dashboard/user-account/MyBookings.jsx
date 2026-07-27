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
  BsJournalMedical, BsChatDotsFill, BsStarFill, BsStar, BsStarHalf
} from "react-icons/bs";
import { MdVideoCall, MdHealthAndSafety, MdStar, MdRateReview } from "react-icons/md";
import { FaFilePrescription, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import LiveChatDrawer from "../../components/Chat/LiveChatDrawer";
import { authContext } from "../../context/AuthContext";

const STATUS_STYLES = {
  pending:         { pill: "bg-amber-100 text-amber-800 border-amber-200",  dot: "bg-amber-500 animate-pulse", label: "Pending" },
  confirmed:       { pill: "bg-green-100 text-green-800 border-green-200",  dot: "bg-green-500",               label: "Confirmed" },
  completed:       { pill: "bg-indigo-100 text-indigo-800 border-indigo-200", dot: "bg-indigo-500",            label: "Completed" },
  rejected:        { pill: "bg-red-100 text-red-700 border-red-200",        dot: "bg-red-500",                 label: "Rejected" },
  auto_cancelled:  { pill: "bg-slate-100 text-slate-600 border-slate-200",  dot: "bg-slate-400",              label: "Auto Cancelled" },
  PATIENT_ARRIVED: { pill: "bg-orange-100 text-orange-800 border-orange-200", dot: "bg-orange-500 animate-pulse", label: "Arrived" },
};

// ─── Inline Rating Modal Component ───────────────────────────────────────────
const RatingModal = ({ doctor, doctorId, onClose }) => {
  const { token } = useContext(authContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a star rating!");
    if (!reviewText.trim()) return toast.error("Please write a review!");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const ct = res.headers.get("content-type");
      if (!ct || !ct.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
      }

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to submit review");

      setSubmitted(true);
      toast.success("⭐ Review submitted! It's now live on the doctor's profile!", { autoClose: 4000 });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-bounce-once">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <BsStarFill className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Rate Your Doctor</h3>
              <p className="text-amber-100 text-xs font-medium">Your feedback helps others</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <BsXCircleFill className="text-white text-base" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h4 className="text-xl font-black text-slate-800 mb-2">Thank You!</h4>
            <p className="text-slate-500 text-sm mb-6">Your review is now <span className="text-green-600 font-black">LIVE</span> on Dr. {doctor?.name}'s profile!</p>
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(s => (
                <BsStarFill key={s} className={`text-2xl ${s <= rating ? "text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Doctor Info */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
              <img
                src={doctor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || "Dr")}&background=f59e0b&color=fff`}
                alt=""
                className="w-12 h-12 rounded-2xl object-cover"
              />
              <div>
                <p className="font-black text-slate-800">Dr. {doctor?.name}</p>
                <p className="text-xs text-indigo-600 font-bold">{doctor?.specialization || "General Physician"}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <p className="text-sm font-black text-slate-700 mb-3">How would you rate this consultation?</p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-125 active:scale-95"
                  >
                    <BsStarFill
                      className={`text-4xl transition-colors ${
                        star <= (hover || rating) ? "text-amber-400" : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(hover || rating) > 0 && (
                <p className="text-center text-sm font-black mt-2 text-amber-600">
                  {[,"Poor","Fair","Good","Very Good","Excellent!"][hover || rating]}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <p className="text-sm font-black text-slate-700 mb-2">Share your experience</p>
              <textarea
                rows={4}
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="e.g. The doctor was very attentive and explained everything clearly..."
                className="w-full border-2 border-slate-100 focus:border-amber-400 rounded-2xl px-4 py-3 text-sm text-slate-700 outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !rating || !reviewText.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl shadow-md shadow-amber-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="animate-spin">⏳</span> Submitting...</>
              ) : (
                <><BsStarFill /> Submit Review &amp; Make it Live!</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main MyBookings Component ────────────────────────────────────────────────
const MyBookings = ({ initialSection = "bookings" }) => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/appointments/patient`);
  const { socket } = useSocket();

  const [expandedBooking, setExpandedBooking] = useState(null);
  const [viewRxBooking, setViewRxBooking]     = useState(null);
  const [activeChatDoctor, setActiveChatDoctor] = useState(null);
  const [ratingDoctor, setRatingDoctor]       = useState(null); // { doctor, doctorId }
  const [filterTab, setFilterTab]             = useState("all");
  const [liveStatuses, setLiveStatuses]       = useState({});
  const [activeSection, setActiveSection]     = useState(initialSection); // "bookings" | "rate"

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

  // Get unique doctors from ALL appointments (any status) for rating
  const uniqueDoctors = [];
  const seenDoctorIds = new Set();
  allBookings.forEach(item => {
    if (item.doctor?._id && !seenDoctorIds.has(item.doctor._id)) {
      seenDoctorIds.add(item.doctor._id);
      uniqueDoctors.push({ doctor: item.doctor, status: item.status });
    }
  });

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

      {/* ── Section Switcher ── */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveSection("bookings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
            activeSection === "bookings"
              ? "bg-teal-600 text-white shadow-md shadow-teal-200"
              : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
          }`}
        >
          <BsCalendarCheck /> My Bookings
        </button>
        <button
          onClick={() => setActiveSection("rate")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all relative ${
            activeSection === "rate"
              ? "bg-amber-500 text-white shadow-md shadow-amber-200"
              : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300"
          }`}
        >
          <BsStarFill className="text-amber-400" /> Rate My Doctors
          {uniqueDoctors.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
              {uniqueDoctors.length}
            </span>
          )}
        </button>
      </div>

      {/* ── RATE MY DOCTORS SECTION ── */}
      {activeSection === "rate" && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5 flex items-center gap-3">
            <BsStarFill className="text-white text-2xl" />
            <div>
              <h1 className="text-xl font-black text-white">Rate My Doctors</h1>
              <p className="text-amber-100 text-xs font-medium">Your rating goes LIVE instantly on their profile!</p>
            </div>
          </div>

          <div className="p-5">
            {uniqueDoctors.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">🩺</div>
                <p className="text-slate-400 font-bold">No doctors to rate yet.</p>
                <a href="/doctors" className="mt-3 inline-block text-xs font-black text-teal-600 hover:underline">
                  Find a Doctor →
                </a>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {uniqueDoctors.map(({ doctor, status }) => (
                  <div key={doctor._id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all">
                    <img
                      src={doctor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || "Dr")}&background=f59e0b&color=fff`}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-slate-800 text-sm truncate">Dr. {doctor?.name}</h3>
                      <p className="text-xs text-indigo-600 font-bold truncate">{doctor?.specialization || "General Physician"}</p>
                      <span className={`inline-block mt-1 text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                        status === "completed" ? "bg-indigo-100 text-indigo-700" :
                        status === "confirmed" ? "bg-green-100 text-green-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {status}
                      </span>
                    </div>
                    <button
                      onClick={() => setRatingDoctor({ doctor, doctorId: doctor._id })}
                      className="flex flex-col items-center gap-1 px-3 py-2.5 bg-gradient-to-b from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl shadow-md shadow-amber-200 transition-all active:scale-95 text-center flex-shrink-0"
                    >
                      <BsStarFill className="text-lg" />
                      <span className="text-[9px] font-black uppercase leading-none">Rate Now</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MY BOOKINGS SECTION ── */}
      {activeSection === "bookings" && (
        <>
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

                            {/* Chat with Doctor */}
                            <button
                              onClick={() => setActiveChatDoctor({ partner: item.doctor, bookingId: item._id })}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95"
                            >
                              <BsChatDotsFill /> Chat with Doctor
                            </button>

                            {/* Rate Doctor — available for ANY booking */}
                            <button
                              onClick={() => setRatingDoctor({ doctor: item.doctor, doctorId: item.doctor._id })}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-amber-200 transition-all active:scale-95"
                            >
                              <BsStarFill /> Rate Doctor
                            </button>

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
        </>
      )}

      {/* Digital Prescription Modal (Patient View) */}
      {viewRxBooking && (
        <DigitalPrescriptionModal
          booking={viewRxBooking}
          isDoctorView={false}
          onClose={() => setViewRxBooking(null)}
        />
      )}

      {/* Live Chat Drawer */}
      {activeChatDoctor && (
        <LiveChatDrawer
          partner={activeChatDoctor.partner}
          bookingId={activeChatDoctor.bookingId}
          onClose={() => setActiveChatDoctor(null)}
        />
      )}

      {/* Rating Modal — Full Featured */}
      {ratingDoctor && (
        <RatingModal
          doctor={ratingDoctor.doctor}
          doctorId={ratingDoctor.doctorId}
          onClose={() => setRatingDoctor(null)}
        />
      )}
    </section>
  );
};

export default MyBookings;
