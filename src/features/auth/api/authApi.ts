import api from "@/api/axios";
import { AuthResponse, LoginRequest, ProfileResponse, RegisterRequest, User } from "@/types/auth";

export const AuthApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/register", data);
    return res.data;
  },
  
  getProfile: async (): Promise<User> => {
    const res = await api.get<ProfileResponse>("/auth/me");
    return res.data.data; // ApiSuccessResponse returns data inside data
  }
};
