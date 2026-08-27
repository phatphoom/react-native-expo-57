import { useProfile } from "@/features/auth/hooks";
import {
  AccountSettingsCard,
  AvatarOptionsModal,
  ChangePasswordModal,
  DeleteAccountModal,
  EditProfileModal,
  InfoModal,
  LogoutModal,
  OtherSettingsCard,
  PersonalDetailsCard,
  ProfileHeroCard,
} from "@/features/profile/components";
import { useChangePassword } from "@/features/profile/hooks/useChangePassword";
import { useDeleteAccount } from "@/features/profile/hooks/useDeleteAccount";
import { useInfoModals } from "@/features/profile/hooks/useInfoModals";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
        <PersonalDetailsCard
          phoneNumber={profile?.phone_number}
          address={profile?.address}
        />

        {/* Account Settings */}
        <AccountSettingsCard
          onEditProfile={openEditModal}
          onChangePassword={changePassword.open}
          onDeleteAccount={deleteAccount.open}
        />

        {/* Others */}
        <OtherSettingsCard
          onPrivacyPolicy={infoModals.openPrivacyPolicy}
          onTermsOfService={infoModals.openTermsOfService}
          onHelpSupport={infoModals.openHelpSupport}
          onAboutApp={infoModals.openAboutApp}
          appVersion="v1.0.0"
        />

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
          <Text style={styles.footerCopyrightText}>
            © 2026 E-Commerce System. All Rights Reserved.
          </Text>
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
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 4,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  footerVersionContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 4,
  },
  footerVersionText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  footerCopyrightText: {
    fontSize: 11,
    color: "#94A3B8",
  },
});
