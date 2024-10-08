import { RootState } from "./authSlice";

export const selectIsLoggedIn = (state:RootState) => state.auth.isLoggedIn;

export const selectUser = (state:RootState) => state.auth.user;

export const selectIsRefreshing = (state:RootState) => state.auth.isRefreshing;

export const selectError = (state:RootState) => state.auth.error;

export const selectToken = (state:RootState) => state.auth.token;

export const selectTheme = (state:RootState) => state.auth.user.isDarkTheme;
