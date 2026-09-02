import ProductApi from "../api/productApi";
import type { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export function useProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ProductApi.getProductById(id);
      setProduct(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch product";
      setError(errorMessage);
      console.warn("Error fetching product:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  return { product, loading, error, refetch: fetchData };
}

// Alias for backwards compatibility
export const useProduct = useProductDetail;
