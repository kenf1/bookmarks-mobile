import { useEffect, useState } from "react";
import { Stack, Slot } from "expo-router";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        setUser(savedUser);
      } catch (e) {
        console.error("Failed to load user from AsyncStorage", e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      //redirect login if no user, else home
      if (!user) {
        router.replace("/");
      } else {
        router.replace("/home");
      }
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Slot />
    </Stack>
  );
}
