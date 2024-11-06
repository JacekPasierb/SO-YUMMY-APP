import React, { FC } from "react";
import styles from "./MainPageTitle.module.css";
import { useLocation } from "react-router";

interface MainPageTitleProps {
  title: string;
}

const MainPageTitle: FC<MainPageTitleProps> = ({ title }) => {
  const { pathname } = useLocation();
  const isRecipePage = pathname.includes("/recipe/");
  return (
    <h2
      className={`${styles.mainPageTitle} ${
        isRecipePage ? styles.recipePageTitle : ""
      } `}
    >
      {title}
    </h2>
  );
};

export default MainPageTitle;
