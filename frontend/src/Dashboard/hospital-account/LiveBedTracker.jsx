import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  FaBed, FaAmbulance, FaLungs, FaPlus, FaMinus,
  FaCheckCircle, FaSyncAlt, FaExclamationTriangle,
  FaPrint, FaStethoscope, FaHospital, FaBaby
} from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BsHospital, BsDropletFill } from "react-icons/bs";

const BED_CATEGORIES = [
  {
    key: "generalWard",
    title: "General Ward Beds",
    description: "Regular ward beds for admitted non-critical patients",
    emoji: "🛏️",
    icon: FaBed,
    color: "indigo",
    badgeColor: "bg-indigo-100 text-indigo-700",
    borderClass: "border-indigo-200",
    bgClass: "bg-indigo-50/50",
    btnColor: "bg-indigo-600 hover:bg-indigo-700",
    criticalThreshold: 5,
  },
  {
    key: "icu",
    title: "ICU / ICCU Beds",
    description: "Intensive Care Unit with cardiac & multi-para vital monitoring",
    emoji: "🏥",
    icon: FaAmbulance,
    color: "red",
    badgeColor: "bg-red-100 text-red-700",
    borderClass: "border-red-200",
    bgClass: "bg-red-50/50",
    btnColor: "bg-red-600 hover:bg-red-700",
    criticalThreshold: 2,
  },
  {
    key: "oxygenBeds",
    title: "Oxygen Beds / Cylinders",
    description: "Dedicated beds equipped with continuous central oxygen line or cylinders",
    emoji: "💨",
    icon: FaLungs,
    color: "cyan",
    badgeColor: "bg-cyan-100 text-cyan-700",
    borderClass: "border-cyan-200",
    bgClass: "bg-cyan-50/50",
    btnColor: "bg-cyan-600 hover:bg-cyan-700",
    criticalThreshold: 3,
  },
  {
    key: "ventilators",
    title: "Ventilator Units",
    description: "Invasive & Non-invasive mechanical respiratory ventilators for critical care",
    emoji: "🫁",
    icon: FaLungs,
    color: "blue",
    badgeColor: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-200",
    bgClass: "bg-blue-50/50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    criticalThreshold: 1,
  },
  {
    key: "operationTheatres",
    title: "Operation Theatres (OT)",
    description: "Major & Minor Surgical OT rooms ready for surgical procedures",
    emoji: "🩺",
    icon: FaStethoscope,
    color: "purple",
    badgeColor: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-200",
    bgClass: "bg-purple-50/50",
    btnColor: "bg-purple-600 hover:bg-purple-700",
    criticalThreshold: 1,
  },
  {
    key: "nicuPicu",
    title: "NICU / PICU Units",
    description: "Neonatal & Pediatric Intensive Care units for infants and children",
    emoji: "👶",
    icon: FaBaby,
    color: "pink",
    badgeColor: "bg-pink-100 text-pink-700",
    borderClass: "border-pink-200",
    bgClass: "bg-pink-50/50",
    btnColor: "bg-pink-600 hover:bg-pink-700",
    criticalThreshold: 1,
  },
  {
    key: "emergencyBeds",
    title: "Emergency & Trauma Beds",
    description: "Immediate triage & resuscitation casualty beds active 24/7",
    emoji: "🚨",
    icon: FaAmbulance,
    color: "amber",
    badgeColor: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-200",
    bgClass: "bg-amber-50/50",
    btnColor: "bg-amber-600 hover:bg-amber-700",
    criticalThreshold: 2,
  },
];

const defaultCapacity = {
  generalWard: { enabled: true, total: 50, available: 15 },
  icu: { enabled: true, total: 10, available: 3 },
  oxygenBeds: { enabled: true, total: 20, available: 8 },
  ventilators: { enabled: true, total: 5, available: 2 },
  operationTheatres: { enabled: true, total: 4, available: 2 },
  nicuPicu: { enabled: false, total: 0, available: 0 },
  emergencyBeds: { enabled: true, total: 12, available: 4 },
};

