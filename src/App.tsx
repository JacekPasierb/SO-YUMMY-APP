import React, { FC, Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AppDispatch } from "./redux/store";
import { logOut, refreshUser } from "./redux/auth/operations";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectTheme,
} from "./redux/auth/selectors";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Loader } from "./components/Loader/Loader";

// Lazy-loaded Pages
const WelcomePage = lazy(() => import("./Pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage/RegisterPage"));
const SigninPage = lazy(() => import("./Pages/SigninPage/SigninPage"));
const MainPage = lazy(() => import("./Pages/MainPage/MainPage"));
const CategoriesPage = lazy(
  () => import("./Pages/CategoriesPage/CategoriesPage")
);
const RecipePage = lazy(() => import("./Pages/RecipePage/RecipePage"));
const AddRecipePage = lazy(() => import("./Pages/AddRecipePage/AddRecipePage"));
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage/FavoritesPage"));
import MyRecipesPage from "./Pages/MyRecipesPage/MyRecipesPage";
const SharedLayout = lazy(
  () => import("./components/SharedLayout/SharedLayout")
);
const CategoriesByName = lazy(
  () => import("./components/CategoriesByName/CategoriesByName")
);

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isDarktheme = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(logOut());
    }
  }, [isLoggedIn]);
  // useEffect(() => {
  //   navigate(`${pathname}${search}`, { replace: true });
  // }, [navigate, pathname, search]);

  // Odświeżanie użytkownika po każdym odświeżeniu aplikacji
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // Zmiana motywu (dark/light)
  useEffect(() => {
    document.body.className = isDarktheme ? "dark-theme" : "";
  }, [isDarktheme]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Trasy z restrykcjami */}
        <Route
          path="/welcome"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <WelcomePage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <SigninPage />
                </Suspense>
              }
            />
          }
        />
        {/* Główne trasy prywatne */}
        <Route
          path="/"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={<Loader />}>
                  <SharedLayout />
                </Suspense>
              }
            />
          }
        >
          <Route index element={<PrivateRoute component={<MainPage />} />} />
          <Route
            path="/categories"
            element={<PrivateRoute component={<CategoriesPage />} />}
          >
            <Route path=":categoryName" element={<CategoriesByName />} />
          </Route>
          <Route
            path="/favorite"
            element={<PrivateRoute component={<FavoritesPage />} />}
          />
          <Route
            path="/ownRecipes"
            element={<PrivateRoute component={<MyRecipesPage />} />}
          />
          <Route
            path="/add"
            element={<PrivateRoute component={<AddRecipePage />} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<PrivateRoute component={<RecipePage />} />}
          />
          <Route path="/search" element={<PrivateRoute component="" />} />
          <Route
            path="/shopping-list"
            element={<PrivateRoute component="" />}
          />
          {/* <Route path="*"  element={<Navigate to="/err" />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
