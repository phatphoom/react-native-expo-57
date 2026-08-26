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
import { useAuth } from "@/features/auth/hooks";
import { Ionicons } from "@expo/vector-icons";

export default function EditProductScreen() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

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

  // Role Protection Guard
  if (!isAdmin) {
    return (
      <View style={styles.deniedContainer}>
        <View style={styles.deniedIconContainer}>
          <Ionicons name="lock-closed" size={48} color="#DC2626" />
        </View>
        <Text style={styles.deniedTitle}>สิทธิ์การใช้งานจำกัด</Text>
        <Text style={styles.deniedMessage}>
          เฉพาะบัญชีผู้ดูแลระบบ (Admin) เท่านั้นที่สามารถแก้ไขข้อมูลสินค้าได้
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          <Text style={styles.backBtnText}>ย้อนกลับ</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  deniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8FAFC",
  },
  deniedIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  deniedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  deniedMessage: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  backBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
