import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: React.ReactNode;
  title: string;
  isDestructive?: boolean;
  badgeText?: string;
  onPress?: () => void;
};

export function ProfileMenuItem({
  icon,
  title,
  isDestructive = false,
  badgeText,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.menuIconContainer,
          isDestructive && styles.menuIconDestructive,
        ]}
      >
        {icon}
      </View>
      <Text
        style={[styles.menuItemText, isDestructive && styles.menuItemTextDestructive]}
      >
        {title}
      </Text>
      {badgeText ? (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{badgeText}</Text>
        </View>
      ) : null}
      <Ionicons
        name="chevron-forward"
        size={18}
        color={isDestructive ? "#FCA5A5" : "#CBD5E1"}
        style={styles.menuItemArrow}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuIconDestructive: {
    backgroundColor: "#FEE2E2",
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  menuItemTextDestructive: {
    color: "#DC2626",
  },
  menuBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: 8,
  },
  menuBadgeText: {
    fontSize: 11,
    color: "#1D4ED8",
    fontWeight: "700",
  },
  menuItemArrow: {
    marginLeft: 2,
  },
});
