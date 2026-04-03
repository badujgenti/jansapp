import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "test@jansapp.ge" },
  });

  if (existingUser) {
    console.log("Seed data already exists, skipping.");
    return;
  }

  const passwordHash = await bcrypt.hash("password123", 12);

  const user = await prisma.user.create({
    data: {
      email: "test@jansapp.ge",
      passwordHash,
      fullName: "ტესტ მომხმარებელი",
      fitnessGoal: "general_fitness",
      fitnessLevel: "beginner",
      age: 25,
      heightCm: 175,
      weightKg: 75,
    },
  });

  await prisma.subscription.create({
    data: {
      userId: user.id,
      plan: "free",
      status: "active",
    },
  });

  const categories = await Promise.all([
    prisma.workoutCategory.create({
      data: {
        name: "Strength",
        nameKa: "ძალა",
        description: "Build muscle and strength",
        descriptionKa: "კუნთების და ძალის განვითარება",
        icon: "dumbbell",
        sortOrder: 1,
      },
    }),
    prisma.workoutCategory.create({
      data: {
        name: "Cardio",
        nameKa: "კარდიო",
        description: "Improve cardiovascular health",
        descriptionKa: "გულ-სისხლძარღვთა სისტემის გაუმჯობესება",
        icon: "heart-pulse",
        sortOrder: 2,
      },
    }),
    prisma.workoutCategory.create({
      data: {
        name: "Flexibility",
        nameKa: "მოქნილობა",
        description: "Stretching and mobility",
        descriptionKa: "გაჭიმვა და მობილურობა",
        icon: "yoga",
        sortOrder: 3,
      },
    }),
    prisma.workoutCategory.create({
      data: {
        name: "HIIT",
        nameKa: "HIIT",
        description: "High intensity interval training",
        descriptionKa: "მაღალი ინტენსივობის ინტერვალური ვარჯიში",
        icon: "lightning-bolt",
        sortOrder: 4,
      },
    }),
  ]);

  const workouts = [
    {
      categoryId: categories[0].id,
      title: "Full Body Strength",
      titleKa: "სრული სხეულის ძალოვანი ვარჯიში",
      description: "Complete full body workout targeting all major muscle groups",
      descriptionKa: "სრული სხეულის ვარჯიში ყველა ძირითად კუნთოვან ჯგუფზე",
      difficulty: "beginner" as const,
      durationMin: 30,
      caloriesBurn: 250,
      isFeatured: true,
      exercises: JSON.stringify([
        { name: "Squats", nameKa: "სქვოტები", sets: 3, reps: 12, restSec: 60 },
        { name: "Push-ups", nameKa: "ბიძგები", sets: 3, reps: 10, restSec: 60 },
        { name: "Lunges", nameKa: "ლანჟები", sets: 3, reps: 10, restSec: 60 },
        { name: "Plank", nameKa: "პლანკი", sets: 3, reps: 1, restSec: 45 },
      ]),
    },
    {
      categoryId: categories[0].id,
      title: "Upper Body Power",
      titleKa: "ზედა სხეულის ძალოვანი ვარჯიში",
      description: "Focus on chest, shoulders, and arms",
      descriptionKa: "ფოკუსი მკერდზე, მხრებზე და მკლავებზე",
      difficulty: "intermediate" as const,
      durationMin: 45,
      caloriesBurn: 350,
      isFeatured: true,
      exercises: JSON.stringify([
        { name: "Bench Press", nameKa: "ბენჩ პრესი", sets: 4, reps: 10, restSec: 90 },
        { name: "Shoulder Press", nameKa: "მხრის წნეხი", sets: 3, reps: 12, restSec: 60 },
        { name: "Bicep Curls", nameKa: "ბიცეფსის მოხრა", sets: 3, reps: 12, restSec: 45 },
        { name: "Tricep Dips", nameKa: "ტრიცეფსის ჩაჯდომა", sets: 3, reps: 10, restSec: 60 },
      ]),
    },
    {
      categoryId: categories[1].id,
      title: "Morning Run",
      titleKa: "დილის სირბილი",
      description: "Easy pace morning cardio",
      descriptionKa: "მსუბუქი ტემპის დილის კარდიო",
      difficulty: "beginner" as const,
      durationMin: 20,
      caloriesBurn: 200,
      isFeatured: false,
      exercises: JSON.stringify([
        { name: "Warm-up Walk", nameKa: "გახურება სიარულით", sets: 1, reps: 1, restSec: 0 },
        { name: "Jog", nameKa: "სირბილი", sets: 1, reps: 1, restSec: 0 },
        { name: "Cool-down Walk", nameKa: "გაგრილება სიარულით", sets: 1, reps: 1, restSec: 0 },
      ]),
    },
    {
      categoryId: categories[2].id,
      title: "Morning Yoga",
      titleKa: "დილის იოგა",
      description: "Gentle morning yoga flow",
      descriptionKa: "მსუბუქი დილის იოგა",
      difficulty: "beginner" as const,
      durationMin: 25,
      caloriesBurn: 120,
      isFeatured: true,
      exercises: JSON.stringify([
        { name: "Sun Salutation", nameKa: "მზის მისალმება", sets: 3, reps: 1, restSec: 30 },
        { name: "Warrior Pose", nameKa: "მეომრის პოზა", sets: 2, reps: 1, restSec: 30 },
        { name: "Downward Dog", nameKa: "ქვევით მიმართული ძაღლი", sets: 2, reps: 1, restSec: 30 },
      ]),
    },
    {
      categoryId: categories[3].id,
      title: "HIIT Blast",
      titleKa: "HIIT აფეთქება",
      description: "20-minute high intensity workout",
      descriptionKa: "20-წუთიანი მაღალი ინტენსივობის ვარჯიში",
      difficulty: "advanced" as const,
      durationMin: 20,
      caloriesBurn: 400,
      isFeatured: false,
      exercises: JSON.stringify([
        { name: "Burpees", nameKa: "ბურპი", sets: 4, reps: 10, restSec: 30 },
        { name: "Mountain Climbers", nameKa: "მთის ალპინისტი", sets: 4, reps: 20, restSec: 30 },
        { name: "Jump Squats", nameKa: "ნახტომი სქვოტები", sets: 4, reps: 15, restSec: 30 },
        { name: "High Knees", nameKa: "მაღალი მუხლები", sets: 4, reps: 20, restSec: 30 },
      ]),
    },
  ];

  for (const workout of workouts) {
    await prisma.workout.create({ data: workout });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
