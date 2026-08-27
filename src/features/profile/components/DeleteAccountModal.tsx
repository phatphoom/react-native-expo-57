import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteAccountModal({ visible, loading, onClose, onConfirm }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="warning" size={32} color="#DC2626" />
          </View>
          <Text style={styles.title}>ลบบัญชีผู้ใช้งาน?</Text>
          <Text style={styles.message}>
            คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้นี้? การกระทำนี้ไม่สามารถย้อนกลับได้
            ข้อมูลส่วนตัว ข้อมูลร้านค้า และประวัติทั้งหมดของคุณจะถูกลบอย่างถาวร
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.cancelBtnText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.confirmBtnText}>ยืนยันการลบบัญชี</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#DC2626", marginBottom: 8 },
  message: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBtnText: { color: "#475569", fontSize: 15, fontWeight: "600" },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
});
