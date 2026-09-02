import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCategories } from "../hooks/useCategory";
import { SortOption } from "../hooks/useProductSearchAndFilter";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  // Current active states
  activeCategoryId: string | number | null;
  activeMinPrice: string;
  activeMaxPrice: string;
  activeSortBy: SortOption;
  // Handlers to apply
  onApplyFilters: (
    categoryId: string | number | null,
    minPrice: string,
    maxPrice: string,
    sortBy: SortOption
  ) => void;
  onResetFilters: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  activeCategoryId,
  activeMinPrice,
  activeMaxPrice,
  activeSortBy,
  onApplyFilters,
  onResetFilters,
}: FilterModalProps) {
  const { categories } = useCategories();

  // Local state for modal before applying
  const [localCategoryId, setLocalCategoryId] = useState<string | number | null>(null);
  const [localMinPrice, setLocalMinPrice] = useState<string>("");
  const [localMaxPrice, setLocalMaxPrice] = useState<string>("");
  const [localSortBy, setLocalSortBy] = useState<SortOption>("latest");

  // Sync local state when modal opens
  useEffect(() => {
    if (visible) {
      setLocalCategoryId(activeCategoryId);
      setLocalMinPrice(activeMinPrice);
      setLocalMaxPrice(activeMaxPrice);
      setLocalSortBy(activeSortBy);
    }
  }, [visible, activeCategoryId, activeMinPrice, activeMaxPrice, activeSortBy]);

  const handleApply = () => {
    onApplyFilters(
      localCategoryId,
      localMinPrice,
      localMaxPrice,
      localSortBy
    );
    onClose();
  };

  const handleReset = () => {
    setLocalCategoryId(null);
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setLocalSortBy("latest");
    onResetFilters();
    onClose();
  };

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Latest", value: "latest" },
    { label: "Price: Low - High", value: "price_asc" },
    { label: "Price: High - Low", value: "price_desc" },
    { label: "Top Rated", value: "rating" },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter Products</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Sort Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.pillContainer}>
                {sortOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.pill, localSortBy === opt.value && styles.pillActive]}
                    onPress={() => setLocalSortBy(opt.value)}
                  >
                    <Text style={[styles.pillText, localSortBy === opt.value && styles.pillTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min"
                  keyboardType="numeric"
                  value={localMinPrice}
                  onChangeText={setLocalMinPrice}
                />
                <Text style={styles.priceDivider}>-</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max"
                  keyboardType="numeric"
                  value={localMaxPrice}
                  onChangeText={setLocalMaxPrice}
                />
              </View>
            </View>

            {/* Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.pillContainer}>
                <TouchableOpacity
                  style={[styles.pill, !localCategoryId && styles.pillActive]}
                  onPress={() => setLocalCategoryId(null)}
                >
                  <Text style={[styles.pillText, !localCategoryId && styles.pillTextActive]}>
                    All
                  </Text>
                </TouchableOpacity>
                {categories?.map((cat) => {
                  const isActive = localCategoryId !== null && String(localCategoryId) === String(cat.cate_id);
                  return (
                    <TouchableOpacity
                      key={String(cat.cate_id)}
                      style={[styles.pill, isActive && styles.pillActive]}
                      onPress={() => setLocalCategoryId(cat.cate_id)}
                    >
                      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                        {cat.cate_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnReset} onPress={handleReset}>
              <Text style={styles.btnResetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnApply} onPress={handleApply}>
              <Text style={styles.btnApplyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pillActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  pillText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  pillTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  priceDivider: {
    color: "#94A3B8",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 12,
  },
  btnReset: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    alignItems: "center",
  },
  btnResetText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600",
  },
  btnApply: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    alignItems: "center",
  },
  btnApplyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
