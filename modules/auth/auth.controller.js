import { asyncHandler } from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import * as authService from "./auth.service.js";

export const firebaseLogin = asyncHandler(async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) {
    throw new AppError("firebaseToken is required", 400);
  }

  const result = await authService.verifyFirebaseLogin(firebaseToken);
  res.json(result);
});
