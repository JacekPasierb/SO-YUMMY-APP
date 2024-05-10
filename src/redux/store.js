import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { globalReducer } from "./global/globalSlice";
import { recipesReducer } from "./recipes/recipesSlice";
import { useDispatch } from "react-redux";
import { ownRecipesReducer } from "./ownRecipes/ownRecipesSlice";
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        recipes: recipesReducer,
        ownRecipes: ownRecipesReducer,
        global: globalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const useAppDispatch = useDispatch.withTypes();
export const persistor = persistStore(store);
