import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { RecipeTypes } from "../types";
import Fontisto from "@expo/vector-icons/Fontisto";

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
      <View style={styles.heart}>
        <Fontisto
          name={false ? "heart" : "heart-alt"}
          size={24}
          color={false ? "red" : "#fff"}
        />
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
    // marginBottom: 10,
  },
  category: {
    flexDirection: "row",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#28a745",
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 5,
    borderRadius: 50,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
});
