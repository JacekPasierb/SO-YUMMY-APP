import React from "react";
import Header from "../Header/Header";

import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";
import Copyrights from "../Copyrights/Copyrights";
import { Outlet } from "react-router-dom";

const SharedLayout: React.FC = () => {
  return (
    <div className={css.bg}>
      <Outlet />
      <Footer />
      <Copyrights />
    </div>
  );
};

export default SharedLayout;
