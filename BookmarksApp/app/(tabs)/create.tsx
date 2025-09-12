import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Surface } from "react-native-paper";
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
    <Surface style={{ flex: 1, padding: 16, justifyContent: "flex-start" }}>
      <TextInput
        label="Enter bookmark name"
        value={bookmarkName}
        onChangeText={setBookmarkName}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextInput
        label="Enter bookmark URL"
        value={bookmarkUrl}
        onChangeText={setBookmarkUrl}
        mode="outlined"
        multiline
        numberOfLines={8}
        style={{ marginBottom: 16, textAlignVertical: "top" }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="contained"
          onPress={onSubmit}
          buttonColor="#a8d5ba"
          style={{ flex: 1, marginRight: 8 }}
        >
          Submit
        </Button>

        <Button
          mode="contained"
          onPress={clearFields}
          buttonColor="#f7a8a8"
          style={{ flex: 1, marginLeft: 8 }}
        >
          Clear
        </Button>
      </View>
    </Surface>
  );
}
