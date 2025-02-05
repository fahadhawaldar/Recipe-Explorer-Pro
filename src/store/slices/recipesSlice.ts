import { createSlice } from "@reduxjs/toolkit";

export interface RecipeState {
  recipes: {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string[];
  }[];
}

const initialState: RecipeState = {
  recipes: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const { addRecipe, removeRecipe } = recipesSlice.actions;

export const selectRecipes = (state: RecipeState) => state.recipes;
export default recipesSlice.reducer;
