import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Text, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { serverSignup } from "./utils/auth";
import { User } from "./data/response";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const user: User | null = await serverSignup(name, email, password);
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
          Create Account
        </Text>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={{ marginBottom: 16 }}
        />

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
          onPress={handleSignup}
          style={{ marginBottom: 16 }}
        >
          Sign Up
        </Button>

        <Text style={{ textAlign: "center" }}>
          {"Already have an account? "}
          <Text
            style={{ color: "#6200ee", textDecorationLine: "underline" }}
            onPress={() => router.push("/")}
          >
            Log in
          </Text>
        </Text>
      </Surface>
    </View>
  );
}
