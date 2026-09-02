import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PersonalDetailsCardProps {
  phoneNumber?: string | null;
  address?: string | null;
}

export function PersonalDetailsCard({
  phoneNumber,
  address,
}: PersonalDetailsCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIconBox,
              { backgroundColor: "rgba(59, 130, 246, 0.1)" },
            ]}
          >
            <Ionicons name="call-outline" size={18} color="#3B82F6" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>
              {phoneNumber || "Not specified"}
            </Text>
          </View>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoIconBox,
              { backgroundColor: "rgba(245, 158, 11, 0.1)" },
            ]}
          >
            <Ionicons name="location-outline" size={18} color="#F59E0B" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{address || "Not specified"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "600",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 6,
  },
});
