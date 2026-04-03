import { prisma } from "../../config";
import { AppError } from "../../middleware/error-handler";

export async function getStatus(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription) {
    return { plan: "free", status: "active", startDate: null, endDate: null };
  }

  return subscription;
}

export async function getPaymentHistory(userId: string, skip: number, take: number) {
  const [data, total] = await Promise.all([
    prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.payment.count({ where: { userId } }),
  ]);
  return { data, total };
}

export async function subscribe(
  userId: string,
  plan: "monthly" | "yearly"
) {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + (plan === "yearly" ? 12 : 1));

  const amount = plan === "yearly" ? 99.99 : 9.99;

  const subscription = await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      plan,
      status: "active",
      startDate: now,
      endDate,
    },
    update: {
      plan,
      status: "active",
      startDate: now,
      endDate,
    },
  });

  await prisma.payment.create({
    data: {
      userId,
      amount,
      currency: "GEL",
      status: "completed",
      method: "card",
    },
  });

  return subscription;
}

export async function cancel(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  if (!subscription || subscription.status !== "active") {
    throw new AppError(400, "No active subscription to cancel");
  }

  return prisma.subscription.update({
    where: { userId },
    data: { status: "cancelled" },
  });
}
