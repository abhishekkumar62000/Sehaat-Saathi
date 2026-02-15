import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { beauty, home, singleHerbs, bhasma, oils, ghrita, asava, extracts, arks, classicalMix } from './expansionData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const medicines = [];

// DAILY ESSENTIALS & LIFESTYLE (30)
const daily = [
    ['Dantadhavan Churna', 'दंतधावन चूर्ण', ['Dental Care', 'Gum Health', 'Bad Breath'], '1/2 tsp', 'Morning & Night', 'मंजन करें'],
    ['Irimedadi Tailam', 'इरिमेदादि तैलम', ['Toothache', 'Gum Bleeding', 'Oral Health'], 'External', 'Oil pulling', 'कुल्ला करें (Oil Pulling)'],
    ['Anu Tailam', 'अणु तैलम', ['Nasal Health', 'Sinus Prevention', 'Mental Clarity'], '2 drops', 'Morning', 'नस्य (नाक में डालें)'],
    ['Ksheerabala Tailam', 'क्षीरबला तैलम', ['Daily Massage', 'Nervous System', 'Sleep'], 'External', 'Body massage', 'अभ्यंग (मालिश)'],
    ['Dhanwantharam Tailam', 'धन्वंतरम तैलम', ['Pregnancy Care', 'Post-workout', 'Body Pain'], 'External', 'Body massage', 'अभ्यंग (मालिश)'],
    ['Triphala Ghrita', 'त्रिफला घृत', ['Eye Health', 'Computer Strain', 'Digestion'], '1 tsp', 'Night', 'दूध के साथ'],
    ['Netra Bindu', 'नेत्र बिंदु', ['Eye Cleaning', 'Eye Strain', 'Redness'], '2 drops', 'Morning', 'आंखों में डालें'],
    ['Gandusha Til Taila', 'गंडूश तिल तैल', ['Oral Detox', 'Jaw Strength', 'Voice'], '10ml', 'Morning', 'मुंह में भरकर रखें (Oil Pulling)'],
    ['Snana Churna', 'स्नान चूर्ण', ['Skin Detox', 'Body Odor', 'Freshness'], 'External', 'Use as soap', 'साबुन की जगह प्रयोग करें'],
    ['Kesh Raksha Oil', 'केश रक्षा तेल', ['Hair Fall Prevention', 'Daily Hair Care'], 'External', 'Scalp massage', 'बालों में लगाएं'],
    ['Ubtan Powder', 'उबटन पाउडर', ['Skin Glow', 'Tan Removal', 'Daily Cleanse'], 'External', 'Apply paste', 'लेप लगाएं और धो लें'],
    ['Rose Water (Gulab Jal)', 'गुलाब जल', ['Eye Coolant', 'Skin Toner', 'Refreshment'], 'Spray', 'As needed', 'चेहरे और आंखों पर छिड़कें'],
    ['Aloe Vera Juice', 'एलोवेरा जूस', ['Detox', 'Skin Health', 'Digestion'], '20ml', 'Morning', 'खाली पेट'],
    ['Wheatgrass Juice', 'व्हीटग्रास जूस', ['Blood Purification', 'Energy', 'Chlorophyll'], '20ml', 'Morning', 'खाली पेट'],
    ['Morinda Juice (Noni)', 'नोनी जूस', ['Cellular Health', 'Immunity', 'Energy'], '15ml', 'Morning', 'खाली पेट'],
    ['Tulsi Drops', 'तुलसी ड्रॉप्स', ['Water Purification', 'Immunity', 'Cold Prevention'], '2 drops', 'With water', 'पानी में डालकर पिएं'],
    ['Herbal Tea', 'हर्बल टी', ['Metabolism', 'Energy', 'Detox'], '1 cup', 'Morning/Evening', 'चाय की जगह पिएं'],
    ['Digestive Tea (CCF)', 'पाचक चाय (CCF)', ['Bloating', 'Gas', 'Digestion'], '1 cup', 'After meals', 'जीरा-धनिया-सौंफ की चाय'],
    ['Curcumin Capsules', 'करक्यूमिन कैप्सूल', ['Inflammation', 'Immunity', 'Daily Protection'], '1 cap', 'Night', 'दूध के साथ'],
    ['Omega-3 Flax Seed', 'अलसी कैप्सूल', ['Heart Health', 'Brain Health', 'Joints'], '1 cap', 'Morning', 'पानी के साथ'],
    ['Spirulina Tablets', 'स्पिरुलिना टैबलेट', ['Superfood', 'Protein', 'Energy'], '2 tablets', 'Morning', 'पानी के साथ'],
    ['Moringa Tablet', 'मोरिंगा टैबलेट', ['Multi-vitamin', 'Bone Health', 'Energy'], '2 tablets', 'Morning', 'पानी के साथ'],
    ['A2 Ghee', 'देसी गाय का घी', ['Brain Health', 'Digestion', 'Immunity'], '1 tsp', 'With meals', 'भोजन या दूध में'],
    ['Honey (Raw)', 'कच्चा शहद', ['Weight Management', 'Cough', 'Energy'], '1 tsp', 'Morning', 'गुनगुने पानी के साथ'],
    ['Jaggery (Gud)', 'गुड़', ['Iron Boost', 'Digestion', 'Lung Health'], 'Small piece', 'After meals', 'भोजन के बाद'],
    ['Rock Salt (Sendha Namak)', 'सेंधा नमक', ['Electrolytes', 'Digestion', 'BP Control'], 'Cooking', 'Daily use', 'भोजन में प्रयोग करें'],
    ['Copper Water', 'तांबे का पानी', ['Detox', 'Digestion', 'Immunity'], '1 glass', 'Morning', 'रात भर रखा पानी पिएं'],
    ['Clay Pot Water', 'मिट्टी के घड़े का पानी', ['Cooling', 'Ph Balance', 'Acidity'], 'As needed', 'Daily use', 'दिन भर पिएं'],
    ['Tongue Scraper (Copper)', 'जीभी (तांबा)', ['Oral Hygiene', 'Detox', 'Taste'], 'Tool', 'Morning', 'जीभ साफ करें'],
    ['Foot Massage Oil', 'पादभ्यंग तेल', ['Sleep', 'Eye Health', 'Stress'], 'External', 'Night massage', 'तलवों की मालिश करें'],
];

// FIRST AID & EMERGENCY (25)
const firstAid = [
    ['Jatyadi Ghrita', 'जात्यादि घृत', ['Deep Wounds', 'Non-healing Ulcers', 'Burns'], 'External', 'Apply bandage', 'घाव पर लगाकर पट्टी बांधें'],
    ['Shatadhauta Ghrita', 'शतधौत घृत', ['Severe Burns', 'Chicken Pox Scars', 'Inflammation'], 'External', 'Gentle application', 'जले हुए स्थान पर लगाएं'],
    ['Murivenna Oil', 'मुरिवेन्ना तेल', ['Fractures', 'Sprains', 'Ligament Tear', 'Wounds'], 'External', 'Apply on injury', 'चोट/मोच पर लगाएं'],
    ['Sanjiivani Vati', 'संजीवनी वटी', ['Snake Bite Support', 'Severe Fever', 'Food Poisoning'], '2 tablets', 'Emergency', 'अदरक रस के साथ (डॉक्टर को भी दिखाएं)'],
    ['Vishatinduka Vati', 'विषतिन्दुक वटी', ['Nerve Pain', 'Severe Colic', 'Paralysis'], '1 tablet', 'Consult Dr', 'डॉक्टर की देखरेख में'],
    ['Hingwashita Churna', 'हिंग्वाष्टक चूर्ण', ['Severe Gas Pain', 'Abdominal Cramps'], '1 tsp', 'With warm water', 'गर्म पानी के साथ तुरंत'],
    ['Shankh Bhasma', 'शंख भस्म', ['Acute Acidity', 'Stomach Pain', 'Vomiting'], '250mg', 'Immediate', 'नींबू पानी के साथ'],
    ['Mrityunjay Ras', 'मृत्युंजय रस', ['High Fever', 'Viral Infection', 'Body Ache'], '1 tablet', 'Every 4-6 hrs', 'शहद के साथ'],
    ['Mahasudarshan Churna', 'महासुदर्शन चूर्ण', ['Fever', 'Infection', 'Flu'], '1 tsp', 'Thrice daily', 'गुनगुने पानी के साथ'],
    ['Laxmi Vilas Ras (Nardiya)', 'लक्ष्मी विलास रस (नारदीय)', ['Severe Cold', 'Pneumonia Support', 'Weakness'], '1 tablet', 'Twice daily', 'पान के पत्ते के रस/शहद के साथ'],
    ['Icchabhedi Ras', 'इच्छाभेदी रस', ['Severe Constipation', 'Ascites', 'Detox'], '1 tablet', 'Consult Dr', 'जुलाब के लिए (सावधानी से)'],
    ['Krimikuthar Ras', 'कृमिक कुठार रस', ['Worm Infestation', 'Stomach Pain'], '2 tablets', 'Night', 'गुड़ के साथ'],
    ['Sootshekhar Ras (Gold)', 'सूतशेखर रस (स्वर्ण)', ['Severe Acid Reflux', 'Vomit with Blood', 'Migraine'], '1 tablet', 'Emergency', 'शहद के साथ'],
    ['Hemgarbha Potli', 'हेमगर्भ पोटली', ['Collapse', 'Emergency Heart Support', 'Coma Support'], 'Rub on stone', 'Sublingual', 'जीभ पर चटाएं (आपातकालीन)'],
    ['Sameer Pannag Ras', 'समीर पन्नग रस', ['Paralysis', 'Asthma Attack', 'Joint Stiffness'], '60mg', 'Consult Dr', 'पान के पत्ते के साथ'],
    ['Maha Vishgarbha Tailam', 'महाविषगर्भ तैलम', ['Frozen Shoulder', 'Sciatica', 'Locked Jaw'], 'External', 'Local application', 'दर्द वाली जगह लगाएं'],
    ['Apamarga Kshara Oil', 'अपामार्ग क्षार तेल', ['Ear Pain', 'Ear Infection', 'Deafness'], '2 drops', 'Ear drops', 'कान में डालें'],
    ['Bilva Tailam', 'बिल्व तैलम', ['Ear Pain', 'Hearing Loss', 'Tinnitus'], '2 drops', 'Ear drops', 'कान में डालें'],
    ['Clove Oil', 'लौंग का तेल', ['Toothache', 'Gum Pain'], 'External', 'Apply on tooth', 'दर्द वाले दांत पर ई से लगाएं'],
    ['Peppermint Oil', 'पुदीना तेल', ['Headache', 'Migraine', 'Nausea'], 'External', 'Forehead application', 'माथे पर लगाएं'],
    ['Eucalyptus Oil', 'नीलगिरी तेल', ['Nasal Congestion', 'Cold', 'Chest Rub'], 'Inhalation', 'Steam/Rub', 'भाप लें या छाती पर लगाएं'],
    ['Ajwain Potli', 'अजवायन पोटली', ['Chest Pain', 'Congestion', 'Colic in babies'], 'Hot compress', 'Local apply', 'गर्म करके सिकाई करें'],
    ['Turmeric (Haldi) Paste', 'हल्दी लेप', ['Cuts', 'Wounds', 'Bleeding'], 'External', 'Apply directly', 'घाव पर दबाकर रखें'],
    ['Fitkari (Alum) Water', 'फिटकरी पानी', ['Bleeding', 'Mouth Ulcers', 'Infection'], 'Gargle/Wash', 'As needed', 'कुल्ला करें या घाव धोएं'],
    ['Onion Juice', 'प्याज का रस', ['Sunstroke', 'Nose Bleeding', 'Ear Pain'], 'Drops/Apply', 'As needed', 'तलवों पर लगाएं या नाक में डालें'],
];

// CHILD HEALTH (20)
const child = [
    ['Arvindasava', 'अरविंदासव', ['Digestion', 'Growth', 'Crying', 'Immunity'], '5-10ml', 'Twice daily', 'पानी के साथ'],
    ['Balachaturbhadra Churna', 'बालचातुर्भद्र चूर्ण', ['Fever', 'Cough', 'Diarrhea', 'Vomiting'], '250mg', 'Thrice daily', 'शहद के साथ'],
    ['Swarna Prashan', 'स्वर्ण प्राशन', ['Immunity', 'Intellect', 'Memory', 'Growth'], 'Drops', 'Pushya Nakshatra', 'मासिक पुष्य नक्षत्र पर'],
    ['Janam Ghutti', 'जन्म घुट्टी', ['Colic', 'Constipation', 'Teething Pain'], 'Drops', 'As needed', 'पानी या दूध में'],
    ['Gripe Water (Ayurvedic)', 'ग्राइप वॉटर', ['Gas', 'Colic', 'Indigestion'], '5ml', 'As needed', 'पिलाएं'],
    ['Kasphari Syrup', 'कासहर सिरप', ['Cough', 'Cold', 'Congestion'], '5ml', 'Thrice daily', 'सादा'],
    ['Krimimudgar Ras', 'कृमिमुद्गर रस', ['Worms', 'Stomach Ache', 'Itching'], '1/2 tablet', 'Night', 'पानी के साथ'],
    ['Kumar Kalyan Ras', 'कुमार कल्याण रस', ['Fever', 'Jaundice', 'Rickets', 'Weakness'], '60mg', 'Twice daily', 'मां के दूध/शहद के साथ'],
    ['Saraswat Churna', 'सारस्वत चूर्ण', ['Mental Growth', 'Stuttering', 'Memory'], '1/2 tsp', 'Morning', 'घी या शहद के साथ'],
    ['Mugda Ras', 'मुग्ध रस', ['Diarrhea', 'Vomiting', 'Green Stool'], '60mg', 'Thrice daily', 'शहद के साथ'],
    ['Dantodbheda Gadantaka', 'दंतोद्भेद गदांतक', ['Teething Troubles', 'Fever', 'Loose Motion'], '60mg', 'Twice daily', 'शहद के साथ'],
    ['Rajanyadi Churna', 'राजन्यादि चूर्ण', ['Diarrhea', 'Fever', 'Jaundice', 'Anemia'], '1/2 tsp', 'Twice daily', 'घी के साथ'],
    ['Lakshadi Tailam', 'लाक्षादि तैलम', ['Muscle Strength', 'Growth', 'Fever'], 'External', 'Body massage', 'बच्चे की मालिश करें'],
    ['Bala Ashwagandhadi Tailam', 'बला अश्वगंधादि तैलम', ['Strength', 'Weight Gain', 'Bone Health'], 'External', 'Body massage', 'मालिश करें'],
    ['Talishadi Churna (Kids)', 'तालीसादि चूर्ण', ['Cough', 'Cold', 'Loss of Appetite'], '250mg', 'Thrice daily', 'शहद के साथ'],
    ['Sitopaladi (Kids)', 'सितोपलादि चूर्ण', ['Flu', 'Congestion', 'Fever'], '250mg', 'Thrice daily', 'शहद के साथ'],
    ['Septilin Syrup', 'सेप्टिलिन सिरप', ['Infection', 'Immunity', 'Throat Pain'], '5ml', 'Twice daily', 'सादा'],
    ['Bonnisan', 'बोनीसन', ['Digestion', 'Appetite', 'Growth'], '5ml', 'Twice daily', 'सादा'],
    ['Mentat Syrup', 'मेंटैट सिरप', ['Concentration', 'Bed Wetting', 'Hyperactivity'], '5ml', 'Twice daily', 'सादा'],
    ['Wormiclear Syrup', 'वर्मि क्लियर', ['Deworming', 'Stomach Pain'], '5ml', 'Bedtime', '3 दिन तक'],
];

