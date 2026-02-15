import { medicinedb } from './frontend/src/utils/medicineData.js';

let errors = [];

medicinedb.forEach((med, index) => {
    ['name', 'dosage', 'frequency', 'maxDose', 'form', 'usage', 'usage_hi', 'safety', 'safety_hi', 'urgentWarning', 'urgentWarning_hi', 'storage', 'storage_hi', 'timing', 'timing_hi', 'maternalDetails', 'maternalDetails_hi', 'chronotherapy'].forEach(prop => {
        if (med[prop] && typeof med[prop] === 'object' && !Array.isArray(med[prop])) {
            errors.push(`Entry ${index} (${med.name || 'id:' + med.id || 'no-name'}): Property '${prop}' is an object, but expected a string/primitive.`);
        }
    });

    if (med.symptoms && med.symptoms.some(s => typeof s !== 'string')) {
        errors.push(`Entry ${index} (${med.name}): Contains non-string values in symptoms array`);
    }
});

if (errors.length > 0) {
    console.log("Found errors in medicineData.js:");
    errors.forEach(e => console.log(e));
} else {
    console.log("No non-primitive errors found in medicineData.js");
}
