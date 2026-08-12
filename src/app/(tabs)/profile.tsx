import { useProfile } from "@/features/auth/hooks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, showLogoutModal, setShowLogoutModal, handleLogout } = useProfile();

  const renderMenuItem = (icon: any, title: string, isDestructive = false, onPress?: () => void) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconContainer, isDestructive && styles.menuIconDestructive]}>
        {icon}
      </View>
      <Text style={[styles.menuItemText, isDestructive && styles.menuItemTextDestructive]}>
        {title}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#CBD5E1" style={styles.menuItemArrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 24, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color="#94A3B8" />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.username || "ผู้ใช้งาน"}</Text>
          <Text style={styles.userEmail}>{user?.email || "ไม่มีอีเมล"}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase() || "MEMBER"}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>การตั้งค่าบัญชี</Text>
        <View style={styles.menuCard}>
          {renderMenuItem(
            <Ionicons name="person-outline" size={20} color="#3B82F6" />,
            "แก้ไขข้อมูลส่วนตัว"
          )}
          {renderMenuItem(
            <Ionicons name="lock-closed-outline" size={20} color="#8B5CF6" />,
            "เปลี่ยนรหัสผ่าน"
          )}
          {renderMenuItem(
            <Ionicons name="notifications-outline" size={20} color="#F59E0B" />,
            "การแจ้งเตือน"
          )}
        </View>

        <Text style={styles.sectionTitle}>อื่นๆ</Text>
        <View style={styles.menuCard}>
          {renderMenuItem(
            <Ionicons name="help-circle-outline" size={20} color="#10B981" />,
            "ความช่วยเหลือ"
          )}
          {renderMenuItem(
            <Ionicons name="document-text-outline" size={20} color="#64748B" />,
            "เงื่อนไขการใช้งาน"
          )}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="log-out" size={32} color="#DC2626" />
            </View>
            <Text style={styles.modalTitle}>ยืนยันการออกจากระบบ</Text>
            <Text style={styles.modalMessage}>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบบัญชีผู้ใช้นี้?</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleLogout}
              >
                <Text style={styles.modalConfirmBtnText}>ออกจากระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563EB",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 12,
    marginLeft: 8,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuIconDestructive: {
    backgroundColor: "#FEF2F2",
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "500",
  },
  menuItemTextDestructive: {
    color: "#DC2626",
  },
  menuItemArrow: {
    opacity: 0.5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutButtonText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancelBtnText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600",
  },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalConfirmBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
