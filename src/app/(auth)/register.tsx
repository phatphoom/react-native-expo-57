import { useRegisterForm } from "@/features/auth/hooks";
import { RegisterHeroSection } from "@/features/auth/components/RegisterHeroSection";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
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
          <RegisterHeroSection onBack={() => router.back()} />
          <RegisterForm
            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            loading={loading}
            error={error}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onRegister={handleRegister}
            onLogin={() => router.push("/(auth)/login")}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
