import { ProductHeader, ProductList } from "@/features/product/components";
import CategoryPills from "@/features/product/components/CategoryPills";
import FilterModal from "@/features/product/components/FilterModal";
import { useProductSearchAndFilter } from "@/features/product/hooks";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { cate_id } = useLocalSearchParams<{ cate_id?: string }>();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    handleClearSearch,
    isSearching,
    selectedCategoryId,
    setSelectedCategoryId,
    minPrice,
    maxPrice,
    sortBy,
    setMinPrice,
    setMaxPrice,
    setSortBy,
    activeFilterCount,
    resetFilters,
    loading,
    refetch,
  } = useProductSearchAndFilter(cate_id);

  // ดึงข้อมูลใหม่ทุกครั้งที่สลับแท็บหรือกลับมาที่หน้านี้
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleApplyFilters = (
    cId: string | number | null,
    minP: string,
    maxP: string,
    sort: any
  ) => {
    setSelectedCategoryId(cId);
    setMinPrice(minP);
    setMaxPrice(maxP);
    setSortBy(sort);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClear={handleClearSearch}
        onFilterPress={() => setFilterModalVisible(true)}
        activeFilterCount={activeFilterCount}
      />
      
      <CategoryPills
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <ProductList
        products={filteredProducts}
        loading={loading}
        onRefresh={refetch}
        isSearching={isSearching}
        onClearFilters={() => {
          handleClearSearch();
          resetFilters();
        }}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        activeCategoryId={selectedCategoryId}
        activeMinPrice={minPrice}
        activeMaxPrice={maxPrice}
        activeSortBy={sortBy}
        onApplyFilters={handleApplyFilters}
        onResetFilters={resetFilters}
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
});
