import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <View style={styles.noteCard}>
        <Text style={styles.noteCardText}>
          10 excellent font paring tools for designers
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
  },
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
