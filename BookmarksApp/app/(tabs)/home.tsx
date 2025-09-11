import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Linking, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Bookmark } from "../data/response";
import { BASE_ENDPOINT } from "../data/consts";

export default function HomeScreen() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_ENDPOINT}/user/bookmarks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: Number(userId) }),
        });

        if (response.ok) {
          const data: Bookmark[] = await response.json();
          setBookmarks(data);
        } else {
          console.error("Failed to fetch bookmarks");
        }
      } catch (error) {
        console.error("Error fetching bookmarks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading bookmarks...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="font-bold text-lg">{item.name}</Text>
            <Pressable onPress={() => Linking.openURL(item.url)}>
              <Text className="text-blue-500 underline">{item.url}</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-6">
            No bookmarks found.
          </Text>
        }
      />
    </View>
  );
}
