import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React from "react";
import { RecipeTypes } from "../types";
import Fontisto from "@expo/vector-icons/Fontisto";
import StyledText from "./StyledText";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addFavoriteRecipe } from "../store/slices/recipesSlice";
import { accentColor } from "../utils/color";

type Props = {
  meal: RecipeTypes;
  isFav: boolean;
};

const MealCard = ({ meal, isFav = false }: Props) => {
  const reduxDispatch = useDispatch();

  function addToFav() {
    reduxDispatch(addFavoriteRecipe(parseInt(meal.id)));
  }
  return (
    <Pressable
      onPress={() => {
        router.push(`/${meal.id}`);
      }}
      style={styles.main}
    >
      <>
        <View>
          <Image style={styles.image} source={{ uri: meal.image }} />
          <View style={styles.floatBottom}>
            <MaterialCommunityIcons
              name="clock-time-two-outline"
              size={24}
              color="#252525"
            />
            <Text style={{ fontSize: 12, color: "#252525" }}>
              {meal.prepTimeMinutes} minutes
            </Text>
          </View>
        </View>
        <View>
          <StyledText style={styles.title}>{meal.name}</StyledText>

          <View style={styles.category}>
            <Text style={styles.categoryText}>{meal.mealType}</Text>
          </View>
        </View>
        <Pressable onPress={addToFav} style={styles.floatingtop}>
          <View style={styles.heart}>
            <Fontisto
              name={isFav ? "heart" : "heart-alt"}
              size={24}
              color={accentColor}
            />
          </View>
        </Pressable>
      </>
    </Pressable>
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
  floatingtop: {
    position: "absolute",
    top: 10,
    right: 10,
    gap: 10,
  },
  floatBottom: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    bottom: 10,
    right: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
  },
  heart: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 5,
    borderRadius: 50,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});
