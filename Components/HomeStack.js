import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import NotesStack from "./NotesStack";

const BottomTab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == "NotesStack") {
            iconName = "list-alt";
          } else {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="NotesStack" component={NotesStack} />
      <BottomTab.Screen name="ProfileScreen" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}
