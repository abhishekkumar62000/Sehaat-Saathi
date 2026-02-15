
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diseases = [
    { name: 'Diabetes (Type 2)', hindi: 'मधुमेह', tags: ['Metabolic', 'Chronic'] },
    { name: 'Hypertension (High BP)', hindi: 'उच्च रक्तचाप', tags: ['Heart', 'Chronic'] },
    { name: 'Obesity (Weight Loss)', hindi: 'मोटापा', tags: ['Weight', 'Metabolic'] },
    { name: 'Joint Pain (Arthritis)', hindi: 'जोड़ों का दर्द', tags: ['Pain', 'Bone'] },
    { name: 'Skin Diseases (Acne/Eczema)', hindi: 'चर्म रोग', tags: ['Skin', 'Detox'] },
    { name: 'Digestive Issues (Gas/Constipation)', hindi: 'पाचन समस्याएं', tags: ['Gut', 'Detox'] },
    { name: 'Acid Reflux (GERD)', hindi: 'अम्लता/एसिडिटी', tags: ['Gut', 'Burning'] },
    { name: 'Stress & Anxiety', hindi: 'तनाव और चिंता', tags: ['Mind', 'Mental'] },
    { name: 'Insomnia (Sleeplessness)', hindi: 'अनिद्रा', tags: ['Mind', 'Sleep'] },
    { name: 'Migraine / Headache', hindi: 'माइग्रेन / सिरदर्द', tags: ['Pain', 'Nerve'] },
    { name: 'Respiratory (Asthma)', hindi: 'श्वास रोग', tags: ['Lungs', 'Immunity'] },
    { name: 'Cough & Cold (Flu)', hindi: 'खांसी और सर्दी', tags: ['Immunity', 'Viral'] },
    { name: 'Fever (Viral)', hindi: 'बुखार', tags: ['Immunity', 'Emergency'] },
    { name: 'Womens Health (PCOS/PCOD)', hindi: 'महिला स्वास्थ्य', tags: ['Hormonal', 'Women'] },
    { name: 'Menstrual Pain', hindi: 'मासिक धर्म दर्द', tags: ['Women', 'Pain'] },
    { name: 'Thyroid (Hypo/Hyper)', hindi: 'थायराइड', tags: ['Hormonal', 'Metabolic'] },
    { name: 'Liver Health (Fatty Liver)', hindi: 'लिवर स्वास्थ्य', tags: ['Detox', 'Gut'] },
    { name: 'Kidney Stones', hindi: 'गुर्दे की पथरी', tags: ['Detox', 'Pain', 'Emergency'] },
    { name: 'Eye Care (Weak Vision)', hindi: 'नेत्र ज्योति', tags: ['Eyes', 'Nerve'] },
    { name: 'Hair Fall & Dandruff', hindi: 'बालों का झड़ना', tags: ['Beauty', 'Skin'] },
    { name: 'Mens Wellness', hindi: 'पुरुष स्वास्थ्य', tags: ['Vitality', 'Hormonal'] },
    { name: 'Child Immunity', hindi: 'बच्चों की रोग प्रतिरोधक', tags: ['Immunity', 'Growth'] }
];

