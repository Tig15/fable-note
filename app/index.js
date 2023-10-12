import { View, Text, Pressable, Button } from "react-native";
import React from "react";
import tailwind from "twrnc";
import LogForm from "../components/LoginPage/LogForm";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  return (
    <View
      style={tailwind`flex flex-1 justify-center items-center gap-4 bg-blue-100`}
    >
      <LogForm />
    </View>
  );
};

export default Login;
