import fetch from "node-fetch";

const run = async () => {
  const doctorId = "6a75ad3c2e98e95ce87c586f";
  const date = "2026-08-09";
  const url = `http://localhost:8001/api/v1/bookings/available-slots/${doctorId}?date=${date}`;
  
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    console.log("API Response Status:", res.status);
    console.log("API Response Data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("API Call Failed:", error);
  }
};

run();
