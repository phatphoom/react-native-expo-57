import { useState } from "react";
import { AuthApi } from "@/features/auth/api/authApi";
import { showAlert } from "@/shared/utils";

export function useChangePassword() {
  const [visible, setVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = () => setVisible(true);

  const close = () => {
    setVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPass(false);
    setShowNewPass(false);
    setShowConfirmPass(false);
  };

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert("ข้อผิดพลาด", "กรุณากรอกข้อมูลรหัสผ่านให้ครบทุกช่อง");
      return;
    }
    if (newPassword.length < 6) {
      showAlert("ข้อผิดพลาด", "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert("ข้อผิดพลาด", "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      close();
      showAlert("สำเร็จ", res?.message || "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.current_password ||
        err?.message ||
        "ไม่สามารถเปลี่ยนรหัสผ่านได้";
      showAlert("ข้อผิดพลาด", msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    visible,
    currentPassword,
    newPassword,
    confirmPassword,
    showCurrentPass,
    showNewPass,
    showConfirmPass,
    loading,
    open,
    close,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    toggleCurrentPass: () => setShowCurrentPass((v) => !v),
    toggleNewPass: () => setShowNewPass((v) => !v),
    toggleConfirmPass: () => setShowConfirmPass((v) => !v),
    handleSubmit,
  };
}
