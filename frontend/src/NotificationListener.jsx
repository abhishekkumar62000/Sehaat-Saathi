import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSocket } from "./context/SocketContext";

const NotificationListener = () => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        // Neural Pulse: New Booking detected
        socket.on("NEW_BOOKING_ALERT", (data) => {
            toast.info(`🔔 Pulse Alert: ${data.message}`, {
                position: "top-right",
                className: "bg-indigo-600 font-bold",
            });
            // Optional: Play neural sound or force state update
        });

        // Neural Sync: Status updated by Doctor
        socket.on("STATUS_SYNC", (data) => {
            const theme = data.status === "confirmed" ? "success" : "error";
            toast[theme](`⚡ Neural Sync: ${data.message}`, {
                position: "top-right",
            });
            
            // In a real app, we might trigger a global state refetch or reload
            setTimeout(() => window.location.reload(), 2000);
        });

        // Hospital Sync
        socket.on("HOSPITAL_SYNC", (data) => {
            toast.info(`🏥 Hospital Pulse: ${data.message}`);
        });

        return () => {
            socket.off("NEW_BOOKING_ALERT");
            socket.off("STATUS_SYNC");
            socket.off("HOSPITAL_SYNC");
        };
    }, [socket]);

    return null; // Side-effect only component
};

export default NotificationListener;
