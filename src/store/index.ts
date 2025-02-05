import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Handles authentication state
import recipesReducer from "./slices/recipesSlice"; // Handles recipe data state

export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for auth state
    recipes: recipesReducer, // Reducer for recipes state
  },
});
