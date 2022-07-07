import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreenHome from "../screens/NotesScreenHome";
import NotesScreenAdd from "../screens/NotesScreenAdd";
import NotesScreenDetails from "../screens/NotesScreenDetails";
import { NotesScreen } from "../constants/screens";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name={NotesScreen.Home}
        component={NotesScreenHome}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={NotesScreen.Add}
        component={NotesScreenAdd}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={NotesScreen.Details}
        component={NotesScreenDetails}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}
