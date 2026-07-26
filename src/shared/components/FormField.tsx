import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface FormFieldProps extends TextInputProps {
  label: string;
  labelNumberOfLines?: number;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  hintText?: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  labelNumberOfLines,
  containerStyle,
  inputStyle,
  labelStyle,
  hintText,
  error,
  multiline,
  style,
  ...textInputProps
}) => {
  return (
    <View style={[styles.formControl, containerStyle]}>
      <Text style={[styles.label, labelStyle]} numberOfLines={labelNumberOfLines}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.formInput,
          multiline && styles.multilineInput,
          inputStyle,
          style,
        ]}
        multiline={multiline}
        placeholderTextColor="#999"
        {...textInputProps}
      />
      {hintText ? <Text style={styles.hintText}>{hintText}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  formControl: {
    marginBottom: 16,
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
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  hintText: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
});
