import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
};

export function StatCard({ title, value, icon, color, loading }: Props) {
  return (
    <View style={[styles.statCard, { borderTopColor: color }]}>
      <View style={styles.statIconContainer}>{icon}</View>
      <View style={styles.statTextContainer}>
        <Text style={styles.statTitle}>{title}</Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={color}
            style={{ alignSelf: "flex-start", marginTop: 4 }}
          />
        ) : (
          <Text style={[styles.statValue, { color }]}>{value}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderTopWidth: 4,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statTextContainer: { flex: 1 },
  statTitle: { fontSize: 13, color: "#64748B", marginBottom: 4, fontWeight: "500" },
  statValue: { fontSize: 22, fontWeight: "bold" },
});
