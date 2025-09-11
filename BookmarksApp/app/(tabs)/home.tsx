import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
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
      <View>
        <Text>Loading bookmarks...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.url}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No bookmarks found.</Text>}
      />
    </View>
  );
}
