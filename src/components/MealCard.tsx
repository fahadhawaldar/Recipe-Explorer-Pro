import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { RecipeTypes } from "../types";

type Props = {
  meal: RecipeTypes;
};

const MealCard = ({ meal }: Props) => {
  return (
    <View style={styles.main}>
      <Image style={styles.image} source={{ uri: meal.image }} />
      <View>
        <Text style={styles.title}>{meal.name}</Text>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{meal.mealType}</Text>
        </View>
      </View>
    </View>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    flexDirection: "row",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#28a745",
  },
});
