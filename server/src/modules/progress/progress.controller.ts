import { Response, NextFunction } from "express";
import * as progressService from "./progress.service";
import { sendSuccess, sendPaginated, parsePagination } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { AddEntryInput } from "./progress.schema";

export async function addEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const entry = await progressService.addEntry(req.userId!, req.body as AddEntryInput);
    sendSuccess(res, entry, "Entry added", 201);
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query as Record<string, string>);
    const { data, total } = await progressService.getHistory(req.userId!, skip, limit);
    sendPaginated(res, data, total, page, limit);
  } catch (err) {
    next(err);
  }
}

export async function getStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const stats = await progressService.getStats(req.userId!);
    sendSuccess(res, stats, "Stats retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getWeightChart(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = await progressService.getWeightChart(req.userId!);
    sendSuccess(res, data, "Weight chart data retrieved");
  } catch (err) {
    next(err);
  }
}

export async function deleteEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await progressService.deleteEntry(req.userId!, req.params.id);
    sendSuccess(res, null, "Entry deleted");
  } catch (err) {
    next(err);
  }
}
