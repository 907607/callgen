import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export async function createTodo(userId, data) {
    const todo = await prisma.todo.create({
        data: {
            userId,
            ...data,
        },
    });
    return todo;
}

export async function getTodos(userId, filters = {}) {
    // Can extend filters if needed (e.g., query by completion status)
    const todos = await prisma.todo.findMany({
        where: { userId, ...filters },
        orderBy: { createdAt: "desc" },
    });
    return todos;
}

export async function getTodoById(userId, todoId) {
    const todo = await prisma.todo.findFirst({
        where: {
            id: todoId,
            userId
        },
        include: {
            reminders: true
        }
    });

    if (!todo) {
        throw new AppError("Todo not found", 404);
    }

    return todo;
}

export async function updateTodo(userId, todoId, data) {
    // First ensure it belongs to user
    await getTodoById(userId, todoId);

    const todo = await prisma.todo.update({
        where: { id: todoId },
        data,
    });

    return todo;
}

export async function deleteTodo(userId, todoId) {
    await getTodoById(userId, todoId);

    // Delete associated reminders first
    const reminders = await prisma.reminder.findMany({ where: { todoId } });
    const reminderIds = reminders.map(r => r.id);

    if (reminderIds.length > 0) {
        await prisma.callLog.deleteMany({ where: { reminderId: { in: reminderIds } } });
        await prisma.reminder.deleteMany({ where: { todoId } });
    }

    await prisma.todo.delete({
        where: { id: todoId },
    });

    return { success: true };
}
