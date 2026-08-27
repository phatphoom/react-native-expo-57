import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function LoginHeroSection() {
  return (
    <View style={styles.heroSection}>
      <View style={styles.logoContainer}>
        <Ionicons name="basket" size={48} color="#FFFFFF" />
      </View>
      <Text style={styles.welcomeText}>ยินดีต้อนรับกลับมา 👋</Text>
      <Text style={styles.subtitle}>เข้าสู่ระบบเพื่อจัดการร้านค้าของคุณ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  subtitle: { fontSize: 15, color: "#DBEAFE" },
});
