import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderBar = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.txtHaeder}>Product</Text>
      <TouchableOpacity>
        <MaterialIcons name="account-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginBottom: 6,
  },
  txtHaeder: {
    fontSize: 18,
    fontWeight: "600",
  },
});
