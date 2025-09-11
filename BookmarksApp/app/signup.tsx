import { Text, View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { serverSignup } from "./utils/auth";
import "@/global.css";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const user = await serverSignup(name, email, password);
      if (user) {
        await AsyncStorage.setItem("userId", user.id.toString());
        await AsyncStorage.setItem("userEmail", user.email);
        await AsyncStorage.setItem("userName", user.name);
        router.replace("/home");
      } else {
        Alert.alert("Signup failed", "Something went wrong, please try again");
      }
    } catch (e) {
      Alert.alert("Error", "Failed to create account");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lightBlue-400 font-bold text-center text-3xl mb-5">
        Create Account
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="w-64 h-10 mb-3 border border-gray-300 px-2"
      />

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

      <Button title="Sign Up" onPress={handleSignup} />

      <Text className="pt-4">
        {"Already have an account? "}
        <Text
          className="text-blue-500 underline"
          onPress={() => router.push("/")}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
}
