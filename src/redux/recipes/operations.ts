import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {IRecipesResponse} from "../../types/recipesTypes";

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

interface IGetRecipesRequest {
  type: string;
  value: string;
  page: number;
  limit: number;
}

interface CategoryRecipesResponse {
  categoryRecipes: any[];
  totalRecipes: number;
}

// Get recipes by search or filter
export const getRecipes = createAsyncThunk<
  IRecipesResponse,
  IGetRecipesRequest
>("recipes/getRecipes", async ({type, value, page, limit}, thunkAPI) => {
  try {
    const {data} = await axios.get(
      `./api/recipes?${type}=${value}&page=${page}&limit=${limit} `
    );

    return {
      recipes: data.data.result,
      totalRecipes: data.data.totalRecipes,
    };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue(
      axiosError.message || "Unknown error occurred"
    );
  }
});

// Get recipes by category
export const getRecipesByCategory = createAsyncThunk<
  CategoryRecipesResponse,
  CategoryRecipesRequest
>("recipes/getRecipesByCategory", async ({category, page}, thunkAPI) => {
  try {
    const {data} = await axios.get(
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

// Get categories list
export const getCategoriesList = createAsyncThunk(
  "recipes/getCategoriesList",
  async (language: string, thunkAPI) => {
    try {
      const url =
        language === "pl"
          ? "./api/recipes/category-listPl"
          : "./api/recipes/category-list";

      const {data} = await axios.get(url);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
