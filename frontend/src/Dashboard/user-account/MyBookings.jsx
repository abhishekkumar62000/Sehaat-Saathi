import React, { useState } from "react";
// import DoctorCard from "../../components/Home/Doctors/DoctorCard";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import PatientJourneyTimeline from "../../components/Patient/PatientJourneyTimeline";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/appointments/patient`);

  const [expandedBooking, setExpandedBooking] = useState(null);

  return (
    <section className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-green-600 py-6 px-8">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
          Your Neural Health Index
          <span className="text-[12px] font-medium bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
            {appointments?.length || 0} Synced Bookings
          </span>
        </h1>
      </div>

      <div className="p-4 md:p-8">
        {loading && !error && <div className="py-10"><Loading /></div>}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[12px] text-gray-400 font-black uppercase tracking-[0.1em] border-b border-gray-100">
                  <th className="px-6 py-4">Medical Professional</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Sync Status</th>
                  <th className="px-6 py-4">Investment</th>
                  <th className="px-6 py-4">Token Index</th>
                  <th className="px-6 py-4">Neural Stamp</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {appointments?.map((item) => (
                  <React.Fragment key={item._id}>
                    <tr className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <figure className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden group-hover:scale-110 transition-transform">
                            <img src={item.doctor?.photo} alt="" className="w-full h-full object-cover" />
                          </figure>
                          <div>
                            <div className="text-[16px] font-black text-headingColor">{item.doctor?.name}</div>
                            {(item.doctor?.hospital || item.hospitalName) && (
                              <div className="text-[11px] text-indigo-600 font-black uppercase tracking-wider flex items-center gap-1">
                                🏥 {item.doctor?.hospital?.hospitalName || item.hospitalName || 'Offline Clinic'}
                              </div>
                            )}
                            <p className="text-[12px] text-gray-400 font-medium">{item.doctor?.email}</p>
                            
                            {/* Appointment Type Badge */}
                            <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                                item.appointmentType === 'teleconsult' 
                                ? 'bg-rose-100 text-rose-600 border border-rose-200' 
                                : 'bg-blue-100 text-blue-600 border border-blue-200'
                            }`}>
                                {item.appointmentType === 'teleconsult' ? '🚀 Neural Tele-Consult' : '🏥 Physical Visit'}
                            </div>
                            
                            {/* Smart Alerts */}
                            {item.bookingMode === 'Offline' && item.status !== 'completed' && (
                                <div className="mt-2 space-y-1">
                                    {item.delayedMinutes > 0 && (
                                        <div className="text-[10px] bg-red-100 text-red-600 font-black uppercase tracking-widest px-2 py-1 rounded-md animate-pulse">
                                            🚨 Delay Alert: Doctor delayed by {item.delayedMinutes} mins. ETA updated.
                                        </div>
                                    )}
                                    {item.estimatedWaitTime && item.estimatedWaitTime <= 30 && (
                                        <div className="text-[10px] bg-orange-500 text-white shadow-lg shadow-orange-500/20 font-black uppercase tracking-widest px-2 py-1 rounded-md animate-bounce mt-1">
                                            🏃‍♂️ Smart Alert: Leave Home Now! Your turn is close.
                                        </div>
                                    )}
                                </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-wider">
                          {item.doctor?.specialization || 'Clinical Generalist'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider w-max ${
                            item.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                            item.status === 'rejected' ? 'bg-red-50 text-red-500' : 
                            item.status === 'auto_cancelled' ? 'bg-amber-100 text-amber-700 font-bold border border-amber-200' : 'bg-orange-100 text-orange-700'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'confirmed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                            {item.status.replace('_', ' ')}
                          </div>
                          {item.appointmentTime && (
                            <div className="text-[11px] font-black text-indigo-600 flex items-center gap-1 mt-1">
                               Scheduled @ {item.appointmentTime}
                            </div>
                          )}
                          {item.statusMessage && (
                            <p className="text-[10px] text-gray-400 italic font-medium max-w-[150px] leading-tight">
                              "{item.statusMessage}"
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[15px] font-black text-headingColor">₹{item.ticketPrice}</div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500 animate-pulse'}`}>
                          {item.paymentStatus === 'paid' ? 'Verified' : 'Unconfirmed'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[14px] font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
                          {item.bookingToken}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[12px] text-gray-400 font-bold">
                        {formatDate(item.createdAt)}
                        <div className="flex flex-col gap-2 mt-2">
                            <button 
                                onClick={() => setExpandedBooking(expandedBooking === item._id ? null : item._id)}
                                className="text-primaryColor font-black uppercase text-[10px] hover:underline"
                            >
                                {expandedBooking === item._id ? 'Hide Flux' : 'View Journey'}
                            </button>
                            
                            {(item.status === 'REQUESTED' || item.status === 'confirmed') && (
                                <button 
                                    onClick={async () => {
                                        if(window.confirm('Are you sure you want to drop out? This cannot be undone.')){
                                            await fetch(`${BASE_URL}/bookings/${item._id}/cancel`, { 
                                                method: 'PUT',
                                                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                                            });
                                            window.location.reload();
                                        }
                                    }}
                                    className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    Cancel Visit
                                </button>
                            )}
                            
                             {item.status === 'completed' && (
                                <button 
                                    onClick={() => alert("Review popup would trigger here! Handled by Review widget.")}
                                    className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white shadow-xl shadow-amber-500/20 animate-pulse transition-colors"
                                >
                                    ⭐ Leave a Review
                                </button>
                            )}

                            {item.appointmentType === 'teleconsult' && item.status === 'confirmed' && (
                                <button 
                                    onClick={() => window.open(`/tele-consult-ai?call=${item._id}`, '_blank')}
                                    className="px-2 py-2 bg-rose-600 text-white border border-rose-500 rounded text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 shadow-lg shadow-rose-600/30 animate-pulse transition-colors flex items-center justify-center gap-2"
                                >
                                    🚀 JOIN NEURAL LINK
                                </button>
                            )}
                        </div>
                      </td>
                    </tr>
                    {expandedBooking === item._id && (
                      <tr>
                        <td colSpan="5" className="px-10 py-6 bg-slate-50/30">
                          <PatientJourneyTimeline journey={item.journeyTimeline} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {appointments?.length === 0 && (
              <div className="text-center py-20 bg-slate-50/50 rounded-3xl mt-4 border-2 border-dashed border-slate-100">
                <p className="text-gray-400 font-bold">No biological synchronization found. Initialize a booking to start.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );

};

export default MyBookings;
