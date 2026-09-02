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
}: ProductFormProps) {
  const isSubmittingOrUploading = submitting || uploadingImage;

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <View style={styles.formContainer}>
          <FormField
            label="Product Name *"
            value={form.prod_name}
            onChangeText={(val) => onChange("prod_name", val)}
            placeholder="Product Name"
          />

          <FormField
            label="Description"
            multiline
            value={form.description}
            onChangeText={(val) => onChange("description", val)}
            placeholder="Product Description"
          />

          <ImagePickerField
            label="Product Image"
            imageUri={imageUri}
            loading={imageLoading}
            uploading={uploadingImage}
            onPickLibrary={onPickLibrary}
            onTakePhoto={onTakePhoto}
            onClear={onClearImage}
          />

          <FormField
            label="Or enter Image URL directly (Optional)"
            value={form.image_url}
            onChangeText={(val) => onChange("image_url", val)}
            placeholder="https://example.com/image.jpg or /uploads/..."
            hintText="*If an image is selected above, it will be uploaded and filled automatically on save."
          />

          <View style={styles.row}>
            <FormField
              containerStyle={{ flex: 1 }}
              label="Price *"
              labelNumberOfLines={1}
              keyboardType="decimal-pad"
              value={form.price}
              onChangeText={(val) => onChange("price", val)}
              placeholder="0.00"
            />
            <FormField
              containerStyle={{ flex: 1 }}
              label="Currency"
              labelNumberOfLines={1}
              value={form.currency}
              onChangeText={(val) => onChange("currency", val)}
              placeholder="THB"
            />
            <FormField
              containerStyle={{ flex: 1 }}
              label="Discount (%)"
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
              label="Stock Quantity"
              keyboardType="number-pad"
              value={form.stock_count}
              onChangeText={(val) => onChange("stock_count", val)}
              placeholder="0"
            />
            <View style={[styles.formControl, { flex: 1 }]}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={[styles.formInput, styles.dropdownButton]}
                onPress={() => onToggleCategoryModal(true)}
              >
                <Text style={styles.dropdownButtonText} numberOfLines={1}>
                  {selectedCategory ? selectedCategory.cate_name : "Select category..."}
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
                  {uploadingImage ? "Uploading image..." : "Saving..."}
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
            <Text style={styles.modalTitle}>Select Category</Text>
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
              <Text style={styles.modalCloseText}>Cancel</Text>
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
    color: "#334155",
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  dropdownButtonText: {
    fontSize: 15,
    color: "#0F172A",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#94A3B8",
    marginLeft: 8,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnSubmit: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnDisabled: {
    backgroundColor: "#93C5FD",
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Modal Styles */
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

  /* Test Button Styles */
  btnTest: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  btnTestTxt: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
});
