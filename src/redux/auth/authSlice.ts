import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../../types/authTypes";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateUser,
  resendVerificationEmail,
  changeTheme,
} from "./operations";

export interface RootState {
  auth: IAuthState;
}

const initialState: IAuthState = {
  user: {
    userId: null,
    name: null,
    email: null,
    avatar: null,
    isDarkTheme: false,
  },
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
    setAuthSuccess(
      state,
      action: PayloadAction<{ user: IAuthState["user"]; token: string | null }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isAuth = true;
      state.error = null;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register.
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.token = payload.data.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error =
          typeof payload === "string"
            ? payload
            : "An error occurred during registration";
      })

      // Login
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.token = payload.data.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.error =
          typeof payload === "string"
            ? payload
            : "An error occurred during login";
      })

      // Logout
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })

      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })

      // Theme
      .addCase(changeTheme.fulfilled, (state, { payload }) => {
        if (payload && payload.data.isDarkTheme !== undefined) {
          state.user.isDarkTheme = payload.data.isDarkTheme;
          state.error = null;
        } else {
          console.error("Payload is not defined properly", payload);
        }
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (payload !== undefined && payload !== null) {
          state.user.name = payload.data.user.name;
          state.user.avatar = payload.data.user.avatar;
          state.error = null;
        } else {
          state.user = {
            userId: null,
            name: null,
            email: null,
            avatar: null,
            isDarkTheme: false,
          };
          state.error = "Payload updateUser is null or undefined";
        }
      })
      // Update User
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.error =
          typeof payload === "string"
            ? payload
            : "An error occurred during user update";
      })

      // Resend Verification
      .addCase(resendVerificationEmail.pending, (state) => {
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, { payload }) => {
        state.error =
          typeof payload === "string" ? payload : "Verification email failed";
      });
  },
});

export const { setAuthSuccess, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
