import { ProductHeader, ProductList } from "@/features/product/components";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Product() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View>
        <ProductHeader />
        <ProductList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
