import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import { useDebounce } from "@/shared/hooks";

export function useProductSearch(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredProducts = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) => {
      const nameMatch = product.prod_name?.toLowerCase().includes(query);
      const descMatch = product.description?.toLowerCase().includes(query);
      const catMatch = product.category_name?.toLowerCase().includes(query);

      return nameMatch || descMatch || catMatch;
    });
  }, [products, debouncedQuery]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    handleClear,
    isSearching: searchQuery.trim().length > 0,
  };
}
