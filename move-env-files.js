const fs = require('fs');
const path = require('path');

const rootPath = __dirname;
const envFolder = path.join(rootPath, 'env');

// Create env folder if it doesn't exist
if (!fs.existsSync(envFolder)) {
    fs.mkdirSync(envFolder, { recursive: true });
}

// Function to find all .env files recursively
function findEnvFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const filePath = path.join(dir, file.name);
        
        // Skip node_modules, .git, and env folder itself
        if (file.name === 'node_modules' || file.name === '.git' || file.name === 'env' || file.name === '.next') {
            continue;
        }
        
        if (file.isDirectory()) {
            findEnvFiles(filePath, fileList);
        } else if (file.name.startsWith('.env')) {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

// Find all .env files
const envFiles = findEnvFiles(rootPath);

console.log(`Found ${envFiles.length} .env files:`);

// Move each file
envFiles.forEach(filePath => {
    const fileName = path.basename(filePath);
    let destination = path.join(envFolder, fileName);
    
    // If file with same name exists, add parent folder name
    if (fs.existsSync(destination)) {
        const parentName = path.basename(path.dirname(filePath));
        const newName = `${parentName}-${fileName}`;
        destination = path.join(envFolder, newName);
    }
    
    try {
        fs.renameSync(filePath, destination);
        console.log(`  ${filePath}`);
        console.log(`    -> Moved to ${destination}`);
    } catch (error) {
        console.error(`  Error moving ${filePath}:`, error.message);
    }
});

console.log('Done!');

