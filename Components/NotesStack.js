import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../screens/NotesScreen";
import NotesAddScreen from "../screens/NotesAddScreen";
import NotesDetailScreen from "../screens/NotesDetailScreen";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name="NotesAddScreen"
        component={NotesAddScreen}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name="NotesDetailScreen"
        component={NotesDetailScreen}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
