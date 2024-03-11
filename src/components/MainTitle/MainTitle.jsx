import React from "react";
import css from "./MainTitle.module.css";

const MainTitle = ({ title }) => {
  return (
    <div className={css.bgTitle}>
      <h2 className={css.mainTitle}>{title}</h2>
    </div>
  );
};

export default MainTitle;
