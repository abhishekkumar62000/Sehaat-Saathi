import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import { BsActivity, BsCheckCircleFill, BsClockHistory, BsXCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Loading from "../../components/Shared/Loading";

const WorkflowPanel = ({ appointments, doctorId }) => {
  const [loading, setLoading] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  const handleStatusUpdate = async (bookingId, status, message = "") => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, message }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(`Success: ${status}`);
      // Refresh local state if needed (or parent will refresh on tab toggle)
      window.location.reload(); 
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-50 rounded-xl">
          <BsActivity className="w-6 h-6 text-primaryColor animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-black text-headingColor">Clinical Workflow Panel</h2>
          <p className="text-sm text-textColor italic">Sehaat Saathi v2.0 — Neural Flux Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Queue / Active Appointments */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <BsClockHistory className="text-orange-500" /> Active Queue
          </h3>
          {appointments?.filter(b => b.status !== "completed" && b.status !== "rejected").map((item) => (
            <div 
              key={item._id} 
              onClick={() => setActiveBooking(item)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${activeBooking?._id === item._id ? 'border-primaryColor bg-indigo-50/30' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img src={item.user?.photo} alt="" className="w-10 h-10 rounded-full border border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-headingColor">{item.user?.name}</h4>
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      item.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      item.status === 'PATIENT_ARRIVED' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500">{item.appointmentDate}</p>
                  <p className="text-xs text-slate-400">{item.appointmentTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Actions & Journey */}
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 min-h-[400px]">
          {activeBooking ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xl text-headingColor">Manage Patient</h3>
                <span className="text-xs text-primaryColor font-bold">Token #{activeBooking.queueNumber || 'N/A'}</span>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-3">
                {activeBooking.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(activeBooking._id, 'confirmed')}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition-all font-bold text-sm shadow-lg shadow-green-100"
                    >
                      <BsCheckCircleFill /> Accept
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(activeBooking._id, 'rejected')}
                      className="flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-all font-bold text-sm shadow-lg shadow-red-100"
                    >
                      <BsXCircleFill /> Reject
                    </button>
                  </>
                )}

                {activeBooking.status === 'confirmed' && (
                  <button 
                    onClick={() => handleStatusUpdate(activeBooking._id, 'PATIENT_ARRIVED')}
                    className="col-span-2 flex items-center justify-center gap-2 bg-primaryColor text-white p-4 rounded-xl hover:opacity-90 transition-all font-bold text-sm shadow-xl shadow-indigo-100 animate-pulse"
                  >
                    <BsActivity /> Patient Arrived
                  </button>
                )}

                {activeBooking.status === 'PATIENT_ARRIVED' && (
                  <button 
                    onClick={() => handleStatusUpdate(activeBooking._id, 'CONSULTATION_STARTED')}
                    className="col-span-2 flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition-all font-bold text-sm shadow-xl shadow-indigo-100"
                  >
                    <BsActivity /> Start Consultation
                  </button>
                )}

                {activeBooking.status === 'CONSULTATION_STARTED' && (
                  <button 
                    onClick={() => handleStatusUpdate(activeBooking._id, 'completed')}
                    className="col-span-2 flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-all font-bold text-sm shadow-xl shadow-green-100"
                  >
                    <BsCheckCircleFill /> Mark Completed
                  </button>
                )}
              </div>

              {/* Journey Mini-Timeline */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="font-bold text-headingColor mb-4">Patient Journey</h4>
                <div className="space-y-4">
                  {activeBooking.journeyTimeline?.map((evt, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="mt-1">
                        <BsArrowRightCircleFill className="text-primaryColor w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 leading-none">{evt.status}</p>
                        <p className="text-[10px] text-slate-400">{new Date(evt.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 items-start opacity-30">
                    <div className="mt-1 border-2 border-slate-300 w-3 h-3 rounded-full"></div>
                    <p className="text-sm font-bold text-slate-400">Next Stage Pending...</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-50">
              <BsActivity className="w-16 h-16 text-slate-200 mb-4" />
              <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Waiting for Neural Select</p>
              <p className="text-xs text-slate-300 mt-2">Pick an appointment from the queue to start clinical sync.</p>
            </div>
          )}
        </div>
      </div>
      
      {loading && <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center"><Loading /></div>}
    </div>
  );
};

export default WorkflowPanel;
