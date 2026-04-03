import { create } from "zustand";
import { secureStorage } from "@/shared/services/storage/secure-storage";
import { appStorage } from "@/shared/services/storage/app-storage";
import { config } from "@/shared/constants/config";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingComplete: boolean;
}

interface AuthActions {
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  setOnboardingComplete: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const ONBOARDING_KEY = "onboarding_complete";

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isOnboardingComplete: false,

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await secureStorage.remove(config.storage.accessTokenKey);
    await secureStorage.remove(config.storage.refreshTokenKey);
    set({ user: null, isAuthenticated: false });
  },

  setOnboardingComplete: async () => {
    await appStorage.setBoolean(ONBOARDING_KEY, true);
    set({ isOnboardingComplete: true });
  },

  hydrate: async () => {
    try {
      const isOnboardingComplete =
        (await appStorage.getBoolean(ONBOARDING_KEY)) ?? false;
      const token = await secureStorage.get(config.storage.accessTokenKey);
      set({
        isAuthenticated: !!token,
        isOnboardingComplete,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
