import { useUserProfile } from "@/features/profile/hooks";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title: string;
};

const HeaderBar = ({ title }: HeaderProps) => {
  const router = useRouter();
  const { displayName, fullAvatarUrl } = useUserProfile();

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Feather name="menu" size={22} color="#1E293B" />
      </TouchableOpacity>
      <Text style={styles.txtHeader}>{title}</Text>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => router.push("/profile")}
        activeOpacity={0.8}
      >
        {fullAvatarUrl ? (
          <Image source={{ uri: fullAvatarUrl }} style={styles.headerAvatarImage} contentFit="cover" transition={200} />
        ) : (
          <Ionicons name="person-circle" size={48} color="#94A3B8" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  txtHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  headerAvatarImage: {
    width: "100%",
    height: "100%",
  },
});
