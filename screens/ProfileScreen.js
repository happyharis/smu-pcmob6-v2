import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles";

export default function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={theme.container}>
      <Text style={theme.title}>Profile</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={theme.button}
        onPress={async () => {
          navigation.navigate("AuthScreen");
          await AsyncStorage.removeItem("token");
        }}
      >
        <Text style={theme.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
