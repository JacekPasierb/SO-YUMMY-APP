import React, { FC, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Copyrights from "../Copyrights/Copyrights";
import styles from "./SharedLayout.module.css";
const Footer = lazy(()=>import("../Footer/Footer"))

const SharedLayout: FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Footer />
      <Copyrights />
    </div>
  );
};

export default SharedLayout;
