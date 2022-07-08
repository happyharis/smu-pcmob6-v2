import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesScreen } from "../constants/screens";

export default function NotesScreenDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState(route.params.title);
  const [noteBody, setNoteBody] = useState(route.params.content);
  const [editable, setEditable] = useState(false);

  function showAlertDelete() {
    Alert.alert(
      "Delete note",
      "There is no way to retrieve back your notes after deleting it.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => {
            navigation.navigate(NotesScreen.Home);
          },
          style: "destructive",
        },
      ]
    );
  }

  function EditButton() {
    return (
      <TouchableOpacity
        style={theme.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={theme.buttonText}>Save changes</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[theme.container, { paddingTop: 60 }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-left"} size={24} color={"black"} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <FontAwesome
            name={"pencil"}
            size={24}
            color={editable ? "forestgreen" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showAlertDelete()}
          style={{ marginLeft: 15 }}
        >
          <FontAwesome name={"trash"} size={24} color={"black"} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.noteTitle}
        placeholder={"note title"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
        editable={editable}
      />
      <TextInput
        style={styles.noteBody}
        placeholder={"Add your notes"}
        value={noteBody}
        onChangeText={(text) => setNoteBody(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <View style={{ flex: 1 }} />
      {editable && <EditButton />}
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
