import React from 'react';
import { BsArrowRight, BsCheckCircleFill, BsStarFill, BsGeoAltFill, BsHospital, BsXCircleFill } from 'react-icons/bs';

const DoctorDetailsModal = ({ doc, onClose }) => {
    if (!doc) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-12 overflow-y-auto max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 text-3xl transition-colors">
                    <BsXCircleFill />
                </button>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3">
                        <img src={doc.photo} alt={doc.name} className="w-full h-auto rounded-[2rem] object-cover shadow-lg border-4 border-slate-100"  loading="lazy" />
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-4 border border-orange-100">
                                <BsStarFill className="text-orange-500 text-2xl" />
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-orange-400">Rating</div>
                                    <div className="text-xl font-bold text-slate-800">{doc.rating} / 5.0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-2/3 space-y-6">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900">{doc.name}</h2>
                            <p className="text-lg font-bold text-slate-500">{doc.degree} - {doc.specialty}</p>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-black uppercase rounded-lg mt-2 tracking-wide border border-green-200">
                                Registration: {doc.registration || "Verified Medical Council"}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">Full Bio</h3>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                {doc.about || doc.bio || `${doc.name} is a highly experienced ${doc.specialty} with over ${doc.experience} of clinical practice. Recognized for outstanding patient care at ${doc.hospital}.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2"><BsHospital className="text-indigo-500"/> Hospital</div>
                                <div className="text-sm font-bold text-slate-800">{doc.hospital}</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 flex items-center gap-2"><BsGeoAltFill className="text-red-500"/> Location</div>
                                <div className="text-sm font-bold text-slate-800">{doc.area}, {doc.district}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2">OPD Timings</h3>
                            <div className="flex gap-2 flex-wrap">
                                {['10:00 AM - 1:00 PM', '4:00 PM - 8:00 PM'].map((time, i) => (
                                    <span key={i} className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wide">{time}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsModal;
