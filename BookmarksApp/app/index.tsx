import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { serverLogin } from "./utils/auth";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
      }}
    >
      <Surface style={{ padding: 20, elevation: 4, borderRadius: 8 }}>
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", marginBottom: 20, color: "#6200ee" }}
        >
          BookmarksApp
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          style={{ marginBottom: 16 }}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={{ marginBottom: 24 }}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={{ marginBottom: 16 }}
        >
          Login
        </Button>

        <Text style={{ textAlign: "center" }}>
          {"Don't have an account? "}
          <Text
            style={{ color: "#6200ee", textDecorationLine: "underline" }}
            onPress={() => router.push("/signup")}
          >
            Sign up
          </Text>
        </Text>
      </Surface>
    </View>
  );
}
