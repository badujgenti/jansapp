import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import type { AuthRequest, AuthPayload } from "../shared/types";

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Authentication required", statusCode: 401 });
    return;
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, jwtConfig.secret) as AuthPayload;
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token", statusCode: 401 });
  }
}
