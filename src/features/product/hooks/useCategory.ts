import CategoryApi from "@/api/categoryApi";
import type { Category } from "@/types/product";
import { useEffect, useState } from "react";

export function useCategory() {
  const [categories, setCategories] = useState<Category[] | null>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CategoryApi.getAllCategory();
        setCategories(res);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);
  return { categories };
}
