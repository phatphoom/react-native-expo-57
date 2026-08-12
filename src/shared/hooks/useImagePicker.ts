import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

export interface PickedImageResult {
  uri: string;
  base64: string; // Ready-to-send Data URI format: data:image/jpeg;base64,...
  fileName: string;
  mimeType: string;
  width?: number;
  height?: number;
  fileSize?: number;
}

export interface UseImagePickerOptions {
  aspect?: [number, number];
  allowsEditing?: boolean;
  quality?: number; // 0.0 - 1.0 (default 0.8)
}

export function useImagePicker(options: UseImagePickerOptions = {}) {
  const [image, setImage] = useState<PickedImageResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processImageResult = useCallback((result: ImagePicker.ImagePickerResult): PickedImageResult | null => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];
    if (!asset.base64) {
      throw new Error("Failed to encode image to Base64.");
    }

    const mimeType = asset.mimeType || "image/jpeg";
    const base64Data = asset.base64.startsWith("data:")
      ? asset.base64
      : `data:${mimeType};base64,${asset.base64}`;

    const fileName =
      asset.fileName ||
      `photo_${Date.now()}.${mimeType.split("/")[1] || "jpg"}`;

    return {
      uri: asset.uri,
      base64: base64Data,
      fileName,
      mimeType,
      width: asset.width,
      height: asset.height,
      fileSize: asset.fileSize,
    };
  }, []);

  const pickImageFromLibrary = useCallback(async (): Promise<PickedImageResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        const errMsg = "Permission to access media library was denied";
        setError(errMsg);
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [4, 3],
        quality: options.quality ?? 0.8,
        base64: true,
      });

      const processed = processImageResult(result);
      if (processed) {
        setImage(processed);
      }
      return processed;
    } catch (err: any) {
      const msg = err?.message || "Failed to pick image from library";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options, processImageResult]);

  const takePhotoWithCamera = useCallback(async (): Promise<PickedImageResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        const errMsg = "Permission to access camera was denied";
        setError(errMsg);
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [4, 3],
        quality: options.quality ?? 0.8,
        base64: true,
      });

      const processed = processImageResult(result);
      if (processed) {
        setImage(processed);
      }
      return processed;
    } catch (err: any) {
      const msg = err?.message || "Failed to take photo with camera";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options, processImageResult]);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return {
    image,
    loading,
    error,
    pickImageFromLibrary,
    takePhotoWithCamera,
    clearImage,
    setImage,
  };
}
