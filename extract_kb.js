import fs from 'fs';
import path from 'path';

// This script extracts the medicinesdb array from medicineData.js 
// and saves it as a clinical knowledge base for the backend.

const sourcePath = 'c:/Users/DELL/Desktop/Sehaat Saathi/frontend/src/utils/medicineData.js';
const destPath = 'c:/Users/DELL/Desktop/Sehaat Saathi/backend/data/medicineKB.json';

try {
    const content = fs.readFileSync(sourcePath, 'utf8');

    // Find the start of the array
    const startMatch = content.match(/export const medicinesdb = \[/);
    if (!startMatch) throw new Error('Could not find medicinesdb array start');

    const startIndex = startMatch.index + startMatch[0].length - 1;

    // Find the end of the array (last closing bracket before exports or EOF)
    // Since we know the structure, we can look for the last ];
    const endIndex = content.lastIndexOf('];');
    if (endIndex === -1) throw new Error('Could not find medicinesdb array end');

    const arrayStr = content.substring(startIndex, endIndex + 1);

    // Convert JS object literals to JSON (handling unquoted keys, trailing commas, etc.)
    // A quick hack is to evaluate it in a context, but since we are in a script, 
    // we can use a simpler approach or just use a small node script to import it.

    console.log(`Extracted ${arrayStr.length} characters of medicine data.`);

    // Since it's a JS file, the easiest way to get the data is to actually run it.
    // We'll create a temp .mjs file to import it.
    const tempFile = 'c:/Users/DELL/Desktop/Sehaat Saathi/temp_extractor.mjs';
    fs.writeFileSync(tempFile, `
        import { medicinesdb } from '${sourcePath.replace(/\\/g, '/')}';
        import fs from 'fs';
        fs.writeFileSync('${destPath.replace(/\\/g, '/')}', JSON.stringify(medicinesdb, null, 2));
        console.log('Successfully saved ' + medicinesdb.length + ' medicines to JSON.');
    `);

    console.log('Temporary extractor created at ' + tempFile);

} catch (err) {
    console.error('Extraction failed:', err);
}
