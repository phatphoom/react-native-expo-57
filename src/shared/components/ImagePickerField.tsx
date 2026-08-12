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
            <Ionicons name="close-circle" size={26} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="image-outline" size={48} color="#A0AEC0" />
          <Text style={styles.placeholderText}>ยังไม่ได้เลือกรูปภาพ</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator style={{ marginVertical: 10 }} color="#007AFF" />
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.libraryButton]}
            onPress={onPickLibrary}
            disabled={uploading}
          >
            <Ionicons name="images-outline" size={18} color="#007AFF" />
            <Text style={styles.libraryButtonText}>เลือกรูปจากอัลบั้ม</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cameraButton]}
            onPress={onTakePhoto}
            disabled={uploading}
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
    color: "#333",
    marginBottom: 8,
  },
  previewContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F8F9FA",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 14,
    color: "#718096",
    marginTop: 6,
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  libraryButton: {
    backgroundColor: "#E8F2FF",
    borderWidth: 1,
    borderColor: "#B8D9FF",
  },
  libraryButtonText: {
    color: "#007AFF",
    fontSize: 13,
    fontWeight: "600",
  },
  cameraButton: {
    backgroundColor: "#007AFF",
  },
  cameraButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default ImagePickerField;
