import { useEffect, useState } from "react";
import { useCategories } from "./useCategory";
import type { SortOption } from "./useProductSearchAndFilter";

export interface UseFilterModalStateProps {
  visible: boolean;
  activeCategoryId: string | number | null;
  activeMinPrice: string;
  activeMaxPrice: string;
  activeSortBy: SortOption;
  onApplyFilters: (
    categoryId: string | number | null,
    minPrice: string,
    maxPrice: string,
    sortBy: SortOption
  ) => void;
  onResetFilters: () => void;
  onClose: () => void;
}

export function useFilterModalState({
  visible,
  activeCategoryId,
  activeMinPrice,
  activeMaxPrice,
  activeSortBy,
  onApplyFilters,
  onResetFilters,
  onClose,
}: UseFilterModalStateProps) {
  const { categories } = useCategories();

  const [localCategoryId, setLocalCategoryId] = useState<string | number | null>(null);
  const [localMinPrice, setLocalMinPrice] = useState<string>("");
  const [localMaxPrice, setLocalMaxPrice] = useState<string>("");
  const [localSortBy, setLocalSortBy] = useState<SortOption>("latest");

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
  ];

  return {
    categories,
    localCategoryId,
    localMinPrice,
    localMaxPrice,
    localSortBy,
    setLocalCategoryId,
    setLocalMinPrice,
    setLocalMaxPrice,
    setLocalSortBy,
    handleApply,
    handleReset,
    sortOptions,
  };
}
