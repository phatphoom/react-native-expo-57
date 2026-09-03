import { UploadApi } from "@/shared/api";
import type { Product } from "@/types/product";

export interface FormattedProductDetails {
  priceNum: number;
  discountPctNum: number;
  imageUrl: string | null;
  finalPrice: string;
  originalPrice: string | null;
  hasDiscount: boolean;
}

/**
 * Formats a product's pricing, discount, and image URL for display components.
 */
export function formatProductDetails(product: Product): FormattedProductDetails {
  const priceNum = Number(product.price) || 0;
  const discountPctNum = Number(product.discount_pct) || 0;
  const imageUrl = UploadApi.getFullImageUrl(product.image_url);

  const hasDiscount = discountPctNum > 0;

  const finalPrice = hasDiscount
    ? (priceNum * (1 - discountPctNum / 100)).toFixed(2)
    : priceNum.toFixed(2);

  const originalPrice = hasDiscount
    ? priceNum.toFixed(2)
    : null;

  return {
    priceNum,
    discountPctNum,
    imageUrl,
    finalPrice,
    originalPrice,
    hasDiscount,
  };
}
