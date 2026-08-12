import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search product...",
  onFilterPress,
}: SearchBarProps) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInput}>
        <Feather name="search" size={18} color="#6b7280" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          style={styles.txtInput}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.btnFilter} onPress={onFilterPress}>
        <Entypo name="sound-mix" size={16} color="#374151" />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
    height: 42,
  },
  btnFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    gap: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
  txtInput: {
    flex: 1,
    fontSize: 14,
    color: "#1f2937",
    height: "100%",
  },
});
