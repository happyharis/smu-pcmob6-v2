import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreenHome from "../screens/NotesScreenHome";
import NotesScreenAdd from "../screens/NotesScreenAdd";
import NotesScreenDetails from "../screens/NotesScreenDetails";
import { NOTES_SCREEN } from "../constants/screens";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name={NOTES_SCREEN.Home}
        component={NotesScreenHome}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={NOTES_SCREEN.Add}
        component={NotesScreenAdd}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={NOTES_SCREEN.Details}
        component={NotesScreenDetails}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
