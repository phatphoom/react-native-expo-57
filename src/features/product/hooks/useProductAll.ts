import ProductApi from "@/api/productApi";
import type { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export function useProductAll() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getAllProducts();
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, loading, refetch: fetchData };
}
