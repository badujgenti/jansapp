import { prisma } from "../../config";
import { AppError } from "../../middleware/error-handler";
import type { UpdateProfileInput } from "./users.schema";

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: input,
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
  return user;
}

export async function deleteAccount(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
}
