import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { useAuth } from "../../components/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.email}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
