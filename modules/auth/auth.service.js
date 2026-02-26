import prisma from "../../config/db.js";
import admin from "../../config/firebase.js";
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError.js";
import { signJwt } from "../../utils/jwt.js";



export async function verifyFirebaseLogin(firebaseToken) {
  try {
    if (!admin.apps.length) {
      throw new AppError("Firebase Admin not initialized properly on server", 500);
    }

    // 1. Verify token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const phone = decodedToken.phone_number;

    if (!phone) {
      throw new AppError("Phone number not found in Firebase token", 400);
    }

    // 2. Find or create user
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({ data: { phone } });
    }

    // 3. Issue our own backend JWT so rest of the app works seamlessly
    const token = signJwt({ userId: user.id });

    return { token, user };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Firebase auth failed: ${error.message}`, 401);
  }
}
