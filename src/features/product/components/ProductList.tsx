import { MOCK_PRODUCTS } from "@/mocks/data-mock";
import { FlatList } from "react-native";
import ProductCard from "./product-list/Card";
const ProductList = () => {
  return (
    <FlatList
      data={MOCK_PRODUCTS}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
};

export default ProductList;
