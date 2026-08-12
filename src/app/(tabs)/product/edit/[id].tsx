import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProductForm } from "@/features/product/components";
import { useEditProductForm } from "@/features/product/hooks";

export default function EditProductScreen() {
  const {
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
  } = useEditProductForm();

  if (loadingProduct && !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>กำลังดึงข้อมูลสินค้า...</Text>
      </View>
    );
  }

  if (productError || (!loadingProduct && !product)) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorTitle}>⚠️ ไม่พบข้อมูลสินค้า</Text>
        <Text style={styles.errorSubText}>
          {productError || "ไม่พบสินค้ารหัสนี้บน Server (404)"}
        </Text>
        <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
          <Text style={styles.btnBackText}>ย้อนกลับ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ProductForm
        form={form}
        categories={categories}
        selectedCategory={selectedCategory}
        showCategoryModal={showCategoryModal}
        submitting={submitting}
        uploadingImage={uploadingImage}
        imageUri={displayImageUri}
        imageLoading={imageLoading}
        submitButtonText="บันทึกการแก้ไข"
        onChange={handleChange}
        onPickLibrary={pickImageFromLibrary}
        onTakePhoto={takePhotoWithCamera}
        onClearImage={handleClearImage}
        onToggleCategoryModal={setShowCategoryModal}
        onSubmit={handleSubmit}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 20,
  },
  btnBack: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnBackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
