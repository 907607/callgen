import admin from 'firebase-admin';
import path from 'path';
import 'dotenv/config';
import logger from './logger.js';

// Ensure you provide the path to your service account json in .env
// e.g FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-admin-sdk.json
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  : null;

if (serviceAccountPath) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath)
    });
    logger.info("Firebase Admin Initialized Successfully");
  } catch (error) {
    logger.error("Firebase Admin Initialization Error", { error });
  }
} else {
  logger.warn("WARN: FIREBASE_SERVICE_ACCOUNT_PATH is not set in .env. Firebase auth verification will fail.");
  // Initialize without credentials just so the object exists (for testing without crash)
  try {
    admin.initializeApp();
  } catch (e) { }
}

export default admin;