import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorite,
  getFavoriteRecipes,
  removeFromFavorite,
} from "./operations";
import { IRecipesState } from "../../types/recipesTypes";

const initialState: IRecipesState = {
  recipes: [],
  totalRecipes: 0,
  isLoading: false,
  error: null,
};

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get Favorite Recipes
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.isLoading = false;
        state.recipes = action.payload.recipes;
        state.totalRecipes = action.payload.totalRecipes;
        state.error = null;
      })
      .addCase(getFavoriteRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error =
          typeof payload === "string"
            ? payload
            : "Failed to fetch favorite recipes";
      })

      // Remove from Favorites
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        );
        state.error = null;
      })
      .addCase(removeFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorite.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error =
          typeof payload === "string"
            ? payload
            : "Failed to remove recipe from favorites";
      })
      // Add to Favorites
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = [...state.recipes, action.payload];
        state.error = null;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorite.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error =
          typeof payload === "string"
            ? payload
            : "Failed to add recipe to favorites";
      }),
});

export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
