import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/src/components/ProtectRoute";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";
import type { RecipeTypes } from "@/src/types";
import MealCard from "@/src/components/MealCard";
import SearchInput from "@/src/components/SearchInput";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import Chips from "@/src/components/Chips";
type Props = {};

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allRecipes, setAllRecipes] = useState<RecipeTypes[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeTypes[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
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

  useEffect(() => {
    if (selectedFilter) {
      const filtered = allRecipes.filter((recipe) =>
        recipe.mealType.includes(selectedFilter)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(allRecipes);
    }
  }, [selectedFilter, allRecipes]);

  useEffect(() => {
    const test = allRecipes.reduce((acc, curr) => {
      acc.push(curr?.mealType);
      return acc;
    }, []);
    const mealTypes = Array.from(new Set(test.flat()));
    setFilters(mealTypes);
  }, [allRecipes]);
  return (
    <ProtectedRoute>
      <StyledView style={styles.main}>
        {/* <SearchInput /> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ paddingHorizontal: 20, alignSelf: "center" }}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 10,
            // flex: 1,
            justifyContent: "center",
            // backgroundColor: "red",
          }}
          data={filters}
          renderItem={({ item }) => (
            <Chips
              isSelected={selectedFilter === item}
              text={item}
              onPress={() => {
                if (selectedFilter === item) {
                  setSelectedFilter("");
                  return;
                }
                setSelectedFilter(item);
              }}
            />
          )}
        />

        <>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchMeals} />
            }
            style={{ paddingHorizontal: 20 }}
            contentContainerStyle={{ gap: 20 }}
            data={filteredRecipes}
            renderItem={({ item }) => <MealCard meal={item} />}
            onEndReached={() => {
              if (selectedFilter) {
                return;
              }
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
        </>
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
