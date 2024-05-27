import { RootState } from "../store";

export const selectFavoriteRecipes = (state: RootState) =>
  state.favoriteRecipes.recipes;

export const selectIsLoading = (state: RootState) =>
  state.favoriteRecipes.isLoading;

export const selectIsError = (state: RootState) => state.favoriteRecipes.error;

export const selectTotalFavoritesRecipes = (state: RootState) =>
  state.favoriteRecipes.totalRecipes;
