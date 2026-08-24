import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Hospital from "../models/HospitalSchema.js";
import Doctor from "../models/DoctorSchema.js";

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return { hours: 9, minutes: 0 };
  const clean = timeStr.trim().toUpperCase();
  const isPM = clean.includes("PM");
  const isAM = clean.includes("AM");
  
  const timePart = clean.replace("AM", "").replace("PM", "").trim();
  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = parseInt(hoursStr, 10);
  let minutes = parseInt(minutesStr, 10) || 0;
  
  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("DB connected");

  // Fetch all hospitals
  const hospitals = await Hospital.find({ isLive: true });
  console.log(`Found ${hospitals.length} live hospitals`);
  for (const h of hospitals) {
    console.log(`\nHospital Name: ${h.hospitalName} (_id: ${h._id})`);
    console.log("Weekly Schedule:", JSON.stringify(h.weeklySchedule, null, 2));

    // Test for a date (e.g. 2026-08-09 which is Sunday)
    const date = "2026-08-09";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [year, month, day] = date.split("-").map(num => parseInt(num, 10));
    const requestedDate = new Date(year, month - 1, day);
    const dayName = days[requestedDate.getDay()];
    console.log(`Date: ${date} resolved to dayName: ${dayName}`);

    const daySchedule = h.weeklySchedule?.find(a => a.day?.toLowerCase() === dayName.toLowerCase());
    if (!daySchedule) {
      console.log(`❌ No daySchedule found for ${dayName}`);
      continue;
    }
    console.log(`daySchedule found:`, daySchedule);

    if (daySchedule.isAvailable === false) {
      console.log(`❌ daySchedule isAvailable is false`);
      continue;
    }

    const { startTime, endTime, slotDuration } = daySchedule;
    console.log(`startTime: ${startTime}, endTime: ${endTime}, slotDuration: ${slotDuration}`);

    const { hours: startH, minutes: startM } = parseTimeToMinutes(startTime);
    const { hours: endH, minutes: endM } = parseTimeToMinutes(endTime);
    console.log(`startParsed: ${startH}:${startM}, endParsed: ${endH}:${endM}`);

    const start = new Date(year, month - 1, day, startH, startM, 0, 0);
    const end = new Date(year, month - 1, day, endH, endM, 0, 0);
    console.log(`start Date:`, start.toString());
    console.log(`end Date:`, end.toString());

    let current = new Date(start);
    const baseSlots = [];
    while (current < end) {
      const timeString = current.toLocaleTimeString("en-US", { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      baseSlots.push(timeString);
      current = new Date(current.getTime() + (slotDuration || 30) * 60000);
    }
    console.log(`Generated Slots:`, baseSlots);
  }

  await mongoose.disconnect();
};

run();
