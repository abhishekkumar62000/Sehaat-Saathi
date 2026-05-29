import { useState, useEffect } from "react";
import { BsPeopleFill, BsPersonCheckFill, BsFillPlayCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Shared/Loading";
import { toast } from "react-toastify";
import io from "socket.io-client";

const QueueManager = ({ hospitalId }) => {
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BASE_URL.replace("/api/v1", ""));
    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("JOIN_ROOM", hospitalId);
    });

    newSocket.on("QUEUE_SYNC", (data) => {
      toast.info(`Queue Update: ${data.patientName || 'A patient'} ${data.type}`);
      // Refresh logic here or via state update
    });

    return () => newSocket.disconnect();
  }, [hospitalId]);

  const updateStatus = async (bookingId, status) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success("Queue Synced!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-headingColor flex items-center gap-3">
          <BsPeopleFill className="text-primaryColor" /> Live Clinic Queue
        </h2>
        <div className="bg-indigo-50 text-primaryColor font-bold px-4 py-2 rounded-xl text-sm border border-indigo-100">
          Neural Flux: Active Sync
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Total Patients</p>
          <h3 className="text-4xl font-black mt-2">12</h3>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-3xl text-white shadow-xl shadow-orange-100">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Currently Waiting</p>
          <h3 className="text-4xl font-black mt-2">5</h3>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl text-white shadow-xl shadow-green-100">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Consulations Completed</p>
          <h3 className="text-4xl font-black mt-2">7</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Token #</th>
              <th className="px-6 py-4">Patient Identity</th>
              <th className="px-6 py-4">Status Flux</th>
              <th className="px-6 py-4">Pulse Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[101, 102, 103].map((token) => (
              <tr key={token} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-4 font-black text-indigo-600">#{token}</td>
                <td className="px-6 py-4 font-bold text-headingColor">Rahul Kumar</td>
                <td className="px-6 py-4">
                  <span className="bg-orange-100 text-orange-700 text-[10px] uppercase font-black px-3 py-1 rounded-full border border-orange-200">Waiting</span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-primaryColor hover:text-white transition-all"><BsPersonCheckFill /></button>
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"><BsFillPlayCircleFill /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loading && <Loading />}
    </div>
  );
};

export default QueueManager;
