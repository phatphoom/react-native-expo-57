import { useProductAll } from "@/features/product/hooks/useProduct";
import { FlatList, StyleSheet } from "react-native";
import ProductCard from "./product-list/Card";
const ProductList = () => {
  const { products } = useProductAll();
  return (
    <FlatList
      data={products}
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
