import { useState, useEffect, useCallback } from "react";
import { formatDate } from "../../utils/formatDate";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useSocket } from "../../context/SocketContext";
import BookingPass from "../../components/Booking/BookingPass";
import DigitalPrescriptionModal from "../../components/Booking/DigitalPrescriptionModal";
import LiveChatDrawer from "../../components/Chat/LiveChatDrawer";
import {
  FaUserMd, FaPhone, FaCalendarCheck, FaClock, FaSyncAlt,
  FaSearch, FaFilter, FaCheckCircle, FaExclamationTriangle,
  FaPrint, FaUserCheck, FaPlayCircle, FaTimesCircle, FaTrashAlt,
  FaComments, FaPrescription, FaThList, FaThLarge, FaBullhorn,
  FaWhatsapp, FaVolumeUp, FaChevronRight
} from "react-icons/fa";
import { MdNotificationsActive, MdVideoCameraFront, MdOutlineVerified, MdPayment } from "react-icons/md";
import { BsListUl, BsCheckCircleFill, BsPersonFill, BsClockFill, BsTicketDetailedFill, BsShieldCheck, BsChatDotsFill } from "react-icons/bs";

const STATUS_CONFIG = {
  pending:              { label: "PENDING",        color: "bg-amber-100 text-amber-800 border-amber-200",     dot: "bg-amber-400" },
  REQUESTED:            { label: "REQUESTED",      color: "bg-blue-100 text-blue-800 border-blue-200",       dot: "bg-blue-400" },
  confirmed:            { label: "CONFIRMED",      color: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-400" },
  PATIENT_ARRIVED:      { label: "OPD ARRIVED",    color: "bg-purple-100 text-purple-800 border-purple-200",   dot: "bg-purple-400 animate-pulse" },
  CONSULTATION_STARTED: { label: "IN PROGRESS",    color: "bg-orange-100 text-orange-800 border-orange-200",   dot: "bg-orange-400 animate-pulse" },
  completed:            { label: "COMPLETED",      color: "bg-indigo-100 text-indigo-800 border-indigo-200",   dot: "bg-indigo-400" },
  cancelled:            { label: "CANCELLED",      color: "bg-red-100 text-red-800 border-red-200",           dot: "bg-red-400" },
  rejected:             { label: "REJECTED",       color: "bg-red-100 text-red-800 border-red-200",           dot: "bg-red-400" },
};

const HospitalAppointments = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewLayout, setViewLayout] = useState("matrix"); // 'matrix' or 'cards'
  const [actionLoading, setActionLoading] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Current token announcer state
  const [currentServingToken, setCurrentServingToken] = useState(null);

  // Modals state
  const [selectedPassBooking, setSelectedPassBooking] = useState(null);
  const [prescriptionModalBooking, setPrescriptionModalBooking] = useState(null);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  const { socket } = useSocket();

  const fetchBookings = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/token-queue`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBookings(prev => {
          const serverBookings = data.data;
          const serverIds = new Set(serverBookings.map(b => b._id));
          const localOnly = prev.filter(b => b._id && !serverIds.has(b._id));
          return [...localOnly, ...serverBookings];
        });
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

  // Real-Time Socket.io Listener — 100% Real-Time Instant Updates
  useEffect(() => {
    if (!socket) return;

    const handleNewBooking = (data) => {
      const pName = data?.patientName || data?.booking?.patientName || data?.booking?.user?.name || "Patient";
      const tokenNo = data?.booking?.tokenNumber || "SS-LIVE-101";

      toast.info(`🚨 REAL-TIME ALERT: New Appointment Received for ${pName}! Token: ${tokenNo}`, {
        position: "top-right",
        autoClose: 7000
      });

      try {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
        audio.play().catch(() => {});
      } catch (e) {
        // audio play bypass
      }

      fetchBookings();
    };

    const handleStatusSync = () => {
      fetchBookings();
    };

    socket.on("booking:new", handleNewBooking);
    socket.on("NEW_BOOKING_ALERT", handleNewBooking);
    socket.on("HOSPITAL_SYNC", handleNewBooking);
    socket.on("STATUS_SYNC", handleStatusSync);
    socket.on("QUEUE_SYNC", handleStatusSync);
    socket.on("BOOKING_UPDATE_SIGNAL", handleStatusSync);

    return () => {
      socket.off("booking:new", handleNewBooking);
      socket.off("NEW_BOOKING_ALERT", handleNewBooking);
      socket.off("HOSPITAL_SYNC", handleNewBooking);
      socket.off("STATUS_SYNC", handleStatusSync);
      socket.off("QUEUE_SYNC", handleStatusSync);
      socket.off("BOOKING_UPDATE_SIGNAL", handleStatusSync);
    };
  }, [socket, fetchBookings]);

  // Auto Refresh Every 15 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchBookings(), 15000);
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

      toast.success(`✅ ${patientName}'s status updated to ${newStatus.replace('_', ' ')}!`);
      fetchBookings();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (bookingId, patientName) => {
    if (!window.confirm(`Are you sure you want to delete ${patientName}'s appointment record?`)) return;
    setActionLoading(bookingId + "delete");
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(`🗑️ Appointment record deleted permanently`);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      toast.error(err.message || "Failed to delete appointment");
    } finally {
      setActionLoading(null);
    }
  };

  // Real-time Voice & Queue Token Callout Action
  const handleCallNextPatient = () => {
    const arrivedList = bookings.filter(b => b.status === "PATIENT_ARRIVED" || b.status === "confirmed" || b.status === "REQUESTED");
    if (arrivedList.length === 0) {
      toast.warn("No arrived patients waiting in OPD queue!");
      return;
    }

    const nextPatient = arrivedList[0];
    const tokenNo = nextPatient.tokenNumber || `SS-${nextPatient._id.slice(-4)}`;
    const pName = nextPatient.user?.name || nextPatient.patientName || "Patient";

    setCurrentServingToken({ tokenNo, patientName: pName, bookingId: nextPatient._id });

    // Voice Callout using SpeechSynthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Attention, Token number ${tokenNo}, ${pName}, please proceed to OPD Chamber Number 1.`);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    // Broadcast Real-time socket callout
    if (socket) {
      socket.emit("CALL_NEXT_PATIENT", {
        currentToken: tokenNo,
        patientName: pName,
        roomName: "OPD Consultation Chamber 1"
      });
    }

    // Automatically transition status to IN PROGRESS
    updateStatus(nextPatient._id, "CONSULTATION_STARTED", pName);
    toast.success(`📢 Token ${tokenNo} (${pName}) called to OPD Chamber!`);
  };

  // Direct WhatsApp OPD Pass Reminder Trigger (Guaranteed Working)
  const handleSendWhatsAppPass = (item) => {
    const pName = item.user?.name || item.patientName || "Patient";
    const pPhone = item.user?.phone || item.contactNumber || "";
    const tokenNo = item.tokenNumber || "SS-LIVE-101";

    if (!pPhone) {
      toast.error("Patient phone number not available!");
      return;
    }

    const cleanPhone = pPhone.replace(/[^0-9]/g, '');
    const text = `Hello ${pName}, your OPD Appointment at Sehaat Saathi Healthcare Network is confirmed!\n\n🎫 Token Number: ${tokenNo}\n📅 Date: ${item.appointmentDate || 'Today'}\n🕒 Time: ${item.appointmentTime || 'OPD Hours'}\n💳 Fee: ₹${item.ticketPrice || item.fee || 500}\n\nPlease present your digital pass at the OPD desk. Emergency Hotline: 108.`;
    
    window.open(`https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrintOPDList = () => {
    window.print();
  };

  // Filter & Sort Logic
  const filteredBookings = bookings.filter(b => {
    const patientName = b.user?.name || b.patientName || "";
    const doctorName = b.doctor?.name || "";
    const phone = b.user?.phone || b.contactNumber || "";
    const tokenNum = b.tokenNumber || "";
    const email = b.user?.email || "";

    const searchMatch =
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tokenNum.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === "all" || b.status === statusFilter;

    const typeMatch =
      typeFilter === "all" ||
      (typeFilter === "video" && (b.consultationType?.toLowerCase().includes("video") || b.bookingMode === "video")) ||
      (typeFilter === "opd" && (!b.consultationType || b.consultationType?.toLowerCase().includes("opd") || b.bookingMode === "offline"));

    return searchMatch && statusMatch && typeMatch;
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt || b.appointmentDate) - new Date(a.createdAt || a.appointmentDate);
    } else {
      return new Date(a.createdAt || a.appointmentDate) - new Date(b.createdAt || b.appointmentDate);
    }
  });

  // Metrics Summary
  const totalCount = bookings.length;
  const requestedCount = bookings.filter(b => b.status === "REQUESTED" || b.status === "pending").length;
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const arrivedCount = bookings.filter(b => b.status === "PATIENT_ARRIVED" || b.status === "CONSULTATION_STARTED").length;
  const completedCount = bookings.filter(b => b.status === "completed").length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.ticketPrice) || Number(b.fee) || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">

      {/* Control Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="z-10">
          <h2 className="text-xl md:text-3xl font-black tracking-tight flex items-center gap-3">
            <BsShieldCheck className="text-indigo-300 animate-pulse" />
            Hospital Appointment Matrix
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-black text-indigo-200">
              {filteredBookings.length}/{totalCount} Active
            </span>
          </h2>
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mt-1">
            Real-time OPD queue · Live WebSocket Stream · Patient Matrix
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap z-10">
          <div className="flex bg-white/10 border border-white/20 rounded-2xl p-1 backdrop-blur-md">
            <button
              onClick={() => setViewLayout("matrix")}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewLayout === "matrix" ? "bg-white text-indigo-950 shadow-md" : "text-white hover:bg-white/10"
              }`}
            >
              <FaThList /> Matrix Table
            </button>
            <button
              onClick={() => setViewLayout("cards")}
              className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewLayout === "cards" ? "bg-white text-indigo-950 shadow-md" : "text-white hover:bg-white/10"
              }`}
            >
              <FaThLarge /> Cards Grid
            </button>
          </div>

          <button onClick={() => { setAutoRefresh(a => !a); fetchBookings(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              autoRefresh ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40" : "bg-white/10 text-white/70 border border-white/10"
            }`}>
            <FaSyncAlt className={autoRefresh ? "animate-spin" : ""} /> {autoRefresh ? "Live Sync ON" : "Sync Paused"}
          </button>

          <button onClick={handlePrintOPDList}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-950 hover:bg-indigo-50 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
            <FaPrint /> Print Roster
          </button>
        </div>
      </div>

      {/* Real-Time Live OPD Token Announcer Console */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-4 md:p-6 rounded-3xl border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-600/30 text-purple-300 border border-purple-400/30 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 animate-bounce">
            <FaBullhorn />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-700/50">
                LIVE OPD CALLING CONSOLE
              </span>
              {currentServingToken && (
                <span className="text-[10px] font-black text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> NOW SERVING
                </span>
              )}
            </div>
            <h4 className="text-white font-black text-base md:text-lg mt-0.5 flex items-center gap-2">
              {currentServingToken ? (
                <>
                  Token <span className="text-amber-400 underline font-extrabold">{currentServingToken.tokenNo}</span> ({currentServingToken.patientName})
                </>
              ) : (
                "OPD Queue Announcer Ready · Press button to call next patient"
              )}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleCallNextPatient}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 active:scale-95"
          >
            <FaVolumeUp className="text-base" /> 📢 CALL NEXT PATIENT IN QUEUE
          </button>
        </div>
      </div>

      {/* KPI Metrics Summary Cards — Ultra High Contrast & High Visibility */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 bg-white rounded-2xl border-2 border-indigo-200 shadow-md text-center hover:border-indigo-400 transition-all">
          <p className="text-3xl font-black text-indigo-900">{totalCount}</p>
          <p className="text-[11px] font-black text-indigo-700 uppercase tracking-wider mt-1">Total Appointments</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border-2 border-blue-200 shadow-md text-center hover:border-blue-400 transition-all">
          <p className="text-3xl font-black text-blue-900">{requestedCount}</p>
          <p className="text-[11px] font-black text-blue-700 uppercase tracking-wider mt-1">Requested</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-md text-center hover:border-purple-400 transition-all">
          <p className="text-3xl font-black text-purple-900">{arrivedCount}</p>
          <p className="text-[11px] font-black text-purple-700 uppercase tracking-wider mt-1">In OPD / Arrived</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border-2 border-emerald-200 shadow-md text-center hover:border-emerald-400 transition-all">
          <p className="text-3xl font-black text-emerald-900">{completedCount}</p>
          <p className="text-[11px] font-black text-emerald-700 uppercase tracking-wider mt-1">Completed Visits</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border-2 border-amber-200 shadow-md text-center col-span-2 md:col-span-1 hover:border-amber-400 transition-all">
          <p className="text-3xl font-black text-amber-900">₹{totalRevenue}</p>
          <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider mt-1">Total OPD Value</p>
        </div>
      </div>

      {/* Quick Status Filter Pills (Mobile & Tablet Touch Friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", label: `ALL (${totalCount})` },
          { id: "REQUESTED", label: `REQUESTED (${requestedCount})` },
          { id: "confirmed", label: `CONFIRMED (${confirmedCount})` },
          { id: "PATIENT_ARRIVED", label: `ARRIVED IN OPD (${arrivedCount})` },
          { id: "completed", label: `COMPLETED (${completedCount})` },
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setStatusFilter(pill.id)}
            className={`px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
              statusFilter === pill.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name, email, phone, doctor or token number..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="all">All Booking Types</option>
            <option value="opd">In-Person OPD</option>
            <option value="video">Online Video</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Main View Area */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto text-2xl">
            🏥
          </div>
          <h3 className="font-black text-slate-800 text-lg">No Hospital Appointments Found</h3>
          <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
            Appointments booked by patients will automatically stream into this control matrix in real-time.
          </p>
        </div>
      ) : viewLayout === "matrix" ? (

        /* ================================================================= */
        /* STRUCTURED MATRIX TABLE VIEW                                     */
        /* ================================================================= */
        <div className="bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-900 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
                  <th className="py-4 px-6">PATIENT DETAILS</th>
                  <th className="py-4 px-6">ASSIGNED DOCTOR</th>
                  <th className="py-4 px-6">PAYMENT</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6">DATE & TOKEN</th>
                  <th className="py-4 px-6 text-right">MATRIX ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredBookings.map((item) => {
                  const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
                  const isDone = item.status === "completed" || item.status === "cancelled" || item.status === "rejected";
                  const isArrived = item.status === "PATIENT_ARRIVED";
                  const isInProgress = item.status === "CONSULTATION_STARTED";
                  const pName = item.user?.name || item.patientName || "Patient";
                  const pPhone = item.user?.phone || item.contactNumber || "";
                  const pEmail = item.user?.email || "";
                  const docName = item.doctor?.name || "General OPD";
                  const docSpecialty = item.doctor?.specialization || "OPD Specialist";
                  const tokenNo = item.tokenNumber || `SS-${item._id.slice(-4).toUpperCase()}`;

                  return (
                    <tr
                      key={item._id}
                      className={`hover:bg-indigo-50/40 transition-colors ${
                        isInProgress ? "bg-orange-50/50" : isArrived ? "bg-purple-50/50" : ""
                      }`}
                    >
                      {/* Patient Details Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 border border-indigo-200 shadow-sm">
                            {item.user?.photo ? (
                              <img src={item.user.photo} alt={pName} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              pName.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-black text-slate-900 text-sm truncate">{pName}</h4>
                            <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 font-medium">
                              {pPhone && (
                                <a href={`tel:${pPhone}`} className="hover:text-indigo-600 font-semibold flex items-center gap-1">
                                  📞 {pPhone}
                                </a>
                              )}
                              {pEmail && <span className="truncate max-w-[150px]">· {pEmail}</span>}
                            </div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md font-black text-[9px] uppercase tracking-wider">
                                🏥 {item.consultationType || "IN-PERSON OPD"}
                              </span>
                              {item.symptoms && (
                                <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[180px]" title={item.symptoms}>
                                  🩺 {item.symptoms}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Assigned Doctor Column */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-black text-slate-800 flex items-center gap-1.5">
                            <FaUserMd className="text-indigo-500" /> Dr. {docName}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                            {docSpecialty}
                          </p>
                        </div>
                      </td>

                      {/* Payment Column */}
                      <td className="py-4 px-6">
                        <div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            item.isPaid || item.paymentMethod === 'Online Payment'
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}>
                            • {item.isPaid ? "PAID" : "UNPAID"}
                          </span>
                          <p className="font-black text-slate-900 mt-1 text-xs">
                            ₹{item.ticketPrice || item.fee || 500}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">
                            {item.paymentMethod || "Pay at OPD"}
                          </p>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>

                      {/* Date & Token Column */}
                      <td className="py-4 px-6">
                        <div>
                          <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg font-black text-xs tracking-wide inline-block shadow-sm">
                            {tokenNo}
                          </span>
                          <p className="font-bold text-slate-700 mt-1 text-xs">
                            {item.appointmentDate || formatDate(new Date())}
                          </p>
                          {item.appointmentTime && (
                            <p className="text-[10px] font-medium text-slate-400">
                              🕒 {item.appointmentTime}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Matrix Actions Column */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">

                          {/* WhatsApp Reminder Button */}
                          <button
                            onClick={() => handleSendWhatsAppPass(item)}
                            className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95"
                            title="Send OPD Pass via WhatsApp"
                          >
                            <FaWhatsapp className="text-emerald-500" /> WA
                          </button>

                          {/* Real-time Live Chat Button */}
                          <button
                            onClick={() => {
                              setActiveChatPartner({
                                _id: item.user?._id || item.user,
                                id: item.user?._id || item.user,
                                name: pName,
                                photo: item.user?.photo,
                                role: "Patient"
                              });
                            }}
                            className="px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95"
                            title="Chat with Patient in Real-Time"
                          >
                            <BsChatDotsFill /> Chat
                          </button>

                          {/* Pass Ticket Button */}
                          <button
                            onClick={() => {
                              setSelectedPassBooking({
                                tokenNumber: tokenNo,
                                doctorName: docName,
                                doctorSpecialty: docSpecialty,
                                hospitalName: item.hospital?.hospitalName || "Registered Hospital",
                                hospitalAddress: item.hospital?.address || "OPD Clinic",
                                patientName: pName,
                                patientPhone: pPhone || "N/A",
                                appointmentDate: item.appointmentDate || formatDate(new Date()),
                                appointmentTime: item.appointmentTime || "10:00 AM",
                                fee: item.ticketPrice || item.fee || 500,
                                paymentMethod: item.paymentMethod || "Pay at Hospital",
                                isPaid: item.isPaid || false,
                                bookingMode: item.bookingMode || "offline",
                                qrCode: item.qrCode || `DATA:${item._id}|${tokenNo}`
                              });
                            }}
                            className="px-2.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white border border-sky-200 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95"
                            title="View / Print Medical Pass Ticket"
                          >
                            <BsTicketDetailedFill /> Pass
                          </button>

                          {/* Issue Rx Button */}
                          <button
                            onClick={() => setPrescriptionModalBooking(item)}
                            className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 active:scale-95"
                            title="Issue Digital Prescription / Notes"
                          >
                            <FaPrescription /> Issue Rx
                          </button>

                          {/* Status Progression Actions */}
                          {!isDone && (
                            <>
                              {(item.status === "pending" || item.status === "REQUESTED") && (
                                <button
                                  onClick={() => updateStatus(item._id, "confirmed", pName)}
                                  disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-sm active:scale-95 disabled:opacity-50"
                                >
                                  {actionLoading === item._id + "confirmed" ? "..." : "Confirm"}
                                </button>
                              )}

                              {!isArrived && !isInProgress && (
                                <button
                                  onClick={() => updateStatus(item._id, "PATIENT_ARRIVED", pName)}
                                  disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-sm active:scale-95 disabled:opacity-50"
                                >
                                  {actionLoading === item._id + "PATIENT_ARRIVED" ? "..." : "Arrived"}
                                </button>
                              )}

                              {isArrived && (
                                <button
                                  onClick={() => updateStatus(item._id, "CONSULTATION_STARTED", pName)}
                                  disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-orange-600 text-white hover:bg-orange-700 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-sm active:scale-95 disabled:opacity-50"
                                >
                                  {actionLoading === item._id + "CONSULTATION_STARTED" ? "..." : "Start OPD"}
                                </button>
                              )}

                              {(isInProgress || isArrived || item.status === "confirmed") && (
                                <button
                                  onClick={() => updateStatus(item._id, "completed", pName)}
                                  disabled={!!actionLoading}
                                  className="px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-sm active:scale-95 disabled:opacity-50"
                                >
                                  {actionLoading === item._id + "completed" ? "..." : "Complete"}
                                </button>
                              )}
                            </>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteBooking(item._id, pName)}
                            disabled={!!actionLoading}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Record"
                          >
                            <FaTrashAlt className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (

        /* ================================================================= */
        /* CARDS GRID VIEW                                                  */
        /* ================================================================= */
        <div className="space-y-4">
          {filteredBookings.map((item) => {
            const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
            const isDone = item.status === "completed" || item.status === "cancelled" || item.status === "rejected";
            const isArrived = item.status === "PATIENT_ARRIVED";
            const isInProgress = item.status === "CONSULTATION_STARTED";
            const pName = item.user?.name || item.patientName || "Patient";
            const pPhone = item.user?.phone || item.contactNumber || "";
            const tokenNo = item.tokenNumber || `#${item._id.slice(-4)}`;

            return (
              <div
                key={item._id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isInProgress ? "bg-orange-50/80 border-orange-300 shadow-lg shadow-orange-100" :
                  isArrived ? "bg-purple-50/80 border-purple-300 shadow-md shadow-purple-100" :
                  isDone ? "bg-slate-50/80 border-slate-200 opacity-80" :
                  "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {/* Patient & Doctor Details */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 font-black ${
                    isInProgress ? "bg-orange-600 text-white shadow-lg shadow-orange-200" :
                    isArrived ? "bg-purple-600 text-white shadow-lg shadow-purple-200" :
                    isDone ? "bg-slate-300 text-slate-600" :
                    "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  }`}>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-black opacity-80">Token</span>
                    <span className="text-xs sm:text-sm leading-tight truncate px-1">{tokenNo}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-black text-slate-900 text-base">{pName}</h3>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 mt-2">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <FaUserMd className="text-indigo-500" />
                        Dr. {item.doctor?.name || "General OPD"} ({item.doctor?.specialization || "OPD"})
                      </span>
                      {item.appointmentDate && (
                        <span className="flex items-center gap-1.5 font-semibold">
                          <BsClockFill className="text-slate-400" />
                          {item.appointmentDate} {item.appointmentTime && `· ${item.appointmentTime}`}
                        </span>
                      )}
                      {pPhone && (
                        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                          📞 <a href={`tel:${pPhone}`}>{pPhone}</a>
                        </span>
                      )}
                      {item.paymentMethod && (
                        <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
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

                {/* Staff Action Buttons in Cards View */}
                <div className="flex flex-wrap gap-2 flex-shrink-0 w-full md:w-auto justify-end">

                  {/* WhatsApp Reminder Button */}
                  <button
                    onClick={() => handleSendWhatsAppPass(item)}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <FaWhatsapp className="text-emerald-500" /> WA Pass
                  </button>

                  {/* Real-time Live Chat Button */}
                  <button
                    onClick={() => {
                      setActiveChatPartner({
                        _id: item.user?._id || item.user,
                        id: item.user?._id || item.user,
                        name: pName,
                        photo: item.user?.photo,
                        role: "Patient"
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <BsChatDotsFill /> Chat
                  </button>

                  {/* Pass Ticket Button */}
                  <button
                    onClick={() => {
                      setSelectedPassBooking({
                        tokenNumber: tokenNo,
                        doctorName: item.doctor?.name || "OPD Specialist",
                        doctorSpecialty: item.doctor?.specialization || "General Medicine",
                        hospitalName: item.hospital?.hospitalName || "Registered Hospital",
                        hospitalAddress: item.hospital?.address || "OPD Clinic",
                        patientName: pName,
                        patientPhone: pPhone || "N/A",
                        appointmentDate: item.appointmentDate || formatDate(new Date()),
                        appointmentTime: item.appointmentTime || "10:00 AM",
                        fee: item.ticketPrice || item.fee || 500,
                        paymentMethod: item.paymentMethod || "Pay at Hospital",
                        isPaid: item.isPaid || false,
                        bookingMode: item.bookingMode || "offline",
                        qrCode: item.qrCode || `DATA:${item._id}|${tokenNo}`
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <BsTicketDetailedFill /> Pass Ticket
                  </button>

                  {/* Issue Rx Button */}
                  <button
                    onClick={() => setPrescriptionModalBooking(item)}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <FaPrescription /> Issue Rx
                  </button>

                  {/* Status Progression Actions */}
                  {!isDone && (
                    <>
                      {!isArrived && !isInProgress && (
                        <button
                          onClick={() => updateStatus(item._id, "PATIENT_ARRIVED", pName)}
                          disabled={!!actionLoading}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-md shadow-purple-200 active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === item._id + "PATIENT_ARRIVED" ? <FaSyncAlt className="animate-spin" /> : <FaUserCheck />}
                          Arrived in OPD
                        </button>
                      )}

                      {isArrived && (
                        <button
                          onClick={() => updateStatus(item._id, "CONSULTATION_STARTED", pName)}
                          disabled={!!actionLoading}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-md shadow-orange-200 active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === item._id + "CONSULTATION_STARTED" ? <FaSyncAlt className="animate-spin" /> : <FaPlayCircle />}
                          Start OPD
                        </button>
                      )}

                      {(isInProgress || isArrived || item.status === "confirmed") && (
                        <button
                          onClick={() => updateStatus(item._id, "completed", pName)}
                          disabled={!!actionLoading}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-md shadow-green-200 active:scale-95 disabled:opacity-50"
                        >
                          {actionLoading === item._id + "completed" ? <FaSyncAlt className="animate-spin" /> : <FaCheckCircle />}
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteBooking(item._id, pName)}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-3 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Pass Modal */}
      {selectedPassBooking && (
        <BookingPass
          passDetails={selectedPassBooking}
          onClose={() => setSelectedPassBooking(null)}
        />
      )}

      {/* Digital Prescription / OPD Clinical Notes Modal */}
      {prescriptionModalBooking && (
        <DigitalPrescriptionModal
          booking={prescriptionModalBooking}
          onClose={() => setPrescriptionModalBooking(null)}
          onPrescriptionCreated={() => {
            setPrescriptionModalBooking(null);
            fetchBookings();
          }}
        />
      )}

      {/* Real-time Live Chat Drawer with Patient */}
      {activeChatPartner && (
        <LiveChatDrawer
          partner={activeChatPartner}
          bookingId={activeChatPartner._id}
          onClose={() => setActiveChatPartner(null)}
        />
      )}
    </div>
  );
};

export default HospitalAppointments;
