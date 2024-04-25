import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

interface PopularRecipesRequest {
  count: number;
}

export interface Recipe {
  _id: string;
  title: string;
  category: string;
  preview: string;
  thumb: string;
}
export interface PopularRecipes {
  breakfast?: Recipe[];
  miscellaneous?: Recipe[];
  chicken?: Recipe[];
  dessert?: Recipe[];
}

interface PopularRecipesResponse {
  popularRecipes: PopularRecipes;
}

export const getPopularRecipes = createAsyncThunk<
  PopularRecipesResponse,
  PopularRecipesRequest
>("recipes/getPopularRecipes", async ({ count }, thunkAPI) => {
  try {
    const { data } = await axios.get(`./api/recipes?count=${count}`);

    return { popularRecipes: data.data };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface OwnRecipesResponse {
  ownRecipes: any[];
}
export const getOwnRecipes = createAsyncThunk<OwnRecipesResponse, string>(
  "ownRecipes/getOwnRecipes",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axios.get(`./api/ownRecipes/${userId}`);
      console.log("ownqqq", data);
      return { ownRecipes: data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
>("recipes/getRecipeById", async ({ id }, thunkAPI) => {
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
  ingredient: {};
}

export const getIngredientById = createAsyncThunk<
  IngredientByIdResponse,
  IngredientByIdRequest
>("recipes/getIngredientById", async ({ id }, thunkAPI) => {
  try {
    console.log("id", id);

    const { data } = await axios.get(`./api/ingredients/${id}`);

    return {
      ingredient: data.data.result,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
