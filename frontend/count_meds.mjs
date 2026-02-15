
import { homeopathyDb } from './src/utils/homeopathyData.js';

const targets = ['Fever', 'Cough', 'Headache', 'Stomach Pain', 'Anxiety', 'Grief', 'Bruises', 'Joint Pain', 'Itching', 'Bloating'];

console.log('--- Current Symptom Counts ---');
targets.forEach(t => {
    const count = homeopathyDb.filter(m =>
        m.symptoms.some(s => s.toLowerCase().includes(t.toLowerCase()))
    ).length;
    console.log(`${t}: ${count}`);
});
console.log(`Total Medicines: ${homeopathyDb.length}`);
