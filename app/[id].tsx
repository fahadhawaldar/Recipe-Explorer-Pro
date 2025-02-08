import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import { RecipeTypes } from "@/src/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteRecipe } from "@/src/store/slices/recipesSlice";

const DetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams(); // Get dynamic route param
  const [recipe, setRecipe] = useState<RecipeTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const allRecipes = useSelector((state: any) => state.recipes.recipes);

  useEffect(() => {
    // Fetch recipe details using the API
    // ...
    async function fetchRecipeDetails() {
      try {
        const res = await axios.get(mealDbAPI + "/" + id);

        setRecipe(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching recipe details:", error);
        const findRecipe =
          allRecipes.find((recipe: any) => {
            return recipe.id === id;
          }) || null;

        setRecipe(findRecipe);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, []);

  function addToFav() {
    dispatch(addFavoriteRecipe(id));
  }

  return (
    <StyledView style={styles.container}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <StyledText style={styles.heading}>Recipe Details</StyledText>
        {loading && <ActivityIndicator size="large" />}

        <Image style={styles.image} source={{ uri: recipe?.image }} />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <StyledText style={styles.title}>{recipe?.name}</StyledText>
          <Pressable onPress={addToFav}>
            <View>
              <Fontisto
                name={true ? "heart" : "heart-alt"}
                size={24}
                color={"red"}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.prepTime}>
          <MaterialCommunityIcons
            name="clock-time-two-outline"
            size={24}
            color="#28a745"
          />
          <StyledText> {recipe?.prepTimeMinutes} minutes</StyledText>
          <Ionicons name="star" size={24} color="#FBA518" />
          <StyledText> {recipe?.rating}</StyledText>
        </View>

        <StyledText style={styles.subHeading}>Ingredients</StyledText>
        <View style={styles.ingredients}>
          {recipe?.ingredients.map((ingredient, index) => (
            <StyledText key={index} style={styles.description}>
              {ingredient}
            </StyledText>
          ))}
        </View>
        <StyledText style={styles.subHeading}>Cooking Instructions</StyledText>

        {recipe?.instructions.map((instruction, index) => (
          <View key={index} style={{ flexDirection: "row", gap: 5 }}>
            <StyledText style={styles.description}>{index + 1}. </StyledText>
            <StyledText style={styles.description}>{instruction}</StyledText>
          </View>
        ))}
        <View style={{ height: 150 }} />
      </ScrollView>
    </StyledView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
    padding: 12,
    // textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    // width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
  },
  ingredients: {
    gap: 5,
  },
  prepTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
    // backgroundColor: "#28a745",
  },
  description: {
    fontSize: 16,
  },
  link: {
    color: "#007bff",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default DetailsScreen;
