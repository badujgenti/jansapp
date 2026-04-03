import { prisma } from "../../config";
import type { AddEntryInput } from "./progress.schema";

export async function addEntry(userId: string, input: AddEntryInput) {
  return prisma.progressEntry.create({
    data: {
      userId,
      weightKg: input.weightKg,
      bodyFatPct: input.bodyFatPct,
      notes: input.notes,
      date: input.date ? new Date(input.date) : new Date(),
    },
  });
}

export async function getHistory(userId: string, skip: number, take: number) {
  const [data, total] = await Promise.all([
    prisma.progressEntry.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      skip,
      take,
    }),
    prisma.progressEntry.count({ where: { userId } }),
  ]);
  return { data, total };
}

export async function getStats(userId: string) {
  const latest = await prisma.progressEntry.findFirst({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const oldest = await prisma.progressEntry.findFirst({
    where: { userId, weightKg: { not: null } },
    orderBy: { date: "asc" },
  });

  const totalWorkouts = await prisma.workoutLog.count({ where: { userId } });

  const caloriesAgg = await prisma.workoutLog.aggregate({
    where: { userId },
    _sum: { caloriesBurn: true },
  });

  return {
    currentWeight: latest?.weightKg ?? null,
    startWeight: oldest?.weightKg ?? null,
    totalWorkouts,
    totalCalories: caloriesAgg._sum.caloriesBurn ?? 0,
  };
}

export async function getWeightChart(userId: string) {
  return prisma.progressEntry.findMany({
    where: { userId, weightKg: { not: null } },
    select: { date: true, weightKg: true },
    orderBy: { date: "asc" },
    take: 90,
  });
}

export async function deleteEntry(userId: string, entryId: string) {
  await prisma.progressEntry.deleteMany({
    where: { id: entryId, userId },
  });
}
