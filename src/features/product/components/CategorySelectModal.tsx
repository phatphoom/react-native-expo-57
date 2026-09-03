import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { Category } from "@/types/product";

export interface CategorySelectModalProps {
  visible: boolean;
  categories: Category[];
  selectedCategoryId?: string | number;
  onSelectCategory: (cateId: string) => void;
  onClose: () => void;
}

export function CategorySelectModal({
  visible,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onClose,
}: CategorySelectModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => String(item.cate_id)}
            renderItem={({ item }) => {
              const isSelected = String(item.cate_id) === String(selectedCategoryId);
              return (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelectCategory(String(item.cate_id));
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      isSelected && styles.modalItemTextSelected,
                    ]}
                  >
                    {item.cate_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  modalItemText: {
    fontSize: 15,
    color: "#334155",
    textAlign: "center",
  },
  modalItemTextSelected: {
    color: "#2563EB",
    fontWeight: "700",
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 13,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 15,
    color: "#EF4444",
    fontWeight: "600",
  },
});
