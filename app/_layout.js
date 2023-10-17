import { View, Text } from "react-native";
import React from "react";
import Root from "./root";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

const StackLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="skyblue" />
      <Root />
    </>
  );
};

export default StackLayout;
