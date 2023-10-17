import {
  View,
  Text,
  Platform,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Listhead = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View
      style={
        Platform.OS == "web"
          ? tailwind`w-full p-4  shadow-xl  flex-row justify-between bg-slate-900`
          : tailwind`w-full mt-12 p-3 rounded-br-xl shadow-xl rounded-bl-xl flex-row justify-between bg-slate-900`
      }
    >
      <View style={tailwind`flex-column gap-2`}>
        {Platform.OS === "web" ? (
          <Text style={tailwind`text-2xl text-slate-50`}>Fable-Note</Text>
        ) : (
          <View style={tailwind`flex-row gap-3`}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={tailwind`mt-1`}
            >
              <MaterialIcons name="format-align-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={tailwind`text-2xl text-slate-50 `}>Fable-Note</Text>
          </View>
        )}
        <Text style={tailwind`text-xs text-slate-50`}>
          Write Once, Keep It Forever in Fable
        </Text>
      </View>

      {Platform.OS == "web" ? (
        <View
          style={tailwind`absolute rounded bottom-5 right-10 p-1 bg-red-700 `}
        >
          <Pressable onPress={() => router.replace("/")}>
            <Text style={tailwind`text-slate-50 hover:text-blue-700`}>
              Log-Out
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={tailwind` absolute rounded-xl p-1 bottom-2 right-2`}>
          <Pressable onPress={() => router.replace("/")}>
            <Ionicons name="log-out" size={24} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Listhead;
