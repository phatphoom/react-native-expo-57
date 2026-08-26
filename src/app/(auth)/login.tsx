import { AuthApi } from "@/features/auth/api/authApi";
import { useLoginForm } from "@/features/auth/hooks";
import { FormField } from "@/shared/components/FormField";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLoginForm();

  // Reset Password State
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPass, setResetNewPass] = useState("");
  const [resetConfirmPass, setResetConfirmPass] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetNewPass, setShowResetNewPass] = useState(false);
  const [showResetConfirmPass, setShowResetConfirmPass] = useState(false);

  const handleResetPassword = async () => {
    if (!resetEmail || !resetNewPass || !resetConfirmPass) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    if (resetNewPass.length < 6) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setResetLoading(true);
    try {
      const res = await AuthApi.resetPassword({
        email: resetEmail.trim(),
        new_password: resetNewPass,
        confirm_password: resetConfirmPass,
      });
      setShowResetModal(false);
      setResetEmail("");
      setResetNewPass("");
      setResetConfirmPass("");
      Alert.alert("สำเร็จ", res?.message || "รีเซ็ตรหัสผ่านเรียบร้อยแล้ว คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email ||
        err?.message ||
        "ไม่สามารถรีเซ็ตรหัสผ่านได้";
      Alert.alert("ข้อผิดพลาด", msg);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="basket" size={48} color="#FFFFFF" />
            </View>
            <Text style={styles.welcomeText}>ยินดีต้อนรับกลับมา 👋</Text>
            <Text style={styles.subtitle}>เข้าสู่ระบบเพื่อจัดการร้านค้าของคุณ</Text>
          </View>

          <View style={styles.cardContainer}>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text style={styles.errorBoxText}>{error}</Text>
              </View>
            ) : null}

            <FormField
              label="อีเมล"
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormField
              label="รหัสผ่าน"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                setResetEmail(email);
                setShowResetModal(true);
              }}
            >
              <Text style={styles.forgotPasswordText}>ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryBtnText}>เข้าสู่ระบบ</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>ยังไม่มีบัญชีใช่หรือไม่? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text style={styles.registerLink}>สมัครสมาชิก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Reset / Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResetModal}
        onRequestClose={() => setShowResetModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={styles.modalIconBox}>
                  <Ionicons name="lock-open" size={20} color="#2563EB" />
                </View>
                <Text style={styles.modalTitle}>รีเซ็ตรหัสผ่าน</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowResetModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubText}>
              กรุณากรอกอีเมลของบัญชีที่ต้องการตั้งรหัสผ่านใหม่
            </Text>

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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>รหัสผ่านใหม่ (New Password)</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showResetNewPass}
                  value={resetNewPass}
                  onChangeText={setResetNewPass}
                />
                <TouchableOpacity
                  onPress={() => setShowResetNewPass(!showResetNewPass)}
                  style={styles.eyeIconBtn}
                >
                  <Ionicons
                    name={showResetNewPass ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ยืนยันรหัสผ่านใหม่ (Confirm Password)</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showResetConfirmPass}
                  value={resetConfirmPass}
                  onChangeText={setResetConfirmPass}
                />
                <TouchableOpacity
                  onPress={() => setShowResetConfirmPass(!showResetConfirmPass)}
                  style={styles.eyeIconBtn}
                >
                  <Ionicons
                    name={showResetConfirmPass ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowResetModal(false)}
                disabled={resetLoading}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleResetPassword}
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalSaveBtnText}>รีเซ็ตรหัสผ่าน</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
  },
  heroSection: {
    backgroundColor: "#2563EB",
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#DBEAFE",
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
  },
  errorBox: {
    flexDirection: "row",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  errorBoxText: {
    color: "#EF4444",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  primaryBtnDisabled: {
    backgroundColor: "#93C5FD",
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    color: "#64748B",
    fontSize: 15,
  },
  registerLink: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "bold",
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  modalSubText: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 16,
    lineHeight: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
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
  eyeIconBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  modalCancelBtnText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalSaveBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
