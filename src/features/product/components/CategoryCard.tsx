import type { Category } from "@/types/product";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  item: Category;
  onPress?: (category: Category) => void;
}

const CategoryCard = ({ item, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name="category" size={22} color="#2563EB" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.categoryName}>{item.cate_name}</Text>
        {item.description ? (
          <Text style={styles.categoryDesc} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  categoryDesc: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
});
