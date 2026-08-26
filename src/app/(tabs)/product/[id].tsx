import { DetailProdct } from "@/features/product/components";
import {
  useDeleteProduct,
  useProduct,
} from "@/features/product/hooks/useProduct";
import { useAuth } from "@/features/auth/hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { product, refetch } = useProduct({ id: id as string });
  const { deleteProduct, loading: isDeleting } = useDeleteProduct();

  // รีโหลดข้อมูลสินค้าใหม่เมื่อสลับเปิดกลับมาหน้านี้ (เช่น เมื่อกดย้อนกลับมาจากหน้าแก้ไข)
  useFocusEffect(
    useCallback(() => {
      if (id) refetch();
    }, [id])
  );

  const handleEdit = () => {
    router.push(`/product/edit/${id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "ยืนยันการลบสินค้า",
      "คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? ข้อมูลจะไม่สามารถกู้คืนได้",
      [
        { text: "ยกเลิก", style: "cancel" },
        {
          text: "ลบสินค้า",
          style: "destructive",
          onPress: async () => {
            const res = await deleteProduct(id as string);
            if (res.success) {
              Alert.alert("สำเร็จ", "ลบสินค้าเรียบร้อยแล้ว", [
                {
                  text: "ตกลง",
                  onPress: () => router.back(),
                },
              ]);
            } else {
              Alert.alert(
                "เกิดข้อผิดพลาด",
                res.error || "ไม่สามารถลบสินค้าได้",
              );
            }
          },
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
        id={id}
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
