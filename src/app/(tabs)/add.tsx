import HeaderBar from "@/shared/components/AppHeader";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Add() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <HeaderBar title="Add Product" />
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <View style={styles.formContainer}>
        <View style={styles.formControl}>
          <Text>Name*</Text>
          <TextInput style={styles.form} />
        </View>
        <View style={styles.formControl}>
          <Text>Description</Text>
          <TextInput style={styles.form} />
        </View>
        <View style={styles.formControl}>
          <Text>Price</Text>
          <TextInput style={styles.form} keyboardType="number-pad" />
        </View>
        <View style={styles.formControl}>
          <Text>Currency</Text>
          <TextInput style={styles.form} />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.btnTxt}>Submit</Text>
        </TouchableOpacity>
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
  formControl: {
    marginBottom: 10,
  },
  form: {
    backgroundColor: "#dddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  btnContainer: {
    marginVertical: 10,
  },
  btnSubmit: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignSelf: "flex-end",
  },
  btnTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
