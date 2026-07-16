import { StyleSheet, Text, View } from "react-native";

interface CategoryItem {
  id: string;
  name: string;
}

interface CategoryProps {
  item: CategoryItem;
}

const CategoryCard = ({ item }: CategoryProps) => {
  return (
    <View style={styles.CardWrapper}>
      <Text>{item.name}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  CardWrapper: {
    borderWidth: 1,
    flexDirection: "row",
    // gap: 8,
    padding: 8,
    marginBottom: 8,
  },
});
