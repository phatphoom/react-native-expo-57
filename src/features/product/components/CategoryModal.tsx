import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormField } from "@/shared/components/FormField";
import ImagePickerField from "@/shared/components/ImagePickerField";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import UploadApi from "@/api/uploadApi";
import { FONTS } from "@/shared/theme/typography";
import type { Category } from "@/types/product";

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  category?: Category | null; // Null for Create, Category object for Edit
  onSubmit: (data: { cate_name: string; image_url?: string | null }) => Promise<{ success: boolean; error?: string }>;
}

export default function CategoryModal({
  visible,
  onClose,
  category,
  onSubmit,
}: CategoryModalProps) {
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

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {category ? "Edit Category" : "Add New Category"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <FormField
              label="Category Name *"
              placeholder="e.g. Electronics, Clothing..."
              value={cateName}
              onChangeText={setCateName}
            />

            <ImagePickerField
              label="Category Image"
              imageUri={displayImageUri}
              loading={imageLoading}
              uploading={uploading}
              onPickLibrary={pickImageFromLibrary}
              onTakePhoto={takePhotoWithCamera}
              onClear={handleClearImage}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={onClose}
              disabled={submitting || uploading}
            >
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnSave, (submitting || uploading) && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={submitting || uploading}
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.btnSaveText}>
                  {category ? "Save Changes" : "Create Category"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: "#0F172A",
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 24,
  },
  footer: {
    flexDirection: "row",
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    alignItems: "center",
  },
  btnCancelText: {
    color: "#475569",
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
  btnSave: {
    flex: 2,
    paddingVertical: 14,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnSaveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: FONTS.semiBold,
  },
});
