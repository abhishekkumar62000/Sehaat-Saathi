import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import {
  BsCalendarCheck,
  BsCurrencyRupee,
  BsStarFill,
  BsClockHistory,
  BsPeopleFill,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsHourglassSplit,
  BsCameraVideoFill,
  BsBuilding,
  BsDisplay
} from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import { DoctorQueueController } from "../Shared/LiveQueuePanel";
import EmergencyDelayManager from "../Shared/EmergencyDelayManager";

const computeFallbackAnalytics = (doctor) => {
  const appts = doctor?.appointments || [];
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const total = appts.length;
  const todayAppts = appts.filter(a => new Date(a.createdAt || a.date) >= startOfToday);
  const weekAppts  = appts.filter(a => new Date(a.createdAt || a.date) >= startOfWeek);
  const monthAppts = appts.filter(a => new Date(a.createdAt || a.date) >= startOfMonth);

  const pending   = appts.filter(a => a.status === "pending").length;
  const confirmed = appts.filter(a => a.status === "confirmed").length;
  const completed = appts.filter(a => a.status === "completed").length;
  const cancelled = appts.filter(a => a.status === "cancelled" || a.status === "rejected").length;

  const calcEarnings = (list) =>
    list
      .filter(a => a.status === "completed" && a.paymentStatus === "paid")
      .reduce((sum, a) => sum + (a.ticketPrice || 0), 0);

  const earningsToday   = calcEarnings(todayAppts);
  const earningsWeek    = calcEarnings(weekAppts);
  const earningsMonth   = calcEarnings(monthAppts);
  const earningsTotal   = calcEarnings(appts);
  const pendingRevenue  = appts
    .filter(a => a.status === "completed" && a.paymentStatus !== "paid")
    .reduce((sum, a) => sum + (a.ticketPrice || 0), 0);

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd   = new Date(dayStart.getTime() + 86400000);
    const count = appts.filter(a => {
      const t = new Date(a.createdAt || a.date);
      return t >= dayStart && t < dayEnd;
    }).length;
    const earnings = calcEarnings(
      appts.filter(a => {
        const t = new Date(a.createdAt || a.date);
        return t >= dayStart && t < dayEnd;
      })
    );
    last7Days.push({
      label: d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
      count,
      earnings,
    });
  }

  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const mDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mEnd  = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const count = appts.filter(a => {
      const t = new Date(a.createdAt || a.date);
      return t >= mDate && t < mEnd;
    }).length;
    const earnings = calcEarnings(
      appts.filter(a => {
        const t = new Date(a.createdAt || a.date);
        return t >= mDate && t < mEnd;
      })
    );
    last6Months.push({
      label: mDate.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      count,
      earnings,
    });
  }

  const hourBuckets = Array(24).fill(0);
  appts.forEach(a => {
    if (a.timeSlot) {
      const match = a.timeSlot.match(/(\d{1,2})[:h](\d{2})?\s*(AM|PM)?/i);
      if (match) {
        let hour = parseInt(match[1]);
        const meridiem = match[3];
        if (meridiem?.toUpperCase() === "PM" && hour !== 12) hour += 12;
        if (meridiem?.toUpperCase() === "AM" && hour === 12) hour = 0;
        if (hour >= 0 && hour < 24) hourBuckets[hour]++;
      }
    } else if (a.createdAt || a.date) {
      const h = new Date(a.createdAt || a.date).getHours();
      hourBuckets[h]++;
    }
  });

  const peakHours = hourBuckets.map((count, hour) => ({
    hour,
    label: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour < 12 ? "am" : "pm"}`,
    count,
  }));

  const offline     = appts.filter(a => a.appointmentType !== "teleconsult").length;
  const teleconsult = appts.filter(a => a.appointmentType === "teleconsult").length;

  const statusDist = [
    { status: "Completed", count: completed, color: "#6366f1" },
    { status: "Pending",   count: pending,   color: "#f59e0b" },
    { status: "Confirmed", count: confirmed, color: "#10b981" },
    { status: "Cancelled", count: cancelled, color: "#ef4444" },
  ];

  return {
    total, todayCount: todayAppts.length, weekCount: weekAppts.length, monthCount: monthAppts.length,
    pending, confirmed, completed, cancelled,
    earningsToday, earningsWeek, earningsMonth, earningsTotal, pendingRevenue,
    last7Days, last6Months, peakHours,
    statusDist, offline, teleconsult,
    avgRating: doctor?.averageRating || 0,
    totalReviews: doctor?.totalRating || 0,
    ratingBreakdown: { 5: doctor?.totalRating || 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    uniquePatients: new Set(appts.map(a => a.patient?.toString() || a.user?.toString())).size,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};

const DoctorAnalyticsOverview = ({ doctorData }) => {
  const { token } = useContext(authContext);
  const [analytics, setAnalytics] = useState(() => computeFallbackAnalytics(doctorData));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("week"); // 'today' | 'week' | 'month' | 'all'

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${BASE_URL}/analytics/doctor`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const result = await res.json();
          if (result.success && result.data) {
            setAnalytics(result.data);
            return;
          }
        }
        setAnalytics(computeFallbackAnalytics(doctorData));
      } catch (err) {
        console.warn("Analytics API fallback activated:", err);
        setAnalytics(computeFallbackAnalytics(doctorData));
      }
    };

    fetchAnalytics();
  }, [token, doctorData]);

  if (loading) return <div className="py-12"><Loading /></div>;
  if (error) return <div className="py-6"><Error errMessage={error} /></div>;
  if (!analytics) return null;

  // Selected timeframe values
  const getSelectedCount = () => {
    if (timeframe === "today") return analytics.todayCount;
    if (timeframe === "week") return analytics.weekCount;
    if (timeframe === "month") return analytics.monthCount;
    return analytics.total;
  };

  const getSelectedEarnings = () => {
    if (timeframe === "today") return analytics.earningsToday;
    if (timeframe === "week") return analytics.earningsWeek;
    if (timeframe === "month") return analytics.earningsMonth;
    return analytics.earningsTotal;
  };

  // Max peak count for relative bar scaling
  const maxPeak = Math.max(...analytics.peakHours.map(p => p.count), 1);
  const max7Days = Math.max(...analytics.last7Days.map(d => d.count), 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ── NEW: Live Queue Panel + Emergency Alert ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DoctorQueueController
            appointments={doctorData?.appointments || []}
            doctorId={doctorData?._id}
          />
        </div>
        <div className="space-y-3">
          <EmergencyDelayManager
            appointments={doctorData?.appointments || []}
            doctorId={doctorData?._id}
          />
          {doctorData?._id && (
            <a
              href={`/opd-lobby/${doctorData._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-2xl px-4 py-3 text-sm font-black transition-all"
            >
              <BsDisplay className="text-indigo-400" />
              <span className="flex-grow text-left">Open Lobby Screen</span>
              <span className="text-[9px] text-slate-400">For Clinic TV</span>
            </a>
          )}
        </div>
      </div>
      {/* --- TOP BANNER / HEADER --- */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <figure className="w-16 h-16 rounded-2xl border-2 border-indigo-400/40 shadow-lg overflow-hidden bg-indigo-950 flex-shrink-0">
              <img
                src={doctorData?.photo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(doctorData?.name || "Dr") + "&background=6366f1&color=fff"}
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">Dr. {doctorData?.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Live Analytics
                </span>
              </div>
              <p className="text-indigo-200 text-xs mt-0.5">
                {doctorData?.specialization || "Medical Specialist"} • Real-Time Practice Intelligence
              </p>
            </div>
          </div>

          {/* Timeframe Selector Pills */}
          <div className="flex items-center bg-indigo-950/80 p-1 rounded-2xl border border-indigo-700/50 text-xs font-bold">
            {[
              { id: "today", label: "Today" },
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
              { id: "all", label: "All Time" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  timeframe === t.id
                    ? "bg-indigo-600 text-white shadow-md font-black"
                    : "text-indigo-300 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- KPI METRIC CARDS (GRID OF 4) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Appointments Count */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {timeframe.toUpperCase()} BOOKINGS
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg">
              <BsCalendarCheck />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{getSelectedCount()}</span>
            <span className="text-xs font-bold text-slate-400">sessions</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Total Lifetime: <strong className="text-slate-700">{analytics.total}</strong></span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              <BsArrowUpRight /> {analytics.completionRate}% Done
            </span>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              REVENUE ({timeframe.toUpperCase()})
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
              <BsCurrencyRupee />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-emerald-600">₹{getSelectedEarnings().toLocaleString("en-IN")}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Pending Unpaid: <strong className="text-amber-600">₹{analytics.pendingRevenue}</strong></span>
            <span className="text-emerald-600 font-bold">Total: ₹{analytics.earningsTotal}</span>
          </div>
        </div>

        {/* Card 3: Patient Satisfaction */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              PATIENT SATISFACTION
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-black text-lg">
              <BsStarFill />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{analytics.avgRating || doctorData?.averageRating || 5.0}</span>
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <BsStarFill key={i} className={i < Math.floor(analytics.avgRating || doctorData?.averageRating || 5) ? "text-amber-400" : "text-slate-200"} />
              ))}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Based on <strong className="text-slate-700">{analytics.totalReviews}</strong> reviews</span>
            <span className="text-amber-600 font-bold">Top Rated</span>
          </div>
        </div>

        {/* Card 4: Unique Patients */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              TOTAL PATIENTS
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-lg">
              <BsPeopleFill />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{analytics.uniquePatients}</span>
            <span className="text-xs font-bold text-slate-400">individuals</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Completion Rate: <strong className="text-indigo-600">{analytics.completionRate}%</strong></span>
            <span className="text-purple-600 font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* --- CHARTS ROW: 7-DAY TREND + PEAK CONSULTATION HOURS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Last 7 Days Appointment Volume */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-base">7-Day Consultation Activity</h3>
              <p className="text-xs text-slate-400 font-medium">Daily bookings over the past week</p>
            </div>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
              {analytics.weekCount} Bookings
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-100">
            {analytics.last7Days.map((d, i) => {
              const heightPercent = max7Days > 0 ? (d.count / max7Days) * 100 : 0;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none mb-1 text-center whitespace-nowrap shadow-lg">
                    {d.count} Appts • ₹{d.earnings}
                  </div>
                  
                  {/* Bar */}
                  <div className="w-full max-w-[28px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${Math.max(heightPercent, 8)}%` }}
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        d.count > 0 ? "bg-gradient-to-t from-indigo-600 to-violet-500 group-hover:from-indigo-500 group-hover:to-purple-400" : "bg-slate-200"
                      }`}
                    />
                  </div>

                  {/* Day Label */}
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {d.label.split(",")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-indigo-600" />
              <span className="font-semibold text-slate-700">Completed & Scheduled Visits</span>
            </div>
            <span className="font-bold text-slate-600">Peak: {max7Days} / day</span>
          </div>
        </div>

        {/* Chart 2: Peak Consultation Hours Heatmap */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <BsClockHistory className="text-amber-500" /> Peak Consultation Hours
              </h3>
              <p className="text-xs text-slate-400 font-medium">Hourly distribution of patient appointments</p>
            </div>
            <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100">
              Heatmap
            </span>
          </div>

          {/* Hourly Heat Grid (8am to 8pm focus) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
            {analytics.peakHours
              .filter(p => p.hour >= 8 && p.hour <= 20) // 8 AM to 8 PM
              .map((p) => {
                const intensity = maxPeak > 0 ? p.count / maxPeak : 0;
                let bgClass = "bg-slate-50 text-slate-400 border-slate-100";
                if (intensity > 0.6) bgClass = "bg-indigo-600 text-white border-indigo-700 font-black shadow-md shadow-indigo-200";
                else if (intensity > 0.3) bgClass = "bg-indigo-100 text-indigo-800 border-indigo-200 font-bold";
                else if (intensity > 0) bgClass = "bg-indigo-50 text-indigo-600 border-indigo-100 font-semibold";

                return (
                  <div
                    key={p.hour}
                    className={`p-2.5 rounded-2xl border text-center transition-all hover:scale-105 ${bgClass}`}
                  >
                    <div className="text-[10px] uppercase font-bold tracking-tighter opacity-80">{p.label}</div>
                    <div className="text-sm mt-0.5">{p.count}</div>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
            <span className="italic text-[11px]">Highlights your busiest consultation hours</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">Low</span>
              <span className="px-1.5 py-0.5 bg-indigo-100 rounded text-indigo-700">Medium</span>
              <span className="px-1.5 py-0.5 bg-indigo-600 rounded text-white">Peak</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- BREAKDOWN ROW: APPOINTMENT STATUS & CONSULTATION MODES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Status Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3 md:col-span-2">
          <h3 className="font-black text-slate-900 text-base">Booking Status Distribution</h3>
          
          <div className="space-y-3 pt-2">
            {[
              { label: "Completed", count: analytics.completed, color: "bg-indigo-600", text: "text-indigo-600", icon: <BsCheckCircleFill className="text-indigo-600" /> },
              { label: "Confirmed", count: analytics.confirmed, color: "bg-emerald-500", text: "text-emerald-600", icon: <BsCheckCircleFill className="text-emerald-500" /> },
              { label: "Pending", count: analytics.pending, color: "bg-amber-500", text: "text-amber-600", icon: <BsHourglassSplit className="text-amber-500" /> },
              { label: "Cancelled", count: analytics.cancelled, color: "bg-rose-500", text: "text-rose-600", icon: <BsClockHistory className="text-rose-500" /> },
            ].map(item => {
              const pct = analytics.total > 0 ? Math.round((item.count / analytics.total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      {item.icon} {item.label}
                    </span>
                    <span className="text-slate-500">
                      {item.count} <span className="text-[10px] text-slate-400 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consultation Mode Split */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="font-black text-slate-900 text-base">Consultation Mode</h3>

          <div className="grid grid-cols-2 gap-3 my-auto">
            {/* Teleconsult */}
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-lg mb-2">
                <BsCameraVideoFill />
              </div>
              <div className="text-2xl font-black text-rose-900">{analytics.teleconsult}</div>
              <div className="text-[10px] font-bold uppercase text-rose-600 tracking-wider mt-0.5">Video Call</div>
            </div>

            {/* Offline */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-lg mb-2">
                <BsBuilding />
              </div>
              <div className="text-2xl font-black text-blue-900">{analytics.offline}</div>
              <div className="text-[10px] font-bold uppercase text-blue-600 tracking-wider mt-0.5">In-Person</div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-50">
            {analytics.teleconsult > analytics.offline
              ? "⚡ Teleconsultation is your primary consultation mode."
              : "🏥 Physical clinic visits form the majority of bookings."}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorAnalyticsOverview;
