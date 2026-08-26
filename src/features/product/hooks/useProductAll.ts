import ProductApi, { GetProductsParams } from "@/api/productApi";
import type { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export function useProductAll(params?: GetProductsParams) {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(false);

  const paramsString = JSON.stringify(params);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getProducts(params);
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  }, [paramsString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { products, loading, refetch: fetchData };
}
