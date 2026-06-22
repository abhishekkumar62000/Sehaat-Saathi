import { useState, useEffect, useContext } from "react";
import { BsCheckCircleFill, BsXCircleFill, BsHourglassSplit, BsFileEarmarkMedicalFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/doctors/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setPendingDoctors(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (doctorId, action) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/doctor/${doctorId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      
      toast.success(result.message);
      // Remove approved/rejected doctor from local state
      setPendingDoctors(prev => prev.filter(doc => doc._id !== doctorId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-headingColor tracking-tight">System Command Center</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">v4.0 Provider Verification Engine</p>
        </div>

        {loading && <Loading />}
        {error && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 bg-indigo-600 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BsHourglassSplit className="animate-spin-slow" /> Pending Verifications
              </h2>
              <span className="bg-white/20 px-4 py-1 rounded-full text-white font-black">{pendingDoctors.length} Action Required</span>
            </div>

            <div className="p-6">
              {pendingDoctors.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                  <BsCheckCircleFill className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <p className="text-xl font-black text-slate-700">All Clear</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">No Pending Interventions</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingDoctors.map(doctor => (
                    <div key={doctor._id} className="p-6 border-2 border-slate-100 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-indigo-100 transition-all bg-slate-50/50">
                      
                      {/* Doctor Info */}
                      <div className="flex gap-4 items-center">
                        <img src={doctor.photo || 'default-avatar-url'} alt="Profile" className="w-16 h-16 rounded-2xl shadow-sm object-cover bg-white"  loading="lazy" />
                        <div>
                          <h3 className="text-lg font-black text-headingColor leading-none">{doctor.name}</h3>
                          <p className="text-sm font-bold text-indigo-600 mt-1">{doctor.specialization}</p>
                          <p className="text-xs text-slate-500 font-medium">License: {doctor.licenseNumber || 'Not Provided'}</p>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="flex-1 max-w-[300px]">
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Uploaded Documents</p>
                        {(!doctor.verificationDocuments || doctor.verificationDocuments.length === 0) ? (
                          <span className="text-xs font-bold text-red-500">Missing Evidence</span>
                        ) : (
                          <div className="flex gap-2 flex-wrap">
                            {doctor.verificationDocuments.map((doc, idx) => (
                              <a href={doc} target="_blank" rel="noreferrer" key={idx} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all">
                                <BsFileEarmarkMedicalFill /> Doc #{idx+1}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button 
                          onClick={() => handleVerification(doctor._id, 'approved')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-green-100 transition-all text-sm uppercase tracking-widest"
                        >
                          <BsCheckCircleFill /> Verify & Publish
                        </button>
                        <button 
                          onClick={() => handleVerification(doctor._id, 'rejected')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-black px-4 py-3 rounded-xl transition-all text-sm uppercase tracking-widest"
                        >
                          <BsXCircleFill />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
