import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
