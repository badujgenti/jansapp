import { Request, Response, NextFunction } from "express";
import * as habitsService from "./habits.service";
import { sendSuccess } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { UpdateDailyLogInput } from "./habits.schema";

export async function getDailyLog(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const date = (req.query.date as string) ?? new Date().toISOString().slice(0, 10);
    const log = await habitsService.getDailyLog(req.userId!, date);
    sendSuccess(res, log, "Daily log retrieved");
  } catch (err) {
    next(err);
  }
}

export async function upsertDailyLog(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const log = await habitsService.upsertDailyLog(req.userId!, req.body as UpdateDailyLogInput);
    sendSuccess(res, log, "Daily log updated");
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyGrid(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const startDate = req.query.start as string;
    const today = new Date();
    const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    const start = startDate ?? monday.toISOString().slice(0, 10);

    const grid = await habitsService.getWeeklyGrid(req.userId!, start);
    sendSuccess(res, grid, "Weekly grid retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getStreak(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const streak = await habitsService.getStreak(req.userId!);
    sendSuccess(res, { streak }, "Streak retrieved");
  } catch (err) {
    next(err);
  }
}
