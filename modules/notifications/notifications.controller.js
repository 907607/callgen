import { asyncHandler } from "../../utils/asyncHandler.js";
import * as notificationsService from "./notifications.service.js";

export const saveToken = asyncHandler(async (req, res) => {
    const pushToken = await notificationsService.savePushToken(req.user.id, req.body.token);
    res.status(201).json({ success: true, data: pushToken });
});

export const getTokens = asyncHandler(async (req, res) => {
    const tokens = await notificationsService.getPushTokens(req.user.id);
    res.json({ success: true, data: tokens });
});

export const removeToken = asyncHandler(async (req, res) => {
    await notificationsService.deletePushToken(req.user.id, req.params.id);
    res.json({ success: true, message: "Push token removed successfully" });
});
