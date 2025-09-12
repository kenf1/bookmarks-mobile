import { View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function SettingsScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id: string | null = await AsyncStorage.getItem("userId");
        setUserId(id);

        const username: string | null = await AsyncStorage.getItem("userName");
        setUserName(username);
      } catch (e) {
        Alert.alert("Error", "Failed to load user ID");
      }
    };
    fetchUserId();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userEmail");
      router.replace("/");
    } catch (e) {
      Alert.alert("Error", "Failed to log out");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {userName && (
        <Text className="mb-4 text-lg font-bold">Username: {userName}</Text>
      )}

      {userId && (
        <Text className="mb-4 text-lg font-bold">User ID: {userId}</Text>
      )}

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
