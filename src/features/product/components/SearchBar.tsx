import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FONTS } from "@/shared/theme/typography";

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
  activeFilterCount?: number;
}

const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search products...",
  onFilterPress,
  activeFilterCount = 0,
}: SearchBarProps) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInput}>
        <Feather name="search" size={18} color="#64748B" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          style={styles.txtInput}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={[styles.btnFilter, activeFilterCount > 0 && styles.btnFilterActive]} onPress={onFilterPress} activeOpacity={0.7}>
        <Entypo name="sound-mix" size={15} color={activeFilterCount > 0 ? "#FFFFFF" : "#2563EB"} />
        <Text style={[styles.filterText, activeFilterCount > 0 && styles.filterTextActive]}>Filter</Text>
        
        {activeFilterCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFilterCount}</Text>
          </View>
        )}
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
    gap: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 10,
    height: 44,
  },
  btnFilter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 6,
  },
  filterText: {
    fontSize: 13,
    fontFamily: FONTS.brandSemiBold,
    color: "#2563EB",
  },
  txtInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: "#0F172A",
    height: "100%",
  },
  btnFilterActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: FONTS.brandBold,
  },
});
