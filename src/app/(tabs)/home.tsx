import UploadApi from "@/api/uploadApi";
import { useCategories } from "@/features/product/hooks/useCategory";
import { useProductAll } from "@/features/product/hooks/useProductAll";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
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

  const { products, loading: productsLoading } = useProductAll();
  const { categories, loading: categoriesLoading } = useCategories();

  // Get latest 5 products for recent activity
  const recentProducts = useMemo(() => {
    if (!products) return [];
    // Assuming products are already sorted by latest, or we can sort by id/date if available
    // For now just take the first 5
    return products.slice(0, 5);
  }, [products]);

  const renderStatCard = (
    title: string,
    value: string | number,
    icon: React.ReactNode,
    color: string,
    loading: boolean
  ) => (
    <View style={[styles.statCard, { borderTopColor: color }]}>
      <View style={styles.statIconContainer}>
        {icon}
      </View>
      <View style={styles.statTextContainer}>
        <Text style={styles.statTitle}>{title}</Text>
        {loading ? (
          <ActivityIndicator size="small" color={color} style={{ alignSelf: "flex-start", marginTop: 4 }} />
        ) : (
          <Text style={[styles.statValue, { color }]}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: 120 }, // Extra padding for bottom bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>สวัสดี, ยินดีต้อนรับ 👋</Text>
            <Text style={styles.subtitle}>จัดการร้านค้าของคุณวันนี้</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={48} color="#94A3B8" />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {renderStatCard(
            "สินค้าทั้งหมด",
            products?.length || 0,
            <FontAwesome5 name="box-open" size={20} color="#3B82F6" />,
            "#3B82F6",
            productsLoading
          )}
          {renderStatCard(
            "หมวดหมู่",
            categories?.length || 0,
            <MaterialIcons name="category" size={22} color="#10B981" />,
            "#10B981",
            categoriesLoading
          )}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>เมนูด่วน</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push("/add")}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
              <Ionicons name="add-circle" size={28} color="#3B82F6" />
            </View>
            <Text style={styles.quickActionText}>เพิ่มสินค้า</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push("/product")}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
              <Ionicons name="list" size={28} color="#8B5CF6" />
            </View>
            <Text style={styles.quickActionText}>รายการสินค้า</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionBtn}
            onPress={() => router.push("/category")}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
              <MaterialIcons name="category" size={28} color="#10B981" />
            </View>
            <Text style={styles.quickActionText}>หมวดหมู่</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Products */}
        <View style={styles.recentHeader}>
          <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>เพิ่มล่าสุด</Text>
          <TouchableOpacity onPress={() => router.push("/product")}>
            <Text style={styles.seeAllText}>ดูทั้งหมด</Text>
          </TouchableOpacity>
        </View>

        {productsLoading ? (
          <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 24 }} />
        ) : recentProducts.length > 0 ? (
          <View style={styles.recentProductsContainer}>
            {recentProducts.map((item, index) => {
              const imageUrl = UploadApi.getFullImageUrl(item.image_url);
              return (
                <TouchableOpacity
                  key={item.prod_id || index.toString()}
                  style={styles.recentProductCard}
                  onPress={() => router.push(`/product/${item.prod_id}`)}
                  activeOpacity={0.7}
                >
                  <View style={styles.recentProductImagePlaceholder}>
                    {imageUrl ? (
                      <Image source={{ uri: imageUrl }} style={styles.recentProductImage} resizeMode="cover" />
                    ) : (
                      <Ionicons name="image-outline" size={24} color="#CBD5E1" />
                    )}
                  </View>
                  <View style={styles.recentProductInfo}>
                    <Text style={styles.recentProductName} numberOfLines={1}>
                      {item.prod_name || "ไม่มีชื่อสินค้า"}
                    </Text>
                    <Text style={styles.recentProductPrice}>
                      ฿{item.price ? Number(item.price).toLocaleString() : "0"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>ยังไม่มีสินค้าในระบบ</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderTopWidth: 4,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statTextContainer: {
    flex: 1,
  },
  statTitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  quickActionBtn: {
    alignItems: "center",
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  recentProductsContainer: {
    gap: 12,
  },
  recentProductCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recentProductImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  recentProductImage: {
    width: "100%",
    height: "100%",
  },
  recentProductInfo: {
    flex: 1,
  },
  recentProductName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  recentProductPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B82F6",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 15,
    color: "#94A3B8",
  },
});
