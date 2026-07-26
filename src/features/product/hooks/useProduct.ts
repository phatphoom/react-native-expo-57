import ProductApi from "@/api/productApi";
import type { CreateProductDto, Product } from "@/types/product";
import { useEffect, useState } from "react";

export function useProductAll() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getAllProducts();
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refetch: fetchData };
}

export function useProduct({ id }: { id: string }) {
  const [product, setProduct] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getProductById(id);
      setProduct(data);
    } catch (error: any) {
      console.error("Error fetching product:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, refetch: fetchData };
}

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
