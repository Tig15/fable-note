import { View, Text, Platform } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  return Platform.OS == "web" ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" />
      <Stack.Screen name="setting" />
    </Stack>
  ) : (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home" size={20} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <Ionicons name="settings" size={20} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
