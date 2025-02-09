import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteRecipe,
  selectRecipes,
} from "@/src/store/slices/recipesSlice";
import { RecipeTypes } from "@/src/types";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { accentColor } from "@/src/utils/color";

type Props = {};

const FavoritesScreen = (props: Props) => {
  const reduxDispatcher = useDispatch();
  const recipesData = useSelector(selectRecipes);
  const favoriteRecipes = recipesData.favoriteRecipies;
  const recipes = recipesData.recipes;

  const [favoriteMeals, setFavoriteMeals] = useState<RecipeTypes[]>([]);

  useEffect(() => {
    const filteredMeals = recipes.filter((recipe) =>
      favoriteRecipes.includes(recipe.id)
    );
    setFavoriteMeals(filteredMeals);
  }, [recipes, favoriteRecipes]);

  function changeFavorite(id: number) {
    reduxDispatcher(addFavoriteRecipe(id));
  }

  const renderItem = ({ item }: { item: RecipeTypes }) => (
    <Pressable
      onPress={() => {
        router.push(`/${item.id}`);
      }}
      style={styles.recipeCard}
    >
      <View>
        <StyledText style={styles.cardTitle}>{item.name}</StyledText>
        <View style={styles.prepTime}>
          <MaterialCommunityIcons
            name="clock-time-two-outline"
            size={18}
            color="#28a745"
          />
          <StyledText style={{ fontSize: 12 }}>
            {item?.prepTimeMinutes} minutes
          </StyledText>
        </View>
      </View>
      <Pressable
        onPress={() => {
          changeFavorite(item.id);
        }}
      >
        <Fontisto
          // disabled

          name={favoriteRecipes.includes(item.id) ? "heart" : "heart-alt"}
          size={24}
          color={accentColor}
        />
      </Pressable>
    </Pressable>
  );
  return (
    <StyledView style={{ flex: 1, paddingHorizontal: 20 }}>
      <StyledText style={styles.heading}>Your Favorite Recipes </StyledText>
      {favoriteMeals.length === 0 && (
        <StyledText style={styles.mesage}>No Favorite Recipes</StyledText>
      )}
      <FlatList data={favoriteMeals} renderItem={renderItem} />
    </StyledView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingVertical: 12,
  },

  recipeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  prepTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  mesage: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
