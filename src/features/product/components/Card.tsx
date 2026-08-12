import type { Product } from "@/types/product";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import UploadApi from "@/api/uploadApi";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const priceNum = Number(product.price) || 0;
  const discountPctNum = Number(product.discount_pct) || 0;
  const imageUrl = UploadApi.getFullImageUrl(product.image_url) || 'https://via.placeholder.com/150';
  
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
      {/* ใช้ Pressed style เพื่อให้มีเอฟเฟกต์ตอนผู้ใช้กด */}
      <Pressable style={({ pressed }) => [styles.cardWrapper, pressed && styles.cardPressed]}>
        
        {/* 1. รูปภาพสินค้า */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
          {/* ป้าย % ส่วนลดแปะทับรูปภาพ */}
          {discountPctNum > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPctNum}%</Text>
            </View>
          )}
        </View>

        {/* 2. ข้อมูลสินค้า */}
        <View style={styles.cardDetails}>
          <View>
            {/* แถวบนสุด: หมวดหมู่ คู่กับ ดาวคะแนน */}
            <View style={styles.headerRow}>
              <Text style={styles.categoryText} numberOfLines={1}>
                {product.category_name || 'ทั่วไป'}
              </Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{product.rating_rate}</Text>
              </View>
            </View>

            {/* ชื่อสินค้า */}
            <Text style={styles.productName} numberOfLines={2}>{product.prod_name}</Text>
          </View>

          {/* ด้านล่างของการ์ด: ราคา และ สถานะสินค้า */}
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

            <View style={[styles.stockBadge, { backgroundColor: product.in_stock ? '#E8F5E9' : '#FFEBEE' }]}>
              <Text style={[styles.stockText, { color: product.in_stock ? '#4CAF50' : '#F44336' }]}>
                {product.in_stock ? 'มีสินค้า' : 'หมด'}
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16, // ขยับการ์ดให้ห่างจากขอบจอ
    marginBottom: 16,
    // เพิ่มเงาให้ดูมีมิติ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F4F5F7',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }], // เล็กลงนิดนึงตอนกด
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    flex: 1,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '700',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    lineHeight: 22,
    marginBottom: 6,
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
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF3B30',
  },
  currency: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF3B30',
  },
  originalPrice: {
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '800',
  },
});
