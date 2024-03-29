export const selectError = (state) => state.recipes.error;

export const selectIsLoading = (state) => state.recipes.isLoading;

export const selectPopularRecipes = (state) => state.recipes.popularRecipes;

export const selectCategoryRecipes = (state) => state.recipes.categoryRecipes;

export const selectRecipeById = (state) => state.recipes.recipeById;

export const selectIngredient = (state) => state.recipes.ingredient;

export const selectOwnRecipes = (state) => state.recipes.ownRecipes;

export const selectTotalRecipes = (state) => state.recipes.totalRecipes;
