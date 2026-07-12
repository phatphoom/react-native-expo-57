import HeaderBar from "@/shared/components/AppHeader";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "./header";

const ProductHeader = () => {
  return (
    <View style={styles.headContainer}>
      <HeaderBar title="Product" />
      <SearchBar />
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headContainer: {
    marginBottom: 15,
  },
});
