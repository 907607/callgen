import { asyncHandler } from "../../utils/asyncHandler.js";
import * as calendarService from "./calendar.service.js";

export const createTask = asyncHandler(async (req, res) => {
    const task = await calendarService.createCalendarTask(req.user.id, req.body);
    res.status(201).json({ success: true, data: task });
});

export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await calendarService.getCalendarTasks(req.user.id);
    res.json({ success: true, data: tasks });
});

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await calendarService.getCalendarTaskById(req.user.id, req.params.id);
    res.json({ success: true, data: task });
});

export const updateTask = asyncHandler(async (req, res) => {
    const task = await calendarService.updateCalendarTask(req.user.id, req.params.id, req.body);
    res.json({ success: true, data: task });
});

export const deleteTask = asyncHandler(async (req, res) => {
    await calendarService.deleteCalendarTask(req.user.id, req.params.id);
    res.json({ success: true, message: "Calendar task deleted successfully" });
});
