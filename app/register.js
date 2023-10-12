import { View, Text } from "react-native";
import React from "react";
import RegForm from "../components/Register/RegForm";
import tailwind from "twrnc";

const Register = () => {
  return (
    <View
      style={tailwind`flex flex-1 justify-center items-center gap-4 bg-orange-100`}
    >
      <RegForm />
    </View>
  );
};

export default Register;
