import type {
  ApiSuccessResponse,
  CreateProductDto,
  CreateProductResponseData,
  DeleteProductResponse,
  Product,
  UpdateProductDto,
  UpdateProductResponseData,
} from "@/types/product";
import { apiClient as api } from "@/shared/api";

export interface GetProductsParams {
  search?: string;
  q?: string;
  page?: number | string;
  limit?: number | string;
  category?: string;
  cate_id?: string | number;
}

const ProductApi = {
  // 1. Get All Products (GET /api/products)
  getProducts: async (params?: GetProductsParams): Promise<Product[]> => {
    const res = await api.get<any>("/products", {
      params,
    });
    const raw = res.data;
    const list = raw?.data || raw?.items || raw;
    return Array.isArray(list) ? list : [];
  },

  // 2. Get Product By ID (GET /api/products/:id)
  getProductById: async (id: string): Promise<Product> => {
    const res = await api.get<ApiSuccessResponse<Product>>(`/products/${id}`);
    return res.data.data;
  },

  // 3. Create Product (POST /api/products)
  createProduct: async (productData: CreateProductDto) => {
    const res = await api.post<ApiSuccessResponse<CreateProductResponseData>>("/products", productData);
    return res.data;
  },

  // 4. Update Product (PUT /api/products/:id)
  updateProduct: async (id: string, updateData: UpdateProductDto) => {
    const res = await api.put<ApiSuccessResponse<UpdateProductResponseData>>(`/products/${id}`, updateData);
    return res.data;
  },

  // 5. Delete Product (DELETE /api/products/:id)
  deleteProduct: async (id: string) => {
    const res = await api.delete<DeleteProductResponse>(`/products/${id}`);
    return res.data;
  },
};

export default ProductApi;
