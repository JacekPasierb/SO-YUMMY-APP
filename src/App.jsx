import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./Pages/MainPage/MainPage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";


const App = () => {
  const dispatch = useDispatch();

   useEffect(() => {
     const currentPath = window.location.pathname;
     if (currentPath === "/main" ) {
       dispatch(refreshUser());
     }
   }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/signin"
          element={
            <RestrictedRoute redirectTo="/main" component={<SigninPage />} />
          }
        ></Route>
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
