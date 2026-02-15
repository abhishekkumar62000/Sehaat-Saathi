
const fs = require('fs');
const path = require('path');

const allFilesContent = fs.readFileSync('all_files.txt', 'utf8');
const allImportsContent = fs.readFileSync('all_imports.txt', 'utf8');

const allFiles = new Set(allFilesContent.split(/\r?\n/).filter(Boolean).map(f => f.replace(/\\/g, '/')));

// Helper to check if file exists in git with exact casing
function checkFile(filePath) {
    // filePath is relative to repo root
    // We need to try extensions if not present
    const extensions = ['', '.js', '.jsx', '.css', '.png', '.jpg', '.jpeg', '.svg', '.json'];

    for (const ext of extensions) {
        const fullPath = filePath + ext;
        if (allFiles.has(fullPath)) {
            return { exists: true, exact: true, path: fullPath };
        }
        // Check case-insensitive match
        const lower = fullPath.toLowerCase();
        for (const f of allFiles) {
            if (f.toLowerCase() === lower) {
                return { exists: true, exact: false, path: f, actual: fullPath };
            }
        }
    }
    return { exists: false };
}

const lines = allImportsContent.split(/\r?\n/);
let issues = [];

lines.forEach(line => {
    if (!line.trim()) return;
    // content format: frontend/src/App.jsx:7:import logo from "./logo.png";
    // We need to parse filename and import path
    // Using regex safely
    const match = line.match(/^(.+?):(\d+):(.*import.+from\s+['"](.+)['"].*|.*import\s+['"](.+)['"].*)/);

    if (!match) return;

    const sourceFile = match[1].replace(/\\/g, '/');
    const importPath = match[4] || match[5]; // The path inside quotes

    if (!importPath || !importPath.startsWith('.')) return; // Ignore node_modules or absolute/alias if not handled

    // Resolve path
    const dir = path.dirname(sourceFile);
    let resolved = path.join(dir, importPath).replace(/\\/g, '/');

    // Check
    const result = checkFile(resolved);

    if (!result.exists) {
        issues.push(`MISSING: Import '${importPath}' in '${sourceFile}' resolves to '${resolved}'`);
        // Can be noisy if just dev artifact or ignored file, but worth noting
    } else if (!result.exact) {
        issues.push(`CASE MISMATCH: Import '${importPath}' in '${sourceFile}' resolves to '${resolved}' but Git has '${result.path}'`);
    }
});

if (issues.length > 0) {
    console.log("Found case mismatch issues:");
    console.log(issues.join('\n'));
} else {
    console.log("No case mismatches found in relative imports.");
}
