import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import LiveAvailabilityTimetable from "../../components/DoctorDetails/LiveAvailabilityTimetable";
import BookingWizard from "../../components/Booking/BookingWizard";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import { BsHospital, BsGeoAltFill, BsCalendarCheck, BsLightningChargeFill, BsPeopleFill, BsClockFill } from "react-icons/bs";

const DoctorQRLandingPage = () => {
  const { id } = useParams();
  const { socket } = useSocket();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);
  
  const [liveQueueLength, setLiveQueueLength] = useState(0);
  const [showBookingWizard, setShowBookingWizard] = useState(false);

  // Subscribe to live queue sync
  useEffect(() => {
    if (!socket || !id) return;
    
    socket.emit("JOIN_ROOM", `queue:${id}`);
    
    const handleQueueSync = (data) => {
      // Assuming server emits QUEUE_SIZE_SYNC with queue length
      if (data.doctorId === id) {
        setLiveQueueLength(data.queueLength || 0);
      }
    };
    
    socket.on("QUEUE_SIZE_SYNC", handleQueueSync);
    return () => {
      socket.off("QUEUE_SIZE_SYNC", handleQueueSync);
    };
  }, [socket, id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="h-screen flex items-center justify-center"><Error errMessage={error} /></div>;
  if (!doctor) return <div className="h-screen flex items-center justify-center text-slate-500 font-bold">Doctor details not found.</div>;

  // Format doc details for BookingWizard compatibility
  const mappedDocForWizard = {
    ...doctor,
    id: doctor._id,
    fee: doctor.ticketPrice || 0,
    specialty: doctor.specialization || "General Physician",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between py-6 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

      {/* Main landing container */}
      <div className="w-full max-w-lg mx-auto bg-slate-950 border border-slate-800 rounded-[3rem] p-6 md:p-8 flex flex-col gap-6 shadow-2xl z-10">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Sehaat Saathi Fast-Track</span>
          </div>
          <span className="text-[9px] bg-slate-800 text-slate-400 font-black px-2 py-0.5 rounded-md">QR Mode</span>
        </div>

        {/* Doctor Identity Card */}
        <div className="flex items-center gap-5 bg-slate-900 border border-slate-800/60 p-4 rounded-2xl">
          <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
          <div className="min-w-0">
            <h2 className="text-xl font-black text-white truncate">{doctor.name}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{doctor.specialization} - {doctor.qualifications?.map(q=>q.degree).join(", ") || "MBBS"}</p>
            <div className="text-[10px] font-bold text-emerald-400 mt-0.5 truncate flex items-center gap-1">
              <BsHospital /> {doctor.hospitalName || "Private Clinic"}
            </div>
          </div>
        </div>

        {/* Live Queue HUD */}
        <div className="grid grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-[2rem]">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1"><BsPeopleFill className="text-indigo-400" /> Active Queue</span>
            <span className="text-2xl font-black text-indigo-400 mt-1">{liveQueueLength} Patients</span>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1"><BsClockFill className="text-emerald-400" /> Est. Delay</span>
            <span className="text-2xl font-black text-emerald-400 mt-1">{liveQueueLength * 12} mins</span>
          </div>
        </div>

        {/* Live Timetable */}
        <div className="text-slate-800">
          <LiveAvailabilityTimetable 
            doctorId={doctor._id}
            initialAvailability={doctor.availability}
            initialHolidays={doctor.unavailabilityDates}
          />
        </div>

        {/* Fast-Track Action Trigger */}
        <button
          onClick={() => setShowBookingWizard(true)}
          className="w-full py-4.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <BsCalendarCheck /> Join Queue &amp; Book Instantly
        </button>

      </div>

      {/* Booking Wizard Modal Overlay */}
      {showBookingWizard && (
        <div className="text-slate-800">
          <BookingWizard 
            doc={mappedDocForWizard} 
            onClose={() => setShowBookingWizard(false)}
          />
        </div>
      )}
      
      {/* Branding Footer */}
      <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-6">
        © 2026 Sehaat Saathi System Inc.
      </div>
    </div>
  );
};

export default DoctorQRLandingPage;
