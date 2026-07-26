import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import {
  BsCalendarCheck,
  BsClock,
  BsPlusCircle,
  BsTrash,
  BsCheckCircleFill,
  BsCalendarX,
  BsPeopleFill,
  BsSliders
} from "react-icons/bs";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_SCHEDULE = DAYS.map(d => ({
  day: d,
  startTime: "09:00",
  endTime: "17:00",
  slotDuration: 30,
  isAvailable: ["Sunday"].includes(d) ? false : true,
}));

const DoctorAvailabilityManager = ({ doctorData, onUpdateSuccess }) => {
  const { token } = useContext(authContext);
  const [schedule, setSchedule] = useState(
    doctorData?.availability?.length > 0
      ? DAYS.map(d => {
          const found = doctorData.availability.find(a => a.day === d);
          return found
            ? { ...found, isAvailable: found.isAvailable !== false }
            : { day: d, startTime: "09:00", endTime: "17:00", slotDuration: 30, isAvailable: d !== "Sunday" };
        })
      : DEFAULT_SCHEDULE
  );

  const [holidays, setHolidays] = useState(doctorData?.unavailabilityDates || []);
  const [newHoliday, setNewHoliday] = useState("");
  const [maxPatients, setMaxPatients] = useState(doctorData?.maxPatientsPerDay || 20);
  const [saving, setSaving] = useState(false);

  const toggleDay = (index) => {
    const updated = [...schedule];
    updated[index].isAvailable = !updated[index].isAvailable;
    setSchedule(updated);
  };

  const updateScheduleField = (index, field, val) => {
    const updated = [...schedule];
    updated[index][field] = val;
    setSchedule(updated);
  };

  const applyToAll = (sourceIndex) => {
    const source = schedule[sourceIndex];
    const updated = schedule.map(item => ({
      ...item,
      startTime: source.startTime,
      endTime: source.endTime,
      slotDuration: source.slotDuration,
    }));
    setSchedule(updated);
    toast.info(`Applied ${source.startTime}-${source.endTime} (${source.slotDuration}m) to all days!`);
  };

  const addHoliday = () => {
    if (!newHoliday) return;
    if (holidays.includes(newHoliday)) return toast.warn("Date already added to holiday list.");
    setHolidays([...holidays, newHoliday]);
    setNewHoliday("");
  };

  const removeHoliday = (dateStr) => {
    setHolidays(holidays.filter(h => h !== dateStr));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/doctors/availability/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          availability: schedule,
          unavailabilityDates: holidays,
          maxPatientsPerDay: Number(maxPatients),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success("✅ Availability Schedule & Holiday Calendar Saved!");
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to save schedule");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BsCalendarCheck className="text-indigo-600" /> Smart Availability & Slot Configurator
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Configure weekly consultation hours, slot durations, daily limits & holiday blocks
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-100 disabled:opacity-50 flex items-center gap-2"
        >
          <BsCheckCircleFill /> {saving ? "Saving..." : "Save Schedule"}
        </button>
      </div>

      {/* Global Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div>
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <BsPeopleFill className="text-indigo-600" /> Max Patients Per Day Cap
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={maxPatients}
            onChange={e => setMaxPatients(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
          />
          <p className="text-[10px] text-slate-400 mt-1">Automatically closes bookings once reached</p>
        </div>

        <div>
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <BsCalendarX className="text-rose-500" /> Add Holiday / Off-Day Block
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={newHoliday}
              onChange={e => setNewHoliday(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
            />
            <button
              onClick={addHoliday}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1"
            >
              <BsPlusCircle /> Add
            </button>
          </div>
          {holidays.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {holidays.map(h => (
                <span key={h} className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  {h}
                  <button onClick={() => removeHoliday(h)} className="hover:text-rose-900 ml-0.5">×</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="space-y-3">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
          <BsSliders className="text-indigo-600" /> Weekly Availability Hours (Mon – Sun)
        </h3>

        <div className="space-y-2">
          {schedule.map((item, idx) => (
            <div
              key={item.day}
              className={`p-3.5 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                item.isAvailable
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-slate-50 border-slate-100 opacity-60"
              }`}
            >
              {/* Day & Toggle Switch */}
              <div className="flex items-center gap-3 min-w-[130px]">
                <button
                  type="button"
                  onClick={() => toggleDay(idx)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    item.isAvailable ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      item.isAvailable ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="font-black text-xs text-slate-800">{item.day}</span>
              </div>

              {item.isAvailable ? (
                <div className="flex flex-wrap items-center gap-3">
                  {/* Start Time */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">From:</span>
                    <input
                      type="time"
                      value={item.startTime}
                      onChange={e => updateScheduleField(idx, "startTime", e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>

                  {/* End Time */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">To:</span>
                    <input
                      type="time"
                      value={item.endTime}
                      onChange={e => updateScheduleField(idx, "endTime", e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>

                  {/* Slot Duration */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Slot:</span>
                    <select
                      value={item.slotDuration}
                      onChange={e => updateScheduleField(idx, "slotDuration", Number(e.target.value))}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value={15}>15 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={45}>45 mins</option>
                      <option value={60}>60 mins</option>
                    </select>
                  </div>

                  {/* Copy to All Button */}
                  <button
                    type="button"
                    onClick={() => applyToAll(idx)}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 transition-all"
                    title="Copy these hours to all days"
                  >
                    Copy All
                  </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-400 italic">Off / Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityManager;
