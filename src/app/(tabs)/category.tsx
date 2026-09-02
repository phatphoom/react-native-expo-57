import React, { useState } from "react";
import CategoryCard from "@/features/product/components/CategoryCard";
import CategoryModal from "@/features/product/components/CategoryModal";
import { useCategories } from "@/features/product/hooks/useCategory";
import CategoryApi from "@/api/categoryApi";
import { useAuth } from "@/features/auth/hooks";
import HeaderBar from "@/shared/components/AppHeader";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@/shared/theme/typography";
import type { Category as CategoryType } from "@/types/product";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { categories, loading, refetch } = useCategories();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleCategoryPress = (item: CategoryType) => {
    router.push({
      pathname: "/product",
      params: { cate_id: String(item.cate_id) },
    });
  };

  const handleOpenAddModal = () => {
    setSelectedCategory(null);
    setModalVisible(true);
  };

  const handleOpenEditModal = (item: CategoryType) => {
    setSelectedCategory(item);
    setModalVisible(true);
  };

  const handleDeleteCategory = (item: CategoryType) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete category "${item.cate_name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await CategoryApi.deleteCategory(item.cate_id);
              Alert.alert("Success", "Category deleted successfully!");
              refetch();
            } catch (err: any) {
              const msg = err?.response?.data?.message || err?.message || "Failed to delete category";
              Alert.alert("Error", msg);
            }
          },
        },
      ]
    );
  };

  const handleSubmitModal = async (data: { cate_name: string; image_url?: string }) => {
    try {
      if (selectedCategory) {
        // Edit category
        await CategoryApi.updateCategory(selectedCategory.cate_id, data);
        Alert.alert("Success", "Category updated successfully!");
      } else {
        // Create category
        await CategoryApi.createCategory(data);
        Alert.alert("Success", "New category created successfully!");
      }
      refetch();
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to save category";
      return { success: false, error: msg };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Category" />

      {/* Admin Section Action Header */}
      {isAdmin && (
        <View style={styles.adminActionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            style={styles.btnAddCategory}
            onPress={handleOpenAddModal}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
            <Text style={styles.btnAddText}>Add Category</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (!categories || categories.length === 0) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={categories}
          numColumns={2}
          keyExtractor={(item) => String(item.cate_id)}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              onPress={handleCategoryPress}
              onEdit={isAdmin ? handleOpenEditModal : undefined}
              onDelete={isAdmin ? handleDeleteCategory : undefined}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} colors={["#2563EB"]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
        />
      )}

      {/* Admin Add/Edit Category Modal */}
      <CategoryModal
        visible={modalVisible}
        category={selectedCategory}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#F8FAFC",
  },
  adminActionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: "#0F172A",
  },
  btnAddCategory: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 6,
  },
  btnAddText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: FONTS.semiBold,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#94A3B8",
  },
});

