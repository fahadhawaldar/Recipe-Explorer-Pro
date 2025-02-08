import { StyleSheet, View, ViewStyle, useColorScheme } from "react-native";
import React from "react";
import { darkColor, lightColor } from "../utils/color";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element | JSX.Element[] | any;
  style?: ViewStyle;
};

const StyledView = (props: Props) => {
  const isDark = useSelector((state: any) => state.appSettings.darkMode);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? darkColor : lightColor },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};

export default StyledView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
