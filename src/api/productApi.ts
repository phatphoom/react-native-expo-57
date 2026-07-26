import type {
  ApiSuccessResponse,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@/types/product";
import api from "./axios";
const ProductApi = {
  getAllProducts: async () => {
    const res = await api.get<ApiSuccessResponse<Product[]>>("/product/all");
    return res.data.data;
  },

  getProductById: async (id: string) => {
    const res = await api.get<ApiSuccessResponse<Product[]>>(`/product/${id}`);
    return res.data.data;
  },

  createProduct: (productData: CreateProductDto) => {
    return api.post("/product/add", productData);
  },

  updateProduct: (id: string, updateData: UpdateProductDto) => {
    return api.put(`/products/${id}`, updateData);
  },

  deleteProduct: (id: string) => {
    return api.delete(`/products/${id}`);
  },
};

export default ProductApi;
