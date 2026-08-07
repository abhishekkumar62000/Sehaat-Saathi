import { useState, useMemo } from "react";
import {
  FaRupeeSign, FaCalendarAlt, FaClock, FaChartLine,
  FaUserCheck, FaPrint, FaArrowUp, FaArrowDown,
  FaFileInvoiceDollar, FaSyncAlt, FaUsers
} from "react-icons/fa";
import { MdTrendingUp, MdAccountBalanceWallet, MdPaid } from "react-icons/md";
import { BsCheckCircleFill, BsShieldCheck } from "react-icons/bs";

const HospitalRevenue = ({ hospitalData }) => {
  const [activeTab, setActiveTab] = useState("earnings"); // 'earnings' | 'visits'

  const bookings = useMemo(() => hospitalData?.bookings || [], [hospitalData]);
  const defaultFee = hospitalData?.consultationFee || 500;

  // Real-time dynamic financial calculations
  const analytics = useMemo(() => {
    let totalEarnedAllTime = 0;
    let paidConsultationsCount = 0;

    let thisMonthEarned = 0;
    let lastMonthEarned = 0;

    let pendingUnpaidRevenue = 0;
    let pendingUnpaidCount = 0;

    let expectedRevenue = 0;
    let confirmedCount = 0;

    let paidSessionsCount = 0;
    let unpaidSessionsCount = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonthObj = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthObj.getMonth();
    const lastMonthYear = lastMonthObj.getFullYear();

    // Map for 6-month trend chart
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const sixMonthsTrend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      sixMonthsTrend.push({
        monthName: `${monthNames[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`,
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        earnings: 0,
        visits: 0
      });
    }

    // Patient spend leaderboard map
    const patientMap = {};

    bookings.forEach(b => {
      const fee = Number(b.ticketPrice || b.amount || defaultFee) || 500;
      const bDate = b.createdAt ? new Date(b.createdAt) : (b.appointmentDate ? new Date(b.appointmentDate) : new Date());
      const bMonth = bDate.getMonth();
      const bYear = bDate.getFullYear();

      const isCompleted = b.status === "completed";
      const isConfirmed = b.status === "confirmed" || b.status === "PATIENT_ARRIVED" || b.status === "CONSULTATION_STARTED";
      const isCancelled = b.status === "cancelled" || b.status === "rejected";
      const isPaid = b.isPaid === true || b.paymentMethod === "Online Payment";

      if (!isCancelled) {
        // Top patients spend calculation
        const patientId = b.user?._id || b.user?.email || b.patientName || "Anonymous";
        const patientName = b.user?.name || b.patientName || "Patient";
        const patientPhoto = b.user?.photo;

        if (!patientMap[patientId]) {
          patientMap[patientId] = { name: patientName, photo: patientPhoto, visits: 0, totalSpend: 0 };
        }
        patientMap[patientId].visits += 1;

        if (isPaid || isCompleted) {
          patientMap[patientId].totalSpend += fee;
        }

        // All Time Earned (Completed & Paid)
        if (isCompleted || isPaid) {
          totalEarnedAllTime += fee;
          paidConsultationsCount += 1;
          paidSessionsCount += 1;
        } else if (isCompleted && !isPaid) {
          pendingUnpaidRevenue += fee;
          pendingUnpaidCount += 1;
          unpaidSessionsCount += 1;
        }

        // Expected Revenue from upcoming confirmed appointments
        if (isConfirmed && !isCompleted) {
          expectedRevenue += fee;
          confirmedCount += 1;
        }

        // Monthly breakdown
        if (bMonth === currentMonth && bYear === currentYear) {
          if (isCompleted || isPaid) thisMonthEarned += fee;
        } else if (bMonth === lastMonth && bYear === lastMonthYear) {
          if (isCompleted || isPaid) lastMonthEarned += fee;
        }

        // Populate 6-month trend array
        const monthItem = sixMonthsTrend.find(m => m.monthIndex === bMonth && m.year === bYear);
        if (monthItem) {
          monthItem.visits += 1;
          if (isCompleted || isPaid) {
            monthItem.earnings += fee;
          }
        }
      }
    });

    // Month over month growth %
    let momGrowth = 0;
    if (lastMonthEarned > 0) {
      momGrowth = Math.round(((thisMonthEarned - lastMonthEarned) / lastMonthEarned) * 100);
    } else if (thisMonthEarned > 0) {
      momGrowth = 100;
    }

    // Top Patients List sorted by spend
    const topPatients = Object.values(patientMap)
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, 5);

    // Collection Rate
    const totalActiveBookings = bookings.filter(b => b.status !== "cancelled" && b.status !== "rejected").length;
    const collectionRate = totalActiveBookings > 0 ? Math.round((paidSessionsCount / totalActiveBookings) * 100) : 100;

    // Average Fee Per Visit
    const avgFeePerVisit = paidSessionsCount > 0 ? Math.round(totalEarnedAllTime / paidSessionsCount) : defaultFee;

    // Max earnings value for scaling chart bars
    const maxEarningsInTrend = Math.max(...sixMonthsTrend.map(m => m.earnings), 1);

    return {
      totalEarnedAllTime,
      paidConsultationsCount,
      thisMonthEarned,
      lastMonthEarned,
      momGrowth,
      pendingUnpaidRevenue,
      pendingUnpaidCount,
      expectedRevenue,
      confirmedCount,
      paidSessionsCount,
      unpaidSessionsCount,
      sixMonthsTrend,
      maxEarningsInTrend,
      topPatients,
      collectionRate,
      avgFeePerVisit,
    };
  }, [bookings, defaultFee]);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-950 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-300 text-xl border border-white/10">
              <FaRupeeSign />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Revenue & Earnings Intelligence</h2>
              <p className="text-xs text-emerald-200 font-medium">Complete financial overview of your medical practice</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-2xl flex items-center gap-2 text-xs font-black text-emerald-300">
            <MdTrendingUp className="text-emerald-400 w-4 h-4" />
            <span>{analytics.momGrowth >= 0 ? `+${analytics.momGrowth}%` : `${analytics.momGrowth}%`} vs last month</span>
          </div>

          <button onClick={() => window.print()}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2">
            <FaPrint /> Print Report
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Earned (All Time) */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">TOTAL EARNED (ALL TIME)</span>
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">
                ₹
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{analytics.totalEarnedAllTime.toLocaleString("en-IN")}</p>
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-3 flex items-center gap-1">
            ↗ {analytics.paidConsultationsCount} paid consultations
          </p>
        </div>

        {/* This Month */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">THIS MONTH</span>
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
                <FaCalendarAlt className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900">₹{analytics.thisMonthEarned.toLocaleString("en-IN")}</p>
          </div>
          <p className="text-[11px] font-semibold text-blue-600 mt-3 flex items-center gap-1">
            ↗ {analytics.momGrowth >= 0 ? `+${analytics.momGrowth}%` : `${analytics.momGrowth}%`} vs last month
          </p>
        </div>

        {/* Pending / Unpaid */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PENDING / UNPAID</span>
              <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-black">
                <FaClock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-600">₹{analytics.pendingUnpaidRevenue.toLocaleString("en-IN")}</p>
          </div>
          <p className="text-[11px] font-semibold text-amber-600 mt-3">
            {analytics.pendingUnpaidCount} completed but unpaid
          </p>
        </div>

        {/* Expected Revenue */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">EXPECTED REVENUE</span>
              <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-black">
                <FaChartLine className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-purple-700">₹{analytics.expectedRevenue.toLocaleString("en-IN")}</p>
          </div>
          <p className="text-[11px] font-semibold text-purple-600 mt-3">
            From {analytics.confirmedCount} confirmed appointments
          </p>
        </div>

      </div>

      {/* Main Section: 6-Month Revenue Trend + Top Patients Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 6-Month Revenue Trend Chart */}
        <div className="lg:col-span-2 p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">6-Month Revenue Trend</h3>
                <p className="text-xs text-gray-400 font-medium">Monthly earnings from completed consultations</p>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button onClick={() => setActiveTab("earnings")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeTab === "earnings" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500"
                  }`}>
                  ₹ Earnings
                </button>
                <button onClick={() => setActiveTab("visits")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                    activeTab === "visits" ? "bg-white text-indigo-700 shadow-sm" : "text-gray-500"
                  }`}>
                  # Visits
                </button>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-gray-100">
              {analytics.sixMonthsTrend.map((m, idx) => {
                const heightPercent = activeTab === "earnings"
                  ? (m.earnings > 0 ? Math.max(15, Math.round((m.earnings / analytics.maxEarningsInTrend) * 100)) : 4)
                  : (m.visits > 0 ? Math.min(100, m.visits * 20) : 4);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-black text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {activeTab === "earnings" ? `₹${m.earnings}` : `${m.visits} visits`}
                    </span>
                    <div className="w-full bg-emerald-100 group-hover:bg-emerald-500 rounded-t-xl transition-all duration-500"
                      style={{ height: `${heightPercent}%` }} />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.monthName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
              <p className="text-xl font-black text-emerald-600">{analytics.paidSessionsCount}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Paid Sessions</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
              <p className="text-xl font-black text-amber-600">{analytics.unpaidSessionsCount}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Unpaid Sessions</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl text-center border border-gray-100">
              <p className="text-xl font-black text-gray-900">₹{analytics.totalEarnedAllTime.toLocaleString("en-IN")}</p>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Year Total</p>
            </div>
          </div>
        </div>

        {/* Top Patients Sidebar */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaUsers className="text-emerald-600" />
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Top Patients</h3>
            </div>
            <p className="text-xs text-gray-400 font-medium mb-4">By total consultation spend</p>

            {analytics.topPatients.length === 0 ? (
              <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-gray-200/60 rounded-full flex items-center justify-center text-gray-400 text-xl mx-auto mb-3">
                  <FaUsers />
                </div>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">
                  Patient spending data will appear after completed sessions
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.topPatients.map((p, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-xl font-black flex items-center justify-center text-xs overflow-hidden">
                        {p.photo ? <img src={p.photo} alt="" className="w-full h-full object-cover" /> : p.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-xs truncate max-w-[110px]">{p.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{p.visits} Visits</p>
                      </div>
                    </div>
                    <span className="font-black text-emerald-700 text-xs">₹{p.totalSpend}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-center">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
              Live Patient Spend Tracker Active
            </span>
          </div>
        </div>

      </div>

      {/* Revenue Health Summary (Bottom 3 Cards) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Revenue Health Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Collection Rate */}
          <div className="p-6 bg-emerald-50/70 border border-emerald-100 rounded-3xl">
            <p className="text-3xl font-black text-emerald-700">{analytics.collectionRate}%</p>
            <p className="text-xs font-black text-gray-800 uppercase tracking-wider mt-1">Collection Rate</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Of completed sessions collected</p>
          </div>

          {/* Avg. Fee Per Visit */}
          <div className="p-6 bg-blue-50/70 border border-blue-100 rounded-3xl">
            <p className="text-3xl font-black text-blue-700">₹{analytics.avgFeePerVisit}</p>
            <p className="text-xs font-black text-gray-800 uppercase tracking-wider mt-1">Avg. Fee Per Visit</p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Average ticket price realized</p>
          </div>

          {/* Recovery Opportunity */}
          <div className="p-6 bg-amber-50/70 border border-amber-100 rounded-3xl">
            <p className="text-3xl font-black text-amber-700">₹{analytics.pendingUnpaidRevenue}</p>
            <p className="text-xs font-black text-gray-800 uppercase tracking-wider mt-1">Recovery Opportunity</p>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Unpaid revenue to follow up</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HospitalRevenue;
