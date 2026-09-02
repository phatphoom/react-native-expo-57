import { useCallback, useEffect, useState } from "react";
import ProfileApi from "@/features/profile/api/profileApi";
import { UploadApi } from "@/shared/api";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import { UserProfile, UpdateProfileDto } from "@/types/profile";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { showAlert } from "@/shared/utils";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  const {
    loading: imageLoading,
    pickImageFromLibrary,
    takePhotoWithCamera,
    clearImage,
  } = useImagePicker({ aspect: [1, 1], allowsEditing: true, quality: 0.8 });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ProfileApi.getMyProfile();
      if (data) {
        setProfile(data);
        setFirstNameInput(data.first_name || "");
        setLastNameInput(data.last_name || "");
        setPhoneNumberInput(data.phone_number || "");
        setAddressInput(data.address || "");
        setAvatarPath(data.avatar_url || null);
      }
    } catch (err: any) {
      console.log("Fetch profile error (using fallback auth user):", err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const openEditModal = () => {
    if (profile) {
      setFirstNameInput(profile.first_name || "");
      setLastNameInput(profile.last_name || "");
      setPhoneNumberInput(profile.phone_number || "");
      setAddressInput(profile.address || "");
      setAvatarPath(profile.avatar_url || null);
    }
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    clearImage();
  };

  /**
   * Upload picked image base64 to server and update profile avatar
   */
  const handleUploadAndChangeAvatar = async (isCamera: boolean = false) => {
    try {
      const picked = isCamera
        ? await takePhotoWithCamera()
        : await pickImageFromLibrary();

      if (!picked?.base64) return;

      setUploadingAvatar(true);
      const uploadRes = await UploadApi.uploadImageBase64(
        picked.base64,
        picked.fileName
      );

      const newAvatarUrl = uploadRes.image_url;
      setAvatarPath(newAvatarUrl);

      // Automatically update profile on server with new avatar_url
      const updated = await ProfileApi.updateMyProfile({
        first_name: firstNameInput.trim() || profile?.first_name || undefined,
        last_name: lastNameInput.trim() || profile?.last_name || undefined,
        phone_number: phoneNumberInput.trim() || profile?.phone_number || undefined,
        address: addressInput.trim() || profile?.address || undefined,
        avatar_url: newAvatarUrl,
      });

      if (updated) {
        setProfile(updated);
      } else {
        await fetchProfile();
      }
      showAlert("Success", "Profile picture updated successfully!");
    } catch (err: any) {
      console.error("Upload avatar error:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to upload profile picture";
      showAlert("Error", msg);
    } finally {
      setUploadingAvatar(false);
    }
  };

  /**
   * Save text fields (first_name, last_name, phone_number, address)
   */
  const handleSaveProfile = async () => {
    setUpdating(true);
    try {
      const payload: UpdateProfileDto = {
        first_name: firstNameInput.trim() || undefined,
        last_name: lastNameInput.trim() || undefined,
        phone_number: phoneNumberInput.trim() || undefined,
        address: addressInput.trim() || undefined,
        ...(avatarPath ? { avatar_url: avatarPath } : {}),
      };

      const updated = await ProfileApi.updateMyProfile(payload);
      if (updated) {
        setProfile(updated);
      }
      await fetchProfile();
      setShowEditModal(false);
      showAlert("Success", "Profile updated successfully");
    } catch (err: any) {
      console.error("Save profile error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update profile";
      showAlert("Error", msg);
    } finally {
      setUpdating(false);
    }
  };

  const fullAvatarUrl = UploadApi.getFullImageUrl(avatarPath || profile?.avatar_url);

  const displayName = profile?.first_name || profile?.last_name
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
    : profile?.username || user?.username || "User";

  return {
    profile,
    user,
    loading,
    updating,
    uploadingAvatar: uploadingAvatar || imageLoading,
    showEditModal,
    firstNameInput,
    lastNameInput,
    phoneNumberInput,
    addressInput,
    avatarPath,
    fullAvatarUrl,
    displayName,
    setFirstNameInput,
    setLastNameInput,
    setPhoneNumberInput,
    setAddressInput,
    fetchProfile,
    openEditModal,
    closeEditModal,
    handleSaveProfile,
    handleUploadAndChangeAvatar,
  };
}
