import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreenHome from "../screens/NotesScreenHome";
import NotesAddScreen from "../screens/NotesAddScreen";
import NotesScreenDetails from "../screens/NotesScreenDetails";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name="NotesScreenHome"
        component={NotesScreenHome}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name="NotesAddScreen"
        component={NotesAddScreen}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name="NotesScreenDetails"
        component={NotesScreenDetails}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
