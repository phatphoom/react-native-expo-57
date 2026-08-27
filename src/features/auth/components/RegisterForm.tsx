import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormField } from "@/shared/components/FormField";

type Props = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string;
  setUsername: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  onRegister: () => void;
  onLogin: () => void;
};

export function RegisterForm({
  username,
  email,
  password,
  confirmPassword,
  loading,
  error,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  onRegister,
  onLogin,
}: Props) {
  return (
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
        style={[
          styles.primaryBtn,
          loading && styles.primaryBtnDisabled,
          { marginTop: 12 },
        ]}
        onPress={onRegister}
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
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.loginLink}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  errorBoxText: { color: "#EF4444", marginLeft: 8, fontSize: 14, fontWeight: "500" },
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
  primaryBtnDisabled: { backgroundColor: "#6EE7B7", shadowOpacity: 0, elevation: 0 },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  loginContainer: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  loginText: { color: "#64748B", fontSize: 15 },
  loginLink: { color: "#10B981", fontSize: 15, fontWeight: "bold" },
});
