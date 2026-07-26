import Appointment from "../models/Appointment.js";
import Review from "../models/ReviewSchema.js";
import mongoose from "mongoose";

// GET /api/v1/analytics/doctor  — Full doctor analytics in a single call
export const getDoctorAnalytics = async (req, res) => {
  const doctorId = req.userId;

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Fetch ALL appointments for this doctor
    const allAppointments = await Appointment.find({ doctor: doctorId })
      .select("status ticketPrice paymentStatus createdAt appointmentType timeSlot patient")
      .sort({ createdAt: -1 });

    // ── 1. CORE COUNTS ──────────────────────────────────────────────────
    const total = allAppointments.length;
    const todayAppts = allAppointments.filter(a => new Date(a.createdAt) >= startOfToday);
    const weekAppts  = allAppointments.filter(a => new Date(a.createdAt) >= startOfWeek);
    const monthAppts = allAppointments.filter(a => new Date(a.createdAt) >= startOfMonth);

    const pending   = allAppointments.filter(a => a.status === "pending").length;
    const confirmed = allAppointments.filter(a => a.status === "confirmed").length;
    const completed = allAppointments.filter(a => a.status === "completed").length;
    const cancelled = allAppointments.filter(a => a.status === "cancelled").length;

    // ── 2. EARNINGS ──────────────────────────────────────────────────────
    const calcEarnings = (list) =>
      list
        .filter(a => a.status === "completed" && a.paymentStatus === "paid")
        .reduce((sum, a) => sum + (a.ticketPrice || 0), 0);

    const earningsToday   = calcEarnings(todayAppts);
    const earningsWeek    = calcEarnings(weekAppts);
    const earningsMonth   = calcEarnings(monthAppts);
    const earningsTotal   = calcEarnings(allAppointments);

    // Pending unpaid revenue
    const pendingRevenue = allAppointments
      .filter(a => a.status === "completed" && a.paymentStatus !== "paid")
      .reduce((sum, a) => sum + (a.ticketPrice || 0), 0);

    // ── 3. LAST 7 DAYS DAILY CHART ───────────────────────────────────────
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayEnd   = new Date(dayStart.getTime() + 86400000);
      const count = allAppointments.filter(a => {
        const t = new Date(a.createdAt);
        return t >= dayStart && t < dayEnd;
      }).length;
      const earnings = calcEarnings(
        allAppointments.filter(a => {
          const t = new Date(a.createdAt);
          return t >= dayStart && t < dayEnd;
        })
      );
      last7Days.push({
        label: d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
        count,
        earnings,
      });
    }

    // ── 4. LAST 6 MONTHS MONTHLY CHART ───────────────────────────────────
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const mDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mEnd  = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = allAppointments.filter(a => {
        const t = new Date(a.createdAt);
        return t >= mDate && t < mEnd;
      }).length;
      const earnings = calcEarnings(
        allAppointments.filter(a => {
          const t = new Date(a.createdAt);
          return t >= mDate && t < mEnd;
        })
      );
      last6Months.push({
        label: mDate.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
        count,
        earnings,
      });
    }

    // ── 5. PEAK HOURS HEATMAP ─────────────────────────────────────────────
    const hourBuckets = Array(24).fill(0);
    allAppointments.forEach(a => {
      // Try to parse from timeSlot string like "10:00 AM", "14:30", etc.
      if (a.timeSlot) {
        const match = a.timeSlot.match(/(\d{1,2})[:h](\d{2})?\s*(AM|PM)?/i);
        if (match) {
          let hour = parseInt(match[1]);
          const meridiem = match[3];
          if (meridiem?.toUpperCase() === "PM" && hour !== 12) hour += 12;
          if (meridiem?.toUpperCase() === "AM" && hour === 12) hour = 0;
          if (hour >= 0 && hour < 24) hourBuckets[hour]++;
        }
      } else {
        // fallback: use createdAt hour
        const h = new Date(a.createdAt).getHours();
        hourBuckets[h]++;
      }
    });

    const peakHours = hourBuckets.map((count, hour) => ({
      hour,
      label: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour < 12 ? "am" : "pm"}`,
      count,
    }));

    // ── 6. APPOINTMENT TYPE BREAKDOWN ─────────────────────────────────────
    const offline     = allAppointments.filter(a => a.appointmentType !== "teleconsult").length;
    const teleconsult = allAppointments.filter(a => a.appointmentType === "teleconsult").length;

    // ── 7. SATISFACTION SCORE (from reviews) ──────────────────────────────
    let avgRating = 0;
    let totalReviews = 0;
    let ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    try {
      const reviews = await Review.find({ doctor: doctorId }).select("rating");
      totalReviews = reviews.length;
      if (totalReviews > 0) {
        reviews.forEach(r => {
          const star = Math.round(r.rating);
          if (star >= 1 && star <= 5) ratingBreakdown[star]++;
        });
        avgRating = reviews.reduce((s, r) => s + r.rating, 0) / totalReviews;
        avgRating = Math.round(avgRating * 10) / 10;
      }
    } catch (_) {}

    // ── 8. UNIQUE PATIENTS ────────────────────────────────────────────────
    const uniquePatients = new Set(allAppointments.map(a => a.patient?.toString())).size;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // ── 9. STATUS DISTRIBUTION (for pie chart) ────────────────────────────
    const statusDist = [
      { status: "Completed", count: completed, color: "#6366f1" },
      { status: "Pending",   count: pending,   color: "#f59e0b" },
      { status: "Confirmed", count: confirmed, color: "#10b981" },
      { status: "Cancelled", count: cancelled, color: "#ef4444" },
    ];

    res.status(200).json({
      success: true,
      data: {
        // Core counts
        total, todayCount: todayAppts.length, weekCount: weekAppts.length, monthCount: monthAppts.length,
        pending, confirmed, completed, cancelled,
        // Earnings
        earningsToday, earningsWeek, earningsMonth, earningsTotal, pendingRevenue,
        // Charts
        last7Days, last6Months, peakHours,
        // Breakdowns
        statusDist, offline, teleconsult,
        // Satisfaction
        avgRating, totalReviews, ratingBreakdown,
        // Patients
        uniquePatients, completionRate,
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ success: false, message: "Analytics computation failed: " + err.message });
  }
};
