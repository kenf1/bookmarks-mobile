import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

import { useAuth } from "../../components/AuthContext";

export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
        } catch (e) {
            setError("Failed to sign in");
        }
    };

    return (
        <View style={styles.container}>
            <Text>BookmarksApp</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
    error: { color: "red", marginTop: 10 },
});
