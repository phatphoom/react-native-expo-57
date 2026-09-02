import type { ApiSuccessResponse, Category } from "@/types/product";
import { apiClient as api } from "@/shared/api";

const CategoryApi = {
  getAllCategory: async (): Promise<Category[]> => {
    const res = await api.get<any>("/category");
    const raw = res.data;
    const list = raw?.data || raw?.items || raw;
    return Array.isArray(list) ? list : [];
  },

  getCategoryById: async (id: string | number): Promise<Category> => {
    const res = await api.get<ApiSuccessResponse<Category>>(`/category/${id}`);
    return res.data.data;
  },

  createCategory: async (data: {
    cate_name: string;
    description?: string | null;
    image_url?: string | null;
  }): Promise<Category> => {
    const res = await api.post<ApiSuccessResponse<Category>>("/category", data);
    return res.data.data;
  },

  updateCategory: async (
    id: string | number,
    data: { cate_name?: string; description?: string | null; image_url?: string | null }
  ): Promise<Category> => {
    const res = await api.put<ApiSuccessResponse<Category>>(`/category/${id}`, data);
    return res.data.data;
  },

  deleteCategory: async (id: string | number): Promise<void> => {
    await api.delete(`/category/${id}`);
  },
};

export default CategoryApi;
