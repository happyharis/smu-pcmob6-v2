import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../styles";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import NotesButton from "../components/NotesButton";
import { postAdded } from "../features/postsSlice";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const dispatch = useDispatch();

  async function savePost() {
    const post = {
      id: nanoid(),
      title: noteTitle,
      content: noteBody,
    };
    dispatch(postAdded(post));
    navigation.goBack();
  }

  return (
    <View style={[theme.container, { paddingTop: 60 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </TouchableOpacity>
      <TextInput
        style={styles.noteTitle}
        placeholder={"note title"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
      />
      <TextInput
        style={styles.noteBody}
        placeholder={"Add your notes"}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        multiline={true}
      />
      <View style={{ flex: 1 }} />
      <NotesButton onPress={savePost} text="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
  },
});
