import { useState } from "react";
import { AuthApi } from "@/features/auth/api/authApi";
import { showAlert } from "@/shared/utils";

export function useDeleteAccount(onSuccess: () => Promise<void>) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await AuthApi.deleteAccount();
      setVisible(false);
      showAlert("ลบบัญชีสำเร็จ", "บัญชีของคุณถูกลบออกจากระบบเรียบร้อยแล้ว");
      await onSuccess();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || "ไม่สามารถลบบัญชีได้";
      showAlert("ข้อผิดพลาด", msg);
    } finally {
      setLoading(false);
    }
  };

  return { visible, loading, open, close, handleConfirm };
}
