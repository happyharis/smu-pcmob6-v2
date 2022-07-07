import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { API, API_LOGIN, API_SIGNUP } from "../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLogInScreen, setIsLogInScreen] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!" + response);
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      setUsername("");
      setPassword("");
      navigation.navigate("HomeStack");
    } catch (error) {
      setLoading(false);
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
        setLoading(true);
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });
        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
          setLoading(false);
        } else {
          console.log("Success signing up!");
          setLoading(false);
          login();
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogInScreen ? "Login to your account" : "Register new account"}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password Confirm"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}

      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={isLogInScreen ? login : signUp}
          >
            {loading ? (
              <ActivityIndicator style={styles.buttonText} />
            ) : (
              <Text style={styles.buttonText}>
                {isLogInScreen ? "Login" : "Register"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>

      <TouchableOpacity
        onPress={() => {
          setIsLogInScreen(!isLogInScreen);
          setErrorText("");
        }}
      >
        <Text style={styles.switchText}>
          {isLogInScreen
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 50,
  },
  switchText: {
    fontSize: 20,
    marginTop: 20,
    color: "gray",
  },
  inputView: {
    backgroundColor: "#F1F0F5",
    borderRadius: 5,
    marginBottom: 30,
  },
  textInput: {
    padding: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
  errorText: {
    marginTop: 20,
    fontSize: 15,
    color: "red",
  },
});
