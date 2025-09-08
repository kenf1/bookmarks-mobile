import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAuth } from "../../components/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
