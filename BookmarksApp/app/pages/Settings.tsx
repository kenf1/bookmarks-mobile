import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function SettingsScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Settings Page</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
