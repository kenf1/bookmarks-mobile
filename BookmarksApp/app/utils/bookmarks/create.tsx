import { Alert } from "react-native";

import { BASE_ENDPOINT } from "@/app/data/consts";
import { Bookmark } from "@/app/data/response";

export async function handleSubmit(
  userId: number,
  name: string,
  url: string,
  clearFields: () => void,
) {
  const payload = {
    userId,
    name,
    url,
  };

  try {
    const response = await fetch(`${BASE_ENDPOINT}/bookmarks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      Alert.alert("Error", err.message || "Failed to create bookmark");
      return;
    }

    const data: Bookmark = await response.json();
    Alert.alert("Success", `Bookmark created with id: ${data.id}`);
    console.log("Created bookmark:", data);
    clearFields();
  } catch (error) {
    Alert.alert("Error", "Failed to connect to server");
    console.error(error);
  }
}

export function handleSubmitDev(
  fieldOne: string,
  fieldTwo: string,
  clearFields: () => void,
) {
  const output: string = `Submitted\nField 1: ${fieldOne}\nField 2: ${fieldTwo}`;

  Alert.alert(output);
  console.log(output);

  clearFields();
}
