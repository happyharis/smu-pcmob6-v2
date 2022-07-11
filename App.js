import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import HomeStack from "./components/HomeStack";
import { API } from "./constants/API";
import { setPhotoUri, setUsernameProfile } from "./features/accountSlice";
import AuthScreen from "./screens/AuthScreen";
import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AppSource />
    </Provider>
  );
}

function AppSource() {
  const [loggedIn, setLoggedIn] = useState("");
  const dispatch = useDispatch();

  async function loadUsername(token) {
    const response = await axios.get(API + "/whoami", {
      headers: { Authorization: `JWT ${token}` },
    });
    return response.data.username;
  }

  async function loadConfig() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const username = await loadUsername(token);
      const photoUri = await AsyncStorage.getItem("photo_uri");
      if (photoUri) dispatch(setPhotoUri(photoUri));
      if (username) dispatch(setUsernameProfile(username));
    }
    setLoggedIn(token);
  }
  useEffect(() => {
    loadConfig();
  }, []);

  const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );

  return loggedIn == "" ? (
    <LoadingScreen />
  ) : (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={loggedIn ? "HomeStack" : "AuthScreen"}
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen component={HomeStack} name="HomeStack" />
        <Stack.Screen component={AuthScreen} name="AuthScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
