import { Text, View } from "react-native";
import React from "react";
import { theme } from "../styles";

export default function NotesAddScreen() {
  return (
    <View style={theme.container}>
      <Text style={theme.title}>Add note</Text>
    </View>
  );
}
