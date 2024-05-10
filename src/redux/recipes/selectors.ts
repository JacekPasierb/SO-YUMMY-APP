import { RootState } from "./recipesSlice";

export const selectError = (state: RootState) => state.recipes.error;

export const selectCategoriesList = (state: RootState) =>
  state.recipes.categoriesList;

export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

export const selectRecipesByCategory = (state: RootState) =>
  state.recipes.recipesByCategory;

export const selectRecipeById = (state: RootState) => state.recipes.recipeById;

export const selectIngredient = (state: RootState) => state.recipes.ingredient;

export const selectTotalRecipes = (state: RootState) =>
  state.recipes.totalRecipes;
