import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import AuthScreen from "./screens/AuthScreen";
import React, { useEffect, useState } from "react";
import HomeStack from "./components/HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
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

  async function loadToken() {
    const isLoggedIn = await AsyncStorage.getItem("token");
    setLoggedIn(isLoggedIn);
  }
  useEffect(() => {
    loadToken();
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
