import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";
import React from "react";

type Props = TextProps;

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
