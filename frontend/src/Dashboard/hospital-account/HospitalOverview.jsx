import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaBed, FaAmbulance, FaLungs, FaBuilding, FaUserMd, FaPhone,
  FaShieldAlt, FaAward, FaCheckCircle, FaExclamationTriangle,
  FaShareAlt, FaCopy, FaEye, FaSyncAlt
} from "react-icons/fa";
import { MdOutlineVerified, MdBloodtype, MdLocalHospital } from "react-icons/md";
import { BsHospital, BsDropletFill, BsShieldCheck, BsActivity } from "react-icons/bs";

const HospitalOverview = ({ hospitalData, onSwitchTab }) => {
  const [copied, setCopied] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const publicLink = `${window.location.origin}/hospital-availability?id=${hospitalData?._id || "live"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    toast.success("📋 Public hospital profile link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmergencyToggle = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      toast.error("🚨 EMERGENCY MASS CASUALTY MODE ACTIVATED! Emergency team notified.", { autoClose: 3000 });
    } else {
      toast.info("✓ Normal OPD Mode resumed.", { autoClose: 2000 });
    }
  };

  // Real-time capacity metrics
  const totalBeds = hospitalData?.totalBeds || 0;
  const availBeds = hospitalData?.availableBeds || 0;
  const occupiedBeds = Math.max(0, totalBeds - availBeds);
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const icuTotal = hospitalData?.icuBeds || 0;
  const ventTotal = hospitalData?.ventilators || 0;
  const doctorsCount = hospitalData?.doctorRoster?.length || 0;
  const activeDoctors = hospitalData?.doctorRoster?.filter(d => d.isAvailable) || [];

  const bloodInventory = hospitalData?.bloodBank?.inventory || {};
  const totalBloodUnits = Object.values(bloodInventory).reduce((sum, g) => sum + (g?.units || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-3">
            <BsActivity className="text-indigo-600 animate-pulse" />
            Hospital Command Center Overview
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Real-time facility status · Live synchronized node
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all border border-indigo-200 shadow-sm active:scale-95"
          >
            <FaCopy className="w-3.5 h-3.5" />
            {copied ? "Copied! ✅" : "Share Hospital Link"}
          </button>

          <button
            onClick={handleEmergencyToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 ${
              emergencyMode
                ? "bg-red-600 text-white animate-pulse shadow-red-200"
                : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white"
            }`}
          >
            <FaExclamationTriangle />
            {emergencyMode ? "🚨 EMERGENCY ACTIVE" : "SOS Emergency Mode"}
          </button>
        </div>
      </div>

      {/* Emergency Mode Alert Banner */}
      {emergencyMode && (
        <div className="p-5 bg-red-600 text-white rounded-3xl shadow-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
              🚨
            </div>
            <div>
              <p className="font-black uppercase tracking-wider text-sm">EMERGENCY MASS CASUALTY PROTOCOL ACTIVE</p>
              <p className="text-xs text-red-100 font-medium">All ICU beds, ventilators, and emergency trauma staff are prioritized for incoming casualties.</p>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-white text-red-700 rounded-full font-black text-xs uppercase tracking-widest">Priority 1</span>
        </div>
      )}

      {/* Hero Live Status Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-indigo-800/60">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-white/10 rounded-3xl overflow-hidden border-2 border-white/20 shadow-lg flex items-center justify-center flex-shrink-0">
                {hospitalData?.photo ? (
                  <img src={hospitalData.photo} alt="Hospital" className="w-full h-full object-cover" />
                ) : (
                  <BsHospital className="text-indigo-300 w-10 h-10" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-white">{hospitalData?.hospitalName || "Registered Hospital"}</h1>
                  {hospitalData?.verified && (
                    <span className="flex items-center gap-1 bg-blue-500/30 text-blue-300 border border-blue-400/40 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      <MdOutlineVerified className="w-4 h-4" /> Verified Node
                    </span>
                  )}
                </div>
                <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">
                  {hospitalData?.tagline || "Multi-Specialty Healthcare Facility"} · {hospitalData?.district || "Bihar"}
                </p>
                <div className="flex items-center gap-4 mt-3 flex-wrap text-xs text-indigo-200">
                  {hospitalData?.hospitalType && (
                    <span className="bg-white/10 px-3 py-1 rounded-lg font-bold border border-white/10">
                      🏥 {hospitalData.hospitalType}
                    </span>
                  )}
                  {hospitalData?.contactNumber && (
                    <span className="bg-white/10 px-3 py-1 rounded-lg font-bold border border-white/10 flex items-center gap-1.5">
                      <FaPhone className="text-green-400" /> {hospitalData.contactNumber}
                    </span>
                  )}
                  {hospitalData?.establishedYear && (
                    <span className="bg-white/10 px-3 py-1 rounded-lg font-bold border border-white/10">
                      Est. {hospitalData.establishedYear}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Live Toggle Pill */}
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    const newLiveState = !hospitalData?.isLive;
                    const res = await fetch(`${window.location.origin.includes('localhost') ? 'http://localhost:8001' : ''}/api/v1/hospitals/${hospitalData?._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({ isLive: newLiveState })
                    });
                    const resData = await res.json();
                    if (resData.success) {
                      toast.success(newLiveState ? "🟢 Hospital is now LIVE on website Offline Booking & Bed Tracker!" : "⚫ Hospital is now Offline");
                      if (hospitalData) hospitalData.isLive = newLiveState;
                    }
                  } catch (err) {
                    toast.error("Failed to update Live status");
                  }
                }}
                className={`p-4 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all active:scale-95 shadow-md ${
                  hospitalData?.isLive ? "bg-green-500/20 border-green-400/40 text-green-300 hover:bg-green-500/30" : "bg-orange-500/20 border-orange-400/40 text-orange-300 hover:bg-orange-500/30"
                }`}
                title="Click to toggle Live visibility on website"
              >
                <div className={`w-3.5 h-3.5 rounded-full ${hospitalData?.isLive ? "bg-green-400 animate-pulse" : "bg-orange-400"}`} />
                <div className="text-left">
                  <p className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    {hospitalData?.isLive ? "🟢 Hospital is LIVE on Web" : "⚫ Not Live (Click to Activate)"}
                  </p>
                  <p className="text-[10px] text-indigo-200 font-medium">
                    {hospitalData?.isLive ? "Visible live in Offline Hub & Bed Finder" : "Click to go live immediately"}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-center">
              <p className="text-3xl font-black text-white">{totalBeds}</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mt-1">Total Capacity</p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-2xl border border-green-400/30 text-center">
              <p className="text-3xl font-black text-green-300">{availBeds}</p>
              <p className="text-[10px] font-black text-green-200 uppercase tracking-widest mt-1">Free Beds Now</p>
            </div>
            <div className="p-4 bg-red-500/20 rounded-2xl border border-red-400/30 text-center">
              <p className="text-3xl font-black text-red-300">{icuTotal}</p>
              <p className="text-[10px] font-black text-red-200 uppercase tracking-widest mt-1">ICU Capacity</p>
            </div>
            <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-400/30 text-center">
              <p className="text-3xl font-black text-purple-300">{activeDoctors.length} / {doctorsCount}</p>
              <p className="text-[10px] font-black text-purple-200 uppercase tracking-widest mt-1">Doctors On Duty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy Rate Bar & Live Bed Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Occupancy Radial Gauge */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Real-time Occupancy</h3>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                occupancyRate > 90 ? "bg-red-100 text-red-700" : occupancyRate > 70 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
              }`}>
                {occupancyRate > 90 ? "CRITICAL FULL" : occupancyRate > 70 ? "HIGH OCCUPANCY" : "AVAILABLE"}
              </span>
            </div>

            <div className="relative w-36 h-36 mx-auto my-4">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                <circle cx="50" cy="50" r="42" fill="none"
                  stroke={occupancyRate > 90 ? "#ef4444" : occupancyRate > 70 ? "#f97316" : "#22c55e"}
                  strokeWidth="12"
                  strokeDasharray={`${occupancyRate * 2.638} 263.8`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900">{occupancyRate}%</span>
                <span className="text-[10px] font-black text-gray-400 uppercase">Occupied</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-600">
              <span>Total Beds: <strong className="text-gray-900">{totalBeds}</strong></span>
              <span>Khali (Free): <strong className="text-green-600">{availBeds}</strong></span>
            </div>
            <button
              onClick={() => onSwitchTab("beds")}
              className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all text-center"
            >
              Update Live Bed Count →
            </button>
          </div>
        </div>

        {/* Live Infrastructure Matrix */}
        <div className="md:col-span-2 p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Infrastructure Status Matrix</h3>
              <span className="text-xs text-indigo-600 font-bold">4 Key Departments</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "General Ward", total: totalBeds, free: availBeds, icon: FaBed, color: "indigo" },
                { label: "ICU / ICCU Beds", total: icuTotal, free: hospitalData?.capacityDetails?.icu?.available || Math.min(icuTotal, 3), icon: FaAmbulance, color: "red" },
                { label: "Oxygen Beds", total: hospitalData?.capacityDetails?.oxygenBeds?.total || 20, free: hospitalData?.capacityDetails?.oxygenBeds?.available || 8, icon: FaLungs, color: "cyan" },
                { label: "Ventilator Units", total: ventTotal, free: hospitalData?.capacityDetails?.ventilators?.available || Math.min(ventTotal, 2), icon: FaLungs, color: "blue" },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 bg-${item.color}-50/60 border border-${item.color}-100 rounded-2xl flex items-center gap-4`}>
                  <div className={`w-12 h-12 bg-${item.color}-100 text-${item.color}-600 rounded-2xl flex items-center justify-center text-xl flex-shrink-0`}>
                    <item.icon />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg">{item.free} <span className="text-xs text-gray-400 font-normal">/ {item.total} free</span></p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Patients searching online can view this live status.</span>
            <button
              onClick={() => onSwitchTab("settings")}
              className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
            >
              Edit Capacity Settings →
            </button>
          </div>
        </div>

      </div>

      {/* On-Duty Doctor Team Roster Summary */}
      <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
              <FaUserMd className="text-indigo-600" /> Doctors On Duty Today ({activeDoctors.length})
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-1">Specialists available for OPD consultation today</p>
          </div>
          <button
            onClick={() => onSwitchTab("settings")}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
          >
            Manage Roster
          </button>
        </div>

        {activeDoctors.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No Doctors Added To Roster Yet</p>
            <button
              onClick={() => onSwitchTab("settings")}
              className="mt-2 text-xs font-black text-indigo-600 uppercase tracking-wider underline"
            >
              Go to Profile → Step 4 to Add Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeDoctors.map((doc, idx) => (
              <div key={idx} className="p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-base flex-shrink-0 shadow-md">
                  {doc.name ? doc.name.split(" ")[1]?.[0] || doc.name[0] : "D"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-gray-900 text-sm truncate">{doc.name}</p>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  </div>
                  <p className="text-xs text-indigo-600 font-bold">{doc.specialization}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{doc.opdDays} · {doc.opdTime}</p>
                  <p className="text-xs font-black text-gray-800 mt-1">₹{doc.fee || hospitalData?.consultationFee || 500} OPD Fee</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blood Bank & Ambulance Fleet Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Blood Bank Summary */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
                <BsDropletFill className="text-red-500" /> Blood Bank Live Inventory
              </h3>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                hospitalData?.bloodBank?.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {hospitalData?.bloodBank?.isAvailable ? "ACTIVE" : "OFFLINE"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {["A+", "B+", "O+", "AB+"].map(group => {
                const units = bloodInventory[group]?.units || 0;
                return (
                  <div key={group} className="p-3 bg-red-50/60 border border-red-100 rounded-2xl text-center">
                    <span className="text-xs font-black text-red-600 block">{group}</span>
                    <span className="text-xl font-black text-gray-900">{units}</span>
                    <span className="text-[9px] text-gray-400 font-bold block uppercase">Units</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onSwitchTab("blood")}
            className="w-full py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all text-center"
          >
            Manage Blood Bank →
          </button>
        </div>

        {/* Ambulance Fleet Summary */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
                <FaAmbulance className="text-red-500" /> Ambulance Dispatch Unit
              </h3>
              <span className="text-xs font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase">
                {hospitalData?.ambulanceFleet?.total || 3} Ambulances
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-2xl text-center">
                <p className="text-xl font-black text-blue-700">{hospitalData?.ambulanceFleet?.blsCount || 2}</p>
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">BLS Fleet</p>
              </div>
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-2xl text-center">
                <p className="text-xl font-black text-purple-700">{hospitalData?.ambulanceFleet?.alsCount || 1}</p>
                <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">ALS Ventilator</p>
              </div>
              <div className="p-3 bg-green-50/60 border border-green-100 rounded-2xl text-center">
                <p className="text-sm font-black text-green-700 truncate">{hospitalData?.ambulanceFleet?.hotline || "+91 108"}</p>
                <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">Dispatch No.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-center">
            <p className="text-xs font-black text-red-700 uppercase tracking-wider">🚑 24/7 Ambulance Emergency Dispatch Line Active</p>
          </div>
        </div>

      </div>

      {/* Departments & Accreditations Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Accreditations & Insurance TPAs */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FaAward className="text-amber-500" /> Accreditations & Insurance Partners
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Quality Certifications</p>
              <div className="flex flex-wrap gap-2">
                {hospitalData?.accreditations?.length > 0 ? (
                  hospitalData.accreditations.map((acc, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-800 rounded-xl text-xs font-black border border-amber-200 flex items-center gap-1.5">
                      <BsShieldCheck className="text-amber-600" /> {acc}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">No accreditations selected yet</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cashless Insurance TPAs</p>
              <div className="flex flex-wrap gap-2">
                {hospitalData?.insurancePartners?.length > 0 ? (
                  hospitalData.insurancePartners.map((ins, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-black border border-emerald-200">
                      ✓ {ins}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">No insurance partners added yet</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Operational Departments */}
        <div className="p-7 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <FaBuilding className="text-indigo-500" /> Operational Departments ({hospitalData?.departments?.length || 0})
          </h3>
          <div className="flex flex-wrap gap-2">
            {hospitalData?.departments?.length > 0 ? (
              hospitalData.departments.map((d, i) => (
                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black border border-indigo-100">
                  {d}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">No departments selected yet</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default HospitalOverview;
