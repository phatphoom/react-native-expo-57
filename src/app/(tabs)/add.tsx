import React, { useState, useEffect } from 'react';
import HeaderBar from "@/shared/components/AppHeader";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryApi from "@/api/categoryApi";
import { router } from "expo-router";
import type { Category } from "@/types/product";
import { useCreateProduct } from "@/features/product/hooks/useProduct";

export default function Add() {
  const { createProduct, loading } = useCreateProduct();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [form, setForm] = useState({
    prod_name: '',
    description: '',
    price: '',
    currency: 'THB',
    discount_pct: '',
    image_url: '',
    stock_count: '',
    cate_id: '',
  });

  // โหลดรายชื่อหมวดหมู่เมื่อเข้าสู่หน้านี้
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await CategoryApi.getAllCategory();
      setCategories(data);
      // ตั้งค่าหมวดหมู่แรกเป็นค่าเริ่มต้นถ้ามีข้อมูล
      if (data && data.length > 0) {
        setForm(prev => ({ ...prev, cate_id: String(data[0].cate_id) }));
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.prod_name || !form.price) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อสินค้าและราคา');
      return;
    }

    if (!form.cate_id) {
      Alert.alert('ข้อผิดพลาด', 'กรุณาเลือกหมวดหมู่สินค้า');
      return;
    }

    // ส่ง cate_id ของหมวดหมู่ที่เลือก (หากมี selectedCategory ให้ใช้ cate_id ของมันโดยตรง)
    const cateIdToSend = selectedCategory ? selectedCategory.cate_id : form.cate_id;

    const result = await createProduct({
      prod_name: form.prod_name,
      description: form.description,
      price: Number(form.price),
      currency: form.currency || 'THB',
      discount_pct: Number(form.discount_pct) || 0,
      image_url: form.image_url,
      stock_count: Number(form.stock_count) || 0,
      in_stock: Number(form.stock_count) > 0,
      cate_id: cateIdToSend,
      // เพิ่ม rating ตามที่ Backend คาดหวัง
      rating_rate: 0,
      rating_count: 0,
    });

    if (result.success) {
      Alert.alert('สำเร็จ', 'เพิ่มสินค้าใหม่เรียบร้อยแล้ว!', [
        { 
          text: 'ตกลง', 
          onPress: () => {
            setForm({
              prod_name: '', description: '', price: '', currency: 'THB', 
              discount_pct: '', image_url: '', stock_count: '', cate_id: String(categories[0]?.cate_id || '1')
            });
            router.push('/product');
          }
        }
      ]);
    } else {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเพิ่มสินค้าได้: ' + result.error);
    }
  };

  // หาชื่อหมวดหมู่ที่เลือกเพื่อแสดงบนปุ่ม
  const selectedCategory = categories.find(c => String(c.cate_id) === String(form.cate_id));

  // --- TEST HELPER (ปลด/ใส่ Comment ทั้งบล็อกนี้ได้เลยเวลาใช้งานจริง) ---
  const fillDummyData = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setForm({
      prod_name: `สินค้าทดสอบ #${randomId}`,
      description: 'นี่คือรายละเอียดสินค้าทดสอบ สำหรับทดสอบระบบการเพิ่มสินค้าและรีโหลดข้อมูล',
      price: (Math.floor(Math.random() * 500) + 99).toString(),
      currency: 'THB',
      discount_pct: '10',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      stock_count: '20',
      cate_id: String(categories[0]?.cate_id || '1'),
    });
  };
  // -------------------------------------------------------------

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Add Product" />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* ปุ่มสำหรับสุ่มข้อมูลทดสอบ (Comment ปิดได้) */}
          <TouchableOpacity style={styles.btnTest} onPress={fillDummyData}>
            <Text style={styles.btnTestTxt}>🧪 สุ่มใส่ข้อมูลทดสอบ (Auto-fill Test Data)</Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <View style={styles.formControl}>
              <Text style={styles.label}>ชื่อสินค้า *</Text>
              <TextInput 
                style={styles.formInput} 
                value={form.prod_name}
                onChangeText={(val) => handleChange('prod_name', val)}
                placeholder="Product Name"
              />
            </View>
            
            <View style={styles.formControl}>
              <Text style={styles.label}>รายละเอียด</Text>
              <TextInput 
                style={[styles.formInput, { height: 80, textAlignVertical: 'top' }]} 
                multiline
                value={form.description}
                onChangeText={(val) => handleChange('description', val)}
                placeholder="Product Description"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label} numberOfLines={1}>ราคา *</Text>
                <TextInput 
                  style={styles.formInput} 
                  keyboardType="decimal-pad" 
                  value={form.price}
                  onChangeText={(val) => handleChange('price', val)}
                  placeholder="0.00"
                />
              </View>
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label} numberOfLines={1}>สกุลเงิน</Text>
                <TextInput 
                  style={styles.formInput} 
                  value={form.currency}
                  onChangeText={(val) => handleChange('currency', val)}
                  placeholder="THB"
                />
              </View>
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label} numberOfLines={1}>ลด (%)</Text>
                <TextInput 
                  style={styles.formInput} 
                  keyboardType="number-pad"
                  value={form.discount_pct}
                  onChangeText={(val) => handleChange('discount_pct', val)}
                  placeholder="0"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label}>จำนวนในสต็อก</Text>
                <TextInput 
                  style={styles.formInput} 
                  keyboardType="number-pad"
                  value={form.stock_count}
                  onChangeText={(val) => handleChange('stock_count', val)}
                  placeholder="0"
                />
              </View>
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label}>หมวดหมู่</Text>
                {/* เปลี่ยนจาก TextInput เป็นปุ่มกดเพื่อเลือก Category */}
                <TouchableOpacity 
                  style={[styles.formInput, styles.dropdownButton]} 
                  onPress={() => setShowCategoryModal(true)}
                >
                  <Text style={styles.dropdownButtonText} numberOfLines={1}>
                    {selectedCategory ? selectedCategory.cate_name : 'เลือกหมวดหมู่...'}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formControl}>
              <Text style={styles.label}>ลิงก์รูปภาพ (Image URL)</Text>
              <TextInput 
                style={styles.formInput} 
                value={form.image_url}
                onChangeText={(val) => handleChange('image_url', val)}
                placeholder="https://example.com/image.jpg"
              />
              <Text style={styles.hintText}>*ระบบอัปโหลดรูปภาพกำลังพัฒนา ตอนนี้สามารถใส่เป็น URL แทนได้</Text>
            </View>

          </View>
          
          <View style={styles.btnContainer}>
            <TouchableOpacity 
              style={[styles.btnSubmit, loading && styles.btnDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnTxt}>บันทึกข้อมูลสินค้า</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal สำหรับเลือก Category */}
      <Modal visible={showCategoryModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>เลือกหมวดหมู่</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.cate_id)}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => {
                    handleChange('cate_id', String(item.cate_id));
                    setShowCategoryModal(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText, 
                    String(item.cate_id) === String(form.cate_id) && styles.modalItemTextSelected
                  ]}>
                    {item.cate_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setShowCategoryModal(false)}
            >
              <Text style={styles.modalCloseText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollContent: {
    // padding ถูกย้ายไปที่ container แล้วเพื่อให้ขอบของ HeaderBar ไม่ชิดจอ
    paddingBottom: 24,
  },
  formContainer: {
    marginTop: 10,
  },
  formControl: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12, // ปรับให้เท่ากับ input ตัวอื่น
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    fontStyle: 'italic',
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnSubmit: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    backgroundColor: '#A0CFFF',
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalItemTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 14,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },

  /* Test Button Styles (Comment Out easily) */
  btnTest: {
    backgroundColor: '#E8F2FF',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  btnTestTxt: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
