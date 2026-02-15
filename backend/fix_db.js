
import fetch from 'node-fetch';

async function diagnose() {
    console.log("==========================================");
    console.log("   Sehaat Saathi - DB Diagnostic Tool     ");
    console.log("==========================================");

    try {
        console.log("\n1. Fetching your Public IP...");
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const myIP = data.ip;

        console.log(`\n✅ YOUR PUBLIC IP: ${myIP}`);
        console.log("\n------------------------------------------");
        console.log("   STEP-BY-STEP PERMANENT FIX (Atlas)     ");
        console.log("------------------------------------------");
        console.log("1. Go to: https://cloud.mongodb.com/");
        console.log("2. Click 'Network Access' on the left sidebar.");
        console.log("3. Click '+ Add IP Address'.");
        console.log("4. EITHER:");
        console.log("   A) Click 'ADD CURRENT IP ADDRESS' (Fixes for now)");
        console.log("   B) Type '0.0.0.0/0' (Permanent Fix - Recommended)");
        console.log("5. Click 'Confirm' and wait 1 minute for it to apply.");
        console.log("\nOnce done, restart your backend server!");
        console.log("==========================================\n");

    } catch (error) {
        console.error("❌ Error fetching IP:", error.message);
        console.log("Please check your internet connection.");
    }
}

diagnose();
