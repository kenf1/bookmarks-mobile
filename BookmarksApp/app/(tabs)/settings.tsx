import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user"); //clear saved user
      router.replace("/"); //redirect login
    } catch (e) {
      Alert.alert("Error", "Failed to log out");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
