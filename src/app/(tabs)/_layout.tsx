import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlassView } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 34,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderWidth: 1.5,
          borderColor: "rgba(255, 255, 255, 0.9)",
          paddingBottom: 4,
          paddingTop: 4,
          paddingHorizontal: 8,
          elevation: 12,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
        },
        tabBarBackground: () => (
          <GlassView
            glassEffectStyle="regular"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "หน้าแรก",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <FontAwesome5 name="home" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "สินค้า",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <FontAwesome5 name="box-open" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "หมวดหมู่",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <MaterialIcons name="category" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "เพิ่มสินค้า",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <AntDesign name="plus-circle" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "โปรไฟล์",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
              <FontAwesome5 name="user-alt" size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
  },
  activeIconWrapper: {
    backgroundColor: "rgba(37, 99, 235, 0.12)",
  },
});
