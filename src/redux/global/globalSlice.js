import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLogoModalOpen: false,
  isUserInfoModalOpen: false,

  isLogoutModalOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsUserLogoModalOpen: (state, action) => {
      state.isUserLogoModalOpen = action.payload;
    },
    setIsUserInfoModalOpen: (state, action) => {
      state.isUserInfoModalOpen = action.payload;
    },
    setIsLogoutModalOpen: (state, action) => {
      state.isLogoutModalOpen = action.payload;
    },
  },
});

export const {
  setIsModalLogoutOpen,
  setIsUserLogoModalOpen,
    setIsUserInfoModalOpen,
  setIsLogoutModalOpen,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
