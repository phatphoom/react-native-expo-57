import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ImagePickerFieldProps {
  label?: string;
  imageUri?: string | null;
  loading?: boolean;
  uploading?: boolean;
  onPickLibrary: () => void;
  onTakePhoto: () => void;
  onClear: () => void;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label = "รูปภาพสินค้า",
  imageUri,
  loading = false,
  uploading = false,
  onPickLibrary,
  onTakePhoto,
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {imageUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
          {uploading && (
            <View style={styles.uploadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.uploadingText}>กำลังอัปโหลดรูปภาพ...</Text>
            </View>
          )}
          <TouchableOpacity style={styles.clearButton} onPress={onClear} disabled={uploading}>
            <Ionicons name="close-circle" size={26} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="image-outline" size={44} color="#94A3B8" />
          <Text style={styles.placeholderText}>ยังไม่ได้เลือกรูปภาพ</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator style={{ marginVertical: 10 }} color="#2563EB" />
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.libraryButton]}
            onPress={onPickLibrary}
            disabled={uploading}
            activeOpacity={0.7}
          >
            <Ionicons name="images-outline" size={18} color="#2563EB" />
            <Text style={styles.libraryButtonText}>เลือกรูปจากอัลบั้ม</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cameraButton]}
            onPress={onTakePhoto}
            disabled={uploading}
            activeOpacity={0.7}
          >
            <Ionicons name="camera-outline" size={18} color="#ffffff" />
            <Text style={styles.cameraButtonText}>ถ่ายรูปด้วยกล้อง</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  previewContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingText: {
    color: "#ffffff",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  clearButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ffffff",
    borderRadius: 13,
  },
  placeholderContainer: {
    width: "100%",
    height: 140,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  libraryButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  libraryButtonText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "600",
  },
  cameraButton: {
    backgroundColor: "#2563EB",
  },
  cameraButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default ImagePickerField;
