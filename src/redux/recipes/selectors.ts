import { RootState } from "./recipesSlice";

export const selectError = (state: RootState) => state.recipes.error;

export const selectCategoriesList = (state: RootState) =>
  state.recipes.categoriesList;

export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

export const selectRecipesByCategory = (state: RootState) =>
  state.recipes.recipes;

export const selectTotalRecipes = (state: RootState) =>
  state.recipes.totalRecipes;
