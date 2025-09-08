import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useAuth } from "../components/AuthContext";
import SignInScreen from "./pages/SignIn";
import HomeScreen from "./pages/Home";

const Stack = createStackNavigator();

export function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        //signed in
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        //not signed in
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
