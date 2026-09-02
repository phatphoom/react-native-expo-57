import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBar } from "@/shared/components";
import { ProductForm } from "@/features/product/components";
import { useAddProductForm } from "@/features/product/hooks";
import { useAuth } from "@/features/auth/hooks";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AddScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin";

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
  } = useAddProductForm();

  // Role Protection Guard
  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <HeaderBar title="Access Denied" />
        <View style={styles.deniedContainer}>
          <View style={styles.deniedIconContainer}>
            <Ionicons name="lock-closed" size={48} color="#DC2626" />
          </View>
          <Text style={styles.deniedTitle}>Access Restricted</Text>
          <Text style={styles.deniedMessage}>
            Only administrator accounts (Admin) can add new products to the system.
          </Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.replace("/(tabs)/home")}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={20} color="#FFFFFF" />
            <Text style={styles.backBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
          submitButtonText="Save Product"
          onChange={handleChange}
          onPickLibrary={pickImageFromLibrary}
          onTakePhoto={takePhotoWithCamera}
          onClearImage={handleClearImage}
          onToggleCategoryModal={setShowCategoryModal}
          onSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  deniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -40,
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
