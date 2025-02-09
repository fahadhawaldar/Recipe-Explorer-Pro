import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import StyledView from "@/src/components/StyledView";
import StyledText from "@/src/components/StyledText";
import SearchInput from "@/src/components/SearchInput";
import { mealDbAPI } from "@/src/utils/constants";
import axios from "axios";
import { RecipeTypes } from "@/src/types";
import MealCard from "@/src/components/MealCard";
import SearchedItem from "@/src/components/SearchedItem";

type Props = {};

const SearchScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeTypes[]>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(mealDbAPI + `/search?q=${searchText}`);

        setRecipes(res.data.recipes);
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchText]);

  return (
    <StyledView style={styles.container}>
      <SearchInput searchText={searchText} setSearchText={setSearchText} />
      {isLoading ? <ActivityIndicator size="large" /> : null}
      {recipes.length === 0 && !isLoading ? (
        <StyledText
          style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}
        >
          No recipes found
        </StyledText>
      ) : null}

      <FlatList
        onMomentumScrollEnd={() => Keyboard.dismiss()}
        // onScroll={() => {
        //   Keyboard.dismiss();
        // }}
        style={{ paddingHorizontal: 20 }}
        contentContainerStyle={{ gap: 20 }}
        data={recipes}
        renderItem={({ item }) => <SearchedItem meal={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </StyledView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
