import { useCallback, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useDebounce } from "@/shared/hooks";
import ProductApi from "@/api/productApi";

export function useProductSearch(initialProducts: Product[] = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const fetchSearchedProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = debouncedQuery.trim();
      const data = await ProductApi.getProducts(query ? { search: query } : undefined);
      setProducts(data || []);
    } catch (error: any) {
      console.error("Error fetching searched products:", error.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchSearchedProducts();
  }, [fetchSearchedProducts]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts: products,
    loading,
    refetch: fetchSearchedProducts,
    handleClear,
    isSearching: searchQuery.trim().length > 0,
  };
}

