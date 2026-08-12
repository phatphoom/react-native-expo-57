import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FormField, ImagePickerField } from "@/shared/components";
import type { Category } from "@/types/product";
import type { ProductFormValues } from "@/features/product/hooks/useProductForm";

export interface ProductFormProps {
  form: ProductFormValues;
  categories: Category[];
  selectedCategory?: Category;
  showCategoryModal: boolean;
  submitting: boolean;
  uploadingImage: boolean;
  imageUri: string | null;
  imageLoading: boolean;
  submitButtonText: string;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onPickLibrary: () => void;
  onTakePhoto: () => void;
  onClearImage: () => void;
  onToggleCategoryModal: (show: boolean) => void;
  onSubmit: () => void;
  onFillDummyData?: () => void;
}

export default function ProductForm({
  form,
  categories,
  selectedCategory,
  showCategoryModal,
  submitting,
  uploadingImage,
  imageUri,
  imageLoading,
  submitButtonText,
  onChange,
  onPickLibrary,
  onTakePhoto,
  onClearImage,
  onToggleCategoryModal,
  onSubmit,
  onFillDummyData,
}: ProductFormProps) {
  const isSubmittingOrUploading = submitting || uploadingImage;

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ปุ่มสำหรับสุ่มข้อมูลทดสอบ (มีเมื่อผ่าน prop onFillDummyData) */}
        {onFillDummyData && (
          <TouchableOpacity style={styles.btnTest} onPress={onFillDummyData}>
            <Text style={styles.btnTestTxt}>🧪 สุ่มใส่ข้อมูลทดสอบ (Auto-fill Test Data)</Text>
          </TouchableOpacity>
        )}

        <View style={styles.formContainer}>
          <FormField
            label="ชื่อสินค้า *"
            value={form.prod_name}
            onChangeText={(val) => onChange("prod_name", val)}
            placeholder="Product Name"
          />

          <FormField
            label="รายละเอียด"
            multiline
            value={form.description}
            onChangeText={(val) => onChange("description", val)}
            placeholder="Product Description"
          />

          <ImagePickerField
            label="รูปภาพสินค้า"
            imageUri={imageUri}
            loading={imageLoading}
            uploading={uploadingImage}
            onPickLibrary={onPickLibrary}
            onTakePhoto={onTakePhoto}
            onClear={onClearImage}
          />

          <FormField
            label="หรือระบุ URL รูปภาพโดยตรง (Optional)"
            value={form.image_url}
            onChangeText={(val) => onChange("image_url", val)}
            placeholder="https://example.com/image.jpg หรือ /uploads/..."
            hintText="*หากเลือกรูปภาพด้านบน ระบบจะอัปโหลดและนำ URL มาใส่ให้อัตโนมัติเมื่อกดบันทึก"
          />

          <View style={styles.row}>
            <FormField
              containerStyle={{ flex: 1 }}
              label="ราคา *"
              labelNumberOfLines={1}
              keyboardType="decimal-pad"
              value={form.price}
              onChangeText={(val) => onChange("price", val)}
              placeholder="0.00"
            />
            <FormField
              containerStyle={{ flex: 1 }}
              label="สกุลเงิน"
              labelNumberOfLines={1}
              value={form.currency}
              onChangeText={(val) => onChange("currency", val)}
              placeholder="THB"
            />
            <FormField
              containerStyle={{ flex: 1 }}
              label="ลด (%)"
              labelNumberOfLines={1}
              keyboardType="number-pad"
              value={form.discount_pct}
              onChangeText={(val) => onChange("discount_pct", val)}
              placeholder="0"
            />
          </View>

          <View style={styles.row}>
            <FormField
              containerStyle={{ flex: 1 }}
              label="จำนวนในสต็อก"
              keyboardType="number-pad"
              value={form.stock_count}
              onChangeText={(val) => onChange("stock_count", val)}
              placeholder="0"
            />
            <View style={[styles.formControl, { flex: 1 }]}>
              <Text style={styles.label}>หมวดหมู่</Text>
              <TouchableOpacity
                style={[styles.formInput, styles.dropdownButton]}
                onPress={() => onToggleCategoryModal(true)}
              >
                <Text style={styles.dropdownButtonText} numberOfLines={1}>
                  {selectedCategory ? selectedCategory.cate_name : "เลือกหมวดหมู่..."}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btnSubmit, isSubmittingOrUploading && styles.btnDisabled]}
            onPress={onSubmit}
            disabled={isSubmittingOrUploading}
          >
            {isSubmittingOrUploading ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <ActivityIndicator color="#fff" />
                <Text style={styles.btnTxt}>
                  {uploadingImage ? "กำลังอัปโหลดรูปภาพ..." : "กำลังบันทึก..."}
                </Text>
              </View>
            ) : (
              <Text style={styles.btnTxt}>{submitButtonText}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Modal เลือก Category */}
      <Modal visible={showCategoryModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>เลือกหมวดหมู่</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => String(item.cate_id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onChange("cate_id", String(item.cate_id));
                    onToggleCategoryModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      String(item.cate_id) === String(form.cate_id) && styles.modalItemTextSelected,
                    ]}
                  >
                    {item.cate_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => onToggleCategoryModal(false)}
            >
              <Text style={styles.modalCloseText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
  formContainer: {
    marginTop: 10,
  },
  formControl: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnSubmit: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnDisabled: {
    backgroundColor: "#A0CFFF",
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  modalItemTextSelected: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "600",
  },

  /* Test Button Styles */
  btnTest: {
    backgroundColor: "#E8F2FF",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  btnTestTxt: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
