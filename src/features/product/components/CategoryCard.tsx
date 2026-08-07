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
        <MaterialIcons name="category" size={22} color="#007AFF" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.categoryName}>{item.cate_name}</Text>
        {item.description ? (
          <Text style={styles.categoryDesc} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#C7C7CC" />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E5F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  categoryDesc: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
});
