import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
  isPassword?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  labelNumberOfLines,
  containerStyle,
  inputStyle,
  labelStyle,
  hintText,
  error,
  isPassword,
  multiline,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.formControl, containerStyle]}>
      <Text style={[styles.label, labelStyle]} numberOfLines={labelNumberOfLines}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.formInput,
            isFocused && styles.formInputFocused,
            error && styles.formInputError,
            multiline && styles.multilineInput,
            isPassword && { paddingRight: 45 },
            inputStyle,
            style,
          ]}
          multiline={multiline}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword && !showPassword}
          onFocus={(e) => {
            setIsFocused(true);
            if (textInputProps.onFocus) textInputProps.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (textInputProps.onBlur) textInputProps.onBlur(e);
          }}
          {...textInputProps}
        />
        {isPassword && (
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#94A3B8"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
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
    color: "#334155",
    marginBottom: 6,
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
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
  formInputFocused: {
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
  },
  formInputError: {
    borderColor: "#EF4444",
  },
  multilineInput: {
    height: 90,
    textAlignVertical: "top",
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
  },
  hintText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    fontWeight: "500",
  },
});
