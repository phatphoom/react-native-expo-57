import React from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormField } from "@/shared/components/FormField";
import ImagePickerField from "@/shared/components/ImagePickerField";
import { FONTS } from "@/shared/theme/typography";
import type { Category } from "@/types/product";
import { useCategoryModalForm } from "../hooks/useCategoryModalForm";

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
  const {
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
  } = useCategoryModalForm({ visible, category, onClose, onSubmit });

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
