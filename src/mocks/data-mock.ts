// 1. กำหนด Interface สำหรับข้อมูลสินค้า
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: "Electronics" | "Clothing" | "Home & Living" | "Books"; // กำหนดหมวดหมู่แบบเจาะจง
  imageUrl: string;
  rating: {
    rate: number;
    count: number;
  };
  inStock: boolean;
  stockCount: number;
  discountPercentage?: number; // มีเครื่องหมาย ? เผื่อกรณีสินค้าบางตัวไม่มีส่วนลด
  createdAt: string;
}

// 2. ข้อมูล Mockup ชุดตัวอย่าง
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation and 40-hour battery life.",
    price: 5900,
    currency: "THB",
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: {
      rate: 4.8,
      count: 128,
    },
    inStock: true,
    stockCount: 15,
    discountPercentage: 10,
    createdAt: "2026-01-15T08:30:00Z",
  },
  {
    id: "prod-002",
    name: "Minimalist Leather Wallet",
    description:
      "Genuine slim leather wallet with RFID blocking technology. Holds up to 8 cards.",
    price: 890,
    currency: "THB",
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    rating: {
      rate: 4.5,
      count: 64,
    },
    inStock: true,
    stockCount: 50,
    createdAt: "2026-02-01T10:15:00Z",
  },
  {
    id: "prod-003",
    name: "Smart Fitness Watch v2",
    description:
      "Track your workouts, heart rate, and sleep with AMOLED display and water resistance.",
    price: 3490,
    currency: "THB",
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: {
      rate: 4.2,
      count: 210,
    },
    inStock: false, // ตัวอย่างเคสสินค้าหมด
    stockCount: 0,
    createdAt: "2026-02-18T14:00:00Z",
  },
  {
    id: "prod-004",
    name: "Ergonomic Ceramic Coffee Mug",
    description:
      "Matte finish ceramic mug designed to keep your coffee warm and fit perfectly in your hand.",
    price: 450,
    currency: "THB",
    category: "Home & Living",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
    rating: {
      rate: 4.9,
      count: 45,
    },
    inStock: true,
    stockCount: 8,
    discountPercentage: 15,
    createdAt: "2026-03-05T09:00:00Z",
  },
];
