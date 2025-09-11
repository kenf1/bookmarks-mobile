import { View, TextInput, Button, Alert } from "react-native";
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
        router.replace("/home");
      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch (e) {
      Alert.alert("Error", "Failed to save login info or login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: 250,
          height: 40,
          marginBottom: 12,
          borderWidth: 1,
          padding: 8,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: 250,
          height: 40,
          marginBottom: 12,
          borderWidth: 1,
          padding: 8,
        }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
