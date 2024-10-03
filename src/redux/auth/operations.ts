import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthSuccess, setAuthError } from "./authSlice";
import { toast } from "react-toastify";
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
      const resp = await axios.post("/api/users/signin", credentials);
      const { token, user } = resp.data.data;
      thunkAPI.dispatch(setAuthSuccess({ token, user }));
      setAuthHeader(token);
      return await resp.data;
    } catch (err: any) {
      if (err.response.status === 403) {
        toast.info("Konto nie zweryfikowane");
        thunkAPI.dispatch(setAuthError("Konto nie zweryfikowane"));
        return thunkAPI.rejectWithValue("Konto nie zweryfikowane");
      }
      console.error(err.message);
      thunkAPI.dispatch(setAuthError("Login failed ⚠"));
      return thunkAPI.rejectWithValue("Login failed ⚠");
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email: string, thunkAPI) => {
    try {
      const res = await axios.post("/api/users/resend-verification-email", {
        email,
      });
      return res.data;
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
      // After a successful logout, remove the token from the HTTP header
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
    const res = await axios.get("/api/users/current");

    return res.data.data;
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
      const res = await axios.patch("/api/users/update", userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export interface ChangeThemeResponse {
  status: string;
  code: number;
  data: {
      isDarkTheme: boolean; // lub false
  };
}

export const changeTheme =createAsyncThunk<ChangeThemeResponse, boolean> (
  "auth/changeTheme",
  async (isDarkTheme, thunkAPI) => {
    try {
      console.log("is",isDarkTheme);
      
      const res = await axios.patch("/api/users/toogleTheme", {isDarkTheme});
      console.log("eeee", res.data.data);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
