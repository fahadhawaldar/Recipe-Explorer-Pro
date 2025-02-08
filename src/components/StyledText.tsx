import { StyleSheet, Text, TextProps } from "react-native";
import React from "react";
import { darkColor, lightColor } from "../utils/color";
import { useSelector } from "react-redux";

type Props = TextProps;

const StyledText = (props: Props) => {
  const isDark = useSelector((state: any) => state.appSettings.darkMode);

  const textColor = isDark ? lightColor : darkColor;
  const customStyle = props.style
    ? { ...props.style, color: textColor }
    : { color: textColor };

  return <Text style={customStyle}>{props.children}</Text>;
};

export default StyledText;

const styles = StyleSheet.create({});
