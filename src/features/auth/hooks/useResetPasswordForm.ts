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
      showAlert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    if (resetNewPass.length < 6) {
      showAlert("ข้อผิดพลาด", "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    if (resetNewPass !== resetConfirmPass) {
      showAlert("ข้อผิดพลาด", "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
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
        "สำเร็จ",
        res?.message ||
          "รีเซ็ตรหัสผ่านเรียบร้อยแล้ว คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที"
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.email ||
        err?.message ||
        "ไม่สามารถรีเซ็ตรหัสผ่านได้";
      showAlert("ข้อผิดพลาด", msg);
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
