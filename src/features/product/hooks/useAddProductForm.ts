import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useCategories } from "./useCategory";
import { useCreateProduct } from "./useProduct";

export function useAddProductForm() {
  const { categories } = useCategories();
  const { createProduct, loading: submitting } = useCreateProduct();
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

  // ตั้งค่าหมวดหมู่แรกเป็น default เมื่อดึงหมวดหมู่เสร็จ
  useEffect(() => {
    if (categories.length > 0 && !form.cate_id) {
      setForm(prev => ({ ...prev, cate_id: String(categories[0].cate_id) }));
    }
  }, [categories]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const selectedCategory = categories.find(
    c => String(c.cate_id) === String(form.cate_id)
  );

  const handleSubmit = async () => {
    if (!form.prod_name || !form.price) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อสินค้าและราคา');
      return;
    }
    if (!form.cate_id) {
      Alert.alert('ข้อผิดพลาด', 'กรุณาเลือกหมวดหมู่สินค้า');
      return;
    }

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
              discount_pct: '', image_url: '', stock_count: '', cate_id: String(categories[0]?.cate_id || '')
            });
            router.push('/product');
          }
        }
      ]);
    } else {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเพิ่มสินค้าได้: ' + result.error);
    }
  };

  // --- TEST HELPER ---
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

  return {
    form,
    categories,
    selectedCategory,
    showCategoryModal,
    submitting,
    setShowCategoryModal,
    handleChange,
    handleSubmit,
    fillDummyData,
  };
}