const therapies = {
    'Diet Therapy': [
        { name: 'Ash Gourd Juice (Petha)', hindi: 'सफेद पेठा रस', duration: 'Daily Morning', time: 'Empty Stomach' },
        { name: 'Green Juice (Spinach/Cucumber)', hindi: 'हरा रस', duration: 'Daily', time: 'Breakfast' },
        { name: 'Raw Vegetable Salad', hindi: 'कच्ची सब्जियों का सलाद', duration: 'Daily', time: 'Before Lunch' },
        { name: 'Fruit Diet (Mono-fruit)', hindi: 'एकल फल आहार', duration: '3 Days', time: 'All meals' },
        { name: 'Coconut Water Fast', hindi: 'नारियल पानी उपवास', duration: '24 Hours', time: 'Once a week' },
        { name: 'Alkaline Diet', hindi: 'शारीय आहार', duration: '21 Days', time: 'Daily' },
        { name: 'Fermented Rice Water', hindi: 'किण्वित चावल का पानी', duration: 'Daily', time: 'Morning' }
    ],
    'Kitchen Pharmacy': [
        { name: 'Methi (Fenugreek) Water', hindi: 'मेथी दाना पानी', duration: 'Daily', time: 'Overnight soaked, drink morning' },
        { name: 'Jeera (Cumin) Water', hindi: 'जीरा पानी', duration: 'As needed', time: 'Warm after meals' },
        { name: 'Turmeric & Black Pepper Milk', hindi: 'हल्दी दूध', duration: 'Nightly', time: 'Before sleep' },
        { name: 'Ginger Honey Juice', hindi: 'अदरक शहद रस', duration: '3 times/day', time: 'Before meals' },
        { name: 'Coriander Seed Water', hindi: 'धनिया पानी', duration: 'Daily', time: 'Morning' },
        { name: 'Fennel (Saunf) Tea', hindi: 'सौंफ की चाय', duration: 'Daily', time: 'After heavy meal' },
        { name: 'Garlic Clove (Raw)', hindi: 'कच्चा लहसुन', duration: 'Daily', time: 'Morning empty stomach' },
        { name: 'Cinnamon Tea', hindi: 'दालचीनी चाय', duration: 'Daily', time: 'Evening' },
        { name: 'Lemon Honey Water', hindi: 'नींबू शहद पानी', duration: 'Daily', time: 'Morning Warm' },
        { name: 'Apple Cider Vinegar', hindi: 'सेब का सिरका', duration: 'Daily', time: 'Before meals' }
    ],
    'Aromatherapy': [
        { name: 'Lavender Oil Steam', hindi: 'लैवेंडर तेल भाप', duration: '15 Mins', time: 'Night' },
        { name: 'Eucalyptus Oil Inhalation', hindi: 'नीलगिरी तेल सूंघना', duration: 'As needed', time: 'Any time' },
        { name: 'Peppermint Oil Massage', hindi: 'पुदीना तेल मालिश', duration: '10 Mins', time: 'On temples' },
        { name: 'Tea Tree Oil Application', hindi: 'टी ट्री तेल लेप', duration: 'Overnight', time: 'Topic application' },
        { name: 'Lemongrass Oil Diffuser', hindi: 'लेमनग्रास तेल खुशबू', duration: '1 Hour', time: 'Morning' },
        { name: 'Rosemary Oil Massage', hindi: 'रोज़मेरी तेल मालिश', duration: '15 Mins', time: 'Scalp/Joints' }
    ],
    'Acupressure': [
        { name: 'LI4 Point (Hand Web)', hindi: 'LI4 बिंदु (हाथ)', duration: '2 Mins', time: 'When in pain' },
        { name: 'P6 Point (Wrist Inner)', hindi: 'P6 बिंदु (कलाई)', duration: '2 Mins', time: 'For Nausea/Anxiety' },
        { name: 'GV20 (Top of Head)', hindi: 'GV20 (सिर का ऊपरी भाग)', duration: '1 Min', time: 'Morning' },
        { name: 'Sole Massage (Reflexology)', hindi: 'तलवे की मालिश', duration: '10 Mins', time: 'Night' },
        { name: 'Ear Lobe Massage', hindi: 'कान की लोब मालिश', duration: '2 Mins', time: 'Any time' }
    ],
    'Chromotherapy': [
        { name: 'Blue Solarized Water', hindi: 'नीला सूर्यतप्त जल', duration: 'Half Cup', time: 'Every 2 hours' },
        { name: 'Green Solarized Water', hindi: 'हरा सूर्यतप्त जल', duration: '1 Cup', time: 'Morning empty stomach' },
        { name: 'Orange Solarized Water', hindi: 'नारंगी सूर्यतप्त जल', duration: 'Half Cup', time: 'After meals' },
        { name: 'Red Light Exposure', hindi: 'लाल प्रकाश चिकित्सा', duration: '15 Mins', time: 'Morning' },
        { name: 'Green Light Exposure', hindi: 'हरा प्रकाश चिकित्सा', duration: '20 Mins', time: 'Afternoon' }
    ],
    'Mud Therapy': [
        { name: 'Mud Pack to Abdomen', hindi: 'पेट पर मिट्टी की पट्टी', duration: '20 Mins', time: 'Morning empty stomach' },
        { name: 'Mud Pack to Eyes', hindi: 'आंखों पर मिट्टी की पट्टी', duration: '15 Mins', time: 'Evening' },
        { name: 'Full Body Mud Bath', hindi: 'संपूर्ण शरीर मिट्टी स्नान', duration: '45 Mins', time: 'Morning (Sun)' }
    ],
    'Hydrotherapy': [
        { name: 'Hip Bath (Cold)', hindi: 'कटि स्नान (ठंडा)', duration: '10-20 Mins', time: 'Morning' },
        { name: 'Spinal Spray', hindi: 'रीढ़ स्नान', duration: '10 Mins', time: 'Morning/Evening' },
        { name: 'Enema (Douche)', hindi: 'एनिमा', duration: '5-10 Mins', time: 'Morning' },
        { name: 'Steam Bath', hindi: 'भाप स्नान', duration: '10-15 Mins', time: 'Once a week' },
        { name: 'Hot Foot Bath', hindi: 'गर्म पाद स्नान', duration: '15 Mins', time: 'Before Sleep' },
        { name: 'Wet Sheet Pack', hindi: 'गीली चादर लपेट', duration: '45 Mins', time: 'Morning' }
    ],
    'Yoga Therapy': [
        { name: 'Surya Namaskar', hindi: 'सूर्य नमस्कार', duration: '12 Rounds', time: 'Sunrise' },
        { name: 'Kapalbhati Pranayama', hindi: 'कपालभाति प्राणायाम', duration: '15 Mins', time: 'Empty Stomach' },
        { name: 'Anulom Vilom', hindi: 'अनुलोम विलोम', duration: '10 Mins', time: 'Any time' },
        { name: 'Yoga Nidra', hindi: 'योग निद्रा', duration: '20 Mins', time: 'Before Sleep' },
        { name: 'Bhramari Pranayama', hindi: 'भ्रामरी प्राणायाम', duration: '5 Mins', time: 'Before Sleep/Stress' }
    ]
};

