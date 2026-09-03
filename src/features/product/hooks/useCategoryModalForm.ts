import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { UploadApi } from "@/shared/api";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import type { Category } from "@/types/product";

interface UseCategoryModalFormProps {
  visible: boolean;
  category?: Category | null;
  onClose: () => void;
  onSubmit: (data: { cate_name: string; image_url?: string | null }) => Promise<{ success: boolean; error?: string }>;
}

export function useCategoryModalForm({
  visible,
  category,
  onClose,
  onSubmit,
}: UseCategoryModalFormProps) {
  const [cateName, setCateName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    image: pickedImage,
    loading: imageLoading,
    pickImageFromLibrary,
    takePhotoWithCamera,
    clearImage,
  } = useImagePicker();

  useEffect(() => {
    if (visible) {
      if (category) {
        setCateName(category.cate_name || "");
        setImageUrl(category.image || category.image_url || "");
      } else {
        setCateName("");
        setImageUrl("");
      }
      clearImage();
    }
  }, [visible, category]);

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const handleSubmit = async () => {
    if (!cateName.trim()) {
      showAlert("Validation Error", "Please enter category name");
      return;
    }

    setSubmitting(true);
    let finalImageUrl = imageUrl;

    if (pickedImage?.base64) {
      setUploading(true);
      try {
        const uploadRes = await UploadApi.uploadImageBase64(
          pickedImage.base64,
          pickedImage.fileName
        );
        finalImageUrl = uploadRes.image_url;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to upload image";
        showAlert("Image Upload Error", msg);
        setUploading(false);
        setSubmitting(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    const payload: { cate_name: string; image_url?: string | null } = {
      cate_name: cateName.trim(),
    };

    if (finalImageUrl && finalImageUrl.trim() !== "") {
      payload.image_url = finalImageUrl.trim();
    }

    const res = await onSubmit(payload);

    setSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      showAlert("Error", res.error || "Failed to save category");
    }
  };

  const displayImageUri =
    pickedImage?.uri ||
    (imageUrl ? UploadApi.getFullImageUrl(imageUrl) : null);

  const handleClearImage = () => {
    clearImage();
    setImageUrl("");
  };

  return {
    cateName,
    setCateName,
    submitting,
    uploading,
    imageLoading,
    displayImageUri,
    pickImageFromLibrary,
    takePhotoWithCamera,
    handleClearImage,
    handleSubmit,
  };
}
