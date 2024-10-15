import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IRecipe, IRecipesResponse } from "../../types/recipesTypes";



export const getFavoriteRecipes = createAsyncThunk<
  IRecipesResponse,
  { page: number }
>("favorite/getFavoriteRecipes", async ({ page }, thunkAPI) => {
  try {
    const { data } = await axios.get(`api/favorite?page=${page}`);

    return {
      recipes: data.favoriteRecipes,
      totalRecipes: data.totalFavoritesRecipes,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeFromFavorite = createAsyncThunk<string, string>(
  "favorite/removeFromFavorite",
  async (recipeId: string, thunkAPI) => {
    try {
      await axios.delete(`/api/favorite/remove/${recipeId}`);
      return recipeId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavorite = createAsyncThunk<IRecipe, string>(
  "favorite/addToFavorite",
  async (recipeId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/favorite/add/${recipeId}`);

      return data.data.recipe;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
