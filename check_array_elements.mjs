import { medicinedb } from './frontend/src/utils/medicineData.js';

const arrayProps = ['benefits', 'sideEffects', 'symptoms', 'schedule', 'interactions', 'sources', 'benefits_hi', 'sideEffects_hi'];

medicinedb.forEach((med, idx) => {
    arrayProps.forEach(prop => {
        if (Array.isArray(med[prop])) {
            med[prop].forEach((item, itemIdx) => {
                if (typeof item === 'object' && item !== null) {
                    console.log(`Medicine ${idx} (${med.name}): Property '${prop}' contains an object at index ${itemIdx}:`, item);
                }
            });
        }
    });
});
