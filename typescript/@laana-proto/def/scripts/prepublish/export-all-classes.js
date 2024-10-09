// generate index.ts file to export everything from generated ts files
const path = require('path');
const fs = require('fs');

const generatedFilesRootFolder = path.resolve('./src/generated');

function listGeneratedFiles(dir) {
    const generatedFiles = [];

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            listGeneratedFiles(filePath)
                .forEach(generatedFile => generatedFiles.push(generatedFile));
        } else if (file.endsWith('.ts')) {
            generatedFiles.push(filePath);
        }
    });

    return generatedFiles;
}

const modulesToExport = listGeneratedFiles(generatedFilesRootFolder)
    .map(file => path.relative(generatedFilesRootFolder, file)
        .replace(/\.ts$/, '')
        .replace('\\', '/')
    )
    .map(module => `export * from './generated/${module}';`);

fs.writeFileSync(path.resolve(generatedFilesRootFolder, '../index.ts'), modulesToExport.join('\n'));

console.log('Successfully generated index.ts file to export generated ts files.');