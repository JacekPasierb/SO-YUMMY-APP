import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getRecipesByCategory = createAsyncThunk("recipes/getRecipesByCategory", async ({ category, page }, thunkAPI) => {
    try {
        const { data } = await axios.get(`./api/recipes/categories/${category}?page=${page}&limit=8`);
        return {
            categoryRecipes: data.data.result,
            totalRecipes: data.data.total,
        };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getCategoriesList = createAsyncThunk("recipes/getCategoriesList", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`./api/recipes/category-list`);
        return data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
