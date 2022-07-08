import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { API, API_LOGIN, API_SIGNUP } from "../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles";
import NotesButton from "../components/NotesButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AuthScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLogInScreen, setIsLogInScreen] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!" + response);
      await AsyncStorage.setItem("token", response.data.access_token);

      setUsername("");
      setPassword("");
      navigation.navigate("HomeStack");
    } catch (error) {
      console.log("Error logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
      if (error.response.status == 404) {
        setErrorText("User does not exist");
      }
    }
  }

  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.");
    } else {
      try {
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
        } else {
          console.log("Success signing up!");

          login();
        }
      } catch (error) {
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={theme.container}>
      <Text style={theme.title}>
        {isLogInScreen ? "Login to your account" : "Register new account"}
      </Text>
      <View style={theme.inputView}>
        <TextInput
          style={theme.textInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={theme.inputView}>
        <TextInput
          style={theme.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>

      {isLogInScreen ? (
        <View />
      ) : (
        <View style={theme.inputView}>
          <TextInput
            style={theme.textInput}
            placeholder="Password Confirm"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}

      <View>
        <View style={{ flexDirection: "row" }}>
          <NotesButton
            onPress={isLogInScreen ? login : signUp}
            text={isLogInScreen ? "Login" : "Register"}
          />
        </View>
      </View>
      <Text style={theme.errorText}>{errorText}</Text>

      <TouchableOpacity
        onPress={() => {
          setIsLogInScreen(!isLogInScreen);
          setErrorText("");
        }}
      >
        <Text style={theme.switchText}>
          {isLogInScreen
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
