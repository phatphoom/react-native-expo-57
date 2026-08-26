import { useProfile } from "@/features/auth/hooks";
import { AuthApi } from "@/features/auth/api/authApi";
import { useUserProfile } from "@/features/profile/hooks/useUserProfile";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { showLogoutModal, setShowLogoutModal, handleLogout } = useProfile();
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
    birthDateInput,
    fullAvatarUrl,
    displayName,
    setFirstNameInput,
    setLastNameInput,
    setPhoneNumberInput,
    setAddressInput,
    setBirthDateInput,
    openEditModal,
    closeEditModal,
    handleSaveProfile,
    handleUploadAndChangeAvatar,
  } = useUserProfile();

  // Avatar Modal State
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  // Change Password Modal State
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);

  // Delete Account Modal State
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  // Info Modal State (Privacy Policy, Terms of Service, About App, Help)
  const [infoModal, setInfoModal] = useState<{
    visible: boolean;
    title: string;
    subtitle?: string;
    sections: { heading?: string; body: string }[];
  }>({
    visible: false,
    title: "",
    subtitle: "",
    sections: [],
  });

  const handleAvatarPress = () => {
    setShowAvatarOptions(true);
  };

  // Change Password Handler
  const handleChangePasswordSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลรหัสผ่านให้ครบทุกช่อง");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setPasswordChanging(true);
    try {
      const res = await AuthApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setShowChangePasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      Alert.alert("สำเร็จ", res?.message || "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.current_password ||
        err?.message ||
        "ไม่สามารถเปลี่ยนรหัสผ่านได้";
      Alert.alert("ข้อผิดพลาด", msg);
    } finally {
      setPasswordChanging(false);
    }
  };

  // Delete Account Handler
  const handleDeleteAccountConfirm = async () => {
    setDeletingAccount(true);
    try {
      await AuthApi.deleteAccount();
      setShowDeleteAccountModal(false);
      Alert.alert("ลบบัญชีสำเร็จ", "บัญชีของคุณถูกลบออกจากระบบเรียบร้อยแล้ว");
      await handleLogout();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "ไม่สามารถลบบัญชีได้";
      Alert.alert("ข้อผิดพลาด", msg);
    } finally {
      setDeletingAccount(false);
    }
  };

  // Open Privacy Policy Modal
  const openPrivacyPolicy = () => {
    setInfoModal({
      visible: true,
      title: "นโยบายความเป็นส่วนตัว",
      subtitle: "Privacy Policy (อัปเดตล่าสุด สิงหาคม 2026)",
      sections: [
        {
          heading: "1. การเก็บรวบรวมข้อมูลส่วนบุคคล",
          body: "เราเก็บรวบรวมข้อมูลที่คุณระบุระหว่างการลงทะเบียนและแก้ไขข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อีเมล เบอร์โทรศัพท์ วันเกิด ที่อยู่ และรูปภาพโปรไฟล์ เพื่อใช้ในการระบุตัวตนและให้บริการจัดการร้านค้าอย่างมีประสิทธิภาพ",
        },
        {
          heading: "2. วัตถุประสงค์การใช้ข้อมูล",
          body: "ข้อมูลของคุณจะถูกใช้เพื่อการเข้าสู่ระบบ การจัดการสิทธิ์การเข้าถึง การส่งการแจ้งเตือนสำคัญเกี่ยวกับบัญชี และการปรับปรุงประสิทธิภาพการทำงานของแอปพลิเคชัน",
        },
        {
          heading: "3. การรักษาความปลอดภัยของข้อมูล",
          body: "เราใช้มาตรการรักษาความปลอดภัยตามมาตรฐานสากล มีการเข้ารหัสโทเค็นยืนยันตัวตน (JWT) และจัดเก็บข้อมูลอย่างปลอดภัยบนเซิร์ฟเวอร์",
        },
        {
          heading: "4. สิทธิของเจ้าของข้อมูล",
          body: "คุณมีสิทธิ์เข้าถึง แก้ไข หรือขอลบบัญชีและข้อมูลส่วนบุคคลของคุณได้ตลอดเวลาผ่านเมนูการตั้งค่าบัญชีในแอปพลิเคชัน",
        },
      ],
    });
  };

  // Open Terms of Service Modal
  const openTermsOfService = () => {
    setInfoModal({
      visible: true,
      title: "เงื่อนไขการใช้งาน",
      subtitle: "Terms of Service",
      sections: [
        {
          heading: "1. การยอมรับข้อกำหนด",
          body: "การเข้าใช้งานแอปพลิเคชันนี้ถือว่าคุณได้อ่าน เข้าใจ และตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานทั้งหมดที่ระบุไว้นี้",
        },
        {
          heading: "2. บัญชีผู้ใช้และความปลอดภัย",
          body: "คุณมีหน้าที่รับผิดชอบในการรักษาความลับของชื่อผู้ใช้และรหัสผ่านของคุณ รวมถึงกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ",
        },
        {
          heading: "3. ข้อห้ามในการใช้งาน",
          body: "ห้ามมิให้กระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายต่อระบบ ละเมิดสิทธิ์ของผู้อื่น หรืออัปโหลดเนื้อหาที่ผิดกฎหมายเข้ามาในระบบ",
        },
        {
          heading: "4. การระงับการให้บริการ",
          body: "เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกการให้บริการแก่ผู้ใช้งานที่ละเมิดข้อกำหนดและเงื่อนไขการใช้งานโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
        },
      ],
    });
  };

  // Open About App Modal
  const openAboutApp = () => {
    setInfoModal({
      visible: true,
      title: "เกี่ยวกับแอปพลิเคชัน",
      subtitle: "About Application & Version Info",
      sections: [
        {
          heading: "ข้อมูลเวอร์ชัน (Version)",
          body: "เวอร์ชันปัจจุบัน: v1.0.0 (Build 100)\nสภาพแวดล้อม: React Native Expo 57 / Web",
        },
        {
          heading: "เกี่ยวกับระบบ",
          body: "แอปพลิเคชันสำหรับจัดการระบบร้านค้าและสินค้า (Store & Inventory Management System) รองรับการแสดงผลสินค้า จัดการหมวดหมู่ ตรวจสอบโปรไฟล์ และเชื่อมต่อ RESTful API เต็มรูปแบบ",
        },
        {
          heading: "ลิขสิทธิ์และการพัฒนา",
          body: "© 2026 E-Commerce System. All Rights Reserved.\nออกแบบและพัฒนาโดยทีมงานผู้เชี่ยวชาญ",
        },
      ],
    });
  };

  // Open Help & Support Modal
  const openHelpSupport = () => {
    setInfoModal({
      visible: true,
      title: "ศูนย์ช่วยเหลือ",
      subtitle: "Help & Support Center",
      sections: [
        {
          heading: "ติดต่อเรา",
          body: "หากคุณพบปัญหาในการใช้งานหรือมีข้อสงสัย สามารถติดต่อทีมงานสนับสนุนได้ที่:\nอีเมล: support@ecommerce-app.com\nเบอร์โทรศัพท์: 02-123-4567 (จันทร์-ศุกร์ 09:00 - 18:00 น.)",
        },
        {
          heading: "คำถามที่พบบ่อย (FAQ)",
          body: "• ลืมรหัสผ่าน: ติดต่อผู้ดูแลระบบเพื่อขอรีเซ็ตรหัสผ่าน\n• เปลี่ยนรูปโปรไฟล์: กดที่รูปโปรไฟล์ในหน้านี้แล้วเลือกรูปภาพที่ต้องการ\n• แก้ไขข้อมูลสินค้า: เข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบ (Admin)",
        },
      ],
    });
  };

  const renderMenuItem = (
    icon: any,
    title: string,
    isDestructive = false,
    badgeText?: string,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.menuIconContainer,
          isDestructive && styles.menuIconDestructive,
        ]}
      >
        {icon}
      </View>
      <Text
        style={[
          styles.menuItemText,
          isDestructive && styles.menuItemTextDestructive,
        ]}
      >
        {title}
      </Text>
      {badgeText ? (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{badgeText}</Text>
        </View>
      ) : null}
      <Ionicons
        name="chevron-forward"
        size={18}
        color={isDestructive ? "#FCA5A5" : "#CBD5E1"}
        style={styles.menuItemArrow}
      />
    </TouchableOpacity>
  );

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
        <View style={styles.heroCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {fullAvatarUrl ? (
                <Image
                  source={{ uri: fullAvatarUrl }}
                  style={styles.avatarImage}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <Ionicons name="person" size={48} color="#94A3B8" />
              )}
              {uploadingAvatar && (
                <View style={styles.avatarLoadingOverlay}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.editAvatarBtn}
              onPress={handleAvatarPress}
              activeOpacity={0.8}
              disabled={uploadingAvatar}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          {profile?.first_name || profile?.last_name ? (
            <Text style={styles.userSubName}>@{profile?.username || user?.username}</Text>
          ) : null}
          <Text style={styles.userEmail}>{profile?.email || user?.email || "ไม่มีอีเมล"}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {(profile?.role || user?.role || "MEMBER").toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Personal Details Section */}
        <Text style={styles.sectionTitle}>ข้อมูลส่วนตัว</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={[styles.infoIconBox, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
              <Ionicons name="call-outline" size={18} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>เบอร์โทรศัพท์</Text>
              <Text style={styles.infoValue}>
                {profile?.phone_number || "ยังไม่ได้ระบุ"}
              </Text>
            </View>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoRow}>
            <View style={[styles.infoIconBox, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
              <Ionicons name="calendar-outline" size={18} color="#10B981" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>วันเกิด</Text>
              <Text style={styles.infoValue}>
                {profile?.birth_date || "ยังไม่ได้ระบุ"}
              </Text>
            </View>
          </View>

          <View style={styles.infoDivider} />

          <View style={styles.infoRow}>
            <View style={[styles.infoIconBox, { backgroundColor: "rgba(245, 158, 11, 0.1)" }]}>
              <Ionicons name="location-outline" size={18} color="#F59E0B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>ที่อยู่</Text>
              <Text style={styles.infoValue}>
                {profile?.address || "ยังไม่ได้ระบุ"}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Settings Section */}
        <Text style={styles.sectionTitle}>การตั้งค่าบัญชี</Text>
        <View style={styles.menuCard}>
          {renderMenuItem(
            <Ionicons name="person-outline" size={20} color="#3B82F6" />,
            "แก้ไขข้อมูลส่วนตัว",
            false,
            undefined,
            openEditModal
          )}
          {renderMenuItem(
            <Ionicons name="key-outline" size={20} color="#8B5CF6" />,
            "เปลี่ยนรหัสผ่าน",
            false,
            undefined,
            () => setShowChangePasswordModal(true)
          )}
          {renderMenuItem(
            <Ionicons name="notifications-outline" size={20} color="#F59E0B" />,
            "การแจ้งเตือน",
            false,
            undefined,
            () => Alert.alert("การแจ้งเตือน", "เปิดใช้งานการแจ้งเตือนสถานะคำสั่งซื้อและข่าวสารเรียบร้อยแล้ว")
          )}
          
          <View style={styles.menuDivider} />

          {/* Danger Zone: Delete Account */}
          {renderMenuItem(
            <Ionicons name="trash-outline" size={20} color="#DC2626" />,
            "ลบบัญชีผู้ใช้ (Danger Zone)",
            true,
            undefined,
            () => setShowDeleteAccountModal(true)
          )}
        </View>

        {/* Others Section (Privacy, Terms, About, Help) */}
        <Text style={styles.sectionTitle}>อื่นๆ</Text>
        <View style={styles.menuCard}>
          {renderMenuItem(
            <Ionicons name="shield-checkmark-outline" size={20} color="#3B82F6" />,
            "นโยบายความเป็นส่วนตัว (Privacy Policy)",
            false,
            undefined,
            openPrivacyPolicy
          )}
          {renderMenuItem(
            <Ionicons name="document-text-outline" size={20} color="#64748B" />,
            "เงื่อนไขการใช้งาน (Terms of Service)",
            false,
            undefined,
            openTermsOfService
          )}
          {renderMenuItem(
            <Ionicons name="help-circle-outline" size={20} color="#10B981" />,
            "ความช่วยเหลือ",
            false,
            undefined,
            openHelpSupport
          )}
          {renderMenuItem(
            <Ionicons name="information-circle-outline" size={20} color="#6366F1" />,
            "เกี่ยวกับแอป (About App)",
            false,
            "v1.0.0",
            openAboutApp
          )}
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

        {/* Footer Version Info */}
        <View style={styles.footerVersionContainer}>
          <Text style={styles.footerVersionText}>App Version v1.0.0</Text>
          <Text style={styles.footerCopyrightText}>© 2026 E-Commerce System. All Rights Reserved.</Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={{ width: "100%", maxHeight: "90%" }}
            contentContainerStyle={styles.editModalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.editModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>แก้ไขข้อมูลส่วนตัว</Text>
                <TouchableOpacity onPress={closeEditModal} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Ionicons name="close" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Avatar Preview & Change in Modal */}
              <View style={styles.modalAvatarSection}>
                <View style={styles.modalAvatarContainer}>
                  {fullAvatarUrl ? (
                    <Image source={{ uri: fullAvatarUrl }} style={styles.modalAvatarImage} contentFit="cover" transition={200} />
                  ) : (
                    <Ionicons name="person" size={40} color="#94A3B8" />
                  )}
                  {uploadingAvatar && (
                    <View style={styles.avatarLoadingOverlay}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.changeAvatarModalBtn}
                  onPress={() => {
                    setShowAvatarOptions(true);
                  }}
                  disabled={uploadingAvatar}
                >
                  <Ionicons name="camera-outline" size={16} color="#3B82F6" />
                  <Text style={styles.changeAvatarModalBtnText}>เปลี่ยนรูปโปรไฟล์</Text>
                </TouchableOpacity>
              </View>

              {/* Form Inputs */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ชื่อ (First Name)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="กรอกชื่อจริง"
                  placeholderTextColor="#94A3B8"
                  value={firstNameInput}
                  onChangeText={setFirstNameInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>นามสกุล (Last Name)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="กรอกนามสกุล"
                  placeholderTextColor="#94A3B8"
                  value={lastNameInput}
                  onChangeText={setLastNameInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>เบอร์โทรศัพท์ (Phone Number)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="เช่น 0812345678"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={phoneNumberInput}
                  onChangeText={setPhoneNumberInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>วันเกิด (Birth Date)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="เช่น 1995-05-15 (YYYY-MM-DD)"
                  placeholderTextColor="#94A3B8"
                  value={birthDateInput}
                  onChangeText={setBirthDateInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ที่อยู่ (Address)</Text>
                <TextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  placeholder="กรอกที่อยู่ของคุณ"
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={3}
                  value={addressInput}
                  onChangeText={setAddressInput}
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelBtn}
                  onPress={closeEditModal}
                  disabled={updating}
                >
                  <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSaveBtn}
                  onPress={handleSaveProfile}
                  disabled={updating}
                >
                  {updating ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.modalSaveBtnText}>บันทึกข้อมูล</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showChangePasswordModal}
        onRequestClose={() => setShowChangePasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={[styles.infoIconBox, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
                  <Ionicons name="key" size={20} color="#8B5CF6" />
                </View>
                <Text style={styles.modalTitle}>เปลี่ยนรหัสผ่าน</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowChangePasswordModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>รหัสผ่านปัจจุบัน (Current Password)</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="กรอกรหัสผ่านปัจจุบัน"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showCurrentPass}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPass(!showCurrentPass)}
                  style={styles.eyeIconBtn}
                >
                  <Ionicons
                    name={showCurrentPass ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>รหัสผ่านใหม่ (New Password)</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showNewPass}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPass(!showNewPass)}
                  style={styles.eyeIconBtn}
                >
                  <Ionicons
                    name={showNewPass ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ยืนยันรหัสผ่านใหม่ (Confirm Password)</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordTextInput}
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPass}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPass(!showConfirmPass)}
                  style={styles.eyeIconBtn}
                >
                  <Ionicons
                    name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowChangePasswordModal(false)}
                disabled={passwordChanging}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleChangePasswordSubmit}
                disabled={passwordChanging}
              >
                {passwordChanging ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalSaveBtnText}>บันทึกรหัสผ่าน</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal (Danger Zone) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteAccountModal}
        onRequestClose={() => setShowDeleteAccountModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalIconContainer, { backgroundColor: "#FEE2E2" }]}>
              <Ionicons name="warning" size={32} color="#DC2626" />
            </View>
            <Text style={[styles.modalTitle, { color: "#DC2626" }]}>ลบบัญชีผู้ใช้งาน?</Text>
            <Text style={styles.modalMessage}>
              คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้นี้? การกระทำนี้ไม่สามารถย้อนกลับได้ ข้อมูลส่วนตัว ข้อมูลร้านค้า และประวัติทั้งหมดของคุณจะถูกลบอย่างถาวร
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowDeleteAccountModal(false)}
                disabled={deletingAccount}
              >
                <Text style={styles.modalCancelBtnText}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleDeleteAccountConfirm}
                disabled={deletingAccount}
              >
                {deletingAccount ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalConfirmBtnText}>ยืนยันการลบบัญชี</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Info Modal (Privacy Policy, Terms of Service, About App, Help) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModal.visible}
        onRequestClose={() => setInfoModal((prev) => ({ ...prev, visible: false }))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalCard}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={styles.modalTitle}>{infoModal.title}</Text>
                {infoModal.subtitle ? (
                  <Text style={styles.infoModalSubtitle}>{infoModal.subtitle}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => setInfoModal((prev) => ({ ...prev, visible: false }))}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.infoModalScrollView}
              contentContainerStyle={{ paddingVertical: 12 }}
              showsVerticalScrollIndicator={false}
            >
              {infoModal.sections.map((sec, idx) => (
                <View key={idx} style={styles.infoSectionBox}>
                  {sec.heading ? (
                    <Text style={styles.infoSectionHeading}>{sec.heading}</Text>
                  ) : null}
                  <Text style={styles.infoSectionBody}>{sec.body}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.infoModalCloseBtn}
              onPress={() => setInfoModal((prev) => ({ ...prev, visible: false }))}
              activeOpacity={0.8}
            >
              <Text style={styles.infoModalCloseBtnText}>ปิดหน้าต่าง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Select Avatar Source Modal / Action Sheet */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAvatarOptions}
        onRequestClose={() => setShowAvatarOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAvatarOptions(false)}
        >
          <View style={styles.actionSheetContent}>
            <Text style={styles.actionSheetTitle}>เลือกรูปโปรไฟล์</Text>

            <TouchableOpacity
              style={styles.actionSheetOption}
              onPress={() => {
                setShowAvatarOptions(false);
                handleUploadAndChangeAvatar(false);
              }}
            >
              <Ionicons name="images-outline" size={22} color="#3B82F6" />
              <Text style={styles.actionSheetOptionText}>เลือกจากคลังภาพ (Gallery)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionSheetOption}
              onPress={() => {
                setShowAvatarOptions(false);
                handleUploadAndChangeAvatar(true);
              }}
            >
              <Ionicons name="camera-outline" size={22} color="#10B981" />
              <Text style={styles.actionSheetOptionText}>ถ่ายภาพด้วยกล้อง (Camera)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionSheetCancelBtn}
              onPress={() => setShowAvatarOptions(false)}
            >
              <Text style={styles.actionSheetCancelBtnText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
    marginBottom: 20,
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
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarLoadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 2,
  },
  userSubName: {
    fontSize: 13,
    color: "#64748B",
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
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "600",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 6,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 6,
    marginBottom: 20,
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
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuIconDestructive: {
    backgroundColor: "#FEF2F2",
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  menuItemTextDestructive: {
    color: "#DC2626",
    fontWeight: "600",
  },
  menuBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  menuBadgeText: {
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "700",
  },
  menuItemArrow: {
    marginLeft: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 4,
    marginHorizontal: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  editModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  editModalScrollContent: {
    paddingVertical: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  modalMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalAvatarSection: {
    alignItems: "center",
    marginBottom: 18,
  },
  modalAvatarContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  modalAvatarImage: {
    width: "100%",
    height: "100%",
  },
  changeAvatarModalBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  changeAvatarModalBtnText: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: "#0F172A",
  },
  textAreaInput: {
    minHeight: 72,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
  },
  passwordTextInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: "#0F172A",
  },
  eyeIconBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 10,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalCancelBtnText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalConfirmBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  modalSaveBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  infoModalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    width: "100%",
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  infoModalSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  infoModalScrollView: {
    marginVertical: 12,
  },
  infoSectionBox: {
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  infoSectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  infoSectionBody: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  infoModalCloseBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  infoModalCloseBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  actionSheetContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
    textAlign: "center",
  },
  actionSheetOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  actionSheetOptionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  actionSheetCancelBtn: {
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  actionSheetCancelBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
});
