import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "@/types/product";
import { useDebounce } from "@/shared/hooks";
import ProductApi, { GetProductsParams } from "@/api/productApi";
import { useCategories } from "./useCategory";

export type SortOption = "latest" | "price_asc" | "price_desc" | "rating";

export function useProductSearchAndFilter(initialCategoryId?: string | number | null) {
  const { categories } = useCategories();

  // Global Search State
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Filter States
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | null>(
    initialCategoryId ?? null
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // Sync selectedCategoryId if initialCategoryId prop changes
  useEffect(() => {
    if (initialCategoryId !== undefined) {
      setSelectedCategoryId(initialCategoryId ?? null);
    }
  }, [initialCategoryId]);

  // Server-fetched products & loading state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategoryId !== null && selectedCategoryId !== "") count++;
    if (minPrice || maxPrice) count++;
    if (sortBy !== "latest") count++;
    return count;
  }, [selectedCategoryId, minPrice, maxPrice, sortBy]);

  // Fetch products from server with query string params
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = debouncedQuery.trim();
      const params: GetProductsParams = {};

      if (query) {
        params.search = query;
      }
      if (selectedCategoryId !== null && selectedCategoryId !== "") {
        params.cate_id = selectedCategoryId;
      }

      const data = await ProductApi.getProducts(params);
      setProducts(data || []);
    } catch (error: any) {
      console.error("Error fetching products with query params:", error.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, selectedCategoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-side post-processing (Price range, in-stock, sorting, fallback filter)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. In-memory keyword match as fallback
    const query = debouncedQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((product) => {
        const nameMatch = product.prod_name?.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        const catMatch = product.category_name?.toLowerCase().includes(query);
        const priceMatch = product.price?.toString().includes(query);
        return nameMatch || descMatch || catMatch || priceMatch;
      });
    }

    // 2. Category fallback matching
    if (selectedCategoryId !== null && selectedCategoryId !== "") {
      const selectedCategoryObj = categories?.find(
        (c) => String(c.cate_id) === String(selectedCategoryId)
      );

      result = result.filter((product) => {
        if (product.cate_id !== undefined && product.cate_id !== null && String(product.cate_id) !== "") {
          if (String(product.cate_id) === String(selectedCategoryId)) {
            return true;
          }
        }
        if (selectedCategoryObj?.cate_name) {
          const targetCatName = selectedCategoryObj.cate_name.trim().toLowerCase();
          if (product.category_name && product.category_name.trim().toLowerCase() === targetCatName) {
            return true;
          }
          if ((product as any).cate_name && (product as any).cate_name.trim().toLowerCase() === targetCatName) {
            return true;
          }
        }
        return false;
      });
    }

    // 3. Price Range Filter
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) {
      result = result.filter((product) => product.price >= min);
    }
    if (!isNaN(max)) {
      result = result.filter((product) => product.price <= max);
    }

    // 4. Sorting
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating_rate || 0) - (a.rating_rate || 0));
        break;
      case "latest":
      default:
        result.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return 0;
        });
        break;
    }

    return result;
  }, [products, debouncedQuery, selectedCategoryId, minPrice, maxPrice, sortBy, categories]);

  // Actions
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSelectedCategoryId(null);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("latest");
  };

  return {
    // States
    searchQuery,
    selectedCategoryId,
    minPrice,
    maxPrice,
    sortBy,
    loading,
    
    // Derived state
    filteredProducts,
    activeFilterCount,
    isSearching: searchQuery.trim().length > 0 || activeFilterCount > 0,
    
    // Setters
    setSearchQuery,
    setSelectedCategoryId,
    setMinPrice,
    setMaxPrice,
    setSortBy,
    
    // Actions
    handleClearSearch,
    resetFilters,
    refetch: fetchProducts,
  };
}

