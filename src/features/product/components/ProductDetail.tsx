import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import type { Product } from '@/types/product';
import UploadApi from '@/api/uploadApi';
import { FONTS } from '@/shared/theme/typography';

interface DetailProdctProps {
  id: string | string[];
  data: Product[] | Product | null;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const DetailProdct = ({ id, data, onEdit, onDelete, isDeleting }: DetailProdctProps) => {
  const [imageError, setImageError] = useState(false);
  // ข้อมูลจาก API อาจจะเป็น Array (กรณี mock) หรือเป็น Object ตัวเดียว
  const product: Product | null = Array.isArray(data) ? data[0] : (data as Product);

  // ถ้ากำลังโหลดข้อมูล (ยังไม่มี product) ให้โชว์ Loading
  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูลสินค้า...</Text>
      </View>
    );
  }

  // คำนวณราคาจริงหลังหักส่วนลด (finalPrice) และราคาเต็มก่อนลด (originalPrice)
  const priceNum = Number(product.price) || 0;
  const discountPctNum = Number(product.discount_pct) || 0;
  const imageUrl = UploadApi.getFullImageUrl(product.image_url);

  const finalPrice = discountPctNum > 0 
    ? (priceNum * (1 - discountPctNum / 100)).toFixed(2) 
    : priceNum.toFixed(2);

  const originalPrice = discountPctNum > 0 
    ? priceNum.toFixed(2)
    : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. รูปภาพสินค้า */}
      <View style={styles.imageContainer}>
        {imageUrl && !imageError ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            contentFit="cover"
            transition={300}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.image, styles.fallbackContainer]}>
            <Ionicons name="cube-outline" size={72} color="#3B82F6" />
          </View>
        )}
        {/* ป้าย % ส่วนลด */}
        {discountPctNum > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPctNum}%</Text>
          </View>
        )}
      </View>

      {/* 2. รายละเอียดต่างๆ (ครอบด้วย View เพื่อทำมุมโค้งซ้อนรูปภาพ) */}
      <View style={styles.detailsContainer}>
        
        {/* หมวดหมู่ */}
        <View style={styles.row}>
          <Text style={styles.categoryText}>{product.category_name || 'ทั่วไป'}</Text>
        </View>

        {/* ชื่อสินค้า */}
        <Text style={styles.title}>{product.prod_name}</Text>

        {/* ราคา */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {finalPrice} {product.currency}
          </Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>
              {originalPrice} {product.currency}
            </Text>
          )}
        </View>

        {/* สถานะสินค้าคงคลัง */}
        <View style={styles.stockContainer}>
          <MaterialIcons 
            name={product.in_stock ? "check-circle" : "cancel"} 
            size={20} 
            color={product.in_stock ? "#4CAF50" : "#F44336"} 
          />
          <Text style={[styles.stockText, { color: product.in_stock ? "#4CAF50" : "#F44336" }]}>
            {product.in_stock ? `มีสินค้า (${product.stock_count} ชิ้น)` : 'สินค้าหมด'}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* คำอธิบายสินค้า */}
        <Text style={styles.sectionTitle}>รายละเอียดสินค้า</Text>
        <Text style={styles.description}>
          {product.description || 'ไม่มีรายละเอียดสินค้า'}
        </Text>

        {/* ปุ่มจัดการ (แก้ไข & ลบ) */}
        {(onEdit || onDelete) && (
          <View style={styles.actionContainer}>
            {onEdit && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={onEdit}
                activeOpacity={0.8}
              >
                <FontAwesome name="pencil" size={18} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>แก้ไขสินค้า</Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
                disabled={isDeleting}
                activeOpacity={0.8}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <FontAwesome name="trash" size={18} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>ลบสินค้า</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}

      </View>
      
      {/* เพิ่มพื้นที่ว่างด้านล่างเผื่อไว้ให้ Scroll ถึง */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default DetailProdct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: '#64748B',
  },
  imageContainer: {
    width: '100%',
    height: 380,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontFamily: FONTS.brandBold,
    fontSize: 13,
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 13,
    color: '#2563EB',
    fontFamily: FONTS.medium,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  ratingText: {
    fontSize: 13,
    color: '#92400E',
    fontFamily: FONTS.brandBold,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: '#0F172A',
    marginBottom: 12,
    lineHeight: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontFamily: FONTS.brandBold,
    color: '#EF4444',
  },
  originalPrice: {
    fontSize: 15,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    fontFamily: FONTS.brandMedium,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  stockText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: '#475569',
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: FONTS.semiBold,
  },
});
