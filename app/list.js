import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import tailwind from "twrnc";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const ListPage = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const todoRef = collection(FIREBASE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos = [];

        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIREBASE_DB, "todos"), {
      title: todo,
      done: false,
      time: new Date().toUTCString(),
    });
    setTodo("");
  };

  const renderToDo = ({ item }) => {
    const ref = doc(FIREBASE_DB, `todos/${item.id}`);

    const toggleDown = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <View
        style={tailwind`w-[90%] ml-6 mb-2 p-2 rounded border flex-row gap-5`}
      >
        <TouchableOpacity
          onPress={toggleDown}
          style={tailwind`mb-5 flex-row flex-1`}
        >
          {item.done && <Ionicons name="ellipse" size={22} color="green" />}
          {!item.done && <Ionicons name="ellipse-outline" size={22} />}
          <Text style={tailwind`text-base ml-2 font-medium `}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex-1 items-end`}
          onPress={deleteItem}
        >
          <Ionicons name="trash-bin-outline" size={20} color="red" />
        </TouchableOpacity>
        <View style={tailwind`absolute bottom-1 right-1`}>
          <Text style={tailwind`text-xs font-light`}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tailwind`w-full h-full`}>
      <View
        style={
          Platform.OS == "web"
            ? tailwind`mt-5 ml-6 flex-row gap-5`
            : tailwind`mt-12 ml-6 flex-row gap-5`
        }
      >
        <TextInput
          placeholder="Write Your ToDo"
          value={todo}
          onChangeText={(text) => setTodo(text)}
          style={tailwind`w-60 border h-10 rounded-lg pl-2`}
        />
        <View style={tailwind`mt-0`}>
          <Button title="Add ToDo" onPress={addTodo} disabled={todo === ""} />
        </View>
      </View>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={renderToDo}
          keyExtractor={(todo) => todo.id}
          style={tailwind`mt-5`}
        />
      ) : (
        []
      )}
      {Platform.OS == "web" ? (
        <View style={tailwind`absolute rounded border top-7 right-10 p-1`}>
          <Pressable onPress={() => router.replace("/")}>
            <Text>LogOut</Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={tailwind` absolute rounded-xl p-1 border bottom-20 right-7`}
        >
          <Pressable onPress={() => router.replace("/")}>
            <Ionicons name="log-out" size={24} color="red" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ListPage;
