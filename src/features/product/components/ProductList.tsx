import { MOCK_PRODUCTS } from "@/mocks/data-mock";
import { FlatList, StyleSheet } from "react-native";
import ProductCard from "./product-list/Card";
const ProductList = () => {
  return (
    <FlatList
      data={MOCK_PRODUCTS}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      style={{ flex: 1 }}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
});
