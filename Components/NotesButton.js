import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { theme } from "../styles";
export default function NotesButton({ onPress, text, marginBottom }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <TouchableOpacity
      style={[theme.button, { marginBottom: marginBottom ?? 10 }]}
      onPress={async () => {
        setLoading(true);
        await onPress();
        setLoading(false);
      }}
    >
      {loading ? (
        <ActivityIndicator style={theme.buttonText} />
      ) : (
        <Text style={theme.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

NotesButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  marginBottom: PropTypes.number,
};
