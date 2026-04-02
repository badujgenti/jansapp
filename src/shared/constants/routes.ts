export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
    FORGOT_PASSWORD: "/(auth)/forgot-password",
    RESET_PASSWORD: "/(auth)/reset-password",
  },
  ONBOARDING: {
    ROOT: "/(onboarding)",
  },
  TABS: {
    HOME: "/(tabs)/home",
    WORKOUTS: "/(tabs)/workouts",
    PROGRESS: "/(tabs)/progress",
    PROFILE: "/(tabs)/profile",
  },
  WORKOUTS: {
    LIST: "/workouts",
    DETAIL: "/workouts/detail",
    CATEGORY: "/workouts/category",
    PLAYER: "/workouts/player",
    FAVORITES: "/workouts/favorites",
  },
  PROGRESS: {
    DASHBOARD: "/progress",
    WEIGHT_CHART: "/progress/weight-chart",
    HISTORY: "/progress/history",
    ADD_ENTRY: "/progress/add-entry",
    STATS: "/progress/stats",
  },
  PROFILE: {
    VIEW: "/profile",
    EDIT: "/profile/edit",
    SETTINGS: "/profile/settings",
    NOTIFICATIONS: "/profile/notifications",
    ABOUT: "/profile/about",
  },
  SUBSCRIPTION: {
    STATUS: "/subscription",
    PAYWALL: "/subscription/paywall",
    PAYMENT: "/subscription/payment",
    HISTORY: "/subscription/history",
  },
  HABITS: {
    DAILY: "/habits",
    WATER_TRACKER: "/habits/water-tracker",
    WEEKLY_GRID: "/habits/weekly-grid",
  },
} as const;
