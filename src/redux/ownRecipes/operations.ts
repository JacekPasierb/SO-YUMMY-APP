import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    const { data } = await axios.get(`./api/ownRecipes/${userId}?page=${page}`);

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

export const deleteRecipe = createAsyncThunk(
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
