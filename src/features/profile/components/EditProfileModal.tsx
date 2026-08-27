import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  // Avatar
  fullAvatarUrl?: string | null;
  uploadingAvatar: boolean;
  onChangeAvatar: () => void;
  // Form fields
  firstNameInput: string;
  lastNameInput: string;
  phoneNumberInput: string;
  addressInput: string;
  setFirstNameInput: (v: string) => void;
  setLastNameInput: (v: string) => void;
  setPhoneNumberInput: (v: string) => void;
  setAddressInput: (v: string) => void;
  // Save
  updating: boolean;
  onSave: () => void;
};

export function EditProfileModal({
  visible,
  onClose,
  fullAvatarUrl,
  uploadingAvatar,
  onChangeAvatar,
  firstNameInput,
  lastNameInput,
  phoneNumberInput,
  addressInput,
  setFirstNameInput,
  setLastNameInput,
  setPhoneNumberInput,
  setAddressInput,
  updating,
  onSave,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.editModalScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.editModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>แก้ไขข้อมูลส่วนตัว</Text>
              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Avatar Preview */}
            <View style={styles.modalAvatarSection}>
              <View style={styles.modalAvatarContainer}>
                {fullAvatarUrl ? (
                  <Image
                    source={{ uri: fullAvatarUrl }}
                    style={styles.modalAvatarImage}
                    contentFit="cover"
                    transition={200}
                  />
                ) : (
                  <Ionicons name="person" size={40} color="#94A3B8" />
                )}
                {uploadingAvatar && (
                  <View style={styles.avatarLoadingOverlay}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.changeAvatarModalBtn}
                onPress={onChangeAvatar}
                disabled={uploadingAvatar}
                activeOpacity={0.7}
              >
                <Ionicons name="camera-outline" size={16} color="#3B82F6" />
                <Text style={styles.changeAvatarModalBtnText}>
                  เปลี่ยนรูปโปรไฟล์
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ชื่อ (First Name)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="กรอกชื่อจริง"
                placeholderTextColor="#94A3B8"
                value={firstNameInput}
                onChangeText={setFirstNameInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>นามสกุล (Last Name)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="กรอกนามสกุล"
                placeholderTextColor="#94A3B8"
                value={lastNameInput}
                onChangeText={setLastNameInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>เบอร์โทรศัพท์ (Phone Number)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="เช่น 0812345678"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phoneNumberInput}
                onChangeText={setPhoneNumberInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ที่อยู่ (Address)</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput]}
                placeholder="กรอกที่อยู่ของคุณ"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={addressInput}
                onChangeText={setAddressInput}
              />
            </View>

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={onClose}
                disabled={updating}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={onSave}
                disabled={updating}
                activeOpacity={0.7}
              >
                {updating ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalSaveBtnText}>บันทึกข้อมูล</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollView: {
    width: "100%",
    maxHeight: "90%",
  },
  editModalScrollContent: {
    paddingVertical: 20,
    justifyContent: "center",
  },
  editModalContent: {
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
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A" },
  modalAvatarSection: { alignItems: "center", marginBottom: 18 },
  modalAvatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  modalAvatarImage: { width: "100%", height: "100%" },
  avatarLoadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  changeAvatarModalBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  changeAvatarModalBtnText: { color: "#3B82F6", fontSize: 13, fontWeight: "600" },
  inputGroup: { marginBottom: 14 },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: "#0F172A",
  },
  textAreaInput: {
    minHeight: 72,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 10,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancelBtnText: { color: "#475569", fontSize: 15, fontWeight: "600" },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalSaveBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
