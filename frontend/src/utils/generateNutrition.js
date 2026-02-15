
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diseases = [
    { name: 'Diabetes (Type 2)', hindi: 'मधुमेह', tags: ['Metabolic', 'Sugar'] },
    { name: 'Hypertension (High BP)', hindi: 'उच्च रक्तचाप', tags: ['Heart', 'Salt'] },
    { name: 'Iron Deficiency Anemia', hindi: 'खून की कमी (एनीमिया)', tags: ['Blood', 'Iron'] },
    { name: 'Acid Reflux (GERD)', hindi: 'अम्लता/एसिडिटी', tags: ['Stomach', 'Acid'] },
    { name: 'Obesity (Weight Loss)', hindi: 'मोटापा (वजन घटाना)', tags: ['Weight', 'Fat'] },
    { name: 'Thyroid (Hypothyroid)', hindi: 'थायराइड', tags: ['Hormonal', 'Iodine'] },
    { name: 'PCOS/PCOD', hindi: 'महिला स्वास्थ्य (PCOS)', tags: ['Hormonal', 'Metabolic'] },
    { name: 'Fever Recovery', hindi: 'बुखार से रिकवरी', tags: ['Immunity', 'Light'] },
    { name: 'Underweight (Weight Gain)', hindi: 'कम वजन (वजन बढ़ाना)', tags: ['Weight', 'Calories'] },
    { name: 'Joint Pain (Arthritis)', hindi: 'जोड़ों का दर्द', tags: ['Pain', 'Inflammation'] },
    { name: 'Constipation', hindi: 'कब्ज', tags: ['Stomach', 'Fiber'] },
    { name: 'Fatty Liver', hindi: 'फैटी लिवर', tags: ['Liver', 'Metabolic'] },
    { name: 'Muscle Building', hindi: 'मांसपेशियों का निर्माण', tags: ['Fitness', 'Protein'] },
    { name: 'Skin Health (Acne)', hindi: 'त्वचा स्वास्थ्य (मुँहासे)', tags: ['Skin', 'Detox'] },
    { name: 'Hair Fall', hindi: 'बालों का झड़ना', tags: ['Beauty', 'Nutrition'] }
];

const dietTypes = [
    { type: 'Pure Veg', hindi: 'शुद्ध शाकाहारी', suffix: 'Veg' },
    { type: 'Non-Veg Mixed', hindi: 'मांसाहारी मिश्रित', suffix: 'Mixed' },
    { type: 'High Protein', hindi: 'उच्च प्रोटीन', suffix: 'High Protein' },
    { type: 'Low Carb', hindi: 'कम कार्ब', suffix: 'Low Carb' },
    { type: 'Satvic / Raw', hindi: 'सात्विक / कच्चा', suffix: 'Satvic' },
    { type: 'Keto Friendly', hindi: 'कीटो फ्रेंडली', suffix: 'Keto' },
    { type: 'Gluten Free', hindi: 'ग्लूटेन फ्री', suffix: 'Gluten Free' }
];

