import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  displayName: string;
  username?: string;
  email?: string;
  role?: string;
  fullAvatarUrl?: string | null;
  uploadingAvatar: boolean;
  onAvatarPress: () => void;
};

export function ProfileHeroCard({
  displayName,
  username,
  email,
  role,
  fullAvatarUrl,
  uploadingAvatar,
  onAvatarPress,
}: Props) {
  const hasName = displayName !== username && displayName !== "User";

  return (
    <View style={styles.heroCard}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {fullAvatarUrl ? (
            <Image
              source={{ uri: fullAvatarUrl }}
              style={styles.avatarImage}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <Ionicons name="person" size={48} color="#94A3B8" />
          )}
          {uploadingAvatar && (
            <View style={styles.avatarLoadingOverlay}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.editAvatarBtn}
          onPress={onAvatarPress}
          activeOpacity={0.8}
          disabled={uploadingAvatar}
        >
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.userName}>{displayName}</Text>
      {hasName && username ? (
        <Text style={styles.userSubName}>@{username}</Text>
      ) : null}
      <Text style={styles.userEmail}>{email || "No email"}</Text>

      <View style={styles.roleBadge}>
        <Text style={styles.roleText}>
          {(role || "MEMBER").toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLoadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563EB",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 2,
  },
  userSubName: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "bold",
  },
});
