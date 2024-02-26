import React, { useEffect } from "react";
import { Navigate, Route, Routes, redirect } from "react-router";
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

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    console.log("ref", isRefreshing);
  }, [dispatch]);
  const theme = useSelector(selectTheme);
  console.log("ppp", isRefreshing);
  useEffect(() => {
    document.body.className = theme === "light" ? null : "dark-theme";
  }, [theme]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute redirectTo="/main" component={<WelcomePage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/main" component={<RegisterPage />} />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/main" component={<SigninPage />} />
          }
        />

        <Route path="/" element={<SharedLayout />}>
          <Route
           path="/main"
            element={<PrivateRoute component={<MainPage />} />}
          />
          <Route
            path="/categories"
            element={<PrivateRoute component={<CategoriesPage />} />}
          >
            <Route path=":categoriesName" element={<CategoriesByName />} />
          </Route>
          <Route path="/add" />
          <Route path="/my" />
          <Route path="/favorite" />
          <Route path="/shopping-list" />
          <Route path="*" element={<Navigate to="/other" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
