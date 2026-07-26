import { DetailProdct } from "@/features/product/components";
import { useProduct } from "@/features/product/hooks/useProduct";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { product } = useProduct({ id: id as string });
  return (
    <View style={styles.container}>
      <DetailProdct id={id} data={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
