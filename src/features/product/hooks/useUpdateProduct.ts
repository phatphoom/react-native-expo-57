import ProductApi from "@/api/productApi";
import type { UpdateProductDto } from "@/types/product";
import { useState } from "react";

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (id: string, updateData: UpdateProductDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductApi.updateProduct(id, updateData);
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update product";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}
