import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { ref } from "yup";
import tailwind from "twrnc";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP } from "../../Firebase/firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LogForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    const { email, password } = values;

    const auth = getAuth(FIREBASE_APP);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign-in successful");
      router.replace("/list");
    } catch (error) {
      console.error("Sign-in failed:", error.message);
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
            Login
          </Text>
        </View>
      ) : (
        <View
          style={tailwind`bg-zinc-800 w-full absolute top-0 mt-6 h-11 flex-row`}
        >
          <Text style={tailwind`text-xl text-slate-100 uppercase mt-2 ml-5`}>
            Fable-Note
          </Text>
          <Text
            style={tailwind`text-xl text-slate-100 uppercase absolute top-2 right-6 `}
          >
            Login
          </Text>
        </View>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={
              Platform.OS == "web"
                ? tailwind`border w-90 h-90 justify-center items-center rounded bg-slate-100 shadow-xl ml-1`
                : tailwind`border w-80 h-80 justify-center items-center rounded-lg bg-slate-100 shadow-xl ml-1`
            }
          >
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

            <TouchableOpacity
              style={tailwind`bg-blue-800 p-2 rounded items-center mt-2 w-70  `}
              onPress={handleSubmit}
            >
              <Text style={tailwind`text-slate-100 text-sm`}>Login</Text>
            </TouchableOpacity>

            <View style={tailwind`flex flex-row mt-5 gap-2`}>
              <Text style={tailwind`text-xs`}>Not Registered?</Text>
              <Pressable onPress={() => router.replace("/register")}>
                <Text style={tailwind`text-xs underline `}>
                  Create Your Own Account
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
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
});

export default LogForm;
