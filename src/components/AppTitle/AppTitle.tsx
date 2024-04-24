import css from "./AppTitle.module.css";

import React from "react";

const AppTitle = () => {
  return (
    <h1 className={css.appTitle}>
      <span className={css.titleInnerColor}>So</span>Yummy
    </h1>
  );
};

export default AppTitle;
