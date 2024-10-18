import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IRecipesResponse } from "../../types/recipesTypes";

// axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

interface IGetRecipesRequest {
  type: string;
  value: string;
  page:number;
  limit:number;
}

interface CategoryRecipesResponse {
  categoryRecipes: any[];
  totalRecipes: number;
}
interface IGetRecipesArgs {
  // Tutaj możesz zdefiniować typ dla argumentów, np. filtr, kategoria itp.
}
export const getRecipes = createAsyncThunk<IRecipesResponse, IGetRecipesRequest>(
  "recipes/getRecipes",
  async ({type, value, page, limit}, thunkAPI) => {
    try {
    
      const { data } = await axios.get(`./api/recipes?${type}=${value}&page=${page}&limit=${limit} `);
      console.log("d", data);

      return {
        recipes: data.data.result,
        totalRecipes: data.data.totalRecipes,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      // Obsługa błędów, przekazanie wiadomości błędu dalej do `rejected` akcji
      return thunkAPI.rejectWithValue(axiosError.message || "Unknown error occurred");
    }
  }
);

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
