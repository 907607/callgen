import admin from "../config/firebase.js";
import AppError from "./AppError.js";

export async function verifyFirebaseToken(idToken) {
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    throw new AppError("Invalid Firebase token", 401);
  }
}