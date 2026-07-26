import { useProductAll } from "@/features/product/hooks/useProduct";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import ProductCard from "./Card";
import { ProductSkeletonList } from "./SkeletonCard";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const ProductList = () => {
  const { products, loading, refetch } = useProductAll();

  // รีโหลดข้อมูลทุกครั้งที่สลับเปิดกลับมาหน้านี้ (Screen Focus)
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  // ถ้ากำลังโหลดข้อมูลครั้งแรก หรือยังไม่มีข้อมูลสินค้า ให้โชว์ Skeleton
  if (loading && (!products || products.length === 0)) {
    return <ProductSkeletonList />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.prod_id}
      renderItem={({ item }) => <ProductCard product={item} />}
      style={{ flex: 1 }}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refetch}
          colors={["#007AFF"]} // สีของตัวหมุน (Android)
          tintColor={"#007AFF"} // สีของตัวหมุน (iOS)
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
  CardWrapper: {
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    padding: 8,
    marginBottom: 8,
  },
  cardDetails: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  cardBt: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
