import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles";
import { NotesScreen } from "../constants/screens";

const notes = [
  {
    id: "0",
    title: "Groceries",
    content:
      "Get all the stuff for this evening. Very important are the ingredients for a slow cooking bolognese",
  },
  {
    id: "1",
    title: "Update insurance",
    content:
      "Send mail to Mr Filin and request update plan. Talk to Mel about the changes",
  },
];

export default function NotesScreenHome() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(notes);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate(NotesScreen.Details, item)}
      >
        <Text style={styles.noteCardTitle}>{item.title}</Text>
        <Text style={styles.noteCardBodyText}>
          {item.content.substring(0, 40)}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={theme.container}>
      <Text style={[theme.title, { marginBottom: 20 }]}>notes</Text>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={theme.button}
        onPress={() => {
          navigation.navigate(NotesScreen.Add);
        }}
      >
        <Text style={theme.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "gray",
    borderWidth: ".2px",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteCardTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 7,
  },
  noteCardBodyText: {
    fontSize: 12,
    fontWeight: "300",
  },
});
