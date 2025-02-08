import { Pressable, StyleSheet, Image, View } from "react-native";
import React from "react";
import { RecipeTypes } from "../types";
import StyledView from "./StyledView";
import StyledText from "./StyledText";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  meal: RecipeTypes;
};

const SearchedItem = ({ meal }: Props) => {
  function navigateToDetails() {
    router.push({
      pathname: `/[id]`,
      params: { id: meal.id },
    });
  }
  return (
    <StyledView>
      <Pressable onPress={navigateToDetails} style={styles.container}>
        <Image style={styles.image} source={{ uri: meal.image }} />
        <StyledView style={styles.details}>
          <StyledText numberOfLines={2} style={styles.title}>
            {meal.name}
          </StyledText>
          <StyledText>{meal.mealType}</StyledText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              // justifyContent: "center",
            }}
          >
            <Ionicons name="star" size={18} color="#FBA518" />
            <StyledText>{meal.rating}</StyledText>
          </View>
          <StyledText> Cooking Time: {meal.prepTimeMinutes} minutes</StyledText>
        </StyledView>
      </Pressable>
    </StyledView>
  );
};

export default SearchedItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
});
