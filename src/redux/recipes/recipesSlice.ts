import { createSlice } from "@reduxjs/toolkit";
import {
  getRecipeById,
  getIngredientById,
  getRecipesByCategory,
  getCategoriesList,
} from "./operations";

interface RecipeState {
  recipesByCategory: any[];
  isLoading: boolean;
  categoriesList: string[];
  recipeById: any;
  ingredient: any;

  totalRecipes: number;
  error: null | string;
}

export interface RootState {
  recipes: RecipeState;
}

const initialState: RecipeState = {
  recipesByCategory: [],
  totalRecipes: 0,
  categoriesList: [],
  isLoading: false,
  error: null,
  //zastanowic sie nad powiazaniem isLodaing i Error z innym reducerami
  recipeById: {},
  ingredient: {},
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      .addCase(getRecipesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipesByCategory = action.payload.categoryRecipes;
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
        state.isLoading = false;
        state.categoriesList = action.payload.data.catArr;

        state.error = null;
      })
      .addCase(getCategoriesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoriesList.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred during getCategoriesList";
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
