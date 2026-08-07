import { useEffect, useState } from "react";
import { useCategories } from "./useCategory";
import type { Category, Product } from "@/types/product";

export interface ProductFormValues {
  prod_name: string;
  description: string;
  price: string;
  currency: string;
  discount_pct: string;
  image_url: string;
  stock_count: string;
  cate_id: string;
}

export interface UseProductFormOptions {
  initialProduct?: Product | Product[] | null;
  onSubmit?: (values: ProductFormValues) => Promise<{ success: boolean; error?: string }>;
}

export function useProductForm(options?: UseProductFormOptions) {
  const { initialProduct, onSubmit } = options || {};
  const { categories, loading: loadingCategories } = useCategories();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<ProductFormValues>({
    prod_name: "",
    description: "",
    price: "",
    currency: "THB",
    discount_pct: "0",
    image_url: "",
    stock_count: "0",
    cate_id: "",
  });

  // เติมข้อมูลเดิมเข้าฟอร์ม (Prefill Form) เมื่อมีข้อมูล initialProduct
  useEffect(() => {
    if (initialProduct) {
      const prod: Product = Array.isArray(initialProduct) ? initialProduct[0] : initialProduct;
      if (prod) {
        // ถ้า API ไม่ได้ส่ง cate_id มา (ส่งมาแค่ category_name) ให้ค้นหา cate_id จากชื่อหมวดหมู่ที่ตรงกัน
        let matchedCateId = prod.cate_id !== undefined && prod.cate_id !== null ? String(prod.cate_id) : "";

        if (!matchedCateId && prod.category_name && categories.length > 0) {
          const found = categories.find(
            (c) => c.cate_name.trim().toLowerCase() === prod.category_name?.trim().toLowerCase()
          );
          if (found) {
            matchedCateId = String(found.cate_id);
          }
        }

        // Fallback: ถ้ายังหาไม่เจอ และมีหมวดหมู่ ให้ใช้หมวดหมู่แรก
        if (!matchedCateId && categories.length > 0) {
          matchedCateId = String(categories[0].cate_id);
        }

        setForm({
          prod_name: prod.prod_name || "",
          description: prod.description || "",
          price: prod.price !== undefined ? String(prod.price) : "",
          currency: prod.currency || "THB",
          discount_pct: prod.discount_pct !== undefined ? String(prod.discount_pct) : "0",
          image_url: prod.image_url || "",
          stock_count: prod.stock_count !== undefined ? String(prod.stock_count) : "0",
          cate_id: matchedCateId,
        });
      }
    }
  }, [initialProduct, categories]);

  // ตั้งค่าหมวดหมู่แรกเป็น default หากยังไม่มีการเลือกหมวดหมู่ (สำหรับโหมดสร้างใหม่)
  useEffect(() => {
    if (categories.length > 0 && !form.cate_id && !initialProduct) {
      setForm((prev) => ({ ...prev, cate_id: String(categories[0].cate_id) }));
    }
  }, [categories, initialProduct]);

  const handleChange = (field: keyof ProductFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const selectedCategory: Category | undefined = categories.find(
    (c) => String(c.cate_id) === String(form.cate_id)
  );

  const handleSubmit = async () => {
    if (!onSubmit) return { success: false, error: "No submit handler provided" };
    setSubmitting(true);
    try {
      return await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  const setFormValues = (values: Partial<ProductFormValues>) => {
    setForm((prev) => ({ ...prev, ...values }));
  };

  const resetForm = () => {
    setForm({
      prod_name: "",
      description: "",
      price: "",
      currency: "THB",
      discount_pct: "0",
      image_url: "",
      stock_count: "0",
      cate_id: categories[0]?.cate_id ? String(categories[0].cate_id) : "",
    });
  };

  return {
    form,
    categories,
    selectedCategory,
    showCategoryModal,
    submitting,
    loadingCategories,
    setShowCategoryModal,
    handleChange,
    handleSubmit,
    setFormValues,
    resetForm,
  };
}
