import { Alert, Platform } from "react-native";

type AlertButton = {
  text?: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

/**
 * Universal alert that supports Web (window.alert / window.confirm) and Native (iOS / Android Alert.alert)
 */
export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === "web") {
    const fullMessage = `${title}${message ? `\n\n${message}` : ""}`;
    if (!buttons || buttons.length <= 1) {
      window.alert(fullMessage);
      if (buttons && buttons[0]?.onPress) {
        buttons[0].onPress();
      }
    } else {
      // If there are 2 or more buttons (e.g., cancel + confirm)
      const confirmed = window.confirm(fullMessage);
      if (confirmed) {
        const confirmBtn = buttons.find((b) => b.style !== "cancel") || buttons[1];
        if (confirmBtn?.onPress) confirmBtn.onPress();
      } else {
        const cancelBtn = buttons.find((b) => b.style === "cancel") || buttons[0];
        if (cancelBtn?.onPress) cancelBtn.onPress();
      }
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};
