import { createSlice } from "@reduxjs/toolkit";
import { getPopularRecipes } from "./operations";

const initialState = {
  isLoading: false,
  popularRecipes: [],
  categoryRecipes: [],
  ownRecipes: [],
  totalRecipes: 0,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getPopularRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularRecipes = action.payload.popularRecipes;
        state.error = null;
      })
      .addCase(getPopularRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPopularRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      }),
});

export const recipesReducer = recipesSlice.reducer;
