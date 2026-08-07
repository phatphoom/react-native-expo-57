import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FormField, HeaderBar } from "@/shared/components";
import { useCreateProduct } from "@/features/product/hooks/useProduct";
import { useProductForm, type ProductFormValues } from "@/features/product/hooks/useProductForm";

export default function Add() {
  const router = useRouter();
  const { createProduct } = useCreateProduct();

  const handleCreate = async (values: ProductFormValues) => {
    if (!values.prod_name || !values.price) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกชื่อสินค้าและราคา");
      return { success: false, error: "Validation failed" };
    }

    const cateIdToSend = values.cate_id
      ? (isNaN(Number(values.cate_id)) ? values.cate_id : Number(values.cate_id))
      : 1;

    const result = await createProduct({
      prod_name: values.prod_name,
      description: values.description,
      price: Number(values.price),
      currency: values.currency || "THB",
      discount_pct: Number(values.discount_pct) || 0,
      image_url: values.image_url,
      stock_count: Number(values.stock_count) || 0,
      in_stock: Number(values.stock_count) > 0,
      cate_id: cateIdToSend,
      rating_rate: 0,
      rating_count: 0,
    });

    if (result.success) {
      Alert.alert("สำเร็จ", "เพิ่มสินค้าใหม่เรียบร้อยแล้ว!", [
        {
          text: "ตกลง",
          onPress: () => {
            router.push("/product");
          },
        },
      ]);
      return { success: true };
    } else {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถเพิ่มสินค้าได้: " + result.error);
      return { success: false, error: result.error };
    }
  };

  const {
    form,
    categories,
    selectedCategory,
    showCategoryModal,
    submitting,
    setShowCategoryModal,
    handleChange,
    handleSubmit,
    setFormValues,
    resetForm,
  } = useProductForm({
    onSubmit: async (values) => {
      const res = await handleCreate(values);
      if (res.success) {
        resetForm();
      }
      return res;
    },
  });

  const fillDummyData = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setFormValues({
      prod_name: `สินค้าทดสอบ #${randomId}`,
      description: "นี่คือรายละเอียดสินค้าทดสอบ สำหรับทดสอบระบบการเพิ่มสินค้าและรีโหลดข้อมูล",
      price: (Math.floor(Math.random() * 500) + 99).toString(),
      currency: "THB",
      discount_pct: "10",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      stock_count: "20",
      cate_id: String(categories[0]?.cate_id || "1"),
    });
  };

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
            <FormField
              label="ชื่อสินค้า *"
              value={form.prod_name}
              onChangeText={(val) => handleChange('prod_name', val)}
              placeholder="Product Name"
            />

            <FormField
              label="รายละเอียด"
              multiline
              value={form.description}
              onChangeText={(val) => handleChange('description', val)}
              placeholder="Product Description"
            />

            <View style={styles.row}>
              <FormField
                containerStyle={{ flex: 1 }}
                label="ราคา *"
                labelNumberOfLines={1}
                keyboardType="decimal-pad"
                value={form.price}
                onChangeText={(val) => handleChange('price', val)}
                placeholder="0.00"
              />
              <FormField
                containerStyle={{ flex: 1 }}
                label="สกุลเงิน"
                labelNumberOfLines={1}
                value={form.currency}
                onChangeText={(val) => handleChange('currency', val)}
                placeholder="THB"
              />
              <FormField
                containerStyle={{ flex: 1 }}
                label="ลด (%)"
                labelNumberOfLines={1}
                keyboardType="number-pad"
                value={form.discount_pct}
                onChangeText={(val) => handleChange('discount_pct', val)}
                placeholder="0"
              />
            </View>

            <View style={styles.row}>
              <FormField
                containerStyle={{ flex: 1 }}
                label="จำนวนในสต็อก"
                keyboardType="number-pad"
                value={form.stock_count}
                onChangeText={(val) => handleChange('stock_count', val)}
                placeholder="0"
              />
              <View style={[styles.formControl, { flex: 1 }]}>
                <Text style={styles.label}>หมวดหมู่</Text>
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

            <FormField
              label="ลิงก์รูปภาพ (Image URL)"
              value={form.image_url}
              onChangeText={(val) => handleChange('image_url', val)}
              placeholder="https://example.com/image.jpg"
              hintText="*ระบบอัปโหลดรูปภาพกำลังพัฒนา ตอนนี้สามารถใส่เป็น URL แทนได้"
            />

          </View>
          
          <View style={styles.btnContainer}>
            <TouchableOpacity 
              style={[styles.btnSubmit, submitting && styles.btnDisabled]} 
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
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
    paddingVertical: 12,
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

  /* Test Button Styles */
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
