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
export const getRecipeById = createAsyncThunk("recipes/getRecipeById", async ({ id }, thunkAPI) => {
    try {
        const { data } = await axios.get(`./api/recipes/${id}`);
        return {
            recipeById: data.data.result,
        };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getIngredientById = createAsyncThunk("recipes/getIngredientById", async ({ id }, thunkAPI) => {
    try {
        console.log("id", id);
        const { data } = await axios.get(`./api/ingredients/${id}`);
        return {
            ingredient: data.data.result,
        };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
