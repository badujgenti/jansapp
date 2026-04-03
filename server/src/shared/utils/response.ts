import { Response } from "express";

export function sendSuccess<T>(res: Response, data: T, message = "Success", status = 200) {
  res.status(status).json({ success: true, message, data });
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  res.status(200).json({
    success: true,
    message: "Success",
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export function parsePagination(query: { page?: string; limit?: string }) {
  const page = Math.max(1, parseInt(query.page ?? "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? "20", 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
