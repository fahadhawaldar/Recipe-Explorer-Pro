import { StyleSheet, View, ViewStyle, useColorScheme } from "react-native";
import React from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle;
};

const StyledView = (props: Props) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#F5FCFF" },
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
