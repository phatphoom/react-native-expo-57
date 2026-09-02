import ProductApi from "../api/productApi";
import type { CreateProductDto } from "@/types/product";
import { useState } from "react";

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: CreateProductDto) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductApi.createProduct(productData);
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create product";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
}
