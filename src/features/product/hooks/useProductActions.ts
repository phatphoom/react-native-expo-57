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
        window.alert("ลบสินค้าเรียบร้อยแล้ว");
        navigateBack();
      } else {
        Alert.alert("สำเร็จ", "ลบสินค้าเรียบร้อยแล้ว", [
          { text: "ตกลง", onPress: navigateBack },
        ]);
      }
    } else {
      const errorMsg = res.error || "ไม่สามารถลบสินค้าได้";
      if (Platform.OS === "web") {
        window.alert("เกิดข้อผิดพลาด: " + errorMsg);
      } else {
        Alert.alert("เกิดข้อผิดพลาด", errorMsg);
      }
    }
  };

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "ยืนยันการลบสินค้า\nคุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? ข้อมูลจะไม่สามารถกู้คืนได้"
      );
      if (confirmed) executeDelete();
      return;
    }

    Alert.alert(
      "ยืนยันการลบสินค้า",
      "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? ข้อมูลจะไม่สามารถกู้คืนได้",
      [
        { text: "ยกเลิก", style: "cancel" },
        { text: "ลบสินค้า", style: "destructive", onPress: executeDelete },
      ]
    );
  };

  return { handleEdit, handleDelete, isDeleting };
}
