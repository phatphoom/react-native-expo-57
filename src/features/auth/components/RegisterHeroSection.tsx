import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onBack: () => void;
};

export function RegisterHeroSection({ onBack }: Props) {
  return (
    <View style={styles.heroSection}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Ionicons name="person-add" size={40} color="#FFFFFF" />
      </View>
      <Text style={styles.welcomeText}>สร้างบัญชีใหม่</Text>
      <Text style={styles.subtitle}>เข้าร่วมกับเราเพื่อเปิดร้านค้าของคุณเอง</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  welcomeText: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#D1FAE5" },
});
