import CategoryCard from "@/features/product/components/CategoryCard";
import { useCategories } from "@/features/product/hooks/useCategory";
import HeaderBar from "@/shared/components/AppHeader";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const router = useRouter();
  const { categories, loading, refetch } = useCategories();

  const handleCategoryPress = (item: any) => {
    router.push({
      pathname: "/product",
      params: { cate_id: String(item.cate_id) },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Category" />
      {loading && (!categories || categories.length === 0) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.cate_id)}
          renderItem={({ item }) => (
            <CategoryCard item={item} onPress={handleCategoryPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} colors={["#2563EB"]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>ไม่พบหมวดหมู่สินค้า</Text>
            </View>
          }
        />
      )}
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
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
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
    color: "#94A3B8",
  },
});

