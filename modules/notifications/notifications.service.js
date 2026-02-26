import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export async function savePushToken(userId, token) {
    if (!token) {
        throw new AppError("Token is required", 400);
    }

    // Use upsert or find first to avoid duplicates (schema has @@unique([userId, token]))
    const existing = await prisma.pushToken.findUnique({
        where: {
            userId_token: {
                userId,
                token
            }
        }
    });

    if (existing) {
        return existing;
    }

    const pushToken = await prisma.pushToken.create({
        data: {
            userId,
            token,
        },
    });

    return pushToken;
}

export async function getPushTokens(userId) {
    const tokens = await prisma.pushToken.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    return tokens;
}

export async function deletePushToken(userId, tokenId) {
    const token = await prisma.pushToken.findFirst({
        where: {
            id: tokenId,
            userId
        }
    });

    if (!token) {
        throw new AppError("Push token not found", 404);
    }

    await prisma.pushToken.delete({
        where: { id: tokenId },
    });

    return { success: true };
}
