import type { CreateProductDto, UpdateProductDto } from "@/types/product";
import api from "./axios";
const ProductApi = {
  getAllProducts: () => {
    return api.get("/products");
  },

  getProductById: (id: string) => {
    return api.get(`/products/${id}`);
  },

  createProduct: (productData: CreateProductDto) => {
    return api.post("/products", productData);
  },

  updateProduct: (id: string, updateData: UpdateProductDto) => {
    return api.put(`/products/${id}`, updateData);
  },

  deleteProduct: (id: string) => {
    return api.delete(`/products/${id}`);
  },
};

export default ProductApi;
