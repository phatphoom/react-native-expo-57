import ProductApi from "@/api/productApi";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

export function useProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
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
  };

  return { product, loading, error, refetch: fetchData };
}

// Alias for backwards compatibility
export const useProduct = useProductDetail;
