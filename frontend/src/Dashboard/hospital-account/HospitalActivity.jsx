import { useState, useMemo } from "react";
import { formatDate } from "../../utils/formatDate";
import {
  FaBed, FaAmbulance, FaUserMd, FaCalendarCheck, FaCheckCircle,
  FaSyncAlt, FaExclamationTriangle, FaBell, FaInfoCircle, FaCamera
} from "react-icons/fa";
import { MdOutlineVerified, MdBloodtype, MdLocalHospital } from "react-icons/md";
import { BsActivity, BsHospital, BsDropletFill, BsClockHistory } from "react-icons/bs";

const HospitalActivity = ({ hospitalData }) => {
  const [filterType, setFilterType] = useState("all");

  // Derive real-time activities from hospitalData
  const activities = useMemo(() => {
    const list = [];
    const now = new Date();

    // 1. Live status activity
    if (hospitalData?.isLive) {
      list.push({
        id: "live_status",
        type: "status",
        title: "🟢 Hospital is LIVE on Sehaat Saathi",
        description: "Your hospital node is active and visible to patients searching in " + (hospitalData?.district || "Bihar"),
        time: hospitalData.updatedAt ? new Date(hospitalData.updatedAt) : new Date(now.getTime() - 1000 * 60 * 10),
        icon: BsHospital,
        color: "green",
        bg: "bg-green-50 text-green-700 border-green-200"
      });
    }

    // 2. Verified status
    if (hospitalData?.verified) {
      list.push({
        id: "verified_badge",
        type: "status",
        title: "🛡️ Platinum Node Verification Active",
        description: "Official hospital registration credentials verified by Sehaat Saathi Quality Team",
        time: hospitalData.createdAt ? new Date(hospitalData.createdAt) : new Date(now.getTime() - 1000 * 60 * 60 * 24),
        icon: MdOutlineVerified,
        color: "blue",
        bg: "bg-blue-50 text-blue-700 border-blue-200"
      });
    }

    // 3. Live Bed Tracker Activity
    if (hospitalData?.bedLastUpdated) {
      list.push({
        id: "bed_update",
        type: "beds",
        title: "🛏️ Live Bed Matrix Synchronized",
        description: `Capacity updated: ${hospitalData.availableBeds || 0} free beds out of ${hospitalData.totalBeds || 0} total capacity (${hospitalData.icuBeds || 0} ICU beds)`,
        time: new Date(hospitalData.bedLastUpdated),
        icon: FaBed,
        color: "indigo",
        bg: "bg-indigo-50 text-indigo-700 border-indigo-200"
      });
    }

    // 4. Doctor Roster Activity
    if (hospitalData?.doctorRoster?.length > 0) {
      const activeDocs = hospitalData.doctorRoster.filter(d => d.isAvailable).length;
      list.push({
        id: "doctor_roster",
        type: "roster",
        title: "👨‍⚕️ Specialist Doctor Team Active",
        description: `${activeDocs} out of ${hospitalData.doctorRoster.length} specialist doctors are currently on duty for OPD consultation today`,
        time: hospitalData.updatedAt ? new Date(hospitalData.updatedAt) : new Date(now.getTime() - 1000 * 60 * 45),
        icon: FaUserMd,
        color: "purple",
        bg: "bg-purple-50 text-purple-700 border-purple-200"
      });
    }

    // 5. Blood Bank Activity
    if (hospitalData?.bloodBank?.isAvailable) {
      list.push({
        id: "blood_bank",
        type: "blood",
        title: "🩸 Blood Bank Inventory Sync",
        description: "Real-time blood group inventory active and monitored for critical emergencies",
        time: hospitalData.bloodBank.lastUpdated ? new Date(hospitalData.bloodBank.lastUpdated) : new Date(now.getTime() - 1000 * 60 * 120),
        icon: BsDropletFill,
        color: "red",
        bg: "bg-red-50 text-red-700 border-red-200"
      });
    }

    // 6. Patient Bookings Activities
    if (hospitalData?.bookings?.length > 0) {
      hospitalData.bookings.slice(0, 8).forEach((b, idx) => {
        const patientName = b.user?.name || b.patientName || "Patient";
        const docName = b.doctor?.name || "General OPD";
        const bStatus = (b.status || "requested").toUpperCase();
        const bTime = b.createdAt ? new Date(b.createdAt) : new Date(now.getTime() - 1000 * 60 * (idx + 1) * 30);

        list.push({
          id: `booking_${b._id || idx}`,
          type: "bookings",
          title: `📅 OPD Booking: ${patientName}`,
          description: `Appointment with Dr. ${docName} · Token ${b.tokenNumber || `#${b._id?.slice(-4) || "001"}`} · Status: ${bStatus}`,
          time: bTime,
          icon: FaCalendarCheck,
          color: b.status === "completed" ? "green" : b.status === "PATIENT_ARRIVED" ? "purple" : "cyan",
          bg: b.status === "completed" ? "bg-green-50 text-green-700 border-green-200" : "bg-cyan-50 text-cyan-700 border-cyan-200"
        });
      });
    }

    // Sort by most recent timestamp
    return list.sort((a, b) => b.time.getTime() - a.time.getTime());
  }, [hospitalData]);

  // Filtered List
  const filteredActivities = useMemo(() => {
    if (filterType === "all") return activities;
    return activities.filter(a => a.type === filterType);
  }, [activities, filterType]);

  const formatActivityTime = (d) => {
    if (!d) return "Just now";
    const diffMins = Math.floor((new Date().getTime() - d.getTime()) / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <BsActivity className="text-indigo-600 animate-pulse" />
            Real-Time Hospital Audit & Activity Stream
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Live event log · Real-time synchronization of all hospital actions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-black uppercase tracking-wider border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Event Monitor Active
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Filter Activity:</span>
        {[
          { key: "all", label: "🌐 All Events" },
          { key: "bookings", label: "📅 Patient Bookings" },
          { key: "beds", label: "🛏️ Live Bed Matrix" },
          { key: "roster", label: "👨‍⚕️ Doctor Roster" },
          { key: "blood", label: "🩸 Blood Bank" },
          { key: "status", label: "🟢 Hospital Status" },
        ].map(chip => (
          <button key={chip.key} onClick={() => setFilterType(chip.key)}
            className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
              filterType === chip.key ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            {chip.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream List */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <BsClockHistory className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-sm">No Recent Activity Recorded</p>
          <p className="text-gray-400 text-xs mt-1">Actions performed on the dashboard will appear here in real time</p>
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-indigo-100 space-y-6">
          {filteredActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="relative group">

                {/* Bullet Dot */}
                <div className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center text-xs ${
                  act.color === "green" ? "bg-green-500 text-white" :
                  act.color === "blue" ? "bg-blue-500 text-white" :
                  act.color === "purple" ? "bg-purple-500 text-white" :
                  act.color === "red" ? "bg-red-500 text-white" : "bg-indigo-600 text-white"
                }`}>
                  <Icon className="w-3 h-3" />
                </div>

                {/* Event Content Card */}
                <div className={`p-5 rounded-3xl border transition-all ${act.bg} hover:shadow-md`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-black text-gray-900 text-sm">{act.title}</h4>
                      <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">{act.description}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex-shrink-0 bg-white/70 px-3 py-1 rounded-full border border-gray-200">
                      {formatActivityTime(act.time)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default HospitalActivity;
