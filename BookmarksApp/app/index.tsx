import { Text, View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { serverLogin } from "./utils/auth";
import "@/global.css";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await serverLogin(email, password);
      if (user) {
        await AsyncStorage.setItem("userId", user.id);
        await AsyncStorage.setItem("userEmail", user.email);
        await AsyncStorage.setItem("userName", user.username);
        router.replace("/home");
      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch (e) {
      Alert.alert("Error", "Failed to save login info or login");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lightBlue-400 font-bold text-center text-3xl mb-5">
        BookmarksApp
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-64 h-10 mb-3 border border-gray-300 px-2"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-64 h-10 mb-3 border border-gray-300 px-2"
      />

      <Button title="Login" onPress={handleLogin} />

      <Text className="pt-4">
        {"Don't have an account? "}
        <Text
          className="text-blue-500 underline"
          onPress={() => router.push("/signup")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
}
