import React, { useState, useEffect, useCallback } from 'react';
import { BsCalendarCheck, BsCheckCircleFill, BsXCircleFill, BsCloudArrowUp, BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';

const BookingWizard = ({ doc, onClose, onSuccess }) => {
    const { socket } = useSocket();
    const [step, setStep] = useState(1);
    const [type, setType] = useState('First Visit');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [patientName, setPatientName] = useState(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user?.name || '';
        } catch {
            return '';
        }
    });
    const [paymentMethod, setPaymentMethod] = useState('Online Payment');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [reportURL, setReportURL] = useState('');
    const [uploadingReport, setUploadingReport] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const startStopDictation = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Voice Dictation natively.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Indian accent optimized
        recognition.continuous = false;
        
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSymptoms(prev => prev ? prev + ". " + transcript : transcript);
                setIsListening(false);
            };
            recognition.onerror = (e) => {
                console.error(e);
                setIsListening(false);
            };
            recognition.onend = () => setIsListening(false);
        }
    };

    const fetchSlots = useCallback(() => {
        if (date && doc) {
            setLoadingSlots(true);
            fetch(`${BASE_URL}/bookings/available-slots/${doc.id || doc._id}?date=${date}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setAvailableSlots(data.data);
                } else {
                    setAvailableSlots([]); 
                }
                setLoadingSlots(false);
            })
            .catch(() => {
                setAvailableSlots([]);
                setLoadingSlots(false);
            });
        }
    }, [date, doc]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    useEffect(() => {
        if (!socket) return;
        
        const handleAvailabilityUpdate = (data) => {
            if (data.doctorId === (doc.id || doc._id)) {
                toast.info(`⚡ Dr. ${doc.name} just updated their schedule!`);
                fetchSlots(); // Refresh slots instantly
            }
        };

        socket.on("doctor-availability-updated", handleAvailabilityUpdate);

        return () => {
            socket.off("doctor-availability-updated", handleAvailabilityUpdate);
        };
    }, [socket, doc, fetchSlots]);

    const handleConfirm = () => {
        // Prepare data
        const payload = {
            doctorId: doc.id || doc._id,
            amount: doc.fee,
            consultationType: type,
            date,
            timeSlot,
            symptoms,
            patientName,
            paymentMethod,
            patientReports: reportURL ? [reportURL] : []
        };
        onSuccess(payload);
    };

    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
            
            <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-[2.5rem] p-5 md:p-8 lg:p-12 overflow-y-auto max-h-[90vh] shadow-2xl flex flex-col md:flex-row gap-6 md:gap-8 animate-in zoom-in-95 duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-2xl transition-colors z-10">
                    <BsXCircleFill />
                </button>

                {/* Left panel - Info */}
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-8 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <img src={doc.photo} alt={doc.name} className="w-16 h-16 md:w-24 md:h-24 rounded-2xl object-cover mb-0 md:mb-4 flex-shrink-0"  loading="lazy" />
                    <div className="min-w-0 flex-grow md:flex-grow-0">
                        <h3 className="text-base md:text-xl font-black text-slate-900 uppercase truncate">{doc.name}</h3>
                        <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase truncate">{doc.specialty}</p>
                    </div>

                    <div className="hidden md:block mt-8 space-y-4 w-full">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold uppercase">Consultation Fee</span>
                            <span className="text-slate-900 font-black">₹{doc.fee === 0 ? "FREE" : doc.fee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold uppercase">Hospital</span>
                            <span className="text-slate-900 font-black text-right">{doc.hospital}</span>
                        </div>
                    </div>
                </div>

                {/* Right panel - Wizard */}
                <div className="w-full md:w-2/3 flex flex-col">
                    <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-full">
                        {[1, 2, 3, 4, 5].map(idx => (
                            <div key={idx} className={`flex-1 h-2 rounded-full transition-all ${idx <= step ? 'bg-orange-500' : 'bg-slate-300'}`}></div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-[50vh] pr-4 custom-scrollbar">
                        {step === 1 && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                
                                <div className="mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                    <h4 className="text-[12px] font-black uppercase tracking-widest text-orange-600 mb-2">Patient's Full Name</h4>
                                    <p className="text-[10px] font-medium text-orange-800 mb-3 opacity-80 leading-snug">Who is this consultation for? You can edit the name if booking for a family member or friend.</p>
                                    <input 
                                        type="text" 
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder="Enter patient name..."
                                        className="w-full p-4 rounded-xl border border-orange-200 focus:outline-none focus:border-orange-500 font-bold text-slate-800 shadow-inner"
                                    />
                                </div>

                                <h4 className="text-lg font-black uppercase tracking-widest text-slate-800 mb-4">Select Consultation Type</h4>
                                {['First Visit', 'Follow-up', 'Emergency'].map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`w-full py-4 px-6 rounded-2xl border text-left font-bold ${type === t ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 hover:border-slate-300'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <h4 className="text-lg font-black uppercase tracking-widest text-slate-800 mb-6">Select Date</h4>
                                <input 
                                    type="date" 
                                    min={new Date().toISOString().split('T')[0]}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <h4 className="text-lg font-black uppercase tracking-widest text-slate-800 mb-6">Select Time Slot</h4>
                                {loadingSlots ? <p>Loading slots...</p> : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {availableSlots.length > 0 ? availableSlots.map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => setTimeSlot(t)}
                                                className={`py-3.5 rounded-2xl border font-bold text-sm flex flex-col items-center justify-center gap-1 transition-all ${timeSlot === t ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md transform scale-[1.02]' : 'border-slate-200 hover:border-slate-300'}`}
                                            >
                                                <span>{t}</span>
                                                {t.includes('AM') || (t.includes('PM') && ['12', '01', '1'].some(h => t.startsWith(h))) ? (
                                                    <span className="text-[8px] text-red-500 bg-red-50 px-2 rounded-full font-black uppercase tracking-widest">🔥 High Traffic</span>
                                                ) : (
                                                    <span className="text-[8px] text-green-600 bg-green-50 px-2 rounded-full font-black uppercase tracking-widest">🟢 Fast Track</span>
                                                )}
                                            </button>
                                        )) : <p className="col-span-full text-center text-slate-400 font-bold py-8">No slots available for this date.</p>}
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <div className="flex justify-between items-end mb-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Patient Symptoms</h4>
                                    <button 
                                        onClick={startStopDictation}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                                            isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                    >
                                        {isListening ? <><BsMicFill /> Listening...</> : <><BsMicMuteFill /> Record Voice</>}
                                    </button>
                                </div>
                                <textarea 
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    placeholder={isListening ? "Listening... Please speak now." : "Describe your symptoms briefly... Or click 'Record Voice'"}
                                    className={`w-full p-4 rounded-2xl border ${isListening ? 'border-red-500 bg-red-50/10' : 'border-slate-200'} focus:outline-none focus:border-orange-500 min-h-[120px] transition-colors`}
                                />
                                
                                {/* New Upload Report Section */}
                                <div className="mt-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-orange-500 transition-colors bg-slate-50 relative">
                                    {uploadingReport ? (
                                         <p className="text-slate-500 font-bold uppercase text-xs">Uploading securely...</p>
                                    ) : reportURL ? (
                                        <div className="flex flex-col flex-wrap text-center items-center">
                                            <BsCheckCircleFill className="text-green-500 text-3xl mb-2" />
                                            <p className="text-slate-500 font-bold text-xs uppercase mb-2">Report attached securely</p>
                                            <a href={reportURL} target="_blank" rel="noreferrer" className="text-blue-500 text-xs font-black hover:underline z-20 relative">View Upload</a>
                                        </div>
                                    ) : (
                                        <>
                                            <BsCloudArrowUp className="text-3xl text-slate-400 mx-auto mb-2" />
                                            <p className="text-slate-500 font-bold uppercase text-xs">Attach Previous Lab Reports or Scans (Optional)</p>
                                            <input 
                                                type="file" 
                                                accept="image/*,.pdf" 
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setUploadingReport(true);
                                                        try {
                                                            const data = await uploadImageToCloudinary(file);
                                                            setReportURL(data.url);
                                                        } catch (err) {
                                                            console.error("Upload failed", err);
                                                        }
                                                        setUploadingReport(false);
                                                    }
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <h4 className="text-lg font-black uppercase tracking-widest text-slate-800 mb-6">Payment Method</h4>
                                {['Online Payment', 'Pay at Hospital'].map(m => (
                                    <button 
                                        key={m}
                                        onClick={() => setPaymentMethod(m)}
                                        className={`w-full py-4 px-6 rounded-2xl border text-left font-bold ${paymentMethod === m ? 'border-green-500 bg-green-50 text-green-600' : 'border-slate-200 hover:border-slate-300'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                        <button 
                            disabled={step === 1} 
                            onClick={() => setStep(s => s - 1)}
                            className="px-6 py-3 rounded-xl font-bold text-slate-400 disabled:opacity-50"
                        >Back</button>

                        {step < 5 ? (
                            <button 
                                onClick={() => setStep(s => s + 1)}
                                disabled={(step===2 && !date) || (step===3 && !timeSlot)}
                                className="px-8 py-3 rounded-xl font-black bg-slate-900 text-white disabled:opacity-50"
                            >Next</button>
                        ) : (
                            <button 
                                onClick={handleConfirm}
                                className="px-8 py-3 rounded-xl font-black bg-green-600 text-white shadow-xl shadow-green-600/30 active:scale-95"
                            >Confirm Booking <BsCheckCircleFill className="inline ml-2" /></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingWizard;
