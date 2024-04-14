import React, { FC } from "react";
import css from "./MainTitle.module.css";

interface MainTitleProps {
  title: string;
}

const MainTitle: FC<MainTitleProps> = ({ title }) => {
  return (
    <div className={css.bgTitle}>
      <h2 className={css.mainTitle}>{title}</h2>
    </div>
  );
};

export default MainTitle;