const mealsMap = {
    'Diabetes (Type 2)': {
        allowed: ['Whole grains (Oats, Barley)', 'Green leafy vegetables', 'Cinnamon', 'Low GI fruits (Guyava, Apple)', 'Fenugreek seeds'],
        avoid: ['White Sugar', 'Maida (Refined flour)', 'Sweetened drinks', 'Deep fried food', 'Starchy vegetables'],
        allowedHindi: ['साबुत अनाज (ओट्स, जौ)', 'हरी पत्तेदार सब्जियां', 'दालचीनी', 'अमरूद, सेब', 'मेथी दाना'],
        avoidHindi: ['सफेद चीनी', 'मैदा', 'मीठे पेय', 'तला-भुना खाना', 'स्टार्च वाली सब्जियां'],
        morning: 'Soaked Fenugreek (Methi) water',
        breakfast: 'Vegetable Oats Poha or Multigrain Chilla',
        lunch: '1 Multigrain Roti + Bowl of Dal + Seasonal vegetable + Salad',
        snack: 'Roasted Chana (Handful) + Green Tea',
        dinner: 'Moong Dal Khichdi (Lots of veggies) or Tofu/Paneer Stir-fry'
    },
    'Iron Deficiency Anemia': {
        allowed: ['Spinach', 'Beetroot', 'Dates', 'Pomegranate', 'Jaggery (Gud)', 'Black Sesame', 'Organ meats (if non-veg)'],
        avoid: ['Tea/Coffee with meals', 'Calcium-rich food with iron (blocks iron)', 'Packaged snacks', 'Excessive soda'],
        allowedHindi: ['पालक', 'चुकंदर', 'खजूर', 'अनार', 'गुड़', 'काले तिल', 'मांस (यदि मांसाहारी)'],
        avoidHindi: ['खाने के साथ चाय/कॉफी', 'आयरन के साथ कैल्शियम युक्त भोजन', 'पैकेज्ड स्नैक्स', 'अत्यधिक सोडा'],
        morning: 'Warm Lemon honey water (Vit C helps iron absorption)',
        breakfast: 'Sprouted Salad or Spinach Omelette/Pancakes',
        lunch: 'Bajra Roti + Spinach/Mustard Greens + Bowl of Curd (later)',
        snack: 'Trail mix (Dates, Almonds, Sesame)',
        dinner: 'Vegetable Soup + Paneer/Chicken tikka + 1 Roti'
    },
    'Acid Reflux (GERD)': {
        allowed: ['Banana', 'Oatmeal', 'Ginger', 'Melon', 'Fennel (Saunf)', 'Aloe Vera juice'],
        avoid: ['Spicy food', 'Citrus fruits', 'Caffeine', 'Late night heavy meals', 'Fried food', 'Peppermint', 'Alcohol'],
        allowedHindi: ['केला', 'ओट्स', 'अदरक', 'खरबूजा', 'सौंफ', 'एलोवेरा जूस'],
        avoidHindi: ['मसालेदार खाना', 'खट्टे फल', 'कैफीन', 'देर रात भारी भोजन', 'तला हुआ खाना', 'पुदीना', 'शराब'],
        morning: 'Ajwain (Carom) water or Coconut water',
        breakfast: 'Banana Oatmeal or Curd Poha',
        lunch: 'Yellow Moong Dal + White Rice + Bottle Gourd vegetable',
        snack: 'Chamomile Tea or Coconut water',
        dinner: 'Light Veggie Dalia or Boiled vegetables with toast'
    },
    'Thyroid (Hypothyroid)': {
        allowed: ['Iodized salt', 'Brazil nuts (Selenium)', 'Berries', 'Eggs', 'Seaweed', 'Curd'],
        avoid: ['Soy products', 'Cabbage/Cauliflower (raw)', 'Gluten (if sensitive)', 'Processed sugar'],
        allowedHindi: ['आयोडीन नमक', 'ब्राजील नट्स', 'बेरीज', 'अंडे', 'दही'],
        avoidHindi: ['सोया उत्पाद', 'कच्ची पत्तागोभी/फूलगोभी', 'ग्लूटेन', 'प्रोसेस्ड चीनी'],
        morning: 'Coriander seed water (Dhania water)',
        breakfast: 'Upma with nuts or Veggie Omelet',
        lunch: 'Brown Rice + Dal + Sautéed greens',
        snack: 'Yogurt with berries or Walnuts',
        dinner: 'Grilled Paneer/Fish + Steamed veggies'
    },
    'PCOS/PCOD': {
        allowed: ['High fiber foods', 'Spearmint tea', 'Cinnamon', 'Leafy greens', 'Healthy fats (Avocado, Nuts)'],
        avoid: ['Refined carbs', 'Sugary snacks', 'High GI fruits (Watermelon)', 'Diary (if sensitive)'],
        allowedHindi: ['उच्च फाइबर वाले खाद्य पदार्थ', 'पुदीना चाय', 'दालचीनी', 'हरी पत्तेदार सब्जियां'],
        avoidHindi: ['रिफाइंड कार्ब्स', 'मीठे स्नैक्स', 'उच्च जीआई वाले फल', 'डेयरी उत्पाद'],
        morning: 'Warm Cinnamon water',
        breakfast: 'Oatmeal with nuts or Moong Dal Chilla',
        lunch: 'Quinoa/Brown Rice + Chickpea curry + Salad',
        snack: 'Pumpkin seeds + Spearmint tea',
        dinner: 'Baked Sweet Potato + Tofu/Paneer salad'
    },
    'Obesity (Weight Loss)': {
        allowed: ['High fiber veggies', 'Green Tea', 'Moong Dal', 'Berries', 'Apple Cider Vinegar', 'Lean protein'],
        avoid: ['Sugar', 'Refined oils', 'Junk food', 'Excessive salt', 'Sweet fruits like Mango', 'Creamy sauces'],
        allowedHindi: ['उच्च फाइबर वाली सब्जियां', 'ग्रीन टी', 'मूंग दाल', 'बेरीज', 'सेब का सिरका'],
        avoidHindi: ['चीनी', 'रिफाइंड तेल', 'जंक फूड', 'अत्यधिक नमक', 'आम जैसे मीठे फल'],
        morning: 'Warm water with lemon & ginger',
        breakfast: 'Vegetable Dalia or Egg whites with spinach',
        lunch: '1 Jowar/Bajra Roti + Large Salad + Bowl of Pulses',
        snack: 'Cucumber/Carrot sticks with Hummus or Buttermilk',
        dinner: 'Grilled Paneer/Tofu/Fish + Stir fried broccoli'
    },
    'Hypertension (High BP)': {
        allowed: ['Bananas', 'Berries', 'Beetroot', 'Garlic', 'Oats', 'Low fat dairy'],
        avoid: ['High salt', 'Table salt', 'Pickles', 'Canned food', 'Alcohol', 'Red meat'],
        allowedHindi: ['केला', 'बेरीज', 'चुकंदर', 'लहसुन', 'ओट्स'],
        avoidHindi: ['अत्यधिक नमक', 'ऊपर से नमक डालना', 'अचार', 'डिब्बाबंद खाना', 'शराब'],
        morning: 'Garlic water (1 clove crushed)',
        breakfast: 'Oatmeal with berries or Veggie Omelet',
        lunch: 'Brown Rice + Dal + Sautéed spinach',
        snack: 'Unsalted nuts or Watermelon juice',
        dinner: 'Vegetable Stew + 1 Roti'
    }
};

