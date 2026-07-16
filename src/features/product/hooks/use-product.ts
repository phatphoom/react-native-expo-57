import { useEffect, useState } from "react";
import { getCategory } from "../services/productService";

interface CategoryItem {
  id: string;
  name: string;
}
export function useCategory() {
  const [category, setCategory] = useState<CategoryItem[] | null>([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await getCategory();

        if (data && data.length > 0) {
          setCategory(data);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };
    getTodos();
  }, []);
  return { category };
}
