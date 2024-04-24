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
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
    try {
        const res = await axios.post("/api/users/register", credentials);
        setAuthHeader(res.data.token);
        return res.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const logIn = createAsyncThunk("auth/logIn", async (credentials, thunkAPI) => {
    try {
        const resp = await axios.post("/api/users/signin", credentials);
        const { token, user } = resp.data.data;
        if (resp.status === 200) {
            thunkAPI.dispatch(setAuthSuccess({ token, user }));
            setAuthHeader(token);
            return await resp.data.data;
        }
        else {
            console.error("Logowanie nie powiodło się");
            thunkAPI.dispatch(setAuthError("Login failed ⚠"));
            return thunkAPI.rejectWithValue("Login failed ⚠");
        }
    }
    catch (err) {
        console.error(err.message);
        thunkAPI.dispatch(setAuthError("Login failed ⚠"));
        return thunkAPI.rejectWithValue("Login failed ⚠");
    }
});
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.patch("/api/users/logout");
        // After a successful logout, remove the token from the HTTP header
        clearAuthHeader();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
        setAuthHeader(persistedToken);
        const res = await axios.get("/api/users/current");
        return res.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const updateUser = createAsyncThunk("auth/updateUser", async (userData, thunkAPI) => {
    try {
        const res = await axios.patch("/api/users/update", userData);
        return res.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
