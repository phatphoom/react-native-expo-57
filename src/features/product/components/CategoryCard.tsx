import type { Category } from "@/types/product";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CategoryCardProps {
  item: Category;
  onPress?: (category: Category) => void;
}

const CategoryCard = ({ item, onPress }: CategoryCardProps) => {
  const imageUri =
    item.image ||
    item.image_url ||
    `https://picsum.photos/seed/${item.cate_id}/300/300`;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress && onPress(item)}
    >
      {/* ตัวรูปภาพ */}
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
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
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#e2e8f0",
  },
  textContainer: {
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
});
