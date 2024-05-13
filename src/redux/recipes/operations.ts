import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

interface CategoryRecipesResponse {
  categoryRecipes: any[];
  totalRecipes: number;
}

export const getRecipesByCategory = createAsyncThunk<
  CategoryRecipesResponse,
  CategoryRecipesRequest
>("recipes/getRecipesByCategory", async ({ category, page }, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `./api/recipes/categories/${category}?page=${page}&limit=8`
    );

    return {
      categoryRecipes: data.data.result,
      totalRecipes: data.data.total,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCategoriesList = createAsyncThunk(
  "recipes/getCategoriesList",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`./api/recipes/category-list`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
