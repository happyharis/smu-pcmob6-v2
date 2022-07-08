import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles";
import NotesButton from "../components/NotesButton";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={theme.container}>
      <Text style={[theme.title, { marginBottom: 20 }]}>profile</Text>

      <View>
        <Image
          source={require("../assets/profile-placeholder.png")}
          style={{ height: 120, width: 120, borderRadius: 3, marginBottom: 20 }}
        />

        <TouchableOpacity style={styles.outlinedButton}>
          <Text style={styles.outlinedButtonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

      <NotesButton
        onPress={async () => {
          navigation.navigate("AuthScreen");
          await AsyncStorage.removeItem("token");
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
