import { View, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (e) {
      Alert.alert("Error", "Failed to log out");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
