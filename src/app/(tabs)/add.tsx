import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBar } from "@/shared/components";
import { ProductForm } from "@/features/product/components";
import { useAddProductForm } from "@/features/product/hooks";

export default function AddScreen() {
  const {
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
  } = useAddProductForm();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Add Product" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
          submitButtonText="บันทึกข้อมูลสินค้า"
          onChange={handleChange}
          onPickLibrary={pickImageFromLibrary}
          onTakePhoto={takePhotoWithCamera}
          onClearImage={handleClearImage}
          onToggleCategoryModal={setShowCategoryModal}
          onSubmit={handleSubmit}
          onFillDummyData={fillDummyData}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
