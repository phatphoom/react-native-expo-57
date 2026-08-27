import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  resetEmail: string;
  resetNewPass: string;
  resetConfirmPass: string;
  loading: boolean;
  showNewPass: boolean;
  showConfirmPass: boolean;
  onClose: () => void;
  setResetEmail: (v: string) => void;
  setResetNewPass: (v: string) => void;
  setResetConfirmPass: (v: string) => void;
  toggleShowNewPass: () => void;
  toggleShowConfirmPass: () => void;
  onSubmit: () => void;
};

export function ResetPasswordModal({
  visible,
  resetEmail,
  resetNewPass,
  resetConfirmPass,
  loading,
  showNewPass,
  showConfirmPass,
  onClose,
  setResetEmail,
  setResetNewPass,
  setResetConfirmPass,
  toggleShowNewPass,
  toggleShowConfirmPass,
  onSubmit,
}: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={styles.modalIconBox}>
                <Ionicons name="lock-open" size={20} color="#2563EB" />
              </View>
              <Text style={styles.modalTitle}>รีเซ็ตรหัสผ่าน</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubText}>
            กรุณากรอกอีเมลของบัญชีที่ต้องการตั้งรหัสผ่านใหม่
          </Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>อีเมล (Email)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="example@email.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={resetEmail}
              onChangeText={setResetEmail}
            />
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>รหัสผ่านใหม่ (New Password)</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordTextInput}
                placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showNewPass}
                value={resetNewPass}
                onChangeText={setResetNewPass}
              />
              <TouchableOpacity onPress={toggleShowNewPass} style={styles.eyeIconBtn}>
                <Ionicons
                  name={showNewPass ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ยืนยันรหัสผ่านใหม่ (Confirm Password)</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.passwordTextInput}
                placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showConfirmPass}
                value={resetConfirmPass}
                onChangeText={setResetConfirmPass}
              />
              <TouchableOpacity onPress={toggleShowConfirmPass} style={styles.eyeIconBtn}>
                <Ionicons
                  name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.modalSaveBtnText}>รีเซ็ตรหัสผ่าน</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  modalCard: {
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
    marginBottom: 12,
  },
  modalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A" },
  modalSubText: { fontSize: 13, color: "#64748B", marginBottom: 16, lineHeight: 18 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 },
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
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
  },
  passwordTextInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: "#0F172A",
  },
  eyeIconBtn: { paddingHorizontal: 12, paddingVertical: 10 },
  modalActions: { flexDirection: "row", width: "100%", gap: 12, marginTop: 10 },
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
