const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

fsExtra.ensureDirSync('./src/generated');

const protoDir = path.resolve('../../proto');

function listProtoFiles(dir) {
    const protoFiles = [];

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            listProtoFiles(filePath)
                .forEach(protoFile => protoFiles.push(protoFile));
        } else if (file.endsWith('.proto')) {
            protoFiles.push(filePath);
        }
    });

    return protoFiles;
}

const protoFiles = listProtoFiles(protoDir);

// execute protoc command
const childProcess = require('child_process');
childProcess.exec(
    [
        'npx protoc',
        '--proto_path', `"${protoDir}"`, ...(protoFiles.map(protoFile => `"${protoFile}"`)),
        '--ts_out', './src/generated'
    ].join(' '),
    (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
        } else {
            console.log('Successfully generated TypeScript files from proto files.');
        }
    }
);
