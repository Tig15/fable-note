import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { ref } from "yup";
import tailwind from "twrnc";
import { useRouter } from "expo-router";
import { registerUser } from "../../Firebase/firebaseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async (values) => {
    const { email, password, name } = values;

    try {
      const user = await registerUser(email, password, name);

      if (user.error) {
        if (user.error === "auth/email-already-in-use") {
          Alert.alert("Email already is in use");
        } else {
          console.error("Registration failed:", user.error);
        }
      } else {
        router.replace("/list");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={tailwind`flex-1 justify-center w-full h-full items-center`}>
      {Platform.OS == "web" ? (
        <View
          style={tailwind`bg-zinc-800 w-full absolute top-0 h-15 pt-3 pl-5 flex-row `}
        >
          <Text style={tailwind`text-2xl text-slate-100 uppercase`}>
            Fable-Note
          </Text>
          <Text
            style={tailwind`text-2xl text-slate-100 uppercase items-center absolute left-[48%]`}
          >
            Register
          </Text>
        </View>
      ) : (
        <View
          style={tailwind`bg-zinc-800 w-full absolute top-7 mt-6 h-11 flex-row`}
        >
          <Text style={tailwind`text-xl text-slate-100 uppercase mt-2 ml-5`}>
            Fable-Note
          </Text>
          <Text
            style={tailwind`text-xl text-slate-100 uppercase absolute top-2 right-6 `}
          >
            Register
          </Text>
        </View>
      )}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleRegistration(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={
              Platform.OS == "web"
                ? tailwind`border w-95 h-105 justify-center items-center rounded bg-slate-100 shadow-xl ml-1`
                : tailwind`border w-85 h-100 justify-center items-center rounded-lg bg-slate-100 shadow-xl ml-1`
            }
          >
            <View style={tailwind`mb-2 gap-1`}>
              <TextInput
                style={tailwind`w-70 h-10 border-slate-950 border mb-4 px-2 rounded`}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Full-Name"
                placeholderTextColor="black"
              />
              {errors.name && (
                <Text
                  style={tailwind`text-xs text-red-600 absolute top-11 left-2 `}
                >
                  {errors.name}
                </Text>
              )}
            </View>

            <View style={tailwind`mb-2 gap-1`}>
              <TextInput
                style={tailwind`w-70 h-10 border-slate-950 border mb-4 px-2 rounded`}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                placeholderTextColor="black"
              />
              {errors.email && (
                <Text
                  style={tailwind`text-xs text-red-600 absolute top-11 left-2`}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            <View style={tailwind`mb-2 gap-1`}>
              <View style={tailwind`relative`}>
                <TextInput
                  style={tailwind`w-70 h-10 border-slate-950 border mb-4 px-2 rounded`}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  placeholderTextColor="black"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={tailwind`absolute top-[11px] right-2`}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={20}
                      color="#072541"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={20}
                      color="#072541"
                    />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text
                  style={tailwind`text-xs text-red-600 absolute top-11 left-2`}
                >
                  {errors.password}
                </Text>
              )}
            </View>

            <View style={tailwind`mb-2 gap-1`}>
              <View style={tailwind`relative`}>
                <TextInput
                  style={tailwind`w-70 h-10 border-slate-950 border mb-4 px-2 rounded`}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor="black"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={tailwind`absolute top-[11px] right-2`}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      size={20}
                      color="#072541"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={20}
                      color="#072541"
                    />
                  )}
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text
                  style={tailwind`text-xs text-red-600 absolute top-11 left-2`}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={tailwind`bg-blue-800 p-2 rounded items-center mt-2 w-70  `}
              onPress={handleSubmit}
            >
              <Text style={tailwind`text-slate-100 text-sm`}>Sign-Up</Text>
            </TouchableOpacity>

            <View style={tailwind`flex flex-row mt-5 gap-2`}>
              <Text style={tailwind`text-xs`}>Already Register?</Text>
              <Pressable onPress={() => router.replace("/")}>
                <Text style={tailwind`text-xs underline `}>
                  Go Back To Login
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
});

export default RegForm;
