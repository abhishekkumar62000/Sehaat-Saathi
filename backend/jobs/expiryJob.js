import cron from "node-cron";
import Booking from "../models/BookingSchema.js";
import Notification from "../models/NotificationSchema.js";

const initExpiryJob = (io) => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    console.log("Running Neural Expiry Pulse Check...");
    
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    try {
      // Find pending bookings older than 10 minutes
      const expiredBookings = await Booking.find({
        status: "pending",
        createdAt: { $lt: tenMinutesAgo }
      }).populate('user').populate('doctor');

      if (expiredBookings.length > 0) {
        console.log(`Found ${expiredBookings.length} expired pulse bookings. Cancelling...`);
        
        for (const booking of expiredBookings) {
          booking.status = "auto_cancelled";
          booking.statusMessage = "Appointment auto-cancelled due to lack of professional response within 10 minutes.";
          await booking.save();

          // Create persistent notification for Patient
          const newNotification = new Notification({
            recipient: booking.user._id,
            recipientModel: "User",
            message: `Your appointment request for Dr. ${booking.doctor.name} was auto-cancelled as the 10-minute response window expired.`,
            actionType: "AUTO_CANCELLED",
            bookingId: booking._id
          });
          await newNotification.save();

          // Notify Patient via Socket if online
          if (io) {
            io.to(booking.user._id.toString()).emit("STATUS_SYNC", {
              bookingId: booking._id,
              status: "auto_cancelled",
              message: newNotification.message
            });
          }
        }
      }
    } catch (err) {
      console.error("Neural Pulse Check Failed:", err.message);
    }
  });
};

export default initExpiryJob;
