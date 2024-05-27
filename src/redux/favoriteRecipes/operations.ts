import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFavoriteRecipesResponse, IRecipe } from "../../types/recipesTypes";

export const getFavoriteRecipes = createAsyncThunk<
  IFavoriteRecipesResponse,
  { page: number }
>("favorite/getFavoriteRecipes", async ({ page }, thunkAPI) => {
  try {
    const { data } = await axios.get(`api/favorite?page=${page}`);
    return data;
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

export const addToFavorite = createAsyncThunk<
  Pick<IRecipe, "_id" | "title" | "category" | "area" | "instructions">,
  string
>("favorite/addToFavorite", async (recipeId: string, thunkAPI) => {
  try {
    const { data } = await axios.patch(`/api/favorite/add/${recipeId}`);
    return data.data.recipe;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
