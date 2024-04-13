import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

interface PopularRecipesRequest {
  count: number;
}

interface PopularRecipesResponse {
  popularRecipes: any[];
}

export const getPopularRecipes = createAsyncThunk<
  PopularRecipesResponse,
  PopularRecipesRequest
>("recipes/getPopularRecipes", async ({ count }, thunkAPI) => {
  try {
    const { data } = await axios.get(`./api/recipes?count=${count}`);
    console.log("ggg", data.data);

    return { popularRecipes: data.data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

interface CategoryRecipesResponse {
  categoryRecipes: any[];
  totalRecipes: number;
}

export const getCategoryRecipes = createAsyncThunk<
  CategoryRecipesResponse,
  CategoryRecipesRequest
>("recipes/getCategoryRecipes", async ({ category, page }, thunkAPI) => {
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

interface RecipeByIdRequest {
  id: string;
}

interface RecipeByIdResponse {
  recipeById: {};
}

export const getRecipeById = createAsyncThunk<
  RecipeByIdResponse,
  RecipeByIdRequest
>("recipes/getRecipeById", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`./api/recipes/${id}`);

    return {
      recipeById: data.data.result,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface IngredientByIdRequest {
  id: string;
}

interface IngredientByIdResponse {
  recipeById: {};
}

export const getIngredientById = createAsyncThunk(
  "recipes/getIngredientById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`./api/ingredients/${id}`);

      return {
        recipeById: data.data.result,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
