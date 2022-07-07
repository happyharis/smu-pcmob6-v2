import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles";

export default function NotesScreenHome() {
  const navigation = useNavigation();
  return (
    <View style={theme.container}>
      <Text style={theme.title}>Notes</Text>

      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate("NotesScreenDetails")}
      >
        <Text style={styles.noteCardText}>
          10 excellent font paring tools for designers
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={theme.button}
        onPress={() => {
          navigation.navigate("NotesAddScreen");
        }}
      >
        <Text style={theme.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "black",
    borderWidth: "2px",
    padding: 10,
    borderRadius: 5,
  },
  noteCardText: {
    fontSize: 20,
  },
});
