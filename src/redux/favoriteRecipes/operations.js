import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getFavoriteRecipes = createAsyncThunk("favorite/getFavoriteRecipes", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`api/favorite`);
        return data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const removeFromFavorite = createAsyncThunk("favorite/removeFromFavorite", async (recipeId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/favorite/remove/${recipeId}`);
        return recipeId;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const addToFavorite = createAsyncThunk("favorite/addToFavorite", async (recipeId, thunkAPI) => {
    try {
        const { data } = await axios.patch(`/api/favorite/add/${recipeId}`);
        return data.data.recipe;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
