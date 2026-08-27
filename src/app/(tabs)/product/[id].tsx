import { DetailProdct } from "@/features/product/components";
import {
  useDeleteProduct,
  useProduct,
} from "@/features/product/hooks/useProduct";
import { useAuth } from "@/features/auth/hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const productId = Array.isArray(id) ? id[0] : (id as string);
  const { product, refetch } = useProduct({ id: productId });
  const { deleteProduct, loading: isDeleting } = useDeleteProduct();

  // รีโหลดข้อมูลสินค้าใหม่เมื่อสลับเปิดกลับมาหน้านี้ (เช่น เมื่อกดย้อนกลับมาจากหน้าแก้ไข)
  useFocusEffect(
    useCallback(() => {
      if (productId) {
        refetch();
      }
    }, [productId, refetch])
  );

  const handleEdit = () => {
    router.push(`/product/edit/${productId}`);
  };

  const executeDelete = async () => {
    const res = await deleteProduct(productId);
    if (res.success) {
      if (Platform.OS === "web") {
        window.alert("ลบสินค้าเรียบร้อยแล้ว");
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/(tabs)/product");
        }
      } else {
        Alert.alert("สำเร็จ", "ลบสินค้าเรียบร้อยแล้ว", [
          {
            text: "ตกลง",
            onPress: () => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)/product");
              }
            },
          },
        ]);
      }
    } else {
      if (Platform.OS === "web") {
        window.alert("เกิดข้อผิดพลาด: " + (res.error || "ไม่สามารถลบสินค้าได้"));
      } else {
        Alert.alert("เกิดข้อผิดพลาด", res.error || "ไม่สามารถลบสินค้าได้");
      }
    }
  };

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "ยืนยันการลบสินค้า\nคุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? ข้อมูลจะไม่สามารถกู้คืนได้"
      );
      if (confirmed) {
        executeDelete();
      }
      return;
    }

    Alert.alert(
      "ยืนยันการลบสินค้า",
      "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? ข้อมูลจะไม่สามารถกู้คืนได้",
      [
        { text: "ยกเลิก", style: "cancel" },
        {
          text: "ลบสินค้า",
          style: "destructive",
          onPress: executeDelete,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "รายละเอียดสินค้า",
          headerRight: isAdmin
            ? () => (
                <View style={styles.headerRightContainer}>
                  <TouchableOpacity
                    onPress={handleEdit}
                    style={styles.headerButton}
                    activeOpacity={0.7}
                  >
                    <FontAwesome name="pencil" size={20} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDelete}
                    disabled={isDeleting}
                    style={styles.headerButton}
                    activeOpacity={0.7}
                  >
                    <FontAwesome name="trash-o" size={22} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              )
            : undefined,
        }}
      />
      <DetailProdct
        id={productId || ""}
        data={product}
        onEdit={isAdmin ? handleEdit : undefined}
        onDelete={isAdmin ? handleDelete : undefined}
        isDeleting={isDeleting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRightContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  headerButton: { padding: 8 },
});
