interface WorkoutFilters {
  category?: string;
  difficulty?: string;
  search?: string;
}

interface ProgressFilters {
  startDate?: string;
  endDate?: string;
  type?: string;
}

interface HabitFilters {
  date?: string;
  type?: string;
}

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  workouts: {
    all: ["workouts"] as const,
    lists: () => [...queryKeys.workouts.all, "list"] as const,
    list: (filters: WorkoutFilters) =>
      [...queryKeys.workouts.lists(), filters] as const,
    detail: (id: string) =>
      [...queryKeys.workouts.all, "detail", id] as const,
    featured: () => [...queryKeys.workouts.all, "featured"] as const,
    favorites: () => [...queryKeys.workouts.all, "favorites"] as const,
    categories: () => [...queryKeys.workouts.all, "categories"] as const,
  },
  progress: {
    all: ["progress"] as const,
    lists: () => [...queryKeys.progress.all, "list"] as const,
    list: (filters: ProgressFilters) =>
      [...queryKeys.progress.lists(), filters] as const,
    detail: (id: string) =>
      [...queryKeys.progress.all, "detail", id] as const,
    weightChart: () => [...queryKeys.progress.all, "weight-chart"] as const,
    stats: () => [...queryKeys.progress.all, "stats"] as const,
  },
  habits: {
    all: ["habits"] as const,
    lists: () => [...queryKeys.habits.all, "list"] as const,
    list: (filters: HabitFilters) =>
      [...queryKeys.habits.lists(), filters] as const,
    detail: (id: string) =>
      [...queryKeys.habits.all, "detail", id] as const,
    daily: (date: string) =>
      [...queryKeys.habits.all, "daily", date] as const,
    waterTracker: (date: string) =>
      [...queryKeys.habits.all, "water-tracker", date] as const,
    weeklyGrid: () => [...queryKeys.habits.all, "weekly-grid"] as const,
  },
  subscription: {
    all: ["subscription"] as const,
    status: () => [...queryKeys.subscription.all, "status"] as const,
    history: () => [...queryKeys.subscription.all, "history"] as const,
  },
} as const;
