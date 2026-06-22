import { formatDate } from "../../utils/formatDate";

const HospitalAppointments = ({ bookings }) => {
    return (
        <section>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black text-headingColor tracking-tight">
                    Hospital Sync Monitor
                    <span className="ml-3 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                        {bookings?.length || 0} Synced Events
                    </span>
                </h1>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-[12px] text-slate-400 font-black uppercase tracking-[0.2em] border-b border-slate-100">
                            <th className="px-6 py-4">Patient Node</th>
                            <th className="px-6 py-4">Linked Doctor</th>
                            <th className="px-6 py-4">Sync Status</th>
                            <th className="px-6 py-4">Neural Stamp</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {bookings?.map((item) => (
                            <tr key={item._id} className="hover:bg-slate-50/50 transition-all group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <figure className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                                            <img src={item.user?.photo} alt="" className="w-full h-full object-cover"  loading="lazy" />
                                        </figure>
                                        <div>
                                            <div className="text-[15px] font-black text-headingColor tracking-tight">
                                                {item.user?.name}
                                            </div>
                                            <p className="text-[12px] text-slate-400 font-medium">
                                                {item.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="text-[14px] font-black text-indigo-600 uppercase tracking-wider">
                                            Dr. {item.doctor?.name}
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-medium italic">
                                            {item.doctor?.specialization}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                                        item.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                        item.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 
                                        item.status === 'auto_cancelled' ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'confirmed' ? 'bg-emerald-500' : 'bg-orange-500 animate-pulse'}`}></div>
                                        {item.status.replace('_', ' ')}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="text-[13px] text-slate-500 font-bold">
                                        {formatDate(item.createdAt)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {(!bookings || bookings.length === 0) && (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl mt-4 border-2 border-dashed border-slate-100">
                    <p className="text-slate-400 font-black uppercase tracking-widest opacity-50">
                        No synchronization detected in this sector.
                    </p>
                </div>
            )}
        </section>
    );
};

export default HospitalAppointments;
