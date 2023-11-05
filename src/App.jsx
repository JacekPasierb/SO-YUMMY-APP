import React from "react";
import { Route, Routes } from "react-router";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        {/* <Route path="*" element={<NotFound />} />   */}
      </Routes>
    </>
  );
};

export default App;
