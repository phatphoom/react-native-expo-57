import type { UploadImageDto, UploadImageData, UploadImageResponse } from "@/types/upload";
import api from "./axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API || "";

const UploadApi = {
  /**
   * Upload image encoded in Base64 string (POST /api/upload)
   * @param base64Image Base64 image string (with or without data URI prefix)
   * @param fileName Optional filename
   * @returns UploadImageData containing filename, size_bytes, and image_url
   */
  uploadImageBase64: async (base64Image: string, fileName?: string): Promise<UploadImageData> => {
    const payload: UploadImageDto = {
      image: base64Image,
      ...(fileName ? { filename: fileName } : {}),
    };
    const res = await api.post<UploadImageResponse>("/upload", payload);
    return res.data.data;
  },

  /**
   * Get full image URL from relative image_url path
   * @param relativePath Relative image path (e.g. uploads/products/xxx.png or /uploads/products/xxx.png)
   * @returns Full URL string or null if empty
   */
  getFullImageUrl: (relativePath?: string | null): string | null => {
    if (!relativePath) return null;
    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
      return relativePath;
    }

    // ตัดส่วน /api หรือ / ด้านหลังออก เพื่อให้ได้ Host origin (เช่น http://119.59.102.161:3036)
    let hostOrigin = API_BASE_URL.replace(/\/api\/?$/, "").replace(/\/+$/, "");
    
    // ตรวจสอบให้มั่นใจว่า relativePath มี / นำหน้า
    const cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

    return `${hostOrigin}${cleanPath}`;
  },
};

export default UploadApi;
