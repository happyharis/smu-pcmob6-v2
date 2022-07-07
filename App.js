import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AuthScreen from "./screens/AuthScreen";
import React from "react";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
        <Stack.Screen component={AuthScreen} name="AuthScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
