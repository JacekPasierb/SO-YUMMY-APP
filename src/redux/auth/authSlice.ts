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
  user: { userId: null, name: null, email: null, avatar: null, isDarkTheme: false },
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
    setAuthSuccess(state, action: PayloadAction<{ user: any; token: any }>) {
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
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.error = null;
    });

    builder.addCase(register.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "An error occurred during registration";
      }
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
      state.error = null;
    });

    builder.addCase(logIn.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "An error occurred during login";
      }
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.user = {
        userId: null,
        name: null,
        email: null,
        avatar: null,
        isDarkTheme:false,
      };
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
    builder.addCase(changeTheme.fulfilled,(state, action) =>{
      state.user.isDarkTheme = action.payload;
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
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
          isDarkTheme:false,
        };
        state.error = "Payload updateUser is null or undefined";
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.error("Błąd podczas aktualizacji użytkownika:", action.payload);
    });
    builder.addCase(resendVerificationEmail.pending, (state) => {
      state.error = null;
    });
    builder.addCase(resendVerificationEmail.fulfilled, (state) => {
      state.error = null;
    });
    builder.addCase(resendVerificationEmail.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setAuthSuccess, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
