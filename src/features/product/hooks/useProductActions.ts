import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useDeleteProduct } from "@/features/product/hooks/useProduct";

type UseProductActionsParams = {
  productId: string;
  router: ReturnType<typeof useRouter>;
};

export function useProductActions({ productId, router }: UseProductActionsParams) {
  const { deleteProduct, loading: isDeleting } = useDeleteProduct();

  const handleEdit = () => {
    router.push(`/product/edit/${productId}`);
  };

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/product");
    }
  };

  const executeDelete = async () => {
    const res = await deleteProduct(productId);
    if (res.success) {
      if (Platform.OS === "web") {
        window.alert("Product deleted successfully!");
        navigateBack();
      } else {
        Alert.alert("Success", "Product deleted successfully!", [
          { text: "OK", onPress: navigateBack },
        ]);
      }
    } else {
      const errorMsg = res.error || "Failed to delete product";
      if (Platform.OS === "web") {
        window.alert("Error: " + errorMsg);
      } else {
        Alert.alert("Error", errorMsg);
      }
    }
  };

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Confirm Delete\nAre you sure you want to delete this product? This action cannot be undone."
      );
      if (confirmed) executeDelete();
      return;
    }

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: executeDelete },
      ]
    );
  };

  return { handleEdit, handleDelete, isDeleting };
}
