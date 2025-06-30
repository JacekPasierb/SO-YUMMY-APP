import {createSlice} from "@reduxjs/toolkit";
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
  reducers: {
    resetRecipes(state) {
      state.recipes = [];
      state.totalRecipes = 0;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get All Recipes
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
      .addCase(getRecipes.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error =
          typeof payload === "string" ? payload : "Failed to fetch recipes";
      })

      // Get Recipes by Category
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
      .addCase(getRecipesByCategory.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error =
          typeof payload === "string"
            ? payload
            : "Failed to fetch category recipes";
      })

      // Get Categories List
      .addCase(getCategoriesList.fulfilled, (state, action) => {
        state.categoriesList = action.payload.data.catArr;

        state.error = null;
      })
      .addCase(getCategoriesList.pending, (state) => {
        state.error = null;
      })
      .addCase(getCategoriesList.rejected, (state, {payload}) => {
        state.error =
          typeof payload === "string" ? payload : "Failed to fetch categories";
      }),
});
export const { resetRecipes } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
