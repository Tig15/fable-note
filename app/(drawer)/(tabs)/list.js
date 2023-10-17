import { View, Text, Platform } from "react-native";
import React from "react";
import ListPage from "../../../components/ListPage";
import Listhead from "../../../components/ListPage/Listhead";
import tailwind from "twrnc";
import ListHeader from "../../../components/ListPage/Listsidebar";
import Listsidebar from "../../../components/ListPage/Listsidebar";

const Todolist = () => {
  return (
    <View style={tailwind`h-full w-full bg-slate-500`}>
      <Listhead />
      {Platform.OS == "web" ? (
        <View style={tailwind`absolute top-[88px] h-[774px]`}>
          <Listsidebar />
        </View>
      ) : (
        []
      )}
      <ListPage />
    </View>
  );
};

export default Todolist;
