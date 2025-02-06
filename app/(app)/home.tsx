import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/src/components/ProtectRoute";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";
import type { RecipeTypes } from "@/src/types";
import MealCard from "@/src/components/MealCard";
type Props = {};

const Home = (props: Props) => {
  const [allRecipes, setAllRecipes] = useState<RecipeTypes[]>([]);
  async function fetchMeals() {
    try {
      const res = await axios.get(mealDbAPI);

      setAllRecipes(res.data.recipes);
    } catch (error: any) {
    } finally {
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <ProtectedRoute>
      <View style={styles.main}>
        {allRecipes.length > 0 ? (
          <FlatList
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{ gap: 20 }}
            data={allRecipes}
            renderItem={({ item }) => <MealCard meal={item} />}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ProtectedRoute>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,

    backgroundColor: "#fff",
  },
});
