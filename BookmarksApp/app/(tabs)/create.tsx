import { View, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { handleSubmit } from "../utils/bookmarks/create";

export default function CreateScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id: string | null = await AsyncStorage.getItem("userId");
        setUserId(id);
      } catch (e) {
        Alert.alert("Error", "Failed to load user ID");
      }
    };
    fetchUserId();
  }, []);

  const clearFields = () => {
    setBookmarkName("");
    setBookmarkUrl("");
  };

  const onSubmit = () => {
    if (!bookmarkName.trim() || !bookmarkUrl.trim()) {
      Alert.alert(
        "Missing Info",
        "Please enter both name and URL before submitting.",
      );
      return;
    }

    handleSubmit(Number(userId), bookmarkName, bookmarkUrl, clearFields);
  };

  return (
    <View className="flex-1 justify-start items-center p-5">
      <TextInput
        placeholder="Enter bookmark name"
        value={bookmarkName}
        onChangeText={setBookmarkName}
        className="w-full h-10 border border-gray-400 mb-3 px-2 rounded"
      />

      <TextInput
        placeholder="Enter bookmark url"
        value={bookmarkUrl}
        onChangeText={setBookmarkUrl}
        multiline
        className="w-full h-72 border border-gray-400 mb-3 px-2 py-2 rounded text-top"
      />

      <View className="flex-row justify-between w-full mt-auto">
        <Button title="Submit" color="#a8d5ba" onPress={onSubmit} />
        <Button title="Clear" color="#f7a8a8" onPress={clearFields} />
      </View>
    </View>
  );
}
