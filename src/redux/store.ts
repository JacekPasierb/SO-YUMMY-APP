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
import { PersistPartial } from "redux-persist/es/persistReducer";
import { useDispatch } from "react-redux";

// Reducers
import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice";
import { recipesReducer } from "./recipes/recipesSlice";
import { ownRecipesReducer } from "./ownRecipes/ownRecipesSlice";
import { favoriteRecipesReducer } from "./favoriteRecipes/favoriteRecipesSlice";

// Types
import { IAuthState } from "../types/authTypes";

// Persist config
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// Create persisted auth reducer
const persistedAuthReducer: Reducer<IAuthState & PersistPartial> =
  persistReducer(authPersistConfig, authReducer);

// Root reducer
const rootReducer = {
  auth: persistedAuthReducer,
  recipes: recipesReducer,
  ownRecipes: ownRecipesReducer,
  favoriteRecipes: favoriteRecipesReducer,
  global: globalReducer,
};

// Ignored actions for serializable check
const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions,
      },
    }),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Create persistor
export const persistor = persistStore(store);
