import { useState } from "react";
import { AuthApi } from "@/features/auth/api/authApi";
import { showAlert } from "@/shared/utils";

export function useResetPasswordForm() {
  const [visible, setVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPass, setResetNewPass] = useState("");
  const [resetConfirmPass, setResetConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const open = (prefillEmail = "") => {
    setResetEmail(prefillEmail);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setResetEmail("");
    setResetNewPass("");
    setResetConfirmPass("");
    setShowNewPass(false);
    setShowConfirmPass(false);
  };

  const handleSubmit = async () => {
    if (!resetEmail || !resetNewPass || !resetConfirmPass) {
      showAlert("Error", "Please fill in all fields");
      return;
    }
    if (resetNewPass.length < 6) {
      showAlert("Error", "New password must be at least 6 characters long");
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      showAlert("Error", "New password and confirmation do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthApi.resetPassword({
        email: resetEmail.trim(),
        new_password: resetNewPass,
        confirm_password: resetConfirmPass,
      });
      close();
      showAlert(
        "Success",
        res?.message ||
          "Password reset successfully. You can now log in with your new password."
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email ||
        err?.message ||
        "Failed to reset password";
      showAlert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    visible,
    resetEmail,
    resetNewPass,
    resetConfirmPass,
    loading,
    showNewPass,
    showConfirmPass,
    open,
    close,
    setResetEmail,
    setResetNewPass,
    setResetConfirmPass,
    toggleShowNewPass: () => setShowNewPass((v) => !v),
    toggleShowConfirmPass: () => setShowConfirmPass((v) => !v),
    handleSubmit,
  };
}
