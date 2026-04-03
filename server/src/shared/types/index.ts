import { Request } from "express";

export interface AuthPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}
