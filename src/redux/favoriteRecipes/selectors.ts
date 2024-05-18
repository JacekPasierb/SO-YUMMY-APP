import { RootState } from "../store";

export const selectFavoriteRecipes = (state: RootState) =>
  state.favoriteRecipes.favoriteRecipes;

export const selectIsLoading = (state: RootState) =>
  state.favoriteRecipes.isLoading;

export const selectIsError = (state: RootState) =>
  state.favoriteRecipes.error;
