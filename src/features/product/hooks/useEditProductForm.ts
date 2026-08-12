import { useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProduct, useUpdateProduct } from "./useProduct";
import { useProductForm, type ProductFormValues } from "./useProductForm";
import { useImagePicker } from "@/shared/hooks/useImagePicker";
import UploadApi from "@/api/uploadApi";

export function useEditProductForm() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const targetId = Array.isArray(id) ? id[0] : (id as string);

  const { product, loading: loadingProduct, error: productError } = useProduct({ id: targetId });
  const { updateProduct } = useUpdateProduct();
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    image: pickedImage,
    loading: imageLoading,
    pickImageFromLibrary,
    takePhotoWithCamera,
    clearImage,
  } = useImagePicker();

  const handleUpdate = async (values: ProductFormValues) => {
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
      : (categories[0]?.cate_id || 1);

    const result = await updateProduct(targetId, {
      prod_name: values.prod_name,
      description: values.description,
      price: Number(values.price),
      currency: values.currency || "THB",
      discount_pct: Number(values.discount_pct) || 0,
      image_url: finalImageUrl,
      stock_count: Number(values.stock_count) || 0,
      in_stock: Number(values.stock_count) > 0,
      cate_id: cateIdToSend,
    });

    if (result.success) {
      clearImage();
      Alert.alert("สำเร็จ", "แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว!", [
        { text: "ตกลง", onPress: () => router.back() },
      ]);
      return { success: true };
    } else {
      Alert.alert("ข้อผิดพลาด", "ไม่สามารถแก้ไขสินค้าได้: " + result.error);
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
  } = useProductForm({
    initialProduct: product,
    onSubmit: handleUpdate,
  });

  const displayImageUri =
    pickedImage?.uri ||
    (form.image_url ? UploadApi.getFullImageUrl(form.image_url) : null);

  const handleClearImage = () => {
    clearImage();
    handleChange("image_url", "");
  };

  return {
    targetId,
    product,
    loadingProduct,
    productError,
    form,
    categories,
    selectedCategory,
    showCategoryModal,
    submitting,
    uploadingImage,
    displayImageUri,
    imageLoading,
    router,
    setShowCategoryModal,
    handleChange,
    handleSubmit,
    pickImageFromLibrary,
    takePhotoWithCamera,
    handleClearImage,
  };
}
