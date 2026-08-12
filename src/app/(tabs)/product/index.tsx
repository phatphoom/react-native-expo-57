import { ProductHeader, ProductList } from "@/features/product/components";
import CategoryPills from "@/features/product/components/CategoryPills";
import FilterModal from "@/features/product/components/FilterModal";
import { useProductAll, useProductSearchAndFilter } from "@/features/product/hooks";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { products, loading, refetch } = useProductAll();
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
    inStockOnly,
    sortBy,
    setMinPrice,
    setMaxPrice,
    setInStockOnly,
    setSortBy,
    activeFilterCount,
    resetFilters,
  } = useProductSearchAndFilter(products || []);

  const handleApplyFilters = (
    cId: string | number | null,
    minP: string,
    maxP: string,
    stock: boolean,
    sort: any
  ) => {
    setSelectedCategoryId(cId);
    setMinPrice(minP);
    setMaxPrice(maxP);
    setInStockOnly(stock);
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
        activeInStockOnly={inStockOnly}
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
