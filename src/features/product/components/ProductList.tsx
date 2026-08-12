import { useProductAll } from "@/features/product/hooks";
import { Product } from "@/types/product";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "./Card";
import { ProductSkeletonList } from "./SkeletonCard";

interface ProductListProps {
  products?: Product[];
  loading?: boolean;
  onRefresh?: () => void;
  isSearching?: boolean;
  onClearFilters?: () => void;
}

const ProductList = ({
  products: customProducts,
  loading: customLoading,
  onRefresh: customRefresh,
  isSearching = false,
  onClearFilters,
}: ProductListProps) => {
  const { products: fetchedProducts, loading: fetchLoading, refetch } = useProductAll();

  const products = customProducts ?? fetchedProducts ?? [];
  const loading = customLoading ?? fetchLoading;
  const handleRefresh = customRefresh ?? refetch;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading && products.length === 0) {
    return <ProductSkeletonList />;
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={48} color="#94A3B8" />
      <Text style={styles.emptyTitle}>
        {isSearching ? "ไม่พบสินค้าที่ตรงกับการค้นหา" : "ไม่มีรายการสินค้า"}
      </Text>
      <Text style={styles.emptySubText}>
        {isSearching ? "ลองค้นหาด้วยคำอื่น หรือแก้ไขตัวกรอง" : "เริ่มเพิ่มสินค้าใหม่ได้เลย"}
      </Text>
      {isSearching && onClearFilters && (
        <TouchableOpacity style={styles.btnClear} onPress={onClearFilters}>
          <Text style={styles.btnClearText}>ล้างตัวกรองทั้งหมด</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.prod_id}
      renderItem={({ item }) => <ProductCard product={item} />}
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.listContent,
        products.length === 0 && { flex: 1, justifyContent: "center" },
      ]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyState}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={handleRefresh}
          colors={["#2563EB"]}
          tintColor={"#2563EB"}
        />
      }
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  emptySubText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  btnClear: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  btnClearText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  }
});
