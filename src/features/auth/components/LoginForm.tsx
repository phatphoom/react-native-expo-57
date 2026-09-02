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
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onChangeEmail: (v: string) => void;
  onChangePassword: (v: string) => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
};

export function LoginForm({
  email,
  password,
  loading,
  error,
  onChangeEmail,
  onChangePassword,
  onLogin,
  onForgotPassword,
  onRegister,
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
        label="Email"
        placeholder="example@email.com"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormField
        label="Password"
        placeholder="••••••••"
        value={password}
        onChangeText={onChangePassword}
        isPassword
      />

      <TouchableOpacity style={styles.forgotPassword} onPress={onForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
        onPress={onLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryBtnText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.registerLink}>Sign Up</Text>
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
  forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPasswordText: { color: "#2563EB", fontSize: 14, fontWeight: "600" },
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
  primaryBtnDisabled: { backgroundColor: "#93C5FD", shadowOpacity: 0, elevation: 0 },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  registerContainer: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  registerText: { color: "#64748B", fontSize: 15 },
  registerLink: { color: "#2563EB", fontSize: 15, fontWeight: "bold" },
});
