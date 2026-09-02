import type { UserProfile, UpdateProfileDto, UserProfileResponse } from "@/types/profile";
import { apiClient as api } from "@/shared/api";

const ProfileApi = {
  /**
   * Get logged-in user profile (GET /api/profile/me)
   */
  getMyProfile: async (): Promise<UserProfile> => {
    const res = await api.get<UserProfileResponse>("/profile/me");
    return res.data?.data || (res.data as any);
  },

  /**
   * Create or Update logged-in user profile (PUT /api/profile/me)
   */
  updateMyProfile: async (data: UpdateProfileDto): Promise<UserProfile> => {
    const res = await api.put<UserProfileResponse>("/profile/me", data);
    return res.data?.data || (res.data as any);
  },

  /**
   * Get user profile by user_id (GET /api/profile/:user_id)
   */
  getProfileByUserId: async (userId: string): Promise<UserProfile> => {
    const res = await api.get<UserProfileResponse>(`/profile/${userId}`);
    return res.data?.data || (res.data as any);
  },
};

export default ProfileApi;