// GERIATRIC & SEASONAL (20)
const geriatric = [
    ['Rasayan Vati', 'रसायन वटी', ['Anti-aging', 'Strength', 'Urinary Issues'], '2 tablets', 'Morning', 'दूध के साथ'],
    ['Shatavaryadi Ghrita', 'शतावर्यादि घृत', ['Weakness', 'Dryness', 'Vision'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Amritaprasha Ghrita', 'अमृतप्राश घृत', ['Rejuvenation', 'Cough', 'Weakness'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Chyawanprash (Sugar Free)', 'च्यवनप्राश (शुगर फ्री)', ['Immunity', 'Lung Health', 'Strength'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Vrihat Vatchintamani Ras', 'वृहत् वातचिंतामणि रस', ['Paralysis', 'Tremors', 'Heart Health'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Trailokya Chintamani Ras', 'त्रैलोक्य चिंतामणि रस', ['Heart Weakness', 'Chronic Diseases', 'Fluid'], '125mg', 'Twice daily', 'अदरक रस के साथ'],
    ['Swarna Vang', 'स्वर्ण बंग', ['Urinary Incontinence', 'Weakness', 'Lung Health'], '125mg', 'Twice daily', 'शहद/मलाई के साथ'],
    ['Shilajit Gold', 'शिलाजीत गोल्ड', ['Vitality', 'Joint Pain', 'Energy'], '1 cap', 'Morning', 'दूध के साथ'],
    ['Zandu Kesari Jivan', 'केसरी जीवन', ['Energy', 'Calcium', 'Youthfulness'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Geriforte', 'जेरीफोर्ट', ['Senile Stress', 'Immunity', 'Digestion'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Osteoseal', 'ऑस्टियोसील', ['Bone Density', 'Osteoporosis', 'Fracture Healing'], '2 capsules', 'Twice daily', 'दूध के साथ'],
    ['Shallaki Juce', 'शल्लकी जूस', ['Joint Mobility', 'Pain', 'Stiffness'], '20ml', 'Morning', 'पानी के साथ'],
    ['Prostate Care', 'प्रोस्टेट केयर', ['Urinary Flow', 'Prostate Health'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Memory Support', 'मेमोरी सपोर्ट', ['Forgetfulness', 'Focus', 'Brain Fog'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Sleep Wellness', 'स्लीप वेलनेस', ['Insomnia', 'Disturbed Sleep'], '2 tablets', 'Night', 'दूध के साथ'],
    ['Bowel Care', 'बाउल केयर', ['Constipation', 'Colon Cleanse'], '2 tablets', 'Night', 'गुनगुने पानी के साथ'],
    ['Heart Guard', 'हार्ट गार्ड', ['BP Control', 'Cholesterol'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Vision Guard', 'विजन गार्ड', ['Eye Sight', 'Macular Degeneration'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Liv.52 DS', 'लिव.52 डीएस', ['Liver Protection', 'Appetite'], '1 tablet', 'Twice daily', 'पानी के साथ'],
    ['Cystone', 'सिस्टोन', ['Kidney Stones', 'UTI', 'Crystals'], '2 tablets', 'Twice daily', 'पानी के साथ'],
];
// WEIGHT MANAGEMENT (30)
const weight = [
    ['Medohar Guggulu', 'मेदोहर गुग्गुलु', ['Obesity', 'Weight Loss', 'Belly Fat'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Vrikshamla (Garcinia)', 'वृक्षाम्ल', ['Weight Loss', 'Metabolism', 'Appetite Control'], '1 capsule', 'Before meals', 'भोजन से पहले'],
    ['Triphala Guggulu', 'त्रिफला गुग्गुलु', ['Fat Loss', 'Cholesterol', 'Detox'], '2 tablets', 'Twice daily', 'शहद के साथ'],
    ['Guggulutiktaka Kashayam', 'गुग्गुलुतिक्तक कषायम', ['Obesity', 'Skin Disease', 'Inflammation'], '15ml', 'Twice daily', 'खाली पेट'],
    ['Lohasava', 'लोहासव', ['Anemia', 'Obesity', 'Liver Spleen'], '20ml', 'After meals', 'पानी के साथ'],
    ['Ayaskriti', 'अयस्कृति', ['Obesity', 'Diabetes', 'Skin Issues'], '15ml', 'After meals', 'पानी के साथ'],
    ['Varanadi Kashayam', 'वरणादि कषायम', ['Headache', 'Obesity', 'Indigestion'], '15ml', 'Twice daily', 'खाली पेट'],
    ['Navaka Guggulu', 'नवक गुग्गुलु', ['Weight Loss', 'Rheumatism', 'Digestion'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Chitraka', 'चित्रक', ['Slow Metabolism', 'Fat Reduction', 'Digestion'], '500mg', 'Twice daily', 'शहद के साथ'],
    ['Vidanga (Embelia)', 'विडंग', ['Worms', 'Obesity', 'Detox'], '1/2 tsp', 'Night', 'पानी के साथ'],
    ['Musta (Nutgrass)', 'मुस्त', ['Fat Metabolism', 'Digestion', 'Fever'], '1 tsp', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Shilajit', 'शिलाजीत', ['Fat Loss', 'Energy', 'Diabetes'], '250mg', 'Morning', 'दूध/पानी के साथ'],
    ['Arogavardhini Vati', 'आरोग्यवर्धिनी वटी', ['Obesity', 'Liver Detox', 'Skin'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Kanchanar Guggulu', 'कांचनार गुग्गुलु', ['Thyroid', 'Obesity', 'Cysts'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Khadirarishta', 'खदिरारिष्ट', ['Skin Detox', 'Blood Purification', 'Fat Loss'], '20ml', 'After meals', 'पानी के साथ'],
    ['Lekhaniya Gana', 'लेखनीय गण', ['Scraping Fat', 'Weight Loss', 'Detox'], '1 tsp', 'Twice daily', 'शहद और पानी के साथ'],
    ['Udvartana Powder', 'उद्वर्तन चूर्ण', ['Cellulite', 'Fat Reduction', 'Skin Glow'], 'External', 'Dry massage', 'सूखा मालिश करें'],
    ['Honey and Lemon', 'शहद और नींबू', ['Detox', 'Weight Loss', 'Metabolism'], '1 glass', 'Morning', 'गुनगुने पानी में'],
    ['Barley Water', 'जौ का पानी', ['Water Retention', 'Weight Loss', 'Kidney'], '1 glass', 'Daytime', 'दिन भर पिएं'],
    ['Cabbage Juice', 'पत्तागोभी जूस', ['Fat Metabolism', 'Detox'], '1 glass', 'Morning', 'ताजा पिएं'],
    ['Horse Gram Soup', 'कुलथी दाल', ['Weight Loss', 'Kidney Stones', 'Fat Loss'], '1 bowl', 'Lunch', 'सूप पिएं'],
    ['Curry Leaves', 'कढ़ी पत्ता', ['Cholesterol', 'Weight Loss', 'Digestion'], 'Chew 5-10', 'Morning', 'खाली पेट चबाएं'],
    ['Ginger Tea', 'अदरक चाय', ['Metabolism', 'Digestion', 'Weight Loss'], '1 cup', 'Before meals', 'भोजन से पहले'],
    ['Cinnamon Water', 'दालचीनी पानी', ['Insulin Sensitivity', 'Belly Fat', 'PCOS'], '1 cup', 'Morning', 'खाली पेट'],
    ['Fenugreek Water', 'मेथी पानी', ['Diabetes', 'Weight Loss', 'Digestion'], '1 glass', 'Morning', 'रात भर भीगा हुआ'],
    ['Apple Cider Vinegar', 'सेब का सिरका', ['Fat Loss', 'Digestion', 'Sugar Control'], '1 tbsp', 'Before meals', 'पानी में मिलाकर'],
    ['Amritadi Guggulu', 'अमृतादि गुग्गुलु', ['Gout', 'Obesity', 'Skin'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Singhnad Guggulu', 'सिंहनाद गुग्गुलु', ['Joint Pain', 'Weight Loss', 'Detox'], '2 tablets', 'Twice daily', 'गर्म पानी'],
    ['Trayodashang Guggulu', 'त्रयोदशांग गुग्गुलु', ['Sciatica', 'Nervous Pain', 'Weight support'], '2 tablets', 'Twice daily', 'दूध'],
    ['Punarnavadi Kwath', 'पुनर्नवादि क्वाथ', ['Water Retention', 'Swelling', 'Weight Loss'], '20ml', 'Twice daily', 'खाली पेट'],
];

// ENT & EYE CARE (30)
const ent = [
    ['Anu Tailam', 'अणु तैलम', ['Nasal Congestion', 'Sinusitis', 'Headache'], '2 drops', 'Nasal drops', 'नाक में डालें'],
    ['Shadbindu Tailam', 'षडबिंदु तैलम', ['Migraine', 'Sinus', 'Hair Fall'], '2 drops', 'Nasal drops', 'नाक में डालें'],
    ['Netra Bindu', 'नेत्र बिंदु', ['Eye Irritation', 'Redness', 'Vision'], '2 drops', 'Eye drops', 'आंखों में डालें'],
    ['Triphala Ghrita', 'त्रिफला घृत', ['Eye Health', 'Weak Vision', 'Computer Strain'], '1 tsp', 'Night', 'दूध के साथ/आंखों में (तर्पण)'],
    ['Saptamrit Lauh', 'सप्तामृत लौह', ['Eye Diseases', 'Vision', 'Greying Hair'], '250mg', 'Twice daily', 'शहद/घी के साथ'],
    ['Maha Triphala Ghrita', 'महात्रिफला घृत', ['Cataract', 'Eye Pain', 'Vision'], '1 tsp', 'Empty stomach', 'दूध के साथ'],
    ['Elaneer Kuzhambu', 'एलनीर कुझम्बु', ['Cataract', 'Corneal Opacity', 'Eye Care'], 'Apply', 'Collyrium', 'आंख में लगाएं (अंजन)'],
    ['Irimedadi Tailam', 'इरिमेदादि तैलम', ['Dental Pain', 'Gum Disease', 'Bad Breath'], 'Gargle', 'Oil pulling', 'कुल्ला करें'],
    ['Arimedadi Tailam', 'अरिमेदादि तैलम', ['Tooth Decay', 'Weak Gums', 'Oral Health'], 'Gargle', 'Oil pulling', 'कुल्ला करें'],
    ['Khadiradi Vati', 'खदिरादि वटी', ['Mouth Ulcers', 'Throat Pain', 'Hoarseness'], 'Chewable', 'As needed', 'चूसकर खाएं'],
    ['Eladi Vati', 'एलादि वटी', ['Cough', 'Cold', 'Throat Irritation'], 'Chewable', 'As needed', 'चूसकर खाएं'],
    ['Lavangadi Vati', 'लवंगादि वटी', ['Sore Throat', 'Cough', 'Voice Loss'], 'Chewable', 'As needed', 'चूसकर खाएं'],
    ['Vyoshadi Vati', 'व्योषादि वटी', ['Cold', 'Cough', 'Sinusitis'], 'Chewable', 'As needed', 'चूसकर खाएं'],
    ['Kas Kas', 'कास कास', ['Dry Cough', 'Throat Pain'], '1 tsp', 'Twice daily', 'शहद के साथ'],
    ['Tankan Bhasma', 'टंकण भस्म', ['Mouth Ulcers', 'Cough', 'Dandruff'], '125mg', 'With honey', 'शहद के साथ'],
    ['Sphatika Bhasma', 'स्फटिक भस्म', ['Bleeding', 'Ulcers', 'Throat Pain'], '125mg', 'With honey', 'शहद के साथ'],
    ['Karnapuran Oil', 'कर्णपूरन तेल', ['Ear Pain', 'Tinnitus', 'Wax'], 'Drops', 'Ear drops', 'कान में डालें'],
    ['Bilva Tailam', 'बिल्व तैलम', ['Deafness', 'Ear Infection', 'Pain'], 'Drops', 'Ear drops', 'कान में डालें'],
    ['Apamarga Kshara', 'अपामार्ग क्षार', ['Ear Discharge', 'Ear Pain', 'Infection'], 'Drops', 'Ear drops', 'कान में डालें'],
    ['Kshara Tailam', 'क्षार तैलम', ['Ear Wax', 'Ear Pain', 'Discharge'], 'Drops', 'Ear drops', 'कान में डालें'],
    ['Nasya Oil', 'नस्य तेल', ['Brain Health', 'Sleep', 'Sinus'], 'Drops', 'Nasal', 'नाक में डालें'],
    ['Badam Rogan', 'बादाम रोगन', ['Brain Health', 'Nasya', 'Dry Skin'], 'Drops', 'Nasal/Oral', 'नाक में/दूध में'],
    ['Mukta Shukti Pishti', 'मुक्ता शुक्ति पिष्टी', ['Eye Heat', 'Acidity', 'Calcium'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Yasad Bhasma', 'यशद भस्म', ['Eye Diseases', 'Diabetes', 'Immunity'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Amalaki Rasayana', 'आमलकी रसायन', ['Eye Health', 'Hair', 'Immunity'], '1 tsp', 'Morning', 'खाली पेट'],
    ['Bhringrajotsav', 'भृंगराजोत्सव', ['Hair Fall', 'Eye Health', 'Liver'], '20ml', 'After meals', 'पानी के साथ'],
    ['Pathyadi Kadha', 'पथ्यादि काढ़ा', ['Headache', 'Migraine', 'Eye Pain'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Shirashuladivajra Ras', 'शिरशूलादिवज्र रस', ['Severe Headache', 'Migraine', 'Sun Headache'], '1 tablet', 'Twice daily', 'दूध/पानी'],
    ['Mayur Picha Bhasma', 'मयूर पिछ भस्म', ['Hiccups', 'Vomiting', 'Asthma'], '125mg', 'As needed', 'शहद के साथ'],
    ['Kunkuma Ghrita', 'कुंकुम घृत', ['Complexion', 'Eye Health', 'Headache'], 'Nasya', 'Nasal drops', 'नाक में डालें'],
];

// KIDNEY & URINARY (30)
const kidney = [
    ['Chandraprabha Vati', 'चंद्रप्रभा वटी', ['UTI', 'Kidney Stones', 'Prostate'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Gokshuradi Guggulu', 'गोक्षुरादि गुग्गुलु', ['Urinary Problems', 'Kidney Health', 'Stones'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Punarnavadi Mandoor', 'पुनर्नवादि मंडूर', ['Swelling', 'Kidney Detox', 'Anemia'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Varunadi Kwath', 'वरुणादि क्वाथ', ['Kidney Stones', 'Prostate', 'UTI'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Pashanbhed Churna', 'पाषाणभेद चूर्ण', ['Kidney Stones', 'Painful Urination'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Shilajit', ' शिलाजीत', ['Kidney Health', 'Diabetes', 'Energy'], '1 cap', 'Morning', 'दूध के साथ'],
    ['Hajrul Yahood Bhasma', 'हजरुल यहूद भस्म', ['Kidney Stones', 'Colic Pain'], '250mg', 'Twice daily', 'पानी/नारियल पानी'],
    ['Yavakshar', 'यवक्षार', ['UTI', 'Bloating', 'Urinary Blockage'], '250mg', 'Twice daily', 'पानी के साथ'],
    ['Punarnavasava', 'पुनर्नवासव', ['Edema', 'Kidney Function', 'Liver'], '20ml', 'After meals', 'पानी के साथ'],
    ['Chandandasava', 'चंदनासव', ['Burning Urination', 'UTI', 'Heat'], '20ml', 'After meals', 'पानी के साथ'],
    ['Usheerasava', 'उशीरासव', ['Burning Urination', 'Bleeding', 'Heat'], '20ml', 'After meals', 'पानी के साथ'],
    ['Gokshura Churna', 'गोक्षुर चूर्ण', ['Kidney Health', 'Muscle', 'Vitality'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Trinapanchamool Kwath', 'तृणपंचमूल क्वाथ', ['UTI', 'Burning Micturition', 'Kidney'], '20ml', 'Twice daily', 'पानी के साथ'],
    ['Vugrahi Vati', 'व्युग्राही वटी', ['Urinary Incontinence', 'Bed Wetting'], '1 tablet', 'Night', 'दूध के साथ'],
    ['Bang Bhasma', 'बंग भस्म', ['UTI', 'Diabetes', 'Sexual Health'], '125mg', 'Twice daily', 'शहद/मलाई'],
    ['Trivang Bhasma', 'त्रिवंग भस्म', ['Urinary Weakness', 'Diabetes', 'Womens Health'], '125mg', 'Twice daily', 'शहद'],
    ['Kulattha (Horse Gram)', 'कुलत्थ', ['Kidney Stones', 'Obesity'], 'Soup', 'Once daily', 'सूप पिएं'],
    ['Radish Juice', 'मूली का रस', ['Kidney Stones', 'Detox'], '20ml', 'Morning', 'ताजा पिएं'],
    ['Corn Silk Tea', 'भुट्टे के बाल की चाय', ['UTI', 'Kidney Detox', 'Bed wetting'], '1 cup', 'Twice daily', 'चाय बनाकर'],
    ['Cranberry Extract', 'क्रैनबेरी', ['UTI Prevention', 'Bladder Health'], '1 cap', 'Daily', 'पानी के साथ'],
    ['Varun Bark', 'वरुण छाल', ['Kidney Stones', 'Prostate'], 'Decoction', 'Twice daily', 'काढ़ा बनाकर'],
    ['Punarnavadi Guggulu', 'पुनर्नवादि गुग्गुलु', ['Swelling', 'Joint Pain', 'Kidney'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Shwet Parpati', 'श्वेत पर्पटी', ['Dysuria', 'UTI', 'Stone'], '250mg', 'Twice daily', 'पानी/छाछ'],
    ['Mutrakrichantak Churna', 'मूत्रकृच्छ्रांतक चूर्ण', ['Kidney Failure Support', 'High Creatinine'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Renu Vati', 'रेणु वटी', ['Kidney Detox', 'Mental Health'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Neeri Tablet', 'नीरी टैबलेट', ['Kidney Stones', 'UTI', 'Prostate'], '2 tablets', 'Thrice daily', 'पानी के साथ'],
    ['Cystone Forte', 'सिस्टोन फोर्ट', ['Stones', 'Strong Diuretic'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Stonvil', 'स्टोनविल', ['Kidney Stone Expulsion'], '2 caps', 'Twice daily', 'पानी के साथ'],
    ['Alkalizer Syrup', 'अल्कलाइजर', ['Acidic Urine', 'Burning'], '10ml', 'Thrice daily', 'पानी में मिलाकर'],
    ['Chandanadi Vati', 'चंदनादि वटी', ['Gonorrhea', 'Burning Urination', 'UTI'], '2 tablets', 'Twice daily', 'पानी के साथ'],
];

// LIVER & DIGESTIVE SPECIAL (30)
const liver = [
    ['Liv.52', 'लिव.52', ['Liver Tonic', 'Appetite', 'Hepatitis'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Arogyavardhini Vati', 'आरोग्यवर्धिनी वटी', ['Liver Cirrhosis', 'Jaundice', 'Skin'], '2 tablets', 'Twice daily', 'गुनगुने पानी'],
    ['Phalatrikadi Kwath', 'फलत्रिकादि क्वाथ', ['Jaundice', 'Liver Detox', 'Acid Peptic'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Bhumiamalaki', 'भूमिआमलकी', ['Hepatitis B', 'Liver Health', 'Ulcers'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Kutki (Picrorhiza)', 'कुटकी', ['Liver Detox', 'Fever', 'Constipation'], '500mg', 'Twice daily', 'शहद/पानी'],
    ['Kalmegh (Andrographis)', 'कालमेघ', ['Liver Health', 'Fever', 'Immunity'], '1 tsp/tab', 'Twice daily', 'पानी के साथ'],
    ['Punarnava', 'पुनर्नवा', ['Liver Swelling', 'Kidney', 'Edema'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Sharpunkha', 'शरपुंखा', ['Spleen', 'Liver', 'Skin'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Rohitakarista', 'रोहितकारिष्ट', ['Liver Spleen Enlargement', 'Anemia'], '20ml', 'After meals', 'पानी के साथ'],
    ['Kumaryasava', 'कुमार्यासव', ['Fatty Liver', 'Digestion', 'Periods'], '20ml', 'After meals', 'पानी के साथ'],
    ['Drakshasava', 'द्राक्षासव', ['Liver Weakness', 'Energy', 'Sleeplessness'], '20ml', 'After meals', 'पानी के साथ'],
    ['Bhringraj juice', 'भृंगराज स्वरस', ['Liver Detox', 'Hair', 'Jaundice'], '10ml', 'Morning', 'शहद के साथ'],
    ['Kasni (Chicory)', 'कासनी', ['Liver', 'Kidney', 'Coffee Substitute'], 'Seed powder', 'Decoction', 'काढ़ा बनाकर'],
    ['Makoy (Black Nightshade)', 'मकोय', ['Dropsy', 'Liver Swelling'], 'Fruit/Juice', 'Morning', 'रस पिएं'],
    ['Amritarishta', 'अमृतारिष्ट', ['Chronic Fever', 'Liver Immunity'], '20ml', 'After meals', 'पानी के साथ'],
    ['Pippali Mool', 'पिप्पली मूल', ['Liver Enlargement', 'Digestion'], '1/2 tsp', 'Night', 'गर्म पानी'],
    ['Tamra Bhasma', 'ताम्र भस्म', ['Liver', 'Spleen', 'Ascites'], 'Consult Dr', 'With Doctor', 'डॉक्टर की सलाह से'],
    ['Mandur Bhasma', 'मंडूर भस्म', ['Anemia', 'Liver', 'Jaundice'], '250mg', 'Twice daily', 'शहद/छाछ'],
    ['Navayasa Lauh', 'नवायस लौह', ['Anemia', 'Liver Weakness', 'Heart'], '250mg', 'Twice daily', 'शहद/घी'],
    ['Lohasava', 'लोहासव', ['Anemia', 'Swelling', 'Liver'], '20ml', 'After meals', 'पानी के साथ'],
    ['Kaishore Guggulu', 'कैशोर गुग्गुलु', ['Uric Acid', 'Liver', 'Skin'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Patoladi Gana', 'पटोलादि गण', ['Liver Detox', 'Skin', 'Fever'], 'Decoction', 'Twice daily', 'काढ़ा'],
    ['Vasaguduchyadi Kwath', 'वासागुडूच्यादि क्वाथ', ['Liver', 'Jaundice', 'Alcoholism'], '15ml', 'Twice daily', 'पानी के साथ'],
    ['Himalaya Liv.52 DS', 'लिव.52 डीएस', ['Severe Liver Issues'], '1 tab', 'Twice daily', 'पानी'],
    ['Udramrit Vati', 'उदरामृत वटी', ['Ascites', 'Liver Disease', 'Digestion'], '2 tabs', 'Twice daily', 'पानी के साथ'],
    ['Sarvakalp Kwath', 'सर्वकल्प क्वाथ', ['Liver Detox', 'Hepatitis'], 'Decoction', 'Twice daily', 'काढ़ा'],
    ['Totla Kwath', 'टोटला क्वाथ', ['Liver Disorders', 'Infections'], '20ml', 'Twice daily', 'पानी'],
    ['Arkimed', 'अर्क मकोय', ['Liver Swelling'], '20ml', 'Twice daily', 'पानी'],
    ['Arka Kasni', 'अर्क कासनी', ['Liver/Kidney Detox'], '20ml', 'Twice daily', 'पानी'],
    ['Yakrit Plihari Lauh', 'यकृत प्लीहारि लौह', ['Deep Jaundice', 'Spleen'], '1 tab', 'Twice daily', 'शहद'],
];

// FEVER & INFECTIOUS (30)
const fever = [
    ['Tribhuvan Kirti Ras', 'त्रिभुवन कीर्ति रस', ['High Fever', 'Flu', 'Body Pain'], '1 tablet', 'Thrice daily', 'अदरक/शहद'],
    ['Mahasudarshan Ghanvati', 'महासुदर्शन घनवटी', ['Viral Fever', 'Malaria', 'Body Ache'], '2 tablets', 'Twice daily', 'गुनगुने पानी'],
    ['Amrutottara Kashayam', 'अमृतोत्तार कषायम', ['Fever', 'Digestion', 'Immunity'], '15ml', 'Twice daily', 'खाली पेट'],
    ['Sanjivani Vati', 'संजीवनी वटी', ['Typhoid', 'Snake Bite', 'Indigestion'], '2 tablets', 'Twice daily', 'अदरक रस'],
    ['Mrityunjay Ras', 'मृत्युंजय रस', ['Severe Fever', 'Infection', 'Pain'], '1 tablet', 'Every 4-6hr', 'शहद'],
    ['Laxmi Vilas Ras', 'लक्ष्मी विलास रस', ['Chronic Fever', 'Cold', 'Lungs'], '1 tablet', 'Twice daily', 'पान/शहद'],
    ['Godanti Bhasma', 'गोदंती भस्म', ['Headache Fever', 'Typhoid'], '500mg', 'Thrice daily', 'शहद/पानी'],
    ['Praval Pishti', 'प्रवाल पिष्टी', ['Fever Heat', 'Burning', 'Calm'], '250mg', 'Thrice daily', 'शहद'],
    ['Giloy Satva', 'गिलोय सत्व', ['Chronic Fever', 'Burning Hands/Feet', 'Immunity'], '500mg', 'Twice daily', 'पानी/शहद'],
    ['Sitopaladi Churna', 'सितोपलादि चूर्ण', ['Fever Cough', 'Weakness'], '1 tsp', 'Thrice daily', 'शहद'],
    ['Talisadi Churna', 'तालीसादि चूर्ण', ['Cold Fever', 'Loss of Taste'], '1 tsp', 'Twice daily', 'शहद'],
    ['Sadaf Bhasma', 'सदफ भस्म', ['Fever', 'Calcium', 'Weakness'], '250mg', 'Twice daily', 'मलाई/शहद'],
    ['Kasturi Bhairav Ras', 'कस्तूरी भैरव रस', ['Severe Fever', 'Sannipata Jwara'], 'Consult Dr', 'Emergency', 'डॉक्टर की सलाह से'],
    ['Jwarantak Lauh', 'ज्वरांतक लौह', ['Malaria', 'Chronic Fever', 'Anemia'], '1 tablet', 'Twice daily', 'शहद'],
    ['Chandrakala Ras', 'चंद्रकला रस', ['Bleeding with Fever', 'Heat'], '1 tablet', 'Twice daily', 'अनार का रस'],
    ['Kamdudha Ras', 'कामदुधा रस', ['Pitta Fever', 'Headache'], '250mg', 'Twice daily', 'पानी'],
    ['Suvarna Malini Vasant', 'सुवर्ण मालिनी वसंत', ['Chronic low fever', 'TB Support'], '1 tablet', 'Twice daily', 'मलाई/शहद'],
    ['Vasant Malti Ras', 'वसंत मालती रस', ['Chronic Fever', 'Weakness'], '1 tablet', 'Twice daily', 'शहद'],
    ['Jay Mangal Ras', 'जय मंगल रस', ['Chronic Fever', 'Vitality'], '1 tablet', 'Twice daily', 'शहद'],
    ['Visham Jwarantak', 'विषम ज्वरांतक', ['Intermittent Fever', 'Malaria'], '1 tablet', 'Twice daily', 'पानी'],
    ['Bilva Leaf Juice', 'बिल्व पत्र स्वरस', ['Fever', 'Diabetes'], '10ml', 'Morning', 'खाली पेट'],
    ['Tulsi Tea', 'तुलसी चाय', ['Viral Fever', 'Cold'], '1 cup', 'Thrice daily', 'ताजा'],
    ['Neem Bark Decoction', 'नीम छाल काढ़ा', ['Infection', 'Skin Fever'], '20ml', 'Twice daily', 'शहद के साथ'],
    ['Kiratatikta (Chirata)', 'चिरायता', ['Blood Purification', 'Skin', 'Fever'], 'Decoction', 'Night', 'भीगा हुआ पानी पिएं'],
    ['Pippali', 'पिप्पली', ['Lung Infection', 'Fever'], 'Powder', 'With Honey', 'शहद के साथ'],
    ['Dhasha Moola Kattu', 'दशमूल', ['Body Pain Fever', 'Post viral'], 'Decoction', 'Twice daily', 'काढ़ा'],
    ['Vettiver Water', 'खस का पानी', ['Burning Fever', 'Thirst'], 'Drink', 'All day', 'घूंट घूंट पिएं'],
    ['Shadanga Paniya', 'षडंग पानीय', ['Fever Thirst', 'Dehydration'], 'Drink', 'All day', 'पानी की जगह'],
    ['Dhanyaka Hima', 'धनिया पानी', ['Burning Sensation'], 'Drink', 'Morning', 'रात भर भीगा हुआ'],
    ['Sudarshan Churna', 'सुदर्शन चूर्ण', ['All Fevers', 'Liver', 'Spleen'], '1 tsp', 'Twice daily', 'गुनगुने पानी'],
];

// THYROID & HORMONAL (30)
const thyroid = [
    ['Kanchanar Guggulu', 'कांचनार गुग्गुलु', ['Hypothyroidism', 'Goiter', 'PCOS'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Vriddhi Vadhika Vati', 'वृद्धि वाधिका वटी', ['Hernia', 'Thyroid', 'Tumors'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Punarnavadi Guggulu', 'पुनर्नवादि गुग्गुलु', ['Thyroid Swelling', 'Edema'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Triphala Churna', 'त्रिफला चूर्ण', ['Thyroid Detox', 'Weight'], '1 tsp', 'Night', 'गुनगुने पानी'],
    ['Trikatu Churna', 'त्रिकटु चूर्ण', ['Metabolism', 'Hypothyroid'], '1/2 tsp', 'Twice daily', 'शहद'],
    ['Shuddha Guggulu', 'शुद्ध गुग्गुलु', ['Fat Metabolism', 'Thyroid'], '1 tablet', 'Twice daily', 'गुनगुने पानी'],
    ['Arogyavardhini Vati', 'आरोग्यवर्धिनी वटी', ['Thyroid Liver', 'Metabolism'], '2 tablets', 'Twice daily', 'पानी'],
    ['Shilajit', ' शिलाजीत', ['Hormonal Balance', 'Energy'], '1 cap', 'Morning', 'दूध'],
    ['Ashwagandha', 'अश्वगंधा', ['Thyroid Stress', 'Hypothyroid'], '1 tsp', 'Night', 'दूध'],
    ['Brahmi', 'ब्राह्मी', ['Thyroid Fog', 'Stress'], '2 tablets', 'Morning', 'पानी'],
    ['Jalkumbhi Bhasma', 'जलकुंभी भस्म', ['Goiter', 'Thyroid'], '125mg', 'Twice daily', 'शहद'],
    ['Praval Pishti', 'प्रवाल पिष्टी', ['Hyperthyroid', 'Heat', 'Calcium'], '250mg', 'Twice daily', 'शहद'],
    ['Kamdudha Ras', 'कामदुधा रस', ['Hyperthyroid', 'Pitta'], '250mg', 'Twice daily', 'पानी'],
    ['Muktashukti Bhasma', 'मुक्ताशुक्ति भस्म', ['Hyperthyroid', 'Anxiety'], '250mg', 'Twice daily', 'शहद'],
    ['Shatavari', 'शतावरी', ['Hormonal Balance', 'Women Thyroid'], '1 tsp', 'Twice daily', 'दूध'],
    ['Gokshura', 'गोक्षुर', ['Thyroid Edema', 'Kidney'], '1 tsp', 'Twice daily', 'पानी'],
    ['Varunadi Kashayam', 'वरुणादि कषायम', ['Thyroid Weight', 'Metabolism'], '15ml', 'Twice daily', 'खाली पेट'],
    ['Mahamanjishthadi Kwath', 'महामंजिष्ठादि क्वाथ', ['Thyroid Skin', 'Detox'], '15ml', 'Twice daily', 'खाली पेट'],
    ['Sarivadyasava', 'सारिवाद्यासव', ['Hyperthyroid', 'Cooling'], '20ml', 'After meals', 'पानी'],
    ['Chandankala Ras', 'चंद्रकला रस', ['Hyperthyroid Heat'], '1 tab', 'Twice daily', 'पानी'],
    ['Gandmala Kandan Ras', 'गंडमाला कंडन रस', ['Goiter', 'Thyroid Nodules'], '1 tab', 'Twice daily', 'पानी'],
    ['Selenium Supplement (Brazil Nut)', 'सेलेनियम (ब्राजील नट)', ['Thyroid Support'], '2 nuts', 'Morning', 'खाएं'],
    ['Coconut Oil', 'नारियल तेल', ['Metabolism', 'Thyroid'], '1 tbsp', 'Cooking', 'भोजन में'],
    ['Coriander Water', 'धनिये का पानी', ['Thyroid Function'], '1 glass', 'Morning', 'भीगा हुआ'],
    ['Walnut (Akhrot)', 'अखरोट', ['Thyroid Brain'], '2 pieces', 'Morning', 'भिगोकर'],
    ['Flax Seeds', 'अलसी', ['Thyroid Omega-3'], '1 tsp', 'Roasted', 'चबाकर'],
    ['Moringa Leaf', 'सहजन पत्ती', ['Thyroid Nutrition'], '1 tsp', 'Morning', 'पानी के साथ'],
    ['Liquorice (Mulethi)', 'मुलेठी', ['Thyroid Fatigue', 'Adrenal'], '1/2 tsp', 'Morning', 'चाय/शहद'],
    ['Bugleweed', 'बगलवीड', ['Hyperthyroid'], 'Tea', 'Consult Dr', 'चाय (सावधानी)'],
    ['Lemon Balm', 'लेमन बाम', ['Hyperthyroid', 'Stress'], 'Tea', 'Evening', 'चाय'],
];

// PREGNANCY & WOMEN SPECIAL (30) (Expanding Womens)
const pregnancy = [
    ['Garbhpal Ras', 'गर्भपाल रस', ['Pregnancy Safety', 'Morning Sickness'], '1 tablet', 'Twice daily', 'दूध/शहद'],
    ['Phal Ghrita', 'फल घृत', ['Conception', 'Pregnancy Tonic'], '1 tsp', 'Morning', 'दूध'],
    ['Shatavari Kalpa', 'शतावरी कल्प', ['Lactation', 'Pregnancy Strength'], '2 tsp', 'Twice daily', 'दूध'],
    ['Dhatri Lauh', 'धात्री लौह', ['Pregnancy Anemia', 'Acidity'], '1 tablet', 'Twice daily', 'शहद'],
    ['Laghu Malini Vasant', 'लघु मालिनी वसंत', ['Pregnancy Fever', 'Weakness'], '1 tablet', 'Twice daily', 'शहद/मलाई'],
    ['Praval Bhasma', 'प्रवाल भस्म', ['Pregnancy Calcium', 'Acidity'], '250mg', 'Twice daily', 'शहद'],
    ['Muktashukti', 'मुक्ताशुक्ति', ['Calcium', 'Bone Health'], '250mg', 'Twice daily', 'शहद'],
    ['Saubhagya Shunthi', 'सौभाग्य शुंठी', ['Postpartum Recovery', 'Milk'], '1 tsp', 'Twice daily', 'दूध'],
    ['Dashmoolarishta', 'दशमूलारिष्ट', ['Post-delivery Pain', 'Strength'], '20ml', 'After meals', 'पानी'],
    ['Jeerakarishta', 'जीरा कारिष्ट', ['Postpartum Digestion', 'Milk'], '20ml', 'After meals', 'पानी'],
    ['Devdarivyadi Kwath', 'देवदार्व्यादि क्वाथ', ['Postpartum Uterus', 'Pain'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Balant Kadha', 'बालंत काढ़ा', ['Postpartum Care'], '20ml', 'Twice daily', 'पानी'],
    ['Dhanwantharam Kashayam', 'धन्वंतरम कषायम', ['Pregnancy/Postpartum'], '15ml', 'Twice daily', 'पानी'],
    ['Sukumaram Kashayam', 'सुकुमारम कषायम', ['PCOS', 'Fertility', 'Pain'], '15ml', 'Twice daily', 'पानी'],
    ['Pushyanuga Churna', 'पुष्यानुग चूर्ण', ['White Discharge', 'Bleeding'], '1 tsp', 'Twice daily', 'chawal ka dhovan/honey'],
    ['Lodhrasava', 'लोध्रासव', ['Leucorrhea', 'Periods'], '20ml', 'After meals', 'पानी'],
    ['Patrangasava', 'पत्रांगासव', ['Heavy Bleeding', 'Strength'], '20ml', 'After meals', 'पानी'],
    ['Pradrantak Ras', 'प्रदरांतक रस', ['Leucorrhea', 'Infection'], '1 tablet', 'Twice daily', 'शहद'],
    ['Stri Rasayan', 'स्त्री रसायन', ['Womens Tonic'], '1 tab', 'Twice daily', 'दूध'],
    ['Menosan', 'मेनोसान', ['Menopause', 'Hot Flashes'], '1 tab', 'Twice daily', 'पानी'],
    ['Evecare', 'ईवकेयर', ['Cycle Regularity', 'PCOS'], '10ml', 'Twice daily', 'पानी'],
    ['M2-Tone', 'एम2-टोन', ['Infertility', 'PCOS'], '10ml', 'Twice daily', 'पानी'],
    ['Amycordial', 'एमीकोर्डियल', ['PCOS', 'Irregular Periods'], '10ml', 'Twice daily', 'पानी'],
    ['Nashtapushpantak Ras', 'नष्टपुष्पांतक रस', ['Amenorrhea', 'Pain'], '1 tablet', 'Twice daily', 'शहद'],
    ['Rajahpravartani Vati', 'रजःप्रवर्तिनी वटी', ['Delayed Periods', 'PCOS'], '2 tablets', 'Twice daily', 'हिंग पानी'],
    ['Kasis Bhasma', 'कसीस भस्म', ['Anemia', 'Liver'], '125mg', 'Twice daily', 'शहद'],
    ['Mandur Vataka', 'मंडूर वटक', ['Anemia in Pregnancy'], '1 tab', 'Twice daily', 'छाछ'],
    ['Garbha Chintamani Ras', 'गर्भ चिंतामणि रस', ['Complicated Pregnancy'], 'Consult Dr', 'Critical', 'डॉक्टर'],
    ['Vang Bhasma', 'वंग भस्म', ['Ovarian Health'], '125mg', 'Twice daily', 'शहद'],
    ['Badam Pak', 'बादाम पाक', ['Strength', 'Brain', 'Pregnancy'], '1 tsp', 'Morning', 'दूध'],
];

// DIGESTIVE (50)
const digestive = [
    ['Triphala Churna', 'त्रिफला चूर्ण', ['Constipation', 'Bloating', 'Detox'], '1 tsp', 'Night', 'रात को गुनगुने पानी के साथ'],
    ['Hingvastak Churna', 'हिंग्वाष्टक चूर्ण', ['Gas', 'Bloating', 'Flatulence'], '1/2 tsp', 'Before meals', 'भोजन से पहले'],
    ['Avipattikar Churna', 'अविपत्तिकर चूर्ण', ['Acidity', 'Heartburn', 'GERD'], '1 tsp', 'After meals', 'भोजन के बाद'],
    ['Kutajarishta', 'कुटजारिष्ट', ['Diarrhea', 'Dysentery', 'IBS'], '15-30ml', 'After meals', 'भोजन के बाद पानी के साथ'],
    ['Dadimashtak Churna', 'दाड़िमाष्टक चूर्ण', ['Indigestion', 'Loss of Appetite', 'Malabsorption'], '1 tsp', 'Before meals', 'भोजन से पहले'],
    ['Lavanbhaskar Churna', 'लवणभास्कर चूर्ण', ['Bloating', 'Abdominal Pain', 'Poor Digestion'], '1 tsp', 'With meals', 'भोजन के साथ'],
    ['Chitrakadi Vati', 'चित्रकादि वटी', ['Weak Digestion', 'Loss of Appetite', 'Ama'], '2 tablets', 'Before meals', 'भोजन से पहले'],
    ['Panchsakar Churna', 'पंचसकार चूर्ण', ['Constipation', 'Hemorrhoids', 'Liver Detox'], '1 tsp', 'Night', 'रात को सोने से पहले'],
    ['Agnitundi Vati', 'अग्नितुंडी वटी', ['Indigestion', 'Abdominal Distension', 'Nausea'], '1-2 tablets', 'After meals', 'भोजन के बाद'],
    ['Shankha Vati', 'शंख वटी', ['Hyperacidity', 'Gastritis', 'Ulcer'], '1-2 tablets', 'After meals', 'भोजन के बाद'],
    ['Kamadudha Ras', 'कामदुधा रस', ['Acidity', 'Heartburn', 'Pitta Disorders'], '125mg', 'Twice daily', 'दिन में दो बार'],
    ['Praval Pishti', 'प्रवाल पिष्टी', ['Acidity', 'Calcium Deficiency', 'Pitta'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Sutshekhar Ras', 'सूतशेखर रस', ['Acidity', 'Vomiting', 'Nausea'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Bhunimbadi Churna', 'भूनिम्बादि चूर्ण', ['Liver Disorders', 'Jaundice', 'Bile Deficiency'], '1 tsp', 'Before meals', 'भोजन से पहले'],
    ['Arogyavardhini Vati', 'आरोग्यवर्धिनी वटी', ['Liver Detox', 'Skin Diseases', 'Obesity'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Yakrit Plihari Loha', 'यकृत प्लीहारि लोह', ['Liver Enlargement', 'Spleen Disorders', 'Anemia'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Kumaryasava', 'कुमार्यासव', ['Liver Disorders', 'Digestive Issues', 'Womens Health'], '15-30ml', 'After meals', 'समान मात्रा पानी के साथ'],
    ['Draksharishta', 'द्राक्षारिष्ट', ['Constipation', 'Weakness', 'Anemia'], '15-30ml', 'After meals', 'भोजन के बाद'],
    ['Abhayarishta', 'अभयारिष्ट', ['Constipation', 'Hemorrhoids', 'Piles'], '15-30ml', 'After meals', 'भोजन के बाद पानी के साथ'],
    ['Jirakadyarishta', 'जीरकाद्यारिष्ट', ['Post-delivery Weakness', 'Indigestion', 'Loss of Appetite'], '15-30ml', 'After meals', 'भोजन के बाद'],
    ['Pippalyasava', 'पिप्पल्यासव', ['Indigestion', 'Cough', 'Respiratory Issues'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Bilvadi Churna', 'बिल्वादि चूर्ण', ['Diarrhea', 'IBS', 'Dysentery'], '1 tsp', 'Twice daily', 'छाछ के साथ'],
    ['Gangadhara Churna', 'गंगाधर चूर्ण', ['Chronic Diarrhea', 'Malabsorption', 'IBS'], '1 tsp', 'Twice daily', 'छाछ के साथ'],
    ['Mustakarishta', 'मुस्तकारिष्ट', ['Diarrhea', 'IBS', 'Indigestion'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Shivakshar Pachan', 'शिवाक्षार पाचन', ['Indigestion', 'Gas', 'Bloating'], '1/2 tsp', 'After meals', 'भोजन के बाद'],
    ['Drakshadi Churna', 'द्राक्षादि चूर्ण', ['Constipation', 'Pitta Disorders', 'Burning Sensation'], '1 tsp', 'Night', 'दूध के साथ'],
    ['Narikela Lavana', 'नारिकेल लवण', ['Acidity', 'Heartburn', 'Ulcers'], '1/2 tsp', 'After meals', 'भोजन के बाद'],
    ['Eladi Churna', 'एलादि चूर्ण', ['Nausea', 'Vomiting', 'Morning Sickness'], '1/4 tsp', 'As needed', 'शहद के साथ'],
    ['Talisadi Churna', 'तालीसादि चूर्ण', ['Indigestion', 'Cough', 'Loss of Appetite'], '1 tsp', 'After meals', 'शहद के साथ'],
    ['Sitopaladi Churna', 'सितोपलादि चूर्ण', ['Cough', 'Loss of Appetite', 'Weakness'], '1 tsp', 'Twice daily', 'शहद के साथ'],
];

// IMMUNITY (40)
const immunity = [
    ['Ashwagandha Churna', 'अश्वगंधा चूर्ण', ['Weakness', 'Stress', 'Low Immunity', 'Fatigue'], '1 tsp', 'Morning & Night', 'दूध के साथ'],
    ['Chyawanprash', 'च्यवनप्राश', ['Low Immunity', 'Cough', 'Cold', 'Weakness'], '1-2 tsp', 'Morning', 'खाली पेट दूध के साथ'],
    ['Giloy Ghanvati', 'गिलोय घनवटी', ['Fever', 'Immunity', 'Chronic Fever', 'Dengue'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Tulsi Ghanvati', 'तुलसी घनवटी', ['Cough', 'Cold', 'Immunity Booster'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Amla Churna', 'आंवला चूर्ण', ['Vitamin C', 'Immunity', 'Hair Health', 'Digestion'], '1 tsp', 'Morning', 'पानी के साथ'],
    ['Shatavari Churna', 'शतावरी चूर्ण', ['Womens Health', 'Immunity', 'Lactation', 'Fertility'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Brahma Rasayana', 'ब्रह्म रसायन', ['Memory', 'Immunity', 'Anti-aging', 'Rejuvenation'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Amalaki Rasayana', 'आमलकी रसायन', ['Anti-aging', 'Immunity', 'Skin Health', 'Hair Health'], '1 tsp', 'Morning', 'खाली पेट'],
    ['Swarna Bhasma', 'स्वर्ण भस्म', ['Immunity', 'Strength', 'Memory', 'Anti-aging'], '15-30mg', 'With honey', 'शहद के साथ'],
    ['Abhrak Bhasma', 'अभ्रक भस्म', ['Chronic Diseases', 'Immunity', 'Respiratory Issues'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Praval Bhasma', 'प्रवाल भस्म', ['Calcium', 'Immunity', 'Fever', 'Cough'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Godanti Bhasma', 'गोदंती भस्म', ['Fever', 'Headache', 'Migraine', 'Calcium'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Vasant Kusumakar Ras', 'वसंत कुसुमाकर रस', ['Diabetes', 'Immunity', 'Weakness', 'Memory'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Makardhwaj', 'मकरध्वज', ['Immunity', 'Strength', 'Rejuvenation', 'Chronic Diseases'], '125mg', 'Morning', 'शहद के साथ'],
    ['Suvarna Malini Vasant', 'सुवर्ण मालिनी वसंत', ['Chronic Fever', 'Tuberculosis', 'Immunity'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Samshamani Vati', 'संशमनी वटी', ['Fever', 'Immunity', 'Chronic Infections'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Neem Ghanvati', 'नीम घनवटी', ['Blood Purification', 'Skin Diseases', 'Immunity'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Haridra Khand', 'हरिद्रा खंड', ['Allergies', 'Skin Health', 'Immunity', 'Urticaria'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Amritarishta', 'अमृतारिष्ट', ['Chronic Fever', 'Immunity', 'Weakness'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Lohasava', 'लोहासव', ['Anemia', 'Weakness', 'Immunity', 'Liver Disorders'], '15-30ml', 'After meals', 'पानी के साथ'],
];

// JOINT & PAIN (30)
const joint = [
    ['Yograj Guggulu', 'योगराज गुग्गुलु', ['Joint Pain', 'Arthritis', 'Rheumatism', 'Sciatica'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Mahayograj Guggulu', 'महायोगराज गुग्गुलु', ['Severe Arthritis', 'Paralysis', 'Neurological'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Rasnadi Guggulu', 'रास्नादि गुग्गुलु', ['Joint Pain', 'Sciatica', 'Back Pain', 'Stiffness'], '2 tablets', 'Twice daily', 'गर्म पानी के साथ'],
    ['Triphala Guggulu', 'त्रिफला गुग्गुलु', ['Hemorrhoids', 'Fistula', 'Joint Pain', 'Obesity'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Kaishore Guggulu', 'कैशोर गुग्गुलु', ['Gout', 'Skin Diseases', 'Joint Pain', 'Blood Purification'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Sinhanaad Guggulu', 'सिंहनाद गुग्गुलु', ['Rheumatoid Arthritis', 'Sciatica', 'Constipation'], '2 tablets', 'Night', 'गर्म पानी के साथ'],
    ['Punarnavadi Guggulu', 'पुनर्नवादि गुग्गुलु', ['Edema', 'Kidney Issues', 'Joint Pain'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Chandraprabha Vati', 'चंद्रप्रभा वटी', ['Urinary Issues', 'Joint Pain', 'Diabetes', 'Weakness'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Dashmool Kwath', 'दशमूल क्वाथ', ['Body Pain', 'Inflammation', 'Fever', 'Weakness'], '20ml', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Maharasnadi Kwath', 'महारास्नादि क्वाथ', ['Sciatica', 'Back Pain', 'Joint Stiffness'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Rasna Saptak Kwath', 'रास्ना सप्तक क्वाथ', ['Joint Pain', 'Arthritis', 'Inflammation'], '20ml', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Bala Tailam', 'बला तैलम', ['Muscle Pain', 'Joint Pain', 'Weakness', 'Paralysis'], 'External', 'Apply and massage', 'मालिश करें'],
    ['Mahanarayan Tailam', 'महानारायण तैलम', ['Joint Pain', 'Muscle Pain', 'Stiffness', 'Paralysis'], 'External', 'Warm massage', 'गर्म करके मालिश करें'],
    ['Kottamchukkadi Tailam', 'कोट्टमचुक्कादि तैलम', ['Joint Pain', 'Swelling', 'Inflammation', 'Sports Injury'], 'External', 'Warm massage', 'गर्म करके मालिश करें'],
    ['Pinda Tailam', 'पिंड तैलम', ['Gout', 'Burning Pain', 'Inflammation', 'Swelling'], 'External', 'Apply gently', 'हल्के हाथ से लगाएं'],
    ['Vishgarbha Tailam', 'विषगर्भ तैलम', ['Severe Joint Pain', 'Rheumatism', 'Nerve Pain'], 'External', 'Warm massage', 'गर्म करके मालिश करें'],
    ['Shallaki (Boswellia)', 'शल्लकी', ['Osteoarthritis', 'Joint Inflammation', 'Mobility'], '400mg', 'Twice daily', 'भोजन के बाद'],
    ['Nirgundi (Vitex)', 'निर्गुंडी', ['Joint Pain', 'Swelling', 'Headache', 'Inflammation'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Eranda (Castor) Tailam', 'एरंड तैलम', ['Constipation', 'Joint Pain', 'Sciatica'], '1 tsp', 'Night', 'गर्म दूध के साथ'],
    ['Guggulu Tiktaka Ghritam', 'गुग्गुलु तिक्तक घृतम', ['Chronic Arthritis', 'Skin Diseases', 'Bone Disorders'], '1 tsp', 'Before meals', 'गुनगुने पानी के साथ'],
];

// RESPIRATORY (25)
const respiratory = [
    ['Vasavaleha', 'वासावलेह', ['Cough', 'Bronchitis', 'Asthma', 'Bleeding Disorders'], '1 tsp', 'Twice daily', 'शहद के साथ'],
    ['Kantakari Avaleha', 'कंटकारी अवलेह', ['Dry Cough', 'Asthma', 'Bronchitis', 'Throat Pain'], '1 tsp', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Agastyaharitaki', 'अगस्त्यहरीतकी', ['Chronic Cough', 'Asthma', 'Hiccups', 'Bronchitis'], '1 tsp', 'Twice daily', 'शहद के साथ'],
    ['Kanakasava', 'कनकासव', ['Bronchial Asthma', 'Cough', 'Tuberculosis', 'Phlegm'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Drakshasava', 'द्राक्षासव', ['Cough', 'Cold', 'Anemia', 'Weakness'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Vyaghri Haritaki', 'व्याघ्री हरीतकी', ['Cough', 'Cold', 'Sore Throat', 'Bronchitis'], '1 tsp', 'Twice daily', 'शहद के साथ'],
    ['Lavangadi Vati', 'लवंगादि वटी', ['Cough', 'Sore Throat', 'Hoarseness', 'Tonsillitis'], '1-2 tablets', 'Suck slowly', 'चूसकर लें'],
    ['Khadiradi Vati', 'खदिरादि वटी', ['Mouth Ulcers', 'Throat Pain', 'Tonsillitis', 'Bad Breath'], '1-2 tablets', 'Suck slowly', 'चूसकर लें'],
    ['Yashtimadhu (Mulethi)', 'यष्टिमधु', ['Cough', 'Sore Throat', 'Acidity', 'Voice Problems'], '1/2 tsp', 'Twice daily', 'शहद के साथ'],
    ['Pippali Churna', 'पिप्पली चूर्ण', ['Cough', 'Asthma', 'Cold', 'Low Digestion'], '1/4 tsp', 'Twice daily', 'शहद के साथ'],
    ['Trikatu Churna', 'त्रिकटु चूर्ण', ['Cold', 'Cough', 'Sinus', 'Kapha Disorders'], '1/4 tsp', 'Twice daily', 'शहद के साथ'],
    ['Tribhuvankirti Ras', 'त्रिभुवनकीर्ति रस', ['Fever', 'Flu', 'Body Pain', 'Cough'], '125mg', 'Twice daily', 'अदरक रस के साथ'],
    ['Godanti Mishran', 'गोदंती मिश्रण', ['Fever', 'Cold', 'Body Aches', 'Headache'], '250mg', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Mayur Chandrika Vati', 'मयूर चंद्रिका वटी', ['Chronic Cough', 'Kapha Disorders', 'Congestion'], '2 tablets', 'Twice daily', 'शहद के साथ'],
    ['Shwaskuthar Ras', 'श्वासकुठार रस', ['Asthma', 'Breathlessness', 'Bronchitis'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Shringa Bhasma', 'शृंग भस्म', ['Cough', 'Cold', 'Fever', 'Respiratory Issues'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Anu Tailam (Nasya)', 'अणु तैलम', ['Sinusitis', 'Headache', 'Hair Fall', 'Nasal Congestion'], '2 drops', 'Morning', 'नाक में डालें'],
    ['Shadbindu Tailam', 'षडबिंदु तैलम', ['Sinusitis', 'Headache', 'Hair Fall', 'Migraine'], '2 drops', 'Morning', 'नाक में डालें'],
    ['Haridrakhand', 'हरिद्राखंड', ['Allergies', 'Rhinitis', 'Skin Allergies', 'Urticaria'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Balapunarnavadi Kashayam', 'बलापुनर्नवादि कषायम', ['Respiratory Issues', 'Swelling', 'Kidney Disorders'], '15ml', 'Twice daily', 'पानी के साथ'],
];

// SKIN & HAIR (25)
const skin = [
    ['Mahamanjisthadi Kwath', 'महामंजिष्ठादि क्वाथ', ['Skin Diseases', 'Acne', 'Eczema', 'Blood Purification'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Sarivadyasava', 'सारिवाद्यासव', ['Skin Diseases', 'Blood Purification', 'Wounds'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Khadirarishta', 'खदिरारिष्ट', ['Skin Diseases', 'Leprosy', 'Eczema', 'Psoriasis'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Gandhak Rasayan', 'गंधक रसायन', ['Skin Diseases', 'Scabies', 'Itching', 'Ring Worm'], '250mg', 'Twice daily', 'दूध के साथ'],
    ['Mahatiktaka Ghrita', 'महातिक्तक घृत', ['Chronic Skin Diseases', 'Psoriasis', 'Eczema'], '1 tsp', 'Before meals', 'गुनगुने पानी के साथ'],
    ['Jatyadi Tailam', 'जात्यादि तैलम', ['Wounds', 'Ulcers', 'Burns', 'Skin Infections'], 'External', 'Apply on wounds', 'घाव पर लगाएं'],
    ['Kumkumadi Tailam', 'कुमकुमादि तैलम', ['Dark Spots', 'Acne Scars', 'Glowing Skin', 'Pigmentation'], 'External', 'Night application', 'रात को लगाएं'],
    ['Nalpamaradi Tailam', 'नालपामरादि तैलम', ['Skin Infections', 'Fungal Infections', 'Itching'], 'External', 'Apply before bath', 'नहाने से पहले'],
    ['Eladi Tailam', 'एलादि तैलम', ['Skin Diseases', 'Burns', 'Wounds', 'Infections'], 'External', 'Apply on affected area', 'प्रभावित क्षेत्र पर'],
    ['Bhringraj Tailam', 'भृंगराज तैलम', ['Hair Fall', 'Premature Greying', 'Dandruff', 'Headache'], 'External', 'Apply to scalp', 'सिर पर मालिश करें'],
    ['Neelibhringadi Tailam', 'नीलीभृंगादि तैलम', ['Hair Fall', 'Dandruff', 'Greying Hair', 'Hair Growth'], 'External', 'Night scalp massage', 'रात को सिर पर लगाएं'],
    ['Mahabhringraj Tailam', 'महाभृंगराज तैलम', ['Severe Hair Fall', 'Baldness', 'Premature Greying'], 'External', 'Scalp massage', 'सिर की मालिश'],
    ['Keshya Tailam', 'केश्य तैलम', ['Hair Health', 'Dandruff', 'Hair Growth', 'Scalp Health'], 'External', 'Apply twice weekly', 'सप्ताह में दो बार'],
    ['Bakuchi Churna', 'बाकुची चूर्ण', ['Vitiligo', 'White Patches', 'Skin Pigmentation'], '1/2 tsp', 'Morning', 'गुनगुने पानी के साथ'],
    ['Nimbadi Churna', 'निम्बादि चूर्ण', ['Acne', 'Boils', 'Skin Infections', 'Blood Purification'], '1 tsp', 'Twice daily', 'पानी के साथ'],
    ['Surakshit Twak', 'सुरक्षित त्वक', ['Skin Protection', 'Anti-aging', 'Wrinkles'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Lodhra Churna', 'लोध्र चूर्ण', ['Skin Complexion', 'Acne', 'Wounds', 'Uterine Disorders'], '1/2 tsp', 'Twice daily', 'पानी के साथ'],
    ['Aragwadharishta', 'आरग्वधारिष्ट', ['Skin Diseases', 'Constipation', 'Blood Purification'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Sariva (Anantmool)', 'सारिवा', ['Blood Purification', 'Skin Diseases', 'Fever', 'Urinary Issues'], '1/2 tsp', 'Twice daily', 'पानी के साथ'],
    ['Navaka Guggulu', 'नवक गुग्गुलु', ['Obesity', 'Skin Diseases', 'Lipid Disorders'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
];

// WOMENS HEALTH (20)
const womens = [
    ['Shatavari Kalpa', 'शतावरी कल्प', ['Menstrual Issues', 'Lactation', 'Fertility', 'Menopause'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Ashokarishta', 'अशोकारिष्ट', ['Heavy Periods', 'Menstrual Pain', 'Uterine Disorders'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Lodhra Churna', 'लोध्र चूर्ण', ['Leucorrhea', 'Menstrual Disorders', 'Uterine Health'], '1/2 tsp', 'Twice daily', 'शहद के साथ'],
    ['Pushyanug Churna', 'पुष्यानुग चूर्ण', ['White Discharge', 'Heavy Bleeding', 'Uterine Disorders'], '1 tsp', 'Twice daily', 'शहद के साथ'],
    ['Pradarantak Lauh', 'प्रदरांतक लौह', ['Leucorrhea', 'Heavy Periods', 'Weakness'], '250mg', 'Twice daily', 'शहद के साथ'],
    ['Dashmoolarishta', 'दशमूलारिष्ट', ['Post-delivery Care', 'Weakness', 'Body Pain'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Supari Pak', 'सुपारी पाक', ['Post-delivery', 'Uterine Tonic', 'Lactation'], '1 piece', 'Twice daily', 'दूध के साथ'],
    ['Phal Ghrit', 'फल घृत', ['Infertility', 'Conception', 'Uterine Health'], '1 tsp', 'Before meals', 'दूध के साथ'],
    ['Rajapravartini Vati', 'राजः प्रवर्तिनी वटी', ['Amenorrhea', 'Delayed Periods', 'Menstrual Regulation'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Stri Rasayan Vati', 'स्त्री रसायन वटी', ['Womens Weakness', 'Menopause', 'Hormonal Balance'], '2 tablets', 'Twice daily', 'दूध के साथ'],
    ['Maha Chandanadi Tailam', 'महा चंदनादि तैलम', ['Burning Sensation', 'Hot Flashes', 'Skin Health'], 'External', 'Body massage', 'शरीर की मालिश'],
    ['Sukumara Kashayam', 'सुकुमार कषायम', ['Menstrual Issues', 'Infertility', 'Constipation'], '15ml', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Sukumara Ghritam', 'सुकुमार घृतम', ['Infertility', 'Uterine Disorders', 'Conception'], '1 tsp', 'Before meals', 'दूध के साथ'],
    ['Saubhagya Shunthi', 'सौभाग्य शुंठी', ['Post-delivery', 'Lactation', 'Digestion'], '1/2 tsp', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Phala Sarpis', 'फल सर्पिस', ['Fertility', 'Conception', 'Pregnancy Support'], '1 tsp', 'Empty stomach', 'खाली पेट'],
    ['Ashokadi Kwath', 'अशोकादि क्वाथ', ['Uterine Disorders', 'Heavy Bleeding', 'Menstrual Pain'], '20ml', 'Twice daily', 'खाली पेट'],
    ['Kumari Asava', 'कुमारी आसव', ['Liver Disorders', 'Digestive Issues', 'Menstrual Health'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Yashtimadhu Ghritam', 'यष्टिमधु घृतम', ['Burning Urination', 'Fertility', 'Skin Health'], '1 tsp', 'Before meals', 'दूध के साथ'],
    ['Lakshmivilas Ras', 'लक्ष्मीविलास रस', ['Cold', 'Cough', 'Weakness', 'Digestive Issues'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Praval Panchamrit', 'प्रवाल पंचामृत', ['Calcium', 'Acidity', 'Pregnancy Support'], '250mg', 'Twice daily', 'शहद के साथ'],
];

// MENS HEALTH (15)
const mens = [
    ['Ashwagandha Avaleha', 'अश्वगंधा अवलेह', ['Weakness', 'Stress', 'Stamina', 'Vitality'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Shilajit Vati', 'शिलाजीत वटी', ['Weakness', 'Stamina', 'Energy', 'Diabetes Support'], '2 tablets', 'Morning', 'दूध के साथ'],
    ['Musli Pak', 'मूसली पाक', ['Strength', 'Vitality', 'Stamina', 'Weakness'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Shatavaryadi Churna', 'शतावर्यादि चूर्ण', ['Vitality', 'Digestive Health', 'Strength'], '1 tsp', 'Twice daily', 'दूध के साथ'],
    ['Gokshuradi Guggulu', 'गोक्षुरादि गुग्गुलु', ['Urinary Issues', 'Prostate Health', 'Kidney Stones'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Chandanadi Vati', 'चंदनादि वटी', ['Burning Urination', 'UTI', 'Kidney Health'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Punarnavadi Mandoor', 'पुनर्नवादि मंडूर', ['Edema', 'Kidney Disorders', 'Anemia'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Vajikarana Rasayana', 'वाजीकरण रसायन', ['Vitality', 'Strength', 'Reproductive Health'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Kamini Vidrawan Ras', 'कामिनी विद्रावण रस', ['Vitality', 'Strength', 'Nervous Weakness'], '125mg', 'Morning', 'शहद के साथ'],
    ['Vanga Bhasma', 'वंग भस्म', ['Mens Health', 'Diabetes', 'Urinary Issues'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Trivanga Bhasma', 'त्रिवंग भस्म', ['Diabetes', 'Weakness', 'Vitality'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Nrasimha Rasayan', 'नृसिंह रसायन', ['Anti-aging', 'Strength', 'Immunity', 'Rejuvenation'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Ashwagandharishta', 'अश्वगंधारिष्ट', ['Weakness', 'Sleep Issues', 'Stress', 'Stamina'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Balarishta', 'बलारिष्ट', ['Weakness', 'Paralysis', 'Nervous Disorders'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Kapikacchu Churna', 'कपिकच्छु चूर्ण', ['Mens Health', 'Nervous System', 'Parkinsons Support'], '1 tsp', 'Morning', 'दूध के साथ'],
];

// MENTAL HEALTH (20)
const mental = [
    ['Brahmi Vati', 'ब्राह्मी वटी', ['Memory', 'Anxiety', 'Stress', 'Mental Clarity'], '2 tablets', 'Morning', 'दूध के साथ'],
    ['Saraswatarishta', 'सारस्वतारिष्ट', ['Memory', 'Speech Disorders', 'Mental Health', 'Epilepsy'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Manasamitra Vatakam', 'मानसामित्र वटकम', ['Mental Disorders', 'Anxiety', 'Depression', 'Insomnia'], '1 tablet', 'Morning & Night', 'दूध के साथ'],
    ['Smritisagar Ras', 'स्मृतिसागर रस', ['Memory Loss', 'Mental Weakness', 'Concentration'], '125mg', 'Morning', 'शहद के साथ'],
    ['Jatamansi Churna', 'जटामांसी चूर्ण', ['Insomnia', 'Anxiety', 'Stress', 'Headache'], '1/4 tsp', 'Night', 'दूध के साथ'],
    ['Tagara (Valerian)', 'तगर', ['Sleep Disorders', 'Anxiety', 'Restlessness', 'Stress'], '1/4 tsp', 'Night', 'गुनगुने पानी के साथ'],
    ['Ashwagandha Ghanvati', 'अश्वगंधा घनवटी', ['Stress', 'Anxiety', 'Sleep', 'Weakness'], '2 tablets', 'Night', 'दूध के साथ'],
    ['Sarpagandhadi Vati', 'सर्पगंधादि वटी', ['High BP', 'Anxiety', 'Insomnia', 'Stress'], '1 tablet', 'Night', 'पानी के साथ'],
    ['Shankhpushpi Syrup', 'शंखपुष्पी सिरप', ['Memory', 'Concentration', 'Anxiety', 'Sleep'], '2 tsp', 'Twice daily', 'पानी के साथ'],
    ['Brahmi Ghritam', 'ब्राह्मी घृतम', ['Mental Development', 'Memory', 'Speech Disorders'], '1 tsp', 'Morning', 'दूध के साथ'],
    ['Kalyanaka Ghritam', 'कल्याणक घृतम', ['Mental Disorders', 'Epilepsy', 'Memory', 'Intelligence'], '1 tsp', 'Empty stomach', 'दूध के साथ'],
    ['Panchagavya Ghritam', 'पंचगव्य घृतम', ['Epilepsy', 'Mental Health', 'Psychiatric Issues'], '1 tsp', 'Morning', 'गुनगुने पानी के साथ'],
    ['Unmadagajkesari Ras', 'उन्मादगजकेसरी रस', ['Mental Disorders', 'Mania', 'Psychosis'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Chaitasa Churna', 'चैतस चूर्ण', ['Mental Clarity', 'Memory', 'Concentration'], '1/2 tsp', 'Morning', 'शहद के साथ'],
    ['Mukta Vati', 'मुक्ता वटी', ['High BP', 'Stress', 'Anxiety', 'Insomnia'], '2 tablets', 'Morning & Night', 'पानी के साथ'],
    ['Medha Vati', 'मेधा वटी', ['Memory', 'Concentration', 'Mental Fatigue', 'Stress'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Tagar Ghanvati', 'तगर घनवटी', ['Insomnia', 'Sleep Quality', 'Anxiety'], '2 tablets', 'Night', 'गुनगुने पानी के साथ'],
    ['Divya Medha Kwath', 'दिव्य मेधा क्वाथ', ['Memory', 'Brain Health', 'Mental Clarity'], '20ml', 'Morning', 'खाली पेट'],
    ['Akshaypatra Ras', 'अक्षयपात्र रस', ['Memory Enhancement', 'Intelligence', 'Mental Focus'], '125mg', 'Morning', 'शहद के साथ'],
    ['Chitrakadi Gutika', 'चित्रकादि गुटिका', ['Depression', 'Mental Weakness', 'Digestion'], '2 tablets', 'Twice daily', 'पानी के साथ'],
];

// HEART & BP (15)
const heart = [
    ['Arjunarishta', 'अर्जुनारिष्ट', ['Heart Health', 'Heart Weakness', 'Chest Pain', 'BP'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Arjuna Capsules', 'अर्जुन कैप्सूल', ['Heart Health', 'Cholesterol', 'BP Management'], '1-2 caps', 'Twice daily', 'पानी के साथ'],
    ['Hridayarnava Ras', 'हृदयार्णव रस', ['Heart Disorders', 'Palpitation', 'Angina'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Prabhakara Vati', 'प्रभाकर वटी', ['Heart Tonic', 'Heart Weakness', 'Palpitation'], '2 tablets', 'Twice daily', 'अर्जुन क्वाथ के साथ'],
    ['Mukta Pishti', 'मुक्ता पिष्टी', ['High BP', 'Acidity', 'Heart Health', 'Anxiety'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Sarpagandha Ghanvati', 'सर्पगंधा घनवटी', ['High BP', 'Anxiety', 'Insomnia'], '1 tablet', 'Twice daily', 'पानी के साथ'],
    ['Brahmi Vati Gold', 'ब्राह्मी वटी स्वर्णयुक्त', ['BP', 'Anxiety', 'Memory', 'Heart'], '1 tablet', 'Twice daily', 'दूध के साथ'],
    ['Pushkarmool Churna', 'पुष्करमूल चूर्ण', ['Heart Health', 'Respiratory Issues', 'Cough'], '1/2 tsp', 'Twice daily', 'शहद के साथ'],
    ['Punarnava Mandoor', 'पुनर्नवा मंडूर', ['Edema', 'Heart Failure', 'Kidney Issues', 'Anemia'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Hridya Vati', 'हृद्य वटी', ['Heart Tonic', 'Cholesterol', 'BP Management'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Mrigank Ras', 'मृगांक रस', ['Heart Disorders', 'Weakness', 'Anemia'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Lakshmi Narayan Ras', 'लक्ष्मी नारायण रस', ['Heart Health', 'Weakness', 'Immunity'], '125mg', 'Morning', 'शहद के साथ'],
    ['Jawaharmohra Pishti', 'जवाहर मोहरा पिष्टी', ['Heart Tonic', 'Anxiety', 'General Tonic'], '125mg', 'Morning', 'शहद के साथ'],
    ['Akik Pishti', 'अकीक पिष्टी', ['Heart Health', 'Blood Purification', 'General Tonic'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Chandra Prabha Vati', 'चंद्रप्रभा वटी', ['Diabetes', 'Urinary Issues', 'Heart Support'], '2 tablets', 'Twice daily', 'पानी के साथ'],
];

// DIABETES & METABOLISM (15)
const diabetes = [
    ['Chandraprabha Vati', 'चंद्रप्रभा वटी', ['Diabetes', 'Urinary Disorders', 'Kidney Stones', 'Weakness'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Shilajit Rasayan', 'शिलाजीत रसायन', ['Diabetes', 'Weakness', 'Kidney Health', 'Vitality'], '1 cap', 'Morning', 'दूध के साथ'],
    ['Gudmar Churna', 'गुड़मार चूर्ण', ['Diabetes', 'Sugar Craving', 'Blood Sugar Control'], '1/2 tsp', 'Before meals', 'पानी के साथ'],
    ['Mamejva Ghanvati', 'ममेज्वा घनवटी', ['Diabetes', 'Blood Sugar', 'Polyuria'], '2 tablets', 'Before meals', 'पानी के साथ'],
    ['Basant Kusumakar Ras', 'वसंत कुसुमाकर रस', ['Diabetes', 'Weakness', 'Memory', 'Kidney Health'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Nishamalaki Churna', 'निशामलकी चूर्ण', ['Diabetes', 'Prediabetes', 'Blood Sugar Control'], '1 tsp', 'Night', 'पानी के साथ'],
    ['Jamun Beej Churna', 'जामुन बीज चूर्ण', ['Diabetes', 'Blood Sugar', 'Digestive Health'], '1 tsp', 'Before meals', 'पानी के साथ'],
    ['Karela Jamun Juice', 'करेला जामुन जूस', ['Diabetes', 'Blood Sugar Control', 'Liver Health'], '20ml', 'Morning', 'खाली पेट'],
    ['Trivanga Bhasma', 'त्रिवंग भस्म', ['Diabetes', 'Urinary Issues', 'Weakness'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Shilajitwadi Vati', 'शिलाजीत्वादि वटी', ['Diabetes', 'Prameha', 'Weakness', 'Urinary Issues'], '2 tablets', 'Twice daily', 'पानी के साथ'],
    ['Amritadi Guggulu', 'अमृतादि गुग्गुलु', ['Diabetes', 'Obesity', 'Metabolic Syndrome'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Chandanasava', 'चंदनासव', ['Burning Urination', 'Diabetes', 'Pitta Disorders'], '15-30ml', 'After meals', 'पानी के साथ'],
    ['Pramehrogantaka Ras', 'प्रमेहरोगांतक रस', ['Diabetes', 'Polyuria', 'Weakness'], '125mg', 'Twice daily', 'शहद के साथ'],
    ['Medohar Guggulu', 'मेदोहर गुग्गुलु', ['Obesity', 'Cholesterol', 'Metabolic Health'], '2 tablets', 'Twice daily', 'गुनगुने पानी के साथ'],
    ['Triphala Tablests', 'त्रिफला गोलियां', ['Constipation', 'Metabolism', 'Detox', 'Weight Management'], '2 tablets', 'Night', 'गुनगुने पानी के साथ'],
];

function createMedicine(data, category, color) {
    return {
        name: data[0],
        nameHindi: data[1],
        category: category,
        symptoms: data[2],
        dosage: data[3],
        frequency: data[4] === 'Twice daily' ? 'Twice daily' : data[4].includes('daily') ? data[4] : 'As directed',
        timing: data[4],
        timingHindi: data[5],
        usage: 'Take as directed by physician. ' + data[4] + '.',
        usageHindi: 'चिकित्सक के निर्देशानुसार लें। ' + data[5] + '।',
        benefits: data[2].slice(0, 4).map(s => 'Helps with ' + s.toLowerCase()),
        benefitsHindi: data[2].slice(0, 4).map(s => s + ' में लाभदायक'),
        interactions: 'Consult physician before combining with other medicines.',
        contraindications: 'Pregnancy, lactation - consult doctor',
        form: data[0].includes('Churna') ? 'Churna (Powder)' : data[0].includes('Vati') || data[0].includes('Gutika') ? 'Vati (Tablet)' : data[0].includes('rishta') || data[0].includes('sava') ? 'Arishta/Asava (Liquid)' : data[0].includes('Tailam') ? 'Tailam (Oil)' : data[0].includes('Ghrit') ? 'Ghritam (Ghee)' : data[0].includes('Ras') || data[0].includes('Bhasma') || data[0].includes('Pishti') ? 'Bhasma/Ras' : 'Classical',
        source: 'Ayurvedic Pharmacopoeia',
        color: color,
        price: Math.floor(Math.random() * 200) + 80
    };
}

daily.forEach(d => medicines.push(createMedicine(d, 'Daily Essentials', 'lime')));
firstAid.forEach(d => medicines.push(createMedicine(d, 'First Aid', 'stone')));
child.forEach(d => medicines.push(createMedicine(d, 'Child Health', 'yellow')));
geriatric.forEach(d => medicines.push(createMedicine(d, 'Geriatric Care', 'slate')));

weight.forEach(d => medicines.push(createMedicine(d, 'Weight Management', 'fuchsia')));
ent.forEach(d => medicines.push(createMedicine(d, 'ENT Care', 'cyan')));
kidney.forEach(d => medicines.push(createMedicine(d, 'Kidney/Urinary', 'blue')));
liver.forEach(d => medicines.push(createMedicine(d, 'Liver Health', 'green')));
fever.forEach(d => medicines.push(createMedicine(d, 'Fever/Infection', 'red')));
thyroid.forEach(d => medicines.push(createMedicine(d, 'Thyroid/Hormoral', 'violet')));
pregnancy.forEach(d => medicines.push(createMedicine(d, 'Pregnancy/Women', 'pink')));

beauty.forEach(d => medicines.push(createMedicine(d, 'Beauty/Skin Care', 'rose')));
home.forEach(d => medicines.push(createMedicine(d, 'Home Remedies', 'orange')));
singleHerbs.forEach(d => medicines.push(createMedicine(d, 'Single Herbs', 'emerald')));
bhasma.forEach(d => medicines.push(createMedicine(d, 'Bhasma/Rasayana', 'yellow')));
oils.forEach(d => medicines.push(createMedicine(d, 'Thailam (Oil)', 'amber')));
ghrita.forEach(d => medicines.push(createMedicine(d, 'Ghrita (Ghee)', 'yellow')));
ghrita.forEach(d => medicines.push(createMedicine(d, 'Ghrita (Ghee)', 'yellow')));
asava.forEach(d => medicines.push(createMedicine(d, 'Asava/Arishta', 'red')));
extracts.forEach(d => medicines.push(createMedicine(d, 'Herb Extract', 'emerald')));
arks.forEach(d => medicines.push(createMedicine(d, 'Ark (Distillate)', 'cyan')));
classicalMix.forEach(d => medicines.push(createMedicine(d, 'Classical Yoga', 'purple')));

digestive.forEach(d => medicines.push(createMedicine(d, 'Digestive', 'amber')));
immunity.forEach(d => medicines.push(createMedicine(d, 'Immunity', 'emerald')));
joint.forEach(d => medicines.push(createMedicine(d, 'Joint/Pain', 'orange')));
respiratory.forEach(d => medicines.push(createMedicine(d, 'Respiratory', 'sky')));
skin.forEach(d => medicines.push(createMedicine(d, 'Skin/Hair', 'rose')));
womens.forEach(d => medicines.push(createMedicine(d, 'Womens Health', 'pink')));
mens.forEach(d => medicines.push(createMedicine(d, 'Mens Health', 'indigo')));
mental.forEach(d => medicines.push(createMedicine(d, 'Mental Health', 'purple')));
heart.forEach(d => medicines.push(createMedicine(d, 'Heart/BP', 'red')));
// MASTER HERB FORMULATION GENERATOR (Scalable Expansion)
const symptomsMap = {
    'Immunity': ['Immunity', 'Weakness', 'Fever', 'Infection'],
    'Diabetes': ['Diabetes', 'Blood Sugar', 'Polyuria', 'Weakness'],
    'Heart': ['Heart Health', 'High BP', 'Cholesterol', 'Anxiety'],
    'Kidney': ['Kidney Stones', 'UTI', 'Detox', 'Creatinine'],
    'Liver': ['Liver Detox', 'Jaundice', 'Fatty Liver', 'Digestion'],
    'Joint': ['Joint Pain', 'Arthritis', 'Back Pain', 'Stiffness'],
    'Skin': ['Skin Diseases', 'Acne', 'Eczema', 'Glow'],
    'Hair': ['Hair Fall', 'Dandruff', 'Premature Greying', 'Growth'],
    'Digestion': ['Gas', 'Constipation', 'Acidity', 'Bloating'],
    'Women': ['PCOS', 'Periods', 'Fertility', 'Weakness', 'Hormonal Balance'],
    'Men': ['Vitality', 'Stamina', 'Weakness', 'Premature Ejaculation'],
    'Mind': ['Stress', 'Anxiety', 'Memory', 'Insomnia'],
    'Resp': ['Cough', 'Cold', 'Asthma', 'Sinus'],
    'Thyroid': ['Thyroid', 'Goiter', 'Weight', 'Metabolism'],
    'Weight': ['Obesity', 'Fat Loss', 'Metabolism', 'Cholesterol']
};

const masterHerbs = [
    { name: 'Ashwagandha', hindi: 'अश्वगंधा', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Arishta', 'Ghrita', 'Tailam', 'Pak'], tags: ['Immunity', 'Mind', 'Men', 'Joint', 'Thyroid'] },
    { name: 'Shatavari', hindi: 'शतावरी', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Kalpa', 'Ghrita', 'Tailam'], tags: ['Women', 'Immunity', 'Digestion'] },
    { name: 'Giloy (Guduchi)', hindi: 'गिलोय', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Kwath', 'Satva', 'Tailam'], tags: ['Immunity', 'Fever', 'Skin', 'Joint', 'Liver'] },
    { name: 'Amla (Amalaki)', hindi: 'आंवला', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Rasayana', 'Juice', 'Candy'], tags: ['Immunity', 'Digestion', 'Hair', 'Skin', 'Acid', 'Eyes'] },
    { name: 'Triphala', hindi: 'त्रिफला', cat: 'Classical Mix', forms: ['Churna', 'Vati', 'Kwath', 'Ghrita', 'Guggulu'], tags: ['Digestion', 'Eyes', 'Weight', 'Detox', 'Skin'] },
    { name: 'Brahmi', hindi: 'ब्राह्मी', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Ghrita', 'Tailam', 'Sharbat'], tags: ['Mind', 'Stress', 'Hair', 'Sleep'] },
    { name: 'Neem', hindi: 'नीम', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Tailam', 'Kwath', 'Soap'], tags: ['Skin', 'Diabetes', 'Detox', 'Hair'] },
    { name: 'Tulsi', hindi: 'तुलसी', cat: 'Single Herbs', forms: ['Drops', 'Vati', 'Ark', 'Tea', 'Syrup'], tags: ['Resp', 'Immunity', 'Fever', 'Stress'] },
    { name: 'Arjuna', hindi: 'अर्जुन', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Arishta', 'Kwath', 'Kshira Pak'], tags: ['Heart', 'BP', 'Bone'] },
    { name: 'Punarnava', hindi: 'पुनर्नवा', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Asava', 'Kwath', 'Mandur'], tags: ['Kidney', 'Liver', 'Heart', 'Joint'] },
    { name: 'Gokshura', hindi: 'गोक्षुर', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Guggulu', 'Kwath'], tags: ['Kidney', 'Men', 'Joint', 'Muscle'] },
    { name: 'Mulethi', hindi: 'मुलेठी', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Stick', 'Tea'], tags: ['Resp', 'Digestion', 'Skin', 'Thyroid'] },
    { name: 'Haridra (Turmeric)', hindi: 'हल्दी', cat: 'Single Herbs', forms: ['Churna', 'Khand', 'Tailam', 'Drops'], tags: ['Skin', 'Immunity', 'Joint', 'Allergy'] },
    { name: 'Manjistha', hindi: 'मंजिष्ठा', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Kwath', 'Arishta', 'Tailam'], tags: ['Skin', 'Detox', 'Blood'] },
    { name: 'Bhringraj', hindi: 'भृंगराज', cat: 'Single Herbs', forms: ['Tailam', 'Asava', 'Vati', 'Churna'], tags: ['Hair', 'Liver', 'Skin'] },
    { name: 'Shilajit', hindi: 'शिलाजीत', cat: 'Bhasma/Rasayana', forms: ['Resin', 'Cap', 'Vati', 'Liquid'], tags: ['Men', 'Diabetes', 'Joint', 'Ageing'] },
    { name: 'Guggulu', hindi: 'गुग्गुलु', cat: 'Classical Mix', forms: ['Shuddha', 'Yograj', 'Kanchanar', 'Triphala', 'Kaishore'], tags: ['Joint', 'Weight', 'Thyroid', 'Skin'] },
    { name: 'Karela', hindi: 'करेला', cat: 'Single Herbs', forms: ['Juice', 'Churna', 'Vati', 'Extract'], tags: ['Diabetes', 'Skin', 'Liver'] },
    { name: 'Jamun', hindi: 'जामुन', cat: 'Single Herbs', forms: ['Beej Churna', 'Juice', 'Vinegar'], tags: ['Diabetes', 'Digestion'] },
    { name: 'Methi', hindi: 'मेथी', cat: 'Home Remedies', forms: ['Dana', 'Powder', 'Water'], tags: ['Diabetes', 'Hair', 'Joint', 'Digestion'] },
    { name: 'Dalchini', hindi: 'दालचीनी', cat: 'Home Remedies', forms: ['Stick', 'Powder', 'Oil', 'Tea'], tags: ['Diabetes', 'Resp', 'Digestion', 'Weight'] },
    { name: 'Shankhpushpi', hindi: 'शंखपुष्पी', cat: 'Single Herbs', forms: ['Syrup', 'Churna', 'Vati', 'Tablet'], tags: ['Mind', 'Sleep', 'BP'] },
    { name: 'Jatamansi', hindi: 'जटामांसी', cat: 'Single Herbs', forms: ['Churna', 'Kwath', 'Oil'], tags: ['Mind', 'Sleep', 'Hair'] },
    { name: 'Sariva', hindi: 'सारिवा', cat: 'Single Herbs', forms: ['Churna', 'Asava', 'Syrup'], tags: ['Skin', 'Blood', 'Kidney', 'Heat'] },
    { name: 'Kutki', hindi: 'कुटकी', cat: 'Single Herbs', forms: ['Churna', 'Tablet', 'Extract'], tags: ['Liver', 'Fever', 'Skin', 'Digestion'] },
    { name: 'Chitrak', hindi: 'चित्रक', cat: 'Single Herbs', forms: ['Churna', 'Vati', 'Haritaki'], tags: ['Digestion', 'Weight', 'Joint'] },
    { name: 'Vidanga', hindi: 'विडंग', cat: 'Single Herbs', forms: ['Churna', 'Arishta'], tags: ['Digestion', 'Weight', 'Skin'] },
    { name: 'Pippali', hindi: 'पिप्पली', cat: 'Single Herbs', forms: ['Churna', 'Asava', 'Rasayana'], tags: ['Resp', 'Digestion', 'Liver'] },
    { name: 'Bala', hindi: 'बला', cat: 'Single Herbs', forms: ['Tailam', 'Arishta', 'Churna'], tags: ['Joint', 'Strength', 'Nerve'] },
    { name: 'Rasna', hindi: 'रास्ना', cat: 'Single Herbs', forms: ['Churna', 'Kwath', 'Tailam'], tags: ['Joint', 'Pain', 'Arthritis'] },
    { name: 'Varuna', hindi: 'वरुण', cat: 'Single Herbs', forms: ['Bark Churna', 'Kwath'], tags: ['Kidney', 'Prostate'] },
    { name: 'Kanchanar', hindi: 'कांचनार', cat: 'Single Herbs', forms: ['Bark Churna', 'Guggulu', 'Kwath'], tags: ['Thyroid', 'PCOS', 'Cysts'] },
    { name: 'Ashoka', hindi: 'अशोक', cat: 'Single Herbs', forms: ['Bark Churna', 'Arishta', 'Ghanvati'], tags: ['Women', 'Periods', 'Skin'] },
    { name: 'Lodhra', hindi: 'लोध्र', cat: 'Single Herbs', forms: ['Churna', 'Asava'], tags: ['Women', 'Skin', 'Bleeding'] },
    { name: 'Vasa', hindi: 'वासा', cat: 'Single Herbs', forms: ['Syrup', 'Avaleha', 'Arishta'], tags: ['Resp', 'Bleeding', 'Fever'] },
    { name: 'Khadir', hindi: 'खदिर', cat: 'Single Herbs', forms: ['Churna', 'Arishta', 'Vati'], tags: ['Skin', 'Blood', 'Teeth'] },
    { name: 'Babool', hindi: 'बबूल', cat: 'Single Herbs', forms: ['Churna', 'Datun', 'Gum'], tags: ['Joint', 'Teeth', 'Women'] },
    { name: 'Safed Musli', hindi: 'सफेद मूसली', cat: 'Single Herbs', forms: ['Churna', 'Pak', 'Cap'], tags: ['Men', 'Weight', 'Strength'] },
    { name: 'Kaunch Beej', hindi: 'कौंच बीज', cat: 'Single Herbs', forms: ['Churna', 'Pak'], tags: ['Men', 'Nerve', 'Strength'] },
    { name: 'Shallaki', hindi: 'शल्लकी', cat: 'Single Herbs', forms: ['Tablet', 'Gum', 'Oil'], tags: ['Joint', 'Pain'] }
];

masterHerbs.forEach(herb => {
    herb.forms.forEach(frm => {
        let medName = '', medNameHi = '', usage = '', usageHi = '', cat = herb.cat;
        let syms = [];

        herb.tags.forEach(t => {
            if (symptomsMap[t]) syms = [...syms, ...symptomsMap[t]];
            else syms.push(t);
        });

        // Ensure standard fields
        if (frm === 'Churna') {
            medName = herb.name + ' Churna';
            medNameHi = herb.hindi + ' चूर्ण';
            usage = '1 tsp with warm water';
            usageHi = '1 चम्मच गुनगुने पानी के साथ';
            if (herb.tags.includes('Digestion')) usage = '1 tsp before/after food';
        } else if (frm === 'Vati' || frm === 'Tablet' || frm === 'Ghanvati' || frm === 'Gutika' || frm === 'Cap' || frm === 'Capsule') {
            medName = herb.name + ' ' + frm;
            medNameHi = herb.hindi + ' ' + (frm === 'Tablet' ? 'टैबलेट' : frm === 'Cap' ? 'कैप्सूल' : 'वटी');
            usage = '1-2 tablets with water';
            usageHi = '1-2 गोली पानी के साथ';
        } else if (frm === 'Arishta' || frm === 'Asava' || frm === 'Syrup' || frm === 'Kwath' || frm === 'Sharbat' || frm === 'Juice' || frm === 'Vinegar') {
            medName = herb.name + ' ' + frm;
            medNameHi = herb.hindi + ' ' + (frm === 'Vinegar' ? 'सिरका' : frm === 'Juice' ? 'जूस/रस' : frm === 'Kwath' ? 'क्वाथ' : frm === 'Sharbat' ? 'शरबत' : frm === 'Syrup' ? 'सिरप' : frm === 'Asava' ? 'आसव' : 'अरिष्ट');
            usage = '15-20ml with equal water after meals';
            usageHi = '15-20 मिली भोजन के बाद पानी मिलाकर';
            cat = 'Asava/Arishta';
            if (frm === 'Kwath') { usage = '20ml empty stomach'; usageHi = '20 मिली खाली पेट'; cat = 'Home Remedies'; }
            if (frm === 'Juice') { usage = '20ml morning empty stomach'; usageHi = '20 मिली सुबह खाली पेट'; cat = 'Herb Extract'; }
        } else if (frm === 'Ghrita' || frm === 'Ghee') {
            medName = herb.name + ' Ghrita';
            medNameHi = herb.hindi + ' घृत';
            usage = '1 tsp with warm milk';
            usageHi = '1 चम्मच गर्म दूध के साथ';
            cat = 'Ghrita (Ghee)';
        } else if (frm === 'Tailam' || frm === 'Oil') {
            medName = herb.name + ' Tailam';
            medNameHi = herb.hindi + ' तैलम';
            usage = 'For external application';
            usageHi = 'बाहरी प्रयोग के लिए';
            cat = 'Thailam (Oil)';
        } else if (frm === 'Pak' || frm === 'Avaleha' || frm === 'Rasayana' || frm === 'Khand' || frm === 'Kalpa') {
            medName = herb.name + ' ' + frm;
            medNameHi = herb.hindi + ' ' + (frm === 'Khand' ? 'खंड' : frm === 'Kalpa' ? 'कल्प' : 'पाक/रसायन');
            usage = '1 tsp with milk';
            usageHi = '1 चम्मच दूध के साथ';
            cat = 'Bhasma/Rasayana';
        } else {
            medName = herb.name + ' ' + frm;
            medNameHi = herb.hindi + ' ' + frm;
            usage = 'As directed';
            usageHi = 'निर्देशानुसार';
        }

        // Avoid duplicates if already exists in specific lists
        const exists = medicines.some(m => m.name === medName);
        if (!exists) {
            medicines.push({
                name: medName,
                nameHindi: medNameHi,
                category: cat,
                symptoms: [...new Set(syms)], // Unique symptoms
                dosage: usage.split(' with')[0] || 'As prescribed',
                frequency: 'Twice daily',
                timing: 'Morning & Evening',
                timingHindi: 'सुबह - शाम',
                usage: 'Take as directed. ' + usage,
                usageHindi: 'निर्देशानुसार लें। ' + usageHi,
                benefits: syms.slice(0, 4).map(s => 'Supports ' + s),
                benefitsHindi: syms.slice(0, 4).map(s => s + ' में सहायक'),
                interactions: 'Consult doctor if on medication',
                contraindications: 'Pregnancy - Consult Dr',
                form: frm,
                source: 'Classical Ayurveda',
                color: 'amber',
                price: 100 + Math.floor(Math.random() * 400)
            });
        }
    });
});


const output = 'export const ayurvedaDb = ' + JSON.stringify(medicines, null, 2) + ';';
fs.writeFileSync('./src/utils/ayurvedaData.js', output);
console.log('Created ayurvedaData.js with ' + medicines.length + ' medicines');
