import { useState, useEffect, useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { FaCheckCircle, FaExclamationTriangle, FaSyncAlt, FaTint, FaPlus, FaMinus } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { BsDropletFill } from "react-icons/bs";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BLOOD_COLORS = {
  "A+":  { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700",   badge: "bg-red-600",    glow: "shadow-red-200" },
  "A-":  { bg: "bg-rose-50",   border: "border-rose-200",   text: "text-rose-700",  badge: "bg-rose-600",   glow: "shadow-rose-200" },
  "B+":  { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700",badge: "bg-orange-600", glow: "shadow-orange-200" },
  "B-":  { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700", badge: "bg-amber-600",  glow: "shadow-amber-200" },
  "O+":  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700", badge: "bg-green-600",  glow: "shadow-green-200" },
  "O-":  { bg: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-700",badge:"bg-emerald-600",glow: "shadow-emerald-200" },
  "AB+": { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",  badge: "bg-blue-600",   glow: "shadow-blue-200" },
  "AB-": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700",badge: "bg-indigo-600", glow: "shadow-indigo-200" },
};

const BloodBankInventory = ({ hospitalData }) => {
  const [inventory, setInventory] = useState(
    BLOOD_GROUPS.reduce((acc, g) => ({ ...acc, [g]: { units: 0, critical: false } }), {})
  );
  const [isAvailable, setIsAvailable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load existing blood bank data
  useEffect(() => {
    const fetchBloodBank = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/hospitals/blood-bank`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const result = await res.json();
        if (result.success && result.data) {
          const inv = result.data.inventory || {};
          const merged = BLOOD_GROUPS.reduce((acc, g) => ({
            ...acc,
            [g]: { units: inv[g]?.units || 0, critical: inv[g]?.critical || false }
          }), {});
          setInventory(merged);
          setIsAvailable(result.data.isAvailable || false);
          setLastUpdated(result.data.lastUpdated);
        }
      } catch (err) {
        // fallback — use initial data if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchBloodBank();
  }, []);

  const adjustUnit = (group, delta) => {
    setInventory(prev => ({
      ...prev,
      [group]: {
        units: Math.max(0, (prev[group]?.units || 0) + delta),
        critical: Math.max(0, (prev[group]?.units || 0) + delta) < 3,
      }
    }));
  };

  const setUnit = (group, val) => {
    const num = Math.max(0, Number(val) || 0);
    setInventory(prev => ({ ...prev, [group]: { units: num, critical: num < 3 } }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/blood-bank`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ isAvailable, inventory }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setLastUpdated(new Date());
      toast.success("🩸 Blood bank inventory updated! Patients can now see live availability.");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const criticalGroups = BLOOD_GROUPS.filter(g => inventory[g]?.critical && inventory[g]?.units === 0);
  const totalUnits = BLOOD_GROUPS.reduce((s, g) => s + (inventory[g]?.units || 0), 0);
  const formatTime = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", day:"2-digit", month:"short" }) : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <BsDropletFill className="text-red-500 w-6 h-6" />
            Blood Bank Live Inventory
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Real-time · Last updated: {formatTime(lastUpdated)}
          </p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95">
          {saving ? <FaSyncAlt className="animate-spin" /> : <FaCheckCircle />}
          {saving ? "Saving..." : "Save & Go Live"}
        </button>
      </div>

      {/* Critical Alert Banner */}
      {criticalGroups.length > 0 && (
        <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-start gap-4 animate-pulse">
          <FaExclamationTriangle className="text-red-600 w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-red-700 text-sm uppercase tracking-wider">🚨 CRITICAL SHORTAGE</p>
            <p className="text-red-600 text-xs font-bold mt-1">
              Zero units available for: <span className="font-black">{criticalGroups.join(", ")}</span>
              &nbsp;— Consider requesting from nearby blood banks immediately.
            </p>
          </div>
        </div>
      )}

      {/* Blood Bank Status Toggle */}
      <div className="bg-gradient-to-br from-red-900 to-rose-900 p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-black text-lg flex items-center gap-3">
              <FaTint className="text-red-300" />
              Blood Bank Active
            </h3>
            <p className="text-red-300 text-xs font-bold mt-1">
              {isAvailable
                ? `✅ Patients can see your blood bank — Total: ${totalUnits} units available`
                : "❌ Blood bank hidden from patients — Toggle to go visible"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-black text-white">{totalUnits}</p>
              <p className="text-[10px] text-red-300 font-black uppercase tracking-widest">Total Units</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} className="sr-only peer" />
              <div className="relative w-20 h-10 bg-red-800 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300 border border-red-700">
                <div className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 ${isAvailable ? "translate-x-10" : ""}`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Blood Group Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BLOOD_GROUPS.map(g => (
            <div key={g} className="bg-gray-100 rounded-3xl h-40 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BLOOD_GROUPS.map(group => {
            const { units, critical } = inventory[group] || { units: 0, critical: false };
            const c = BLOOD_COLORS[group];

            return (
              <div key={group}
                className={`relative p-5 ${c.bg} rounded-3xl border-2 ${critical && units === 0 ? "border-red-400 shadow-lg shadow-red-100 ring-2 ring-red-300" : units < 3 ? "border-orange-300 shadow-md shadow-orange-100" : c.border} transition-all`}>
                {/* Blood Group Badge */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${c.badge} text-white text-sm font-black px-4 py-1 rounded-full shadow-md ${c.glow} shadow-lg`}>
                  {group}
                </div>
                <div className="mt-3 text-center">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    <div className={`w-2 h-2 rounded-full ${units === 0 ? "bg-red-500 animate-pulse" : units < 3 ? "bg-orange-400 animate-pulse" : "bg-green-400"}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${units === 0 ? "text-red-500" : units < 3 ? "text-orange-500" : "text-green-600"}`}>
                      {units === 0 ? "EMPTY" : units < 3 ? "CRITICAL" : "AVAILABLE"}
                    </span>
                  </div>

                  {/* Unit Count with +/- controls */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <button onClick={() => adjustUnit(group, -1)} disabled={units === 0}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-all active:scale-90 disabled:opacity-30 shadow-sm">
                      <FaMinus className="w-3 h-3 text-red-500" />
                    </button>
                    <input type="number" value={units} min="0"
                      onChange={e => setUnit(group, e.target.value)}
                      className={`w-14 text-3xl font-black text-center ${c.text} bg-transparent border-none outline-none p-0`} />
                    <button onClick={() => adjustUnit(group, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all active:scale-90 shadow-sm">
                      <FaPlus className="w-3 h-3 text-green-500" />
                    </button>
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${c.text} opacity-60`}>Units</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Blood Bank Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Groups Available", val: BLOOD_GROUPS.filter(g => (inventory[g]?.units || 0) > 0).length, color: "green", suffix: `/ ${BLOOD_GROUPS.length}` },
          { label: "Critical Groups", val: BLOOD_GROUPS.filter(g => (inventory[g]?.units || 0) < 3).length, color: "red", suffix: "groups" },
          { label: "Total Units", val: totalUnits, color: "blue", suffix: "bags" },
        ].map(s => (
          <div key={s.label} className={`p-5 bg-${s.color}-50 rounded-2xl border border-${s.color}-100 text-center`}>
            <p className={`text-3xl font-black text-${s.color}-700`}>{s.val} <span className={`text-sm text-${s.color}-400`}>{s.suffix}</span></p>
            <p className={`text-[10px] font-black text-${s.color}-400 uppercase tracking-widest mt-1`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Patient visibility note */}
      <div className="p-5 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
        <FaTint className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-black text-red-900 mb-1">🩸 Why this saves lives</p>
          <p className="text-xs text-red-700 font-medium">
            In Bihar, patients die because families can't find blood in time. When you activate your blood bank here,
            families in emergencies can search Sehaat Saathi and find your hospital instantly for the blood group they need.
            Update your inventory daily for maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodBankInventory;
