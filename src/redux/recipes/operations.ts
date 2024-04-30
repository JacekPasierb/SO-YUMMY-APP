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

interface ownRecipe {
  createdAt: string;
  description: string;
  favorites: any[];
  ingredients: any[];
  instructions: string;
  owner: string;
  preview: string;
  tags: string[];
  thumb: string;
  time: string;
  title: string;
  updatedAt: string;
  youtube: string;
  _id: string;
}

export interface OwnRecipesRequest {
  userId: string;
  page: number;
}

interface OwnRecipesResponse {
  ownRecipes: ownRecipe[];
  totalOwnRecipes: number;
}
export const getOwnRecipes = createAsyncThunk<
  OwnRecipesResponse,
  OwnRecipesRequest
>("ownRecipes/getOwnRecipes", async ({ userId, page }, thunkAPI) => {
  try {
    const { data } = await axios.get(`./api/ownRecipes/${userId}?${page}`);

    return {
      ownRecipes: data.data.ownRecipes,
      totalOwnRecipes: data.data.totalOwnRecipes,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface BodyType {
  file: string;
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: any;
  instructions: string;
  imageUrl: string;
  thumb: string;
  preview: string;
}

export const addOwnRecipes = createAsyncThunk(
  "ownRecipes/addRecipes",
  async (body: BodyType, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/ownRecipes/add`, body);

      return data.data.newRecipe;
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
