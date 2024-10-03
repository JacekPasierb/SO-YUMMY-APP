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
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.error = null;
      state.isAuth = true;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred during registration";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred during login";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        console.log("changeTheme fulfilled", action.payload); // Dodaj log
        if (action.payload && action.payload.data.isDarkTheme !== undefined) {
          state.user.isDarkTheme = action.payload.data.isDarkTheme; // Sprawdź, czy ta linia jest wykonana
          state.error = null;
      } else {
          console.error("Payload is not defined properly", action.payload);
      }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload !== null) {
          state.user.name = action.payload.data.user.name;
          state.user.avatar = action.payload.data.user.avatar;
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
      .addCase(updateUser.rejected, (state, action) => {
        console.error("Error during user update:", action.payload);
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setAuthSuccess, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
