import { View, Text } from "react-native";
import React from "react";
import tailwind from "twrnc";

const Listsidebar = () => {
  return (
    <View style={tailwind`flex-1 bg-slate-700 w-50`}>
      <Text>ListHeader</Text>
    </View>
  );
};

export default Listsidebar;
