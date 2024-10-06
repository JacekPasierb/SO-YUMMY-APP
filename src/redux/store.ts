import { Reducer, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice";
import { recipesReducer } from "./recipes/recipesSlice";
import { useDispatch } from "react-redux";

import { PersistPartial } from "redux-persist/es/persistReducer";
import { ownRecipesReducer } from "./ownRecipes/ownRecipesSlice";
import { favoriteRecipesReducer } from "./favoriteRecipes/favoriteRecipesSlice";
import { IAuthState } from "../types/authTypes";
import { useNavigate } from "react-router";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer: Reducer<IAuthState & PersistPartial> =
  persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    recipes: recipesReducer,
    ownRecipes: ownRecipesReducer,
    favoriteRecipes: favoriteRecipesReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { navigate: useNavigate() },
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
