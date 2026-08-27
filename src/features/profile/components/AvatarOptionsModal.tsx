import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
};

export function AvatarOptionsModal({
  visible,
  onClose,
  onPickFromGallery,
  onTakePhoto,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.actionSheetContent}>
          <Text style={styles.actionSheetTitle}>เลือกรูปโปรไฟล์</Text>

          <TouchableOpacity style={styles.option} onPress={onPickFromGallery}>
            <Ionicons name="images-outline" size={22} color="#3B82F6" />
            <Text style={styles.optionText}>เลือกจากคลังภาพ (Gallery)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
            <Ionicons name="camera-outline" size={22} color="#10B981" />
            <Text style={styles.optionText}>ถ่ายภาพด้วยกล้อง (Camera)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelBtnText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  actionSheetContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  optionText: { fontSize: 15, fontWeight: "600", color: "#1E293B" },
  cancelBtn: { paddingVertical: 14, alignItems: "center", marginTop: 4 },
  cancelBtnText: { fontSize: 15, fontWeight: "600", color: "#64748B" },
});
