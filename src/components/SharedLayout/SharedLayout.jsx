import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";
import Copyrights from "../Copyrights/Copyrights";

const SharedLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <Copyrights />
    </>
  );
};

export default SharedLayout;
