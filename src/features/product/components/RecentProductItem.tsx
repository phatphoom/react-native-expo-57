import UploadApi from "@/api/uploadApi";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

type Product = {
  prod_id?: string | number;
  prod_name?: string;
  price?: string | number;
  image_url?: string;
};

type Props = {
  item: Product;
  onPress: () => void;
};

export function RecentProductItem({ item, onPress }: Props) {
  const imageUrl = UploadApi.getFullImageUrl(item.image_url);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imagePlaceholder}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <Ionicons name="image-outline" size={24} color="#CBD5E1" />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.prod_name || "Unnamed Product"}
        </Text>
        <Text style={styles.price}>
          ฿{item.price ? Number(item.price).toLocaleString() : "0"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", color: "#0F172A", marginBottom: 4 },
  price: { fontSize: 14, fontWeight: "700", color: "#3B82F6" },
});
