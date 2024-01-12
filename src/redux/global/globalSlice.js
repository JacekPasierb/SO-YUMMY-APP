import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogoModalOpen: false,
  isModalLogoutOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsModalLogoutOpen: (state, action) => {
      state.isModalLogoutOpen = action.payload;
    },
    setIsUserLogoModalOpen: (state, action) => {
      state.isUserLogoModalOpen = action.payload;
    },
  },
});

export const { setIsModalLogoutOpen, setIsUserLogoModalOpen } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
