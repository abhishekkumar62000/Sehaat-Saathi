import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {
  FaCalendarCheck, FaClock, FaCheckCircle, FaPlus, FaTimes,
  FaCopy, FaSyncAlt, FaExclamationTriangle, FaUsers, FaCalendarTimes
} from "react-icons/fa";
import { BsClockHistory, BsCheckCircleFill } from "react-icons/bs";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const DEFAULT_SCHEDULE = DAYS_OF_WEEK.map(day => ({
  day,
  isAvailable: day !== "Sunday",
  startTime: "09:00 AM",
  endTime: "05:00 PM",
  slotDuration: 30
}));

const HospitalSchedule = ({ hospitalData }) => {
  const [maxPatients, setMaxPatients] = useState(hospitalData?.maxPatientsPerDay || 50);
  const [holidayDate, setHolidayDate] = useState("");
  const [holidays, setHolidays] = useState(hospitalData?.unavailabilityDates || []);
  const [schedule, setSchedule] = useState(hospitalData?.weeklySchedule?.length > 0 ? hospitalData.weeklySchedule : DEFAULT_SCHEDULE);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (hospitalData?.weeklySchedule?.length > 0) {
      setSchedule(hospitalData.weeklySchedule);
    }
    if (hospitalData?.maxPatientsPerDay !== undefined) {
      setMaxPatients(hospitalData.maxPatientsPerDay);
    }
    if (hospitalData?.unavailabilityDates) {
      setHolidays(hospitalData.unavailabilityDates);
    }
  }, [hospitalData]);

  // Toggle Day Available
  const handleToggleDay = (index) => {
    setSchedule(prev => prev.map((item, idx) => idx === index ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  // Update specific day field
  const handleDayChange = (index, field, value) => {
    setSchedule(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  // One-click Copy Day timing to all other days
  const handleCopyAll = (sourceIndex) => {
    const sourceDay = schedule[sourceIndex];
    setSchedule(prev => prev.map(item => ({
      ...item,
      startTime: sourceDay.startTime,
      endTime: sourceDay.endTime,
      slotDuration: sourceDay.slotDuration,
      isAvailable: sourceDay.isAvailable
    })));
    toast.success(`📋 Copied ${sourceDay.day}'s timing to all days!`);
  };

  // Add Holiday Date Block
  const handleAddHoliday = () => {
    if (!holidayDate) return toast.warn("Please select a date to block!");
    if (holidays.includes(holidayDate)) return toast.info("Date is already in holiday blocks list!");

    setHolidays(prev => [...prev, holidayDate]);
    setHolidayDate("");
    toast.success(`📅 Off-day block added for ${holidayDate}`);
  };

  // Remove Holiday Date
  const handleRemoveHoliday = (dateToRemove) => {
    setHolidays(prev => prev.filter(d => d !== dateToRemove));
  };

  // Save Schedule to MongoDB
  const handleSaveSchedule = async () => {
    setSaving(true);
    const payload = {
      maxPatientsPerDay: Number(maxPatients) || 50,
      unavailabilityDates: holidays,
      weeklySchedule: schedule,
    };

    try {
      const authToken = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/hospitals/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setLastSaved(new Date());
      toast.success("✔ Schedule & Slot Configuration saved successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to save schedule");
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—";

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-3">
            <FaCalendarCheck className="text-indigo-600" />
            Smart Availability & Slot Configurator
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            Configure weekly consultation hours, slot durations, daily limits & holiday blocks
            {lastSaved && <span className="ml-2 text-green-600 font-bold">· Saved at {formatTime(lastSaved)}</span>}
          </p>
        </div>

        <button onClick={handleSaveSchedule} disabled={saving}
          className="flex items-center justify-center gap-2.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-50">
          {saving ? <FaSyncAlt className="animate-spin" /> : <BsCheckCircleFill />}
          SAVE SCHEDULE
        </button>
      </div>

      {/* Control Cards Row (Max Patient Cap + Add Holiday Block) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Max Patients Per Day Cap */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <label className="text-xs font-black text-gray-700 uppercase tracking-widest flex items-center gap-2 mb-2">
              <FaUsers className="text-indigo-600" /> MAX PATIENTS PER DAY CAP
            </label>
            <input type="number" min="1" max="500" value={maxPatients} onChange={e => setMaxPatients(e.target.value)}
              className="w-full text-2xl font-black text-indigo-950 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400" />
            <p className="text-[11px] text-gray-400 font-medium mt-2">
              Automatically closes online/offline bookings once daily cap is reached.
            </p>
          </div>
        </div>

        {/* Add Holiday / Off-Day Block */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <label className="text-xs font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
            <FaCalendarTimes className="text-red-500" /> ADD HOLIDAY / OFF-DAY BLOCK
          </label>
          <div className="flex gap-2">
            <input type="date" value={holidayDate} onChange={e => setHolidayDate(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-400" />
            <button onClick={handleAddHoliday}
              className="px-5 py-2.5 bg-indigo-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-900 transition-all flex items-center gap-1.5 shadow-sm">
              <FaPlus /> Add
            </button>
          </div>

          {/* Blocked Dates List */}
          {holidays.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              {holidays.map(dateStr => (
                <span key={dateStr} className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-black flex items-center gap-2">
                  <span>📅 {dateStr}</span>
                  <button onClick={() => handleRemoveHoliday(dateStr)} className="hover:text-red-900">
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Weekly Availability Hours (Mon - Sun) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
            <BsClockHistory className="text-indigo-600" /> WEEKLY AVAILABILITY HOURS (MON – SUN)
          </h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase">Configure consultation windows</span>
        </div>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={item.day}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${
                item.isAvailable ? "bg-white border-gray-200 hover:border-indigo-200" : "bg-gray-50/80 border-gray-200 opacity-60"
              }`}>

              {/* Day Toggle */}
              <div className="flex items-center gap-4 w-full md:w-48">
                <button type="button" onClick={() => handleToggleDay(index)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                    item.isAvailable ? "bg-emerald-500" : "bg-gray-300"
                  }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    item.isAvailable ? "translate-x-6" : "translate-x-0"
                  }`} />
                </button>

                <span className={`font-black text-sm uppercase tracking-wide ${item.isAvailable ? "text-gray-900" : "text-gray-400"}`}>
                  {item.day}
                </span>
              </div>

              {/* Timing Controls */}
              {item.isAvailable ? (
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-black text-gray-400 uppercase">FROM:</span>
                    <select value={item.startTime} onChange={e => handleDayChange(index, "startTime", e.target.value)}
                      className="bg-transparent font-black text-xs text-gray-800 outline-none">
                      {["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <FaClock className="text-gray-400 w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-black text-gray-400 uppercase">TO:</span>
                    <select value={item.endTime} onChange={e => handleDayChange(index, "endTime", e.target.value)}
                      className="bg-transparent font-black text-xs text-gray-800 outline-none">
                      {["01:00 PM", "02:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <FaClock className="text-gray-400 w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-black text-gray-400 uppercase">SLOT:</span>
                    <select value={item.slotDuration} onChange={e => handleDayChange(index, "slotDuration", Number(e.target.value))}
                      className="bg-transparent font-black text-xs text-indigo-700 outline-none">
                      <option value={15}>15 mins</option>
                      <option value={20}>20 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={45}>45 mins</option>
                      <option value={60}>60 mins</option>
                    </select>
                  </div>

                  <button type="button" onClick={() => handleCopyAll(index)}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-indigo-100">
                    Copy All
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-gray-400 italic">Off / Unavailable</span>
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HospitalSchedule;
