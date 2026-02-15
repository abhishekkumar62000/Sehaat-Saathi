const fs = require('fs');
const path = require('path');

const sourcePath = 'c:/Users/DELL/Desktop/Sehaat Saathi/frontend/src/utils/medicineData.js';
const destPath = 'c:/Users/DELL/Desktop/Sehaat Saathi/backend/data/medicineKB.json';

try {
    const content = fs.readFileSync(sourcePath, 'utf8');

    // Find the medicinedb array
    const markers = ['export const medicinedb = [', 'const medicinedb = [', 'medicinedb = ['];
    let startIndex = -1;

    for (const marker of markers) {
        startIndex = content.indexOf(marker);
        if (startIndex !== -1) break;
    }

    if (startIndex === -1) {
        console.error('Could not find medicinedb array start.');
        process.exit(1);
    }

    // Find the start of the array [
    const arrayStartIndex = content.indexOf('[', startIndex);

    // Find matching closing bracket
    let depth = 0;
    let endIndex = -1;
    let inString = false;
    let quoteChar = '';

    for (let i = arrayStartIndex; i < content.length; i++) {
        const char = content[i];

        if (inString) {
            if (char === quoteChar && content[i - 1] !== '\\') {
                inString = false;
            }
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            inString = true;
            quoteChar = char;
            continue;
        }

        if (char === '[') depth++;
        if (char === ']') depth--;

        if (depth === 0) {
            endIndex = i;
            break;
        }
    }

    if (endIndex === -1) {
        console.error('Could not find matching closing bracket.');
        process.exit(1);
    }

    let arrayStr = content.substring(arrayStartIndex, endIndex + 1);

    // Create a temp file with .cjs extension
    const tempFile = path.join(path.dirname(destPath), 'temp_eval.cjs');
    fs.writeFileSync(tempFile, `
        const medicinedb = ${arrayStr};
        const fs = require('fs');
        fs.writeFileSync('${destPath.replace(/\\/g, '/')}', JSON.stringify(medicinedb, null, 2));
    `);

    console.log('Running evaluation...');
    require('./temp_eval.cjs');

    // Cleanup
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);

    console.log('Successfully converted medicine data to JSON');

} catch (err) {
    console.error('Error during extraction:', err);
}
