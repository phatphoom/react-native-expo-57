import { useCategory } from "@/features/product/hooks/useCategory";
import HeaderBar from "@/shared/components/AppHeader";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { category } = useCategory();
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Category" />
      <FlatList
        data={category}
        renderItem={({ item }) => (
          <View style={styles.CardWrapper}>
            <Text>{item.name}</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

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
