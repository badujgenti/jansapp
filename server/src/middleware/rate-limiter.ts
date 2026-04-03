import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests, please try again later",
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
    statusCode: 429,
  },
  standardHeaders: true,
  legacyHeaders: false,
});
