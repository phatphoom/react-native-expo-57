import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface OtherSettingsCardProps {
  onPrivacyPolicy: () => void;
  onTermsOfService: () => void;
  onHelpSupport: () => void;
  onAboutApp: () => void;
  appVersion?: string;
}

export function OtherSettingsCard({
  onPrivacyPolicy,
  onTermsOfService,
  onHelpSupport,
  onAboutApp,
  appVersion = "v1.0.0",
}: OtherSettingsCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Others</Text>
      <View style={styles.menuCard}>
        <ProfileMenuItem
          icon={
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color="#3B82F6"
            />
          }
          title="Privacy Policy"
          onPress={onPrivacyPolicy}
        />
        <ProfileMenuItem
          icon={
            <Ionicons name="document-text-outline" size={20} color="#64748B" />
          }
          title="Terms of Service"
          onPress={onTermsOfService}
        />
        <ProfileMenuItem
          icon={
            <Ionicons name="help-circle-outline" size={20} color="#10B981" />
          }
          title="Help & Support"
          onPress={onHelpSupport}
        />
        <ProfileMenuItem
          icon={
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#6366F1"
            />
          }
          title="About App"
          badgeText={appVersion}
          onPress={onAboutApp}
        />
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
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
});
