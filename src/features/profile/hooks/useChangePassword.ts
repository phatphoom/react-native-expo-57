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
      showAlert("Error", "Please fill in all password fields");
      return;
    }
    if (newPassword.length < 6) {
      showAlert("Error", "New password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert("Error", "New password and confirmation do not match");
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
      showAlert("Success", res?.message || "Password changed successfully");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.current_password ||
        err?.message ||
        "Failed to change password";
      showAlert("Error", msg);
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
