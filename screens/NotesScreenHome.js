import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NOTES_SCREEN } from "../constants/screens";
import { fetchPosts } from "../features/postsSlice";
import { theme } from "../styles";

export default function NotesScreenHome() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const navigation = useNavigation();

  const postStatus = useSelector((state) => state.posts.status);
  const isLoading = postStatus === "loading";

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate(NOTES_SCREEN.Details, item)}
      >
        <Text style={styles.noteCardTitle}>{item.title}</Text>
        <Text style={styles.noteCardBodyText}>
          {item.content.substring(0, 120)}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={theme.container}>
      <Text style={[theme.title, { marginBottom: 20 }]}>notes</Text>

      {isLoading && <ActivityIndicator />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={theme.button}
        onPress={() => {
          navigation.navigate(NOTES_SCREEN.Add);
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
