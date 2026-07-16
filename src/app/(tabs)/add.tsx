import HeaderBar from "@/shared/components/AppHeader";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Add Product" />
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <View stlye={styles.formContainer}>
        <View>
          <Text>Name*</Text>
          <TextInput style={styles.form} />
        </View>
        <View>
          <Text>Description</Text>
          <TextInput style={styles.form} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: "black",
  },
  form: {
    backgroundColor: "#dddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
