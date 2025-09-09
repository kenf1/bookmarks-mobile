import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../components/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>

      {/* crud */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Bookmarks tasks</Text>
        <View style={styles.buttonsContainer}>
          <Button
            title="Create"
            onPress={() => navigation.navigate("Create")}
          />
          <Button title="Read" onPress={() => navigation.navigate("Read")} />
          <Button
            title="Update"
            onPress={() => navigation.navigate("Update")}
          />
          <Button
            title="Delete"
            onPress={() => navigation.navigate("Delete")}
          />
        </View>
      </View>

      {/* profile */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Other</Text>

        <View style={styles.buttonsContainer}>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate("Profile")}
          />
          <Button
            title="Settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 40,
    width: "90%",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  buttonsContainer: {
    width: "80%",
    justifyContent: "flex-start",
    gap: 10,
  },
});
