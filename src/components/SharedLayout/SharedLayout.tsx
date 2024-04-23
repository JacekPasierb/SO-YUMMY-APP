import css from "./SharedLayout.module.css";

import React, { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Copyrights from "../Copyrights/Copyrights";

const SharedLayout: FC = () => {
  return (
    <div className={css.bg}>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
      <Copyrights />
    </div>
  );
};

export default SharedLayout;
