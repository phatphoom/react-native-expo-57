import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 8 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="plus" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Product",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="box-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="category" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
