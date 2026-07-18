export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  categories: {
    id: number;
    name: string;
  };
  image_url: string;
  rating_rate: number;
  rating_count: number;
  in_stock: boolean;
  stock_count: number;
  discount_percentage?: number;
  created_at: string;
}
