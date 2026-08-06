import type {
  ApiSuccessResponse,
  CreateProductDto,
  CreateProductResponseData,
  DeleteProductResponse,
  Product,
  UpdateProductDto,
  UpdateProductResponseData,
} from "@/types/product";
import api from "./axios";

const ProductApi = {
  // 1. Get All Products (GET /api/product/all)
  getAllProducts: async (): Promise<Product[]> => {
    const res = await api.get<ApiSuccessResponse<Product[]>>("/product/all");
    return res.data.data;
  },

  // 2. Get Product By ID (GET /api/product/:id)
  getProductById: async (id: string): Promise<Product> => {
    const res = await api.get<ApiSuccessResponse<Product>>(`/product/${id}`);
    return res.data.data;
  },

  // 3. Create Product (POST /api/product/add)
  createProduct: async (productData: CreateProductDto) => {
    const res = await api.post<ApiSuccessResponse<CreateProductResponseData>>("/product/add", productData);
    return res.data;
  },

  // 4. Update Product (PUT /api/product/edit/:id)
  updateProduct: async (id: string, updateData: UpdateProductDto) => {
    const res = await api.put<ApiSuccessResponse<UpdateProductResponseData>>(`/product/edit/${id}`, updateData);
    return res.data;
  },

  // 5. Delete Product (DELETE /api/product/delete/:id)
  deleteProduct: async (id: string) => {
    const res = await api.delete<DeleteProductResponse>(`/product/delete/${id}`);
    return res.data;
  },
};

export default ProductApi;
