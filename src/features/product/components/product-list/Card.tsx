import type { Product } from "@/mocks/data-mock";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <View style={styles.CardWrapper}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.cardDetails}>
        <Text>{product.name}</Text>
        <Text>Category : {product.category}</Text>
        <View style={styles.cardBt}>
          <Text>{product.inStock ? "In Stock" : "Out of Stock"}</Text>
          <Text>
            {product.price} {product.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
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
