import { createSlice } from "@reduxjs/toolkit";
import { IGlobalState } from "../../types/globalTypes";

export interface RootState {
  global: IGlobalState;
}

const initialState: IGlobalState = {
  isUserLogoModalOpen: false,
  isUserInfoModalOpen: false,
  isLogoutModalOpen: false,
  isMenuModalOpen: false,
  theme: "light",
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
    setIsMenuModalOpen: (state, action) => {
      state.isMenuModalOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setIsUserLogoModalOpen,
  setIsUserInfoModalOpen,
  setIsLogoutModalOpen,
  setIsMenuModalOpen,
  setTheme,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
