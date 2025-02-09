import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledView from "./StyledView";
import StyledText from "./StyledText";
import { accentColor } from "../utils/color";

type Props = {
  text: string;
  onPress: VoidFunction;
  isSelected?: boolean;
};

const Chips = ({ onPress, text, isSelected }: Props) => {
  return (
    <Pressable style={styles.chip} onPress={onPress}>
      <Text
        style={[
          styles.chipText,
          { color: isSelected ? accentColor : "#252525" },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Chips;

const styles = StyleSheet.create({
  chip: {
    padding: 10,
    // margin: 5,
    borderRadius: 10,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    color: "#252525",
    fontWeight: "bold",
    fontSize: 16,
  },
});
