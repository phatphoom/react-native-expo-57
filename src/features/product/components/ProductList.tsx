import { useProductAll } from "@/features/product/hooks";
import { Product } from "@/types/product";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import ProductCard from "./Card";
import { ProductSkeletonList } from "./SkeletonCard";

interface ProductListProps {
  products?: Product[];
  loading?: boolean;
  onRefresh?: () => void;
  isSearching?: boolean;
}

const ProductList = ({
  products: customProducts,
  loading: customLoading,
  onRefresh: customRefresh,
  isSearching = false,
}: ProductListProps) => {
  const { products: fetchedProducts, loading: fetchLoading, refetch } = useProductAll();

  const products = customProducts ?? fetchedProducts;
  const loading = customLoading ?? fetchLoading;
  const handleRefresh = customRefresh ?? refetch;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading && (!products || products.length === 0)) {
    return <ProductSkeletonList />;
  }

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={48} color="#9ca3af" />
      <Text style={styles.emptyTitle}>
        {isSearching ? "ไม่พบสินค้าที่ตรงกับการค้นหา" : "ไม่มีรายการสินค้า"}
      </Text>
      <Text style={styles.emptySubText}>
        {isSearching ? "ลองค้นหาด้วยคำอื่น หรือกดล้างคำค้นหา" : "เริ่มเพิ่มสินค้าใหม่ได้เลย"}
      </Text>
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
          colors={["#007AFF"]}
          tintColor={"#007AFF"}
        />
      }
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  emptySubText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },
});
