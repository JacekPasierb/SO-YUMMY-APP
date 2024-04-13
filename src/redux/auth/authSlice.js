import { register, logIn, logOut, refreshUser, updateUser } from "./operations";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: { user: null, email: null, password: null },
    token: null,
    isLoggedIn: false,
    error: null,
    isAuth: false,
    isRefreshing: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
            state.isAuth = true;
        },
        setAuthError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.error = null;
        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.error = null;
        });
        builder.addCase(refreshUser.pending, (state) => {
            state.isRefreshing = true;
        });
        builder.addCase(refreshUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        });
        builder.addCase(refreshUser.rejected, (state) => {
            state.isRefreshing = false;
            state.isLoggedIn = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            // Tutaj możesz zaktualizować stan dla użytkownika po pomyślnej aktualizacji
            state.user = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            // Tutaj możesz obsłużyć ewentualne błędy podczas aktualizacji
            console.error("Błąd podczas aktualizacji użytkownika:", action.payload);
        });
    },
});
export const { setAuthSuccess, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
