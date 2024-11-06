import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";
import { setAuthSuccess, setAuthError } from "./authSlice";
import {
  IAuthResponse,
  IUser,
  UpdateUserResponse,
} from "../../types/authTypes";

axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

// Utility to add JWT
const setAuthHeader = (token: string | null) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
//Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Auth operations
export const register = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, "email" | "password" | "name">
>(
  "auth/register",
  async (credentials: Pick<IUser, "email" | "password" | "name">, thunkAPI) => {
    try {
      const res = await axios.post("/api/users/register", credentials);
      setAuthHeader(res.data.data.token);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, "email" | "password">
>(
  "auth/logIn",
  async (credentials: Pick<IUser, "email" | "password">, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/signin", credentials);
      const { token, user } = response.data.data;
      thunkAPI.dispatch(setAuthSuccess({ token, user }));
      setAuthHeader(token);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.status === 403 ? "Email not verified" : "Login failed";

      toast.error(message);
      thunkAPI.dispatch(setAuthError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/users/resend-verification-email",
        {
          email,
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk<void, undefined>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.patch("/api/users/logout");
      clearAuthHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk<
  Pick<IUser, "name" | "email" | "avatar" | "userId" | "isDarkTheme">,
  undefined
>("auth/refresh", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    setAuthHeader(persistedToken);
    const response = await axios.get("/api/users/current");

    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  Pick<IUser, "name" | "avatar">
>(
  "auth/updateUser",
  async (userData: Pick<IUser, "name" | "avatar">, thunkAPI) => {
    try {
      const response = await axios.patch("/api/users/update", userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export interface ChangeThemeResponse {
  status: string;
  code: number;
  data: {
    isDarkTheme: boolean;
  };
}

export const changeTheme = createAsyncThunk<ChangeThemeResponse, boolean>(
  "auth/changeTheme",
  async (isDarkTheme, thunkAPI) => {
    try {
      const response = await axios.patch("/api/users/toogleTheme", {
        isDarkTheme,
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
