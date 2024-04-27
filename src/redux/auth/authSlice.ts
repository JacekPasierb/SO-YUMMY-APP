import { register, logIn, logOut, refreshUser, updateUser } from "./operations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    userId: null | string;
    name: null | any;
    email: null | string;
    password: null | string;
    avatar: null | string;
  };
  token: null | any;
  isLoggedIn: boolean;
  error: string | null;
  isAuth: boolean;
  isRefreshing: boolean;
}
export interface RootState {
  auth: AuthState;
}

const initialState: AuthState = {
  user: { userId: null, name: null, email: null, password: null, avatar: null },
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
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
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
      state.user = action.payload.user;
      state.token = action.payload.token;
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
        password: null,
        avatar: null,
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
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload !== undefined && action.payload !== null) {
        state.user = action.payload;
        state.error = null;
      } else {
        state.user = {
          userId: null,
          name: null,
          email: null,
          password: null,
          avatar: null,
        };
        state.error = "Payload updateUser is null or undefined";
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      // Tutaj możesz obsłużyć ewentualne błędy podczas aktualizacji
      console.error("Błąd podczas aktualizacji użytkownika:", action.payload);
    });
  },
});

export const { setAuthSuccess, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
