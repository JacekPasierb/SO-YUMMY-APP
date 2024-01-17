import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={css.background}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
