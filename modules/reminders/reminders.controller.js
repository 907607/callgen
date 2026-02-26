import { asyncHandler } from "../../utils/asyncHandler.js";
import * as remindersService from "./reminders.service.js";

export const createReminder = asyncHandler(async (req, res) => {
    const reminder = await remindersService.createReminder(req.user.id, req.body);
    res.status(201).json({ success: true, data: reminder });
});

export const getReminders = asyncHandler(async (req, res) => {
    const reminders = await remindersService.getReminders(req.user.id);
    res.json({ success: true, data: reminders });
});

export const getReminderById = asyncHandler(async (req, res) => {
    const reminder = await remindersService.getReminderById(req.user.id, req.params.id);
    res.json({ success: true, data: reminder });
});

export const updateReminder = asyncHandler(async (req, res) => {
    const reminder = await remindersService.updateReminder(req.user.id, req.params.id, req.body);
    res.json({ success: true, data: reminder });
});

export const deleteReminder = asyncHandler(async (req, res) => {
    await remindersService.deleteReminder(req.user.id, req.params.id);
    res.json({ success: true, message: "Reminder deleted successfully" });
});
