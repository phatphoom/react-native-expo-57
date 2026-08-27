import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useCreateProduct } from "./useCreateProduct";
import { useProductForm, type ProductFormValues } from "./useProductForm";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import UploadApi from "@/api/uploadApi";

export function useAddProductForm() {
  const router = useRouter();
  const { createProduct } = useCreateProduct();
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    image: pickedImage,
    loading: imageLoading,
    pickImageFromLibrary,
    takePhotoWithCamera,
    clearImage,
  } = useImagePicker();

  const handleCreate = async (values: ProductFormValues) => {
    if (!values.prod_name || !values.price) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกชื่อสินค้าและราคา");
      return { success: false, error: "Validation failed" };
    }

    let finalImageUrl = values.image_url;

    if (pickedImage?.base64) {
      setUploadingImage(true);
      try {
        const uploadRes = await UploadApi.uploadImageBase64(
          pickedImage.base64,
          pickedImage.fileName
        );
        finalImageUrl = uploadRes.image_url;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "ไม่สามารถอัปโหลดรูปภาพได้";
        Alert.alert("ข้อผิดพลาดในการอัปโหลดรูป", msg);
        setUploadingImage(false);
        return { success: false, error: msg };
      } finally {
        setUploadingImage(false);
      }
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
      image_url: finalImageUrl,
      stock_count: Number(values.stock_count) || 0,
      in_stock: Number(values.stock_count) > 0,
      cate_id: cateIdToSend,
      rating_rate: 0,
      rating_count: 0,
    });

    if (result.success) {
      clearImage();
      if (Platform.OS === "web") {
        window.alert("เพิ่มสินค้าใหม่เรียบร้อยแล้ว!");
        router.replace("/(tabs)/product");
      } else {
        Alert.alert("สำเร็จ", "เพิ่มสินค้าใหม่เรียบร้อยแล้ว!", [
          {
            text: "ตกลง",
            onPress: () => {
              router.replace("/(tabs)/product");
            },
          },
        ]);
      }
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
        clearImage();
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

  const displayImageUri =
    pickedImage?.uri ||
    (form.image_url ? UploadApi.getFullImageUrl(form.image_url) : null);

  const handleClearImage = () => {
    clearImage();
    handleChange("image_url", "");
  };

  return {
    form,
    categories,
    selectedCategory,
    showCategoryModal,
    submitting,
    uploadingImage,
    displayImageUri,
    imageLoading,
    setShowCategoryModal,
    handleChange,
    handleSubmit,
    pickImageFromLibrary,
    takePhotoWithCamera,
    handleClearImage,
    fillDummyData,
  };
}
