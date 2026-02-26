import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

// Ensure the user owns the todo before adding a reminder
async function ensureTodoOwnership(userId, todoId) {
    const todo = await prisma.todo.findFirst({
        where: { id: todoId, userId }
    });
    if (!todo) {
        throw new AppError("Todo not found or not owned by user", 404);
    }
}

export async function createReminder(userId, data) {
    await ensureTodoOwnership(userId, data.todoId);

    const reminder = await prisma.reminder.create({
        data: {
            todoId: data.todoId,
            callTime: data.callTime,
        },
    });
    return reminder;
}

export async function getReminders(userId) {
    const reminders = await prisma.reminder.findMany({
        where: {
            todo: { userId }
        },
        include: {
            todo: true
        },
        orderBy: { callTime: "asc" },
    });
    return reminders;
}

export async function getReminderById(userId, reminderId) {
    const reminder = await prisma.reminder.findFirst({
        where: {
            id: reminderId,
            todo: { userId }
        },
        include: {
            todo: true,
            callLogs: true
        }
    });

    if (!reminder) {
        throw new AppError("Reminder not found", 404);
    }

    return reminder;
}

export async function updateReminder(userId, reminderId, data) {
    await getReminderById(userId, reminderId); // Check ownership

    const reminder = await prisma.reminder.update({
        where: { id: reminderId },
        data,
    });

    return reminder;
}

export async function deleteReminder(userId, reminderId) {
    await getReminderById(userId, reminderId); // Check ownership

    // Delete call logs first
    await prisma.callLog.deleteMany({ where: { reminderId } });

    await prisma.reminder.delete({
        where: { id: reminderId },
    });

    return { success: true };
}
