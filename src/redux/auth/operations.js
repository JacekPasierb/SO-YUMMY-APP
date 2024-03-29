import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthSuccess, setAuthError } from "./authSlice";


axios.defaults.baseURL = "https://so-yummy-app-backend.vercel.app/";

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
//Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/api/users/register", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.token);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const resp = await axios.post("/api/users/signin", credentials);
      const { token, user } = resp.data.data;
      if (resp.status === 200) {
        thunkAPI.dispatch(setAuthSuccess({ token, user }));
        setAuthHeader(token);
        return await resp.data.data;
      } else {
        console.error("Logowanie nie powiodło się");
        thunkAPI.dispatch(setAuthError("Login failed ⚠"));
        return thunkAPI.rejectWithValue("Login failed ⚠");
      }
    
    } catch (err) {
      console.error(err.message);
      thunkAPI.dispatch(setAuthError("Login failed ⚠"));
      return thunkAPI.rejectWithValue("Login failed ⚠");
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.patch("/api/users/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
     
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      
        const res = await axios.get("/api/users/current");
     
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.patch("/api/users/update", userData);

      // Jeśli aktualizacja przebiegnie pomyślnie, możesz zaktualizować dane w stanie Redux.
      // Należy pamiętać, że w tym przypadku nie musisz dodatkowo zmieniać nagłówka autoryzacyjnego,
      // ponieważ token jest już przechowywany w nagłówku po zalogowaniu.

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
