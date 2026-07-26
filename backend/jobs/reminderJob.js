import cron from "node-cron";
import Appointment from "../models/Appointment.js";
import Notification from "../models/NotificationSchema.js";

/**
 * Appointment Reminder Cron Job
 * Runs every 5 minutes and notifies doctors + patients about upcoming appointments
 * within the next 30 minutes.
 */
const initReminderJob = (io) => {
  // Run every 5 minutes: "*/5 * * * *"
  cron.schedule("*/5 * * * *", async () => {
    console.log("🔔 Running Appointment Reminder Pulse Check...");

    const now = new Date();
    const in30Minutes = new Date(now.getTime() + 30 * 60 * 1000);

    try {
      // Find confirmed appointments within the next 30 minutes
      // that have not yet received a reminder
      const upcomingAppointments = await Appointment.find({
        status: "confirmed",
        date: { $gte: now, $lte: in30Minutes },
        reminderSent: { $ne: true },
      })
        .populate("patient", "name _id")
        .populate("doctor", "name _id");

      if (upcomingAppointments.length === 0) {
        console.log("No upcoming appointments to remind.");
        return;
      }

      console.log(
        `Found ${upcomingAppointments.length} appointment(s) to remind.`
      );

      for (const appointment of upcomingAppointments) {
        const { _id: bookingId, patient, doctor, timeSlot, date, patientName } = appointment;

        // Calculate minutes until appointment
        const minutesUntil = Math.round((new Date(date) - now) / 60000);

        const doctorId = doctor?._id?.toString();
        const patientId = patient?._id?.toString();
        const doctorName = doctor?.name || "Your Doctor";
        const resolvedPatientName = patientName || patient?.name || "Your Patient";

        // ── 1. Emit socket events ──────────────────────────────────────────

        if (io) {
          // Notify Doctor
          if (doctorId) {
            io.to(doctorId).emit("APPOINTMENT_REMINDER", {
              bookingId,
              patientName: resolvedPatientName,
              timeSlot,
              minutesUntil,
            });
          }

          // Notify Patient
          if (patientId) {
            io.to(patientId).emit("APPOINTMENT_REMINDER", {
              bookingId,
              doctorName,
              timeSlot,
              minutesUntil,
            });
          }
        }

        // ── 2. Persist Notifications ───────────────────────────────────────

        const notificationsToCreate = [];

        if (doctorId) {
          notificationsToCreate.push({
            recipient: doctorId,
            recipientModel: "Doctor",
            message: `Reminder: You have an appointment with ${resolvedPatientName} at ${timeSlot} (in ~${minutesUntil} min).`,
            actionType: "GENERAL",
            bookingId,
          });
        }

        if (patientId) {
          notificationsToCreate.push({
            recipient: patientId,
            recipientModel: "User",
            message: `Reminder: Your appointment with Dr. ${doctorName} is at ${timeSlot} (in ~${minutesUntil} min).`,
            actionType: "GENERAL",
            bookingId,
          });
        }

        if (notificationsToCreate.length > 0) {
          await Notification.insertMany(notificationsToCreate);
        }

        // ── 3. Mark reminder as sent ───────────────────────────────────────
        await Appointment.findByIdAndUpdate(bookingId, { reminderSent: true });

        console.log(
          `✅ Reminder sent for appointment ${bookingId} (in ~${minutesUntil} min)`
        );
      }
    } catch (err) {
      console.error("❌ Reminder Pulse Check Failed:", err.message);
    }
  });
};

export default initReminderJob;
