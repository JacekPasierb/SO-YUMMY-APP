import { createSlice } from "@reduxjs/toolkit";
import {
  getRecipesByCategory,
  getCategoriesList,
  getRecipes,
} from "./operations";

interface RecipeState {
  recipes: any[];
  isLoading: boolean;
  categoriesList: string[];
  totalRecipes: number;
  error: null | string;
}

export interface RootState {
  recipes: RecipeState;
}

const initialState: RecipeState = {
  recipes: [],
  totalRecipes: 0,
  categoriesList: [],
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.recipes = action.payload.recipes || [];
          state.totalRecipes = action.payload.totalRecipes || 0;
        }
        state.error = null;
      })
      .addCase(getRecipes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getCategoryRecipes";
        }
      })

      .addCase(getRecipesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload.categoryRecipes;
        state.totalRecipes = action.payload.totalRecipes;
        state.error = null;
      })
      .addCase(getRecipesByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecipesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getCategoryRecipes";
        }
      })
      .addCase(getCategoriesList.fulfilled, (state, action) => {
        state.categoriesList = action.payload.data.catArr;

        state.error = null;
      })
      .addCase(getCategoriesList.pending, (state) => {
        state.error = null;
      })
      .addCase(getCategoriesList.rejected, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getCategoriesList";
        }
      }),
});

export const recipesReducer = recipesSlice.reducer;
