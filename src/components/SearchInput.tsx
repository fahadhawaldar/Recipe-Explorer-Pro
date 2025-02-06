import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
      <TextInput style={styles.input} placeholder="Search" />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
});
