import { Response, NextFunction } from "express";
import * as subscriptionService from "./subscription.service";
import { sendSuccess, sendPaginated, parsePagination } from "../../shared/utils";
import type { AuthRequest } from "../../shared/types";
import type { SubscribeInput } from "./subscription.schema";

export async function getStatus(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const status = await subscriptionService.getStatus(req.userId!);
    sendSuccess(res, status, "Subscription status retrieved");
  } catch (err) {
    next(err);
  }
}

export async function getPaymentHistory(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { page, limit, skip } = parsePagination(req.query as Record<string, string>);
    const { data, total } = await subscriptionService.getPaymentHistory(req.userId!, skip, limit);
    sendPaginated(res, data, total, page, limit);
  } catch (err) {
    next(err);
  }
}

export async function subscribe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { plan } = req.body as SubscribeInput;
    const subscription = await subscriptionService.subscribe(req.userId!, plan);
    sendSuccess(res, subscription, "Subscribed successfully", 201);
  } catch (err) {
    next(err);
  }
}

export async function cancel(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const subscription = await subscriptionService.cancel(req.userId!);
    sendSuccess(res, subscription, "Subscription cancelled");
  } catch (err) {
    next(err);
  }
}
