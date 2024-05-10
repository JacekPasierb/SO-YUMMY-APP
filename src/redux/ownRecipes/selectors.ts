import { RootState } from "../store";

export const selectOwnRecipes = (state: RootState) =>
  state.ownRecipes.ownRecipes;

export const selectTotalOwnRecipes = (state: RootState) =>
  state.ownRecipes.totalOwnRecipes;

export const selectIsLoading = (state: RootState)=> state.ownRecipes.isLoading;