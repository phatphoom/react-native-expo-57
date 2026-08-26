import api from "@/api/axios";
import {
  AuthResponse,
  BaseAuthResponse,
  ChangePasswordRequest,
  DeleteAccountRequest,
  LoginRequest,
  ProfileResponse,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from "@/types/auth";

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
  },

  /**
   * Change password for logged-in user (PUT /api/auth/change-password)
   */
  changePassword: async (data: ChangePasswordRequest): Promise<BaseAuthResponse> => {
    const res = await api.put<BaseAuthResponse>("/auth/change-password", data);
    return res.data;
  },

  /**
   * Reset / Forgot password (POST /api/auth/reset-password)
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<BaseAuthResponse> => {
    const res = await api.post<BaseAuthResponse>("/auth/reset-password", data);
    return res.data;
  },

  /**
   * Delete current logged-in user account (DELETE /api/auth/account)
   */
  deleteAccount: async (data?: DeleteAccountRequest): Promise<BaseAuthResponse> => {
    const res = await api.delete<BaseAuthResponse>("/auth/account", { data });
    return res.data;
  },
};

