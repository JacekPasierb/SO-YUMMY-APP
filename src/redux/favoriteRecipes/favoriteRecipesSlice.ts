import { createSlice } from "@reduxjs/toolkit";
import { addToFavorite, getFavoriteRecipes, removeFromFavorite } from "./operations";

interface favoriteRecipesState {
  favoriteRecipes: any[];
  totalFavoriteRecipes: number;
  isLoading: boolean;
  error: null | string;
}

const initialState: favoriteRecipesState = {
  favoriteRecipes: [],
  totalFavoriteRecipes: 0,
  isLoading: false,
  error: null,
};

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteRecipes = action.payload;
        state.error = null;
      })
      .addCase(getFavoriteRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFavoriteRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getFavoriteRecipes";
        }
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteRecipes = state.favoriteRecipes.filter(
            (recipe) => recipe._id !== action.payload
          );
        state.error = null;
      })
      .addCase(removeFromFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during removeFromFavorite";
        }
      })   .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteRecipes = [...state.favoriteRecipes, action.payload];
        state.error = null;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during addToFavorite";
        }
      }),
});

export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
