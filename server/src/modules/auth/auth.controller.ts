import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { sendSuccess } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { RegisterInput, LoginInput, RefreshInput } from "./auth.schema";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body as RegisterInput);
    sendSuccess(res, result, "Registration successful", 201);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body as LoginInput);
    sendSuccess(res, result, "Login successful");
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body as RefreshInput;
    const result = await authService.refresh(refreshToken);
    sendSuccess(res, result, "Token refreshed");
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body as RefreshInput;
    await authService.logout(refreshToken);
    sendSuccess(res, null, "Logged out");
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.userId!);
    sendSuccess(res, user, "User retrieved");
  } catch (err) {
    next(err);
  }
}
