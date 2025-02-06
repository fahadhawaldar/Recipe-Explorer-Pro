import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  useColorScheme,
} from "react-native";
import React from "react";

type Props = {
  children: React.ReactNode;
  style?: TextStyle;
};

const StyledText = (props: Props) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#000";
  const customStyle = props.style
    ? { ...props.style, color: textColor }
    : { color: textColor };

  return <Text style={customStyle}>{props.children}</Text>;
};

export default StyledText;

const styles = StyleSheet.create({});
