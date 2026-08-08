import React from 'react';
import { 
    BsXCircleFill, BsStarFill, BsHospital, BsGeoAltFill, 
    BsHeartPulseFill, BsCardChecklist, BsBookmarkStarFill, 
    BsPeopleFill, BsCurrencyRupee
} from 'react-icons/bs';
import { 
    BsArrowRight, BsCheckCircleFill, BsXCircle,
    BsArrowRightCircleFill, BsInfoCircleFill,
    BsCalendarEventFill
} from 'react-icons/bs';
import LiveAvailabilityTimetable from '../../components/DoctorDetails/LiveAvailabilityTimetable';

const DoctorDetailsModal = ({ doc, onClose }) => {
    if (!doc) return null;

    if (doc.isHospitalNode) {
        const capacity = doc.capacityDetails || {};
        const icuBeds = capacity.icu || { total: 10, available: 3 };
        const generalBeds = capacity.generalWard || { total: 50, available: 15 };
        const oxygenBeds = capacity.oxygenBeds || { total: 20, available: 8 };
        const ventilators = capacity.ventilators || { total: 5, available: 2 };

        return (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <div onClick={onClose} className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"></div>
                <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 text-white rounded-[3rem] p-8 lg:p-12 overflow-y-auto max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300">
                    
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 text-3xl transition-colors">
                        <BsXCircleFill />
                    </button>

                    {/* Hospital Banner Info */}
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                        <div className="w-full md:w-1/3">
                            <img src={doc.photo} alt={doc.name} className="w-full h-48 md:h-auto rounded-[2rem] object-cover shadow-lg border-4 border-slate-700" loading="lazy" />
                            <div className="mt-4 p-4 bg-slate-950/40 rounded-2xl border border-slate-800 flex items-center gap-4">
                                <BsStarFill className="text-yellow-400 text-2xl" />
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Hospital Rating</div>
                                    <div className="text-lg font-bold text-white">{doc.rating || "5.0"} / 5.0</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 space-y-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 text-[10px] font-black uppercase rounded-full mb-2 tracking-wider">
                                    <BsHospital /> Registered Hospital Node
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">{doc.name}</h2>
                                <p className="text-sm font-bold text-slate-400 mt-1 flex items-center gap-1.5">
                                    <BsGeoAltFill className="text-red-400" /> {doc.address || `${doc.area}, ${doc.district}`}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest border-b border-slate-800 pb-2">About Facility</h3>
                                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                    {doc.bio || `${doc.name} is a premier healthcare facility committed to delivering top-tier clinical care. Equipped with state-of-the-art diagnostic and inpatient service capacities to serve the community.`}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-800 flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${doc.acceptsEmergency ? "bg-emerald-500 animate-pulse" : "bg-slate-600"}`}></span>
                                    <div className="text-[10px] font-bold text-slate-400">Emergency Support: <span className="text-white font-black block">{doc.acceptsEmergency ? "24x7 Active" : "In-hours only"}</span></div>
                                </div>
                                <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-800 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                    <div className="text-[10px] font-bold text-slate-400">Ayushman Bharat: <span className="text-white font-black block">{doc.acceptsAyushmanBharat ? "Accepted (PMJAY)" : "Not Active"}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bed Capacity Matrix Section */}
                    <div className="mb-8">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                            <BsHeartPulseFill className="text-red-500" /> Live Bed & Capacity Matrix
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-950/50 rounded-2xl border border-cyan-500/20">
                                <div className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">ICU Beds</div>
                                <div className="text-2xl font-black text-white">
                                    {icuBeds.available || 0}
                                    <span className="text-xs text-slate-500">/{icuBeds.total || 0}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-950/50 rounded-2xl border border-emerald-500/20">
                                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">General Beds</div>
                                <div className="text-2xl font-black text-white">
                                    {generalBeds.available || 0}
                                    <span className="text-xs text-slate-500">/{generalBeds.total || 0}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-950/50 rounded-2xl border border-amber-500/20">
                                <div className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Oxygen Beds</div>
                                <div className="text-2xl font-black text-white">
                                    {oxygenBeds.available || 0}
                                    <span className="text-xs text-slate-500">/{oxygenBeds.total || 0}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-950/50 rounded-2xl border border-purple-500/20">
                                <div className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Ventilators</div>
                                <div className="text-2xl font-black text-white">
                                    {ventilators.available || 0}
                                    <span className="text-xs text-slate-500">/{ventilators.total || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* On-Site Doctor & Specialist Team Roster */}
                    <div className="mb-8">
                        <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                            <BsPeopleFill className="text-indigo-400" /> On-Site Doctor & Specialist Team Roster
                        </h3>
                        {doc.doctorRoster && doc.doctorRoster.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doc.doctorRoster.map((rosterDoc, idx) => (
                                    <div key={idx} className="p-4 bg-slate-950/40 rounded-3xl border border-slate-800 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                                            {rosterDoc.name ? rosterDoc.name[0] || "D" : "D"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h4 className="font-bold text-white text-sm truncate">{rosterDoc.name}</h4>
                                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${rosterDoc.isAvailable ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                                                    {rosterDoc.isAvailable ? "🟢 Available" : "🔴 On Leave"}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{rosterDoc.specialization} ({rosterDoc.qualification || "MD"})</p>
                                            
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-[9px] text-slate-500">
                                                <div>
                                                    <span className="font-black text-slate-400 block uppercase">OPD Days</span>
                                                    {rosterDoc.opdDays || "Mon - Sat"}
                                                </div>
                                                <div>
                                                    <span className="font-black text-slate-400 block uppercase">OPD Timing</span>
                                                    {rosterDoc.opdTime || "10:00 AM - 4:00 PM"}
                                                </div>
                                            </div>

                                            <div className="mt-1.5 pt-1.5 border-t border-slate-900/60 flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-slate-500">Consultation Fee</span>
                                                <span className="text-xs font-black text-white flex items-center"><BsCurrencyRupee className="inline text-[9px]" />{rosterDoc.fee || 300}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 bg-slate-950/20 border border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs font-medium">
                                No doctor roster entries recorded for this facility yet.
                            </div>
                        )}
                    </div>

                    {/* Live OPD Timings, Facilities & Insurance Partners */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Live OPD Timings */}
                        <div className="space-y-3">
                            <LiveAvailabilityTimetable 
                                doctorId={doc.id || doc._id} 
                                initialAvailability={doc.availability || []} 
                                initialHolidays={doc.unavailabilityDates || []} 
                            />
                        </div>

                        {/* Facilities & Insurance */}
                        <div className="space-y-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                                    <BsCardChecklist className="text-emerald-400" /> In-House Facilities & Services
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {doc.inHouseFacilities && doc.inHouseFacilities.length > 0 ? doc.inHouseFacilities.map((fac, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-slate-950/50 border border-slate-800 rounded-xl text-[10px] font-bold text-slate-300">
                                            ✓ {fac}
                                        </span>
                                    )) : (
                                        <span className="text-xs text-slate-500 font-medium">Emergency, Outpatient Department (OPD), Clinical Laboratory</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                                    <BsBookmarkStarFill className="text-amber-400" /> Cashless Insurance Partners
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {doc.insurancePartners && doc.insurancePartners.length > 0 ? doc.insurancePartners.map((ins, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-slate-950/50 border border-slate-800 rounded-xl text-[10px] font-bold text-slate-300">
                                            🛡️ {ins}
                                        </span>
                                    )) : (
                                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl">
                                            Ayushman Bharat Card (PMJAY) Only
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                            <LiveAvailabilityTimetable 
                                doctorId={doc.id || doc._id} 
                                initialAvailability={doc.availability} 
                                initialHolidays={doc.unavailabilityDates} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailsModal;
