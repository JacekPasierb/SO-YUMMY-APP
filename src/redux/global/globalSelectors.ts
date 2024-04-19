import { RootState } from "./globalSlice";

export const selectIsLogoutModalOpen = (state: RootState) =>
  state.global.isLogoutModalOpen;

export const selectIsUserLogoModalOpen = (state: RootState) =>
  state.global.isUserLogoModalOpen;

export const selectIsUserInfoModalOpen = (state: RootState) =>
  state.global.isUserInfoModalOpen;

export const selectIsMenuModalOpen = (state: RootState) =>
  state.global.isMenuModalOpen;

export const selectTheme = (state: RootState) => state.global.theme;
