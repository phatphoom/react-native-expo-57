import HeaderBar from "@/shared/components/AppHeader";
import { StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";

interface ProductHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
  onFilterPress?: () => void;
}

const ProductHeader = ({
  searchQuery,
  onSearchChange,
  onClear,
  onFilterPress,
}: ProductHeaderProps) => {
  return (
    <View style={styles.headContainer}>
      <HeaderBar title="Product" />
      <SearchBar
        value={searchQuery}
        onChangeText={onSearchChange}
        onClear={onClear}
        onFilterPress={onFilterPress}
      />
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headContainer: {
    marginBottom: 15,
  },
});
