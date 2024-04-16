import React, { FC } from "react";
import css from "./MainPageTitle.module.css";

interface MainPageTitleProps {
  title: string;
}

const MainPageTitle: FC<MainPageTitleProps> = ({ title }) => {
  return <h2 className={css.mainPageTitle}>{title}</h2>;
};

export default MainPageTitle;
