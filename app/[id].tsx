import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import { RecipeTypes } from "@/src/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams(); // Get dynamic route param
  const [recipe, setRecipe] = useState<RecipeTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipe details using the API
    // ...
    async function fetchRecipeDetails() {
      try {
        const res = await axios.get(mealDbAPI + "/" + id);
        // setRecipe(data.meals[0]);
        console.log(mealDbAPI + "/" + id);

        setRecipe(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, []);

  return (
    <StyledView style={styles.container}>
      <StyledText style={styles.heading}>Recipe Details</StyledText>
      <Image style={styles.image} source={{ uri: recipe?.image }} />

      <StyledText style={styles.title}>{recipe?.name}</StyledText>

      <StyledText style={styles.subHeading}>Instructions</StyledText>
      <StyledText style={styles.description}>{recipe?.instructions}</StyledText>
    </StyledView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
    padding: 12,
    textAlign: "center",
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
