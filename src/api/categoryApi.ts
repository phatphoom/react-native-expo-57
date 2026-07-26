import type { ApiSuccessResponse, Category } from "@/types/product";
import api from "./axios";
const CategoryApi = {
  getAllCategory: async (): Promise<Category[]> => {
    const res = await api.get<ApiSuccessResponse<Category[]>>("/category");

    return res.data.data;
  },
};

export default CategoryApi;
