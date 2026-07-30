import React, { useState, useEffect } from 'react';
import { BsClock, BsCalendarX, BsLightningChargeFill } from 'react-icons/bs';
import { useSocket } from '../../context/SocketContext';
import convertTime from '../../utils/convertTime';
import { toast } from 'react-toastify';

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const LiveAvailabilityTimetable = ({ doctorId, initialAvailability = [], initialHolidays = [] }) => {
    const { socket } = useSocket();
    const [availability, setAvailability] = useState(initialAvailability);
    const [holidays, setHolidays] = useState(initialHolidays);
    const [isLive, setIsLive] = useState(false);
    const [justUpdated, setJustUpdated] = useState(false);

    useEffect(() => {
        setAvailability(initialAvailability);
        setHolidays(initialHolidays);
    }, [initialAvailability, initialHolidays]);

    useEffect(() => {
        if (!socket || !doctorId) return;

        setIsLive(true);

        const handleUpdate = (data) => {
            if (data.doctorId === doctorId) {
                setAvailability(data.availability || []);
                setHolidays(data.unavailabilityDates || []);
                setJustUpdated(true);
                toast.info("⚡ Doctor has updated their availability timings in real-time!", {
                    position: "top-center",
                    autoClose: 3000
                });
                setTimeout(() => setJustUpdated(false), 3000);
            }
        };

        socket.on("doctor-availability-updated", handleUpdate);

        return () => {
            setIsLive(false);
            socket.off("doctor-availability-updated", handleUpdate);
        };
    }, [socket, doctorId]);

    // Order availability by Monday-Sunday
    const sortedAvailability = DAYS_ORDER.map(day => {
        const found = Array.isArray(availability) ? availability.find(a => a.day === day) : null;
        return found || { day, isAvailable: false };
    });

    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <div className={`bg-slate-50 border rounded-[2rem] p-6 lg:p-8 shadow-inner transition-all duration-500 ${
            justUpdated ? "border-indigo-500 ring-4 ring-indigo-500/20 scale-[1.01]" : "border-slate-200"
        } animate-in fade-in duration-500`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <h3 className="text-sm lg:text-base font-black uppercase text-slate-800 tracking-widest flex items-center gap-2">
                    <BsClock className="text-indigo-600" /> Live OPD Timings
                </h3>
                {isLive ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-200 shadow-sm animate-pulse">
                        <BsLightningChargeFill /> Real-Time Sync
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                        Offline
                    </div>
                )}
            </div>

            <div className="space-y-3">
                {sortedAvailability.map((slot) => {
                    const isToday = slot.day === currentDay;
                    return (
                        <div 
                            key={slot.day} 
                            className={`flex justify-between items-center p-3 rounded-2xl transition-all ${
                                isToday 
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-[1.02]' 
                                    : 'bg-white border border-slate-100 hover:border-indigo-200'
                            }`}
                        >
                            <span className={`text-xs font-black uppercase tracking-widest ${isToday ? 'text-indigo-100' : 'text-slate-500'}`}>
                                {slot.day} {isToday && <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-md text-[9px]">Today</span>}
                            </span>
                            <span className={`text-sm font-bold ${!slot.isAvailable ? 'italic opacity-70' : ''} ${isToday ? 'text-white' : 'text-slate-800'}`}>
                                {slot.isAvailable ? `${convertTime(slot.startTime)} - ${convertTime(slot.endTime)}` : "Off / Unavailable"}
                            </span>
                        </div>
                    );
                })}
            </div>

            {holidays && holidays.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-1.5 mb-3">
                        <BsCalendarX /> Upcoming Holidays
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {holidays.map(dateStr => (
                            <span key={dateStr} className="px-2 py-1 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-bold rounded-lg">
                                {dateStr}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveAvailabilityTimetable;
