
const fs = require('fs');
const path = require('path');

// Recursive function to get all files
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const projectRoot = path.join(__dirname, 'frontend', 'src');
if (!fs.existsSync(projectRoot)) {
    console.error("Frontend src directory not found!");
    process.exit(1);
}

const allFiles = getAllFiles(projectRoot);
const fileSet = new Set(allFiles.map(f => f.toLowerCase().replace(/\\/g, '/')));
const actualFileMap = new Map();

allFiles.forEach(f => {
    actualFileMap.set(f.toLowerCase().replace(/\\/g, '/'), f.replace(/\\/g, '/'));
});

console.log(`Scanning ${allFiles.length} files for import casing issues...`);

let issuesFound = 0;

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
        // Simple regex for imports (supports import ... from "..." and import "...")
        const match = line.match(/from\s+['"](.+)['"]|import\s+['"](.+)['"]/);
        if (match) {
            const importPath = match[1] || match[2];
            if (importPath.startsWith('.')) {
                // Resolve path
                const currentDir = path.dirname(filePath);
                const resolvedPath = path.join(currentDir, importPath);

                // Check extensions
                const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json', '.png', '.jpg', '.svg'];
                let found = false;

                for (const ext of extensions) {
                    const testPath = (resolvedPath + ext).replace(/\\/g, '/');
                    const lowerTestPath = testPath.toLowerCase();

                    if (fileSet.has(lowerTestPath)) {
                        const actualPath = actualFileMap.get(lowerTestPath);
                        // Check if casing matches exactly
                        // We need to compare the end of the path because absolute paths differ
                        const relativeTest = path.relative(path.join(__dirname, 'frontend'), testPath).replace(/\\/g, '/');
                        // This check is a bit simplified, mainly checking if the file actually exists on disk with that casing
                        // fs.existsSync is case-insensitive on Windows, ensuring 'actualPath' is what we rely on.

                        // We can't easily check exact casing match with fs on Windows without reading dir.
                        // validFileMap contains the exact casing from readdir.

                        // Compare the import part
                        const importFileName = path.basename(importPath);
                        const actualFileName = path.basename(actualPath);

                        if (importFileName.toLowerCase() === actualFileName.toLowerCase() && importFileName !== actualFileName) {
                            console.error(`[CASE MISMATCH] ${filePath}:${index + 1}`);
                            console.error(`  Imported: ${importPath}`);
                            console.error(`  Actual:   ${actualFileName}`);
                            issuesFound++;
                        }
                        found = true;
                        break;
                    }
                }
            }
        }
    });
});

if (issuesFound === 0) {
    console.log("No casing issues found!");
} else {
    console.log(`Found ${issuesFound} casing issues.`);
}
