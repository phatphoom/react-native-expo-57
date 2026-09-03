import React from "react";
import CategoryCard from "@/features/product/components/CategoryCard";
import CategoryModal from "@/features/product/components/CategoryModal";
import { useCategoryScreen } from "@/features/product/hooks/useCategoryScreen";
import HeaderBar from "@/shared/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@/shared/theme/typography";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const {
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
  } = useCategoryScreen();

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
        onClose={handleCloseModal}
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
