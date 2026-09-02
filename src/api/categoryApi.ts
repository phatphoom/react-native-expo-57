import type { ApiSuccessResponse, Category } from "@/types/product";
import api from "./axios";
const CategoryApi = {
  getAllCategory: async (): Promise<Category[]> => {
    const res = await api.get<ApiSuccessResponse<Category[]>>("/category");
    return res.data.data;
  },

  createCategory: async (data: {
    cate_name: string;
    description?: string;
    image_url?: string;
  }): Promise<Category> => {
    const res = await api.post<ApiSuccessResponse<Category>>("/category", data);
    return res.data.data;
  },

  updateCategory: async (
    id: string | number,
    data: { cate_name?: string; description?: string; image_url?: string }
  ): Promise<Category> => {
    const res = await api.put<ApiSuccessResponse<Category>>(`/category/${id}`, data);
    return res.data.data;
  },

  deleteCategory: async (id: string | number): Promise<void> => {
    await api.delete(`/category/${id}`);
  },
};

export default CategoryApi;
