import React from 'react';
import { BsStarFill, BsHospital, BsGeoAltFill, BsClockFill, BsActivity, BsCalendarCheck } from 'react-icons/bs';
import { MdVerifiedUser } from 'react-icons/md';

const OfflineDoctorCard = ({ doc, liveQueueData, crowdDelay, onBookNow, onViewDetails }) => {
    return (
        <div className="group bg-white/70 backdrop-blur-2xl hover:bg-white border border-white/60 hover:border-[#FF9933]/30 rounded-[3rem] p-8 transition-all duration-500 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#FF9933]/10 flex flex-col h-full hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] -translate-y-full group-hover:animate-scan z-20"></div>

            {doc.trustScore >= 95 && (
                <div className="absolute top-0 right-0 z-20">
                    <div className="px-6 py-2 rounded-bl-[2rem] bg-gradient-to-l from-[#FF9933] via-white to-[#138808] text-[8px] font-black uppercase tracking-[0.2em] shadow-md text-[#000080]">
                        Elite Provider
                    </div>
                </div>
            )}

            <div className="flex items-start gap-6 mb-8 mt-4 relative z-10">
                <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#FF9933] rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                    <img src={doc.photo} alt={doc.name} className="w-24 h-24 rounded-[2rem] object-cover grayscale transition-all duration-700 group-hover:grayscale-0 border-2 border-white shadow-lg" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full px-3 py-1 text-[9px] font-black flex items-center gap-1 shadow-lg z-20">
                        <BsStarFill className="text-yellow-400 text-[10px]" /> {doc.rating}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-[#FF9933] transition-colors truncate">
                        {doc.name}
                        <MdVerifiedUser className="inline-block ml-2 text-blue-500 text-lg align-top" />
                    </h3>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 truncate">{doc.degree}</p>

                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase text-slate-600 border border-slate-200">{doc.specialty}</span>
                        <span className="px-3 py-1 bg-[#000080]/5 rounded-lg text-[8px] font-black uppercase text-[#000080] border border-[#000080]/10">{doc.experience}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8 bg-slate-50/50 p-4 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></div>
                    <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Queue: <span className="text-slate-900 text-xs">{liveQueueData[doc.id] || 'N/A'}</span></div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <BsClockFill className="text-blue-500 text-xs" />
                    <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Wait: <span className="text-slate-900 text-xs">{((liveQueueData[doc.id] || 1) * 12) + (crowdDelay ? 15 : 0)}m</span></div>
                </div>
                <div className="col-span-2 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${doc.rushStatus === 'Low' ? 'w-[20%] bg-[#138808]' : doc.rushStatus === 'Medium' ? 'w-[60%] bg-[#FF9933]' : 'w-[90%] bg-red-500'}`}></div>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#FF9933] shadow-sm">
                    <BsHospital />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-black text-slate-800 truncate">{doc.hospital}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <BsGeoAltFill className="text-[#138808]" /> {doc.area || doc.district}
                    </div>
                </div>
            </div>

            <div className="mt-auto flex items-center gap-3">
                <div className="flex flex-col pr-4 border-r border-slate-200">
                    <span className="text-2xl font-black text-slate-900">₹{doc.fee === 0 ? "FREE" : doc.fee}</span>
                    <span className="text-[7px] font-black uppercase text-slate-400 tracking-widest">Fee</span>
                </div>
                <div className="flex gap-2 flex-grow">
                    <button
                        onClick={() => onViewDetails(doc)}
                        className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                        title="View Details"
                    >
                        <BsActivity className="text-blue-500 text-lg" />
                    </button>
                    <button
                        onClick={() => onBookNow(doc)}
                        className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 active:scale-95"
                    >
                        Book Now <BsCalendarCheck />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineDoctorCard;
