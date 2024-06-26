import { createSlice } from "@reduxjs/toolkit";
import { getRecipesByCategory, getCategoriesList } from "./operations";

interface RecipeState {
  recipesByCategory: any[];
  isLoading: boolean;
  categoriesList: string[];
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
