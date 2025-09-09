import { Tabs } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <FontAwesome name="home" size={24} color={color} />
            ) : (
              <FontAwesome name="home" size={24} color="gray" />
            );
          },
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="add" size={24} color={color} />
            ) : (
              <Ionicons name="add" size={24} color="gray" />
            );
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="settings-sharp" size={24} color={color} />
            ) : (
              <Ionicons name="settings-sharp" size={24} color="gray" />
            );
          },
        }}
      />
    </Tabs>
  );
}
