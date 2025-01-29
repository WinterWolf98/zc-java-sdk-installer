#! /usr/bin/env node
const { get } = require('https');
const fs = require('fs');
const { mkdir, rm } = require('fs/promises');
const AdmZip = require('adm-zip');
const path = require('path');

let isBeta = !!process.env['ZC-BETA'];
const version = process.env['ZC-VERSION'];
let downloadPath = process.env['ZC-DEST-PATH'];
const cwd = process.cwd();

if(!path.isAbsolute(downloadPath)) {
    downloadPath = path.resolve(cwd, downloadPath);
}

if(args.includes('--beta')) {
    isBeta = true;
}

if(args.includes('--version')) {
    version = args.indexOf('--version') + 1;
}

if(isBeta && version) {
    console.log('The beta and version configurations cannot be used together. Use any one of the configs at a time.');
    process.exit(1);
}

const LIB_FOLDER = downloadPath || path.join(cwd, "lib");
const SDK_URL = version ? `https://catalyst.zoho.com/downloads/sdk/java/catalyst-java-sdk-${version}.zip` : `https://catalyst.zoho.com/downloads/sdk/java/catalyst_java_sdk_${isBeta ? 'beta' : 'latest'}.zip`;
const TEMP_DIR = path.join(cwd, '.catalyst');
const ZIP_NAME = 'catalyst-java-sdk.zip';
const ZIP_FILE_PATH = path.join(TEMP_DIR, ZIP_NAME);

/**
 * Downloads the sdk ZIP file to a file path
 * @param {string} url sdk url to download
 * @param {string} dest zip file destination
 * @returns 
 */
async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const zipPath = fs.createWriteStream(dest);
        get(url, (response) => {
            if(response.statusCode !== 200) {
                reject(new Error(`Failed to download file: ${response.statusCode}`));
                return;
            };
            response.pipe(zipPath);
            response.on('end', () => {
                console.log('ZIP file downloaded successfully to path: ' + ZIP_FILE_PATH);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

/**
 * Extract the jar files from the zip to a file path
 * @param {string} src zip file path
 * @param {string} dest unzip location
 */
function extractZip(src, dest) {
    const zip = new AdmZip(src);
    const zipEntries = zip.getEntries();

    console.log();
    zipEntries.forEach((entry) => {
        if(entry.name.endsWith('.jar')) {
            console.log(`Extracting ${entry.name} to ${path.join(dest, entry.name)}`)
            zip.extractEntryTo(entry.entryName, dest, false, true);
        }
    });
}

async function main() {
    try {
        if(!fs.existsSync(LIB_FOLDER)) {
            console.log('Creating new lib folder');
            await mkdir(LIB_FOLDER);
        } else {
            console.log('lib folder found');
        }

        if(!fs.existsSync(TEMP_DIR)) {
            await mkdir(TEMP_DIR);
        }

        console.log(`Downloading SDK from ${SDK_URL}`);
        await downloadFile(SDK_URL, ZIP_FILE_PATH);

        console.log();
        console.log(`Extracting ZIP file to ${LIB_FOLDER}`);
        extractZip(ZIP_FILE_PATH, LIB_FOLDER);

        await rm(TEMP_DIR, { recursive: true, force: true });

        console.log();
        console.log('Done! ZCatalyst-Java-SDK successfully installed');
    } catch(er) {
        console.error("An error occurred:", er.message);
    }
}

main();
