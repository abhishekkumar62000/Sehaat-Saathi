import { homeopathyDb } from './src/utils/homeopathyData.js';

const categories = [
    "First Aid", "Digestive", "Cough/Flu", "Respiratory",
    "Joint/Skin", "Women's Health", "Men's Health", "Pediatric",
    "Mental Health", "Skin/Allergy", "Skin/Infection", "Kidney",
    "Heart", "Gt/Liver", "Neural", "Constitutional", "Specific"
];

const counts = {};
categories.forEach(c => counts[c] = 0);

homeopathyDb.forEach(med => {
    if (counts[med.category] !== undefined) {
        counts[med.category]++;
    } else {
        // console.log(`Unknown category: ${med.category}`);
    }
});

console.log("--- Current Category Counts ---");
Object.entries(counts).forEach(([cat, count]) => {
    console.log(`${cat}: ${count}`);
});
console.log(`Total Medicines: ${homeopathyDb.length}`);
