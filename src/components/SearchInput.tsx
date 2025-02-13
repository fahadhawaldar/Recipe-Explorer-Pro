import { StyleSheet, TextInput } from "react-native";
import React from "react";
import StyledView from "./StyledView";
import StyledText from "./StyledText";
import { useSelector } from "react-redux";
import { darkColor, lightColor } from "../utils/color";

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
};

const SearchInput = ({ searchText, setSearchText }: Props) => {
  const isDark = useSelector((state: any) => state.appSettings.darkMode);
  const textColor = isDark ? lightColor : darkColor;
  const backgroundColor = isDark ? darkColor : lightColor;
  return (
    <StyledView style={styles.container}>
      <StyledText style={styles.text}>Search</StyledText>
      <TextInput
        // ref={(node) => node?.focus()}
        value={searchText}
        onChangeText={setSearchText}
        style={[
          styles.input,
          {
            color: textColor,
            backgroundColor,

            borderColor: textColor,
          },
        ]}
        placeholder="Search for a recipe"
      />
    </StyledView>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,

    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 0.3,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    // flex: 1,
  },
});
