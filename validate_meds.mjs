import { medicinedb } from './frontend/src/utils/medicineData.js';

let errors = [];

medicinedb.forEach((med, index) => {
    if (!med.name) errors.push(`Entry ${index}: Missing name`);
    if (!med.symptoms) errors.push(`Entry ${index} (${med.name}): Missing symptoms array`);
    else if (!Array.isArray(med.symptoms)) errors.push(`Entry ${index} (${med.name}): symptoms is not an array`);

    if (med.schedule && !Array.isArray(med.schedule)) errors.push(`Entry ${index} (${med.name}): schedule is not an array`);
    if (med.benefits && !Array.isArray(med.benefits)) errors.push(`Entry ${index} (${med.name}): benefits is not an array`);
    if (med.sideEffects && !Array.isArray(med.sideEffects)) errors.push(`Entry ${index} (${med.name}): sideEffects is not an array`);
    if (med.foodInteractions && !Array.isArray(med.foodInteractions)) errors.push(`Entry ${index} (${med.name}): foodInteractions is not an array`);
    if (med.sources && !Array.isArray(med.sources)) errors.push(`Entry ${index} (${med.name}): sources is not an array`);
    if (med.generics && !Array.isArray(med.generics)) errors.push(`Entry ${index} (${med.name}): generics is not an array`);
});

if (errors.length > 0) {
    console.log("Found errors in medicineData.js:");
    errors.forEach(e => console.log(e));
} else {
    console.log("No structural errors found in medicineData.js");
}
