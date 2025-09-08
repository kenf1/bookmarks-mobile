import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useAuth } from "../components/AuthContext";
import SignInScreen from "./pages/SignIn";
import HomeScreen from "./pages/Home";
import ProfileScreen from "./pages/Profile";
import CreateScreen from "./pages/crud/Create";
import ReadScreen from "./pages/crud/Read";
import UpdateScreen from "./pages/crud/Update";
import DeleteScreen from "./pages/crud/Delete";

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

          {/* crud routes */}
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Read" component={ReadScreen} />
          <Stack.Screen name="Update" component={UpdateScreen} />
          <Stack.Screen name="Delete" component={DeleteScreen} />
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
