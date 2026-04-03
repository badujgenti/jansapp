export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  fitnessGoal?: string;
  fitnessLevel?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}
