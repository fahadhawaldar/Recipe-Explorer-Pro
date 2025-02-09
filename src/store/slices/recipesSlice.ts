import { createSlice } from "@reduxjs/toolkit";

import { RecipeTypes } from "@/src/types";

export interface RecipeState {
  recipes: RecipeTypes[];
  createdRecipes: RecipeTypes[];

  favoriteRecipies: number[];
}

const initialState: RecipeState = {
  recipes: [],
  favoriteRecipies: [],
  createdRecipes: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addFavoriteRecipe: (state, action: { payload: number }) => {
      const id = action.payload;

      const aleadyExistIndex = state.favoriteRecipies.findIndex(
        (fId) => fId === id
      );

      if (aleadyExistIndex !== -1) {
        state.favoriteRecipies = state.favoriteRecipies.filter(
          (Fid) => Fid !== id
        );
      } else {
        state.favoriteRecipies.push(id);
      }
    },
    addRecipes: (
      state,
      action: { payload: { data: RecipeTypes[]; isExtra?: boolean } }
    ) => {
      const res = action.payload.data;
      const isExtra = action.payload.isExtra;
      if (isExtra) {
        state.recipes = state.recipes.concat(res);
        return;
      }
      state.recipes = res;
    },
    addRecipe: (state, action) => {
      state.recipes.unshift(action.payload);

      state.createdRecipes.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const { addRecipe, removeRecipe, addFavoriteRecipe, addRecipes } =
  recipesSlice.actions;

export const selectRecipes = (state: any): RecipeState => state.recipes;
export default recipesSlice.reducer;
