import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getOwnRecipes = createAsyncThunk("ownRecipes/getOwnRecipes", async ({ userId, page }, thunkAPI) => {
    try {
        const { data } = await axios.get(`./api/ownRecipes/${userId}?page=${page}`);
        return {
            ownRecipes: data.data.ownRecipes,
            totalOwnRecipes: data.data.totalOwnRecipes,
        };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const addOwnRecipes = createAsyncThunk("ownRecipes/addRecipes", async (body, thunkAPI) => {
    try {
        const { data } = await axios.post(`/api/ownRecipes/add`, body);
        return data.data.newRecipe;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const deleteRecipe = createAsyncThunk("ownRecipes/deleteOwnRecipe", async (recipeId, thunkAPI) => {
    try {
        await axios.delete(`api/ownRecipes/remove/${recipeId}`);
        return recipeId;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
