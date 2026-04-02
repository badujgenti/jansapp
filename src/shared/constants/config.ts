import Constants from "expo-constants";

const expoConfig = Constants.expoConfig?.extra ?? {};

export const config = {
  appName: "ჯანსApp",
  api: {
    baseURL: (expoConfig["apiUrl"] as string) ?? "http://localhost:3000/api",
    timeout: 15000,
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
  },
  storage: {
    accessTokenKey: "access_token",
    refreshTokenKey: "refresh_token",
  },
} as const;
