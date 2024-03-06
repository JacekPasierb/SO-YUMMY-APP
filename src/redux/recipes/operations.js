import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

export const getPopularRecipes = createAsyncThunk(
  "recipes/getPopularRecipes",
  async ({ count }, thunkAPI) => {
    try {
      const { data } = await axios.get(`./api/recipes?count=${count}`);
      return { popularRecipes: data.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
