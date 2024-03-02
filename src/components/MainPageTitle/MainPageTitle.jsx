import React from "react";
import css from "./MainPageTitle.module.css"

const MainPageTitle = ({ title }) => {
  return <h2 className={css.mainPageTitle}>{title}</h2>;
};

export default MainPageTitle;
