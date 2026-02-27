import admin from 'firebase-admin';
import path from 'path';
import 'dotenv/config';
import logger from './logger.js';

// Provide EITHER the direct values in .env (recommended for Render/Cloud)
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Replace literal \n with actual newlines for private key parsing
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// OR provide a file path
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  ? path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  : null;

try {
  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    logger.info("Firebase Admin Initialized Successfully via Environment Variables");
  } else if (serviceAccountPath) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath)
    });
    logger.info("Firebase Admin Initialized Successfully via JSON File");
  } else {
    logger.warn("WARN: Firebase credentials not found in env. Setting dummy initializeApp. Firebase auth will fail.");
    admin.initializeApp();
  }
} catch (error) {
  logger.error("Firebase Admin Initialization Error", { error });
}

export default admin;
