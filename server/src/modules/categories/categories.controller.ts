import { Request, Response, NextFunction } from "express";
import * as categoriesService from "./categories.service";
import { sendSuccess } from "../../shared/utils";
import { AppError } from "../../middleware/error-handler";

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoriesService.getAll();
    sendSuccess(res, categories, "Categories retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoriesService.getById(req.params.id);
    if (!category) throw new AppError(404, "Category not found");
    sendSuccess(res, category, "Category retrieved");
  } catch (err) {
    next(err);
  }
}
