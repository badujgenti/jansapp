import { prisma } from "../../config";
import type { UpdateDailyLogInput } from "./habits.schema";

export async function getDailyLog(userId: string, dateStr: string) {
  const date = new Date(dateStr);
  return prisma.dailyLog.findUnique({
    where: { userId_date: { userId, date } },
  });
}

export async function upsertDailyLog(userId: string, input: UpdateDailyLogInput) {
  const date = new Date(input.date);

  return prisma.dailyLog.upsert({
    where: { userId_date: { userId, date } },
    create: {
      userId,
      date,
      waterGlasses: input.waterGlasses ?? 0,
      waterGoal: input.waterGoal ?? 8,
      habitsComplete: input.habitsComplete ?? [],
      notes: input.notes,
    },
    update: {
      ...(input.waterGlasses !== undefined && { waterGlasses: input.waterGlasses }),
      ...(input.waterGoal !== undefined && { waterGoal: input.waterGoal }),
      ...(input.habitsComplete !== undefined && { habitsComplete: input.habitsComplete }),
      ...(input.notes !== undefined && { notes: input.notes }),
    },
  });
}

export async function getWeeklyGrid(userId: string, startDate: string) {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return prisma.dailyLog.findMany({
    where: {
      userId,
      date: { gte: start, lt: end },
    },
    orderBy: { date: "asc" },
  });
}

export async function getStreak(userId: string) {
  const logs = await prisma.dailyLog.findMany({
    where: { userId },
    select: { date: true, habitsComplete: true },
    orderBy: { date: "desc" },
    take: 365,
  });

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (logDate.getTime() !== expectedDate.getTime()) break;

    const habits = logs[i].habitsComplete as string[];
    if (habits.length === 0) break;

    streak++;
  }

  return streak;
}
