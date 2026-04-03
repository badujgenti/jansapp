import { prisma } from "../../config";

export async function getAll() {
  return prisma.workoutCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getById(id: string) {
  return prisma.workoutCategory.findUnique({
    where: { id },
    include: {
      workouts: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}
