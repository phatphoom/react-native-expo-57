import { useLoginForm } from "@/features/auth/hooks";
import { useResetPasswordForm } from "@/features/auth/hooks/useResetPasswordForm";
import { LoginHeroSection } from "@/features/auth/components/LoginHeroSection";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ResetPasswordModal } from "@/features/auth/components/ResetPasswordModal";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, loading, error, handleLogin } =
    useLoginForm();
  const resetForm = useResetPasswordForm();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: "#F8FAFC" }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoginHeroSection />
          <LoginForm
            email={email}
            password={password}
            loading={loading}
            error={error}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
            onLogin={handleLogin}
            onForgotPassword={() => resetForm.open(email)}
            onRegister={() => router.push("/(auth)/register")}
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      <ResetPasswordModal
        visible={resetForm.visible}
        resetEmail={resetForm.resetEmail}
        resetNewPass={resetForm.resetNewPass}
        resetConfirmPass={resetForm.resetConfirmPass}
        loading={resetForm.loading}
        showNewPass={resetForm.showNewPass}
        showConfirmPass={resetForm.showConfirmPass}
        onClose={resetForm.close}
        setResetEmail={resetForm.setResetEmail}
        setResetNewPass={resetForm.setResetNewPass}
        setResetConfirmPass={resetForm.setResetConfirmPass}
        toggleShowNewPass={resetForm.toggleShowNewPass}
        toggleShowConfirmPass={resetForm.toggleShowConfirmPass}
        onSubmit={resetForm.handleSubmit}
      />
    </KeyboardAvoidingView>
  );
}
