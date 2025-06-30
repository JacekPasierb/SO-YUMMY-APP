import React, {FC, lazy, Suspense} from "react";
import {Outlet} from "react-router-dom";

import styles from "./SharedLayout.module.css";
const Footer = lazy(() => import("../Footer/Footer"));
const Copyrights = lazy(() => import("../Copyrights/Copyrights"));

const SharedLayout: FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
      <Suspense fallback={null}>
        <Footer />
        <Copyrights />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
