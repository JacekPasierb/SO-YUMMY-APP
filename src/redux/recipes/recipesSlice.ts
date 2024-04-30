import { createSlice } from "@reduxjs/toolkit";
import {
  getPopularRecipes,
  getCategoryRecipes,
  getRecipeById,
  getIngredientById,
  PopularRecipes,
  getOwnRecipes,
  addOwnRecipes,
} from "./operations";

interface RecipeState {
  isLoading: boolean;
  popularRecipes: PopularRecipes;
  categoryRecipes: any[];
  recipeById: any;
  ingredient: any;
  ownRecipes: any[];
  totalOwnRecipes: number;
  totalRecipes: number;
  error: null | string;
}

export interface RootState {
  recipes: RecipeState;
}

const initialState: RecipeState = {
  isLoading: false,
  popularRecipes: {},
  categoryRecipes: [],
  recipeById: {},
  ingredient: {},
  ownRecipes: [],
  totalRecipes: 0,
  totalOwnRecipes: 0,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPopularRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularRecipes = action.payload.popularRecipes;
        state.error = null;
      })
      .addCase(getPopularRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPopularRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getPopularRecipes";
        }
      })
      .addCase(getCategoryRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryRecipes = action.payload.categoryRecipes;
        state.totalRecipes = action.payload.totalRecipes;
        state.error = null;
      })
      .addCase(getCategoryRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getCategoryRecipes";
        }
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipeById = action.payload.recipeById;
        state.error = null;
      })
      .addCase(getRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getRecipeById";
        }
      })
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownRecipes = action.payload.ownRecipes;
        state.totalOwnRecipes = action.payload.totalOwnRecipes;
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
        state.ownRecipes = [...state.ownRecipes, action.payload];
        state.error = null;
      })
      .addCase(getIngredientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredient = action.payload.ingredient;
        state.error = null;
      })
      .addCase(getIngredientById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientById.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getIngredientById";
        }
      }),
});

export const recipesReducer = recipesSlice.reducer;
