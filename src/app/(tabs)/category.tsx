import CategoryCard from "@/features/product/components/CategoryCard";
import { useCategories } from "@/features/product/hooks/useCategory";
import HeaderBar from "@/shared/components/AppHeader";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { categories, loading } = useCategories();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Category" />
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.cate_id)}
        renderItem={({ item }) => <CategoryCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F8F9FA",
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
});
