import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export async function createCalendarTask(userId, data) {
    if (!data.dueAt) {
        throw new AppError("dueAt is required for calendar tasks", 400);
    }

    const task = await prisma.todo.create({
        data: {
            userId,
            ...data,
        },
    });
    return task;
}

export async function getCalendarTasks(userId, filters = {}) {
    // Fetch only tasks that have a due date
    const tasks = await prisma.todo.findMany({
        where: {
            userId,
            dueAt: { not: null },
            ...filters
        },
        orderBy: { dueAt: "asc" },
    });
    return tasks;
}

export async function getCalendarTaskById(userId, taskId) {
    const task = await prisma.todo.findFirst({
        where: {
            id: taskId,
            userId,
            dueAt: { not: null }
        },
        include: {
            reminders: true
        }
    });

    if (!task) {
        throw new AppError("Calendar task not found", 404);
    }

    return task;
}

export async function updateCalendarTask(userId, taskId, data) {
    await getCalendarTaskById(userId, taskId);

    const task = await prisma.todo.update({
        where: { id: taskId },
        data,
    });

    return task;
}

export async function deleteCalendarTask(userId, taskId) {
    await getCalendarTaskById(userId, taskId);

    const reminders = await prisma.reminder.findMany({ where: { todoId: taskId } });
    const reminderIds = reminders.map(r => r.id);

    if (reminderIds.length > 0) {
        await prisma.callLog.deleteMany({ where: { reminderId: { in: reminderIds } } });
        await prisma.reminder.deleteMany({ where: { todoId: taskId } });
    }

    await prisma.todo.delete({
        where: { id: taskId },
    });

    return { success: true };
}
