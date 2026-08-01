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
import SharedConsultationCanvas from "../../components/DoctorDetails/SharedConsultationCanvas";
import PatientVitalsSimulator from "../../components/Patient/PatientVitalsSimulator";
import PreConsultVitalsForm from "../../components/Patient/PreConsultVitalsForm";
import { PatientQueueTracker } from "../../components/Shared/LiveQueuePanel";

const STATUS_STYLES = {
  pending:         { pill: "bg-amber-100 text-amber-800 border-amber-200",  dot: "bg-amber-500 animate-pulse", label: "Pending" },
  confirmed:       { pill: "bg-green-100 text-green-800 border-green-200",  dot: "bg-green-500",               label: "Confirmed" },
  completed:       { pill: "bg-indigo-100 text-indigo-800 border-indigo-200", dot: "bg-indigo-500",            label: "Completed" },
  rejected:        { pill: "bg-red-100 text-red-700 border-red-200",        dot: "bg-red-500",                 label: "Rejected" },
  auto_cancelled:  { pill: "bg-slate-100 text-slate-600 border-slate-200",  dot: "bg-slate-400",              label: "Auto Cancelled" },
  PATIENT_ARRIVED: { pill: "bg-orange-100 text-orange-800 border-orange-200", dot: "bg-orange-500 animate-pulse", label: "Arrived" },
  CONSULTATION_STARTED: { pill: "bg-purple-100 text-purple-800 border-purple-200", dot: "bg-purple-500 animate-pulse", label: "In Session" },
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

// ─── Inline Breathing Relief Component ───────────────────────────────────────
const BreathingRelief = () => {
  const [phase, setPhase] = useState("Inhale");
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          setPhase(p => {
            if (p === "Inhale") return "Hold";
            if (p === "Hold") return "Exhale";
            return "Inhale";
          });
          return 4;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-white relative overflow-hidden shadow-inner w-full">
      <div className="text-[8px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-3">Neural Wait Relief</div>
      <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-[1000ms] border-2 shadow-lg ${
        phase === "Inhale" ? "scale-110 bg-indigo-500/10 border-indigo-500/40 shadow-indigo-500/10" :
        phase === "Hold" ? "scale-105 bg-amber-500/10 border-amber-500/40 shadow-amber-500/10" :
        "scale-90 bg-emerald-500/10 border-emerald-500/40 shadow-emerald-500/10"
      }`}>
        <span className="text-[10px] font-black uppercase tracking-widest">{phase}</span>
        <span className="text-xs font-bold mt-0.5">{count}s</span>
      </div>
      <p className="text-[9px] text-slate-500 font-bold text-center mt-3 leading-relaxed">Pace your breath to ease pre-clinical anxiety.</p>
    </div>
  );
};

// ─── Main MyBookings Component ────────────────────────────────────────────────
const MyBookings = ({ initialSection = "bookings" }) => {
  const { socket } = useSocket();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedBooking, setExpandedBooking] = useState(null);
  const [viewRxBooking, setViewRxBooking]     = useState(null);
  const [activeChatDoctor, setActiveChatDoctor] = useState(null);
  const [ratingDoctor, setRatingDoctor]       = useState(null); // { doctor, doctorId }
  const [filterTab, setFilterTab]             = useState("all");
  const [liveStatuses, setLiveStatuses]       = useState({});
  const [activeSection, setActiveSection]     = useState(initialSection); // "bookings" | "rate"
  const [activeCanvasBookingId, setActiveCanvasBookingId] = useState(null);
  const [servingToken, setServingToken]       = useState("");

  const [prescriptionDrafts, setPrescriptionDrafts] = useState({});
  const [activePollRequest, setActivePollRequest]   = useState(null); // bookingId
  const [pollPainLevel, setPollPainLevel]           = useState(5);
  const [pollNotes, setPollNotes]                   = useState("");

  const fetchAppointments = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/patient`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setAppointments(result.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Real-time socket: Doctor updates status → patient sees it instantly and re-fetches
  useEffect(() => {
    if (!socket) return;

    // Join prescription room for active consultations
    appointments.forEach(appt => {
      if (appt.status === "CONSULTATION_STARTED" || liveStatuses[appt._id] === "CONSULTATION_STARTED") {
        socket.emit("JOIN_PRESCRIPTION", appt._id);
      }
    });

    const onStatusSync = (data) => {
      const { bookingId, status, message } = data;
      toast.info(`⚡ ${message}`, { position: "top-right", autoClose: 5000 });
      setLiveStatuses(prev => ({ ...prev, [bookingId]: status }));
      fetchAppointments();
    };

    const onQueueSync = (data) => {
      const { currentServing } = data;
      setServingToken(currentServing);
    };

    const onDraftSync = (data) => {
      const { bookingId, draft } = data;
      setPrescriptionDrafts(prev => ({ ...prev, [bookingId]: draft }));
    };

    const onPollRequest = (data) => {
      const { bookingId } = data;
      setActivePollRequest(bookingId);
      toast.warning("🔔 Doctor is requesting a live Symptom & Pain update!");
    };

    socket.on("STATUS_SYNC", onStatusSync);
    socket.on("QUEUE_SYNC", onQueueSync);
    socket.on("PRESCRIPTION_DRAFT_SYNC", onDraftSync);
    socket.on("PATIENT_POLL_REQUEST", onPollRequest);

    return () => {
      socket.off("STATUS_SYNC", onStatusSync);
      socket.off("QUEUE_SYNC", onQueueSync);
      socket.off("PRESCRIPTION_DRAFT_SYNC", onDraftSync);
      socket.off("PATIENT_POLL_REQUEST", onPollRequest);
    };
  }, [socket, appointments, liveStatuses, fetchAppointments]);

  const submitPatientPoll = (bookingId, doctorId) => {
    if (!socket) return;
    socket.emit("SUBMIT_PATIENT_POLL", {
      bookingId,
      doctorId,
      pollData: {
        painLevel: pollPainLevel,
        notes: pollNotes
      }
    });
    setActivePollRequest(null);
    setPollNotes("");
    toast.success("Symptom details synced to doctor dashboard!");
  };

  const getQueueDistance = (patientToken, currentServing) => {
    if (!patientToken || !currentServing) return null;
    const pParts = patientToken.split("-");
    const sParts = currentServing.split("-");
    if (pParts.length < 3 || sParts.length < 3) return null;
    const pNum = parseInt(pParts[2]);
    const sNum = parseInt(sParts[2]);
    if (isNaN(pNum) || isNaN(sNum)) return null;
    return pNum - sNum;
  };

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
    <section className="space-y-4">

      {/* ── Section Switcher ── */}
      <div className="flex gap-2 px-1">
        <button
          onClick={() => setActiveSection("bookings")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
            activeSection === "bookings"
              ? "bg-teal-600 text-white shadow-md shadow-teal-200"
              : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
          }`}
        >
          <BsCalendarCheck /> My Bookings
        </button>
        <button
          onClick={() => setActiveSection("rate")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all relative ${
            activeSection === "rate"
              ? "bg-amber-500 text-white shadow-md shadow-amber-200"
              : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300"
          }`}
        >
          <BsStarFill className="text-amber-400" /> Rate Doctors
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

            {/* Filter Tabs — horizontally scrollable on mobile */}
            <div className="flex gap-1 px-4 pt-4 pb-0 border-b border-slate-100 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button key={tab.key}
                  onClick={() => setFilterTab(tab.key)}
                  className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-t-xl transition-all flex items-center gap-1 border-b-2 whitespace-nowrap flex-shrink-0 ${
                    filterTab === tab.key
                      ? "text-teal-700 border-teal-600 bg-teal-50"
                      : "text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-300"
                  }`}>
                  {tab.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${filterTab === tab.key ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-3 md:p-5">
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
                          <div className="flex items-start gap-3 p-4 md:p-5">
                            {/* Doctor Photo + Info */}
                            <figure className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-white shadow-lg overflow-hidden flex-shrink-0 bg-slate-100 group-hover:scale-105 transition-transform">
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

                              {/* Live Queue Position Tracker */}
                              {(item.status === "confirmed" || item.status === "pending" || item.status === "PATIENT_ARRIVED") && item.bookingMode === "Offline" && (
                                <div className="mt-3">
                                  <PatientQueueTracker booking={item} />
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
                          <div className="px-3 md:px-5 pb-3 md:pb-4 flex items-center gap-2 border-t border-slate-100 pt-3 overflow-x-auto scrollbar-hide">

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

                            {/* Pre-Consultation Form */}
                            {(item.status === "confirmed" || item.status === "pending") && (item.bookingMode === "offline" || item.bookingMode === "Offline") && (
                              <button
                                onClick={() => setExpandedBooking(isExpanded ? null : item._id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-violet-200 transition-all active:scale-95"
                              >
                                📋 Pre-Consult Form
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

                            {/* Whiteboard Button - Only for active consultation */}
                            {liveStatus === "CONSULTATION_STARTED" && (
                              <button
                                onClick={() => setActiveCanvasBookingId(activeCanvasBookingId === item._id ? null : item._id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-indigo-200 transition-all active:scale-95"
                              >
                                🎨 {activeCanvasBookingId === item._id ? "Close Whiteboard" : "Open Whiteboard"}
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

                          {/* Live Smart Queue HUD (Pending or Arrived or Confirmed) */}
                          {(liveStatus === "pending" || liveStatus === "confirmed" || liveStatus === "PATIENT_ARRIVED") && (
                            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 animate-in fade-in duration-300">
                              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                                {/* Queue Tracking details */}
                                <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
                                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                    <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                      Live Queue Tracker
                                    </h4>
                                    <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">
                                      Token #{item.bookingToken}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 my-2">
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-center">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Serving Token</span>
                                      <span className="text-lg font-black text-indigo-600 mt-1">
                                        {servingToken || "None yet"}
                                      </span>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-center">
                                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Estimated Wait</span>
                                      <span className="text-lg font-black text-slate-800 mt-1">
                                        {getQueueDistance(item.bookingToken, servingToken) !== null 
                                          ? `${Math.max(0, getQueueDistance(item.bookingToken, servingToken) * 12)} mins`
                                          : "-- mins"}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 text-indigo-800 text-[10px] font-bold rounded-xl flex items-center gap-2">
                                    <span>⏳</span>
                                    <span>
                                      {getQueueDistance(item.bookingToken, servingToken) !== null 
                                        ? `${Math.max(0, getQueueDistance(item.bookingToken, servingToken))} patient(s) ahead of you in the live queue.`
                                        : "Waiting for the doctor to begin serving patients."}
                                    </span>
                                  </div>
                                </div>

                                {/* Breathing relief sidebar */}
                                <div className="w-full md:w-1/3 flex items-center">
                                  <BreathingRelief />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Live Consultation Section (Vitals & Canvas) */}
                          {liveStatus === "CONSULTATION_STARTED" && (
                            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 animate-in fade-in duration-300">
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Live Vitals Streaming & Draft Preview */}
                                <div className="w-full md:w-1/3 flex flex-col gap-4">
                                  <div>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">Vitals Streamer</h4>
                                    <PatientVitalsSimulator bookingId={item._id} />
                                    <div className="mt-4">
                                      <PreConsultVitalsForm bookingId={item._id} />
                                    </div>
                                  </div>
                                  {prescriptionDrafts[item._id] && (
                                    <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-5 text-white flex flex-col gap-2 shadow-inner">
                                      <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                                        <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest">Live Prescription Draft</span>
                                      </div>
                                      <p className="text-xs font-bold text-slate-400 whitespace-pre-line leading-relaxed font-mono">
                                        {prescriptionDrafts[item._id]}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {/* Real-time Whiteboard display */}
                                <div className="flex-grow w-full">
                                  {activeCanvasBookingId === item._id ? (
                                    <SharedConsultationCanvas bookingId={item._id} isDoctor={false} />
                                  ) : (
                                    <div className="bg-slate-100 border border-slate-200 rounded-[2rem] p-8 text-center text-slate-400 font-bold text-xs flex flex-col items-center justify-center min-h-[220px]">
                                      <span className="text-3xl mb-2">🎨</span>
                                      <p className="max-w-xs">Use the interactive shared whiteboard to view doctor's diagnostic canvas drawings in real-time.</p>
                                      <button
                                        onClick={() => setActiveCanvasBookingId(item._id)}
                                        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95"
                                      >
                                        Launch Canvas
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Active Live Poll Request Overlay */}
                          {activePollRequest === item._id && (
                            <div className="border-t border-slate-100 bg-amber-50/50 px-6 py-5 animate-in fade-in duration-300">
                              <div className="bg-white border border-amber-200 rounded-[2rem] p-6 shadow-md max-w-md mx-auto flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                  <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider flex items-center gap-1.5">
                                    🔔 Symptom Update Request
                                  </h4>
                                  <button onClick={() => setActivePollRequest(null)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-wider mb-2">
                                      <span>Primary Pain Intensity</span>
                                      <span className="text-amber-600 font-black">{pollPainLevel} / 10</span>
                                    </div>
                                    <input 
                                      type="range" min="1" max="10" 
                                      value={pollPainLevel} 
                                      onChange={e => setPollPainLevel(parseInt(e.target.value))}
                                      className="w-full accent-amber-500 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-2 block">Quick Symptom Note</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. sharp lower back pain, feeling better..."
                                      value={pollNotes}
                                      onChange={e => setPollNotes(e.target.value)}
                                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-amber-500 bg-slate-50 text-slate-700 font-bold"
                                    />
                                  </div>
                                  <button
                                    onClick={() => submitPatientPoll(item._id, item.doctor?._id || item.doctor)}
                                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black uppercase text-[10px] tracking-wider rounded-xl transition-all active:scale-95 shadow-md shadow-amber-200"
                                  >
                                    Submit Symptom Sync
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Journey Timeline & Forms (Expanded) */}
                          {isExpanded && (
                            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-300">
                              
                              {/* Live Pre-Consult Vitals Broadcaster (Only if pending/confirmed offline) */}
                              {(item.status === "pending" || item.status === "confirmed") && (item.bookingMode === "offline" || item.bookingMode === "Offline") && (
                                <div className="mb-6">
                                  <PreConsultVitalsForm booking={item} bookingId={item._id} />
                                </div>
                              )}

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
