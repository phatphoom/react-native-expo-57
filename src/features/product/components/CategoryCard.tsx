import React, { useState } from "react";
import type { Category } from "@/types/product";
import { FONTS } from "@/shared/theme/typography";
import { UploadApi } from "@/shared/api";
import { Image } from "expo-image";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  item: Category;
  onPress?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

const CategoryCard = ({ item, onPress, onEdit, onDelete }: CategoryCardProps) => {
  const [imageError, setImageError] = useState(false);
  const rawImage = item.image_url || item.image;
  const imageUri = UploadApi.getFullImageUrl(rawImage);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(item)}
    >
      {/* ตัวรูปภาพ / Icon Fallback */}
      <View style={styles.imageWrapper}>
        {imageUri && !imageError ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="cover"
            transition={200}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.image, styles.fallbackContainer]}>
            <Ionicons name="grid-outline" size={44} color="#3B82F6" />
          </View>
        )}

        {/* Admin Action Buttons Overlay */}
        {(onEdit || onDelete) && (
          <View style={styles.actionOverlay}>
            {onEdit && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.editBtn]}
                onPress={(e) => {
                  e?.stopPropagation?.();
                  onEdit(item);
                }}
                activeOpacity={0.8}
              >
                <FontAwesome name="pencil" size={13} color="#2563EB" />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={(e) => {
                  e?.stopPropagation?.();
                  onDelete(item);
                }}
                activeOpacity={0.8}
              >
                <FontAwesome name="trash" size={13} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* คำอธิบายใต้ภาพ */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.cate_name}
        </Text>
        {item.product_count !== undefined && item.product_count !== null ? (
          <Text style={styles.subtitle}>{item.product_count} items</Text>
        ) : null}
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: "47.5%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F5F9",
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
  },
  actionOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  textContainer: {
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FONTS.brandMedium,
    color: "#64748B",
    marginTop: 2,
  },
});
