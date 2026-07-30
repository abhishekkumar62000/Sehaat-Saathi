import React, { useState, useEffect, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { authContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { BsActivity, BsCheckCircleFill, BsClockHistory, BsRobot } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Loading from "../../components/Shared/Loading";
import jsPDF from "jspdf";
import SharedConsultationCanvas from "../../components/DoctorDetails/SharedConsultationCanvas";

const WorkflowPanel = ({ appointments: initialAppointments, doctorId }) => {
  const { token } = useContext(authContext);
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments || []);
  
  const [columns, setColumns] = useState({
    pending: { title: "Upcoming Queue", items: [] },
    PATIENT_ARRIVED: { title: "Patient Arrived", items: [] },
    CONSULTATION_STARTED: { title: "In Consultation", items: [] },
    completed: { title: "Completed", items: [] }
  });

  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [generatingAi, setGeneratingAi] = useState(false);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState(null);
  
  const [vitalsData, setVitalsData] = useState({});
  const [activeCanvasBookingId, setActiveCanvasBookingId] = useState(null);
  const [preConsultData, setPreConsultData] = useState({});
  
  const [isScribing, setIsScribing] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          }
        }
        if (finalTranscript) {
          setPrescriptionNotes(prev => prev + finalTranscript);
        }
      };

      rec.onend = () => {
        setIsScribing(false);
      };

      setRecognition(rec);
    }
  }, []);

  const handleScribeToggle = () => {
    if (!recognition) {
      toast.error("AI Scribe is not supported in this browser. Please use Chrome/Edge.");
      return;
    }

    if (isScribing) {
      recognition.stop();
    } else {
      recognition.start();
      setIsScribing(true);
      toast.success("AI Scribe active! Speak naturally, and notes will sync.");
    }
  };

  const [pollResponses, setPollResponses] = useState({});

  // Real-time prescription draft streaming
  useEffect(() => {
    if (!socket || !selectedPatientForRx) return;
    socket.emit("PRESCRIPTION_DRAFT_STREAM", {
      bookingId: selectedPatientForRx,
      draft: prescriptionNotes
    });
  }, [prescriptionNotes, selectedPatientForRx, socket]);

  // Vitals & Polls real-time socket listeners
  useEffect(() => {
    if (!socket || !appointments || appointments.length === 0) return;

    appointments.forEach(appt => {
      socket.emit("JOIN_VITALS", appt._id);
    });

    const handleVitalSync = (data) => {
      const { bookingId, vitals } = data;
      setVitalsData(prev => ({ ...prev, [bookingId]: vitals }));
    };

    const handlePollResponse = (data) => {
      const { bookingId, pollData } = data;
      setPollResponses(prev => ({ ...prev, [bookingId]: pollData }));
      toast.success("⚡ Live Symptom Poll received from patient!");
    };

    // Pre-consultation vitals form submission from patient
    const handlePreConsultVitals = (data) => {
      const { bookingId, vitalsForm } = data;
      setPreConsultData(prev => ({ ...prev, [bookingId]: vitalsForm }));
      toast.success(`📋 Pre-Consult form received from ${vitalsForm.patientName || "patient"}!`, { autoClose: 6000 });
    };

    socket.on("PATIENT_VITAL_SYNC", handleVitalSync);
    socket.on("PATIENT_POLL_RESPONSE", handlePollResponse);
    socket.on("PRECONSULT_VITALS_RECEIVED", handlePreConsultVitals);

    return () => {
      socket.off("PATIENT_VITAL_SYNC", handleVitalSync);
      socket.off("PATIENT_POLL_RESPONSE", handlePollResponse);
      socket.off("PRECONSULT_VITALS_RECEIVED", handlePreConsultVitals);
    };
  }, [socket, appointments]);

  const sendPatientPoll = (appt) => {
    if (!socket) return;
    socket.emit("REQUEST_PATIENT_POLL", {
      bookingId: appt._id,
      userId: appt.user?._id || appt.user
    });
    toast.success("Symptom Update request sent to patient's dashboard!");
  };

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/appointments/doctor`, {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
      });
      const result = await res.json();
      if (res.ok) {
        setAppointments(result.data);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Real-time socket listener
  useEffect(() => {
    if (!socket) return;
    const onNewBooking = () => {
      fetchAppointments();
    };
    socket.on("new-booking", onNewBooking);
    return () => socket.off("new-booking", onNewBooking);
  }, [socket, fetchAppointments]);

  // Re-build columns whenever appointments array changes
  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const newCols = {
        pending: { title: "Upcoming Queue", items: [] },
        PATIENT_ARRIVED: { title: "Patient Arrived", items: [] },
        CONSULTATION_STARTED: { title: "In Consultation", items: [] },
        completed: { title: "Completed", items: [] }
      };
      
      appointments.forEach(appt => {
        let colKey = appt.status;
        if (colKey === "confirmed") colKey = "pending";
        if (!newCols[colKey] && colKey !== "rejected" && colKey !== "auto_cancelled") {
          colKey = "completed"; // fallback for unknown active status
        }
        
        if (newCols[colKey]) {
          newCols[colKey].items.push(appt);
        }
      });
      
      setColumns(newCols);
    }
  }, [appointments]);

  const handleStatusUpdate = async (bookingId, status) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(`Patient moved to ${status.replace("_", " ")}`);

      if (status === "CONSULTATION_STARTED" && socket) {
        const appt = appointments.find(a => a._id === bookingId);
        if (appt) {
          socket.emit("UPDATE_QUEUE", {
            doctorId,
            hospitalId: appt.hospital?._id || appt.hospital,
            currentServing: appt.bookingToken
          });
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const sourceItems = [...sourceCol.items];
      const destItems = [...destCol.items];
      
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems }
      });
      
      // Update Backend
      handleStatusUpdate(draggableId, destination.droppableId);
    }
  };

  const generateAIPrescription = async (appt) => {
    if (!prescriptionNotes.trim()) {
      toast.error("Please add some quick notes for the AI first!");
      return;
    }
    
    setGeneratingAi(true);
    try {
      const res = await fetch(`${BASE_URL}/doctors/generate-prescription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          symptoms: appt.symptoms || "Routine checkup", 
          notes: prescriptionNotes 
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // Generate PDF using jsPDF
      const doc = new jsPDF();
      const rx = result.data;
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(16, 185, 129); // emerald-500
      doc.text("Sehaat Saathi Digital Prescription", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Patient: ${appt.user?.name || 'Patient'}`, 20, 40);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 40);
      
      doc.setLineWidth(0.5);
      doc.line(20, 45, 190, 45);
      
      // Diagnosis
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Diagnosis:", 20, 55);
      doc.setFontSize(12);
      doc.text(rx.diagnosis || "Clinical diagnosis", 20, 62);
      
      // Medicines
      doc.setFontSize(14);
      doc.text("Medicines:", 20, 75);
      let y = 85;
      rx.medicines?.forEach((med, idx) => {
        doc.setFontSize(12);
        doc.text(`${idx + 1}. ${med.name} - ${med.dosage}`, 20, y);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`${med.frequency} for ${med.duration} | ${med.instructions}`, 25, y + 5);
        doc.setTextColor(0, 0, 0);
        y += 15;
      });
      
      // Advice
      doc.setFontSize(14);
      doc.text("Medical Advice:", 20, y + 10);
      doc.setFontSize(12);
      const splitAdvice = doc.splitTextToSize(rx.advice || "", 170);
      doc.text(splitAdvice, 20, y + 17);
      
      // Follow Up
      doc.setFontSize(14);
      doc.text("Follow-Up:", 20, y + 17 + (splitAdvice.length * 6) + 5);
      doc.setFontSize(12);
      doc.text(rx.followUp || "As needed", 20, y + 17 + (splitAdvice.length * 6) + 12);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Generated by Sehaat Saathi Health Copilot AI", 105, 280, { align: "center" });

      doc.save(`${appt.user?.name || 'Patient'}_Prescription.pdf`);
      toast.success("AI Prescription Generated and Downloaded!");
      setPrescriptionNotes("");
      setSelectedPatientForRx(null);
    } catch (err) {
      toast.error(err.message || "Failed to generate prescription");
    } finally {
      setGeneratingAi(false);
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[600px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 rounded-xl">
          <BsActivity className="w-6 h-6 text-emerald-600 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800">Live Clinical Workflow</h2>
          <p className="text-sm text-slate-500 font-medium">Drag and drop patients to automatically update their live status</p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(columns).map(([colId, column]) => (
            <div key={colId} className="flex flex-col h-full bg-slate-100/50 rounded-2xl border border-slate-200">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-2xl shadow-sm">
                <h3 className="font-black text-slate-700 text-sm tracking-wide uppercase">{column.title}</h3>
                <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-lg">
                  {column.items.length}
                </span>
              </div>
              
              <Droppable droppableId={colId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-3 transition-colors min-h-[400px] ${snapshot.isDraggingOver ? "bg-emerald-50/50" : ""}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-xl shadow-sm border mb-3 flex flex-col gap-3 transition-all ${snapshot.isDragging ? "shadow-xl border-emerald-300 scale-105" : "border-slate-200 hover:border-emerald-200"}`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={item.user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.name)}&background=10b981&color=fff`} className="w-10 h-10 rounded-full border border-slate-100" />
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">{item.user?.name}</h4>
                                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                  <BsClockHistory /> {item.appointmentTime} | {item.appointmentDate}
                                </p>
                              </div>
                            </div>

                            {/* Pre-Consult Vitals Badge */}
                            {preConsultData[item._id] && (
                              <div className="bg-violet-50 border border-violet-200 rounded-xl p-2.5 text-[9px] font-bold text-violet-800">
                                <div className="flex items-center gap-1 mb-1.5 text-violet-600">
                                  <span>📋</span> Pre-Consult Form Received
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {(preConsultData[item._id].symptoms || []).map(s => (
                                    <span key={s} className="bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-lg">{s}</span>
                                  ))}
                                </div>
                                {preConsultData[item._id].severity && (
                                  <div className="mt-1 text-[8px] text-violet-500">
                                    Severity: <strong>{preConsultData[item._id].severity}</strong>
                                    {preConsultData[item._id].temperature && ` | Temp: ${preConsultData[item._id].temperature}°F`}
                                    {preConsultData[item._id].bp_systolic && ` | BP: ${preConsultData[item._id].bp_systolic}/${preConsultData[item._id].bp_diastolic}`}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Show AI Rx button if In Consultation or Completed */}
                            {(colId === "CONSULTATION_STARTED" || colId === "completed") && (
                              <div className="pt-2 border-t border-slate-100">
                                {selectedPatientForRx === item._id ? (
                                  <div className="flex flex-col gap-2">
                                    <div className="relative">
                                      <textarea 
                                        className="w-full text-xs p-2 pr-8 border border-slate-200 rounded-lg focus:outline-emerald-500" 
                                        rows="2" 
                                        placeholder="Brief diagnosis & med notes..."
                                        value={prescriptionNotes}
                                        onChange={(e) => setPrescriptionNotes(e.target.value)}
                                      />
                                      <button
                                        type="button"
                                        onClick={handleScribeToggle}
                                        className={`absolute right-2 top-2 p-1 rounded-md text-[10px] transition-all ${isScribing ? "bg-rose-500 text-white animate-pulse" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                                        title={isScribing ? "Scribe Active (Listening...) - Click to stop" : "Start AI Scribe"}
                                      >
                                        🎙️
                                      </button>
                                    </div>
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => generateAIPrescription(item)}
                                        disabled={generatingAi}
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 hover:opacity-90"
                                      >
                                        {generatingAi ? "Generating..." : <><BsRobot /> Magic Rx</>}
                                      </button>
                                      <button 
                                        onClick={() => setSelectedPatientForRx(null)}
                                        className="flex-1 bg-slate-200 text-slate-700 text-[10px] font-bold py-1.5 rounded-lg hover:bg-slate-300"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => setSelectedPatientForRx(item._id)}
                                    className="w-full bg-slate-50 border border-slate-200 text-emerald-600 text-[11px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                                  >
                                    <BsRobot /> AI Prescription
                                  </button>
                                )}
                              </div>
                            )}

                            {colId === "CONSULTATION_STARTED" && (
                              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-100">
                                {vitalsData[item._id] && (
                                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-[10px] space-y-1 relative overflow-hidden">
                                    <div className="absolute top-1 right-1 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                      <span className="text-[7px] text-emerald-400 font-bold">LIVE</span>
                                    </div>
                                    <div className="font-black text-slate-400 uppercase tracking-widest text-[7px] mb-1">Live Vitals Telemetry</div>
                                    <div className="grid grid-cols-2 gap-1.5">
                                      <div className="flex justify-between items-center bg-slate-950 p-1 rounded border border-slate-800">
                                        <span className="text-slate-500">Pulse:</span>
                                        <span className={`font-black ${vitalsData[item._id].heartRate > 100 || vitalsData[item._id].heartRate < 60 ? "text-red-400 animate-pulse" : "text-rose-400"}`}>
                                          {vitalsData[item._id].heartRate} bpm
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950 p-1 rounded border border-slate-800">
                                        <span className="text-slate-500">SpO2:</span>
                                        <span className={`font-black ${vitalsData[item._id].spo2 < 95 ? "text-red-400 animate-pulse" : "text-cyan-400"}`}>
                                          {vitalsData[item._id].spo2}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950 p-1 rounded border border-slate-800">
                                        <span className="text-slate-500">Temp:</span>
                                        <span className={`font-black ${vitalsData[item._id].temperature > 99.5 || vitalsData[item._id].temperature < 97.0 ? "text-red-400 animate-pulse" : "text-amber-400"}`}>
                                          {vitalsData[item._id].temperature}°F
                                        </span>
                                      </div>
                                      <div className="flex justify-between items-center bg-slate-950 p-1 rounded border border-slate-800">
                                        <span className="text-slate-500">BP:</span>
                                        <span className="text-indigo-400 font-black">{vitalsData[item._id].bloodPressure}</span>
                                      </div>
                                    </div>
                                    {(vitalsData[item._id].heartRate > 100 || vitalsData[item._id].spo2 < 95) && (
                                      <div className="mt-1 p-1 bg-red-950/60 border border-red-800 text-red-400 text-[8px] font-black uppercase text-center rounded animate-pulse">
                                        ⚠️ Warning: Abnormal Vitals!
                                      </div>
                                    )}
                                  </div>
                                )}

                                {pollResponses[item._id] && (
                                  <div className="p-2 bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-800 rounded-xl text-white text-[10px] space-y-1 relative overflow-hidden shadow-inner">
                                    <div className="font-black text-indigo-400 uppercase tracking-widest text-[7px] mb-1">Live Symptom Updates</div>
                                    <div className="flex justify-between items-center bg-slate-950/80 p-1 rounded border border-indigo-800/40">
                                      <span className="text-slate-400 font-bold">Pain Level:</span>
                                      <span className={`font-black ${pollResponses[item._id].painLevel > 7 ? "text-red-400 animate-pulse font-black" : "text-amber-400 font-black"}`}>
                                        {pollResponses[item._id].painLevel} / 10
                                      </span>
                                    </div>
                                    {pollResponses[item._id].notes && (
                                      <div className="text-slate-300 font-medium italic mt-1 p-1 bg-slate-950/50 rounded">
                                        "{pollResponses[item._id].notes}"
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => sendPatientPoll(item)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-black uppercase py-2 rounded-lg border border-slate-700 transition-all active:scale-95"
                                  >
                                    ⚡ Poll Pain
                                  </button>
                                  <button
                                    onClick={() => setActiveCanvasBookingId(activeCanvasBookingId === item._id ? null : item._id)}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase py-2 rounded-lg transition-all active:scale-95 shadow-md shadow-indigo-100"
                                  >
                                    🎨 Canvas
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      
      {activeCanvasBookingId && (
        <div className="mt-8 border-t border-slate-200 pt-6 animate-in slide-in-from-bottom duration-300">
          <SharedConsultationCanvas bookingId={activeCanvasBookingId} isDoctor={true} />
        </div>
      )}

      {loading && <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[100] flex items-center justify-center"><Loading /></div>}
    </div>
  );
};

export default WorkflowPanel;
