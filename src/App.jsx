import React from "react";
import { Route, Routes } from "react-router";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/w" element={<WelcomePage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/signin" element={<SigninPage />}></Route>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/categories/:categoryName" />
          <Route path="/add" />
          <Route path="/my" />
          <Route path="/favorite" />
          <Route path="/shopping-list" />
        </Route>
        {/* <Route path="*" element={<NotFound />} />   */}
      </Routes>
    </>
  );
};

export default App;
