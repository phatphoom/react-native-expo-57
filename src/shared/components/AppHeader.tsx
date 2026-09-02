import { useUserProfile } from "@/features/profile/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  title?: string;
};

const HeaderBar = ({ title }: HeaderProps) => {
  const router = useRouter();
  const { displayName, fullAvatarUrl } = useUserProfile();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Text style={styles.greeting} numberOfLines={1}>
          {displayName}
        </Text>
      </View>

      {/* Styled Brand Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.brandTitle}>
          <Text style={styles.brandPrimary}>Shop</Text>
          <Text style={styles.brandAccent}>Mate</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => router.push("/profile")}
        activeOpacity={0.8}
      >
        {fullAvatarUrl ? (
          <Image
            source={{ uri: fullAvatarUrl }}
            style={styles.headerAvatarImage}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <Ionicons name="person-circle" size={44} color="#94A3B8" />
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
  leftContainer: {
    minWidth: 60,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 13,
    fontFamily: "Outfit_500Medium",
    color: "#64748B",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: {
    fontSize: 22,
    letterSpacing: -0.5,
  },
  brandPrimary: {
    fontFamily: "Outfit_700Bold",
    color: "#0F172A",
  },
  brandAccent: {
    fontFamily: "Outfit_700Bold",
    color: "#2563EB",
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
