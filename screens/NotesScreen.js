import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles";

export default function NotesScreen() {
  const navigation = useNavigation();
  return (
    <View style={theme.container}>
      <Text style={theme.title}>Notes</Text>
      <View style={styles.noteCard}>
        <Text style={styles.noteCardText}>
          10 excellent font paring tools for designers
        </Text>
      </View>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={theme.button}
        onPress={() => {
          navigation.navigate("NotesCreateScreen");
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
