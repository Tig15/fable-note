import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import tailwind from "twrnc";
import { useNavigation, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_APP, FIREBASE_DB } from "../../../Firebase/firebaseConfig";
import Toast from "react-native-toast-message";

const ListPage = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  // todo collections
  useEffect(() => {
    collectToDo();
  }, []);

  const showToast = (msg1, msg2, opt, time) => {
    Toast.show({
      text1: msg1,
      text2: msg2,
      type: opt,
      position: "bottom",
      bottomOffset: 40,
      autoHide: true,
      visibilityTime: time,
    });
  };

  const collectToDo = () => {
    const auth = getAuth(FIREBASE_APP);
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userTodosRef = collection(FIREBASE_DB, `users/${userId}/todos`);

      const subscriber = onSnapshot(userTodosRef, {
        next: (snapshot) => {
          const todos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todos);
        },
      });
      return () => subscriber();
    } else {
      navigation.navigate("index");
    }
  };

  // addTodo function using firebase
  const addTodo = async () => {
    const user = getAuth(FIREBASE_APP).currentUser;

    if (user) {
      const userId = user.uid;

      const userTodosRef = collection(FIREBASE_DB, `users/${userId}/todos`);
      await addDoc(userTodosRef, {
        title: todo,
        done: false,
        time: new Date().toUTCString(),
      });

      setTodo("");
      showToast("To-Do Added", "", "info", 2000);
    }
  };

  // Rendering the components to show todo
  const renderToDo = ({ item }) => {
    const user = getAuth(FIREBASE_APP).currentUser;
    const userId = user.uid;
    const ref = doc(FIREBASE_DB, `users/${userId}/todos/${item.id}`);

    const toggleDown = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
      showToast("Deleted", "Your To-Do cannot be recovered", "info", 2000);
    };

    return (
      <View
        style={
          Platform.OS == "web"
            ? tailwind`w-[60%] ml-80 mb-2 p-2 rounded border flex-row gap-5 bg-slate-200`
            : tailwind`w-[90%] ml-6 mb-2 p-2 rounded border flex-row gap-5 bg-slate-200`
        }
      >
        <TouchableOpacity
          onPress={toggleDown}
          style={tailwind`mb-4 flex-row flex-1`}
        >
          {item.done && <Ionicons name="ellipse" size={22} color="green" />}
          {!item.done && <Ionicons name="ellipse-outline" size={22} />}
          <Text
            style={
              Platform.OS == "web"
                ? tailwind`text-base ml-3 font-medium `
                : tailwind`w-80 text-base ml-2 font-medium `
            }
          >
            {item.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex-1 items-end`}
          onPress={() => router.push("/detail")}
        >
          <AntDesign name="edit" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name="trash-bin-outline" size={20} color="red" />
        </TouchableOpacity>
        <View style={tailwind`absolute bottom-1 right-1`}>
          <Text style={tailwind`text-xs font-light`}>{item.time}</Text>
        </View>
      </View>
    );
  };

  //Component Return

  return (
    <View style={tailwind`w-full h-full bg-sky-200 `}>
      <Toast />
      <View
        style={
          Platform.OS == "web"
            ? tailwind`w-full p-4 rounded-br-xl shadow-xl rounded-bl-xl flex-row justify-between bg-slate-900`
            : tailwind`w-full mt-7 p-3 rounded-br-xl shadow-xl rounded-bl-xl flex-row justify-between bg-slate-900`
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
                <MaterialIcons
                  name="format-align-left"
                  size={24}
                  color="white"
                />
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
            style={tailwind`absolute rounded bottom-5 right-10 p-1 bg-red-700`}
          >
            <Pressable onPress={() => router.replace("/")}>
              <Text style={tailwind`text-slate-50`}>Log-Out</Text>
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

      <View
        style={
          Platform.OS == "web"
            ? tailwind`mt-5 ml-80 w-[60%] justify-between flex-row gap-5`
            : tailwind`mt-4 ml-5 flex-row gap-1`
        }
      >
        <TextInput
          placeholder="Write Your To-Do"
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={tailwind`w-70 h-10 border rounded-lg pl-3 bg-slate-200`}
          placeholderTextColor="black"
        />

        {Platform.OS == "web" ? (
          <View
            style={tailwind`mt-[6px] ml-3 border rounded-lg shadow-lg h-7 bg-slate-200`}
          >
            <Pressable onPress={addTodo} disabled={todo === ""}>
              <Text style={tailwind`text-sm p-1`}>Add To-Do</Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={tailwind`mt-[6px] ml-6 border rounded-2xl shadow-lg h-7 bg-slate-200`}
          >
            <Pressable onPress={addTodo} disabled={todo === ""}>
              <Entypo name="plus" size={26} />
            </Pressable>
          </View>
        )}
      </View>

      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={renderToDo}
          keyExtractor={(todo) => todo.id}
          style={tailwind`mt-5 `}
        />
      ) : (
        <View style={tailwind`flex-1 justify-center items-center gap-2`}>
          <Entypo
            name="plus"
            size={80}
            color="black"
            style={tailwind`opacity-30`}
          />
          <Text style={tailwind`text-xs font-semibold opacity-40 uppercase`}>
            Add Your To-Do
          </Text>
        </View>
      )}
    </View>
  );
};

export default ListPage;
