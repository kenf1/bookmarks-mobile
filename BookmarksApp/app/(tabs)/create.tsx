import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";

import handleSubmit from "../utils/bookmarks/create";

export default function CreateScreen() {
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");

  const clearFields = () => {
    setBookmarkName("");
    setBookmarkUrl("");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Enter bookmark name"
        value={bookmarkName}
        onChangeText={setBookmarkName}
        style={{
          width: "100%",
          height: 40,
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Enter bookmark url"
        value={bookmarkUrl}
        onChangeText={setBookmarkUrl}
        multiline
        style={{
          width: "100%",
          height: 300,
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
          borderRadius: 5,
          textAlignVertical: "top",
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "auto",
        }}
      >
        <Button
          title="Submit"
          color="#a8d5ba"
          onPress={() => handleSubmit(bookmarkName, bookmarkUrl, clearFields)}
        />
        <Button title="Clear" color="#f7a8a8" onPress={clearFields} />
      </View>
    </View>
  );
}
