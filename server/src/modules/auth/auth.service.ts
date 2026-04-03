import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { StringValue } from "ms";
import { prisma, jwtConfig } from "../../config";
import { AppError } from "../../middleware/error-handler";
import type { RegisterInput, LoginInput } from "./auth.schema";

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn as StringValue,
  });
  const refreshToken = crypto.randomBytes(40).toString("hex");
  return { accessToken, refreshToken };
}

function parseExpiry(duration: string): Date {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const value = parseInt(match[1], 10);
  const unit = match[2];
  const ms: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return new Date(Date.now() + value * (ms[unit] ?? 86400000));
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new AppError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      fullName: input.fullName,
    },
    select: { id: true, email: true, fullName: true, avatarUrl: true },
  });

  await prisma.subscription.create({
    data: { userId: user.id, plan: "free", status: "active" },
  });

  const tokens = generateTokens(user.id);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: parseExpiry(jwtConfig.refreshExpiresIn),
    },
  });

  return { user, ...tokens };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatarUrl: true,
      passwordHash: true,
      fitnessGoal: true,
      fitnessLevel: true,
    },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    throw new AppError(401, "Invalid email or password");
  }

  const tokens = generateTokens(user.id);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: parseExpiry(jwtConfig.refreshExpiresIn),
    },
  });

  const { passwordHash: _, ...userData } = user;
  return { user: userData, ...tokens };
}

export async function refresh(refreshToken: string) {
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!stored || stored.expiresAt < new Date()) {
    if (stored) {
      await prisma.refreshToken.delete({ where: { id: stored.id } });
    }
    throw new AppError(401, "Invalid or expired refresh token");
  }

  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const tokens = generateTokens(stored.userId);

  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: stored.userId,
      expiresAt: parseExpiry(jwtConfig.refreshExpiresIn),
    },
  });

  return tokens;
}

export async function logout(refreshToken: string) {
  await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      avatarUrl: true,
      fitnessGoal: true,
      fitnessLevel: true,
      age: true,
      heightCm: true,
      weightKg: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
}
