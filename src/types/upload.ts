import type { ApiSuccessResponse } from "./product";

export interface UploadImageDto {
  /**
   * Base64 encoded string of the image.
   * Can be either Data URI format (e.g. `data:image/png;base64,...`) or plain Base64 string.
   */
  image: string;

  /**
   * Optional original filename (e.g. `photo.png`).
   */
  filename?: string;
}

export interface UploadImageData {
  filename: string;
  size_bytes: number;
  image_url: string;
}

export type UploadImageResponse = ApiSuccessResponse<UploadImageData>;
