import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  INewRecipe,
  IRecipe,
  IRecipesResponse,
} from "../../types/recipesTypes";

// Get own recipes
export const getOwnRecipes = createAsyncThunk<
  IRecipesResponse,
  {  page: number }
>("ownRecipes/getOwnRecipes", async ({  page }, thunkAPI) => {
  try {
    const { data } = await axios.get(`./api/ownRecipes?page=${page}`);

    return {
      recipes: data.data.ownRecipes,
      totalRecipes: data.data.totalOwnRecipes,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add new recipe
export const addOwnRecipes = createAsyncThunk<IRecipe, INewRecipe>(
  "ownRecipes/addRecipes",
  async (body: INewRecipe, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/ownRecipes/add`, body);

      return data.data.newRecipe;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete recipe
export const deleteRecipe = createAsyncThunk<string, string>(
  "ownRecipes/deleteOwnRecipe",
  async (recipeId: string, thunkAPI) => {
    try {
      await axios.delete(`api/ownRecipes/remove/${recipeId}`);

      return recipeId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
