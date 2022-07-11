import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import NotesButton from "../components/NotesButton";
import { CAMERA_SCREEN } from "../constants/screens";
import { theme } from "../styles";

export default function ProfileScreen() {
  const { photoUri, username } = useSelector((state) => state.account);
  console.log("photoUri:", photoUri);
  const navigation = useNavigation();
  return (
    <View style={theme.container}>
      <Text style={[theme.title, { marginBottom: 20 }]}>profile</Text>

      <Image
        source={
          photoUri
            ? { uri: photoUri }
            : require("../assets/profile-placeholder.png")
        }
        style={{ height: 120, width: 120, borderRadius: 3, marginBottom: 20 }}
      />

      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
        {username}
      </Text>

      <TouchableOpacity
        style={styles.outlinedButton}
        onPress={() => navigation.navigate(CAMERA_SCREEN)}
      >
        <Text style={styles.outlinedButtonText}>Upload Photo</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <NotesButton
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          navigation.navigate("AuthScreen");
        }}
        text="Logout"
        marginBottom={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outlinedButton: {
    borderRadius: 3,
    borderWidth: 1,
    width: 120,
  },
  outlinedButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    padding: 15,
    color: "black",
  },
});
