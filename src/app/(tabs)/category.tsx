import { getCategory } from "@/features/product/services/productService";
import HeaderBar from "@/shared/components/AppHeader";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryItem {
  id: string;
  name: string;
}

export default function Category() {
  const [category, setCategory] = useState<CategoryItem[] | null>([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await getCategory();

        if (data && data.length > 0) {
          setCategory(data);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };
    getTodos();
  }, []);
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
