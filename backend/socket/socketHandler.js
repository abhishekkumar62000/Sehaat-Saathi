import { Server } from "socket.io";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST", "PATCH", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("New Neural Link Established:", socket.id);

    // Join identity room (userId could be Patient, Doctor, or Hospital ID)
    socket.on("JOIN_ROOM", (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined Neural Room: ${userId}`);
    });

    // Handle Live Queue Synchronization
    socket.on("UPDATE_QUEUE", (data) => {
      const { doctorId, hospitalId, currentServing } = data;
      // Broadcast to all patients in the doctor/hospital context
      io.to(doctorId).emit("QUEUE_SYNC", { currentServing });
      if (hospitalId) io.to(hospitalId).emit("QUEUE_SYNC", { currentServing });
    });

    // =====================================================================
    // FEATURE 1: Enhanced Live Token Queue — "Smart Alert" Notifications
    // =====================================================================
    socket.on("CALL_NEXT_PATIENT", (data) => {
      const { doctorId, currentToken, queueState } = data;
      io.to(doctorId).emit("QUEUE_UPDATED", { currentToken, queueState });
      io.to(`lobby:${doctorId}`).emit("LOBBY_ANNOUNCE", { token: currentToken, roomName: data.roomName || "Consultation Room" });
    });

    socket.on("PATIENT_JOIN_QUEUE", (data) => {
      const { doctorId, patientId, tokenNumber } = data;
      socket.join(doctorId);
      io.to(patientId).emit("QUEUE_JOINED", { tokenNumber });
    });

    // =====================================================================
    // FEATURE 2: OPD Lobby Display — Clinic reception screen
    // =====================================================================
    socket.on("JOIN_LOBBY", (doctorId) => {
      socket.join(`lobby:${doctorId}`);
    });

    // =====================================================================
    // FEATURE 3: Pre-Consultation Vitals — Patient fills before entering
    // =====================================================================
    socket.on("JOIN_PRECONSULT", (bookingId) => {
      socket.join(`preconsult:${bookingId}`);
    });

    socket.on("PRECONSULT_VITALS_SUBMIT", (data) => {
      const { bookingId, doctorId, vitalsForm } = data;
      io.to(doctorId).emit("PRECONSULT_VITALS_RECEIVED", { bookingId, vitalsForm });
      io.to(`preconsult:${bookingId}`).emit("PRECONSULT_ACK", { bookingId });
    });

    // =====================================================================
    // FEATURE 4: Emergency Delay Alert + Telehealth Pivot
    // =====================================================================
    socket.on("DOCTOR_DELAY_ALERT", (data) => {
      const { doctorId, delayMinutes, reason, affectedBookingIds } = data;
      affectedBookingIds.forEach(bookingId => {
        io.to(bookingId).emit("DELAY_NOTIFICATION", { delayMinutes, reason, bookingId });
      });
      io.to(doctorId).emit("DELAY_BROADCAST_DONE", { count: affectedBookingIds.length });
    });

    socket.on("PATIENT_PIVOT_CHOICE", (data) => {
      const { bookingId, doctorId, choice } = data;
      io.to(doctorId).emit("PATIENT_PIVOT_SELECTED", { bookingId, choice });
    });
    socket.on("PATIENT_ARRIVAL_SIGNAL", (data) => {
      const { bookingId, doctorId, hospitalId } = data;
      io.to(doctorId).emit("BOOKING_UPDATE_SIGNAL", { bookingId, status: "PATIENT_ARRIVED" });
      if (hospitalId) io.to(hospitalId).emit("BOOKING_UPDATE_SIGNAL", { bookingId, status: "PATIENT_ARRIVED" });
    });

    // Real-Time Shared Consultation Whiteboard Sync
    socket.on("JOIN_CANVAS", (bookingId) => {
      socket.join(`canvas:${bookingId}`);
      console.log(`Socket ${socket.id} joined Shared Canvas Room: canvas:${bookingId}`);
    });

    socket.on("CANVAS_DRAW", (data) => {
      const { bookingId, drawData } = data;
      socket.to(`canvas:${bookingId}`).emit("CANVAS_DRAW_SYNC", drawData);
    });

    socket.on("CANVAS_CLEAR", (bookingId) => {
      socket.to(`canvas:${bookingId}`).emit("CANVAS_CLEAR_SYNC");
    });

    // Real-Time Patient Vital Telemetry Sync
    socket.on("JOIN_VITALS", (bookingId) => {
      socket.join(`vitals:${bookingId}`);
      console.log(`Socket ${socket.id} joined Vitals Telemetry Room: vitals:${bookingId}`);
    });

    socket.on("PATIENT_VITAL_STREAM", (data) => {
      const { bookingId, vitals } = data;
      socket.to(`vitals:${bookingId}`).emit("PATIENT_VITAL_SYNC", { bookingId, vitals });
    });

    // Real-time Prescription Draft Sync
    socket.on("JOIN_PRESCRIPTION", (bookingId) => {
      socket.join(`prescription:${bookingId}`);
    });

    socket.on("PRESCRIPTION_DRAFT_STREAM", (data) => {
      const { bookingId, draft } = data;
      socket.to(`prescription:${bookingId}`).emit("PRESCRIPTION_DRAFT_SYNC", { bookingId, draft });
    });

    // Real-time Interactive Symptom Polls
    socket.on("REQUEST_PATIENT_POLL", (data) => {
      const { bookingId, userId } = data;
      io.to(userId).emit("PATIENT_POLL_REQUEST", { bookingId });
    });

    socket.on("SUBMIT_PATIENT_POLL", (data) => {
      const { bookingId, doctorId, pollData } = data;
      io.to(doctorId).emit("PATIENT_POLL_RESPONSE", { bookingId, pollData });
    });

    socket.on("disconnect", () => {
      console.log("Neural Link Terminated:", socket.id);
    });
  });

  return io;
};

export default initSocket;
