import fetch from "node-fetch";

const run = async () => {
  const url = "https://sehaat-saathi.vercel.app/api/v1/hospitals";
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Production API Response Status:", res.status);
    console.log("Production API Response Data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to fetch production API:", error);
  }
};

run();
