import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/src/components/ProtectRoute";
import axios from "axios";
import { mealDbAPI } from "@/src/utils/constants";
import type { RecipeTypes } from "@/src/types";
import MealCard from "@/src/components/MealCard";
import StyledView from "@/src/components/StyledView";

import Chips from "@/src/components/Chips";
import Dropdown from "@/src/components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addRecipes, selectRecipes } from "@/src/store/slices/recipesSlice";

import { router, useNavigation } from "expo-router";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { setDarkMode } from "@/src/store/slices/appSettingSlice";
import { RecipeNotificationManager } from "@/src/services/RecipeNotificationManager";
type Props = {};

const sortRecipes = (
  recipes: RecipeTypes[],
  order: { id: number; label: string }
) => {
  return [...recipes].sort((a, b) => {
    if (order.id === 1) {
      // Ascending
      return a.prepTimeMinutes - b.prepTimeMinutes;
    } else {
      // Descending

      return b.prepTimeMinutes - a.prepTimeMinutes;
    }
  });
};

const Home = (props: Props) => {
  const navigation: BottomTabNavigationProp<any> = useNavigation();
  //redux
  const reduxDispatcher = useDispatch();
  const recipeStore = useSelector(selectRecipes);
  const isDarkMode: boolean = useSelector(
    (state: any) => state.appSettings.darkMode
  );

  const favorite = recipeStore.favoriteRecipies;
  const allRecipes = recipeStore.recipes;
  const createdRecipes = recipeStore.createdRecipes;
  //
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeTypes[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<{ id: number; label: string }>({
    id: -1,
    label: "",
  });

  function toggleDarkMode() {
    reduxDispatcher(setDarkMode(!isDarkMode));
  }

  async function fetchMeals() {
    setIsLoading(true);
    try {
      const res = await axios.get(mealDbAPI);

      reduxDispatcher(
        addRecipes({ data: createdRecipes.concat(res.data.recipes) })
      );
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Recipe Explorer Pro",
      // headerTitleStyle: { textAlign: "left" },
      headerLeft: () => (
        <Entypo
          disabled
          style={{ marginLeft: 10 }}
          size={24}
          name="open-book"
          color={"#fff"}
          onPress={() => {}}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              if (sortOrder.id === 2 || sortOrder.id === -1) {
                setSortOrder({ id: 1, label: "Ascending" });
                return;
              }
              setSortOrder({ id: 2, label: "Descending" });
            }}
            style={{ marginRight: 10 }}
          >
            <Octicons
              color={"#fff"}
              name={sortOrder.id === 1 ? "sort-asc" : "sort-desc"}
              size={24}
            />
          </Pressable>
          <Pressable onPress={toggleDarkMode} style={{ marginRight: 10 }}>
            <Ionicons
              color={"#fff"}
              name={!isDarkMode ? "moon" : "sunny"}
              size={24}
            />
          </Pressable>
        </View>
      ),
    });
  }, [sortOrder.id, isDarkMode]);

  useEffect(() => {
    if (selectedFilter) {
      const filtered = allRecipes.filter((recipe) =>
        recipe.mealType.includes(selectedFilter)
      );

      if (sortOrder.id === -1) {
        setFilteredRecipes(filtered);
        return;
      }
      const sorted = sortRecipes(filtered, sortOrder);
      setFilteredRecipes(sorted);
    } else {
      if (sortOrder.id === -1) {
        setFilteredRecipes(allRecipes);
        return;
      }
      const sorted = sortRecipes(allRecipes, sortOrder);
      setFilteredRecipes(sorted);
    }
  }, [selectedFilter, allRecipes, sortOrder, createdRecipes]);

  useEffect(() => {
    const test = allRecipes.reduce((acc: string[], curr: any) => {
      acc.push(curr?.mealType);
      return acc;
    }, []);
    const mealTypes = Array.from(new Set(test.flat()));
    setFilters(mealTypes);
  }, [allRecipes, createdRecipes]);
  return (
    <ProtectedRoute>
      <StyledView style={styles.main}>
        <RecipeNotificationManager />
        <Dropdown
          style={styles.dropdownButton}
          placeholder="Sort by Cooking time"
          data={[
            { id: 1, label: "Ascending" },
            { id: 2, label: "Descending" },
          ]}
          // value={}
          onSelect={(item: any) => {
            setSortOrder(item);
          }}
        />
        {/* <SearchInput /> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ paddingHorizontal: 20, flexGrow: 0, flexShrink: 0 }}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 10,
            // flex: 1,
            // justifyContent: "center",
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
            renderItem={({ item }) => (
              <MealCard meal={item} isFav={favorite.includes(item.id)} />
            )}
            onEndReached={() => {
              if (selectedFilter !== "") {
                return;
              }
              const nextPage = Math.floor(allRecipes.length / 20) + 1;
              axios
                .get(`${mealDbAPI}?limit=20&page=${nextPage}`)
                .then((res) => {
                  // reduxDispatcher(addRecipes({ data: res.data.recipes }));

                  reduxDispatcher(
                    addRecipes({ data: res.data.recipes, isExtra: true })
                  );
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
  dropdownButton: {
    padding: 12,
  },
});
