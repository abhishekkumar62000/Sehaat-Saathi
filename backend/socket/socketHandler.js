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

    // Handle Appointment Interaction (e.g. Patient arriving)
    socket.on("PATIENT_ARRIVAL_SIGNAL", (data) => {
      const { bookingId, doctorId, hospitalId } = data;
      io.to(doctorId).emit("BOOKING_UPDATE_SIGNAL", { bookingId, status: "PATIENT_ARRIVED" });
      if (hospitalId) io.to(hospitalId).emit("BOOKING_UPDATE_SIGNAL", { bookingId, status: "PATIENT_ARRIVED" });
    });

    socket.on("disconnect", () => {
      console.log("Neural Link Terminated:", socket.id);
    });
  });

  return io;
};

export default initSocket;
