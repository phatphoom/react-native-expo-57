import { useCategories } from "@/features/product/hooks/useCategory";
import { useProductAll } from "@/features/product/hooks/useProductAll";
import { useAuth } from "@/features/auth/hooks";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import {
  StatCard,
  RecentProductItem,
  QuickActions,
} from "@/features/product/components";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const {
    products,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useProductAll();
  const {
    categories,
    loading: categoriesLoading,
    refetch: refetchCategories,
  } = useCategories();
  const { displayName, fullAvatarUrl } = useUserProfile();

  useFocusEffect(
    useCallback(() => {
      refetchProducts();
      refetchCategories();
    }, [refetchProducts, refetchCategories])
  );

  const recentProducts = useMemo(
    () => (products ? products.slice(0, 5) : []),
    [products]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {displayName} 👋</Text>
            <Text style={styles.subtitle}>Manage your store today</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => router.push("/profile")}
            activeOpacity={0.8}
          >
            {fullAvatarUrl ? (
              <Image
                source={{ uri: fullAvatarUrl }}
                style={styles.headerAvatarImage}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <Ionicons name="person-circle" size={48} color="#94A3B8" />
            )}
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Products"
            value={products?.length || 0}
            icon={<FontAwesome5 name="box-open" size={20} color="#3B82F6" />}
            color="#3B82F6"
            loading={productsLoading}
          />
          <StatCard
            title="Categories"
            value={categories?.length || 0}
            icon={<MaterialIcons name="category" size={22} color="#10B981" />}
            color="#10B981"
            loading={categoriesLoading}
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActions isAdmin={isAdmin} router={router} />

        {/* Recent Products */}
        <View style={styles.recentHeader}>
          <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Recently Added</Text>
          <TouchableOpacity onPress={() => router.push("/product")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {productsLoading ? (
          <ActivityIndicator
            size="large"
            color="#3B82F6"
            style={{ marginTop: 24 }}
          />
        ) : recentProducts.length > 0 ? (
          <View style={styles.recentProductsContainer}>
            {recentProducts.map((item, index) => (
              <RecentProductItem
                key={item.prod_id || index.toString()}
                item={{ ...item, image_url: item.image_url ?? undefined }}
                onPress={() => router.push(`/product/${item.prod_id}`)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No products in system yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: { fontSize: 22, fontWeight: "700", color: "#0F172A", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748B" },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  headerAvatarImage: { width: "100%", height: "100%" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 28 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B", marginBottom: 16 },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: { fontSize: 14, color: "#3B82F6", fontWeight: "600" },
  recentProductsContainer: { gap: 12 },
  emptyState: { alignItems: "center", paddingVertical: 32 },
  emptyStateText: { fontSize: 15, color: "#94A3B8" },
});
