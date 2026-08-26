import { ApiSuccessResponse } from "./product";

export interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  role: string;
  first_name?: string | null;
  last_name?: string | null;
  phone_number?: string | null;
  avatar_url?: string | null;
  address?: string | null;
  birth_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateProfileDto {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
  address?: string;
  birth_date?: string;
}

export type UserProfileResponse = ApiSuccessResponse<UserProfile>;

