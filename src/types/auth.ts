import { ApiSuccessResponse } from "./product";

export interface User {
  user_id: string;
  username: string;
  email: string;
  role?: string;
  created_at?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password?: string;
}

export interface AuthResponseData {
  token: string;
  user: User;
}

export type AuthResponse = ApiSuccessResponse<AuthResponseData>;
export type ProfileResponse = ApiSuccessResponse<User>;
