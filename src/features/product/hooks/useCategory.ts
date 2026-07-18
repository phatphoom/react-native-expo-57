import { useEffect, useState } from "react";
import { getCategory } from "../services/categoryService";

interface CategoryItem {
  id: string;
  name: string;
}

export function useCategory() {
  const [category, setCategory] = useState<CategoryItem[] | null>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();

        if (data && data.length > 0) {
          setCategory(data);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };
    fetchData();
  }, []);
  return { category };
}
