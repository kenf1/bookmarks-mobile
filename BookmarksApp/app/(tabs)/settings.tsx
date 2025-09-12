import React, { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Button,
} from "react-native-paper";

function SettingsScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);

        const username = await AsyncStorage.getItem("userName");
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
    <View style={styles.container}>
      <View style={styles.content}>
        {userName && <Text style={styles.text}>Username: {userName}</Text>}
        {userId && <Text style={styles.text}>User ID: {userId}</Text>}

        <Button
          mode="contained"
          onPress={handleLogout}
          buttonColor="#b91c1c"
          textColor="#fff"
          style={styles.button}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

export default function WrappedSettingsScreen() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <SettingsScreen />
    </PaperProvider>
  );
}

//todo: fix with nativewind
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  content: {
    alignItems: "center",
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: 160,
    marginTop: 20,
  },
});
