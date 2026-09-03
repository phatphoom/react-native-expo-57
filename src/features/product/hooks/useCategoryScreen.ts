import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import CategoryApi from "@/features/product/api/categoryApi";
import { useCategories } from "@/features/product/hooks/useCategory";
import { useAuth } from "@/features/auth/hooks";
import type { Category as CategoryType } from "@/types/product";

export function useCategoryScreen() {
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDeleteCategory = async (item: CategoryType) => {
    const doDelete = async () => {
      try {
        await CategoryApi.deleteCategory(item.cate_id);
        if (Platform.OS === "web") {
          window.alert("Category deleted successfully!");
        } else {
          Alert.alert("Success", "Category deleted successfully!");
        }
        refetch();
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to delete category";
        if (Platform.OS === "web") {
          window.alert(msg);
        } else {
          Alert.alert("Error", msg);
        }
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Are you sure you want to delete category "${item.cate_name}"?`)) {
        await doDelete();
      }
    } else {
      Alert.alert(
        "Confirm Delete",
        `Are you sure you want to delete category "${item.cate_name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: doDelete,
          },
        ]
      );
    }
  };

  const handleSubmitModal = async (data: { cate_name: string; image_url?: string | null }) => {
    try {
      if (selectedCategory) {
        // Edit category
        await CategoryApi.updateCategory(selectedCategory.cate_id, data);
        if (Platform.OS === "web") {
          window.alert("Category updated successfully!");
        } else {
          Alert.alert("Success", "Category updated successfully!");
        }
      } else {
        // Create category
        await CategoryApi.createCategory(data);
        if (Platform.OS === "web") {
          window.alert("New category created successfully!");
        } else {
          Alert.alert("Success", "New category created successfully!");
        }
      }
      refetch();
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Failed to save category";
      return { success: false, error: msg };
    }
  };

  return {
    isAdmin,
    categories,
    loading,
    refetch,
    modalVisible,
    selectedCategory,
    handleCategoryPress,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleDeleteCategory,
    handleSubmitModal,
  };
}
