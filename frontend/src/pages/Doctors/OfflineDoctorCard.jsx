import React from 'react';
import { BsStarFill, BsHospital, BsGeoAltFill, BsClockFill, BsActivity, BsCalendarCheck } from 'react-icons/bs';
import { MdVerifiedUser } from 'react-icons/md';

const OfflineDoctorCard = ({ doc, liveQueueData, crowdDelay, onBookNow, onViewDetails }) => {
    const queueNumber = liveQueueData[doc.id] || 0;
    const waitTime = (queueNumber * 12) + (crowdDelay ? 15 : 0);

    return (
        <div className="group bg-white border border-slate-100 hover:border-indigo-500/20 rounded-[2.5rem] p-6 transition-all duration-500 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] flex flex-col h-full hover:-translate-y-1.5">
            {/* Ambient Background Glow on Hover */}
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500"></div>
            <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

            {/* Top Elite Badge */}
            {doc.trustScore >= 95 && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 text-[8px] font-black uppercase tracking-wider shadow-sm">
                        ✨ Elite Provider
                    </span>
                </div>
            )}

            {/* Main Header / Info */}
            <div className="flex items-start gap-4 mb-6 mt-2 relative z-10">
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-md group-hover:border-indigo-500/30 transition-colors duration-500">
                        <img 
                            src={doc.photo} 
                            alt={doc.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            loading="lazy" 
                        />
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full px-2.5 py-0.5 text-[8px] font-black flex items-center gap-1 shadow-md border border-slate-800">
                        <BsStarFill className="text-amber-400 text-[9px]" /> {doc.rating || "4.5"}
                    </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-1">
                        <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                            {doc.name}
                        </h3>
                        <MdVerifiedUser className="text-blue-500 text-sm flex-shrink-0" />
                    </div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mb-2">{doc.degree || "MBBS"}</p>

                    <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-50 text-[8px] font-bold uppercase text-slate-500 rounded border border-slate-100">{doc.specialty}</span>
                        <span className="px-2 py-0.5 bg-indigo-50/50 text-[8px] font-bold uppercase text-indigo-600 rounded border border-indigo-500/10">{doc.experience}</span>
                    </div>
                </div>
            </div>

            {/* Smart Live Queue Indicator Card */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 mb-6 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 tracking-wider">
                    <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${queueNumber > 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></span>
                        Queue status
                    </span>
                    <span className="flex items-center gap-1">
                        <BsClockFill className="text-indigo-500 text-[10px]" />
                        Est. Wait
                    </span>
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800">{queueNumber > 0 ? `${queueNumber} Patients` : "Empty Queue"}</span>
                        <span className="text-[7px] font-black uppercase text-slate-400">Current Queue Size</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-slate-800">{queueNumber > 0 ? `${waitTime} Mins` : "Immediate"}</span>
                        <span className="text-[7px] font-black uppercase text-slate-400">Predicted Delay</span>
                    </div>
                </div>

                {/* Queue Progress Bar */}
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${
                        queueNumber <= 2 ? 'w-[25%] bg-emerald-500' :
                        queueNumber <= 5 ? 'w-[60%] bg-amber-500' :
                        'w-[90%] bg-rose-500'
                    }`}></div>
                </div>
            </div>

            {/* Location & Hospital */}
            <div className="flex items-center gap-3.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-indigo-500 group-hover:bg-indigo-50/30 transition-all duration-300">
                    <BsHospital className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-slate-700 truncate">{doc.hospital}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                        <BsGeoAltFill className="text-slate-400" /> {doc.area || doc.district}
                    </div>
                </div>
            </div>

            {/* Footer Fee & CTAs */}
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Consultation Fee</span>
                    <span className="text-lg font-black text-slate-800">₹{doc.fee === 0 ? "FREE" : doc.fee}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onViewDetails(doc)}
                        className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-500/20 transition-all duration-300"
                        title="View Doctor Details"
                    >
                        <BsActivity className="text-sm" />
                    </button>
                    <button
                        onClick={() => onBookNow(doc)}
                        className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-wider text-[9px] hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95 flex items-center gap-1.5"
                    >
                        Book Now <BsCalendarCheck />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineDoctorCard;
