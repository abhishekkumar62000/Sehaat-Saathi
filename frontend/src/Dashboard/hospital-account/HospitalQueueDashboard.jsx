import React, { useState, useEffect } from 'react';
import { BsListUl, BsCheckCircleFill, BsPlayCircleFill } from 'react-icons/bs';
import { BASE_URL, token } from '../../config';

const HospitalQueueDashboard = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchQueue = async () => {
        try {
            const res = await fetch(`${BASE_URL}/hospitals/queue`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setQueue(data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
        
        // Listen to socket if implemented globally
        // socket.on("queue:update", () => fetchQueue());
    }, []);

    const updateStatus = async (id, status) => {
        try {
            // We alias this to the booking status endpoint
            await fetch(`${BASE_URL}/bookings/${id}/status`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            fetchQueue();
        } catch (err) {
            console.error(err);
        }
    };
    const triggerDelay = async () => {
        try {
            await fetch(`${BASE_URL}/hospitals/queue/delay`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minutes: 30 })
            });
            alert("Emergency Delay Broadcasted (30 Mins Addded)");
            fetchQueue();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BsListUl className="text-2xl" /></div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter">Live Queue Dashboard</h2>
                        <p className="text-slate-500 text-sm">Managing offline consultations and real-time waiting list</p>
                    </div>
                </div>
                <button 
                    onClick={triggerDelay}
                    className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                    🚨 Notify Delay (Add 30 Mins)
                </button>
            </div>

            {loading ? (
                <div className="text-center p-12 text-slate-400">Loading live queue...</div>
            ) : queue.length === 0 ? (
                <div className="text-center p-12 py-24 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No offline bookings in queue today.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Token</th>
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Patient</th>
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest hidden md:table-cell">Doctor</th>
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Time Slot</th>
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Status / ETA</th>
                                <th className="p-4 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queue.map((item, idx) => (
                                <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-center">
                                        <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-black tracking-wider">
                                            {item.tokenNumber}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-slate-800 text-sm">{item.user?.name || "Patient"}</div>
                                        <div className="text-[10px] text-slate-400 capitalize">{item.consultationType}</div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="font-bold text-slate-700 text-sm">{item.doctor?.name}</div>
                                    </td>
                                    <td className="p-4 font-bold text-slate-600 text-xs">
                                        {item.appointmentTime}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs font-black uppercase tracking-wider mb-1">
                                            {item.status === 'REQUESTED' || item.status === 'confirmed' ? (
                                                <span className="text-blue-500">Waiting</span>
                                            ) : item.status === 'CONSULTATION_STARTED' ? (
                                                <span className="text-orange-500">In Progress</span>
                                            ) : item.status === 'completed' ? (
                                                <span className="text-green-500">Completed</span>
                                            ) : (
                                                <span className="text-slate-500">{item.status}</span>
                                            )}
                                        </div>
                                        <div className="text-[10px] text-slate-400">ETA: {item.estimatedWaitTime} mins</div>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        {item.patientReports && item.patientReports.length > 0 && (
                                            <a 
                                                href={item.patientReports[0]}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors mr-2 cursor-pointer"
                                            >
                                                View Reports
                                            </a>
                                        )}
                                        {item.status !== 'completed' && item.status !== 'CONSULTATION_STARTED' && (
                                            <button 
                                                onClick={() => updateStatus(item._id, 'CONSULTATION_STARTED')}
                                                className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 active:scale-95"
                                            >
                                                Start
                                            </button>
                                        )}
                                        {item.status === 'CONSULTATION_STARTED' && (
                                            <button 
                                                onClick={() => updateStatus(item._id, 'completed')}
                                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-green-600 active:scale-95"
                                            >
                                                Complete <BsCheckCircleFill className="inline ml-1" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HospitalQueueDashboard;
