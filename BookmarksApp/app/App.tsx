import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useAuth } from "../components/AuthContext";
import SignInScreen from "./pages/SignIn";
import HomeScreen from "./pages/Home";
import ProfileScreen from "./pages/Profile";

const Stack = createStackNavigator();

export function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        //auth success
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
