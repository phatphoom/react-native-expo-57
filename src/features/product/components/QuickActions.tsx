import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  isAdmin: boolean;
  router: ReturnType<typeof useRouter>;
};

export function QuickActions({ isAdmin, router }: Props) {
  return (
    <View style={styles.container}>
      {isAdmin && (
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/add")}
        >
          <View style={[styles.actionIcon, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
            <Ionicons name="add-circle" size={28} color="#3B82F6" />
          </View>
          <Text style={styles.actionText}>Add Product</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/product")}
      >
        <View style={[styles.actionIcon, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
          <Ionicons name="list" size={28} color="#8B5CF6" />
        </View>
        <Text style={styles.actionText}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/category")}
      >
        <View style={[styles.actionIcon, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
          <MaterialIcons name="category" size={28} color="#10B981" />
        </View>
        <Text style={styles.actionText}>Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  actionBtn: { alignItems: "center", flex: 1 },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: { fontSize: 12, color: "#475569", fontWeight: "600" },
});
