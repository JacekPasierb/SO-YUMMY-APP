import { RootState } from "./recipesSlice";

export const selectError = (state: RootState) => state.recipes.error;

export const selectIsLoading = (state: RootState) => state.recipes.isLoading;

export const selectPopularRecipes = (state: RootState) =>
  state.recipes.popularRecipes;

export const selectCategoryRecipes = (state: RootState) =>
  state.recipes.categoryRecipes;

export const selectRecipeById = (state: RootState) => state.recipes.recipeById;

export const selectIngredient = (state: RootState) => state.recipes.ingredient;

export const selectOwnRecipes = (state: RootState) => state.recipes.ownRecipes;

export const selectTotalRecipes = (state: RootState) =>
  state.recipes.totalRecipes;
