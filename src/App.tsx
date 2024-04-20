import React, { useEffect, useState } from "react";

import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./Pages/MainPage/MainPage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { useAuth } from "./hooks/useAuth";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Loader } from "./components/Loader/Loader";
import { selectTheme } from "./redux/global/globalSelectors";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import CategoriesByName from "./components/CategoriesByName/CategoriesByName";
import Layout from "./components/Layout/Layout";
import RecipePage from "./Pages/RecipePage/RecipePage";
import AddRecipePage from "./Pages/AddRecipePage/AddRecipePage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import { AppDispatch } from "./redux/store";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(pathname, { replace: true });
  }, [navigate, pathname]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.className = theme === "light" ? "light" : "dark-theme";
  }, [theme]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/welcome"
          element={
            <RestrictedRoute redirectTo="/" component={<WelcomePage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/" component={<SigninPage />} />
          }
        />

        <Route path="/" element={<PrivateRoute component={<SharedLayout />} />}>
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
          <Route path="/my" element={<PrivateRoute component="" />} />
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
