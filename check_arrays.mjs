import { medicinedb } from './frontend/src/utils/medicineData.js';

const arrayProps = ['benefits', 'sideEffects', 'symptoms', 'schedule', 'interactions', 'sources', 'generics'];

medicinedb.forEach((med, idx) => {
    arrayProps.forEach(prop => {
        if (med[prop] !== undefined && med[prop] !== null && !Array.isArray(med[prop])) {
            console.log(`Medicine ${idx} (${med.name}): Property '${prop}' is NOT an array. Type: ${typeof med[prop]}, Value:`, med[prop]);
        }
    });
});
