import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export async function getUserProfile(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            todos: true,
            pushTokens: true,
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}

export async function updateUserProfile(userId, data) {
    const user = await prisma.user.update({
        where: { id: userId },
        data,
    });

    return user;
}

export async function deleteUser(userId) {
    // First, delete related records to maintain referential integrity
    await prisma.pushToken.deleteMany({ where: { userId } });

    const userTodos = await prisma.todo.findMany({ where: { userId } });
    const todoIds = userTodos.map(todo => todo.id);

    if (todoIds.length > 0) {
        const reminders = await prisma.reminder.findMany({ where: { todoId: { in: todoIds } } });
        const reminderIds = reminders.map(reminder => reminder.id);

        if (reminderIds.length > 0) {
            await prisma.callLog.deleteMany({ where: { reminderId: { in: reminderIds } } });
            await prisma.reminder.deleteMany({ where: { todoId: { in: todoIds } } });
        }

        await prisma.todo.deleteMany({ where: { userId } });
    }

    await prisma.otpLog.deleteMany({ where: { userId } });

    await prisma.user.delete({
        where: { id: userId },
    });

    return { success: true };
}