const LiveBedTracker = ({ hospitalData: initialData }) => {
  const [capacity, setCapacity] = useState(initialData?.capacityDetails || defaultCapacity);
  const [totalBeds, setTotalBeds] = useState(initialData?.totalBeds || 50);
  const [availableBeds, setAvailableBeds] = useState(initialData?.availableBeds || 15);
  const [icuBeds, setIcuBeds] = useState(initialData?.icuBeds || 10);
  const [ventilators, setVentilators] = useState(initialData?.ventilators || 5);
  const [lastSaved, setLastSaved] = useState(initialData?.bedLastUpdated || new Date());
  const [saving, setSaving] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  // Sync state if initialData changes
  useEffect(() => {
    if (initialData?.capacityDetails) setCapacity(initialData.capacityDetails);
    if (initialData?.totalBeds !== undefined) setTotalBeds(initialData.totalBeds);
    if (initialData?.availableBeds !== undefined) setAvailableBeds(initialData.availableBeds);
    if (initialData?.icuBeds !== undefined) setIcuBeds(initialData.icuBeds);
    if (initialData?.ventilators !== undefined) setVentilators(initialData.ventilators);
  }, [initialData]);

  // Sync to Backend Database
  const saveToBackend = useCallback(async (updatedCapacity) => {
    setSaving(true);

    // Compute top-level totals across enabled bed categories
    let totalSum = 0;
    let availSum = 0;
    Object.entries(updatedCapacity).forEach(([k, v]) => {
      if (v.enabled && k !== "operationTheatres") {
        totalSum += Number(v.total) || 0;
        availSum += Number(v.available) || 0;
      }
    });

    const icuTotal = updatedCapacity.icu?.enabled ? (Number(updatedCapacity.icu.total) || 0) : 0;
    const ventTotal = updatedCapacity.ventilators?.enabled ? (Number(updatedCapacity.ventilators.total) || 0) : 0;

    const payload = {
      capacityDetails: updatedCapacity,
      totalBeds: totalSum,
      availableBeds: availSum,
      icuBeds: icuTotal,
      ventilators: ventTotal,
    };

    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/beds`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setTotalBeds(totalSum);
      setAvailableBeds(availSum);
      setIcuBeds(icuTotal);
      setVentilators(ventTotal);
      setLastSaved(new Date());
    } catch (err) {
      toast.error(err.message || "Failed to sync bed counts");
    } finally {
      setSaving(false);
    }
  }, []);

  // One-touch action: Adjust available beds by delta (+1 or -1)
  const adjustAvailable = (catKey, delta) => {
    setCapacity(prev => {
      const currentCat = prev[catKey] || { enabled: true, total: 0, available: 0 };
      const newAvail = Math.min(currentCat.total, Math.max(0, (currentCat.available || 0) + delta));
      const updatedCat = { ...currentCat, available: newAvail };
      const nextCap = { ...prev, [catKey]: updatedCat };

      saveToBackend(nextCap);
      toast.info(
        delta < 0
          ? `🏥 Patient Admitted — ${newAvail} free beds left in ${catKey}`
          : `✅ Patient Discharged — Bed now free in ${catKey}`
      );
      return nextCap;
    });
  };

  // One-touch action: Set category full or empty
  const setFullOrEmpty = (catKey, targetType) => {
    setCapacity(prev => {
      const currentCat = prev[catKey] || { enabled: true, total: 0, available: 0 };
      const targetVal = targetType === "empty" ? currentCat.total : 0;
      const updatedCat = { ...currentCat, available: targetVal };
      const nextCap = { ...prev, [catKey]: updatedCat };

      saveToBackend(nextCap);
      toast.success(`⚡ ${catKey} marked as ${targetType === "empty" ? "All Beds Empty" : "100% Full"}`);
      return nextCap;
    });
  };

  // Toggle category enabled state
  const toggleCategoryEnabled = (catKey) => {
    setCapacity(prev => {
      const currentCat = prev[catKey] || { enabled: true, total: 0, available: 0 };
      const updatedCat = { ...currentCat, enabled: !currentCat.enabled };
      const nextCap = { ...prev, [catKey]: updatedCat };

      saveToBackend(nextCap);
      toast.info(`Service ${updatedCat.enabled ? "Activated" : "Disabled"}`);
      return nextCap;
    });
  };

  // Calculate overall metrics
  const occupiedBeds = Math.max(0, totalBeds - availableBeds);
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
  const formatTime = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            Real-Time Live Bed Tracker & Command Center
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Instant 1-touch updates · Live synchronized on website & patient search app
            {lastSaved && <span className="ml-2 text-green-500 font-bold">· Synced at {formatTime(lastSaved)}</span>}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setAutoSync(a => !a)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${autoSync ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
            <FaSyncAlt className={saving ? "animate-spin text-green-600" : ""} />
            {saving ? "Syncing..." : autoSync ? "Live Web Sync ON" : "Sync Paused"}
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
            <FaPrint /> Print Bed Sheet
          </button>
        </div>
      </div>

      {/* Occupancy Radial Gauge Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-7 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">

          {/* Radial Ring */}
          <div className="text-center flex-shrink-0">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none"
                  stroke={occupancyRate > 90 ? "#f87171" : occupancyRate > 70 ? "#fb923c" : "#4ade80"}
                  strokeWidth="10"
                  strokeDasharray={`${occupancyRate * 2.513} 251.3`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{occupancyRate}%</span>
                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Occupied</span>
              </div>
            </div>
          </div>

          {/* Key Totals Grid */}
          <div className="flex-1 space-y-3 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-black text-lg">Hospital Live Capacity Overview</h3>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                occupancyRate > 90 ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"
              }`}>
                {occupancyRate > 90 ? "⚠️ CRITICAL HIGH OCCUPANCY" : "🟢 NORMAL CAPACITY"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Capacity", val: totalBeds, color: "indigo" },
                { label: "Free Beds Now", val: availableBeds, color: "green" },
                { label: "ICU Beds", val: icuBeds, color: "red" },
                { label: "Ventilators", val: ventilators, color: "blue" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                  <p className="text-2xl font-black text-white">{s.val}</p>
                  <p className="text-[9px] text-indigo-300 uppercase tracking-widest font-bold">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-indigo-200 font-medium">
              ✨ Updates saved here instantly sync to patient search cards on the Sehaat Saathi Live Availability Hub!
            </p>
          </div>
        </div>
      </div>

      {/* Categorized Live Bed Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">
            Ward & Infrastructure Bed Matrix ({BED_CATEGORIES.length} Categories)
          </h3>
          <span className="text-xs text-gray-400 font-bold">1-Touch Admission & Discharge Controls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BED_CATEGORIES.map(cat => {
            const data = capacity[cat.key] || { enabled: false, total: 0, available: 0 };
            const isEnabled = data.enabled;
            const total = data.total || 0;
            const avail = data.available || 0;
            const occupied = Math.max(0, total - avail);
            const isCritical = isEnabled && avail <= cat.criticalThreshold;
            const freePercent = total > 0 ? Math.round((avail / total) * 100) : 0;

            return (
              <div key={cat.key}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between ${
                  !isEnabled
                    ? "bg-gray-50/70 border-gray-200 opacity-75"
                    : isCritical
                    ? "bg-red-50/70 border-red-300 shadow-lg shadow-red-100"
                    : `${cat.bgClass} ${cat.borderClass} shadow-sm hover:shadow-md`
                }`}>

                {/* Card Top Row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-100 flex-shrink-0">
                        {cat.emoji}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-sm">{cat.title}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">{cat.description}</p>
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <button type="button" onClick={() => toggleCategoryEnabled(cat.key)}
                      className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border transition-all ${
                        isEnabled ? `${cat.badgeColor} border-current` : "bg-gray-200 text-gray-500 border-gray-300"
                      }`}>
                      {isEnabled ? "ACTIVE" : "OFFLINE"}
                    </button>
                  </div>

                  {!isEnabled ? (
                    <div className="py-4 text-center">
                      <p className="text-xs text-gray-400 font-bold mb-2">Service is disabled at this hospital.</p>
                      <button onClick={() => toggleCategoryEnabled(cat.key)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">
                        ➕ Activate Service
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Big Counters Row */}
                      <div className="flex items-end justify-between my-3 bg-white/80 p-4 rounded-2xl border border-gray-200/80">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Free / Khali Now</p>
                          <p className={`text-4xl font-black ${isCritical ? "text-red-600" : "text-green-600"}`}>
                            {avail}
                            <span className="text-xs text-gray-400 font-normal ml-1">/ {total} total</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                            avail === 0 ? "bg-red-100 text-red-700" : freePercent > 40 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {avail === 0 ? "FULL" : freePercent > 40 ? "HIGH FREE" : "LIMITED"}
                          </span>
                          <p className="text-[10px] text-gray-500 font-bold mt-1">Occupied: {occupied}</p>
                        </div>
                      </div>

                      {/* Visual Occupancy Bar */}
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden flex mb-4">
                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${total > 0 ? (occupied / total) * 100 : 0}%` }} />
                        <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${total > 0 ? (avail / total) * 100 : 0}%` }} />
                      </div>
                    </>
                  )}
                </div>

                {/* 1-Touch Action Controls */}
                {isEnabled && (
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60 flex-wrap">
                    <button type="button" onClick={() => adjustAvailable(cat.key, -1)} disabled={avail <= 0 || saving}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-red-700 transition-all disabled:opacity-30 active:scale-95 shadow-sm">
                      <FaMinus className="w-2.5 h-2.5" /> 1 Admit
                    </button>
                    <button type="button" onClick={() => adjustAvailable(cat.key, 1)} disabled={avail >= total || saving}
                      className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-green-700 transition-all disabled:opacity-30 active:scale-95 shadow-sm">
                      <FaPlus className="w-2.5 h-2.5" /> 1 Discharge
                    </button>
                    <button type="button" onClick={() => setFullOrEmpty(cat.key, "full")} disabled={saving}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-300 transition-all active:scale-95">
                      Full
                    </button>
                    <button type="button" onClick={() => setFullOrEmpty(cat.key, "empty")} disabled={saving}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-green-200 transition-all active:scale-95">
                      All Free
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Live Search Preview */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 rounded-3xl border border-indigo-100 flex items-start gap-4">
        <BsHospital className="text-indigo-600 w-8 h-8 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-1">
            🌐 Live Web & App Synchronization Status
          </h4>
          <p className="text-xs text-indigo-700 font-medium leading-relaxed">
            Every tap on <strong>Admit</strong> or <strong>Discharge</strong> instantly updates your live bed count in MongoDB Atlas.
            Patients searching for emergency ICU beds or oxygen cylinders on Sehaat Saathi can see exact real-time availability in <strong>{initialData?.district || "your district"}</strong>!
          </p>
        </div>
      </div>

    </div>
  );
};

export default LiveBedTracker;
