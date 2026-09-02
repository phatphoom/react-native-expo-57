// --- API Response Wrappers ---
export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// --- Domain Models ---
export interface Category {
  cate_id: string | number;
  cate_name: string;
  description?: string | null;
  product_count?: number;
  image?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  prod_id: string;
  prod_name: string;
  description?: string | null;
  price: number;
  currency: string;
  cate_id?: string | number;
  category_name?: string;
  image_url?: string | null;
  rating_rate: number;
  rating_count: number;
  in_stock: boolean | number;
  stock_count: number;
  discount_pct: number;
  created_at?: string;
  updated_at?: string;
}

// --- Request DTOs ---
export interface CreateProductDto {
  prod_name: string;
  description?: string;
  price: number;
  currency?: string;
  cate_id: string | number;
  image_url?: string;
  rating_rate?: number;
  rating_count?: number;
  in_stock?: boolean | number;
  stock_count?: number;
  discount_pct?: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface ProductQueryParams {
  search?: string;
  cate_id?: string | number;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  page?: number;
  limit?: number;
  sort_by?: keyof Product;
  order?: "asc" | "desc";
}

// --- Endpoint Responses ---
export interface WelcomeResponse {
  success: boolean;
  message: string;
  date: string;
  time: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
}

export type GetAllProductsResponse = ApiSuccessResponse<Product[]>;
export type GetProductByIdResponse = ApiSuccessResponse<Product>;

export interface CreateProductResponseData {
  newProduct: Product;
}
export type CreateProductResponse =
  ApiSuccessResponse<CreateProductResponseData>;

export type UpdateProductResponseData = { id: string } & UpdateProductDto;
export type UpdateProductResponse =
  ApiSuccessResponse<UpdateProductResponseData>;

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

// --- Utility Types ---
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
