import React, { useEffect, useState } from "react";
import { FlatList, Linking, View } from "react-native";
import {
  Card,
  Text,
  ActivityIndicator,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Bookmark } from "../data/response";
import { BASE_ENDPOINT } from "../data/consts";

function HomeScreen() {
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
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  const renderBookmark = ({ item }: { item: Bookmark }) => (
    <Card
      mode="outlined"
      style={{
        maxWidth: 600,
        width: "99%",
        alignSelf: "center",
        marginVertical: 5,
      }}
      onPress={() => Linking.openURL(item.url)}
    >
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: "#2563eb",
            textDecorationLine: "underline",
            marginTop: 4,
          }}
        >
          {item.url}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookmark}
        ListEmptyComponent={
          <Text style={{ color: "gray", textAlign: "center", marginTop: 24 }}>
            No bookmarks found.
          </Text>
        }
        contentContainerStyle={{
          paddingVertical: 20,
          flexGrow: bookmarks.length === 0 ? 1 : 0,
          justifyContent: bookmarks.length === 0 ? "center" : undefined,
        }}
      />
    </View>
  );
}

export default function WrappedHomeScreen() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <HomeScreen />
    </PaperProvider>
  );
}