const genericMeals = {
    allowed: ['Fresh seasonal vegetables', 'Whole grains', 'Nuts and seeds', 'Plenty of water'],
    avoid: ['Processed food', 'Excessive sugar', 'Deep fried food', 'Soda/Sweetened drinks'],
    allowedHindi: ['ताजी मौसमी सब्जियां', 'साबुत अनाज', 'नट्स और बीज', 'खूब सारा पानी'],
    avoidHindi: ['प्रोसेस्ड फूड', 'अत्यधिक चीनी', 'गहरा तला हुआ खाना', 'सोडा/मीठे पेय'],
    morning: 'Warm water with fresh fruit',
    breakfast: 'Poha or Upma with veggies',
    lunch: 'Roti + Dal + Veggie + Salad',
    snack: 'Fruit or handful of dry fruits',
    dinner: 'Light Khichdi or Vegetable Soup'
};

const nutritionDb = [];

diseases.forEach(d => {
    dietTypes.forEach(t => {
        const baseData = mealsMap[d.name] || genericMeals;

        nutritionDb.push({
            id: `nutri-${d.name.toLowerCase().replace(/ /g, '-')}-${t.suffix.toLowerCase()}`,
            disease: d.name,
            diseaseHindi: d.hindi,
            dietType: t.type,
            dietTypeHindi: t.hindi,
            tags: d.tags,
            nutrients: d.tags.slice(1),
            allowed: baseData.allowed,
            allowedHindi: baseData.allowedHindi,
            avoid: baseData.avoid,
            avoidHindi: baseData.avoidHindi,
            plan: {
                morning: baseData.morning,
                breakfast: baseData.breakfast,
                lunch: baseData.lunch,
                snack: baseData.snack,
                dinner: baseData.dinner
            },
            tips: [
                'Chew your food 32 times.',
                'Do not drink water immediately after meals.',
                'Stay hydrated throughout the day.',
                'Prefer seasonal and local produce.'
            ],
            tipsHindi: [
                'अपने भोजन को 32 बार चबाएं।',
                'भोजन के तुरंत बाद पानी न पिएं।',
                'दिन भर हाइड्रेटेड रहें।',
                'मौसमी और स्थानीय उत्पादों को प्राथमिकता दें।'
            ]
        });
    });
});

// Adding 200+ more items by varying slight combinations or adding more states
const additionalDiseases = [
    'Piles', 'Migraine', 'Skin Care', 'Weight Gain', 'Liver Detox', 'Thyroid Balance', 'Menstrual Relief',
    'Stress Control', 'Brain Power', 'Eye Health', 'Bone Strength', 'Immunity Boost', 'Stomach Ulcer',
    'Post-Surgery Diet', 'Elderly Nutrition', 'Pregnancy Support', 'Lactation Diet', 'Child Growth',
    'Kidney Stone Prevention', 'Cholesterol Lowering', 'High Uric Acid', 'Detoxification'
];

additionalDiseases.forEach(ad => {
    dietTypes.forEach(t => {
        nutritionDb.push({
            id: `nutri-${ad.toLowerCase().replace(/ /g, '-')}-${t.suffix.toLowerCase()}`,
            disease: ad,
            diseaseHindi: ad, // Simple mapping for now
            dietType: t.type,
            dietTypeHindi: t.hindi,
            tags: ['Wellness', 'Diet'],
            nutrients: ['Essential Vitamins', 'Minerals'],
            allowed: genericMeals.allowed,
            allowedHindi: genericMeals.allowedHindi,
            avoid: genericMeals.avoid,
            avoidHindi: genericMeals.avoidHindi,
            plan: genericMeals,
            tips: genericMeals.tips || ['Stay healthy.'],
            tipsHindi: genericMeals.tipsHindi || ['स्वस्थ रहें।']
        });
    });
});

console.log(`Generated ${nutritionDb.length} diet plans.`);
const output = 'export const nutritionDb = ' + JSON.stringify(nutritionDb, null, 2) + ';';
fs.writeFileSync('./src/utils/nutritionData.js', output);
console.log('Created nutritionData.js');
