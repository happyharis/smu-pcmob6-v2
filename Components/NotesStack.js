import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../screens/NotesScreen";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
