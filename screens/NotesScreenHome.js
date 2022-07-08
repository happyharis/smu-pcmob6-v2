import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../styles";
import { AUTH_SCREEN, NotesScreen } from "../constants/screens";
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotesScreenHome() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState("");

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate(NotesScreen.Details, item)}
      >
        <Text style={styles.noteCardTitle}>{item.title}</Text>
        <Text style={styles.noteCardBodyText}>
          {item.content.substring(0, 120)}
        </Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const token = await AsyncStorage.getItem("token");
    console.log("Token: " + token);
    try {
      const response = await axios.get(API + API_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      setPosts(response.data);
      return "completed";
    } catch (error) {
      console.log("error.response:" + error.response.data);
      if (error.response.data.error == "Invalid token") {
        navigation.navigate(AUTH_SCREEN);
      }
    }
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
    borderWidth: "1px",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
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
