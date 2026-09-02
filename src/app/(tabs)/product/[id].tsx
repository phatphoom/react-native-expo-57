import { DetailProdct } from "@/features/product/components";
import { useProduct } from "@/features/product/hooks/useProduct";
import { useProductActions } from "@/features/product/hooks/useProductActions";
import { useAuth } from "@/features/auth/hooks";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const productId = Array.isArray(id) ? id[0] : (id as string);
  const { product, refetch } = useProduct({ id: productId });
  const { handleEdit, handleDelete, isDeleting } = useProductActions({
    productId,
    router,
  });

  // Reload product data when navigating back from edit screen
  useFocusEffect(
    useCallback(() => {
      if (productId) refetch();
    }, [productId, refetch])
  );

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
