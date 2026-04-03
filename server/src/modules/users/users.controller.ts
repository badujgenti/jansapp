import { Response, NextFunction } from "express";
import * as usersService from "./users.service";
import { sendSuccess } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { UpdateProfileInput } from "./users.schema";

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await usersService.updateProfile(req.userId!, req.body as UpdateProfileInput);
    sendSuccess(res, user, "Profile updated");
  } catch (err) {
    next(err);
  }
}

export async function deleteAccount(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await usersService.deleteAccount(req.userId!);
    sendSuccess(res, null, "Account deleted");
  } catch (err) {
    next(err);
  }
}
