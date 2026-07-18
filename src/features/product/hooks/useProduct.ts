import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { getAllProduct } from "../services/productService";

export function useProductAll() {
  const [products, setProducts] = useState<Product[] | null>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getAllProduct();
      setProducts(data);
      console.log(products);
    } catch (error: any) {
      console.error("Error fetching todos:", error.message);
    }
  };
  return { products };
}
