import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInput}>
        <Feather name="search" size={20} color="black" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#a4a4a4"
          style={styles.txtInput}
        />
      </View>

      <TouchableOpacity style={styles.btnSearch}>
        <Entypo name="plus" size={20} color="black" />
        <Text>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnFilter}>
        <Entypo name="triangle-down" size={20} color="black" />
        <Text>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  headContainer: {
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginBottom: 6,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 4,
    gap: 2,
    height: 40,
  },
  txtInput: {
    flex: 1,
    fontSize: 12,
    color: "#1f2937",
    height: "100%",
  },
  btnSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e85f7",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    gap: 4,
  },
  btnFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d1d5db",
    borderRadius: 4,
    paddingHorizontal: 8,
    gap: 4,
  },

  txtHaeder: {
    fontSize: 18,
    fontWeight: "600",
  },
});
