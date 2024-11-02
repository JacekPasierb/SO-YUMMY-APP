import React, { FC } from "react";
import styles from "./MainPageTitle.module.css";

interface MainPageTitleProps {
  title: string;
}

const MainPageTitle: FC<MainPageTitleProps> = ({ title }) => {
  return <h2 className={styles.mainPageTitle}>{title}</h2>;
};

export default MainPageTitle;
