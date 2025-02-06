import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/src/components/ProtectRoute";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";
import type { RecipeTypes } from "@/src/types";
import MealCard from "@/src/components/MealCard";
import SearchInput from "@/src/components/SearchInput";
import StyledView from "@/src/components/StyledView";
type Props = {};

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allRecipes, setAllRecipes] = useState<RecipeTypes[]>([]);
  async function fetchMeals() {
    setIsLoading(true);
    try {
      const res = await axios.get(mealDbAPI);

      setAllRecipes(res.data.recipes);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <ProtectedRoute>
      <StyledView style={styles.main}>
        <SearchInput />
        {allRecipes.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchMeals} />
            }
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{ gap: 20 }}
            data={allRecipes}
            renderItem={({ item }) => <MealCard meal={item} />}
            onEndReached={() => {
              const nextPage = Math.floor(allRecipes.length / 20) + 1;
              axios
                .get(`${mealDbAPI}?limit=20&page=${nextPage}`)
                .then((res) => {
                  setAllRecipes((prev) => [...prev, ...res.data.recipes]);
                });
            }}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, i) => item.id.toString() + 1 + i}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </StyledView>
    </ProtectedRoute>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,

    // backgroundColor: "#fff",
  },
});
