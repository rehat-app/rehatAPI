// todo: configuration for GCS (Cloud Storage)
const Cloud = require('@google-cloud/storage');
const path = require('path');
const env = require('dotenv');
env.config();

const serviceKey = path.join(__dirname, './keys.json');

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
});

module.exports = storage;