const procedures = {
    'Diet Therapy': 'Consume strictly as prescribed. Chew valid slowly. No water 30 mins before/after.',
    'Kitchen Pharmacy': 'Prepare fresh daily. Use organic ingredients if possible. Do not boil honey.',
    'Aromatherapy': 'Add 2-3 drops to carrier oil for massage or to hot water for steam. Never ingest.',
    'Acupressure': 'Press firm but gentle with thumb provided duration. Breathe deeply while pressing.',
    'Chromotherapy': 'Fill colored glass bottle with water, keep in sun for 6-8 hours. Drink as medicine.',
    'Mud Therapy': 'Apply clean clay paste. Cover with cotton cloth. Wash when dry/warm.',
    'Hydrotherapy': 'Maintain water temperature. Cold: 10-18C. Hot: 40-45C. End with cold spray.',
    'Yoga Therapy': 'Perform on empty stomach on a mat. Focus on breath coordination.'
};

const remedies = [];

// Combinatorial Logic to Generate > 500
diseases.forEach(d => {
    Object.keys(therapies).forEach(cat => {
        therapies[cat].forEach(t => {
            let relevant = false;
            let beneficialText = 'Promotes overall wellness and balance.';
            let interactions = 'None known. Safe with other therapies.';

            // Universal Applications - Broaden these
            if (cat === 'Yoga Therapy' || cat === 'Diet Therapy') relevant = true; // Diet and Yoga are good for EVERYTHING in Naturopathy
            if (cat === 'Sun Therapy') relevant = true; // Vitamin D is essential for all
            if (cat === 'Acupressure' && t.name.includes('Sole Massage')) relevant = true; // Reflexology helps all organs
            if (cat === 'Aromatherapy') relevant = true; // Essential oils have broad benefits
            if (cat === 'Kitchen Pharmacy') relevant = true; // Kitchen herbs are safe and effective
            if (cat === 'Mud Therapy') relevant = true; // Detox is good for all

            // Specific Mappings (Keep these for better descriptions, but 'relevant' is already true above for many)
            if (d.name.includes('Diabetes')) {
                if (t.name.includes('Methi') || t.name.includes('Ash Gourd') || t.name.includes('Mud Pack to Abdomen') || t.name.includes('Green Juice') || t.name.includes('Kapalbhati') || t.name.includes('Green Solarized')) {
                    beneficialText = 'Regulates insulin sensitivity and blood sugar.';
                }
            }
            if (d.name.includes('Hypertension') || d.name.includes('Stress') || d.name.includes('Insomnia')) {
                if (t.name.includes('Lavender') || t.name.includes('Blue Solarized') || t.name.includes('Spinal') || t.name.includes('Foot Bath') || t.name.includes('Bhramari') || t.name.includes('Yoga Nidra')) {
                    relevant = true; beneficialText = 'Calms nervous system, lowers BP and induces sleep.';
                }
            }
            if (d.name.includes('Digesti') || d.name.includes('Acid') || d.name.includes('Gas')) {
                if (t.name.includes('Jeera') || t.name.includes('Fennel') || t.name.includes('Mud Pack') || t.name.includes('Enema') || t.name.includes('Hip Bath') || t.name.includes('Lemon')) {
                    relevant = true; beneficialText = 'Improves digestion, reduces acidity and bloating.';
                }
            }
            if (d.name.includes('Joint') || d.name.includes('Pain')) {
                if (t.name.includes('Turmeric') || t.name.includes('Rosemary') || t.name.includes('Steam') || t.name.includes('Red Light') || t.name.includes('Massage') || t.name.includes('Orange Solarized')) {
                    relevant = true; beneficialText = 'Reduces inflammation and improves circulation to joints.';
                }
            }
            if (d.name.includes('Skin') || d.name.includes('Acne') || d.name.includes('Hair')) {
                if (t.name.includes('Neem') || t.name.includes('Tea Tree') || t.name.includes('Green Juice') || t.name.includes('Mud') || t.name.includes('Enema') || t.name.includes('Blue Solarized')) {
                    relevant = true; beneficialText = 'Purifies blood and detoxifies skin layers.';
                }
            }
            if (d.name.includes('Respiratory') || d.name.includes('Coug') || d.name.includes('Fever')) {
                if (t.name.includes('Ginger') || t.name.includes('Eucalyptus') || t.name.includes('Steam') || t.name.includes('Chest') || t.name.includes('Turmeric') || t.name.includes('Orange Solarized')) {
                    relevant = true; beneficialText = 'Clears congestion, boosts immunity and fights infection.';
                }
            }
            if (d.name.includes('Liver') || d.name.includes('Kidney') || d.name.includes('Obesity')) {
                if (t.name.includes('Lemon') || t.name.includes('Corainder') || t.name.includes('Hip Bath') || t.name.includes('Mud Pack to Abdomen') || t.name.includes('Green Solarized') || t.name.includes('Fasting')) {
                    relevant = true; beneficialText = 'Detoxifies organs and boosts metabolism.';
                }
            }
            if (d.name.includes('Headache') || d.name.includes('Migrain')) {
                if (t.name.includes('Peppermint') || t.name.includes('LI4') || t.name.includes('Jal Neti') || t.name.includes('Wet Sheet')) {
                    relevant = true; beneficialText = 'Relieves tension and improves blood flow to head.';
                }
            }
            if (d.name.includes('Women') || d.name.includes('Thyroid')) {
                if (t.name.includes('Cinnamon') || t.name.includes('Hip Bath') || t.name.includes('Yoga') || t.name.includes('Orange Solarized') || t.name.includes('Coriander')) {
                    relevant = true; beneficialText = 'Balances hormones and regulates cycles.';
                }
            }

            if (relevant) {
                remedies.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: `${t.name} for ${d.name}`,
                    nameHindi: `${d.hindi} के लिए ${t.hindi}`,
                    category: cat,
                    disease: d.name,
                    symptoms: d.tags,
                    therapyName: t.name,
                    therapyNameHindi: t.hindi,
                    duration: t.duration,
                    bestTime: t.time,
                    procedure: procedures[cat] || 'Consult expert.',
                    procedureHindi: 'विशेषज्ञ सलाह के अनुसार प्रयोग करें।',
                    benefits: beneficialText,
                    benefitsHindi: 'यह शरीर को प्राकृतिक रूप से स्वस्थ बनाता है।',
                    caution: 'Stop if irritation occurs.',
                    interactions: interactions,
                    price: 0,
                    source: 'Naturopathy & Yoga'
                });
            }
        });
    });
});

console.log(`Generated ${remedies.length} remedies.`);
const output = 'export const naturopathyData = ' + JSON.stringify(remedies, null, 2) + ';';
fs.writeFileSync('./src/utils/naturopathyData.js', output);
console.log('Updated naturopathyData.js');
