import { ProductHeader, ProductList } from "@/features/product/components";
import { useProductAll, useProductSearch } from "@/features/product/hooks";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { products, loading, refetch } = useProductAll();
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    handleClear,
    isSearching,
  } = useProductSearch(products || []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ProductHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClear={handleClear}
      />
      <ProductList
        products={filteredProducts}
        loading={loading}
        onRefresh={refetch}
        isSearching={isSearching}
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
