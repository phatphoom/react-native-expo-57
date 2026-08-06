import ProductApi from "@/api/productApi";
import type { CreateProductDto, Product, UpdateProductDto } from "@/types/product";
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
  const [product, setProduct] = useState<Product | Product[] | null>(null);
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
