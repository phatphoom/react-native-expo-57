import { useState } from "react";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return {
    user,
    showLogoutModal,
    setShowLogoutModal,
    handleLogout,
  };
}
