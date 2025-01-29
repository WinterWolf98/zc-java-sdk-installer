const catalyst = require('zcatalyst-sdk-node');
const { createReadStream } = require('fs');
const { RefreshTokenCredential } = require('zcatalyst-sdk-node/lib/utils/credential');

const credential = new RefreshTokenCredential({
    client_id: process.env['ZC_CLIENT_ID'],
    client_secret: process.env['ZC_CLIENT_SECRET'],
    refresh_token: process.env['ZC_REFRESH_TOKEN']
});

const appOptions = {
    project_id: process.env['ZC_PROJECT_ID'],
    project_key: process.env['ZC_PROJECT_KEY'],
    environment: 'Development',
    credential
};

const bucketName = process.env['ZC_BUCKET_NAME'];
const scriptPath = process.env['ZC_SCRIPT_PATH'] || 'dist/bundle.js';
const uploadPath = process.env['ZC_UPLOAD_PATH'] || 'zc-scripts/sdk-upload.js';

async function upload() {
    try {
        const app = catalyst.initializeApp(appOptions, 'stratus-upload-app');
        const bucket = app.stratus().bucket(bucketName);
        const scriptStream = createReadStream(scriptPath);
        await bucket.putObject(uploadPath, scriptStream, { overwrite: true });

        console.log(`Script file uploaded to stratus: ${bucket.bucketDetails.bucket_url}/${uploadPath}`);
    } catch(er) {
        console.log('Error while uploading file to Stratus: ', er);
        process.exit(1);
    }
}

upload();
