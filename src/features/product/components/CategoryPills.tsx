import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCategories } from "../hooks/useCategory";

interface CategoryPillsProps {
  selectedCategoryId: string | number | null;
  onSelectCategory: (id: string | number | null) => void;
}

export default function CategoryPills({ selectedCategoryId, onSelectCategory }: CategoryPillsProps) {
  const { categories, loading } = useCategories();

  if (loading || !categories || categories.length === 0) {
    return null; // or return a skeleton
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[styles.pill, !selectedCategoryId && styles.pillActive]}
          onPress={() => onSelectCategory(null)}
          activeOpacity={0.7}
        >
          <Text style={[styles.pillText, !selectedCategoryId && styles.pillTextActive]}>
            All
          </Text>
        </TouchableOpacity>

        {categories.map((cat) => {
          const isActive = selectedCategoryId !== null && String(selectedCategoryId) === String(cat.cate_id);
          return (
            <TouchableOpacity
              key={String(cat.cate_id)}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => onSelectCategory(cat.cate_id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {cat.cate_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    height: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  pillActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  pillText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  pillTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
