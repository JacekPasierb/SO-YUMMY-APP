import React, { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Copyrights from "../Copyrights/Copyrights";
import styles from "./SharedLayout.module.css";


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
