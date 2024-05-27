import { RootState } from "../store";

export const selectOwnRecipes = (state: RootState) =>
  state.ownRecipes.recipes;

export const selectTotalOwnRecipes = (state: RootState) =>
  state.ownRecipes.totalRecipes;

export const selectIsLoading = (state: RootState)=> state.ownRecipes.isLoading;