import { createSlice } from "@reduxjs/toolkit";
import { addOwnRecipes, deleteRecipe, getOwnRecipes } from "./operations";
import { IRecipesState } from "../../types/recipesTypes";


const initialState: IRecipesState = {
  recipes: [],
  totalRecipes: 0,
  isLoading: false,
  error: null,
};
const ownRecipesSlice = createSlice({
  name: "ownRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload.recipes;
        state.totalRecipes = action.payload.totalRecipes;
        state.error = null;
      })
      .addCase(getOwnRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOwnRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getOwnRecipes";
        }
      })
      .addCase(addOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = [...state.recipes, action.payload];
        state.error = null;
      })
      .addCase(addOwnRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOwnRecipes.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during addOwnRecipes";
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during deleteOwnRecipes";
        }
      }),
});

export const ownRecipesReducer = ownRecipesSlice.reducer;
