import fs from 'fs';

const content = fs.readFileSync('./frontend/src/pages/MedicineSuggestion.jsx', 'utf8');

// Find all used icons (Bs...)
const usedIcons = new Set([...content.matchAll(/<([A-Z][A-Za-z0-9]+)/g)].map(m => m[1]).filter(name => name.startsWith('Bs')));

// Find all imported icons
const importMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]react-icons\/bs['"]/s);
if (!importMatch) {
    console.log("No react-icons/bs imports found!");
} else {
    const importedIcons = new Set(importMatch[1].split(',').map(s => s.trim()).filter(s => s));

    console.log("Used Icons:", Array.from(usedIcons));
    console.log("Imported Icons:", Array.from(importedIcons));

    const missing = Array.from(usedIcons).filter(icon => !importedIcons.has(icon));
    console.log("Missing Icons:", missing);
}
