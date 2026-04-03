import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { AppError } from "../../middleware/error-handler";
import type { WorkoutQuery, LogWorkoutInput } from "./workouts.schema";

export async function getAll(query: WorkoutQuery, skip: number, take: number) {
  const where: Prisma.WorkoutWhereInput = {};

  if (query.category) where.categoryId = query.category;
  if (query.difficulty) where.difficulty = query.difficulty;
  if (query.featured === "true") where.isFeatured = true;
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { titleKa: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.workout.findMany({
      where,
      include: { category: { select: { name: true, nameKa: true } } },
      orderBy: { sortOrder: "asc" },
      skip,
      take,
    }),
    prisma.workout.count({ where }),
  ]);

  return { data, total };
}

export async function getById(id: string) {
  const workout = await prisma.workout.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!workout) throw new AppError(404, "Workout not found");
  return workout;
}

export async function getFeatured() {
  return prisma.workout.findMany({
    where: { isFeatured: true },
    include: { category: { select: { name: true, nameKa: true } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      workout: {
        include: { category: { select: { name: true, nameKa: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return favorites.map((f) => f.workout);
}

export async function addFavorite(userId: string, workoutId: string) {
  const workout = await prisma.workout.findUnique({ where: { id: workoutId } });
  if (!workout) throw new AppError(404, "Workout not found");

  await prisma.favorite.upsert({
    where: { userId_workoutId: { userId, workoutId } },
    create: { userId, workoutId },
    update: {},
  });
}

export async function removeFavorite(userId: string, workoutId: string) {
  await prisma.favorite.deleteMany({
    where: { userId, workoutId },
  });
}

export async function logWorkout(userId: string, input: LogWorkoutInput) {
  return prisma.workoutLog.create({
    data: {
      userId,
      workoutId: input.workoutId,
      durationMin: input.durationMin,
      caloriesBurn: input.caloriesBurn,
    },
  });
}

export async function getHistory(userId: string, skip: number, take: number) {
  const [data, total] = await Promise.all([
    prisma.workoutLog.findMany({
      where: { userId },
      include: {
        workout: { select: { title: true, titleKa: true } },
      },
      orderBy: { completedAt: "desc" },
      skip,
      take,
    }),
    prisma.workoutLog.count({ where: { userId } }),
  ]);
  return { data, total };
}
