
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('c:/Users/DELL/Desktop/Sehaat Saathi/frontend/src/utils/nutritionData.js', 'utf8');
const dataStr = content.replace('export const nutritionDb = ', '').replace(/;$/, '');

try {
    const nutritionDb = JSON.parse(dataStr);
    console.log(`Total items: ${nutritionDb.length}`);

    const issues = [];
    nutritionDb.forEach((item, idx) => {
        if (!item.disease) issues.push(`Item ${idx} missing disease`);
        if (!item.dietType) issues.push(`Item ${idx} missing dietType`);
        if (!item.allowed || !Array.isArray(item.allowed)) issues.push(`Item ${idx} missing allowed array`);
        if (!item.avoid || !Array.isArray(item.avoid)) issues.push(`Item ${idx} missing avoid array`);
        if (!item.plan) issues.push(`Item ${idx} missing plan`);
        else {
            const keys = ['morning', 'breakfast', 'lunch', 'snack', 'dinner'];
            keys.forEach(k => {
                if (!item.plan[k]) issues.push(`Item ${idx} missing plan.${k}`);
            });
        }
        if (!item.tips || !Array.isArray(item.tips)) issues.push(`Item ${idx} missing tips array`);
    });

    if (issues.length > 0) {
        console.log(`Found ${issues.length} issues!`);
        console.log(issues.slice(0, 20).join('\n'));
    } else {
        console.log("No issues found in data structure.");
    }
} catch (e) {
    console.error("Failed to parse nutritionData.js. It might not be pure JSON or has syntax errors.");
    console.error(e.message);
}
