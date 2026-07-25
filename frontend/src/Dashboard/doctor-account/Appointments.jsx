import { formatDate } from "../../utils/formatDate";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import useRecordActivity from "../../hooks/useRecordActivity";
import { RiDeleteBin6Line } from "react-icons/ri";
import DigitalPrescriptionModal from "../../components/Booking/DigitalPrescriptionModal";

/* eslint-disable react/prop-types */
const Appointments = ({ appointments: initialAppointments }) => {
  const { token, user: doctorUser } = useContext(authContext);
  const { socket } = useSocket();
  const { recordActivity } = useRecordActivity();
  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [prescriptionModalBooking, setPrescriptionModalBooking] = useState(null);
  const [confirmTime, setConfirmTime] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setAppointments(result.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-booking", (newAppointment) => {
      console.log("Real-time pulse: New appointment detected!", newAppointment);
      toast.info("🚨 New Appointment Received!", {
         position: "top-right",
         autoClose: 5000
      });
      fetchAppointments();
    });

    return () => {
      socket.off("new-booking");
    };
  }, [socket]);

  const handleUpdateStatus = async (bookingId, status, time = "", msg = "") => {
    try {
      const res = await fetch(`${BASE_URL}/appointments/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          status, 
          appointmentTime: time, 
          statusMessage: msg 
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(`Appointment ${status} successfully`);
      recordActivity("Appointments", `${status} Appointment`, `/doctors/profile/me`);
      
      // Close modal and refresh local state
      setSelectedBooking(null);
      fetchAppointments();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteAppointment = async (bookingId) => {
    if (!window.confirm("🗑️ Permanent Pulse Deletion?\n\nAre you sure you want to permanently remove this patient record? This cannot be undone.")) {
      return;
    }

    // Optimistic UI Update: Remove locally first for instant feedback
    const originalAppointments = [...appointments];
    setAppointments(prev => prev.filter(item => item._id !== bookingId));

    try {
      const res = await fetch(`${BASE_URL}/appointments/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      
      if (!res.ok) {
        // Rollback on failure
        setAppointments(originalAppointments);
        throw new Error(result.message || "Neural sync error during deletion.");
      }

      toast.dark(result.message, { icon: "✅" });
      recordActivity("Appointments", "Manual Record Purge", `/doctors/profile/me`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 py-4 px-6">
        <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          Appointment Control Matrix
          <span className="text-[12px] font-medium bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
            {appointments?.length || 0} Total
          </span>
        </h1>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-[12px] text-gray-400 font-black uppercase tracking-[0.1em] bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4">Patient Identity</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Neural Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {appointments?.map((item) => (
              <tr key={item._id} className="hover:bg-indigo-50/30 transition-all duration-300 group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <figure className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform bg-gray-100 ring-4 ring-gray-50/50">
                      <img src={item.patient?.photo} alt="" className="w-full h-full object-cover"  loading="lazy" />
                    </figure>
                    <div>
                      <div className="text-[15px] font-black text-indigo-950">{item.patient?.name}</div>
                      <div className="text-[12px] text-gray-400 font-medium">{item.patient?.gender} • {formatDate(item.createdAt)}</div>
                      
                      {/* Appointment Type Badge */}
                      <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                          item.appointmentType === 'teleconsult' 
                          ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                          {item.appointmentType === 'teleconsult' ? '🚀 Neural Tele-Consult' : '🏥 Physical Visit'}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                    item.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                    {item.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                    item.status === 'confirmed' ? 'bg-indigo-100 text-indigo-700' : 
                    item.status === 'rejected' ? 'bg-red-50 text-red-500' : 
                    item.status === 'auto_cancelled' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status.replace('_', ' ')}
                    {item.appointmentTime && <span className="ml-1 text-indigo-400">@ {item.appointmentTime}</span>}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* TRASH ICON - Always visible for quick cleanup */}
                    <button 
                       onClick={() => handleDeleteAppointment(item._id)}
                       title="Remove Permanently"
                       className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90 border border-transparent hover:border-red-100 relative group"
                    >
                       <RiDeleteBin6Line className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </button>

                    <div className="h-8 w-[1px] bg-gray-100 mx-1"></div>

                    {item.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedBooking(item)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-95"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(item._id, 'rejected')}
                          className="bg-white border border-red-100 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                     ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        {item.appointmentType === 'teleconsult' && item.status === 'confirmed' && (
                          <button 
                            onClick={() => window.open(`/tele-consult-ai?session=${item._id}`, '_blank')}
                            className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-100 animate-pulse transition-all active:scale-95 flex items-center justify-center gap-1"
                          >
                            🚀 START NEURAL
                          </button>
                        )}
                        <button
                          onClick={() => setPrescriptionModalBooking(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-1"
                        >
                          📋 e-Prescription
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments?.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 font-medium">Secure queue empty. No pending bookings detected.</p>
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-headingColor mb-2">Configure Slot Sync</h2>
            <p className="text-gray-500 mb-6 font-medium">Setting confirmation for <span className="text-indigo-600 font-bold">{selectedBooking.patient?.name}</span></p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 ml-1">Appointment Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 10:30 AM" 
                  value={confirmTime}
                  onChange={(e) => setConfirmTime(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-[16px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 ml-1">Status Message (Optional)</label>
                <textarea 
                  placeholder="Additional instructions for biological sync..." 
                  value={statusMsg}
                  onChange={(e) => setStatusMsg(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[100px]"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking._id, 'confirmed', confirmTime, statusMsg)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                >
                  Verify & Confirm
                </button>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl transition-all"
                >
                  Abort
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* Digital Prescription Modal */}
      {prescriptionModalBooking && (
        <DigitalPrescriptionModal
          booking={prescriptionModalBooking}
          doctorData={doctorUser}
          isDoctorView={true}
          onClose={() => setPrescriptionModalBooking(null)}
          onPrescriptionSaved={() => fetchAppointments()}
        />
      )}
    </section>
  );
};

export default Appointments;
