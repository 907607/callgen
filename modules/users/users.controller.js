import { asyncHandler } from "../../utils/asyncHandler.js";
import * as usersService from "./users.service.js";

export const getMe = asyncHandler(async (req, res) => {
    const user = await usersService.getUserProfile(req.user.id);
    res.json({ success: true, data: user });
});

export const updateMe = asyncHandler(async (req, res) => {
    const allowedUpdates = ["name", "age"];
    const updates = {};

    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    const updatedUser = await usersService.updateUserProfile(req.user.id, updates);
    res.json({ success: true, data: updatedUser });
});

export const deleteMe = asyncHandler(async (req, res) => {
    await usersService.deleteUser(req.user.id);
    res.json({ success: true, message: "User deleted successfully" });
});
