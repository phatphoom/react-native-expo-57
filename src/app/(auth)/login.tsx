import { useLoginForm } from "@/features/auth/hooks";
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

            <TouchableOpacity style={styles.forgotPassword}>
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
});
