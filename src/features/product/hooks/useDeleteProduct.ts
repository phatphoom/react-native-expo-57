import ProductApi from "../api/productApi";
import { useState } from "react";

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductApi.deleteProduct(id);
      return { success: true, data: response };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete product";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
}
