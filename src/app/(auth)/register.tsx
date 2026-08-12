import { useRegisterForm } from "@/features/auth/hooks";
import { FormField } from "@/shared/components/FormField";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleRegister,
  } = useRegisterForm();

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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Ionicons name="person-add" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.welcomeText}>สร้างบัญชีใหม่</Text>
            <Text style={styles.subtitle}>เข้าร่วมกับเราเพื่อเปิดร้านค้าของคุณเอง</Text>
          </View>

          <View style={styles.cardContainer}>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <Text style={styles.errorBoxText}>{error}</Text>
              </View>
            ) : null}

            <FormField
              label="ชื่อผู้ใช้งาน"
              placeholder="ตั้งชื่อผู้ใช้งานของคุณ"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

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
              placeholder="ต้องมีความยาวอย่างน้อย 6 ตัวอักษร"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <FormField
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
            />

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled, { marginTop: 12 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryBtnText}>ลงทะเบียน</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>มีบัญชีอยู่แล้วใช่หรือไม่? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.loginLink}>เข้าสู่ระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
    backgroundColor: "#10B981",
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 72,
    height: 72,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 12,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#D1FAE5",
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
  primaryBtn: {
    backgroundColor: "#10B981",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  primaryBtnDisabled: {
    backgroundColor: "#6EE7B7",
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#64748B",
    fontSize: 15,
  },
  loginLink: {
    color: "#10B981",
    fontSize: 15,
    fontWeight: "bold",
  },
});
