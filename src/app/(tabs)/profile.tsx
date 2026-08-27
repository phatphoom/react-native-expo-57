import { useProfile } from "@/features/auth/hooks";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { useChangePassword } from "@/features/profile/hooks/useChangePassword";
import { useDeleteAccount } from "@/features/profile/hooks/useDeleteAccount";
import { useInfoModals } from "@/features/profile/hooks/useInfoModals";
import {
  AvatarOptionsModal,
  ChangePasswordModal,
  DeleteAccountModal,
  EditProfileModal,
  InfoModal,
  ProfileHeroCard,
  ProfileMenuItem,
} from "@/features/profile/components";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

  // Hooks: business logic
  const { showLogoutModal, setShowLogoutModal, handleLogout } = useProfile();
  const userProfile = useUserProfile();
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteAccount(handleLogout);
  const infoModals = useInfoModals();

  // Avatar options sheet state
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const {
    profile,
    user,
    loading,
    updating,
    uploadingAvatar,
    showEditModal,
    firstNameInput,
    lastNameInput,
    phoneNumberInput,
    addressInput,
    fullAvatarUrl,
    displayName,
    setFirstNameInput,
    setLastNameInput,
    setPhoneNumberInput,
    setAddressInput,
    openEditModal,
    closeEditModal,
    handleSaveProfile,
    handleUploadAndChangeAvatar,
  } = userProfile;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero Card */}
        <ProfileHeroCard
          displayName={displayName}
          username={profile?.username || user?.username}
          email={profile?.email || user?.email}
          role={profile?.role || user?.role}
          fullAvatarUrl={fullAvatarUrl}
          uploadingAvatar={uploadingAvatar}
          onAvatarPress={() => setShowAvatarOptions(true)}
        />

        {/* Personal Details */}
        <Text style={styles.sectionTitle}>ข้อมูลส่วนตัว</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={[styles.infoIconBox, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
              <Ionicons name="call-outline" size={18} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>เบอร์โทรศัพท์</Text>
              <Text style={styles.infoValue}>{profile?.phone_number || "ยังไม่ได้ระบุ"}</Text>
            </View>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <View style={[styles.infoIconBox, { backgroundColor: "rgba(245, 158, 11, 0.1)" }]}>
              <Ionicons name="location-outline" size={18} color="#F59E0B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>ที่อยู่</Text>
              <Text style={styles.infoValue}>{profile?.address || "ยังไม่ได้ระบุ"}</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>การตั้งค่าบัญชี</Text>
        <View style={styles.menuCard}>
          <ProfileMenuItem
            icon={<Ionicons name="person-outline" size={20} color="#3B82F6" />}
            title="แก้ไขข้อมูลส่วนตัว"
            onPress={openEditModal}
          />
          <ProfileMenuItem
            icon={<Ionicons name="key-outline" size={20} color="#8B5CF6" />}
            title="เปลี่ยนรหัสผ่าน"
            onPress={changePassword.open}
          />
          <View style={styles.menuDivider} />
          <ProfileMenuItem
            icon={<Ionicons name="trash-outline" size={20} color="#DC2626" />}
            title="ลบบัญชีผู้ใช้ (Danger Zone)"
            isDestructive
            onPress={deleteAccount.open}
          />
        </View>

        {/* Others */}
        <Text style={styles.sectionTitle}>อื่นๆ</Text>
        <View style={styles.menuCard}>
          <ProfileMenuItem
            icon={<Ionicons name="shield-checkmark-outline" size={20} color="#3B82F6" />}
            title="นโยบายความเป็นส่วนตัว (Privacy Policy)"
            onPress={infoModals.openPrivacyPolicy}
          />
          <ProfileMenuItem
            icon={<Ionicons name="document-text-outline" size={20} color="#64748B" />}
            title="เงื่อนไขการใช้งาน (Terms of Service)"
            onPress={infoModals.openTermsOfService}
          />
          <ProfileMenuItem
            icon={<Ionicons name="help-circle-outline" size={20} color="#10B981" />}
            title="ความช่วยเหลือ"
            onPress={infoModals.openHelpSupport}
          />
          <ProfileMenuItem
            icon={<Ionicons name="information-circle-outline" size={20} color="#6366F1" />}
            title="เกี่ยวกับแอป (About App)"
            badgeText="v1.0.0"
            onPress={infoModals.openAboutApp}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={22} color="#DC2626" />
          <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerVersionContainer}>
          <Text style={styles.footerVersionText}>App Version v1.0.0</Text>
          <Text style={styles.footerCopyrightText}>© 2026 E-Commerce System. All Rights Reserved.</Text>
        </View>
      </ScrollView>

      {/* Modals */}
      <EditProfileModal
        visible={showEditModal}
        onClose={closeEditModal}
        fullAvatarUrl={fullAvatarUrl}
        uploadingAvatar={uploadingAvatar}
        onChangeAvatar={() => setShowAvatarOptions(true)}
        firstNameInput={firstNameInput}
        lastNameInput={lastNameInput}
        phoneNumberInput={phoneNumberInput}
        addressInput={addressInput}
        setFirstNameInput={setFirstNameInput}
        setLastNameInput={setLastNameInput}
        setPhoneNumberInput={setPhoneNumberInput}
        setAddressInput={setAddressInput}
        updating={updating}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        visible={changePassword.visible}
        onClose={changePassword.close}
        currentPassword={changePassword.currentPassword}
        newPassword={changePassword.newPassword}
        confirmPassword={changePassword.confirmPassword}
        showCurrentPass={changePassword.showCurrentPass}
        showNewPass={changePassword.showNewPass}
        showConfirmPass={changePassword.showConfirmPass}
        loading={changePassword.loading}
        setCurrentPassword={changePassword.setCurrentPassword}
        setNewPassword={changePassword.setNewPassword}
        setConfirmPassword={changePassword.setConfirmPassword}
        toggleCurrentPass={changePassword.toggleCurrentPass}
        toggleNewPass={changePassword.toggleNewPass}
        toggleConfirmPass={changePassword.toggleConfirmPass}
        onSubmit={changePassword.handleSubmit}
      />

      <DeleteAccountModal
        visible={deleteAccount.visible}
        loading={deleteAccount.loading}
        onClose={deleteAccount.close}
        onConfirm={deleteAccount.handleConfirm}
      />

      <AvatarOptionsModal
        visible={showAvatarOptions}
        onClose={() => setShowAvatarOptions(false)}
        onPickFromGallery={() => {
          setShowAvatarOptions(false);
          handleUploadAndChangeAvatar(false);
        }}
        onTakePhoto={() => {
          setShowAvatarOptions(false);
          handleUploadAndChangeAvatar(true);
        }}
      />

      <InfoModal
        visible={infoModals.infoModal.visible}
        title={infoModals.infoModal.title}
        subtitle={infoModals.infoModal.subtitle}
        sections={infoModals.infoModal.sections}
        onClose={infoModals.closeInfoModal}
      />

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
            <Text style={styles.modalMessage}>
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบบัญชีผู้ใช้นี้?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleLogout}>
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
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#475569", marginBottom: 10, marginLeft: 4 },
  infoCard: {
    backgroundColor: "#FFFFFF", borderRadius: 20, padding: 16, marginBottom: 20,
    shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 2,
  },
  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
  infoIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 14 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: "#64748B", marginBottom: 2, fontWeight: "500" },
  infoValue: { fontSize: 15, color: "#1E293B", fontWeight: "600" },
  infoDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 6 },
  menuCard: {
    backgroundColor: "#FFFFFF", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 16, marginBottom: 20,
    shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8, elevation: 2,
  },
  menuDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 4 },
  logoutButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#FEE2E2", borderRadius: 16, paddingVertical: 15, marginTop: 4, marginBottom: 16,
  },
  logoutButtonText: { color: "#DC2626", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  footerVersionContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 8, gap: 4 },
  footerVersionText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  footerCopyrightText: { fontSize: 11, color: "#94A3B8" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.6)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContent: {
    backgroundColor: "#FFFFFF", borderRadius: 24, padding: 24, width: "100%", alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10,
  },
  modalIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#FEF2F2", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0F172A", marginBottom: 8 },
  modalMessage: { fontSize: 14, color: "#64748B", textAlign: "center", marginBottom: 24, lineHeight: 22 },
  modalActions: { flexDirection: "row", width: "100%", gap: 12 },
  modalCancelBtn: { flex: 1, backgroundColor: "#F1F5F9", paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  modalCancelBtnText: { color: "#475569", fontSize: 15, fontWeight: "600" },
  modalConfirmBtn: { flex: 1, backgroundColor: "#DC2626", paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  modalConfirmBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
