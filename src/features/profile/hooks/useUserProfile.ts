import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import ProfileApi from "@/api/profileApi";
import UploadApi from "@/api/uploadApi";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import { UserProfile, UpdateProfileDto } from "@/types/profile";
import { useAuth } from "@/features/auth/hooks/useAuth";

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
  const [birthDateInput, setBirthDateInput] = useState<string>("");
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
      setProfile(data);
      setFirstNameInput(data.first_name || "");
      setLastNameInput(data.last_name || "");
      setPhoneNumberInput(data.phone_number || "");
      setAddressInput(data.address || "");
      setBirthDateInput(data.birth_date || "");
      setAvatarPath(data.avatar_url || null);
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
      setBirthDateInput(profile.birth_date || "");
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
        first_name: firstNameInput || profile?.first_name || undefined,
        last_name: lastNameInput || profile?.last_name || undefined,
        phone_number: phoneNumberInput || profile?.phone_number || undefined,
        address: addressInput || profile?.address || undefined,
        birth_date: birthDateInput || profile?.birth_date || undefined,
        avatar_url: newAvatarUrl,
      });

      setProfile(updated);
      Alert.alert("สำเร็จ", "อัปเดตรูปโปรไฟล์เรียบร้อยแล้ว!");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "อัปโหลดรูปโปรไฟล์ไม่สำเร็จ";
      Alert.alert("ข้อผิดพลาด", msg);
    } finally {
      setUploadingAvatar(false);
    }
  };

  /**
   * Save text fields (first_name, last_name, phone_number, address, birth_date)
   */
  const handleSaveProfile = async () => {
    setUpdating(true);
    try {
      const payload: UpdateProfileDto = {
        first_name: firstNameInput.trim() || undefined,
        last_name: lastNameInput.trim() || undefined,
        phone_number: phoneNumberInput.trim() || undefined,
        address: addressInput.trim() || undefined,
        birth_date: birthDateInput.trim() || undefined,
        ...(avatarPath ? { avatar_url: avatarPath } : {}),
      };

      const updated = await ProfileApi.updateMyProfile(payload);
      setProfile(updated);
      setShowEditModal(false);
      Alert.alert("สำเร็จ", "บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "ไม่สามารถบันทึกข้อมูลได้";
      Alert.alert("ข้อผิดพลาด", msg);
    } finally {
      setUpdating(false);
    }
  };

  const fullAvatarUrl = UploadApi.getFullImageUrl(avatarPath || profile?.avatar_url);

  const displayName = profile?.first_name || profile?.last_name
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
    : profile?.username || user?.username || "ผู้ใช้งาน";

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
    birthDateInput,
    avatarPath,
    fullAvatarUrl,
    displayName,
    setFirstNameInput,
    setLastNameInput,
    setPhoneNumberInput,
    setAddressInput,
    setBirthDateInput,
    fetchProfile,
    openEditModal,
    closeEditModal,
    handleSaveProfile,
    handleUploadAndChangeAvatar,
  };
}
