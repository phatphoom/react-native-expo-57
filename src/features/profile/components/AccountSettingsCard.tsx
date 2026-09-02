import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface AccountSettingsCardProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
}

export function AccountSettingsCard({
  onEditProfile,
  onChangePassword,
  onDeleteAccount,
}: AccountSettingsCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <View style={styles.menuCard}>
        <ProfileMenuItem
          icon={<Ionicons name="person-outline" size={20} color="#3B82F6" />}
          title="Edit Profile"
          onPress={onEditProfile}
        />
        <ProfileMenuItem
          icon={<Ionicons name="key-outline" size={20} color="#8B5CF6" />}
          title="Change Password"
          onPress={onChangePassword}
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem
          icon={<Ionicons name="trash-outline" size={20} color="#DC2626" />}
          title="Delete Account (Danger Zone)"
          isDestructive
          onPress={onDeleteAccount}
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
  menuDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 4,
  },
});
