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

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  const theme = useSelector(selectTheme);

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
          <Route path="/categories/:categoryName" />
          <Route path="/add" />
          <Route path="/my" />
          <Route path="/favorite" />
          <Route path="/shopping-list" />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
