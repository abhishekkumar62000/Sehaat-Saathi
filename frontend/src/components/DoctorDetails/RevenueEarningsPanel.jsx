import React, { useState, useContext, useEffect } from "react";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import {
  BsCurrencyRupee, BsArrowUpRight, BsArrowDownRight,
  BsPeopleFill, BsCalendarCheck, BsClockHistory,
  BsGraphUp, BsStarFill, BsCheckCircleFill
} from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import Loading from "../../components/Shared/Loading";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueEarningsPanel = ({ doctorData }) => {
  const { token } = useContext(authContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("earnings"); // 'earnings' | 'appointments'

  /* ── Compute all revenue stats from doctorData.appointments fallback ── */
  const computeRevenue = (appts = []) => {
    const now = new Date();
    const startOfMonth  = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLast   = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLast     = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const startOfYear   = new Date(now.getFullYear(), 0, 1);

    const paid    = appts.filter(a => a.status === "completed" && a.paymentStatus === "paid");
    const unpaid  = appts.filter(a => a.status === "completed" && a.paymentStatus !== "paid");
    const pending = appts.filter(a => a.status === "pending" || a.status === "confirmed");

    const sum = (list) => list.reduce((s, a) => s + (a.ticketPrice || 0), 0);

    const thisMonthPaid = paid.filter(a => new Date(a.createdAt || a.date) >= startOfMonth);
    const lastMonthPaid = paid.filter(a => {
      const d = new Date(a.createdAt || a.date);
      return d >= startOfLast && d <= endOfLast;
    });
    const thisYearPaid  = paid.filter(a => new Date(a.createdAt || a.date) >= startOfYear);

    const totalEarned   = sum(paid);
    const monthEarned   = sum(thisMonthPaid);
    const lastMonthE    = sum(lastMonthPaid);
    const yearEarned    = sum(thisYearPaid);
    const pendingRevenue= sum(unpaid);
    const expectedRevenue = sum(pending);

    const growthPct = lastMonthE > 0
      ? Math.round(((monthEarned - lastMonthE) / lastMonthE) * 100)
      : monthEarned > 0 ? 100 : 0;

    // 6-month chart
    const months6 = [];
    for (let i = 5; i >= 0; i--) {
      const ms = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const me = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const mPaid = paid.filter(a => {
        const d = new Date(a.createdAt || a.date);
        return d >= ms && d < me;
      });
      months6.push({
        label: ms.toLocaleDateString("en-IN", { month: "short" }),
        earnings: sum(mPaid),
        count: mPaid.length,
      });
    }

    // Top patients by spend
    const patientMap = {};
    paid.forEach(a => {
      const id = a.patient?._id || a.patient || a.user?._id || a.user;
      const name = a.patient?.name || a.patientName || a.user?.name || "Patient";
      const photo = a.patient?.photo || a.user?.photo || "";
      if (id) {
        if (!patientMap[id]) patientMap[id] = { name, photo, total: 0, visits: 0 };
        patientMap[id].total += (a.ticketPrice || 0);
        patientMap[id].visits++;
      }
    });
    const topPatients = Object.values(patientMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return {
      totalEarned, monthEarned, lastMonthE, yearEarned,
      pendingRevenue, expectedRevenue, growthPct,
      paidCount: paid.length, unpaidCount: unpaid.length,
      months6, topPatients,
    };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${BASE_URL}/analytics/doctor`, {
          headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
        });
        const ct = res.headers.get("content-type");
        if (res.ok && ct?.includes("application/json")) {
          const result = await res.json();
          if (result.success && result.data) {
            setAnalytics(result.data);
            return;
          }
        }
      } catch (_) {}
      setAnalytics(computeRevenue(doctorData?.appointments || []));
    };
    fetchAnalytics().finally(() => setLoading(false));
  }, [token, doctorData]);

  const stats = analytics
    ? (analytics.earningsTotal !== undefined
        ? {
            totalEarned:     analytics.earningsTotal,
            monthEarned:     analytics.earningsMonth,
            yearEarned:      analytics.earningsMonth * 12,
            pendingRevenue:  analytics.pendingRevenue,
            expectedRevenue: 0,
            growthPct:       0,
            paidCount:       analytics.completed,
            unpaidCount:     0,
            months6:         analytics.last6Months?.map(m => ({ label: m.label, earnings: m.earnings, count: m.count })) || [],
            topPatients:     [],
          }
        : analytics)
    : computeRevenue(doctorData?.appointments || []);

  if (loading) return <div className="py-10"><Loading /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-teal-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-xl font-black flex items-center gap-2">
              <FaMoneyBillWave className="text-emerald-400" />
              Revenue & Earnings Intelligence
            </h2>
            <p className="text-emerald-300 text-xs mt-1">Complete financial overview of your medical practice</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/60 px-4 py-2 rounded-2xl border border-emerald-700/40 text-xs font-bold">
            <BsGraphUp className="text-emerald-400" />
            {stats.growthPct >= 0
              ? <span className="text-emerald-300">+{stats.growthPct}% vs last month</span>
              : <span className="text-red-300">{stats.growthPct}% vs last month</span>
            }
          </div>
        </div>
      </div>

      {/* ── 4 KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Earned (All Time)",
            value: `₹${(stats.totalEarned || 0).toLocaleString("en-IN")}`,
            sub: `${stats.paidCount} paid consultations`,
            icon: <BsCurrencyRupee />,
            color: "emerald",
            trend: true,
          },
          {
            label: "This Month",
            value: `₹${(stats.monthEarned || 0).toLocaleString("en-IN")}`,
            sub: stats.growthPct >= 0 ? `↑ ${stats.growthPct}% vs last month` : `↓ ${Math.abs(stats.growthPct)}% vs last month`,
            icon: <BsCalendarCheck />,
            color: stats.growthPct >= 0 ? "blue" : "red",
            trend: stats.growthPct >= 0,
          },
          {
            label: "Pending / Unpaid",
            value: `₹${(stats.pendingRevenue || 0).toLocaleString("en-IN")}`,
            sub: `${stats.unpaidCount} completed but unpaid`,
            icon: <BsClockHistory />,
            color: "amber",
            trend: null,
          },
          {
            label: "Expected Revenue",
            value: `₹${(stats.expectedRevenue || 0).toLocaleString("en-IN")}`,
            sub: "From confirmed appointments",
            icon: <BsGraphUp />,
            color: "purple",
            trend: null,
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-tight">{card.label}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black
                ${card.color === "emerald" ? "bg-emerald-50 text-emerald-600" : ""}
                ${card.color === "blue" ? "bg-blue-50 text-blue-600" : ""}
                ${card.color === "amber" ? "bg-amber-50 text-amber-600" : ""}
                ${card.color === "red" ? "bg-red-50 text-red-600" : ""}
                ${card.color === "purple" ? "bg-purple-50 text-purple-600" : ""}
              `}>
                {card.icon}
              </div>
            </div>
            <div className={`text-2xl font-black
              ${card.color === "emerald" ? "text-emerald-700" : ""}
              ${card.color === "blue" ? "text-blue-700" : ""}
              ${card.color === "amber" ? "text-amber-700" : ""}
              ${card.color === "red" ? "text-red-700" : ""}
              ${card.color === "purple" ? "text-purple-700" : ""}
            `}>{card.value}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
              {card.trend === true && <BsArrowUpRight className="text-emerald-500" />}
              {card.trend === false && <BsArrowDownRight className="text-red-500" />}
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── 6 Month Earnings Recharts AreaChart + Top Patients ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 6-Month Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-base">6-Month Revenue Trend</h3>
              <p className="text-xs text-slate-400 font-medium">Monthly earnings from completed consultations</p>
            </div>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl text-[10px] font-bold">
              <button onClick={() => setActiveChart("earnings")}
                className={`px-2 py-1 rounded-lg transition-all ${activeChart === "earnings" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}>
                ₹ Earnings
              </button>
              <button onClick={() => setActiveChart("appointments")}
                className={`px-2 py-1 rounded-lg transition-all ${activeChart === "appointments" ? "bg-white text-emerald-800 shadow-sm" : "text-slate-400"}`}>
                # Visits
              </button>
            </div>
          </div>

          {/* Recharts AreaChart */}
          <div className="h-56 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.months6 || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(value) => activeChart === "earnings" ? `₹${value/1000}k` : value} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [activeChart === "earnings" ? `₹${value.toLocaleString("en-IN")}` : `${value} visits`, activeChart === "earnings" ? "Earnings" : "Visits"]}
                />
                <Area type="monotone" dataKey={activeChart} stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Summary Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
            {[
              { label: "Paid Sessions", value: stats.paidCount || 0, color: "text-emerald-600" },
              { label: "Unpaid Sessions", value: stats.unpaidCount || 0, color: "text-amber-600" },
              { label: "Year Total", value: `₹${(stats.yearEarned || 0).toLocaleString("en-IN")}`, color: "text-blue-600" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <div className={`text-lg font-black ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-slate-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Paying Patients */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
            <BsPeopleFill className="text-emerald-600" /> Top Patients
          </h3>
          <p className="text-xs text-slate-400 font-medium -mt-2">By total consultation spend</p>

          {stats.topPatients?.length > 0 ? (
            <div className="space-y-3 pt-1">
              {stats.topPatients.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                    #{i + 1}
                  </div>
                  <figure className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                    <img
                      src={p.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=6366f1&color=fff&size=32`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400">{p.visits} visit{p.visits !== 1 ? "s" : ""}</div>
                  </div>
                  <div className="text-xs font-black text-emerald-600 flex-shrink-0">
                    ₹{p.total.toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 opacity-40">
              <BsPeopleFill className="text-4xl text-slate-300 mb-2" />
              <p className="text-xs text-slate-400 font-medium text-center">Patient spending data will appear after completed sessions</p>
            </div>
          )}
        </div>

      </div>

      {/* ── Payment Mode Breakdown ── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-black text-slate-900 text-base mb-4">Revenue Health Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Collection Rate",
              value: stats.paidCount + stats.unpaidCount > 0
                ? Math.round((stats.paidCount / (stats.paidCount + stats.unpaidCount)) * 100)
                : 0,
              suffix: "%",
              color: "emerald",
              desc: "Of completed sessions collected",
            },
            {
              label: "Avg. Fee Per Visit",
              value: stats.paidCount > 0
                ? `₹${Math.round((stats.totalEarned || 0) / stats.paidCount).toLocaleString("en-IN")}`
                : "₹0",
              suffix: "",
              color: "blue",
              desc: "Average ticket price realized",
            },
            {
              label: "Recovery Opportunity",
              value: `₹${(stats.pendingRevenue || 0).toLocaleString("en-IN")}`,
              suffix: "",
              color: "amber",
              desc: "Unpaid revenue to follow up",
            },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${
              item.color === "emerald" ? "bg-emerald-50 border-emerald-100" :
              item.color === "blue"    ? "bg-blue-50 border-blue-100" :
              "bg-amber-50 border-amber-100"
            }`}>
              <div className={`text-2xl font-black mb-1 ${
                item.color === "emerald" ? "text-emerald-700" :
                item.color === "blue"    ? "text-blue-700" :
                "text-amber-700"
              }`}>{item.value}{item.suffix}</div>
              <div className="text-xs font-black text-slate-700">{item.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueEarningsPanel;
