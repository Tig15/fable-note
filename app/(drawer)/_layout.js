import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import Modal from "../../components/Modal";

const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="modal" />
    </Drawer>
  );
};

export default DrawerLayout;
