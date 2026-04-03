import { Request, Response, NextFunction } from "express";
import * as workoutsService from "./workouts.service";
import { sendSuccess, sendPaginated, parsePagination } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { LogWorkoutInput } from "./workouts.schema";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query as Record<string, string>);
    const { data, total } = await workoutsService.getAll(req.query as Record<string, string>, skip, limit);
    sendPaginated(res, data, total, page, limit);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const workout = await workoutsService.getById(req.params.id);
    sendSuccess(res, workout, "Workout retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getFeatured(_req: Request, res: Response, next: NextFunction) {
  try {
    const workouts = await workoutsService.getFeatured();
    sendSuccess(res, workouts, "Featured workouts retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getFavorites(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const workouts = await workoutsService.getFavorites(req.userId!);
    sendSuccess(res, workouts, "Favorites retrieved");
  } catch (err) {
    next(err);
  }
}

export async function addFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await workoutsService.addFavorite(req.userId!, req.params.id);
    sendSuccess(res, null, "Added to favorites", 201);
  } catch (err) {
    next(err);
  }
}

export async function removeFavorite(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await workoutsService.removeFavorite(req.userId!, req.params.id);
    sendSuccess(res, null, "Removed from favorites");
  } catch (err) {
    next(err);
  }
}

export async function logWorkout(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const log = await workoutsService.logWorkout(req.userId!, req.body as LogWorkoutInput);
    sendSuccess(res, log, "Workout logged", 201);
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query as Record<string, string>);
    const { data, total } = await workoutsService.getHistory(req.userId!, skip, limit);
    sendPaginated(res, data, total, page, limit);
  } catch (err) {
    next(err);
  }
}
