import UploadApi from "@/api/uploadApi";
import type { Product } from "@/types/product";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const priceNum = Number(product.price) || 0;
  const discountPctNum = Number(product.discount_pct) || 0;
  const imageUrl = UploadApi.getFullImageUrl(product.image_url) || "https://via.placeholder.com/150";

  // ราคาขายจริง (ถ้ามีส่วนลดจะคำนวณราคาที่หักส่วนลดแล้ว)
  const finalPrice = discountPctNum > 0
    ? (priceNum * (1 - discountPctNum / 100)).toFixed(2)
    : priceNum.toFixed(2);

  // ราคาเต็มเดิม (แสดงแบบขีดฆ่าเมื่อมีส่วนลด)
  const originalPrice = discountPctNum > 0
    ? priceNum.toFixed(2)
    : null;

  return (
    <Link href={`/product/${product.prod_id}`} asChild>
      {/* <Pressable style={({ pressed }) => [styles.cardWrapper, pressed && styles.cardPressed]}> */}
      <Pressable style={styles.cardWrapper}>

        {/* 1. รูปภาพสินค้า */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
          {discountPctNum > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPctNum}%</Text>
            </View>
          )}
        </View>

        {/* 2. ข้อมูลสินค้า */}
        <View style={styles.cardDetails}>
          <View>
            <View style={styles.headerRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText} numberOfLines={1}>
                  {product.category_name || "General"}
                </Text>
              </View>
              <View style={styles.ratingBadge}>
                <FontAwesome name="star" size={11} color="#F59E0B" />
                <Text style={styles.ratingText}>{product.rating_rate}</Text>
              </View>
            </View>

            <Text style={styles.productName} numberOfLines={2}>{product.prod_name}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{finalPrice}</Text>
                <Text style={styles.currency}> {product.currency}</Text>
              </View>
              {originalPrice && (
                <Text style={styles.originalPrice}>{originalPrice} {product.currency}</Text>
              )}
            </View>

            <View style={[styles.stockBadge, { backgroundColor: product.in_stock ? "#DCFCE7" : "#FEE2E2" }]}>
              <Text style={[styles.stockText, { color: product.in_stock ? "#166534" : "#991B1B" }]}>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>
        </View>

      </Pressable>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    // marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#EF4444",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 10,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    maxWidth: "70%",
  },
  categoryText: {
    fontSize: 11,
    color: "#2563EB",
    fontWeight: "700",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#92400E",
  },
  productName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 20,
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceContainer: {
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: "#EF4444",
  },
  currency: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EF4444",
  },
  originalPrice: {
    fontSize: 11,
    color: "#94A3B8",
    textDecorationLine: "line-through",
    marginTop: 1,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 6,
  },
  stockText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
