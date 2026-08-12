import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type { Product } from '@/types/product';
import UploadApi from '@/api/uploadApi';

interface DetailProdctProps {
  id: string | string[];
  data: Product[] | Product | null;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const DetailProdct = ({ id, data, onEdit, onDelete, isDeleting }: DetailProdctProps) => {
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
  const imageUrl = UploadApi.getFullImageUrl(product.image_url) || 'https://via.placeholder.com/400';

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
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        {/* ป้าย % ส่วนลด */}
        {discountPctNum > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPctNum}%</Text>
          </View>
        )}
      </View>

      {/* 2. รายละเอียดต่างๆ (ครอบด้วย View เพื่อทำมุมโค้งซ้อนรูปภาพ) */}
      <View style={styles.detailsContainer}>
        
        {/* หมวดหมู่ และ ดาวคะแนน */}
        <View style={styles.row}>
          <Text style={styles.categoryText}>{product.category_name || 'ทั่วไป'}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {product.rating_rate} ({product.rating_count})
            </Text>
          </View>
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
    backgroundColor: '#fff',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    width: '100%',
    height: 380,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsContainer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // ดึงให้ขอบโค้งขึ้นไปซ้อนบนรูปภาพนิดนึง
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    backgroundColor: '#E5F1FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    lineHeight: 34,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF3B30',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  stockText: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F3F5',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 26,
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
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
